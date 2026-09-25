#!/usr/bin/env python3
"""Build the SYDACM website from the files in content/.

    python3 scripts/build.py          # checks content/, writes the site to _site/
    python3 -m http.server -d _site   # then open http://localhost:8000

GitHub Actions runs this on every change. If anything in content/ is wrong,
the build stops, says which file and line, and the live site is left as it was.
No extra Python packages are needed.
"""
import datetime, json, pathlib, re, shutil, sys, urllib.parse

ROOT    = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
SITE    = ROOT / "site"
OUT     = ROOT / "_site"

SPECIAL  = {"home", "churches", "events", "resources", "contact"}
DOC_EXT  = {".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"}
IMG_EXT  = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}
SPLIT_ZH = re.compile(r"^[ \t]*={3,}[ \t]*中文[ \t]*={3,}[ \t]*$", re.M)
COMMENT  = re.compile(r"<!--.*?-->", re.S)
KEY      = re.compile(r"[a-z0-9_]+")
DATE     = re.compile(r"\d{4}-\d{2}-\d{2}")

errors, warnings = [], []
def rel(p): return p.relative_to(ROOT).as_posix()


def read_doc(path):
    """Return (settings, english_body, chinese_body) for one .md file."""
    text = path.read_text(encoding="utf-8-sig").replace("\r\n", "\n")
    meta, body = {}, text
    if text.lstrip().startswith("---"):
        lines = text.lstrip().split("\n")
        end = next((i for i in range(1, len(lines)) if lines[i].strip() == "---"), None)
        if end is None:
            errors.append(f"{rel(path)}: the settings block starts with --- but has no closing ---. "
                          "Add a line containing only --- after the last setting.")
            return meta, "", ""
        for n, line in enumerate(lines[1:end], start=2):
            s = line.strip()
            if not s or s.startswith("#"):
                continue
            if ":" not in s:
                errors.append(f"{rel(path)} line {n}: “{s}” should look like  name: value")
                continue
            k, v = s.split(":", 1)
            k = k.strip().lower().replace(" ", "_")
            v = v.strip()
            if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
                v = v[1:-1]
            if not KEY.fullmatch(k):
                errors.append(f"{rel(path)} line {n}: “{k}” is not a valid setting name "
                              "(use English letters, numbers and _ only)")
                continue
            if k in meta:
                warnings.append(f"{rel(path)} line {n}: “{k}” appears twice — the second one is used")
            meta[k] = v
        body = "\n".join(lines[end + 1:])
    body = COMMENT.sub("", body)
    parts = SPLIT_ZH.split(body, maxsplit=1)
    en = parts[0].strip()
    zh = parts[1].strip() if len(parts) > 1 else ""
    return meta, en, zh


def need(meta, path, *keys):
    for k in keys:
        if not meta.get(k):
            errors.append(f"{rel(path)}: “{k}:” is missing or empty")


def check_image(meta, path, key):
    v = meta.get(key)
    if not v:
        return
    if v.startswith(("http://", "https://")):
        return
    p = CONTENT / v
    if not p.is_file():
        errors.append(f"{rel(path)}: {key}: {v} — no such file. Upload it to content/images/ "
                      "and write it as  images/filename.jpg")
    elif p.suffix.lower() not in IMG_EXT:
        errors.append(f"{rel(path)}: {key}: {v} is not a picture file")


# ── settings ────────────────────────────────────────────────────────────
settings_path = CONTENT / "settings.md"
site, _, _ = read_doc(settings_path)
need(site, settings_path, "name", "name_zh", "email", "menu")
if site.get("default_language", "zh") not in ("zh", "en"):
    errors.append(f"{rel(settings_path)}: default_language must be zh or en")
fs = site.get("formspree", "")
if fs and not fs.startswith("http"):
    site["formspree"] = "https://formspree.io/f/" + fs.strip("/")
if site.get("email") and "@" not in site["email"]:
    errors.append(f"{rel(settings_path)}: email “{site['email']}” does not look like an email address")
menu = [m.strip().lower() for m in site.get("menu", "").split(",") if m.strip()]

# ── pages ───────────────────────────────────────────────────────────────
pages = {}
for path in sorted((CONTENT / "pages").glob("*.md")):
    slug = path.stem.lower()
    if slug.startswith("_"):
        continue
    if not re.fullmatch(r"[a-z0-9-]+", slug):
        errors.append(f"{rel(path)}: page file names may only use a–z, 0–9 and - (e.g. youth-camp.md)")
        continue
    meta, en, zh = read_doc(path)
    need(meta, path, "title", "title_zh")
    check_image(meta, path, "hero_image")
    check_image(meta, path, "image")
    meta.update(body=en, body_zh=zh, type=slug if slug in SPECIAL else "page")
    pages[slug] = meta

if "home" not in pages:
    errors.append("content/pages/home.md is missing — the site needs a home page")
for m in menu:
    if m not in pages:
        errors.append(f"{rel(settings_path)}: menu lists “{m}” but there is no content/pages/{m}.md")
for s in pages:
    if s not in menu:
        warnings.append(f"content/pages/{s}.md is not in the menu (settings.md → menu). "
                        f"It is still reachable at #/{s}")

# ── events ──────────────────────────────────────────────────────────────
events = []
for path in sorted((CONTENT / "events").glob("*.md")):
    if path.name.startswith("_"):
        continue
    meta, en, zh = read_doc(path)
    if meta.get("draft", "no").lower() in ("yes", "true", "1"):
        continue
    need(meta, path, "title", "date")
    for k in ("date", "end_date"):
        v = meta.get(k)
        if not v:
            continue
        try:
            if not DATE.fullmatch(v):
                raise ValueError
            datetime.date.fromisoformat(v)
        except ValueError:
            errors.append(f"{rel(path)}: {k}: “{v}” — write dates as YEAR-MONTH-DAY, e.g. 2026-11-14")
    if meta.get("end_date") and meta.get("date") and meta["end_date"] < meta["date"]:
        errors.append(f"{rel(path)}: end_date is before date")
    if not meta.get("title_zh"):
        warnings.append(f"{rel(path)}: no title_zh — the English title will show on the Chinese site")
    check_image(meta, path, "image")
    meta.update(body=en, body_zh=zh, id=path.stem)
    events.append(meta)
events.sort(key=lambda e: (e.get("date", ""), e.get("time", "")))

# ── resources (documents) ───────────────────────────────────────────────
def script_of(name):
    if "简体" in name or "簡體" in name: return "sc"
    if "繁體" in name or "繁体" in name: return "tc"
    return ""

resources = []
res_root = CONTENT / "resources"
if res_root.is_dir():
    for d in sorted(p for p in res_root.iterdir() if p.is_dir()):
        files = []
        for f in sorted(d.iterdir(), key=lambda p: p.name):
            if f.is_file() and f.suffix.lower() in DOC_EXT:
                title = re.sub(r"\s*[（(](简体|簡體|繁體|繁体)[）)]\s*", " ", f.stem).strip()
                files.append({
                    "title": title,
                    "script": script_of(f.stem),
                    "ext": f.suffix.lower().lstrip("."),
                    "size": f.stat().st_size,
                    "url": "resources/" + urllib.parse.quote(d.name) + "/" + urllib.parse.quote(f.name),
                })
        resources.append({"name": re.sub(r"^\d+[\s._-]*", "", d.name), "files": files})

# ── app icons (the same files as the sydacm-churches site) ──────────────
ICONS = ["icon.svg", "favicon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png"]
missing = [i for i in ICONS if not (SITE / i).is_file()]
if missing:
    warnings.append("site/ is missing the app icon file(s) " + ", ".join(missing) +
                    " — copy them from sydacm-churches/docs/ into site/")

# ── stop here if anything is wrong ──────────────────────────────────────
if warnings:
    print("Notes:")
    for w in warnings:
        print("  ·", w)
if errors:
    print("\nBuild failed — nothing was published. Please fix:", file=sys.stderr)
    for e in errors:
        print("  ✗", e, file=sys.stderr)
    sys.exit(1)

# ── write _site/ ────────────────────────────────────────────────────────
if OUT.exists():
    shutil.rmtree(OUT)
shutil.copytree(SITE, OUT)
if (CONTENT / "images").is_dir():
    shutil.copytree(CONTENT / "images", OUT / "images", dirs_exist_ok=True)
for d in (res_root.iterdir() if res_root.is_dir() else []):
    if d.is_dir():
        for f in d.iterdir():
            if f.is_file() and f.suffix.lower() in DOC_EXT:
                (OUT / "resources" / d.name).mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, OUT / "resources" / d.name / f.name)
(OUT / ".nojekyll").write_text("")

try:
    from zoneinfo import ZoneInfo
    today = datetime.datetime.now(ZoneInfo("Australia/Sydney")).date()
except Exception:
    today = datetime.date.today()

(OUT / "content.json").write_text(json.dumps({
    "built": today.isoformat(),
    "site": site,
    "menu": menu,
    "pages": pages,
    "events": events,
    "resources": resources,
}, ensure_ascii=False, indent=1), encoding="utf-8")

n_docs = sum(len(c["files"]) for c in resources)
print(f"OK — {len(pages)} pages, {len(events)} events, {n_docs} documents → {rel(OUT)}/")

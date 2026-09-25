# Sydney Anglicans Chinese Ministry — website
# 悉尼圣公会华文事工 — 网站

**Live site → https://sydacm.github.io/**

This is the SYDACM website. It replaces the old Wix site at sydacm.com.au with one that anyone on the team can update from a web browser. You don't need any coding.

本仓库是 SYDACM 的网站。所有文字、活动和文件都放在 `content/` 文件夹内，在浏览器中即可修改，无需编程。

---

## The one rule 唯一规则

**Everything you would ever want to change is in the `content/` folder.** Nothing outside it needs touching.

**需要修改的内容全部在 `content/` 文件夹内。**

---

## I want to… 我想要…

| I want to… | Edit this | How |
|---|---|---|
| Change the email, phone, address or contact person | `content/settings.md` | Change the line, e.g. `phone: 0414 628 775` |
| Change the welcome text or Bible verse on the home page | `content/pages/home.md` | English on top, Chinese under `===== 中文 =====` |
| Change the "About" / Ministry Overview text | `content/pages/about.md` | Same as above |
| Add the Archbishop's testimony video | `content/pages/archbishop.md` | Paste the YouTube link after `video:` |
| **Add an event** | `content/events/` | Copy `_TEMPLATE.md` to a new file, fill it in, change `draft: yes` to `draft: no` |
| Remove an event | nothing | Past events hide themselves the day after they end |
| **Add a PDF (baptism service, etc.)** | `content/resources/<folder>/` | Upload the file — it appears automatically |
| Add a photo | `content/images/` | Upload it, then refer to it as `images/photo.jpg` |
| Change the order of the menu, or add a page | `content/settings.md` → `menu:` | New page = new file in `content/pages/` |
| Turn on the contact form | `content/settings.md` → `formspree:` | See below |
| **Change a church's details** | *Not here* — the **sydacm-churches** repository | Edit `data/churches.csv` there. This site picks it up automatically. |

### How to edit a file on GitHub 如何在 GitHub 修改文件

1. Open the file on github.com (e.g. click `content` → `settings.md`).
2. Click the **pencil ✏️** icon (top right of the file).
3. Make your change.
4. Click **Commit changes…** → write a short note like "New phone number" → **Commit changes**.
5. Wait about a minute and refresh the website.

If you made a mistake, the website **does not break**. The update just doesn't go out. The **Actions** tab turns red and tells you which file and line to fix. Until then the old version stays live.

如有错误，网站不会损坏：更新不会发布，**Actions** 页面会显示红色，并指出哪个文件、哪一行需要更正。

### Writing text 文字格式

Page and event files use a few simple marks:

```
# A heading
**bold words**
- a bullet point
> a quotation
[link text](https://example.com)
```

Everything else is plain typing. A line break in the file is a line break on the site. Text between `<!--` and `-->` is a note to editors and never appears on the website.

Each page holds **both languages in one file**. English goes first, then a line reading exactly `===== 中文 =====`, then the Chinese. If one language is left empty, the other one is shown.

---

## How the pieces fit 结构

```
sydacm.github.io   ← this repository: the website
   content/          ← everything you edit
   site/             ← the website's code (leave alone)
   scripts/build.py  ← checks content/ before publishing

sydacm-churches    ← the church list and maps (separate repository)
   data/churches.csv ← edit church details here
```

The **Community Churches** page reads the church list live from `sydacm-churches`. A church's details are therefore kept in exactly one place, and when you update the CSV there, both sites change. (If the live list ever can't be reached, the site uses a saved copy in `site/data/churches.geojson`.)

---

## Turning on the contact form 启用联络表格

GitHub Pages can't send emails by itself, so the form uses **Formspree** (free for up to 50 messages a month).

1. Go to **formspree.io** → sign up with `david@yungs.au` → **New form**.
2. It gives you an address like `https://formspree.io/f/abcdwxyz`.
3. In `content/settings.md`, set `formspree: abcdwxyz` and commit.
4. Send yourself a test message from the Contact page and confirm the email Formspree sends you.

Until then, the Contact page shows an **Email us** button instead, which works fine.

---

## Previewing on your own computer (optional)

```bash
python3 scripts/build.py
python3 -m http.server -d _site
# open http://localhost:8000
```

---

## Licence

Code: MIT. Text and documents © Sydney Anglicans Chinese Ministry.

# Putting the website on GitHub — about 15 minutes

This assumes the **sydacm** organisation already exists (you made it for `sydacm-churches`).

## 1. Prepare the folder on your computer
- Unzip `sydacm.github.io.zip` into `Documents`. You get a folder called **`sydacm.github.io`** — keep that exact name, it becomes the repository name.
- Copy these five icon files from `sydacm-churches/docs/` into **`sydacm.github.io/site/`**:
  `icon.svg` · `favicon-32.png` · `apple-touch-icon.png` · `icon-192.png` · `icon-512.png`
- Add nothing else. On a Mac, press **⌘ Shift .** in Finder to show hidden files. The top level should contain exactly this:

```
.github/   content/   scripts/   site/   .gitignore   LICENSE   README.md   SETUP.md
```

Keep the folder in `Documents` or similar, not inside iCloud Drive (iCloud corrupts git folders).

## 2. Publish it with GitHub Desktop
**Don't** create the repository on github.com first, and **don't** drag files into the GitHub website. The browser upload flattens folders and leaves out `.github/`, which is what publishes the site. GitHub Desktop creates the repository for you:

- **File → Add Local Repository…** → choose the `sydacm.github.io` folder
- It will say this isn't a Git repository → **create a repository** → Git Ignore and License: *None* → **Create Repository**
- **Publish repository** → Name **`sydacm.github.io`** · Organization **sydacm** · **untick "Keep this code private"** → Publish

The name `sydacm.github.io` is special: it makes this the organisation's main site at `https://sydacm.github.io/`.

## 3. Check the repository on github.com
It should show the same eight items as the list above, and nothing loose at the top level (no `home.md`, `index.html` or icons there).

## 4. Turn on GitHub Pages
- Repository → **Settings → Pages** → Source: **GitHub Actions**
- Open the **Actions** tab. The first run should go green within a minute or two.
- Visit **https://sydacm.github.io/**

## 5. Check it worked
- The home page shows the church counts (35 churches · 39 locations as of September 2026). If it shows dashes, the church list couldn't load; tell whoever maintains the site.
- Your icon shows in the browser tab and at the top left of the page.
- **Community Churches** shows the map with crosses and the full list.
- Click **EN / 中文** in the top corner. The whole site should switch.
- Open `content/settings.md` → pencil → change something small → commit → refresh the site a minute later.

## 6. Things to finish
- [ ] `content/pages/archbishop.md`: paste the testimony video link (the old Wix page's video couldn't be copied automatically)
- [ ] `content/resources/`: upload the liturgy PDFs from the old site into the folders
- [ ] Read `content/pages/about.md` and adjust the wording to your liking
- [ ] Optional: set up Formspree (README → "Turning on the contact form")
- [ ] Optional: add a banner photo (`hero_image:` in `content/pages/home.md`)
- [ ] Add a second **Owner** to the organisation, if you haven't already

## 7. Later: moving sydacm.com.au here (only when ready)
While the Wix site is still live, leave the domain alone. The new site works at sydacm.github.io in the meantime.

When you're ready to switch off Wix:
1. **Settings → Pages → Custom domain** → enter `www.sydacm.com.au` → Save.
2. At your domain registrar (where sydacm.com.au is managed), point the domain at GitHub:
   - `www` → **CNAME** → `sydacm.github.io`
   - the bare domain `sydacm.com.au` → **A** records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Back in **Settings → Pages**, tick **Enforce HTTPS** once it becomes available (can take up to a day).
4. Cancel the Wix plan **after** the new domain works.

Once the custom domain is on, the churches site automatically moves to `www.sydacm.com.au/sydacm-churches/`. The old addresses redirect, so nothing breaks.

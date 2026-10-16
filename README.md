# aledajohnson.github.io

Personal site. Plain HTML, CSS and a little JavaScript: no build step, no framework. Hosted on GitHub Pages: every commit to `main` is live in about a minute.

Live at: **https://aledajohnson.github.io**

---

## Where the copy lives

Every sentence on the site is in **`index.html`**, in page order. Each section starts with a banner comment like `<!-- ═══════ RESUME ═══════ -->` so you can find it by scrolling.

| Section in `index.html` | What's in it |
|---|---|
| `SEARCH RESULTS & LINK PREVIEWS` | `<title>`, description and preview text: what Google and Slack link previews show. |
| `HERO` | A small circular photo, "Hello, I'm Aleda" and the intro paragraphs, plus the menu on the right that scrolls to each section below. |
| `RESUME` | Each role is a `<details>` dropdown. Add `open` to one to have it start expanded. |
| `PERSONAL PROJECTS` | One `<div class="card">` per project, a row of `<div class="art-block">` entries under "Art Builds", and the Van Build photo gallery below that. |
| `FAVORITE BOOKS` | One `<li>` per book, split across two `<ul class="stack">` columns. `data-note` is what shows when someone clicks it. |
| `FOOTER / CONTACT` | LinkedIn, GitHub, resume link |

The whole page is one continuous scroll now — every section is always in the DOM (no more show/hide), so the hero menu and header are just anchor links (`href="#resume"` etc.) to each section's `id`.

**Adding a menu link:** the hero menu buttons are sticker artwork (PNGs with transparent backgrounds) in `images/stickers/`. Copy an `<a class="menu-item">` in the hero, point its `href` at a section `id` below, and swap in a new image.

**Van photos:** drop them in `images/van/` named `01.jpg`, `02.jpg`, and so on. Keep each under ~500 KB (resize to ~1600px wide). Missing photos show as an empty tile, so delete any `<figure>` you don't use. Add a caption with `<figcaption>...</figcaption>` inside a figure.

**Art Build photos:** same idea, in `images/art/<folder>/01.jpg` through `03.jpg` — one folder per piece.

**Linking straight to a section:** `aledajohnson.github.io/#van` scrolls straight to the Van Build group (it lives inside Personal Projects now, but keeps its own anchor). Same for `#resume`, `#projects`, `#reading`.

Other files you mostly won't touch:

- **`styles.css`**: all the design. Colors and fonts are at the top under `COLORS & TYPE`.
- **`script.js`**: the header hairline, gallery viewer and book stack. No copy in here.
- **`Aleda_Johnson_Resume.pdf`**: replace the file with the same name to update it.
- **`favicon.svg`**: the tab icon.

## How to make a change

**From the browser (no setup):** go to the repo on GitHub → click `index.html` → pencil icon → edit → **Commit changes**. Live in ~60 seconds.

**Locally:** edit, then `git commit -am "update copy" && git push`. To preview first: `python3 -m http.server` in this folder and open http://localhost:8000.

## Hosting (GitHub Pages)

Already set up if the repo is named `aledajohnson.github.io`. If you ever need to redo it: repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.

**Custom domain later:** buy it (Cloudflare Registrar is at-cost), then in Settings → Pages → *Custom domain* enter it, and in your DNS add a `CNAME` record for `www` pointing to `aledajohnson.github.io` plus the four GitHub Pages `A` records for the bare domain (listed in GitHub's "Managing a custom domain" docs). Tick *Enforce HTTPS* once it verifies.

## Gotchas

- Fonts load from Google Fonts. If you add a weight, update the `<link>` in the `<head>`.
- Phone number and email are deliberately not on the public site — contact is LinkedIn/GitHub only.
- With "reduce motion" turned on, animations and smooth-scrolling are skipped.

# aledajohnson.github.io

Personal site. Plain HTML, CSS and a little JavaScript: no build step, no framework. Hosted on GitHub Pages: every commit to `main` is live in about a minute.

Live at: **https://aledajohnson.github.io**

---

## Where the copy lives

Every sentence on the site is in **`index.html`**, in page order. Each section starts with a banner comment like `<!-- ═══════ ABOUT ═══════ -->` so you can find it by scrolling.

| Section in `index.html` | What's in it |
|---|---|
| `SEARCH RESULTS & LINK PREVIEWS` | `<title>`, description and preview text: what Google and Slack link previews show. |
| `HERO` | "hello," the intro lines, the hint, the mirror, and the pop-out buttons. Each button's `data-panel` matches a panel `id` below. |
| `ABOUT` | Three paragraphs and the flip cards (`front` = label, `back` = detail) |
| `RESUME` | Each role is a `<details>` dropdown. Add `open` to one to have it start expanded. |
| `PERSONAL PROJECTS` | One `<a class="card">` per project |
| `VAN BUILD` | Photo gallery. See below. |
| `READING LIST` | One `<li>` per book. `data-note` is what shows when someone clicks it; `--h` is the spine height. |
| `FOOTER / CONTACT` | Email, GitHub, resume link |

**Adding a button:** copy a `<button class="pop">` in the hero, give it a new `data-panel`, bump `--i`, and add a `<section class="panel" id="..." hidden>` with that id. Buttons 6+ need a position in `styles.css` under `BUTTONS THAT POP OUT`.

**Van photos:** drop them in `images/van/` named `01.jpg`, `02.jpg`, and so on. Keep each under ~500 KB (resize to ~1600px wide). Six slots are set up; copy a `<figure>` to add more. Missing photos show as an empty tile, so delete any `<figure>` you don't use. Add a caption with `<figcaption>...</figcaption>` inside a figure.

**Linking straight to a section:** `aledajohnson.github.io/#van` opens with the Van Build panel showing. Same for `#about`, `#resume`, `#projects`, `#reading`.

Other files you mostly won't touch:

- **`styles.css`**: all the design. Colors and fonts are at the top under `COLORS & TYPE`.
- **`script.js`**: the mirror, panels, gallery viewer and bookshelf. No copy in here.
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
- Phone number is deliberately not on the public site.
- With "reduce motion" turned on, the mirror stops floating and the buttons appear without animating.

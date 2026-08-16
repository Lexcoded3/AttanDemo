# AttanDemo — Static Demo Site

A fully static, PHP-free copy of the **Hon. Moses Attan Okia** website, generated
from the live site by `build-demo.php` (in the AttanNew project). Meant for fast,
glitch-free demos — no database, no PHP, no server required.

## Structure

```
public/    ← the whole static site (open public/index.html to view locally)
settings/  ← static-web-server config
Staticfile ← tells Wasmer the site root is public/
```

## How it behaves

- All 40 pages flattened: blog posts (8), campaigns (5), press releases (2), auth
  shells, 404, privacy, faq, maps, polls, etc.
- Every form shows a **DEMO MODE** notice and is disabled.
- Constituency/project maps keep live Leaflet tiles (need internet).
- All images, fonts, CSS, JS, the manifesto PDF and campaign QR codes are local.

## Deploy on Wasmer Edge

```bash
wasmer deploy
```

Or connect this repository to a new Wasmer app in the dashboard — the
`Staticfile` + `settings/config.toml` layout is the standard static-site template.

## Regenerate

Content lives in the AttanNew CMS. After updating posts/campaigns there, re-run
`php build-demo.php` in the project root and re-push `public/`.

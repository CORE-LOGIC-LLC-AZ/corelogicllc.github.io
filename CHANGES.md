# Changes

## Unreleased

### feat/reeldispatch-screenshots

- Added ReelDispatch product screenshots to the hero and a new “In the app” gallery on the product page.

### feat/reeldispatch-jira-triage-note

- Noted on the ReelDispatch feedback section that reported bugs are triaged internally in Jira.

### feat/reeldispatch-feedback-links

- Linked ReelDispatch product, privacy, and terms pages to the public `reel-dispatch-public` GitHub discussions/issues for feature requests and bug reports.

### feat/products-nav-dropdown

- Replaced per-product top-bar links with a **Products** dropdown (CaptionBake, ReelDispatch) on Home, product pages, and Games.
- Added shared `assets/js/site-nav.js` for hamburger + dropdown behavior.
- Clarified ReelDispatch Free vs Pro on the product page, privacy policy, and terms (including pricing compare and early-access copy).

### feat/reeldispatch-product-pages

- Added ReelDispatch product marketing page, privacy policy, and terms under `reeldispatch/`.
- Linked ReelDispatch from the homepage nav/products strip, CaptionBake nav, and Games nav.
- Published app icon assets for TikTok / store use.

### release/captionbake-arm64-only

- CaptionBake public downloads are Apple Silicon only; removed the Intel (x86_64) download button and config entry.

### feat/captionbake-http-api-docs

- Documented CaptionBake’s latest features on the product page: word highlight (experimental ASR, accuracy caveats, ~142 MB model disk use), local HTTP API, and free forever.
- Added a Local HTTP API section with enable steps, field reference, and sample `curl` commands for `POST /export` and `GET /settings`.
- Updated homepage CaptionBake blurb to mention automation via the local HTTP API.

### fix/cache-bust-light-theme

- Cache-bust CSS and brand assets so browsers pick up the light studio theme instead of a stale dark stylesheet.
- Force `color-scheme: light` and remove the full-page multiply grain overlay that could muddy the canvas.

### feat/light-studio-redesign

- Redesigned the marketing site with a light studio visual system (paper canvas, Syne/Figtree typography, ink + brand-blue accents).
- Restructured homepage hero and sections for a cleaner agency presentation; shared styles cascade to CaptionBake and Games pages.
- Introduced a circuit-style Core Logic CL mark and updated favicon/header lockups to brand blue.
- Added mobile nav toggle and refreshed product-page chrome to match the new shell.

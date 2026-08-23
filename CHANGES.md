# Changes

## Unreleased

### captionbake/timing-editor-and-free-font

- CaptionBake: free styling is Helvetica (size, layout, and colors stay free); Pro unlocks the system font list.
- CaptionBake: Pro word timing editor is documented as available with spoken-word highlight off.

### feat/capy-product-screenshots

- Refreshed the Capy Merge Spa product gallery with studio captures of all eight key screens (grid, album, shop, settings, Double Relax, detail, share moment, spa card).
- Added a settings screenshot on the support page.

### feat/app-ads-txt

- Added `app-ads.txt` at the site root (`www.corelogic.cc/app-ads.txt`) so AdMob can verify Capy Merge Spa.

### feat/capy-app-store-button

- Added a Download on the App Store badge and listing link on the Capy Merge Spa product page.

### captionbake/free-convert-to-mp4

- Documented free caption-optional export: convert MOV/MKV/WebM to social-ready MP4 without a caption file, or burn in when you have one.
- Updated Free vs Pro copy, feature cards, gallery captions, and HTTP API docs (optional `caption`, convert-only sample).

### feat/capy-merge-spa-support

- Added a Capy Merge Spa support page (contact, FAQ, app details) and linked it from the game home and privacy nav.

### docs/captionbake-windows-smartscreen-note

- Clarified the Windows SmartScreen / unsigned-installer warning under the download buttons (More info → Run anyway) with clearer styling.

### feat/captionbake-windows-downloads

- Added Windows x64 and ARM64 download buttons on the CaptionBake page (unsigned installer SmartScreen note included).
- Updated `config.js` for Windows release URLs and the homepage CaptionBake blurb for Mac + Windows.

### feat/captionbake-generate-screenshot

- Added a gallery screenshot showing Generate captions (Pro) after a video is loaded, with updated captions for the import flow.

### feat/captionbake-pro-checkout

- Wired CaptionBake Pro to the Lemon Squeezy checkout ($39 one-time, 1 Mac).
- Removed the unused monthly price mention from the product page.

### chore/captionbake-external-releases

- Point CaptionBake Apple Silicon downloads at `releases.corelogic.cc` instead of hosting the DMG in this repo.
- Keep local checksum files for the product-page Checksums link; update `downloads/README.md` for the new publish flow.

### fix/reeldispatch-hero-shot-size

- Capped the ReelDispatch hero screenshot width to better match CaptionBake’s product-page scale.
- Removed unused `.hero-mark` styles left over from the icon-based hero.

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

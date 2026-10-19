# WishMagic – Make Their Birthday Unforgettable

Static birthday-surprise generator: HTML, CSS, vanilla JS, SVG. No backend, database, API keys or paid services.

## Run locally
`python3 -m http.server 8000` in this folder, then open http://localhost:8000. (Any static server works; opening files directly also works, but links will use `file://` addresses.)

## Files
- `index.html` landing page, `create.html` creator + live preview, `surprise.html` recipient experience, `about.html`, `privacy.html`, `404.html`
- `assets/js/storage.js` encode/decode/validate links · `themes.js` six themes · `app.js` shared effects, music, helpers · `creator.js` · `surprise.js`
- `assets/css/` style, animations (includes reduced-motion rules), responsive
- `assets/images/` original SVG artwork

## How links work
`surprise.html?d=<Base64URL(JSON)>`. The JSON holds sender, recipient, message, theme, effects, optional date, schedule flag and music flag. The page decodes it, re-validates every field (length limits, allowed themes/effects, valid date), and renders text with `textContent` only. Links over 3000 characters are refused with a message (with the current field limits a link tops out around 2,500 characters, so this guard is a safety net).

## Honest limitations
- Links are **not private or encrypted**; anyone with a link can read it. Nothing is stored on a server, so WishMagic cannot list, edit or recover links.
- The midnight countdown uses the *recipient's device clock and time zone*. It works only while the page is open; it cannot send notifications or WhatsApp messages. It is not a lock: anyone can decode the link or change their clock.
- Music is a Happy Birthday melody synthesized with Web Audio (no audio files shipped). The page tries to autoplay it; browsers block sound before a user gesture, so it otherwise starts on the visitor's first tap or key press, and a small button mutes it. The melody is traditional; the song is public domain in the US, but check rules in your own country if you publish commercially.
- WhatsApp sharing opens `wa.me` with a URL-encoded message; the user sends it manually.
- Social previews: Open Graph tags are included, but platforms cache and decide previews themselves. Personalised previews are impossible without a server.
- Fonts are system fonts, so typography varies slightly by device.

## SEO setup
1. Replace `https://YOUR-DOMAIN.example` in every `<link rel="canonical">`, `og:url`, `sitemap.xml` and `robots.txt` with your real domain (`grep -r YOUR-DOMAIN .`).
2. Add a 1200×630 **PNG or JPG** and a tag such as `<meta property="og:image" content="https://your-domain/assets/images/og.png">` plus `<meta name="twitter:card" content="summary_large_image">` to `index.html`. SVG is not reliably supported for previews.
3. Submit `sitemap.xml` in Google Search Console. `surprise.html` is `noindex` on purpose.

## Testing
Checked with Node (link encode/decode, validation, malformed input) and Playwright/Chromium at a 390px viewport (flows listed in the delivery notes). Not tested: Safari/Firefox, real phones, real audio output, WhatsApp itself.

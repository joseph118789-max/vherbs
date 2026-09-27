# VHerbs — website

Static brochure website for VHerbs, a Malaysia-based halal-certified herbal and spice producer.
Built from media shared by Chung on 2026-09-26 via WhatsApp.

## What's here

```
~/projects/vherbs/
├── index.html         Home (hero, pillars, cert teaser)
├── about.html         About + MS1500 halal certification
├── facility.html      Facility tour (gallery with lightbox)
├── products.html      Product categories (placeholder)
├── contact.html       Contact info + form (placeholder)
├── css/styles.css     Single stylesheet (no framework)
├── js/main.js         Lightbox + form UX
└── assets/
    ├── logos/
    │   ├── vherbs-logo.png          Full VHerbs wordmark + leaves
    │   └── vherbs-logo-halal.png    Logo with Malaysia Halal seal (MS1500, 1 028-06/2025)
    ├── images/
    │   ├── 00-spice-flatlay.jpg     Spice/herb flat-lay (from Notes 240714_201820)
    │   ├── 01-ppe-with-apron.jpg    Staff PPE portrait, with apron
    │   ├── 02-ppe-no-apron.jpg      Staff PPE portrait, gown only
    │   ├── 03-hallway-receiving.jpg Receiving hallway with spice cartons
    │   ├── 04-rnd-prep-room.jpg     R&D / small-batch prep room
    │   ├── 05..07  finished-goods storage (3 angles)
    │   ├── 08-loading-dock.jpg      Loading dock with pallet jack
    │   └── 09-gowning-qc-entry.jpg  Gowning / handwash station
    └── documents/    (empty — reserved for future PDFs / brochures)
```

## Source media

The site was built entirely from media sent on 2026-09-26 between 01:53 and 01:57 UTC:

| File | Source | Used for |
|------|--------|----------|
| `Notes_240714_201820` PDF | Notes app export 2024-07-14 20:18:20 | spice flat-lay hero image |
| `Notes_250912_151635` PDF | Notes app export 2025-09-12 15:16:35 | logo with halal seal |
| `Notes_240714_201613` PDF | Notes app export 2024-07-14 20:16:13 | (alt) logo without seal |
| 9 JPGs from WhatsApp | same session | facility tour gallery |

The halal certification number "**MS 1500 / 1 028-06/2025**" is read from the rendered logo PDF
(Notes 250912 151635, expiry June 2025). No brochure content (the file
`Vherbs_Brochure_EN_FAOL_copy-1_240706_143909` referenced earlier) was available in
the inbound directory at build time — if it arrives, drop it in `assets/documents/`
and link from the footer or About page.

## What still needs to be filled in

These are placeholders to be replaced before the site is used commercially:

- **Address** — `contact.html` uses "Malaysia (specific address to be added)"
- **Phone** — placeholder `+60 (0) 000 000 000`
- **Email** — `hello@vherbs.com.my` (mailbox creation tracked separately)
- **Product SKUs, weights, prices, MOQs, lead times** — `products.html` shows categories only
- **Real product photography** — only facility photos are present, no product shots yet
- **Backend for the contact form** — currently shows a confirmation toast only; wire to
  Formspree / Netlify Forms / your own endpoint
- **Brochure content** — if/when the brochure PDF arrives, link it from About / footer

## Design decisions

- **Static site** — no framework, no build step. Drop the folder on any web host.
- **Single CSS file** — easy to theme. Brand colour (`--leaf: #9bc432`) is a CSS
  variable matching the lime green from the rendered logo.
- **Lightbox** — vanilla JS, no jQuery. Click any photo in the facility tour to enlarge.
- **Responsive** — collapses to single column under 800px wide.
- **Accessibility** — `aria-modal`, `aria-label`, semantic `<header>` / `<footer>` /
  `<article>` / `<figure>`, keyboard-closeable lightbox (`Escape`).

## How to view locally

```bash
cd ~/projects/vherbs
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly in a browser.

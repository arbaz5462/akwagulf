# Akwa Gulf — redesigned site

Static HTML/CSS/JS. No Bootstrap, jQuery, AOS or Font Awesome. Upload the contents of this folder to the site root (replacing the old files).

## What's here
- `index.html`, `products.html`, `contact.html` and the 7 product pages — **same file names as before**, so existing URLs and the `.htaccess` clean-URL rules keep working.
- `css/site.css` — the whole design system (colour, type, spacing tokens at the top).
- `js/site.js` — menu, product filter/search, Formspree forms, scroll reveals (about 4 KB).
- `fonts/` — Instrument Sans + Geist Mono, self-hosted WOFF2 (both SIL Open Font License).
- `assets/` — your existing images, renamed without spaces; logos trimmed; two large PNGs converted to WebP.
- `sitemap.xml`, `robots.txt`, favicon + apple-touch icon (cut from your logo mark).

## Things kept exactly
- Both Formspree endpoints (contact `mvgwyrqw`, quote `xwprvebn`).
- Google Search Console verification meta tag.
- All product copy and per-page brand lists.

## Not carried over (unused in the old site)
- `product-detail.html` (a template with sample specs, not linked anywhere)
- `products-data.js` (only used by that template)
- `custom.css` (replaced by `css/site.css`)

## Fixed from the old site
- Two different phone numbers (`+971 123 456 789` was a placeholder, also in the "Call Now" link) → `+971 504 835 663` everywhere.
- `deepwellpump.html` pointed at a missing image (`boosterpump.jpg`).
- Footer year is now automatic.
- Inconsistent logo files normalised to one grey-to-colour treatment.

## Please confirm before launch
1. The WhatsApp link uses `+971504835663` — confirm that number is on WhatsApp.
2. Business hours were copied from the old contact page.
3. "Available brands" lists come from the old product pages — confirm which are formal distributorships.
4. Product pages have no spec tables because the old site had no real specs. Add real datasheets/specs when you have them.

## Editing
Colour and type tokens are at the top of `css/site.css` (`:root`). Pages are plain HTML — edit them directly.

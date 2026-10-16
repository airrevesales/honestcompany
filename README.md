# Airreve — B2B Storefront (static reproduction)

A static, front-end-only reproduction of the Airreve B2B storefront originally served at
<https://store.tflowx.com/airreve>. All content (company profile, catalogue, product
descriptions, media posts, FAQ) was transcribed from that site; the visual design system
(tokens, typography scale, spacing, section grid, cards, table, footer) was reverse-engineered
from its rendered CSS and rebuilt by hand as clean, readable HTML/CSS/JS with no framework or
build step.

## Project goals

- Reproduce the Airreve storefront's **look, structure and content** faithfully.
- Stay entirely **static**: HTML + CSS + vanilla JS, no backend, no server-side rendering.
- Keep the B2B essentials working client-side: catalogue filtering, product detail with gallery,
  a quote cart, a quote-request form persisted through the Table API, a bilingual (EN/KO) toggle
  and an assistant that answers from the site's own content.

## Pages and entry URIs

| Path | Page | Notes |
| --- | --- | --- |
| `index.html` | Home | Hero (photo + veil), About Us, featured product grid, Contact Us |
| `products.html` | Products list | Search, category chips, category/MOQ/sort selects, grid ⇄ table view |
| `product-75.html` | Product detail | `KOOL UP Shower Roll Body Refresh (Sample)` — MOQ 1 |
| `product-55.html` | Product detail | `Kool Up Large Shower Roll` — MOQ 30 |
| `company.html` | Company | Terms, introduction, certifications, export markets, location, quote panel |
| `media.html` | Media list | All / Blog tabs, post feed |
| `media-koolup-catalog.html` | Post | Airreve Koolup Catalog (Eng) |
| `media-postpartum.html` | Post | One-sheet care solution for new moms |
| `media-vietnam-golf.html` | Post | Staying refreshed on a Vietnam golf round |
| `media-hocl.html` | Post | Hypochlorous acid (HOCl) explainer |
| `faq.html` | FAQ | 7 collapsible Q&A items (source content is Korean) |

Pages opt into shared chrome through `body[data-page]`; detail pages add `data-product="75"` /
`data-product="55"` or `data-post="<uuid>"`.

## Currently completed features

- **Design system** (`css/style.css`) — token layer (brand blue `#1565c0` palette, cream/ink
  neutrals, elevation, radii), type scale (`--h1-size: 64px` down to `--spec-size: 12px`),
  8/16/24/32/48/64/96px spacing scale, `.sf-sec` section padding system, `.sf-wrap` 1280px
  content column.
- **Responsive shell** — sticky desktop nav with brand rule and EN/KO toggle; below 900px it
  swaps to a mobile top bar, a fixed 5-item bottom tab bar and a slide-down sheet menu;
  below 640px product listings collapse from table to stacked cards and the product gallery
  becomes a swipeable snap carousel with a sticky Add / View cart bar.
- **Products list** — live text search (name/summary/id), category chips + category select,
  MOQ ceiling filter (1/10/50/100), sorting (most requested / lowest MOQ / newest), and
  grid ⇄ table view toggle; grouping by category in both views; empty state.
- **Product detail** — image gallery (thumbnail rail + arrows on desktop, dots + swipe on
  mobile), badges, terms box, Add to quote cart / View cart, description, specifications
  definition list, 10-item certification strip, related products.
- **Quote cart** — localStorage-backed slide-over panel, add/remove, count badge, item links.
- **Quote request form** — slide-over form posting to the `quote_requests` table via the
  Table API, echoing current quote-cart contents, EN/KO validation messages, inline status.
- **Bilingual toggle (EN/KO)** — `js/data.js` holds an i18n dictionary; the toggle re-renders
  dynamic blocks in place. Content that exists only in Korean (FAQ answers) is preserved
  verbatim as in the source.
- **Assistant widget** — deterministic keyword-matched answers built from this site's own
  catalogue, specification, certification, FAQ and company content, with action chips that
  open the quote form or jump to a relevant page. **No external LLM/API call.**
- **Image lightbox** — click any product or banner figure to enlarge it.
- **Accessibility** — semantic landmarks, breadcrumbs, `aria-expanded`/`aria-controls` on the
  FAQ accordion and gallery controls, `aria-modal` dialogs, focus-visible outlines, and
  `prefers-reduced-motion` handling.

## Data models and storage

### Table API — `quote_requests`

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | text | Record identifier (system-managed) |
| `name` | text | Contact name (required client-side) |
| `company` | text | Company name |
| `email` | text | Contact email (required client-side) |
| `country` | text | Buyer country |
| `quantity` | text | Estimated order quantity |
| `message` | rich_text | Inquiry detail (required client-side) |
| `items` | text | Quote-cart product names joined with `|` |
| `language` | text | UI language at submit time (`en`/`ko`) |

Written with `POST tables/quote_requests` from `js/app.js`.

### Client-side storage

- `airreve.cart` — quote-cart line items (id, name, image, MOQ, detail-page slug).
- `airreve.lang` — selected UI language.

### Static content (`js/data.js`)

`window.AIRREVE` exposes `i18n`, `company`, `companyTerms`, `markets`, `products`, `faq`,
`posts`, `knowledge` (assistant rules) and `suggested` (assistant prompt chips). All product
images, banner art and blog imagery are loaded from the original public CDN
(`cnxxaoru6nyd.compat.objectstorage.ap-seoul-1.oraclecloud.com/tflow-public/…`).

## File structure

```
index.html  products.html  company.html  media.html  faq.html
product-75.html  product-55.html
media-koolup-catalog.html  media-postpartum.html
media-vietnam-golf.html  media-hocl.html
css/style.css        design system + responsive rules
js/data.js           all site content + i18n + assistant knowledge
js/chrome.js         shared nav / mobile chrome / footer
js/app.js            i18n engine, cart, quote form, assistant, page renderers
js/home.js           home featured-product cards
js/detail.js         product-detail and media-post shells
```

## Features not yet implemented

- **B2B sign-up / account area.** The source site prompts "No account required" and offers a
  member flow; no server-side auth or user sessions are possible on a static site, so this is
  intentionally omitted.
- **Real cart checkout and RFQ submission pipeline.** Requests land in the `quote_requests`
  table; nothing emails or notifies a sales team (that needs a backend).
- **Live assistant.** Answers are deterministic keyword matches over local content, not a
  language model.
- **Pagination on the product list.** The catalogue has 2 items, so all rows render at once.
- **Media detail pages with video/press kinds.** Only the 4 blog posts present on the source
  site exist; the `lv-kind--video` / `lv-kind--press` styling is in place but unused.
- **Sitemap / robots.txt, per-page Open Graph tags.** Currently only the original meta
  description is carried over.

## Recommended next steps

1. Add Open Graph / Twitter card tags per page (the source site has them) and a `sitemap.xml`.
2. Extend the assistant to a retrieval layer over `js/data.js` if the catalogue grows past a
   few dozen products.
3. If a real sales pipeline is needed, connect the quote form to a backend or a form service —
   the Table API only stores rows.
4. Consider promoting the product/posts arrays to Table API tables if the catalogue should be
   editable without a redeploy.
5. Add an `aria-live` announcement when products are filtered, and a `noscript` fallback that
   lists the catalogue inline.

## Public URLs

- Original source (reference): <https://store.tflowx.com/airreve>
- Data API used at runtime: relative `tables/quote_requests` on whatever origin serves the site.
- Production URL: assigned by the Publish tab / Hosted Deploy (e.g. `*.vip.gensparksite.com`).

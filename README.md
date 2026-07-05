# Mayspear Global — Next.js

The Mayspear Global website, converted to a **Next.js 14 (App Router)** project.
Statically exportable — deploys to any host (Vercel, Netlify, Cloudflare Pages,
GitHub Pages, S3).

## Run locally

```bash
cd mayspear-next
npm install
npm run dev
```

Open http://localhost:3000

## Build a static site

```bash
npm run build      # outputs a fully static site to ./out
```

Deploy the `out/` folder to any static host. On Vercel, just import the repo —
no settings needed.

## How it is structured

```
app/
  layout.js            Root layout: fonts, global CSS, <html>/<body>
  globals.css          Resets, keyframes, responsive rules, link hovers
  [[...slug]]/page.js  One dynamic route renders every page from /content
components/
  Nav.js               Sticky nav — mobile menu, Submit-a-Deal modal,
                       Salon modal, exit-intent promo (React client component)
  Footer.js            Footer + cookie-consent bar (React client component)
  PageBody.js          Injects a page's HTML and runs scroll-reveal,
                       client-side internal links, and form confirmations
content/
  *.html               The 20 pages' markup, one file per route
lib/
  routes.js            URL <-> content-file <-> page-title map
  style.js             CSS-string -> React style-object helper
```

### Adding or editing a page

1. Edit the relevant file in `content/` (plain HTML with inline styles), **or**
   add a new one and register it in `lib/routes.js` (and `NAV_KEY` in
   `app/[[...slug]]/page.js` if it should highlight a nav item).
2. Internal links use absolute paths (`/firm`, `/insights/africa`) and are
   upgraded to client-side navigation automatically.

## Routes

`/` home · `/firm` · `/approach` · `/platform` · `/edge` · `/mandate` ·
`/desks` · `/markets` · `/network` · `/partners` · `/leadership` · `/insights`
(+ `/insights/private-credit`, `/insights/africa`, `/insights/energy`,
`/insights/succession`) · `/salon` · `/opportunities` · `/contact` · `/careers`

## Notes on the conversion

- **Nav, Footer, all modals, the mobile menu, the cookie bar, scroll-reveal
  animations, and the Contact / Opportunities forms are fully interactive.**
- Page body content was flattened to static HTML from the original components,
  so it renders identically and is fast to serve.
- The **Platform** "capability" tiles and **Leadership** "bio" tiles were
  click-to-open detail modals in the original. The tiles and their summaries
  render, but the deep-dive modal is not yet re-wired in this build. If you want
  those restored as React modals, that's a quick follow-up.
- Brand accent is the gold `#B89B6A` (CSS var `--accent`). Fonts: Libre Caslon
  Display/Text, Archivo, IBM Plex Mono (loaded from Google Fonts).

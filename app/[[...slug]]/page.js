import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { notFound } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import PageBody from '@/components/PageBody';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// Maps a content file -> the Nav highlight key.
const NAV_KEY = {
  home: 'home', firm: 'firm', platform: 'platform', edge: 'edge', markets: 'markets',
  leadership: 'leadership', partners: 'partners', mandate: 'mandate', desks: 'desks',
  network: 'network', salon: 'salon', careers: 'careers', contact: 'contact',
  insights: 'insights', 'insight-private-credit': 'insights', 'insight-africa': 'insights',
  'insight-energy': 'insights', 'insight-succession': 'insights',
};

// Use __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.join(__dirname, '..', '..', 'content');

function findRoute(slug) {
  const s = slug || [];
  return ROUTES.find(
    (r) => r.slug.length === s.length && r.slug.every((seg, i) => seg === s[i])
  );
}

export function generateStaticParams() {
  // `[]` (home) must be represented as `{ slug: undefined }` for an optional catch-all.
  return ROUTES.map((r) => ({ slug: r.slug.length ? r.slug : undefined }));
}

export function generateMetadata({ params }) {
  const route = findRoute(params.slug);
  return { title: route ? route.title : 'Mayspear Global' };
}

export default function Page({ params }) {
  const route = findRoute(params.slug);
  if (!route) notFound();
  const file = path.join(CONTENT_DIR, `${route.file}.html`);
  let html = '';
  try {
    html = fs.readFileSync(file, 'utf8');
  } catch {
    notFound();
  }
  return (
    <>
      <Nav current={NAV_KEY[route.file] || ''} />
      <PageBody html={html} />
      <Footer />
    </>
  );
}

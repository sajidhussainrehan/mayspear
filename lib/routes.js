// Central route map. `slug` is the URL path segments; `file` is the captured
// HTML in /content; `dc` is the original Design Component filename.
export const ROUTES = [
  { slug: [],                          file: 'home',            dc: 'Mayspear Global.dc.html',         title: 'Mayspear Global | Principal Investment & Private Capital at Institutional Scale' },
  { slug: ['firm'],                    file: 'firm',            dc: 'Firm.dc.html',                    title: 'The Firm | Mayspear Global' },
  { slug: ['approach'],                file: 'approach',        dc: 'Approach.dc.html',                title: 'Approach | Mayspear Global' },
  { slug: ['platform'],                file: 'platform',        dc: 'Platform.dc.html',                title: 'Platform | Mayspear Global' },
  { slug: ['edge'],                    file: 'edge',            dc: 'Edge.dc.html',                    title: 'The Edge | Mayspear Global' },
  { slug: ['mandate'],                 file: 'mandate',         dc: 'Mandate.dc.html',                 title: 'Mandate | Mayspear Global' },
  { slug: ['desks'],                   file: 'desks',           dc: 'Desks.dc.html',                   title: 'Desks | Mayspear Global' },
  { slug: ['markets'],                 file: 'markets',         dc: 'Markets.dc.html',                 title: 'Markets | Mayspear Global' },
  { slug: ['network'],                 file: 'network',         dc: 'Network.dc.html',                 title: 'Network | Mayspear Global' },
  { slug: ['partners'],                file: 'partners',        dc: 'Partners.dc.html',                title: 'Partners | Mayspear Global' },
  { slug: ['leadership'],              file: 'leadership',      dc: 'Leadership.dc.html',              title: 'Leadership | Mayspear Global' },
  { slug: ['insights'],                file: 'insights',        dc: 'Insights.dc.html',                title: 'Insights | Mayspear Global' },
  { slug: ['insights','private-credit'], file: 'insight-private-credit', dc: 'Insight-PrivateCredit.dc.html', title: 'The Sub-$50M Credit Gap | Mayspear Insights' },
  { slug: ['insights','africa'],       file: 'insight-africa',  dc: 'Insight-Africa.dc.html',          title: 'Africa Trade Finance | Mayspear Insights' },
  { slug: ['insights','energy'],       file: 'insight-energy',  dc: 'Insight-Energy.dc.html',          title: 'Energy Capital | Mayspear Insights' },
  { slug: ['insights','succession'],   file: 'insight-succession', dc: 'Insight-Succession.dc.html',   title: 'Succession Buyouts | Mayspear Insights' },
  { slug: ['salon'],                   file: 'salon',           dc: 'Salon.dc.html',                   title: 'The Salon | Mayspear Global' },
  { slug: ['opportunities'],           file: 'opportunities',   dc: 'Opportunities.dc.html',           title: 'Opportunities | Mayspear Global' },
  { slug: ['contact'],                 file: 'contact',         dc: 'Contact.dc.html',                 title: 'Contact | Mayspear Global' },
  { slug: ['careers'],                 file: 'careers',         dc: 'Careers.dc.html',                 title: 'Careers | Mayspear Global' },
];

// Maps an original DC filename -> Next.js path, used to rewrite internal links.
export const DC_TO_PATH = ROUTES.reduce((m, r) => {
  m[r.dc] = '/' + r.slug.join('/');
  return m;
}, {});

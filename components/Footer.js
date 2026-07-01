'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { s } from '@/lib/style';

const SpearMark = () => (
  <svg width="20" height="30" viewBox="0 0 20 30" fill="none" style={{ flex: 'none', display: 'block' }}>
    <path d="M10 0 L16 9 L10 14 L4 9 Z" fill="var(--accent,#B89B6A)" />
    <path d="M10 14 L11.1 9.5 L10 0 L8.9 9.5 Z" fill="#0A0907" opacity="0.28" />
    <rect x="9.25" y="12.5" width="1.5" height="17.5" fill="var(--accent,#B89B6A)" />
    <rect x="5.5" y="16" width="9" height="1.4" fill="var(--accent,#B89B6A)" />
  </svg>
);

const COL = (title, links) => ({ title, links });
const COLS = [
  COL('Platform', [
    ['Investment mandate', '/mandate'],
    ['Principal investing', '/platform'],
    ['Private credit', '/platform'],
    ['Private equity', '/platform'],
    ['Restructuring & refinancing', '/platform'],
    ['Special situations', '/platform'],
    ['Infrastructure & real assets', '/platform'],
    ['Capital formation', '/platform'],
  ]),
  COL('Firm', [
    ['The firm', '/firm'],
    ['The edge', '/edge'],
    ['Markets & offices', '/markets'],
    ['Desks', '/desks'],
    ['Leadership', '/leadership'],
    ['Insights', '/insights'],
    ['People & careers', '/careers'],
  ]),
];

const ENGAGE = [
  ['The network', '/network'],
  ['Capital partners', '/partners'],
  ['Submit a deal', '/opportunities'],
  ['The salon', '/salon'],
  ['Contact', '/contact'],
];

const linkStyle = s('font-size:13.5px;color:#9A9081;transition:color .2s');
const colHead = s("font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:#8B8273;margin-bottom:18px");

export default function Footer() {
  const [showCookie, setShowCookie] = useState(false);
  useEffect(() => {
    let ok = null;
    try { ok = localStorage.getItem('ms_cookie_consent'); } catch (e) {}
    if (!ok) setShowCookie(true);
  }, []);
  const setConsent = (v) => {
    try { localStorage.setItem('ms_cookie_consent', v); } catch (e) {}
    setShowCookie(false);
  };

  return (
    <footer style={s('background:#0A0907;border-top:1px solid rgba(184,155,106,0.16)')}>
      <div style={s('max-width:1320px;margin:0 auto;padding:clamp(60px,7vw,92px) clamp(22px,4vw,52px) 38px')}>
        <div data-fcols style={s('display:grid;grid-template-columns:1.5fr 1fr 1fr 1.1fr;gap:clamp(28px,4vw,52px)')}>
          <div style={s('min-width:230px')}>
            <Link href="/" style={s('display:flex;align-items:center;gap:13px;margin-bottom:22px')}>
              <SpearMark />
              <span style={s("font-family:'Libre Caslon Text',serif;font-size:18px;letter-spacing:.18em;color:#F1ECE2")}>MAYSPEAR</span>
            </Link>
            <p style={s("font-family:'Libre Caslon Display',serif;font-size:clamp(20px,2vw,27px);line-height:1.22;color:#C7BEAE;max-width:24ch")}>We invest. We structure. We advise. We execute.</p>
            <div style={s("margin-top:24px;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;color:#8B8273;line-height:1.9")}>PRINCIPAL PRIVATE CAPITAL<br />SHERIDAN · NEW YORK · LONDON · LAGOS · DUBAI · SINGAPORE</div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div style={colHead}>{c.title}</div>
              <div style={s('display:flex;flex-direction:column;gap:11px')}>
                {c.links.map(([label, href], i) => (
                  <Link key={i} href={href} className="ms-footlink" style={linkStyle}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div style={colHead}>Engage</div>
            <div style={s('display:flex;flex-direction:column;gap:11px;margin-bottom:22px')}>
              {ENGAGE.map(([label, href], i) => (
                <Link key={i} href={href} className="ms-footlink" style={linkStyle}>{label}</Link>
              ))}
            </div>
            <div style={s("font-family:'Libre Caslon Text',serif;font-size:14.5px;color:#C7BEAE;line-height:1.55;margin-bottom:12px")}>30 N Gould Street, Ste R<br />Sheridan, Wyoming 82801</div>
            <a href="mailto:enquiries@mayspear.com" className="ms-footlink" style={linkStyle}>enquiries@mayspear.com</a>
          </div>
        </div>
        <div style={s('margin-top:50px;padding-top:26px;border-top:1px solid rgba(184,155,106,.14)')}>
          <p style={s('font-size:11.5px;line-height:1.7;color:#8B8273;max-width:120ch')}>Mayspear Global is a principal private capital firm. The information on this website is provided for general information only and is a description of the firm and its activities. It is not, and must not be construed as, an offer, solicitation, invitation, inducement, or recommendation to buy, sell, subscribe for, or enter into any financial product, security, loan, fund interest, or transaction, nor as financial, investment, legal, tax, or other advice. Nothing on this website should be relied upon as a representation that Mayspear Global holds any particular regulatory authorisation, manages any specified assets, has completed any specified transactions, or has any specified capital available. Capital deployment is subject to applicable legal, regulatory and sanctions frameworks. The value of any capital position can fall as well as rise.</p>
          <div style={s('display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-top:24px')}>
            <span style={s("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;color:#8B8273")}>© 2026 Mayspear Global LLC. Registered in Wyoming, United States.</span>
            <div style={s('display:flex;gap:24px')}>
              {['Important Information', 'Privacy', 'Cookies'].map((t) => (
                <a key={t} href="#" className="ms-footlink" style={s("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;color:#8B8273;transition:color .2s")}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCookie && (
        <div style={s('position:fixed;left:0;right:0;bottom:0;z-index:95;background:rgba(10,9,7,0.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid rgba(184,155,106,.24)')}>
          <div data-cookiebar style={s('max-width:1320px;margin:0 auto;padding:18px clamp(22px,4vw,52px);display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap')}>
            <p style={s('font-size:12.5px;line-height:1.6;color:#9A9081;max-width:74ch;margin:0')}>We use cookies to operate this site, understand how it is used, and improve your experience. By selecting <span style={s('color:#C7BEAE')}>Accept</span>, you consent to our use of cookies. See our Cookies and Privacy notices for detail.</p>
            <div style={s('display:flex;align-items:center;gap:12px;flex:none')}>
              <button onClick={() => setConsent('declined')} style={s("background:transparent;border:1px solid rgba(241,236,226,.22);color:#C7BEAE;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:12px 20px;transition:border-color .25s")}>Decline</button>
              <button onClick={() => setConsent('accepted')} style={s("background:var(--accent,#B89B6A);border:none;color:#0C0B09;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:12px 24px;transition:background .25s")}>Accept</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

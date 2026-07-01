'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { s } from '@/lib/style';

const BASE = [
  { label: 'The Firm', href: '/firm', key: 'firm', top: true },
  { label: 'Platform', href: '/platform', key: 'platform', top: true },
  { label: 'The Edge', href: '/edge', key: 'edge', top: true },
  { label: 'Markets', href: '/markets', key: 'markets', top: true },
  { label: 'Insights', href: '/insights', key: 'insights', top: true },
  { label: 'Leadership', href: '/leadership', key: 'leadership', top: true },
  { label: 'Partners', href: '/partners', key: 'partners', top: true },
  { label: 'Mandate', href: '/mandate', key: 'mandate', top: false },
  { label: 'Desks', href: '/desks', key: 'desks', top: false },
  { label: 'Network', href: '/network', key: 'network', top: false },
  { label: 'Salon', href: '/salon', key: 'salon', top: false },
  { label: 'Careers', href: '/careers', key: 'careers', top: false },
  { label: 'Contact', href: '/contact', key: 'contact', top: false },
];

export default function Nav({ current = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null); // 'deal' | 'salon' | null
  const [dealSent, setDealSent] = useState(false);
  const [salonSent, setSalonSent] = useState(false);
  const [dealEmail, setDealEmail] = useState('');
  const [salonEmail, setSalonEmail] = useState('');

  // Exit-intent / timed "Submit a Deal" promo (matches original behaviour).
  useEffect(() => {
    const skip = ['salon', 'contact', 'opportunities', 'careers'];
    let timer, exit;
    try {
      if (localStorage.getItem('ms_deal_promo') || skip.includes(current)) return;
    } catch (e) {
      return;
    }
    const fire = () => {
      try { if (localStorage.getItem('ms_deal_promo')) return; } catch (e) {}
      if (exit) { document.removeEventListener('mouseout', exit); exit = null; }
      setModal((m) => (m ? m : 'deal'));
    };
    exit = (e) => { if (e.clientY <= 0 && !e.relatedTarget) fire(); };
    document.addEventListener('mouseout', exit);
    timer = setTimeout(fire, 45000);
    return () => { clearTimeout(timer); if (exit) document.removeEventListener('mouseout', exit); };
  }, [current]);

  const closeModal = () => {
    try { localStorage.setItem('ms_deal_promo', '1'); } catch (e) {}
    setModal(null);
  };
  const deco = (l) => ({
    ...l,
    col: l.key === current ? '#F1ECE2' : '#B7AE9E',
    ul: l.key === current ? 'var(--accent,#B89B6A)' : 'transparent',
    mcol: l.key === current ? 'var(--accent,#B89B6A)' : '#F1ECE2',
  });
  const topLinks = BASE.filter((l) => l.top).map(deco);
  const allLinks = BASE.map(deco);
  const showLauncher = current !== 'salon';

  const Spear = () => (
    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" style={{ flex: 'none', display: 'block' }}>
      <path d="M10 0 L16 9 L10 14 L4 9 Z" fill="var(--accent,#B89B6A)" />
      <path d="M10 14 L11.1 9.5 L10 0 L8.9 9.5 Z" fill="#0A0907" opacity="0.28" />
      <rect x="9.25" y="12.5" width="1.5" height="17.5" fill="var(--accent,#B89B6A)" />
      <rect x="5.5" y="16" width="9" height="1.4" fill="var(--accent,#B89B6A)" />
    </svg>
  );

  return (
    <>
      <div style={s('position:sticky;top:0;z-index:50;background:rgba(10,9,7,0.94);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,155,106,0.16)')}>
        <div data-navpad style={s('max-width:1320px;margin:0 auto;padding:0 clamp(22px,4vw,52px);height:74px;display:flex;align-items:center;justify-content:space-between')}>
          <Link href="/" style={s('display:flex;align-items:center;gap:13px')}>
            <Spear />
            <span style={s('display:flex;flex-direction:column;line-height:1')}>
              <span style={s("font-family:'Libre Caslon Text',serif;font-size:18px;letter-spacing:.18em;color:#F1ECE2")}>MAYSPEAR</span>
              <span style={s("font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:.4em;color:#8B8273;margin-top:3px")}>GLOBAL · PRINCIPAL CAPITAL</span>
            </span>
          </Link>
          <div data-desk style={s('display:flex;align-items:center;gap:20px')}>
            {topLinks.map((l) => (
              <Link key={l.key} href={l.href} className="ms-navlink"
                style={s(`font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;color:${l.col};border-bottom:2px solid ${l.ul};padding-bottom:3px;transition:color .25s`)}>
                {l.label}
              </Link>
            ))}
            <Link href="/opportunities" className="ms-navcta"
              style={s("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.13em;text-transform:uppercase;white-space:nowrap;color:#0C0B09;background:var(--accent,#B89B6A);padding:11px 18px;transition:background .25s")}>
              Submit a Deal
            </Link>
          </div>
          <button data-mob onClick={() => setMenuOpen((v) => !v)}
            style={s('display:none;align-items:center;justify-content:center;width:42px;height:42px;background:transparent;border:1px solid rgba(241,236,226,.22);cursor:pointer;flex-direction:column;gap:5px')}>
            <span style={s('width:18px;height:1px;background:#F1ECE2;display:block')}></span>
            <span style={s('width:18px;height:1px;background:#F1ECE2;display:block')}></span>
            <span style={s('width:18px;height:1px;background:#F1ECE2;display:block')}></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={s('position:fixed;inset:0;z-index:80;background:#0A0907;display:flex;flex-direction:column;padding:26px clamp(22px,6vw,52px)')}>
          <div style={s('display:flex;align-items:center;justify-content:space-between;height:46px')}>
            <span style={s("font-family:'Libre Caslon Text',serif;font-size:18px;letter-spacing:.18em;color:#F1ECE2")}>MAYSPEAR</span>
            <button onClick={() => setMenuOpen(false)} style={s('background:transparent;border:1px solid rgba(241,236,226,.22);width:42px;height:42px;cursor:pointer;font-size:22px;color:#F1ECE2;line-height:1')}>×</button>
          </div>
          <div style={s('display:flex;flex-direction:column;margin-top:34px;overflow-y:auto')}>
            {allLinks.map((l) => (
              <Link key={l.key} href={l.href} onClick={() => setMenuOpen(false)}
                style={s(`font-family:'Libre Caslon Display',serif;font-size:clamp(24px,5vw,30px);color:${l.mcol};padding:13px 0;border-bottom:1px solid rgba(184,155,106,.14)`)}>
                {l.label}
              </Link>
            ))}
            <Link href="/opportunities" onClick={() => setMenuOpen(false)}
              style={s("font-family:'Libre Caslon Display',serif;font-size:clamp(24px,5vw,30px);color:var(--accent,#B89B6A);padding:13px 0")}>
              Submit a Deal
            </Link>
          </div>
        </div>
      )}

      {showLauncher && (
        <button onClick={() => setModal('salon')} aria-label="Request a seat at the Mayspear Salon"
          style={s("position:fixed;bottom:26px;right:26px;z-index:120;display:flex;align-items:center;gap:11px;background:#0B0A08;border:1px solid rgba(184,155,106,.32);color:#EFE7D8;padding:13px 17px;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;box-shadow:0 16px 44px rgba(0,0,0,.5);animation:msPill .6s ease both;transition:border-color .25s,background .25s")}>
          <span style={s('width:7px;height:7px;background:var(--accent,#B89B6A);transform:rotate(45deg);flex:none')}></span>
          The Salon · By Invitation
        </button>
      )}

      {modal === 'deal' && (
        <div onClick={closeModal} style={s('position:fixed;inset:0;z-index:200;background:rgba(7,6,4,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:22px;animation:msFade .3s ease both')}>
          <div onClick={(e) => e.stopPropagation()} style={s('position:relative;width:100%;max-width:548px;background:#0B0A08;border:1px solid rgba(184,155,106,.26);box-shadow:0 34px 90px rgba(0,0,0,.62);animation:msPop .5s cubic-bezier(.2,.8,.2,1) both;overflow:hidden')}>
            <div style={s('position:absolute;inset:0;background-image:linear-gradient(rgba(184,155,106,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,155,106,.05) 1px,transparent 1px);background-size:38px 38px;pointer-events:none')}></div>
            <button onClick={closeModal} aria-label="Close" style={s('position:absolute;top:14px;right:14px;z-index:3;width:38px;height:38px;background:transparent;border:1px solid rgba(241,236,226,.16);color:#C7BEAE;font-size:20px;line-height:1;cursor:pointer;transition:border-color .25s')}>×</button>
            <div style={s('position:relative;z-index:2;padding:clamp(30px,5vw,46px)')}>
              {!dealSent ? (
                <>
                  <div style={s('display:flex;align-items:center;gap:13px;margin-bottom:22px')}><span style={s('width:30px;height:1px;background:var(--accent,#B89B6A)')}></span><span style={s("font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#A99E89")}>Principal Capital · $1M – $5BN</span></div>
                  <h2 style={s("font-family:'Libre Caslon Display',serif;font-weight:400;font-size:clamp(27px,4.4vw,38px);line-height:1.05;letter-spacing:-.012em;color:#F4EFE6;max-width:15ch")}>Have a transaction the market won&rsquo;t fund?</h2>
                  <p style={s("margin-top:16px;font-size:14.5px;line-height:1.66;color:#B3AA9A;max-width:47ch")}>We commit our own balance sheet where banks and mega-funds cannot move, across secured credit, special situations, asset-based lending and securitisation. Tell us where to send a confidential review.</p>
                  <div style={s('display:flex;flex-wrap:wrap;gap:8px;margin-top:20px')}>
                    {['ABL', 'ABS', 'Private Credit', 'Special Situations', 'DIP & Rescue'].map((t) => (
                      <span key={t} style={s("font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:#CCC2AF;border:1px solid rgba(184,155,106,.3);padding:5px 9px")}>{t}</span>
                    ))}
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); try { localStorage.setItem('ms_deal_promo', '1'); } catch (_) {} setDealSent(true); }} style={s('margin-top:26px;display:flex;flex-direction:column;gap:11px')}>
                    <input className="ms-field" type="email" required value={dealEmail} onChange={(e) => setDealEmail(e.target.value)} placeholder="Work email" style={s("width:100%;background:#0F0D0A;border:1px solid rgba(184,155,106,.26);color:#F1ECE2;font-family:'IBM Plex Mono',monospace;font-size:13px;padding:14px 15px;outline:none;box-sizing:border-box;transition:border-color .25s")} />
                    <button type="submit" style={s("width:100%;background:var(--accent,#B89B6A);color:#0C0B09;border:none;font-family:'IBM Plex Mono',monospace;font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:15px;cursor:pointer;transition:background .25s")}>Request a confidential review</button>
                  </form>
                  <div style={s('display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:18px;padding-top:18px;border-top:1px solid rgba(184,155,106,.14)')}>
                    <Link href="/opportunities" onClick={closeModal} style={s("font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent,#B89B6A)")}>Submit full deal details →</Link>
                    <span style={s("font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.05em;color:#8B8273")}>Strict confidence</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={s('display:flex;align-items:center;gap:13px;margin-bottom:20px')}><span style={s('width:9px;height:9px;background:var(--accent,#B89B6A);transform:rotate(45deg)')}></span><span style={s("font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#A99E89")}>Request received</span></div>
                  <h2 style={s("font-family:'Libre Caslon Display',serif;font-weight:400;font-size:clamp(26px,4vw,36px);line-height:1.07;letter-spacing:-.012em;color:#F4EFE6;max-width:16ch")}>Thank you. A principal will be in touch.</h2>
                  <p style={s("margin-top:16px;font-size:14.5px;line-height:1.66;color:#B3AA9A;max-width:46ch")}>Expect a direct, confidential response within two business days. For a faster review, submit full deal details through our transactions desk.</p>
                  <div style={s('display:flex;flex-wrap:wrap;gap:12px;margin-top:26px')}>
                    <Link href="/opportunities" onClick={closeModal} style={s("display:inline-flex;align-items:center;gap:10px;background:var(--accent,#B89B6A);color:#0C0B09;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:13px 18px")}>Submit full details →</Link>
                    <button onClick={closeModal} style={s("background:transparent;border:1px solid rgba(241,236,226,.2);color:#C7BEAE;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:13px 18px;cursor:pointer")}>Close</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {modal === 'salon' && (
        <div onClick={closeModal} style={s('position:fixed;inset:0;z-index:200;background:rgba(6,5,4,.84);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:22px;animation:msFade .3s ease both')}>
          <div onClick={(e) => e.stopPropagation()} style={s('position:relative;width:100%;max-width:520px;background:#0A0907;border:1px solid rgba(184,155,106,.3);box-shadow:0 34px 90px rgba(0,0,0,.66);animation:msPop .5s cubic-bezier(.2,.8,.2,1) both;overflow:hidden')}>
            <div style={s('height:3px;background:linear-gradient(90deg,transparent,var(--accent,#B89B6A),transparent)')}></div>
            <button onClick={closeModal} aria-label="Close" style={s('position:absolute;top:16px;right:14px;z-index:3;width:38px;height:38px;background:transparent;border:1px solid rgba(241,236,226,.16);color:#C7BEAE;font-size:20px;line-height:1;cursor:pointer;transition:border-color .25s')}>×</button>
            <div style={s('position:relative;z-index:2;padding:clamp(32px,5vw,48px)')}>
              {!salonSent ? (
                <>
                  <div style={s("font-family:'Libre Caslon Display',serif;font-style:italic;font-size:30px;color:var(--accent,#B89B6A);line-height:1;margin-bottom:20px")}>The Mayspear Salon</div>
                  <div style={s('display:flex;align-items:center;gap:13px;margin-bottom:20px')}><span style={s('width:30px;height:1px;background:var(--accent,#B89B6A)')}></span><span style={s("font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#A99E89")}>By Invitation · Four Cities · Once a Year</span></div>
                  <h2 style={s("font-family:'Libre Caslon Display',serif;font-weight:400;font-size:clamp(26px,4.2vw,38px);line-height:1.05;letter-spacing:-.012em;color:#F4EFE6;max-width:15ch")}>A seat at our private table.</h2>
                  <p style={s("margin-top:16px;font-size:14.5px;line-height:1.68;color:#B3AA9A;max-width:46ch")}>One closed evening in each Mayspear city, for the principals, allocators and owners behind the firm. One table, one night. No panels, no pitch, no audience. Request to be considered.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSalonSent(true); }} style={s('margin-top:26px;display:flex;flex-direction:column;gap:11px')}>
                    <input className="ms-field" type="email" required value={salonEmail} onChange={(e) => setSalonEmail(e.target.value)} placeholder="Email for your invitation" style={s("width:100%;background:#0F0D0A;border:1px solid rgba(184,155,106,.26);color:#F1ECE2;font-family:'IBM Plex Mono',monospace;font-size:13px;padding:14px 15px;outline:none;box-sizing:border-box;transition:border-color .25s")} />
                    <button type="submit" style={s("width:100%;background:var(--accent,#B89B6A);color:#0C0B09;border:none;font-family:'IBM Plex Mono',monospace;font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:15px;cursor:pointer;transition:background .25s")}>Request a seat</button>
                  </form>
                  <div style={s('display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:18px;padding-top:18px;border-top:1px solid rgba(184,155,106,.14)')}>
                    <Link href="/salon" onClick={closeModal} style={s("font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent,#B89B6A)")}>Inside the Salon →</Link>
                    <span style={s("font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.05em;color:#8B8273")}>LPs & family offices</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={s('display:flex;align-items:center;gap:13px;margin-bottom:20px')}><span style={s('width:9px;height:9px;background:var(--accent,#B89B6A);transform:rotate(45deg)')}></span><span style={s("font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#A99E89")}>Request received</span></div>
                  <h2 style={s("font-family:'Libre Caslon Display',serif;font-weight:400;font-size:clamp(25px,4vw,35px);line-height:1.07;letter-spacing:-.012em;color:#F4EFE6;max-width:17ch")}>Your name is with our partners.</h2>
                  <p style={s("margin-top:16px;font-size:14.5px;line-height:1.68;color:#B3AA9A;max-width:46ch")}>Every request is reviewed personally. If a seat is available in your city, you will receive a private invitation ahead of the evening.</p>
                  <button onClick={closeModal} style={s("margin-top:26px;background:transparent;border:1px solid rgba(241,236,226,.2);color:#C7BEAE;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:13px 20px;cursor:pointer")}>Close</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

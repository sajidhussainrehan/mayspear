import { useState, useEffect } from "react";
import T from "../styles/theme.js";

function Logo() {
  return (
    <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
      <svg viewBox="0 0 40 40" fill="none" width={38} height={38}>
        <path d="M20 2L36 12V28L20 38L4 28V12L20 2Z" stroke={T.gold} strokeWidth="1.2" />
        <path d="M20 8L30 14V26L20 32L10 26V14L20 8Z" stroke={T.gold} strokeWidth="0.8" opacity="0.5" />
        <path d="M20 14L25 17V23L20 26L15 23V17L20 14Z" fill={T.gold} opacity="0.15" />
      </svg>
      <span className="serif" style={{ fontSize: "1.35rem", fontWeight: 500, letterSpacing: "0.04em", color: T.pure }}>
        SANDSPIRE <span style={{ color: T.gold }}>GLOBAL</span>
      </span>
    </a>
  );
}

function DesktopNav({ links }) {
  return (
    <ul style={{ display: "flex", alignItems: "center", gap: 36, listStyle: "none" }}>
      {links.map(l => (
        <li key={l} className="nav-desktop-item" style={{ display: "none" }}>
          <a href={`#${l.toLowerCase()}`} style={{ fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: T.silver }}
            onMouseEnter={e => e.target.style.color = T.gold} onMouseLeave={e => e.target.style.color = T.silver}>{l}</a>
        </li>
      ))}
      <li className="nav-desktop-item" style={{ display: "none" }}>
        <a href="#contact" style={{ display: "inline-block", padding: "10px 26px", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.midnight, background: T.gold }}>Get in Touch</a>
      </li>
      <style>{`@media(min-width:769px){ .nav-desktop-item{display:block !important;} }`}</style>
    </ul>
  );
}

function MobileNav({ open, onClose, links }) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(10,15,26,0.98)", backdropFilter: "blur(30px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, animation: "fadeIn 0.3s ease" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 28, right: 28, background: "none", border: "none", cursor: "pointer", color: T.silver, fontSize: 28 }}>✕</button>
      {[...links, "Contact"].map(l => (
        <a key={l} href={`#${l.toLowerCase()}`} onClick={onClose}
          className="serif" style={{ fontSize: "1.8rem", color: T.silver }}
          onMouseEnter={e => e.target.style.color = T.gold} onMouseLeave={e => e.target.style.color = T.silver}>{l}</a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Services", "Approach", "Sectors", "Team", "Blog", "News"];

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    padding: "0 clamp(24px,5vw,80px)",
    background: scrolled ? "rgba(10,15,26,0.93)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
  };
  const innerStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: scrolled ? 70 : 90, maxWidth: 1280, margin: "0 auto",
    borderBottom: `1px solid ${scrolled ? "rgba(200,165,92,0.15)" : "rgba(200,165,92,0.08)"}`,
    transition: "all 0.4s ease",
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={innerStyle}>
          <Logo />
          <DesktopNav links={links} />
          <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", width: 32, height: 24, position: "relative", display: "none" }} className="mob-toggle">
            {[0, 50, 100].map((t, i) => <span key={i} style={{ display: "block", width: "100%", height: 2, background: T.silver, position: "absolute", left: 0, top: `${t}%`, transform: t === 50 ? "translateY(-50%)" : "none" }} />)}
          </button>
        </div>
      </nav>
      <MobileNav open={open} onClose={() => setOpen(false)} links={links} />
      <style>{`
        @media(min-width:769px){ .nav-desktop-item{display:block !important;} .mob-toggle{display:none !important;} }
        @media(max-width:768px){ .nav-desktop-item{display:none !important;} .mob-toggle{display:block !important;} }
      `}</style>
    </>
  );
}

export { Logo };

import { Logo } from "./Navbar.jsx";
import { Link } from "react-router-dom";
import T from "../styles/theme.js";

export default function Footer() {
  const cols = [
    { title: "Services", links: ["Loan Administration", "Facility Agency", "Asset Surveillance", "Special Servicing", "Due Diligence", "Investor Reporting"] },
    { title: "Sectors", links: ["Commercial Real Estate", "Corporate Credit", "Infrastructure & Energy", "Structured Finance"] },
    { title: "Company", links: ["Our Approach", "Team", "Contact"] },
  ];
  return (
    <footer id="contact" style={{ borderTop: `1px solid rgba(200,165,92,0.08)`, padding: "60px clamp(24px,5vw,80px) 40px", background: T.midnight }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <Logo />
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: T.mist, marginTop: 16, maxWidth: 320 }}>Institutional-grade loan servicing and credit asset management for private credit funds, banks, and institutional investors.</p>
          </div>
          {cols.map(c => (
            <div key={c.title}>
              <h5 style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.goldDim, marginBottom: 20 }}>{c.title}</h5>
              <ul style={{ listStyle: "none" }}>
                {c.links.map(l => (
                  <li key={l} style={{ marginBottom: 10 }}>
                    <Link to="/" style={{ fontSize: "0.88rem", color: T.mist, textDecoration: "none" }}
                      onMouseEnter={e => e.target.style.color = T.gold} onMouseLeave={e => e.target.style.color = T.mist}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: `1px solid rgba(200,165,92,0.06)`, flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: "0.78rem", color: T.steel }}>© 2026 Sandspire Global Ltd. All rights reserved. Registered in England & Wales.</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(l => (
              <Link key={l} to="/" style={{ fontSize: "0.78rem", color: T.steel, textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = T.goldDim} onMouseLeave={e => e.target.style.color = T.steel}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

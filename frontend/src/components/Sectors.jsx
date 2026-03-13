import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";

const SECTORS = [
  { title: "Commercial Real Estate", desc: "Office, retail, logistics, residential, hospitality, and mixed-use. Performing and non-performing. Whole loans and tranched structures.", icon: <><rect x="4" y="10" width="4" height="10" /><rect x="10" y="4" width="4" height="16" /><rect x="16" y="7" width="4" height="13" /></> },
  { title: "Corporate Credit", desc: "Leveraged loans, unitranche, mezzanine, PIK, and revolving credit facilities across mid-market and large-cap corporates.", icon: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></> },
  { title: "Infrastructure & Energy", desc: "Project finance, renewable energy, transportation, social infrastructure, and utility assets. Complex cashflow structures and regulatory frameworks.", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a15 15 0 000 20M12 2a15 15 0 010 20M2 12h20" /></> },
  { title: "Structured Finance", desc: "CLOs, CMBS, RMBS, ABS, and bespoke securitisation vehicles. Trustee reporting, waterfall execution, and compliance monitoring.", icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></> },
];

function SectorCard({ title, desc, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? T.navy : T.midnight, padding: "clamp(28px,3vw,40px)", textAlign: "center", transition: "all 0.4s" }}>
      <div style={{ width: 56, height: 56, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid rgba(200,165,92,0.15)` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>{icon}</svg>
      </div>
      <h4 className="serif" style={{ fontSize: "1.05rem", fontWeight: 500, color: T.pure, marginBottom: 10 }}>{title}</h4>
      <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: T.mist }}>{desc}</p>
    </div>
  );
}

export default function Sectors() {
  const ref = useReveal();
  return (
    <section id="sectors" style={{ padding: "clamp(80px,10vw,140px) 0", background: T.deep }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <SectionHeader eyebrow="Sector Expertise" title={<>Deep knowledge across <em style={{ fontStyle: "italic", color: T.gold }}>complex asset classes</em></>} desc="Our team has serviced portfolios across every major asset class in the European credit market, giving us the operational expertise to handle any level of complexity." />
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 1, background: "rgba(200,165,92,0.06)" }}>
          {SECTORS.map(s => <SectorCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}

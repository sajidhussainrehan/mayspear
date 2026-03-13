import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";

const TEAM = [
  { initials: "SG", name: "[Founder Name]", role: "Managing Partner", bio: "Responsible for client development, strategic partnerships, and firm strategy. Background in financial services business development and institutional client management." },
  { initials: "SG", name: "[Operator Name]", role: "Head of Servicing", bio: "Leads all loan administration, asset surveillance, and client delivery. Previously at a major servicer/bank with extensive experience across CRE, corporate credit, and structured finance." },
  { initials: "AB", name: "Advisory Board", role: "Senior Advisors", bio: "Sandspire is supported by a network of senior industry advisors with deep expertise in credit markets, regulation, and institutional investment management." },
];

function TeamCard({ initials, name, role, bio }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ textAlign: "center", padding: "40px 28px", background: T.navy, border: `1px solid ${hov ? "rgba(200,165,92,0.15)" : "rgba(200,165,92,0.06)"}`, transition: "all 0.35s", transform: hov ? "translateY(-2px)" : "none" }}>
      <div className="serif" style={{ width: 100, height: 100, margin: "0 auto 20px", background: `linear-gradient(135deg,${T.slate},${T.steel})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: T.gold, fontWeight: 300 }}>{initials}</div>
      <h4 className="serif" style={{ fontSize: "1.15rem", fontWeight: 500, color: T.pure, marginBottom: 4 }}>{name}</h4>
      <div style={{ fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.goldDim, marginBottom: 14 }}>{role}</div>
      <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: T.mist }}>{bio}</p>
    </div>
  );
}

export default function Team() {
  const ref = useReveal();
  return (
    <section id="team" style={{ padding: "clamp(80px,10vw,140px) 0", background: T.deep }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <SectionHeader eyebrow="Our Team" title={<>Experienced professionals. <em style={{ fontStyle: "italic", color: T.gold }}>Aligned interests.</em></>} desc="Sandspire was founded by credit market professionals who have collectively managed billions in loan portfolios across Europe's leading servicing platforms, investment banks, and advisory firms." />
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 40, maxWidth: 960, margin: "0 auto" }}>
          {TEAM.map(m => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

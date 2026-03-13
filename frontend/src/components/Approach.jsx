import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";

const DIFFS = [
  { num: "001", title: "Principal-Level Attention", desc: "Your portfolio is not passed to a junior analyst. Sandspire's founding team is directly involved in every mandate, ensuring the depth of expertise that large platforms cannot replicate at scale." },
  { num: "002", title: "Scope That Fits", desc: "We don't sell packages. Every servicing scope is tailored precisely to your portfolio's complexity, your reporting requirements, and your operational preferences." },
  { num: "003", title: "Regulated Framework", desc: "Our partnership with an FCA-authorised firm provides the full regulatory infrastructure for discretionary portfolio management and advisory activities." },
  { num: "004", title: "Speed Without Compromise", desc: "Loan boarding within 48 hours. Reporting within 24 hours. Ad-hoc requests same day. We match institutional standards with startup speed." },
  { num: "005", title: "Transparent Pricing", desc: "Clear fee structures with no hidden charges. Basis point fees on performing portfolios, fixed fees on project work." },
];

const DIFF_STATS = [
  { num: "48h", label: "Maximum loan boarding time from data receipt" },
  { num: "24h", label: "Investor reporting turnaround" },
  { num: "100%", label: "Client retention since founding" },
  { num: "0", label: "Conflicts of interest" },
];

function DiffItem({ num, title, desc, last }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "32px 0", borderBottom: last ? "none" : `1px solid rgba(200,165,92,0.08)`, display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, transition: "all 0.3s", paddingLeft: hov ? 8 : 0 }}>
      <div className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: T.gold, paddingTop: 4 }}>{num}</div>
      <div>
        <h4 className="serif" style={{ fontSize: "1.2rem", fontWeight: 500, color: T.pure, marginBottom: 8 }}>{title}</h4>
        <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: T.mist }}>{desc}</p>
      </div>
    </div>
  );
}

export default function Approach() {
  const ref1 = useReveal(), ref2 = useReveal();
  return (
    <section id="approach" style={{ padding: "clamp(80px,10vw,140px) 0", background: T.midnight }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <SectionHeader eyebrow="Our Approach" title={<>Built differently. <em style={{ fontStyle: "italic", color: T.gold }}>Deliberately.</em></>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 80, alignItems: "start" }}>
          <div ref={ref1} className="reveal">
            {DIFFS.map((d, i) => (
              <DiffItem key={d.num} {...d} last={i === DIFFS.length - 1} />
            ))}
          </div>
          <div ref={ref2} className="reveal">
            <div style={{ position: "relative", padding: 48, background: T.navy, border: `1px solid rgba(200,165,92,0.08)` }}>
              <div style={{ position: "absolute", top: -1, left: 48, right: 48, height: 2, background: `linear-gradient(90deg,transparent,${T.gold},transparent)` }} />
              <p className="serif" style={{ fontSize: "1.6rem", fontWeight: 300, lineHeight: 1.45, color: T.pure, fontStyle: "italic", marginBottom: 24 }}>
                "We founded Sandspire because the market deserves a servicer that combines institutional rigour with genuine client partnership — not a factory that processes loans, but a team that understands your portfolio as well as you do."
              </p>
              <div style={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.goldDim }}>— Sandspire Global, Founding Principles</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 40 }}>
                {DIFF_STATS.map(s => (
                  <div key={s.num} style={{ padding: 24, background: "rgba(10,15,26,0.5)", border: `1px solid rgba(200,165,92,0.06)` }}>
                    <div className="serif" style={{ fontSize: "2rem", fontWeight: 300, color: T.gold, marginBottom: 4 }}>{s.num}</div>
                    <div style={{ fontSize: "0.75rem", color: T.mist, lineHeight: 1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

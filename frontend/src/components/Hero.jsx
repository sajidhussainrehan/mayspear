import { useState } from "react";
import T from "../styles/theme.js";

function Btn({ href, primary, children }) {
  const [hov, setHov] = useState(false);
  const base = { display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.35s", cursor: "pointer" };
  const style = primary
    ? { ...base, color: T.midnight, background: hov ? T.goldLight : T.gold, transform: hov ? "translateY(-1px)" : "none" }
    : { ...base, color: T.gold, border: `1px solid ${hov ? "rgba(200,165,92,1)" : "rgba(200,165,92,0.3)"}`, background: hov ? "rgba(200,165,92,0.05)" : "transparent" };
  return <a href={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>;
}

const metrics = [
  { num: "40+", strong: "Combined Years", desc: "Senior team experience across loan servicing, restructuring, and credit markets" },
  { num: "CRE", strong: "Multi-Sector Coverage", desc: "Commercial real estate, corporate credit, infrastructure debt, and structured finance" },
  { num: "24h", strong: "Reporting Turnaround", desc: "Bespoke investor and borrower reporting delivered within one business day" },
];

const badges = ["FCA Regulated Partner", "UK & European Coverage", "GDPR Compliant", "Institutional Security", "Independent & Conflict-Free"];

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `radial-gradient(ellipse 80% 60% at 20% 50%, rgba(200,165,92,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 30%, rgba(30,48,80,0.5) 0%, transparent 60%), linear-gradient(180deg,${T.midnight} 0%,${T.deep} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(200,165,92,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,165,92,0.03) 1px,transparent 1px)`, backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 70%)" }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, animation: "fadeUp 0.8s 0.3s both" }}>
              <span style={{ width: 32, height: 1, background: T.gold, display: "inline-block" }} />Institutional Loan Servicing
            </div>
            <h1 className="serif" style={{ fontSize: "clamp(2.8rem,5.5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, color: T.pure, marginBottom: 28, animation: "fadeUp 0.8s 0.5s both" }}>
              Precision servicing for <em style={{ fontStyle: "italic", color: T.gold }}>complex credit</em>
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: T.silver, maxWidth: 520, marginBottom: 40, animation: "fadeUp 0.8s 0.7s both" }}>
              Sandspire Global delivers institutional-grade loan administration, portfolio surveillance, and credit asset management for private credit funds, banks, and institutional investors across Europe and the UK.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.8s 0.9s both" }}>
              <Btn href="#contact" primary>Discuss a Mandate →</Btn>
              <Btn href="#services">Our Services</Btn>
            </div>
          </div>
          <div style={{ animation: "fadeUp 0.8s 1.1s both" }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ padding: "32px 0", borderBottom: i < 2 ? `1px solid rgba(200,165,92,0.1)` : "none", display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }}>
                <div className="serif" style={{ fontSize: "3rem", fontWeight: 300, color: T.gold, lineHeight: 1, minWidth: 100 }}>{m.num}</div>
                <div style={{ fontSize: "0.85rem", lineHeight: 1.5, color: T.mist }}>
                  <strong style={{ color: T.silver, fontWeight: 500, display: "block", marginBottom: 2 }}>{m.strong}</strong>{m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 80, paddingTop: 40, borderTop: `1px solid rgba(200,165,92,0.08)`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, animation: "fadeUp 0.8s 1.3s both" }}>
          {badges.map(b => (
            <div key={b} style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.steel, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, border: `1px solid ${T.goldDim}`, transform: "rotate(45deg)", display: "inline-block" }} />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Btn };

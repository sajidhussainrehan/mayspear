import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";

const STEPS = [
  { phase: "Phase 01", title: "Scoping", desc: "We work with you to define the precise servicing scope, reporting requirements, and operational preferences for your portfolio." },
  { phase: "Phase 02", title: "Onboarding", desc: "Loan data boarding, documentation review, counterparty setup, and system configuration. Typically complete within 48 hours." },
  { phase: "Phase 03", title: "Active Servicing", desc: "Ongoing administration, surveillance, reporting, and stakeholder management. Continuous communication with your team." },
  { phase: "Phase 04", title: "Strategic Insight", desc: "Proactive identification of risks and opportunities. Restructuring support. Portfolio analytics that inform your investment decisions." },
];

export default function Process() {
  const ref = useReveal();
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 0", background: T.midnight }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <SectionHeader eyebrow="How We Work" title={<>From mandate to <em style={{ fontStyle: "italic", color: T.gold }}>operational excellence</em></>} />
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 20px" }}>
              <div className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: T.goldDim, textTransform: "uppercase" }}>{s.phase}</div>
              <div style={{ width: 14, height: 14, border: `2px solid ${T.gold}`, background: T.deep, margin: "30px auto 24px", transform: "rotate(45deg)" }} />
              <h4 className="serif" style={{ fontSize: "1.05rem", fontWeight: 500, color: T.pure, marginBottom: 10 }}>{s.title}</h4>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: T.mist }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

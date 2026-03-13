import useReveal from "../hooks/useReveal.js";
import Eyebrow from "./shared/Eyebrow.jsx";
import { Btn } from "./Hero.jsx";
import T from "../styles/theme.js";

export default function CTA() {
  const ref = useReveal();
  const details = [
    { label: "Email", value: <a href="mailto:contact@sandspireglobal.com" style={{ color: T.gold }}>contact@sandspireglobal.com</a> },
    { label: "Telephone", value: "+44 (0) 20 XXXX XXXX" },
    { label: "London Office", value: "[Address], London" },
    { label: "LinkedIn", value: <a href="#" style={{ color: T.gold }}>Sandspire Global</a> },
  ];
  return (
    <section id="contact" style={{ position: "relative", padding: "clamp(80px,10vw,140px) 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%,rgba(200,165,92,0.06) 0%,transparent 60%),${T.midnight}` }} />
      <div ref={ref} className="reveal" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 700, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <Eyebrow>Start a Conversation</Eyebrow>
        <h2 className="serif" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, color: T.pure, lineHeight: 1.15, marginBottom: 20 }}>
          Let's discuss how Sandspire can <em style={{ fontStyle: "italic", color: T.gold }}>serve your portfolio</em>
        </h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: T.silver, marginBottom: 40 }}>
          Whether you're launching a new fund, looking to outsource existing loan administration, or need specialist support on a restructuring — we'd welcome the opportunity to understand your requirements.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
          <Btn href="mailto:contact@sandspireglobal.com" primary>Email Us Directly →</Btn>
          <Btn href="tel:+442012345678">Schedule a Call</Btn>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", paddingTop: 40, borderTop: `1px solid rgba(200,165,92,0.1)` }}>
          {details.map(d => (
            <div key={d.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.goldDim, marginBottom: 6 }}>{d.label}</div>
              <div style={{ fontSize: "0.92rem", color: T.silver }}>{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

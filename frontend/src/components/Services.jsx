import { useState, useEffect } from "react";
import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";
import { getServices } from "../services/api.js";

function ServiceCard({ icon, title, description }, index) {
  const [hov, setHov] = useState(false);
  const num = String(index + 1).padStart(2, '0');
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? T.navy : T.deep, padding: "clamp(32px,3vw,48px)", position: "relative", overflow: "hidden", transition: "all 0.4s ease" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gold, transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
      <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: T.goldDim, marginBottom: 24 }}>{num}</div>
      <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 500, color: T.pure, marginBottom: 14, lineHeight: 1.25 }}>{title}</h3>
      <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: T.mist }}>{description}</p>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const ref = useReveal();

  useEffect(() => {
    getServices().then(setServices).catch(console.error);
  }, []);

  return (
    <section id="services" style={{ padding: "clamp(80px,10vw,140px) 0", background: T.deep }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <SectionHeader eyebrow="What We Do" title={<>End-to-end credit servicing across the <em style={{ fontStyle: "italic", color: T.gold }}>full lifecycle</em></>} desc="From origination support to workout and restructuring, we manage every operational dimension of your credit portfolio with institutional rigour and bespoke attention." />
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 1, background: "rgba(200,165,92,0.08)" }}>
          {services.map((s, i) => <ServiceCard key={s.id} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

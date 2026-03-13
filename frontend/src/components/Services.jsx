import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";

const SERVICES = [
  { num: "01", title: "Loan Administration", desc: "Complete loan boarding, payment processing, waterfall calculations, covenant compliance tracking, escrow management, and ongoing borrower/lender reporting.", tags: ["Payment Processing", "Waterfall Engine", "Covenant Tracking"] },
  { num: "02", title: "Facility Agency", desc: "Acting as facility agent on syndicated and bilateral loans — managing lender communications, voting, consents, amendments, and information flow between all parties.", tags: ["Syndicated Loans", "Lender Comms", "Consents"] },
  { num: "03", title: "Asset Surveillance", desc: "Continuous monitoring of borrower performance, property valuations, tenant analysis, financial covenant testing, and early warning triggers calibrated to your risk appetite.", tags: ["Risk Monitoring", "Valuations", "Early Warning"] },
  { num: "04", title: "Special Servicing", desc: "Workout strategy, restructuring execution, enforcement management, receiver liaison, and asset disposal — protecting value through distressed situations.", tags: ["Restructuring", "Enforcement", "Workout"] },
  { num: "05", title: "Due Diligence", desc: "Pre-acquisition portfolio screening, loan-level underwriting reviews, data tape validation, documentation review, and portfolio modelling for acquisitions and disposals.", tags: ["Portfolio Screening", "Data Validation", "Modelling"] },
  { num: "06", title: "Investor Reporting & ESG", desc: "Bespoke investor reporting packages, LP reporting, SFDR compliance data, ESG metrics capture, regulatory reporting support, and custom analytics dashboards.", tags: ["LP Reporting", "SFDR", "ESG Data"] },
];

function ServiceCard({ num, title, desc, tags }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? T.navy : T.deep, padding: "clamp(32px,3vw,48px)", position: "relative", overflow: "hidden", transition: "all 0.4s ease" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gold, transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
      <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: T.goldDim, marginBottom: 24 }}>{num}</div>
      <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 500, color: T.pure, marginBottom: 14, lineHeight: 1.25 }}>{title}</h3>
      <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: T.mist }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
        {tags.map(t => (
          <span key={t} style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.05em", padding: "4px 10px", background: "rgba(200,165,92,0.06)", border: "1px solid rgba(200,165,92,0.12)", color: T.goldDim }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useReveal();
  return (
    <section id="services" style={{ padding: "clamp(80px,10vw,140px) 0", background: T.deep }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <SectionHeader eyebrow="What We Do" title={<>End-to-end credit servicing across the <em style={{ fontStyle: "italic", color: T.gold }}>full lifecycle</em></>} desc="From origination support to workout and restructuring, we manage every operational dimension of your credit portfolio with institutional rigour and bespoke attention." />
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 1, background: "rgba(200,165,92,0.08)" }}>
          {SERVICES.map(s => <ServiceCard key={s.num} {...s} />)}
        </div>
      </div>
    </section>
  );
}

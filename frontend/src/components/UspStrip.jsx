import T from "../styles/theme.js";

const USP_ITEMS = [
  { title: "Senior-Led Delivery", desc: "Every mandate is managed by experienced professionals, not passed down to junior staff. You deal with decision-makers.", icon: <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></> },
  { title: "Boutique Agility", desc: "The responsiveness of a dedicated team with the rigour of an institutional platform. No bureaucracy. No delays.", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></> },
  { title: "Technology-Enabled", desc: "Proprietary analytics and reporting tools that give you real-time visibility into portfolio performance and risk.", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></> },
  { title: "Conflict-Free", desc: "Fully independent. We don't lend, invest, or trade. Our only interest is delivering for you.", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></> },
];

export default function UspStrip() {
  return (
    <div style={{ background: T.navy, borderTop: `1px solid rgba(200,165,92,0.1)`, borderBottom: `1px solid rgba(200,165,92,0.1)`, padding: "60px clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 100% at 50% 0%,rgba(200,165,92,0.03) 0%,transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 0 }}>
        {USP_ITEMS.map((u, i) => (
          <div key={i} style={{ padding: "0 36px", borderRight: i < USP_ITEMS.length - 1 ? `1px solid rgba(200,165,92,0.1)` : "none", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>{u.icon}</svg>
            </div>
            <h4 className="serif" style={{ fontSize: "1.1rem", fontWeight: 500, color: T.pure, marginBottom: 8 }}>{u.title}</h4>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: T.mist }}>{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

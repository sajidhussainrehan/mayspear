import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";

const NEWS_ITEMS = [
  {
    date: "12 Mar 2026",
    type: "Company",
    title: "Sandspire Global Announces New Advisory Board Member",
    content: "We are pleased to welcome a senior industry executive with over 25 years of experience in European credit markets to our advisory board."
  },
  {
    date: "28 Feb 2026",
    type: "Expansion",
    title: "New Office Opening in Luxembourg",
    content: "Sandspire Global expands its European presence with a new office in Luxembourg to better serve clients in the Benelux region."
  },
  {
    date: "15 Jan 2026",
    type: "Mandate",
    title: "€500M CLO Servicing Mandate Awarded",
    content: "A leading European asset manager has appointed Sandspire as servicer for their latest CLO transaction."
  },
  {
    date: "08 Dec 2025",
    type: "Partnership",
    title: "Strategic Partnership with Regulatory Technology Firm",
    content: "New partnership enhances our SFDR and ESG reporting capabilities for institutional clients."
  },
  {
    date: "20 Nov 2025",
    type: "Recognition",
    title: "Named in Top 20 European Loan Servicers",
    content: "Industry publication recognizes Sandspire's rapid growth and client satisfaction ratings."
  }
];

function NewsItem({ date, type, title, content }) {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "120px 100px 1fr", 
      gap: 24,
      padding: "24px 0",
      borderBottom: `1px solid rgba(200,165,92,0.08)`,
      alignItems: "start"
    }}>
      <div className="mono" style={{ fontSize: "0.75rem", color: T.mist, paddingTop: 4 }}>
        {date}
      </div>
      <div>
        <span style={{ 
          display: "inline-block",
          fontSize: "0.65rem", 
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: T.goldDim,
          padding: "4px 10px",
          background: "rgba(200,165,92,0.06)",
          border: `1px solid rgba(200,165,92,0.12)`
        }}>
          {type}
        </span>
      </div>
      <div>
        <h4 className="serif" style={{ fontSize: "1.1rem", fontWeight: 500, color: T.pure, marginBottom: 8 }}>
          {title}
        </h4>
        <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: T.mist }}>
          {content}
        </p>
      </div>
    </div>
  );
}

export default function News() {
  const ref = useReveal();
  return (
    <section id="news" style={{ padding: "clamp(80px,10vw,140px) 0", background: T.deep }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 80 }}>
          <div>
            <SectionHeader 
              eyebrow="Updates" 
              title={<>Company <em style={{ fontStyle: "italic", color: T.gold }}>news</em></>}
              desc="Latest announcements, milestones, and developments from Sandspire Global."
            />
            <div style={{ marginTop: 40 }}>
              <a href="#" style={{ 
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px", 
                fontSize: "0.8rem", 
                fontWeight: 600, 
                letterSpacing: "0.1em", 
                textTransform: "uppercase", 
                color: T.midnight,
                background: T.gold,
                textDecoration: "none",
                transition: "all 0.35s"
              }}
              onMouseEnter={e => {
                e.target.style.background = T.goldLight;
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.target.style.background = T.gold;
                e.target.style.transform = "translateY(0)";
              }}>
                Press Inquiries →
              </a>
            </div>
          </div>
          <div ref={ref} className="reveal">
            {NEWS_ITEMS.map((item, i) => (
              <NewsItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

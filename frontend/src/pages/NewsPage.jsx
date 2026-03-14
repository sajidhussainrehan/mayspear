import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SectionHeader from "../components/shared/SectionHeader.jsx";
import useReveal from "../hooks/useReveal.js";
import T from "../styles/theme.js";
import { getNews } from "../services/api.js";

function NewsItem({ date, category, title, description, thumbnail }) {
  return (
    <div style={{ 
      display: "flex",
      gap: 20,
      padding: "24px 0",
      borderBottom: `1px solid rgba(200,165,92,0.08)`,
      alignItems: "start"
    }}>
      {thumbnail && (
        <img src={thumbnail} alt={title} style={{ width: 120, height: 80, objectFit: "cover", borderRadius: "4px" }} />
      )}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: "0.7rem", color: T.goldDim }}>{date}</span>
          <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.goldDim, padding: "2px 8px", background: "rgba(200,165,92,0.06)", border: `1px solid rgba(200,165,92,0.12)` }}>{category}</span>
        </div>
        <h4 className="serif" style={{ fontSize: "1.05rem", fontWeight: 500, color: T.pure, marginBottom: 6 }}>{title}</h4>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: T.mist }}>{description}</p>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const ref = useReveal();

  useEffect(() => {
    getNews().then(setNews).catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <section style={{ padding: "140px 0 clamp(80px,10vw,140px)", background: T.deep }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          <SectionHeader 
            eyebrow="Updates" 
            title={<>Company <em style={{ fontStyle: "italic", color: T.gold }}>news</em></>}
            desc="Latest announcements, milestones, and developments from Sandspire Global."
          />
          <div ref={ref} className="reveal" style={{ maxWidth: 800, margin: "0 auto" }}>
            {news.length > 0 ? news.map((item) => (
              <NewsItem key={item.id} {...item} />
            )) : (
              <p style={{ color: T.mist, textAlign: "center" }}>No news items yet.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

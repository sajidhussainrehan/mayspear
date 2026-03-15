import { useState, useEffect } from "react";
import { getNews } from "../../services/api";
import { ScrollReveal } from "../common/ScrollReveal";

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="news" className="mg-news" style={{ padding: "100px 0", background: "var(--ch2)" }}>
        <div className="mg-container">
          <div className="mg-sec-label">Latest News</div>
          <h2 className="mg-sec-h">Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="mg-news" style={{ padding: "130px 0", background: "var(--ch2)", borderTop: "1px solid rgba(200,191,176,0.06)" }}>
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label">Latest News</div>
          <h2 className="mg-sec-h">Industry <em>Updates</em></h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "60px" }}>
          {news.map((item, index) => (
            <ScrollReveal key={item._id || index} style={{ transitionDelay: `${index * 100}ms` }}>
              <div style={{
                background: "var(--ch3)",
                border: "1px solid rgba(200,191,176,0.1)",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s"
              }} className="news-card">
                {item.thumbnail && (
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
                <div style={{ padding: "28px" }}>
                  <div style={{ 
                    fontFamily: "var(--mono)", 
                    fontSize: "0.56rem", 
                    letterSpacing: "0.2em",
                    color: "var(--brass)",
                    textTransform: "uppercase",
                    marginBottom: "12px"
                  }}>
                    {item.date} • {item.category}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1.3rem",
                    fontWeight: 300,
                    color: "var(--text)",
                    marginBottom: "16px",
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--body)",
                    fontSize: "0.9rem",
                    color: "var(--textD)",
                    lineHeight: 1.7
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {news.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--textF)" }}>
            <p>No news items available.</p>
          </div>
        )}
      </div>

      <style>{`
        .news-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  );
}

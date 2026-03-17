import { useState, useEffect } from "react";
import { getNews } from "../../services/api";
import { ScrollReveal } from "../common/ScrollReveal";
import { Link } from "react-router-dom";

export default function NewsSection({ isFull = false }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const data = await getNews();
      setNews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setNews([]);
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

  const displayNews = isFull ? news : news.slice(0, 6);

  return (
    <section id="news" className="mg-news" style={{ padding: "130px 0", background: "var(--ch2)", borderTop: "1px solid rgba(200,191,176,0.06)" }}>
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label">Latest News</div>
          <h2 className="mg-sec-h">Industry <em>Updates</em></h2>
        </ScrollReveal>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "24px", 
          marginTop: "60px" 
        }} className="mg-news-grid">
          {displayNews.map((item, index) => (
            <ScrollReveal key={item._id || index} style={{ transitionDelay: `${index * 100}ms` }}>
              <div style={{
                background: "var(--ch3)",
                border: "1px solid rgba(200,191,176,0.1)",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                height: "100%",
                display: "flex",
                flexDirection: "column"
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
                <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
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
                    lineHeight: 1.7,
                    marginBottom: "24px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {item.description}
                  </p>
                  <div style={{ marginTop: "auto" }}>
                    <Link to={`/news/${item._id}`} className="mg-btn-brass" style={{ padding: "8px 20px", fontSize: "0.58rem", textDecoration: 'none' }}>
                      <span>Read Article</span>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {!isFull && news.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Link to="/news" className="mg-btn-brass" style={{ textDecoration: 'none' }}>
              <span>View All News</span>
            </Link>
          </div>
        )}

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
        @media(max-width: 1000px) {
          .mg-news-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width: 600px) {
          .mg-news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

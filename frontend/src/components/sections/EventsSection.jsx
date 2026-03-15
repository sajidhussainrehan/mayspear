import { useState, useEffect } from "react";
import { getBlogs } from "../../services/api";
import { ScrollReveal } from "../common/ScrollReveal";

export default function EventsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="events" className="mg-events" style={{ padding: "100px 0", background: "var(--ch)" }}>
        <div className="mg-container">
          <div className="mg-sec-label">Events & Insights</div>
          <h2 className="mg-sec-h">Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="mg-events" style={{ padding: "130px 0", background: "var(--ch)", borderTop: "1px solid rgba(200,191,176,0.06)" }}>
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label">Events & Insights</div>
          <h2 className="mg-sec-h">Thought <em>Leadership</em></h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "32px", marginTop: "60px" }}>
          {blogs.map((blog, index) => (
            <ScrollReveal key={blog._id || index} style={{ transitionDelay: `${index * 100}ms` }}>
              <article style={{
                background: "var(--ch3)",
                borderLeft: "3px solid var(--brass)",
                padding: "32px",
                transition: "all 0.3s"
              }} className="blog-card">
                <div style={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px"
                }}>
                  {blog.thumbnail && (
                    <img 
                      src={blog.thumbnail} 
                      alt=""
                      style={{ 
                        width: "60px", 
                        height: "60px", 
                        objectFit: "cover",
                        borderRadius: "4px"
                      }}
                    />
                  )}
                  <div>
                    <div style={{ 
                      fontFamily: "var(--mono)", 
                      fontSize: "0.54rem", 
                      letterSpacing: "0.22em",
                      color: "var(--brass)",
                      textTransform: "uppercase"
                    }}>
                      {blog.category}
                    </div>
                    <div style={{
                      fontFamily: "var(--body)",
                      fontSize: "0.8rem",
                      color: "var(--textF)",
                      marginTop: "4px"
                    }}>
                      {blog.date}
                    </div>
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "var(--text)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                  fontStyle: "italic"
                }}>
                  {blog.title}
                </h3>

                <p style={{
                  fontFamily: "var(--body)",
                  fontSize: "0.95rem",
                  color: "var(--textD)",
                  lineHeight: 1.8,
                  borderTop: "1px solid rgba(200,191,176,0.1)",
                  paddingTop: "16px"
                }}>
                  {blog.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {blogs.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--textF)" }}>
            <p>No events or insights available.</p>
          </div>
        )}
      </div>

      <style>{`
        .blog-card:hover {
          background: var(--ch4);
          border-left-color: var(--brass2);
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}

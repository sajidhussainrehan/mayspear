import { useState, useEffect } from "react";
import { getBlogs } from "../../services/api";
import { ScrollReveal } from "../common/ScrollReveal";
import { Link } from "react-router-dom";

export default function BlogsSection({ isFull = false }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const data = await getBlogs();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="blogs" className="mg-events" style={{ padding: "100px 0", background: "var(--ch)" }}>
        <div className="mg-container">
          <div className="mg-sec-label">Blogs & Insights</div>
          <h2 className="mg-sec-h">Loading...</h2>
        </div>
      </section>
    );
  }

  const displayBlogs = isFull ? blogs : blogs.slice(0, 6);

  return (
    <section id="blogs" className="mg-events" style={{ padding: "130px 0", background: "var(--ch)", borderTop: "1px solid rgba(200,191,176,0.06)" }}>
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label">Blogs & Insights</div>
          <h2 className="mg-sec-h">Thought <em>Leadership</em></h2>
        </ScrollReveal>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "32px", 
          marginTop: "60px" 
        }} className="mg-blogs-grid">
          {displayBlogs.map((blog, index) => (
            <ScrollReveal key={blog._id || index} style={{ transitionDelay: `${index * 100}ms` }}>
              <article style={{
                background: "var(--ch3)",
                borderLeft: "3px solid var(--brass)",
                padding: "32px",
                transition: "all 0.3s",
                height: "100%",
                display: "flex",
                flexDirection: "column"
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
                  paddingTop: "16px",
                  marginBottom: "24px",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {blog.description.replace(/<[^>]*>/g, ' ').substring(0, 200)}...
                </p>

                <div style={{ marginTop: "auto" }}>
                  <Link to={`/blogs/${blog._id}`} className="mg-btn-brass" style={{ padding: "8px 20px", fontSize: "0.58rem", textDecoration: 'none' }}>
                    <span>Read Full Post</span>
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {!isFull && blogs.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Link to="/blogs" className="mg-btn-brass" style={{ textDecoration: 'none' }}>
              <span>View All Blogs</span>
            </Link>
          </div>
        )}

        {blogs.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--textF)" }}>
            <p>No blog posts available.</p>
          </div>
        )}
      </div>

      <style>{`
        .blog-card:hover {
          background: var(--ch4);
          border-left-color: var(--brass2);
          transform: translateX(4px);
        }
        @media(max-width: 1100px) {
          .mg-blogs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width: 700px) {
          .mg-blogs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

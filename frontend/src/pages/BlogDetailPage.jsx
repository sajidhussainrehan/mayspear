import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/sections/Navigation";
import Footer from "../components/sections/Footer";
import { getBlogById } from "../services/api";
import { ScrollReveal } from "../components/common/ScrollReveal";
import { useScrollReveal } from "../hooks/useUtils";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    fetchBlog();
    return () => window.removeEventListener("scroll", fn);
  }, [id]);

  async function fetchBlog() {
    try {
      const data = await getBlogById(id);
      setBlog(data);
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
    } finally {
      setLoading(false);
    }
  }

  const scrollTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  }, []);

  const hoverProps = { 
    onMouseEnter: () => setHovering(true), 
    onMouseLeave: () => setHovering(false) 
  };

  if (loading) return <div style={{ background: "var(--ch)", minHeight: "100vh" }} />;

  return (
    <div className={`mg-noise ${hovering ? "mg-hovering" : ""}`} style={{ position: "relative", minHeight: "100vh", background: "var(--ch)" }}>
      <Navigation 
        navScrolled={navScrolled} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        hoverProps={hoverProps}
      />
      
      <main style={{ paddingTop: "180px", paddingBottom: "120px" }}>
        <div className="mg-container">
          <Link to="/blogs" className="mg-sec-label" style={{ marginBottom: "40px", cursor: "pointer", textDecoration: "none" }}>
            Back to Insights
          </Link>
          
          {blog ? (
            <ScrollReveal>
              <div style={{ maxWidth: "900px" }}>
                <div style={{ 
                  fontFamily: "var(--mono)", 
                  fontSize: "0.7rem", 
                  letterSpacing: "0.25em",
                  color: "var(--brass)",
                  textTransform: "uppercase",
                  marginBottom: "20px"
                }}>
                  {blog.date} • {blog.category}
                </div>
                <h1 className="mg-sec-h" style={{ marginBottom: "40px", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontStyle: "italic" }}>
                  {blog.title}
                </h1>
                
                {blog.thumbnail && (
                  <div style={{ width: "100%", height: "500px", overflow: "hidden", marginBottom: "60px", borderLeft: "4px solid var(--brass)" }}>
                    <img src={blog.thumbnail} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                
                <div style={{ 
                  fontFamily: "var(--body)",
                  fontSize: "1.1rem",
                  color: "var(--textD)",
                  lineHeight: "1.9"
                }}
                dangerouslySetInnerHTML={{ __html: blog.description }}
                />
              </div>
            </ScrollReveal>
          ) : (
            <div style={{ color: "var(--textF)" }}>Blog post not found.</div>
          )}
        </div>
      </main>

      <Footer scrollTo={scrollTo} hoverProps={hoverProps} />
    </div>
  );
}

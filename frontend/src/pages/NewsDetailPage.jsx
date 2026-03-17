import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/sections/Navigation";
import Footer from "../components/sections/Footer";
import { getNewsById } from "../services/api";
import { ScrollReveal } from "../components/common/ScrollReveal";
import { useScrollReveal } from "../hooks/useUtils";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    fetchItem();
    return () => window.removeEventListener("scroll", fn);
  }, [id]);

  async function fetchItem() {
    try {
      const data = await getNewsById(id);
      setItem(data);
    } catch (error) {
      console.error("Failed to fetch news item:", error);
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
          <Link to="/news" className="mg-sec-label" style={{ marginBottom: "40px", cursor: "pointer", textDecoration: "none" }}>
            Back to News
          </Link>
          
          {item ? (
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
                  {item.date} • {item.category}
                </div>
                <h1 className="mg-sec-h" style={{ marginBottom: "40px", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                  {item.title}
                </h1>
                
                {item.thumbnail && (
                  <div style={{ width: "100%", height: "500px", overflow: "hidden", marginBottom: "60px", border: "1px solid rgba(200,191,176,0.1)" }}>
                    <img src={item.thumbnail} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                
                <div style={{ 
                  fontFamily: "var(--body)",
                  fontSize: "1.1rem",
                  color: "var(--textD)",
                  lineHeight: "1.9",
                  whiteSpace: "pre-wrap"
                }}>
                  {item.description}
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <div style={{ color: "var(--textF)" }}>Article not found.</div>
          )}
        </div>
      </main>

      <Footer scrollTo={scrollTo} hoverProps={hoverProps} />
    </div>
  );
}

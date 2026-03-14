import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SectionHeader from "../components/shared/SectionHeader.jsx";
import useReveal from "../hooks/useReveal.js";
import T from "../styles/theme.js";
import { getBlogs } from "../services/api.js";

function BlogCard({ date, category, title, description, thumbnail }) {
  return (
    <article style={{ 
      background: T.navy, 
      border: `1px solid rgba(200,165,92,0.08)`,
      overflow: "hidden",
      transition: "all 0.35s ease",
      cursor: "pointer"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(200,165,92,0.2)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(200,165,92,0.08)";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      {thumbnail && (
        <img src={`http://localhost:3000${thumbnail}`} alt={title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
      )}
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: "0.7rem", color: T.goldDim, letterSpacing: "0.05em" }}>{date}</span>
          <span style={{ width: 4, height: 4, background: T.gold, borderRadius: "50%" }} />
          <span style={{ fontSize: "0.7rem", color: T.gold, letterSpacing: "0.05em" }}>{category}</span>
        </div>
        <h3 className="serif" style={{ fontSize: "1.15rem", fontWeight: 500, color: T.pure, marginBottom: 10, lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: T.mist }}>
          {description?.slice(0, 100)}...
        </p>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const ref = useReveal();

  useEffect(() => {
    getBlogs().then(setBlogs).catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <section style={{ padding: "140px 0 clamp(80px,10vw,140px)", background: T.midnight }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          <SectionHeader 
            eyebrow="Insights" 
            title={<>Latest from our <em style={{ fontStyle: "italic", color: T.gold }}>blog</em></>}
            desc="Thoughts on loan servicing, credit markets, and operational best practices from the Sandspire team."
          />
          <div ref={ref} className="reveal" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", 
            gap: 24 
          }}>
            {blogs.length > 0 ? blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            )) : (
              <p style={{ color: T.mist, textAlign: "center", gridColumn: "1 / -1" }}>No blog posts yet. Check back soon!</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

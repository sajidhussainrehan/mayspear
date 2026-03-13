import useReveal from "../hooks/useReveal.js";
import SectionHeader from "./shared/SectionHeader.jsx";
import T from "../styles/theme.js";

const BLOG_POSTS = [
  {
    date: "March 2026",
    category: "Market Insights",
    title: "European Private Credit: Servicing Trends for 2026",
    excerpt: "As the European private credit market continues to mature, institutional investors are demanding higher standards in loan administration and portfolio surveillance. We examine the key trends shaping the servicing landscape.",
    readTime: "5 min read"
  },
  {
    date: "February 2026",
    category: "Regulatory",
    title: "SFDR Compliance: What Fund Managers Need to Know",
    excerpt: "The Sustainable Finance Disclosure Regulation continues to evolve. Our guide to SFDR reporting requirements and how specialised servicers can support compliance workflows.",
    readTime: "4 min read"
  },
  {
    date: "January 2026",
    category: "Best Practices",
    title: "Loan Onboarding: Building Efficiency from Day One",
    excerpt: "The first 48 hours of a servicing mandate set the tone for the entire relationship. Best practices for data migration, documentation review, and counterparty setup.",
    readTime: "6 min read"
  },
  {
    date: "December 2025",
    category: "Case Study",
    title: "Restructuring Success: A CRE Portfolio Case Study",
    excerpt: "How proactive surveillance and early engagement with borrowers helped preserve value across a €200M commercial real estate portfolio during market volatility.",
    readTime: "8 min read"
  }
];

function BlogCard({ date, category, title, excerpt, readTime }) {
  return (
    <article style={{ 
      background: T.navy, 
      border: `1px solid rgba(200,165,92,0.08)`,
      padding: "32px",
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
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: "0.7rem", color: T.goldDim, letterSpacing: "0.05em" }}>{date}</span>
        <span style={{ width: 4, height: 4, background: T.gold, borderRadius: "50%" }} />
        <span style={{ fontSize: "0.7rem", color: T.gold, letterSpacing: "0.05em" }}>{category}</span>
      </div>
      <h3 className="serif" style={{ fontSize: "1.25rem", fontWeight: 500, color: T.pure, marginBottom: 12, lineHeight: 1.3 }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: T.mist, marginBottom: 20 }}>
        {excerpt}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.75rem", color: T.steel }}>{readTime}</span>
        <span style={{ fontSize: "0.8rem", color: T.gold, display: "flex", alignItems: "center", gap: 6 }}>
          Read more <span>→</span>
        </span>
      </div>
    </article>
  );
}

export default function Blog() {
  const ref = useReveal();
  return (
    <section id="blog" style={{ padding: "clamp(80px,10vw,140px) 0", background: T.midnight }}>
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
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={i} {...post} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#" style={{ 
            display: "inline-block", 
            padding: "14px 32px", 
            fontSize: "0.8rem", 
            fontWeight: 600, 
            letterSpacing: "0.1em", 
            textTransform: "uppercase", 
            color: T.gold, 
            border: `1px solid rgba(200,165,92,0.3)`,
            textDecoration: "none",
            transition: "all 0.35s"
          }}
          onMouseEnter={e => {
            e.target.style.background = "rgba(200,165,92,0.05)";
            e.target.style.borderColor = "rgba(200,165,92,1)";
          }}
          onMouseLeave={e => {
            e.target.style.background = "transparent";
            e.target.style.borderColor = "rgba(200,165,92,0.3)";
          }}>
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
}

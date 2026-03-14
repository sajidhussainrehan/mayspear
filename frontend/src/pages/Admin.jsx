import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import T from "../styles/theme.js";
import { getBlogs, saveBlog, deleteBlog, getNews, saveNews, deleteNews } from "../services/storage.js";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("blog");
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  
  const [blogForm, setBlogForm] = useState({
    date: "",
    category: "Market Insights",
    title: "",
    excerpt: "",
    readTime: "5 min read",
    content: ""
  });
  
  const [newsForm, setNewsForm] = useState({
    date: "",
    type: "Company",
    title: "",
    content: ""
  });

  useEffect(() => {
    setBlogs(getBlogs());
    setNews(getNews());
  }, []);

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = saveBlog(blogForm);
    setBlogs([newBlog, ...blogs]);
    setBlogForm({
      date: "",
      category: "Market Insights",
      title: "",
      excerpt: "",
      readTime: "5 min read",
      content: ""
    });
    alert("Blog post added successfully!");
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    const newNews = saveNews(newsForm);
    setNews([newNews, ...news]);
    setNewsForm({
      date: "",
      type: "Company",
      title: "",
      content: ""
    });
    alert("News item added successfully!");
  };

  const handleDeleteBlog = (id) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const handleDeleteNews = (id) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      deleteNews(id);
      setNews(news.filter(n => n.id !== id));
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "0.9rem",
    background: T.navy,
    border: `1px solid ${T.slate}`,
    color: T.pearl,
    borderRadius: "4px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none"
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: T.silver,
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };

  const buttonStyle = {
    padding: "14px 32px",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.midnight,
    background: T.gold,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  return (
    <div style={{ minHeight: "100vh", background: T.midnight }}>
      <header style={{ 
        background: T.navy, 
        borderBottom: `1px solid rgba(200,165,92,0.15)`,
        padding: "0 clamp(24px,5vw,80px)"
      }}>
        <div style={{ 
          maxWidth: 1280, 
          margin: "0 auto",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="serif" style={{ fontSize: "1.35rem", fontWeight: 500, letterSpacing: "0.04em", color: T.pure }}>
              SANDSPIRE <span style={{ color: T.gold }}>ADMIN</span>
            </span>
          </Link>
          <Link to="/" style={{ color: T.silver, textDecoration: "none", fontSize: "0.9rem" }}>
            ← Back to Site
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px clamp(24px,5vw,80px)" }}>
        <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 300, color: T.pure, marginBottom: 40 }}>
          Content Management
        </h1>

        <div style={{ display: "flex", gap: 8, marginBottom: 40, borderBottom: `1px solid ${T.slate}` }}>
          <button
            onClick={() => setActiveTab("blog")}
            style={{
              padding: "16px 32px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === "blog" ? `2px solid ${T.gold}` : "2px solid transparent",
              color: activeTab === "blog" ? T.gold : T.silver,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab("news")}
            style={{
              padding: "16px 32px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === "news" ? `2px solid ${T.gold}` : "2px solid transparent",
              color: activeTab === "news" ? T.gold : T.silver,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            News Items
          </button>
        </div>

        {activeTab === "blog" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <form onSubmit={handleBlogSubmit} style={{ background: T.navy, padding: 32, borderRadius: "8px", border: `1px solid ${T.slate}` }}>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.gold, marginBottom: 24 }}>
                Add New Blog Post
              </h2>
              
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Date</label>
                <input
                  type="text"
                  value={blogForm.date}
                  onChange={e => setBlogForm({...blogForm, date: e.target.value})}
                  placeholder="e.g., March 2026"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Category</label>
                <select
                  value={blogForm.category}
                  onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                  style={inputStyle}
                >
                  <option>Market Insights</option>
                  <option>Regulatory</option>
                  <option>Best Practices</option>
                  <option>Case Study</option>
                  <option>Thought Leadership</option>
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                  placeholder="Blog post title"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Excerpt</label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})}
                  placeholder="Short description..."
                  rows={3}
                  style={{...inputStyle, resize: "vertical"}}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Read Time</label>
                <input
                  type="text"
                  value={blogForm.readTime}
                  onChange={e => setBlogForm({...blogForm, readTime: e.target.value})}
                  placeholder="e.g., 5 min read"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Content</label>
                <textarea
                  value={blogForm.content}
                  onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                  placeholder="Full article content..."
                  rows={6}
                  style={{...inputStyle, resize: "vertical"}}
                />
              </div>

              <button type="submit" style={buttonStyle}>Add Blog Post</button>
            </form>

            <div>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.pure, marginBottom: 24 }}>
                Existing Blog Posts ({blogs.length})
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {blogs.map(blog => (
                  <div key={blog.id} style={{ background: T.navy, padding: 20, borderRadius: "6px", border: `1px solid ${T.slate}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.7rem", color: T.gold }}>{blog.category}</span>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        style={{ background: "none", border: "none", color: T.mist, cursor: "pointer", fontSize: "0.8rem" }}
                      >
                        Delete
                      </button>
                    </div>
                    <h4 style={{ fontSize: "0.95rem", color: T.pure, marginBottom: 8 }}>{blog.title}</h4>
                    <span style={{ fontSize: "0.75rem", color: T.steel }}>{blog.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "news" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <form onSubmit={handleNewsSubmit} style={{ background: T.navy, padding: 32, borderRadius: "8px", border: `1px solid ${T.slate}` }}>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.gold, marginBottom: 24 }}>
                Add News Item
              </h2>
              
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Date</label>
                <input
                  type="text"
                  value={newsForm.date}
                  onChange={e => setNewsForm({...newsForm, date: e.target.value})}
                  placeholder="e.g., 12 Mar 2026"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Type</label>
                <select
                  value={newsForm.type}
                  onChange={e => setNewsForm({...newsForm, type: e.target.value})}
                  style={inputStyle}
                >
                  <option>Company</option>
                  <option>Expansion</option>
                  <option>Mandate</option>
                  <option>Partnership</option>
                  <option>Recognition</option>
                  <option>Event</option>
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                  placeholder="News headline"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Content</label>
                <textarea
                  value={newsForm.content}
                  onChange={e => setNewsForm({...newsForm, content: e.target.value})}
                  placeholder="News content..."
                  rows={4}
                  style={{...inputStyle, resize: "vertical"}}
                  required
                />
              </div>

              <button type="submit" style={buttonStyle}>Add News Item</button>
            </form>

            <div>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.pure, marginBottom: 24 }}>
                Existing News Items ({news.length})
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {news.map(item => (
                  <div key={item.id} style={{ background: T.navy, padding: 20, borderRadius: "6px", border: `1px solid ${T.slate}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.7rem", color: T.goldDim }}>{item.type}</span>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        style={{ background: "none", border: "none", color: T.mist, cursor: "pointer", fontSize: "0.8rem" }}
                      >
                        Delete
                      </button>
                    </div>
                    <h4 style={{ fontSize: "0.95rem", color: T.pure, marginBottom: 8 }}>{item.title}</h4>
                    <span style={{ fontSize: "0.75rem", color: T.steel }}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

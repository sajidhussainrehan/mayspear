import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import T from "../styles/theme.js";
import { 
  getServices, createService, updateService, deleteService,
  getTeam, createTeamMember, updateTeamMember, deleteTeamMember,
  getNews, createNews, updateNews, deleteNewsAPI,
  getBlogs, createBlog, updateBlog, deleteBlogAPI
} from "../services/api.js";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    fontSize: "1rem",
    background: T.navy,
    border: `1px solid ${T.slate}`,
    color: T.pearl,
    borderRadius: "6px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    marginBottom: "16px"
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: T.midnight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form onSubmit={handleSubmit} style={{ 
        background: T.navy, 
        padding: "48px", 
        borderRadius: "12px", 
        border: `1px solid ${T.slate}`,
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 className="serif" style={{ 
          fontSize: "1.8rem", 
          fontWeight: 300, 
          color: T.gold, 
          marginBottom: "8px",
          textAlign: "center"
        }}>
          Admin Login
        </h1>
        <p style={{ 
          fontSize: "0.9rem", 
          color: T.mist, 
          marginBottom: "32px",
          textAlign: "center"
        }}>
          Sandspire Global Content Management
        </p>

        {error && (
          <div style={{ 
            background: "rgba(220,53,69,0.1)", 
            border: "1px solid rgba(220,53,69,0.3)",
            color: "#ff6b6b",
            padding: "12px 16px",
            borderRadius: "6px",
            fontSize: "0.85rem",
            marginBottom: "20px"
          }}>
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <button type="submit" style={{
          width: "100%",
          padding: "14px",
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: T.midnight,
          background: T.gold,
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginTop: "8px"
        }}>
          Sign In
        </button>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link to="/" style={{ color: T.silver, textDecoration: "none", fontSize: "0.85rem" }}>
            ← Back to Website
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  
  // Form states
  const [serviceForm, setServiceForm] = useState({ icon: "shield", title: "", description: "" });
  const [teamForm, setTeamForm] = useState({ name: "", role: "", bio: "", image: null });
  const [blogForm, setBlogForm] = useState({ date: "", category: "Market Insights", title: "", description: "", thumbnail: null });
  const [newsForm, setNewsForm] = useState({ date: "", category: "Company", title: "", description: "", thumbnail: null });

  useEffect(() => {
    const auth = localStorage.getItem("admin_authenticated");
    if (auth === "true") setIsAuthenticated(true);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [s, t, b, n] = await Promise.all([getServices(), getTeam(), getBlogs(), getNews()]);
      setServices(s);
      setTeam(t);
      setBlogs(b);
      setNews(n);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  // Service handlers
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    await createService(serviceForm);
    setServiceForm({ icon: "shield", title: "", description: "" });
    loadData();
    alert("Service added!");
  };
  const handleDeleteService = async (id) => {
    if (confirm("Delete this service?")) {
      await deleteService(id);
      loadData();
    }
  };

  // Team handlers
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    await createTeamMember(teamForm);
    setTeamForm({ name: "", role: "", bio: "", image: null });
    loadData();
    alert("Team member added!");
  };
  const handleDeleteTeam = async (id) => {
    if (confirm("Delete this team member?")) {
      await deleteTeamMember(id);
      loadData();
    }
  };

  // Blog handlers
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    await createBlog(blogForm);
    setBlogForm({ date: "", category: "Market Insights", title: "", description: "", thumbnail: null });
    loadData();
    alert("Blog post added!");
  };
  const handleDeleteBlog = async (id) => {
    if (confirm("Delete this blog?")) {
      await deleteBlogAPI(id);
      loadData();
    }
  };

  // News handlers
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    await createNews(newsForm);
    setNewsForm({ date: "", category: "Company", title: "", description: "", thumbnail: null });
    loadData();
    alert("News item added!");
  };
  const handleDeleteNews = async (id) => {
    if (confirm("Delete this news?")) {
      await deleteNewsAPI(id);
      loadData();
    }
  };

  if (!isAuthenticated) return <LoginForm onLogin={handleLogin} />;

  const inputStyle = {
    width: "100%", padding: "12px 16px", fontSize: "0.9rem", background: T.navy,
    border: `1px solid ${T.slate}`, color: T.pearl, borderRadius: "4px", fontFamily: "'DM Sans', sans-serif",
    outline: "none", marginBottom: "16px"
  };
  const labelStyle = {
    display: "block", fontSize: "0.8rem", fontWeight: 500, color: T.silver,
    marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em"
  };
  const buttonStyle = {
    padding: "14px 32px", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em",
    textTransform: "uppercase", color: T.midnight, background: T.gold, border: "none",
    borderRadius: "4px", cursor: "pointer"
  };

  const tabs = [
    { id: "services", label: "Services" },
    { id: "team", label: "Team" },
    { id: "blog", label: "Blog" },
    { id: "news", label: "News" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.midnight }}>
      <header style={{ background: T.navy, borderBottom: `1px solid rgba(200,165,92,0.15)`, padding: "0 clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="serif" style={{ fontSize: "1.35rem", fontWeight: 500, letterSpacing: "0.04em", color: T.pure }}>
              SANDSPIRE <span style={{ color: T.gold }}>ADMIN</span>
            </span>
          </Link>
          <div>
            <Link to="/" style={{ color: T.silver, textDecoration: "none", fontSize: "0.9rem" }}>← Back to Site</Link>
            <button onClick={handleLogout} style={{ background: "none", border: `1px solid ${T.goldDim}`, color: T.goldDim, padding: "8px 16px", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", marginLeft: "16px" }}>Logout</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px clamp(24px,5vw,80px)" }}>
        <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 300, color: T.pure, marginBottom: 40 }}>Content Management</h1>

        <div style={{ display: "flex", gap: 8, marginBottom: 40, borderBottom: `1px solid ${T.slate}` }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "16px 32px", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", background: "transparent", border: "none",
              borderBottom: activeTab === t.id ? `2px solid ${T.gold}` : "2px solid transparent",
              color: activeTab === t.id ? T.gold : T.silver, cursor: "pointer"
            }}>{t.label}</button>
          ))}
        </div>

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <form onSubmit={handleServiceSubmit} style={{ background: T.navy, padding: 32, borderRadius: "8px", border: `1px solid ${T.slate}` }}>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.gold, marginBottom: 24 }}>Add Service</h2>
              <label style={labelStyle}>Icon</label>
              <select value={serviceForm.icon} onChange={e => setServiceForm({...serviceForm, icon: e.target.value})} style={inputStyle}>
                <option value="shield">Shield</option><option value="file">File</option><option value="eye">Eye</option>
                <option value="tool">Tool</option><option value="search">Search</option><option value="chart">Chart</option>
              </select>
              <label style={labelStyle}>Title</label>
              <input type="text" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} style={inputStyle} required />
              <label style={labelStyle}>Description</label>
              <textarea value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} rows={3} style={{...inputStyle, resize: "vertical"}} required />
              <button type="submit" style={buttonStyle}>Add Service</button>
            </form>
            <div>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.pure, marginBottom: 24 }}>Services ({services.length})</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {services.map(s => (
                  <div key={s.id} style={{ background: T.navy, padding: 20, borderRadius: "6px", border: `1px solid ${T.slate}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: T.gold }}>{s.icon}</span>
                      <button onClick={() => handleDeleteService(s.id)} style={{ background: "none", border: "none", color: T.mist, cursor: "pointer" }}>Delete</button>
                    </div>
                    <h4 style={{ color: T.pure, margin: "8px 0" }}>{s.title}</h4>
                    <p style={{ fontSize: "0.8rem", color: T.mist }}>{s.description.slice(0, 60)}...</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === "team" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <form onSubmit={handleTeamSubmit} style={{ background: T.navy, padding: 32, borderRadius: "8px", border: `1px solid ${T.slate}` }}>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.gold, marginBottom: 24 }}>Add Team Member</h2>
              <label style={labelStyle}>Name</label>
              <input type="text" value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} style={inputStyle} required />
              <label style={labelStyle}>Role</label>
              <input type="text" value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} style={inputStyle} required />
              <label style={labelStyle}>Bio</label>
              <textarea value={teamForm.bio} onChange={e => setTeamForm({...teamForm, bio: e.target.value})} rows={3} style={{...inputStyle, resize: "vertical"}} required />
              <label style={labelStyle}>Photo</label>
              <input type="file" accept="image/*" onChange={e => setTeamForm({...teamForm, image: e.target.files[0]})} style={{ color: T.silver, marginBottom: 16 }} />
              <button type="submit" style={buttonStyle}>Add Member</button>
            </form>
            <div>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.pure, marginBottom: 24 }}>Team ({team.length})</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {team.map(m => (
                  <div key={m.id} style={{ background: T.navy, padding: 16, borderRadius: "6px", border: `1px solid ${T.slate}`, textAlign: "center" }}>
                    {m.image && <img src={m.image} alt={m.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 12 }} />}
                    <h4 style={{ color: T.pure, fontSize: "0.9rem" }}>{m.name}</h4>
                    <p style={{ color: T.goldDim, fontSize: "0.75rem" }}>{m.role}</p>
                    <button onClick={() => handleDeleteTeam(m.id)} style={{ background: "none", border: "none", color: T.mist, cursor: "pointer", fontSize: "0.75rem", marginTop: 8 }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === "blog" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <form onSubmit={handleBlogSubmit} style={{ background: T.navy, padding: 32, borderRadius: "8px", border: `1px solid ${T.slate}` }}>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.gold, marginBottom: 24 }}>Add Blog Post</h2>
              <label style={labelStyle}>Date</label>
              <input type="text" value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})} placeholder="e.g., March 2026" style={inputStyle} required />
              <label style={labelStyle}>Category</label>
              <select value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} style={inputStyle}>
                <option>Market Insights</option><option>Regulatory</option><option>Best Practices</option><option>Case Study</option>
              </select>
              <label style={labelStyle}>Title</label>
              <input type="text" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} style={inputStyle} required />
              <label style={labelStyle}>Description</label>
              <textarea value={blogForm.description} onChange={e => setBlogForm({...blogForm, description: e.target.value})} rows={3} style={{...inputStyle, resize: "vertical"}} required />
              <label style={labelStyle}>Thumbnail</label>
              <input type="file" accept="image/*" onChange={e => setBlogForm({...blogForm, thumbnail: e.target.files[0]})} style={{ color: T.silver, marginBottom: 16 }} />
              <button type="submit" style={buttonStyle}>Add Blog</button>
            </form>
            <div>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.pure, marginBottom: 24 }}>Blog Posts ({blogs.length})</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {blogs.map(b => (
                  <div key={b.id} style={{ background: T.navy, padding: 16, borderRadius: "6px", border: `1px solid ${T.slate}`, display: "flex", gap: 16 }}>
                    {b.thumbnail && <img src={b.thumbnail} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: "4px" }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: T.gold, fontSize: "0.7rem" }}>{b.category}</span>
                        <button onClick={() => handleDeleteBlog(b.id)} style={{ background: "none", border: "none", color: T.mist, cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
                      </div>
                      <h4 style={{ color: T.pure, fontSize: "0.9rem", margin: "4px 0" }}>{b.title}</h4>
                      <span style={{ color: T.steel, fontSize: "0.7rem" }}>{b.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === "news" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <form onSubmit={handleNewsSubmit} style={{ background: T.navy, padding: 32, borderRadius: "8px", border: `1px solid ${T.slate}` }}>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.gold, marginBottom: 24 }}>Add News Item</h2>
              <label style={labelStyle}>Date (auto: today if empty)</label>
              <input type="text" value={newsForm.date} onChange={e => setNewsForm({...newsForm, date: e.target.value})} placeholder="e.g., 12 Mar 2026" style={inputStyle} />
              <label style={labelStyle}>Category</label>
              <select value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})} style={inputStyle}>
                <option>Company</option><option>Expansion</option><option>Mandate</option><option>Partnership</option><option>Recognition</option>
              </select>
              <label style={labelStyle}>Title</label>
              <input type="text" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} style={inputStyle} required />
              <label style={labelStyle}>Description</label>
              <textarea value={newsForm.description} onChange={e => setNewsForm({...newsForm, description: e.target.value})} rows={3} style={{...inputStyle, resize: "vertical"}} required />
              <label style={labelStyle}>Thumbnail</label>
              <input type="file" accept="image/*" onChange={e => setNewsForm({...newsForm, thumbnail: e.target.files[0]})} style={{ color: T.silver, marginBottom: 16 }} />
              <button type="submit" style={buttonStyle}>Add News</button>
            </form>
            <div>
              <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: T.pure, marginBottom: 24 }}>News Items ({news.length})</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {news.map(n => (
                  <div key={n.id} style={{ background: T.navy, padding: 16, borderRadius: "6px", border: `1px solid ${T.slate}`, display: "flex", gap: 16 }}>
                    {n.thumbnail && <img src={n.thumbnail} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: "4px" }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: T.goldDim, fontSize: "0.7rem" }}>{n.category}</span>
                        <button onClick={() => handleDeleteNews(n.id)} style={{ background: "none", border: "none", color: T.mist, cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
                      </div>
                      <h4 style={{ color: T.pure, fontSize: "0.9rem", margin: "4px 0" }}>{n.title}</h4>
                      <span style={{ color: T.steel, fontSize: "0.7rem" }}>{n.date}</span>
                    </div>
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

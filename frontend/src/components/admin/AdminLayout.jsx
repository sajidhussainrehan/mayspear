import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/blogs", label: "Blogs" },
    { path: "/admin/enquiries", label: "Enquiries" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0C0B09", color: "#EDE8E0", fontFamily: "system-ui, sans-serif" }}>
      {/* Admin Header */}
      <header style={{ 
        borderBottom: "1px solid rgba(200,191,176,0.1)", 
        padding: "16px 24px",
        background: "rgba(12,11,9,0.97)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.1em" }}>MAYSPEAR ADMIN</h1>
          <span style={{ color: "#B8964A", fontSize: "0.7rem" }}>●</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link to="/" style={{ color: "#C8BFB0", textDecoration: "none", fontSize: "0.85rem" }}>
            ← Back to Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid rgba(200,191,176,0.2)",
              color: "#C8BFB0",
              padding: "8px 16px",
              fontSize: "0.75rem",
              fontFamily: "'Fira Mono', monospace",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#C4503A";
              e.target.style.color = "#C4503A";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(200,191,176,0.2)";
              e.target.style.color = "#C8BFB0";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin Nav */}
      <nav style={{ 
        borderBottom: "1px solid rgba(200,191,176,0.08)", 
        padding: "0 24px",
        background: "rgba(20,18,16,0.95)"
      }}>
        <ul style={{ 
          listStyle: "none", 
          margin: 0, 
          padding: 0, 
          display: "flex", 
          gap: "4px" 
        }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    display: "block",
                    padding: "14px 20px",
                    color: isActive ? "#B8964A" : "#C8BFB0",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    letterSpacing: "0.05em",
                    borderBottom: isActive ? "2px solid #B8964A" : "2px solid transparent",
                    transition: "all 0.3s"
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin Content */}
      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}

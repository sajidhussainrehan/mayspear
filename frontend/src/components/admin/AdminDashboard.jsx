import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const cards = [
    { title: "Blogs", path: "/admin/blogs", count: "Manage posts", icon: "📝" },
    { title: "Services", path: "/admin/services", count: "Manage offerings", icon: "⚙️" },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: "24px", color: "#B8964A" }}>
        Dashboard
      </h2>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "20px" 
      }}>
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            style={{
              display: "block",
              padding: "24px",
              background: "rgba(200,191,176,0.05)",
              border: "1px solid rgba(200,191,176,0.1)",
              borderRadius: "4px",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#B8964A";
              e.currentTarget.style.background = "rgba(184,150,74,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,191,176,0.1)";
              e.currentTarget.style.background = "rgba(200,191,176,0.05)";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{card.icon}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem", fontWeight: 400 }}>{card.title}</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#C8BFB0" }}>{card.count}</p>
          </Link>
        ))}
      </div>

      <div style={{ 
        marginTop: "32px", 
        padding: "20px", 
        background: "rgba(184,150,74,0.08)", 
        border: "1px solid rgba(184,150,74,0.2)",
        borderRadius: "4px"
      }}>
        <h3 style={{ margin: "0 0 12px", fontSize: "1rem", color: "#B8964A" }}>Quick Actions</h3>
        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.9rem", lineHeight: 1.8 }}>
          <li>Publish a blog post</li>
          <li>Update service offerings</li>
        </ul>
      </div>
    </div>
  );
}

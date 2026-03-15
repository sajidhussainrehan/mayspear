import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0C0B09",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        background: "#141210",
        border: "1px solid rgba(200,191,176,0.1)",
        padding: "48px",
        width: "100%",
        maxWidth: "400px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.8rem",
            fontWeight: 300,
            color: "#EDE8E0",
            letterSpacing: "0.1em",
            marginBottom: "8px"
          }}>
            MAYSPEAR
          </h1>
          <p style={{
            fontFamily: "'Fira Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "#9A7B3C",
            textTransform: "uppercase"
          }}>
            Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontFamily: "'Fira Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.2em",
              color: "#C8BFB0",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                background: "#0C0B09",
                border: "1px solid rgba(200,191,176,0.15)",
                padding: "12px 16px",
                fontSize: "0.9rem",
                color: "#EDE8E0",
                outline: "none"
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              fontFamily: "'Fira Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.2em",
              color: "#C8BFB0",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                background: "#0C0B09",
                border: "1px solid rgba(200,191,176,0.15)",
                padding: "12px 16px",
                fontSize: "0.9rem",
                color: "#EDE8E0",
                outline: "none"
              }}
              required
            />
          </div>

          {error && (
            <p style={{
              color: "#C4503A",
              fontSize: "0.8rem",
              textAlign: "center",
              marginBottom: "16px"
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#9A7B3C",
              border: "none",
              padding: "14px",
              fontFamily: "'Fira Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0C0B09",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#B8964A"}
            onMouseLeave={(e) => e.target.style.background = "#9A7B3C"}
          >
            Sign In
          </button>
        </form>

        <p style={{
          textAlign: "center",
          marginTop: "24px",
          fontSize: "0.75rem",
          color: "rgba(200,191,176,0.4)"
        }}>
          <a href="/" style={{ color: "#C8BFB0", textDecoration: "none" }}>
            ← Back to Website
          </a>
        </p>
      </div>
    </div>
  );
}

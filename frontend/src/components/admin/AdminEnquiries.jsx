import { useState, useEffect } from "react";
import { getEnquiries, updateEnquiry, deleteEnquiry } from "../../services/api";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    try {
      const data = await getEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await deleteEnquiry(id);
        setEnquiries(prev => prev.filter(e => e._id !== id));
      } catch (error) {
        console.error("Failed to delete enquiry:", error);
        alert("Failed to delete enquiry");
      }
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateEnquiry(id, { status: newStatus });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#B8964A';
      case 'in-progress': return '#3C6E9A';
      case 'contacted': return '#5C9A3C';
      case 'closed': return '#9A7B7B';
      default: return '#B8964A';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#C8BFB0" }}>
        Loading enquiries...
      </div>
    );
  }

  if (showDetail && selected) {
    return (
      <div style={{ padding: "32px" }}>
        <button
          onClick={() => setShowDetail(false)}
          style={{
            background: "transparent",
            border: "1px solid rgba(200,191,176,0.2)",
            color: "#C8BFB0",
            padding: "8px 16px",
            marginBottom: "24px",
            cursor: "pointer",
            fontSize: "0.8rem"
          }}
        >
          ← Back to List
        </button>

        <div style={{ 
          background: "#141210", 
          border: "1px solid rgba(200,191,176,0.1)",
          padding: "32px",
          borderRadius: "4px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <div>
              <h2 style={{ margin: "0 0 8px 0", fontSize: "1.5rem", color: "#EDE8E0", fontWeight: 400 }}>
                {selected.name}
              </h2>
              <p style={{ margin: 0, color: "#9A8B7B", fontSize: "0.9rem" }}>
                {selected.firm || "No firm specified"} • {selected.role || "No role specified"}
              </p>
            </div>
            <select
              value={selected.status || 'new'}
              onChange={(e) => handleStatusChange(selected._id, e.target.value)}
              style={{
                background: "#0C0B09",
                border: `1px solid ${getStatusColor(selected.status || 'new')}`,
                color: getStatusColor(selected.status || 'new'),
                padding: "8px 16px",
                fontSize: "0.75rem",
                cursor: "pointer"
              }}
            >
              <option value="new" style={{ background: "#0C0B09" }}>New</option>
              <option value="in-progress" style={{ background: "#0C0B09" }}>In Progress</option>
              <option value="contacted" style={{ background: "#0C0B09" }}>Contacted</option>
              <option value="closed" style={{ background: "#0C0B09" }}>Closed</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px" }}>
            <div style={{ padding: "16px", background: "rgba(12,11,9,0.5)", borderRadius: "4px" }}>
              <label style={{ fontSize: "0.65rem", color: "#9A8B7B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Email</label>
              <p style={{ margin: "4px 0 0 0", color: "#EDE8E0" }}>{selected.email}</p>
            </div>
            <div style={{ padding: "16px", background: "rgba(12,11,9,0.5)", borderRadius: "4px" }}>
              <label style={{ fontSize: "0.65rem", color: "#9A8B7B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Enquiry Type</label>
              <p style={{ margin: "4px 0 0 0", color: "#EDE8E0" }}>{selected.type || "Not specified"}</p>
            </div>
            <div style={{ padding: "16px", background: "rgba(12,11,9,0.5)", borderRadius: "4px" }}>
              <label style={{ fontSize: "0.65rem", color: "#9A8B7B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Transaction Size</label>
              <p style={{ margin: "4px 0 0 0", color: "#EDE8E0" }}>{selected.size || "Not specified"}</p>
            </div>
            <div style={{ padding: "16px", background: "rgba(12,11,9,0.5)", borderRadius: "4px" }}>
              <label style={{ fontSize: "0.65rem", color: "#9A8B7B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sector</label>
              <p style={{ margin: "4px 0 0 0", color: "#EDE8E0" }}>{selected.sector || "Not specified"}</p>
            </div>
            <div style={{ padding: "16px", background: "rgba(12,11,9,0.5)", borderRadius: "4px" }}>
              <label style={{ fontSize: "0.65rem", color: "#9A8B7B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Geography</label>
              <p style={{ margin: "4px 0 0 0", color: "#EDE8E0" }}>{selected.geo || "Not specified"}</p>
            </div>
            <div style={{ padding: "16px", background: "rgba(12,11,9,0.5)", borderRadius: "4px" }}>
              <label style={{ fontSize: "0.65rem", color: "#9A8B7B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Expected Timeline</label>
              <p style={{ margin: "4px 0 0 0", color: "#EDE8E0" }}>{selected.timing || "Not specified"}</p>
            </div>
          </div>

          {selected.overview && (
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "0.65rem", color: "#9A8B7B", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Transaction Overview
              </label>
              <p style={{ 
                margin: "8px 0 0 0", 
                color: "#EDE8E0", 
                lineHeight: 1.6,
                whiteSpace: "pre-wrap"
              }}>
                {selected.overview}
              </p>
            </div>
          )}

          <div style={{ 
            borderTop: "1px solid rgba(200,191,176,0.1)",
            paddingTop: "16px",
            fontSize: "0.75rem",
            color: "#9A8B7B"
          }}>
            Submitted on {formatDate(selected.createdAt)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ 
        margin: "0 0 24px 0", 
        fontSize: "1.5rem", 
        fontWeight: 400, 
        color: "#EDE8E0",
        letterSpacing: "0.05em"
      }}>
        Mandate Enquiries
      </h1>

      {enquiries.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "#9A8B7B",
          background: "rgba(12,11,9,0.5)",
          borderRadius: "4px"
        }}>
          No enquiries received yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {enquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              style={{
                background: "#141210",
                border: "1px solid rgba(200,191,176,0.1)",
                padding: "20px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "border-color 0.3s"
              }}
              onClick={() => {
                setSelected(enquiry);
                setShowDetail(true);
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(200,191,176,0.3)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(200,191,176,0.1)"}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 400, color: "#EDE8E0" }}>
                    {enquiry.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      padding: "2px 8px",
                      borderRadius: "2px",
                      background: getStatusColor(enquiry.status || 'new'),
                      color: "#0C0B09",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {enquiry.status || 'new'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#9A8B7B" }}>
                  {enquiry.firm || "No firm"} • {enquiry.email} • {enquiry.type || "No type"}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "0.75rem", color: "#9A8B7B" }}>
                  {formatDate(enquiry.createdAt)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(enquiry._id);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #C4503A",
                    color: "#C4503A",
                    padding: "6px 12px",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    borderRadius: "2px"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { getServices, createService, updateService, deleteService } from "../../services/api";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ icon: "", title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await createService(formData);
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({ icon: item.icon, title: item.title, description: item.description });
    setEditingId(item._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ icon: "", title: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    background: "rgba(200,191,176,0.05)",
    border: "1px solid rgba(200,191,176,0.15)",
    color: "#EDE8E0",
    fontSize: "0.9rem",
    borderRadius: "4px",
    marginBottom: "12px"
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#B8964A",
    color: "#0C0B09",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#C8BFB0" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 300, color: "#B8964A", margin: 0 }}>Services Management</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={buttonStyle}
        >
          {showForm ? "Cancel" : "+ Add Service"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: "rgba(200,191,176,0.05)", 
          padding: "20px", 
          borderRadius: "4px",
          marginBottom: "24px",
          border: "1px solid rgba(200,191,176,0.1)"
        }}>
          <input 
            type="text" 
            placeholder="Icon (e.g., bars, card, circle, layers, warn, link)" 
            value={formData.icon}
            onChange={(e) => setFormData({...formData, icon: e.target.value})}
            style={inputStyle}
            required
          />
          <input 
            type="text" 
            placeholder="Title" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            style={inputStyle}
            required
          />
          <textarea 
            placeholder="Description" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={{...inputStyle, minHeight: "80px", resize: "vertical"}}
            required
          />
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" style={buttonStyle}>
              {editingId ? "Update Service" : "Create Service"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} style={{...buttonStyle, background: "#5C4920"}}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {services.length === 0 ? (
          <p style={{ color: "#C8BFB0", textAlign: "center", padding: "40px" }}>No services found.</p>
        ) : (
          services.map((item) => (
            <div 
              key={item._id} 
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: "rgba(200,191,176,0.03)",
                border: "1px solid rgba(200,191,176,0.08)",
                borderRadius: "4px"
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.75rem", color: "#B8964A", marginBottom: "4px" }}>Icon: {item.icon}</div>
                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 400, color: "#EDE8E0" }}>{item.title}</h3>
                <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#C8BFB0" }}>{item.description}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  onClick={() => handleEdit(item)}
                  style={{...buttonStyle, padding: "8px 16px", fontSize: "0.8rem", background: "#5C4920"}}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item._id)}
                  style={{...buttonStyle, padding: "8px 16px", fontSize: "0.8rem", background: "#C4503A"}}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

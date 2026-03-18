import { useState, useEffect } from "react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../../services/api";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    date: "", 
    category: "", 
    title: "", 
    subtitle: "", 
    author: "Mayspear Global", 
    issue: "", 
    description: "", 
    thumbnail: null 
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBlog(editingId, formData);
      } else {
        await createBlog(formData);
      }
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({ 
      date: item.date, 
      category: item.category, 
      title: item.title, 
      subtitle: item.subtitle || "", 
      author: item.author || "Mayspear Global", 
      issue: item.issue || "", 
      description: item.description, 
      thumbnail: null 
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ 
      date: "", 
      category: "", 
      title: "", 
      subtitle: "", 
      author: "Mayspear Global", 
      issue: "", 
      description: "", 
      thumbnail: null 
    });
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

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['table'],
      ['clean']
    ],
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#C8BFB0" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 300, color: "#B8964A", margin: 0 }}>Blog Management</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={buttonStyle}
        >
          {showForm ? "Cancel" : "+ Add Blog"}
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <input 
              type="text" 
              placeholder="Date (e.g., 15 Mar 2026)" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              style={inputStyle}
              required
            />
            <input 
              type="text" 
              placeholder="Category" 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={inputStyle}
              required
            />
          </div>
          <input 
            type="text" 
            placeholder="Title" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            style={inputStyle}
            required
          />
          <input 
            type="text" 
            placeholder="Subtitle" 
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            style={inputStyle}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <input 
              type="text" 
              placeholder="Author" 
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              style={inputStyle}
            />
            <input 
              type="text" 
              placeholder="Issue (e.g. Issue 01 | Q1 2026)" 
              value={formData.issue}
              onChange={(e) => setFormData({...formData, issue: e.target.value})}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "20px", background: "white", borderRadius: "4px" }}>
            <ReactQuill 
              theme="snow"
              value={formData.description}
              onChange={(val) => setFormData({...formData, description: val})}
              modules={quillModules}
              style={{ height: "300px", marginBottom: "45px", color: "#000" }}
            />
          </div>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFormData({...formData, thumbnail: e.target.files[0]})}
            style={{...inputStyle, padding: "8px"}}
          />
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" style={buttonStyle}>
              {editingId ? "Update Blog" : "Create Blog"}
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
        {blogs.length === 0 ? (
          <p style={{ color: "#C8BFB0", textAlign: "center", padding: "40px" }}>No blog posts found.</p>
        ) : (
          blogs.map((item) => (
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
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.75rem", color: "#B8964A" }}>{item.date}</span>
                  <span style={{ fontSize: "0.7rem", color: "#C8BFB0", background: "rgba(200,191,176,0.1)", padding: "2px 8px", borderRadius: "3px" }}>{item.category}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 400, color: "#EDE8E0" }}>{item.title}</h3>
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

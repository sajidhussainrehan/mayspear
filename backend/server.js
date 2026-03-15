require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cloudinary = require('./config/cloudinary.js');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Import models
const Service = require('./models/Service.js');
const Team = require('./models/Team.js');
const News = require('./models/News.js');
const Blog = require('./models/Blog.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sandspire',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ============ SERVICES API ============
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const { icon, title, description } = req.body;
    const newService = await Service.create({ icon, title, description });
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ error: 'Service not found' });
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============ TEAM API ============
app.get('/api/team', async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/team', upload.single('image'), async (req, res) => {
  try {
    const { name, role, bio } = req.body;
    const image = req.file ? req.file.path : null;
    const newMember = await Team.create({ name, role, bio, image });
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/team/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      // Delete old image from Cloudinary if exists
      const existing = await Team.findById(id);
      if (existing && existing.image) {
        const publicId = existing.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`sandspire/${publicId}`);
      }
      updateData.image = req.file.path;
    }
    const updated = await Team.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Team member not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Team.findById(id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    
    // Delete image from Cloudinary if exists
    if (member.image) {
      const publicId = member.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`sandspire/${publicId}`);
    }
    
    await Team.findByIdAndDelete(id);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============ NEWS API ============
app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/news', upload.single('thumbnail'), async (req, res) => {
  try {
    const { date, category, title, description } = req.body;
    const newsDate = date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const thumbnail = req.file ? req.file.path : null;
    const newNews = await News.create({ date: newsDate, category, title, description, thumbnail });
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/news/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      // Delete old thumbnail from Cloudinary if exists
      const existing = await News.findById(id);
      if (existing && existing.thumbnail) {
        const publicId = existing.thumbnail.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`sandspire/${publicId}`);
      }
      updateData.thumbnail = req.file.path;
    }
    const updated = await News.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'News not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await News.findById(id);
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    
    // Delete thumbnail from Cloudinary if exists
    if (newsItem.thumbnail) {
      const publicId = newsItem.thumbnail.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`sandspire/${publicId}`);
    }
    
    await News.findByIdAndDelete(id);
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============ BLOGS API ============
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blogs', upload.single('thumbnail'), async (req, res) => {
  try {
    const { date, category, title, description } = req.body;
    const blogDate = date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const thumbnail = req.file ? req.file.path : null;
    const newBlog = await Blog.create({ date: blogDate, category, title, description, thumbnail });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/blogs/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      // Delete old thumbnail from Cloudinary if exists
      const existing = await Blog.findById(id);
      if (existing && existing.thumbnail) {
        const publicId = existing.thumbnail.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`sandspire/${publicId}`);
      }
      updateData.thumbnail = req.file.path;
    }
    const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Blog not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    // Delete thumbnail from Cloudinary if exists
    if (blog.thumbnail) {
      const publicId = blog.thumbnail.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`sandspire/${publicId}`);
    }
    
    await Blog.findByIdAndDelete(id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = (req, res) => {
  return app(req, res);
};
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cloudinary = require('./config/cloudinary.js');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Import models
const Team = require('./models/Team.js');
const Blog = require('./models/Blog.js');
const Enquiry = require('./models/Enquiry.js');

const app = express();

// Connect to MongoDB with connection caching for serverless
let dbConnected = false;
let dbConnectionPromise = null;

const connectToDatabase = async () => {
  if (dbConnected) return;
  if (dbConnectionPromise) {
    await dbConnectionPromise;
    return;
  }
  dbConnectionPromise = connectDB().then(() => {
    dbConnected = true;
  });
  await dbConnectionPromise;
};

// Middleware
app.use(cors());
app.use(express.json());

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

// Helper to wrap routes with DB connection
const withDB = (handler) => async (req, res, next) => {
  try {
    await connectToDatabase();
    await handler(req, res, next);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Root route
app.get('/', withDB(async (req, res) => {
  res.json({ message: 'API is running', db: dbConnected });
}));

// Base API route for health check
app.get('/api', (req, res) => {
  res.json({ message: 'Mayspear API is running' });
});

// ============ TEAM API ============
app.get('/api/team', withDB(async (req, res) => {
  const team = await Team.find().sort({ createdAt: 1 });
  res.json(team);
}));

app.post('/api/team', upload.single('image'), withDB(async (req, res) => {
  const { name, role, bio } = req.body;
  const image = req.file ? req.file.path : null;
  const newMember = await Team.create({ name, role, bio, image });
  res.status(201).json(newMember);
}));

app.put('/api/team/:id', upload.single('image'), withDB(async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  if (req.file) {
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
}));

app.delete('/api/team/:id', withDB(async (req, res) => {
  const { id } = req.params;
  const member = await Team.findById(id);
  if (!member) return res.status(404).json({ error: 'Team member not found' });

  if (member.image) {
    const publicId = member.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`sandspire/${publicId}`);
  }

  await Team.findByIdAndDelete(id);
  res.json({ message: 'Team member deleted' });
}));

// ============ NEWS API ============
// ============ BLOGS API ============
app.get('/api/blogs', withDB(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
}));

app.get('/api/blogs/:id', withDB(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  res.json(blog);
}));

app.post('/api/blogs', upload.single('thumbnail'), withDB(async (req, res) => {
  const { date, category, title, subtitle, author, issue, description } = req.body;
  const blogDate = date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const thumbnail = req.file ? req.file.path : null;
  const newBlog = await Blog.create({ date: blogDate, category, title, subtitle, author, issue, description, thumbnail });
  res.status(201).json(newBlog);
}));

app.put('/api/blogs/:id', upload.single('thumbnail'), withDB(async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  if (req.file) {
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
}));

app.delete('/api/blogs/:id', withDB(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  if (blog.thumbnail) {
    const publicId = blog.thumbnail.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`sandspire/${publicId}`);
  }

  await Blog.findByIdAndDelete(id);
  res.json({ message: 'Blog deleted' });
}));

// ============ ENQUIRIES API ============
app.get('/api/enquiries', withDB(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
}));

app.post('/api/enquiries', withDB(async (req, res) => {
  const { name, firm, role, email, type, size, sector, geo, timing, overview } = req.body;
  const newEnquiry = await Enquiry.create({
    name, firm, role, email, type, size, sector, geo, timing, overview
  });
  res.status(201).json(newEnquiry);
}));

app.put('/api/enquiries/:id', withDB(async (req, res) => {
  const { id } = req.params;
  const updated = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
  res.json(updated);
}));

app.delete('/api/enquiries/:id', withDB(async (req, res) => {
  const { id } = req.params;
  const deleted = await Enquiry.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Enquiry not found' });
  res.json({ message: 'Enquiry deleted' });
}));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

// Export for Vercel serverless
module.exports = (req, res) => {
  return app(req, res);
};
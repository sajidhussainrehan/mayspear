const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// In-memory data storage
let data = {
  services: [
    { id: '1', icon: 'shield', title: 'Loan Administration', description: 'Comprehensive loan servicing including payment processing, escrow management, and covenant monitoring for institutional portfolios.' },
    { id: '2', icon: 'file', title: 'Facility Agency', description: 'Expert agency services for syndicated facilities, managing lender communications, waivers, and consent processes.' },
    { id: '3', icon: 'eye', title: 'Asset Surveillance', description: 'Proactive monitoring and early warning systems to identify and address credit deterioration before it impacts returns.' },
    { id: '4', icon: 'tool', title: 'Special Servicing', description: 'Workout and restructuring expertise for distressed assets, maximizing recovery value through active management.' },
    { id: '5', icon: 'search', title: 'Due Diligence', description: 'Thorough pre-acquisition reviews and ongoing compliance monitoring to protect investor interests.' },
    { id: '6', icon: 'chart', title: 'Investor Reporting', description: 'Transparent, timely reporting tailored to fund requirements and regulatory standards.' }
  ],
  team: [
    { 
      id: '1', 
      name: 'James Richardson', 
      role: 'Managing Partner', 
      bio: 'Former head of European loan servicing at a major global bank with 20+ years of experience in credit asset management.',
      image: null
    },
    { 
      id: '2', 
      name: 'Sarah Chen', 
      role: 'Head of Operations', 
      bio: 'Led servicing operations for €15B+ of private credit assets across multiple European jurisdictions.',
      image: null
    },
    { 
      id: '3', 
      name: 'Michael Torres', 
      role: 'Chief Risk Officer', 
      bio: 'Deep expertise in credit risk assessment, portfolio surveillance, and regulatory compliance frameworks.',
      image: null
    },
    { 
      id: '4', 
      name: 'Emma Williams', 
      role: 'Head of Special Servicing', 
      bio: 'Specialized in distressed debt restructuring with a track record of maximizing recovery values.',
      image: null
    }
  ],
  news: [
    {
      id: '1',
      date: '12 Mar 2026',
      category: 'Company',
      title: 'Sandspire Global Announces New Advisory Board Member',
      description: 'We are pleased to welcome a senior industry executive with over 25 years of experience in European credit markets to our advisory board.',
      thumbnail: null
    },
    {
      id: '2',
      date: '28 Feb 2026',
      category: 'Expansion',
      title: 'New Office Opening in Luxembourg',
      description: 'Sandspire Global expands its European presence with a new office in Luxembourg to better serve clients in the Benelux region.',
      thumbnail: null
    }
  ],
  blogs: [
    {
      id: '1',
      date: 'March 2026',
      category: 'Market Insights',
      title: 'European Private Credit: Servicing Trends for 2026',
      description: 'As the European private credit market continues to mature, institutional investors are demanding higher standards in loan administration and portfolio surveillance.',
      thumbnail: null
    },
    {
      id: '2',
      date: 'February 2026',
      category: 'Regulatory',
      title: 'SFDR Compliance: What Fund Managers Need to Know',
      description: 'The Sustainable Finance Disclosure Regulation continues to evolve. Our guide to SFDR reporting requirements.',
      thumbnail: null
    }
  ]
};

// ============ SERVICES API ============
app.get('/api/services', (req, res) => {
  res.json(data.services);
});

app.post('/api/services', (req, res) => {
  const { icon, title, description } = req.body;
  const newService = {
    id: Date.now().toString(),
    icon,
    title,
    description
  };
  data.services.push(newService);
  res.status(201).json(newService);
});

app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const index = data.services.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }
  data.services[index] = { ...data.services[index], ...req.body };
  res.json(data.services[index]);
});

app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  data.services = data.services.filter(s => s.id !== id);
  res.json({ message: 'Service deleted' });
});

// ============ TEAM API ============
app.get('/api/team', (req, res) => {
  res.json(data.team);
});

app.post('/api/team', upload.single('image'), (req, res) => {
  const { name, role, bio } = req.body;
  const newMember = {
    id: Date.now().toString(),
    name,
    role,
    bio,
    image: req.file ? `/uploads/${req.file.filename}` : null
  };
  data.team.push(newMember);
  res.status(201).json(newMember);
});

app.put('/api/team/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const index = data.team.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Team member not found' });
  }
  const updateData = { ...req.body };
  if (req.file) {
    // Delete old image if exists
    if (data.team[index].image) {
      const oldPath = data.team[index].image.replace('/uploads/', 'uploads/');
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    updateData.image = `/uploads/${req.file.filename}`;
  }
  data.team[index] = { ...data.team[index], ...updateData };
  res.json(data.team[index]);
});

app.delete('/api/team/:id', (req, res) => {
  const { id } = req.params;
  const member = data.team.find(t => t.id === id);
  if (member && member.image) {
    const imagePath = member.image.replace('/uploads/', 'uploads/');
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  data.team = data.team.filter(t => t.id !== id);
  res.json({ message: 'Team member deleted' });
});

// ============ NEWS API ============
app.get('/api/news', (req, res) => {
  res.json(data.news);
});

app.post('/api/news', upload.single('thumbnail'), (req, res) => {
  const { date, category, title, description } = req.body;
  const newNews = {
    id: Date.now().toString(),
    date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    category,
    title,
    description,
    thumbnail: req.file ? `/uploads/${req.file.filename}` : null
  };
  data.news.unshift(newNews);
  res.status(201).json(newNews);
});

app.put('/api/news/:id', upload.single('thumbnail'), (req, res) => {
  const { id } = req.params;
  const index = data.news.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'News not found' });
  }
  const updateData = { ...req.body };
  if (req.file) {
    if (data.news[index].thumbnail) {
      const oldPath = data.news[index].thumbnail.replace('/uploads/', 'uploads/');
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    updateData.thumbnail = `/uploads/${req.file.filename}`;
  }
  data.news[index] = { ...data.news[index], ...updateData };
  res.json(data.news[index]);
});

app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const newsItem = data.news.find(n => n.id === id);
  if (newsItem && newsItem.thumbnail) {
    const imagePath = newsItem.thumbnail.replace('/uploads/', 'uploads/');
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  data.news = data.news.filter(n => n.id !== id);
  res.json({ message: 'News deleted' });
});

// ============ BLOGS API ============
app.get('/api/blogs', (req, res) => {
  res.json(data.blogs);
});

app.post('/api/blogs', upload.single('thumbnail'), (req, res) => {
  const { date, category, title, description } = req.body;
  const newBlog = {
    id: Date.now().toString(),
    date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    category,
    title,
    description,
    thumbnail: req.file ? `/uploads/${req.file.filename}` : null
  };
  data.blogs.unshift(newBlog);
  res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', upload.single('thumbnail'), (req, res) => {
  const { id } = req.params;
  const index = data.blogs.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  const updateData = { ...req.body };
  if (req.file) {
    if (data.blogs[index].thumbnail) {
      const oldPath = data.blogs[index].thumbnail.replace('/uploads/', 'uploads/');
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    updateData.thumbnail = `/uploads/${req.file.filename}`;
  }
  data.blogs[index] = { ...data.blogs[index], ...updateData };
  res.json(data.blogs[index]);
});

app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const blog = data.blogs.find(b => b.id === id);
  if (blog && blog.thumbnail) {
    const imagePath = blog.thumbnail.replace('/uploads/', 'uploads/');
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  data.blogs = data.blogs.filter(b => b.id !== id);
  res.json({ message: 'Blog deleted' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
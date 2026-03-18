const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  date: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: null },
  author: { type: String, default: 'Mayspear Global' },
  issue: { type: String, default: null },
  description: { type: String, required: true },
  thumbnail: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);

const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  date: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);

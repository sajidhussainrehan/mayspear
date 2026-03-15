const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  firm: { type: String, default: '' },
  role: { type: String, default: '' },
  email: { type: String, required: true },
  type: { type: String, default: '' },
  size: { type: String, default: '' },
  sector: { type: String, default: '' },
  geo: { type: String, default: '' },
  timing: { type: String, default: '' },
  overview: { type: String, default: '' },
  status: { type: String, enum: ['new', 'in-progress', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);

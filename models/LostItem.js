// models/lostItem.js
const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  dateLost: Date,
  // Add other fields as needed
});

module.exports = mongoose.model('LostItem', lostItemSchema);

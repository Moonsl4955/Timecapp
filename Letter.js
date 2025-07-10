const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
  nickname: String,
  email: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Letter', letterSchema);
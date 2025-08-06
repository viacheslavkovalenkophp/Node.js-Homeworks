const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  published: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Element', schema);
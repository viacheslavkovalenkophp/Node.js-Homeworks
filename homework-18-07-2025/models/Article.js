const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const ArticleSchema = new mongoose.Schema({
  title: String,
  url: { type: String, unique: true },
  content: String,
  comments: [CommentSchema]
});

module.exports = mongoose.model('Article', ArticleSchema);
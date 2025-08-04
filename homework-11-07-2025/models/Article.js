const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  url: { type: String, unique: true },
  tags: { type: [String], default: undefined } // Поле не сохраняется, если массив пуст (Task 10)
});

module.exports = mongoose.model('Article', ArticleSchema);
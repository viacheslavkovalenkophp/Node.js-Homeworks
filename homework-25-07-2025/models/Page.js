const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content_ua: { type: String, required: true },
  content_fr: { type: String, required: true },
});

module.exports = mongoose.model('Page', pageSchema);
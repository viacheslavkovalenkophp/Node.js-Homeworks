const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  caption: {
    ua: String,
    fr: String
  },
  text: {
    ua: String,
    fr: String
  },
  image: String
});

module.exports = mongoose.model('Page', pageSchema);
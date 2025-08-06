const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Проверка, что автор содержит пробел (имя и фамилия)
        return v.includes(' ');
      },
      message: 'Автор должен содержать имя и фамилию (через пробел)'
    }
  },
  year: {
    type: Number,
    required: true,
    min: 1700,
    max: 2026,
    validate: {
      validator: Number.isInteger,
      message: 'Год должен быть целым числом'
    }
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Element', schema);
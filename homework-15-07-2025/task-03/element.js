const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  birthDate: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/, // Формат "ГГГГ-ММ-ДД"
    validate: {
      validator: function(v) {
        const date = new Date(v);
        return date instanceof Date && !isNaN(date);
      },
      message: 'Некорректная дата'
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Простая валидация email
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+\d{12}$/.test(v); // "+" и 12 цифр
      },
      message: 'Телефон должен начинаться с "+" и содержать 12 цифр'
    }
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Element', schema);
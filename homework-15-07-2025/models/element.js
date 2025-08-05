const mongoose = require('mongoose');

const task01Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 300
  },
  content: String,
  tags: [String],
  published: Boolean,
}, { timestamps: true });

const task02Schema = new mongoose.Schema({
  brand: {
    type: String,
    minLength: 2,
    maxLength: 20
  },
  model: String,
  year: {
    type: Number,
    min: 1980,
    max: 2026
  },
  color: String,
  price: {
    type: Number,
    min: 0
  },
  vin: {
    type: String,
    match: /^[A-HJ-NPR-Z0-9]{17}$/,
    uppercase: true
  }
}, { timestamps: true });

const task03Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDate: {
    type: String,
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  email: {
    type: String,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    type: String,
    match: /^\+[0-9]{12}$/
  }
}, { timestamps: true });

const task04Schema = new mongoose.Schema({
  name: String,
  color: String,
  heightCm: {
    type: Number,
    min: 0,
    max: 100
  },
  powerW: {
    type: Number,
    min: 0,
    max: 100
  },
  bulbType: {
    type: String,
    enum: ['E27', 'E14', 'G4', 'G9']
  },
  dimmable: Boolean
}, { timestamps: true });

const task05Schema = new mongoose.Schema({
  title: String,
  author: {
    type: String,
    validate: {
      validator: function(v) {
        return v.includes(' ');
      },
      message: 'Author must contain a space'
    }
  },
  year: {
    type: Number,
    min: 1700,
    max: 2026
  }
}, { timestamps: true });

module.exports = {
  BlogPost: mongoose.model('BlogPost', task01Schema),
  Car: mongoose.model('Car', task02Schema),
  User: mongoose.model('User', task03Schema),
  LightBulb: mongoose.model('LightBulb', task04Schema),
  Book: mongoose.model('Book', task05Schema)
};
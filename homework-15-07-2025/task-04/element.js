const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  heightCm: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    validate: {
      validator: Number.isInteger,
      message: 'Высота должна быть целым числом'
    }
  },
  powerW: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  bulbType: {
    type: String,
    required: true,
    enum: ['E27', 'E14', 'G4', 'G9'], // Только эти значения
    uppercase: true // Автоматически преобразует в верхний регистр
  },
  dimmable: {
    type: Boolean,
    required: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Element', schema);
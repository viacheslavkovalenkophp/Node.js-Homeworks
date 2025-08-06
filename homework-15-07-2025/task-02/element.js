const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
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
    required: true,
    validate: {
      validator: v => /^[A-HJ-NPR-Z0-9]{17}$/.test(v),
      message: 'VIN должен содержать 17 символов (0-9 и A-Z, кроме I,O,Q)'
    },
    uppercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Element', schema);
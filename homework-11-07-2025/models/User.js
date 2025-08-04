const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  resetToken: String // Для сброса пароля (Task 02)
});

module.exports = mongoose.model('User', UserSchema);
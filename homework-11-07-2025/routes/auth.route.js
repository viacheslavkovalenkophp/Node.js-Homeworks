const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/dev.json');

// GET /auth/signin - форма регистрации
router.get('/signin', (req, res) => {
  res.render('auth/signin', { title: 'Регистрация' });
});

// POST /auth/signin - обработка регистрации
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.render('auth/signin', { 
      title: 'Регистрация',
      error: err.message,
      email: req.body.email 
    });
  }
});

// GET /auth/login - форма входа
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Вход' });
});

// POST /auth/login - обработка входа
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) throw new Error('Пользователь не найден');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Неверный пароль');
    
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
    
  } catch (err) {
    res.render('auth/login', { 
      title: 'Вход',
      error: err.message,
      email: req.body.email 
    });
  }
});

module.exports = router;
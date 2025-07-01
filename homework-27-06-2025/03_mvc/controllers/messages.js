const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');

router.get('/', (req, res) => {
  const messages = messageModel.getAll();
  res.render('index', { messages });
});

router.post('/', (req, res) => {
  if (req.body.message) {
    messageModel.add(req.body.message);
  }
  res.redirect('/');
});

module.exports = router;
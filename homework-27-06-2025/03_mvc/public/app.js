const express = require('express');
const logger = require('morgan');
const messagesRouter = require('../controllers/messages');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'));

app.use('/', messagesRouter);

app.use((req, res) => res.status(404).render('404'));

module.exports = app;
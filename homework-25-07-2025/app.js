require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const Page = require('./models/Page'); // Добавьте эту строку (важно!)

const app = express();

// 1. Базовые настройки
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 2. Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sprint_15')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 3. Middleware
app.use(cookieParser());

// 4. Настройка i18n
i18n.configure({
  locales: ['ua', 'fr'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'ua',
  cookie: 'lang',
  queryParameter: 'lang'
});
app.use(i18n.init); // Добавьте эту строку

// 5. Middleware для языка
app.use((req, res, next) => {
  const lang = req.query.lang || req.cookies?.lang || 'ua';
  req.setLocale(lang);
  res.cookie('lang', lang, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.locals.lang = lang;
  next();
});

// 6. Роуты
app.get('/', async (req, res) => {
  try {
    const article = await Page.findOne().sort({ _id: 1 });
    if (!article) throw new Error('Article not found');
    
    res.render('index', {
      title: article.caption[res.locals.lang],
      content: article.text[res.locals.lang],
      image: article.image
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: err.message });
  }
});

app.get('/page', async (req, res) => {
  try {
    const articles = await Page.find().sort({ _id: 1 });
    if (!articles || articles.length < 2) throw new Error('Articles not found');
    
    res.render('page', {
      title: articles[1].caption[res.locals.lang],
      content: articles[1].text[res.locals.lang],
      image: articles[1].image
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: err.message });
  }
});

// 7. Обработка 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// 8. Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
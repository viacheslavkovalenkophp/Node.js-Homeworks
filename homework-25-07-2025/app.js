require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const i18n = require('i18n');
const cookieParser = require('cookie-parser'); // Добавляем этот модуль

const app = express();

// 1. Базовые настройки
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 2. Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sprint_15')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 3. Middleware для кук (ДОЛЖЕН БЫТЬ ПЕРВЫМ!)
app.use(cookieParser());

// 4. Настройка i18n
i18n.configure({
  locales: ['ua', 'fr'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'ua',
  cookie: 'lang',
});
app.use(i18n.init);

// 5. Middleware для обработки языка
app.use((req, res, next) => {
  if (req.query.lang) {
    res.cookie('lang', req.query.lang, { maxAge: 900000 });
    return res.redirect(req.originalUrl.split('?')[0]);
  }
  next();
});

// 6. Роуты
const Page = require('./models/Page');

app.get('/', async (req, res) => {
  try {
    const article = await Page.findOne({ title: "Перша стаття" });
    if (!article) throw new Error('Article not found');
    
    const lang = req.cookies?.lang || 'ua'; // Безопасное получение куки
    
    res.render('index', {
      title: article.title,
      content: lang === 'ua' ? article.content_ua : article.content_fr
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/page', async (req, res) => {
  try {
    console.log('--- /page запрос ---');
    console.log('Cookies:', req.cookies);
    
    const article = await Page.findOne({ title: "Друга стаття" });
    console.log('Найдена статья:', article);
    
    const lang = req.cookies?.lang || 'ua';
    console.log('Выбран язык:', lang);
    
    const content = lang === 'ua' ? article.content_ua : article.content_fr;
    console.log('Контент для отображения:', content);
    
    res.render('page', {
      title: article.title,
      content: content
    });
  } catch (err) {
    console.error('Ошибка в /page:', err);
    res.status(500).send('Server Error');
  }
});





// 7. Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
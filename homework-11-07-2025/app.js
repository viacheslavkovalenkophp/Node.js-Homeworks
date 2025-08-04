const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config/dev.json');
const Article = require('./models/Article');
const User = require('./models/User');
const authRouter = require('./routes/auth.route');

const app = express();

// 1. Подключение к MongoDB
mongoose.connect(config.db)
  .then(() => console.log('MongoDB подключен'))
  .catch(err => console.error('Ошибка подключения MongoDB:', err));

// 2. Middleware (убрали дублирование)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Настройка шаблонизатора (убрали дублирование)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 4. Маршруты
app.use('/auth', authRouter);

// 5. Главная страница (добавили)
app.get('/', (req, res) => {
  res.render('index'); // Создайте файл views/index.pug
});

// 6. Регистрация пользователя
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка регистрации');
  }
});

// 7. Работа со статьями
app.get('/articles/new', (req, res) => {
  res.render('articles/form'); // Форма создания статьи
});

app.post('/articles/new', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const article = new Article({
      title,
      content,
      url: title.toLowerCase().replace(/\s+/g, '-'),
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });
    await article.save();
    res.redirect(`/articles/${article.url}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка создания статьи');
  }
});

app.get('/articles/:url', async (req, res) => {
  try {
    const article = await Article.findOne({ url: req.params.url });
    if (!article) return res.status(404).send('Статья не найдена');
    res.render('articles/show', { article });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка загрузки статьи');
  }
});

// 8. Добавим маршрут для редактирования статей (Task 08)
app.get('/articles/:url/edit', async (req, res) => {
  try {
    const article = await Article.findOne({ url: req.params.url });
    if (!article) return res.status(404).send('Статья не найдена');
    res.render('articles/form', { article });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка загрузки статьи');
  }
});

app.post('/articles/:url/edit', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const article = await Article.findOneAndUpdate(
      { url: req.params.url },
      {
        title,
        content,
        url: title.toLowerCase().replace(/\s+/g, '-'),
        tags: tags ? tags.split(',').map(tag => tag.trim()) : []
      },
      { new: true }
    );
    res.redirect(`/articles/${article.url}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка обновления статьи');
  }
});

// 9. Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
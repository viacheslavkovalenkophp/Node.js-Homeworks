const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

// Инициализация приложения
const app = express();

// Конфигурация MongoDB
const mongoUrl = 'mongodb://localhost:27017/site';
const client = new MongoClient(mongoUrl);
let db; // Добавляем глобальную переменную для базы данных

// Middleware
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Настройка сессий с MongoDB
app.use(session({
  secret: 'your_secret_key_39393',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: client, // Используем существующее подключение
    dbName: 'site',
    collectionName: 'sessions',
    ttl: 3600
  }),
  cookie: { maxAge: 3600000 }
}));

app.use(morgan('tiny', { skip: (req) => req.url.startsWith('/.well-known') }));

// Добавляем пользователя в локальные переменные
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Маршруты
app.get('/', (req, res) => res.render('main'));

// Аутентификация
app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ username });
    
    if (!user) {
      return res.render('login', { error: 'Пользователь не найден' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('login', { error: 'Неверный пароль' });
    }

    req.session.user = {
      _id: user._id,
      username: user.username,
      role: user.role || 'user'
    };

    return res.redirect('/dashboard');
  } catch (err) {
    console.error('Ошибка входа:', err);
    return res.render('login', { error: 'Ошибка сервера' });
  }
});

app.get('/dashboard', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const tasks = await db.collection('tasks')
      .find({ role: req.session.user.role })
      .toArray();

    res.render('dashboard', {
      user: req.session.user,
      tasks: tasks
    });
  } catch (err) {
    console.error('Ошибка загрузки задач:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Регистрация
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedRole = role.trim().toLowerCase();

  try {
    // Проверяем, существует ли пользователь
    const existingUser = await db.collection('users').findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.render('register', { error: 'Пользователь уже существует' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохраняем пользователя
    await db.collection('users').insertOne({
      email: trimmedEmail,
      password: hashedPassword,
      role: trimmedRole,
      createdAt: new Date()
    });

    res.redirect('/login?success=Регистрация+успешна.+Теперь+войдите.');
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.render('register', { error: 'Ошибка сервера' });
  }
});

// Инициализация базы данных
async function initDB() {
  try {
    await client.connect();
    db = client.db('site');
    
    await db.createCollection('users');
    await db.createCollection('tasks');
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    // Проверяем существование файла
    const fs = require('fs');
    if (!fs.existsSync('./tasks.json')) {
      console.log('⚠️ Файл tasks.json не найден, пропускаем загрузку задач');
      return;
    }

    const tasksCount = await db.collection('tasks').countDocuments();
    if (tasksCount === 0) {
      const tasks = require('./tasks.json');
      await db.collection('tasks').insertMany(tasks);
      console.log('✅ Тестовые задачи загружены в MongoDB');
    }
    
    console.log('✅ База данных готова к работе');
  } catch (err) {
    console.error('❌ Ошибка инициализации DB:', err);
    process.exit(1);
  }
}

// Запуск сервера
async function start() {
  await initDB();
  
  app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
    console.log('Доступные маршруты:');
    console.log('- GET  /login');
    console.log('- POST /login');
    console.log('- GET  /dashboard');
    console.log('- GET  /logout');
  });
}

start().catch(err => console.error('Fatal error:', err));
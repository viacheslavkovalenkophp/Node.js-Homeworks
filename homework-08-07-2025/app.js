const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const mongoUrl = 'mongodb://localhost:27017/site';

const client = new MongoClient(mongoUrl);
let db, usersCollection, tasksCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'your_secret_key_39393',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoUrl,
    collectionName: 'sessions',
    ttl: 60 * 60 
  }),
  cookie: { maxAge: 3600000 }
}));


app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


app.get('/', (req, res) => res.render('main'));


app.get('/register', (req, res) => {
  res.render('register', { roles: ['user', 'admin'] });
});

app.post('/register', async (req, res) => {
  const { email, password, role = 'user' } = req.body;
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedRole = role.trim().toLowerCase();

  try {
    const existingUser = await usersCollection.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.render('register', { 
        error: 'Пользователь уже существует',
        roles: ['user', 'admin'],
        formData: req.body
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    await usersCollection.insertOne({
      email: trimmedEmail,
      password: hashedPassword,
      role: trimmedRole,
      createdAt: new Date()
    });

    res.redirect('/login?success=Регистрация+успешна.+Теперь+войдите.');
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.render('register', { 
      error: 'Ошибка сервера',
      roles: ['user', 'admin'],
      formData: req.body
    });
  }
});

app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const trimmedEmail = email.trim().toLowerCase();

  try {
    const user = await usersCollection.findOne({ email: trimmedEmail });
    
    if (!user) {
      return res.render('login', { 
        error: 'Неверный email или пароль',
        formData: req.body
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('login', { 
        error: 'Неверный email или пароль',
        formData: req.body
      });
    }

    req.session.user = {
      _id: user._id,
      email: user.email,
      role: user.role
    };

    return res.redirect('/dashboard');
  } catch (err) {
    console.error('Ошибка входа:', err);
    return res.render('login', { 
      error: 'Ошибка сервера',
      formData: req.body
    });
  }
});


app.get('/dashboard', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const tasks = await tasksCollection
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

async function initDB() {
  try {
    await client.connect();
    db = client.db('site');
    usersCollection = db.collection('users');
    tasksCollection = db.collection('tasks');

   
    await usersCollection.createIndex({ email: 1 }, { unique: true });

  
    const tasksCount = await tasksCollection.countDocuments();
    if (tasksCount === 0) {
      try {
        const tasks = require('./tasks.json');
        await tasksCollection.insertMany(tasks);
        console.log('✅ Тестовые задачи загружены в MongoDB');
      } catch (e) {
        console.log('⚠️ Файл tasks.json не найден или содержит ошибки');
      }
    }
    
    console.log('✅ База данных готова к работе');
  } catch (err) {
    console.error('❌ Ошибка инициализации DB:', err);
    process.exit(1);
  }
}

async function start() {
  await initDB();
  
  app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
    console.log('Доступные маршруты:');
    console.log('- GET  /');
    console.log('- GET  /register');
    console.log('- POST /register');
    console.log('- GET  /login');
    console.log('- POST /login');
    console.log('- GET  /dashboard');
    console.log('- GET  /logout');
  });
}

start().catch(err => console.error('Fatal error:', err));
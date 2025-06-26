const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware для обработки POST-запросов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Маршруты
app.get('/', (req, res) => {
  res.render('main');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/form', (req, res) => {
  if (!req.body.username || !req.body.message) {
    return res.status(400).send('Заполните все поля');
  }

  const newMessage = {
    username: req.body.username,
    message: req.body.message,
    timestamp: new Date().toISOString()
  };

  // Чтение текущих сообщений
  fs.readFile('message.json', (err, data) => {
    let messages = [];
    if (!err && data.length > 0) {
      messages = JSON.parse(data);
    }

    messages.push(newMessage);

    // Запись в файл
    fs.writeFile('message.json', JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error('Ошибка записи:', err);
        return res.status(500).send('Ошибка сохранения');
      }
      console.log('Успешно сохранено, редирект...');
      res.redirect('/guests'); // Ключевой момент!
    });
  });
});

app.get('/guests', (req, res) => {
  fs.readFile('message.json', (err, data) => {
    let guests = [];
    if (!err && data.length > 0) {
      guests = JSON.parse(data);
    }
    res.render('guests', { guests });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
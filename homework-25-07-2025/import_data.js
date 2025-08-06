// Этот скрипт только добавляет данные в MongoDB и ничего не меняет в проекте!
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/page.json'));

db = db.getSiblingDB('sprint_15'); // Подключаемся к базе sprint_15
db.pages.insertMany(data);         // Добавляем данные в коллекцию pages

print("✅ Данные успешно добавлены!");
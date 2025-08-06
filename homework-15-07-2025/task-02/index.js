const mongoose = require('mongoose');
const Element = require('./element');
const document = require('./document');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/storage');
    const car = new Element(document);
    await car.save();
    console.log('Документ сохранен');
  } catch (err) {
    console.error('Ошибка:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();
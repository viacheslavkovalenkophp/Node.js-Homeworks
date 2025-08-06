const mongoose = require('mongoose');
const Element = require('./element');
const document = require('./document');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/storage');
    console.log('✅ Подключено к MongoDB');
    
    const doc = new Element(document);
    await doc.save();
    console.log('💾 Документ сохранен!');
    
  } catch (err) {
    console.error('❌ Ошибка:', err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
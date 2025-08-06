const mongoose = require('mongoose');
const Element = require('./element');
const document = require('./document');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/storage');
    console.log('✅ Подключено к MongoDB');

    const book = new Element(document);
    await book.save();
    
    console.log('📚 Книга сохранена:', {
      title: book.title,
      author: book.author,
      year: book.year
    });

  } catch (err) {
    console.error('❌ Ошибка:', err.message);
    
    // Детали ошибок валидации
    if (err.name === 'ValidationError') {
      for (const field in err.errors) {
        console.log(`- ${field}: ${err.errors[field].message}`);
      }
    }
  } finally {
    await mongoose.disconnect();
  }
}

main();
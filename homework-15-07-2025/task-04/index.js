const mongoose = require('mongoose');
const Element = require('./element');
const document = require('./document');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/storage');
    console.log('✅ Подключено к MongoDB');

    const bulb = new Element(document);
    await bulb.save();
    
    console.log('💡 Лампочка сохранена:', {
      name: bulb.name,
      type: bulb.bulbType,
      power: `${bulb.powerW}W`
    });

  } catch (err) {
    console.error('❌ Ошибка:', err.message);
    
    // Детали ошибок валидации
    if (err.name === 'ValidationError') {
      for (const field in err.errors) {
        console.log(`- ${err.errors[field].message}`);
      }
    }
  } finally {
    await mongoose.disconnect();
  }
}

main();
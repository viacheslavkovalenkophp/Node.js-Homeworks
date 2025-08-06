const mongoose = require('mongoose');
const Element = require('./element');
const document = require('./document');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/storage');
    console.log('✅ Подключено к MongoDB');

    const user = new Element(document);
    await user.save();
    console.log('👤 Пользователь сохранен:', {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email
    });

  } catch (err) {
    console.error('❌ Ошибка:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();
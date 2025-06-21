// Task 02

// Створіть анонімний модуль у цьому файлі, який приймає повний шлях до теки та повертає true або false залежно від того, чи існує вказана тека.
const fs = require('fs');
const path = require('path');

module.exports = (folderPath) => {
  try {
    const stats = fs.statSync(absolutePath);
    return stats.isDirectory();
  } catch (err) {
    return false;
  }
};





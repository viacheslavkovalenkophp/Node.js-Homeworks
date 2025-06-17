// Task 01

// Створіть анонімний модуль у цьому файлі, який приймає назву теки та повертає абсолютний шлях до неї.
//  Вважаємо, що тека завжди існує. Вона розташована в поточній директорії.

// Прикладом теки є тека test_folder.

const path = require('path');

module.exports = function(folderName) {
  return path.join(__dirname, folderName);
};




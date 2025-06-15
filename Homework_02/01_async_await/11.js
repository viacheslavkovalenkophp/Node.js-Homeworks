// Task 10

// Створіть анонімний модуль, який читає файл переданий як аргумент, та повертає ЧИСЛО з файла!!!! Приклад файла 

const fs = require('fs');

const readNumber = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    const number = parseFloat(content);
    if (isNaN(number)) {
      throw new Error("Файл не містить числа!");
    }
    
    return number;
  } catch (err) {
    throw new Error(`Помилка: ${err.message}`);
  }
};
console.log(readNumber("./number.txt"));
// Task 03

// Створіть анонімний модуль у цьому файлі, який приймає назву файлу та повертає його розмір. Якщо файл не існує — повертає 0.

// Приклад аргумента 'test_folder/one.txt'

const fs = require('fs');
const path = require('path');

module.exports = (fileName) => {
    try {
        const stats = fs.statSync(fileName);
        return stats.isFile() ? stats.size : 0;
    } catch (err) {
        return 0;
    }
};

  
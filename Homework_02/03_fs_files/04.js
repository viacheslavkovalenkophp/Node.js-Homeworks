// Task 04

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — масив рядків і записує їх у файл file_04.txt у поточній теці.
//  Кожен елемент масиву потрібно записати з нового рядка, використовуючи переноси рядків \r\n. 
// Кодування файлу — UTF-8, для запису використовуйте прапор w.


const fs = require('fs').promises;
const path = require('path');

module.exports = async (lines) => {
    try {
        const filePath = path.resolve('file_04.txt');

        await fs.writeFile(filePath, content, { encoding: 'utf8', flag: 'w' });

        return 'Файл успішно створено!';
    } catch (error) {
        return 'Помилка: ' + error.message;
    }
};


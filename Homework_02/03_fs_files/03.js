// Task 03

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — рядок тексту.
//  Модуль має створити файл з ім’ям file_03.txt у поточній теці.
//  У файл потрібно записати переданий текст у кодуванні UTF-8. Для запису використовуйте файловий прапор w.

const fs = require('fs').promises;
const path = require('path');

module.exports = async (text) => {
    try {
        const filePath = path.resolve('file_03.txt');

        await fs.writeFile(filePath, text, { encoding: 'utf-8', flag: 'w' });

        return 'Файл успішно створено!';
    } catch (error) {
        return 'Помилка: ' + error.message;
    }
};


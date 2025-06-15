// Task 01

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — назву файлу. Модуль повертає вміст цього файлу.

// Приклад аргумента: 'test.file'

// Створіть анонімний модуль у цьому файлі, який приймає назву файлу та повертає його розмір. Якщо файл не існує — повертає 0.

const fs = require('fs').promises;
const path = require('path');

const getFileContent = async (fileName) => {
    try {
        const filePath = path.resolve(fileName);
        const stats = await fs.stat(filePath);

        if (!stats.isFile()) {
            return 'Це не файл, а тека';
        }

        return await fs.readFile(filePath, 'utf8'); // Читаем файл с кодировкой UTF-8
    } catch (err) {
        return 'Файл не існує';
    }
};

// Корректный вызов
getFileContent('./test.file').then(console.log).catch(console.error);





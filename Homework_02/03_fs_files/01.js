// Task 01

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — назву файлу. Модуль повертає вміст цього файлу.

// Приклад аргумента: 'test.file'

const fs = require('fs').promises;
const path = require('path');

module.exports = async (fileName) => {
    try {
        const filePath = path.resolve(fileName);
        const stats = await fs.stat(filePath);

        if (!stats.isFile()) {
            return 'Це не файл, а тека';
        }

        return await fs.readFile(filePath, 'utf8');
    } catch (err) {
        return 'Файл не існує';
    }
};






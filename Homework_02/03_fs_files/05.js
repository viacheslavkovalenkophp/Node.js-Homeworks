// Task 05

// Створіть анонімний модуль у цьому файлі, який приймає аргументи — вихідний файл і кінцевий файл.
//  Модуль має зчитати вміст вихідного файлу (текст) та записати його у кінцевий файл. 
// Кодування — UTF-8, для запису використовуйте прапорець w. Якщо вхідного файла немає, то виконання завершується (return;)

const fs = require('fs').promises;
const path = require('path');

const copyFiles = async (sourceFile, targetFile) => {
    try {
        const sourcePath = path.resolve(sourceFile);
        const targetPath = path.resolve(targetFile);

        await fs.access(sourcePath).catch(() => { 
            throw new Error('Файл source.txt не існує!'); 
        });

        const content = await fs.readFile(sourcePath, 'utf-8');
        await fs.writeFile(targetPath, content, { encoding: 'utf8', flag: 'w' });

        return 'Файл успішно скопійовано!';
    } catch (error) {
        return 'Помилка: ' + error.message;
    }
};

copyFiles('source.txt', 'target.txt')
    .then(console.log)
    .catch(console.error);
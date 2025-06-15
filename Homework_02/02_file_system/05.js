// Task 05

// Створіть анонімний модуль у цьому файлі, який приймає назву теки та повертає кількість файлів у ній (теки не враховуємо).

// Приклад аргумента 'test_folder'

const fs = require('fs').promises;
const path = require('path');

const countFilesInFolder = async (folderName) => {
    try {
        const folderPath = path.resolve(folderName);
        
        await fs.access(folderPath).catch(() => { throw new Error('Теки не існує'); });

        const items = await fs.readdir(folderPath);
        
        const files = await Promise.all(items.map(async (item) => {
            const stats = await fs.stat(path.join(folderPath, item));
            return stats.isFile() ? item : null;
        }));

        return files.filter(Boolean).length;
    } catch (error) {
        return false;
    }
};

countFilesInFolder('test_folder').then(console.log).catch(console.error);
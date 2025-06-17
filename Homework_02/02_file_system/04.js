// Task 04
// Створіть анонімний модуль, який приймає назву теки та повертає її вміст у форматі масиву з об'єктами.
//  Приклад масиву наведено нижче. Якщо теки не існує — повертає false. Якщо тека порожня — повертає порожній масив.
// Приклад об'єкту
// [
//     {name : "one", ext : "txt"},
//     {name : "doc", ext  : "dat"}
// ]
// Приклад аргумента 'test_folder'

const fs = require('fs').promises;
const path = require('path');

module.exports = async (folderName) => {
    try {
        const folderPath = path.resolve(__dirname, folderName);
        const files = await fs.readdir(folderPath);
        
        return Promise.all(
            files.map(async (file) => {
                const filePath = path.join(folderPath, file);
                const stats = await fs.stat(filePath);
                return {
                    name: file,
                    type: stats.isDirectory() ? 'folder' : 'file',
                    format: stats.isDirectory() ? null : path.extname(file) || 'unknown'
                };
            })
        );
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
};



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
    const files = await fs.readdir(folderName);
    
    const result = [];
    for (const file of files) {
      const filePath = path.join(folderName, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isDirectory()) {
        result.push({ name: file, ext: null });
      } else {
        const ext = path.extname(file);
        result.push({
          name: file.replace(ext, ''),
          ext: ext ? ext.slice(1) : null
        });
      }
    }
    
    return result;
  } catch {
    return false;
  }
};

// Task 02

// Створіть анонімний модуль у цьому файлі, який приймає аргумент — назву файлу.
//  Модуль зчитує вміст файлу та повертає суму чисел, що в ньому містяться.

// Приклад аргумента: 'num.dat'
// Приклад поверненного результата: 25

const fs = require('fs').promises;
const path = require('path');

const getSum = async (fileName) => {
    try {
        const filePath = path.resolve(fileName);
        
        await fs.access(filePath).catch(() => { throw new Error('Файл не існує'); });

        const content = await fs.readFile(filePath, 'utf8'); // Зчитуємо вміст файлу

        const numbers = content.match(/-?\d+(\.\d+)?/g) || []; // Виділяємо числа (цілі та дробові)

        const sum = numbers.map(Number).reduce((acc, num) => acc + num, 0); // Обчислюємо суму

        return sum;
    } catch (error) {
        return 'Помилка: ' + error.message;
    }
};

getSum('num.dat').then(console.log).catch(console.error);



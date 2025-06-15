// Task 03

// Створіть анонімний модуль у цьому файлі, який приймає назву файлу та повертає його розмір. Якщо файл не існує — повертає 0.

// Приклад аргумента 'test_folder/one.txt'

const fs = require('fs');
const path = require('path');

const getFileSize = (fileName) => {
    try {
        const file = fs.statSync(fileName);
        if(file.isFile()) {
            return file.size + ' bytes';
        }
        return 'Це не файл, а тека';
    }

    catch (err) {
        return 'файл не існєє';
    }};

    console.log(getFileSize('./test_folder/one.txt'));
//02_file_system
const getAbsolutePath = require('./02_file_system/01.js');
const folderPath = getAbsolutePath('./test_folder');
console.log('Абсолютный путь:', folderPath);

const pathFinder = require('./02_file_system/02.js');
const exists = pathFinder(folderPath);
console.log('Папка существует:', exists);

const checkFile = require('./02_file_system/03.js');
const filePath = './02_file_system/test_folder/one.txt';

const result = checkFile(filePath);
console.log(result);



const getFolderContents = require('./02_file_system/04.js');
(async () => {
    const result = await getFolderContents('test_folder');
    console.log(result || 'Failed to read folder');
})();

const countFilesInFolder = require('./02_file_system/05.js');
const path = require('path');

(async () => {
    const count = await countFilesInFolder('test_folder');
    console.log('Файлів у теці:', count);
})();

// 03_fd_files
const getFileContent = require('./03_fs_files/01.js');
(async () => {
    const content = await getFileContent('./03_fs_files/test.file');
    console.log('Вміст файлу:', content);
})();

const getSum = require('./03_fs_files/02.js');
(async () => {
    const sum = await getSum('./03_fs_files/num.dat');
    console.log('Сума чисел у файлі:', sum);
})();


const createFile = require('./03_fs_files/03.js');
(async () => {
    const result = await createFile('Привіт, світ!');
    console.log(result);
})();

const writeFile = require('./03_fs_files/04.js');
(async () => {
    const result = await writeFile(['Перша стрічка', 'Друга стрічка', 'Третя стрічка']);
    console.log(result);
})();

const copyFiles = require('./03_fs_files/05.js');
(async () => {
    const result = await copyFiles('source.txt', 'target.txt');
    console.log(result);
})();
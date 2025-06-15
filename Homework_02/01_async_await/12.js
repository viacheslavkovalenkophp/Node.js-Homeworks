const fs =  require('fs');

const readNumber = (filePath) => {
    try{
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    const number = parseFloat(content);
    if(isNaN(number)) {
        throw new Error('Файл не содержит числа!')
    }
    return number;
    }
    catch (error) {
        throw new Error(`Ошибка: ${error.message}`);

    }
}

console.log(readNumber("./number.txt"));



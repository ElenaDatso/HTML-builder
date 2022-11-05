// const process = require('process');
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = process;
const readLine = require('readline');

const rl = readLine.createInterface({input, output});

const textFile = path.join(__dirname, 'text.txt');

fs.writeFile(textFile, '', (err) => {
  if (err) throw err;
});

output.write('Приветствую! Введи любой текст:\n');

input.on('data', (data) => {
  fs.appendFile(textFile, data, (err) => {
    if (err) throw err;
  });
});

rl.on('SIGINT', () => {
  console.log('Спасибо что заглянули!');
  process.exit();
});

rl.on('line', (input) => {
	if (input.trim() === 'exit'){
    console.log('Спасибо что заглянули!');
    process.exit();
	}

})



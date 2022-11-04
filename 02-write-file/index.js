// const process = require('process');
const fs = require('fs');
const path = require('path');
const { stdin, stdout, error } = process;

const textFile = path.join(__dirname, 'text.txt');

fs.writeFile(textFile, '', (err) => {
  if (err) throw err;
});

stdout.write('Введите текст\n');

stdin.on('data', (data) => {
  if (data.toString().includes('exit')){
	process.exit();
  }
  fs.appendFile(textFile, data, (err) => {
    if (err) throw err;
  });
});

process.on('SIGINT', () => {
  console.log('Спасибо что заглянули!');
  process.exit();
});

const fs = require('fs');
const path = require('path');
// const {stdout} = process;
const fileToRead = fs.createReadStream(path.join(__dirname, 'text.txt'));

fileToRead.on('data', (data) => {
  console.log(data.toString())}
);
const process = require('process');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const newDirection = path.join(__dirname, 'files-copy');
const basicDirection = path.join(__dirname, 'files');

fs.mkdir(newDirection, {recursive: true}, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

async function remove () {
    for (const file of await fsPromises.readdir(newDirection)) {
        await fsPromises.unlink(path.join(newDirection, file));
    }
}
    	


const filesArray = async function () {
fs.readdir( 
    basicDirection, 
    ((err, files) => {
      if (err) throw err;
      for (let file of files) {
        const fromFile = path.join(basicDirection, file);
        const toFile = path.join(newDirection, file);
        fsPromises.copyFile(fromFile, toFile);
      }
    }));
}

async function start () {
    await remove()
    await filesArray();
};

start();








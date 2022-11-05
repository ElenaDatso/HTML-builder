const process = require('process');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const stylesDirection = path.join(__dirname, 'styles');
const projDistDirection = path.join(__dirname, 'project-dist');


const cssArray = [];

fs.open(path.join(projDistDirection, 'bundle.css'), 'w', (err, file) => {
  if (err) {
    throw err;
  }

  console.log('File is created.');
});

fsPromises.readdir(stylesDirection, 
	{ withFileTypes: true }, 
	(data) => {
		return data;
	}).then(data => data.forEach( 
		el => {
			if (el.isFile()){
				// console.log(el.name.slice(-3) === 'css');
				if(el.name.slice(-3) === 'css'){
					const file = fsPromises
          .readFile(path.join(stylesDirection, `${el.name}`))
          .then(file => {
			const theFile = file.toString();
			theFile.slice(1);
			theFile.slice(-1);
			console.log(theFile, '\n/*------------------------------------------------*/');
			cssArray.push(theFile);
			fs.appendFile(path.join(projDistDirection, 'bundle.css'), theFile, (err) => {
				if (err) {
					throw err
				}
			})
		  });
				};
			}
		}));


// fs.appendFile()
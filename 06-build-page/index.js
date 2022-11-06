const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const projectDir = path.join(__dirname, 'project-dist');
const assetsDir = path.join(__dirname, 'assets');
const originStylesDir = path.join(__dirname, 'styles');
const targetStyleFile = path.join(projectDir, 'style.css');
const originTemplateDir = path.join(__dirname, 'template.html');
const targetIndexFile = path.join(projectDir, 'index.html');
const componentsDir = path.join(__dirname, 'components');

fs.mkdir(projectDir, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.open(path.join(projectDir, 'index.html'), 'w', (err) => {
  if (err) throw err;
});

fs.open(path.join(projectDir, 'style.css'), 'w', (err) => {
  if (err) throw err;
});

fs.mkdir(path.join(projectDir, 'assets'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }


});

(async () => {
  const copyOriginTemplate = await fsPromises.readFile(originTemplateDir);

  fs.appendFile(targetIndexFile, copyOriginTemplate.toString(), (err) => {
    if (err) {
      throw err;
    }
  });
  let reg = /\{\{[a-zA-Z]+\}\}/g;
  let textOfFile = copyOriginTemplate.toString();
  const componentsInFile = textOfFile.match(reg);

  const files = await fsPromises.readdir(componentsDir);

  for (let componet of componentsInFile) {
    const theComp = componet;
    const theCompSliced = componet.slice(2, -2);
    for (let file of files) {
      let newT = textOfFile;
      const results = [];
      if (file.split('.')[0] === theCompSliced) {
        const componentHTML = await fsPromises
          .readFile(path.join(componentsDir, file))
          .then((data) => data.toString());
        textOfFile = newT.replace(theComp, componentHTML);
      }
    }
  }

  fs.writeFile(targetIndexFile, textOfFile, (err) => {
  	if (err) throw err;
	console.log('done!')
  })

})()



try {
	(async()=>{
		fsPromises.readdir(assetsDir, {withFileTypes: true} ,(data) => {
    return data}).then(data => {
		for (let d of data) {
			if (d.isDirectory()){
				const createDir = path.join(projectDir, 'assets', `${d.name}`);
				const originAssetsDir = path.join(assetsDir, `${d.name}`);

				fs.mkdir(createDir, { recursive: true }, (err) => {
					if (err) {
						throw err;
					}
				})
				fs.readdir(originAssetsDir, (err, files) => {
					if (err) throw err;
						for (let file of files) {
							const fromFile = path.join(originAssetsDir, file);
							const toFile = path.join(createDir, file);
							fsPromises.copyFile(fromFile, toFile);
						}
				});

			} else if (d.isFile()){
				console.log(d, 'is file');
			}
			
		}
	})
	})()
} catch (err) {
	console.log(err)
}


fsPromises
  .readdir(originStylesDir, { withFileTypes: true }, (data) => {
    return data;
  })
  .then((data) =>
    data.forEach((el) => {
      if (el.isFile()) {
        // console.log(el.name.slice(-3) === 'css');
        if (el.name.slice(-3) === 'css') {
          const file = fsPromises
            .readFile(path.join(originStylesDir, `${el.name}`))
            .then((file) => {
              const theFile = file.toString();
              theFile.slice(1);
              theFile.slice(-1);
              fs.appendFile(
                targetStyleFile,
                theFile,
                (err) => {
                  if (err) {
                    throw err;
                  }
                }
              );
            });
        }
      }
    })
  );




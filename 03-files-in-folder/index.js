const process = require('process');
const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');
const fsPomis = require('fs/promises');


// const fileSize = await stat(path.join(dirName, file.name));

async function filesInFolder() {
  try {
	fs.readdir(
    folderPath,
    { encoding: 'utf-8', withFileTypes: true },
    (err, file) => {
      if (err) throw err;

      for (let i = 0; i < file.length; i++) {
        if (file[i].isFile()) {

          const fileName = file[i].name;
          const fileDir = path.join(folderPath, fileName);
          const fileOnlyName = path.basename(fileDir).split('.')[0];
          const fileOnlyExt = path.extname(fileDir).slice(1);
		  const fileSize = fsPomis.stat(fileDir, (er, data) => {
			if (er) throw er;
			return data
		  }).then(stats => stats);

		  fileSize.then(function(result){
			console.log(fileOnlyName, '-', fileOnlyExt, '-' , result.size);
		  })

        }
      }
    }
  );
	
}catch (err) {
    console.error(err);
  }
};
filesInFolder()
const fs    = require('fs'),
      path  = require('path');

module.exports = {

  // saveData: function(dataType, newDatam data) {
  // No aplica ya que solo se leerá el archivo. No se reescribirá
  // }

  getDataAll: () => {
    let dataPath = __dirname + path.join('/data/data.json');
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', (err, readData) => {
            if (err) reject(err)
            resolve(JSON.parse(readData));
        });
    });
  }
};

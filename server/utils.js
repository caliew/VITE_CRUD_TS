const fs = require('fs');
const config = require('./config');

function saveDataToFile(data) {
  const jsonData = JSON.stringify(data);
  fs.writeFile(config.dataFile, jsonData, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = { saveDataToFile };
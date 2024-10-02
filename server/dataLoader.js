// server/dataLoader.js
const fs = require('fs');
const config = require('./config');

function loadDataFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(config.dataFile, (err, fileData) => {
      if (err) {
        reject(err);
      } else {
        const data = JSON.parse(fileData);
        resolve(data);
      }
    });
  });
}

module.exports = { loadDataFromFile };
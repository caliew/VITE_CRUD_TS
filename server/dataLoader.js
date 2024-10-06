// server/dataLoader.js
const fs = require('fs');

function loadDataFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(process.env.DATA_FILE, (err, fileData) => {
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
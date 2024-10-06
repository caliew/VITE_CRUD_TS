const fs = require('fs');

function saveDataToFile(data) {
  const jsonData = JSON.stringify(data);
  fs.writeFile(process.env.DATA_FILE, jsonData, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = { saveDataToFile };
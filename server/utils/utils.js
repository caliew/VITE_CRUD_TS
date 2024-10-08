import fs from 'fs';

export function saveDataToFile(data) {
  const jsonData = JSON.stringify(data);
  fs.writeFile(process.env.DATA_FILE, jsonData, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export function loadDataFromFile() {
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

export default { saveDataToFile, loadDataFromFile };
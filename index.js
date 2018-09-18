const fs = require('fs');
const path = require('path');

const listDirectories = (directory) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.lstatSync(filePath);
    if (stats.isDirectory()) {
      const innerPath = path.join(directory, file);
      listDirectories(innerPath);
    } else {
      console.log(filePath);
    }
  });
};

listDirectories(__dirname);

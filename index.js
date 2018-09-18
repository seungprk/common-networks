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

// If no expressions given
if (process.argv.length <= 2) {
  listDirectories(__dirname);
  process.exit();
}

const directory = path.resolve(__dirname, process.argv[2]);
listDirectories(directory);

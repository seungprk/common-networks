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

const handleOptions = (arg) => {
  console.log(arg);
};

// If no expressions given
if (process.argv.length <= 1) {
  listDirectories(__dirname);
  process.exit();
}

process.argv.forEach((arg, index) => {
  if (index <= 1) return;

  if (arg.charAt(0) === '-') {
    handleOptions(arg);
  } else {
    const directory = path.resolve(__dirname, process.argv[2]);
    listDirectories(directory);
  }
});

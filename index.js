/* eslint no-plusplus: 0, no-console: 0 */
const fs = require('fs');
const path = require('path');

const options = {};

const listDirectories = (directory) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
      const innerPath = path.join(directory, file);
      listDirectories(innerPath);
    } else {
      if (!file.match(options.name)) return; // Regex check
      if (options.empty && stats.size > 0) return; // empty check
      console.log(filePath);
    }
  });
};

const handleOptions = (arg, index) => {
  if (arg === '-name') {
    options.name = process.argv[index + 1];
    return 1;
  }

  if (arg === '-L') {
    options.symlink = true;
    return 0;
  }

  if (arg === '-empty') {
    options.empty = true;
    return 0;
  }

  return 0;
};

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];

  if (arg.charAt(0) === '-') {
    const skips = handleOptions(arg, i);
    i += skips;
  } else {
    const directory = path.resolve(__dirname, arg);
    listDirectories(directory);
    process.exit();
  }
}

// If no directory given
listDirectories(__dirname);

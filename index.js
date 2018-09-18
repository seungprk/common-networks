// start from current directly and recursively list all files
const util = require('util');
const fs = require('fs');
const path = require('path');

const lstat = util.promisify(fs.lstat);
const readdir = util.promisify(fs.readdir);

const listDirectories = (directory) => {
  readdir(directory)
    .then((files) => {
      files.forEach((file) => {
        const filePath = path.join(directory, file);
        lstat(filePath)
          .then((stats) => {
            if (stats.isDirectory()) {
              const innerPath = path.join(directory, file);
              listDirectories(innerPath);
            } else {
              console.log(filePath);
            }
          });
      });
    });
};

listDirectories(__dirname);

// start from current directly and recursively list all files
const util = require('util');
const fs = require('fs');
const path = require('path');

const lstat = util.promisify(fs.lstat);
const readdir = util.promisify(fs.readdir);

readdir(__dirname)
  .then((files) => {
    files.forEach((file) => {
      lstat(file)
        .then(stats => console.log(stats.isDirectory()));
    });
  });

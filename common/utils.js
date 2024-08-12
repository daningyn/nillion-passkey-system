const _ = require('lodash');
const fs = require('fs');
const path = require('path');

exports.prettify = function (s) {
  s = s
    .replace(/-+/g, '-')       // remove excessive hyphens
    .replace(/\s*-\s*/g, '-')  // remove whitespace around hyphens
    .replace(/^-|-$/g, '');    // remove hyphens from start and end
  return exports.titleCase(exports.trimEverywhere(s));
};

exports.walkDir = (dirPath, filesShouldBeRemoved = []) => {
  var files = fs.readdirSync(dirPath);

  // remove dot files
  _.remove(files, f => f.indexOf('.') === 0);

  // filter files should be removed
  files = _.filter(files, f => !_.includes(filesShouldBeRemoved, f));

  // map files to fullpath
  files = _.map(files, f => path.join(dirPath, f));

  return files;
}

exports.isJSON = (string) => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}
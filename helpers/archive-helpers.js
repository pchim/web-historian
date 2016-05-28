var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = pathsObj => {
  _.each(pathsObj, (path, type) => {
    exports.paths[type] = path;
  });
};

// take in a callback to act on array of urls
exports.readListOfUrls = cb => {
  // read from a list in a file, getting an array of urls
  fs.readFile(this.paths.list, 'utf8', (err, data) => {
    if (err) { throw err; }
    data = data.split('\n');
    console.log('reading list of urls:', data);
    cb(data);
  });
};

// take in a callback to act on a boolean indicating presence of url
exports.isUrlInList = function(url, cb) {
  // check if a url is in our list of urls
  this.readListOfUrls(urls => {
    cb(urls.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function() {
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};

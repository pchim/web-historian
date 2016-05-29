var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

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
exports.isUrlInList = (url, cb) => {
  // check if a url is in our list of urls
  this.readListOfUrls(urls => {
    cb(urls.indexOf(url) !== -1);
  });
};

// add a url to the list, then call a callback
exports.addUrlToList = (url, cb) => {
  fs.appendFile(this.paths.list, url + '\n', 'utf8', err => { 
    if (err) { throw err; } 
    cb();
  });
};

// check whether url is archived, and call callback on that boolean check
exports.isUrlArchived = (url, cb) => {
  fs.exists(this.archivedSites + '/' + url, exists => cb(exists));
};

// download urls from array
exports.downloadUrls = urlArray => {
  _.each( urlArray, url => {
    this.isUrlArchived(url, archived => {
      if (!archived) {
        http.get('http://' + url, res => {
          console.log('downloaded: ', url);
          var body = '';
          res.on('data', chunk => body += chunk)
            .on('end', err => {
              fs.writeFile(this.paths.archivedSites + '/' + url, body, 'utf8', err => {
                if (err) { throw err; }
                console.log('file written successfully!');
              });
            });
        });
      }
    });
  });
};

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var mainScreen = archive.paths.siteAssets + '/index.html';
var loadingScreen = archive.paths.siteAssets + '/loading.html';

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = (res, asset, callback) => {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (callback) { callback(); }

  fs.readFile(asset, 'utf8', (err, data) => {
    console.log('reading data');
    if (err) {
      res.statusCode = 404;
      res.end();
    } else {
      res.write(data);
      res.statusCode = 200;
      res.end();
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
exports.directLinks = (req, res, url) => {
  archive.isUrlArchived(url, exists => {
    let redirect = archive.paths.archivedSites + '/' + url;
    if (!exists) {
      if (req.method === 'POST') { redirect = loadingScreen; }
    }
    this.serveAssets(res, redirect); 
  });
};

exports.checkLink = (req, res, url) => {
  archive.isUrlInList(url, exists => {
    if (!exists) {
      archive.addUrlToList(url, () => {
        console.log('url added to list');
        res.statusCode = 302;
        this.serveAssets(res, loadingScreen);
      });
    } else {
      this.directLinks(req, res, url);
    }
  });
};
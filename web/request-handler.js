var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelper = require('./http-helpers.js');

const reqOptions = (req, res, method) => {

  // act based on method
  const reqObj = {
    'GET': () => {
      console.log('finding route, url: ', req.url);
      
      // find path according to url
      var filePath;
      if (req.url === '/') {
        filePath = archive.paths.siteAssets + '/index.html';
      } else {
        filePath = archive.paths.archivedSites + req.url;
      }

      // serve up assets
      httpHelper.serveAssets(res, filePath);

    },
    'POST': () => {
      console.log('posting to sites...', req.url);

      // get the data
      let dataBody = '';
      req.on('data', data => dataBody += data );

      // modify the data url and take action on it
      req.on('end', err => {
        dataBody = dataBody.replace('url=', '');
        console.log('After data body ', dataBody.toString());
        // append the url to end of file
        fs.appendFile(archive.paths.list, dataBody + '\n', 'utf8', err => {
          if (err) { throw err; }
          res.statusCode = 302;
          res.end();
        });
      });

    }
  };

  console.log('entering reqoptions');
  reqObj[method]();

};

exports.handleRequest = (req, res) => {

  console.log('handling request ', req.method);
  reqOptions(req, res, req.method);

  //res.end(archive.paths.list);
};

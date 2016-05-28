var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

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

      // read data in from file
      fs.readFile(filePath, 'utf8', (err, data) => {
        console.log('reading data');
        if (err) {
          res.statusCode = 404;
          res.end();
        } else {
          res.write(data);
          res.statusCode = 200;
          res.end(data);
        }
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

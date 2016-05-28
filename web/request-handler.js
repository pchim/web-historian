var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

const reqOptions = (req, res, method) => {

  // act based on method
  const reqObj = {
    'GET': () => {
      console.log('finding route');
      if (req.url === '/') {
        fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
          console.log('reading data');
          res.write(data);
          res.statusCode = 200;
          res.end(data);
        });
      }
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

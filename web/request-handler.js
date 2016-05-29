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
        httpHelper.serveAssets(res, filePath);
      } else {
        // decide what to do based in the link provided
        httpHelper.directLinks(req, res, req.url.substring(1));
      }

    },
    'POST': () => {
      console.log('posting to sites...', req.url);

      // get the data
      let dataBody = '';
      req.on('data', data => dataBody += data );

      // modify the data url and take action on it
      req.on('end', err => {
        dataBody = dataBody.replace('url=', '');
        console.log('url: ', dataBody);
        httpHelper.checkLink(req, res, dataBody);
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

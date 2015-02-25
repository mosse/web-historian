var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(response, filename, pathname) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var filePath = (path.join(__dirname, pathname, filename ));
  response.writeHead(200, headers);
  var fileContents = fs.readFile(filePath, function(err, data){
  response.end(data);
  })
};



// As you progress, keep thinking about what helper functions you can put here!
exports.redirect = function(response, location) {
  response.statusCode = 303;
  response.setHeader("Location", location);
  response.end();
};


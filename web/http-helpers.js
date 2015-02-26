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

exports.getUrl = function(req, res) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    var targetURL = ((body + '').slice(4));
    var filePath = path.join(__dirname, '../archives/', 'sites.txt');
    var sites = fs.readFileSync(filePath, 'utf8');
    var sitesArr = sites.split(',')[0] === '' ? sites.split(',').slice(1) : sites.split(',');

    if (sitesArr.indexOf(targetURL) !== -1) {
      var targetFilePath = path.join('../archives/sites/', targetURL);
      exports.redirect(res, targetURL, targetFilePath);
    } else {
      // Write site to sites.txt
      sitesArr.push(targetURL);
      var sitesString = sitesArr.join(',');
      fs.writeFile(filePath, sitesString);
      exports.redirect(res, 'http://127.0.0.1:8080/loading.html', '../web/public/loading.html');
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!
exports.redirect = function(response, url, filePath) {
  response.statusCode = 302;
  response.writeHead("Location", url);
  fs.readFile(path.join(__dirname, filePath), function (err, data) {
    if (err) {
      console.log(err);
    }
    response.write(data.toString());
    response.end();
  });
};


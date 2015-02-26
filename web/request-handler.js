var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('http-helpers.js');
// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    httpHelper.serveAssets(res, 'index.html', './public/')
  },
  'POST': function(req, res) {
    var targetURL = httpHelper.getUrl(req)
    if (targetURL === '') {
      res.writeHead(404, httpHelper.headers);
      res.end('No URL entered');
    }

    // read in sites.txt
    var filePath = path.join(__dirname, '../archives/', 'sites.csv');
    console.log(filePath);
    var sites = fs.readFileSync(filePath, 'utf8');
    console.log(sites);
    // , function(err, data) {
    //   if (err) {
    //     return console.log(err);
    //   }

    //   console.log(data);
    // });
    // console.log(sites);
    // compare to sites.txt
      // if inside sites.txt already
        // call redirect function
      // else
        // add it to sites.txt and redirect to loading page
  },
  'OPTIONS': function() {

  }
};


exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    res.end(404, 'ERROR');
  }
};

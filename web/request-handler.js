var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('http-helpers.js');
// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    httpHelper.serveAssets(res, 'index.html', './public/')
  },
  'POST': function(req, res) {
    var targetURL = httpHelper.getUrl(req, res)
    if (targetURL === '') {
      res.writeHead(404, httpHelper.headers);
      res.end('No URL entered');
    }


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

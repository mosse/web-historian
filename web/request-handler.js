var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('http-helpers.js');
// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    httpHelper.serveAssets(res, 'index.html', './public/')
  },
  'POST': function(req, res) {
    // httpHelper.redirect(res, './public/loading.html');
    console.log('POST');
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

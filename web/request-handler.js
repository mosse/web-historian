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
    // req.on('end', function() {
    //   console.log(this);
    // }, this);
    //console.log(req['url']);


    //console.log(httpHelper.getData(req));
    var targetURL = httpHelper.getUrl(req)
    // get form value for URL
    // check for null


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

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpGet = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  var sites = fs.readFileSync(exports.paths['list'], 'utf8');
  var sitesArr = sites.split(',')[0] === '' ? sites.split(',').slice(1) : sites.split(',');
  return sitesArr;
};

// exports.isUrlInList = function(url){
  // var arr = exports.readListOfUrls();
  // if (arr.indexOf(url) !== -1) {
  //   return true;
  // }
  // return false;
// };

// exports.addUrlToList = function(){
// };

exports.isURLArchived = function(url){
  fs.exists(path.join(exports.paths['archivedSites'], url), function(exists) {
    return exists;
  });
};

exports.downloadUrls = function(){
  var arr = exports.readListOfUrls();
  for (var i = 0; i < arr.length; i++){
    var fileName = arr[i].replace('.','_');
    if (!exports.isURLArchived(arr[i])) {
        //retrieve data
        httpGet.get('http://' + arr[i], function(err, res){
          if (err){
            console.log(err);
            return;
          }
          var fileName = res.url.replace(/[^A-Za-z0-9]/g,'');
          fs.writeFile(exports.paths['archivedSites'] + '/' + fileName, res.buffer.toString(), function (err, res) {
            if (err) {
                console.log(err);
            return;
            }
            console.log(fileName + ' written!');
          });
        });
    }
  }
};

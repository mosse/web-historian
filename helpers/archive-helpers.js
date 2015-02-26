var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  var sites = fs.readFileSync(exports.paths[list], 'utf8');
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
  return !!paths.join(exports.paths[archivedSites], url);

};

exports.downloadUrls = function(){

};

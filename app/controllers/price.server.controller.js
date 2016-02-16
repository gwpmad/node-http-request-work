var apiCall = require('./apiCall.server.controller.js');
var returnObject = {};

exports.request = function(req,res){
  returnObject = apiCall(req,res);
  return returnObject;
};

exports.getAveragePrice = function(object){

};

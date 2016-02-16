var apiCall = require('./apiCall.server.controller.js');

exports.request = function(req,res){
  apiCall(req,res);
};

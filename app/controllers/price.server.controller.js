var apiCall = require('./apiCall.server.controller.js');
var returnObject = {};

exports.request = function(req,res){
  var etsyData = apiCall(req,res);
  returnObject.average_price = getAveragePrice(etsyData);
  returnObject.highest_price = getHighestPricedListing(etsyData);
  returnObject.lowest_price = getLowestPricedListing(etsyData);
  return returnObject;
};

exports.getAveragePrice = function(json){
  var total = 0;
  for(i = 0; i < json.length; i++){
    total += parseInt(json[i].price);
  }
  return total/json.length;
};

exports.getHighestPricedListing = function(json){
  sortArrayByPriceLowestToHighest(json);
  return json.pop();
};

exports.getLowestPricedListing = function(json){
  sortArrayByPriceLowestToHighest(json);
  return json[0];
};

function sortArrayByPriceLowestToHighest(array){
  array.sort(function (a, b) {
    if (parseInt(a.price) > parseInt(b.price)) return 1;
    if (parseInt(a.price) < parseInt(b.price)) return -1;
    return 0;
  });
}

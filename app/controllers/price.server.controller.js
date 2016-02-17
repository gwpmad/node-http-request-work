var apiCall = require('./apiCall.server.controller.js');

exports.request = function(req, res) {
  var returnObject = {},etsyData;
  apiCall(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      generateReturnObject(returnObject,data.results);
      res.json(returnObject);
      console.log(returnObject);
    }
  });
};

generateReturnObject = function(returnObject,json) {
  returnObject.average_price = getAveragePrice(json);
  returnObject.highest_priced_listing = getHighestPricedListing(json);
  returnObject.lowest_priced_listing = getLowestPricedListing(json);
};

getAveragePrice = function(json) {
  var total = 0;
  for (i = 0; i < json.length; i++) {
    total += parseInt(json[i].price);
  }
  return total / json.length;
};

getHighestPricedListing = function(json) {
  sortArrayByPriceLowestToHighest(json);
  return json.pop();
};

getLowestPricedListing = function(json) {
  sortArrayByPriceLowestToHighest(json);
  return json[0];
};

sortArrayByPriceLowestToHighest = function(array) {
  array.sort(function(a, b) {
    if (parseInt(a.price) > parseInt(b.price)) return 1;
    if (parseInt(a.price) < parseInt(b.price)) return -1;
    return 0;
  });
};

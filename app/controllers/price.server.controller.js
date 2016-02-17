var apiCall = require('./apiCall.server.controller.js');

exports.request = function(req, res) {
  var returnObject = {};
  var etsyData;
  apiCall(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      etsyData = data.results;
      returnObject.average_price = getAveragePrice(etsyData);
      returnObject.highest_priced_listing = getHighestPricedListing(etsyData);
      returnObject.lowest_priced_listing = getLowestPricedListing(etsyData);
      res.json(returnObject);
      console.log(returnObject);
    }
  });
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

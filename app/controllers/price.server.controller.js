(function() {
  var apiCall = require('./apiCall.server.controller.js');

  exports.request = function(req, res) {
    var returnObject = {};
    apiCall(function(err, data) {
      if (err) {
        res.json({error: err});
      } else {
        generateReturnObject(returnObject, data.results);
        res.json(returnObject);
      }
    });
  };

  generateReturnObject = function(returnObject, json) {
    sortArrayByPriceLowestToHighest(json);
    returnObject.average_price = getAveragePrice(json);
    returnObject.highest_priced_listing = getHighestPricedListing(json);
    returnObject.lowest_priced_listing = getLowestPricedListing(json);
  };

  getAveragePrice = function(json) {
    var total = 0;
    for (i = 0; i < json.length; i++) {
      total += parseFloat(json[i].price);
    }
    return (total / json.length).toFixed(2);
  };

  getHighestPricedListing = function(json) {
    return json.pop();
  };

  getLowestPricedListing = function(json) {
    return json[0];
  };

  sortArrayByPriceLowestToHighest = function(array) {
    array.sort(function(a, b) {
      if (parseFloat(a.price) > parseFloat(b.price)) return 1;
      if (parseFloat(a.price) < parseFloat(b.price)) return -1;
      return 0;
    });
  };
})();

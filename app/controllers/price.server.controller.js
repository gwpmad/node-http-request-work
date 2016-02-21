(function() {
  var apiCall = require('./apiCall.server.controller.js'),
    self = module.exports;

  exports.request = function(req, res) {
    console.log('price request called');
    var returnObject = {};
    apiCall(function(err, data) {
      if (err) {
        res.json({
          error: err
        });
      } else {
        console.log('else part of apiCall callback being called');
        self.generateReturnObject(returnObject, data.results);
        res.json(returnObject);
      }
    });
  };

  exports.generateReturnObject = function(returnObject, json) {
    console.log('price generateReturnObject being called');
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

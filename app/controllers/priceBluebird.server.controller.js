(function() {
  var Promise = require('bluebird'),
    apiCall = Promise.promisify(require('./apiCall.server.controller.js')),
    //rules for promisifying a function here: http://stackoverflow.com/a/29596768
    self = module.exports;

    console.log(apiCall.toString());

  exports.request = function(req, res) {
    var returnObject = {};
    apiCall().then(function(data) {
      self.generateReturnObject(returnObject, data.results);
      res.json(returnObject);
    }).catch(SyntaxError, function(err) {
      res.json({
        error: err
      });
    }).catch(Promise.OperationalError, function(e) {
      console.error("unable to read file, because: ", e.message);
    });
  };

  exports.generateReturnObject = function(returnObject, json) {
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

(function() {
  var apiCall = require('./apiCall.server.controller.js'),
  self = module.exports;

  exports.request = function(req, res) {
    var returnObject = {};
    apiCall(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        self.generateReturnObject(returnObject, data.results);
        res.json(returnObject);
      }
    });
  };

  exports.generateReturnObject = function(returnObject, json) {
    sortArrayByQuantityLowestToHighest(json);
    returnObject.average_quantity = getAverageQuantity(json);
    returnObject.highest_quantity_listing = getHighestQuantityListing(json);
    returnObject.lowest_quantity_listing = getLowestQuantityListing(json);
  };

  getAverageQuantity = function(json) {
    var total = 0;
    for (i = 0; i < json.length; i++) {
      total += parseFloat(json[i].quantity);
    }
    return Math.round(total / json.length);
  };

  getHighestQuantityListing = function(json) {
    return json.pop();
  };

  getLowestQuantityListing = function(json) {
    return json[0];
  };

  sortArrayByQuantityLowestToHighest = function(array) {
    array.sort(function(a, b) {
      if (parseInt(a.quantity) > parseInt(b.quantity)) return 1;
      if (parseInt(a.quantity) < parseInt(b.quantity)) return -1;
      return 0;
    });
  };
})();

var priceController = require('../app/controllers/price.server.controller.js');



describe('price controller', function() {
  var dummyObject = [{
    price: "5.00"
  }, {
    price: "10.00"
  }, {
    price: "15.00"
  }, ];
  var averagePrice = 10;
  var highestPricedListing = {
    price: "15.00"
  };
  var lowestPricedListing = {
    price: "5.00"
  };

  it('should return a json object with the average price', function() {
    expect(priceController.getAveragePrice(dummyObject)).toBe(averagePrice);
  });

  it('should return the listing with the highest price', function() {
    expect(priceController.getHighestPricedListing(dummyObject)).toEqual(highestPricedListing);
  });

  it('should return the listing with the lowest price', function() {
    expect(priceController.getLowestPricedListing(dummyObject)).toEqual(lowestPricedListing);
  });
});

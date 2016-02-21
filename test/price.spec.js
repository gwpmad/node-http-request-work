(function() {
  // var rewire = require('rewire'),
  //   priceController = rewire('../app/controllers/price.server.controller.js'),
  //   generateReturnObject = priceController.__get__('generateReturnObject');

  var priceController = require('../app/controllers/price.server.controller.js');

  describe('price controller', function() {
    var dummyObject = [{
        price: "5.00"
      }, {
        price: "10.00"
      }, {
        price: "15.00"
      }, ],
      averagePrice = "10.00",
      highestPricedListing = {
        price: "15.00"
      },
      lowestPricedListing = {
        price: "5.00"
      };

    it('should return the average price', function() {
      expect(getAveragePrice(dummyObject)).toBe(averagePrice);
    });

    it('should return the listing with the highest price', function() {
      expect(getHighestPricedListing(dummyObject)).toEqual(highestPricedListing);
    });

    it('should return the listing with the lowest price', function() {
      expect(getLowestPricedListing(dummyObject)).toEqual(lowestPricedListing);
    });

    describe('generating the return object', function() {
      beforeEach(function() {
        sortArrayByPriceLowestToHighest = jasmine.createSpy();
        getAveragePrice = jasmine.createSpy();
        getHighestPricedListing = jasmine.createSpy();
        getLowestPricedListing = jasmine.createSpy();
      });

      it('should call all the relevant methods when creating the return object', function() {
        priceController.generateReturnObject({}, dummyObject);
        expect(sortArrayByPriceLowestToHighest).toHaveBeenCalledWith(dummyObject);
        expect(getAveragePrice).toHaveBeenCalledWith(dummyObject);
        expect(getHighestPricedListing).toHaveBeenCalledWith(dummyObject);
        expect(getLowestPricedListing).toHaveBeenCalledWith(dummyObject);
      });
    });
  });
})();

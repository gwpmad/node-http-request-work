(function() {
  // var rewire = require('rewire');
  // var quantityController = rewire('../app/controllers/quantity.server.controller.js');
  // var generateReturnObject = quantityController.__get__('generateReturnObject');

  var quantityController = require('../app/controllers/quantity.server.controller.js');

  describe('quantity controller', function() {
    var dummyObject = [{
      quantity: 5
    }, {
      quantity: 10
    }, {
      quantity: 15
    }, ];
    var averageQuantity = 10;
    var highestQuantityListing = {
      quantity: 15
    };
    var lowestQuantityListing = {
      quantity: 5
    };

    it('should return the average price', function() {
      expect(getAverageQuantity(dummyObject)).toBe(averageQuantity);
    });

    it('should return the listing with the highest price', function() {
      expect(getHighestQuantityListing(dummyObject)).toEqual(highestQuantityListing);
    });

    it('should return the listing with the lowest price', function() {
      expect(getLowestQuantityListing(dummyObject)).toEqual(lowestQuantityListing);
    });

    describe('generating the return object', function() {
      beforeEach(function() {
        sortArrayByQuantityLowestToHighest = jasmine.createSpy();
        getAverageQuantity = jasmine.createSpy();
        getHighestQuantityListing = jasmine.createSpy();
        getLowestQuantityListing = jasmine.createSpy();
      });

      it('should call all the relevant methods when creating the return object', function() {
        quantityController.generateReturnObject({}, dummyObject);
        expect(sortArrayByQuantityLowestToHighest).toHaveBeenCalledWith(dummyObject);
        expect(getAverageQuantity).toHaveBeenCalledWith(dummyObject);
        expect(getHighestQuantityListing).toHaveBeenCalledWith(dummyObject);
        expect(getLowestQuantityListing).toHaveBeenCalledWith(dummyObject);
      });
    });
  });
})();

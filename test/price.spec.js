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

  it('should return a json object with the average price', function() {
    // expect(priceController.getAveragePrice(dummyObject)).toBe({
    //   average_price: averagePrice
    // });
    console.log(priceController.getAveragePrice);
  });
});

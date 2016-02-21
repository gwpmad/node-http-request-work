(function() {
  var price = require('../controllers/price.server.controller.js');
  var quantity = require('../controllers/quantity.server.controller.js');
  var materials = require('../controllers/materials.server.controller.js');
  var priceBluebird = require('../controllers/priceBluebird.server.controller.js');

  module.exports = function(app) {

    app.get('/price', price.request);
    app.get('/quantity', quantity.request);
    app.get('/materials', materials.request);
    app.get('/price-bluebird', priceBluebird.request);

  };
})();

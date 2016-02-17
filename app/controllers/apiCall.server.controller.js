(function() {
  var request = require('request'),
  url = 'https://openapi.etsy.com/v2/listings/active?api_key=96kg7j4073g5j4nc9tk5usgw';

  module.exports = function(callback) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(null, JSON.parse(body));
      } else {
        console.log(error);
      }
    });
  };
})();

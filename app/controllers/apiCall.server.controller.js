(function() {
  var dotenv = require('dotenv').config(),
    request = require('request'),
    url = 'https://openapi.etsy.com/v2/listings/active?api_key=' + process.env.API_KEY;

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

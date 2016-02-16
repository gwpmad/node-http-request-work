var request = require('request');

exports.request = function(req, res) {
  request('https://openapi.etsy.com/v2/listings/active?api_key=96kg7j4073g5j4nc9tk5usgw', function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var etsyData = JSON.parse(body);
      res.json(etsyData);
    } else {
      console.log(error);
    }
  });
};

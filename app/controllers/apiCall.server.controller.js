var request = require('request');

function getBody(url, callback) {
  request({
    url: url,
    json: true,
  }, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      return callback(error || {statusCode: response.statusCode});
    }
    callback(null, JSON.parse(body));
  });
}


module.exports = function(req, res) {
  var etsyData;
  getBody('https://openapi.etsy.com/v2/listings/active?api_key=96kg7j4073g5j4nc9tk5usgw', function(err, body) {
    if (err) {
      console.log(err);
    } else {
      etsyData = body;
    }
  });
  console.log(etsyData);
  return etsyData;








  // var myReturn;
  // request('https://openapi.etsy.com/v2/listings/active?api_key=96kg7j4073g5j4nc9tk5usgw', function(error, response, body) {
  //     if (!error && response.statusCode === 200) {
  //       var etsyData = JSON.parse(body);
  //       myReturn = etsyData.results;
  //     } else {
  //       console.log(error);
  //     }
  //     return myReturn;
  // });


  // request('https://openapi.etsy.com/v2/listings/active?api_key=96kg7j4073g5j4nc9tk5usgw', function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     var etsyData = JSON.parse(body);
  //     return(JSON.parse(etsyData.results));
  //   } else {
  //     console.log(error);
  //   }
  // });
};

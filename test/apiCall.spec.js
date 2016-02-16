var frisby = require('frisby');
var url = 'https://openapi.etsy.com/v2/listings/active?api_key=96kg7j4073g5j4nc9tk5usgw';
var localUrl = 'localhost:3000/quantity';

frisby.create('Get JSON object')
.get(url)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.inspectJSON()
.expectJSONLength('results', 25)
  .toss();

frisby.create('Get quantity result')
.get(localUrl)
.expectStatus(200)
  .toss();

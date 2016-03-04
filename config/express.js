var express = require('express');
var compression = require('compression');

module.exports = function() {

  var app = express();

  app.use(compression());

  require('../app/routes/routes.js')(app);

  return app;
};

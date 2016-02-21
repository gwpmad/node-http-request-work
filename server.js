var express = require('./config/express');

var app = express();

app.listen(3000,function(){
  console.log('The server is running on port 3000');
});

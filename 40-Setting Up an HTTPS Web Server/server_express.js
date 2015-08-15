var express = require('express'),
  fs = require('fs');

var opts = {key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')};

var app = express(opts),
  https = require('https');

https.createServer(opts, app).listen(4443);

app.get('/', function (req, res) {
  res.send('secured!');
});

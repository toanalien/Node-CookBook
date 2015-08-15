var https = require('https');
var fs = require('fs');

var opts = {key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')};

https.createServer(opts, function (req, res) {
  res.end('secured!');
}).listen(4443); //443 for prod



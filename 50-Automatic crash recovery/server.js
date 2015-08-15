var http = require('http');
http.createServer(function (req, res) {
  res.end("Oh oh! Looks like I'm going to crash...");
  throw 'crash ahoy!';
}).listen(8080);

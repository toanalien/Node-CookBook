var http = require('http');

var port = 8080,
  mappings = require('./mappings');

var server = http.createServer(function (req, res) {
  var domain = req.headers.host.replace(new RegExp(':' + port + '$'), ''),
    site = mappings.sites[domain] || mappings.sites[mappings.aliases[domain]];
    
  if (site) { site.serve(req, res); return; }
  
  res.writeHead(404);
  res.end('Not Found\n');

}).listen(port);

var https = require('https');
var fs = require('fs');

var port = 8080, //change to 443 for straight HTTPS port, 
                 //must be root to run on privaledged ports, 
                //use with caution.
  mappings = require('./mappings'),
  defaultContext = {key: mappings.sites['nodecookbook.com'].key, 
    cert: mappings.sites['nodecookbook.com'].cert}

var server = https.createServer(defaultContext, function (req, res) {  
  var domain = req.connection.pair.servername,
    site = mappings.sites[domain] || mappings.sites[mappings.aliases[domain]];

  if (site) { site.content.serve(req, res); return; }
  
  res.writeHead(404);
  res.end('Not Found\n');

}).listen(port);



Object.keys(mappings.sites).forEach(function (hostname) {
  server.addContext(hostname, {key: mappings.sites[hostname].key, 
    cert: mappings.sites[hostname].cert});    
});

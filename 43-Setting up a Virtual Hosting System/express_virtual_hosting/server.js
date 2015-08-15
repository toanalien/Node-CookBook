var express = require('express'),
  mappings = require('./mappings'),
  app = express();
  
Object.keys(mappings.sites).forEach(function (domain) {
  app.use(express.vhost(domain, mappings.sites[domain]));
});

app.listen(8080);




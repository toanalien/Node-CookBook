var static = require('node-static');

function staticServe (dir) {
  return new (static.Server)('sites/' + dir)
}

exports.sites = {
  'nodecookbook' : staticServe('nodecookbook'),
  'localhost' : staticServe('localhost-site')
};



function appServe (dir) {
  return require('./sites/' + dir + '/app.js')
}

exports.sites = {
  'nodecookbook' : appServe('nodecookbook'),
  'localhost' : appServe('localhost-site')
};



var client = require('mongodb').MongoClient,
  users;

client.connect('mongodb://nodejitsu_dmc2:pq6a6o2dn6sdkbh5jikbdn78ci@ds045978.mongolab.com:45978/nodejitsu_dmc2_nodejitsudb5229403309', function (err, db) {
  if (err) { console.log(err); return; }
  users = db.collection('users');
});

function validate(user, cb) {
  if (!users) {cb({msg: 'User data not ready'})}

  users.findOne({name: user.name, pwd: user.pwd}, 
    function (err, user) {      
      if (err) { throw err; }
      if (!user) {
        cb({msg: 'Invalid login details!'});
        return;
      }
      cb();
    });

}



module.exports = function (req, res, next) {
  var method = req.method.toLowerCase(), //cache the method
    user = req.body.user,
    logout = (method === 'delete'),
    login = (user && method === 'post'),
    routes = req.app.routes[method];


  if (!routes.length) { next(); return; }
    
  if (login || logout) {    
    routes.forEach(function (route) {
      if (!(req.url.match(route.regexp))) {
        req.method = 'GET';
      }
    });
  }


  if (logout) { delete req.session.user; }
  

  if (login) {
    validate(user, function (err) {
      if (err) { req.flash('error', err.msg); return next(); }

        res.locals.user = req.session.user = user;
        next();

    });

    return;
  }


  if (!req.session.user) { 

    if (!req.url.indexOf('.css')) {
      req.url = '/';   
    }
    return next();
  }  

  res.locals.user = req.session.user;

  next();
};

var client = require('mongodb').MongoClient, 
  users; 

client.connect('mongodb://localhost:27017/profiler',
  function (err, db) { 
    users = db.collection('users'); 
  });

function validate(user, cb) {
  if (!users) {cb({msg: 'User data not ready'});}

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
    login = (user && method === 'post');

  if (logout) { delete req.session.user; }
    
  if (login) { 
    validate(user, function (err) { 
      if (err) { req.flash('error', err.msg); return next(); } 
        res.locals.user = req.session.user = user; 
        next(); 
    }); 
    return; 
  } 


  if (!req.session.user) { return next(); }  

  res.locals.user = req.session.user;

  next();
};

var users = {'dave' : 'expressrocks'};

function validate(user, cb) {
  var valid = Object.keys(users).some(function (name) { 
    return (user.name === name && user.pwd === users[name]); 
  });
  cb((!valid && {msg: 'Login details invalid!'} ));
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

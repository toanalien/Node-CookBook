var users = {'dave' : 'expressrocks'};

module.exports = function (req, res, next) {
  var method = req.method.toLowerCase(), //cache the method
    user = req.body.user,
    logout = (method === 'delete'),
    login = (user && method === 'post');

  if (logout) { delete req.session.user; }
    
  if (login) {
    Object.keys(users).forEach(function (name) {
      if (user.name === name && user.pwd === users[name]) {
        req.session.user = {
          name: user.name,
          pwd: user.pwd
        };
      }
    });
  }

  if (!req.session.user) { return next(); }  

  res.locals.user = req.session.user;

  next();
};

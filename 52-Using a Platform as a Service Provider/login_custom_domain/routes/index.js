
/*
 * GET home page.
 */
//fake user db:
var users = {'dave' : 'expressrocks'};
exports.login = function (req, res, next) {
  var user = req.body.user;
  if (user) {
    Object.keys(users).forEach(function (name) {
      if (user.name === name && user.pwd === users[name]) {
        req.session.user = {
          name: user.name,
          pwd: user.pwd
        };
      }
    });
  }
  next();
};

exports.logout = function (req, res, next) {
 delete req.session.user;
 next();
}

exports.index = function (req, res) {
  res.render('index', {title: 'Express', user: req.session.user});
};


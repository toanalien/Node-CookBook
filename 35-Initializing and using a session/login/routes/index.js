var express = require('express');
var router = express.Router();
var users = {'dave' : 'expressrocks'}; //fake user db:

function index(req, res) {
  res.render('index', { title: 'Express', user: req.session.user});
}

router.route('/')
  .get(index)
  .post(function login(req, res) {
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
    index(req, res);
  })
  .delete(function logout(req, res) {
    delete req.session.user;
    index(req, res);
  });


module.exports = router;

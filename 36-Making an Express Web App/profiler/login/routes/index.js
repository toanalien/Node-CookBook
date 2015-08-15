var express = require('express');
var router = express.Router();
var profiles = require('../../models/profiles'); 


router.all('/:pagenum([0-9]+)?', function (req, res) {
  profiles.pull(req.params.pagenum, function (err, profiles) {
    if (err) {  console.log(err); }
    res.render('index', { title: 'Profiler Admin', profiles: profiles, page: req.params.pagenum });
  });
});


router.get('/del', function (req, res) {
  profiles.del(req.query.id, function (err) {
    if (err) { console.log(err);  }
      profiles.pull(req.query.p, function (err, profiles) {
        req.app.locals.profiles = profiles; 
        res.redirect(req.header('Referrer') || '/');
      });
  });
});


router.post('/add', function (req, res) {
  profiles.add(req.body, function (err) {
    if (err) { console.log(err); }
    res.redirect(req.header('Referrer') || '/');
  });
});


module.exports = router;

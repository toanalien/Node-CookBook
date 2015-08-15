var express = require('express');
var router = express.Router();
var profiles = require('../profiles');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Profiles', profiles: profiles });
});

module.exports = router;

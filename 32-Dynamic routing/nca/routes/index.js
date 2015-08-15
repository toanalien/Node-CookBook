var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/page', function (req, res) {
  res.send('Hello I am Mr Page');
});

router.get('/:page', function (req, res) {
  res.send('Welcome to the ' + req.params.page + ' page');
});

module.exports = router;

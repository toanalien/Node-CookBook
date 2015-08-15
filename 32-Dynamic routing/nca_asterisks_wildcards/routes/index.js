var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/*page*', function (req, res) {
  res.send('Hello I am Mr Page');
});

router.get('/:page', function (req, res) {
  res.send('Welcome to the ' + req.params.page + ' page');
});

router.get('/:page/*', function (req, res) {

  var child = req.params[0],
    parent = child ? ' of the ' + req.params.page + ' page' : '';

    res.send('Welcome to the ' +
      (child || req.params.page) + ' page' + parent);

});


module.exports = router;

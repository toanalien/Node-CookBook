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

router.get('/:page/:admin?', function (req, res) {
  var admin = req.params.admin
  if (admin) {
    if (['add','delete'].indexOf(admin) !== -1) {
      res.send('So you want to ' + req.params.admin +  ' ' + req.params.page + '?');
      return;
    }
    res.send(404);
  }
});


//CLEANER BUT LESS EXTENSIBLE APPROACH:
// router.get('/:page/:admin((add|delete))', function (req, res) { 
//   res.send('So you want to ' + req.params.admin +  ' ' + req.params.page + '?');
// });



module.exports = router;

var express = require('express');
var router = express.Router();

function index(req, res) {
  res.render('index', { title: 'Express' });
}

router.all('/', index);
router.all('/:page', index);

module.exports = router;

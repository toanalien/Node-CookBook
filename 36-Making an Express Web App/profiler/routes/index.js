var express = require('express');
var router = express.Router();
var profiles = require('../models/profiles'); 

function safeMix(jade_mixins, mixins) {
  mixins = Array.prototype.slice.call(arguments, 1);
  mixins.forEach(function (mixin) { 
    jade_mixins[mixin] = jade_mixins[mixin] || safeMix.noop; 
  });
}
safeMix.noop = function () {}

/* GET home page. */
router.get('/:pagenum([0-9]+)?', function (req, res) { 
  
  profiles.pull(req.params.pagenum, function (err, profiles) { 
    if (err) { throw err; }  
    
    res.render('index', { title: 'Profiler', profiles: profiles, 
      page: req.params.pagenum,  safeMix: safeMix}); 
  }); 

});

module.exports = router;







/*
 * GET home page.
 */

var profiles = require('../models/profiles'), 
  repl = require('repl').start('> ');

repl.context.profiles = profiles;



function patchMixins(req, mixins) {
  if (req.session && req.session.user) { return; }    

  mixins.forEach(function (mixin) {
    req.app.locals[mixin + '_mixin'] = function(){};
  });
  
}

exports.index = function (req, res) {
  
  profiles.pull(req.params.pagenum, function (err, profiles) {
    if (err) { throw err; }

    //output no-ops to avoid choking on non-existant mixins when not logged in
    patchMixins(req, ['add','del','adminScript']);
    
    res.render('index', { title: 'Profiler', profiles: profiles,
      page: req.params.pagenum });
  });

};

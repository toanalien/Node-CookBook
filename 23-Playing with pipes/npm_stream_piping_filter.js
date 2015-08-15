var http = require('http'),
  JSONStream = require('JSONStream'),  
  feed = 'http://isaacs.iriscouch.com/registry/_changes?feed=continuous';


function decide(cb) {
  setTimeout(function () {
    if (Date.now()%2) { return console.log('rejected'); }        
    cb();
  }, 2000);
}

http.get(feed, function (res) {

  decide(function () {
    res.pipe(JSONStream.parse('id')).pipe(process.stdout);
  });

});
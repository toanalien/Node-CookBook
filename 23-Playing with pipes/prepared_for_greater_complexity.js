var http = require('http'),
  feed = 'http://isaacs.iriscouch.com/registry/_changes?feed=continuous';


function decide(cb) {
  setTimeout(function () {
    if (Date.now()%2) { return console.log('rejected'); }        
    cb();
  }, 2000);
}

http.get(feed, function (res) {

  res.pause();

  decide(res.resume.bind(res));

  res.pipe(process.stdout)
  
});
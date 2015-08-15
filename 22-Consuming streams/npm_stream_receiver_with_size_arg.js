var http = require('http'),
  feed = 'http://isaacs.iriscouch.com/registry/_changes?feed=continuous',  
  ready = false;


function decide(cb) {
  console.log('deciding')
  setTimeout(function () {
    if (Date.now()%2) { return console.log('rejected'); }    
    ready = true; 
    cb();
  }, 2000);
}



http.get(feed, function (res) {

  res.on('readable', function log() {
    var chunk;
    
    if (!ready) { return decide(log); }
  
    while( (chunk = res.read(20)) !== null) {
        console.log(chunk+'');
    } 

  });

});


//alternative iteration method:

// http.get(feed, function (res) {

//   res.on('readable', function log() {
    
//     if (!ready) { return decide(log); }
  
//     (function output() {
//       var chunk = res.read(20);
//       if (chunk === null) {return;}
//       console.log(chunk+'');   
//       setImmediate(output);
//     }());

//   });

// });


//another alternative iteration method

// function output(res) {
//   var chunk = res.read(20);
//   if (chunk === null) {return false;}
//   console.log(chunk+'');   
//   return true;
// }

// http.get(feed, function (res) {

//   res.on('readable', function log() {
    
//     if (!ready) { return decide(log); }
  
//     while(output(res));

//   });

// });
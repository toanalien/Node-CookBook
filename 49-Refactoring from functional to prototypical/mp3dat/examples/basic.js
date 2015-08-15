var mp3dat = require('../index.js'); 

console.log(mp3dat);

mp3dat.stat('../test/test.mp3', function (err, stats) {
  console.log(stats);
});





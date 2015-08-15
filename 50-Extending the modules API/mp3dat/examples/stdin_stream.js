//to use try :
// cat ../test/test.mp3 | node stdin_stream.js 82969
// or
//  curl http://www.paul.sladen.org/pronunciation/torvalds-says-linux.mp3 | node stdin_stream.js 82969
// the argument (82969) is the size in bytes of the mp3


if (!process.argv[2]) {
  process.stderr.write('\nNeed mp3 size in bytes\n\n');
  process.exit();
}

var mp3dat = require('../');
process.stdin.resume();
mp3dat.statStream({stream : process.stdin, size: process.argv[2]}, function (err, stats) {
  if (err) { console.log(err); }
  console.log(stats);
});

var net = require('net');

var client = net.connect(8081,'localhost', function () {
  process.stdin.resume();
  process.stdin.pipe(client);
}).on('data', function (data) {
  console.log(data+'');
}).on('end', function () {
  console.log('session ended');
});
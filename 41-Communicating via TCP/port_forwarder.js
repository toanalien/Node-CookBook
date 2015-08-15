var fromPort = process.argv[2] || 9000;
var toPort = process.argv[3] || 22;
var net = require('net');

net.createServer(function (socket) {
  var client;
  socket.on('connect', function () {
    client = net.connect(toPort);
    client.on('data', function (data) {
      socket.write(data);
    });
  })
  .on('data', function (data) {
    client.write(data);
   })
  .on('end', function() {
      client.end();
  });
}).listen(fromPort, function () {
  console.log('Forwarding ' + this.address().port + ' to ' + toPort);
});


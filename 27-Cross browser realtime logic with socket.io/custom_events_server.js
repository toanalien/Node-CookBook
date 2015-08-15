var http = require('http');
var clientHtml = require('fs').readFileSync('custom_events_client.html');
var plainHttpServer = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type' : 'text/html'});
    response.end(clientHtml);
  }).listen(8080);


var io = require('socket.io').listen(plainHttpServer);

io.sockets.on('connection', function (socket) {
  socket.emit('hello', 'Socket.io!');
  socket.on('hollaback', function (from) {
    console.log('Received a hollaback from' + from);
  });
});


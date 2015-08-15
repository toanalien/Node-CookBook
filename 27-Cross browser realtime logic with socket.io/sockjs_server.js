var http = require('http');
var clientHtml = require('fs').readFileSync('sockjs_client.html');
var plainHttpServer = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-type' : 'text/html'});
  response.end(clientHtml);
 }).listen(8080);

var sockServer = require('sockjs').listen(plainHttpServer, {prefix:'/sock'});

sockServer.on('connection', function (socket) {
  socket.on('data', function (msg) {
    if (msg === 'Hello') {
      socket.write('SockJS!');
    }
  });
});
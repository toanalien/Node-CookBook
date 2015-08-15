var http = require('http');
var clientHtml = require('fs').readFileSync('dnode_client.html');
var plainHttpServer = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type' : 'text/html'});
    response.end(clientHtml);
  }).listen(8080);

var sockServer = require('sockjs').listen(plainHttpServer, 
	{prefix: '/sock'});


sockServer.on('connection', function (socket) {

  socket.on('give me a number', function (cb) {
    cb(4);
  });

  socket.emit('give me a sentence', function (sentence) {
    socket.write(Buffer(sentence).toString('base64'));
  });

});


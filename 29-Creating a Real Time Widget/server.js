var http = require('http');
var fs = require('fs');
var clientHtml = fs.readFileSync('index.html');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type' : 'text/html'});
    response.end(clientHtml);
}).listen(8080);

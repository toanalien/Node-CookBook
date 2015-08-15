var http = require('http');
var querystring = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');
var maxData = 2 * 1024 * 1024; //2mb
http.createServer(function (request, response) {
  if (request.method === "POST") {
    var postData = '';
    request.on('data', function (chunk) {

      postData += chunk;
      if (postData.length > maxData) {
        postData = '';
        this.destroy();
        response.writeHead(413); // Request Entity Too Large
        response.end('Too large');
      }

    }).on('end', function () {
      if (!postData) { response.end(); return; } //prevents empty post requests from crashing the server
      var postDataObject = querystring.parse(postData);
      console.log('User Posted:\n', postData);
      response.end('You Posted:\n' + util.inspect(postDataObject));
    });
    return;
  }
  if (request.method === "GET") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
}).listen(8080);


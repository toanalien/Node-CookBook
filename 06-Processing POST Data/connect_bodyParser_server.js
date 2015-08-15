var connect = require('connect');
var bodyParser = require('body-parser');
var util = require('util');
var form = require('fs').readFileSync('form.html');

connect(connect.limit('2mb'), bodyParser(),
  function (request, response) {
    if (request.method === "POST") {
      console.log('User Posted:\n', request.body);
      response.end('You Posted:\n' + util.inspect(request.body));
    }
    if (request.method === "GET") {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(form);
    }
  }).listen(8080);


var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};

var cache = {};
http.createServer(function (request, response) {
  var lookup = path.basename(decodeURI(request.url)) || 'index.html',
    f = 'content/' + lookup;
  fs.exists(f, function (exists) { //path.exists for Node 0.6 and below
    if (exists) {
      var headers = {'Content-type': mimeTypes[path.extname(f)]};
      if (cache[f]) {
        console.log('from cache');
        response.writeHead(200, headers);
        response.end(cache[f].content);
        return;
      }

      var s = fs.createReadStream(f).once('open', function () {
        response.writeHead(200, headers);
        this.pipe(response);
      }).once('error', function (e) {
        console.log(e);
        response.writeHead(500);
        response.end('Server Error!');
      });

      fs.stat(f, function (err, stats) {
        var bufferOffset = 0;
        cache[f] = {content: new Buffer(stats.size)}; //initialize cache[f].content      
        s.on('data', function (chunk) {
          chunk.copy(cache[f].content, bufferOffset);
          bufferOffset += chunk.length;
        });
      });

      return;

    }
    response.writeHead(404); //no such file found!
    response.end('Page Not Found!');
  });

}).listen(8080);

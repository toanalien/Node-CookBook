var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes={
'.js' : 'text/javascript',
'.html': 'text/html',
'.css' : 'text/css'
};

http.createServer(function (request, response) {
  var lookup=path.basename(decodeURI(request.url).split('?')[0]) || 'index.html';
  var f='content/'+lookup;
  console.log(f);
  path.exists(f, function (exists) { //fs.exists in 0.7+
    if (exists) {
      fs.readFile(f,function (err, data) {
       if (err) {response.writeHead(500);response.end(); console.log(err); return;}
       var contentType={'Content-type':mimeTypes[path.extname(lookup)]};
        response.writeHead(200,contentType);
        response.end(data);            
      });
      return; 
    } 
      response.writeHead(404); //no such file found!
      response.end();   
  });

}).listen(8080);

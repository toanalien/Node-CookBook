var net = require('net'),
  stream = new (require('stream').PassThrough);

net.createServer(function(socket) {
  socket.end('Hello, this is TCP\n');    
  socket.pipe(stream);
}).listen(8080);

net.createServer(function(socket) {  
  stream.on('data', function (d) {
    d+='';
    socket.write(Date() + ' ' + d.toUpperCase());
  });
  socket.pipe(stream);
}).listen(8081);
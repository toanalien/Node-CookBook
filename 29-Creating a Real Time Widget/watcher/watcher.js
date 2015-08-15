var io = require('socket.io')(),  
  fs = require('fs'),
  totals = {},
  watcher = function () {
              var socket = io.connect('ws://localhost:8081');
              socket.on('update', function () {
               location.reload();
              });
            },
  clientScript = Buffer.concat([
    require('socket.io/node_modules/socket.io-client').source,
    Buffer(';(' + watcher + '());')
  ]);

io.static(false);

io.attach(require('http').createServer(function(req, res){
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8');    
  res.end(clientScript);
}).listen(8081));

fs.watch('content', function (e, f) {
  if (f[0] !== '.') {
    io.sockets.emit('update');
  }
});
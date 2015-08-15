var io = require('socket.io')(),  
  totals = {},
  clientScript = Buffer.concat([
    require('socket.io/node_modules/socket.io-client').source,
    require('fs').readFileSync('widget_client.js')
  ]);

io.static(false);

io.attach(require('http').createServer(function(req, res){
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8');    
  res.end(clientScript);
}).listen(8081));

io.on('connection', function (socket) {  
  var origin = socket.request.socket.domain || 'local';

  totals[origin] = totals[origin] || 0;
  totals[origin] += 1;

  socket.join(origin);

  io.sockets.to(origin).emit('total', totals[origin]);

  socket.on('disconnect', function () {
    totals[origin] -= 1;
    io.sockets.to(origin).emit('total', totals[origin]);
  });
});


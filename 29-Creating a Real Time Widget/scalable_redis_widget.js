var io = require('socket.io')(),  
  totals = require('redis').createClient(),
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

  socket.join(origin);

  totals.incr(origin, function (err, total) {
    io.sockets.to(origin).emit('total', total);  
  });


  socket.on('disconnect', function () {
    totals.decr(origin, function (err, total) {
      io.sockets.to(origin).emit('total', total);  
    });  
  });
});
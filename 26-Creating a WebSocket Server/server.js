var WSServer = require('ws').Server,
  wss = new WSServer({port:8080})
;  
wss.on('connection', function (socket) {  

  socket.on('message', function (msg, flags) {
    console.log('Recieved: ', msg, 
      '\nFrom IP: ', socket.upgradeReq.connection.remoteAddress);

    if (msg === 'Hello') {
      socket.send('Websockets!');
    }
  });
  

  socket.on('close', function (code, desc) {
    console.log('Disconnect: ' + code + ' - ' + desc);
  });

});

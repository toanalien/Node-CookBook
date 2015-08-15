 var socket = require('socket.io/node_modules/socket.io-client')('ws://localhost:8081'),
    rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

  function logStr(eventStr, msg) {
    return '<div>' + eventStr + ': ' + msg + '</div>';
  } 
   
  socket.on('connect', function () {
    rl.on('line', function (msg) {
      socket.send(msg);
      console.log(logStr('Sent', msg))
    });
    
    socket.on('total', function (total) {
      console.log(logStr('Total', total));
    });
  });
var socket = require('./node_modules/socket.io/node_modules/socket.io-client')('ws://localhost:8080'),
  output = {innerHTML:''};

socket.on('connect', function () {

  socket.on('hello', function (msg) {
    output.innerHTML += '<div>Hello ' + msg + '</div>';
    console.log(output);
    socket.emit('hollaback', 'the client');
  });

});
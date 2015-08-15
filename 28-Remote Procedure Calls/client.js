var socket = require('./node_modules/socket.io/node_modules/socket.io-client')('ws://localhost:8080'),
  output = {innerHTML:''};
    
function square(num) {
  output.innerHTML = "<div>" + num + " x " + num + " is " + (num * num) + "</div>";
  console.log(output)
}

socket.on('connect', function () {  
  socket.emit('give me a number', square);
    
  socket.on('give me a sentence', function (cb) {
    cb('Ok, here is a sentence.');
  });
  

  socket.on('message', function (msg) {
    output.innerHTML += '<div>Recieved: ' + msg + '</div>';
    console.log(output)
  });
});
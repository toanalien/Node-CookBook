var request = require('request'), 
  JSONStream = require('JSONStream'), 
  WSServer = require('ws').Server, 
  stream = require('websocket-stream'), 

  wss = new WSServer({port: 8080}), 
  
  registry = 'http://skimdb.npmjs.com/registry',
  changes = '/_changes?heartbeat=20000&feed=continuous&since=';

wss.on('connection', function(socket) { 

  request({url: registry, json:true}, function (err, res, doc) {      
    if (err) { return console.log(err); } 

    var since = doc.committed_update_seq - 50,
     idStream = JSONStream.parse('id');    

    request(registry + changes + since) 
      .pipe(idStream) 
      .pipe(stream(socket)); 

    socket.on('close', function () { idStream.destroy(); }); 

  }); 

});

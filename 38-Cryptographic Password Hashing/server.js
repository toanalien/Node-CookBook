var express = require('express');
var crypto = require('crypto');
var bodyParser = require('body-parser');

var userStore = {},
  app = express();

app.listen(8080)

app.use(bodyParser());

app.get('/', function (req, res) {
  res.sendfile('regform.html');
});

app.post('/', function (req, res) {
  if (!req.body.user || !req.body.pass) {  
    res.send('Username and password both required');
    return;
  }
  var hash = crypto
      .createHash("md5")
      .update(req.body.pass)
      .digest('hex');


  userStore[req.body.user] = hash;
  res.send('Thanks for registering ' + req.body.user);
  console.log(userStore);
  
});





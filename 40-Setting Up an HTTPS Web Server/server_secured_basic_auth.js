var https = require('https');
var fs = require('fs');

var username = 'dave',
  password = 'ILikeBrie_33',
  realm = 'Node Cookbook';

function authenticate(res) {
  res.writeHead(401, {'WWW-Authenticate' : 'Basic realm="' + realm + '"'});
  res.end('Authorization required.');
}

var opts = {key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')};

https.createServer(opts, function (req, res) {
  var auth, user;

  if (!req.headers.authorization) {
    authenticate(res);
    return;
  }

  //extract base64 encoded username:password string from client
  auth = req.headers.authorization.replace(/^Basic /, '');
  //decode base64 to utf8
  auth = (new Buffer(auth, 'base64').toString('utf8'));

  user = auth.split(':'); //[0] is username [1] is password

  if (user[0] === username && user[1] === password) {
    res.end('Someone likes soft cheese!');
    return;
  }

  authenticate(res);

}).listen(8080);

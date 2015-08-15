var http = require('http');
var crypto = require('crypto');

var users = {
              'dave' : {password : 'digestthis!'},
              'bob' : {password : 'MyNamesBob:-D'},
            },
  realm = 'Node Cookbook',
  opaque;

function md5(msg) {
  return crypto.createHash('md5').update(msg).digest('hex');
}

opaque = md5(realm);


function authenticate(res, username) {
  var uRealm = realm, uOpaque = opaque;
  if (username) {
    uRealm = users[username].uRealm;
    uOpaque = users[username].uOpaque;
  }
  res.writeHead(401, {'WWW-Authenticate' : 'Digest realm="' + uRealm + '"'
    + ',qop="auth",nonce="' + Math.random() + '"'
    + ',opaque="' + uOpaque + '"'});

  res.end('Authorization required.');
}

function parseAuth(auth) {
  var authObj = {};
  auth.split(', ').forEach(function (pair) {
    pair = pair.split('=');
    authObj[pair[0]] = pair[1].replace(/"/g, '');
  });
  return authObj;
}

http.createServer(function (req, res) {
  var auth, user, digest = {};

  if (!req.headers.authorization) {
    authenticate(res);
    return;
  }

  auth = req.headers.authorization.replace(/^Digest /, '');
  auth = parseAuth(auth);

  //don't waste resources generating MD5 if username is wrong
  if (!users[auth.username]) { authenticate(res); return; }

  if (req.url === '/logout') {
    users[auth.username].uRealm = realm + ' [' + Math.random() + ']';
    users[auth.username].uOpaque = md5(users[auth.username].uRealm);
    users[auth.username].forceLogOut = true;
    res.writeHead(302, {'Location' : '/'});
    res.end();
    return;
  }

  if (users[auth.username].forceLogOut) {
    delete users[auth.username].forceLogOut;
    authenticate(res, auth.username);
  }

  digest.ha1 = md5(auth.username + ':'
    + (users[auth.username].uRealm || realm) + ':'
    + users[auth.username].password);
  digest.ha2 = md5(req.method + ':' + auth.uri);
  digest.response = md5([
    digest.ha1,
    auth.nonce, auth.nc, auth.cnonce, auth.qop,
    digest.ha2
  ].join(':'));


  if (auth.response !== digest.response) {
    users[auth.username].uRealm = realm + ' [' + Math.random() + ']';
    users[auth.username].uOpaque = md5(users[auth.username].uRealm);
    authenticate(res, auth.username);
    return;
  }

  res.writeHead(200, {'Content-type':'text/html'});
  res.end('You made it! <br> <a href="logout"> [ logout ] </a>');


}).listen(8080);

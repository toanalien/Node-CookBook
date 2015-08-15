require('http-proxy')
  .createServer({router : {
    'login.nodecookbook.com': 'localhost:3000',
    'nodecookbook.com': 'localhost:8080'
  }}).listen(81, function () {
    process.setuid('www-data');
  });

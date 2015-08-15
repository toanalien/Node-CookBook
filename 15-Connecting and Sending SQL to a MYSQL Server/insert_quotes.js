var mysql = require('mysql');
var connection = mysql.createConnection({
  user: 'root',
  password: 'psalm33',
  //debug: true  
});

var ignore = [mysql.ERROR_DB_CREATE_EXISTS,
              mysql.ERROR_TABLE_EXISTS_ERROR];

var params = {author: process.argv[2], quote: process.argv[3]};

connection.on('error', function (err) {
  if (ignore.indexOf(err.number) + 1) { return; }
  throw err;
});

connection.query('CREATE DATABASE quotes');
connection.changeUser({'database':'quotes'});
connection.query('CREATE TABLE quotes.quotes (' +
             'id INT NOT NULL AUTO_INCREMENT, ' +
             'author VARCHAR( 128 ) NOT NULL, ' +
             'quote TEXT NOT NULL, PRIMARY KEY (  id )' +
             ')');

if (params.author && params.quote) {
  connection.query('INSERT INTO  quotes.quotes (' +
                'author, quote) ' +
                'VALUES (?, ?);', [ params.author, params.quote ]);
}

connection.end();
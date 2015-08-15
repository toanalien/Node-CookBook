var mysql = require('mysql'),
  connection = mysql.createConnection({
    user: 'root',
    password: 'psalm33',
    //debug: true  
  });

connection.connect();


var ignore = [mysql.ERROR_DB_CREATE_EXISTS,
              mysql.ERROR_TABLE_EXISTS_ERROR];

connection.on('error', function (err) {
  if (ignore.indexOf(err.number) > -1) { return; }
  throw err;
});

connection.query('CREATE DATABASE quotes');
connection.changeUser({'database':'quotes'});
connection.query('CREATE TABLE quotes.quotes (' +
             'id INT NOT NULL AUTO_INCREMENT,' +
             'author VARCHAR( 128 ) NOT NULL,' +
             'quote TEXT NOT NULL, PRIMARY KEY (  id )' +
             ')');

connection.query('INSERT INTO  quotes.quotes (' +
              'author, quote) ' +
              'VALUES ("Bjarne Stroustrup", "Proof by analogy is fraud.");');

connection.end();

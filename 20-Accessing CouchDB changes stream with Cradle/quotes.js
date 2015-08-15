var cradle = require('cradle');
//var db = new (cradle.Connection)().database('quotes');
var db = new (cradle.Connection)({ auth: { username: 'dave', password: 'cookit' }}).database('quotes'); 

var params = {author: process.argv[2], quote: process.argv[3]};

function errorHandler(err) {
  if (err) { console.log(err); process.exit(); }
}

function checkAndSave(err) {
  errorHandler(err);

  if (params.author && params.quote) {
    db.save({author: params.author, quote: params.quote}, errorHandler);
    return;	
  }
}

db.exists(function (err, exists) {
  errorHandler(err);
  if (!exists) { db.create(checkAndSave); return; }
  checkAndSave();
});



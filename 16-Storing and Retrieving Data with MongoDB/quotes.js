var client = require('mongodb').MongoClient,
  params = {author: process.argv[2], quote: process.argv[3]};


//ensure mongod is running!
//mongod --dbpath [path to db dir]
//As a service:
//mongod --fork --logpath [p] --logappend –dbpath [p]
client.connect('mongodb://localhost:27017/quotes', function (err, db) {
  if (err) { throw err; }

  var collection = db.collection('quotes');

  if (params.author && params.quote) {
    collection.insert({author: params.author, quote: params.quote}, function (err) { 
      if (err) { throw err; }

    });
  }

  if (params.author) {
    collection.find({author: params.author}).each(function (err, doc) {
      if (err) { throw err; }
      if (doc) { console.log('%s: %s \n', doc.author, doc.quote); return; }
      db.close();
    });
    return;
  }

  db.close();


})


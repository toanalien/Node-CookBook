var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/quotes', function (err, db) {
  if (err) { throw err; }

  var collection = db.collection('quotes');  
  
  collection.ensureIndex('author', {safe: true}, function (err) {
    if (err) { throw err; } 
    collection.distinct('author', function (err, result) {
        if (err) { throw err; }
        console.log(result.join('\n')); 
        db.close();
      });  
    });
    
});

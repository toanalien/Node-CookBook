var mongodb = require('mongodb'),
  client = mongodb.MongoClient,
  params = {id: process.argv[2]};

client.connect('mongodb://localhost:27017/quotes', function (err, db) {
  if (err) { throw err; }

  var collection = db.collection('quotes');

  if (params.id) {
    collection.update({_id : mongodb.ObjectID(params.id)},
      {$inc: {votes: 1}}, {safe: true},
      function (err) {
        if (err) { throw err; }
        console.log('1 vote added to %s by %s', params.id);
        collection.find().sort({votes: -1}).limit(10).each(function (err, doc) {
          if (err) { throw err; }
          if (doc) {
            var votes = (doc.votes) || 0;
            console.log(doc.author, doc.quote, votes);
            return;
          }
          db.close();
        });
      });

    return;
  }

  collection.find().each(function (err, doc) {
    if (err) { throw err; }
    if (doc) { console.log(doc._id, doc.quote); return; }
    db.close();
  });


});

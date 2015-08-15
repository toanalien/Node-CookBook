var NeDB = require('nedb'),
  collection = new NeDB('./quotes.db'),
  params = {author: process.argv[2], quote: process.argv[3]};


collection.loadDatabase(function (err) {
  if (err) { throw err; }

  if (params.author && params.quote) {
    collection.insert({author: params.author, quote: params.quote}, function (err) { 
      if (err) { throw err; }

    });
  }

  if (params.author) {
    collection.find({author: params.author}, function (err, docs) {
      if (err) { throw err; }
      docs.forEach(function(doc) {
        if (doc) { console.log('%s: %s \n', doc.author, doc.quote);}
      })      
    });
  }

});


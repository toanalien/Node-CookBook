var db = require('mongoskin').db('localhost:27018/quotes', {w:1}),
  collection = db.collection('quotes'),
  params = {author: process.argv[2], quote: process.argv[3]};

if (params.author && params.quote) {
  collection.insert({author: params.author, quote: params.quote}, function () {});
}

if (params.author) {
  collection.findEach({author: params.author}, function (err, doc) {
    if (err) { throw err; }
    if (doc) { console.log('%s: %s \n', doc.author, doc.quote); return; }
    db.close();
  });
  return;
}

db.close();

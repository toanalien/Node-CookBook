var mongo = require('mongoskin');
var client = mongo.db('localhost:27017/quotes');
var params = {author: process.argv[2], quote: process.argv[3]};

client.bind('quotes', {
  store: function (author, quote) {
    if (quote) { this.insert({author: author, quote: quote}); }
  },
  show: function (author, cb) {
    this.findEach({author: author}, function (err, doc) {
      if (err) { throw err; }
      if (doc) { console.log('%s: %s \n', doc.author, doc.quote); return; }
      cb();
    });
  }
});

client.quotes.store(params.author, params.quote);

if (params.author) {
  client.quotes.show(params.author, function () {
    client.close();
  });
  return;
}

client.close();

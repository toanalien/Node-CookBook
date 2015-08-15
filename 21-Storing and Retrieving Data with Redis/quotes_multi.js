var redis = require('redis'),
  client = redis.createClient(),
  params = {author: process.argv[2], quote: process.argv[3]};


if (params.author && params.quote) {
  var randKey = "Quote:" + (Math.random() * Math.random())
                .toString(16).replace('.', '');

  client.multi()
    .hmset(randKey, {"author": params.author,
                   "quote": params.quote})
    .sadd('Author:' + params.author, randKey)
    .exec(function (err, replies) {
      if (err) { throw err; };
      if (replies[0] == "OK") { console.log('Added...\n'); }
    });
}
if (params.author) {
  client.smembers('Author:' + params.author, function (err, keys) {
    keys.forEach(function (key) {
      client.hgetall(key, function (err, hash) {
        console.log('%s: %s \n', hash.author, hash.quote);
      });
    });
    client.quit();
  });
  return;
}

client.quit();



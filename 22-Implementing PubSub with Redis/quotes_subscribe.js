var redis = require('redis');
var client = redis.createClient();

process.argv.slice(2).forEach(function (authorChannel, i) {
  client.subscribe(authorChannel, function () {
    console.log('Subscribing to ' + authorChannel + ' channel');
  });
});

client.on('message', function (channel, msg) {

  console.log("\n%s: %s", channel, msg);

});

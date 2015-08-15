var https = require('https');
var xml2js = require('xml2js');
var colors = require('colors'); //for prettifying the console output
var trendingTopics = require('./twitter_trends');


var hotTopics = Object.create(trendingTopics, {trends: {value: {urlOpts: {
    host: 'www.google.com',
    path: '/trends/hottrends/atom/hourly',
    headers: {'User-Agent': 'Node Cookbook: Twitter Trends'}
  }}}});

hotTopics.xmlHandler = function (response, cb) {
  var hotTopicsfeed = '';
  response.on('data', function (chunk) {
    hotTopicsfeed += chunk;
  }).on('end', function () {
    xml2js.parseString(hotTopicsfeed, function (err, obj) {
      if (err) { throw (err.message); }
      xml2js.parseString(obj.feed.entry[0].content[0]._,
        function (err, obj) {          
          if (err) { throw (err.message); }
          var query = obj.ol.li[0].span[0].a[0]._;
          cb(encodeURIComponent(query));
        });
    });
  });
};

function makeCall(urlOpts, handler, cb) {
  https.get(urlOpts, function (response) { //make a call to the twitter api  
    handler(response, cb);
  }).on('error', function (e) {
    console.log("Connection Error: " + e.message);
  });
}

makeCall(hotTopics.trends.urlOpts, hotTopics.xmlHandler, 
  function (query) {
    hotTopics.tweetPath(query);
    makeCall(hotTopics.tweets.urlOpts, hotTopics.jsonHandler, 
      function (tweetsObj) {
        tweetsObj.statuses.forEach(function (tweet) {
          var name = tweet.user.screen_name, text = tweet.text;
          console.log("\n" + name.yellow.bold + ': ' + text);
        });
     });
  });


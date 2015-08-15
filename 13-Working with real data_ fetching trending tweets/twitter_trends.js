var https = require('https');
var colors = require('colors'); //for prettifying the console output
var headers = {
  'User-Agent': 'Node Cookbook: Twitter Trends',
  'Authorization': 'Bearer ' + require('./auth.json').access_token
};

var trendingTopics = module.exports = {
  trends: {
    urlOpts: {
      host: 'api.twitter.com',
      path: '/1.1/trends/place.json?id=1', //1 provides global trends,
      headers: headers
    }
  },
  tweets: {
    maxResults: 3, //twitter applies this very loosely for the "mixed" results type
    resultsType: 'recent', //choice of mixed, popular or recent
    urlOpts: {
      host: 'api.twitter.com',
      headers: headers,
    }
  },
  jsonHandler: function (response, cb) {
    var json = '';
    response.setEncoding('utf8');
    if (response.statusCode === 200) {
      response.on('data', function (chunk) {
        json += chunk;
      }).on('end', function () {
        cb(JSON.parse(json));
      });
    } else {
      throw ("Server Returned error: " + response.statusCode);
    }
  },
  tweetPath: function (q) {
    var p = '/1.1/search/tweets.json?q=' + q + '&count=' +  
     this.tweets.maxResults + '&include_entities=true&result_type=' + 
     this.tweets.resultsType;


    this.tweets.urlOpts.path = p;

  }
};



function makeCall(urlOpts, cb) {
  https.get(urlOpts, function (response) { //make a call to the twitter api  
    trendingTopics.jsonHandler(response, cb);
  }).on('error', function (e) {
    console.log("Connection Error: " + e.message);
  });
}

if (module.parent) {return;}

makeCall(trendingTopics.trends.urlOpts, function (trendsArr) {
  trendingTopics.tweetPath(trendsArr[0].trends[0].query)
  makeCall(trendingTopics.tweets.urlOpts, function (tweetsObj) {
    tweetsObj.statuses.forEach(function (tweet) {
      var name = tweet.user.screen_name, text = tweet.text;
      console.log("\n" + name.yellow.bold + ': ' + text);
    });
  });
});




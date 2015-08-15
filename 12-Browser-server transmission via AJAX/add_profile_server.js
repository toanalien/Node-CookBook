var http = require('http');
var fs = require('fs');
var path = require('path');
var profiles = require('./profiles');
var xml2js = require('xml2js');

var index = fs.readFileSync('./add_profile_index.html');
var clientXml2js = fs.readFileSync('./xml2js.js');
var routes, 
  mimes = {
   js: "application/javascript",
   json: "application/json",
   xml: "application/xml"
  };

routes = {
  'profiles': function (format) {
    return output(Object.keys(profiles), format);
  },
  '/profile': function (format, basename) {
    return output(profiles[basename], format, basename);
  },
  'xml2js' : function(ext) {
    if (ext === 'js') { return clientXml2js; }
  }
};

function output(content, format, rootNode) {
  if (!format || format === 'json') {
    return JSON.stringify(content);
  }
  if (format === 'xml') {
    return (new xml2js.Builder({rootName: rootNode})).buildObject(content);
  }
}

function updateProfiles(profile, type, cb) {

  var name = Object.keys(profile).pop();

  profiles[name] = profile[name];

  cb(output(profiles[name], type, name));

}

function addProfile(request, cb) {
  var pD = ''; //post data
  request
    .on('data', function (chunk) { pD += chunk; })
    .on('end',function() {
      var contentType = request.headers['content-type'];

      if (contentType === 'application/json') {
        updateProfiles(JSON.parse(pD), 'json', cb);      
      }
      
      if (contentType === 'application/xml') {
        xml2js.parseString(pD, {
          explicitRoot: false, 
          explicitArray: false
        }, function(err, obj) {
            updateProfiles(obj, 'xml', cb);
          });
      }


  });
}





http.createServer(function (request, response) {
  var dirname = path.dirname(request.url),
    extname = path.extname(request.url),
    basename = path.basename(request.url, extname);
    extname = extname.replace('.',''); //remove period
  if (request.method === 'POST') {
    addProfile(request, function(output) {
      response.end(output);
    });
    return;
  }
  
  response.setHeader("Content-Type", mimes[extname] || 'text/html');
  if (routes.hasOwnProperty(dirname)) {
    response.end(routes[dirname](extname, basename));
    return;
  }

  if (routes.hasOwnProperty(basename)) {
    response.end(routes[basename](extname));
    return;
  }

  response.end(index);

}).listen(8080);

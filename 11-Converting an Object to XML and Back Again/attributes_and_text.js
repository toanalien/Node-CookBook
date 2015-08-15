var profiles = require('./profiles_enhanced');
var xml2js = require('xml2js');

var builder = new xml2js.Builder({rootName:'profiles'});
profiles = builder.buildObject(profiles);

console.log(profiles); // <-- show me the TJ's XML!
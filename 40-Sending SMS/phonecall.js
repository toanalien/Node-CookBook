var twilio = require('twilio');

var settings =  {
  sid : 'Ad054bz5be4se5dd211295c38446da2ffd', 
  token: '3e0345293rhebt45r6erta89xc89v103',
  url: 'http://nodecookbook.com',
  to: '+447xxxxxxxx1',
  phonenumber: '+14155992671' //sandbox number
};


var client = twilio(settings.sid, settings.token);
var response = twilio.TwimlResponse();

//prepare the message
response.say('Meet us in the abandoned factory');
response.say('Come alone', {voice: 'woman'});
// when toString()'ed will generate: 
// <Response>
// <Say>Meet us in the abandoned factory</Say>
// <Say voice="woman">Come alone</Say>
// </Response>

require('http').createServer(function (req, res) { 
  res.writeHead(200, { 'Content-Type':'text/xml' });
  res.end(response+'') 
}).listen(80);

client.makeCall({
  to: settings.to,     
  url: settings.url,
  from: settings.phonenumber
});

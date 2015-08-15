var settings =  {
  sid : 'Ad054bz5be4se5dd211295c38446da2ffd', 
  token: '3e0345293rhebt45r6erta89xc89v103',
  phonenumber: '+14155992671' //sandbox number
};

var client = require('twilio')(settings.sid, settings.token);

var smslist = [
  '+44770xxxxxx1',
  '+44770xxxxxx2',
  '+44770xxxxxx3',  
  '+44770xxxxxx4',  
  '+44770xxxxxx5'  
];


var msg = 'SMS Ahoy!';
smslist.forEach(function (to) {
  client.sendSms({to: to, 
    body: msg,
    from: settings.phonenumber}, function (err, res) {
      if (err) { console.log(err); return; }
      
      (function checkStatus() {
        client.sms.messages(res.sid).get(function (err, res) {          
          if (res.status === 'sent') {  
            console.log('Sent to ' + res.to);
          } else {
          //if it's not a number (like 404, 401), it's not an error
          //so we wait one second and retry
            if (isNaN(res.status)) { 
              setTimeout(checkStatus, 1000, res);
              return;
            }
          //it seems to be a number, let's notify, 
          //but carry on with other numbers
            console.log('API error: ', res.body);
          }

        });
      }());    
  });
});

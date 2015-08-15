var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport('SMTP', {
    host: 'localhost',
    secureConnection: false,
    port: 2525,
    auth: {
      user: "node",
      pass: "cookbook"
    }
  });

var msg = {
  transport: transport,
  text:    "Hello! This is your newsletter, :D",
  from:    "Definitely Not Spammers <spamnot@ok.com>",
  subject: "Your Newsletter"
};


var maillist = [
  'Bob <bob@nodecookbook.com>, Bib <bib@nodecookbook.com>',
  'Miss Susie <susie@nodecookbook.com>',
  'Mr Nobody <nobody@nodecookbook.com>',
];

var i = 0;
maillist.forEach(function (to) {
  msg.to = to;
  nodemailer.sendMail(msg, function (err) {
    i += 1;
    if (err) { 
      console.log('Sending to ' + to + ' failed: ' + err); 
    } else {
      console.log('Sent to ' + to);  
    }
    
    if (i === maillist.length) {
      transport.close();
    }
  });
});


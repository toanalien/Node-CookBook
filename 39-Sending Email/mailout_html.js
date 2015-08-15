var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    auth: {
      user: "ourGmailAddress@googlemail.com",
      pass: "ourPassword"
    }
  });

var msg = {
  transport: transport,
  text:    "Hello! This is your newsletter, :D",
  html: "<b>Hello!</b> <p>This is your newsletter, :D</p>",
  from:    "Definately Not Spammers <spamnot@ok.com>",
  subject: "Your Newsletter"
};


//auto generate text:
/*
var msg = {
  transport: transport,
  html: "<b>Hello!</b> <p>This is your newsletter, :D</p>",
  generateTextFromHtml: true,
  from:    "Definately Not Spammers <spamnot@ok.com>",
  subject: "testing nodemailer"
};
*/






var maillist = [
  'Mr One <mailtest1@mailinator.com>',
  'Mr Two <mailtest2@mailinator.com>',
  'Mr Three <mailtest3@mailinator.com>',
  'Mr Four <mailtest4@mailinator.com>',
  'Mr Five <mailtest5@mailinator.com>'
];

var i;
maillist.forEach(function (to) {
  msg.to = to;
  nodemailer.sendMail(msg, function (err) {
    i += 1;
    if (err) { console.log('Sending to ' + to + ' failed: ' + err); }

    console.log('Sent to ' + to);

    if (i === maillist.length - 1) {
      transport.close();
    }
  });
});

 


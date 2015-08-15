var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport("Sendmail");

// explicitly specifiy sendmailer path:
//var transport = nodemailer.createTransport("Sendmail", "/to/sendmail");

var msg = {
  transport: transport,
  text:    "Hello! This is your newsletter, :D",
  from:    "Definately Not Spammers <spamnot@ok.com>",
  subject: "Your Newsletter"
};


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






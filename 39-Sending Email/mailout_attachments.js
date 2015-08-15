var nodemailer = require('nodemailer');

var msg = {
  transport: nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    auth: {
      user: "ourGmailAddress@googlemail.com",
      pass: "ourPassword"
    }
  }),
  text:    "Answer in the attachment",
  from:    "The Attacher <attached@files.com>",
  subject: "What do you call a deer with no eyes?",
  to: "anyemail@anyaddress.com",
  attachments: [
    {fileName: 'deer.txt', contents:'no eye deer.'},
    {fileName: 'deerWithEyes.jpg', filePath: 'deer.jpg'}
  ]
};

nodemailer.sendMail(msg, function (err) {
  if (err) { console.log('Sending to ' + msg.to + ' failed: ' + err); }
  console.log('Sent to ' + msg.to);
  msg.transport.close();
});



var simplesmtp = require('simplesmtp');
var fs = require('fs');

var users = [{user: 'node', pass: 'cookbook'}],
  mailboxDir = './mailboxes/',
  catchall = fs.createWriteStream(mailboxDir + 'caught', {flags : 'a'});

var smtp = simplesmtp
  .createServer({requireAuthentication: true, debug:true})
  .on('authorizeUser', function (envelope, user, pass, cb) {
    var authed;
    users.forEach(function (userObj) {
      if (userObj.user === user && userObj.pass === pass) {
        authed = true;
      }
    });
    cb(null, authed);
  });
  
smtp.on('startData', function (envelope) {
  var rcpt, saveTo;
  envelope.mailboxes = [];
  envelope.to.forEach(function (to) {
   fs.exists(mailboxDir + to.split('@')[0], function (exists) { 
      rcpt = to.split('@')[0];

      if (exists) {
        envelope.mailboxes.unshift(rcpt);
        saveTo = mailboxDir + rcpt + '/' + envelope.from
          + ' - ' + envelope.date;
        envelope[rcpt] = fs.createWriteStream(saveTo);
        return;
      }
      
      console.log(rcpt + ' has no mailbox, sending to caught file');
      envelope[rcpt] = catchall;      

    });

  });

});

smtp.on('data', function (envelope, chunk) {
  envelope.mailboxes.forEach(function (rcpt) {
    envelope[rcpt].write(chunk);
  });
  
}).on('dataReady', function (envelope, cb) {
  envelope.mailboxes.forEach(function (rcpt) {

      envelope[rcpt].end();

  });

  cb(null, Date.now());
});
  
smtp.listen(2525);

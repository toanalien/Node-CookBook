var mp3dat = require('../index'); 

mp3dat
  .stat('../test/test.mp3')
  .on('bitrate', function (bitrate) {
    console.log('Got bitrate:', bitrate);
  })
  .on('timesig', function (timesig) { 
   console.log('Got timesig:', timesig);
  })
  .on('stats', function (stats) { 
   console.log('Got stats:', stats);
   mp3dat.spawnInstance();
  })
  .on('error', function (err) { 
   console.log('Error:', err);
  })
  .on('spawn', function (mp3dat2) { 
    console.log('Second mp3dat', mp3dat2);
  })


  





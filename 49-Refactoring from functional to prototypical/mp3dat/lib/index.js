var fs = require('fs');

function Mp3dat() {
  if (!(this instanceof Mp3dat)) {
    return new Mp3dat();
  }
  this.stats = {duration:{}};
}


//half-byte (4bit) hex values to interpreted bitrates (bps)
//only MPEG-1 bitrates supported
Mp3dat.prototype._bitrates = { 1 : 32000, 2 : 40000, 3 : 48000, 4 : 56000, 5 : 64000,
    6 : 80000, 7 : 96000, 8 : 112000, 9 : 128000, A : 160000, B : 192000,
    C : 224000, D : 256000, E : 320000 };

    
Mp3dat.prototype._magnitudes = [ 'hours', 'minutes', 'seconds', 'milliseconds'];

Mp3dat.prototype._pad = function (n) { return n < 10 ? '0' + n : n; }  

Mp3dat.prototype._timesig = function () {
  var ts = '', self = this;;
  self._magnitudes.forEach(function (mag, i) {
   if (i < 3) {
    ts += self._pad(self.stats.duration[mag]) + ((i < 2) ? ':' : '');
   }
  });
  return ts;
}

Mp3dat.prototype._findBitRate = function(cb) {
  var self = this;
   fs.createReadStream(self.f)
    .on('data', function (data) {
      var i = 0;
       for (i; i < data.length; i += 2) {
        if (data.readUInt16LE(i) === 64511) {
          self.bitrate = self._bitrates[data.toString('hex', i + 2, i + 3)[0]];
          this.pause();
          cb(null);
          break;
        };
    }
  }).on('end', function () {
    cb(new Error('could not find bitrate, is this definately an MPEG-1 MP3?'));
  });
}



Mp3dat.prototype._timeProcessor = function (time, counter, cb) {
  var self = this, timeArray = [], factor = (counter < 3) ? 60 : 1000,
    magnitudes = self._magnitudes, duration = self.stats.duration;
    
  if (counter instanceof Function) {
    cb = counter;
    counter = 0;
  }

  if (counter) {        
    timeArray = (factor * +('0.' + time)).toString().split('.');
  }
  if (counter < magnitudes.length - 1) {
    duration[magnitudes[counter]] = timeArray[0] || Math.floor(time);
    duration[magnitudes[counter]] = +duration[magnitudes[counter]];
    counter += 1;
    self._timeProcessor.call(self, timeArray[1] || time.toString().split('.')[1], counter, cb);
    return;
  }
    //round off the final magnitude (milliseconds)
    duration[magnitudes[counter]] = Math.round(timeArray.join('.'));
    cb(duration);
}

Mp3dat.prototype._buildStats = function (cb) {
  var self = this,
  hours = (self.size / (self.bitrate / 8) / 3600);

  self._timeProcessor(hours, function (duration) {
    self.stats = {
      duration: duration, 
      bitrate: self.bitrate, 
      filesize: self.size, 
      timestamp: Math.round(hours * 3600000),
      timesig: self._timesig(duration, self.magnitudes)
    };
    cb(null, self.stats);
    
  });
}


Mp3dat.prototype.stat = function (f, cb) {
  var self = this;
  fs.stat(f, function (err, fstats) {
    self.size = fstats.size;
    self.f = f;
    self._findBitRate(function (err, bitrate) {
      if (err) { cb(err); return; }
      self._buildStats(cb);
    });    
  });
}


module.exports = Mp3dat();




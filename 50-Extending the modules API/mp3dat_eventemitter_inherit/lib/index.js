var fs = require('fs'),
  EventEmitter = require('events').EventEmitter,
  util = require('util');


function Mp3dat() {
  if (!(this instanceof Mp3dat)) {
    return new Mp3dat();
  }
  
  EventEmitter.call(this);
  
  this.stats = {duration:{}};
}

util.inherits(Mp3dat, EventEmitter);

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
  self.emit('timesig', ts);
  return ts;
}

Mp3dat.prototype._findBitRate = function(cb) {
  var self = this, 
    stream = self.stream || fs.createReadStream(self.f);
  stream
    .on('data', function (data) {
      var i = 0;
       for (i; i < data.length; i += 2) {
        if (data.readUInt16LE(i) === 64511) {
          self.bitrate = self._bitrates[data.toString('hex', i + 2, i + 3)[0]];
          this.pause();
          self.emit('bitrate', self.bitrate);
          cb(null);
          break;
        };
    }
  }).on('end', function () {
    var err = new Error('could not find bitrate, is this definately an MPEG-1 MP3?');
    self.emit('error', err);
    cb(err);
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
    self.emit('stats', self.stats);
    if (cb) { cb(null, self.stats); }
    
  });
}



Mp3dat.prototype._compile =  function (err, fstatsOpts, cb) {
  var self = this;
  self.size = fstatsOpts.size;
  self.stream = fstatsOpts.stream;
    self._findBitRate(function (err, bitrate) {
    if (err) { cb(err); return; }
    self._buildStats(cb);
  });    
}



Mp3dat.prototype.stat = function (f, cb) {
  var self = this, isOptsObj = ({}).toString.call(f) === '[object Object]';
    
  if (isOptsObj) {
    var opts = f, validOpts = opts.stream && opts.size 
      && 'pause' in opts.stream && !isNaN(+opts.size);
    errTxt = 'First arg must be options object with stream and size'
        
    if (!validOpts) { cb(new Error(errTxt)); return; }
    
    self.f = opts.stream.path;
    self._compile(null, opts, cb);
    return self;
  }
  
  self.f = f;
  fs.stat(f, function (err, fstats) {
    self._compile.call(self, err, fstats, cb);
  });
  return self;
}



Mp3dat.prototype.spawnInstance = function () {
  var m = Mp3dat();
  this.emit('spawn', m);
  return m;
}

module.exports = Mp3dat();

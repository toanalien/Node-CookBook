var assert = require('assert');

var mp3dat = require('../index.js');

var testFile = 'test/test.mp3';

assert(mp3dat, 'mp3dat failed to load');

assert(mp3dat.stat, 'there should be a stat method');
assert(mp3dat.stat instanceof Function, 'stat should be a Function');

mp3dat.stat(testFile, function (err, stats) {
  assert.ifError(err);
  
  //expected properties
  assert(stats.duration, 'should be a truthy duration property');
  assert(stats.bitrate, 'should be a truthy bitrate property');
  assert(stats.filesize, 'should be a truthy filesize property');
  assert(stats.timestamp, 'should be a truthy timestamp property');
  assert(stats.timesig, 'should be a truthy timesig property');
  
  
  //expected types
  assert.equal(typeof stats.duration, 'object', 'duration should be an object type');
  assert(stats.duration instanceof Object, 'durations should be an instance of Object');
  assert(!isNaN(stats.bitrate), 'bitrate should be a number');
  assert(!isNaN(stats.filesize), 'filesize should be a number');
  assert(!isNaN(stats.timestamp), 'timestamp should be a number');
  
  
  assert(stats.timesig.match(/^\d+:\d+:\d+$/), 'timesig should be in HH:MM:SS format');
    
    
  //expected duration properties
  assert.notStrictEqual(stats.duration.hours, undefined,  'should be a duration.hours property');
  assert.notStrictEqual(stats.duration.minutes, undefined, 'should be a duration.minutes property');
  assert.notStrictEqual(stats.duration.seconds, undefined, 'should be a duration.seconds property');
  assert.notStrictEqual(stats.duration.milliseconds, undefined, 'should be a duration.milliseconds property');
  
  //expected duration types
  assert(!isNaN(stats.duration.hours), 'duration.hours should be a number');
  assert(!isNaN(stats.duration.minutes), 'duration.minutes should be a number');
  assert(!isNaN(stats.duration.seconds), 'duration.seconds should be a number');
  assert(!isNaN(stats.duration.milliseconds), 'duration.milliseconds should be a number');
  
  //expected duration properties constraints
  assert(stats.duration.minutes < 60, 'duration.minutes should be no greater than 59');
  assert(stats.duration.seconds < 60, 'duration.seconds should be no greater than 59');
  assert(stats.duration.milliseconds < 1000, 'duration.seconds should be no greater than 999');
  
   console.log('All tests passed');  //if we've gotten this far we are done.
});




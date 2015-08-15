#!/usr/bin/env node

var stream = require('stream');
var util = require('util');
var buffertools = require('buffertools');

var daver, overspill = new Buffer(0), 
  redStart = new Buffer([27, 91, 51, 49, 109]), 
  redStop = new Buffer([27, 91, 51, 57, 109]);

function Daver() {
    stream.Transform.call(this);
}

util.inherits(Daver, stream.Transform);


Daver.prototype._transform = function (chunk, encoding, callback) {  

  chunk = buffertools.concat(overspill, chunk);
  
  overspill = chunk.slice(chunk.length - 4, chunk.length-1);
  

  callback(null, colorMatches(chunk));
  
}

function colorMatches(chunk) {
  var ix = chunk.indexOf('DAVE');
  if (~ix) {
    chunk = buffertools.concat(
      chunk.slice(0 ,ix),
      redStart,
      chunk.slice(ix, ix+4),    
      redStop,
      colorMatches(chunk.slice(ix+5, chunk.length-4))
    );
  }

  return chunk;
}


daver = new Daver();

process.stdin.pipe(daver).pipe(process.stdout);

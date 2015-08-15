#!/usr/bin/env node

var stream = require('stream');
var util = require('util');
var uppercaser;

function Uppercaser() {
    stream.Transform.call(this);    
}

util.inherits(Uppercaser, stream.Transform);

Uppercaser.prototype._transform = function (chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
}

uppercaser = new Uppercaser();

process.stdin.pipe(uppercaser).pipe(process.stdout);

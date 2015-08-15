#!/usr/bin/env node 


var stream = require('stream');

var util = require('util');

var textStream;


function TextStream() {
  
  stream.Readable.call(this);   
 
}


util.inherits(TextStream, stream.Readable);


TextStream.prototype._read = function (size, encoding) {
    var letter = String.fromCharCode(Math.random() * (123 - 97) + 97);
 
   this.push(letter === 'z' ? 'z\n' : letter);

}


textStream = new TextStream();


textStream.pipe(process.stdout);


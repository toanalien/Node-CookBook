#!/usr/bin/env node

var net = require('net'),
    port = 1337;

net.createServer(function (c) {    
    process.stdin.pipe(c);
    c.pipe(process.stdout);
}).listen(port);
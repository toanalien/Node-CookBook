#!/usr/bin/env node


var net = require('net'),
    port = 1337,
    address = '127.0.0.1';


net.connect(port, address, function () {
    process.stdin.pipe(this);
    this.pipe(process.stdout);
});


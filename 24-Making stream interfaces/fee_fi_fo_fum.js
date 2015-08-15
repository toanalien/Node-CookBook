var StreamToArray = require('./stream_to_array.js'),
    StreamFromArray = require('./stream_from_array.js'),
    store = [],
    writable = new StreamToArray(store),
    readable = new StreamFromArray(store);

writable.write('fee');
writable.write('fi');
writable.write('fo');
writable.write('fum');

readable.on('data', function (data) {
    console.log(data+'')
});
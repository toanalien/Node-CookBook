var http = require('http');
var fs = require('fs');

var options = {};
options.file = '50meg';
options.kbps = 32;
options.fileSize  = fs.statSync(options.file).size;

function throttle(download, cb) {
  var chunkOutSize = download.kbps * 1024,
    timer = 0;

  (function loop(bytesSent) {
    var remainingOffset;
    if (!download.aborted) {
      setTimeout(function () {
        var bytesOut = bytesSent + chunkOutSize;

        if (download.bufferOffset > bytesOut) {
          timer = 1000;
          cb(download.chunks.slice(bytesSent, bytesOut));
          loop(bytesOut);
          return;
        }

        if (bytesOut >= download.chunks.length) {
          remainingOffset = download.chunks.length - bytesSent;
          cb(download.chunks.slice(remainingOffset, bytesSent));
          return;
        }

        loop(bytesSent);//continue to loop, wait for enough data
      }, timer);
    }
  }(0));

  return function () { //return a function to handle an abort scenario
    download.aborted = true;
  };

}

http.createServer(function (request, response) {
  var download = Object.create(options);
  download.chunks = new Buffer(download.fileSize);
  download.bufferOffset = 0;
  download.readStreamOptions = {};
  download.headers = {'Content-Length': download.fileSize};
  download.statusCode = 200;

  if (request.headers.range) {
    download.start = request.headers.range.replace('bytes=', '').split('-')[0];
    download.readStreamOptions = {start: +download.start};
    download.headers['Content-Range'] = "bytes " + download.start + "-" +
                                        download.fileSize + "/" +
                                        download.fileSize;
    download.statusCode = 206; //partial content
  }

  response.writeHeader(download.statusCode, download.headers);

  fs.createReadStream(download.file, download.readStreamOptions)
    .on('data', function (chunk) {
      chunk.copy(download.chunks, download.bufferOffset);
      download.bufferOffset += chunk.length;
    })
    .once('open', function () {
      var handleAbort = throttle(download, function (send) {
          response.write(send);
        });

      request.on('close', function () {
        handleAbort();
      });
    });

}).listen(8080);

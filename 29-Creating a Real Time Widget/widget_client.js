;(function () { 
  window.locWidget = {
    style : 'position:absolute;bottom:0;right:0;font-size:3em',
    init : function () {
      var socket = io.connect('http://localhost:8081'),
        style = this.style;
      socket.on('connect', function () {
        var head = document.head,
          body = document.body,
          loc = document.getElementById('_lo_count');
        if (!loc) {
          head.innerHTML += '<style>#_loc {' + style + '}</style>';

          loc = document.createElement('div');
          loc.id = '_loc';
          loc.innerHTML = '<span id=_lo_count></span>';
          body.appendChild(loc);

          
        }

        socket.on('total', function (total) {
          loc.innerHTML = total;
        });
      });
    }

  }
}());


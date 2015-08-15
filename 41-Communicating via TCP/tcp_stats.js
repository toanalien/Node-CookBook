var pcap = require('pcap');
var pcapSession = pcap.createSession("","tcp"); //may need to put wlan0,
                                                //eth0 etc. as 1st arg
var tcpTracker = new pcap.TCP_tracker();

tcpTracker.on('end', function (session) {
    console.log(session);
});

pcapSession.on('packet', function (packet) {
  tcpTracker.track_packet(pcap.decode.packet(packet));

});


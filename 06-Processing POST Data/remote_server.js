var http = require('http'); 
var qs = require('querystring')

var remote = {
	options: {
		color: red,
		text: 'weeee',
	},
	meta: {
		date: '3/3/14'
	}
}


http.createServer(function (req, res) { 
	if (req.method !== 'POST') { return res.end(); }

		console.log(req.read());

	}

});

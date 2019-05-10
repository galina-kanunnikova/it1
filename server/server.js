//node server.js
var http = require('http');
var aufg = { 
	note: [
	  {"v":"A4", "l":["C","A","E","H"]},
	  {"v":"B4", "l":["D","C","B","F"]},
	  {"v":"C4", "l":["C","D","E","H"]},
	  {"v":"D4", "l":["D","C","G","F"]},
	  {"v":"E4", "l":["C","D","E","H"]},
	  {"v":"F4", "l":["D","C","G","F"]},
	  {"b":"A4", "l":["C","A","E","H"]},
	  {"b":"H4", "l":["D","C","H","F"]},
	  {"b":"C4", "l":["C","D","E","H"]},
	  {"b":"D4", "l":["D","C","G","F"]},
	  {"b":"E4", "l":["C","D","E","H"]},
	  {"b":"F4", "l":["D","C","G","F"]},


], 
};

http.createServer(function (req, res) {
 // res.writeHead(200, {'Content-Type': 'text/html'});
 res.setHeader('Content-Type', 'application/json');
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.end(JSON.stringify(aufg));

}).listen(8080);

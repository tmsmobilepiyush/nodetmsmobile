const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
	  express	   = require('express'),
	  bodyParser   = require('body-parser'),
      env          = process.env;
	  
var ServerStatus = 'INIT';	  
initializeServer();

function initializeServer() {
	var app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(express.static(__dirname +'/static'));

	
	
	var server = http.createServer(app);
	server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
	  console.log(`Application worker ${process.pid} started...`);
	});
    server.on('close', function() {
        process.exit(0);
    });
}
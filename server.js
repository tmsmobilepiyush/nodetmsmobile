const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
	  express	   = require('express'),
	  bodyParser   = require('body-parser'),
      env          = process.env;
	  var url            = require('url');
var ServerStatus = 'INIT';	  
initializeServer();

function initializeServer() {
	var app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(express.static(__dirname +'/static'));

	app.get('/tmsmobile', function (req, res) {
        var url_parts = url.parse(req.url, true);
        var search = url_parts.search;
        console.log(url_parts.search);
        res.redirect(308,'tmsmobile://tmsmobile.com/tmsmobile'+search.toString);
        
    });
	
	var server = http.createServer(app);
	server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
	  console.log('Application worker ${process.pid} started...');
	});
    server.on('close', function() {
        process.exit(0);
    });
}
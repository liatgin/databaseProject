import config from './config';
import apiRouter from './api';

// Fast html framework
var express = require('express');
var server = express();

server.set('view engine', 'ejs');


// server.get('/', (req, res) => {
// 	res.render('index', {
// 		content: '...'
// 	});
// });
 
// For receiving JSON in posts
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 
// // For the database
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('/home/liat-ginosar/Downloads/aaa/us-census.db/data');
 
var path = require('path');
server.get('/', function(req, res){
	res.sendFile(path.join(__dirname +'/public/index.html'));
});

server.get('/hi/bi', function(req, res){
	console.log(db)
	//res.sendFile(path.join(__dirname +'/connect.js'));
	var chosen_column = "reason for unemployment"
	//db.all("PRAGMA table_info(census_learn_sql)", function (err, rows){console.log(rows)});
    db.all('SELECT "' + chosen_column + '", COUNT(*), AVG(age) FROM census_learn_sql GROUP BY "' + chosen_column + '" ORDER BY COUNT(*) DESC LIMIT 100', function(err, rows) {
		console.log(rows)
		var html = ""	
		html+= "<html>"
		html+=	"<head>"
		html+=	"<style>"
		html+=	"table, th, td {"
		html+=	    "border: 1px solid black;"
		html+=	    "padding: 5px;"
		html+=	"}"
		html+=	"table {"
		html+=	    "border-spacing: 15px;"
		html+=	"}"
		html+=	"</style>"
		html+=	"</head>"
		html+=	"<body>"
		html+=	"<table style=width:100%>"
		html+=	  "<tr>"
		html+=	    "<th>Values</th>"
		html+=	    "<th>Average Age</th>"
		html+=		"<th>Count</th>"
		html+=	  "</tr>"
		
		rows.forEach((row) => {
			html+=	  "<tr>"
			html+=	    "<td> "+row[String(chosen_column)]+"</td>"
			html+=	    "<td> "+row['AVG(age)']+"</td>"
			html+=	    "<td> "+row['COUNT(*)']+"</td>"
			html+=	  "</tr>"
		});	  
		html+=	"</table>"
		html+=	"</body>"
		html+= "</html>"
	   	res.send(html);
      });
});
// Server static files
server.use('/api', apiRouter);
server.use(express.static('public'));


server.listen(config .port, () => {
	console.info('express listening on port', config.port);
});


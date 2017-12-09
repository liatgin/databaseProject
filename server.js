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
	//console.log(db)
	//res.sendFile(path.join(__dirname +'/connect.js'));
	var chosen_column = "capital gain"
    var sql_final_table = 'SELECT "' + chosen_column + '", COUNT(*), AVG(age) FROM census_learn_sql GROUP BY "' + chosen_column + '" ORDER BY COUNT(*) DESC LIMIT 100'
	var sql_rows_on_db = 'SELECT COUNT(*) FROM census_learn_sql'
	var sql_unique_values_db = 'SELECT COUNT(DISTINCT"' + chosen_column + '") FROM census_learn_sql'
	//var sql_clipped_rows = 'SELECT SUM(COUNT(*)) FROM FINAL_TABLE'
	db.all(sql_final_table, function(err, rows1){
		// console.log(rows1.length);
		db.all(sql_rows_on_db, function(err, rows2){
			//console.log(rows2[0]['COUNT(*)']);
			db.all(sql_unique_values_db, function(err, rows3){
				console.log(rows3[0]['COUNT(DISTINCT"'+chosen_column+'")']);
				var numOfUniqueVals = rows3[0]['COUNT(DISTINCT"'+chosen_column+'")'];
				var hiddenValues = numOfUniqueVals - rows1.length;
				if (hiddenValues < 0)
				{	
					hiddenValues = 0
				}		

				var sumOfRows = 0
				rows1.forEach((row) => {
					sumOfRows += row['COUNT(*)'];
				});	
				var numOfRowsInDb = rows2[0]['COUNT(*)'];
				var clippedRows = numOfRowsInDb - sumOfRows;
				if (clippedRows < 0)
				{
					clippedRows = 0;
				}
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
				html+= "<div> CLIPPED ROWS: " + clippedRows + "</div>"
				html+= "<div> HIDDEN VALUES: " + hiddenValues + "</div>"
				html+=	"<table style=width:100%>"
				html+=	  "<tr>"
				html+=	    "<th>Values</th>"
				html+=	    "<th>Average Age</th>"
				html+=		"<th>Count</th>"
				html+=	  "</tr>"
				
				rows1.forEach((row) => {
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
	});
});


// Server static files
server.use('/api', apiRouter);
server.use(express.static('public'));


server.listen(config .port, () => {
	console.info('express listening on port', config.port);
});

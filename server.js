import config from './config';
import apiRouter from './api';

// Fast html framework
var express = require('express');
var server = express();

server.set('view engine', 'ejs');
 
// For receiving JSON in posts
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 
// // For the database
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('/home/liat-ginosar/Downloads/aaa/us-census.db/data');
 
var path = require('path');
server.get('/style.css', function(req, res){
	res.sendFile(path.join(__dirname +'/style.css'));
});

server.get('/ajaxReq.js', function(req, res){
	res.sendFile(path.join(__dirname +'/ajaxReq.js'));
});

server.get('/', function(req, res){
	//res.sendFile(path.join(__dirname +'/connect.js'));
	var chosen_column = req.query['columnName'];
	//var chosen_column = "capital gain"
    var sql_final_table = 'SELECT "' + chosen_column + '", COUNT(*), ROUND(AVG(age), 2) FROM census_learn_sql GROUP BY "' + chosen_column + '" ORDER BY COUNT(*) DESC LIMIT 100'
	var sql_rows_on_db = 'SELECT COUNT(*) FROM census_learn_sql'
	var sql_unique_values_db = 'SELECT COUNT(DISTINCT"' + chosen_column + '") FROM census_learn_sql'
	//var sql_clipped_rows = 'SELECT SUM(COUNT(*)) FROM FINAL_TABLE'
	db.all(sql_final_table, function(err, rows1){
		// console.log(rows1.length);
		db.all(sql_rows_on_db, function(err, rows2){
			//console.log(rows2[0]['COUNT(*)']);
			db.all(sql_unique_values_db, function(err, rows3){
				// console.log(rows3[0]['COUNT(DISTINCT"'+chosen_column+'")']);
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
				html+= "<head>"
				html+=	"<style>"
				html+=	"table{"
				html+=  	"align: center;"
				html+=	    "border-collapse: collapse;"
				html+=	    "width: 100%;"
				html+=	"}"
				html+=	"th, td {"
				html+=		"padding: 8px;"
				html+=		"text-align: left;"
				html+=		"border-bottom: 1px solid #ddd;"
				html+=	"}"
			    html+= "header {"
			    html+= "padding: 0.0001em;"
			    html+= "color: white;"
			    html+= "background-color: #003366;"
			    html+= "clear: left;"
			    html+= "text-align: left;"
				html+= "}"
				html+= "body {"
			    html+= 		"border: 1px solid grey;"
			    html+= 		"margin-top: 80px;"
			    html+= 		"margin-bottom: 80px;"
			    html+= 		"margin-right: 250px;"
			    html+= 		"margin-left: 250px;"
				html+=	"</style>"
				 html+=	"</head>"
				html+=	"<body>"
				html+= '<div class="container">'
				html+=	"<header>"
				html+= " <h1>U.S. Census</h1>"
				html+=	"</header>"
				html+= "</div>"
				html+= "<form>"
				html+= '<div style="text-align:right">' +'<b>'+clippedRows+'</b>' + " CLIPPED ROWS      " + '<b>'+hiddenValues+'</b>' + "             HIDDEN VALUES" + '</div>'
			 	html+= '<select name="colomns" onchange="updateTable()" id="colVal">'
			 	html+= '<option value="Column">Column</option>'
			 	html+= '<option value="age">age</option>'
				html+= '<option value="class of worker">class of worker</option>'
				html+= '<option value="industry code">industry code</option>'
				html+= '<option value="occupation code">occupation code</option>'
				html+= '<option value="education">education</option>'
				html+= '<option value="wage per hour">wage per hour</option>'
				html+= '<option value="last education">last education</option>'
				html+= '<option value="marital status">marital status</option>'
				html+= '<option value="major industry code">major industry code</option>'
				html+= '<option value="major occupation code">major occupation code</option>'
				html+= '<option value="mace">mace</option>'
				html+= '<option value="hispanice">hispanice</option>'
				html+= '<option value="sex">sex</option>'
				html+= '<option value="member of labor">member of labor</option>'
				html+= '<option value="reason for unemployment">reason for unemployment</option>'
				html+= '<option value="fulltime">fulltime</option>'
				html+= '<option value="capital gain">capital gain</option>'
				html+= '<option value="capital loss">capital loss</option>'
				html+= '<option value="dividends">dividends</option>'
				html+= '<option value="income tax liability">income tax liability</option>'
				html+= '<option value="previous residence region">previous residence region</option>'
				html+= '<option value="previous residence state">previous residence state</option>'
				html+= '<option value="household-with-family">household-with-family</option>'
				html+= '<option value="household-simple">household-simple</option>'
				html+= '<option value="weight">weight</option>'
				html+= '<option value="msa-change">msa-change</option>'
				html+= '<option value="reg-change">reg-change</option>'
				html+= '<option value="within-reg-change">within-reg-change</option>'
				html+= '<option value="lived-here">lived-here</option>'
				html+= '<option value="migration prev res in sunbelt">migration prev res in sunbelt</option>'
				html+= '<option value="num persons worked for employer">num persons worked for employer</option>'
				html+= '<option value="family members under 118">family members under 118</option>'
				html+= '<option value="father birth country">father birth country</option>'
				html+= '<option value="mother birth country">mother birth country</option>'
				html+= '<option value="birth country">birth country</option>'
				html+= '<option value="citizenship">citizenship</option>'
				html+= '<option value="own business or self employed">own business or self employed</option>'
				html+= '<option value="fill questionnaire for veterans admin">fill questionnaire for veterans admin</option>'
				html+= '<option value="veterans benefits">veterans benefits</option>'
				html+= '<option value="weeks worked in year">weeks worked in year</option>'
				html+= '<option value="year">year</option>'
				html+= '<option value="salary range">salary range</option>'
		   		html+= '</select>'
		   		html+= '<br><br>'
				html+=	"<table style=width:100%>"
				html+=	  "<tr>"
				html+=	    "<th>Values</th>"
				html+=	    "<th>Average Age</th>"
				html+=		"<th>Count</th>"
				html+=	  "</tr>"
				
				rows1.forEach((row) => {
					html+=	  "<tr>"
					html+=	    "<td> "+row[String(chosen_column)]+"</td>"
					html+=	    "<td> "+row['ROUND(AVG(age), 2)']+"</td>"
					html+=	    "<td> "+row['COUNT(*)']+"</td>"
					html+=	  "</tr>"
				});	  
				html+=	"</table>"
				html+= '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>'
				html+= "<script src = "+"."+"/"+"ajaxReq.js>"
				html+= "</script>"
				html+=	"</body>"
				html+= "</html>"
			   	res.send(html);
			});
		});
	});
});


server.listen(config .port, () => {
	console.info('express listening on port', config.port);
});

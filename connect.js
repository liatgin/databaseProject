const sqlite3 = require('sqlite3').verbose();
 
// window.onload = function() {
  $(document).ready(function(){
	var sql = ign.sql();
	var driver = sql.driver("sqlite","census_learn_sql.sqlite");
	var qry = sql.query("select age, sex from census_learn_sql LIMIT 5");

	if(driver){
	    //$(".json").html(JSON.stringify(qry));
	    var query = qry;
	    var html = "\
			<h2>JSON Data</h2>\
			<div class="json"></div><hr> \
			<table>\
			<tr>\
			<td>No</td>\
			<td>Nama</td>\
			<td>Alamat</td>\
			</tr>\
			<tr class="data">\
			</tr>\
			</table>\
			</body>\
			</html>";

	    $("p").html("Status Database Connection : "+query.status);
	    if(query.status){

	        $.each(query.content,function(census_learn_sql){
	        html += "<tr>";
	        html += "<td>"+this.age+"</td>";
	        html += "<td>"+this.sex+"</td>";
	        html += "</tr>";
	    });
	    }

	    $("./public/index.html").html(html);
	}
	});
// }



function updateTable() {
  	var url = "/";
	var comboBoxElement = document.getElementById("colVal");
	var columnName = comboBoxElement.options[comboBoxElement.selectedIndex].value.replace(/ /g,"+");
  	var params = 'columnName=' + columnName;
  	var fullUrl = url+"?"+params;

    $.ajax({url: fullUrl, success: function(result){
        document.open();
		document.write(result);
		document.close();
    }});
}
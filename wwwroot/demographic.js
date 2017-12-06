var ajaxForm = new ajaxProxy("/hi/bi")                              
 
document.addEventListener("DOMContentLoaded", function(event) {
    ajaxForm.PopulateTable (jsonToTable, handleError);
});      
 
function handleError (data) {
    $("#ajax-error-box").modal('show');
    $("#ajax-error").text("Errorcode:" + data.status + ", Message:" + data.statusText);
    console.log(data);
}
 
function jsonToTable (data) {
 
    // Clear table
    $('#employeeTable tr').slice(1).remove();
 
    //if no tbody just select your table
    var tbody = $('#censusNew').children('tbody');
    var table = tbody.length ? tbody : $('#censusNew');
 
    var tableString = "";
 
    for(var i in data) {
        var employee = data[i];
        console.log("ajax1");
        tableString += "" + census_learn_sql.age
                    + "" + census_learn_sql.sex
                    + "";
    }
    table.append(tableString);
}    
 
// Form event handlers
$('#refresh').click(function(){
    $("#ajax-error-box").hide();
    ajaxForm.PopulateTable (jsonToTable, handleError);
});
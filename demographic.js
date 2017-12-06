var ajaxForm = new ajaxProxy("/api/employees")                              

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
    $('#census_learn_sql tr').slice(1).remove();

    //if no tbody just select your table 
    var tbody = $('#census_learn_sql').children('tbody');                            
    var table = tbody.length ? tbody : $('#census_learn_sql');

    var tableString = "";

    for(var i in data) {
        var employee = data[i];
        
        tableString += "<tr><td>" + census_learn_sql.sex 
                    + "</td><td>" + census_learn_sql.age  
                    + "</td></tr>";                            
    }

    table.append(tableString);
}    


// Form event handlers
$('#refresh').click(function(){
    $("#ajax-error-box").hide();
    ajaxForm.PopulateTable (jsonToTable, handleError);                          
});  

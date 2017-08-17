//$(document).ready(function() {
//      $('#example').dataTable(); 
//    } );
$(document).ready(function() {
    var table = $('#example').DataTable( {
        "ajax": {"url": "/api/nodes",
        "dataType": "json"}
,
        "columnDefs": [ {
         "targets": -1,
         "data": null,
         "defaultContent":"<div class=\"btn-group\">" +
                          "<button class=\"btn btn-primary btn-sm, dropdown-toggle\" aria-expanded=\"false\" type=\"button\" data-toggle=\"dropdown\">Action <span class=\"caret\"></span></button>" + 
                          "<ul class=\"dropdown-menu\" role=\"menu\">" +
                          "<li><a href=\"#\">Toggle</a></li>" +
                          "<li><a href=\"#\" data-toggle=\"modal\" data-target=\"#myModal\">Update</a>" +
                          "</li><li><a href=\"#\">Delete</a></li></ul>" +                          
                          "</div>"
       } ],
"columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "type" },
            { "data": "status" },
            { "data": "action" }
        ]
    } );
   $('#example tbody').on( 'click', 'li', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var action = $(this).children('a').html();
        actionButtons(data.id, data.status, action);
        table.ajax.reload( null, false );
});
} );


function  actionButtons(id, status, action){
  if (action === 'Toggle'){
    var setTo = 1;
    if (status === 1 ){
      setTo = 0;
    }
    updateStatus("/api/nodes/" + id + "/status",setTo);

  }else if (action === 'Update'){
    updateNode("/api/nodes/" + id);

  }else if (action === 'Delete'){
    getConfirm(id,'delete')
  }
}

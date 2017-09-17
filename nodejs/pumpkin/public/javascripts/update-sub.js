function alertPopupMessage(type, message){
       $('#msgs').append("<div class=\"alert alert-" + type + " alert-dismissible\"  id=\"myAlert\" role=\"alert\">"+
	     "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\><span aria-hidden=\"true\" onClick='location.reload()'>&times;</span></button>" +
	     message + "</div>");
      }
	 
 function updateStatus(dest,status){
	 $(document).ready(function  () {
          $.ajax({
             url: dest + "/" + status,
             type: 'PUT',
             dataType: 'json',
             success: function(response) {
               if  (response[0].status === 1) {
                   state = "Active"
               } else { 
                 state = "Idle" 
               }
                alertPopupMessage("success", "Updated state of " + response[0].name + " to " + state )
             },
			 error: function(error) {
                alertPopupMessage("alert", error)
             }
          });
		 
	 	})
	 };

	 
function updateNode(dest){
	 $(document).ready(function  () {
		    $('#modal-body').html("Loading...");
	 		$.ajax({
             url: dest + "?format=html",
             type: 'GET',
             success: function(response) {
                $('#modal-content').html(response);
             },
			 error: function(error) {
                $('#modal-body').html(error);
             }
          });
	 	})
	 };
	 
function updateStep(dest){
	 $(document).ready(function  () {
		    $('#modal-body').html("Loading...");
	 		$.ajax({
             url: dest,
             type: 'GET',
             success: function(response) {
                $('#modal-content').html(response);
             },
			 error: function(error) {
                $('#modal-body').html(error);
             }
          });
	 	})
	 };	 

function submitNode(form, dest){
	 $(document).ready(function  () {
	 		$.ajax({
             url: dest + "?" + $('#' + form).serialize(),
             type: 'PUT',
			 dataType: 'json',
             success: function(response) {
                alertPopupMessage("success", "Updated Node " + response[0].nodeid + " to with the following Name: " + response[0].name )
                $('#myModal').modal('hide');             
                },
			 error: function(error) {
                alertPopupMessage("alert", error)
             }
             
          });
	 })
	};
function deleteNode(dest){
	 $(document).ready(function  () {
	 		$.ajax({
             url: dest,
             type: 'delete',
			 dataType: 'json',
             success: function(response) {
                 location.reload();             
                },
			 error: function(error) {
                alertPopupMessage("alert", error)
             }
             
          });
	 })
	};

function playScript(script){
	 $(document).ready(function  () {
	 		$.ajax({
             url: "/mqtt/scripts/" + script,
             type: 'get',
			 dataType: 'json',
             success: function(response) {
                              
                },
			 error: function(error) {
                
             }
             
          });
	 })
	};  
  
	function getConfirm(node,action){
	 $(document).ready(function  () {
	 		$.ajax({
             url: "/confirm/" + node + "?action=" + action,
             type: 'GET',
             success: function(response) {
                $('#msgs').append(response);
             },
			 error: function(error) {
                $('#msgs').append(error);
             }
          });
	 	})
	 };





    function getTree(id){
    	return top.nodeMenu(id);
    }
    
    function leftMenu(id){
    	$(".no-print").remove();
    	var dataTree = getTree(id);
    	
    	$('#tree').treeview({
        	data: JSON.parse(dataTree),
        	levels: 1,
        	enableLinks:false,
        	onNodeSelected: function(event, data) {
        	   if(data.href){
        		   top.frames['main'].document.location = $("#contextPath").val()+data.href;
        	   }
        	}
        }); 
    }
    
    
    
    $(document).ready(function(){
    	leftMenu(top.topId);
    });
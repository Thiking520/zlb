var allMenu={};
var topId=0;
var urlMenu=[];
function initData(){
	var params = {};
	$.callAjax({
		type:"post",
		url : "/login/allMenu",
		data : params,
		async: false,
		success : function(data){
			if(data.code == "0000"){
				allMenu=data.data;
				for(var i=0; i<allMenu.length; i++)  
				  {  
					 if(allMenu[i].parentId == 0){
						 topId=allMenu[i].id;
						 break;
					 }
				  } 
				for(var i=0; i<allMenu.length; i++){  
					if(allMenu[i].menuType==3){
						urlMenu.push(allMenu[i].menuUrl);
					}
				}
			}else{
	    		$.toastrWarning(data.msg);
	    	}
			
		}
	});
}

function next(id){
window.frames["leftFrame"].leftMenu(id);
}

function nodeMenu(id){
	var leftMenu = new Array();
	leftMenu.push('[');
	for(var i=0;i<allMenu.length;i++){
		if(allMenu[i].parentId == id){
			if(allMenu[i].menuType==1){
				leftMenu.push('{');
				leftMenu.push('"text":"'+allMenu[i].menuName+'",');
				leftMenu.push('"nodes":[');
				for(var j=0;j<allMenu.length;j++){
					if(allMenu[j].parentId==allMenu[i].id){
						if(allMenu[j].menuType==1){
							leftMenu.push('{');
							leftMenu.push('"text":"'+allMenu[j].menuName+'",');
							leftMenu.push('"nodes":[');
							for(var z=0;z<allMenu.length;z++){
								if(allMenu[z].parentId==allMenu[j].id){
									if(allMenu[z].menuType==2){
										leftMenu.push('{');
							            leftMenu.push('"text":"'+allMenu[z].menuName+'",');
							            leftMenu.push('"href":"'+allMenu[z].menuUrl+'"');
							            leftMenu.push('},');
									}
								}
							}
							leftMenu.push(']');
							leftMenu.push('},');
							
						}
					}
				}
				
				for(var jj=0;jj<allMenu.length;jj++){
					if(allMenu[jj].parentId==allMenu[i].id){
						if(allMenu[jj].menuType==2){
							leftMenu.push('{');
				            leftMenu.push('"text":"'+allMenu[jj].menuName+'",');
				            leftMenu.push('"href":"'+allMenu[jj].menuUrl+'"');
				            leftMenu.push('},');
						}
					}
				}
				leftMenu.push(']');
				leftMenu.push('},');
		    }
	    }
	}
	leftMenu.push(']');
	var str=leftMenu.join("");
	str=str.replace(/},]/g, "}]");

	return str;
}


initData();
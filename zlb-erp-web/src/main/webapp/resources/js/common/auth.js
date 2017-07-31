var auth={
	managerAuth:function(json){
		var urlMenu=top.myMain.urlMenu
		for(var key in json){
			if($.inArray(json[key], urlMenu) < 0){
				$('#'+key).attr("disabled","disabled");
				$('#'+key).css("display","none");
			}
		}
	},
	isAuth:function(url){
		var urlMenu=top.myMain.urlMenu
		if($.inArray(url, urlMenu) >= 0){
			return true;
		}
		return false;
	}
	
}



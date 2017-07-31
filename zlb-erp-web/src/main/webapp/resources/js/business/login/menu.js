var menu = {
    /**获取菜单列表数据**/
    getMenus: function () {
		$.callAjax({
			url : '/login/getMenu',
			success : function(result){
         		if(result.code != "0000"){
         			$.toastrWarning(result.msg);
         			return;
         		}
         		menu.fillMenuList(result.data.menuData);
			}
		});
    },
    /**填充菜单**/
    fillMenuList: function (menuList) {
    	$('#tree').treeview({
        	data: menu.createTree(menuList),
        	levels: 3,
        	enableLinks:false,
        	onNodeSelected: function(event, data) {
        	   if(data.href){
        		   top.frames['main'].document.location = $("#contextPath").val() + data.href;
        	   }
        	}
        }); 
    },
    //构建tree json对象
    createTree: function (menuList) {
    	$(".no-print").remove();
    	var data = []; 
    	$.each(menuList, function(i, menuObj){
    		data[i] = menuObj;
    	});
        return data;
    }
}
$(document).ready(function(){
	menu.getMenus();
});
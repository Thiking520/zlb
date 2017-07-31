// 存放每个功能模块业务逻辑JS
// javascript 模块化
var roleManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
        getAllRolesUrl:function() {
        	return '/publicData/role/getAllRoles';
        },
    	getRoleInfoUrl:function() {
        	return '/publicData/role/getRoleInfo';
        },
        getAuthByRoleUrl:function() {
        	return '/publicData/role/getAuthByRole';
        },
        modifyAuthUrl:function() {
        	return '/publicData/role/modifyAuth';
        }
    },
    
    /**
     * 获取所有角色
     */
    getAllRoles:function () {
    	$.callAjax({
			url : roleManager.URL.getAllRolesUrl(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
				data = data.data;
        		//遍历角色信息
         		var arr = new Array();
         		for(var item in data) {
         			arr.push("<option ");
         			arr.push("value='");
         			arr.push(data[item].id);
         			arr.push("'");
         			arr.push(">");
         			arr.push(data[item].roleName);
         			arr.push("</option>")
         			arr.push("\r\n");
         		}
         		var str = arr.join("");
         		$("#roleName").html(str);
         		//调用查找角色信息接口
         		roleManager.getRoleInfo(data[0].id);
         		//调用查找角色对应功能接口
         		roleManager.getAuthByRole(data[0].id);
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 获取角色对应的权限
     */
    getAuthByRole:function (roleId) {
    	var params = {"roleId":roleId};
    	$.callAjax({
			type:"post",
			data : params,
			url : roleManager.URL.getAuthByRoleUrl(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
        		//权限树处理===========？？？？？
         		var arrRoles = new Array();
         		//遍历数据赋值
         		$.each(data.data, function(index, value) {
                    //index++;
					var menuid= value.id;
		 			var parenid= value.parentId;
		 			var menuname = value.menuName;
		 			var check = value.isOwn;
		 			var open = parenid==0?true:false;//为0是 1级菜单 展开
		 			var checked = check;//为 0 1,复选框未选择，选中
                    arrRoles.push({id:menuid,pId:parenid,name:menuname,checked:checked,open:open});
                });
         		var setting = {
         				check: {
         					enable: true
         				},
         				data: {
         					simpleData: {
         						enable: true
         					}
         				}
         			};
                $.fn.zTree.init($("#treeDemo"), setting, arrRoles);
         		//刷新表格
                //$('#roleTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 修改角色权限
     */
    modifyAuth:function() {
    	var ids = GetCheckedAll();//菜单id数组,以","隔开的字符串
    	if($.trim(ids).length == 0) {
    		return $.toastrWarning('请勾选权限！');
    	}
    	var idsStr = JSON.stringify(ids);//将Object对象转换成String,[a,b,c,d...]形式
    	//去掉两端的中括号
    	var idss = idsStr.substr(1,idsStr.length-2);
    	var roleId =$("#roleName option:selected").val();
    	var params = {"ids":idss,"roleId":roleId};
    	$.callAjax({
			type:"post",
			url : roleManager.URL.modifyAuthUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		//刷新表单
         		//$('#roleTable').bootstrapTable('refresh');
         		$.toastrSuccess('修改角色权限成功！');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 获取角色信息
     */
    getRoleInfo:function(roleId) {
    	var params = {"id":roleId};
    	$.callAjax({
			type:"post",
			url : roleManager.URL.getRoleInfoUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		var status = 0;
         		if(data.data.enabled == true) {
     				status = 1;
     			}
         		//打开修改面板，将信息写入面板中
         		$("#modifyId").val(data.data.id);
         		$("#operatorId").val(data.data.operatorName) ;
        		$("#enabled").val(status);
        		$("#roleDescription").val(data.data.roleDescription);
        		$("#uniquekey").val(data.data.uniquekey);
        		//判断是否禁止修改权限
         		if(data.data.isdisableedit == 1 && data.data.type != 0) {
         			$("#btn_auth_dv").css("cursor","not-allowed");
         			$("#btn_auth_submit").addClass("disabled");
         			$("#btn_auth_dv").attr("alt","系统新增管理员，不可修改");
         			$("#btn_auth_dv").attr("title","系统新增管理员，不可修改")
         		} else {
         			$("#btn_auth_submit").removeClass("disabled");
         			$("#btn_auth_dv").css("cursor","pointer");
         			$("#btn_auth_dv").removeAttr("alt","系统新增管理员，不可修改");
         			$("#btn_auth_dv").removeAttr("title","系统新增管理员，不可修改");
         		}
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    bindEvent: function () {
    	//下拉获取角色信息
    	$("#roleName").on("change",function() {
    		var id = $("#roleName").val();
    		roleManager.getRoleInfo(id);
    		roleManager.getAuthByRole(id);
    	});
    	//点击提交按钮修改角色权限
    	$("#btn_auth_submit").on("click",function() {
    		roleManager.modifyAuth();
    	});
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
		roleManager.getAllRoles();
    }
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
};

$(document).ready(function(){
	//1、初始化加载列表数据
	roleManager.init();
	//2、初始化绑定增删改查事件
	roleManager.bindEvent();
	
});

//获取所有选中节点的值
function GetCheckedAll() {
	var arrID = new Array();
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var msg = "name--id--pid\n";
    for (var i = 0; i < nodes.length; i++) {
        arrID.push(nodes[i].id);
    }
    return arrID;
}







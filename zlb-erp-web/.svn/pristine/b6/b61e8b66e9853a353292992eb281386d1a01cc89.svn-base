// 存放每个功能模块业务逻辑JS
// javascript 模块化
var roleManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/role/findAllRoles';
        },//删除角色的请求地址
        deleteUrl: function () {
            return '/publicData/role/deleteRole';
        },//修改角色状态的请求地址
        modifyStatusUrl: function () {
            return '/publicData/role/modifyStatus';
        },//添加角色
        addRole: function () {
        	return '/publicData/role/addRole';
        },//获取角色信息
        getRoleInfoUrl:function() {
        	return '/publicData/role/getRoleInfo';
        },//修改角色信息
        modifyRoleInfoUrl:function() {
        	return '/publicData/role/modifyRoleInfo';
        },//获取所有运营商列表
        getAllOperatorUrl:function() {
        	return '/operator/qryOperator';
        },//获取当前可操控运营商列表
        getOwnOperatorUrl:function(){
        	return '/login/qryManagerOperator';
        },//获取当前运营商id和角色所属运营商id
        getOperatorIds:function() {
        	return '/publicData/user/operatorIds';
        },//分页获取列表请求地址
    	searchCurrentPageUrl: function () {
            return '/publicData/role/findAllRolesCurrent';
        },//获取所有角色
        getAllRolesUrl:function() {
        	return '/publicData/role/getAllRoles';
        },//获取角色菜单
        getAuthByRoleUrl:function() {
        	return '/publicData/role/getAuthByRole';
        },//修改用户权限
        modifyAuthUrl:function() {
        	return '/publicData/role/modifyAuth';
        },//获取所有菜单
        getAllMenu:function() {
        	return '/publicData/role/getAllMenu';
        }
    },
  
    
    /**分页获取角色列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#roleTable",//需要分页的table ID
    		url: roleManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			roleManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			//checkbox: true
    			radio:true
    		}, {
    			field: 'uniquekey',
    			title: '编码',
    			align: 'center'
    		}, {
    			field: 'roleName',
    			title: '角色名称',
    			align: 'center'
    		}, {
    			field: 'enabled',
    			title: '状态',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(row.enabled == true) {
    		    		return "生效";
    		    	} else {
    		    		return "失效";
    		    	}
    		    },
	        	events: 'operateEvents'
    		}, {
    			field: 'roleDescription',
    			title: '描述',
    			align: 'center',
    		},/* {
    			field: 'creatorStr',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'createTimeStr',
    			title: '创建时间',
    			align: 'center'
    		}, {
    			field: 'modifierStr',
    			title: '修改人',
    		    align: 'center'
    		}, {
    			field: 'updateTimeStr',
    			title: '修改时间',
    			align: 'center'
    		},*/{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html = '<a class="btn btn-primary btn-sm getRoleInfo_a" id= "btn_show_modify" href="javascript:void(0)" >编辑</a><a class="btn btn-danger btn-sm deleteRole_a" href="javascript:void(0)" >删除</a>';
    	        	/*if(row.enabled==0){
    	        		html+='<a class="btn btn-success btn-sm status_a" href="javascript:void(0)" >生效</a>';
    	        	}else{
    	        		html+='<a class="btn btn-warning btn-sm status_a" href="javascript:void(0)" >失效</a>';
    	        	}*/
    	            return html;
    	        },
    	        events: 'operateEvents',
    	        align: 'center'
    	    }  
    		]
    	});
    },
    /**分页获取角色列表当前**/
    searchCurrentByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#roleTable",//需要分页的table ID
    		url: roleManager.URL.searchCurrentPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			roleManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			//checkbox: true
    			checkbox:true
    		}, {
    			field: 'uniquekey',
    			title: '编码',
    			align: 'center'
    		}, {
    			field: 'roleName',
    			title: '角色名称',
    			align: 'center'
    		}, {
    			field: 'enabled',
    			title: '状态',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(row.enabled == true) {
    		    		return "生效";
    		    	} else {
    		    		return "<span style='color:red'>失效</span>";
    		    	}
    		    },
	        	events: 'operateEvents'
    		}, {
    			field: 'roleDescription',
    			title: '描述',
    			align: 'center',
    			formatter: function (value, row, index) {
					if(value !=null && value.length >10){
						return '<a style="color:#555;text-decoration:none;" title="'+value+'" href="javascript:void(0)" >'+value.substr(0,10)+'...</a>';
					} else {
						return value;
					}
				}
    		},/* {
    			field: 'creatorStr',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'createTimeStr',
    			title: '创建时间',
    			align: 'center'
    		}, {
    			field: 'modifierStr',
    			title: '修改人',
    		    align: 'center'
    		}, {
    			field: 'updateTimeStr',
    			title: '修改时间',
    			align: 'center'
    		},*/{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	
    	        	var edit = '<a class="btn btn-primary btn-sm getRoleInfo_a" id= "btn_show_modify" href="javascript:void(0)" >编辑</a>';
    	        	var del = '<a class="btn btn-danger btn-sm deleteRole_a" href="javascript:void(0)" id="btn_del" >删除</a>';
    	        	if(row.isdisableedit==1 && row.type != 0){
    	        		//不可编辑
    	        		edit = '<label style="cursor:not-allowed"><a class="btn btn-primary btn-sm getRoleInfo_a disabled"  id= "btn_show_modify" href="javascript:void(0)" >编辑</a></label>';
    	        	}
    	        	if(row.isdisabledel==1){
    	        		//不可删除
    	        		del = '<label style="cursor:not-allowed"><a style="cursor:not-allowed" class="btn btn-danger btn-sm deleteRole_a disabled" href="javascript:void(0)" id="btn_del" >删除</a></label>';
    	        	}
    	            return html=edit + del;
    	        },
    	        events: 'operateEvents',
    	        align: 'center'
    	    }  
    		]
    	});
    },
    /**
     * 获取用户当前所在运营商和所属运营商Id
     */
    getOperatorIds:function (){
    	var res = null;
    	$.callAjax({
			type:"post",
			url : roleManager.URL.getOperatorIds(),
            async: false,
			data : {},
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		//获取数据
         		var currOID = data.data.operatorId;//当前运营商ID
         		var userType = data.data.userType;//用户类型，0：运维（超管），1：运营商
         		res = currOID + "," + userType;
			},
			error : function(){
				$.toastrError();
				return;
			}
		});
    	return res;
    },
    /**删：删除角色**/
    deleteRole: function (roleId) {
    	$.dialogConfirm({
            message: '您确定要删除角色ID为['+roleId+']的角色吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":roleId};
        			$.callAjax({
        				type:"post",
        				url : roleManager.URL.deleteUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#roleTable').bootstrapTable('refresh');
    		         		$.toastrSuccess('删除角色成功！');
        				},
        				error : function(){
        					$.toastrError();
        				}
        			});
                }
            }
        });
    	
    },
    /**
     * 修改角色状态
     */
    modifyStatus:function(roleId,enabled) {
    	var params = {"ids":roleId,"enabled":enabled};
		$.callAjax({
			type:"post",
			url : roleManager.URL.modifyStatusUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#roleTable').bootstrapTable('refresh');
         		if(data.msg.length > 10) {
         			$.toastrSuccess(data.msg);
         			return;
         		} else {
         			$.toastrSuccess();
         		}
         		
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
         		$("#operatorId_m").val(data.data.operatorId) ;
        		$("#enabled_m").val(status);
        		$("#roleName_m").val(data.data.roleName);
        		$("#roleDescription_m").val(data.data.roleDescription);
        		$("#uniquekey_m").val(data.data.uniquekey);
        		var ridaolen=document.getElementsByName("isSuperAdmin_m").length;
        		for(var i=0;i<ridaolen;i++){
                    if(status==document.getElementById("modifyAnchorForm").isSuperAdmin_m[i].value){
                    	document.getElementById("modifyAnchorForm").isSuperAdmin_m[i].checked=true
                    }
                }
        		$("input[name='isSuperAdmin_m'][value="+status+"]").attr("checked",true);
        		
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
        		
        		
        		
        		
        		$.showModal('#modifyModal');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 获取当前可操控的运营商列表
     */
    getOwnOperator:function (selecteID) {
    	var params ={"viewSearchVo":{"pageSize":"999999","offset":"0"}};
		$.callAjax({
			type:"post",
			url : roleManager.URL.getOwnOperatorUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		//alert(data[0].companyName);
         		var arr = new Array();
				data = data.data;
         		for(var item in data) {
         			arr.push("<option ");
         			arr.push("value='");
         			arr.push(data[item].operatorIdToken);
         			arr.push("'");
         			arr.push(">");
         			arr.push(data[item].companyName);
         			arr.push("</option>")
         			arr.push("\r\n");
         		}
         		var str = arr.join("");
         		$("#" + selecteID).html(str);
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**查：所有运营商**/
    getAllOperator: function (selecteID) {
    	var params ={"viewSearchVo":{"pageSize":"999999","offset":"0"},"enabled":1};
		$.callAjax({
			type:"post",
			url : roleManager.URL.getAllOperatorUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		//alert(data.data.rows[0].companyName);
         		var arr = new Array();
         		for(var item in data.data.rows) {
         			arr.push("<option ");
         			arr.push("value='");
         			arr.push(data.data.rows[item].companyKey);
         			arr.push("'");
         			arr.push(">");
         			arr.push(data.data.rows[item].companyName);
         			arr.push("</option>")
         			arr.push("\r\n");
         		}
         		var str = arr.join("");
         		$("#" + selecteID).html(str);
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 新增面板表单校验
     */
    validateform:function(){
    	//表单验证start
    	$('#addAnchorForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	        	      valid: 'glyphicon glyphicon-ok',
	        	      invalid: 'glyphicon glyphicon-remove',
	        	      validating: 'glyphicon glyphicon-refresh'
            },
	        fields: {
	        	roleDescription: {
	                validators: {
	                    stringLength: {
                            min: 0,
                            max: 50,
                            message: '描述请控制在50个字以内'
                        },
	                }
	            },
	        	roleName: {
	                validators: {
	                    notEmpty: {
	                        message: '角色名称不能为空！'
	                    },
	                    stringLength: {
                            min: 2,
                            max: 20,
                            message: '角色名称长度必须在2到20位之间'
                        },
	                }
	            },
	            enabled: {
	                validators: {
	                    notEmpty: {message: '状态不能为空！'},
	                }
	            },
	            operatorId: {
	                validators: {
	                    notEmpty: {message: '运营商不能为空！'},
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    
    /**
     * 编辑面板表单校验
     */
    evalidateform:function(){
    	//表单验证start
    	$('#modifyAnchorForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	        	      valid: 'glyphicon glyphicon-ok',
	        	      invalid: 'glyphicon glyphicon-remove',
	        	      validating: 'glyphicon glyphicon-refresh'
            },
	        fields: {
	        	roleDescription_m: {
	                validators: {
	                    stringLength: {
                            min: 0,
                            max: 50,
                            message: '描述请控制在50个字以内'
                        },
	                }
	            },
	            roleName_m: {
	                validators: {
	                    notEmpty: {
	                        message: '角色名称不能为空！'
	                    },
	                    stringLength: {
                            min: 2,
                            max: 20,
                            message: '角色名称长度必须在2到20位之间'
                        },
	                }
	            },
	            enabled_m: {
	                validators: {
	                    notEmpty: {message: '状态不能为空！'},
	                }
	            },
	            operatorId: {
	                validators: {
	                    notEmpty: {message: '运营商不能为空！'},
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    	
    },
    
  //auth===================start==========================
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
                $.fn.zTree.init($("#treeDemoEdit"), setting, arrRoles);
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
    modifyAuth:function(roleId,treeId) {
    	var status = 1;
    	var ids = GetCheckedAll(treeId);//菜单id数组,以","隔开的字符串
    	if($.trim(ids).length == 0) {
    		status = 2;
    		if(treeId == 'treeDemo') {
    			$.toastrWarning('请勾选权限！')
    		} else {
    			$.toastrWarning('角色必须要有一项权限')
    		}
    		return status;
    	}
    	var idsStr = JSON.stringify(ids);//将Object对象转换成String,[a,b,c,d...]形式
    	//去掉两端的中括号
    	var idss = idsStr.substr(1,idsStr.length-2);
    	//var roleId =$("#roleName option:selected").val();
    	var params = {"ids":idss,"roleId":roleId};
    	$.callAjax({
			type:"post",
			url : roleManager.URL.modifyAuthUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			status = 1;
         			return;
         		}
         		status = 0;
         		//刷新表单
         		//$('#roleTable').bootstrapTable('refresh');
         		if(treeId == 'treeDemo') {
         			$.toastrSuccess('添加角色成功！');
         		}
			},
			error : function(){
				status = 1;
				if(treeId == 'treeDemo') {
					$.toastrError('角色添加成功，但权限勾选失败，请进入角色编辑重新勾选权限');
				} else {
					$.toastrError();
				}
				
			}
		});
    	return status;
    },
    /**
     * 获取所有菜单
     */
    getAllMenu:function() {
    	$.callAjax({
			type:"post",
			url : roleManager.URL.getAllMenu(),
			data : {},
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
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
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**
     * 获取角色信息
     *//*
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
    },*/
    
    bindEvent: function () {
    	//清空事件
    	$("#btn_clean").on("click",function () {
    		$.clearForm("searchForm");
    	});
    	
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		roleManager.isResetOffset = 1;
    		$('#roleTable').bootstrapTable('refresh');
    	});
    	
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		 resets();
    		 $("#operatorId").attr("disabled",true);
    		 roleManager.validateform();
		     $("#myModalLabel").text("新增角色");
		     //获取当前运营商和userType
    		 var str = roleManager.getOperatorIds();
    		 //当前运营商Id
    		 var operatorId = str.split(',')[0];
    		 //用户类型
    		 var userType = str.split(',')[1];
    		 //查找所有运营商
    		 roleManager.getAllOperator("operatorId");
    		 //默认为当前运营商
			 $("#operatorId").val(operatorId);
    		 if(userType != 0) {
    			 //获取当前运营商列表，并且不能选择其它
    			 $("#operatorId").attr("disabled",true);
    		 }
		     //调用菜单树
		     roleManager.getAllMenu();
    		 
		     $.showModal('#myModal');
	    });
    	
    	//绑定展示修改界面事件
    	$("#btn_show_modify").click(function () {
		     $("#modifyModalLabel").text("更新角色信息");
		     $.showModal('#modifyModal');
	    });
    	
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 roleManager.isResetOffset = 0;
    			 $('#roleTable').bootstrapTable('refresh');
    		}
	    });
    	
    	/**
    	 * 添加角色
    	 */
    	//通过提交按钮，获取表单数据
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid()) {
    			
    			//判断是否有勾选权限
    			var ids = GetCheckedAll('treeDemo');//菜单id数组,以","隔开的字符串
    	    	if($.trim(ids).length == 0) {
    	    		return $.toastrWarning('请勾选权限！');
    	    	}
    			var status = $('#enabled').val();
        		if(status == 1) {
        			status=true;
    			} else {
    				status=false;
    			}
        		var params = {
        			'uniquekey':$.ToCDB($('#uniquekey').val()),
        			'enabled':$.ToCDB(status),
        			'operatorId':$.ToCDB($('#operatorId').val()),
        			'roleName':$.ToCDB($('#roleName').val()),
        			'roleDescription':$.ToCDB($('#roleDescription').val()),
        			'issuperadmin':$("input[name='isSuperAdmin']:checked").val()
        		}
    	    	//通过Ajax去访问后台
    	    	$.callAjax({
    	    		type:"post",
    				url : roleManager.URL.addRole(),
    				data : params,
    				success : function(data) {
    					if(data.code == "0000") {
    						//$("#addAnchorForm : input").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").remove("selected");//核心
    						$.hideModal('#myModal');
    						$('#roleTable').bootstrapTable('refresh');
    						roleManager.modifyAuth(data.data.id,'treeDemo');
    		         		//$.toastrSuccess('添加角色成功！');
    		         		resets();
    					} else {
    						$.toastrWarning(data.msg);
    						return;
    					}
    				},
    				error : function(){
    					$.toastrError("系统异常！");
        			}
    	    	});
    		} else {
    			return;
    		}
    	});
    
    	$("#btn_modify_submit").click(function(){
    		var res;
    		var bootstrapValidator = $("#modifyAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid()) {
    			var status = $('#enabled_m').val();
    			if(status == 1) {
    				status=true;
    			} else {
    				status=false;
    			}
    			var params = {
    				'id':$.ToCDB($("#modifyId").val()),
    				'enabled':status,
    				'operatorId':$.ToCDB($('#operatorId_m').val()),
    				'roleName':$.ToCDB($('#roleName_m').val()),
    				'roleDescription':$.ToCDB($('#roleDescription_m').val()),
    				'issuperadmin':$("input[name='isSuperAdmin_m']:checked").val()==1?true:false
    			}
    			
    			//更新权限
				res = roleManager.modifyAuth($("#modifyId").val(),'treeDemoEdit');
				//$('#roleTable').bootstrapTable('refresh');
				if(res == 1){
					$.toastrWarning('权限修改失败');
					return;
				} else if(res == 2) {
					return;
				}
    	    	//通过Ajax去访问后台
    	    	$.callAjax({
    	    		type:"post",
    				url : roleManager.URL.modifyRoleInfoUrl(),
    				data : params,
    				success : function(data) {
    					if(data.code == "0000" && res == 0 ) {
    						$('#roleTable').bootstrapTable('refresh');
    						$.toastrSuccess('更新角色信息成功！');
    						$.hideModal('#modifyModal');
    					} else {
    						$.toastrWarning(data.msg);
    						return;
    					}
    				},
    				error : function(){
    					$.toastrError("系统异常！");
    				}
    	    	});
    		} else {
    			return;
    		}
    	});	
    	
    	//生效按钮
    	$("#btn_is_true").click(function(){
    		var status = false;
    		if($("#roleTable").bootstrapTable('getSelections').length>0){
    			var ids = new Array();
        		$.map($("#roleTable").bootstrapTable('getSelections'), function(row) {
    				if(row.enabled==0){
    					status = true;
    	    			ids.push(row.id);
    				}
                });
        		if(!status) {
    				$.toastrWarning("已经是‘生效’状态！");
        			return;
        		}
        		roleManager.modifyStatus(ids,true);
    		} else {
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
	    	
    	});
    	//失效按钮
	    $("#btn_is_false").click(function(){
	    	var status = false;
	    	var flag = false;
	    	if($("#roleTable").bootstrapTable('getSelections').length>0){
	    		var ids = new Array();
		    	$.map($("#roleTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==1){
						status = true;
						var sta = row.isdisabledel;
						if(!sta) {
							ids.push(row.id);
						} else {
							if(row.type == 0){
								ids.push(row.id);
							} else {
								flag = true;
							}
						}
					}
	            });
		    	if(flag) {
		    		$.toastrWarning("包含不可禁用的系统内置角色，请重新选择");
		    		return;
		    	}
		    	if(!status) {
					$.toastrWarning("已经是‘失效’状态！");
	    			return;
	    		}
		    	roleManager.modifyStatus(ids,false);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
	    	
    	});
	    
	     //绑定点击取消事件
		 $("#btn_cancel").on("click",function() {
			 $.modalCancel("modifyAnchorForm","modifyModal");
		 });
		 $("#btn_cancel_add").on("click",function() {
			 var res = $.modalCancel("addAnchorForm","myModal");
		 });
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
		roleManager.searchCurrentByPage();
		roleManager.validateform();
		roleManager.evalidateform();
    }
}


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数
	var roleName = $.ToCDB($("#sroleName").val());
	var uniquekey = $.ToCDB($("#suniquekey").val());
	var enabled = $("#senabled").val();
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: roleManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		roleName:roleName,
		uniquekey:uniquekey,
		enabled:enabled
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		//查看当前房间主播回放
	    'click .carsDetail_a': function (e, value, row, index) {
	    	$.toastrSuccess('商品编号为： ' + row.carsCode);
	    	//触发查询商品详情的方法
	    	roleManager.getCarsDetais();
	    },
		//删除角色
		'click .deleteRole_a': function (e, value, row, index) {
			roleManager.deleteRole(row.id);
		},
		//修改角色状态
		'click .status_a': function (e, value, row, index) {
			//roleManager.modifyStatus(row.id);
		},
		//获取角色信息
		'click .getRoleInfo_a': function (e, value, row, index) {
			
			$("#operatorId_m").attr("disabled",true);
			//获取运营商列表
			roleManager.getAllOperator("operatorId_m");
			//获取用户信息
			roleManager.getRoleInfo(row.id);
			//获取用户权限
			roleManager.getAuthByRole(row.id)
			$("#modifyModalLabel").text("更新角色信息");
		    $.showModal('#modifyModal');
		    //判断是否为超级管理员
			if(row.issuperadmin == true) {
    			$("#yes_m").attr("checked",true);
    			$("#yes_m").click();
    			$("#n_m").attr("checked",false);
    			$("#enabled_m").attr("disabled",true);
    		} else {
    			$("#n_m").attr("checked",true);
    			$("#n_m").click();
    			$("#yes_m").attr("checked",false);
    			$("#enabled_m").attr("disabled",false);
    			
    		}
		}
	    
};

$(document).ready(function(){
	//1、初始化加载列表数据
	roleManager.init();
	//2、初始化绑定增删改查事件
	roleManager.bindEvent();
});

function resets() {
	document.getElementById("addAnchorForm").reset();
}

//新增-Modal验证销毁重构
$('#myModal').on('hidden.bs.modal', function() {
    $("#addAnchorForm").data('bootstrapValidator').destroy();
    $('#addAnchorForm').data('bootstrapValidator', null);
    roleManager.validateform();
});

//编辑-Modal验证销毁重构
$('#modifyModal').on('hidden.bs.modal', function() {
    $("#modifyAnchorForm").data('bootstrapValidator').destroy();
    $('#modifyAnchorForm').data('bootstrapValidator', null);
    roleManager.evalidateform();
});

//获取所有选中节点的值
function GetCheckedAll(treeId) {
	var arrID = new Array();
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var nodes = treeObj.getCheckedNodes(true);
    var msg = "name--id--pid\n";
    for (var i = 0; i < nodes.length; i++) {
        arrID.push(nodes[i].id);
    }
    return arrID;
}
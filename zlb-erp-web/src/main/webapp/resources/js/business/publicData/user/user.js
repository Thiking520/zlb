// 存放每个功能模块业务逻辑JS
// javascript 模块化
var occupationIdArr=[];
var userManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	searchListByPage:function() {//分页查询
        	return '/publicData/user/getAllUsers';
        },
    	modifyUserInfoUrl:function() {//修改用户信息
        	return '/publicData/user/modifyUserInfo';
        },
        deleteUserUrl:function() {//删除用户
        	return '/publicData/user/deleteUser';
        },
        modifyStatusUrl:function() {//修改用户状态
        	return '/publicData/user/modifyStatus';
        },
        getAllRolesUrl:function() {//分页查找所有角色
        	return '/publicData/role/findAllRoles';
        },
        getAllPointsUrl:function() {//分页查找所有站点
        	return '/publicData/deliveryScope/list';
        },
        getAllStaffsUrl:function() {//分页查找所有员工
        	return '/tms/emp/list';
        },
        getUserInfoUrl:function(userId) {//获取用户信息
        	return '/publicData/user/getUserInfo';
        },
        getEmpDatailUrl:function(empId) {//获取员工详情
        	return '/tms/emp/queryEmployeeDetails';
        },
        saveUserArchivesUrl:function() {//保存用户档案
        	return '/publicData/user/saveUserArchive'
        },
        searchDR: function () {//获取站点列表
            return '/publicData/deliveryRecord/list';
        },
        getAllOperatorUrl:function() {//获取所有运营商列表
        	return '/operator/qryOperator';
        },
        getOperatorIds:function() {//获取当前运营商id和角色所属运营商id
        	return '/publicData/user/operatorIds';
        },
        initDropDownBox: function () {//初始化下拉列表
            return '/tms/emp/initDropDownBox';
        }
    },
    
    /**删：删除用户**/
    deleteUser: function (userId) {
    	$.dialogConfirm({
            message: '您确定要删除此用户吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":userId};
        			$.callAjax({
        				type:"post",
        				url : userManager.URL.deleteUserUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#userTable').bootstrapTable('refresh');
    		         		$.toastrSuccess('删除用户成功！');
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
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : userManager.URL.initDropDownBox(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		for(var i=0;i<data.data.occupationIdList.length;i++){
         			occupationIdArr[data.data.occupationIdList[i].dictValue]=data.data.occupationIdList[i].dictDesc;
         			//$('#occupationId').append("<option value='"+data.data.occupationIdList[i].dictValue+"'>"+data.data.occupationIdList[i].dictDesc+"</option>");
         		}
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
			async: false,
			url : userManager.URL.getAllOperatorUrl(),
			data : params,
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
     * 获取用户当前所在运营商和所属运营商Id
     */
    getOperatorIds:function (){
    	var res = null;
    	$.callAjax({
			type:"post",
			url : userManager.URL.getOperatorIds(),
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
    /**
     * 修改用户状态
     */
    modifyStatus:function(userId,enabled) {
    	var params = {"ids":userId,"enabled":enabled};
		$.callAjax({
			type:"post",
			url : userManager.URL.modifyStatusUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#userTable').bootstrapTable('refresh');
         		$.toastrSuccess();
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 修改用户信息
     */
    modifyUserInfo:function(userId) {
    	var params = {"id":userId};
		$.callAjax({
			type:"post",
			url : userManager.URL.modifyUserInfoUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#userTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 保存用户档案信息（新增/修改）
     */
    saveUserArchives:function(params) {
		$.callAjax({
			type:"post",
			url : userManager.URL.saveUserArchivesUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		//关闭弹窗
         		$.hideModal('#editModal');
         		//刷新表单
         		$('#userTable').bootstrapTable('refresh');
         		if(data.data.password != null && data.data.password.trim().length > 0) {
         			alert(data.data.password);
         		}
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**分页获取站点列表**/
    searchListByPageDR: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#pointList",//需要分页的table ID
    		url: userManager.URL.searchDR(),//请求后台的URL（*）
    		queryParams:pointParams,
    		async: false,
    		onLoadSuccess:function(){
    			userManager.isResetOffset = 0;
    			var pointIdStr = $("#pointIds").val();
    			if(pointIdStr != null && pointIdStr.trim().length > 0) {
    				var arr= eval("("+ pointIdStr +")");
    				arrays = new Array();
    				for (var int = 0; int < arr.length; int++) {
    					arrays.push(arr[int]);
    				}
    				//回选
    				$("#pointList").bootstrapTable("checkBy", {field:"id", values:arrays});
    			}
            },
    		columns: [{
    			checkbox: true,
    		}, {
    			field: 'code',
    			title: '编码',
    			align: 'left'
    		}, {
    			field: 'name',
    			title: '名称',
    			align: 'left'
    		}
    		]
    	});
    },
    /**
     * 获取用户档案信息
     */
    getUserInfo:function(id) {
    	var params = {"id":id};
		$.callAjax({
			type:"post",
			url : userManager.URL.getUserInfoUrl(),
			data : params,
			async:false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		//写入弹框中
         		$("#uniquekey").val(data.data.uniquekey);
         		$("#userName").val(data.data.userName);
         		$("#mobileNo").val(data.data.mobileNo);
         		$("#operatorId").val(data.data.companyName);
         		$("#description").val(data.data.description);
         		$("#empName").val(data.data.cnName);
         		$("#jobId").val(data.data.empJobId);
         		//站点iD
	    		$("#zhandian").val(data.data.point)
	    		//获取角色ids
	    		$("#roleIds").val(data.data.roleList);
	    		/*$("#roleIds").val("82,84");*/
	    		//获取站点ids
	    		$("#pointIds").val(data.data.pointList);
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    /**
     * 获取员工详情
     */
    getEmpDatail:function(empId) {
    	var params = {"id":empId};
		$.callAjax({
			type:"post",
			url : userManager.URL.getEmpDatailUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		//写入弹框中
         		$("#job").val(data.data.occupationId);
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    
    /**分页获取用户列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#userTable",//需要分页的table ID
    		url: userManager.URL.searchListByPage(),//请求后台的URL（*）
    		queryParams:queryUserParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
			async:false,
    		onLoadSuccess:function(){
    			userManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'userName',
    			title: '登录帐号',
    			align: 'center'
    		}, {
    			field: 'enabledStr',
    			title: '状态',
    			align: 'center',
    			formatter: function (value, row, index) {
    				if(value =="失效") {
    					return "<span style='color:red'>失效</span>"
    				} else {
    					return '生效'
    				}
    			}
    		}, {
    			field: 'cnName',
    			title: '姓名',
    		    align: 'center'
    		},  {
    			field: 'mobileNo',
    			title: '联系电话',
    		    align: 'center'
    		},  {
    			field: 'roleName',
    			title: '角色名称',
    		    align: 'center'
    		},  {
    			field: 'description',
    			title: '描述',
    		    align: 'center',
    		    formatter: function (value, row, index) {
					if(value !=null && value.length >10){
						return '<a style="color:#555;text-decoration:none;" title="'+value+'" href="javascript:void(0)" >'+value.substr(0,10)+'...</a>';
					} else {
						return value;
					}
				}
    		}, /*{
    			field: 'creatorStr',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'createTimeStr',
    			title: '创建时间',
    			align: 'center'
    		}, {
    			field: 'updateTimeStr',
    			title: '修改记录',
    			align: 'center',
    			formatter: function (value, row, index) {
    				var name = row.modifierStr==null?"111":row.modifierStr;
    				var time = row.updateTimeStr==null?"":row.updateTimeStr;
    				return name+"</br>"+time;
    			}
    		},*/{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html;
    	        	if(row.enabledStr=='失效' ) {
    	        		html = '<label style="cursor:not-allowed"><a class="btn btn-sm btn-primary getUserInfo_a disabled" id= "btn_show_modify" href="javascript:void(0)" >编辑</a></label>';
    	        	} else {
    	        		html = '<a class="btn btn-sm btn-primary getUserInfo_a" id= "btn_show_modify" href="javascript:void(0)" >编辑</a>';
    	        	}
    	        	 
    	        	//<a class="btn btn-danger btn-sm deleteUser_a" href="javascript:void(0)" >删除</a>
    	        	/*if(row.enabled==0){
    	        		html+='<a class="btn btn-warning status_a" href="javascript:void(0)" >失效</a>';
    	        	}else{
    	        		html+='<a class="btn btn-success status_a" href="javascript:void(0)" >生效</a>';
    	        	}*/
    	            return html;
    	        },
    	        events: 'operateEvents',
    	        align: 'center'
    	    }  
    		]
    	});
    },
    
    /**获取员工列表**/
    getAllStaffs: function () {
    	$.pageTable({
    		tableId: "#staffTable",//需要分页的table ID
    		url: userManager.URL.getAllStaffsUrl(),//请求后台的URL（*）
    		queryParams:allStaffsParams,
    		onLoadSuccess:function(){
    			userManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			radio: true
    		}, {
    			field: 'cnName',
    			title: '姓名',
    			align: 'left'
    		}, {
    			field: 'occupationId',
    			title: '员工属性',
    			align: 'left',
    			formatter:function(value,row,index){
					return occupationIdArr[value];
    			}
    		},{
    			field: 'mobileNo',
    			title: '电话号码',
    			align: 'left'
    		}]
    	});
    	
    },
    
    /**
     * 获取所有角色
     */
    getAllRoles:function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#roleList",//需要分页的table ID
    		url: userManager.URL.getAllRolesUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:roleParams,
    		onLoadSuccess:function(){
    			userManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
    			//进去选中
				var roleIdStr = $("#roleIds").val();
    			if(roleIdStr != null && roleIdStr.trim().length > 0) {
    				var arr= eval("("+ roleIdStr +")");
    				arrays = new Array();
    				for (var int = 0; int < arr.length; int++) {
    					arrays.push(arr[int]);
    				}
    				$("#roleList").bootstrapTable("checkBy", {field:"id", values:arrays});
    			}
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			radio: true,
    		}, {
    			field: 'roleName',
    			title: '角色',
    			align: 'left'
    		}, {
    			field: 'roleDescription',
    			title: '描述',
    			align: 'left'
    		}]
    	});
    },
    
    /**
     * 添加/编辑面板表单校验
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
	        	job: {
	        		validators: {
	                    notEmpty: {
	                        message: '员工属性不能为空！'
	                    },
	                }
	            },
	            empName: {
	                validators: {
	                    notEmpty: {
	                        message: '员工名称不能为空！'
	                    },
	                }
	            },
	            mobileNo: {
	            	validators: {
	                    notEmpty: {message: '联系电话不能为空！'},
	                     /*stringLength: {
	                         min: 11,
	                         max: 11,
	                         message: '请输入11位手机号码'
	                     },*/
	                     regexp: {
	                         regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
	                         message: '请输入正确的手机号码'
	                     }
	                }
	            },
	            userName: {
	            	validators: {
	                    notEmpty: {message: '帐号不能为空！'},
	                     /*stringLength: {
	                         min: 11,
	                         max: 11,
	                         message: '请输入11位手机号码'
	                     },*/
	                     regexp: {
	                         regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
	                         message: '请输入正确的帐号'
	                     }
	                }
	            },
	            operatorId: {
	                validators: {
	                    notEmpty: {message: '运营商不能为空！'},
	                }
	            },
	            description: {
	                validators: {
		                stringLength: {
	                        min: 0,
	                        max: 50,
	                        message: '描述请控制在50个字以内'
	                    }
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    /**
     * 获取所有配送点
     */
    getAllPoints:function () {
    	$.pageTable({
    		tableId: "#pointList",//需要分页的table ID
    		url: userManager.URL.getAllPointsUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:pointParams,
    		onLoadSuccess:function(){
    			userManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			//deliveryRecordId 站点ID
    			field: 'name',
    			title: '配送地点',
    			align: 'center'
    		}]
    	});
    },
    bindEvent: function () {
    	var isInit = false;
    	//点击打开员工列表面板
    	$(".findStaff").on("click",function () {
    		$.showModal('#staffModal');
    		if(isInit){
    			$('#staffTable').bootstrapTable('refresh');
    			return;
    		}
    		isInit = true;
    		//查找员工列表
    		userManager.getAllStaffs();
    	});
    	
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		userManager.isResetOffset = 1;
    		$('#userTable').bootstrapTable('refresh');
    	});
    	//点击获取员工列表
    	$("#btn_staff_submit").on("click",function() {
    		//判断选择了多少个框
    		if($("#staffTable").bootstrapTable('getSelections').length==1){
    			$.map($("#staffTable").bootstrapTable('getSelections'), function(row) {
    				//把员工属性和员工姓名赋值到前面的板块
    	    		$("#job").val(row.occupationId);
    	    		$("#empName").val(row.cnName);
    	    		//获取员工名称，后续使用
    	    		$("#nickName").val(row.cnName);
    	    		//获取员工ID，后续使用
    	    		$("#empId").val(row.id);
    	    		//获取员工手机号码作为帐号
    	    		$("#userName").val(row.mobileNo)
    	    		/*//更新运营商ID
    	    		$("#operatorId").val(row.operatorId);
    	    		alert(row.operatorId);
    	    		$("#operatorID").val(row.operatorId);*/
    	    		//更新联系电话
    	    		$("#mobileNo").val(row.mobileNo);
    	    		//站点iD
    	    		$("#zhandian").val(row.distributionPoint);
    	    		//获取描述
    	    		$("#description").val(row.description);
    	    		
    	    		//刷新表单校验
    	    		$('#addAnchorForm').data('bootstrapValidator').resetForm();
    	    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    	    		bootstrapValidator.validate();
                });
        		//获取配送点列表
        		userManager.searchListByPageDR();
        		//获取角色列表
        		userManager.getAllRoles();
        		$('#pointList').bootstrapTable('refresh');
        		$('#roleList').bootstrapTable('refresh');
    		} else {
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    		//隐藏弹框
    		$.hideModal('#staffModal');
    	});
    	//编辑、新增页面点击保存
    	$("#btn_save_submit").on("click",function() {
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid()) {
    			var roleId;
        		var pointId = "";
        		//判断角色选择
        		if($("#roleList").bootstrapTable('getSelections').length==1 || 
        		$("#roleList").bootstrapTable('getSelections').length!=0) {
        			$.map($("#roleList").bootstrapTable('getSelections'), function(row) {
        				//获取角色ID
        	    		roleId = row.id;
                    });
        		} else {
        			$.toastrWarning("请选择一个角色进行操作！");
        			return;
        		}
        		//判断配送点选择
        		if($("#pointList").bootstrapTable('getSelections').length==1 || 
        		$("#pointList").bootstrapTable('getSelections').length==0) {
        			$.map($("#pointList").bootstrapTable('getSelections'), function(row) {
        				//获取配送点ID
        				pointId = row.id;
                    });
        		} else {
        			/*$.toastrWarning("请选择一个配送点进行操作！");
        			return;*/
        			//如果有多个，这里会自动遍历获取多个选中的值
        			$.map($("#pointList").bootstrapTable('getSelections'), function(row) {
        				//获取配送点ID
        				pointId += row.id + ",";
        				
                    });
        		}
        		//获取所有参数
        		var mobileNo = $("#mobileNo").val();
        		var userName = $("#userName").val();
        		var description = $("#description").val();
        		var empId = $("#empId").val();
        		var empName = $("#nickName").val();
        		var operatorId = $("#operatorId").val();
        		var params = {"roleId":roleId,"pointIds":pointId,"mobileNo":mobileNo,"userName":userName,"description":description,"empId":empId,"empName":empName,"operatorId":operatorId}
        		//调用修改保存方法
        		userManager.saveUserArchives(params);
    		} else {
    			return;
    		}
    	});
    	//新增打开面板
    	$("#btn_add").on('click',function() {
    		$("#findStaff").css("cursor","pointer");
    		$("#findStaff").css("background-color","#fff");
    		//点击有效
    		$("#findStaff").click(function(){
    			$.showModal('#staffModal');
        		if(isInit){
        			$('#staffTable').bootstrapTable('refresh');
        			return;
        		}
        		isInit = true;
        		//查找员工列表
        		userManager.getAllStaffs();
    		  });
    		
    		 resets();
    		 //获取当前运营商和userType
	   		 var str = userManager.getOperatorIds();
	   		 //当前运营商Id
	   		 var operatorId = str.split(',')[0];
	   		 //用户类型
	   		 var userType = str.split(',')[1];
	   		 //打开运营商列表
	   		 userManager.getAllOperator('operatorId');
	   		 //默认选中当前运营商
	   		 $("#operatorId").val(operatorId);
	   		 $("#operator").val(operatorId);
	   		 if(userType != 0) {
	   			 //非运维
	   			 $("#operatorId").attr("disabled",true);
	   		 } else {
	   			$("#operatorId").attr("disabled",false);
	   		 }
	   		$("#operatorId").attr("disabled",true);
    		
    		$.showModal('#editModal');
    		$("#userName").attr("readonly","readonly");
    	});
    	
    	//生效按钮
    	$("#btn_is_true").click(function(){
    		var status = false;
	    	var ids = new Array();
	    	if($("#userTable").bootstrapTable('getSelections').length>0){
	    		$.map($("#userTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==0){
						status = true;
		    			ids.push(row.id);
					}
	            });
	    		if(!status) {
	    			$.toastrWarning("已经是‘生效’状态！");
	    			return;
	    		}
	    		userManager.modifyStatus(ids,true);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
    		
    	});
    	//失效按钮
	    $("#btn_is_false").click(function(){
	    	var status = false;
	    	if($("#userTable").bootstrapTable('getSelections').length>0){
	    		var ids = new Array();
		    	$.map($("#userTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==1){
						status = true;
		    			ids.push(row.id);
					}
	            });
		    	if(!status) {
	    			$.toastrWarning("已经是‘失效’状态！");
	    			return;
	    		}
		    	userManager.modifyStatus(ids,false);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
	    	
    	});
	     //绑定点击取消事件
		 $("#btn_cancel").on("click",function() {
			 $.modalCancel("addAnchorForm","editModal");
		 });
    	$("#btn_search_s").on("click",function() {
    		userManager.isResetOffset = 1;
    		$('#staffTable').bootstrapTable('refresh');
    	});
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	userManager.searchListByPage();
    	userManager.validateform();
    	userManager.initDropDownBox();
    }
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	//删除用户信息
	'click .deleteUser_a': function (e, value, row, index) {
		userManager.deleteUser(row.id);
	},
	//修改用户状态
	'click .status_a': function (e, value, row, index) {
		//userManager.modifyStatus(row.id);
	},
	//打开修改弹框
	'click .getUserInfo_a': function (e, value, row, index) {
		//获取用户档案信息
		userManager.getUserInfo(row.id);
		$("#operatorId").attr("disabled",true);
		//查询运营商列表
		userManager.getAllOperator('operatorId');
		$("#operatorId").val(24176);
		//获取员工ID，后续使用
		$("#empId").val(row.empId);
		//打开弹框
		$.showModal('#editModal');
		//获取角色列表
		userManager.getAllRoles();
		//获取配送点列表
		userManager.searchListByPageDR();
		
		//员工属性赋值
		$("#job").val(row.empJobId);
		//描述复制
		$("#description").val(row.description);
		
		$('#pointList').bootstrapTable('refresh');
		$('#roleList').bootstrapTable('refresh');
		$("#findStaff").css("cursor","not-allowed");
		$("#findStaff").css("background-color","#eee");
		//点击失效
		$("#findStaff").unbind("click");
		
	},
	
};


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

//得到查询的参数              ★★★分页表单查询参数★★★
var queryUserParams = function (params) {
	//自定义查询
	var uniquekey = $.ToCDB($("#suniquekey").val());
	var username = $.ToCDB($("#suserName").val());
	var nickname = $("#snickname").val();
	var enabled = $("#senabled").val();
	var operatorId = $("#soperatorId").val();
	var mobileNo = $("#smobileNo").val();
	var roleName = $.ToCDB($("#roleName").val());
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: userManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		uniquekey:uniquekey,
		username:username,
		cnName:nickname,
		enabled:enabled,
		operatorId:operatorId,
		roleName:roleName
		//mobileNo:mobileNo
	};
	//temp = JSON.stringify(temp);
	return temp;
};

//角色列表分页参数
var roleParams = function(params) {
	//拿员工的运营商ID
	var operatorId = $("#operatorID").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: userManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			operatorId:operatorId,
			enabled:true,
			deleted:false
		};
	temp = JSON.stringify(temp);
	return temp;
}

//配送点分页参数
var pointParams = function(params) {
	//拿员工的运营商ID
	var operatorId = $("#operatorID").val();
	//员工的
	var deliveryRecordId = $("#zhandian").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: userManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			deliveryRecordId:deliveryRecordId,
			operatorId:operatorId,
			enabled:true,
			deleted:false,
			custom1:'all'
		};
	//temp = JSON.stringify(temp);
	return temp;
	
}

var allStaffsParams = function(params) {
	//拿员工的运营商ID
	var operatorId = $("#operatorId").val();
	var cnName = $("#s_cnName").val();
	var mobileNo = $("#s_mobileNo").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: userManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			operatorId:operatorId,
			enabled:true,
			deleted:false,
			cnName:cnName,
			mobileNo:mobileNo,
			allData:'NotRegister'
		};
	return temp;
}

function resets() {
	document.getElementById("addAnchorForm").reset();
}

function cleanSearch(formId) {
	document.getElementById(formId).reset();
}

//新增-Modal验证销毁重构
$('#editModal').on('hidden.bs.modal', function() {
	//清空弹框内容
	resets();
	//$("#operatorID").val(-1);
	$('#roleList').bootstrapTable('refresh');
	//配送点刷新为空
	//$("#zhandian").val(-1);
	$('#pointList').bootstrapTable('refresh');
	
	$("#job").val("");
  $("#addAnchorForm").data('bootstrapValidator').destroy();
  $('#addAnchorForm').data('bootstrapValidator', null);
  userManager.validateform();
});

$(document).ready(function(){
	//1、初始化加载列表数据
	userManager.init();
	//2、初始化绑定增删改查事件
	userManager.bindEvent();
	
});

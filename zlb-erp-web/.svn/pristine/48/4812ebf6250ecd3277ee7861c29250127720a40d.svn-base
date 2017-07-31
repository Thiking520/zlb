// 存放每个功能模块业务逻辑JS
// javascript 模块化
var operatorManager = {
		
    tableId:'#operatorTable',
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/operator/qryOperator';
        },//删除运营商的请求地址
        deleteUrl: function () {
            return '/operator/delOperator';
        },//查看运营商详情的请求地址
        getOperatorUpdateUrl: function () {
            return '/operator/loadOperatorUpdate';
        },//查看运营商详情的请求地址
        addOperatorUrl: function () {
            return '/operator/addOperator';
        },//更新运营商状态
        updateEnableOperatorUrl: function () {
            return '/operator/updateEnableOperator';
        },
        updateDisenableOperatorUrl: function () {
            return '/operator/updateDisenableOperator';
        },//更新
        updateOperatorUrl:function(){
        	return '/operator/updateOperator';
        },
        getStatusOptionUrl:function(){
        	return '/operator/getStatusOption';
        }
        
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: operatorManager.tableId,//需要分页的table ID
    		url: operatorManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(data){
    			operatorManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            toolbar: '#toolbar',
			toolbarAlign:'right',
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		
    		columns: [{
    			checkbox: true
    		}, 
    		{
    			field: 'companyKey',
    			title: 'key值',
    			align: 'center'
    		},
    		{
    			field: 'companyName',
    			title: '运营商名称',
    			align: 'center'
    		},
    		{
    			field: 'enabledName',
    			title: '状态',
    			align: 'center',
    			formatter:function(value,row,index){
    				if(value == '失效') {
    					return '<laebl style="color:red">失效</label>';
    				} else {
    					return value;
    				}
    				
    			}
    		}, 
    		/*{
    			field: 'companyCode',
    			title: '编码',
    			align: 'center'
    		}, */
    		/*{
    			field: 'companyFullName',
    			title: '中文全称',
    			align: 'center'
    		},*/ 
    		/*{
    			field: 'companyExtName',
    			title: '英文全称',
    			align: 'center'
    		}, */
    		{
    			field: 'customerContact',
    			title: '客服联系人',
    			align: 'center'
    		}, 
    		{
    			field: 'customerMobileNo',
    			title: '客服联系电话',
    			align: 'center'
    		}, 
    		/*{
    			field: 'customerEmail',
    			title: '客服联系人邮箱',
    			align: 'center'
    		}, 
    		{
    			field: 'reconciliationContact',
    			title: '对帐联系人',
    			align: 'center'
    		}, 
    		{
    			field: 'reconciliationMobileNo',
    			title: '对帐联系人联系电话',
    			align: 'center'
    		},
    		{
    			field: 'reconciliationEmail',
    			title: '对帐联系人邮箱',
    			align: 'center'
    		},
    		{
    			field: 'siteUrl',
    			title: '网站链接',
    			align: 'center'
    		},
    		*/
    		{
    			field: 'companyAddress',
    			title: '客户地址',
    			align: 'center'
    		},
    		/*{
    			field: 'remark',
    			title: '描述',
    			align: 'center'
    		},*/
    		/*{
    			field: 'createTime',
    			title: '创建记录',
    			align: 'center',
    			formatter:function(value,row,index){
    				var time = row.createTime==null?"":row.createTime;
    				var name = row.creatorName==null?"":row.creatorName;
    				return name+"<br/>"+time;
    			}
    		},
    		{
    			field: 'updateTime',
    			title: '修改记录',
    			align: 'center',
    			formatter:function(value,row,index){
    				var time = row.updateTime==null?"":row.updateTime;
    				var name = row.modifierName==null?"":row.modifierName;
    				return name+"<br/>"+time;
    			}
    		},*/{
    			field: 'operation',
    			title: '操作',
    			align: 'center',
    			formatter:function(value,row,index){
    				var loadUpdateUrl=operatorManager.URL.getOperatorUpdateUrl();
    				var html='';
    				if(auth.isAuth(loadUpdateUrl)){
    					html='<a class="btn btn-primary btn-sm editOperator_a" href="javascript:void(0)" >编辑</a>';
    				}
    				return html; 
    			},
    			events: 'operateEvents'
    		} 
    		]
    	});
    },
    /**删：删除商品**/
    deleteoperator: function (operatorId) {
    	$.dialogConfirm({
            message: '您确定要删除商品ID为['+operatorId+']的商品吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":operatorId};
        			$.callAjax({
        				url : operatorManager.URL.deleteUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != constants.code_success){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$(operatorManager.tableId).bootstrapTable('refresh');
    		         		$.toastrSuccess('删除成功！');
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
     * 改变运营商状态
     */
    changeOperatorStatus:function (ids,enabled,keys){
    	var urlValue;
    	if(enabled == 0){
    		urlValue=operatorManager.URL.updateDisenableOperatorUrl();
    	}else if(enabled == 1){
    		urlValue=operatorManager.URL.updateEnableOperatorUrl();
    	}
    	var params={
    		"ids":ids,
    		"status":enabled,
    		"companyKeys":keys
    	}
    	$.callAjax({
			type:"post",
			url : urlValue,
			data : params,
			success : function(data){
         		if(data.code != constants.code_success){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$(operatorManager.tableId).bootstrapTable('refresh');
         		$.toastrSuccess('操作成功！');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**编辑，查看详情**/
    getOperatorUpdate: function (id,type) {
    	var urlValue
    	if(type=="edit"){
    		urlValue=operatorManager.URL.getOperatorUpdateUrl();
    	}else if(type=="look"){
    		
    	}
    	document.getElementById("addAnchorForm").reset();
	    $('#addAnchorForm').bootstrapValidator('resetForm', true);
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : urlValue,
			data : params,
			success : function(data){
         		if(data.code != constants.code_success){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         		}
         		var loadData=data.data;
         		$("#companyKey_a").val(loadData.companyKey);
         		$("#companyCode_a").val(loadData.companyCode);
         		$("#companyFullName_a").val(loadData.companyFullName);
         		$("#companyName_a").val(loadData.companyName);
         		$("#companyExtName").val(loadData.companyExtName);
         		$("#customerContact").val(loadData.customerContact);
         		
         		$("#customerMobileNo").val(loadData.customerMobileNo);
         		$("#customerEmail").val(loadData.customerEmail);
         		$("#reconciliationContact").val(loadData.reconciliationContact);
         		$("#reconciliationMobileNo").val(loadData.reconciliationMobileNo);
         		$("#reconciliationEmail").val(loadData.reconciliationEmail);
         		$("#siteUrl").val(loadData.siteUrl);
         		$("#companyAddress").val(loadData.companyAddress);
         		$("#remark").val(loadData.remark);
         		
         		if(type=="look"){
         			$("#myModalLabel").text("查看运营商详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑运营商");
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").hide();
         			
         			$("#companyKey_a").attr("readonly","readonly");
             		$("#companyCode_a").attr("readonly","readonly");
         		}
         		$.showModal('#myModal');
			},
			error : function(){
				$.toastrError();
			}
		});
		
    },
  //添加或修改
	addOrUpdate:function(type){
		var urlValue;
		if(type=="add"){
			urlValue=operatorManager.URL.addOperatorUrl();
		}if(type=="update"){
			urlValue=operatorManager.URL.updateOperatorUrl();
		}
		var params={
				'id':$("#rowId").val(),
				'companyKey':$.ToCDB($('#companyKey_a').val()),
    			'companyCode':$.ToCDB($('#companyCode_a').val()),
    			'companyFullName':$.ToCDB($('#companyFullName_a').val()),	
    			'companyName':$.ToCDB($('#companyName_a').val()),
    			'companyExtName':$.ToCDB($("#companyExtName").val()),
    			'customerContact':$.ToCDB($('#customerContact').val()),
    			'customerMobileNo':$.ToCDB($('#customerMobileNo').val()),
    			'customerEmail':$.ToCDB($('#customerEmail').val()),	
    			'reconciliationContact':$.ToCDB($('#reconciliationContact').val()),
    			'reconciliationMobileNo':$.ToCDB($('#reconciliationMobileNo').val()),
    			'reconciliationEmail':$.ToCDB($('#reconciliationEmail').val()),
    			'siteUrl':$.ToCDB($('#siteUrl').val()),
    			'companyAddress':$.ToCDB($('#companyAddress').val()),	
    			'remark':$.ToCDB($('#remark').val()),
    			
    		}
    		
    		$.callAjax({
    			type:"post",
    			url : urlValue,
    			data : params,
    			success : function(data){
             		if(data.code != constants.code_success){
             			$.toastrWarning(data.msg);
             			//填充dialog
             	    	//显示dialog
             			return;
             		}
             		$.hideModal('#myModal');
             		if(type=="update") {
             			$.toastrSuccess('修改运营商成功！');
             		} else {
             			//右上角运营商列表刷新---20170601 by Shilijin
                 		myMain.initData(constants.mana_role_type);
                 		//选中运营商
                 		$("#tree li:eq(1)").click();
                 		
             			$.toastrSuccess('添加运营商成功！');
             		}
             		$(operatorManager.tableId).bootstrapTable('refresh');
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
		
	},
	//表单检验
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
	        	companyKey_a: {
	                validators: {
	                    notEmpty: {
	                        message: 'key值不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 20,
                            message: 'key值长度必须在1到20位之间'
                        },
                        regexp: {
	                         regexp: /^([1-9][0-9]*)$/,
	                         message: 'key值必须为正整数'
	                    }
                        
	                }
	            },
	            companyCode_a: {
	                validators: {
	                    notEmpty: {
	                        message: '编码不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 32,
                            message: '长度必须在1到32位之间'
                        },
	                }
	            },
	            companyFullName_a: {
	                validators: {
	                    notEmpty: {
	                        message: '中文全称不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 30,
                            message: '长度必须在1到30位之间'
                        }
	                }
	            },
	            companyName_a: {
	                validators: {
	                    notEmpty: {message: '中文简称不能为空！'},
	                
		                stringLength: {
	                        min: 1,
	                        max: 30,
	                        message: '长度必须在1到30位之间'
	                    }
	                },
	            },
	            customerContact: {
	                validators: {
	                    //notEmpty: {message: '客服联系人不能为空！'},
	                }
	            },
	            customerMobileNo: {
	                validators: {
	                    //notEmpty: {message: '客服联系电话号码不能为空！'},
	                    regexp: {
	                         regexp: /(^(\d{3,4}-|400)\d{7,8})$|(^1[0-9]{10}$)/,
	                         message: '请输入正确的电话号码'
	                     }
	                }
	            },
	            customerEmail: {
	                validators: {
	                    //notEmpty: {message: '客服邮箱不能为空！'},
	                
			            regexp: {
		                    regexp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		                    message: '请输入正确的邮箱'
		                }
	                },
	            },
	            reconciliationContact: {
	                validators: {
	                    //notEmpty: {message: '对帐联系人不能为空！'},
	                }
	            },
	            reconciliationMobileNo: {
	                validators: {
	                    //notEmpty: {message: '对帐联系电话号码不能为空！'},
	                
			            regexp: {
		                    regexp: /(^(\d{3,4}-|400)\d{7,8})$|(^1[0-9]{10}$)/,
		                    message: '请输入正确的电话号码'
		                }
	                },
	            },
	            reconciliationEmail: {
	                validators: {
	                    //notEmpty: {message: '对帐邮箱不能为空！'},
	                
		                regexp: {
		                    regexp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		                    message: '请输入正确的邮箱'
		                }
	                },
	            },
	            companyAddress: {
	                validators: {
	                    notEmpty: {message: '客户地址不能为空！'},
	                }
	            },
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    bindEvent: function () {
    	//绑定清空事件
    	$("#btn_clean").on("click",function () {
    		  document.getElementById("searchForm").reset();
    	});
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  $("#btn_search").addClass("disabled");
    		  operatorManager.isResetOffset = 1;
    		  $(operatorManager.tableId).bootstrapTable('refresh');
    	});
    	
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		 document.getElementById("addAnchorForm").reset();
    		 $('#addAnchorForm').data('bootstrapValidator').resetForm();
    		 $("#myModalLabel").text("新增运营商");
		     $("#btn_save_submit").show();
		     $("#btn_edit_submit").hide();
		     $.showModal('#myModal');
		     
		     $("#companyKey_a").attr("readonly",false);
      		 $("#companyCode_a").attr("readonly",false);
	    });
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 operatorManager.isResetOffset = 1;
    			 $(operatorManager.tableId).bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			operatorManager.addOrUpdate('add');
    		else return;
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			operatorManager.addOrUpdate('update');
    		else return;
    	});
	    $("#btn_is_true").click(function(){
    		if($(operatorManager.tableId).bootstrapTable('getSelections').length>0){
    			var idArr=new Array();
    			$.map($(operatorManager.tableId).bootstrapTable('getSelections'), function(row) {
    				if(row.enabled==0){
    					idArr.push(row.id+',');
    				}
    			});
    			
    			if(idArr.length<=0){
    				$.toastrWarning("已生效！");
    				return;
    			}
    			
    			idArr.unshift('[');
    			idArr.push(']');
    			var str=idArr.join("");
    			str=str.replace(/,]/g, "]");
    			operatorManager.changeOperatorStatus(JSON.parse(str),1,null);
    			
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
	    $("#btn_is_false").click(function(){
    		if($(operatorManager.tableId).bootstrapTable('getSelections').length>0){
    			var idArr=new Array();
    			var keyArr=new Array();
    			$.map($(operatorManager.tableId).bootstrapTable('getSelections'), function(row) {
    				if(row.enabled==1){//1:生效
    					idArr.push(row.id+',');
    					keyArr.push(row.companyKey+',');
    				}
                });
    			
    			if(idArr.length<=0){
    				$.toastrWarning("已失效！");
    				return;
    			}
    			
    			idArr.unshift('[');
    			idArr.push(']');
    			var str=idArr.join("");
    			str=str.replace(/,]/g, "]");
    			
    			keyArr.unshift('[');
    			keyArr.push(']');
    			var keystr=keyArr.join("");
    			keystr=keystr.replace(/,]/g, "]");
    			
    			operatorManager.changeOperatorStatus(JSON.parse(str),0,JSON.parse(keystr));
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
	    //绑定点击取消事件
		 $("#btn_cancel").on("click",function() {
			 $.modalCancel("addAnchorForm","myModal");
		 })
    },
    initOption:function(){
    	$.callAjax({
			type:"post",
			url : operatorManager.URL.getStatusOptionUrl(),
			data : {},
			success : function(data){
         		if(data.code != constants.code_success){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		var optionData=data.data;
         		for(var i=0;i<optionData.length;i++){
         			$('#enabled').append('<option value="'+optionData[i].dictValue+'">'+optionData[i].dictDesc+'</option>');
         		}
         	},
			error : function(){
				$.toastrError();
			}
		});
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	operatorManager.validateform();
		operatorManager.searchListByPage();
    }
}


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	var companyCode=$.ToCDB($('#companyCode').val());
	var companyName=$.ToCDB($('#companyName').val());
	var companyFullName=$.ToCDB($('#companyFullName').val());
	var enabled=$('#enabled').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		companyCode:companyCode,
		companyName:companyName,
		companyFullName:companyFullName,
		enabled:enabled,
		viewSearchVo:{
			pageSize: params.limit,   //页面大小
			offset: operatorManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order
		}
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .operatorDetail_a': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	$.toastrSuccess('运营商编号为： ' + row.id);
	    	//触发查询商品详情的方法
	    	operatorManager.getoperatorDetais(row.id,'look');
	    },
		//删除
		'click .deleteoperator_a': function (e, value, row, index) {
			
			operatorManager.deleteoperator(row.id);
		},
	    //编辑
	    'click .editOperator_a': function (e, value, row, index) {
			$("#rowId").val(row.id);
			operatorManager.getOperatorUpdate(row.id,'edit');
		}
};

$(document).ready(function(){
	//引入myMain.js
	new_element=document.createElement("script");
	new_element.setAttribute("type","text/javascript");
	new_element.setAttribute("src","/resources/js/business/login/myMain.js");
	auth.managerAuth({
		'btn_show_add':operatorManager.URL.addOperatorUrl(),
		'btn_is_true':operatorManager.URL.updateEnableOperatorUrl(),
		'btn_is_false':operatorManager.URL.updateDisenableOperatorUrl()
	});
	operatorManager.initOption();
	//1、初始化加载列表数据
	operatorManager.init();
	//2、初始化绑定增删改查事件
	operatorManager.bindEvent();
});
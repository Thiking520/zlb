// 存放每个功能模块业务逻辑JS
// javascript 模块化
var registerManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/servicePlatform/serviceProviderRegister/list';
        },//删除标签的请求地址
        deleteUrl: function () {
            return '/servicePlatform/serviceProviderRegister/deleteData';
        },//查看标签详情的请求地址
        getDetailsUrl: function () {
            return '/servicePlatform/serviceProviderRegister/queryDetails';
        },//新增标签的请求地址
        addDataUrl: function () {
            return '/servicePlatform/serviceProviderRegister/addData';
        },//修改标签的请求地址
        updateDataUrl:function(){
        	return '/servicePlatform/serviceProviderRegister/updateData';
        },//下拉请求地址
        dropDownUrl:function(){
        	return '/servicePlatform/serviceProvider/queryAll';
        }
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: registerManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			registerManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'ecServiceName',
    			title: '服务商名称',
    		    align: 'center'
    		}, {
    			field: 'ecAppKey',
    			title: 'ecAppKey',
    		    align: 'center'
    		}, 
    		{
    			field: 'ecAppSecret',
    			title: 'ecAppSecret',
    		    align: 'center'
    		}, 
    		{
    			field: 'commonApiUrl',
    			title: 'common api URL',
    		    align: 'center'
    		}, 
    		{
    			field: 'notifyUrl',
    			title: '事件订阅回调地址',
    		    align: 'center'
    		}, 
    		{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_a" href="javascript:void(0)" >编辑</a>'+
    	        		     '<a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    }]
    	});
    },
    getDropDown: function (){
    	$.callAjax({
			url : registerManager.URL.dropDownUrl(),
			data : "",
			success : function(serverData) {

				var serviceList = serverData.data;
				if(serviceList != null){
					for(var i=0 ; i < serviceList.length ; i ++){
						var item = serviceList[i];
	         			$('#ecServiceId').append('<option value="'+item.id+'">'+item.serviceName+'</option>');
	         		}
				}
			}
		});
    },    
    /**删：删除商品**/
    deleteData: function (id) {
    	$.dialogConfirm({
            message: '您确定要删除ID为['+id+']的服务商吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id};
        			$.callAjax({
        				url : registerManager.URL.deleteUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#listTable').bootstrapTable('refresh');
    		         		$.toastrSuccess('删除成功！');
        				}
        			});
                }
            }
        });
    },
    /**编辑，查看详情**/
    getDetails: function (id) {
    	document.getElementById("addForm").reset();
	    $('#addForm').bootstrapValidator('resetForm', true);
    	var params = {'id':id};
		$.callAjax({
			url : registerManager.URL.getDetailsUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         		}
         		$('#ecServiceId option[value='+data.data.ecServiceId+']').attr("selected", true);
         		$("#ecAppKey").val(data.data.ecAppKey);
         		$("#ecAppSecret").val(data.data.ecAppSecret);
         		$("#commonApiUrl").val(data.data.commonApiUrl);  
         		$("#notifyUrl").val(data.data.notifyUrl);    
         		
         		$("#myModalLabel").text("编辑");
         		$.showModal('#myModal');
			}
		});
    },
    //添加或修改
	addOrUpdate:function(){
		var id = $("#id").val();
		var urlValue;
		if(id != "")
			urlValue=registerManager.URL.updateDataUrl();
		else
			urlValue=registerManager.URL.addDataUrl();
		
		var params = $("#addForm").serializeObject();
		
		$.callAjax({
			url : urlValue,
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$.hideModal('#myModal');
         		$('#listTable').bootstrapTable('refresh');
			}
		});
	},
	//表单检验
    validateform:function(){
    	//表单验证start
    	$('#addForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	        	      valid: 'glyphicon glyphicon-ok',
	        	      invalid: 'glyphicon glyphicon-remove',
	        	      validating: 'glyphicon glyphicon-refresh'
            },
	        fields: {
	        	ecAppKey: {
	                validators: {
	                    notEmpty: {
	                        message: 'AppKey不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 100,
                            message: '长度必须在1到100位之间'
                        },
	                }
	            },
	            ecAppSecret: {
	                validators: {
	                    notEmpty: {
	                        message: 'AppSecret不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 100,
                            message: '长度必须在1到100位之间'
                        },
	                }
	            },
	            commonApiUrl: {
	                validators: {
	                    notEmpty: {
	                        message: 'commonApiUrl不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 100,
                            message: '长度必须在1到100位之间'
                        },
	                }
	            },
	            notifyUrl: {
	                validators: {
	                    notEmpty: {
	                        message: '事件订阅回调地址不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 100,
                            message: 'url地址格式'
                        },
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		registerManager.isResetOffset = 1;
    		$('#listTable').bootstrapTable('refresh');
    	});
    	
    	//清空事件
    	$("#btn_clean").on("click",function () {
    		$.clearForm("searchForm");
    	});
    	
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		$("#id").val("");
    		document.getElementById("addForm").reset();
    		$('#addForm').data('bootstrapValidator').resetForm();
    		$("#myModalLabel").text("新增服务商");
		    $.showModal('#myModal');
	    });
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			$("#btn_search").addClass("disabled");
    			registerManager.isResetOffset = 1;
    			$('#listTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//新增或修改
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			registerManager.addOrUpdate();
    		else return;
    	});
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	registerManager.validateform();
    	registerManager.searchListByPage();
    	registerManager.getDropDown();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	var searchKeyword=$('#searchKeyword').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: registerManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		searchKeyword:searchKeyword
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	//删除
	'click .delete_a': function (e, value, row, index) {
		registerManager.deleteData(row.id);
	},
    //编辑
    'click .edit_a': function (e, value, row, index) {
		$("#id").val(row.id);
		registerManager.getDetails(row.id);
	}
};

$(document).ready(function(){
	//1、初始化加载列表数据
	registerManager.init();
	//2、初始化绑定增删改查事件
	registerManager.bindEvent();
});
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var demo = {
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/demo/list';
        },
        modifyKeywordUrl: function () {
        	return '/demo/modifyKeyword';
        },
    	//添加请求地址
    	addKeyUrl: function () {
            return '/demo/addOrEditeKeyword';
        },
    	//删除请求地址
    	deleteKeyUrl: function () {
            return '/demo/deleteKeyword';
        },
    	//校验请求地址
        validatorKeywordUrl: function () {
            return '/demo/validatorKeyword';
        }
    },
    /**分页获取列表**/
    searchListByPage: function () {

    	//分页组件
    	$.pageTable({
    		tableId: "#demoTable",//需要分页的table ID
    		url: demo.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'get',	//请求方式（*）
    		queryParams:queryParams,
    		columns: [{
    			checkbox: true
    		}, {
    			align: 'center',
    			field: 'id',
    			title: 'id'
    		}, {
    			align: 'center',
    			field: 'searchKeyName',
    			title: '关键字'
    		}, {
    			align: 'center',
    			field: 'searchCount',
    			title: '搜索次数'
    		},{
    			field: 'operation',
    			title: '操作',
    			formatter:function(value,row,index){
    				var editeBtn = '';
    				var deleteBtn = '<a class="btn btn-info deleteBtn" href="javascript:void(0)" id="' + row.id + '" >删除</a>';
    				editeBtn = '<a class="btn btn-info editeBtn" href="javascript:void(0)" >编辑</a>';
    				return editeBtn+''+deleteBtn;
    			},
    			events: 'operateEvents'
    		}  
    		]
    	});
    },
    /*添加或编辑关键字**/
    addOrEditeKeyword: function () {
    	var params = $("#addOrEditeSearchForm").serialize();
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : demo.URL.addKeyUrl(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						$('#myModal').modal('hide');
						$('#demoTable').bootstrapTable('refresh');
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    /*删除关键字**/
    deleteKeyword: function (id) {
    	//组装数据发起Ajax请求begin
    	var params = {"id":id};
    	$.dialogConfirm({
            message: '删除后将无法恢复，请您确认真要删除吗?',
            callback: function(result) {
                if(result) {
			    	$.callAjax({
			    		type:"post",
			    		url : demo.URL.deleteKeyUrl(),
			    		data : params,
			    		success : function(data){   
			    			var code = data.code;
			    			if(code!="0000"){
			    				toastr['warning'](data.msg); 
			    			}else{
			    				//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
			    				$.toastrSuccess('删除成功！');
			    				$('#demoTable').bootstrapTable('refresh');
			    			}
			    		},
			    		error : function(){
			    			$.toastrError();
			    		}
			    	});
                }
            }
        });
    },
    /*检验关键字的唯一性**/
    validatorKeyword: function (searchKeyName) {
    	//组装数据发起Ajax请求begin
    	var params = {"searchKeyName":searchKeyName};
    	$.callAjax({
    		type:"post",
    		url : demo.URL.validatorKeywordUrl(),
    		data : params,
    		async: false,//同步Ajax校验
    		success : function(data){   
    			var code = data.code;
    			var isValid = data.data.isValid;
    			if(code!="0000"){
    				toastr['warning'](data.msg); 
    			}else{
    				if(isValid == true){
    					$("#demo_keyword").attr("isValid",true);
    				}else{
    					$("#demo_keyword").attr("isValid",false);
    				}
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
    },
    //表单检验
    validateform:function(){
    	//表单验证start
    	$('.demoForm').bootstrapValidator({
	        message: 'This value is not valid',
	        fields: {
	        	searchKeyName: {
	                validators: {
	                    notEmpty: {
	                        message: '搜索关键字不能为空'
	                    },
	                    callback: {
	                        message: '最长不得超过7个汉字，或14个字节(数字，字母等)',
	                        callback: function(value, validator) {
	                        	var char = value.replace(/[^\x00-\xff]/g, '**');
	                        	if(0 < char.length && char.length <= 14){
	                        		return true;
	                        	}else{
	                        		return false;
	                        	}
	                        }
	                    }
	                }
	            },
	            searchCount: {
	                validators: {
	                    notEmpty: {
	                        message: '搜索值不能为空'
	                    },
	                    between: {
                            min: 1,
                            max: 999999999,
                            message: '请输入1~999999999之间的整数'
                        },
                        integer: {
                            message: '请输入1~999999999之间的整数'
                        }
	                }
	            }
	        }
	    });
    	//表单验证end
    },
    bindEvent: function () { 
    	//添加蒙态框消失时重置表单
    	$('#myModal').on('hidden.bs.modal', function () {
    		//重置表单校验
    		$("#addOrEditeSearchForm").data('bootstrapValidator').destroy();
    		$('#addOrEditeSearchForm').data('bootstrapValidator', null);
    		//初始化表单验证
    		demo.validateform();
    		//重置表单数据
    		document.getElementById("addOrEditeSearchForm").reset();
    		$("#id").val('');
    		$("#demo_keyword").attr("isValid",false);
    		$("#demo_keyword").attr("searchKeyNameOld",'');
    		$("#demo_searchCount").attr("searchCountOld",'');
    		$("#keywordMsg").hide();
   			$("#labelKeyword").removeClass('has-error');
    	});
    	//绑定添加展示按钮
    	$("#btn_addKeyword").on("click",function () {
    		var submitType = $("#btn_addKeyword").attr("submitType","add");
    		$("#myModalLabel").text("添加关键字");
	    	$('#myModal').modal({
	    		backdrop:'static',
	    		keyboard:false
	    	});
    	});  
    	//获取焦点时，删除错误信息
    	$("#demo_keyword").focus( function () { 
    		$("#keywordMsg").hide();
			$("#labelKeyword").removeClass('has-error');
    	} );
    	//绑定添加或编辑提交按钮
    	$("#btn_submit").on("click",function () {
    		$("#btn_submit").addClass("disabled");
    		var submitType = $("#btn_addKeyword").attr("submitType");
    		//添加
    		if(submitType == 'add'){
    			//手动验证
    			$("#id").val('');
    			$("#addOrEditeSearchForm").data('bootstrapValidator').validate();
    			var valid = $("#addOrEditeSearchForm").data('bootstrapValidator').isValid();
    			if(valid){
    				var searchKeyName = $("#demo_keyword").val();
    				demo.validatorKeyword(searchKeyName);//验证关键字唯一性
    				//验证验证关键字唯一性
    				var keywordResult;
    				var isValid = $("#demo_keyword").attr("isValid");
    				if(isValid == 'true'){//验证通过
    					keywordResult = true;
    					$("#keywordMsg").hide();
    					$("#labelKeyword").removeClass('has-error');
    					$('#myModal').modal('hide');
    				}else{
    					keywordResult = false;
    					$("#keywordMsg").show();
    					$("#labelKeyword").addClass('has-error');
    				}
    			}
    			if(valid&&keywordResult){
    				demo.addOrEditeKeyword();
    				$("#btn_submit").removeClass("disabled");
    			}else{
    				$("#btn_submit").removeClass("disabled");
    				return false;
    			}
    		}
    		//编辑
    		if(submitType == 'edite'){
    			//手动验证
    			$("#addOrEditeSearchForm").data('bootstrapValidator').validate();
    			var valid = $("#addOrEditeSearchForm").data('bootstrapValidator').isValid();
    			if(valid){
    				var searchKeyNameOld = $("#demo_keyword").attr("searchKeyNameOld");
    				var searchKeyName = $("#demo_keyword").val();
    				var searchCountOld = $("#demo_searchCount").attr("searchCountOld");
    				var searchCount = $("#demo_searchCount").val();
    				
    				if(searchKeyNameOld == searchKeyName && searchCountOld == searchCount){//数据未改变直接返回
	    				$('#myModal').modal('hide');
	    				$("#btn_submit").removeClass("disabled");
	    				return false;
	    			}else if(searchKeyNameOld == searchKeyName && searchCountOld != searchCount){//修改数量
	    				demo.addOrEditeKeyword();
	    				$('#myModal').modal('hide');
	    				$("#btn_submit").removeClass("disabled");
	    			}else if(searchKeyNameOld != '' && searchKeyNameOld != searchKeyName){//关键字改变，需要校验
	    				demo.validatorKeyword(searchKeyName);//验证关键字唯一性
	    				//验证验证关键字唯一性
	    				var keywordResult;
	    				var isValid = $("#demo_keyword").attr("isValid");
	    				if(isValid == 'true'){//验证通过
	    					keywordResult = true;
	    					$("#keywordMsg").hide();
	    					$("#labelKeyword").removeClass('has-error');
	    					$('#myModal').modal('hide');
	    				}else{
	    					keywordResult = false;
	    					$("#keywordMsg").show();
	    					$("#labelKeyword").addClass('has-error');
	    				}
	    				if(valid&&keywordResult){
	    					demo.addOrEditeKeyword();
	    					$("#btn_submit").removeClass("disabled");
	    				}else{
	    					$("#btn_submit").removeClass("disabled");
	    					return false;
	    				}
	    			}else{
	    				$("#btn_submit").removeClass("disabled");
	    			}
    			}else{
    				$("#btn_submit").removeClass("disabled");
    			}
    		}
    		
    	});  
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	//初始化表单验证
		demo.validateform();
    	demo.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: params.offset     //分页偏移值
	};
	return temp;
};
//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		
		//展示编辑关键字
	    'click .editeBtn': function (e, value, row, index) {
	    	var submitType = $("#btn_addKeyword").attr("submitType","edite");
	    	//回显数据
	    	$("#id").val(row.id);
	    	$("#demo_keyword").val(row.searchKeyName);
	    	$("#demo_keyword").attr("searchKeyNameOld",$("#demo_keyword").val());//判断用
	    	$("#demo_searchCount").val(row.searchCount);
	    	$("#demo_searchCount").attr("searchCountOld",$("#demo_searchCount").val());
	    	$("#myModalLabel").text("编辑banner");
	    	$('#myModal').modal();
	    },
		//删除关键字
		'click .deleteBtn': function (e, value, row, index) {
			//组织数据
			var id = row.id;
			demo.deleteKeyword(id);
		}
};

$(document).ready(function(){
	//1、初始化加载列表数据
	demo.init();
	//2、初始化绑定增删改查事件
	demo.bindEvent();
});
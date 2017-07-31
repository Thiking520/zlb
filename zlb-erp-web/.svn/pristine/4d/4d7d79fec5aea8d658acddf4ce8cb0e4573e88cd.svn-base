// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsTagManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/goodsTag/list';
        },//删除标签的请求地址
        deleteUrl: function () {
            return '/publicData/goodsTag/deleteData';
        },//查看标签详情的请求地址
        getDetailsUrl: function () {
            return '/publicData/goodsTag/queryDetails';
        },//新增标签的请求地址
        addDataUrl: function () {
            return '/publicData/goodsTag/addData';
        },//修改标签的请求地址
        updateDataUrl:function(){
        	return '/publicData/goodsTag/updateData';
        }
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: goodsTagManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			goodsTagManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'tagName',
    			title: '标签名称',
    		    align: 'center'
    		}, {
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
    /**删：删除商品**/
    deleteData: function (id) {
    	$.dialogConfirm({
            message: '您确定要删除商品ID为['+id+']的商品吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id};
        			$.callAjax({
        				url : goodsTagManager.URL.deleteUrl(),
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
			url : goodsTagManager.URL.getDetailsUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         		}
         		$("#tagName").val(data.data.tagName);
         		
         		$("#myModalLabel").text("编辑");
         		$.showModal('#myModal');
			}
		});
    },
    //添加或修改
	addOrUpdate:function(){
		var id = $("#keyId").val();
		var urlValue;
		if(id != "")
			urlValue=goodsTagManager.URL.updateDataUrl();
		else
			urlValue=goodsTagManager.URL.addDataUrl();
		var params={
			'id':id,
			'tagName':$('#tagName').val(),	
		}
		
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
	        	tagName: {
	                validators: {
	                    notEmpty: {
	                        message: '标签名称不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 50,
                            message: '长度必须在1到50位之间'
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
    		goodsTagManager.isResetOffset = 1;
    		$('#listTable').bootstrapTable('refresh');
    	});
    	
    	//清空事件
    	$("#btn_clean").on("click",function () {
    		$.clearForm("searchForm");
    	});
    	
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		$("#keyId").val("");
    		document.getElementById("addForm").reset();
    		$('#addForm').data('bootstrapValidator').resetForm();
    		$("#myModalLabel").text("新增标签");
		    $.showModal('#myModal');
	    });
    	
    	//绑定键盘事件
    	$("#searchForm").keydown(function (event) {
    		if(event.keyCode==13){
    			$("#btn_search").addClass("disabled");
    			goodsTagManager.isResetOffset = 1;
    			$('#listTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//新增或修改
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			goodsTagManager.addOrUpdate();
    		else return;
    	});
    	
    	 //绑定点击取消事件
		 $("#btn_cancel").on("click",function() {
			 $.modalCancel("addForm","myModal");
		 });
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsTagManager.validateform();
    	goodsTagManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	var searchKeyword=$('#searchKeyword').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsTagManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		searchKeyword:searchKeyword
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
//    'click .detail_a': function (e, value, row, index) {
//    	document.getElementById("addForm").reset();
//    	$('#addForm').bootstrapValidator('resetForm', true);
//    	$.toastrSuccess('标签编号为： ' + row.id);
//    	//触发查询商品详情的方法
//    	goodsTagManager.getDetails(row.id);
//    },
	//删除
	'click .delete_a': function (e, value, row, index) {
		goodsTagManager.deleteData(row.id);
	},
    //编辑
    'click .edit_a': function (e, value, row, index) {
		$("#keyId").val(row.id);
		goodsTagManager.getDetails(row.id);
	}
};

$(document).ready(function(){
	//1、初始化加载列表数据
	goodsTagManager.init();
	//2、初始化绑定增删改查事件
	goodsTagManager.bindEvent();
});
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsSkuManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	deleteIds:[],
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/goodsSku/list';
        },//检查要删除的数据是否有商品已经关联
        checkIsUsedUrl: function () {
            return '/publicData/goodsSku/checkIsUsed';
        },//删除的请求地址
        deleteUrl: function () {
            return '/publicData/goodsSku/deleteData';
        },//查看详情的请求地址
        getDetailsUrl: function () {
            return '/publicData/goodsSku/queryDetails';
        },//添加的请求地址
        addDataUrl: function () {
            return '/publicData/goodsSku/addData';
        },//修改的请求地址
        updateDataUrl:function(){
        	return '/publicData/goodsSku/updateData';
        }
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: goodsSkuManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			goodsSkuManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'skuName',
    			title: '规格名称'
    		}, {
    			field: 'sortIndex',
    			title: '排序'
    		}, {
    			field: 'childList',
    			title: '数据项',
    			formatter:function(value,row,index){
    				var nameStr = "";
    				// 便利后台放回的详情list
    				$.each(value, function(i, objectItem) {
                        nameStr += objectItem["skuName"];
                        nameStr += "、";
                    });
    				nameStr = nameStr.substring(0, nameStr.length-1);
    				return nameStr;
    	        }
    		}, {
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_a" href="javascript:void(0)" >编辑</a>'+
    	        		     '<a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    }  
    		]
    	});
    },
    /**删：删除商品**/
    deleteData: function (id) {
    	$.dialogConfirm({
            message: '您确定要删除ID为['+id+']的规格项吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id};
        			$.callAjax({
        				url : goodsSkuManager.URL.deleteUrl(),
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
    /**编辑，查看商品详情**/
    getDetails: function (id) {
    	//触发Ajax
    	var params = {"id":id};
		$.callAjax({
			url : goodsSkuManager.URL.getDetailsUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$("#tabList tr:not(:first)").remove(); //删除除表头外的所有行
         		$("#myModalLabel").text("编辑规格");
         		$.showModal('#myModal');
         		goodsSkuManager.deleteIds = [];
         		
         		$("#skuName").val(data.data.skuName);
         		$('#skuName').attr("readonly","readonly");
         		$("#sortIndex").val(data.data.sortIndex);
         		
         		// 详情
         		var value = data.data.childList;
         		$.each(value, function(i, objectItem) {
         			var trLen = $("#tabList").find("tr").length;
             		var html="<tr id="+objectItem.id+">"+
    							"<td>"+trLen+"</td>"+
    							"<td><input type='text' readonly='readonly' class='form-control' value="+objectItem.skuName+"></td>"+
    							"<td><input type='text' class='form-control' value="+objectItem.sortIndex+"></td>"+
    							"<td><button type='button' class='btn btn-danger btn-flat' onclick='deleteRows(this,"+objectItem.id+")'>删除</button></td>"+
    						 "</tr>";
    				var tr = $("#tabList tr").eq(-1);// 获取倒数第一行
    				tr.after(html);
                });
			}
		});
    },
    addOrUpdate:function(){
    	var id = $("#keyId").val();
		var urlValue;
		if(id != "")
			urlValue=goodsSkuManager.URL.updateDataUrl();
		else
			urlValue=goodsSkuManager.URL.addDataUrl();
    	// 获取table列表数据，保存到数组
		var childList = [];
		var trList = $("#tabList").find("tr");
		if(trList.length <= 1){
			$.toastrWarning("请新增规格值");
			return;
		}
	 	for (var i=1;i<trList.length;i++) {
	 		var id = trList.eq(i).attr('id');
	   		var inputArr = trList.eq(i).find("input");
	    	var skuName = inputArr.eq(0).val();// 规格值
	    	var sortIndex = inputArr.eq(1).val();// 排序值
	    	if(skuName == null || skuName == ''){
	    		$.toastrWarning("规格值不能为空");
	    		return;
	    	}
	    	if(sortIndex == null || sortIndex == ''){
	    		$.toastrWarning("排序值不能为空");
	    		return;
	    	}
	    	var json = {id:id, skuName:skuName, sortIndex:sortIndex};
	    	childList.push(json);
	  	}

	 	var params={
	 		'id':$("#keyId").val(),
	 		'skuName':$('#skuName').val(),
	 		'sortIndex':$('#sortIndex').val(),
			'childList':childList,
			'deleteIds':goodsSkuManager.deleteIds
		};

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
	        	skuName: {
	                validators: {
	                    notEmpty: {
	                        message: '规格名称不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 50,
                            message: '长度必须在1到50位之间'
                        },
	                }
	            },
	            sortIndex: {
	                validators: {
	                    notEmpty: {
	                        message: '请填写规格的排序值！'
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
    		  goodsSkuManager.isResetOffset = 1;
    		  $('#listTable').bootstrapTable('refresh');
    	});
    	
    	//清空事件
    	$("#btn_clean").on("click",function () {
    		$.clearForm("searchForm");
    	});
    	
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		$("#keyId").val("");
    		goodsSkuManager.deleteIds = [];
    		document.getElementById("addForm").reset();
    		$('#addForm').data('bootstrapValidator').resetForm();
    		$("#skuName").removeAttr("readonly");
    		$("#tabList tr:not(:first)").remove(); //删除除表头外的所有行
		    $("#myModalLabel").text("新增规格");
		    $.showModal('#myModal');
	    });
    	//新增规格值，添加一行
    	$("#btn_add_row").click(function () {
    		// 获取总行数
    		var trLen = $("#tabList").find("tr").length;
    		var html="<tr>"+
						"<td>"+trLen+"</td>"+
						"<td><input type='text' class='form-control'></td>"+
						"<td><input type='text' class='form-control' value='"+trLen+"'></td>"+
						"<td><button type='button' class='btn btn-danger btn-flat' onclick='deleteRows(this)'>删除</button></td>"+
					"</tr>";
    		var tr = $("#tabList tr").eq(-1);// 获取倒数第一行
			tr.after(html);
	    });
    	
    	//绑定键盘事件
    	$("#searchForm").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 goodsSkuManager.isResetOffset = 1;
    			 $('#listTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			goodsSkuManager.addOrUpdate();
    		else return;
    	});
    	
    	//绑定点击取消事件
		 $("#btn_cancel").on("click",function() {
			 $.modalCancel("addForm","myModal");
		 });
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsSkuManager.validateform();
    	goodsSkuManager.searchListByPage();
    }
}


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	var searchKeyword=$('#searchKeyword').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsSkuManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		searchKeyword:searchKeyword
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
//		//查看当前房间主播回放
//	    'click .detail_a': function (e, value, row, index) {
//	    	$.toastrSuccess('商品编号为： ' + row.id);
//	    	//触发查询商品详情的方法
//	    	goodsSkuManager.getDetails(row.id);
//	    },
		//删除
		'click .delete_a': function (e, value, row, index) {
			goodsSkuManager.deleteData(row.id);
		},
	    //编辑
	    'click .edit_a': function (e, value, row, index) {
	    	$("#keyId").val(row.id);
	    	goodsSkuManager.getDetails(row.id);
		}
};

$(document).ready(function(){
	//1、初始化加载列表数据
	goodsSkuManager.init();
	//2、初始化绑定增删改查事件
	goodsSkuManager.bindEvent();
});

function deleteRows(e,id){
	if(id != undefined){
		goodsSkuManager.deleteIds.push(id);
		var params={
		 		'id':$("#keyId").val(),
				'deleteIds':goodsSkuManager.deleteIds
		};
		$.callAjax({
			url : goodsSkuManager.URL.checkIsUsedUrl(),
			data : params,
			async: false,
			success : function(data){
	     		if(data.code != "0000"){
	     			$.toastrWarning(data.msg); 
	     			return;
	     		}else{
	     			var index = $('tr').index($(e).closest('tr'));
	     		    $('table tr:eq('+index+')').remove();	
	     		}
			}
		});
	}else{
		var index = $('tr').index($(e).closest('tr'));
	    $('table tr:eq('+index+')').remove();	
	}
}
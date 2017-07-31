// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	goodsId:"",
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//跳转列表页
    	initUrl: function () {
            return '/publicData/goods/init';
        },
        //跳转新增页
        toAddViewUrl: function () {
            return '/publicData/goods/toAddView';
        },
		//分页获取商品列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/goods/list';
        },//删除商品的请求地址
        deleteUrl: function () {
            return '/publicData/goods/deleteData';
        },//上架、下架的请求地址
        updateStatusUrl: function () {
            return '/publicData/goods/updateStatus';
        },
        //商品列表界面，多规格商品看详情
        querySkuDetailsByGoodsIdUrl: function () {
            return '/publicData/goodsSkuList/querySkuDetailsByGoodsId';
        },
        //商品列表界面，组合商品看详情
        queryCollectionDetailsByGoodsIdUrl: function () {
            return '/publicData/goodsCollection/queryCollectionDetailsByGoodsId';
        },
        //获取商品分类树目录
        goodsTypeTreeUrl: function () {
            return '/publicData/goodsType/goodsTypeTree';
        }
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: goodsManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			goodsManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'goodsImageUrl',
    			title: '商品主图',
    			formatter:function(value,row,index){
       				return '<img width="50px;" height="50px;" src="' + row.goodsImageUrl + '" alt="LOGO" class="logo-default"/>'
       		    }
    		},{
    			field: 'goodsCode',
    			title: '商品编码'
    		}, {
    			field: 'title',
    			title: '商品名称'
    		}, {
    			field: 'typeName',
    			title: '所属分类'
    		}, {
    			field: 'goodsMode',
    			title: '商品类型',
    			formatter:function(value,row,index){
    				var html = "";
    				if (value == 0)
    					html = "单品";
    				else if (value == 1)
    					html = "<a class='goodsModeDetail_a' href='javascript:void(0)'>多规格商品</a>";
    				else if (value == 2)
    					html = "<a class='goodsModeDetail_a' href='javascript:void(0)'>组合商品</a>";
					return html;
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'goodsStatus',
    			title: '当前状态',
    			formatter:function(value,row,index){
    				var html = "";
    				if (value == 0)
    					html = "未上架";
    				else if (value == 1)
    					html = "已上架";
    				else if (value == 2)
    					html = "已下架";
    				else if (value == 3)
    					html = "已删除";
					return html;
    	        }
    		}, {
    			field: 'goodsDesc',
    			title: '商品简介'
    		}, {
    			field: 'createTime',
    			title: '创建时间',
    		    align: 'center'
    		},{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_a" href="javascript:void(0)" >编辑</a>';
    	        	// 上架、下架
    	        	if(row.goodsStatus == 0 || row.goodsStatus == 2)
    	        		html += '<a class="btn btn-info btn-sm update_goodsStatus" href="javascript:void(0)">上架</a>';
    	        	else if(row.goodsStatus == 1)
    	        		html += '<a class="btn btn-warning btn-sm update_goodsStatus" href="javascript:void(0)">下架</a>';
    	        	
    	        	// 删除按钮
    	        	if(row.goodsStatus != 3)
    	        		html += '<a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
    	        	
		            return html; 
    	        },
    	        events: 'operateEvents'
    	    }]
    	});
    },
    /**分页获取多规格商品详情列表**/
    querySkuDetailsByGoods: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#detailSkuTable",//需要分页的table ID
    		url: goodsManager.URL.querySkuDetailsByGoodsIdUrl(),//请求后台的URL（*）
    		queryParams:queryParams1,
    		onLoadSuccess:function(){
    			goodsManager.isResetOffset = 0;
            },
    		columns: [{
    			field: 'id',
    			title: 'ID'
    		},{
    			field: 'goodsCode',
    			title: '商品编码'
    		},{
    			field: 'title',
    			title: '商品名称'
    		}, {
    			field: 'skuList',
    			title: '规格名称',
    			formatter:function(value,row,index){
    				var nameStr = "";
    				// 便利后台放回的详情list
    				$.each(value, function(i, objectItem) {
                        nameStr += objectItem["skuName"];
                        nameStr += "-";
                    });
    				nameStr = nameStr.substring(0, nameStr.length-1);
    				return nameStr;
       		    }
    		},/* {
    			field: 'stockVo.stockAmount',
    			title: '总库存',
    		    align: 'center'
    		}, {
    			field: 'stockVo.availableAmount',
    			title: '可用库存'
    		}, {
    			field: 'stockVo.usedAmount',
    			title: '占用库存'
    		}, {
    			field: 'costPrice',
    			title: '成本价'
    		},*/ {
    			field: 'suggestPrice',
    			title: '市场价(￥)'
    		},{
    			field: 'mallPrice',
    			title: '商城售价(￥)'
    		}]
    	});
    },
    /**分页获取组合商品详情列表**/
    queryCollectionDetailsByGoodsId: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#detailListTable",//需要分页的table ID
    		url: goodsManager.URL.queryCollectionDetailsByGoodsIdUrl(),//请求后台的URL（*）
    		queryParams:queryParams1,
    		onLoadSuccess:function(){
    			goodsManager.isResetOffset = 0;
            },
    		columns: [{
    			field: 'id',
    			title: 'ID'
    		},{
    			field: 'goodsCode',
    			title: '商品编码'
    		},{
    			field: 'title',
    			title: '商品名称'
    		}, {
    			field: 'goodsImageUrl',
    			title: '商品主图',
    			formatter:function(value,row,index){
       				return '<img width="50px;" height="50px;" src="' + row.goodsImageUrl + '" alt="LOGO" class="logo-default"/>'
       		    }
    		}, {
		    	field: 'amount',
    			title: '售卖量'
    		}/*, {
    			field: 'usedStore',
    			title: '占用库存',
    		    align: 'center'
    		}*/]
    	});
    },
    /**查：初始化商品分类，树形结构**/
    initGoodsTypeTree: function () {
		$.callAjax({
			url : goodsManager.URL.goodsTypeTreeUrl(),
			data : "",
			success : function(serverData) {
				$('#goods_type_tree').treeview({
					data : serverData,
					levels : 99,// 展开的层次
					showCheckbox: true,
					multiSelect: false,// 是否可以同时选择多个节点，行选中不是复选框选中
					showTags : false,// 需要配合tags来使用，如text: 'Parent 2', tags: ['7']
					showBorder: true,// 是否显示分割线
					enableLinks : true,// 鼠标放上去显示<a>链接样式
					highlightSelected: true,//当选择节点时是否高亮显示
					onNodeSelected: function(event, node) {
					    if(node.state.checked){   
					        //设置不勾选
					    	$('#goods_type_tree').treeview('uncheckNode', node.nodeId);    
					    } else {
					    	//设置勾选
					    	$('#goods_type_tree').treeview('uncheckAll');  
					        //设置勾选
					    	$('#goods_type_tree').treeview('checkNode', node.nodeId);  
					    }  
					}
				});
			}
		});
    },
    /**删：删除商品**/
    deleteData: function (goodsId) {
    	$.dialogConfirm({
            message: '您确定要删除商品ID为['+goodsId+']的商品吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":goodsId,"status":3};
        			$.callAjax({
        				url : goodsManager.URL.deleteUrl(),
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
    //上架、下架操作
    updateGoodsStatus: function (goodsId, newGoodsStatus, text) {
    	$.dialogConfirm({
            message: '您确定要['+text+']商品ID为['+goodsId+']的商品吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":goodsId,"goodsStatus":newGoodsStatus};
        			$.callAjax({
        				url : goodsManager.URL.updateStatusUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#listTable').bootstrapTable('refresh');
    		         		$.toastrSuccess(text+'成功！');
        				}
        			});
                }
            }
        });
    },
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
        	/*if(isNaN($("#goodsCode").val())){
        		$.toastrSuccess('商品编码只能填数字.');
        		return;
        	}*/
		    $("#btn_search").addClass("disabled");
		    goodsManager.isResetOffset = 1;
		    $('#listTable').bootstrapTable('refresh');
    	});
    	
    	//清空事件
    	$("#btn_clean").on("click",function () {
    		$.clearForm("searchForm");
    	});
    	
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		$("#keyId").val("");
    		myMain.getAllContent(goodsManager.URL.toAddViewUrl());
	    });
    	
    	//绑定键盘事件
    	$("#searchForm").keydown(function (event) {
    		if(event.keyCode==13){
    			if(isNaN($("#goodsCode").val())){
            		$.toastrSuccess('商品编码只能填数字.');
            		return;
            	}
    			 $("#btn_search").addClass("disabled");
    			 goodsManager.isResetOffset = 1;
    			 $('#listTable').bootstrapTable('refresh');
    		}
	    }); 
    	//商品分类搜索按钮
    	$("#choose_search_goodsType").on("click",function () {
    		this.goodsTypeTreeDialog = new GoodsTypeTreeDialog();
    		this.goodsTypeTreeDialog.showGoodsTypeTreeDialog();
    	});
    	
    	//商品分类隐藏对话框  -确定后
    	$("#btn_goodsType_confirm").click(function(){
    		// 获取选中的节点
    		var checkArray = $('#goods_type_tree').treeview('getChecked');
    		if(checkArray.length != 1){
    			$.toastrWarning("请选择一个分类");
    			return;
    		}
    		var obj = checkArray[0];
    		$("#searchGoodsType").val(obj.id);
    		$("#searchGoodsTypeName").val(obj.text);
    		$.hideModal('#chooseGoodsTypeModal');
    	});
    	
    	//下拉选择改变刷新列表数据
    	$("#searchGoodsStatus").change(function() {
    		$('#listTable').bootstrapTable('refresh');
    	});
    	//下拉选择改变刷新列表数据
    	$("#searchGoodsMode").change(function() {
    		$('#listTable').bootstrapTable('refresh');
    	});
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsManager.searchListByPage();
    	goodsManager.queryCollectionDetailsByGoodsId();
		goodsManager.querySkuDetailsByGoods();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数
	var goodsCode = $("#goodsCode").val();
	//自定义查询参数
	var searchKeyword = $("#searchKeyword").val();
	// input框里的叉叉事件怎么捕获
	if($("#searchGoodsTypeName").val() == "")
		$("#searchGoodsType").val("");
	var searchGoodsType = $("#searchGoodsType").val();
	
	var searchGoodsStatus=$('#searchGoodsStatus').val();
	
	var searchGoodsMode=$('#searchGoodsMode').val();
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		goodsCode: goodsCode,//商品编码
		title: searchKeyword,//商品名称
		goodsType:searchGoodsType,//所属分类
		goodsMode:searchGoodsMode,//规格
		goodsStatus:searchGoodsStatus,//商品状态
		sort: params.sort,
		order: params.order
	};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams1 = function (params) {
	var temp = {goodsId:goodsManager.goodsId};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	//删除商品
	'click .delete_a': function (e, value, row, index) {
		goodsManager.deleteData(row.id);
	},
	//编辑
    'click .edit_a': function (e, value, row, index) {
    	myMain.getAllContent(goodsManager.URL.toAddViewUrl()+"?id="+row.id);
	},
	//上架、下架
    'click .update_goodsStatus': function (e, value, row, index) {
    	var newGoodsStatus;
    	var text;
    	if(row.goodsStatus == 0 || row.goodsStatus == 2){
    		newGoodsStatus = 1;
    		text = "上架";
    	}
    	else if(row.goodsStatus == 1){
    		newGoodsStatus = 2;
    		text = "下架";
    	}
    	goodsManager.updateGoodsStatus(row.id, newGoodsStatus, text);
	},
	//商品规格 0 单品 1 多规格商品 2 组合商品
	'click .goodsModeDetail_a': function (e, value, row, index) {
		if(row.goodsMode == 0)
			return;
		else if(row.goodsMode == 1){
			goodsManager.goodsId=row.id;
			$('#detailSkuTable').bootstrapTable('refresh');
			$.showModal('#detailSkuTableModal');
		}
		else if(row.goodsMode == 2){
			goodsManager.goodsId=row.id;
			$('#detailListTable').bootstrapTable('refresh');
			$.showModal('#detailListTableModal');
		}
	}
};

$(document).ready(function(){
	//1、初始化加载列表数据
	goodsManager.init();
	//2、初始化绑定增删改查事件
	goodsManager.bindEvent();
});
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//跳转列表页
    	initUrl: function () {
            return '/publicData/goodsOriginal/init';
        },
        //跳转新增页
        toAddViewUrl: function () {
            return '/publicData/goodsOriginal/toAddView';
        },
        //跳转批量导入原始商品界面
        goodsOriginalBatchImportInitUrl: function () {
            return '/publicData/goodsOriginal/goodsOriginalBatchImportInit';
        },
		//分页获取商品列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/goodsOriginal/list';
        },
        //增加商品的请求地址
        addUrl: function () {
        	return '/publicData/goodsOriginal/addData';
        },
        //修改商品的请求地址
        updateUrl: function () {
        	return '/publicData/goodsOriginal/updateData';
        },
        //删除商品的请求地址
        deleteUrl: function () {
            return '/publicData/goodsOriginal/deleteData';
        },
        //查询商品详情的请求地址
        queryDetailsUrl: function () {
        	return '/publicData/goodsOriginal/queryDetails';
        },
        //获取商品分类树目录
        goodsTypeTreeUrl: function () {
            return '/publicData/goodsType/goodsTypeTree';
        },
        //获取商品单位
        download: function () {
        	return '/publicData/goodsOriginal/download';
        }
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",							//	需要分页的table ID
    		url: goodsManager.URL.searchListByPageUrl(),	//	请求后台的URL（*）
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
    		},{
    			field: 'imgUrl',
    			title: '商品图片',
    			formatter:function(value,row,index){
    				var imgUrl = row.imgUrl;
    				if (imgUrl==null || imgUrl=="") {
    					imgUrl=$("#contextPath").val()+"/resources/img/noneImg.jpg";
    				}
       				return '<img width="50px;" height="50px;" src="' + imgUrl + '" alt="LOGO" class="logo-default"/>'
       		    }
    		}
    		,{
    			field: 'id', 
    			title: '商品编码',
    			formatter:function(value,row,index){
    				return "O_"+value;
    			}
    		},
    		{
    			field: 'goodsName', 
    			title: '商品名称'
    		}, {
    			field: 'typeName',
    			title: '所属分类'
    		}, {
    			field: 'unitDesc',
    			title: '商品单位'
    		}, {
    			field: 'goodsDesc',
    			title: '商品简介'
    		}, {
    			field: 'createTime',
    			title: '创建时间',
    		    align: 'center'
    		},{
    			field: 'OC',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_a" href="javascript:void(0)" >编辑</a>';
    	        		html += '<a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
    	        	
		            return html; 
    	        },
    	        events: 'operateEvents'
    	    }]
    	});
    },
    
    
    /**分页获取多规格商品详情列表**/
    
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
    
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
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
    	
    	//绑定展示原始商品导入界面事件
    	$("#btn_batch_import").click(function () {
    		myMain.getAllContent(goodsManager.URL.goodsOriginalBatchImportInitUrl());
	    });
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 goodsManager.isResetOffset = 1;
    			 $('#listTable').bootstrapTable('refresh');
    		}
	    }); 
    	//商品分类搜索按钮
    	$(".choose_search_goodsType").on("click",function () {
    		$('#chooseGoodsTypeModal').modal();
    		goodsManager.initGoodsTypeTree();
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
    		$('#chooseGoodsTypeModal').modal('hide');
    	});
    	//下载原始商品批量导入的excel模板
    	$("#btn_dow").click(function(){
    		window.location.href=$("#contextPath").val()+"/resources/js/business/publicData/goods/xlsx/originalGoodsImportModel.xlsx";
    	})
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数
	var searchKeyword = $("#searchKeyword").val();
	// input框里的叉叉事件怎么捕获
	if($("#searchGoodsTypeName").val() == "")
		$("#searchGoodsType").val("");
	var searchGoodsType = $("#searchGoodsType").val();
	
	var searchGoodsStatus=$('#searchGoodsStatus').val();
	var goodCode = $('#good_code').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		searchKeyword: searchKeyword,//商品名称
		searchType:searchGoodsType,//商品分类
		searchKey:goodCode,
		status:searchGoodsStatus,//商品状态
		sort: params.sort,
		order: params.order
	};
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
};

$(document).ready(function(){
	//1、初始化加载列表数据
	goodsManager.init();
	//2、初始化绑定增删改查事件
	goodsManager.bindEvent();
});
var skuManageManager = {
    // 是否重置分页偏移值0：否，1：是
    isResetOffset : 0,
    // 封装异步请求的所有ajax的URL地址
    URL : {
        // 跳转列表页
        initUrl : function() {
            return '';
        },
        // 分页获取出口单列表请求地址
        searchListByPageUrl : function() {
            return '/wms/skuManage/list';
        },
        deleteUrl : function() {
            return '/wms/skuManage/delete'
        },
        saveUpdateUrl : function() {
            return '/wms/skuManage/saveUpdate'
        },
    	searchGoodsListByPageUrl: function () {
            return '/wms/skuConfig/list';
        },
    	searchSupplierListByPageUrl: function () {
            return '/wms/skuManage/supplierList';
        },
        goodsTypeTreeUrl:function(){
        	return '/wms/skuManage/goodsTypeTree';
        },
        printSkuUrl:function(){
        	return '/wms/skuManage/printSku';
        }

    },
    /** 分页获拣货单列表* */
    searchListByPage : function() {
        // 分页组件
        $.pageTable({
                tableId : "#skuManageTable",// 需要分页的table ID
                url : skuManageManager.URL.searchListByPageUrl(),// 请求后台的URL（*）
                queryParams : queryParams,
                onLoadSuccess : function() {
                    skuManageManager.isResetOffset = 0;
                    $("#btn_skuManage_search").removeClass(
                        "disabled");
                },
                sortable : true,
                sortName : 'id',
                sortOrder : 'desc',
                columns : [
                    {
                    	checkbox:true
                    },
                    {
                        field : 'skuCode',
                        title : '商品编码'
                    },
                    {
                        field : 'skuName',
                        title : '商品名称'
                    },
                    {
                        field : 'supplierName',
                        title : '供应商'
                    },
                    {
                        field : 'warehouseName',
                        title : '仓库'
                    },
                    {
                        field : 'skuBarCode',
                        title : '条形码'
					}, 
					{
						field: 'created',
						title: '创建时间',
					    align: 'center',
						formatter:function(value,row,index){
							return skuManageManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
						}
					}
                ]

            });
    },
    format :  function(time, format){ 
		if(time != null && time !=''){
			var t = new Date(time); 
			var tf = function(i){return (i < 10 ? '0' : '') + i}; 
			return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){ 
				switch(a){ 
				case 'yyyy': 
				return tf(t.getFullYear()); 
				break; 
				case 'MM': 
				return tf(t.getMonth() + 1); 
				break; 
				case 'mm': 
				return tf(t.getMinutes()); 
				break; 
				case 'dd': 
				return tf(t.getDate()); 
				break; 
				case 'HH': 
				return tf(t.getHours()); 
				break; 
				case 'ss': 
				return tf(t.getSeconds()); 
				break; 
				}; 
			}));
		}
		return null;
	},
    validateform : function() {
        // 表单验证start
        $('#addSkuManageForm').bootstrapValidator({
            message : 'This value is not valid',
            feedbackIcons : {
                valid : 'glyphicon glyphicon-ok',
                invalid : 'glyphicon glyphicon-remove',
                validating : 'glyphicon glyphicon-refresh'
            },
            fields : {
                skuCode : {
                    validators : {
                        notEmpty : {
                            message : '商品编码不能为空！'
                        },
                    }
                },
                skuClassifyCode : {
                    validators : {
                        notEmpty : {
                            message : '商品分类不能为空！'
                        },
                    }
                },
                supplierCode : {
                    validators : {
                        notEmpty : {
                            message : '供应商编码不能为空！'
                        },
                    }
                },
            },
            excluded : [ ':disabled' ]
        });
        // 表单验证end
    },// 查询区域
    /**分页获取列表**/
    searchGoodsListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#skuGoodsList",//需要分页的table ID
    		url: skuManageManager.URL.searchGoodsListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsGoods,
    		onLoadSuccess:function(){
    			skuManageManager.isResetOffset = 0;
    			$("#btn_search_s").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'skuCode',
    			title: '商品编码'
    		}, {
    			field: 'skuName',
    			title: '商品名称',
    			align: 'center'
    		}
    		]
    	});
    },
    searchSupplierListByPage:function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#supplierList",//需要分页的table ID
    		url: skuManageManager.URL.searchSupplierListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsSupplier,
    		onLoadSuccess:function(){
    			skuManageManager.isResetOffset = 0;
    			$("#btn_search_s").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'supplierCode',
    			title: '供应商编码'
    		}, {
    			field: 'supplier',
    			title: '供应商名称',
    			align: 'center'
    		}
    		]
    	});
    },
    /**查：初始化商品分类，树形结构**/
    initGoodsTypeTree: function () {
		$.callAjax({
			url : skuManageManager.URL.goodsTypeTreeUrl(),
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
    //打印面单
    skuPrint:function (skuBarCode) {
        // 触发Ajax
        var params = "?skuBarCode=" + skuBarCode;
        var contextPath = $("#contextPath").val();
        // 请求打印
        var iWidth=720;                          //弹出窗口的宽度; 
        var iHeight=600;                         //弹出窗口的高度; 
        //获得窗口的垂直位置 
        var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
        //获得窗口的水平位置 
        var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
        window.open (contextPath + skuManageManager.URL.printSkuUrl()+params,'add','height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
    },
    bindEvent : function() {
        $(".glyphicon-remove").off().on('click',function () {
            $(this).parent().off();
            $(this).parent().prev().prev().val("");
        });
        // 绑定条件查询按钮事件
        $("#btn_skuManage_search").on("click", function() {
            skuManageManager.isResetOffset = 1;
            $('#skuManageTable').bootstrapTable('refresh');
        });
        // 绑定清空查询条件
        $("#btn_skuManage_clear").click(function() {
            $.clearForm("skuManageSearchForm");
        });
        //绑定键盘事件
        $(document).keydown(function (event) {
            if(event.keyCode==13){
                skuManageManager.isResetOffset = 1;
                $('#orderWavePickingTable').bootstrapTable('refresh');
            }
        });
        $("#btn_add_skuManage").click(function() {
            $.clearForm("skuManageSearchForm");
            $("#warehouseName").val(homepage.warehouseName);
            $("#myModalLabel03").html("新增条形码")
            $.showModal('#addSkuManage');
        });
        
    	$("#search_sku").click(function(){
    	   skuManageManager.searchGoodsListByPage();
 		   document.getElementById("goodsForm").reset();
 		   $('#skuGoodsList').bootstrapTable('refresh');
 		   $.showModal('#myModal08')
    	});
    	
    	$("#btn_search_goods").click(function(){
    		$('#skuGoodsList').bootstrapTable('refresh');
    	});
    	
		$("#btn_goods_reset").on("click", function() {
			 $.clearForm("goodsForm");
		});
		
    	//保存商品
    	$("#goods_save").click(function(){
    		  if($("#skuGoodsList").bootstrapTable('getSelections').length==1){
    				$.map($("#skuGoodsList").bootstrapTable('getSelections'), function(row) {
    					$('#skuCode').val(row.skuCode);
    					$('#skuName').val(row.skuName);
    					$("#skuCode").trigger("input");
    					$.hideModal('#myModal08');
    				});
    			}else{
    				$.toastrWarning("请选择一条数据进行操作！");
    			}
    		
    	});
    	
    	$("#search_supplier").click(function(){
     	   skuManageManager.searchSupplierListByPage();
  		   document.getElementById("supplierForm").reset();
  		   $('#supplierList').bootstrapTable('refresh');
  		   $.showModal('#myModal07');
     	});
    	
    	$("#btn_search_supplier").click(function(){
    		$('#supplierList').bootstrapTable('refresh');
    	});
    	
		$("#btn_supplier_reset").on("click", function() {
			 $.clearForm("supplierForm");
		});
    	
    	//保存供应商
    	$("#supplier_save").click(function(){
    		  if($("#supplierList").bootstrapTable('getSelections').length==1){
    				$.map($("#supplierList").bootstrapTable('getSelections'), function(row) {
    					$('#supplierCode').val(row.supplierCode);
    					$('#supplierName').val(row.supplier);
    					$("#supplierCode").trigger("input");
    					$.hideModal('#myModal07');
    				});
    			}else{
    				$.toastrWarning("请选择一条数据进行操作！");
    			}
    		
    	});
    	
    	$("#search_class").click(function(){
    		$('#chooseGoodsTypeModal').modal();
    		skuManageManager.initGoodsTypeTree();
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
    		$("#skuClassifyCode").val(obj.id);
    		$("#skuClassifyName").val(obj.text);
    		$("#skuClassifyCode").trigger("input");
    		$('#chooseGoodsTypeModal').modal('hide');
    	});
    	
        $("#saveskuManage").click(function() {
                var bootstrapValidator = $("#addSkuManageForm").data('bootstrapValidator');
                bootstrapValidator.validate();
                if (bootstrapValidator.isValid()){
                    var params = {
                        'skuCode' : $("#skuCode").val(),
                        'skuName' : $("#skuName").val(),
                        'skuClassifyCode' : $('#skuClassifyCode').val(),
                        'skuClassifyName' : $('#skuClassifyName').val(),
                        'supplierCode' : $('#supplierCode').val(),
                        'supplierName' : $('#supplierName').val(),
                        
                    }
                    $.callAjax({
                        type : "post",
                        url : skuManageManager.URL.saveUpdateUrl(),
                        data : params,
                        success : function(data) {
                            if (data.code != "0000") {
                                $.toastrWarning(data.msg);
                                return;
                            }
                            $.toastrSuccess(data.msg);
                            $.hideModal('#addSkuManage');
                            $('#skuManageTable').bootstrapTable('refresh');
                        },
                        error : function() {
                            $.toastrError();
                        }
                    })
                }
            else{
                    return;
                }

            });
        
        //打印生成条码
        $("#btn_generate_sku").on("click", function() {
            var skuBarCode = $.getIdSelections("#skuManageTable", "skuBarCode");
            if (skuBarCode == null || skuBarCode == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            skuManageManager.skuPrint(skuBarCode);
        });
    },
    // 初始化分页查询列表数据 ★★★分页主体列表★★★
    init : function() {

        skuManageManager.validateform();

        skuManageManager.searchListByPage();
    }
}

// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {
    var skuCodeSearch=$("#skuCodeSearch").val();
    var skuCodeSearch=$("#skuCodeSearch").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: skuManageManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        skuCode:skuCodeSearch
    };
    return temp;
};

var queryParamsGoods = function (params) {
	//自定义查询参数,昵称、公司名
	var skuCode=$('#skuCodeSer').val();
	var skuName=$('#skuNameSer').val();
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: skuManageManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		skuCode:skuCode,
		skuName:skuName,
		disabled:'0'
	};
	return temp;
};

var queryParamsSupplier = function (params) {
	//自定义查询参数,昵称、公司名
	var supplier=$('#searchSupplierName').val();
	var supplierCode=$('#searchSupplierCode').val();
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: skuManageManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		supplier:supplier,
		supplierCode:supplierCode,
		disabled:'0'
	};
	return temp;
};

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
    // 删除商品
    'click .delete_orderWavePicking' : function(e, value, row, index) {


        orderWavePickingManager.orderWavePickingdelete(row.id);
    },
    // 编辑
    'click .edit_orderWavePicking' : function(e, value, row, index) {
        orderWavePickingManager.editOrderWavePicking(row.id);
    }
};

$(document).ready(function() {
    // 1、初始化加载列表数据
    skuManageManager.init();
    // 2、初始化绑定增删改查事件
    skuManageManager.bindEvent();
});

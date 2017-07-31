var rowNo = 0;
var stoRandomMange = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	storageInNo: 'null',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页
    	searchListByPageUrl: function () {
            return '/wms/storageinRandom/list';
        },
        //分页查询详情
        getSearchDetailUrl: function () {
            return '/wms/storageinRandom/detailList';
        },
        //分页查询商品资料
    	searchGoodsListByPageUrl: function () {
            return '/wms/skuConfig/list';
        },
        //保存采购申请单
        saveUrl: function () {
        	return '/wms/storageinRandom/save';
        },//审批
        approveUrl: function () {
        	return '/wms/storageinRandom/approve';
        },//获取默认暂存库位
        /*getDefaultLocationUrl: function () {
        	return 'wms/warehouseLocation/list';
        },*///删除
        deleteStroUrl: function () {
        	return '/wms/storageinRandom/delete';
        },
        getStockBatchUrl: function () {
        	return '/wms/storageinRandom/getStockBatch';
        },//查看库位
        getWarehouseLocationUrl: function () {
            return '/wms/warehouseLocation/list';
        }
    },
    
    /**分页获取随机入库列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#storageRandomTable",//需要分页的table ID
    		url: stoRandomMange.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(row){
    			stoRandomMange.isResetOffset = 0;
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{
    			field: 'storageInNo',
    			title: '入库单号',
    			align: 'center',
				formatter:function(value,row,index){
					return '<a class="detail_a" href="javascript:void(0)">'+row.storageInNo+'</a>';
				},
				events: 'operateEvents'
    		},{
    			field: 'warehouseCode',
    			title: '仓库编码',
    			align: 'center'
    		},{
    			field: 'warehouseName',
    			title: '仓库名称',
    			align: 'center'
    		},{
    			field: 'auditor',
    			title: '审核人',
    			align: 'center'
    		},
    		{
    			field: 'status',
    			title: '状态',
    			align: 'center',
				formatter:function(value,row,index){
					var result;
				    switch(row.status){
					    case "NEW":result = "新建"; break;
					    case "FINISH":result = "完成"; break;
				    }
					return result;
				}
    		},{
    			field: 'created',
    			title: '创建时间',
    			align: 'center',
				formatter:function(value,row,index){
					return stoRandomMange.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		},{
    			field: 'creator',
    			title: '创建人',
    			align: 'center'
    		},{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html = '<a class="btn btn-danger btn-sm deleteStro_a" href="javascript:void(0)" >删除</a>';
    	            return html;
    	        },
    	        events: 'operateEvents'
    	    } 
    		]
    	});
    },
    
    /**分页获取列表**/
    searchGoodsListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#skuGoodsList",//需要分页的table ID
    		url: stoRandomMange.URL.searchGoodsListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsGoods,
    		onLoadSuccess:function(){
    			stoRandomMange.isResetOffset = 0;
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
    		},{
    			field: 'skuUnit',
    			title: '单位',
    			align: 'center'
    		}
    		]
    	});
    },
    //查询库位列表
	searchLocation :function(){
		$.pageTable({
    		tableId: "#warehouseLocationList",//需要分页的table ID
    		url: stoRandomMange.URL.getWarehouseLocationUrl(),//请求后台的URL（*）
    		queryParams:queryParamsLocation,
    		sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		onLoadSuccess:function(){
    			stoRandomMange.isResetOffset = 0;
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'locationCode',
    			title: '库位编码'
    		}, {
    			align: 'center',
    			field: 'locationName',
    			title: '库位名称'
    		}
    		]
    	});
	},
	//查询明细订单
	searchDetail :function(){
		$.pageTable({
    		tableId: "#detailTable",//需要分页的table ID
    		url: stoRandomMange.URL.getSearchDetailUrl(),//请求后台的URL（*）
    		queryParams:{storageInNo:stoRandomMange.storageInNo},
    		onLoadSuccess:function(){
    			stoRandomMange.isResetOffset = 0;
            },
    		columns: [{
    			field: 'skuCode',
    			title: '货品编码'
    		}, {
    			field: 'skuName',
    			title: '货品名称'
    		}, {
    			field: 'storageInLocation',
    			title: '库位编码'
    		}, {
    			field: 'storageInLocationName',
    			title: '库位名称'
    		}, {
    			field: 'skuState',
    			title: '货品状态' ,
				formatter:function(value,row,index){
					var result;
				    switch(row.skuState){
					    case "10":result = "良品"; break;
					    case "20":result = "残品"; break;
				    }
					return result;
				}
    		},{
    			field: 'skuQty',
    			title: '收货数量'
    		},{
    			field: 'unit',
    			title: '单位'
    		},{
    			field: 'skuProDate',
    			title: '生产日期',
    			formatter:function(value,row,index){
					return stoRandomMange.format(row.skuProDate,"yyyy/MM/dd");
				}
    		}, {
    			field: 'skuFailDate',
    			title: '失效日期',
				formatter:function(value,row,index){
					return stoRandomMange.format(row.skuFailDate,"yyyy/MM/dd");
				}	
    		}, {
    			field: 'skuStorageDate',
    			title: '入库日期',
    			formatter:function(value,row,index){
					return stoRandomMange.format(row.skuStorageDate,"yyyy/MM/dd");
				}
    		}, {
    			field: 'skuProBatchNo',
    			title: '生产批次号'
    		}, {
    			field: 'skuStockBatchNo',
    			title: '指定库存批次号'
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
  save: function () {
	  var storageRandoms = $("#submitTable").bootstrapTable('getData');
	  if(storageRandoms.length<=0){
		  $.toastrWarning("请先进行数据的添加再进行保存");
	  	  return false;
	  }
   		var params = {"storageRandoms":storageRandoms};
		  $.callAjax({
			  type:"post",
			  url : stoRandomMange.URL.saveUrl(),
			  data : params,
			  success : function(data){
				  if(data.code != "0000"){
					  $.toastrWarning(data.msg);
				  }else{
					  $.toastrSuccess('操作成功！');
					  $('#storageRandomTable').bootstrapTable('refresh');
					  $.hideModal('#myOperateModal');
					  $("#addAnchorForm")[0].reset();
					  stoRandomMange.searchLocation();
				  }
			  },
			  error : function(){
				  $.toastrError();
			  }
		  });
  },
  
  /*getDefaultLocation: function () {
		  $.callAjax({
			  type:"post",
			  url : stoRandomMange.URL.getDefaultLocationUrl(),
			  success : function(data){
				  if(data.code != "0000"){
					  $.toastrWarning(data.msg);
				  }else{
					  $("#storageInLocation").val(data.data.locationCode);
					  $("#storageInLocationName").val(data.data.locationName);
				  }
			  },
			  error : function(){
				  $.toastrError();
			  }
		  });
  },*/
  
  approve: function () {
	    var storageInNo = stoRandomMange.storageInNo;
 		var params = {"storageInNo":storageInNo};
	  	$.callAjax({
	  		type:"post",
	  		url : stoRandomMange.URL.approveUrl(),
	  		data : params,
	  		success : function(data){
	  			if(data.code != "0000"){
	  				$.toastrWarning(data.msg);
	  			}else{
	  			  $.toastrSuccess('审批成功！');
				  $('#storageRandomTable').bootstrapTable('refresh');
				  $.hideModal('#detailModal');
				  $("#addAnchorForm")[0].reset();
				  stoRandomMange.searchLocation();
	  			}
	  		},
	  		error : function(){
	  			$.toastrError();
	  		}
	  	});
	  },
    bindEvent: function () {
    	//打开新增页面
    	$("#btn_new").on('click',function(){
    		$("#addAnchorForm")[0].reset();
    		stoRandomMange.searchLocation();
    		$("#submitTable").bootstrapTable('removeAll');
    		$("#isMatch").trigger("change");
    		$.showModal('#myOperateModal');
    	});
    	
    	//查询
    	$("#btn_search").on('click',function() {
    		stoRandomMange.isResetOffset = 1;
    		$('#storageRandomTable').bootstrapTable('refresh');
    	});
    	//保存
    	$("#btn_save").on('click',function() {
    		stoRandomMange.save();
    	});
    	//审批
    	$("#btn_approve").on('click',function() {
    		stoRandomMange.approve();
    	});
    	//绑定清空随机入库列表查询条件事件
        $("#btn_clean").on('click',function(id) {
    		$.clearForm("searchForm");
    	});
        $("#btn_clear_goods").on('click',function(id) {
    		$.clearForm("skuCodeForm");
    	});
        //绑定清空库位查询条件事件
        /*$("#clear_search_location").on('click',function(id) {
    		$.clearForm("proForm");
    	});*/
        
        //绑定查询库位事件
        $("#warehouseQuery").click(function(){
    	   stoRandomMange.searchLocation();
    	   document.getElementById("proForm").reset();
    	   $('#warehouseLocationList').bootstrapTable('refresh');
    	   $.showModal('#myModal04');
        });
        //查询商品
        $("#btn_search_goods").click(function(){
        	$('#skuGoodsList').bootstrapTable('refresh');
        });
        //查询库位
        $("#btn_search_location").click(function(){
        	   $('#warehouseLocationList').bootstrapTable('refresh');
        });
        //保存商品
        $("#goods_save").click(function(){
        	  if($("#skuGoodsList").bootstrapTable('getSelections').length==1){
        			$.map($("#skuGoodsList").bootstrapTable('getSelections'), function(row) {
        				$('#skuCode').val(row.skuCode);
        				$('#skuName').val(row.skuName);
        				$('#unit').text(row.skuUnit);
        				$.hideModal('#myModal08');
        			});
        		}else{
        			$.toastrWarning("请选择一条数据进行操作！");
        		}
        });
        //指定批次库存的时候直接填充商品与货品状态等信息
        $("#skuStockBatchNo").blur(function(){
        	var skuStockBatchNo = $("#skuStockBatchNo").val();
        	//批次库存号不为空的时候才去查询
        	if(skuStockBatchNo==""){
        		return;
        	}
        	$.callAjax({
    	  		type:"post",
    	  		url : stoRandomMange.URL.getStockBatchUrl()+"?skuStockBatchNo="+skuStockBatchNo,
    	  		async: false,
    	  		success : function(data){
    	  			if(data.code != "0000"){
    	  				$.toastrWarning(data.msg);
    	  			}else{
    	  			   $("#skuCode").val(data.data.skuCode);
    	  			   $("#skuName").val(data.data.skuName);
    	  			   $("#unit").text(data.data.unit);
    	  			   $("#skuState").val(data.data.state);
    	  			}
    	  		},
    	  		error : function(){
    	  			$.toastrError();
    	  		}
    	  	});
        });
        
        //保存库位
        $("#location_save").click(function(){
        	  if($("#warehouseLocationList").bootstrapTable('getSelections').length==1){
        			$.map($("#warehouseLocationList").bootstrapTable('getSelections'), function(row) {
        				$('#storageInLocation').val(row.locationCode);
        				$('#storageInLocationName').val(row.locationName);
        				$.hideModal('#myModal04');
        			});
        		}else{
        			$.toastrWarning("请选择一条数据进行操作！");
        		}
        });
        $("#isMatch").change(function(){
        	var isMatch = $("#isMatch").val();
        	$("#skuCode").val("");
    		$("#skuName").val("");
        	if(isMatch==0){
        		$(".batchNo").addClass("isDisplay");
        		$(".record").removeClass("isDisplay");
        		$("#skuCodeQuery").removeAttr("disabled");
        		$("#skuState").removeAttr("disabled");  
        		$("#skuCodeQuery").css("cursor","pointer");
    			$("#skuCodeQuery").css("background-color","#fff");
    			//绑定查询商品事件
                $("#skuCodeQuery").click(function(){
                   stoRandomMange.searchGoodsListByPage();
             	   document.getElementById("skuCodeForm").reset();
             	   $('#skuGoodsList').bootstrapTable('refresh');
             	   $.showModal('#myModal08');
                });
        	}else{
        		$(".batchNo").removeClass("isDisplay");
        		$(".record").addClass("isDisplay");
        		$("#skuCodeQuery").attr("disabled","disabled");
        		$("#skuState").attr("disabled","disabled");
        		$("#skuCodeQuery").css("cursor","not-allowed");
    			$("#skuCodeQuery").css("background-color","#eee");
        		$("#skuProDate").val("");
        		$("#skuFailDate").val("");
        		$("#skuStorageDate").val("");
        		$("#skuProBatchNo").val("");
        		$("#skuCodeQuery").unbind("click");
        	}
        });
        $("#addToTable").click(function () {
        	
        	var isMatch = $("#isMatch").val();
        	var skuCode = $("#skuCode").val();
        	var skuStockBatchNo = $("#skuStockBatchNo").val();
        	if(isMatch==1 && (skuStockBatchNo==undefined || skuStockBatchNo=='')){
                	$.toastrWarning("请指定库存批次号！");
                	return false;
        	}
        	$("#skuStockBatchNo").trigger("blur");
        	if(isMatch==1 && (skuStockBatchNo !='' && skuCode=='')){
            	$.toastrWarning("您输入的库存批次号匹配不到相应的批次库存,请检查！");
            	return false;
        	}
        	//向table中添加数据
            var skuCode = $("#skuCode").val();
            var skuName = $("#skuName").val();
            if(skuName==undefined || skuName==''){
            	$.toastrWarning("请选择货品！");
            	return false;
            }
            var storageInLocationName = $("#storageInLocationName").val();
            if(storageInLocationName==undefined || storageInLocationName==''){
            	$.toastrWarning("请选择入库库位！");
            	return false;
            }
            var skuQty = $("#skuQty").val();
            if(skuQty==undefined || skuQty==''){
            	$.toastrWarning("请填写收货数量！");
            	return false;
            }
            var unit = $("#unit").text();
            if(unit==undefined || unit==''){
            	$.toastrWarning("该商品没有配置单位,请前往货品档案进行配置！");
            	return false;
            }
            
            var numberTest = /^([0-9]{1,9}.?[0-9]{0,2})$/;
        	if(skuQty!='' && !numberTest.test(skuQty)){
    			$.toastrWarning('收货数量只能输入数字且最多保留两位小数哦');
    			return false;
    		}
        	
        	/*if(isMatch==1 && skuStockBatchNo.indexOf(skuCode)==-1){
        		$.toastrWarning("指定批次库存号跟商品不匹配,请检查！");
            	return false;
        	}*/
        	var skuStorageDate = $("#skuStorageDate").val();
        	if(isMatch==0 && (skuStorageDate==undefined || skuStorageDate=='')){
        		$.toastrWarning("请填写入库日期！");
            	return false;
        	}
        	var skuState = $("#skuState").val();
        	if(skuState==undefined || skuState==''){
        		$.toastrWarning("请选择货品状态！");
            	return false;
        	}
            var storageInLocation = $("#storageInLocation").val();
            var skuStateName = $("#skuState").find("option:selected").text();
            var skuProDate = $("#skuProDate").val();
            var skuFailDate = $("#skuFailDate").val();
            var skuProBatchNo = $("#skuProBatchNo").val();
            var operate = '<a class="btn btn-danger btn-sm deleteGoods_a" href="javascript:void(0)" onclick="stoRandomMange.deleteRow(this)" >删除</a>';
            var submitTableValue = 
            		{ 
            		  rowNo:rowNo,
            		  skuCode:skuCode,
            		  skuName:skuName,
            		  storageInLocation:storageInLocation,
            		  storageInLocationName:storageInLocationName,
            		  skuQty:skuQty,
            		  unit:unit,
            		  skuState:skuState,
            		  skuStateName:skuStateName,
            		  skuProDate:skuProDate,
            		  skuFailDate:skuFailDate,
            		  skuStorageDate:skuStorageDate,
            		  skuProBatchNo:skuProBatchNo,
            		  skuStockBatchNo:skuStockBatchNo,
            		  operate:operate
            };
            var rows = new Array();
            rows.push(submitTableValue);
        	$("#submitTable").bootstrapTable('append', rows);
        	rowNo++;
            $("#submitTable").bootstrapTable('scrollTo', 'bottom');
            $("#addAnchorForm")[0].reset();
            $("#isMatch").trigger("change");
            stoRandomMange.searchLocation();
        });
    },
    initSubmitTable:function(){
    	$("#submitTable").bootstrapTable({
			 columns : [ [ {
				field : 'rowNo',
				visible : false
			}, {
				field : 'skuCode',
				title : '货品编码'
			}, {
				field : 'skuName',
				title : '货品名称'
			}, {
				field : 'storageInLocation',
				title : '库位编码'
			}, {
				field : 'storageInLocationName',
				title : '库位名称'
			}, {
				field : 'skuState',
				visible : false
			}, {
				field : 'skuStateName',
				title : '货品状态',
			}, {
				field : 'skuQty',
				title : '收货数量',
			}, {
				field : 'unit',
				title : '单位',
			}, {
				field : 'skuProDate',
				title : '生产日期',
			}, {
				field : 'skuFailDate',
				title : '失效日期',
			}, {
				field : 'skuStorageDate',
				title : '入库日期',
			}, {
				field : 'skuProBatchNo',
				title : '生产批次号',
			}, {
				field : 'skuStockBatchNo',
				title : '指定库存批次号',
			}, {
				field : 'operate',
				title : '操作',
			}
			] ]
       });
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	rowNo=0;
    	dateUtils.initDate();
    	//初始化日期下拉框
    	$(".form_datetime_month").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            minView:"month",
            language:  'zh-CN',
            pickerPosition: "bottom-left"
        });
    	
    	stoRandomMange.searchLocation();
    	stoRandomMange.searchListByPage();
    	stoRandomMange.initSubmitTable();
    },
    deleteRow:function(e){
    	var id = $(e).parent().parent().attr("data-uniqueid");
    	$("#submitTable").bootstrapTable('removeByUniqueId',id);
    },
    deleteStro:function(storageInNo){
	  	$.callAjax({
	  		type:"post",
	  		url : stoRandomMange.URL.deleteStroUrl(),
	  		data:{storageInNo:storageInNo},
	  		success : function(data){
	  			if(data.code != "0000"){
	  				$.toastrWarning(data.msg);
	  			}else{
	  			  $.toastrSuccess('删除成功！');
	  			  $('#storageRandomTable').bootstrapTable('refresh');
	  			}
	  		},
	  		error : function(){
	  			$.toastrError();
	  		}
	  	});
	  
    }
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
    'click .detail_a': function (e, value, row, index) {
    	$.showModal('#detailModal');
    	stoRandomMange.storageInNo = row.storageInNo;
    	$("#detailTable").bootstrapTable('destroy');
    	stoRandomMange.searchDetail();
    	if(row.status=='FINISH'){
    		$("#btn_div_detail").css("display","none");
    	}else{
    		$("#btn_div_detail").css("display","");
    	}
	},
	//删除
	'click .deleteStro_a': function (e, value, row, index) {
		stoRandomMange.deleteStro(row.storageInNo);
	}
};


//得到查询的参数          ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var storageInNo = $("#storageInNo").val();
	var status = $("#status").val();
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: stoRandomMange.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			storageInNo:storageInNo,
			status:status
	};
	
	temp = JSON.stringify(temp);
	return temp;
};
var queryParamsGoods = function (params) {
	//自定义查询参数,昵称、公司名
	var skuCode=$('#goodsCode').val();
	var skuName=$('#goodsName').val();
	var goodsMode=$('#goodsMode').val();
	var deliveryType=null;
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stoRandomMange.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		skuCode:skuCode,
		skuName:skuName,
		goodsMode:goodsMode,
	};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsLocation = function (params) {
	var locationCode=$('#warehouseLocationSerchCode').val();
	var locationName=$('#warehouseLocationSerchName').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: stoRandomMange.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			disabled:'0',
			locationCode:locationCode,
			locationName:locationName
		};
	return temp;
};


$(document).ready(function(){
	//1、初始化加载列表数据
	stoRandomMange.init();
	//2、初始化按钮事件
	stoRandomMange.bindEvent();
});
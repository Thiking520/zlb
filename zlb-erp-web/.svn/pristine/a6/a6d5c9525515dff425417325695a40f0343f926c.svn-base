//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var stockManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//库位库存查询表单分页偏移值
	isResetOffset_location:0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/stockmanage/listStockBatch';
        },
    	searchstockLocationListByPageUrl: function () {
            return '/wms/stockmanage/listStockLocation';
        },
        searchLocationUrl: function () {
        	 return '/wms/warehouseLocation/list';
        },
        generateMaterialProUrl: function () {
            return '/wms/materialManager/generateMaterialPro';
        },
        //分页查询商品资料
    	searchGoodsListByPageUrl: function () {
            return '/wms/skuConfig/list';
        },
        //生成盘点
        generatePhysicalUrl:function(){
        	 return '/wms/physical/generatePhysical';
        },
        //生成调整单
        generatePhysicalUrl:function(){
        	 return '/wms/physical/generatePhysical';
        },//生成调整单
        generateAdjustmentUrl:function(){
       	 return '/wms/stockmanage/generateAdjustment';
        }
        
    },
 
    /**分页获取批次库存列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#stockBatcManagerTable",//需要分页的table ID
    		url: stockManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			stockManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [ {
    			field: 'stockBatchNo',
    			title: '批次号'
    		}, {
    			field: 'skuCode',
    			title: '货品编码'
    		},{
    			field: 'skuName',
    			title: '货品名称',
    		    align: 'center'
    		}, {
    			field: 'qty',
    			title: '总数量'
    		}, {
    			field: 'allocationQty',
    			title: '分配数量',
    		    align: 'center'
    		}, {
    			field: 'state',
    			title: '库存状态',
				formatter:function(value,row,index){
					if(value=="10"){
						return "良品";
					}else if(value=="20"){
						return "<label style='color:red'>残品</label>";
					}
				}
    		}, {
    			field: 'proDate',
    			title: '生产日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockManager.format(row.proDate,"yyyy-MM-dd");
				}
    		},{
    			field: 'failDate',
    			title: '失效日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockManager.format(row.failDate,"yyyy-MM-dd");
				}
    		}, 
    		{
    			field: 'storageDate',
    			title: '入库日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockManager.format(row.storageDate,"yyyy-MM-dd");
				}
    		},
    		{
    			field: 'proBatchNo',
    			title: '生产批次号',
    		    align: 'center'
    		}/*,
    		{
    			field: 'warehouseCode',
    			title: '仓库编码',
    		    align: 'center'
    		},
    		{
    			field: 'warehouseName',
    			title: '仓库名称',
    		    align: 'center'
    		},
    		{
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		}*/
    		]
    	});
    },
    //查询库位库存
    searchStockLocation:function(){
    	//分页组件
    	$.pageTable({
    		tableId: "#stocklocationManagerTable",//需要分页的table ID
    		url: stockManager.URL.searchstockLocationListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryStockLocationParams,
    		onLoadSuccess:function(){
    			isResetOffset_location = 0;
    			$("#btn_search_location").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [ {
    			checkbox:true
    		},{
    			field: 'locationCode',
    			title: '库位编号'
    		}, {
    			field: 'stockBatchNo',
    			title: '库存批次号'
    		},
    		{
    			field: 'skuCode',
    			title: '货品编码',
    		    align: 'center'
    		},
    		{
    			field: 'skuName',
    			title: '货品名称',
    		    align: 'center'
    		}, {
    			field: 'qty',
    			title: '总数量'
    		}, {
    			field: 'allocationQty',
    			title: '分配数量',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	return value;
    		    }
    		}, {
    			field: 'state',
    			title: '库存状态',
				formatter:function(value,row,index){
					if(value=="10"){
						return "良品";
					}else if(value=="20"){
						return "<label style='color:red'>残品</label>";
					}
				}
    		}, {
    			field: 'stockUnit',
    			title: '单位',
    		    align: 'center'
			}, {
				field: 'proDate',
				title: '生产日期',
			    align: 'center',
				formatter:function(value,row,index){
					return stockManager.format(row.proDate,"yyyy-MM-dd");
				}
			},{
				field: 'failDate',
				title: '失效日期',
			    align: 'center',
				formatter:function(value,row,index){
					return stockManager.format(row.failDate,"yyyy-MM-dd");
				}
			}, 
			{
				field: 'storageDate',
				title: '入库日期',
			    align: 'center',
				formatter:function(value,row,index){
					return stockManager.format(row.storageDate,"yyyy-MM-dd");
				}
			},
    		{
    			field: 'operator',
    			title: '运营商',
    		    align: 'center'
    		}, 
    		 {
    			field: 'warehouseCode',
    			title: '仓库编码',
    		    align: 'center'
    		}, 
    		 {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
    			formatter:function(value,row,index){
					return stockManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		}
    		
    		]
    	});
    },
    /**
     *  生成原料转成品单
     */
    generateMaterialPro:function (){
    	var params={
    	    "mateProNo":$('#mateProNo').val(),
    		"mateCode":$('#mateCode').val(),
    		"mateDescrip":$('#mateDescrip').val(),
    		"matePro":$('#matePro').val(),
    		"mateStorage":$('#mateStorage').val(),
    		"mateFail":$('#mateFail').val(),
    		"mateState":$('#mateState').val(),
    		"locationCode":$('#locationCode').val(),
    		"qty":$('#qty').html(),
    		"preAllocationQty":$('#preAllocationQty').html(),
    		"allocationQty":$('#allocationQty').html(),
    		"mateQty":$('#mateQty').val(),
    		"mateUnit":$('#stockUnit').val(),
    		"proName":$('#proName').val(),
    		"proCode":$('#proCode').val(),
    		"proPro":$('#proPro').val(),
    		"proStorage":$('#proStorage').val(),
    		"proFail":$('#proFail').val(),
    		"proState":$('#proState').val(),
    		"locationRecommend":$('#locationRecommend').val(),
    		"proQty":$('#proQty').val(),
    	
    		"proUnit":$('#proUnit').val(),
    		"proBatchNo":$('#proBatchNo').val(),
    		"mateStockBatchNo":$('#stockBatchNos').val(),
    	}
    	$.callAjax({
			type:"post",
			url : stockManager.URL.generateMaterialProUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$.toastrSuccess("操作成功！");
         		$.hideModal("#myModal")
			},
			error : function(){
				$.toastrError();
			}
		});
     },
     /**分页获取列表**/
     searchGoodsListByPage: function () {
     	//分页组件
     	$.pageTable({
     		tableId: "#skuGoodsList",//需要分页的table ID
     		url: stockManager.URL.searchGoodsListByPageUrl(),//请求后台的URL（*）
     		queryParams:queryParamsGoods,
     		onLoadSuccess:function(){
     			stockManager.isResetOffset = 0;
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
     /**分页获取列表**/
     searchLocationListByPage: function () {
     	//分页组件
     	$.pageTable({
     		tableId: "#locationList",//需要分页的table ID
     		url: stockManager.URL.searchLocationUrl(),//请求后台的URL（*）
     		queryParams:queryParamsLocation,
     		onLoadSuccess:function(){
     			stockManager.isResetOffset = 0;
            },
     		columns: [{
     			radio: true
     		}, {
     			field: 'areaCode',
     			title: '库区编码'
     		}, {
     			field: 'areaName',
     			title: '库区名称',
     			align: 'center'
	 		}, {
	 			field: 'locationCode',
	 			title: '库位编码'
	 		}, {
	 			field: 'locationName',
	 			title: '库位名称',
	 			align: 'center'
	 		}
     		]
     	});
     },
	 bindEvent : function() {
		$("#btn_search").on("click", function() {
	  		  $("#btn_search").addClass("disabled");
	  		  stockManager.isResetOffset = 1;
			  $('#stockBatcManagerTable').bootstrapTable('refresh');
			  $("#btn_show_physical").hide();
			  $("#btn_show_mate").hide();
			  $("#btn_show_adjustment").hide();
			  $("#batch_div").show();
			  $("#location_div").hide();
		});
		
		$("#btn_search_location").click(function(){
			$("#btn_search_location").addClass("disabled");
			isResetOffset_location=1;
			$('#stocklocationManagerTable').bootstrapTable('refresh');
		    $("#btn_show_physical").show();
		    $("#btn_show_mate").show();
		    $("#btn_show_adjustment").show();
			$("#batch_div").hide();
			$("#location_div").show();
		});
		
		$("#btn_show_reset").on("click", function() {
			document.getElementById("searchform").reset();
		});
		
		$("#btn_recommend_reset").on("click", function() {
			document.getElementById("recommendForm").reset();
		});
		
		$("#btn_goods_reset").on("click", function() {
			document.getElementById("goodsForm").reset();
		});
		
    	$("#btn_show_mate").on("click",function () {
    		document.getElementById("addAnchorForm").reset();
    		if($("#stocklocationManagerTable").bootstrapTable('getSelections').length==1){
    			$.map($("#stocklocationManagerTable").bootstrapTable('getSelections'), function(row) {
    				//只有原料才能进行成品操作
    				if(row.skuClassify=="20"){
    					$.toastrWarning("只有原料才能进行成品操作");
    					return false;
    				}
    				$("#stockBatchNos").val(row.stockBatchNo);
    				$("#mateCode").val(row.skuCode);
					$("#mateDescrip").val(row.skuName);
					$("#matePro").val(stockManager.format(row.proDate,"yyyy-MM-dd"));
					$("#mateStorage").val(stockManager.format(row.failDate,"yyyy-MM-dd"));
					$("#mateFail").val(stockManager.format(row.storageDate,"yyyy-MM-dd"));
					$("#mateState option[value='"+row.mateState+"']").attr("selected",true);
					$("#mateState").val(row.state);
					$("#stockUnit option[value='"+row.stockUnit+"']").attr("selected",true);
					$("#stockUnit").val(row.stockUnit);
					$("#locationCode").val(row.locationCode);
					$("#qty").html(row.qty);
					$("#allocationQty").html(row.allocationQty);
					$("#preAllocationQty").html(row.qty-row.allocationQty);
					//默认选择状态/单位
					$("#proUnit").val('个');
					$("#proState").val(10);
					
		        	$.showModal("#myModal");
        		});
    
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
    	
    	$("#btn_save_submit").on("click", function() {
    			if($("#proCode").val() == "" || $("#proName").val() == ""){
    				$.toastrWarning("请选择商品信息");
    				return false;
    			}
    			
    			if($("#proStorage").val() == ""){
    				$.toastrWarning("请选择入库日期");
    				return false;
    			}
    		
    			if($("#locationRecommend").val() == ""){
    				$.toastrWarning("请选择推荐库位");
    				return false;
    			}
    			
    	    	var inputValue=document.getElementById("mateQty").value;
    	    	var inputValueFilter=/^[0-9]+([.]\d{1,2})?$/;
    	    	if(!inputValueFilter.test(inputValue)){
    	    	          $.toastrWarning("计划转为成品净重数,请输入数字！");
    	    	          return false;
    	    	}
    	    	
    	    	var maQty = $("#mateQty").val();
    			if($("#mateQty").val() == "" || parseFloat(maQty) <=0){
    				$.toastrWarning("请输入计划转为成品净重必须大于0");
    				return false;
    			}

    			
    	    	var inputValue=document.getElementById("proQty").value;
    	    	var inputValueFilter=/^[0-9]+([.]\d{1,2})?$/;
    	    	if(!inputValueFilter.test(inputValue)){
    	    	          $.toastrWarning("预计成品数量请输入数字！");
    	    	          return false;
    	    	}
    	    	
    	    	var prQty = $("#proQty").val();
    			if($("#proQty").val() == "" || parseFloat(prQty) <= 0){
    				$.toastrWarning("请输入预计成品数量必须大于0.");
    				return false;
    			}
    			
	        	var preAllocationQty = $("#preAllocationQty").html();
	    		var mateQty = $("#mateQty").val();
	    		if(parseFloat(preAllocationQty) < parseFloat(mateQty)){
	    			$.toastrWarning("不能超过可用库存数！");
	    		}else{
	    			stockManager.generateMaterialPro();
	    		}
		});
    	
    	$("#skuCodeQuery").click(function(){
    		   stockManager.searchGoodsListByPage();
    		   document.getElementById("goodsForm").reset();
    		   $('#skuGoodsList').bootstrapTable('refresh');
    		   $.showModal('#myModal08')
    	});

    	$("#btn_search_goods").click(function(){
    		$('#skuGoodsList').bootstrapTable('refresh');
    	});

    	//保存商品
    	$("#goods_save").click(function(){
    		  if($("#skuGoodsList").bootstrapTable('getSelections').length==1){
    				$.map($("#skuGoodsList").bootstrapTable('getSelections'), function(row) {
    					$('#proCode').val(row.skuCode);
    					$('#proName').val(row.skuName);
    					$.hideModal('#myModal08');
    				});
    			}else{
    				$.toastrWarning("请选择一条数据进行操作！");
    			}
    		
    	});
    	
    	
    	$("#recommendQuery").click(function(){
 		   stockManager.searchLocationListByPage();
 		   document.getElementById("recommendForm").reset();
 		   $('#locationList').bootstrapTable('refresh');
 		   $.showModal('#myModal09');
 		   
    	});

	 	$("#btn_search_recommend").click(function(){
	 		$('#locationList').bootstrapTable('refresh');
	 	});

	 	//保存商品
	 	$("#recommend_save").click(function(){
	 		  if($("#locationList").bootstrapTable('getSelections').length==1){
	 				$.map($("#locationList").bootstrapTable('getSelections'), function(row) {
	 					$('#locationRecommend').val(row.locationCode);
	 					$.hideModal('#myModal09');
	 				});
	 			}else{
	 				$.toastrWarning("请选择一条数据进行操作！");
	 			}
	 		
	 	});
 	
        //弹出生成盘点Model
        $("#btn_show_physical").click(function () {
            var id = $.getIdSelections("#stocklocationManagerTable", "id");
            if (id == null || id == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            $.showModal('#physicalModal');
        });
        
        //生成调整单Model
        $("#btn_show_adjustment").click(function () {
            var id = $.getIdSelections("#stocklocationManagerTable", "id");
            if (id == null || id == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            var ids = $.getIdSelections("#stocklocationManagerTable","id");
    		if(ids==null||ids==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		
        	$.dialogConfirm({
                message: '您确认生成调整操作吗？',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : stockManager.URL.generateAdjustmentUrl()+"?ids="+ids,
    			    		async: false,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				$.toastrWarning(data.msg);  
    			    			}else{
    			    				$.toastrSuccess('生成成功！');
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    		}
    			    	});
                    }
                }
             });
        });
        
        //生成盘点单确定按钮事件
        $("#physicalCreate").click(function () {
            var physical = $('#physical_div input:radio:checked').val();
            var locationCode = $.getIdSelections("#stocklocationManagerTable", "locationCode");
            var stockBatchNo = $.getIdSelections("#stocklocationManagerTable", "stockBatchNo");
            $.callAjax({
                type: "post",
                url: stockManager.URL.generatePhysicalUrl() + "?physicalMode=" + physical + "&locationCodes=" + locationCode+"&stockBatchNos="+stockBatchNo,
                async: false,
                success: function (data) {
                    var code = data.code;
                    if (code == "002") {
                        toastr['success'](data.msg);
                        $.hideModal("#physicalModal");
                    } else {
                        //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                        $.toastrSuccess(data.msg);
                        $.hideModal("#physicalModal");
                    }
                },
                error: function () {
                    $.toastrError();
                }
            });
        });
	},
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	$.fn.datetimepicker.dates['zh-CN'] = {  
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],  
                daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],  
                daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],  
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                today: "今天",  
                suffix: [],  
                meridiem: ["上午", "下午"]  
        };
        //初始化下拉框
        $(".form_datetime").datetimepicker({
        	minView: "month", //选择日期后，不会再跳转去选择时分秒 
        	language:  'zh-CN',  //中文显示
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        }).on('changeDate', function(e){
//        	if(e.currentTarget.firstElementChild.id == "proPro"){
//        		$("#proPro").trigger("input");
//        	}else if(e.currentTarget.firstElementChild.id == "proStorage"){
//        		$("#proStorage").trigger("input");
//        	}else if(e.currentTarget.firstElementChild.id =="proFail"){
//        		$("#proFail").trigger("input");
//        	}
        });
	    $("#btn_show_physical").hide();
	    $("#btn_show_mate").hide();
	    $("#btn_show_adjustment").hide();
		stockManager.searchListByPage();
		stockManager.searchStockLocation();
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
}


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var skuCode=$('#skuCode').val();
	var stockBatchNo=$('#stockBatchNo').val();
	var state=$('#state').val();
//	console.log(carNumber+"**"+driver+"**"+carType+"**"+enabled);
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		state: state,//状态
		skuCode:skuCode,
		stockBatchNo:stockBatchNo,
		sort: params.sort,
		order: params.order
	};
	return temp;
};

var queryStockLocationParams = function (params) {
	var skuCode=$('#skuCode').val();
	var stockBatchNo=$('#stockBatchNo').val();
	var state=$('#state').val();
//	console.log(carNumber+"**"+driver+"**"+carType+"**"+enabled);
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockManager.isResetOffset_location == 1 ? 0 : params.offset,  //分页偏移值
		state: state,//状态
		skuCode:skuCode,
		stockBatchNo:stockBatchNo,
		sort: params.sort,
		order: params.order
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
		offset: stockManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		skuCode:skuCode,
		skuName:skuName,
		skuClassify:'20',
		disabled:'0'
	};
	return temp;
};

var queryParamsLocation = function (params) {
	//自定义查询参数,昵称、公司名
	var LocationCode=$('#LocationCode').val();
	var LocationName=$('#LocationName').val();
	var areaCode=$('#areaCode').val();
	var areaName=$('#areaName').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		LocationCode:LocationCode,
		LocationName:LocationName,
		areaCode:areaCode,
		areaName:areaName,
		disabled:'0'
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .carsDetail_a': function (e, value, row, index) {
	    	alert("车辆明细");
	    },
		//删除
		'click .deleteCars_a': function (e, value, row, index) {
			alert("删除车辆");
			
		},
	    //编辑
	    'click .editCars_a': function (e, value, row, index) {
	    	alert("修改车辆");
		},
		
};

 

$(document).ready(function(){
	//1、初始化加载列表数据
	stockManager.init();
	//2、初始化绑定增删改查事件
	stockManager.bindEvent();
});
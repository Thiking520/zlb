//定义下拉框数组
var tradingTypeArray=[{'value':'10','text':'增加'},{'value':'20','text':'减少'}];
var tradingTypeList={};
var billTypeArray = [
	{'value':'10','text':'入库订单'},
	{'value':'20','text':'出库订单'},
	{'value':'30','text':'上架作业单'},
	{'value':'40','text':'移库作业单'},
	{'value':'50','text':'库存调整单'}
	];
var billTypeList={};
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var stockAdjustment = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//库位库存查询表单分页偏移值
	isResetOffset_location:0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/stockAdjustment/list';
    	},
    	searchDetailListByPageUrl:function(){
    		 return '/wms/stockAdjustmentDetail/list';
    	},
    	addAdjustmentDetailUrl:function(){
    		 return '/wms/stockAdjustmentDetail/updateAjustmentDetail';
    	},
    	confirmStockAdjustmentUrl:function(){
    		 return '/wms/stockAdjustment/confirmStockAdjustment';
    	}
    },
    initDropDownBox :function(){
//    	for(var i=0;i<tradingTypeArray.length;i++){
//    		tradingTypeList[tradingTypeArray[i].value] = tradingTypeArray[i].text;
//    	}
//    	for(var i=0;i<billTypeArray.length;i++){
//    		billTypeList[billTypeArray[i].value] = billTypeArray[i].text;
//    	}
    },
    /**分页获取批次库存列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#stockAdjustmentManagerTable",//需要分页的table ID
    		url: stockAdjustment.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			stockAdjustment.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [ {
    			radio: true
    		},{
    			field: 'adjustmentNo',
    			title: '调整单号',
      			formatter:function(value,row,index){
					return '<a class="adjustmentRow" href="javascript:void(0)" adjustmentNo="' + row.adjustmentNo +'">' + row.adjustmentNo + '</a>';
    			},
    			events: 'operateEvents'
    		}, {
    			field: 'adjustmentType',
    			title: '调整类型',
    			formatter:function(value,row,index){
					if(value == "10"){
						return "盘点调整";
					}else{
						return "手动调整";
					}
    			}
    		}, {
    			field: 'sourceNo',
    			title: '来源单号'
    		},{
    			field: 'state',
    			title: '状态',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(value == "10"){
    		    		return "新建";
    		    	}else if(value == "20"){
    		    		return "已完成";
    		    	}else if(value == "30"){
    		    		return "调整中";
    		    	}
    		    }
    		}, {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockAdjustment.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		},{
    			field: 'descrip',
    			title: '备注',
    		    align: 'center',
    		}/*, {
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'

    		}, {
    			field: 'modifier',
    			title: '修改人',
    		    align: 'center'
    		}*/
    		]
    	});
    },
    /**分页获取盘点明细列表**/
    searchDetailListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#stockAdjustmentDetailManagerTable",//需要分页的table ID
    		url: stockAdjustment.URL.searchDetailListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryDetailParams,
			toolbarAlign:'right',
    		onLoadSuccess:function(data){
    			$("#stockAdjustmentDetailManagerTable tr").eq("1").find("td").trigger("click");
    			stockAdjustment.isResetOffset = 0;
    			if(data.rows.length>0){
    				stockAdjustment.setAdjustmentTableValue(data.rows[0]);	
    			}
            },
            onClickRow:function(row,$element){
            	stockAdjustment.setAdjustmentTableValue(row);
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'skuCode',
    			title: '货品编码'
    		}, {
    			field: 'skuName',
    			title: '商品名称'
    		},{
    			field: 'locationCode',
    			title: '库位编码'
    		}, {
    			field: 'agoAdjustQty',
    			title: '前库存数量'
    		}, {
    			field: 'afterAdjustQty',
    			title: '后库存数量'
    		}, 
    		{
    			field: 'agoAdjustState',
    			title: '前库存状态',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(value == "10"){
    		    		return "良品";
    		    	}else if(value == "20"){
    		    		return "残品";
    		    	}
    		    }
    		},
    		{           
    			field: 'atferAdjustState',
    			title: '后库存状态',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(value == "10"){
    		    		return "良品";
    		    	}else if(value == "20"){
    		    		return "残品";
    		    	}
    		    }
    		},
    		{
    			field: 'agoAdjustPro',
    			title: '前生产日期',
    		    align: 'center',
    			formatter:function(value,row,index){
					return stockAdjustment.format(row.agoAdjustPro,"yyyy-MM-dd");
				}
    		},
    		{                 
    			field: 'atferAdjustPro',
    			title: '后生产日期',
    		    align: 'center',
				formatter:function(value,row,index){  
					return stockAdjustment.format(row.atferAdjustPro,"yyyy-MM-dd");
				}
    		},
    		{
    			field: 'agoAdjustIn',
    			title: '前入库日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockAdjustment.format(row.agoAdjustIn,"yyyy-MM-dd");
				}
    		},
    		{
    			field: 'atferAdjustIn',
    			title: '后入库日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockAdjustment.format(row.atferAdjustIn,"yyyy-MM-dd");
				}
    		},
    		{
    			field: 'agoAdjustLose',
    			title: '前失效日期',
				formatter:function(value,row,index){
					return stockAdjustment.format(row.agoAdjustLose,"yyyy-MM-dd");
				}
    		},
    		{
    			field: 'atferAdjustLose',
    			title: '后失效日期',
				formatter:function(value,row,index){
					return stockAdjustment.format(row.atferAdjustLose,"yyyy-MM-dd");
				}
    		},
    		{
    			field: 'agoAdjustSupplier',
    			title: '前供应商',
    		    align: 'center'
    		},
    		{
    			field: 'atferAdjustSupplier',
    			title: '后供应商',
    		    align: 'center'
    		},
    		{
    			field: 'agoAdjustBatchNo',
    			title: '前生产批次号',
    		    align: 'center'
    		},
    		{
    			field: 'atferAdjustBatchNo',
    			title: '后生产批次号',
    		    align: 'center'
    		},
    		{
    			field: 'agoStockBatchNo',
    			title: '前库存批次号',
    		    align: 'center'
    		},
    		{
    			field: 'atferStockBatchNo',
    			title: '后库存批次号',
    		    align: 'center'
    		},
	    	{
				field: 'creator',
				title: '创建人',
			    align: 'center'
			}, {
				field: 'created',
				title: '创建时间',
			    align: 'center',
				formatter:function(value,row,index){
					return stockAdjustment.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
			}
    		]
    	});
    },
    //添加调整单明细
    addAdjustmentDetail:function(){
		var params={
				'id':$("#rowId").val(),
    			'afterAdjustQty':$('#afterAdjustQty').val(),
    			'atferAdjustState':$('#atferAdjustState').val(),
    			'atferAdjustPro':$('#atferAdjustPro').val(),
    			'atferAdjustIn':$('#atferAdjustIn').val(),
    			'atferAdjustLose':$('#atferAdjustLose').val(),
    			'atferAdjustSupplier':$('#atferAdjustSupplier').val(),
    			'atferAdjustBatchNo':$('#atferAdjustBatchNo').val(),
    			'adjustmentNo':$('#adjustmentNoAdd').val(),
    			'agoStockBatchNo':$('#agoStockBatchNo').val(),
    			'skuCode':$('#skuCode').val(),
    		}
    		
    		$.callAjax({
    			type:"post",
    			url : stockAdjustment.URL.addAdjustmentDetailUrl(),
    			data : params,
    			async: false,
    			success : function(data){
             		if(data.code != "0000"){
             			$.toastrWarning(data.msg);
             			//填充dialog
             	    	//显示dialog
             			return;
             		}
             		$('#stockAdjustmentDetailManagerTable').bootstrapTable("refresh");
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
		
	}, //盘点调整确认
	confirmAdjustment:function(adjustmentNo){
		var params={
			 "adjustmentNo":$('#adjustmentNoAdd').val(),	
		}
     	$.callAjax({
 			type:"post",
 			url : stockAdjustment.URL.confirmStockAdjustmentUrl(),
 			data : params,
 			async: false,
 			success : function(data){
          		if(data.code != "0000"){
          			$.toastrWarning(data.msg);
          			//填充dialog
          	    	//显示dialog
          			return;
          		}
          		
          		$('#stockAdjustmentManagerTable').bootstrapTable('refresh');
          		$.toastrSuccess("操作成功！");
          		$.hideModal("#myModal");
          		
 			},
 			error : function(){
 				$.toastrError();
 			}
 		});
	},
    setAdjustmentTableValue:function(row){
		$("#skuCode").val(row.skuCode);
		$("#skuName").val(row.skuName);
		$("#locationCode").val(row.locationCode);
      	$("#agoAdjustQty").val(row.agoAdjustQty);
		$("#agoAdjustState").val(row.agoAdjustState);
		$("#agoAdjustIn").val(stockAdjustment.format(row.agoAdjustIn,"yyyy-MM-dd"));
      	$("#agoAdjustPro").val(stockAdjustment.format(row.agoAdjustPro,"yyyy-MM-dd"));
      	$("#agoAdjustLose").val(stockAdjustment.format(row.agoAdjustLose,"yyyy-MM-dd"));
      	$("#agoAdjustSupplier").val(row.agoAdjustSupplier);
     	$("#agoAdjustBatchNo").val(row.agoAdjustBatchNo);
     	$("#agoStockBatchNo").val(row.agoStockBatchNo);
      	
      	$("#afterAdjustQty").val(row.afterAdjustQty);
      	if($("#adjustmentType").val() == "10"){
          	$("#atferAdjustState").val(row.atferAdjustState);
      	}
      	$("#atferAdjustIn").val(stockAdjustment.format(row.atferAdjustIn,"yyyy-MM-dd"));
      	$("#atferAdjustPro").val(stockAdjustment.format(row.atferAdjustPro,"yyyy-MM-dd"));
      	$("#atferAdjustLose").val(stockAdjustment.format(row.atferAdjustLose,"yyyy-MM-dd"));
      	$("#atferAdjustSupplier").val(row.atferAdjustSupplier);
      	$("#atferAdjustBatchNo").val(row.atferAdjustBatchNo);
    	$("#atferStockBatchNo").val(row.atferStockBatchNo);
     },
	 bindEvent : function() {
		$("#btn_search").on("click", function() {
	  		  $("#btn_search").addClass("disabled");
	  		  stockAdjustment.isResetOffset = 1;
			  $('#stockAdjustmentManagerTable').bootstrapTable('refresh');
			
		});
		
		$("#btn_show_reset").on("click", function() {
			document.getElementById("searchform").reset();
		});
		
		$("#btn_show_add").on("click", function() {
			$('#addAnchorForm').bootstrapValidator('resetForm', true);
    		if($("#stockAdjustmentManagerTable").bootstrapTable('getSelections').length==1){
    			$.map($("#stockAdjustmentManagerTable").bootstrapTable('getSelections'), function(row) {
	    				if(row.state == "20"){
							$.toastrWarning("调整单必须为新建状态或调整中！");
							return false;
						}
    					$("#myModalLabel").text("调整操作");
    					$("#adjustmentNoAdd").val(row.adjustmentNo);
    					$("#descrip").val(row.descrip);
    					$('#adjustmentType').attr("disabled",true);
    					$('#agoAdjustState').attr("disabled",true);
    					$("#adjustmentType").val(row.adjustmentType);
    					if(row.adjustmentType == "10"){
        				    $("#proTime span").hide();
        				    $("#storageTime span").hide();
        				    $("#failTime span").hide();
        				    $("#storageTime span").hide();
        				    $("#modelAdjust").hide();
        					$("#adjustmentType").attr("disabled",false);
        					$("#btn_save_submit").hide();
        					$("#btn_save_confirm").show();
        					stockAdjustment.disableForm('addAnchorForm',true);
    					}else{
    						$('#atferAdjustState').val(10);
          				    $("#proTime span").show();
          				    $("#storageTime span").show();
          				    $("#failTime span").show();
          				    $("#storageTime span").show();
        					$("#btn_save_submit").show();
        					$("#btn_save_confirm").show();
          				    stockAdjustment.disableForm('addAnchorForm',false);
          					$('#agoAdjustState').attr("disabled",true);
          					$("#adjustmentType").attr("disabled",true);
    					}
    					$('#stockAdjustmentDetailManagerTable').bootstrapTable("destroy");
    					stockAdjustment.searchDetailListByPage();
    					$.showModal("#myModal");
        		});
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
		});
		
		//绑定键盘事件
    	$(document).keydown(function (event) {
    		if(event.keyCode==13){
    			stockPhysical.isResetOffset = 1;
    			 $('#stockAdjustmentManagerTable').bootstrapTable('refresh');
    		}
	    });
    	
		$("#btn_save_submit").on("click", function() {
			 stockAdjustment.addAdjustmentDetail();
			 //stockAdjustment.searchDetailListByPage();
			 $('#stockAdjustmentManagerTable').bootstrapTable('refresh');
		});
		
		$("#btn_save_confirm").on("click", function() {
			var adjustmentType=$('#adjustmentType').val();//调整单号
			
			stockAdjustment.confirmAdjustment();
		});
		
	},
    /**
	 * 失效表单里面的控件
	 * @param formId
	 * @param isDisabled
	 */
	disableForm : function (formId,isDisabled) {    
	    var attr="disable";    
	    if(!isDisabled){    
	       attr="enable";    
	    }    
	    $("form[id='"+formId+"'] :text").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] textarea").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] select").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] :radio").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] :checkbox").attr("disabled",isDisabled);    
	},
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
        //初始化下拉框
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
        })
        
		stockAdjustment.searchListByPage();
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
var queryDetailParams = function (params) {
	var adjustmentNo=$('#adjustmentNoAdd').val();//交易流水
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockAdjustment.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		adjustmentNo: adjustmentNo
	};
	return temp;
};


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var adjustmentNo=$('#adjustmentNo').val();//调整单号
	var adjustmentType=$('#adjustmentTypeSerch').val();//调整类型
	
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockAdjustment.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		adjustmentNo:adjustmentNo,
		adjustmentType:adjustmentType
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .adjustmentRow': function (e, value, row, index) {
	    	$("#myModalLabel").text("调整操作");
			$("#adjustmentNoAdd").val(row.adjustmentNo);
			$("#adjustmentType").val(row.adjustmentType);
			$("#descrip").val(row.descrip);
			$('#atferAdjustState').val(10);
    		$("#btn_save_submit").hide();
			$("#proTime span").hide();
			$("#storageTime span").hide();
			$("#failTime span").hide();
			$("#storageTime span").hide();
			$("#btn_save_confirm").hide();
			stockAdjustment.disableForm('addAnchorForm', true);
			$('#stockAdjustmentDetailManagerTable').bootstrapTable("destroy");
			stockAdjustment.searchDetailListByPage();
			$.showModal("#myModal");
	    },
		//删除
		'click .deleteCars_a': function (e, value, row, index) {
			alert("删除车辆");
		}
};

$(document).ready(function(){
	//1、初始化加载列表数据
	stockAdjustment.init();
	//2、初始化绑定增删改查事件
	stockAdjustment.bindEvent();
});
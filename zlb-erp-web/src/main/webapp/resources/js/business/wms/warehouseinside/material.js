//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var materialManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//库位库存查询表单分页偏移值
	isResetOffset_location:0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/materialManager/listMaterial';
        },
    	//查询库存
        queryLocationStocksUrl: function () {
            return '/wms/materialManager/queryLocationStocks';
        },
        materialPlusReduceUrl: function () {
            return '/wms/materialManager/materialPlusReduce';
        },
        //作废
        confirmMateProNoUrl: function () {
            return '/wms/materialManager/confirmMateProNo';
        },//原料打印
        printMaterUrl:function(){
        	 return '/wms/materialManager/print/printMaterial';
        }
        
    },
 
    /**分页获取原材料转成品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#materialManagerTable",//需要分页的table ID
    		url: materialManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			materialManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [ {
    			radio: true
    		},{
    			field: 'mateProNo',
    			title: '原料转成品单单号',
      			formatter:function(value,row,index){
					return '<a class="mateProNoRow" href="javascript:void(0)" mateProNo="' + row.mateProNo +'">' + row.mateProNo + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'state',
    			title: '状态',
    			formatter:function(value,row,index){
    				if(value==10){
    					return '新建';
    				}else if(value==20){
    					return '已完成';
    				}else if(value==30){
    					return '作废';
    				}
    			}
    		},{
    			field: 'mateCode',
    			title: '原料货品编码',
    		    align: 'center'
    		}, {
    			field: 'mateDescrip',
    			title: '原料货品名称'
    		},/* {
    			field: 'locationCode',
    			title: '原料库位编号',
    		    align: 'center'
    		},*/ {
    			field: 'mateQty',
    			title: '计划转成品净重',
    			align: 'center'
     		}, {
    			field: 'mateUnit',
    			title: '原料单位',
    			align: 'center',
    		},/* {
    			field: 'mateStorage',
    			title: '原料入库日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return materialManager.format(row.mateStorage,"yyyy-MM-dd");
				}
    		}, */{
    			field: 'matePro',
    			title: '原料生产日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return materialManager.format(row.matePro,"yyyy-MM-dd");
				}
    		}, {
    			field: 'mateFail',
    			title: '原料失效日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return materialManager.format(row.mateFail,"yyyy-MM-dd");
				}
    		}, {
    			field: 'proCode',
    			title: '成品货品编码',
    			align: 'center'
    		}, {
    			field: 'proName',
    			title: '成品名称',
    			align: 'center'
    		}, {
    			field: 'proQty',
    			title: '预计成品数量',
    			align: 'center'
    		}/*,{
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'
    		},{
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return materialManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		},{
    			field: 'modifier',
    			title: '修改人',
    		    align: 'center'
    		},{
    			field: 'modified',
    			title: '修改时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return materialManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		}*/
    		]
    	});
    },
    /**
     *  查询仓库原料库存
     */
    queryLocationStocks:function (mateStockBatchNo,mateClassify,locationCode){
    	var params={
    		"stockBatchNo":mateStockBatchNo,
    		"skuClassify":mateClassify,
    		"locationCode":locationCode
    	}
    	$.callAjax({
			type:"post",
			url : materialManager.URL.queryLocationStocksUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
        		$("#qty").html(data.data.rows[0].qty);  //总净重
				$("#allocationQty").html(data.data.rows[0].allocationQty);  //已分配
				$("#preAllocationQty").html(data.data.rows[0].qty - data.data.rows[0].allocationQty);  //可用数
         		$('#materialManagerTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**
     *  确认原料转成品,加减库存
     */
    materialPlusReduce:function (){
    	var params={
    	    "mateProNo":$('#mateProNos').val(),	
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
    		"mateStockBatchNo":$('#mateStockBatchNos').val(),
    	}
    	$.callAjax({
			type:"post",
			url : materialManager.URL.materialPlusReduceUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		
         		$('#materialManagerTable').bootstrapTable('refresh');
         		$.hideModal("#myModal")
         		$.toastrSuccess("操作成功！");
         		
			},
			error : function(){
				$.toastrError();
			}
		});
     },
 	 // 批量打印原料单
 	 materListBillPrint : function(mateProNos) {
 		// 触发Ajax
 		var params = "?mateProNos=" + mateProNos;
 		var contextPath = $("#contextPath").val();
 		// 请求打印
 		window.open(contextPath + materialManager.URL.printMaterUrl()+ params);
 		
 	 },
     confirmMateProNo:function (mateProNos){
     	$.callAjax({
 			type:"post",
 			url : materialManager.URL.confirmMateProNoUrl()+"?mateProNos="+mateProNos,
 			success : function(data){
          		if(data.code != "0000"){
          			$.toastrWarning(data.msg);
          			//填充dialog
          	    	//显示dialog
          			return;
          		}
          		
          		$('#materialManagerTable').bootstrapTable('refresh');
          		$.toastrSuccess("操作成功！");
          		
 			},
 			error : function(){
 				$.toastrError();
 			}
 		});
      },
	 bindEvent : function() {
		$("#btn_search").on("click", function() {
			  $('#materialManagerTable').bootstrapTable('refresh');
		});
		
		$("#btn_search_location").click(function(){
			$("#btn_search_location").addClass("disabled");
			isResetOffset_location=1;
			 $('#stocklocationManagerTable').bootstrapTable('refresh');
			
			$("#batch_div").hide();
			$("#location_div").show();
		});
		
    	$("#btn_clean").on("click",function () {
    		$.clearForm("searchform");
    	});
    	
    	//作废操作
		$("#btn_show_nullify").on("click", function() {
			var mateProNos = $.getIdSelections("#materialManagerTable", "mateProNo");
			if (mateProNos == null || mateProNos == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}
			$.dialogConfirm({
			    message: '您确认要作废吗？',
			    callback: function(result) {
			        if(result){
			        	materialManager.confirmMateProNo(mateProNos);
			        }
			    }
			});
		});
		
		$("#btn_show_print").on("click", function() {
			var mateProNos = $.getIdSelections("#materialManagerTable", "mateProNo");
			if (mateProNos == null || mateProNos == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}
			
			materialManager.materListBillPrint(mateProNos);
 
		});
		
    	$("#btn_show_mate").on("click",function () {
    		if($("#materialManagerTable").bootstrapTable('getSelections').length==1){
    			$.map($("#materialManagerTable").bootstrapTable('getSelections'), function(row) {
    				if(row.state != "10"){
    					$.toastrWarning("原料转成品单"+row.mateProNo+"状态必须为新建！");
    				}else{
    					$("#mateCode").val(row.mateCode);
						$("#mateDescrip").val(row.mateDescrip);
						$("#matePro").val(materialManager.format(row.matePro,"yyyy-MM-dd"));
						$("#mateStorage").val(materialManager.format(row.mateStorage,"yyyy-MM-dd"));
						$("#mateFail").val(materialManager.format(row.mateFail,"yyyy-MM-dd"));
						$("#mateState option[value='"+row.mateState+"']").attr("selected",true);
						$("#mateState").val(row.mateState);
						$("#mateUnit option[value='"+row.mateUnit+"']").attr("selected",true);
						$("#mateUnit").val(row.mateUnit);
						$("#locationCode").val(row.locationCode);
						$("#proBatchNo").val(row.proBatchNo);
						$("#mateQty").val(row.mateQty);
						$("#proCode").val(row.proCode);
						$("#proName").val(row.proName);
						$("#proPro").val(materialManager.format(row.proPro,"yyyy-MM-dd"));
						$("#proStorage").val(materialManager.format(row.proStorage,"yyyy-MM-dd"));
						$("#proFail").val(materialManager.format(row.proFail,"yyyy-MM-dd"));
						$("#proUnit option[value='"+row.proUnit+"']").attr("selected",true);
						$("#proUnit").val(row.proUnit);
						$("#proState option[value='"+row.proState+"']").attr("selected",true);
						$("#proState").val(row.proState);
						$("#locationRecommend").val(row.locationRecommend);
						$("#proQty").val(row.proQty);
						$("#mateStockBatchNos").val(row.mateStockBatchNo);
					    $('#mateProNos').val(row.mateProNo);
						materialManager.queryLocationStocks(row.mateStockBatchNo,row.mateClassify,row.locationCode);
					    materialManager.disableForm('addAnchorForm',true);
					    
					    $("#proTime").hide();
					    $("#storageTime").hide();
					    $("#failTime").hide();
					    $("#btn_save_submit").hide();
					    $("#btn_save_submit").show();
		    		    $("#btn_edit_submit").hide();
		        		$.showModal("#myModal");
    				}
        		});
    
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    		
	
    	});
    	
    	$("#btn_save_submit").on("click",function () {
    		materialManager.materialPlusReduce();
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
    	//初始化日期控件
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
        });
        
		materialManager.searchListByPage();
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
	var mateProNo=$('#mateProNo').val();
	var creator=$('#creator').val();
	var expectDateTimeStart=$('#expectDateTimeStart').val();
	var expectDateTimeEnd=$('#expectDateTimeEnd').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: materialManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		mateProNo: mateProNo,//状态
		creator:creator,
		expectDateTimeStart:expectDateTimeStart,
		expectDateTimeEnd:expectDateTimeEnd,
		sort: params.sort,
		order: params.order
	};
	return temp;
};

var queryStockLocationParams = function (params) {
	var skuCode=$('#skuCode').val();
	var stockBatchNo=$('#stockBatchNo').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: materialManager.isResetOffset_location == 1 ? 0 : params.offset,  //分页偏移值
		state: state,//状态
		skuCode:skuCode,
		stockBatchNo:stockBatchNo,
		sort: params.sort,
		order: params.order
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .mateProNoRow': function (e, value, row, index) {
		    	$("#mateCode").val(row.mateCode);
				$("#mateDescrip").val(row.mateDescrip);
				$("#matePro").val(materialManager.format(row.matePro,"yyyy-MM-dd"));
				$("#mateStorage").val(materialManager.format(row.mateStorage,"yyyy-MM-dd"));
				$("#mateFail").val(materialManager.format(row.mateFail,"yyyy-MM-dd"));
				$("#mateState option[value='"+row.mateState+"']").attr("selected",true);
				$("#mateState").val(row.mateState);
				$("#mateUnit option[value='"+row.mateUnit+"']").attr("selected",true);
				$("#mateUnit").val(row.mateUnit);
				$("#locationCode").val(row.locationCode);
				$("#proBatchNo").val(row.proBatchNo);
				$("#mateQty").val(row.mateQty);
				$("#proCode").val(row.proCode);
				$("#proName").val(row.proName);
				$("#proPro").val(materialManager.format(row.proPro,"yyyy-MM-dd"));
				$("#proStorage").val(materialManager.format(row.proStorage,"yyyy-MM-dd"));
				$("#proFail").val(materialManager.format(row.proFail,"yyyy-MM-dd"));
				$("#proUnit option[value='"+row.proUnit+"']").attr("selected",true);
				$("#proUnit").val(row.proUnit);
				$("#proState option[value='"+row.proState+"']").attr("selected",true);
				$("#proState").val(row.proState);
				$("#locationRecommend").val(row.locationRecommend);
				$("#proQty").val(row.proQty);
				$("#mateStockBatchNos").val(row.mateStockBatchNo);
			    $('#mateProNos').val(row.mateProNo);
			    $("#proTime").hide();
			    $("#storageTime").hide();
			    $("#failTime").hide();
			    materialManager.disableForm('addAnchorForm',true);
			    $("#btn_save_submit").hide();
			    $.showModal("#myModal");
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
	materialManager.init();
	//2、初始化绑定增删改查事件
	materialManager.bindEvent();
});
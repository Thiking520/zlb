
var purchaseManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	purchaseId: '',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取采购建议列表请求地址
    	searchListByPageUrl: function () {
            return '/purchase/list';
        },
        searchGoodsByPageUrl: function () {
            return '/purchase/goods';
        },
        getPurchaseDetailUrl: function () {
        	return '/purchase/detail';
        },
        startPurchaseUrl: function () {
        	return '/purchase/start';
        },
        changePurchaseUrl: function () {
        	return '/purchase/change';
        },
        printPurchaseUrl: function () {
            return '/purchase/print/printPurchase';
        },//要货单打印
        printPurchaseRequireUrl: function () {
            return '/purchase/print/printPurchaseRequire';
        }
    },
    /**分页获取采购建议列表**/
    searchListByPage: function () {
//    	debugger;
    	//分页组件
    	$.pageTable({
    		tableId: "#purchaseManageTable",//需要分页的table ID
    		url: purchaseManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			purchaseManage.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{
    			field: 'purchaseCode',
    			title: '采购单号',
    			align: 'center',
				formatter:function(value,row,index){
					return '<a class="purchaseDetail_a" href="javascript:void(0)" id="' + row.id +'">' + row.purchaseCode + '</a>';
    			},
    			events: 'operateEvents'
    		},
    		{
    			field: 'applyTime',
    			title: '采购申请时间',
    			align: 'center',
				formatter:function(value,row,index){
					return purchaseManage.format(row.applyTime,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
      			field: 'purchaseBegined',
    			title: '采购发起时间',
    			align: 'center',
				formatter:function(value,row,index){
					return purchaseManage.format(row.purchaseBegined,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
    			field: 'supplier',
    			title: '供应商',
    			align: 'center'
    		},
    		{
    			field: 'purchaseAmount',
    			title: '采购金额',
    			align: 'center'
    		},
    		{
    			field: 'purchaser',
    			title: '采购人',
    			align: 'center',
    		},
    		{
    			field: 'auditor',
    			title: '审批经理',
    			align: 'center',
    		},
    		{
    			field: 'purchaseState', 
    			title: '采购单状态',
    			align: 'center',
    			formatter:function(value,row,index){
    				var result = "";
    				switch(row.purchaseState){
	    				case "NEW":result = "待采购";break;
	    				case "SUB":result = "发起采购";break;
	    				case "CLO":result = "采购完成";break;
	    				case "PAR":result = "部分入库";break;
	    				default :result = "待采购";break;
    				}
    				return result;
				}
    		},
    		{
      			field: 'completeTime',
    			title: '完成时间',
    			align: 'center',
				formatter:function(value,row,index){
					return purchaseManage.format(row.completeTime,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
      			field: 'receiver',
    			title: '收货人',
    			align: 'center',
    		}, 
    		{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){ 
    	        	var html='<a class="btn btn-primary btn-sm print_purchase" href="javascript:void(0)" >打印采购单据</a>';
    	        	   html+='<a class="btn btn-primary btn-sm print_purchaseRequire" href="javascript:void(0)" >打印要货单据</a>';
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    }
    		]
    	});
    },
    
    showGoodsList: function (datas) {
    	
    	$("#purchaseGoodsTable").bootstrapTable({
		data:datas,
		columns: [{field: 'goodsName',title: '商品名称',align: 'center'},
				  {field: 'goodsCode',title: '商品编码',align: 'center'},  
				  {field: 'goodsType',title: '商品类型',align: 'center'},
				  {field: 'goodsUnit',title: '单位',align: 'center'},  
				  {field: 'goodsPrice',title: '单价',align: 'center'},
				  {field: 'goodsNumber',title: '采购数量',align: 'center'}, 
				  {field: 'goodsAmount',title: '金额小计',align: 'center'}
				]
    	});
    },
  
    getPurchaseDetail: function (id){
    	
    	purchaseManage.purchaseId=id;
    	var params = {"id":id}
    	
    	$.callAjax({
		type:"post",
		url : purchaseManage.URL.getPurchaseDetailUrl(),
		data : params,
		success : function(data){
				if(data.code != "0000"){
					$.toastrWarning(data.msg);
				}else{
					var purchase = data.data;
					$('#purchaser').text(purchase.purchaser);                                             		//	采购申请人
					$('#auditor').text(purchase.auditor);														//	采购审批人
					$('#applyTime').text(purchaseManage.format(purchase.applyTime,"yyyy-MM-dd HH:mm:ss"));				//	采购申请时间
					$('#requestTime').text(purchaseManage.format(purchase.requestTime,"yyyy-MM-dd HH:mm"));			//	要求到货时间
					$('#purchaseBeginer').text(purchase.purchaseBeginer);                                             //  采购发起人
					if(purchase.purchaseBegined!=null && purchase.purchaseBegined!=''){
						$('#purchaseBegined').text(purchaseManage.format(purchase.purchaseBegined,"yyyy-MM-dd HH:mm:ss"));         //  采购发起时间	
					}
					
					$('#receiver').text(purchase.receiver);														//  收货人
					if(purchase.completeTime!=null)
						$('#completeTime').text(purchaseManage.format(purchase.completeTime,"yyyy-MM-dd HH:mm:ss"));         //  收货完成时间
					$('#supplier').text(purchase.supplier);    
					$('#purchaseAmount').text(purchase.purchaseAmount);    
					
    				var purchaseState = "";
    				switch(purchase.purchaseState){
	    				case "NEW":purchaseState = "待采购";break;
	    				case "SUB":purchaseState = "发起采购";break;
	    				case "CLO":purchaseState = "完成采购";break;
	    				case "PAR":purchaseState = "部分入库";break;
	    				default :purchaseState = "待采购";break;
    				}
					//  供应商
					$('#purchaseState').text(purchaseState);  
					//  采购单状态
			    	$("#purchaseGoodsTable").bootstrapTable('load',purchase.goodsList);
					$("#purchaseGoodsTable").bootstrapTable('hideLoading');//去掉商品列表的正在加载提示
					
					$.showModal('#editModal');
					if(purchase.purchaseState !='NEW'){
						$("#btn_start").css("display","none");
						$("#btn_change").css("display","none");
					}else{
						$("#btn_start").css("display","");
						$("#btn_change").css("display","");
					}
				}
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    startPurchase: function (){
    	var params = {"id":purchaseManage.purchaseId}
//    	debugger;
    	$.callAjax({
		type:"post",
		url : purchaseManage.URL.startPurchaseUrl(),
		data : params,
		success : function(data){
				if(data.code != "0000"){
					$.toastrWarning(data.msg);
				}else{
					$.toastrSuccess('操作成功！');
					$('#purchaseManageTable').bootstrapTable('refresh');
				}
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    
    changePurchase: function (id){
    	var params = {"id":id}
    	$.callAjax({
		type:"post",
		url : purchaseManage.URL.changePurchaseUrl(),
		data : params,
		success : function(data){
				if(data.code != "0000"){
					$.toastrWarning(data.msg);
				}else{
					$.toastrSuccess('操作成功！');
				}
			},
			error : function(){
				$.toastrError();
			}
		});
    },
	// 批量打印面单
	purchaseListBillPrint : function(ids) {
		// 触发Ajax
		var params = "?ids=" + ids;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + purchaseManage.URL.printPurchaseUrl()+ params);
		
	},
	purchaseListRequirePrint : function(ids) {
		// 触发Ajax
		var params = "?ids=" + ids;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + purchaseManage.URL.printPurchaseRequireUrl()+ params);
	},
    bindEvent: function () {
    	
    	//打开新增页面
    	$("#btn_search").on('click',function() {
    		$("#btn_search").addClass("disabled");
    		purchaseManage.isResetOffset = 1;
    		$('#purchaseManageTable').bootstrapTable('refresh');
    	});
    	
    	$("#btn_start").on('click',function() {
    		purchaseManage.startPurchase();
    	});
    	
    	//绑定键盘事件
    	$(document).keydown(function (event) {
    		if(event.keyCode==13){
    			purchaseManage.isResetOffset = 1;
    			 $('#purchaseManageTable').bootstrapTable('refresh');
    		}
	    });
    	
    	$("#btn_change").on('click',function() {
    		$.showModal('#editModal');
    	});
    	
    	$("#btn_print").on('click',function(id) {
			purchaseManage.purchaseListBillPrint($("#id_value").val()); 
    	});
    	
    	$("#btn_pring_require").on('click',function(id) {
			purchaseManage.purchaseListRequirePrint($("#id_value").val()); 
    	});
    	
    	$("#btn_clean").on('click',function(id) {
    		$.clearForm("searchForm");
    	});
    	
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	//初始化下拉框
        $(".form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii:ss",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });
        
    	purchaseManage.searchListByPage();
    	purchaseManage.showGoodsList();
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

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .purchaseDetail_a': function (e, value, row, index) {
	    	$("#id_value").val(row.id);
	    	purchaseManage.getPurchaseDetail(row.id);	
	    },
	    'click .print_purchase': function (e, value, row, index) {
	    	purchaseManage.purchaseListBillPrint(row.id); 
	    },
	    'click .print_purchaseRequire': function (e, value, row, index) {
	    	purchaseManage.purchaseListRequirePrint(row.id); 
	    }
	
};

//得到查询的参数          ★★★分页表单查询参数★★★
var queryParams = function (params) {
	
	var purchaseState = $("#purchaseState_s").val();
	var purchaser = $("#purchaser_s").val();
	var auditor = $("#auditor_s").val();
	var purchaseCode = $("#ordercode_s").val();
	
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: purchaseManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			purchaseState:purchaseState,
			purchaser:purchaser,
			auditor:auditor,
			purchaseCode:purchaseCode
	};
	
	purchaseManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	purchaseManage.init();
	//2、初始化按钮事件
	purchaseManage.bindEvent();
});
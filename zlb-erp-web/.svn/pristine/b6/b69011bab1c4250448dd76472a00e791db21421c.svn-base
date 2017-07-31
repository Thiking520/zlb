
var returnManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	returnId: 'null',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取采购退货列表请求地址
    	searchListByPageUrl: function () {
            return '/return/audit/list';
        },
        searchGoodsByPageUrl: function () {
            return '/return/goods';
        },
        approveReturnUrl: function () {
        	return '/return/approve';
        },
        rejectReturnUrl: function () {
        	return '/return/reject';
        },
        cancelReturnUrl: function () {
        	return '/return/cancel';
        }
    },
    /**分页获取采购退货列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#returnManageTable",//需要分页的table ID
    		url: returnManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			returnManage.isResetOffset = 0;
//    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{
    			field: 'returnCode',
    			title: '退货单号',
    			align: 'center',
				formatter:function(value,row,index){
					
					return '<a class="detail_a" href="javascript:void(0)">'+row.returnCode+'</a>';
				},
				events: 'operateEvents'
    		},
    		{
    			field: 'created',
    			title: '申请时间',
    			align: 'center',
				formatter:function(value,row,index){
					return returnManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
      			field: 'returnAmount',
    			title: '退货金额',
    			align: 'center'
    		},
    		{
    			field: 'creator',
    			title: '申请人',
    			align: 'center'
    		},
    		{
    			field: 'returnState',
    			title: '退货单状态',
    			align: 'center',
				formatter:function(value,row,index){
					var result;
				    switch(row.returnState){
					    case "NEW":result = "新建"; break;
					    case "SUB":result = "待审批"; break;
					    case "APP":result = "审批通过"; break;
					    case "REJ":result = "驳回"; break;
					    case "CAN":result = "作废"; break;
					    case "CLO":result = "退货完成 "; break;
				    }
					return result;
				}
    		}
    		]
    	});
    },
    
    searchReturnGoodsList: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#returnGoodsTable",//需要分页的table ID
    		url: returnManage.URL.searchGoodsByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams1,
    		onLoadSuccess:function(){
    			returnManage.isResetOffset = 0;
    		},
    		sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{
    			checkbox: true
    		},
    		{field: 'goodsCode',title: '商品编码',align: 'center'},  
			{field: 'goodsName',title: '商品名称',align: 'center'},
			{field: 'goodsType',title: '规格',align: 'center'},
			{field: 'purchaseCode',title: '采购单号',align: 'center'},
			{field: 'supplier',title: '供应商',align: 'center'},  
			{field: 'goodsNumber',title: '采购数量',align: 'center'},
			{field: 'returnNumber',title: '退货数量',align: 'center'},
			{field: 'returnAmount',title: '退货金额',align: 'center'},
			{field: 'remark',title: '退货原因',align: 'center'}
			]
    	});
    },
  
    refreshGoodsPage:function(){
    	$('#returnGoodsTable').bootstrapTable('refresh');
    },
    
	approveReturn: function () {
		  $.dialogConfirm({
			  message: '您确定要审批通过此采购申请吗?',
			  callback: function(result) {
				  if(result) {
					  var params = {"id":returnManage.returnId};
					  $.callAjax({
						  url : returnManage.URL.approveReturnUrl(),
						  data : params,
						  success : function(data){
							  $.toastrSuccess('审批通过！');
							  $('#returnGoodsTable').bootstrapTable('refresh');
							  $('#returnManageTable').bootstrapTable('refresh');
						  }
					  });
				  }
			  }
		  });
	  },
	  
	  rejectReturn: function () {
		  $.dialogConfirm({
			  message: '您确定要驳回此采购申请吗?',
			  callback: function(result) {
				  if(result) {
					  var params = {"id":returnManage.returnId};
					  $.callAjax({
						  url : returnManage.URL.rejectReturnUrl(),
						  data : params,
						  success : function(data){
							  $.toastrSuccess('驳回成功！');
							  $('#returnGoodsTable').bootstrapTable('refresh');
							  $('#returnManageTable').bootstrapTable('refresh');
						  }
					  });
				  }
			  }
		  });
	  },
    
    bindEvent: function () {
    	
    	$("#btn_search").on('click',function() {
    		purchaseManage.isResetOffset = 1;
    		$('#returnManageTable').bootstrapTable('refresh');
    	});
    	
    	$("#btn_new").on('click',function() {
    		$.showModal('#editModal');
    	});
    	
    	$("#btn_approve").on('click',function() {
    		returnManage.approveReturn();
    	});
    	
    	$("#btn_reject").on('click',function() {
    		returnManage.rejectReturn();
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
        
    	returnManage.searchListByPage();
    	returnManage.searchReturnGoodsList();
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

    'click .detail_a': function (e, value, row, index) {
    	$.showModal('#editModal');
    	returnManage.returnId = row.id;
    	returnManage.searchReturnGoodsList();
    	$('#returnGoodsTable').bootstrapTable('refresh');
    	var showOrHide = "inline";
    	if (row.returnState=="REJ" ||
    				row.returnState=="APP" ||
    					row.returnState=="CLO" ||
    					row.returnState=="CAN" ||
    					row.returnState=="NEW") {
    		showOrHide="none";
    	}
		$("#btn_approve").css("display",showOrHide);
		$("#btn_reject").css("display",showOrHide);
    	setTimeout("returnManage.refreshGoodsPage()",300);
	}
};

//得到查询的参数          ★★★分页表单查询参数★★★
var queryParams = function (params) {
	
	var returnState = $("#returnState").val();
	debugger;
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: returnManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			returnState:returnState
	};
	
//	returnManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

var queryParams1 = function (params) {
	
	var returnState = $("#returnState").val();
	
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: returnManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
					sort: params.sort,
					order: params.order,
					returnId:returnManage.returnId
	};
	
	temp = JSON.stringify(temp);
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	returnManage.init();
	//2、初始化按钮事件
	returnManage.bindEvent();
});
//定义下拉框数组
var tradingTypeArray=[{'value':'10','text':'增加'},{'value':'20','text':'减少'},{'value':'90','text':'库存调整-盘盈'},{'value':'91','text':'库存调整-盘亏'}];
var tradingTypeList={};
var billTypeArray = [
	{'value':'10','text':'入库订单'},
	{'value':'20','text':'出库订单'},
	{'value':'30','text':'上架作业单'},
	{'value':'40','text':'移库作业单'},
	{'value':'50','text':'库存调整单'},
	{'value':'60','text':'原料转成品单'},
	{'value':'80','text':'库存盘点单'}
	];
var billTypeList={};
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var stockTrading = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//库位库存查询表单分页偏移值
	isResetOffset_location:0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/stockTrading/listStockTrading';
        }
    	
    },
    initDropDownBox :function(){
    	for(var i=0;i<tradingTypeArray.length;i++){
    		tradingTypeList[tradingTypeArray[i].value] = tradingTypeArray[i].text;
    	}
    	for(var i=0;i<billTypeArray.length;i++){
    		billTypeList[billTypeArray[i].value] = billTypeArray[i].text;
    	}
    },
    /**分页获取批次库存列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#stockTradingManagerTable",//需要分页的table ID
    		url: stockTrading.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			stockTrading.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [ {
    			field: 'tradingNo',
    			title: '交易编号',
				formatter:function (value,row,index) {
					return '<a class="trading" href="javascript:void(0)">'+value+'</a>';
                },
                events: 'operateEvents'
            }, {
    			field: 'tradingType',
    			title: '交易类型',
    			formatter:function(value,row,index){
					return tradingTypeList[value];
    			}
    		},{
    			field: 'billType',
    			title: '单证类型',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	return billTypeList[value];
    		    }
    		}, {
    			field: 'billsNo',
    			title: '业务单据号'
    		}, {
    			field: 'dealState',
    			title: '交易状态',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	return "已完成";
    		    }
    		}, 
    		{
    			field: 'skuCode',
    			title: '货品编码',
    		    align: 'center'
    		},
    		{
    			field: 'batchNo',
    			title: ' 库存批次号',
    		    align: 'center'
    		},
    		{
    			field: 'locationCode',
    			title: ' 库位编码',
    		    align: 'center'
    		},
    		{
    			field: 'oldQty',
    			title: ' 库存变化前数量',
    		    align: 'center'
    		},
    		{
    			field: 'qty',
    			title: ' 增加(减少)数量',
    		    align: 'center'
    		}/*,
    		
    		{
    			field: 'warehouseCode',
    			title: '仓库编码',
    		    align: 'center'
    		},
    		{
    			field: 'operatorName',
    			title: '运营商',
    		    align: 'center'
    		},
    		{
    			field: 'operat',
    			title: '操作人',
    		    align: 'center'
    		}*/
    		]
    	});
    },
    
	 bindEvent : function() {
		$("#btn_search").on("click", function() {
	  		  $("#btn_search").addClass("disabled");
	  		  stockTrading.isResetOffset = 1;
			  $('#stockTradingManagerTable').bootstrapTable('refresh');
			
		});
		
		$("#btn_show_reset").on("click", function() {
			document.getElementById("searchform").reset();
		});
		
	},
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	stockTrading.initDropDownBox();
		stockTrading.searchListByPage();
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
	var tradingNo=$('#tradingNo').val();//交易流水
	var billsNo=$('#billsNo').val();//单据号
	var tradingType=$('#tradingType').val();//单证类型（增加，减少）
	var billType=$('#billType').val();//交易类型
//	console.log(carNumber+"**"+driver+"**"+carType+"**"+enabled);
	
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockTrading.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		tradingNo: tradingNo,
		billsNo:billsNo,
		tradingType:tradingType,
		billType:billType
	};
	return temp;
};


//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
    'click .trading': function (e, value, row, index) {
        $("#tradingNo1").val(row.tradingNo);
        $(billTypeArray).each(function () {
			if(row.billType==this.value){
                $("#billType1").val(this.text);
			}
        })
        $(tradingTypeArray).each(function () {
            if(row.tradingType==this.value){
                $("#tradingType1").val(this.text);
            }
        })
        $("#billsNo1").val(row.billsNo);
        $("#dealState1").val(row.dealState==10?'已完成':'未完成');
        $("#skuCode1").val(row.skuCode);
        $("#batchNo1").val(row.batchNo);
        $("#locationCode1").val(row.locationCode);
        $("#oldQty1").val(row.oldQty);
        $("#qty1").val(row.qty);
        $("#fromModal02").find("input").each(function () {
			$(this).attr("readonly","readonly");
			$(this).css("margin-top"," 5px");
            $(this).css("align","right");
        })
        $("#fromModal02").find("label").each(function () {
            $(this).css("margin-top","5px");
            $(this).addClass("text-right");
            $(this).width(120);
        })
        $.showModal('#stockTradingModel');
    }

};

$(document).ready(function(){
	//1、初始化加载列表数据
	stockTrading.init();
	//2、初始化绑定增删改查事件
	stockTrading.bindEvent();
});
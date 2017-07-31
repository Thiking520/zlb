var rowNo = 0;
var outLookMange = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页
    	searchListByPageUrl: function () {
            return '';
        }
    },
    
    /**分页获取随机入库列表**/
    searchListByPage: function () {
    	var estIntitle = "<table class='table table-bordered'>" +
			 "<tr>" +
			 "<td width='100%' colspan='4'>采购在途</td>" +
			 "</tr>" +
			 "<tr>" +
			 "<td width='30%'>采购在途</td>" +
			 "<td width='30%'>调拨在途</td>" +
			 "<td width='20%'>销售换货在途</td>" +
			 "<td width='20%'>销售换货在途</td>" +
			 "</tr>" +
			 "</table>";
    	var estOuttitle = "<table class='table table-bordered'>" +
		 "<tr>" +
		 "<td width='100%' colspan='4'>预计出</td>" +
		 "</tr>" +
		 "<tr>" +
		 "<td width='30%'>销售待发货</td>" +
		 "<td width='30%'>调拨待出库</td>" +
		 "<td width='20%'>销售换货待出库</td>" +
		 "<td width='20%'>采购待退货</td>" +
		 "</tr>" +
		 "</table>";
    	//分页组件
    	$.pageTable({
    		tableId: "#outLookTable",//需要分页的table ID
    		url: outLookMange.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(row){
    			outLookMange.isResetOffset = 0;
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{
    			title: '序号',
    			align: 'center',
    			formatter: function (value, row, index) {  
                    return index+1;  
                }
    		},{
    			field: 'skuCode',
    			title: '商品编码',
    			align: 'center'
    		},{
    			field: 'skuName',
    			title: '商品名称',
    			align: 'center'
    		},{
    			field: 'spec',
    			title: '规格',
    			align: 'center'
    		},{
    			field: 'model',
    			title: '型号',
    			align: 'center' 
    		},{
    			field: 'unit',
    			title: '单位',
    			align: 'center' 
    		},{
    			field: 'stokNumber',
    			title: '现存量',
    			align: 'center' 
    		},{
    			field: 'estIntitle',
    			title: estIntitle,
    			align: 'center',
				formatter: function (value, row, index) {  
					var res = "";
					res = "<table class='table table-bordered table-hover table-striped ordertable'>";
					var estIns = data.estIns;
					for(var i=0;i<estIns.length;i++){
						res = res + "<tr><td></td>";
						res = res + "<td width='30%'>"+estIns[i].pmsingNumber+"</td>" +
								    "<td width='10%'>"+estIns[i].allottingNumber+"</td>" +
								    "<td width='20%'>"+estIns[i].changingNumber+"</td>" +
								    "<td width='20%'>"+estIns[i].refundingNumber+"</td>";
						res = res + "</tr>";
					}
					res = res + "</table>";
					return res;
                }	
    		},{
    			field: 'estOuttitle',
    			title: estOuttitle,
    			align: 'center',
				formatter: function (value, row, index) {  
					var res = "";
					res = "<table class='table table-bordered table-hover table-striped ordertable'>";
					var estOuts = data.estOuts;
					for(var i=0;i<estOuttitles.length;i++){
						res = res + "<tr><td></td>";
						res = res + "<td width='30%'>"+estOuts[i].saleWNumber+"</td>" +
								    "<td width='20%'>"+estOuts[i].allottWNumber+"</td>" +
								    "<td width='10%'>"+estOuts[i].changWNumber+"</td>" +
								    "<td width='20%'>"+estOuts[i].refundWNumber+"</td>";
						res = res + "</tr>";
					}
					res = res + "</table>";
					return res;
                }	
    		},{
    			field: 'estimateNumber',
    			title: '预计库存数量',
    			align: 'center' 
    		},{
    			field: 'frozenNumber',
    			title: '冻结库存',
    			align: 'center' 
    		},{
    			field: 'safetyNumber',
    			title: '安全库存',
    			align: 'center' 
    		},{
    			field: 'remainNumber',
    			title: '可用量',
    			align: 'center' 
    		}]
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
    	outLookMange.searchListByPage();
    },
}



//得到查询的参数          ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var storageInNo = $("#storageInNo").val();
	var status = $("#status").val();
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: outLookMange.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			storageInNo:storageInNo,
			status:status
	};
	
	temp = JSON.stringify(temp);
	return temp;
};


$(document).ready(function(){
	//1、初始化加载列表数据
	outLookMange.init();
	//2、初始化按钮事件
	outLookMange.bindEvent();
});
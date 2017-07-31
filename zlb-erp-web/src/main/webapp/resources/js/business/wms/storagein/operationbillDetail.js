var billStates= eval([{name: '待分派', value: '0'},{name: '待领取', value: '20'},{name: '上架中', value: '30'},{name: '已作废', value: '98'},{name: '完成', value: '99'}]);
var operationbillDetailManage = {
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/operationbill/operationbilllist';
        }
    },
    setOperationBillDetailTableValue:function(row){
    	$("#operationRow04").val(row.operationRow);
    	$("#detailRow04").val(row.detailRow);
    	$("#skuCode04").val(row.skuCode);
    	$("#skuQty04").val(row.skuQty);
    	$("#purchaseRow04").val(row.purchaseRow);
    	$("#unit04").val(row.unit);
    	$("#state04").val(row.state);
    	$("#operationQty04").val(row.actualQty);
    	$("#recommendLocation04").val(row.recommendLocation);
    	$("#originalLocation04").val(row.originalLocation);
    	
    	$("#skuProDate07").val(operationbillDetailManage.format(row.skuProDate,"yyyy-MM-dd"));
    	$("#skuFailDate07").val(operationbillDetailManage.format(row.skuFailDate,"yyyy-MM-dd"));
    	$("#skuProBatchNo07").val(row.skuProBatchNo);
    	$("#skuStorageDate07").val(operationbillDetailManage.format(row.skuStorageDate,"yyyy-MM-dd"));
    	$("#supplierCode07").val(row.supplierCode);
    	$("#skuStockBatchBo07").val(row.skuStockBatchBo);
    	$("#skuState07").val(row.skuState);
    	
    },
    /**分页获取换货订单列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#operationBillDetailTable",//需要分页的table ID
    		url: operationbillDetailManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(data){
    			if(data.rows.length>0){
    				operationbillDetailManage.setOperationBillDetailTableValue(data.rows[0]);
    			}
    			operationbillDetailManage.isResetOffset = 0;
            },
            onClickRow:function(row,$element){
            	operationbillDetailManage.setOperationBillDetailTableValue(row);
            },
            sortable: true,
    		sortName:'detail_row',
    		sortOrder:'asc',
    		queryParams:queryParams,
    		columns: [
			{
    			field: 'operationRow',
    			title: '行号'
    		},{
				field: 'detailRow',
				title: '入库明细行号'
    		}, {
    			field: 'storageInTradingNo',
    			title: '收货交易号'
    		},{
    			field: 'skuStockBatchNo',
    			title: '库存批次号'
    		},{
    			field: 'skuCode',
    			title: '货品编码'
    		},{
    			field: 'skuName',
    			title: '货品名称'
    		},{
    			field: 'billState',
    			title: '上架状态',
    			formatter:function(value,row,index){
					var billState =""
					$.each(billStates,function(index,obj){
    					if(obj.value==value){
    						billState=obj.name;
    					}
    				});
					return billState;
    			}
    		},{
    			field: 'planQty',
    			title: '计划上架数量'
    		},{
    			field: 'actualQty',
    			title: '已上架数量'
    		},{
    			field: 'unit',
    			title: '单位'
    		},{
    			field: 'state',
    			title: '货品状态',
    			formatter:function(value,row,index){
					var state =""
					$("#state04 option").each(function(){
						if($(this).val()==value){
							state = $(this).text();
						}
					});
					return state;
    			}
    		},{
    			field: 'recommendLocation',
    			title: '推荐库位'
    		},/*{
    			field: 'actualLocation',
    			title: '实际库位'
    		},*/{
    			field: 'operation',
    			title: '上架人'
    		},{
    			field: 'receiveTime',
    			title: '领取时间'
    		},{
    			field: 'sku_storage_date',
    			title: '上架时间'
    		},{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return operationbillDetailManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'creator',
    			title: '创建人',
    	    },{
    			field: 'modified',
    			title: '最后修改时间',
    			formatter:function(value,row,index){
					return operationbillDetailManage.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'modifier',
    			title: '最后修改人',
    	    }
    		]
    	});
    	  $('#operationBillDetailTable').bootstrapTable('hideColumn','id');
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
    bindEvent: function () {
    	// 点击列表赋值的方法
        $('#operationBillDetailTable').find('tbody').find("tr").on('click',function(){
            $('#operationBillDetailTable').find('tr').css('background-color','#fff')
            $(this).css('background-color','red');
            var data=$.getIdSelections("#operationBillDetailTable");
        })
    	
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	operationbillDetailManage.searchListByPage();
    },
}
//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: operationbillDetailManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			id:$("#storageInId").val(),
		
	};
	operationbillDetailManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	operationbillDetailManage.init();
	//2、初始化绑定事件
	operationbillDetailManage.bindEvent();
});
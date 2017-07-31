var skuStates= eval([{name: '良品', value: '10'},{name: '残品', value: '20'}]);
var shelfStates= eval([{name: '未生成上架作业单', value: '0'},{name: '已生成上架作业单', value: '1'}]);

var takegoodsTransactionManage = {
		globalParams:"",
		//是否重置分页偏移值0：否，1：是
		isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取收货交易
    	searchListByPageUrl: function () {
            return '/wms/storagein/transactionList';
        },
        //取消收货交易
        cancelDealUrl:function(){
        	return '/wms/storagein/cancelDeal';
        }
    },
    setTransactionTableValue:function(row){
    		$("#billNo").val(row.billNo);
        	$("#detailRow03").val(row.detailRow);
        	$("#skuCode03").val(row.skuCode);
        	$("#shelfState").val(row.shelfState);
        	$("#skuQty").val(row.skuQty);
        	$("#storageInLocation").val(row.storageInLocation);
        	$("#shelfRulesName").val(row.shelfRulesName);
        	$("#unit03").val(row.unit);
        	$("#recommendLocationName").val(row.recommendLocationName);
        	$("#deName").val(row.deName);
        	$("#deTime").val(takegoodsTransactionManage.format(row.deTime,"yyyy-MM-dd HH:mm:ss"));
        	$("#skuProDate06").val(takegoodsTransactionManage.format(row.skuProDate,"yyyy-MM-dd"));
        	$("#skuFailDate06").val(takegoodsTransactionManage.format(row.skuFailDate,"yyyy-MM-dd"));
        	$("#skuProBatchNo06").val(row.skuProBatchNo);
        	$("#skuStorageDate06").val(takegoodsTransactionManage.format(row.skuStorageDate,"yyyy-MM-dd"));
        	$("#supplierCode06").val(row.supplierCode);
        	$("#skuStockBatchBo06").val(row.skuStockBatchNo);
        	$("#skuState06").val(row.skuState);
        	$("#isTakeAccount").val(row.isTakeAccount.toString());
        	var isTakeAccount = $("#isTakeAccount").val();
        	if(isTakeAccount=="true"){
        		$("#btn_cancel_deal").css("display","none");
        	}else{
        		$("#btn_cancel_deal").css("display","");
        	}
    },
    /**分页获取换货交易列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#takegoodsTransactionTable",//需要分页的table ID
    		url: takegoodsTransactionManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		queryParams:queryParams,
    		onLoadSuccess:function(data){
    			$("#takegoodsTransactionTable tr").eq("1").find("td").trigger("click");
    			takegoodsTransactionManage.isResetOffset = 0;
    			if(data.rows.length>0){
    				takegoodsTransactionManage.setTransactionTableValue(data.rows[0]);	
    			}
            },
            onClickRow:function(row,$element){
            	takegoodsTransactionManage.setTransactionTableValue(row);
            },
            sortable: true,
    		sortName:'detail_row',
    		sortOrder:'desc',
    		columns: [{
    			field: 'billNo',
    			title: '收货交易号'
    		}, {
    			field: 'detailRow',
    			title: '入库明细行号'
    		},{
    			field: 'skuCode',
    			title: '货品编码'
    		},{
    			field: 'skuName',
    			title: '货品名称'
    		},{
    			field: 'skuState',
    			title: '货品状态',
				formatter:function(value,row,index){
					var skuState =""
					$.each(skuStates,function(index,obj){
    					if(obj.value==value){
    						skuState=obj.name;
    					}
    				});
					return skuState;
    			}	
    		},{
    			field: 'shelfState',
    			title: '上架状态',
    			formatter:function(value,row,index){
					var shelfState =""
					$.each(shelfStates,function(index,obj){
    					if(obj.value==value){
    						shelfState=obj.name;
    					}
    				});
					return shelfState;
    			}
    		},{
    			field: 'skuQty',
    			title: '数量',
    		},{
    			field: 'unit',
    			title: '数量单位'/*,
				formatter:function(value,row,index){
					var unit =""
					$("#unit03 option").each(function(){
						if($(this).val()==value){
							unit = $(this).text();
						}
					});
					return unit;
    			}*/
    		},{
    			field: 'skuProDate',
    			title: '生产日期',
    			formatter:function(value,row,index){
					return takegoodsTransactionManage.format(row.skuProDate,"yyyy-MM-dd");
				}
    		},{
    			field: 'skuFailDate',
    			title: '失效日期',
    			formatter:function(value,row,index){
					return takegoodsTransactionManage.format(row.skuFailDate,"yyyy-MM-dd");
				}
    		},{
    			field: 'skuStorageDate',
    			title: '入库日期',
    			formatter:function(value,row,index){
					return takegoodsTransactionManage.format(row.skuStorageDate,"yyyy-MM-dd");
				}
    		},{
    			field: 'skuProBatchNo',
    			title: '生产批次号'
    		},{
    			field: 'supplierName',
    			title: '供应商'
    		},{
    			field: 'storageInLocation',
    			title: '收货库位'
    		},{
    			field: 'skuStockBatchNo',
    			title: '库存批次号'
    		},{
    			field: 'remark',
    			title: '备注',
    	    },{
    			field: 'deTime',
    			title: '收货时间',
    			formatter:function(value,row,index){
					return takegoodsTransactionManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'deName',
    			title: '收货人',
    	    },{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return takegoodsTransactionManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'creator',
    			title: '创建人',
    	    },{
    			field: 'modified',
    			title: '最后修改时间',
    			formatter:function(value,row,index){
					return takegoodsTransactionManage.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'modifier',
    			title: '最后修改人',
    	    }
    		]
    	});
    	  $('#takegoodsTransactionManageTable').bootstrapTable('hideColumn','id');
    },
    /**批量导出**/
    exportStorageList: function () {
    	var params = takegoodsTransactionManage.globalParams;
    	$.callAjax({
    		type:"post",
    		url : takegoodsTransactionManage.URL.exportListUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    				return;
    			}else{
    				if($.isNotNull(data.data)){
    					$.toastrSuccess('正在导出！');
    					var fileName = data.data;
    					var contextPath = $("#contextPath").val();
    					//请求下载excel
    					location.href=contextPath+"/wms/storagein/download?fileName="+fileName;
    					return;
    				}else{
    					$.toastrSuccess(data.msg);
    					return;
    				}
    			}
    		},
    		error : function(){
    			$.toastrError();
    			return;
    		}
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
    bindEvent: function () {
    	$("#btn_cancel_deal").click(function(){
    		var billNo = $("#billNo").val()
    		if(billNo==null ||billNo==""){
    			$.toastrWarning("请选择具体的交易记录后进行操作");
				return;
    		}
    		/*if(!($("#storStatu").val() ==30 || $("#storStatu").val() ==50)){
    			$.toastrWarning("只有状态为收货中/已入账的入库单才能进行完成收货操作！");
				return;
    		}*/
    		var isTakeAccount = $("#isTakeAccount").val();
    		if(isTakeAccount=="true"){
    			$.toastrWarning("该笔收货交易已入账,无法再取消");
				return;
    		}
    		var state = $("#shelfState").val();
    		if(state!=0){
    			$.toastrWarning("您好,这笔收货交易已生成上架作业单,不能取消！");
				return;
    		}
    		var storageInNo = $("#storageInNo01").val();
    		$("#btn_cancel_deal").attr("disabled",true);
    		$.dialogConfirm({
                message: '您确认要取消此笔交易吗?',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : takegoodsTransactionManage.URL.cancelDealUrl()+"?billNo="+billNo+"&storageInNo="+storageInNo,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				toastr['warning'](data.msg); 
    			    				$("#btn_cancel_deal").attr("disabled",false);
    			    			}else{
    			    				//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
    			    				$.toastrSuccess('取消成功！');
    			    				$('#storageInManageTable').bootstrapTable('refresh');
    			    				$("#leftMeun ul li").eq(2).trigger("click");
    			    				$("#btn_cancel_deal").attr("disabled",false);
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    			$("#btn_cancel_deal").attr("disabled",false);
    			    		}
    			    	});
                    }
                    $("#btn_cancel_deal").attr("disabled",false);
                }
            });
    	});
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	takegoodsTransactionManage.searchListByPage();
    },
}


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: takegoodsTransactionManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			id:$("#storageInId").val(),
		
	};
	takegoodsTransactionManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	takegoodsTransactionManage.init();
	//2、初始化绑定事件
	takegoodsTransactionManage.bindEvent();
});
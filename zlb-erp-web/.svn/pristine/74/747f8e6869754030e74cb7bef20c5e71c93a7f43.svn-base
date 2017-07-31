
var applyManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	applyId: '',
	initGoodsFlag:false,  
	status:'NEW',
    URL: {
    	searchListByPageUrl: function () {
            return '/apply/audit/list';
        },
        searchGoodsByPageUrl: function () {
        	return '/apply/goods';
        },
        saveApplyUrl: function () {
        	return '/apply/save';
        },
        approveApplyUrl: function () {
        	return '/apply/approve';
        },
        rejectApplyUrl: function () {
        	return '/apply/reject';
        },
        getGoodsByCodeUrl: function () {
        	return '/apply/goods/getGoodsByCode';
        }
    },
    /**分页获取采购建议列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#applyManageTable",//需要分页的table ID
    		url: applyManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			applyManage.isResetOffset = 0;
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
			{
				field: 'applyCode',
				title: '申请单编号',
				align: 'center',
				formatter:function(value,row,index){
							
					return '<a class="detail_a" href="javascript:void(0)">'+row.applyCode+'</a>';
				},
				events: 'operateEvents'
			},
			{
				field: 'created',
				title: '申请时间',
				align: 'center',
				formatter:function(value,row,index){
					return applyManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
			},
			{
				field: 'purchaser',
				title: '采购人',
				align: 'center'
			},
			{
				field: 'purchaseAmount',
				title: '采购金额',
				align: 'center'
			},
			{
				field: 'purchaseType',
				title: '采购单生成方式',
				align: 'center',
				formatter:function(value,row,index){
					var result;
				    switch(row.purchaseType){
					    case "CRE":result = "新建申请单生成"; break;
					    case "SUG":result = "采购建议生成"; break;
				    }
					return result;
				}
    		},
    		{
    			field: 'applyState',
    			title: '状态',
    			align: 'center',
				formatter:function(value,row,index){
					var result;
				    switch(row.applyState){
					    case "NEW":result = "新建"; break;
					    case "SUB":result = "已提交"; break;
					    case "APP":result = "审批通过"; break;
					    case "REJ":result = "驳回"; break;
					    case "CAN":result = "作废"; break;
				    }
					return result;
				}
			}
    		]
    	});
    },
    
    searchApplyGoodsList: function () {
    	$.pageTable({
    		tableId: "#applyGoodsTable",//需要分页的table ID
    		url: applyManage.URL.searchGoodsByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams1,
    		onLoadSuccess:function(){
    			applyManage.isResetOffset = 0;
    		},
    		sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
			{field: 'goodsName',title: '商品名称',align: 'center',width:'10%',valign: 'middle'},
			{field: 'goodsCode',title: '商品编码',align: 'center',width:'10%',valign: 'middle'},  
			{field: 'goodsType',title: '商品类型',align: 'center',width:'10%',valign: 'middle'},  
			{field: 'goodsUnit',title: '单位',align: 'center',width:'6%',valign: 'middle'},  
			{field: 'goodsSuggest',title: '建议采购数量',align: 'center',width:'6%',valign: 'middle'},
			{field: 'goodsNumber',title: '拟采购数量',align: 'center',width:'6%',valign: 'middle'
			},
			{field: 'purchaseMode',title: '采购方式',align: 'center',width:'10%',valign: 'middle',
				formatter:function(value,row,index){
					if(row.purchaseMode=='1')
						return  '自采';
					else
						return '协议采购';				
				}
			},
			{field: 'supplier',title: '供应商',align: 'center',width:'10%',valign: 'middle'
			},
			{field: 'goodsPrice',title: '供应单价',align: 'center',width:'6%',valign: 'middle'
			},
			{field: 'lastestPrice',title: '上期供应单价',align: 'center',width:'6%',valign: 'middle'},
			{field: 'goodsAmount',title: '小计',align: 'center',width:'6%',valign: 'middle',
					formatter:function(value,row,index){
						return row.goodsNumber*row.goodsPrice;
					}
			},
			{field: 'requestTime',title: '要求到货时间',align: 'center',width:'20%',valign: 'middle',
				formatter:function(value,row,index){
					return applyManage.format(row.requestTime,"yyyy-MM-dd HH:mm");
				}
			},
			{field: 'remark',title: '备注',align: 'center',width:'10%',valign: 'middle'
			}
			]
    	});
    },
   
    saveApply: function () {
  	  
  	  $('#applyGoodsTable').bootstrapTable('checkAll');
  	  var checkArray =  $('#applyGoodsTable').bootstrapTable('getSelections')
  	 
  		var goodsList = new Array();
  		for (var i = 0; i < checkArray.length; i++) {
  			var id = checkArray[i].id;
  		    var goodsNumber = $('#goodsNumber_'+id).val();
  		    var goodsPrice = $('#goodsPrice_'+id).val();
  		    var goodsAmount = $('#goodsAmount_'+id).val();
  		    var purchaseMode = $('#purchaseMode_'+id).val();
  		    var supplier = $('#supplier_'+id).val();
  		    var requestTime = $('#requestTime_'+id).val();
  		    
  		    goodsList[i] = {"id":id,"goodsNumber":goodsNumber,"goodsPrice":goodsPrice,"goodsAmount":goodsAmount,"purchaseMode":purchaseMode,"supplier":supplier,"requestTime":requestTime};
  		}
  		
     		var params = {"id":applyManage.applyId,"goodsList":goodsList}
     		
  		  $.callAjax({
  			  type:"post",
  			  url : applyManage.URL.saveApplyUrl(),
  			  data : params,
  			  success : function(data){
  				  if(data.code != "0000"){
  					  $.toastrWarning(data.msg);
  				  }else{
  					  $.toastrSuccess('操作成功！');
  					  $('#applyGoodsTable').bootstrapTable('refresh');
  					  $.hideModal('#editModal');
  				  }
  			  },
  			  error : function(){
  				  $.toastrError();
  			  }
  		  });
    },
    
	approveApply: function () {
		  var  datas = $("#applyGoodsTable").bootstrapTable("getData").length;
		  if(datas<=0){
			  $.toastrWarning("暂无需要审批的记录");
			  return;
		  }
		  $.dialogConfirm({
			  message: '您确定要审批通过此采购申请吗?',
			  callback: function(result) {
				  if(result) {
					  var params = {"id":applyManage.applyId};
					  $.callAjax({
						  url : applyManage.URL.approveApplyUrl(),
						  data : params,
						  success : function(data){
							  $.toastrSuccess('审批通过！');
							  $('#applyGoodsTable').bootstrapTable('refresh');
							  $('#applyManageTable').bootstrapTable('refresh');
							  $.hideModal('#editModal');
						  }
					  });
				  }
			  }
		  });
	  },
	  
	  rejectApply: function () {
		  var  datas = $("#applyGoodsTable").bootstrapTable("getData").length;
		  if(datas<=0){
			  $.toastrWarning("暂无需要驳回的记录");
			  return;
		  }
		  $.dialogConfirm({
			  message: '您确定要驳回此采购申请吗?',
			  callback: function(result) {
				  if(result) {
					  var params = {"id":applyManage.applyId};
					  $.callAjax({
						  url : applyManage.URL.rejectApplyUrl(),
						  data : params,
						  success : function(data){
							  $.toastrSuccess('驳回成功！');
							  $('#applyGoodsTable').bootstrapTable('refresh');
							  $('#applyManageTable').bootstrapTable('refresh');
							  $.hideModal('#editModal');
						  }
					  });
				  }
			  }
		  });
	  },
	
    bindEvent: function () {
    	
    	$("#btn_search").on('click',function() {
    		applyManage.isResetOffset = 1;
    		$('#applyManageTable').bootstrapTable('refresh');
    	});
    	
    	$("#btn_approve").on('click',function() {
    		applyManage.approveApply();
    	});
    	
    	$("#btn_save").on('click',function() {
    		applyManage.saveApply();
    	});
    	
    	$("#btn_reject").on('click',function() {
    		applyManage.rejectApply();
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
            pickerPosition: "bottom-left",
            startDate:new Date
        });
        
    	applyManage.searchListByPage();
    	applyManage.searchApplyGoodsList();
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
    	applyManage.applyId = row.id;
    	applyManage.status=row.applyState;
    	$('#applyGoodsTable').bootstrapTable('refresh');
    	if(row.applyState=='SUB' ){
	    	$('#btn_div').css("display","block");
    	}else{
	    	$('#btn_div').css("display","none");
    	}
	}
};

//得到查询的参数          ★★★分页表单查询参数★★★
var queryParams = function (params) {
	
	var applyState = $("#applyState").val();
	
	var temp = {
			pageSize: params.limit,   //页面大小
			offset: applyManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			applyState:applyState
	};
	
	applyManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

var queryParams1 = function (params) {
	
	var temp1 = {   
			pageSize: params.limit,   //页面大小
			offset: applyManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
					sort: params.sort,
					order: params.order,
					applyId:applyManage.applyId
	};
	temp1 = JSON.stringify(temp1);
	return temp1;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	applyManage.init();
	//2、初始化按钮事件
	applyManage.bindEvent();
});
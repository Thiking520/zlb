
var returnManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	returnId: 'null',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取采购建议列表请求地址
    	searchListByPageUrl: function () {
            return '/return/list';
        },
        searchGoodsByPageUrl: function () {
            return '/return/goods';
        },
        addGoodsUrl: function () {
        	return '/return/goods/addGoods';
        },
        deleteReturnUrl: function () {
        	return '/return/delete';
        },
        deleteGoodsUrl: function () {
            return '/return/goods/delete';
        },
        saveReturnUrl: function () {
        	return '/return/save';
        },
        submitReturnUrl: function () {
        	return '/return/submit';
        },
        getPurchaseCodeByGoodsCodeUrl: function () {
        	return '/return/getPurchaseCodeByGoodsCode';
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
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{
    			field: 'returnCode',
    			title: '退货单号',
    			align: 'center'
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
    		},
			{
    			field: 'id',title: '操作',align: 'center',width:'16%',valign: 'middle',
    	        formatter:function(value,row,index){
    	        	var html=""
	        		if(row.returnState=='NEW'||row.returnState=='REJ')
    	        	    html = html +'<a class="btn btn-primary btn-sm edit_a" href="javascript:void(0)" >编辑</a>'+
    	        			 '<a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
		            return html; 
    	        },
    	        events: 'operateEvents'
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
			{field: 'remark',title: '退货原因',align: 'center'},
			{
    			field: 'id',title: '操作',align: 'center',width:'5%',valign: 'middle',
    	        formatter:function(value,row,index){
		            return '<a class="btn btn-danger btn-sm deleteGoods_a" href="javascript:void(0)" >删除</a>';
    	        },
    	        events: 'operateEvents'
    	    }
			]
    	});
    },

    refreshGoodsPage:function(){
    	$('#returnGoodsTable').bootstrapTable('refresh');
    },
    
    saveReturn: function () {
  	  
  	  $('#returnGoodsTable').bootstrapTable('checkAll');
  	  var checkArray =  $('#returnGoodsTable').bootstrapTable('getSelections')
  	 
  		var goodsList = new Array();
  		for (var i = 0; i < checkArray.length; i++) {
  			var id = checkArray[i].id;
  		    
  		    goodsList[i] = {"id":id};
  		}
  		
     		var params = {"id":returnManage.returnId,"goodsList":goodsList}
     		
  		  $.callAjax({
  			  type:"post",
  			  url : returnManage.URL.saveReturnUrl(),
  			  data : params,
  			  success : function(data){
  				  if(data.code != "0000"){
  					  $.toastrWarning(data.msg);
  				  }else{
  					  $.toastrSuccess('操作成功！');
  					  
  					  if(returnManage.returnId=='null')
  						 returnManage.returnId = data.data.id;

					  $.hideModal('#editModal');
  					  returnManage.refreshGoodsPage();
  					  $('#returnManageTable').bootstrapTable('refresh');
  				  }
  			  },
  			  error : function(){
  				  $.toastrError();
  			  }
  		  });
    },
    
    submitReturn: function () {
    	  
    	  $('#returnGoodsTable').bootstrapTable('checkAll');
    	  var checkArray =  $('#returnGoodsTable').bootstrapTable('getSelections')
    	 
    		var goodsList = new Array();
    		for (var i = 0; i < checkArray.length; i++) {
    			var id = checkArray[i].id;
    		    
    		    goodsList[i] = {"id":id};
    		}
    		
       		var params = {"id":returnManage.returnId,"goodsList":goodsList}
       		
    		  $.callAjax({
    			  type:"post",
    			  url : returnManage.URL.submitReturnUrl(),
    			  data : params,
    			  success : function(data){
    				  if(data.code != "0000"){
    					  $.toastrWarning(data.msg);
    				  }else{
    					  $.toastrSuccess('操作成功！');

    					  $.hideModal('#editModal');
    					  if(returnManage.returnId=='null')
    						 returnManage.returnId = data.data.id;
    					  
    					  returnManage.refreshGoodsPage();
    					  $('#returnManageTable').bootstrapTable('refresh');
    				  }
    			  },
    			  error : function(){
    				  $.toastrError();
    			  }
    		  });
      },
    
    addGoods:function(){
    	
    	var goodsCode=$('#goodsCode').val();
    	var goodsName=$('#goodsName').text();
    	var goodsType=$('#goodsType').text();
    	var purchaseCode= $('#purchaseCode').val();
    	var supplier=$('#supplier').text();
    	var goodsUnit=$('#goodsUnit').val();
    	var goodsPrice=$('#goodsPrice').val();
    	var goodsNumber=$('#goodsNumber').text();
    	var goodsAmount=$('#goodsAmount').text();
    	var returnNumber=$('#returnNumber').val();
    	var returnAmount=$('#returnAmount').val();
    	var remark=$('#remark').val();
    	
    	
    	var params = {
    			"returnId":returnManage.returnId,
    			"goodsCode":goodsCode,
    			"goodsName":goodsName,
    			"goodsType":goodsType,
    			"supplier":supplier,
    			"purchaseCode":purchaseCode,
    			"supplier":supplier,
    			"goodsUnit":goodsUnit,
    			"goodsPrice":goodsPrice,
    			"goodsNumber":goodsNumber,
    			"goodsAmount":goodsAmount,
    			"returnNumber":returnNumber,
    			"returnAmount":returnAmount,
    			"remark":remark
    	};
    	
     	$.callAjax({
      		type:"post",
      		url : returnManage.URL.addGoodsUrl(),
      		data : params,
      		success : function(data){
      			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    			}else{
	         		$.toastrSuccess('添加成功！');
			        returnManage.searchReturnGoodsList();
		        	$('#returnGoodsTable').bootstrapTable('refresh');
    			}
      		},
      		error : function(){
      			$.toastrError();
      		}
      	});
    },
    
    	
     
    getPurchases:function(value){
    	
      	var params = {"goodsCode":value};
      	
      	$.callAjax({
      		type:"post",
      		url : returnManage.URL.getPurchaseCodeByGoodsCodeUrl(),
      		data : params,
      		success : function(data){
      			
      			if(data==null||data.length==0){
      				$.toastrWarning("没有找数据!");
      			}else{
      				
      				var list = '<select class="form-control" id="purchaseCodeList" onchange=\"returnManage.changePurchaseCode()\">';
      					
  					for(var i=0;i<data.length;i++){
  						list = list+'<option value="'+data[i].purchaseCode+'_'+data[i].supplier+'_'+data[i].goodsUnit+'_'+data[i].goodsPrice+'_'+data[i].goodsNumber+'_'+data[i].goodsAmount+'" >'+data[i].purchaseCode+'</option>'
  					}
  					
  					list = list + '</select>';
      				
  					$('#goodsName').html(data[0].goodsName);
  					$('#goodsType').html(data[0].goodsType);
      				$('#purchaseCodeSpan').html(list);
      				
      				$('#purchaseCodeList').change();
      				$('#returnNumber').blur();
      			}
      		},
      		error : function(){
      			$.toastrError();
      		}
      	});
    },
    
    changePurchaseCode:function(){
    	
    	var value = $('#purchaseCodeList').val();
    	
    	var items = value.split('_');
    	var purchaseCode = items[0];
    	var supplier = items[1];
    	var goodsUnit = items[2];
    	var goodsPrice = items[3];
    	var goodsNumber = items[4];
    	var goodsAmount = items[5];
    	
    	
    	$('#purchaseCode').val(purchaseCode);
    	$('#supplier').text(supplier);
    	$('#goodsNumber').text(goodsNumber);
    	$('#goodsAmount').text(goodsAmount);
    	$('#goodsPrice').val(goodsPrice);
    	$('#goodsUnit').val(goodsUnit);
    	
    	$('#returnNumber').prop("disabled",false);
    	
    },
    
    sumReturnAmount: function(){
 	   var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
 	   var goodsPrice = $('#goodsPrice').val();
  	   var returnNumber = $('#returnNumber').val();
  	   
  	   

 	   if(!re.test(goodsPrice)||!re.test(returnNumber)) {
 			alert("请输入数字");
 			return false;
 		}
 	   
 	   var returnAmount = goodsPrice*returnNumber;
 	   
 	   $('#returnAmount').val(returnAmount);  
    },
    
    /**删：删除商品**/
    deleteGoods: function (goodsId) {
  	  
    	$.dialogConfirm({
            message: '您确定要删除吗?',
            callback: function(result) {
                if(result) {
           		var params = {"id":goodsId};
        			$.callAjax({
        				url : returnManage.URL.deleteGoodsUrl(),
        				data : params,
        				success : function(data){
    		         		$.toastrSuccess('删除成功！');
    		         		$('#returnGoodsTable').bootstrapTable('refresh');
        				}
        			});
                }
            }
        });
    },
    
    /**删：删除商品**/
    deleteReturn: function (returnId) {
 	   $.dialogConfirm({
 		   message: '您确定要删除吗?',
 		   callback: function(result) {
 			   if(result) {
 				   var params = {"id":returnId};
 				   $.callAjax({
 					   url : returnManage.URL.deleteReturnUrl(),
 					   data : params,
 					   success : function(data){
 						   $.toastrSuccess('删除成功！');
 						   $('#returnManageTable').bootstrapTable('refresh');
 					   }
 				   });
 			   }
 		   }
 	   });
    },
    
    
    bindEvent: function () {

    	$("#btn_search").on('click',function() {
    		returnManage.isResetOffset = 1;
    		$('#returnManageTable').bootstrapTable('refresh');
    	});
    	
    	//打开新增页面
    	$("#btn_new").on('click',function() {
    		$.showModal('#editModal');
    	});
    	
    	//打开新增退货商品
    	$("#btn_add").on('click',function() {
    		returnManage.addGoods();
    	});
    	
    	$("#btn_save").on('click',function() {
    		returnManage.saveReturn();
    	});
    	
    	$("#btn_submit").on('click',function() {
    		returnManage.submitReturn();
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
    	returnManage.returnId='null';
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

	//编辑采购申请
    'click .edit_a': function (e, value, row, index) {
    	$.showModal('#editModal');
    	returnManage.returnId = row.id;
    	returnManage.searchReturnGoodsList();
    	returnManage.refreshGoodsPage();
	},

	//删除采购申请
	'click .delete_a': function (e, value, row, index) {
		returnManage.deleteReturn(row.id);
	},
	
	//删除商品
	'click .deleteGoods_a': function (e, value, row, index) {
		returnManage.deleteGoods(row.id);
	}
};

//得到查询的参数          ★★★分页表单查询参数★★★
var queryParams = function (params) {
	
	var returnState = $("#returnState").val();
	
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
	
//	returnManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	returnManage.init();
	//2、初始化按钮事件
	returnManage.bindEvent();
});
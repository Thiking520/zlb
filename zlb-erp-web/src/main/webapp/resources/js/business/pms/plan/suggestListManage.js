// 存放每个功能模块业务逻辑JS
// javascript 模块化

var suggestManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	suggestId: '',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取采购建议列表请求地址
    	searchListByPageUrl: function () {
            return '/suggest/list';
        },
        //根据从OMS推送过来的订单数据，生成采购建议商品列表。
        createSuggestGoodsUrl: function () {
        	return '/suggest/createSuggestGoods';
        },
        //删除采购建议商品
        deleteGoodsUrl: function () {
            return '/suggest/goods/delete';
        },
        //批量删除采购建议商品
        batchDeleteGoodsUrl: function () {
        	return '/suggest/goods/batchDelete';
        },
        //修改采购建议商品数量
        updateGoodsNumberUrl: function () {
        	return '/suggest/goods/updateGoodsNumber';
        },
        //提交采购建议，并生成采购申请单
        createSuggestAndApplyUrl: function () {
        	return '/suggest/goods/createSuggestAndApply';
        },
//        getSuggestNewGoodsUrl: function () {
//        	return '/suggest/goods/new';
//        },
        //分页获取采购建议商品列表
        searchGoodsByPageUrl: function () {
            return '/suggest/goods/list';
        },
        //获取建议单详情
        getSuggestDetailUrl: function () {
        	return '/suggest/detail';
        },
        
//    	重置t_pms_order_goods表的isCreatedPmsApplyFlag字段为0，测试用
        getResetCreatedPmsApplyFlagUrl: function () {
        	return '/suggest/resetCreatedPmsApplyFlag';
        }
        
    },
    
    /**分页获取采购建议列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#suggestManageTable",//需要分页的table ID
    		url: suggestManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			suggestManage.isResetOffset = 0;
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{
    			field: 'suggestCode',
    			title: '建议单编号',
    			align: 'center',
				formatter:function(value,row,index){
					
					return '<a class="detail_a" href="javascript:void(0)">'+row.suggestCode+'</a>';
				},
				events: 'operateEvents'
    		},
    		{
    			field: 'created',
    			title: '建议单生成时间',
    			align: 'center',
				formatter:function(value,row,index){
					return suggestManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
    			field: 'orderTime',
    			title: '关联订单截至时间',
    			align: 'center',
				formatter:function(value,row,index){
					return suggestManage.format(row.orderTime,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
    			field: 'suggestState',
    			title: '建议单状态',
    			align: 'center',
				formatter:function(value,row,index){
					
					var result;
				    switch(row.suggestState){
					    case "NEW":result = "未采用"; break;
					    case "RUN":result = "已采用"; break;
					    default :result = "未采用"; break;
				    }
					return result;
				}
    		}  
    		]
    	});
    },
    
//  先单后采商品编辑列表
    searchSuggestGoodsList1: function () {
    	
    	/*var orderTitle = "<table class='table table-bordered ordertable'>" +
						 "<tr>" +
				    	 "<td width='100%' colspan='5'>订单信息</td>" +
				    	 "</tr>" +
				    	 "<tr>" +
				    	 "<td width='30%'>销售商品</td>" +
				    	 "<td width='20%'>商品编码</td>" +
				    	 "<td width='10%'>单位</td>" +
				    	 "<td width='20%'>需求量</td>" +
				    	 "<td width='20%'>转换率</td>" +
				    	 "</tr>" +
				    	 "</table>";*/
    	//分页组件
    	$.pageTable({
    		tableId: "#suggestGoodsTable1",//需要分页的table ID
    		url: suggestManage.URL.searchGoodsByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams1,
    		onLoadSuccess:function(){
    			suggestManage.isResetOffset = 0;
    		},
    		sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [
    		{checkbox: true},
			{field: 'goodsName',title: '原材料名称',align: 'center',valign: 'middle',width:'24%'},
			{field: 'goodsCode',title: '原材料编码',align: 'center',valign: 'middle',width:'10%'},  
			{field: 'goodsType',title: '商品类别',align: 'center',valign: 'middle',width:'10%'},  
			{field: 'goodsUnit', title: '单位', align: 'center',valign: 'middle',width:'8%'},  
			{field: 'purchaseType',	title: '采购策略', align: 'center',valign: 'middle',width:'8%',
				formatter:function(value,row,index){
					if(row.purchaseType='XDHC')
							return "先单后采";
						else
							return "先采后单";
				}
			},
			/*{
				field: 'purchaseType',title: orderTitle, align: 'center',valign: 'middle',width:'40%'
					,
				formatter:function(value,row,index){
					var res = "";
					if(row.id=='080c2a744017453a8886e5e39dcbdb47'){
						var params = {"suggestGoodsId":row.id};
						$.callAjax({
							type:"post",
							url : suggestManage.URL.selectOrderLineByGoodsIdUrl(),
							data : params,
							success : function(data){   
								res = "<table class='table table-bordered table-hover table-striped ordertable'>";
								for(var i=0;i<data.length;i++){
									res = res + "<tr><td></td>";
									res = res + ""
									res = res + "<td width='30%'>"+data[i].goodsName+"</td>" +
											    "<td width='20%'>"+data[i].goodsCode+"</td>" +
											    "<td width='10%'>"+data[i].goodsUnit+"</td>" +
											    "<td width='20%'>"+data[i].goodsRequest+"</td>" +
											    "<td width='20%'>"+data[i].goodsChangeRate+"</td>";
									res = res + "</tr>";
								}
								res = res + "</table>";
							}
						});
					}
					return res;
				}
			},*/
			{field: 'goodsRequest',title: '需求数量',align: 'center',valign: 'middle',width:'8%'},
			{field: 'goodsStock',title: '可用库存',align: 'center',valign: 'middle',width:'8%'}, 
			{field: 'goodsComming',title: '可用在途',align: 'center',valign: 'middle',width:'8%'}, 
			{field: 'goodsSuggest',title: '建议采购数量',align: 'center',valign: 'middle',width:'10%'},
			{field: 'goodsNumber',title: '拟采购数量',align: 'center',valign: 'middle',width:'8%',
				formatter:function(value,row,index){
					return '<input id="goodsNumber_'+row.id+'" class="form-control input-small" style="width: 100px;height:30px" type="text"  value="'+row.goodsNumber+'">';
				}
			}
			]
    	});
    	 $('#suggestGoodsTable1').bootstrapTable('hideColumn','id');
    },
    
    showGoodsList: function (datas) {
    	$("#goodsListTable").bootstrapTable({
		data:datas,
  		columns: [
        {field: 'goodsName',title: '原始商品',align: 'center',valign: 'middle',width:'10%'},
        {field: 'goodsCode',title: '原始<br>商品编码',align: 'center',valign: 'middle',width:'8%'},  
        {field: 'goodsUnit', title: '单位', align: 'center',valign: 'middle',width:'4%'},  
        {field: 'purchaseType',	title: '采购策略', align: 'center',valign: 'middle',width:'8%',
      	  formatter:function(value,row,index){
      		  if(row.purchaseType='XDHC')
      			  return "先单后采";
      		  else
      			  return "先采后单";
      	  }
        },
        {field: 'goodsRequest',title: '需求数量',align: 'center',valign: 'middle',width:'6%'},
        {field: 'goodsStock',title: '可用库存',align: 'center',valign: 'middle',width:'6%'}, 
        {field: 'goodsComming',title: '可用在途',align: 'center',valign: 'middle',width:'6%'}, 
        {field: 'goodsSuggest',title: '建议采购<br>数量',align: 'center',valign: 'middle',width:'6%'},
        {field: 'goodsNumber',title: '拟采购<br>数量',align: 'center',valign: 'middle',width:'6%'}
        ]
    	});
    },
    

//  建议单商品列表信息
    details: function (id) {
        	var params = {"id":id}
        	$.callAjax({
    		type:"post",
    		url : suggestManage.URL.getSuggestDetailUrl(),
    		data : params,
    		success : function(data){
    				if(data.code != "0000"){
    					$.toastrWarning(data.msg);
    				}else{
    					$("#goodsListTable").bootstrapTable('load',data.data.goodsList);
    					$("#goodsListTable").bootstrapTable('hideLoading');//去掉商品列表的正在加载提示
    				}
    		}
       });
    },
    
//  批量删除已勾选的商品
    batchDeleteGoods: function (goodsIds) {
    	//触发Ajax
    	var params = {"ids":goodsIds};
    	$.callAjax({
    		type:"post",
    		url : suggestManage.URL.batchDeleteGoodsUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    			}else{
    				$.toastrSuccess('操作成功！');
					$('#suggestGoodsTable1').bootstrapTable('refresh');
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
    },
    
//根据从OMS推送过来的订单数据，生成采购建议商品列表。
    createSuggestGoods: function () {
    	var params = {};
    	
    	$.callAjax({
    		type:"post",
    		url : suggestManage.URL.createSuggestGoodsUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    			}else{
    				$.toastrSuccess('操作成功！');
    				$('#suggestGoodsTable1').bootstrapTable('refresh');
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
    },
    
//  修改批采购数量
    updateGoodsNumber:function(id,goodsNumber){
    	
    	var params = {"id":id,"goodsNumber":goodsNumber}
    	
    	$.callAjax({
		type:"post",
		url : suggestManage.URL.updateGoodsNumberUrl(),
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
    
//  提交生成采购建议单及采购申请单。
    createSuggestAndApply:function(){
    	
		var goodsIds = $.getIdSelections("#suggestGoodsTable1","goodsCode");
		if(goodsIds.length<=0){
			$.toastrWarning('请勾选记录再进行操作！');
			return false;
		}
		
		var goodsNumbers = new Array();
		/*for (var i = 0; i < goodsIds.length; i++) {
			var id = goodsIds[i];
		    var goodsNumber = $('#goodsNumber_'+id).val();
		    var goodsNumber = $("#suggestGoodsTable1 tbody tr.selected").find(" td input.input-small");
		    goodsNumbers.push(goodsNumber);
		}*/
		$("#suggestGoodsTable1 tbody tr.selected").find("td input.input-small").each(function(){
			    goodsNumbers.push($(this).val());
		});
		var numberTest = /^([0-9]{1,9}.?[0-9]{0,2})$/;
		var isOk = false;
		$("#suggestGoodsTable1 tbody .selected").find("input[type='text']").each(function(e){
			 if($(this).val() <= 0){
				 isOk=true;
				 return;
			 }
			 if($(this).val()!='' && !numberTest.test($(this).val())){
				 isOk=true;
				 return;
			}
		});
		
		if(isOk){
			$.toastrWarning('采购数量应该为大于0的记录,该笔订单无法发起采购！');
			return false;
		}
		
    	var params = {"ids":goodsIds,"goodsNumbers":goodsNumbers};
    	
//    	//通过Ajax去访问后台
    	$.callAjax({
    		type:"post",
			url : suggestManage.URL.createSuggestAndApplyUrl(),
			data : params,
			success : function(data) {
				if(data.code == "0000") {
	         		$.toastrSuccess('操作成功！');
	         		$('#suggestManageTable').bootstrapTable('refresh');
	         		$('#suggestGoodsTable1').bootstrapTable('refresh');
	         		
	         		$.hideModal('#editModal');
				} else {
					$.toastrWarning('操作失败！');
					return;
				}
			},
			error : function(){
				$.toastrError("系统异常！");
			}
    	});
	},
    
	//重置t_pms_order_goods表的isCreatedPmsApplyFlag字段为0，测试用
	resetCreatedPmsApplyFlagUrl: function () {
		var params = {}
		$.callAjax({
			type:"post",
			url : suggestManage.URL.getResetCreatedPmsApplyFlagUrl(),
			data : params,
			success : function(data){
				$.toastrSuccess(data.msg);
			}
		});
	},
	
    bindEvent: function () {
    	
    	//新增页面
    	$("#btn_new").on('click',function() {
    		$.showModal('#editModal');
    	});
    	
//    	创建采购建议商品列表
    	$("#btn_create").on('click',function() {
    		suggestManage.createSuggestGoods();
    	});

//    	查询采购建议商品列表
    	$("#btn_search").on('click',function() {
    		suggestManage.isResetOffset = 1;
    		$('#suggestGoodsTable1').bootstrapTable('refresh');
    	});
    	
      	/** 
    	 * 提交生成采购建议单及采购申请单
    	 */
    	$("#btn_save_submit").on('click',function() {
    		suggestManage.createSuggestAndApply();
    	});
    	
    	$("#btn_remove").on('click',function() {
    		var goodsIds = $.getIdSelections("#suggestGoodsTable1","id");
    		
        	if(goodsIds==null||goodsIds==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
        	suggestManage.batchDeleteGoods(goodsIds);
    	});
    	
    	
    	$("#btn_reset").on('click',function() {
    		suggestManage.resetCreatedPmsApplyFlagUrl();
    	});
    	
    	$('#editModal').on('hidden.bs.modal', function() {
	    	$("#goodsType_key").val('');
		});	
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	//初始化下拉框
//        $(".form_datetime").datetimepicker({
        $(".form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii:ss",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });
        
    	suggestManage.searchListByPage();
    	suggestManage.searchSuggestGoodsList1();
    	
    	suggestManage.showGoodsList();
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
	}
	
};





//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	//删除商品
	'click .delete_a': function (e, value, row, index) {
		alert('delete_a');
	},

	//编辑
    'click .edit_a': function (e, value, row, index) {
    	alert('edit_a');
	},
	
    'click .detail_a': function (e, value, row, index) {
    	$.showModal('#detialModal');
    	suggestManage.details(row.id);
	}
};

//得到查询的参数          ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: suggestManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order
	};
	
	suggestManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

var queryParams1 = function (params) {
	
	var goodsType = $('#goodsType_key').val();
	params.limit = 100;
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: suggestManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
					sort: params.sort,
					order: params.order,
					goodsType:goodsType,
					purchaseType:"XDHC"               //  先单后采
						
	};
	
	suggestManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

var queryParams2 = function (params) {
	var temp = {   
			pageSize: params.limit,   //页面大小
			offset: suggestManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
					sort: params.sort,
					order: params.order,
					purchaseType:"XCHD"      //  先采后单
	};
	
	suggestManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	suggestManage.init();
	//2、初始化按钮事件
	suggestManage.bindEvent();
});
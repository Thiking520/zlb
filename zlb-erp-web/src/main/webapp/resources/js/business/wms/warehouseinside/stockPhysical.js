//定义下拉框数组
var tradingTypeArray=[{'value':'10','text':'增加'},{'value':'20','text':'减少'}];
var tradingTypeList={};
var billTypeArray = [
	{'value':'10','text':'入库订单'},
	{'value':'20','text':'出库订单'},
	{'value':'30','text':'上架作业单'},
	{'value':'40','text':'移库作业单'},
	{'value':'50','text':'库存调整单'}
	];
var billTypeList={};
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var stockPhysical = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//库位库存查询表单分页偏移值
	isResetOffset_location:0,
	rowIndex:0,
	oldValue:0,
	planQty:0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/physical/listPhysical';
        },
    	searchDetailListByPageUrl: function () {
            return '/wms/physicalDetail/list';
        },
        addPhysicalDetailUrl: function () {
            return '/wms/physicalDetail/addPhysicalDetail';
        },
        confirmPhysicalUrl:function(){
        	return '/wms/physical/confirmPhysical';
        },//盘点生调整单
        generateAdjustmentUrl:function(){
        	return '/wms/physical/generateAdjustment';
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
    /**分页获取盘点主列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#stockPhysicalManagerTable",//需要分页的table ID
    		url: stockPhysical.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			stockPhysical.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		},{
    			field: 'physicalNo',
    			title: '盘点单号',
      			formatter:function(value,row,index){
					return '<a class="physicalRow" href="javascript:void(0)" physicalNo="' + row.physicalNo +'">' + row.physicalNo + '</a>';
    			},
    			events: 'operateEvents'
    		}, {
    			field: 'state',
    			title: '状态',
    			formatter:function(value,row,index){
    				if(value == "10"){
    					return "新建";
    				}else if(value == "20"){
    					return "盘点完成";
    				}else if(value == "30"){
    					return "作废";
    				}
    			}
    		},{
    			field: 'physicalWay',
    			title: '盘点方式',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(value == "10"){
    		    		return "全盘";
    		    	}else if(value == "20"){
    		    		return "把选中的库存，生成盘点单";
    		    	}
    		    }
    		}, {
    			field: 'physicalResults',
    			title: '盘点结果',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(value == "10"){
    		    		return "一致";
    		    	}else if(value == "20"){
    		    		return "有差异";
    		    	}
    		    }
	    	}, {
				field: 'adjustState',
				title: '是否生成调整',
			    align: 'center',
			    formatter:function(value,row,index){
			    	if(value == "10"){
			    		return "未生成调整";
			    	}else if(value == "20"){
			    		return "已生成调整";
			    	}
			    }
			},
    		{
    			field: 'performName',
    			title: '盘点执行人',
    		    align: 'center'
    		}, {
				field: 'created',
				title: '创建时间',
			    align: 'center',
				formatter:function(value,row,index){
					return stockPhysical.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
			}
			/*,
	    	{
				field: 'creator',
				title: '创建人',
			    align: 'center'
			}, {
				field: 'modifier',
				title: '修改人',
			    align: 'center'
			}, {
				field: 'modified',
				title: '修改时间',
			    align: 'center',
				formatter:function(value,row,index){
					return stockPhysical.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
			}*/
    		]
    	});
    },
    /**分页获取盘点明细列表**/
    searchDetailListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#physicalDetailManagerTable",//需要分页的table ID
    		url: stockPhysical.URL.searchDetailListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryDetailParams,
			toolbarAlign:'right',
    		onLoadSuccess:function(data){
    			$("#physicalDetailManagerTable tr").eq("1").find("td").trigger("click");
    			stockPhysical.isResetOffset = 0;
    			if(data.rows.length>0){
    				stockPhysical.setPhysicalTableValue(data.rows[0]);	
    			}
            },
            onClickRow:function(row,$element){
            	$("#physicalDetailManagerTable tr td").css("background-color","");
            	$($element).find("td").css("background-color","yellow");
            	var index = $element.attr("data-index");
            	stockPhysical.rowIndex = index;
            	stockPhysical.setPhysicalTableValue(row);
            	return 'background-color:pink;';
            	
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'skuCode',
    			title: '货品编码'
    		}, {
    			field: 'skuName',
    			title: '货品名称'
    		},{
    			field: 'locationCode',
    			title: '库位编码'
    		}, {
    			field: 'batchNo',
    			title: '库存批次号'
    		}, 
    		{
    			field: 'planQty',
    			title: '总数量',
    		    align: 'center'
    		},
    		{
    			field: 'actualQty',
    			title: '实盘数量',
    		    align: 'center'
    		},
    		{
    			field: 'differenceQty',
    			title: '相差数量',
    		    align: 'center'
    		},
    		{
    			field: 'physicalResults',
    			title: '盘点结果',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(value == "10"){
    		    		return "一致";
    		    	}else if(value == "20"){
    		    		return "有差异";
    		    	}
    		    }
    		},
    		{
    			field: 'status',
    			title: '库存状态',
    		    align: 'center',
    		    formatter:function(value,row,index){
    		    	if(value == "10"){
    		    		return "良品";
    		    	}else if(value == "20"){
    		    		return "残品";
    		    	}
    		    }
    		},
    		{
    			field: 'proDate',
    			title: '生产日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockPhysical.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
    			field: 'failDate',
    			title: '失效日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockPhysical.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
    			field: 'storageDate',
    			title: '入库日期',
    		    align: 'center',
				formatter:function(value,row,index){
					return stockPhysical.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		},
    		{
    			field: 'proBatchNo',
    			title: '生产批次号',
    		    align: 'center'
    		},
	    	{
				field: 'creator',
				title: '创建人',
			    align: 'center'
			}, {
				field: 'created',
				title: '创建时间',
			    align: 'center',
				formatter:function(value,row,index){
					return stockPhysical.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
			}
    		]
    	});
    },
  //添加盘点明细
    addPhysicalDetail:function(){
    	  
		var params={
				'id':$("#rowId").val(),
    			'locationCode':$('#locationCodeAdd').val(),
    			'batchNo':$('#batchNoAdd').val(),
    			'actualQty':$('#actualQty').val(),
    			'physicalNo':$('#physicalNoAdd').val()
    		}
    		
    		$.callAjax({
    			type:"post",
    			url : stockPhysical.URL.addPhysicalDetailUrl(),
    			data : params,
    			async: false,
    			success : function(data){
             		if(data.code != "0000"){
             			$.toastrWarning(data.msg);
             			//填充dialog
             	    	//显示dialog
             			return;
             		}
             	   var physicalResults;
             	   var actualQty = parseFloat($("#actualQty").val())+parseFloat(stockPhysical.oldValue);
             	   stockPhysical.oldValue = actualQty;
             	   var diffQty = parseFloat(stockPhysical.planQty)-parseFloat(actualQty);
             	   if(parseFloat(stockPhysical.planQty)==parseFloat(actualQty)){
             		  physicalResults = 10;
             	   }else{
             		  physicalResults = 20;
             	   }
             	   
             	   $("#physicalDetailManagerTable").bootstrapTable('updateCell', {index: stockPhysical.rowIndex,field : 'actualQty',  value : actualQty});
             	   $("#physicalDetailManagerTable").bootstrapTable('updateCell', {index: stockPhysical.rowIndex,field : 'differenceQty',  value : diffQty});
             	   $("#physicalDetailManagerTable").bootstrapTable('updateCell', {index: stockPhysical.rowIndex,field : 'physicalResults',  value : physicalResults});
             	   $('#stockPhysicalManagerTable').bootstrapTable('refresh');
             	   var index = parseInt(stockPhysical.rowIndex)+1;
             	   $("#physicalDetailManagerTable tr").eq(index).find("td").css("background-color","yellow");
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
		
	},
	confirmPhysical:function(physicalNos){
	    		$.callAjax({
	    			type:"post",
	    			url : stockPhysical.URL.confirmPhysicalUrl()+"?physicalNos="+physicalNos,
	    			async: false,
	    			success : function(data){
	             		if(data.code != "0000"){
	             			$.toastrWarning(data.msg);
	             			//填充dialog
	             	    	//显示dialog
	             			return;
	             		}
	             		
	             		$.toastrSuccess("盘点完成成功!");
	             		$('#stockPhysicalManagerTable').bootstrapTable('refresh');
	    			},
	    			error : function(){
	    				$.toastrError();
	    			}
	    		});
			
	},
	generateAdjustment:function(physicalNos){
			$.callAjax({
				type:"post",
				url : stockPhysical.URL.generateAdjustmentUrl()+"?physicalNos="+physicalNos,
				async: false,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			//填充dialog
	         	    	//显示dialog
	         			return;
	         		}
	         		$('#stockPhysicalManagerTable').bootstrapTable('refresh');
				},
				error : function(){
					$.toastrError();
				}
			});
		
	},
    setPhysicalTableValue:function(row){
		$("#skuCodeAdd").val(row.skuCode);
    	$("#skuNameAdd").val(row.skuName);
    	$("#locationCodeAdd").val(row.locationCode);
    	$("#batchNoAdd").val(row.batchNo);
       	$("#storageDate").val(stockPhysical.format(row.storageDate,"yyyy-MM-dd HH:mm:ss"));
      	$("#proDate").val(stockPhysical.format(row.proDate,"yyyy-MM-dd HH:mm:ss"));
      	$("#status").val(row.status);
      	$("#planQty").val(row.planQty);
      	stockPhysical.oldValue = row.actualQty;
    	stockPhysical.planQty = row.planQty;
     },
	 bindEvent : function() {
		$("#btn_search").on("click", function() {
	  		  $("#btn_search").addClass("disabled");
	  		  stockPhysical.isResetOffset = 1;
			  $('#stockPhysicalManagerTable').bootstrapTable('refresh');
			
		});
		
		$("#btn_show_reset").on("click", function() {
			document.getElementById("searchform").reset();
		});
		
		$("#btn_save_submit").on("click", function() {
	    	var inputValue=document.getElementById("actualQty").value;
	    	var inputValueFilter=/^\d+$/;
	    	if(!inputValueFilter.test(inputValue)){
	    	          $.toastrWarning("请在输入框中输入数字！");
	    	          return false;
	    	}
			stockPhysical.addPhysicalDetail();
		});
		//绑定键盘事件
    	$(document).keydown(function (event) {
    		if(event.keyCode==13){
    			stockPhysical.isResetOffset = 1;
    			 $('#stockPhysicalManagerTable').bootstrapTable('refresh');
    		}
	    });
		$("#btn_show_add").on("click", function() {
			$('#addAnchorForm').bootstrapValidator('resetForm', true);
    		if($("#stockPhysicalManagerTable").bootstrapTable('getSelections').length==1){
    			$.map($("#stockPhysicalManagerTable").bootstrapTable('getSelections'), function(row) {
	    				if(row.state != "10"){
							$.toastrWarning("该盘点单已完成,不可重复操作！");
							return false;
						}
    					$("#myModalLabel").text("盘点操作");
    					$("#physicalNoAdd").val(row.physicalNo);
    					$("#operatName").val(myMain.selfCompanyName);
    					$("#warehouseNameAdd").val(homepage.warehouseName);
    					$("#physicalWay").val(row.physicalWay);
    					$("#stateAdd").val(row.state);
    	           		$("#physicalDetailManagerTable").bootstrapTable('destroy');
		        	    stockPhysical.searchDetailListByPage();
		        	    $("#btn_save_submit").show();
    					$.showModal("#myModal");
        		});
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
		});
		$("#btn_show_adjustment").on("click",function() {
					var physicalNos = $.getIdSelections(
							"#stockPhysicalManagerTable", "physicalNo");
					if (physicalNos == null || physicalNos == '') {
						$.toastrWarning('请先选择记录再操作！');
						return false;
					}
					$.dialogConfirm({
						message : '您确认要生成调整单吗？',
						callback : function(result) {
							if (result) {
								stockPhysical.generateAdjustment(physicalNos);
							}
						}
					});
		});
		
		$("#btn_show_complete").on("click", function() {
			var physicalNos = $.getIdSelections("#stockPhysicalManagerTable", "physicalNo");
			if (physicalNos == null || physicalNos == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}
			$.dialogConfirm({
			    message: '您确认要盘点完成吗？',
			    callback: function(result) {
			        if(result){
									stockPhysical.confirmPhysical(physicalNos);
			                  }
			            }
				    });
		});
 
	},
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	stockPhysical.initDropDownBox();
		stockPhysical.searchListByPage();
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
	var physicalNo=$('#physicalNo').val();//交易流水
	var state=$('#state').val();//状态
	var physicalResults=$('#physicalResults').val();//单证类型（增加，减少）
//	console.log(carNumber+"**"+driver+"**"+carType+"**"+enabled);
	
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockPhysical.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		physicalNo: physicalNo,
		state:state,
		physicalResults:physicalResults
	};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryDetailParams = function (params) {
	var physicalNo=$('#physicalNoAdd').val();//盘点单号
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: stockPhysical.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		physicalNo:physicalNo
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .physicalRow': function (e, value, row, index) {
	    	//触发查询详情的方法
			$('#addAnchorForm').bootstrapValidator('resetForm', true);
			$("#myModalLabel").text("盘点操作");
			$("#physicalNoAdd").val(row.physicalNo);
			$("#operatName").val(myMain.selfCompanyName);
			$("#warehouseNameAdd").val(homepage.warehouseName);
			$("#physicalWay").val(row.physicalWay);
			$("#stateAdd").val(row.state);
       		$('#physicalDetailManagerTable').bootstrapTable('destroy');
    	    stockPhysical.searchDetailListByPage();
    	    $('#btn_save_submit').hide();
			$.showModal("#myModal");
	    },
		//删除
		'click .deleteCars_a': function (e, value, row, index) {
			alert("删除");
		}
	    
	    
};

$(document).ready(function(){
	//1、初始化加载列表数据
	stockPhysical.init();
	//2、初始化绑定增删改查事件
	stockPhysical.bindEvent();
});
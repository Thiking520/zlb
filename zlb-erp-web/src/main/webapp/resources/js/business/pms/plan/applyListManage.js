var re = /^([0-9]{1,9}.?[0-9]{0,2})$/; //判断字符串是否为2位小数的数字 /^([0-9]{1,9}.?[0-9]{0,2})$/
var applyManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	applyId: 'null',
	initGoodsFlag:false,   //  初始化商品页面标识
	status:'NEW',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取采购申请单列表
    	searchListByPageUrl: function () {
            return '/apply/list';
        },
        //分页获取采购申请商品列表
        searchGoodsByPageUrl: function () {
            return '/apply/goods';
        },
        //删除采购申请
        deleteApplyUrl: function () {
        	return '/apply/delete';
        },
        //删除商品
        deleteGoodsUrl: function () {
            return '/apply/goods/delete';
        },
        //批量删除商品
        batchDeleteGoodsUrl: function () {
        	return '/apply/goods/batchDelete';
        },
        //保存采购申请单
        saveApplyUrl: function () {
        	return '/apply/save';
        },
        //提交采购申请单
        submitApplyUrl: function () {
        	return '/apply/submit';
        },
        //作废采购申请单
        cancelApplyUrl: function () {
        	return '/apply/cancel';
        },
        //通过商品编号添加商品
        addGoodsByCodeUrl: function () {
        	return '/apply/goods/addGoodsByCode';
        },
        //通过商品编号获取供应信息中的商品的信息（主供应商和单价）
        getGoodsByCodeUrl: function () {
        	return '/apply/goods/getGoodsByCode';
        },
        //商品的查询
        getSkucodesUrl: function () {
        	return '/apply/goods/getGoodsByCodeOrName';
        }
    },
    
    //商品列表
    searchSkucode:function () {
        $.pageTable({
            tableId: "#skuTable",//需要分页的table ID
            toolbar: '#toolbar',
            toolbarAlign: 'right',
            queryParams: queryParamSku,
            url: applyManage.URL.getSkucodesUrl(),//请求后台的URL（*）
            onLoadSuccess: function () {
            	applyManage.isResetOffset = 0;
            },
            sortable: true,
            sortName: 'id',
            sortOrder: 'desc',
            columns: [
                {
                	checkbox: true
                },
                {
                    field: 'goodsCode',
                    title: '商品编码',

                },
                {
                    field: 'goodsName',
                    title: '商品名称',

                }
            ]
        });
    },
    /**分页获取采购申请单列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#applyManageTable",//需要分页的table ID
    		url: applyManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			applyManage.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
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
    			title: '申请单生成方式',
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
    		} ,
			{
    			field: 'id',title: '操作',align: 'center',width:'16%',valign: 'middle',
    	        formatter:function(value,row,index){
    	        	var html=""
    	        		
	        		if(row.applyState=='NEW'||row.applyState=='REJ')
    	        	    html = html +'<a class="btn btn-primary btn-sm edit_a" href="javascript:void(0)" >编辑</a>'+
    	        			 '<a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >作废</a>';
    	        	
		            return html; 
    	        },
    	        events: 'operateEvents'
    	    }
    		]
    	});
    },
    
  //分页获取采购申请商品列表
    searchApplyGoodsList: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#applyGoodsTable",//需要分页的table ID
    		url: applyManage.URL.searchGoodsByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams1,
    		onLoadSuccess:function(){
    			applyManage.isResetOffset = 0;
    			applyManage.initGoodsPage();
    			applyManage.initDatetime();
    			if(applyManage.status=='SUB'|| applyManage.status=='APP'|| applyManage.status=='CAN'){
    				$("#applyGoodsTable").find("input,select").attr('disabled',true);
    				$("#applyGoodsTable tbody").find("tr td a.deleteGoods_a").remove();
    				$("#applyGoodsTable tbody").find("tr td div.form_datetime").each(function(){
    					$(this).replaceWith("<div style='width:160px;'><span>"+$(this).find("input[type='text']").val()+"</span></div>");
    				});
    			}
    		},
    		sortable: true,
    		sortName:'created',
    		sortOrder:'asc',
    		pagination: false,
    		uniqueId:'id',
    		columns: [
    		{field: 'id',visible:false},
			{field: 'goodsName',title: '商品名称',align: 'center',width:'10%',valign: 'middle'},
			{field: 'goodsCode',title: '商品编码',align: 'center',width:'10%',valign: 'middle'},  
			{field: 'goodsType',title: '商品类型',align: 'center',width:'10%',valign: 'middle'},  
			{field: 'goodsUnit',title: '单位',align: 'center',width:'6%',valign: 'middle'},  
			{field: 'goodsSuggest',title: '建议采购数量',align: 'center',width:'6%',valign: 'middle'},
			{field: 'goodsNumber',title: '拟采购数量',align: 'center',width:'6%',valign: 'middle',
				formatter:function(value,row,index){
						return '<input name="goodsNumber" id="goodsNumber_'+row.id+'" maxlength="14" class="form-control input-small goodsNumber" style="width: 60px;height:35px" type="text"  value="'+row.goodsNumber+'">';	
				},
				events: 'operateEvents'
			},
			{field: 'purchaseMode',title: '采购方式',align: 'center',width:'20%',valign: 'middle',
				formatter:function(value,row,index){
					if(row.purchaseMode=='1')
						return '<select class="form-control" name="purchaseMode" style="width: 150px;" id="purchaseMode_'+row.id+'" onchange=\"applyManage.changePurchaseMode(\''+row.id+'\',\''+row.goodsCode+'\',\''+index+'\')\">'
						+'<option value="0" >协议采购</option><option value="1" selected="selected">自采</option></select>';
					else
						return '<select class="form-control" name="purchaseMode" style="width: 150px;" id="purchaseMode_'+row.id+'" onchange=\"applyManage.changePurchaseMode(\''+row.id+'\',\''+row.goodsCode+'\',\''+index+'\')\">'
					       +'<option value="0" selected="selected">协议采购</option><option value="1">自采</option></select>';
				}
			},
			{field: 'supplier',title: '供应商',align: 'center',width:'18%',valign: 'middle',
				formatter:function(value,row,index){
						return '<input id="supplier_'+row.id+'" disabled class="form-control input-small" style="width: 150px;height:35px" type="text" value="'+row.supplier+ '">'
						+'<input id="supplierCode_'+row.id+'"  type="hidden" value="'+row.supplierCode+ '">';
				}
			},
			{field: 'goodsPrice',title: '供应单价',align: 'center',width:'6%',valign: 'middle',
				formatter:function(value,row,index){
						return '<input id="goodsPrice_'+row.id+'" class="form-control input-small goodsPrice" disabled style="width: 60px;height:35px" type="text"  value="'+row.goodsPrice+'">';	
				},
				events: 'operateEvents'
			},
			{field: 'lastestPrice',title: '上期供应单价',align: 'center',width:'6%',valign: 'middle'},
			{field: 'goodsAmount',title: '小计',align: 'center',width:'6%',valign: 'middle',
				formatter:function(value,row,index){
					return row.goodsNumber*row.goodsPrice;
				}	
			},
			{field: 'requestTime',title: '要求到货时间',align: 'center',width:'10%',valign: 'middle',
				formatter:function(value,row,index){
						return '<div class="input-group input-append date form_datetime" style="width: 160px; height: 35px;" readonly>'
						+'<input type="text" class="form-control" onchange="applyManage.chageRqVal(\''+row.id+'\',\''+index+'\')" id="requestTime_'+row.id+'" readonly style="width: 160px; height: 35px;" value="'
						+applyManage.format(row.requestTime,"yyyy-MM-dd HH:mm")+'" >'
						+'<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>'
						+'</div>';
				}
			},
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
   
  //刷新采购申请商品列表
    refreshGoodsPage:function(){
    	$('#applyGoodsTable').bootstrapTable('refresh');
    },
    //更新要求到货时间
    chageRqVal:function(id,index){
    	var requestTime = $('#requestTime_'+id).val();
    	$("#applyGoodsTable").bootstrapTable('updateCell', {index: index,field : 'requestTime',  value : requestTime,reinit:false});
    },
    //初始化商品编辑页面
    initGoodsPage:function(){
    	
    	applyManage.initGoodsFlag = true;
    	
    	var purchaseModes = document.getElementsByName("purchaseMode");
    	for(var i=0;i<purchaseModes.length;i++){
    		purchaseModes[i].onchange();
    	};
    	applyManage.initGoodsFlag = false;
    	
    },
    initDatetime:function(){
    	$.fn.datetimepicker.dates['zh-CN'] = {  
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],  
                daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],  
                daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],  
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                today: "今天",  
                suffix: [],  
                meridiem: ["上午", "下午"]  
        };  
        $(".form_datetime").datetimepicker({
        	language:  'zh-CN',  //中文显示
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left",
            startDate:new Date
        });
    },
    //通过商品编号添加商品    
    addGoodsByCode:function(goodsCode){
    	var params = {"applyId":applyManage.applyId,"goodsCodes":goodsCode};
    	$.callAjax({
    		type:"post",
    		url : applyManage.URL.addGoodsByCodeUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    			}else{
	         		$.toastrSuccess('添加成功！');
	         		$("#applyGoodsTable").bootstrapTable('append',data.data.rows);
	         		applyManage.initDatetime();
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
    	
    },
    
  //通过商品编号获取供应信息中的商品的信息（主供应商和单价）
  changePurchaseMode:function(id,goodsCode,index){
    	var purchaseMode = $('#purchaseMode_'+id).val();
    	$("#applyGoodsTable").bootstrapTable('updateCell', {index: index,field : 'purchaseMode',  value : purchaseMode,reinit:false});
      	var params = {"goodsCode":goodsCode};
      	if(purchaseMode=='0'){
	      	$.callAjax({
	      		type:"post",
	      		url : applyManage.URL.getGoodsByCodeUrl(),
	      		data : params,
	      		success : function(data){
	      			if(data.code != "0000"){
	      				if(applyManage.initGoodsFlag!=true)     //   初始化时，不显示提示，（因为提示太多）
	      					$.toastrWarning(data.msg);
	      			}else{
      					$('#supplier_'+id).prop('disabled',true);
          				$('#supplier_'+id).val(data.data.supplierName);
          				$('#supplierCode_'+id).val(data.data.supplierCode);
          				$('#goodsPrice_'+id).val(data.data.goodsPrice);
          				applyManage.sumGoodsAmountByPrice(id,index);
          			    $('#goodsPrice_'+id).prop('disabled',true);
	      			}
	      		},
	      		error : function(){
	      			$.toastrError();
	      		}
	      	});
		}else {
			$('#supplier_'+id).prop('disabled',false);
			$('#goodsPrice_'+id).prop('disabled',false);
		}
    },
    
    // 小计商品金额
   sumGoodsAmountByGsNumber: function(id,index){
	   var goodsNumber = $('#goodsNumber_'+id).val();
	   var goodsPrice = $('#goodsPrice_'+id).val();
	   if(!re.test(goodsPrice)||!re.test(goodsNumber)) {
			alert("请输入数字");
			return false;
	   }
	   var goodsAmount = goodsPrice*goodsNumber;
	   $("#applyGoodsTable").bootstrapTable('updateCell', {index: index,field : 'goodsNumber',  value : goodsNumber,reinit:false});
	   $("#applyGoodsTable").bootstrapTable('updateCell', {index: index,field : 'goodsAmount',  value : goodsAmount,reinit:false});
	   $("#applyGoodsTable").find("tr").eq(index+1).find("td").eq("10").text(goodsAmount);
   },
   sumGoodsAmountByPrice: function(id,index){
	   var goodsNumber = $('#goodsNumber_'+id).val();
	   var goodsPrice = $('#goodsPrice_'+id).val();
	   debugger;
	   if(!re.test(goodsPrice)||!re.test(goodsNumber)) {
			alert("请输入数字");
			return false;
		}
	   var goodsAmount = goodsPrice*goodsNumber;
	   $("#applyGoodsTable").bootstrapTable('updateCell', {index: index,field : 'goodsPrice',  value : goodsPrice,reinit:false});
	   $("#applyGoodsTable").bootstrapTable('updateCell', {index: index,field : 'goodsAmount',  value : goodsAmount,reinit:false});
	   $("#applyGoodsTable").find("tr").eq(index+1).find("td").eq("10").text(goodsAmount); 
   },
  
   
   /**删：删除采购申请**/
   deleteApply: function (applyId) {
	   
	   $.dialogConfirm({
		   message: '您确定要删除吗?',
		   callback: function(result) {
			   if(result) {
				   var params = {"id":applyId};
				   $.callAjax({
					   url : applyManage.URL.deleteApplyUrl(),
					   data : params,
					   success : function(data){
						   $.toastrSuccess('删除成功！');
						   $('#applyManageTable').bootstrapTable('refresh');
					   }
				   });
			   }
		   }
	   });
   },

  /**删：删除商品**/
  deleteGoods: function (goodsId) {
  	$.dialogConfirm({
          message: '您确定要删除吗?',
          callback: function(result) {
              if(result) {
         		var params = {"id":goodsId};
      			$.callAjax({
      				url : applyManage.URL.deleteGoodsUrl(),
      				data : params,
      				success : function(data){
  		         		$("#applyGoodsTable").bootstrapTable('removeByUniqueId',goodsId);
  		         		applyManage.initDatetime();
  		         		$.toastrSuccess('删除成功！');
      				}
      			});
              }
          }
      });
  },
  
  /**删：批量删除商品**/
  batchDeleteGoods: function (goodsIds) {
  	var params = {"ids":goodsIds};
  	$.callAjax({
  		type:"post",
  		url : applyManage.URL.batchDeleteGoodsUrl(),
  		data : params,
  		success : function(data){
  			if(data.code != "0000"){
  				$.toastrWarning(data.msg);
  			}else{
  				$.toastrSuccess('操作成功！');
				$('#applyGoodsTable').bootstrapTable('refresh');
  			}
  		},
  		error : function(){
  			$.toastrError();
  		}
  	});
  },
  
  saveApply: function () {
	  
	  var checkArray =  $("#applyGoodsTable").bootstrapTable("getData");
	  if(checkArray.length<=0){
		  $.toastrWarning("暂无记录需要保存");
	  	  return false;
	  }
		var goodsList = new Array();
		for (var i = 0; i < checkArray.length; i++) {
			var id = checkArray[i].id;
		    var goodsNumber = $('#goodsNumber_'+id).val();
		    var goodsPrice = $('#goodsPrice_'+id).val();
		    var goodsAmount = $('#goodsAmount_'+id).val();
		    var purchaseMode = $('#purchaseMode_'+id).val();
		    var supplierCode = $('#supplierCode_'+id).val();
		    var supplier = $('#supplier_'+id).val();
		    var requestTime= "";
		    if($('#requestTime_'+id).val() !=null && $('#requestTime_'+id).val() !=''){
		    	requestTime = $('#requestTime_'+id).val()+":00";	
		    }
		    goodsList[i] = {"id":id,"goodsNumber":goodsNumber,"goodsPrice":goodsPrice,"goodsAmount":goodsAmount,"purchaseMode":purchaseMode,"supplierCode":supplierCode,"supplier":supplier,"requestTime":requestTime};
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
					  
					  if(applyManage.applyId=='null')
						 applyManage.applyId = data.data.id;
					  
					  $("#applyGoodsTable").bootstrapTable('destroy');
					  $('#applyManageTable').bootstrapTable('refresh');
					  
					  $.hideModal('#editModal');
				  }
			  },
			  error : function(){
				  $.toastrError();
			  }
		  });
  },
  
  submitApply: function () {
	    var checkArray =  $("#applyGoodsTable").bootstrapTable("getData");
	  	if(checkArray.length<=0){
	  		$.toastrWarning("暂无可以提交审批的记录");
	  		return false;
	  	}
		var goodsList = new Array();
		for (var i = 0; i < checkArray.length; i++) {
			var id = checkArray[i].id;
		    var goodsNumber = $('#goodsNumber_'+id).val();
		    var goodsPrice = $('#goodsPrice_'+id).val();
		    var goodsAmount = $('#goodsAmount_'+id).val();
		    var purchaseMode = $('#purchaseMode_'+id).val();
		    var supplierCode = $('#supplierCode_'+id).val();
		    var supplier = $('#supplier_'+id).val();
		    var requestTime= "";
		    if($('#requestTime_'+id).val() !=null && $('#requestTime_'+id).val() !=''){
		    	requestTime = $('#requestTime_'+id).val()+":00";	
		    }
		    goodsList[i] = {"id":id,"goodsNumber":goodsNumber,"goodsPrice":goodsPrice,"goodsAmount":goodsAmount,"purchaseMode":purchaseMode,"supplierCode":supplierCode,"supplier":supplier,"requestTime":requestTime};
		}
		var qtyIsOk =false;
	  	var requestTimeIsOk =false;
	  	
	  	$.each(goodsList,function(index,obj){
	  		if(obj.goodsNumber ==0|| !re.test(obj.goodsNumber)){
	  				qtyIsOk = true;
	  				return;
	  		}
	  		if(obj.requestTime =='' || obj.requestTime==null){
	  			requestTimeIsOk = true;
  				return;
	  		}
	  	});
	  	if(qtyIsOk){
	  		$.toastrWarning("拟采购数量必须是大于0的数字");
	  		return false;
	  	}
	  	if(requestTimeIsOk){
	  		$.toastrWarning("要求到货时间不能为空");
	  		return false;
	  	}
   		var params = {"id":applyManage.applyId,"goodsList":goodsList}
   		
	  	$.callAjax({
	  		type:"post",
	  		url : applyManage.URL.submitApplyUrl(),
	  		data : params,
	  		success : function(data){
	  			if(data.code != "0000"){
	  				$.toastrWarning(data.msg);
	  			}else{
	  				$.toastrSuccess('操作成功！');
	  				
					if(applyManage.applyId=='null')
						 applyManage.applyId = data.data.id;
					  
					$('#applyGoodsTable').bootstrapTable('refresh');
					$('#applyManageTable').bootstrapTable('refresh');
					$.hideModal('#editModal');
	  			}
	  		},
	  		error : function(){
	  			$.toastrError();
	  		}
	  	});
	  },
	  
	  cancelApply: function (id) {
		  $.dialogConfirm({
			  message: '您确定要作废此采购申请吗?',
			  callback: function(result) {
				  if(result) {
					  var params = {"id":id};
					  $.callAjax({
						  url : applyManage.URL.cancelApplyUrl(),
						  data : params,
						  success : function(data){
							  $.toastrSuccess('作废成功！');
							  $('#applyManageTable').bootstrapTable('refresh');
						  }
					  });
				  }
			  }
		  });
	  },
  
    bindEvent: function () {
    	
    	//打开新增页面
    	$("#btn_new").on('click',function() {
    		$("#goodsCode_key").val("");
    		$.showModal('#editModal');
    		applyManage.applyId='';
    		applyManage.status='';
        	$('#btn_div').css("display","block");
	    	$("#addTableBt").css("display","block");
	    	$("#applyGoodsTable").bootstrapTable('destroy');
    		applyManage.searchApplyGoodsList();
    	});
    	
    	//打开新增页面
    	$("#btn_search").on('click',function() {
    		$("#btn_search").addClass("disabled");
    		applyManage.isResetOffset = 1;
    		$('#applyManageTable').bootstrapTable('refresh');
    	});
    	
    	$("#btn_add").on('click',function() {
    		var goodsCode = $('#goodsCode_key').val();
        	if(goodsCode==null || goodsCode ==''){
        		$.toastrWarning("请先选择商品");
        		return false;
        	}
    		applyManage.addGoodsByCode(goodsCode);
    	});
    	
    	$("#btn_save").on('click',function() {
    		applyManage.saveApply();
    	});
    	
    	$("#btn_submit").on('click',function() {
    		applyManage.submitApply();
    	});
    	
    	$("#btn_cancel").on('click',function() {
    		applyManage.cancelApply();
    	});
    	//绑定商品编码
        $("#clickSkucode").click(function () {
            $.showModal('#skuCodeModel');
            $("#skuCode").val("");
        	$("#skuName").val("");
            applyManage.searchSkucode();  //商品编码列表
            $('#skuTable').bootstrapTable('refresh');
        });
        //商品查询
        $("#btn_search_sku").on("click", function () {
        	applyManage.isResetOffset = 1;
            $('#skuTable').bootstrapTable('refresh');
        });
        //商品
        $("#driver_sku_save").click(function () {
           var skuCode = $.getIdSelections("#skuTable","goodsCode");
           var skuName = $.getIdSelections("#skuTable","goodsName");
           if(skuCode.length==0){
               $.toastrWarning('请先选择商品再操作！');
               return false;
           }else {
               $("#goodsCode_key").val(skuCode);
               $.hideModal('#skuCodeModel');
           }
        });
        $("#btn_clean").on('click',function(id) {
    		$.clearForm("searchForm");
    	});
    	
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	//初始化下拉框
    	/*$.fn.datetimepicker.dates['zh-CN'] = {  
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],  
                daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],  
                daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],  
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                today: "今天",  
                suffix: [],  
                meridiem: ["上午", "下午"]  
        };  
        $(".form_datetime").datetimepicker({
        	language:  'zh-CN',  //中文显示
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left",
            startDate:new Date
        });
        */
    	applyManage.searchListByPage();
    	applyManage.initDatetime();
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
		return '';
	},
	
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'input .goodsNumber':function(e, value, row, index){
		applyManage.sumGoodsAmountByGsNumber(row.id, index);
	},
	'input .goodsPrice':function(e, value, row, index){
		applyManage.sumGoodsAmountByPrice(row.id, index);
	},
	//编辑采购申请
    'click .edit_a': function (e, value, row, index) {
    	$("#goodsCode_key").val("");
    	$.showModal('#editModal');
    	applyManage.applyId = row.id;
    	applyManage.status= row.applyState;
    	$("#applyGoodsTable").bootstrapTable('destroy');
    	applyManage.searchApplyGoodsList();
    	if(row.applyState=='NEW'||row.applyState=='REJ'){
	    	$('#btn_div').css("display","block");
    	}else{
	    	$('#btn_div').css("display","none");
    	}
	},

	//删除采购申请
	'click .delete_a': function (e, value, row, index) {
		applyManage.cancelApply(row.id);
	},
	
	//删除商品
	'click .deleteGoods_a': function (e, value, row, index) {
		var uniqueid = $("#applyGoodsTable").find("tr").eq(index+1).attr('data-uniqueid');
		applyManage.deleteGoods(uniqueid);
	},
	
    'click .detail_a': function (e, value, row, index) {
    	$.showModal('#editModal');
    	applyManage.applyId = row.id;
    	applyManage.status= row.applyState;
    	$("#applyGoodsTable").bootstrapTable('destroy');
    	applyManage.searchApplyGoodsList();
    	if(row.applyState=='NEW'||row.applyState=='REJ'){
	    	$('#btn_div').css("display","block");
	    	$("#addTableBt").css("display","block");
    	}else{
	    	$('#btn_div').css("display","none");
	    	$("#addTableBt").css("display","none");
    	}
	}
};

//商品查询参数
var queryParamSku = function (params) {
    var skuCode =$("#skuCode").val();
    var skuName = $("#skuName").val();
    var tempSku ={
        pageSize: params.limit,   //页面大小
        offset: applyManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        goodsCode:skuCode, //商品编码
        goodsName:skuName  //商品名称
    };
    return tempSku;
}

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
	
//	applyManage.globalParams = temp;
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
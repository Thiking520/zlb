// 存放每个功能模块业务逻辑JS
// javascript 模块化
var returnOrdersManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	globalParams:"",
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/returnOrders/list';
        },//更新换货订单备注的请求地址
        updateRemarkUrl: function () {
            return '/returnOrders/updateRemark';
        },//批量导出换货订单详情
        exportExchangeGoodsOrderDetailListUrl: function () {
        	return '/returnOrders/exportExcel';
        },//批量审核换货订单详情
        batchAuditUrl: function () {
        	return '/returnOrders/batchAudit';
	    },//初始化下拉框数据请求地址
	    initDropDownBoxUrl: function () {
	    	return '/returnOrders/initDropDownBox';
	    },
    	//查询订单详情地址
    	selectExchangeOrdersDetails: function () {
            return '/returnOrders/selectReturnOrderDetails';
        }
    },
    /**分页获取换货订单列表**/
    searchListByPage: function () {
    	var params = myMain.getUrlValue('params');
    	setQueryParams($.parseJSON(params));
    	
    	//分页组件
    	$.pageTable({
    		tableId: "#returnOrdersManageTable",//需要分页的table ID
    		url: returnOrdersManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			returnOrdersManage.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
                $.resizeOrderTable("returnOrdersManageTable");
            },
            sortable: true,
    		sortName:'sale_time',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'displayOrderId',
    			title: '退订单号',
    			formatter:function(value,row,index){
					return '<a class="orderDetail_a" href="javascript:void(0)" displayOrderId="' + row.displayOrderId +'">' + row.displayOrderId + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'relationDisplayOrderId',
    			title: '关联的销售订单号'
    		}, {
    			field: 'tradePlatform',
    			title: '付款方式'
    		},
    		{
    			field: 'source',
    			title: '订单来源'
    		},
    		{
    			field: 'place',
    			title: '订单渠道'
    		},
    		{
    			field: 'whereabouts',
    			title: '订单去向'
    		},{
    			field: 'goodsList',//展示用商品名字
    			title: '商品',
    			formatter:function(value,row,index){
    				var result = '';
    				for(var i = 0;i < value.length; i++) {
    					if(i > 2){
    						result = result + '<span class="goodsMoreDetail_a" >...</span>';
    						break;
    					}
    					str = value[i].goodsName+"&nbsp;¥"+value[i].goodsPrice+"&nbsp;数量:"+value[i].goodsNumber+"&nbsp;";
    					var goods_a = '<span class="goodsDetail_a"  goods="' + value[i].id +'">' + str + '</span>';
    					result = result + goods_a + '</br>';
    				}
                    result = '<div style="width: 200px">'+result+'</div>';
    				return result;
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'orderAddressee',
    			title: '买家',
    		    align: 'center',
    			formatter:function(value,row,index){
    				var str = '<span class="buyersDetail_a" buyers="' + row.buyers +'">' + row.buyers + '</span></br>';
					str = str + value.consumerName + '</br>';
					str = str + value.consumerMobile + '</br>';
					str = str + value.consumerAddress + '</br>';
                    str = '<div style="width: 200px">'+str+'</div>';
    				return str;
    			},
    	        events: 'operateEvents'
    		},{
    			field: 'saleTime',
    			title: '下单时间',
    			align: 'center'
//    			formatter:function(value,row,index){
//    				
//    				return new Date(value).Format("yyyy-MM-dd hh:mm:ss"); 
//    			}
    		},{
//    			field: 'orderState',
    			field: 'orderStateName',
    			title: '订单状态',
    			align: 'center'
    		},{
    			field: 'orderTotalAmount',
    			title: '应付金额',
    			align: 'center'
    		},{
    			field: 'orderDiscount',//需计算
    			title: '优惠金额',
    			align: 'center'
    		},{
    			field: 'actualAmount',
    			title: '实付金额',
    			align: 'center'
    		},{
    			field: 'buyersLeave',
    			title: '买家留言',
    			align: 'center'
    		},{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
//    	        	var lockBtn = '<a class="btn btn-info lockOrder_a" href="javascript:void(0)" >订单锁定</a>';
    	        	var detailBtn = '<a class="btn btn-info btn-sm orderDetail_a" href="javascript:void(0)" >查看详情</a>';
    	        	var html='';
    				var updateRemarkUrl = returnOrdersManage.URL.updateRemarkUrl();
    				var remarkBtn = '<a class="btn btn-info btn-sm remark_a" href="javascript:void(0)" id='+row.id+' >备注</a>';
    				if(auth.isAuth(updateRemarkUrl)){
    					html += remarkBtn;
    				}
    	        	// 审核按钮根据状态不同显示不同 TODO
//    	        	var auditBtn = '';
//    	        	if(row.orderStateName == '1'){
//    	        		auditBtn = '<a class="btn btn-info audit_a" href="javascript:void(0)" >客服审核</a>';
//    	        	}else if(row.orderStateName == '2'){
//    	        		
//    	        	}else if(row.orderStateName == '3'){
//    	        		
//    	        	}else if(row.orderStateName == '4'){
//    	        		
//    	        	}else if(row.orderStateName == '5'){
//    	        		
//    	        	}else if(row.orderStateName == '6'){
//    	        		
//    	        	}else if(row.orderStateName == '7'){
//    	        		
//    	        	}else if(row.orderStateName == '99'){
//    	        		
//    	        	}else if(row.orderStateName == '0'){
//    	        		
//    	        	}
    	        	
    	            return  detailBtn +  html;
    	        },
    	        events: 'operateEvents'
    	    }  
    		]
    	});
    },
    /**查：查看退货订单详情**/
    getOrderDetails: function (id) {
    	var params = saleOrderManage.globalParams; //获取列表页的查询条件
    	params = JSON.stringify(params);
    	var url = returnOrdersManage.URL.selectExchangeOrdersDetails()+'?id='+id+"&params="+params;
    	myMain.getAllContent(url);
    },
    /**批量导出**/
    exportOrderDetails: function () {
    	$('#btn_show_export').addClass("disabled");
    	//触发Ajax
    	$('#returnOrdersManageTable').bootstrapTable('refresh');
    	var params = returnOrdersManage.globalParams;
//    	var params = $('#returnOrdersManageTable').bootstrapTable('getOptions').queryParams();
    	
    	$.callAjax({
    		url : returnOrdersManage.URL.exportExchangeGoodsOrderDetailListUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000" || $.isNull(data.data)){
    				$.toastrWarning(data.msg);
    				$('#btn_show_export').removeClass("disabled");
    				return;
    			}else{
    				if($.isNotNull(data.data)){
    					$.toastrSuccess('正在导出！');
    					var fileName = data.data;
    					var contextPath = $("#contextPath").val();
    					//请求下载excel
                        fileName = encodeURI(fileName);
    					location.href=contextPath+"/returnOrders/download?fileName="+fileName;
    				}else{
    					$.toastrSuccess(data.msg);
    				}
    			}
    			$('#btn_show_export').removeClass("disabled");
    		},
    		error : function(){
    			$('#btn_show_export').removeClass("disabled");
    			$.toastrError();
    		}
    	});
    },
    /**更新：更新换货订单备注信息**/
    updateRemark: function (orderId,remark) {
    	if(remark.length>180){
    		$.toastrWarning('字符长度不能超过180!');  
    		return false;
    	}
    	//触发Ajax
    	var params = {"id":orderId,"distributionNote":remark};
//    	params = JSON.stringify(params);
    	$.callAjax({
    		type:"post",
    		url : returnOrdersManage.URL.updateRemarkUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    			}else{
    				$.toastrSuccess('操作成功！');
					$.hideModal('#myRemarkModal');
					$('#returnOrdersManageTable').bootstrapTable('refresh');
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
    },
    //批量审核
    batchAudit: function (orderIds,orderState,operation) {
    	$('#btn_show_batch_audit').addClass("disabled");
    	//触发Ajax
    	var params = {"ids":orderIds,"orderState":orderState,"operation":operation};
//    	params = JSON.stringify(params);
    	$.callAjax({
    		type:"post",
    		url : returnOrdersManage.URL.batchAuditUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    			}else{
    				$.toastrSuccess('操作成功！');
					$('#returnOrdersManageTable').bootstrapTable('refresh');
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
    },
    //允许/拒绝弹出框
    batchAuditDialog:function(message,label1,label2,ids,orderState){
    	//操作1允许,2拒绝
    	BootstrapDialog.show({
			title: '批量审核',
            message: message,
            buttons: [{
            	label: label1,
                // no title as it is optional
                cssClass: 'btn-primary',
                action: function(dialogRef){
                	var operation = 1;//允许操作
                    returnOrdersManage.batchAudit(ids,orderState,operation);
                    dialogRef.close();
                }
            }, {
            	icon: 'glyphicon glyphicon-ban-circle',
                label: label2,
                cssClass: 'btn-warning',
            	action: function(dialogRef){
            		var operation = 2;//拒绝操作
                    returnOrdersManage.batchAudit(ids,orderState,operation);
                    dialogRef.close();
                }
            }, {
                label: '关闭',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]
        });
    },
    //展示批量审核，批量打印，批量导出等按钮
    showServiceBtn:function(){
    	var orderState = $("#feature-tab").find(".active").find("a").attr("orderState");
		var btn_show_export = returnOrdersManage.URL.exportExchangeGoodsOrderDetailListUrl();
		var btn_show_batch_audit = returnOrdersManage.URL.batchAuditUrl();

		//先把批量功能都隐藏了，在根据判断条件控制隐藏还是显示
    	$("#btn_show_print").hide();
    	$("#btn_show_batch_audit").hide();
    	$("#btn_show_export").hide();
		if(orderState == ''){//全部状态时隐藏批量打印，批量审核
			$("#btn_show_batch_audit").hide();
			if(auth.isAuth(btn_show_export)){
				$("#btn_show_export").show();
			}
		}else if(orderState == 1 ){
			if(auth.isAuth(btn_show_batch_audit)){
				$("#btn_show_batch_audit").show();
			}
			if(auth.isAuth(btn_show_export)){
				$("#btn_show_export").show();
			}
		}else if( orderState == 5 || orderState == 6){
			if(auth.isAuth(btn_show_batch_audit)){
				$("#btn_show_batch_audit").show();
			}
			if(auth.isAuth(btn_show_export)){
				$("#btn_show_export").show();
			}
		}else if( orderState == 0 ){
			$("#btn_show_batch_audit").hide();
			if(auth.isAuth(btn_show_export)){
				$("#btn_show_export").show();
			}
		}else if(  orderState == 99){
			$("#btn_show_batch_audit").hide();
			if(auth.isAuth(btn_show_export)){
				$("#btn_show_export").show();
			}
		}else{
			$("#btn_show_batch_audit").hide();
			$("#btn_show_export").hide();
		}
    },
    bindEvent: function () {
    	//近7天移入事件
    	$("#btn_date_7days").on("mouseover",function () {
    		if($(this).attr("isClick") != 1){//如果没有被点击设为蓝色，如果被点击了，什么都不做
    			$(this).attr("class","btn btn-primary btn-sm");
    		}
    	});
    	//近7天移出事件
    	$("#btn_date_7days").on("mouseout",function () {
    		if($(this).attr("isClick") != 1){//如果没有被点击设为默认，如果已点击，什么都不做
    			$(this).attr("class","btn btn-inverse btn-default btn-sm");
    		}
    	});
    	//近30天移入事件
    	$("#btn_date_30days").on("mouseover",function () {
    		if($(this).attr("isClick") != 1){//如果没有被点击设为蓝色，如果被点击了，什么都不做
    			$(this).attr("class","btn btn-primary btn-sm");
    		}
    	});
    	//近30天移出事件
    	$("#btn_date_30days").on("mouseout",function () {
    		if($(this).attr("isClick") != 1){//如果没有被点击设为默认，如果已点击，什么都不做
    			$(this).attr("class","btn btn-inverse btn-default btn-sm");
    		}
    	});
    	//清空事件
    	$("#btn_clean").on("click",function () {
    		$.clearForm("mainForm");
    	});
    	//绑定状态栏点击事件
    	$(".orderStateClass").click(function(){
    		$("#feature-tab").find(".active").removeClass("active");
    		$(this).addClass("active");
    		//展示批量审核，批量打印，批量导出等按钮
    		returnOrdersManage.showServiceBtn();
    		$('#returnOrdersManageTable').bootstrapTable('refresh');
    	});
    	
    	$(".glyphicon-remove").off().on('click',function () {
    		$(this).parent().off();
    		$(this).parent().prev().prev().val("");
    	});
    	    	
    	//绑定近7天界面事件
    	$("#btn_date_7days").click(function () {
    		//设置点击标识及点击样式
    		$(btn_date_7days).attr("class","btn btn-primary btn-sm");
    		$(btn_date_7days).attr("isClick",1);
    		$(btn_date_30days).attr("class","btn btn-inverse btn-default btn-sm");
    		$(btn_date_30days).attr("isClick",0);
    		
    		var date=new Date();
    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
    		var startDate =new Date((+date)-7*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
    		$("#datetimepickerStart").val(startDate);
    		$("#datetimepickerEnd").val(today);
    	});
    	
    	//绑定近30天界面事件
    	$("#btn_date_30days").click(function () {
    		$(btn_date_30days).attr("class","btn btn-primary btn-sm");
    		$(btn_date_30days).attr("isClick",1);
    		$(btn_date_7days).attr("class","btn btn-inverse btn-default btn-sm");
    		$(btn_date_7days).attr("isClick",0);
    		var date=new Date();
    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
    		var startDate =new Date((+date)-30*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
    		$("#datetimepickerStart").val(startDate);
    		$("#datetimepickerEnd").val(today);
    	});
    	
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		returnOrdersManage.isResetOffset = 1;
    		$('#returnOrdersManageTable').bootstrapTable('refresh');
    	});
        //绑定展示显示搜索条件按钮事件
        $("#btn_show_search").click(function () {
            var isHidden = $(".alert-info").is(":hidden");
            debugger;
            if(isHidden){//如果已经隐藏，就显示
                $(".alert-info").show();
                $("#btn_show_search").children("span").next().text("隐藏搜索条件");
            }else{//已经显示就隐藏
                $(".alert-info").hide();
                $("#btn_show_search").children("span").next().text("显示搜索条件");
            }
        });
    	//绑定展示批量打印界面事件
    	$("#btn_show_export").click(function () {
//		     $("#myModalLabel").text("批量导出换货订单");
//		     $.showModal('#myModal');;
    		returnOrdersManage.exportOrderDetails();
	    });
    	//绑定展示批量打印界面事件
    	$("#btn_show_print").click(function () {
    		$("#myModalLabel").text("批量打印换货订单");
    		$.showModal('#myModal');;
    	});
    	//绑定展示批量审核界面事件
    	$("#btn_show_batch_audit").click(function () {
    		
    		var orderIds = $.getIdSelections("#returnOrdersManageTable","id");
        	if(orderIds==null||orderIds==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		var orderState = $("#feature-tab").find(".active").find("a").attr("orderState");
//    		var orderState = $("#feature-tab").find(".active").find("a").attr("orderState");
//    		var operation = $("#feature-tab").find(".active").find("a").attr("operation");
    		if(orderState == 0){
    			$.toastrWarning("暂不支持全部状态的批量审核，请选择一个状态后再操作");
    		}else{
    			//根据不同状态，提示
//    			1.客服审核
//    			2.仓库发货 
//    			3.用户签收 （暂定跟货物送达一样）
//    			4.用户评价  
//    			5.配送员揽收
//    			6.财务审核
//    			99.已完成
//    			0.已取消
    			//orderState在后台业务层进行转换
    			if(orderState == '1'){
    				var message = '请选择你要进行的操作！批量审核时将默认退回商品！';
    				returnOrdersManage.batchAuditDialog(message,'同意退货','拒绝退货',orderIds,orderState);   				
    			}
    			//待配送员揽收
    			if(orderState == '5'){
    				var message = '请选择你要进行的操作！';
    				returnOrdersManage.batchAuditDialog(message,'同意揽收','拒绝揽收',orderIds,orderState);   				
    			}
    			//待财务审核
    			if(orderState == '6'){
    				var message = '请选择你要进行的操作！';
    				returnOrdersManage.batchAuditDialog(message,'同意退款','拒绝退款',orderIds,orderState);   				
    			}
    		}
    	});
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		$("#myModalLabel").text("新增换货订单");
    		$.showModal('#myModal');
    	});
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 returnOrdersManage.isResetOffset = 1;
    			 $('#returnOrdersManageTable').bootstrapTable('refresh');
    		}
	    }); 
    	
    	$("#btn_remark_save_submit").on("click",function () {  
    		var id = $("#remark_order_id").attr("value");
	    	var distributionNote =  $("#remark").val();
	    	//触发更新换货订单备注信息的方法
	    	returnOrdersManage.updateRemark(id,distributionNote);
    	});
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
        var orderState = myMain.getUrlValue('orderState');
    	
    	if(orderState != null){
    		$("#feature-tab").find(".active").removeClass("active");
    		$("#orderStateSS").addClass("active");
    	}
    	
    	//初始化日期控件
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
//        $(".form_datetime").datetimepicker({
        $(".form_datetime").datetimepicker({
        	language:  'zh-CN',  //中文显示
            format: "yyyy-mm-dd hh:ii:ss",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });
        //初始化下拉框
        returnOrdersManage.showServiceBtn();
        returnOrdersManage.initDropDownBox();
    	returnOrdersManage.searchListByPage();
    	
    },
    //初始化下拉框数据
    initDropDownBox: function (){
//    	var params = {};
    	$.callAjax({
			type:"post",
			url : returnOrdersManage.URL.initDropDownBoxUrl(),
//			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		//初始化下拉框数据
         		var queryList = data.data.queryList;
         		var paymentList = data.data.paymentList;
         		var sourceList = data.data.sourceList;
         		var whereaboutsList = data.data.whereaboutsList;
         		var subsetTypeList = data.data.subsetTypeList;
         		for(var i=0;i<queryList.length;i++){
         			if( queryList[i].dictValue == '3' || queryList[i].dictValue == '4' || queryList[i].dictValue == '8' || queryList[i].dictValue == '10'){
         				continue;
         			}
         			$('#searchType').append('<option value="'+queryList[i].dictValue+'">'+queryList[i].dictDesc+'</option>');
         		}
         		$('#tradePlatform').append('<option value="">'+"全部"+'</option>');
         		for(var i=0;i<paymentList.length;i++){
         			$('#tradePlatform').append('<option value="'+paymentList[i].dictValue+'">'+paymentList[i].dictDesc+'</option>');
         		}
         		$('#source').append('<option value="">'+"全部"+'</option>');
         		for(var i=0;i<sourceList.length;i++){
         			$('#source').append('<option value="'+sourceList[i].dictValue+'">'+sourceList[i].dictDesc+'</option>');
         		}
         		$('#whereabouts').append('<option value="">'+"全部"+'</option>');
         		for(var i=0;i<whereaboutsList.length;i++){
         			$('#whereabouts').append('<option value="'+whereaboutsList[i].dictValue+'">'+whereaboutsList[i].dictDesc+'</option>');
         		}
         		$('#orderSubsetType').append('<option value="">'+"全部"+'</option>');
         		for(var i=0;i<subsetTypeList.length;i++){
         			if(subsetTypeList[i].dictValue == '0' || subsetTypeList[i].dictValue == '1' || subsetTypeList[i].dictValue == '2' || subsetTypeList[i].dictValue == '3')
         			$('#orderSubsetType').append('<option value="'+subsetTypeList[i].dictValue+'">'+subsetTypeList[i].dictDesc+'</option>');
         		}
			},
			error : function(){
				$.toastrError();
			}
		});
    }
}

//设置列表查询
var setQueryParams = function (params) {
	//自定义查询参数,昵称、公司名
//	if($.isNotNull(params)){
	if(params != null && params != "null" && params != ""){
		$("#tradePlatform").val(params.tradePlatform);
		$("#source").val(params.source);
		$("#whereabouts").val(params.whereabouts);
		$("#place").val(params.place);
		$("#orderType").val(params.orderType);
		
		//设置订单列表的查询状态
		$("#feature-tab").find(".active").removeClass("active");
		$("#feature-tab a[orderState="+params.orderState+"]").parent().addClass("active");
		
		$("#searchType").val(params.so.searchType);
		$("#searchKeyword").val(params.so.searchKeyword);
//		$("#feature-tab").find(".active").find("a").attr("orderState");
		$("#datetimepickerStart").val(params.so.start);
		$("#datetimepickerEnd").val(params.so.end);
		$("#orderSubsetType").val(params.orderSubsetType);
	}
	
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	
	var tradePlatform = $("#tradePlatform").val();
	var source = $("#source").val();
	var whereabouts = $("#whereabouts").val();
	var orderType = $("#orderType").val();
	var searchType = $("#searchType").val();
	var searchKeyword = $("#searchKeyword").val();
	var orderState = $("#feature-tab").find(".active").find("a").attr("orderState");
	var datetimepickerStart = $("#datetimepickerStart").val();
	var datetimepickerEnd = $("#datetimepickerEnd").val();
	var orderSubsetType = $("#orderSubsetType").val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    tradePlatform: tradePlatform,
	    source: source,
	    whereabouts: whereabouts,
	    orderType: orderType,
	    orderSubsetType:orderSubsetType,
	    orderState:orderState,//订单状态
		so:{
			searchType: searchType,
			searchKeyword: searchKeyword,
			pageSize: params.limit,   //页面大小
			offset: returnOrdersManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort.replace(/([A-Z])/g,"_$1").toLowerCase(),//驼峰转下划线,
			order: params.order,
			start:datetimepickerStart,
			end:datetimepickerEnd
		}
	};
	returnOrdersManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		//查看订单详情
	    'click .orderDetail_a': function (e, value, row, index) {
//	    	$.toastrSuccess('换货订单编号为： ' + row.id);
	    	//触发查询换货订单详情的方法
	    	returnOrdersManage.getOrderDetails(row.id);
	    },
	    'click .remark_a': function (e, value, row, index) {
	    	 $("#remark_order_id").val(row.id);
	    	 $("#remark").val(row.distributionNote);
		     $("#myRemarkModalLabel").text("订单备注");
		     $.showModal('#myRemarkModal');
	    }
};

Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

$(document).ready(function(){

	//1、初始化加载列表数据
	returnOrdersManage.init();
	//2、初始化绑定增删改查事件
	returnOrdersManage.bindEvent();
});
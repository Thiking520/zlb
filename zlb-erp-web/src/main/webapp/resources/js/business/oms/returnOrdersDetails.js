// 存放每个功能模块业务逻辑JS
// javascript 模块化
var returnOrderManage = {
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/returnOrders/init';
        },
    	//查询订单详情地址
    	selectReturnOrderDetailsUrl: function () {
            return '/returnOrders/selectReturnOrderDetails';
        },
    	//查询订单详情的数据
        queryReturnOrderDetailsUrl: function () {
            return '/returnOrders/queryReturnOrderDetails';
        },
      //审核通过地址
        adoptedReturnOrder: function () {
            return '/returnOrders/adoptedReturnOrder';
        },
        //审核拒绝地址
        refuseReturnOrder: function () {
            return '/returnOrders/refuseReturnOrder';
        },
      //配送员同意揽收地址
        adoptedLanshouReturnOrder: function () {
            return '/returnOrders/adoptedLanshouReturnOrder';
        },
        //配送员拒绝揽收地址
        refuseLanshouReturnOrder: function () {
            return '/returnOrders/refuseLanshouReturnOrder';
        },
      //财务同意退款地址
        adoptedFinanceReturnOrder: function () {
            return '/returnOrders/adoptedFinanceReturnOrder';
        },
        //财务拒绝退款地址
        refuseFinanceReturnOrder: function () {
            return '/returnOrders/refuseFinanceReturnOrder';
        }
    },
    
    /**获取列表**/
    searchListByPage: function (resultData) {
    	//列表组件
    	$("#orderTable").bootstrapTable({
    		data:resultData.goodsList,
    		columns: [{
    			checkbox: true
    		},{
    			align: 'center',
    			valign:'middle',
    			field: 'goodsCode',
    			title: '编号'
    		}, {
    			align: 'center',
    			valign:'middle',
    			field: 'goodsName',
    			title: '商品名称'
    		},
    		{
    			align: 'center',
    			 valign:'middle',
    			title: '商品图片',
    			formatter:function(value,row,index){
    				var pathUrl = $("#contextPath").val();//获取工程绝对路径
    				var urlPath = pathUrl  +"/resources/img/no_image.jpg";
    				if(row.goodsImageUrl != null && row.goodsImageUrl != ""){
    					urlPath = row.goodsImageUrl;
    				}
    				return '<img width="50px;" height="50px;" src="' + urlPath + '" alt="LOGO" class="logo-default"/>';
    			}
    		},
    		{
    			align: 'center',
    			valign:'middle',
    			field: 'priceType',
    			title: '价格类型',
    		},
    		{
    			align: 'center',
    			valign:'middle',
    			field: 'goodsPrice',
    			title: '售价'
    		},{
    			align: 'center',
    			valign:'middle',
    			field: 'goodsDiscount',
    			title: '折算价'
    		},{
    			align: 'center',
    			valign:'middle',
    			field: 'goodsNumber',
    			title: '数量'
    		},
    		{
    			align: 'center',
    			valign:'middle',
    			title: '小计',
    			formatter:function(value,row,index){
    				return row.goodsDiscount*row.goodsNumber;
    			}
    		}]
    	});
    },
    
    
    /*客服审核通过**/
    adoptedReturnOrder: function () {
    	$('#syButton').addClass("disabled");
    	var s = $('#beiName').val();
    	if(s.length>180){
    		$.toastrWarning('字符长度不能超过180!');  
    		return false;
    	}
    	
    	var value  = $('input[name="province"]:checked').val(); //获取被选中Radio的Value值
    	if(value.length<1){
    		value = 1;
    	}
    	
    	var params = {displayOrderId:$("#orderid").text(),orderState:"1",orderType:"20",operation:"1",orderSubsetType:value,distributionNote:s};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : returnOrderManage.URL.adoptedReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						myMain.getAllContent( returnOrderManage.URL.selectReturnOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    /*客服审核拒绝**/
    refuseReturnOrder: function () {
    	$('#snButton').addClass("disabled");
    	var params = {displayOrderId:$("#orderid").text(),orderState:'1',orderType:"20",operation:"2",distributionNote:'卖家拒绝退货，退货失败'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : returnOrderManage.URL.refuseReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						myMain.getAllContent( returnOrderManage.URL.selectReturnOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    
    /*配送员同意揽收**/
    adoptedLanshouReturnOrder: function () {
    	$('#pyButton').addClass("disabled");
    	var s = $('#beiName').val();
    	if(s.length>180){
    		$.toastrWarning('字符长度不能超过180!');  
    		return false;
    	}
    	var params = {displayOrderId:$("#orderid").text(),orderState:"5",orderType:"20",operation:"1",distributionNote:s};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : returnOrderManage.URL.adoptedLanshouReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						var orderid = $("#oid").text();
						myMain.getAllContent( returnOrderManage.URL.selectReturnOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    /*配送员拒绝揽收**/
    refuseLanshouReturnOrder: function () {
    	$('#pnButton').addClass("disabled");
    	var params = {displayOrderId:$("#orderid").text(),orderState:'5',orderType:"20",operation:"2",distributionNote:'卖家拒绝揽收，退货失败'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : returnOrderManage.URL.refuseLanshouReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						myMain.getAllContent( returnOrderManage.URL.selectReturnOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    
    /*财务同意退款**/
    adoptedFinanceReturnOrder: function () {
    	$('#cyButton').addClass("disabled");
    	var s = $('#beiName').val();
    	if(s.length>180){
    		$.toastrWarning('字符长度不能超过180!');  
    		return false;
    	}
    	var params = {displayOrderId:$("#orderid").text(),orderState:"6",orderType:"20",operation:"1",distributionNote:s};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : returnOrderManage.URL.adoptedFinanceReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						var orderid = $("#oid").text();
						myMain.getAllContent( returnOrderManage.URL.selectReturnOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    /*财务拒绝退款揽收**/
    refuseFinanceReturnOrder: function () {
    	$('#cnButton').addClass("disabled");
    	var params = {displayOrderId:$("#orderid").text(),orderState:'6',orderType:"20",operation:"2",distributionNote:'卖家拒绝退款，退款失败'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : returnOrderManage.URL.refuseFinanceReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						myMain.getAllContent( returnOrderManage.URL.selectReturnOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    bindEvent: function () { 
    	//清空事件
//    	$("#btn_clean").on("click",function () {
//    		$.clearForm("");
//    	});
    	//客服同意按钮
    	$("#syButton").on("click",function () {
    		returnOrderManage.adoptedReturnOrder();
    	});
    	//客服拒绝按钮
    	$("#snButton").on("click",function () {
    		returnOrderManage.refuseReturnOrder();
    	});
    	//配送员同意按钮
    	$("#pyButton").on("click",function () {
    		returnOrderManage.adoptedLanshouReturnOrder();
    	});
    	//配送员拒绝按钮
    	$("#pnButton").on("click",function () {
    		returnOrderManage.refuseLanshouReturnOrder();
    	});
    	
    	//财务同意退款按钮
    	$("#cyButton").on("click",function () {
    		returnOrderManage.adoptedFinanceReturnOrder();
    	});
    	//财务拒绝退款按钮
    	$("#cnButton").on("click",function () {
    		returnOrderManage.refuseFinanceReturnOrder();
    	});
    	//绑定返回按钮按钮
    	$("#fanhuiButton").on("click",function () {
    		var params = myMain.getUrlValue('params');
    		myMain.getAllContent(returnOrderManage.URL.searchListByPageUrl()+"?params="+params);
    	});
    },
    
    
    initData:function(){
    	var id = myMain.getUrlValue('id');
    	var params = {"id":id};
		//组装数据发起Ajax请求begin
		$.callAjax({
			url : returnOrderManage.URL.queryReturnOrderDetailsUrl(),
			data : params,
			success : function(data){   
				var code = data.code;
				if(code!="0000"){
					toastr['warning'](data.msg); 
				}else{
					var orderBean = data.data;
					returnOrderManage.searchListByPage(orderBean);
					$("#orderTable").bootstrapTable('hideLoading');//去掉商品列表的正在加载提示
					
					var pathUrl = $("#contextPath").val();//获取工程绝对路径
					
					//拼接生成订单操作的时间轴
					var sname = "";
					
					var serviceName = "";
					var serviceImg = "";
					if(orderBean.serviceOperation==0){
						serviceName = "客服审核";
						serviceImg = pathUrl+"/resources/img/not_ok.png"
					}else if(orderBean.serviceOperation==1){
						serviceName = "客服允许";
						serviceImg = pathUrl+"/resources/img/ok.png"
					}else if(orderBean.serviceOperation==2){
						serviceName = "客服拒绝";
						serviceImg = pathUrl+"/resources/img/ok.png"
					}
					
					var serviceTime = "";
					if(orderBean.serviceTime!=null){
						serviceTime = orderBean.serviceTime;
					}
					
					var financeName = "";
					var financeImg = "";
					if(orderBean.financeOperation==0){
						financeName = "财务审核";
						financeImg = pathUrl+"/resources/img/not_ok.png"
					}else if(orderBean.financeOperation==1){
						financeName = "财务允许退款";
						financeImg = pathUrl+"/resources/img/ok.png"
					}else if(orderBean.financeOperation==2){
						financeName = "财务拒绝退款";
						financeImg = pathUrl+"/resources/img/ok.png"
					}
					
					var financeTime = "";
					if(orderBean.financeTime!=null){
						financeTime = orderBean.financeTime;
					}
					
					sname+="<div class='col-md-4'> <p style='width: 100%; text-align: center;'>"+serviceName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+serviceImg+"' ></p><p id='sTime' style='width: 100%; text-align: center;'>"+serviceTime  +"</p></div>";
					if(orderBean.orderSubsetType==2){ //等于2的情况为客服审核时选择需要退货，所以需要揽收
						var lanshouName = "";
						var lanshouImg = "";
						if(orderBean.lanshouOperation==0){
							lanshouName = "配送员揽收";
							lanshouImg = pathUrl+"/resources/img/not_ok.png"
						}else if(orderBean.lanshouOperation==1){
							lanshouName = "配送员同意揽收";
							lanshouImg = pathUrl+"/resources/img/ok.png"
						}else if(orderBean.lanshouOperation==2){
							lanshouName = "配送员拒绝揽收";
							lanshouImg = pathUrl+"/resources/img/ok.png"
						}
						
						var lanshouTime = "";
						if(orderBean.lanshouTime!=null){
							lanshouTime = orderBean.lanshouTime;
						}
						sname+="<div class='col-md-4'> <p style='width: 100%; text-align: center;'>"+lanshouName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+lanshouImg+"'></p><p id='lTime' style='width: 100%; text-align: center;'>"+lanshouTime+"</p></div>";;
					}
					sname+="<div class='col-md-4'> <p style='width: 100%; text-align: center;'>"+financeName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+financeImg+"'></p><p id='cTime' style='width: 100%; text-align: center;'>"+financeTime+"</p></div>";
//					
					//生成订单操作时间轴
					$('#orderS').append(sname); 
					var goodss = 0;
					$.each( orderBean.goodsList, function(index, content){ 
						//	goodss+=content.goodsNumber;  //统计商品总数量
							goodss ++;  //统计商品种数
					});
					
					var orderOperation = 0;//获取当前订单是否客服审核过
					
					//3.生成订单的物流信息
					if(orderBean.orderlogisticsLogList!=null && orderBean.orderlogisticsLogList.length>0){
						$.each( orderBean.orderlogisticsLogList, function(index, content){ 
							//生成订单物流记录
							$('#order_logistics').append("<li style='padding-top: 10px'><span >"+ content.orderLogisticsState  +"</span></li>");
						});
					}else{
						$("#order_logistics").hide();
					}
					
					var addressees = orderBean.orderAddressee;
					//生成收件信息
					$('#addressee').text(addressees.consumerProvince+addressees.consumerCity+ addressees.consumerArea+ addressees.consumerStreet +addressees.consumerAddress+","+addressees.consumerName +","+addressees.consumerMobile);
					
					//判断发票是否为空 退货订单换货订单一般是没有发票信息的
					if(orderBean.orderInvoice != null  ){
						//生成发票信息
						if(orderBean.orderInvoice.invoiceTitle==1){
							$('#invoiceTitle').text("个人");
						}else if(orderBean.orderInvoice.invoiceTitle==null || orderBean.orderInvoice.invoiceTitle==""){
							$('#invoiceTitle').text("无");
						}else{
							$('#invoiceTitle').text("公司");
						}
						$('#conpanyName').text(orderBean.orderInvoice.invoiceInfoName);
					}else{
						$("#order_invoice").hide();
					}
					
					
					//生成订单金额
					$('#orderTotalAmount').text("¥"+orderBean.orderTotalAmount);
					$('#couponsAmount').text("¥"+orderBean.freight);
					$('#giftCardAmount').text("¥"+orderBean.couponsAmount);
					$('#integralDeductible').text("¥"+orderBean.giftCardAmount);
					$('#orderDiscount').text("¥"+orderBean.integralDeductible);
					
					$('#goodsshuliang').text("订单共"+ goodss+"件商品");
					
					
					
					
					var orderSubsetType = orderBean.orderSubsetType;
					if(orderSubsetType ==0  ){ //未审核之前可以编辑
						//生成选择是否退回商品
						$('#order_isReturnGoods').append("<li style='padding-top: 10px'><span >是否需要退回商品：</span>" +
								"<input type='radio' id='province1' name='province' value='2'   >是" +
								" <input type='radio' id='province2' name='province' value='3' checked='checked' >否" +
								"</li>");
					}else{ //审核之后单选按钮只读
						var ssname ;
						if(orderSubsetType == 2 ){
							ssname = "<li style='padding-top: 10px'><span >是否需要退回商品：</span> <span > 是</span> </li>";
						}
						if( orderSubsetType == 3 || orderSubsetType == 1){
							ssname = "<li style='padding-top: 10px'><span >是否需要退回商品：</span> <span >否</span> </li>";
						}
						//生成选择是否退回商品
						$('#order_isReturnGoods').append(ssname);
					}
					
					//根据订单状态生成按钮
					var orderState = orderBean.orderState;
					if(orderState==1 && orderBean.serviceOperation==0){
						var adoptedReturnOrder = returnOrderManage.URL.adoptedReturnOrder();
						if(auth.isAuth(adoptedReturnOrder)){
							$('#buttons').append("<button id='syButton' class='btn btn-primary btn-sm'>同意退货</button>");
						}
						var refuseReturnOrder = returnOrderManage.URL.refuseReturnOrder();
						if(auth.isAuth(refuseReturnOrder)){
							$('#buttons').append("<button id='snButton' class='btn btn-primary btn-sm'>拒绝退货</button>");
						}
						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' maxlength='180' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数长度不能超过限制(180字符长度)</p>");
//						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数超过限制,请重新输入</p>");
					}else if(orderState==5 && orderBean.lanshouOperation==0){
						var adoptedLanshouReturnOrder = returnOrderManage.URL.adoptedLanshouReturnOrder();
						if(auth.isAuth(adoptedLanshouReturnOrder)){
							$('#buttons').append("<button id='pyButton' class='btn btn-primary btn-sm'>确定揽收</button>");
						}
						var refuseLanshouReturnOrder = returnOrderManage.URL.refuseLanshouReturnOrder();
						if(auth.isAuth(refuseLanshouReturnOrder)){
							$('#buttons').append("<button id='pnButton' class='btn btn-primary btn-sm'>拒绝揽收</button>");
						}
						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' maxlength='180' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数长度不能超过限制(180字符长度)</p>");
//						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数超过限制,请重新输入</p>");
					}else if(orderState==6 && orderBean.financeOperation==0){
						var adoptedFinanceReturnOrder = returnOrderManage.URL.adoptedFinanceReturnOrder();
						if(auth.isAuth(adoptedFinanceReturnOrder)){
							$('#buttons').append("<button id='cyButton' class='btn btn-primary btn-sm'>同意退款</button>");
						}
						var refuseFinanceReturnOrder = returnOrderManage.URL.refuseFinanceReturnOrder();
						if(auth.isAuth(refuseFinanceReturnOrder)){
							$('#buttons').append("<button id='cnButton' class='btn btn-primary btn-sm'>拒绝退款</button>");
						}
						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' maxlength='180' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数长度不能超过限制(180字符长度)</p>");
//						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数超过限制,请重新输入</p>");
					}else{
						$('#beizhu').append("<li style='padding-top: 10px'><span>备注:</span><span name='distributionNote' class='text-warning'></span></li>");
					}
					
					
					$('#buttons').append("<button id='fanhuiButton' class='btn btn-primary btn-sm'>返回</button>");
//					
					//根据字段值给对应相同的name自动赋值
					autocomplete(orderBean);
					
				}
				
			}
		});
    }
   
    
    
}

//简单的根据数据结果集的key对应页面的name值，自动赋值  
function autocomplete(data){
	$.each( data, function(index, content){ 
		$("*[name*='" + index + "']").text(content); //index为key，content为value
	});
	
}


function getRequest() {
	// decodeURI解决中文乱码问题
	var url = decodeURI(location.search); // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}


$(document).ready(function(){
	
	//1、初始化加载的订单详情数据
	returnOrderManage.initData();
	//2、初始化绑定增删改查事件
	returnOrderManage.bindEvent();
});
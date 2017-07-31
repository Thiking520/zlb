// 存放每个功能模块业务逻辑JS
// javascript 模块化
var exchangeGoodsOrderManage = {
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/orderManage/exchangeGoodsOrder/init';
        },
    	//查询订单详情地址
    	selectExchangeOrdersDetails: function () {
            return '/orderManage/exchangeGoodsOrder/selectExchangeOrdersDetails';
        },
    	//查询订单详情的数据
        queryExchangeOrderDetails: function () {
            return '/orderManage/exchangeGoodsOrder/queryExchangeOrderDetails';
        },
       //同意换货地址
        adoptedExchangeGoods: function () {
            return '/orderManage/exchangeGoodsOrder/adoptedExchangeGoods';
        },
        //拒绝换货地址
        refuseExchangeGoods: function () {
            return '/orderManage/exchangeGoodsOrder/refuseExchangeGoods';
        },
      //配送员同意揽收地址
        adoptedLanshouReturnOrder: function () {
            return '/orderManage/exchangeGoodsOrder/adoptedLanshou';
        },
        //配送员拒绝揽收地址
        refuseLanshouReturnOrder: function () {
            return '/orderManage/exchangeGoodsOrder/refuseLanshou';
        },
      //用户同意签收地址
        adoptedFinanceReturnOrder: function () {
            return '/orderManage/exchangeGoodsOrder/adoptedSign';
        },
        //用户拒绝签收地址
        refuseFinanceReturnOrder: function () {
            return '/orderManage/exchangeGoodsOrder/refuseSign';
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
    		}],
    		onLoadSuccess : function() {

			}
    	});
    },
    
    
    /*客服审核通过**/
    adoptedExchangeGoods: function () {
    	$('#syButton').addClass("disabled");
    	var s = $('#beiName').val();
    	if(s.length>180){
    		$.toastrWarning("字符长度不能超过180!");
			return false;
    	}
    	
    	
    	var value  = $('input[name="province"]:checked').val(); //获取被选中Radio的Value值
    	if(value.length<1){
    		value = 1;
    	}
    	var params = {displayOrderId:$("#orderid").text(),orderState:"1",operation:"1",orderType:"30",orderSubsetType:value,distributionNote:s};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : exchangeGoodsOrderManage.URL.adoptedExchangeGoods(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						var url = exchangeGoodsOrderManage.URL.selectExchangeOrdersDetails() + "?id=" + orderid;
						myMain.getAllContent(url);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    /*客服审核拒绝**/
    refuseExchangeGoods: function () {
    	$('#snButton').addClass("disabled");
    	var params = {displayOrderId:$("#orderid").text(),orderState:'1',orderType:"30",operation:"2",distributionNote:'卖家拒绝换货，换货失败'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : exchangeGoodsOrderManage.URL.refuseExchangeGoods(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						var url = exchangeGoodsOrderManage.URL.selectExchangeOrdersDetails() + "?id=" + orderid;
						myMain.getAllContent(url);
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
    		$.toastrWarning("字符长度不能超过180!");
			return false;
    	}
    	var params = {displayOrderId:$("#orderid").text(),orderState:"5",orderType:"30",operation:"1",distributionNote:s};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : exchangeGoodsOrderManage.URL.adoptedLanshouReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						var orderid = $("#oid").text();
//						window.location.href = $("#contextPath").val()+exchangeGoodsOrderManage.URL.selectExchangeOrdersDetails() + "?id=" + orderid;
						var url = exchangeGoodsOrderManage.URL.selectExchangeOrdersDetails() + "?id=" + orderid;
						myMain.getAllContent(url);
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
    	var params = {displayOrderId:$("#orderid").text(),orderState:'5',orderType:"30",operation:"2",distributionNote:'卖家拒绝揽收，换货失败'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : exchangeGoodsOrderManage.URL.refuseLanshouReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						var url = exchangeGoodsOrderManage.URL.selectExchangeOrdersDetails() + "?id=" + orderid;
						myMain.getAllContent(url);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    
    /*用户同意签收**/
    adoptedFinanceReturnOrder: function () {
    	$('#qyButton').addClass("disabled");
    	var s = $('#beiName').val();
    	if(s.length>180){
    		$.toastrWarning("字符长度不能超过180!");
			return false;
    	}
    	var params = {displayOrderId:$("#orderid").text(),orderState:"3",orderType:"30",operation:"1",distributionNote:s};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : exchangeGoodsOrderManage.URL.adoptedFinanceReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						var orderid = $("#oid").text();
						var url = exchangeGoodsOrderManage.URL.selectExchangeOrdersDetails() + "?id=" + orderid;
						myMain.getAllContent(url);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    /*用户拒绝签收**/
    refuseFinanceReturnOrder: function () {
    	$('#qnButton').addClass("disabled");
    	var params = {displayOrderId:$("#orderid").text(),orderState:"3",orderType:"30",operation:"2",distributionNote:'买家拒绝签收，换货失败'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : exchangeGoodsOrderManage.URL.refuseFinanceReturnOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						var url = exchangeGoodsOrderManage.URL.selectExchangeOrdersDetails() + "?id=" + orderid;
						myMain.getAllContent(url);
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
    	//客服同意换货按钮
    	$("#syButton").on("click",function () {
    		exchangeGoodsOrderManage.adoptedExchangeGoods();
    	});
    	//客服拒绝换货按钮
    	$("#snButton").on("click",function () {
    		exchangeGoodsOrderManage.refuseExchangeGoods();
    	});
    	
    	//配送员同意按钮
    	$("#pyButton").on("click",function () {
    		exchangeGoodsOrderManage.adoptedLanshouReturnOrder();
    	});
    	//配送员拒绝按钮
    	$("#pnButton").on("click",function () {
    		exchangeGoodsOrderManage.refuseLanshouReturnOrder();
    	});
    	
    	//确认签收按钮
    	$("#qyButton").on("click",function () {
    		exchangeGoodsOrderManage.adoptedFinanceReturnOrder();
    	});
    	//拒绝签收按钮
    	$("#qnButton").on("click",function () {
    		exchangeGoodsOrderManage.refuseFinanceReturnOrder();
    	});
    	//绑定返回按钮按钮
    	$("#fanhuiButton").on("click",function () {
    		var params = myMain.getUrlValue('params');
    		myMain.getAllContent(exchangeGoodsOrderManage.URL.searchListByPageUrl()+"?params="+params);
    	});
    },
    
    
    initData:function(){
    	
//    	var requestBo = getRequest();
//    	var orderid = requestBo['id'];
    	var id = myMain.getUrlValue('id');
    	var params = {"id":id};
    	
		//组装数据发起Ajax请求begin
		$.callAjax({
			url : exchangeGoodsOrderManage.URL.queryExchangeOrderDetails(),
			data : params,
			success : function(data){   
				var code = data.code;
				if(code!="0000"){
					toastr['warning'](data.msg); 
				}else{
					var orderBean = data.data;
					exchangeGoodsOrderManage.searchListByPage(orderBean);
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
					
					var warehouseName = "";
					var warehouseImg = "";
					if(orderBean.warehouseOperation==0){
						warehouseName = "仓库发货";
						warehouseImg = pathUrl+"/resources/img/not_ok.png"
					}else if(orderBean.warehouseOperation==1){
						warehouseName = "仓库已发货";
						warehouseImg = pathUrl+"/resources/img/ok.png"
					}else if(orderBean.warehouseOperation==2){
						warehouseName = "仓库拒绝发货";
						warehouseImg = pathUrl+"/resources/img/ok.png"
					}
					
					var warehouseTime = "";
					if(orderBean.warehouseTime!=null){
						warehouseTime = orderBean.warehouseTime;
					}
					
					
					var arrivedName = "";
					var arrivedImg = "";
					if(orderBean.arrivedOperation==0){
						arrivedName = "货物送达";
						arrivedImg = pathUrl+"/resources/img/not_ok.png"
					}else if(orderBean.arrivedOperation==1){
						arrivedName = "货物已送达";
						arrivedImg = pathUrl+"/resources/img/ok.png"
					}else if(orderBean.arrivedOperation==2){
						arrivedName = "货物配送失败";
						arrivedImg = pathUrl+"/resources/img/ok.png"
					}
					
					var arrivedTime = "";
					if(orderBean.arrivedTime!=null){
						arrivedTime = orderBean.arrivedTime;
					}
					
					var signName = "";
					var signImg = "";
					if(orderBean.signOperation==0){
						signName = "用户签收";
						signImg = pathUrl+"/resources/img/not_ok.png"
					}else if(orderBean.signOperation==1){
						signName = "用户同意签收";
						signImg = pathUrl+"/resources/img/ok.png"
					}else if(orderBean.signOperation==2){
						signName = "用户拒绝签收";
						signImg = pathUrl+"/resources/img/ok.png"
					}
					
					var signTime = "";
					if(orderBean.signTime!=null){
						signTime = orderBean.signTime;
					}
					
					sname+="<div class='col-md-2'> <p style='width: 100%; text-align: center;'>"+serviceName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+serviceImg+"'></p><p id='sTime' style='width: 100%; text-align: center;'>"+serviceTime  +"</p></div>";
					if(orderBean.orderSubsetType==4){ //等于4的情况为客服审核时选择需要退货，所以需要揽收
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
						sname+="<div class='col-md-2'> <p style='width: 100%; text-align: center;'>"+lanshouName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+lanshouImg+"'></p><p id='sTime' style='width: 100%; text-align: center;'>"+lanshouTime+"</p></div>";;
					}
					sname+="<div class='col-md-2'> <p style='width: 100%; text-align: center;'>"+warehouseName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+warehouseImg+"'></p><p id='sTime' style='width: 100%; text-align: center;'>"+warehouseTime+"</p></div>";
					sname+="<div class='col-md-2'> <p style='width: 100%; text-align: center;'>"+arrivedName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+arrivedImg+"'></p><p id='sTime' style='width: 100%; text-align: center;'>"+arrivedTime+"</p></div>";
					sname+="<div class='col-md-2'> <p style='width: 100%; text-align: center;'>"+signName+"</p><p><img style='width: 20px;height: 20px; margin-left:45%' src='"+signImg+"'></p><p id='sTime' style='width: 100%; text-align: center;'>"+signTime+"</p></div>";
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
					
					$('#goodsshuliang').text("订单共"+ goodss+"件商品，");
					$('#jine').text("应付¥"+ orderBean.orderTotalAmount +"，已付￥"+ orderBean.actualAmount +"，待付￥" + (orderBean.orderTotalAmount-orderBean.actualAmount) );
					
					var orderSubsetType = orderBean.orderSubsetType;
					if(orderSubsetType ==0  ){ //未审核之前可以编辑
						//生成选择是否退回商品
						$('#order_isReturnGoods').append("<li style='padding-top: 10px'><span >是否需要退回商品：</span>" +
								"<input type='radio' id='province1' name='province' value='4'   >是" +
								" <input type='radio' id='province2' name='province' value='5' checked='checked' >否" +
								"</li>");
					}else{ //审核之后单选按钮只读
						var isReturnGoods = "";
						if(orderSubsetType == 4 ){
							isReturnGoods = "<li style='padding-top: 10px'><span >是否需要退回商品：</span> <span > 是</span> </li>";
						}
						if( orderSubsetType == 5){
							isReturnGoods = "<li style='padding-top: 10px'><span >是否需要退回商品：</span> <span >否</span> </li>";
						}
						//生成选择是否退回商品
						$('#order_isReturnGoods').append(isReturnGoods);
					}

					//权限控制
					//根据订单状态生成按钮
					var orderState = orderBean.orderState;
					if(orderState==1 && orderBean.serviceOperation==0){
						var adoptedExchangeGoods = exchangeGoodsOrderManage.URL.adoptedExchangeGoods();
						if(auth.isAuth(adoptedExchangeGoods)){
							$('#buttons').append("<button id='syButton' class='btn btn-primary btn-sm'>同意换货</button>");
						}
						var refuseExchangeGoods = exchangeGoodsOrderManage.URL.refuseExchangeGoods();
						if(auth.isAuth(refuseExchangeGoods)){
							$('#buttons').append("<button id='snButton' class='btn btn-primary btn-sm'>拒绝换货</button>");
						}
						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' maxlength='180' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数长度不能超过限制(180字符长度)</p>");
//						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数超过限制,请重新输入</p>");
					}else if(orderState==5 && orderBean.lanshouOperation==0){
						var adoptedLanshouReturnOrder = exchangeGoodsOrderManage.URL.adoptedLanshouReturnOrder();
						if(auth.isAuth(adoptedLanshouReturnOrder)){
							$('#buttons').append("<button id='pyButton' class='btn btn-primary btn-sm'>确定揽收</button>");
						}
						var refuseLanshouReturnOrder = exchangeGoodsOrderManage.URL.refuseLanshouReturnOrder();
						if(auth.isAuth(refuseLanshouReturnOrder)){
							$('#buttons').append("<button id='pnButton' class='btn btn-primary btn-sm'>拒绝揽收</button>");
						}
						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' maxlength='180' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数长度不能超过限制(180字符长度)</p>");
//						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数超过限制,请重新输入</p>");
					}else if(orderState==3 && orderBean.signOperation==0){
						var adoptedFinanceReturnOrder = exchangeGoodsOrderManage.URL.adoptedFinanceReturnOrder();
						if(auth.isAuth(adoptedFinanceReturnOrder)){
							$('#buttons').append("<button id='qyButton' class='btn btn-primary btn-sm'>同意签收</button>");
						}
						var refuseFinanceReturnOrder = exchangeGoodsOrderManage.URL.refuseFinanceReturnOrder();
						if(auth.isAuth(refuseFinanceReturnOrder)){
							$('#buttons').append("<button id='qnButton' class='btn btn-primary btn-sm'>拒绝签收</button>");
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
					//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
//					$.toastrSuccess('操作成功！');
					
				}
				
			}
		});
    }
   
    
    
}

//简单的根据数据结果集的key对应页面的name值，自动赋值  
function autocomplete(data){
	$.each( data, function(index, content){ 
		if(index == 'orderInvoice'){

		}else{
			$("*[name*='" + index + "']").text(content); //index为key，content为value
		}
	});
	$.each( data.orderInvoice, function(index, content){ 
		$("*[name*='" +"orderInvoice."+ index + "']").text(content); //index为key，content为value
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
	exchangeGoodsOrderManage.initData();
	//2、初始化绑定增删改查事件
	exchangeGoodsOrderManage.bindEvent();
});
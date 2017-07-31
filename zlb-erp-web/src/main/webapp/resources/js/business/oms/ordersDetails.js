// 存放每个功能模块业务逻辑JS
// javascript 模块化
var saleOrderManage = {
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/orders/init';
        },
    	//查询订单详情地址
    	selectOrderDetailsUrl: function () {
            return '/orders/selectOrderDetails';
        },
    	//查询订单详情的数据
        queryOrderDetailsUrl: function () {
            return '/orders/queryOrderDetails';
        },
      //审核通过地址
        auditSaleOrder: function () {
            return '/orders/auditSaleOrder';
        },
      //用户确认签收地址
        userConfirm: function () {
            return '/orders/userConfirm';
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
    auditSaleOrder: function () {
    	$('#sButton').addClass("disabled");
    	var s = $('#beiName').val();
    	if(s.length>180){
    		$.toastrWarning('字符长度不能超过180!');  
    		return false;
    	}
    	
    	var params = {displayOrderId:$("#orderid").text(),orderState:'1',orderType:"10",distributionNote:s,operation:'1'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : saleOrderManage.URL.auditSaleOrder(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess(data.msg);
						
						var orderid = $("#oid").text();
						myMain.getAllContent( saleOrderManage.URL.selectOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    /*货物送达（用户签收）**/
    userConfirm: function () {
    	$('#yButton').addClass("disabled");
    	var params = {displayOrderId:$("#orderid").text(),orderType:"10",orderState:'3',operation:'1'};
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : saleOrderManage.URL.userConfirm(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						
						var orderid = $("#oid").text();
						myMain.getAllContent( saleOrderManage.URL.selectOrderDetailsUrl() + "?id=" + orderid);
					}
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
    bindEvent: function () { 
    	//绑定添加或编辑提交按钮
    	$("#sButton").on("click",function () {
    		saleOrderManage.auditSaleOrder();
    	});
    	//绑定添加或编辑提交按钮
    	$("#yButton").on("click",function () {
    		saleOrderManage.userConfirm();
    	});
    	//绑定返回按钮按钮
    	$("#fanhuiButton").on("click",function () {
    		var params = myMain.getUrlValue('params');
    		params = encodeURI(params);//需要转码
    		myMain.getAllContent(saleOrderManage.URL.searchListByPageUrl()+"?params="+params);
    	});
    },
    
    
    initData:function(){
    	var id = myMain.getUrlValue('id');
    	var params = {"id":id};
    	
		//组装数据发起Ajax请求begin
		$.callAjax({
			url : saleOrderManage.URL.queryOrderDetailsUrl(),
			data : params,
			success : function(data){   
				
				var code = data.code;
				if(code!="0000"){
					toastr['warning'](data.msg); 
				}else{
					var orderBean = data.data;
					saleOrderManage.searchListByPage(orderBean);
					$("#orderTable").bootstrapTable('hideLoading');//去掉商品列表的正在加载提示
					
					
					//1.生成订单记录流程
					//根据各个步骤的操作状态判断是否操作
					if(orderBean.serviceOperation==1){ //客服审核
						$('#sTime').text(orderBean.serviceTime);
						$('#sImgOK').show();
						$('#sImgNOT').hide();
					}else{
						$('#sImgOK').hide();
						$('#sImgNOT').show();
					}
					if(orderBean.warehouseOperation==1){ //仓库发货
						$('#cTime').text(orderBean.warehouseTime);
						$('#cImgOK').show();
						$('#cImgNOT').hide();
					}else{
						$('#cImgOK').hide();
						$('#cImgNOT').show();
					}
					if(orderBean.signOperation==1){ //用户签收
						$('#yTime').text(orderBean.signTime);
						$('#yImgOK').show();
						$('#yImgNOT').hide();
					}else{
						$('#yImgOK').hide();
						$('#yImgNOT').show();
					}
					if(orderBean.evaluateOperation==1){ //用户评价
						$('#yongTime').text(orderBean.evaluateTime);
						$('#yongImgOK').show();
						$('#yongImgNOT').hide();
					}else{
						$('#yongImgOK').hide();
						$('#yongImgNOT').show();
					}
					if(orderBean.arrivedOperation==1){ //货物送达
						$('#hTime').text(orderBean.arrivedTime);
						$('#hImgOK').show();
						$('#hImgNOT').hide();
					}else{
						$('#hImgOK').hide();
						$('#hImgNOT').show();
					}
					
					//2.生成商品信息
					var goodss = 0;
					$.each( orderBean.goodsList, function(index, content){ 
						//	goodss+=content.goodsNumber;  //统计商品总数量
							goodss ++;  //统计商品种数
					});
					
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
					if(orderBean.orderInvoice != null && orderBean.isInvoice != 0 ){
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
					$('#tradeOrderId').text(orderBean.tradeOrderId);
					$('#orderTotalAmount').text("¥"+orderBean.orderTotalAmount);
					$('#freight').text("¥"+orderBean.freight);
					$('#couponsAmount').text("¥"+orderBean.couponsAmount);
					$('#giftCardAmount').text("¥"+orderBean.giftCardAmount);
					$('#integralDeductible').text("¥"+orderBean.integralDeductible);
					$('#orderDiscount').text("¥"+orderBean.orderDiscount);
					$('#balanceAmount').text("¥"+orderBean.balanceAmount);
					
					$('#goodsshuliang').text("订单共"+ goodss+"件商品，");
					$('#jine').text("应付¥"+ orderBean.actualAmount +"，已付¥" + + orderBean.actualAmount +"，待付¥0"  );
					//根据订单状态生成按钮
					//业务权限控制
					var orderState = orderBean.orderState;
					if(orderState==1 && orderBean.serviceOperation==0 ){
						var auditSaleOrder = saleOrderManage.URL.auditSaleOrder();
						if(auth.isAuth(auditSaleOrder)){
							$('#buttons').append("<button id='sButton' class='btn btn-primary btn-sm'>审核通过</button>");
						}
						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><textarea id='beiName' name='distributionNote' maxlength='180' class='form-control' style='width:600px; ;height: 100px; margin-left: -100px;'></textarea></li><p style='color: red; margin-left: 45%; display: none;'>字数长度不能超过限制(180字符长度)</p>");
//						$('#beizhu').append("<li style='padding-top: 10px'><span style='margin-left:55px;'>备注:</span><span><textarea id='beiName' name='distributionNote' maxlength='180' class='form-control' style='width:500px; ;height: 100px; margin-left: 0px;'></textarea></span></li><p style='color: red; margin-left: 45%; display: none;'>字数长度不能超过限制(180字符长度)</p>");
					}else{
						$('#beizhu').append("<li style='padding-top: 10px'><span>备注:</span><span name='distributionNote' class='text-warning'></span></li>");
					}
					if(orderState==3 && orderBean.signOperation==0 ){
						var userConfirm = saleOrderManage.URL.userConfirm();
						if(auth.isAuth(userConfirm)){
							$('#buttons').append("<button id='yButton' class='btn btn-primary btn-sm'>确认签收</button>");
						}
					}
					$('#buttons').append("<button id='fanhuiButton' class='btn btn-primary btn-sm'>返回</button>");
					
					//初始化因为异步的原因，追加的按钮还没生成，就绑定点击事件了，所以只能放在初始化生成按钮元素以后
					saleOrderManage.bindEvent();
					//按页面name值对应，自动给页面赋值
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
	
//	$("*[name*='']").each(function() {
//		 var name = $(this).attr('name');
//		 alert(name);
//	 })
	
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
	saleOrderManage.initData();
	//2、初始化绑定增删改查事件  因为初始化是异步加载，所以绑定事件放在初始化执行完，一些追加的元素生成后在初始化绑定事件
//	saleOrderManage.bindEvent();
});
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">

<meta charset="utf-8">
<title>Free HTML5 Bootstrap Admin Template</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description"
	content="Charisma, a fully featured, responsive, HTML5, Bootstrap admin template.">
<meta name="author" content="Muhammad Usman">
<link href='${contextPath}/resources/charisma-master/css/order.css'
	rel='stylesheet'>

<!-- The fav icon -->
<link rel="shortcut icon" href="img/favicon.ico">

</head>
<body>
	

<!-- 	<div class="ch-container"> -->
		
			

			<div id="content" class="col-lg-10 col-sm-10">

				<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>订单管理>销售订单详情
						</h2>
				</div>
				


				
						<div class="box-inner">
							
							<div class="box-content row">
								<div class="L_all_information">
									<div class="L_order_number1 alert alert-info">
										<div style="width: 100%; height: 100%;"
											class="L_order_number_two">
											<div class="col-md-2">
												<span style="width:175px; display:inline-block;"><p style="width: 100%; text-align: center;">客服审核</p></span>
												<span style="width:175px; display:inline-block;"><p>
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="sImgOK" src="${contextPath}/resources/img/ok.png">
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="sImgNOT" src="${contextPath}/resources/img/not_ok.png">
												</p></span>
												<span style="width:175px; display:inline-block;"><p id='sTime' style="width: 100%; text-align: center;"></p><span>
											</div>
											<div class="col-md-2">
												<span style="width:175px; display:inline-block;"><p style="width: 100%; text-align: center;">仓库发货</p></span>
												<span style="width:175px; display:inline-block;"><p>
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="cImgOK" src="${contextPath}/resources/img/ok.png">
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="cImgNOT" src="${contextPath}/resources/img/not_ok.png">
												</p></span>
												<span style="width:175px; display:inline-block;"><p id='cTime' style="width: 100%; text-align: center;"></p></span>
											</div>
											<div class="col-md-2">
												<span style="width:175px; display:inline-block;"><p style="width: 100%; text-align: center;">货物送达</p></span>
												<span style="width:175px; display:inline-block;"><p>
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="hImgOK" src="${contextPath}/resources/img/ok.png">
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="hImgNOT" src="${contextPath}/resources/img/not_ok.png">
												</p></span>
												<span style="width:175px; display:inline-block;"><p id='hTime' style="width: 100%; text-align: center;"></p></span>
											</div>
											<div class="col-md-3">
												<span style="width:175px; display:inline-block;"><p style="width: 100%; text-align: center;">用户签收</p></span>
												<span style="width:175px; display:inline-block;"><p>
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="yImgOK" src="${contextPath}/resources/img/ok.png">
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="yImgNOT" src="${contextPath}/resources/img/not_ok.png">
												</p></span>
												<span style="width:175px; display:inline-block;"><p id='yTime' style="width: 100%; text-align: center;"></p></span>
											</div>
											<div class="col-md-3">
												<span style="width:175px; display:inline-block;"><p style="width: 100%; text-align: center;">用户评价</p></span>
												<span style="width:175px; display:inline-block;"><p>
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="yongImgOK" src="${contextPath}/resources/img/ok.png">
													<img
														style="width: 20px; height: 20px; margin-left: 45%; display: none"
														id="yongImgNOT"
														src="${contextPath}/resources/img/not_ok.png">
												</p></span>
												<span style="width:175px; display:inline-block;"><p id='yongTime' style="width: 100%; text-align: center;"></p></span>
											</div>

											<div class="L_Line"></div>

										</div>
									</div>
									<ul name='liy' class="L_order_number alert alert-info">
										<input id="orderid" name="displayOrderId" type="text"
											style="display: none;" />
										<input id="oid" name="id" type="text" style="display: none;" />
										<input id="isLocking" name="isLocking" type="text"
											style="display: none;" />
										<li style="padding-top: 10px"><span>订单编号:</span><span
											name='displayOrderId' class="text-warning"></span></li>
										<li><span>外部订单编号:</span><span name='externalOrderId'
											class="text-warning"></span></li>
										<li><span>订单去向:</span><span name='whereabouts'
											class="text-warning"></span></li>
										<li><span>订单来源:</span><span name='source'
											class="text-warning"></span><span>订单渠道:</span><span
											name='place' class="text-warning"></span></li>
										<li><span>买&nbsp&nbsp家:</span><span name='buyers'
											class="text-warning"></span></li>
										<!--                         <button class="btn btn-primary btn-sm">编辑</button> -->
									</ul>
									<ul class="L_order_number alert alert-info">
										<li style="padding-top: 10px"><span>配送方式:</span><span
											name='distributionMode' class="text-warning"></span></li>
										<li><span>收货信息:</span><span id='addressee' name=''
											class="text-warning"></span></li>
										<li><span>买家留言:</span><span name='buyersLeave'
											class="text-warning"></span></li>
									</ul>
									<ul id='order_invoice' class="L_order_number alert alert-info">
										<li style="padding-top: 10px"><span>发票抬头:</span><span
											id='invoiceTitle' class="text-warning"></span></li>
										<li><span>公司/人名:</span><span id='conpanyName' name=''
											class="text-warning"></span></li>
									</ul>
									<div class = "L_order_number1 alert alert-info">
									<table id="orderTable"
										class="table table-striped table-bordered bootstrap-datatable L_table_css ">
									</table>
									</div>
									<ul class="L_order_number alert alert-info">
										<li style="padding-top: 10px"><span>支付方式:</span><span
											name='tradePlatform' class="text-warning"></span>&nbsp&nbsp<span>余额支付金额：</span><span
												id='balanceAmount' class="text-warning"></span></li>
										<li><span>支付流水号:</span><span id='tradeOrderId'
											class="text-warning"></span></li>
										<li><span>商品总价:</span><span id='orderTotalAmount'
											class="text-warning"></span></li>
										<li><span>运&nbsp&nbsp费:</span><span id='freight'
											class="text-warning"></span></li>
										<li><span>优惠券抵扣:</span><span id='couponsAmount'
											class="text-warning"></span></li>
										<li><span>卡券抵扣:</span><span id='giftCardAmount'
											class="text-warning"></span></li>
										<li><span>积分抵扣:</span><span id='integralDeductible'
											class="text-warning"></span></li>
										<li><span>活动优惠:</span><span id='orderDiscount'
											class="text-warning"></span></li>
										<li><span id='goodsshuliang'></span><span id='jine'></span></li>
										<!--                         <div> -->
										<!--                             <img src="../../images/u1283.png"> -->
										<!--                             <button class="btn btn-primary btn-sm" id="L_payment_one">付款</button> > -->
										<!--                             <button style="left: 80%;" class="btn btn-primary btn-sm" id="L_payment_one">退款</button> -->
										<!--                         </div> -->
									</ul>
									<ul id='order_logistics'
										class="L_order_number alert alert-info">
										<!--                         <li style="padding-top: 10px"><span >正在拣货，拣货员:1</span></li> -->
										<!--                         <li style="padding-top: 10px"><span >正在打包，打包员:</span></li> -->
										<!--                         <li style="padding-top: 10px"><span >正在发往配送点，配送员:</span></li> -->
										<!--                         <li style="padding-top: 10px"><span >即将客户，配送员:</span></li> -->
									</ul>
									<ul id='beizhu' class="L_order_last ">

									</ul>
									<div id='buttons' class="L_examine_btn">
										<!--             <button id='' class="btn btn-primary btn-sm">锁定/解锁</button>
                        <button id='' class="btn btn-primary btn-sm">保存</button>
                        <button id='' class="btn btn-primary btn-sm">审核通过</button>
                        <button id='' class="btn btn-primary btn-sm">确认签收</button>
                        <button id='' class="btn btn-primary btn-sm">打回待客服审核</button>
                        <button id='' class="btn btn-primary btn-sm">返回</button>  -->
									</div>
								</div>


							
					
				</div>








				<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="myModalLabel">新增商品</h4>
							</div>
							<div class="modal-body box col-md-6"></div>
							<div class="box-content">
								<table class="table ">
									<thead>
										<tr>
											<td><a href="#">一级分类</a></td>
											<td>新鲜水果</td>
											<td>肉类禽蛋</td>
											<td>水产海鲜</td>
											<td>零食饮品</td>
											<td>速食调料</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><a href="#">二级分类</a></td>
											<td class="center">牛油果</td>
											<td class="center">奇艺果</td>
											<td class="center">苹果</td>
											<td class="center">柚子</td>
											<td class="center">石榴</td>
										</tr>
									</tbody>
								</table>
								<div class="L_ipt_lookup">
									<input type="text" name="">
									<button>查找</button>
								</div>
								<div class="L_img_exhibition">
									<li><img src=""><span>苹果</span>
									<button>新增/取消新增</button></li>
									<li><img src=""><span>苹果＋青色＋2个装</span>
									<button>新增/取消新增</button></li>
									<li><img src=""><span>苹果＋青色＋2个装</span>
									<button>新增/取消新增</button></li>
								</div>
								<ul class="pagination pagination-centered">
									<li><a href="#">Prev</a></li>
									<li class="active"><a href="#">1</a></li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li><a href="#">4</a></li>
									<li><a href="#">Next</a></li>
								</ul>
							</div>
						</div>
					</div>

				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
<!-- 		</div> -->
		<!--/.fluid-container-->



		<!-- 隐藏的dialog end -->

		<!-- ★ 导入公共JS库 -->
		<%@include file="../common/commonJs.jsp"%>
		<!-- 自己功能模块的外部JS -->
		<script
			src="${contextPath}/resources/js/business/oms/ordersDetails.js"
			type="text/javascript"></script>
		<script type="text/javascript">
			$('.L_order_last').find('textarea').blur(function() {
				if ($('.L_order_last').find('textarea').val().length < 180) {
					$('.L_order_last').find('p').css('display', 'none');
				} else {
					$('.L_order_last').find('p').css('display', 'block');
				}

			})
		</script>
</body>
</html>

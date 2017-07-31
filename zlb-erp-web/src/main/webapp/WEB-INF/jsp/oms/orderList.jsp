<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">

</style>
</head>
<body>

	<div id="content">

		<!-- 菜单位置导航ends -->

				<div class="box-inner">
					<!-- 菜单位置导航starts -->
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>订单管理>销售订单管理
						</h2>
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="mainForm" action="#"
								onSubmit="return false;" method="get">
								<div class="form-group ">
									<select class="form-control" name="searchType" id="searchType">
										<!-- 搜索类型判断 1销售订单号 2换货订单号 3 退订单号 4支付单号  5 收货人姓名6 收货人手机 7 收货人地址 8 商品名称9 用户名 -->
										<!-- <option value='1'>退订单号</option>
										<option value='2'>销售订单号</option>
										<option value='3'>收货人姓名</option>
										<option value='4'>收货人手机号</option>
										<option value='5'>收货人地址</option> -->
										<!-- <option value='6'>商品名称</option> -->
										<!-- <option value='7'>用户名</option> -->
									</select>
								</div>
								<div class="form-group ">
									<input type="text" id="searchKeyword" name="searchKeyword"
										class="form-control input-small" placeholder="输入">
								</div>
								<!--时间控件begin-->
								<!-- <div class="form-control ">
									<div id="reportrange" class="pull-left dateRange">
										<span>&nbsp;&nbsp;&nbsp;退订单时间：</span> 
										<i class="glyphicon glyphicon-calendar fa fa-calendar"></i> 
										<span id="searchDateRange"></span><b class="caret"></b>
									</div>
								</div> -->
								<div class="form-group">
									<span>下单时间：</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control" value=""
											id="datetimepickerStart" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
									<span>到</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control" value=""
											id="datetimepickerEnd" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
									<button id="btn_date_7days"
										class="btn btn-inverse btn-default btn-sm" type="button">近7天</button>
									<button id="btn_date_30days"
										class="btn btn-inverse btn-default btn-sm" type="button">近30天</button>
								</div>
								<div style="Height: 5px;"></div>
								<!--时间控件end  -->
								<div class="form-group ">
									<!-- 下拉框 -->
									<span>付款方式： <select class="form-control"
										name="tradePlatform" id="tradePlatform">
											<!-- <option value='1'>支付宝</option>
											<option value='2'>微信</option>
											<option value='3'>银联</option> -->
									</select>
									</span>
								</div>
								<div class="form-group ">
									<span>订单来源： <select class="form-control" name="source"
										id="source">
											<!-- <option value='1'>在线商城</option>
											<option value='2'>线下门店</option>
											<option value='3'>B2B渠道</option> -->
									</select>
									</span>
								</div>
								<div class="form-group ">
									<span>订单渠道： <select class="form-control" name="place"
										id="place">
									</select>
									</span>
								</div>
								<div class="form-group ">
									<span>订单去向： <select class="form-control"
										name="whereabouts" id="whereabouts">
											<!-- <option value='1'>自营</option> -->
									</select>
									</span>
								</div>
								<div class="form-group ">
									<span>自提点： <select class="form-control" id="selfPickupSiteList"></select>
									</span>
								</div>
								<div class="form-group">
									<button id="btn_search" class="btn btn-success btn-flat"
											type="button">搜索</button>
									<button id="btn_clean" class="btn btn-primary btn-flat"
										type="button">清空</button>
								</div>

							</form>
						</div>

						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive"
							>
							<div class="table_nav">
								<ul class="collapse navbar-collapse nav nav-pills" role="tablist" id="feature-tab" style="margin-left:0px;">
									<li class="active orderStateClass"><a orderState=""
																		  href="#tab-all" role="tab" data-toggle="tab">全部</a></li>
									<li class="orderStateClass" id="orderStateSS"><a
											orderState="1" operationState="0" href="#tab-1" role="tab"
											data-toggle="tab">待客服审核</a></li>
									<li class="orderStateClass"><a orderState="2"
																   operationState="0" href="#tab-5" role="tab" data-toggle="tab">待仓库发货</a></li>
									<li class="orderStateClass"><a orderState="7"
																   operationState="0" href="#tab-4" role="tab" data-toggle="tab">待货物送达</a></li>
									<li class="orderStateClass"><a orderState="3"
																   operationState="0" href="#tab-6" role="tab" data-toggle="tab">待用户签收</a></li>
									<li class="orderStateClass"><a orderState="4"
																   operationState="0" href="#tab-4" role="tab" data-toggle="tab">待用户评价</a></li>
									<li class="orderStateClass"><a orderState="99"
																   operationState="1" href="#tab-7" role="tab" data-toggle="tab">已完成</a></li>
									<li class="orderStateClass"><a orderState="0" href="#tab-8"
																   role="tab" data-toggle="tab">已取消</a></li>
									<li>
										<div id="toolbar" class="btn-group">
											<!-- <button id="btn_show_add" class="btn btn-default  btn-sm" type="button">新增退订单</button> -->
											<button id="btn_show_export" class="btn btn-default  btn-sm"
													type="button">
								<span class="glyphicon glyphicon glyphicon-export"
									  style="color: green;"></span>批量导出
											</button>
											<button id="btn_show_print" class="btn btn-default  btn-sm"
													type="button">
								<span class="glyphicon glyphicon glyphicon-print"
									  style="color: green;"></span>批量打印
											</button>
											<button id="btn_show_batch_audit" class="btn btn-default  btn-sm"
													type="button">
								<span class="glyphicon glyphicon glyphicon-check"
									  style="color: green;"></span>批量审核
											</button>
											<button style="display: none;" id="btn_show_search" class="btn btn-default  btn-sm"
													type="button">
								<span class="glyphicon glyphicon-search"
									  style="color: green;"></span><span>显示搜索条件</span>
											</button>
										</div>
									</li>
								</ul>
							</div>
							<table id="saleOrderManageTable"
								class="table table-hover table-striped table-bordered">

							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->

		</div>

	</div>

	<!-- 隐藏的dialog Begin -->
	<form id="addRemarkForm" action="return false;" method="post">
		<div class="modal fade" id="myRemarkModal" tabindex="-1" role="dialog"
			aria-spanledby="myModalspan">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-span="Close">
							<span aria-hidden="true">×</span>
						</button>
						<h4 class="modal-title" id="myRemarkModalspan">备注</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<span>备注：</span> <input type="hidden"  id="remark_order_id"
								value="" /> <input type="text" maxlength='180' name="remark"
								class="form-control" id="remark">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消
						</button>
						<button id="btn_remark_save_submit" type="button" name="submit"
							class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
	<!-- 隐藏的dialog end -->


	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
	<%-- <script src="${contextPath}//resources/charisma-master/plugins/daterangepicker/js/daterangepicker.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/common/daterange-picker.js" type="text/javascript"></script> --%>
	<!-- 自己功能模块的外部JS -->
	<script
		src="${contextPath}/resources/js/business/oms/orderListManage.js?version=v1"
		type="text/javascript"></script>
</body>
</html>

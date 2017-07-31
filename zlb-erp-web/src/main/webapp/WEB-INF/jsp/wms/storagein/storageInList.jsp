<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
.L_goods_detailed {
	width: 2000px;
}

.L_goods_detailed tr th {
	text-align: center;
}

.L_goods_detailed tr td {
	text-align: center;
}

.L_goods_form tr {
	margin-top: 30px;
}

.L_goods_form  tr td {
	text-align: center;
}

.L_mail div p {
	float: left;
}

.L_mail div input {
	float: left;
}

.L_Eeject_two tr th {
	text-align: center;
}

.L_Eeject_two tr td {
	text-align: center;
}
</style>
</head>
<body>
	
	<div id="content">
		<div>
			<ul class="breadcrumb">
				<li><a href="#">入库管理</a></li>
				<li><a href="#">入库订单</a></li>
			</ul>
		</div>
		<!-- 菜单位置导航ends -->
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>入库管理>入库订单</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/storagein/init">
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="mainForm" onkeydown="if(event.keyCode==13)return false;" action="#" method="post">
								<div class="form-group ">
									<span>入库订单号：</span><input name="storageInNo" id="storageInNo" type="text" class="form-control input-small" />
								</div>
								<div class="form-group ">
									<span>来源单据号：</span><input name="purchaseNo" id="purchaseNo" type="text" class="form-control input-small" />
								</div>
								<div class="form-group ">
									<label>来源单据类型：</label>
										<select class="form-control" name="billType" id="billType">
											    <option value="">全部</option>
												<option value='10'>采购入库</option>
												<option value='20'>退货入库</option>
												<option value='30'>调拨入库</option>
												<option value='40'>赠品入库</option>
												<option value='50'>换货入库</option>
												<option value='60'>其他入库</option>
												<option value='70'>智能入库</option>
										</select>
								</div>
								<div class="form-group ">
									<label>收货状态：</label>
										<select class="form-control" name="receiveState" id="receiveState">
												<option value="">全部</option>
												<option value='10'>新建</option>
												<option value='20'>待收货</option>
												<option value='30'>收货中</option>
												<option value='50'>已入账</option>
												<option value='98'>已取消</option>
												<option value='99'>关闭</option>
										</select>
								</div>
							   <div class="form-group">
									<span>采购员：</span><input name="purchaser" id="purchaser" type="text" class="form-control input-small" />
							   </div>
							   <div class="form-group">
									<span>供应商代码：</span><input name="supplierCode" id="supplierCode" type="text" class="form-control input-small" />
							   </div>
							   <div class="form-group">
									<span>订单日期：</span>
									<div class="input-group input-append date form_datetime" >
												      		<input type="text" class="form-control" value="" id="orderDateStart" name="orderDateStart" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
										                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                	</div>
									<label>到</label>
									<div class="input-group input-append date form_datetime">
							      		<input type="text" class="form-control" value="" id="orderDateEnd" name="orderDateEnd" readonly>
										<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
               						</div>
               						<div style="display: inline-block; margin-left: -21%; vertical-align: middle; margin-top: 10px;">
										<p class="col-md-1" style="left: 60%;width: 125px;line-height:40px;">
											<input type="radio" name="orderDate" value="1">昨天
										</p>
										<p class="col-md-1" style="left: 54%;width: 125px;line-height:40px;">
											<input type="radio" name="orderDate" value="2">最近一星期
										</p>
										<p class="col-md-1" style="left: 52%;width: 125px;line-height:40px;">
											<input type="radio" name="orderDate" value="3">最近一个月
										</p>
									</div>
							   </div>
							   <div class="form-group">
										<span>预计到达时间：</span>
										<div class="input-group input-append date form_datetime">
								      		<input type="text" class="form-control" id="expectDateTimeStart" name="expectDateTimeStart" readonly>
											<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
						                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                						</div>
										<label>到</label>
										<div class="input-group input-append date form_datetime">
								      		<input type="text" class="form-control" id="expectDateTimeEnd" name="expectDateTimeEnd" readonly>
											<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
						                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                						</div>
                						<div style="display: inline-block; margin-left: -15%; vertical-align: middle; margin-top: 10px;">
											<p class="col-md-1" style="left: 45%;width: 125px;line-height:40px;">
												<input type="radio" name="expectDate" value="1">昨天
											</p>
											<p class="col-md-1" style="left: 39%;width: 125px;line-height:40px;">
												<input type="radio" name="expectDate" value="2">最近一星期
											</p>
											<p class="col-md-1" style="left: 37%;width: 125px;line-height:40px;">
													<input type="radio" name="expectDate" value="3">最近一个月
											</p>
										</div>
								</div>
								<!-- <div class="form-group">
										<div class="btn-group">
											<button type="button" class="btn btn-primary dropdown-toggle L_Popup" data-toggle="dropdown">
												更多条件 <span class="caret"></span>
											</button>
											<div class="alert alert-danger L_specific_Popup" style="z-index: 99;position: absolute; top: 40px; display: none;width:1000px;left:-500%;">
												<div class="row">
													<div class="col-md-4">
														<p class="col-md-3" style="line-height: 40px;text-align: center;width: 100.8px;">采购员</p>
														<p class="col-md-6">
															<input id='purchaser' type="text"
																style="height: 35px;margin-left: 11px;" class="form-control" name="purchaser">
														</p>
													</div>
													<div class="col-md-6">
														<p class="col-md-3" style="line-height: 40px;text-align: center;width: 100.8px;">供应商代码</p>
														<p class="col-md-9">
															<input id='supplierCode' type="text"
																style="height: 35px;margin-left: 11px;" class="form-control" name="supplierCode">
														</p>
													</div>
												</div>
												<div class="row">
														<p class="col-md-3" style="width:100.8px;text-align: right;line-height:40px;padding-right: 20px;">订单日期</p>
														<div class="input-group input-append date form_datetime" style="margin-left:-346px;" >
												      		<input type="text" class="form-control" value="" id="orderDateStart" name="orderDateStart" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
										                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                						</div>
														<label>到</label>
														<div class="input-group input-append date form_datetime">
												      		<input type="text" class="form-control" value="" id="orderDateEnd" name="orderDateEnd" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
										                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                						</div>
															<p class="col-md-1" style="left: 60%;width: 125px;line-height:40px;">
																<input type="radio" name="orderDate" value="1">昨天
															</p>
															<p class="col-md-1" style="left: 54%;width: 125px;line-height:40px;">
																<input type="radio" name="orderDate" value="2">最近一星期
															</p>
															<p class="col-md-1" style="left: 52%;width: 125px;line-height:40px;">
																<input type="radio" name="orderDate" value="3">最近一个月
															</p>
												</div>
												<div class="row">
														<p class="col-md-3" style="line-height:40px;">预计到达时间</p>
														<div class="input-group input-append date form_datetime"  style="margin-left:-494px;" >
												      		<input type="text" class="form-control" id="expectDateTimeStart" name="expectDateTimeStart" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
										                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                						</div>
														<label>到</label>
														<div class="input-group input-append date form_datetime">
												      		<input type="text" class="form-control" id="expectDateTimeEnd" name="expectDateTimeEnd" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
										                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                						</div>
														<p class="col-md-1" style="left: 45%;width: 125px;line-height:40px;">
															<input type="radio" name="expectDate" value="1">昨天
														</p>
														<p class="col-md-1" style="left: 39%;width: 125px;line-height:40px;">
															<input type="radio" name="expectDate" value="2">最近一星期
														</p>
														<p class="col-md-1" style="left: 37%;width: 125px;line-height:40px;">
																<input type="radio" name="expectDate" value="3">最近一个月
														</p>
												</div>
												<div style="text-align: center;">
													<button id="queryAffirm" class="btn btn-primary btn-sm btn-flat" style="margin-right: 50px;">搜索</button>
													<button id="queryCancle" type="button" class="btn btn-primary btn-sm btn-flat">收起</button>
											    </div>
											</div>
										</div>
									</div> -->
								<div class="form-group" style="margin-left: -2%;">
									<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
									<button id="btn_reset" class="btn btn-primary btn-flat" type="button">清空</button>
								</div>
							</form>
						</div>
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
							  <button type="button" class="btn btn-default  btn-sm" id="btn_confirm"><span class="glyphicon glyphicon-ok-sign" style="color: green;"></span>确认</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_assign"><span class="glyphicon glyphicon-log-in" style="color:green;"></span>分派</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_take_goods"><span class="glyphicon glyphicon-log-in" style="color:green;"></span>收货</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_take_account"><span class="glyphicon glyphicon-ok-sign" style="color: green;"></span>入账</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_take_close"><span class="glyphicon glyphicon-ok-sign" style="color: green;"></span>关闭</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_build_joblist"><span class="glyphicon glyphicon-hand-right" style="color: green;"></span>生成上架作业单</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_billPrint">单据打印</button>
							  <button id="btn_show_export" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon glyphicon-export" style="color: green;"></span>批量导出</button>
							 </div>
							</div>
					</div>

						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<table id="storageInManageTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--模态框  -->
	<%@include file="../../wms/dialog/takegoodsDialog.jsp"%>
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/wms/storagein/storageinListManage.js" type="text/javascript"></script>
  </body>
</html>

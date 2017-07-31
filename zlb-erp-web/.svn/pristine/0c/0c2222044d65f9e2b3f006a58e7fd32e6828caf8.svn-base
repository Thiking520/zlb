<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	.tra_input{
		float:right;
	}

</style>
</head>
<body class="skin-blue">
	<div id="content" >
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>库存管理>库存交易</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/stockTrading/init">
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form"  id="searchform">
								<div class="controls controls-row">
									<div class="form-group">
							   			<span>交易编号：</span><input name="tradingNo" id="tradingNo" type="text" class="form-control input-small" />
							   		</div>
									<div class="form-group">
										<span>业务单据号：</span><input type="text" name="billsNo" id="billsNo" class="form-control input-small"/>
									</div>
										<div class="form-group">
										<span>交易类型：</span>
										<select class="form-control"  name="tradingType" id="tradingType">
							        	  <option value="">请选择</option>
										  <option value="10">增加</option>
										  <option value="20">减少</option>
										  <option value="90">库存调整-盘盈</option>
										  <option value="91">库存调整-盘亏</option>
										</select>
									</div>
									<div class="form-group">
							        	<span>单证类型：</span> 
							        	<select class="form-control" name="billType" id="billType">
											<option value="">请选择</option>
											<option value="10">入库订单</option>
											<option value="20">出库订单</option>
											<option value="40">移库作业单</option>
											<option value="50">库存调整单</option>
											<option value="60">原料转成品单</option>
											<option value="80">库存盘点单</option>
										</select>
									</div>
							     
						        <div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
						        	<button type="button" class="btn btn-primary btn-flat" id="btn_show_reset">清空</button>
						        </div>
						      </div>
								<!--时间控件end  -->
							</form>
						</div>
												
						<!-- 分页列表区域begin -->
							<div role="grid" class="box-body table-responsive">
								 <div >
										<table id="stockTradingManagerTable" class="table table-hover table-striped table-bordered">
										</table>
								</div>
							</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="stockTradingModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel03"
		 aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width: 700px;height: auto">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title" id="myModalLabel03">
						查看库存交易记录
					</h4>
				</div>
				<div class="modal-body">
					<form id="fromModal02" action="" class="form-inline" role="form">
						<div>
							<div class="form-group">
								<label>交易编码:</label>
								<input name="tradingNo1" id="tradingNo1"  class="form-control">
							</div>
							<div class="form-group">
								<label>交易类型:</label>
								<input name="tradingType1" id="tradingType1" class="form-control">
							</div>
							<div class="form-group">
								<label>单据类型:</label>
								<input name="billType1" id="billType1" class="form-control">
							</div>
							<div class="form-group">
								<label>业务单据号:</label>
								<input name="billsNo1" id="billsNo1" class="form-control">
							</div>
							<div class="form-group">
								<label>交易状态:</label>
								<input name="dealState1" id="dealState1" class="form-control">
							</div>
							<div class="form-group">
								<label>货品编码:</label>
								<input name="skuCode1" id="skuCode1" class="form-control">
							</div>
							<div class="form-group">
								<label>库存批次号:</label>
								<input name="batchNo1" id="batchNo1" class="form-control">
							</div>
							<div class="form-group">
								<label>库位编码:</label>
								<input name="locationCode1" id="locationCode1" class="form-control">
							</div>
							<div class="form-group">
								<label>库存变化前数量:</label>
								<input name="oldQty1" id="oldQty1" class="form-control">
							</div>
							<div class="form-group">
								<label>增加或者减少数量:</label>
								<input name="qty1" id="qty1" class="form-control">
							</div>
						</div>
					</form>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/wms/warehouseinside/stockTrading.js" type="text/javascript"></script>
</body>
</html>
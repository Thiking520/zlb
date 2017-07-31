<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">	.modal-headers {
		padding: 15px;
		min-height: 16.42857143px;
	}
	
	.col-md-table-12 {
		width: 48%;
		position: relative;
		min-height: 1px;
		padding-left: 40px;
		padding-right: 15px;
		float: left;
	}
	
	.col-md-table-6{
		margin-top: 10px;
   	    margin-bottom: 10px;
	}
	.col-md-table-5{
		margin-top: 16px;
   	    margin-bottom: 10px;
	}

</style>
</head>
<body class="skin-blue">
	<div id="content" >
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">库存管理</a></li>
				<li><a href="#" class="active">库存调整</a></li>
			</ul>
		</div>
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>库存管理>库存调整单</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/stockAdjustment/init">
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form"  id="searchform" onkeydown="if(event.keyCode==13)return false;" action="#" method="post">
								<div class="controls controls-row">
									<div class="form-group">
							   			<span>调整单号：</span><input name="adjustmentNo" id="adjustmentNo" type="text" class="form-control input-small" />
							   		</div>
									<div class="form-group">
							        	<span>调整类型：</span>
							        	<select class="form-control" name="adjustmentTypeSerch" id="adjustmentTypeSerch">
											<option value="">请选择</option>
											<option value="10">盘点调整</option>
											<option value="20">手动调整</option>
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
								<div class="table_nav">
 		 	 				    <div id="toolbar" class="btn-group">
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_add">
										<span class="glyphicon glyphicon-plus" style="color: green;"></span>执行调整
									</button>
							     </div>
								</div>
								 <div >
										<table id="stockAdjustmentManagerTable" class="table table-hover table-striped table-bordered">
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
	
	<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm" method="post" class="form-inline" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document" style="width:950px">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">新增</h4>
					</div>
					 <div class="modal-body">
						<table style="width: 100%;">
								<tr>
								   <td style="width:33%;">
								      <div class="form-group">
								      	<label><span class="text-required">*</span>调整单号：</label>
										<input type="text" name="adjustmentNoAdd" class="form-control" id="adjustmentNoAdd" readonly="readonly">
								      </div>
								   </td>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label><span class="text-required">*</span>货品编码：</label>
								      <input type="text" name="skuCode" class="form-control" id="skuCode" readonly="readonly">
								      </div>
								   </td>
				 				   <td style="width:33%;">
								      <div class="form-group">
								      <label><span class="text-required">*</span>商品名称：</label>
								      <input type="text" name="skuName" class="form-control" id="skuName" readonly="readonly">
								      </div>
								   </td>
								</tr>
						</table >
				 		<table style="width: 100%;">
			 				<tr>
							   <td style="width:33%;">
							      <div class="form-group">
							      	<label style="width:84px"><span class="text-required">*</span>库位：</label>
									<input type="text" name="locationCode" class="form-control" id="locationCode" readonly="readonly">
							      </div>
							   </td>
							   <td style="width:33%;">
							      <div class="form-group">
							       <label><span class="text-required">*</span>调整类型：</label>
							       <select class="form-control" name="adjustmentType" id="adjustmentType" readonly="readonly">
										<option value="">请选择</option>
										<option value="10">盘点调整</option>
										<option value="20">手动调整</option>
									</select>
							      </div>
							   </td>
			 				   <td style="width:33%;">
							      <div class="form-group">
								      <label style="width:84px"><span class="text-required">*</span>备注：</label>
								      <input type="text" name="descrip" class="form-control" id="descrip" readonly="readonly">
							      </div>
							   </td>
							</tr>
				 		</table>
				 		<!-- 分页列表区域begin -->
							<div role="grid" class="box-body table-responsive">
								<div id="toolbar" class="btn-group">
							    </div>
								 <div >
										<table id="stockAdjustmentDetailManagerTable" class="table table-hover table-striped table-bordered" style="width:5000px">
										</table>
								</div>
							</div>
						<!-- 分页列表区域ends -->
							<div class="row">
							    <div class="box col-md-table-12 col-md-table-5">
							        <div class="box-inner">
							            <div class="box-header well" data-original-title="">
							                <h2>调整前</h2>
							            </div>
							            <div class="box-content" style="display: block;">
							            	     <input type="hidden" id="agoStockBatchNo">
							            	     <input type="hidden" id="atferStockBatchNo">
							            		<div class="form-group">
							                        <label style="width:80px">库存数量：</label>
							                        <input type="text" name="agoAdjustQty" id="agoAdjustQty" class="form-control" readonly="readonly" >
							                    </div>
							                    <div class="form-group">
							                      	<label style="width:80px">库存状态：</label>
							                        <select class="form-control" name="agoAdjustState" id="agoAdjustState">
														<option value="10">良品</option>
														<option value="20">残品</option>
						                         	</select>
							                    </div>
							                    <div class="form-group">
							                        <label style="width:80px">生产日期：</label>
							                        <input type="text" name="agoAdjustPro" id="agoAdjustPro" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label style="width:80px">入库日期：</label>
							                        <input type="text" name="agoAdjustIn" id="agoAdjustIn" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label style="width:80px">失效日期：</label>
							                        <input type="text" name="agoAdjustLose" id="agoAdjustLose" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label style="width:80px">供应商：</label>
							                        <input type="text" name="agoAdjustSupplier" id="agoAdjustSupplier" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">   
							                    	<label style="width:90px">生产批次号：</label>
							                        <input type="text" name="agoAdjustBatchNo" id="agoAdjustBatchNo" class="form-control" readonly="readonly">                 							                    							                    <div class="form-group">
							                    </div>
							             </div>
							        </div>
							      </div>
							    </div>
							    
							      <div class="box col-md-table-12 col-md-6 col-md-table-6">
							        <div class="box-inner" style="width:390px;">
							            <div class="box-header well" data-original-title="">
							                <h2>调整后</h2>
							            </div>
							            <div class="box-content" style="display: block;">
							                    <div class="form-group">
							                        <label><span style="color: red;" class="text-required">*</span>库存数量：</label>
							                        <input type="text" name="afterAdjustQty" id="afterAdjustQty" class="form-control" >
							                    </div>
							                    <div class="form-group">
							                        <label>库存状态：</label>
							                        <select class="form-control" name="atferAdjustState" id="atferAdjustState"> 
														<option value="10">良品</option>
														<option value="20">残品</option>
						                         	</select>
							                    </div>
							                    
							                    <div class="form-group">
								                      	<label>生产日期：</label>
									                <div class="input-group input-append date form_datetime" id="proTime">
									                     <input type="text" class="form-control" value="" id="atferAdjustPro" name="atferAdjustPro" readonly>
								                         <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								                         <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                    </div>
							                    </div>

							                    <div class="form-group">
							                        <label><span style="color: red;" class="text-required">*</span>入库日期：</label>
							                        <div class="input-group input-append date form_datetime" id="storageTime">
								                        <input type="text" class="form-control" value="" id="atferAdjustIn" name="atferAdjustIn" readonly>
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                    </div>
							                    </div>
							                    <div class="form-group">
							                        <label for="exampleInputPassword1">失效日期：</label>
							                        <div class="input-group input-append date form_datetime" id="failTime">
							                        <input type="text" class="form-control" value="" id="atferAdjustLose" name="atferAdjustLose" readonly>
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                    </div>
							                    </div>
							                    <div class="form-group">                   							                    							                     
							                        <label style="width:75px">供应商：</label>
							                        <input type="text" name="atferAdjustSupplier" id="atferAdjustSupplier" class="form-control" >
							                    </div>
							                    <div class="form-group">   
							                    	<label style="width:90px">生产批次号：</label>
							                        <input type="text" name="atferAdjustBatchNo" id="atferAdjustBatchNo" class="form-control" >                 							                    							                    <div class="form-group">
							                    </div>
							            </div>
							        </div>
							      </div>
							    </div>
							</div>
						<div class="modal-footer">
							<div style="float:left">
								<button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary">
									<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>添加
								</button>
							</div>
							<div style="float:right">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
								</button>
								<button id="btn_save_confirm" type="button"
									name="btn_save_confirm" class="btn btn-primary">
									<span class="glyphicon glyphicon-floppy-disk"
										aria-hidden="true"></span>确认调整
								</button>
							</div>
						</div>			  
				</div>
			</div>
		</div>
	</form>
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/wms/warehouseinside/stockAdjustment.js" type="text/javascript"></script>
</body>
</html>
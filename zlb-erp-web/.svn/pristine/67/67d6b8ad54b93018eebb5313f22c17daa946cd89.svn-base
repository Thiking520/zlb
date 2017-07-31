<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">

</style>
</head>
<body class="skin-blue">
	<div id="content" >
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">库存管理</a></li>
				<li><a href="#" class="active">库存盘点</a></li>
			</ul>
		</div>
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>库存管理>库存盘点单</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/physical/init">
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form"  id="searchform" onkeydown="if(event.keyCode==13)return false;" action="#" method="post">
								<div class="controls controls-row">
									<div class="form-group">
							   			<span>盘点单号：</span><input name="physicalNo" id="physicalNo" type="text" class="form-control input-small" />
							   		</div>
									<div class="form-group">
										<span>状态：</span>
										<select class="form-control"  name="state" id="state">
							        	  <option value="">请选择</option>
										  <option value="10">新建</option>
										  <option value="20">盘点完成</option>
										</select>
									</div>
									<div class="form-group">
							        	<span>盘点结果：</span> 
							        	<select class="form-control" name="physicalResults" id="physicalResults">
											<option value="">请选择</option>
											<option value="10">一致</option>
											<option value="20">有差异</option>
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
						<!-- 表单查询区域end -->
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>录入盘点</button>
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_complete"><span class="glyphicon glyphicon-plus" style="color: green;"></span>盘点完成</button>
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_adjustment"><span class="glyphicon glyphicon-plus" style="color: green;"></span>生成盘点调整单</button>
								</div>
							</div>
							<div >
										<table id="stockPhysicalManagerTable" class="table table-hover table-striped table-bordered">
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
	<form id="addAnchorForm" method="post" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" style="overflow-y: scroll;">
			<div class="modal-dialog" role="document" style="width:1000px">
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
								<td style="width: 33%;">
									<div class="form-group">
										<label><span class="text-required">*</span>盘点单号：</label>
										<input type="text" name="physicalNoAdd" class="form-control" id="physicalNoAdd" readonly="readonly">
									</div>
								</td>
								<td style="width: 33%;">
									<div class="form-group">
										<label>状态：</label> <select class="form-control"
											name="stateAdd" id="stateAdd" disabled="disabled">
											<option value="10">新建</option>
											<option value="20">盘点完成</option>
											<option value="30">作废</option>
										</select>
									</div>
								</td>
								<td style="width: 33%;">
									<div class="form-group">
										<label><span class="text-required">*</span>运营商：</label>
										<input type="text" name=operatName class="form-control" id="operatName" readonly="readonly">
									</div>
								</td>
							</tr>
							<tr>
								<td style="width: 33%;">
									<div class="form-group">
										<label>盘点方式：</label> <select class="form-control"
											name="physicalWay" id="physicalWay" disabled="disabled">
											<option value="10">全盘</option>
											<option value="20">把选中的库存，生成盘点单</option>
										</select>
									</div>
								</td>
								<td style="width: 33%;">
									<div class="form-group">
										<label><span class="text-required">*</span>仓库名称：</label> <input
											type="hidden" id="warehouseCodeAdd">	
											<input type="text" name="warehouseNameAdd" id="warehouseNameAdd" class="form-control" readonly="readonly">
									</div>
								</td>
							</tr>
						</table>
					    <div style="color:#9F79EE" ><label>盘点明细</label></div>
				        <div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
						<div role="grid" class="box-body table-responsive" >
							<table id="physicalDetailManagerTable" class="table table-hover table-striped table-bordered" >

							</table>
						</div>
						
						<div  style="width:100%;">
				       		<div>
				       			<table style="width: 100%;">
				       				<tr>
				       					<td style="width:33%;">
				       		 				<div class="form-group">
												<label><span class="text-required">*</span>货品编码：</label>
												<input type="text" name="skuCodeAdd" id="skuCodeAdd" class="form-control" readonly="readonly">
											</div>
				       					</td>
				       					<td style="width:33%;">
				       		 				<div class="form-group">
												<label><span class="text-required">*</span>库位编码：</label>
												<input type="text" name="locationCodeAdd" id="locationCodeAdd" class="form-control" readonly="readonly">
											</div>
				       					</td>
				       					<td style="width:33%;">
				       		 				<div class="form-group">
												<label><span class="text-required">*</span>库存批次号：</label>
												<input type="text" name="batchNoAdd" id="batchNoAdd" class="form-control" readonly="readonly">
											</div>
				       					</td>
				       				</tr>
				       				<tr>
				       					<td style="width:33%;">
				       		 				<div class="form-group">
												<label><span class="text-required">*</span>货品名称：</label>
												<input type="text" name="skuNameAdd" id="skuNameAdd" class="form-control" readonly="readonly">
											</div>
				       					</td>
				       					<td style="width:33%;">
				       		 				<div class="form-group">
												<label><span class="text-required">*</span>入库日期：</label>
												<input type="text" name="storageDate" id="storageDate" class="form-control" readonly="readonly">
											</div>
				       					</td>
				       					<td style="width:33%;">
				       		 				<div class="form-group">
												<label><span class="text-required">*</span>生产日期：</label>
												<input type="text" name="proDate" id="proDate" class="form-control" readonly="readonly">
											</div>
				       					</td>
				       				</tr>
				       				<tr>
				       					<td style="width:33%;">
				       						 <div class="form-group">
									          <label><span class="text-required">*</span>库存状态：</label>
									      	    <select class="form-control" name="status" id="status" readonly="readonly" disabled="disabled">
		                                            <option value="10">良品</option>
		                                            <option value="20">残品</option>
									  		    </select>
									      	 </div>
				       					</td>
				       				</tr>
				       			</table>
						    </div>
						</div>
						<div  style="width:100%;">
				       			<div style="color:#9F79EE" ><label>录入盘点结果</label></div>
				       			<div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
				       		<div>
				       			<table style="width: 100%;">
				       				<tr>
				       					<td style="width:33%;">
 					       		 			<div class="form-group">
												<label><span class="text-required">*</span>计划数量：</label>
												<input type="text" name="planQty" id="planQty" class="form-control" readonly="readonly">
											</div>
	
				       					</td>
				       					<td style="width:33%;">
				       						<div class="form-group">
												<label><span class="text-required">*</span>实际数量：</label>
												<input type="text" name="actualQty" id="actualQty" class="form-control" maxlength="4" />
											</div>
				       					</td>
				       				</tr>
				       			</table>
						    </div>
						</div>
						<button id="btn_save_submit" type="button" name="btn_save_submit"
							class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>添加
						</button>
					</div>
					<div class="modal-footer">
						<input type="hidden" id="rowId">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
	 
	
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/wms/warehouseinside/stockPhysical.js" type="text/javascript"></script>
</body>
</html>
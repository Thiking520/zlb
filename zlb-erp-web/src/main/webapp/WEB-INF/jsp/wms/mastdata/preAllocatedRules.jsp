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
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">业务规则</a></li>
				<li><a href="#" class="active">预分配规则</a></li>
			</ul>
		</div>

		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>业务规则>预分配规则
						</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/preAllocatedRules/init"> 
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" id="fromModal01" role="form"
								>
								<div class="controls controls-row">
								
									<div class="form-group">
										<label>规则编码：</label> 
										<input type="text" name="rulesCode" class="form-control" id="rulesCode">
									</div>
									<div class="form-group">
										<label>规则名称：</label> 
										<input type="text" name="rulesName" class="form-control" id="rulesName">
									</div>
									<div class="form-group">
										<span>状态：</span> <select class="form-control" name=disabled id="disabled">
											<option value="">全部</option>
											<option value="0">生效</option>
											<option value="1">失效</option>
										</select>
									</div>
									<div class="form-group">
										<button id="btn_search" class="btn btn-success btn-flat"
											type="button">搜索</button>
										<button type="button" class="btn btn-primary btn-flat" id="btn_clean">清空</button>
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
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_add">
									<span class="glyphicon glyphicon-plus" style="color: green;"></span>新增
								</button>
							</div>
							</div>
							<div>
								<table id="preAllocatedRulesManagerTable" class="table table-hover table-striped table-bordered">

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
			<div class="modal-dialog" role="document" style="width:750px">
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
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>规则编码：</label>
										<input type="text" name="rulesCodeAdd" class="form-control" id="rulesCodeAdd" readonly="readonly">
									</div>
								</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>规则名称：</label>
										<input type="text" name="rulesNameAdd" class="form-control" id="rulesNameAdd" >
									</div>
								</td>
							</tr>
							<tr>
							    <td style="width:50%;">
							      <div class="form-group">
							      <label><span class="text-required">*</span>运营商：</label>
							      <input type="hidden" name="operatorCode" id="operatorCode">
							      <input type="text" name="operatorName" id="operatorName" readonly="readonly" class="form-control" >
							      </div>
					   			</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label>状态：</label> <select class="form-control"
											name="disabledAdd" id="disabledAdd">
											<option value="0">生效</option>
											<option value="1">失效</option>
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>仓库名称：</label>
										<input type="text" name="warehouseNameAdd" id="warehouseNameAdd" class="form-control" readonly="readonly">
									</div>
								</td>
							</tr>
						</table>
						<div style="padding-top:20px"> </div>
						
						<div>
							<table id="preAllocateRulesDetailManagerTable" class="table table-hover table-striped table-bordered" style="min-width: 1000px;">

							</table>
						</div>
						<div id="preDiv">
								<div  style="width:50%;">
						       		<div>
						       			<table style="width: 100%;">
						       				<tr>
						       					<td style="width:50%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>步骤号：</label>
											      		<input type="text" name="orderNo" class="form-control" id="orderNo" >
											      </div>
						       					</td>
						       				</tr>
						       			</table>
								    </div>
								</div>
								<div  style="width:100%;">
						       			<div style="color:#9F79EE" ><label>按批属性</label></div>
						       			<div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
						       		<div>
						       			<table style="width: 100%;">
						       				<tr>
						       					<div class="form-group">
												<label>描述：</label>
												<input type="text" name="descrip" class="form-control" id="descrip">
											</div>
						       				</tr>
						       				<tr>
						       					<td style="width:50%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>批次属性：</label>
											      	    <select class="form-control" name="propertyBatch" id="propertyBatch" >
				                                            <option value="10">生产日期</option>
				                                            <option value="20">失效日期</option>
				                                            <option value="30">入库日期</option>
				                                            <option value="40">生产批次</option>
				                                            <option value="50">供应商</option>
											  		    </select>
											      	 </div>
						       					</td>
						       					<td style="width:50%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>排序：</label>
											      	    <select class="form-control" name="sorting" id="sorting" >
				                                            <option value="10">从小到大</option>
				                                            <option value="20">从大到小</option>
											  		    </select>
											      	 </div>
						       					</td>
						       				</tr>
						       			</table>
								    </div>
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
						<button id="btn_edit_submit" type="button" name="btn_edit_submit"
							class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确认修改
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
	
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal02" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel02" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel02">选择库位</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="proForm">
						<div class="controls controls-row">
							<div class="form-group">
								<span>库区编码:</span><input name="warehouseLocationCode" id="warehouseAreaCode"
									class="form-control" style="width: 100px;">
							</div>
							<div class="form-group">
								<span>库区名称:</span><input name="warehouseLocationName" id="warehouseLocationName"
									class="form-control" style="width: 130px;">
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-primary"
									id="btn_search_location">查询</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">关闭</button>
								<button type="button" class="btn btn-primary" id="location_save">保存</button>
							</div>
						</div>
					</form>
					<table id="warehouseLocationList"></table>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal03" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel03" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel03">选择库区</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="proForm">
						<div class="controls controls-row">
							<div class="form-group">
								<span>库区编码:</span><input name="warehouseAreaCode" id="warehouseAreaCode"
									class="form-control" style="width: 100px;">
							</div>
							<div class="form-group">
								<span>库区名称:</span><input name="warehouseAreaName" id="warehouseAreaName"
									class="form-control" style="width: 130px;">
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-primary"
									id="btn_search_pro">查询</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">关闭</button>
								<button type="button" class="btn btn-primary" id="area_save">保存</button>
							</div>
						</div>
					</form>
					<table id="warehouseAreaList"></table>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>

	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<!-- 自己功能模块的外部JS -->
	<script
		src="${contextPath}/resources/js/business/wms/mastdata/preAllocatedRules.js"
		type="text/javascript"></script>


</body>
<script type="text/javascript">
	$(function() {
		$("#example").popover({

		});
	});
</script>
</html>
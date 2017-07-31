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
				<li><a href="#">仓库布局</a></li>
				<li><a href="#" class="active">仓库档案</a></li>
			</ul>
		</div>

		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>仓库布局>仓库档案
						</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/warehouse/init">
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" id="fromModal01" role="form"
								>
								<div class="controls controls-row">
									<div class="form-group">
										<span>仓库编码：</span><input name="warehouseCode"
											id="warehouseCode" type="text"
											class="form-control input-small" />
									</div>
									<div class="form-group">
										<span>仓库名称：</span><input type="text" name="warehouseName"
											id="warehouseName" class="form-control input-small"
											style="width: 150px;" />
									</div>

									<div class="form-group">
										<span>状态：</span> <select class="form-control" name="carType_c"
											id="carType_c">
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
							</div>
							<div style="overflow-x: scroll;">
								<table id="warhouseManagerTable"
									class="table table-hover table-striped table-bordered">

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
			aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
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
										<label><span class="text-required">*</span>仓库编码：</label>
										<input type="text" name="warehouseCodeAdd" class="form-control" id="warehouseCodeAdd" readonly="readonly">
									</div>
								</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>仓库名称：</label>
										<div class="input-group">
											<input type="text" name="warehouseNameAdd" id="warehouseNameAdd" class="form-control" readonly="readonly">
											<div class="input-group-addon" id="fromSouSuo01"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="search_warehouse"></span>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>运营商：</label>
						      			<input type="hidden" name="operatorCode" id="operatorCode">
						      			<input type="text" name="operatorName" id="operatorName" readonly="readonly" class="form-control" >
									</div>
								</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>类型：</label>
										<select onchange="javascript:disClick();" class="form-control" name="warehouseType" id="warehouseType" >
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<td style="width: 50%;">
									<div class="form-group">
										<label>状态：</label> 
										<select class="form-control"
											name="disabled" id="disabled">
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<td style="width: 50%;">
									<div class="form-group">
										<label>负责人：</label> <input
											type="hidden" id="deliveryHeadId">
										<div class="input-group">
											<input type="text" name="deliveryHead" id="deliveryHead" class="form-control" readonly="readonly">
											<div class="input-group-addon" id="fromSouSuo02"
												style="background-color: white;">
												<span class="glyphicon glyphicon-search"
													id="search_deliveryHead"></span>
											</div>
										</div>
									</div>
								</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>联系电话：</label>
										<input type="text" name="contact" id="contact" class="form-control" readonly="readonly">
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<div class="form-group">
										<label><span class="text-required">*</span>行政地址：</label>
										<input type="text" name="detailAddres" id="detailAddres" class="form-control">
									</div>
								</td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<input type="hidden" id="rowId">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
						</button>
						<button id="btn_save_submit" type="button" name="btn_save_submit"
							class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
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
	<div class="modal fade" id="myModal03" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel03" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel03">选择负责人</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="empForm">
						<div class="controls controls-row">
							<div class="form-group">
								<span>姓名:</span><input name="name_emp" id="name_emp"
									class="form-control" style="width: 100px;">
							</div>
							<div class="form-group">
								<span>电话:</span><input name="tel_emp" id="tel_emp"
									class="form-control" style="width: 130px;">
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-primary"
									id="btn_search_emp">查询</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">关闭</button>
								<button type="button" class="btn btn-primary" id="emp_save">保存</button>
							</div>
						</div>
					</form>
					<table id="empList"></table>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>

	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal04" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel04" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel04">选择仓库</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="warehouseForm">
						<div class="controls controls-row">
							<div class="form-group">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">关闭</button>
								<button type="button" class="btn btn-primary" id="warehouse_save">保存</button>
							</div>
						</div>
					</form>
					<table id="warehouseList"></table>
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
		src="${contextPath}/resources/js/business/wms/mastdata/warehouses.js"
		type="text/javascript"></script>


</body>
<script type="text/javascript">
	$(function() {
		$("#example").popover({

		});
	});
</script>
</html>
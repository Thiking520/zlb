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
				<li><a href="#" class="active">库区档案</a></li>
			</ul>
		</div>

		<div >
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>仓库布局>库区档案
						</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/warehouseArea/init">
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" id="fromModal01" role="form"
								>
								<div class="controls controls-row">
								
									<div class="form-group">
										<label>库区编码：</label> 
										<input type="text" name="warehouse_area_code" class="form-control" id="warehouse_area_code">
									</div>
									<div class="form-group">
										<label>库区名称：</label> 
										<input type="text" name="warehouse_area_name" class="form-control" id="warehouse_area_name">
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
							<div style="overflow-x: scroll;">
								<table id="warhouseAreaManagerTable" class="table table-hover table-striped table-bordered">

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
										<label><span class="text-required">*</span>库区编码：</label>
										<input type="text" name="warehouse_area_code_add" class="form-control" id="warehouse_area_code_add" readonly="readonly">
									</div>
								</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>库区名称：</label>
										<input type="text" name="warehouse_area_name_add" class="form-control" id="warehouse_area_name_add">
									</div>
								</td>
							</tr>
							<tr>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>仓库名称：</label> <input
											type="hidden" id="warehouseCodeAdd">
											<input type="text" name="warehouseNameAdd" id="warehouseNameAdd" class="form-control" readonly="readonly">
										</div>
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
						</table>
						<div class="form-group">
							<label>备注：</label> <input type="text" name="remark" class="form-control" id="remark">
						</div>
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

	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<!-- 自己功能模块的外部JS -->
	<script
		src="${contextPath}/resources/js/business/wms/mastdata/warehousesArea.js"
		type="text/javascript"></script>


</body>
<script type="text/javascript">
	$(function() {
		$("#example").popover({

		});
	});
</script>
</html>
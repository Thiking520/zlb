<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<link rel="shortcut icon" href="img/favicon.ico">
<link href="${contextPath}/resources/css/common/bootstrap-editable.css" rel="stylesheet">

<style type="text/css">	
</style>
</head>
<body class="skin-blue">
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">主数据</a></li>
				<li><a href="#" class="active">批次属性</a></li>
			</ul>
		</div>

		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>主数据>批次属性
						</h2>
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" id="fromModal01" role="form"
								>
								<div class="controls controls-row">
								
									<div class="form-group">
										<label><span class="text-required">*</span>仓库编码：</label>
										<input type="text" name="warehouseCode" class="form-control" id="warehouseCode">
									</div>
									<div class="form-group">
										<label><span class="text-required">*</span>批属性编码：</label>
										<input type="text" name="propertyCode" class="form-control" id="propertyCode">
									</div>
									<div class="form-group">
										<label><span class="text-required">*</span>批属性名称：</label>
										<input type="text" name="propertyName" class="form-control" id="propertyName">
									</div>
									<div class="form-group">
										<span>状态：</span> <select class="form-control" name=disabled id="disabled">
											<option value="">全部</option>
											<option value="1">生效</option>
											<option value="0">失效</option>
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
								<table id=propertyManagerTable class="table table-hover table-striped table-bordered">

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
										<label><span class="text-required">*</span>批属性编码：</label>
										<input type="text" name="propertyCodeAdd" class="form-control" id="propertyCodeAdd">
									</div>
								</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>批属性名称：</label>
										<input type="text" name="propertyNameAdd" class="form-control" id="propertyNameAdd">
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
										<label><span class="text-required">*</span>仓库名称：</label>
											<input type="text" name="warehouseNameAdd" id="warehouseNameAdd" class="form-control" readonly="readonly">
									</div>
								</td>
							</tr>
							<tr>
								<td style="width: 50%;">
									<div class="form-group">
										<label>状态：</label> <select class="form-control"
											name="disabled" id="disabled">
											<option value="1">生效</option>
											<option value="0">失效</option>
										</select>
									</div>
								</td>
							</tr>
							
						</table>
						<div class="form-group">
							<label>批属性描述：</label> <input type="text" name="descrip" class="form-control" id="descrip">
						</div>
						
						<div class="form-group">
							<table style="width: 100%;">
								<tr>
									<td style="width: 50%;">
										<div class="form-group">
											<label><span class="text-required">*</span>是否使用：</label> <select class="form-control"
												name="isUse" id="isUse">
												<option value="1">是</option>
												<option value="0">否</option>
											</select>
										</div>
									</td>
									<td style="width: 50%;">
										<div class="form-group">
												<label><span class="text-required">*</span>批次属性：</label> <select class="form-control"
												name="propertyBatch" id="propertyBatch">
												<option value="10">生产日期</option>
												<option value="20">失效日期</option>
												<option value="30">入库日期</option>
												<option value="40">生产批次</option>
												<option value="50">供应商</option>
											</select>
										</div>
									</td>
							    </tr>
							    <tr>
									<td style="width: 50%;">
										<div class="form-group">
											<label><span class="text-required">*</span>栏位显示：</label>
											<input type="text" name="fieldShow" class="form-control" id="fieldShow">
										</div>
									</td>
									<td style="width: 50%;">
										<div class="form-group">
												<label><span class="text-required">*</span>是否必输：</label> <select class="form-control"
												name="isRequired" id="isRequired">
												<option value="1">是</option>
												<option value="0">否</option>
											</select>
										</div>
									</td>
							    </tr>
							    <tr>
									<td style="width: 50%;">
										<div class="form-group">
												<label><span class="text-required">*</span>格式：</label> <select class="form-control"
												name="type" id="type">
												<option value="10">日期</option>
												<option value="20">字符</option>
											</select>
										</div>
									</td>
							    </tr>
							</table>
						</div>
						<button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>添加
						</button>
						<table id="propertyDetailTable"></table>
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

	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/wms/mastdata/bootstrap-editable.js"></script>
    <script src="${contextPath}/resources/js/business/wms/mastdata/property.js" type="text/javascript"></script>
</body>
<script type="text/javascript">
/* 	$(function() {
		$("#example").popover({

		});
	}); */
</script>

</html>
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
				<li><a href="#">基础数据</a></li>
				<li><a href="#" class="active">货品档案</a></li>
			</ul>
		</div>

		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>基础数据>货品档案
						</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/skuConfig/init">
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" id="fromModal01" role="form"
								>
								<div class="controls controls-row">
									
									<div class="form-group">
										<span>货品编码：</span><input name="skuCode"
											id="skuCode"" type="text"
											class="form-control input-small" />
									</div>
									<div class="form-group">
										<span>货品名称：</span><input name="skuName"
											id="skuName" type="text"
											class="form-control input-small" />
									</div>
									<div class="form-group">
										<span>状态：</span> <select class="form-control" name="disabled"
											id="disabled">
										</select>
									</div>
									<div class="form-group">
										<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
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
								<table id="skuConfigManagerTable"
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
	<!-- <form id="addAnchorForm" method="post" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" style="overflow-y: scroll;">
			<div class="modal-dialog" role="document" style="width: 750px">
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
										<label><span class="text-required">*</span>货品编码：</label> <input
											type="text" name="skuCodeAdd" class="form-control"
											id="skuCodeAdd" readonly="readonly">
									</div>
								</td>
								<td style="width: 33%;">
									<div class="form-group">
										<label><span class="text-required">*</span>货品名称：</label>
										<div class="input-group">
											<input type="text" name="skuNameAdd" class="form-control"
												id="skuNameAdd" readonly="readonly">
											<div class="input-group-addon" id="skuNameSearch"
												style="background-color: white;">
												<span class="glyphicon glyphicon-search" id="skuCodeQuery"></span>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</table>
						<div style="width: 100%;">
							<div style="color: #9F79EE">
								<label>入库</label>
							</div>
							<div
								style="width: 100%; height: 30px; border-top: 1px solid #F2F2F2"></div>
							<table style="width: 100%;">
								<tr>
									<td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>上架规则：</label> <input
												type="hidden" id="rulesCode">
											<div class="input-group">
												<input type="text" name="rulesName" class="form-control"
													id="rulesName" readonly="readonly">
												<div class="input-group-addon" id="rulesNameSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="search_rulesName"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>首选库区：</label>
											<div class="input-group">
												<input type="text" name="warehouseAreaCodeAdd"
													id="warehouseAreaCodeAdd" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="areaSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchShelRulesName"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>首选库位：</label>
											<div class="input-group">
												<input type="text" name="warehouseLocationCode"
													id="warehouseLocationCode" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="locationSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchWarehouseLocationName"></span>
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td style="width: 33%;">
										<div class="form-group">
											<label>备用库区：</label>
											<div class="input-group">
												<input type="text" name="warehouseAreaSpare"
													id="warehouseAreaSpare" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="areaSpareSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchAllSpare"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label>退货库区：</label>
											<div class="input-group">
												<input type="text" name="warehouseAreaReturn"
													id="warehouseAreaReturn" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="areaReturnSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchAllReturn"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label>循环级别：</label> <select class="form-control"
												name="cycle" id="cycle">
												<option value="10">快速周转</option>
												<option value="20">中速周转</option>
												<option value="30">慢速周转</option>
											</select>
										</div>
									</td>
								</tr>
								<tr>
									<td style="width: 33%;">
										<div class="form-group">
											<label>商品分类：</label> <select class="form-control"
												name="skuClassify" id="skuClassify">
												<option value="10">原料</option>
												<option value="20">成品</option>
											</select>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label>商品单位：</label> <select class="form-control"
												name="skuUnit" id="skuUnit">
												    <option value="个">个</option>
													<option value="件">件</option>
													<option value="份">份</option>
													<option value="箱">箱</option>
													<option value="瓶">瓶</option>
													<option value="千克">千克</option>
													<option value="克">克</option>
											</select>
										</div>
									</td>
								</tr>
							</table>
							-------------------------------------------
							<div style="width: 100%;">
								<div style="color: #9F79EE">
									<label>出库</label>
								</div>
								<div
									style="width: 100%; height: 30px; border-top: 1px solid #F2F2F2"></div>
								<table style="width: 100%;">
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label><span class="text-required">*</span>预分配规则：</label>
												<input type="hidden" id="preAllocatedCode">
												<div class="input-group">
													<input type="text" name="preAllocatedName"
														class="form-control" id="preAllocatedName"
														readonly="readonly">
													<div class="input-group-addon" id="preAllocatedSearch"
														style="background-color: white;">
														<span class="glyphicon glyphicon-search"
															id="searchPreAllocated"></span>
													</div>
												</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label><span class="text-required">*</span>分配规则：</label>
												<input type="hidden" id="allocatedCode">
												<div class="input-group">
													<input type="text" name="allocatedName" id="allocatedName"
														class="form-control" readonly="readonly">
													<div class="input-group-addon" id="allocatedSearch"
														style="background-color: white;">
														<span class="glyphicon glyphicon-search"
															id="searchAllocated"></span>
													</div>
												</div>
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>默认包装材料</label>
												<div class="input-group">
													<input type="text" name="packagCode" id="packagCode"
														class="form-control" readonly="readonly">
													<div class="input-group-addon" id="fromSouSuo02"
														style="background-color: white;">
														<span class="glyphicon glyphicon-search" id="searchPackag"></span>
													</div>
												</div>
											</div>
										</td>
									</tr>
								</table>
							</div>
							<div style="width: 100%;">
								<div style="color: #9F79EE">
									<label>库内</label>
								</div>
								<div
									style="width: 100%; height: 30px; border-top: 1px solid #F2F2F2"></div>
								<table style="width: 100%;">
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label>质检周期(H)：</label> <input type="text"
													name="qualityCycle1" class="form-control" id="qualityCycle">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>库存上限：</label> <input type="text" name="stockLimit"
													class="form-control" id="stockLimit">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>库存下限：</label> <input type="text" name="stockLower"
													class="form-control" id="stockLower">
											</div>
										</td>
									</tr>
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label>补货增量：</label> <input type="text" name="replenBulking"
													class="form-control" id="replenBulking">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>补货单位：</label> <select class="form-control"
													name="replenUnit" id="replenUnit">
													<option value="10">个</option>
													<option value="20">件</option>
													<option value="30">箱</option>
													<option value="40">托盘</option>
													<option value="50">千克</option>
												</select>
											</div>
										</td>
									</tr>
								</table>
							</div>
							<div style="width: 100%;">
								<div style="color: #9F79EE">
									<label>效期管理</label>
								</div>
								<div
									style="width: 100%; height: 30px; border-top: 1px solid #F2F2F2"></div>
								<table style="width: 100%;">
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label>保质期(天)：</label> <input type="text" name="life"
													class="form-control" id="life">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>保质期前置天数：</label> <input type="text" name="lifeDays"
													class="form-control" id="lifeDays">
											</div>
										</td>
									</tr>
								</table>
							</div>
							<div style="width: 100%;">
								<div style="color: #9F79EE">
									<label>序列号管控</label>
								</div>
								<div
									style="width: 100%; height: 30px; border-top: 1px solid #F2F2F2"></div>
								<table style="width: 100%;">
									<tr>
										<td colspan="2">
											<div class="form-group">
												<label class="checkbox-inline"
													style="float: right; left: 1000px; width: 230px"> <input
													type="checkbox" id="storageNo" name="storageNo" value="1">
													入库时扫描序列号
												</label> <label class="checkbox-inline"
													style="float: right; width: 400px"> <input
													type="checkbox" id="outNo" name="outNo" value="1">
													出库时扫描序列号
												</label>
											</div>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="modal-footer">
							<input type="hidden" id="rowId">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">
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
		</div>
	</form> -->




	

	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<!--模态框  -->
	<%@include file="./skuConfigModal.jsp"%>
	<!-- 自己功能模块的外部JS -->
	<script
		src="${contextPath}/resources/js/business/wms/mastdata/skuConfig.js"
		type="text/javascript"></script>


</body>
<script type="text/javascript">
	$(function() {
		$("#example").popover({

		});
	});
</script>
</html>
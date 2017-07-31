<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<link href="${contextPath}/resources/css/baidumap/baidumap.css" rel="stylesheet" type="text/css"/>
	<title></title>
</head>
<body>
    <!-- 左侧站点信息区域begin -->
	<div class="col-md-1" style="width: 25%; height: 100%;">
		<div class="box-inner">
			<div class="box-header well" data-original-title="">
				<h2 id="operationTitle"></h2>
				<!-- 嵌入我负责的站点界面 -->
				<div class="btn-group pull-right">
					<div class="controls"></div>
				</div>
				<div class="btn-group pull-right">
					<h2 id="deliveryName"></h2>
				</div>
			</div>

			<div align="center">
				<div>
					<ul id="myTab" class="nav nav-tabs">
						<li class="active"><a href="#jbxx" class="deliveryTab" id="deliveryJbxx" data-toggle="tab">基本信息</a></li>
						<li><a href="#fgfw" class="deliveryTab" id="deliveryFgfw" data-toggle="tab">覆盖范围</a></li>
						<!-- <li><a href="#pcfw" class="deliveryTab" id="deliveryPcfw" data-toggle="tab">排除范围</a></li> -->
					</ul>
					<div class="tab-content">
							<div class="tab-pane fade in active" id="jbxx">
							    <form id="deliveryBaseInfoForm" action="#" >
								<table style="width: 100%;">
									<tr>
										<td style="width: 50%;">
											<div class="form-group">
												<label>名称：</label> 
												    <input type="hidden" id="formId">
													<input type="text" name="name" id="name" class="form-control">
											</div>
										</td>
									</tr>
									<tr>
										<td style="width: 50%;">
											<div class="form-group">
												<label>状态：</label> 
											    <select class="form-control" name="enabled" id="enabled">
												<option value="1">生效</option>
												<option value="0">失效</option>
											    </select>
											</div>
										</td>
										<td style="width: 50%;">
											<div class="form-group">
												<label>是否支持自提：</label> 
												<select class="form-control" name="selfPickup" id="selfPickup">
												<option value="0">否</option>
												<option value="1">是</option>
												</select>
											</div>
										</td>
									</tr>
									<tr>
										<td style="width: 50%;">
											<div class="form-group">
												<label><span class="text-required">*</span>类型：</label>
												<select class="form-control" name="deliveryType" id="deliveryType">
												</select>
											</div>
										</td>
										<td style="width: 50%;">
											<div class="form-group">
												<label>上级：</label> 
												<input type="hidden" id="superior" name ="superior">
												<div class="input-group">
													<input type="text" name="superiorName" id="superiorName" class="form-control" readonly="readonly">
													<div class="input-group-addon" id="fromSouSuo01" style="background-color: white;">
														<span class="glyphicon glyphicon-search" id="search_superior"></span>
													</div>
												</div>
										</td>
									</tr>
									<tr>
										<td>
											<div class="form-group">
												<label>负责人：</label> 
												<input type="hidden" id="deliveryHead">
												<div class="input-group">
													<input type="text" name="deliveryHeadName" id="deliveryHeadName" class="form-control" readonly="readonly">
													<div class="input-group-addon" style="background-color: white;">
														<span class="glyphicon glyphicon-search search_deliveryHead" id="search_deliveryHead"></span>
													</div>
												</div>
											</div>
										</td>
										<td>
											<div class="form-group">
												<label>负责人手机号</label> 
												<input type="text" name="deliveryHeadPhone" id="deliveryHeadPhone" readonly="readonly" style="background-color:white;cursor:not-allowed" class="form-control">
											</div>
										</td>
                                    </tr>
									<tr>
										<td colspan="2">
											<div class="form-group">
												<label><span class="text-required">*</span>地址：</label> <input type="text" name="detailedAddress" id="deliveryDetailedAddress" class="form-control">
											</div>
										</td>
									</tr>
								</table>
								</form>
								<div>
									<div>
										<button id="btn_delivery_cancel" type="button" data-dismiss="modal" class="btn btn-default" >
											<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>返回
										</button>
										<button id="btn_delivery_submit" type="button" name="btn_delivery_submit" class="btn btn-primary">
											<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
										</button>
									</div>
								</div>
							</div>
							
							<div class="tab-pane fade" id="fgfw">
								<div class="well well-sm" style="margin-bottom: 0px;">
									<label>配送范围</label>
								</div>
								<div>
									<table id="coverScopeTable" class="table table-bordered table-hover table-condensed" style="text-align: center; min-width: 300px;">

									</table>
								</div>
							</div>
							<div class="tab-pane fade" id="pcfw">
								<div class="well well-sm" style="margin-bottom: 0px;">
									<label>排除地址</label>
								</div>
								<div>
									<table id="excludeScopeTable" class="table table-bordered table-hover table-condensed" style="text-align: center; min-width: 300px;">

									</table>
								</div>
							</div>
							
							<!-- 覆盖范围/排除范围基础信息区域begin -->
							<div id="coverAndExcludeScope" class="alert alert-info hide" style="margin-top: 10px;">
							<form id="coverAndExcludeScopeForm" action="#" >
								<table style="width: 100%;">
								    <tr>
								 		<td style="width: 50%;">
											<div class="form-group">
												<label><span class="text-required">*</span>类型：</label>
												<select class="form-control" name="level" id="scopeLeveType">
										        </select>
											</div>
										</td>
										<td ></td>
									</tr>
									<tr>
										<td colspan="2">
											<div class="form-group">
												<label><span class="text-required">*</span>名称：</label>
													<input type="text" name="name" id="scopeName" class="form-control">
											</div>
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<div class="form-group">
												<label>地址：</label> 
													<input type="text" id="scopeDetailedAddress" class="form-control">
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div class="form-group">
												<label>负责人：</label> 
												<div class="input-group">
												    <input type="hidden" id="scopeHead">
													<input type="text" name="scopeHeadName" id="scopeHeadName" class="form-control" readonly="readonly">
													<div class="input-group-addon" style="background-color: white;">
														<span class="glyphicon glyphicon-search search_deliveryHead" id="search_scopeHead"></span>
													</div>
												</div>
											</div>
										</td>
										<td>
											<div class="form-group">
												<label>负责人手机号</label> 
												<input type="text" name="scopeHeadPhone" readonly="readonly" style="cursor:not-allowed;background-color:white;" id="scopeHeadPhone" class="form-control">
											</div>
										</td>
									</tr>
								</table>
								</form>
								<div>
									<div>
									    <button id="btn_scope_add" type="button" class="btn btn-primary">
											<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
										</button>
										<button id="btn_scope_submit" type="button" class="btn btn-primary">
											<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
										</button>
									</div>
								</div>
								</div>
								<!-- 覆盖范围/排除范围基础信息区域end -->
					</div>
				</div>
			</div>
		</div>
	</div>
    <!-- 左侧站点信息区域end -->
    
	<!-- 右侧百度地图区域begin -->
	<div class="form-group col-md-2" style="width: 75%; height: 100%;">
		<div id="searchBox" style="width: 300px; bottom: auto; position: absolute; right: auto; z-index: 10;top: 5px;">
			<div class="input-group">
			    <input name="baiDuSearchContext" id="baiDuSearchContext" class="form-control input-small" type="text">
				<div class="input-group-addon" style="background-color: white;">
					<span class="glyphicon glyphicon-search" id="baiDuSearch_btn"></span>
				</div>
			</div>
			<div id="baiDuSearchResult"></div>
		</div>
		<div id="deliveryMap" style="height: 100%; -webkit-transition: all 0.5s ease-in-out; transition: all 0.5s ease-in-out;"></div>
	</div>
	<!-- 右侧百度地图区域end -->

	<!-- 选择上级模态框（Modal） -->
	<div class="modal fade" id="myModal02" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel02">选择上级</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="sForm">
						<table style="width: 100%; height: 100px;">
							<tr>
								<td style="width: 10%"><span>编码：</span></td>
								<td><input type="text" name="code_2" id="code_2" class="form-control input-small" style="width: 100%;" /></td>
								<td style="width: 10%"><span>名称：</span></td>
								<td><input type="text" name="name_2" id="name_2" class="form-control input-small" style="width: 100%;" /></td>
								<td colspan="4" style="text-align: right;">
									<button type="button" class="btn btn-success" id="btn_search_s">搜索</button>
								</td>
								<td colspan="4" style="text-align: right;">
									<button style="margin-left: 5px;" type="button" class="btn btn-primary" id="btn_clean_sForm">清空</button>
								</td>
							</tr>
						</table>
						<table id="superiorList"></table>
						<div style="margin-left: 70%;">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" id="s_save">确认</button>
						</div>
					</form>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 选择上级模态框（Modal） -->

	<!-- 负责人列表模态框（Modal）begin -->
	<div class="modal fade" id="myModal03" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel03" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel03">选择负责人</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="empForm">
						<div class="controls controls-row">
							<div class="form-group">
								<span>姓名:</span><input name="name_emp" id="name_emp" class="form-control" style="width: 100px;">
							</div>
							<div class="form-group">
								<span>电话:</span><input name="tel_emp" id="tel_emp" class="form-control" style="width: 130px;">
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-success" id="btn_search_emp">搜索</button>
								<button type="button" class="btn btn-primary" style="margin-left: 5px;" id="btn_clean_empForm">清空</button>
							</div>
						</div>
						<table id="empList"></table>
					</form>
					<div class="form-group" style="margin-left: 440px;">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" id="emp_save">确认</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 负责人列表模态框（Modal）end -->
	<script type="text/javascript">
	    //操作类型， add：添加、edit：编辑、view：查看
	    var initOperationType = "${operationType}";
	    var dbDeliveryRecordId = "${deliveryRecordId}";
	</script>
	<script src="${contextPath}/resources/js/business/tms/util/util.js" type="text/javascript"></script>
	<!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/archives/deliveryRecordManage.js" type="text/javascript"></script>
	
	
</body>
</html>
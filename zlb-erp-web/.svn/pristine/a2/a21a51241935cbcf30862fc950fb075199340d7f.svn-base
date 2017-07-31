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
				<li><a href="#" class="active">分配规则</a></li>
			</ul>
		</div>

		<div >
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>业务规则>分配规则
						</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/shelfRules/init">
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
								<table id="allocatedRulesManagerTable" class="table table-hover table-striped table-bordered">

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
										<input type="text" name="rulesCodeAdd" class="form-control"  id="rulesCodeAdd" readonly="readonly">
									</div>
								</td>
								<td style="width: 50%;">
									<div class="form-group">
										<label><span class="text-required">*</span>规则名称：</label>
										<input type="text" name="rulesNameAdd" class="form-control"   id="rulesNameAdd" >
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
											<input type="hidden" id="warehouseCodeAdd">
											<input type="text" name="warehouseNameAdd" id="warehouseNameAdd" class="form-control" readonly="readonly">
									</div>
								</td>
							</tr>
						</table>
						<div style="padding-top:20px"> </div>
						
						<div>
							<table id="allocatedRulesDetailManagerTable" class="table table-hover table-striped table-bordered" >

							</table>
						</div>
						<div id="allDiv">
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
						       			<div style="color:#9F79EE" ><label>限制条件</label></div>
						       			<div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
						       		<div>
						       			<table style="width: 50%;">
						       				<tr>
						       					<td style="width:50%;">
						       						 <div class="form-group">
											          <label>出库类型：</label>
											      	    <select class="form-control" name="outType" id="outType" >
				                                            <option value="10">销售订单</option>
				                                            <option value="20">返厂订单</option>
				                                            <option value="30">换货订单</option>
				                                            <option value="40">调拨订单</option>
				                                            <option value="50">拼团订单</option>
											  		    </select>
											      	 </div>
						       					</td>
						       				</tr>
						       			</table>
								    </div>
								</div>
								<div  style="width:100%;">
						       			<div style="color:#9F79EE" ><label>定位</label></div>
						       			<div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
						       		<div>
						       			<table style="width: 100%;">
						       				<tr>
						       					<td style="width:50%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>库位周转：</label>
											      	    <select class="form-control" name="locationRevolve" id="locationRevolve" >
				                                            <option value="10">快速周转</option>
				                                            <option value="20">中速周转</option>
				                                            <option value="30">慢速周转</option>
											  		    </select>
											      	 </div>
						       					</td>
						       					<td style="width:50%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>库位类型：</label>
											      	    <select class="form-control" name="locationType" id="locationType" >
				                                            <option value="10">货架</option>
				                                            <option value="20">托盘</option>
				                                            <option value="30">地面平仓</option>
											  		    </select>
											      	 </div>
						       					</td>
						       				</tr>
						       			</table>
								    </div>
								</div>
								<div  style="width:100%;">
						       		<div>
						       			<table style="width: 100%;">
						       				<tr>
						       					<td style="width:33%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>存货单位：</label>
											      	    <select class="form-control" name="unit" id="unit" >
				                                            <option value="10">拖盘</option>
				                                            <option value="20">箱</option>
				                                            <option value="30">件(PC)</option>
				                                            <option value="40">内包装</option>
											  		    </select>
											      	 </div>
						       					</td>
						       					<td style="width:33%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>库位使用：</label>
											      	    <select class="form-control" name="locationUse" id="locationUse" >
				                                            <option value="10">收货默认存放库位 "一个仓库这种类型库位只能设置一个"</option>
				                                            <option value="20">拣货默认存放库位 "一个仓库这种类型库位只能设置一个"</option>
				                                            <option value="30">件拣货库位</option>
				                                            <option value="40">箱拣货库位</option>
				                                            <option value="50">存储库位</option>
				                                            <option value="60">过渡库位</option>
				                                            <option value="70">理货工作区</option>
				                                            <option value="80">组装工作区</option>
				                                            <option value="90">复核工作区</option>
				                                            <option value="91">包装工作区</option>
											  		    </select>
											      	 </div>
						       					</td>
						       					<td style="width:33%;">
						       						 <div class="form-group">
											          <label><span class="text-required">*</span>库位属性：</label>
											      	    <select class="form-control" name="locationProperty" id="locationProperty" >
				                                            <option value="10">良品</option>
				                                            <option value="20">残品</option>
				                                            <option value="30">封存</option>
											  		    </select>
											      	 </div>
						       					</td>
						       				</tr>
						       			</table>
								    </div>
								</div>
								<div  style="width:100%;">
						       		<div>
						       			<table style="width: 100%;">
						       				<tr>
						       					<td style="width:33%;">
						       						 <div class="form-group">
															<label><span class="text-required">*</span>库区1：</label>
															<div class="input-group">
																<input type="text" name="warehouseAreaOne" id="warehouseAreaOne" class="form-control" readonly="readonly">
																<div class="input-group-addon" id="fromSouSuo02"
																	style="background-color: white;">
																	<span class="glyphicon glyphicon-search"
																		id="searchAllOne"></span>
																</div>
															</div>
											      	 </div>
						       					</td>
						       					<td style="width:33%;">
						       						 <div class="form-group">
															<label>库区2：</label> 
															<div class="input-group">
																<input type="text" name="warehouseAreaTwo" id="warehouseAreaTwo" class="form-control" readonly="readonly">
																<div class="input-group-addon" id="fromSouSuo02"
																	style="background-color: white;">
																	<span class="glyphicon glyphicon-search"
																		id="searchAllTwo"></span>
																</div>
															</div>
											      	 </div>
						       					</td>
						       					<td style="width:33%;">
						       						 <div class="form-group">
															<label>库区3：</label>
															<div class="input-group">
																<input type="text" name="warehouseAreaThree" id="warehouseAreaThree" class="form-control" readonly="readonly">
																<div class="input-group-addon" id="fromSouSuo02"
																	style="background-color: white;">
																	<span class="glyphicon glyphicon-search"
																		id="searchAllThree"></span>
																</div>
															</div>
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
					<form action="" class="form-inline" role="form" id="areaCodeForm">
						<div class="controls controls-row">
							 <input type="hidden" name="flag" id="flag">
							<div class="form-group">
								<span>库区编码:</span><input name="warehouseAreaCode" id="warehouseAreaCode"
									class="form-control" style="width: 100px;">
							</div>
							<div class="form-group">
								<span>库区名称:</span><input name="warehouseAreaName" id="warehouseAreaName"
									class="form-control" style="width: 130px;">
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-success btn-flat" id="btn_search_pro">搜索</button>
								<button type="button" class="btn btn-primary btn-flat" id="btn_area_clean">清空</button>
							</div>
						</div>
					</form>
					<table id="warehouseAreaList"></table>
					<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							<button type="button" class="btn btn-primary" id="area_save">确认</button>
					</div>
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
		src="${contextPath}/resources/js/business/wms/mastdata/allocatedRules.js"
		type="text/javascript"></script>


</body>
<script type="text/javascript">
	$(function() {
		$("#example").popover({

		});
	});
</script>
</html>
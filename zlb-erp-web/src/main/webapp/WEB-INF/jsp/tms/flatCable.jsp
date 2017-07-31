<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	#divCss .fixed-table-toolbar{
		position: fixed;
		left: 92%;
		top:28%;
	}
</style>
</head>
<body class="skin-blue">
	<div>
			<div class="box-inner">
				<div class="box-header well" data-original-title="">
					<h2><i class="glyphicon glyphicon-user"></i>配送管理>排线管理</h2>
					<!-- 嵌入我负责的站点界面 -->
					<%@include file="myDistributionSite.jsp"%>
				</div>

				<!-- 每个人只用关注这块区域starts -->
				<div class="box-content">
					<!-- 表单查询区域begin -->
					<div class="alert alert-info">

						<form id="addOrEditeSearchForm" class="form-inline" role="form"
							>
							<div class="controls controls-row">
								<div class="form-group">
									<span>排线编号：</span><input id="flatCableId_2"
										name="flatCableId_2" type="text"
										class="form-control input-small" />
								</div>
								<!-- <div class="form-group">
							   	<span>线路编号：</span><input name="cnName_2" id="cnName_2" type="text" class="form-control input-small" />	
							   </div> -->
								<div class="form-group">
									<span>线路描述：</span> <input id="cableDescribe_2"
										name="cableDescribe_2" class="form-control input-small"
										type="text">
								</div>
								<div class="form-group">
									<span>排线单状态：</span> <select class="form-control"
										id="flatCableStatus_3" name="flatCableStatus_3">
										<option value="">全部</option>
									</select>
								</div>
								<%-- <div class="form-group">
									<button type="button" id="example"
										class="btn btn-primary btn-xs popover-toggle" data-html="true"
										data-toggle="popover" data-placement="bottom" data-html="true"
										data-content="
				         			<table>
										<tr>
											<td><span>运营商：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>身份验证：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>员工属性：</span></td>
											<td><select class='form-control input-small'>
												  <option></option>
												  <option>配送员/楼小二</option>
												  <option>调度员</option>
												  <option>单证员</option>
												  <option>司机</option>
												</select>
											</td>
										</tr>
										<tr>
											<td><span>手机号：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>驾驶证号：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>户籍：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>   	
										<tr>
											<td><span>户籍地址：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>现居地址：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr style='text-align: center;background: rgb(7, 65, 123);color: white;' >
											<td colspan='2'><span class='glyphicon glyphicon-search' onclick='hid()'></span></td>
										</tr> 
								  </table>">更多条件^</button>
								</div> --%>
								<div class="form-group">
									<button id="btn_search" class="btn btn-success btn-flat"
										type="button">搜索</button>
								</div>
								
								<div class="form-group">
						        	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
						        </div>
							</div>
						</form>
					</div>
					<!-- 表单查询区域end -->

					<!-- 分页列表区域begin -->
					<div role="grid" class="box-body table-responsive">
						<div class="table_nav">
						<div id="toolbar" class="btn-group">
<!-- 							<button type="button" class="btn btn-default  btn-sm" -->
<!-- 								id="btn_show_look"> -->
<!-- 								<span class="glyphicon glyphicon-pencil" style="color: green;"></span>查看 -->
<!-- 							</button> -->
							<button type="button" class="btn btn-default  btn-sm"
								id="btn_use_car">
								<span class="glyphicon glyphicon-shopping-cart"
									style="color: green;"></span>派车
							</button>
							<button type="button" class="btn btn-default  btn-sm"
								id="btn_is_use">
								<span class="glyphicon glyphicon-remove-circle"
									style="color: black;"></span>作废
							</button>
							<div class="dropdown" style="float: left;">
								<button class="btn btn-default  btn-sm dropdown-toggle"
									type="button" id="dropdownMenu1" data-toggle="dropdown"
									aria-haspopup="true" aria-expanded="true">
									单据打印 <span class="caret"></span>
								</button>
								<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
									<li><a id="print1" href="#"><span
											class="glyphicon glyphicon-download-alt"
											style="color: green;"></span>打印面单</a></li>
									<li><a id="print2" href="#"><span
											class="glyphicon glyphicon-download-alt"
											style="color: green;"></span>打印拣货单</a></li>
								</ul>
							</div>
							<button type="button" class="btn btn-default  btn-sm" id="btn_show_log"><span class="glyphicon glyphicon-list-alt" style="color: green;"></span>操作日志</button>
							<button style="display: none;" id="btn_show_search" class="btn btn-default  btn-sm"
									type="button">
								<span class="glyphicon glyphicon glyphicon-chevron-down"
									  style="color: green;"></span><span>显示搜索条件</span>
							</button>
						</div>
						</div>
						<div id="divCss">
							<table id="fcManagerTable" class="table table-hover table-striped table-bordered" >
	
							</table>
						</div>
					<!-- 分页列表区域ends -->
				</div>
				<!-- 每个人只用关注这块区域starts -->

			</div>
		</div>
	</div>
	</div>
	</div>
	</section>

	<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm" method="post" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" style="overflow: scroll;">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">查看</h4>
					</div>
					<div class="modal-body">
						<ul id="myTab" class="nav nav-tabs">
							<li class="active"><a href="#jbxx" data-toggle="tab">
									基本信息 </a></li>
							<li><a href="#ydlb" data-toggle="tab">运单列表</a></li>
						</ul>
						<div id="myTabContent" class="tab-content">
							<div class="tab-pane fade in active" id="jbxx">
								<table style="width: 100%;">
									<tr>
										<td style="width: 50%;">
											<div class="form-group">
												<label>线路编号：</label> 
												<input type="hidden" name="flatCableId"
													class="form-control" id="flatCableId" >
												<input type="text" name="disFlatCableId"
													class="form-control" id="disFlatCableId" readonly="readonly">
											</div>
										</td>
										<td style="width: 50%;">
											<div class="form-group">
												<label>运营商：</label> <input type="hidden" name="operatorId"
													class="form-control" id="operatorId" >
													<input type="text" name="operatorName"
													class="form-control" id="operatorName" readonly="readonly">
											</div>
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<div class="form-group">
												<label>线路描述：</label> <input type="text" name="cableDescribe"
													id="cableDescribe" class="form-control" value="0" readonly="readonly">
											</div>
										</td>
									</tr>
									<tr>
										<td style="width: 50%;">
											<div class="form-group">
												<label>运单总数：</label> <input type="text" name="waybillAmount"
													id="waybillAmount" class="form-control" readonly="readonly">
											</div>
										</td>
										<td style="width: 50%;">
											<div class="form-group">
												<label>排线单状态：</label> <input type="text" name="flatCableStatus"
													id="flatCableStatus" class="form-control" readonly="readonly">
											</div>
										</td>
									</tr>
								</table>
								<div class="form-group">
									<label>订单描述：</label> <textarea type="text" name="orderDetails" rows="16"
										class="form-control" id="orderDetails" readonly="readonly"></textarea>
								</div>
								<div></div>
								<div>
									<div style="padding-left: 85%;">
										<button type="button" class="btn btn-default"
											data-dismiss="modal">
											<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
										</button>
									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="ydlb">
								<div>
								<table id="dvlistManagerTable2" class="table table-hover table-bordered">
										
								</table>
								</div>
								<div style="height: 167px;">
									<table style="width: 100%;">
										<tr>
											<td><label>运单号:</label></td>
											<td><span id="childWaybillId_2"></span></td>
											<td><label>运单状态:</label></td>
											<td><span id="childWalbillStatus_2"></span></td>
											<td><label>排线状态:</label></td>
											<td><span id="flatCableStatus_2"></span></td>
										</tr>
										<tr>
											<td><label>从配送点:</label></td>
											<td><span id="deliverSiteName_2"></span></td>
											<td><label>至配送点:</label></td>
											<td><span id="takeSiteName_2"></span></td>
											<td><label>运营配送点:</label></td>
											<td><span id="operationSiteName_2"></span></td>
										</tr>
									</table>
									<div class="well well-sm" style="height: 25px; padding: 0px;">
										<span style="font-size: 8px;">收件地址信息</span>
									</div>
									<table style="width: 100%;">
										<tr>
											<td><label>收件人公司:</label></td>
											<td><span id="consumerCompany_2"></span></td>
											<td><label>收件人姓名:</label></td>
											<td><span id="consumerName_2"></span></td>
											<td><label>收件人电子邮箱:</label></td>
											<td><span id="consumerEmail_2"></span></td>
										</tr>
										<tr>
											<td><label> 收件人城市:</label></td>
											<td><span id="consumerCity_2"></span></td>
											<td><label>收件人区/县:</label></td>
											<td><span id="consumerArea_2"></span></td>
											<td><label>收件人街道:</label></td>
											<td><span id="consumerStreet_2"></span></td>
										</tr>
										<tr>
											<td><label> 收件人地址:</label></td>
											<td colspan="5"><span id="consumerAddress_2"></span></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
	
	<div class="modal fade" id="myModal06" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog modal-dialog-width-900">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							排线单操作日志<input type="hidden" id="dvLog_id">
						</h4>
					</div>
					<div class="modal-body">
						<div>
							<table id="logList" style="min-width: 800px;"></table>
						</div>
					</div>
						<div class="modal-footer">
					<button type="button" class="btn btn-default"
						data-dismiss="modal">关闭</button>
				</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	<!-- 模态框（Modal） -->
	<%@include file="../tms/dialog/dispatchVehicleDialog.jsp"%>
	<!-- 模态框（Modal） -->

	<%@include file="../tms/dialog/driverDialog.jsp"%>
	<!-- 模态框（Modal） -->

	<%@include file="../tms/dialog/vehicleDialog.jsp"%>
	
	<%@include file="../tms/dialog/logDialog.jsp"%>
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
	<script
		src="${contextPath}/resources/js/business/tms/util/util.js"
		type="text/javascript"></script>
	<script
		src="${contextPath}/resources/js/business/tms/dialog/driverDialog.js"
		type="text/javascript"></script>
	<script
		src="${contextPath}/resources/js/business/tms/dialog/vehicleDialog.js"
		type="text/javascript"></script>
	<script
		src="${contextPath}/resources/js/business/tms/dialog/dispatchVehicleDialog.js"
		type="text/javascript"></script>
    <script
		src="${contextPath}/resources/js/business/tms/dialog/logDialog.js"
		type="text/javascript"></script>
	<script src="${contextPath}/resources/js/business/tms/flatCable2.js"
		type="text/javascript"></script>

</body>
<script>
	$(function() {
		$("[data-toggle='popover']").popover();
	});
</script>
</html>
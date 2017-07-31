<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	 .fixed-table-toolbar{
		position: fixed;
		left: 91%;
		top:19%;
	}
</style>
</head>
<body class="skin-blue">
		<div>
			<ul class="breadcrumb">
				<li><a href="#">配送管理</a></li>
				<li><a href="javascript:myMain.getAllContent('/tms/dispatchVehicle/init');"}>派车单管理</a></li>
				<li><a class="active">派车单详情</a></li>
			</ul>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">
					派车单编辑
				</h3>
			</div>
			<div class="panel-body">
				<ul id="myTab" class="nav nav-tabs">
						<li class="active">
							<a href="#jbxx" data-toggle="tab">
								基本信息
							</a>
						</li>
						<li><a href="#ydlb" data-toggle="tab">运单列表</a></li>
					</ul>
					<div id="myTabContent" class="tab-content">
						<div class="tab-pane fade in active" id="jbxx" style="height: 80%;">
							<table style="width:50%;">
							 <tr>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>派车单号：</label>
							      <input type="hidden" name="dispatchVehicleId" class="form-control" id="dispatchVehicleId" readonly>
							      <input type="text" name="disDispatchVehicleId" class="form-control" id="disDispatchVehicleId" readonly>
							      </div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group">
							      		<label>状态：</label>	
							      		<input type="text" name="dispatchStatus" id="dispatchStatus" class="form-control" readonly>
									</div>
							   </td>
							 </tr>
							 <tr>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>运营配送点：</label>
							      <input type="hidden" id="deliveryRecordId">
							      <input type="text" name="deliveryRecordName" id="deliveryRecordName" class="form-control" value="0" readonly>
							      </div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>车牌号：</label>
							      <input type="hidden" id="vehicleId">
							      <!-- <div class="input-group"> -->
							      	<input type="text" name="vehicleNumber" class="form-control" id="vehicleNumber" readonly>
							      	<!-- <div class="input-group-addon"><span class="glyphicon glyphicon-search" id="search_car"></span></div> -->
							      <!-- </div> -->
							   </td>
							 </tr>
							 <tr>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>司机姓名：</label>
							      <input type="hidden" id="driver">
							      <!-- <div class="input-group"> -->
							      <input type="text" name="driverName" id="driverName" class="form-control" readonly>
							     <!--  <div class="input-group-addon"><span class="glyphicon glyphicon-search" id="search_driver"></span></div> -->
							    <!-- </div> -->
							      </div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>司机联系电话：</label>
							       <input type="text" name="driverPhone" id="driverPhone" class="form-control" readonly>
							      </div>
							   </td>
							 </tr>
							 <tr>
							   <td>
							      <div class="form-group">
								      	<label>计划发车时间：</label>	
								   		<div class="input-group date form_datetime col-md-12"  data-date-format="yyyy-mm-ddThh:ii:ss" data-link-field="dtp_input1">
						                    <input name="planDepartTime" id="planDepartTime" class="form-control" size="16" type="text" value="" readonly>
						                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
											<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						                </div>
								   </div>
							   </td>
							   <td>
							      <div class="form-group">
								      	  <label>实际发运时间：</label>
									      <div class="input-group date form_datetime col-md-12"  data-date-format="yyyy-mm-ddThh:ii:ss" data-link-field="dtp_input1">
						                    <input name="practicalDepartTime" id="practicalDepartTime" class="form-control" size="16" type="text" value="" readonly>
						                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
											<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                      </div>
			                      </div>
							   </td>
							 </tr>
							 <tr>
							   <td>
							      <div class="form-group">
							      <label>运营商：</label>
							      <input type="hidden" name="operatorId" id="operatorId"  class="form-control" readonly>
							      <input type="text" name="operatorName" id="operatorName" class="form-control" readonly>
							      </div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>完成装车时间：</label>
							      <div class="input-group date form_datetime col-md-12"  data-date-format="yyyy-mm-ddThh:ii:ss" data-link-field="dtp_input1">
						                    <input id="truckLoadingTime" name="truckLoadingTime" class="form-control" size="16" type="text" value="" readonly>
						                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
											<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						          </div>
							      </div>
							   </td>
							 </tr>
							 <tr>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>配送完成时间：</label>
							      <div class="input-group date form_datetime col-md-12"  data-date-format="yyyy-mm-ddThh:ii:ss" data-link-field="dtp_input1">
						                    <input name="finishTime" id="finishTime" class="form-control" size="16" type="text" value="" readonly>
						                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
											<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						          </div>
							      </div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group">
							      <label>派车单打印状态：</label>
							      <input name="deliveryPrintStatus" id="deliveryPrintStatus" class="form-control" size="16" type="text" value="" readonly>
							      <!-- <select class="form-control" name="deliveryPrintStatus" id="deliveryPrintStatus">
											<option value="1">未打印</option>
											<option value="2">已打印</option>
								   </select> -->
							      </div>
							   </td>
							 </tr>
							 <tr>
							 	<td colspan="2">
							      <div class="form-group">
							      <label>面单打印状态：</label>
							      <input name="surfacePrintStatus" id="surfacePrintStatus" class="form-control" size="16" type="text" value="" readonly>
							      <!-- <select class="form-control" name="surfacePrintStatus" id="surfacePrintStatus">
											<option value="1">未打印</option>
											<option value="2">已打印</option>
								   </select> -->
							      </div>
							    </td>
							 </tr>
						   </table>
						   <div class="form-group" style="width:50%;">
					            <label>描述：</label>
					            <input type="text" name="describes" class="form-control" id="describes" readonly>
					       </div>
					       <div style="width:50%;">
						       <div style="padding-left: 65%;">
						          <input type="hidden" id="rowId">
						              <button id="btn_back_submit" type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>返回</button>
<!-- 						          <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
 -->						          <button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
						          <button id="btn_edit_submit" type="button" name="btn_edit_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确认修改</button>
						       </div>
					       </div>
						</div>
						<div class="tab-pane fade" id="ydlb">
							<div>
									<table id="dvlistManagerTable" class="table table-hover table-bordered" >
										
									</table>
							</div>
							<div style="height: 170px;">
							 	<table style="margin-top: 10px;margin-bottom: 5px;">
							 		<tr>
							 			<td style="width:100px;"><label>运单号:</label></td><td style="min-width :100px;"><span id="childWaybillId_1"></span></td>
							 			<td style="width:100px;"><label>运单状态:</label></td><td style="min-width :100px;"><span id="childWalbillStatus_1"></span></td>
							 			<td style="width:100px;"><label>排线状态:</label></td><td style="min-width :100px;"><span id="flatCableStatus_1"></span></td>
							 		</tr>
							 		<tr>
							 			<td style="width:100px;"><label>从配送点:</label></td><td style="min-width :100px;"><span id="deliverSiteId_1"></span></td>
							 			<td style="width:100px;"><label>至配送点:</label></td><td style="min-width :100px;"><span id="takeSiteId_1"></span></td>
							 			<td style="width:100px;"><label>运营配送点:</label></td><td style="min-width :100px;"><span id="operationSiteId_1"></span></td>
							 		</tr>
							 	</table>
							 	<div class="well well-sm" style="height: 10px;padding: 0px;"><span style="font-size: 8px;"></span></div>
								<table >
							 		<tr>
							 			<td style="width:100px;"><label>收件人公司:</label></td><td style="min-width :100px;"><span id="consumerCompany_1"></span></td>
							 			<td style="width:100px;"><label>收件人姓名:</label></td><td style="min-width :100px;"><span id="consumerName_1"></span></td>
							 			<td style="width:110px;"><label>收件人电子邮箱:</label></td><td style="min-width :100px;"><span id="consumerEmail_1"></span></td>
							 		</tr>
							 		<tr>
							 			<td style="width:100px;"><label> 收件人城市:</label></td><td style="min-width :100px;"><span id="consumerCity_1"></span></td>
							 			<td style="width:100px;"><label>收件人区/县:</label></td><td style="min-width :100px;"><span id="consumerArea_1"></span></td>
							 			<td style="width:100px;"><label>收件人街道:</label></td><td style="min-width :100px;"><span id="consumerStreet_1"></span></td>
							 		</tr>
							 		<tr>
							 			<td style="width:100px;"><label> 收件人地址:</label></td><td colspan="5" id="consumerAddress_1"><span></span></td>
							 		</tr>
							 	</table>
							</div>
						</div>
			</div>
		</div>
	</div>
		
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal02" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							选择司机列表
						</h4>
					</div>
					<div class="modal-body">
						<form action="" class="form-inline" role="form">
							<div class="controls controls-row">
								<div class="form-group">
									<span>姓名:</span><input name="name" id="name" class="form-control" style="width: 100px;">
						    	</div>
						    	<div class="form-group">
						    		<span>电话:</span><input name="tel" id="tel" class="form-control" style="width: 130px;">
						    	</div>
						    	<div class="form-group">
									<button type="button" class="btn btn-primary" id="btn_search_driver" >查询</button>
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
									<button type="button" class="btn btn-primary" id="driver_save" >保存</button>
									<button type="button" class="btn btn-primary" id="driver_save_2" >确定</button>
									<button type="button" class="btn btn-primary" id="driver_save_4" >确定</button>
						    	</div>
						    </div>
					    </form>
						<table id="driverList"></table>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal03" tabindex="-1" role="dialog" aria-labelledby="myModalLabel03" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel03">
							选择车牌号
						</h4>
					</div>
					<div class="modal-body">
						<form action="" class="form-inline" role="form">
							<table style="width: 100%;height: 125px;">
								<tr>
									<td >
										<span>车牌号：</span>
									</td>
									<td >
										<input type="text" name="carNumber" id="carNumber" class="form-control input-small" style="width: 109px;"/>
									</td>
									<td >
										<span>车辆类型：</span>	
									</td>
									<td >
							        	<select class="form-control"  name="carType" id="carType">
										  <option></option>
										  <option value="10">10：面包车</option>
										  <option value="20">20：电动车</option>
										  <option value="30">30：自行车</option>
										  <option value="40">40：卡车</option>
										</select>
									</td>
								</tr>
								<tr>
									<td >
										<span>自营\外包：</span>	
									</td>
									<td >
							        	<select class="form-control" name="selfSupport" id="selfSupport">
										  <option></option>
										  <option value='10'>10：自营</option>
		                         		  <option value='20'>20：外包</option>
										</select>
									</td>
									<td colspan="2">
										<input type="checkbox" name="isTransportLiquid" id="isTransportLiquid" value="1"><span>可配送液体</span>
					      				<input type="checkbox" name="isTransportFreezing" id="isTransportFreezing" value="1"><span>可配送冻品</span>
					      				<input type="checkbox" name="isTransportStorage" id="isTransportStorage" value="1"><span>可配送冷藏</span>
									</td>
								</tr>
								<tr>
									<td colspan="4" style="text-align: right;">
										<button type="button" class="btn btn-primary" id="btn_search_car" >查询</button>
										<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
										<button type="button" class="btn btn-primary" id="car_save" >保存</button>
										<button type="button" class="btn btn-primary" id="car_save_2" >确定</button>
										<button type="button" class="btn btn-primary" id="car_save_4" >确定</button>
									</td>
								</tr>
							</table>
					    </form>
						<table id="carList"></table>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
	
	 <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
	<script src="${contextPath}/resources/js/business/tms/dvchildWaybill_list.js" type="text/javascript"></script>
</body>
	<script>
		
	</script>
</html>
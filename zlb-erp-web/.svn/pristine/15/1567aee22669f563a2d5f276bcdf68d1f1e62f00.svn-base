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
						<h2><i class="glyphicon glyphicon-user"></i>配送管理>派车单管理</h2>
						<!-- 嵌入我负责的站点界面 -->
						<%@include file="myDistributionSite.jsp"%>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">

						<form id="addOrEditeSearchForm" class="form-inline" role="form" >
							<div class="controls controls-row">
							   <div class="form-group">
							   	<span>派车单号：</span><input name="dispatchVehicleId_2" id="dispatchVehicleId_2" type="text" class="form-control input-small" />
							   </div>
							   <div class="form-group"> 
							   	<span>排线编号：</span><input name="disFlatCableId" id="disFlatCableId" type="text" class="form-control input-small" />
 							   </div> 
							   <div class="form-group">
							    <span>车牌号：</span>	
								<div class="input-group">
							      <input name="vehicleNumber_2" id="vehicleNumber_2" class="form-control input-small" type="text" >
							      <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_car_2"></span></div>
							    </div>
						        </div>
						        <div class="form-group">
							    <span>司机姓名：</span>
							    <input type="hidden" id="driver_2">	
								<div class="input-group">
							      <input name="driverName_2" id="driverName_2" class="form-control input-small" type="text" >
							      <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_driver_2"></span></div>
							    </div>
						        </div>
						        <div class="form-group">
							      		<label>状态：</label>	
								        <select class="form-control" name="dispatchStatus_2" id="dispatchStatus_2">
										    <option value="">全部</option>
									    </select>
								</div>
						        <%-- <div class="form-group">
					         		<button type="button" id="example" class="btn btn-primary btn-xs popover-toggle"   
					         		data-html="true" data-toggle="popover"  data-placement="bottom" data-html="true" data-content="
				         			<table>
										<tr>
											<td><span>运营商：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
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
											<td><span>手机号：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>驾驶证号：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
											<td><span>户籍：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>户籍地址：</span></td>
											<td colspan='3'><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>现居地址：</span></td>
											<td colspan='3'><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr style='text-align: center;background: rgb(7, 65, 123);color: white;' >
											<td colspan='4'><span class='glyphicon glyphicon-search' onclick='hid()'></span></td>
										</tr> 
								  </table>"
					         		>更多条件^</button>
					        	</div> --%>
					        	<div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
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
							 <!--  <button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增派车单</button> -->
<!-- 							  <button type="button" class="btn btn-default  btn-sm" id="btn_show_edit"><span class="glyphicon glyphicon-zoom-in" style="color: green;"></span>查看</button> -->
							  <button type="button" class="btn btn-default  btn-sm" id="btn_add_waybill"><span class="glyphicon glyphicon-log-in" style="color:green;"></span>添加运单</button>
							  
							  <button type="button" class="btn btn-default  btn-sm" id="btn_is_xiada"><span class="glyphicon glyphicon-ok-sign" style="color: green;"></span>改派</button>
							  <!-- <button type="button" class="btn btn-default  btn-sm" id="btn_no_xiada"><span class="glyphicon glyphicon-remove-sign" style="color: green;"></span>取消下达</button> -->
<!-- 							  <button type="button" class="btn btn-default  btn-sm" id="btn_edit_car"><span class="glyphicon glyphicon-wrench" style="color:green;"></span>修改车辆</button>
 -->							  
							  <button type="button" class="btn btn-default  btn-sm" id="btn_true_truck"><span class="glyphicon glyphicon-hand-right" style="color: green;"></span>装车确认</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_true_delivery"><span class="glyphicon glyphicon-hand-right" style="color: green;"></span>发运确认</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_true_success"><span class="glyphicon glyphicon-hand-right" style="color:green;"></span>完成确认</button>
							  <div class="dropdown" style="float: left;">
								  <button class="btn btn-default  btn-sm dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								    	单据打印
								    <span class="caret"></span>
								  </button>
								  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
								    <li><a href="#" id="print1"><span class="glyphicon glyphicon-download-alt" style="color: green;"></span>打印面单</a></li>
								    <li><a href="#" id="print2"><span class="glyphicon glyphicon-download-alt" style="color: green;"></span>打印派车单</a></li>
								  </ul>
							  </div>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_show_log"><span class="glyphicon glyphicon-list-alt" style="color: green;"></span>操作日志</button>
							  <button type="button" class="btn btn-default  btn-sm" id="btn_is_use"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>作废</button>
								<button style="display: none;" id="btn_show_search" class="btn btn-default  btn-sm"
										type="button">
								<span class="glyphicon glyphicon glyphicon-chevron-down"
									  style="color: green;"></span><span>显示搜索条件</span>
								</button>
							 </div>
							</div>
							 <!-- <div id="toolbar" class="btn-group">
					            <button id="btn_add" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-form">
					                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					            </button>
					            <button id="btn_edit" type="button" class="btn btn-default">
					                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
					            </button>
					            <button id="btn_delete" type="button" class="btn btn-default">
					                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					            </button>
					        </div> -->
					        <div id="divCss">
								<table id="dvManagerTable" class="table table-hover table-striped table-bordered">
									
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
	
	
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal04" tabindex="-1" role="dialog" aria-labelledby="myModalLabel04" aria-hidden="true">
			<div class="modal-dialog modal-dialog-width-900">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel04">
							改派
						</h4>
					</div>
					<div class="modal-body">
						<form action="" class="form-inline" role="form" id="xiadaForm">
							<table style="width: 100%;height: 400px;" class="table-custom">
								<tr>
									<td class="text-right">
										<input type="hidden" id="dispatchVehicleId_xd">
										<input type="hidden" id="driver_xd">
										<label><span class="text-required">*</span>司机姓名：</label>
									</td>
									<td >
										<div class="form-group input-group">
									      <input type="text" name="driverName_xd" id="driverName_xd" class="form-control" readonly="readonly" />
									      <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_driver_xd"></span></div>
									    </div>
									</td>
									<td class="text-right">
										<label><span class="text-required">*</span>司机手机号码：</label>
									</td>
									<td>
									<div class="form-group input-group">
									    <input type="text" name="driverPhone_xd" class="form-control" readonly="readonly" id="driverPhone_xd">
									</div>
									</td>
								
								</tr>
								<tr>
									<td class="text-right">
										<input type="hidden" id="vehicleId_xd">
										<label><span class="text-required">*</span>车牌号：</label>
									</td>
									<td >
										<div class="form-group input-group">
										<input type="text" name="vehicleNumber_xd" id="vehicleNumber_xd" class="form-control" readonly="readonly"/>
										<div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_car_xd"></span></div>
									    </div>
									</td>
									<td class="text-right">
										<label>车辆类型：</label>
									</td>
									<td ><div class="form-group">
										<input type="text" name="carType_xd" id="carType_xd" class="form-control" readonly="readonly" style="width:235px;"/>
										</div>
							        	<!-- <select class="form-control"  name="carType_xd" id="carType_xd" disabled="disabled"> 
										  <option></option>
										  <option value="10">10：面包车</option>
										  <option value="20">20：电动车</option>
										  <option value="30">30：自行车</option>
										  <option value="40">40：卡车</option>
										</select> -->
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<label>干线\区域：</label>
									</td>
									<td >
										<input type="text" name="region_xd"  id="region_xd" class="form-control" style="width: 235px;" readonly="readonly"/>
										<!-- <select class="form-control" name="region_xd"  id="region_xd" disabled="disabled">
											 <option></option>
					                         <option value='10'>10：干线车</option>
					                         <option value='20'>20：区域车</option>
					                     </select> -->
									</td>
									<td class="text-right">
										<label>自营\外包：</label>
									</td>
									<td >
									    <div class="form-group">
										<input type="text" name="selfSupport_xd" id="selfSupport_xd" class="form-control" style="width: 235px;" readonly="readonly"/>
										</div>
							        	<!-- <select class="form-control" name="selfSupport_xd" id="selfSupport_xd" disabled="disabled">
										  <option></option>
										  <option value='10'>10：自营</option>
		                         		  <option value='20'>20：外包</option>
										</select> -->
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<span>长（m）：</span>	
									</td>
									<td >
							        	<input type="text" name="length_xd" class="form-control" id="length_xd" style="width: 235px;" readonly="readonly">
									</td>
									<td class="text-right">
										<span>宽（m）：</span>	
									</td>
									<td >
							        	<input type="text" name="width_xd" class="form-control" id="width_xd" style="width: 235px;" readonly="readonly">
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<span>高（m）：</span>	
									</td>
									<td >
							        	<input type="text" name="high_xd" class="form-control" id="high_xd" style="width: 235px;" readonly="readonly">
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<span></span>
									</td>
									<td colspan="2">
										<input type="checkbox" name="isTransportLiquid_xd" id="isTransportLiquid_xd" value="1" disabled="disabled"><span>可配送液体</span>
										<input type="checkbox" name="isTransportFreezing_xd" id="isTransportFreezing_xd" value="1" disabled="disabled"><span>可配送冻品</span>
										<input type="checkbox" name="isTransportStorage_xd" id="isTransportStorage_xd" value="1" disabled="disabled"><span>可配送冷藏</span>
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<span>车辆描述：</span>	
									</td>
									<td colspan="3" >
										<input type="text" name="carDescribes_xd" class="form-control" id="carDescribes_xd" style="width: 100%" readonly="readonly">
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<span>描述：</span>	
									</td>
									<td colspan="3">
										<input type="text" name="describes_xd" class="form-control" id="describes_xd" style="width: 100%">
									</td>
								</tr>
								<tr>
									<td colspan="4" style="text-align: right;">
										<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
										<button type="button" class="btn btn-primary" id="xiada_save" >改派</button>
									</td>
								</tr>
							</table>
					    </form>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>	
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel01" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel01">
						</h4>
					</div>
					<div class="modal-body">
						<form id="waybill" class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-md-3"><span class="text-required">*</span>运单号：</label>
								<div class="col-md-8">
									<input type="hidden" id="dv_id">
									<input type="text" id="waybillId" id="waybillId"  class="form-control">
								</div>
							</div>
							<div class="form-group text-right">
								<label class="control-label col-md-3"></label>
								<div  class="col-md-8">
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
									<button id="btn_waybillId" type="button" class="btn btn-primary">确认添加</button>
								</div>
							</div>
						</form>
						<form id="truck" class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-md-3"><span class="text-required">*</span>装车人：</label>
								<div class="col-md-8">
								<!-- <input type="text"  class="form-control" title="默认当前登录帐号的员工"> -->
									<div class="input-group">
										<input type="hidden" id="truckPeopId">
									  <input type="text" name="truckPeop" id="truckPeop" class="form-control" readonly>
										<span class="input-group-addon">
											<span class="glyphicon glyphicon-search" id="search_truckPeop"></span></span>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-md-3"><span class="text-required">*</span>装车完成时间：</label>
								<div class="col-md-8">
									<div class="input-group date form_datetime"   data-date-format="yyyy-mm-dd hh:ii:ss" data-link-field="dtp_input1">
											<input name="truckLoadingTime01" id="truckLoadingTime01" class="form-control" size="16" type="text" value="" readonly>

											<span class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-th"></span></span>
											<span class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-remove"></span></span>

									 </div>
									 <div><span style="color: red;" id="truckTS"></span></div>
								</div>
							</div>

							<div class="form-group text-right">
								<label class="control-label col-md-3"></label>
								<div  class="col-md-8">
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
									<button type="button" class="btn btn-primary" id="btn_truck">保存</button>
								</div>
							</div>
						</form>
						<form id="delivery" class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-md-3"><span class="text-required">*</span>发运人：</label>
								<div class="col-md-8">
								<!-- <input type="text"  class="form-control" title="默认当前登录帐号的员工"> -->
										<div class="input-group">
										  <input type="hidden" id="deliveryPeopId">
										  <input type="text" name="deliveryPeop" id="deliveryPeop" class="form-control" readonly>
											<span class="input-group-addon" ><span class="glyphicon glyphicon-search" id="search_deliveryPeop"></span></span>
										</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-md-3"><span class="text-required">*</span>发运时间：</label>
								<div class="col-md-8">
									<div class="input-group date form_datetime"  data-date-format="yyyy-mm-dd hh:ii:ss" data-link-field="dtp_input1">
						                    <input name="practicalDepartTime01" id="practicalDepartTime01" class="form-control" size="16" type="text" value="" readonly>
						                    <span class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-th"></span></span>
											<span class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-remove"></span></span>
				                     </div>
				                     <div><span style="color: red;" id="deliveryTS"></span></div>
								</div>
							</div>
							<div class="form-group text-right">
								<label class="control-label col-md-3"></label>
								<div  class="col-md-8">
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
									<button type="button" class="btn btn-primary" id="btn_delivery">保存</button>
								</div>
							</div>
						</form>
						<form id="success" class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-md-3" ><span class="text-required">*</span>配送人：</label>
								<div class="col-md-8">
								<!-- <input type="text"  class="form-control" title="默认当前登录帐号的员工"> -->
									<div class="input-group">
										<input type="hidden" id="successPeopId">
									    <input type="text" name="successPeop" id="successPeop" class="form-control" readonly>
										<span class="input-group-addon" ><span class="glyphicon glyphicon-search" id="search_successPeop"></span></span>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-md-3"><span class="text-required">*</span>完成时间：</label>
								<div class="col-md-8">
									<div class="input-group date form_datetime col-md-12"  data-date-format="yyyy-mm-dd hh:ii:ss" data-link-field="dtp_input1">
						                    <input name="finishTime01" id="finishTime01" class="form-control" size="16" type="text" value="" readonly>
											<span class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-th"></span></span>
											<span class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-remove"></span></span>
				                     </div>
				                     <div><span style="color: red;" id="successTS"></span></div>
								</div>
							</div>
							<div class="form-group text-right">
								<label class="control-label col-md-3"></label>
								<div  class="col-md-8">
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
									<button type="button" class="btn btn-primary" id="btn_success" >保存</button>
								</div>
							</div>
						</form>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	<!-- 模态框（Modal） -->

	<!-- 点击详情时的弹出框开始 运单列表 -->
	<div class="modal fade" id="mywaybill" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		style="overflow: auto;">
		<div class="modal-dialog" style="width: 1400px; margin: 50px auto;">
			<div class="modal-content">
				<div class="modal-header" style="border-bottom: 0px;">
					<!-- 主题部分开始 -->
				<div class="box-content row">
					<div>

						<div class="alert alert-info">
							<form role="form" class="form-inline" id="mainForm" action="#"
								onSubmit="return false;" method="get">

								
								<div class="form-group ">
									<span>运单号:</span>
								</div>
								<div class="form-group ">
									<span><input id="queryChildWaybillId" type="text" class="form-control"
														 name="">  </span>
								</div>
								
								<div class="form-group ">
									<span>订单号:</span>
								</div>
								<div class="form-group ">
									<span> <input id="queryOrderId" type="text" class="form-control"
														 name=""> </span>
								</div>
								

								<!--时间控件begin-->
								<div class="form-group">
									<span>下单时间：</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control" value=""
											id="queryPaymentTimeStart" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
									<span>到</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control" value=""
											id="queryPaymentTimeEnd" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
<!-- 									<button id="btn_date_7days" -->
<!-- 										class="btn btn-inverse btn-default btn-sm" type="button">近7天</button> -->
<!-- 									<button id="btn_date_30days" -->
<!-- 										class="btn btn-inverse btn-default btn-sm" type="button">近30天</button> -->
								</div>
								<!--时间控件end-->
								<button id="queryAffirm"
									class="btn btn-success btn-flat">搜索</button>
								<button id="queryQingkong"
									class="btn btn-primary btn-flat">清空</button>
								
								
							</form>
						</div>
					</div>
				</div>
				
				<!-- 分页框开始 -->
				<div class="box-content" style="width: 98%; margin: 0 auto;">
					<ul class="nav nav-tabs" id="myTab">
						<li><a href="#custom" style="visibility: hidden;"></a></li>
					</ul>
				</div>
				
				<div id="myTabContent" class="tab-content">
					
					<div class="tab-pane" id="custom">
						<!-- 切换后运单列表开始 -->

						<!-- 切换后运单列表结束 -->
						<!-- 运单开始列表开始 -->
						<div>
							<table class="table table-striped table-bordered"
								id="mainWayBillList" >

							</table>
						</div>
						<div role="grid"
								class="box-body table-responsive controls controls-row">
								<div class="modal-footer">
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									
									<button type="button" class="btn btn-default" data-dismiss="modal" id='qvButton' >取消</button>
									<button type="button" class="btn btn-primary" id='queButton' >确认</button>
								</div>


							</div>
						<!-- 运单开始列表结束 -->
					</div>
				</div>

				<!-- 分页框结束 -->
			</div>
			<!-- 主题部分结束 -->
				</div>
			</div>
		</div>
	</div>
	<!-- 点击详情时的弹出框结束  运单列表 -->
		
		
	 <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
		<%@include file="../tms/dialog/logDialog.jsp"%>
		<%@include file="../tms/dialog/driverDialog.jsp"%>
		<%@include file="../tms/dialog/vehicleDialog.jsp"%>
		<script
		src="${contextPath}/resources/js/business/tms/util/util.js"
		type="text/javascript"></script>
	<script src="${contextPath}/resources/js/business/tms/dispatchVehicle2.js" type="text/javascript"></script>
	  <script
		src="${contextPath}/resources/js/business/tms/dialog/logDialog.js"
		type="text/javascript"></script>
			<script
		src="${contextPath}/resources/js/business/tms/dialog/driverDialog.js"
		type="text/javascript"></script>
		
			<script
		src="${contextPath}/resources/js/business/tms/dialog/vehicleDialog.js"
		type="text/javascript"></script>
</body>
	<script>
		$(function () { 
			$("[data-toggle='popover']").popover();
		});
	</script>
</html>
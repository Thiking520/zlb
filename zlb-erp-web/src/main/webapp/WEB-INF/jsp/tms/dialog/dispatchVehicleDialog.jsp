<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
	<form id="carForm" role="form">
		<div class="modal fade" id="dispatchVehicleDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel01" aria-hidden="true">
			<div class="modal-dialog" style="width: 660px; margin: 50px auto;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel01">
							派车信息
						</h4>
					</div>
					<div class="modal-body">
						<table class="table-custom table responsive">
							<tbody>
							<tr><th>线路信息</th></tr>
							<tr>
								<td class="text-right">线路编号：</td>
								<td colspan="3">
								<input type="hidden" name="flatCableId_car" id="flatCableId_car" />
								<input type="text" name="dis_flatCableId_car" id="dis_flatCableId_car" class="form-control input-small"  readonly="readonly" /></td>
							</tr>
							<tr>
								<td class="text-right">线路描述：</td>
								<td  colspan="3"><input type="text" name="cableDescribe_car" id="cableDescribe_car" class="form-control input-small"  readonly="readonly"/></td>
							</tr>
							<tr><th>订单信息</th></tr>
							<tr>
								<td class="text-right">运单总数：</td>
								<td colspan="3" class="text-left"><span  name="waybillAmount_car" id="waybillAmount_car"></span></td>
							</tr>
							<tr>
								<td class="text-right">运单详情：</td>
								<td colspan="3" class="text-left"><span name="orderDetails_car" id="orderDetails_car"/></td>
							</tr>
							<tr><th>派车信息</th></tr>
							<tr class="text-right">
								<td style="width: 100px">
									<input type="hidden" id="dispatchVehicleId_xd">
									<input type="hidden" id="driver_xd">
									<span class="text-required">*</span>司机姓名：
								</td>
								<td >
									<div class="input-group" style="width: 139px;">
									  <input type="text" name="driverName_xd" id="driverName_xd" class="form-control input-small" style="width: 139px;" readonly="readonly"/>
									  <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_driver_xd"></span></div>
									</div>
								</td>
								<td class="text-right">
									<span class="text-required">*</span>司机手机号码：
								</td>
								<td>
									<input type="text" name="driverPhone_xd" id="driverPhone_xd" readonly="readonly" class="form-control input-small" style="width: 179px;"/>
								</td>
							</tr>
							<tr>
								<td class="text-right">
									<input type="hidden" id="vehicleId_xd">
									<span class="text-required">*</span>车牌号：
								</td>
								<td >
									<div class="input-group" style="width: 139px;">
									<input type="text" name="vehicleNumber_xd" id="vehicleNumber_xd" class="form-control input-small" style="width: 139px;" readonly="readonly"/>
									<div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_car_xd"></span></div>
									</div>
								</td>
								<td class="text-right">
									<span>车辆类型：</span>
								</td>
								<td >
									<select class="form-control"  name="carType_xd" id="carType_xd" disabled="disabled">
									  <option></option>
									  <option value="10">面包车</option>
									  <option value="20">电动车</option>
									  <option value="30">自行车</option>
									  <option value="40">卡车</option>
									</select>
								</td>
							</tr>
								<tr>
									<td class="text-right">
										<span>干线\区域：</span>
									</td>
									<td >
										<select class="form-control" name="region_xd"  id="region_xd" style="width: 139px;" disabled="disabled">
					                          <option></option>
					                         <option value='10'>干线车</option>
					                         <option value='20'>区域车</option>
					                     </select>
									</td>
									<td class="text-right">
										<span>自营\外包：</span>	
									</td>
									<td >
							        	<select class="form-control" name="selfSupport_xd" id="selfSupport_xd" disabled="disabled">
										   <option></option>
										  <option value='10'>自营</option>
		                         		  <option value='20'>外包</option>
										</select>
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<span>长（cm）：</span>	
									</td>
									<td >
							        	<input type="text" name="length_xd" class="form-control" id="length_xd" style="width: 109px;" readonly="readonly">
									</td>
									<td class="text-right">
										<span>宽（cm）：</span>	
									</td>
									<td >
							        	<input type="text" name="width_xd" class="form-control" id="width_xd" style="width: 109px;" readonly="readonly">
									</td>
								</tr>
								<tr>
									<td class="text-right">
										<span>高（cm）：</span>	
									</td>
									<td >
							        	<input type="text" name="high_xd" class="form-control" id="high_xd" style="width: 109px;" readonly="readonly">
									</td>
								</tr>
                                 <tr>
                                     <td></td>
                                    <td colspan="2">
                                        <input type="checkbox" name="isTransportLiquid_xd" id="isTransportLiquid_xd" value="1" disabled="disabled"><span>可配送液体</span>
                                        <input type="checkbox" name="isTransportFreezing_xd" id="isTransportFreezing_xd" value="1" disabled="disabled"><span>可配送冻品</span>
                                        <input type="checkbox" name="isTransportStorage_xd" id="isTransportStorage_xd" value="1" disabled="disabled"><span>可配送冷藏</span>
                                    </td>
                                </tr>
								<tr>
									<td>
										<span>车辆描述：</span>	
									</td>
									<td colspan="3" >
										<input type="text" name="carDescribes_xd" class="form-control" id="carDescribes_xd" style="width: 100%" readonly="readonly">
									</td>
								</tr>
								<tr>
									<td>
										<span>派车描述：</span>
									</td>
									<td colspan="3">
										<input type="text" name="describes_xd" class="form-control" id="describes_xd" style="width: 100%">
									</td>
								</tr>
								<tr>
									<td colspan="4" style="text-align: right;">
										<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
										<button type="button" class="btn btn-primary" id="xiada_save" >保存</button>
									</td>
								</tr>
							</tbody>
							</table>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	</form>
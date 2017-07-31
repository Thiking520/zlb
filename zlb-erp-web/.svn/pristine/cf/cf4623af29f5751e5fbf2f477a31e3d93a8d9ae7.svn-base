<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<div class="modal fade" id="vehicleDialog" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel03" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel03">选择车牌号</h4>
				</div>
				<div class="modal-body">
					<form id ="form_dialog_vehicle" action="" class="form-inline" role="form">
						<table style="width: 100%; height: 125px;">
							<tr>
								<td><span>车牌号：</span></td>
								<td><input type="text" name="input_dialog_car_number" id="input_dialog_car_number"
									class="form-control input-small" style="width: 109px;" /></td>
								<td><span>车辆类型：</span></td>
								<td><select class="form-control" name="input_dialog_car_type"
									id="input_dialog_car_type">
										<option value="">全部</option>
										<option value="10">面包车</option>
										<option value="20">电动车</option>
										<option value="30">自行车</option>
										<option value="40">卡车</option>
								</select>
								<button style="left: 60px;" type="button" class="btn btn-success btn-flat" id="btn_dialog_search_car">搜索</button>
								<button id="btn_dialog_clean_vehicle" class="btn btn-primary btn-flat" type="button">清空</button>
								</td>
							</tr>
							<tr>
								<td><span>自营\外包：</span></td>
								<td><select class="form-control" name="select_dialog_self_support"
									id="select_dialog_self_support">
										<option value="">全部</option>
										<option value='10'>自营</option>
										<option value='20'>外包</option>
								</select></td>
								<td colspan="2"><input type="checkbox"
									name="input_dialog_is_transportLiquid" id="input_dialog_is_transportLiquid" value="1"><span>可配送液体</span>
									<input type="checkbox" name="input_is_transport_freezing"id="input_is_transport_freezing" value="1"><span>可配送冻品</span> 
									<input type="checkbox" name="input_is_transportStorage"id="input_is_transportStorage" value="1"><span>可配送冷藏</span></td>
							</tr>
							<tr>
								<td colspan="4" style="text-align: right;">
								
								</td>
							</tr>
						</table>
					</form>
					<table id="carTable"></table>
					<div style="margin-left: 430px;;margin-top: 20px;">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" id="btn_dialog_car_save">确认</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
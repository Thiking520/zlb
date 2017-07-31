
/**
 * 派车弹出框
 * by Tobin
 */
function DispatchVehicleDialog() {
	this.init();
}

DispatchVehicleDialog.prototype.driverDialog = {};
DispatchVehicleDialog.prototype.vehicleDialog = {};

DispatchVehicleDialog.prototype.init = function() {

	driverDialog = new DriverDialog();
	vehicleDialog = new VehicleDialog();
	this.registerListener();
}
DispatchVehicleDialog.prototype.dispatchUrl = '/tms/dispatchVehicle/addDVAndUpdateFC';
DispatchVehicleDialog.prototype.registerListener = function() {

	$("#xiada_save").on("click", function() {
				this.dispatch();
			}.bind(this));

	$("#search_driver_xd").on("click", function() {
				driverDialog.show();
			});

	$("#search_car_xd").on("click", function() {
				vehicleDialog.show();
			});
}

DispatchVehicleDialog.prototype.dispatch = function() {

	
	if ($('#driverName_xd').val() == "") {
		$.toastrWarning("请选择司机");
		return;
	}
	if ($('#vehicleNumber_xd').val() == "") {
		$.toastrWarning("请选择车辆");
		return;
	}
	if ($('#driverPhone_xd').val() == "") {
		$.toastrWarning("请填写司机手机号码");
		return;
	}
	var params = {
		'dispatchVehicleId' : $("#dispatchVehicleId_xd").val(),
		'vehicleId' : $('#vehicleId_xd').val(),
		'vehicleNumber' : $('#vehicleNumber_xd').val(),
		'driver' : $("#driver_xd").val(),
		'driverName' : $('#driverName_xd').val(),
		'driverPhone' : $('#driverPhone_xd').val(),
		'describes' : $('#describes_xd').val(),
		'flatCableId' : $('#flatCableId_car').val()
	}

	$.callAjax({
				type : "post",
				url : this.dispatchUrl,
				data : params,
				success : function(data) {
					if (data.code != "0000") {
						$.toastrWarning(data.msg);
						return;
					}
					$.hideModal('#dispatchVehicleDialog');
					$('#fcManagerTable').bootstrapTable('refresh');
					$('#flatCableList').bootstrapTable('refresh');

				},
				error : function() {
					$.toastrError();
				}
			});

}
DispatchVehicleDialog.prototype.show = function(row) {
	document.getElementById("carForm").reset();
	$('#flatCableId_car').val(row.flatCableId);
	$('#dis_flatCableId_car').val(row.disFlatCableId);
	$('#cableDescribe_car').val(row.cableDescribe);
	$('#waybillAmount_car').text(row.waybillAmount);
	$('#orderDetails_car').text(row.orderDetails);
	$.showModal('#dispatchVehicleDialog');;
}
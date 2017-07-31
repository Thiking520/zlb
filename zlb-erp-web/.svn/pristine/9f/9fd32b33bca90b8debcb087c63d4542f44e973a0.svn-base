
/**
 * 车辆选择弹框 by Tobin
 * 
 * @param {}
 *            obj
 */
function VehicleDialog(obj) {

	$.extend(this, obj);
	this.init();
}
var carTypeArr = [];
var regionArr = [];
var selfSupportArr = [];

VehicleDialog.prototype.init = function() {
	this.initTable();
	this.bindHideListener();
	this.carInitDropDownBox();
}

VehicleDialog.prototype.carListUrl = '/publicData/cars/list';
VehicleDialog.prototype.carsDetaisUrl = '/publicData/cars/queryCarsDetails';
VehicleDialog.carInitDropDownBox = "/publicData/cars/initDropDownBox";

VehicleDialog.prototype.bindHideListener = function() {
	$('#vehicleDialog').on('hide.bs.modal', function() {
				this.unbindListener();
			}.bind(this));
}


VehicleDialog.prototype.carInitDropDownBox = function() {
	$.callAjax({
		type : "post",
		url : VehicleDialog.carInitDropDownBox,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			for (var i = 0; i < data.data.carTypeList.length; i++) {
				carTypeArr[data.data.carTypeList[i].dictValue] = data.data.carTypeList[i].dictDesc;
				$('#carType').append("<option value='"
						+ data.data.carTypeList[i].dictValue + "'>"
						+ data.data.carTypeList[i].dictDesc + "</option>");
			}
			for (var i = 0; i < data.data.regionList.length; i++) {
				regionArr[data.data.regionList[i].dictValue] = data.data.regionList[i].dictDesc;
			}
			for (var i = 0; i < data.data.selfSupportList.length; i++) {
				selfSupportArr[data.data.selfSupportList[i].dictValue] = data.data.selfSupportList[i].dictDesc;
			}
		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});

}

VehicleDialog.prototype.bindListener = function() {
	$("#btn_dialog_car_save").on("click", function() {
				var arr = $("#carTable").bootstrapTable('getSelections');
				if (arr.length == 1) {
					if(arr[0].isTransportLiquid == 1){
						$("#isTransportLiquid_xd_1").attr("checked",true);
					}
					if(arr[0].isTransportFreezing == 1) {
						$("#isTransportFreezing_xd_1").attr("checked",true);
					}
					if(arr[0].isTransportStorage == 1) {
						$("#isTransportStorage_xd_1").attr("checked",true);
					}
					
					
					//给列表赋值（车辆信息）
					this.corresponding(arr);
					
					this.confirmCallback(arr[0]);
					$.hideModal('#vehicleDialog');
				} else {
					$.toastrWarning("请选择一条数据进行操作！");
				}
			}.bind(this));

	$("#btn_dialog_search_car").on("click", function() {
				$('#carTable').bootstrapTable('refresh');
			});

	$("#btn_dialog_clean_vehicle").on("click", function() {
				document.getElementById("form_dialog_vehicle").reset();
			});
}
VehicleDialog.prototype.unbindListener = function() {
	$("#btn_dialog_car_save").unbind();
	$("#btn_dialog_search_car").unbind();
	$("#btn_dialog_clean_vehicle").unbind();
}

//给一个列表把选中的车辆信息展示在对应的name
VehicleDialog.prototype.corresponding = function(arr) {
	$("#length_xd_1").val(arr[0].length);
	$("#width_xd_1").val(arr[0].width);
	$("#high_xd_1").val(arr[0].high);
	
	$("#carType_xd_1").val(arr[0].carType);
	$("#region_xd_1").val(arr[0].region);
	$("#selfSupport_xd_1").val(arr[0].selfSupport);
	
	$("#carType_xd").val(arr[0].carType);
	$("#region_xd").val(arr[0].region);
	$("#selfSupport_xd").val(arr[0].selfSupport);
}


VehicleDialog.prototype.initTable = function() {

	$.pageTable({
				selectItemName:'myVehicleDialog',
				tableId : "#carTable",
				url : this.carListUrl,
				queryParams : this.queryParamsCar,
				onLoadSuccess : function() {
					$("#btn_dialog_search_car").removeClass("disabled");
				},
				columns : [{
							radio : true
						}, {
							field : 'carId',
							title : '编码'
						}, {
							field : 'carNumber',
							title : '车牌号'
						}, 
						{
							field : 'isTransportLiquid',
							title : '可配送液体',
							align : 'center',
							formatter : this.booleanFormatter
						}, {
							field : 'isTransportFreezing',
							title : '可配送冻品',
							align : 'center',
							formatter : this.booleanFormatter
						}, {
							field : 'isTransportStorage',
							title : '可配送冷藏',
							align : 'center',
							formatter : this.booleanFormatter
						}]
			});
}
VehicleDialog.prototype.booleanFormatter = function(value, row, index) {
	if (value == '1') {
		return "是";
	} else {
		return "否";
	}
}
VehicleDialog.prototype.carsDetais = function(id) {
	var params = {
		'id' : id
	};
	$.callAjax({
				type : "post",
				url : '/publicData/cars/queryCarsDetails',
				data : params,
				success : this.ajaxSuccess,
				error : function() {
					$.toastrError();
				}
			});
};

VehicleDialog.prototype.confirmCallback = function(row) {
	$('#vehicleId_xd').val(row.id);
	$('#vehicleNumber_xd').val(row.carNumber);
	this.carsDetais(row.id);
};

VehicleDialog.prototype.ajaxSuccess = function(data) {
	if (data.code != "0000") {
		$.toastrWarning(data.msg);
		return;
	}
	if (data.data == null) {
		$.toastrSuccess('查询结果为空！');
	}
	JSON.stringify(this.carTypeArr);
	$("#carType_xd").val(data.data.carType);
	$("#region_xd").val(data.data.region);
	$("#selfSupport_xd").val(data.data.selfSupport);

	$("#length_xd").val(data.data.length);
	$("#width_xd").val(data.data.width);
	$("#high_xd").val(data.data.high);
	
	var checkElements = document.getElementsByName('isTransportLiquid_xd');
	for (var i = 0; i < checkElements.length; i++) {
		var checkElement = checkElements[i];
		if (data.data.isTransportLiquid == 1) {
			checkElement.checked = "checked";
		} else {
			checkElement.checked = "";
		}
	}

	var checkElements = document.getElementsByName('isTransportFreezing_xd');
	for (var i = 0; i < checkElements.length; i++) {
		var checkElement = checkElements[i];
		if (data.data.isTransportFreezing == 1) {
			checkElement.checked = "checked";
		} else {
			checkElement.checked = "";
		}
	}

	var checkElements = document.getElementsByName('isTransportStorage_xd');
	for (var i = 0; i < checkElements.length; i++) {
		var checkElement = checkElements[i];
		if (data.data.isTransportStorage == 1) {
			checkElement.checked = "checked";
		} else {
			checkElement.checked = "";
		}
	}

	$("#carDescribes_xd").val(data.data.describes);
};
VehicleDialog.prototype.queryParamsCar = function(params) {
	carNumber = $('#input_dialog_car_number').val();
	carType = $('#input_dialog_car_type').val();
	selfSupport = $('#select_dialog_self_support').val();
	isTransportLiquid = document
			.getElementById('input_dialog_is_transportLiquid').checked ? 1 : 0;
	isTransportFreezing = document
			.getElementById('input_is_transport_freezing').checked ? 1 : 0;
	isTransportStorage = document.getElementById('input_is_transportStorage').checked
			? 1
			: 0;
	var temp = {
		pageSize : params.limit,
		offset : params.offset == 1 ? 0 : params.offset,
		sort : params.sort,
		order : params.order,
		carNumber : carNumber,
		carType : carType,
		enabled : '1',
		selfSupport : selfSupport,
		isTransportLiquid : isTransportLiquid,
		isTransportFreezing : isTransportFreezing,
		isTransportStorage : isTransportStorage
	};
	return temp;
};
VehicleDialog.prototype.show = function() {
    $("#carTable").bootstrapTable("refresh");
	$.showModal('#vehicleDialog');
	this.bindListener();

}

//车辆选择弹框隐藏时，清空搜索条件
$('#vehicleDialog').on('hidden.bs.modal', function () {

    $('#input_dialog_car_number').val("");
    $('#input_dialog_car_type').val("");
    $('#select_dialog_self_support').val("");
    $('#input_dialog_is_transportLiquid').val("0");
    $('#input_dialog_is_transportLiquid').attr("checked",false);
    $('#input_is_transport_freezing').val("0");
    $('#input_is_transport_freezing').attr("checked",false);
    $('#input_is_transportStorage').val("0");
    $('#input_is_transportStorage').attr("checked",false);
})


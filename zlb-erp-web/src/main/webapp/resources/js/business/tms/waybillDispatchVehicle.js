
/**
 * 重构 于2017/05/18 派车单管理 by Tobin
 */
function DispatchVehicle() {
	this.isResetOffset = 0;
	this.dispatchStatusArr = [];
	this.carTypeArr = [];
	this.regionArr = [];
	this.selfSupportArr = [];

	// 操作日志弹框
	this.logDialog = new LogDialog();
	// 配送人选择框
	this.deliveryManDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#successPeopId').val(row.id);
					$('#successPeop').val(row.cnName).change();
				}
			});

	// 发运人选择框
	this.dispatcherDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#deliveryPeopId').val(row.id);
					$('#deliveryPeop').val(row.cnName).change();
				}
			});
	// 装车人选择框
	this.truckerDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#truckPeopId').val(row.id);
					$('#truckPeop').val(row.cnName).change();
				}
			});

	// 主界面 司机 选择框
	this.searchDriverDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#driver_2').val(row.id);
					$('#driverName_2').val(row.cnName);
				}
			});

	// 改派界面 车辆选择框
	this.searchVehicleDialog = new VehicleDialog({
				confirmCallback : function(row) {
					$('#vehicleNumber_2').val(row.carNumber);
				}
			});
	// 改派界面 司机选择框
	this.driverDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#driver_xd').val(row.id);
					$('#driverName_xd').val(row.cnName);
					$('#driverPhone_xd').val(row.mobileNo);
				}
			});
	// 改派界面 车辆选择框
	this.vehicleDialog = new VehicleDialog({
				confirmCallback : function(row) {
					$('#vehicleId_xd').val(row.id);
					$('#vehicleNumber_xd').val(row.carNumber);
					this.carsDetais(row.id);
				},
				success : function(data) {
					if (data.code != "0000") {
						$.toastrWarning(data.msg);
						return;
					}
					if (data.data == null) {
						$.toastrSuccess('查询结果为空！');
					}
					$("#carType_xd").val(this.carTypeArr[data.data.carType]);
					$("#region_xd").val(this.regionArr[data.data.region]);
					$("#selfSupport_xd")
							.val(this.selfSupportArr[data.data.selfSupport]);
					$("#length_xd").val(data.data.length);
					$("#width_xd").val(data.data.width);
					$("#high_xd").val(data.data.high);
					var checkElements = document
							.getElementsByName('isTransportLiquid_xd');
					for (var i = 0; i < checkElements.length; i++) {
						var checkElement = checkElements[i];
						if (data.data.isTransportLiquid == 1) {
							checkElement.checked = "checked";
						} else {
							checkElement.checked = "";
						}
					}

					var checkElements = document
							.getElementsByName('isTransportFreezing_xd');
					for (var i = 0; i < checkElements.length; i++) {
						var checkElement = checkElements[i];
						if (data.data.isTransportFreezing == 1) {
							checkElement.checked = "checked";
						} else {
							checkElement.checked = "";
						}
					}

					var checkElements = document
							.getElementsByName('isTransportStorage_xd');
					for (var i = 0; i < checkElements.length; i++) {
						var checkElement = checkElements[i];
						if (data.data.isTransportStorage == 1) {
							checkElement.checked = "checked";
						} else {
							checkElement.checked = "";
						}
					}

					$("#carDescribes_xd").val(data.data.describes);
				}.bind(this)
			});
}

// 条件查询（派车单）
DispatchVehicle.searchListByPageUrl = "/tms/dispatchVehicle/list";

// 派车
DispatchVehicle.addUrl = "/tms/dispatchVehicle/addDispatchVehicle";

// 派车单详细
DispatchVehicle.detailsUrl = "/tms/dispatchVehicle/queryDispatchVehicleDetails";
// 更新全部
DispatchVehicle.updateUrl = "/tms/dispatchVehicle/updateDispatchVehicle";
// 改派
DispatchVehicle.updateUrlByXiada = "/tms/dispatchVehicle/updateDispatchVehicleByXiada";
// 更新派车单状态
DispatchVehicle.updateStatusUrl = "/tms/dispatchVehicle/updateDispatchVehicleStatus";
// 发运确认
DispatchVehicle.updatePDTUrl = "/tms/dispatchVehicle/updateDispatchVehiclePDT";
// 装车确认
DispatchVehicle.updateTLTUrl = "/tms/dispatchVehicle/updateDispatchVehicleTLT";
// 完成确认
DispatchVehicle.updateFTUrl = "/tms/dispatchVehicle/updateDispatchVehicleFT";
// 查看车辆详情的请求地址
DispatchVehicle.getCarsDetaisUrl = "/publicData/cars/queryCarsDetails";

DispatchVehicle.carInitDropDownBox = "/publicData/cars/initDropDownBox";
DispatchVehicle.initDropDownBox = "/tms/dispatchVehicle/initDropDownBox";

DispatchVehicle.addCWB = "/tms/dispatchVehicleList/addDispatchVehicleList";
// 批量打印面单请求url
DispatchVehicle.waybillBatchPrintUrl = "/tms/dispatchVehicle/print/waybill";
// 批量打印派车单请求url
DispatchVehicle.dispatchVehicleBatchPrintUrl = "/tms/dispatchVehicle/print/dispatchVehicle";

DispatchVehicle.prototype.initDropDownBox = function() {
	$.callAjax({
		type : "post",
		url : DispatchVehicle.initDropDownBox,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			for (var i = 0; i < data.data.dispatchStatusList.length; i++) {
				this.dispatchStatusArr[data.data.dispatchStatusList[i].dictValue] = data.data.dispatchStatusList[i].dictDesc;
				$('#dispatchStatus_2').append("<option value='"
						+ data.data.dispatchStatusList[i].dictValue + "'>"
						+ data.data.dispatchStatusList[i].dictDesc
						+ "</option>");
			}
		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});

}
DispatchVehicle.prototype.carInitDropDownBox = function() {
	$.callAjax({
		type : "post",
		url : DispatchVehicle.carInitDropDownBox,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}

			for (var i = 0; i < data.data.carTypeList.length; i++) {
				this.carTypeArr[data.data.carTypeList[i].dictValue] = data.data.carTypeList[i].dictDesc;
				$('#carType').append("<option value='"
						+ data.data.carTypeList[i].dictValue + "'>"
						+ data.data.carTypeList[i].dictDesc + "</option>");
			}
			for (var i = 0; i < data.data.regionList.length; i++) {
				this.regionArr[data.data.regionList[i].dictValue] = data.data.regionList[i].dictDesc;
			}
			for (var i = 0; i < data.data.selfSupportList.length; i++) {
				this.selfSupportArr[data.data.selfSupportList[i].dictValue] = data.data.selfSupportList[i].dictDesc;
			}
		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});

}

DispatchVehicle.prototype.searchListByPage = function() {
	$.pageTable({
		selectItemName:'mypaiche',
		tableId : "#dvManagerTable",
		url : DispatchVehicle.searchListByPageUrl,
		queryParams : this.queryParams,
		toolbar : '#toolbar',
		toolbarAlign : 'right',
		onLoadSuccess : function(data) {
			this.isResetOffset = 0;
			$("#btn_search").removeClass("disabled");
			$.resizeTable("dvManagerTable");
		}.bind(this),
		columns : [{
					radio : true
				}, {
					field : 'disDispatchVehicleId',
					title : '派车单号',
					formatter : function(value, row, index) {
						return  row.disDispatchVehicleId ;
					},
					events : 'operateEvents'
				}, {
					align : 'center',
					field : 'operatorName',
					title : '运营商'
				}, {
					align : 'center',
					field : 'driverName',
					title : '司机姓名'
				}, {
					align : 'center',
					field : 'driverPhone',
					title : '司机联系电话'
				}, {
					align : 'center',
					field : 'vehicleNumber',
					title : '车牌号'
				}, {
					align : 'center',
					field : 'deliveryRecordName',
					title : '运营配送点'
				}, {
					align : 'center',
					field : 'dispatchStatus',
					title : '状态',
					formatter : function(value, row, index) {
						return this.dispatchStatusArr[value];
					}.bind(this)
				}, {
					align : 'center',
					field : 'planDepartTime',
					title : '计划发车时间'
				}, {
					align : 'center',
					field : 'truckLoadingTime',
					title : '装车时间'
				}, {
					align : 'center',
					field : 'practicalDepartTime',
					title : '实际发运时间'
				}, {
					align : 'center',
					field : 'finishTime',
					title : '完成时间'
				}, {
					field : 'deliveryPrintStatus',
					title : '派车单打印状态',
					align : 'center',
					formatter : function(value, row, index) {
						if (value == '0') {
							return "未打印";
						} else if (value == '1') {
							return "已打印";
						}
					}
				}, {
					field : 'surfacePrintStatus',
					title : '面单打印状态',
					align : 'center',
					formatter : function(value, row, index) {
						if (value == '0') {
							return "未打印";
						} else if (value == '1') {
							return "已打印";
						}
					}
				}, {
					field : 'describes',
					title : '描述',
					align : 'center'
				}, {
					field : 'creatorName',
					title : '创建人',
					align : 'center'
				}, {
					field : 'createTime',
					title : '创建时间',
					align : 'center'
				}, {
					field : 'modifierName',
					title : '修改人',
					align : 'center'
				}, {
					field : 'updateTime',
					title : '修改时间',
					align : 'center'
				}]
	});

}

/**
 * 向已存在的派车单中添加运单
 */
DispatchVehicle.prototype.addCWB = function() {
	if ($('#waybillId').val() == '') {
		$.toastrWarning('请填写分段运单号');
		return;
	}
	var params = {
		'disChildWaybillId' : $('#waybillId').val(),
		'dispatchVehicleId' : $('#dv_id').val()
	}
	$.callAjax({
				type : "post",
				url : DispatchVehicle.addCWB,
				data : params,
				success : function(data) {
					if (data.code != "0000") {
						$.toastrWarning(data.msg);
						return;
					}
					$.toastrSuccess("添加运单操作成功");
					$.hideModal('#myModal01');
					$('#dvManagerTable').bootstrapTable('refresh');
				},
				error : function() {
					$.toastrError();
				}
			});
}

DispatchVehicle.prototype.bindEvent = function() {
	// 绑定展示显示搜索条件按钮事件
	$("#btn_show_search").click(function() {
				var isHidden = $(".alert-info").is(":hidden");
				if (isHidden) {// 如果已经隐藏，就显示
					$(".alert-info").show();
					$("#btn_show_search").children("span").next()
							.text("隐藏搜索条件");
				} else {// 已经显示就隐藏
					$(".alert-info").hide();
					$("#btn_show_search").children("span").next()
							.text("显示搜索条件");
				}
			});
	// 绑定清空事件
	$("#btn_clean_paiche").on("click", function() {
				document.getElementById("addPaicheSearchForm").reset();
			});
	

	// 主界面 搜索按钮点击事件
	$("#btn_search_paiche").on("click", function() {
				$("#btn_search").addClass("disabled");
				this.isResetOffset = 1;
				$('#dvManagerTable').bootstrapTable('refresh');
			}.bind(this));


	// 查询条件 司机弹框事件
	$("#search_driver_2").on("click", function() {
				this.searchDriverDialog.show();
			}.bind(this));

	// 条件查询司机search_driver
	$("#search_car_2").on("click", function() {
				this.searchVehicleDialog.show();
			}.bind(this));

}
DispatchVehicle.prototype.init = function() {

	this.carInitDropDownBox();
	this.initDropDownBox();
	this.searchListByPage();

	// 初始化日期控件
	dateUtils.initDate();
	this.bindEvent();
}

DispatchVehicle.prototype.queryParams = function(params) {
	var dispatchVehicleId = $('#dispatchVehicleId_2').val();
	var disFlatCableId = $('#disFlatCableId').val();
	var vehicleNumber = $('#vehicleNumber_2').val();
	var driverName = $('#driverName_2').val();
	var dispatchStatus = $('#dispatchStatus_2').val();
	var temp = {
		pageSize : params.limit,
		offset : this.isResetOffset == 1 ? 0 : params.offset,
		status : 2,
		sort : params.sort,
		order : params.order,
		dispatchVehicleId : dispatchVehicleId,
		disFlatCableId : disFlatCableId,
		defaultDispatchStatus:1,//默认派车单号状态 ：为1的时候只查询状态为发车之前的派车单（暂定为 10：新建 50：已分派 20：已接受 30：已装车）
		vehicleNumber : vehicleNumber,
		driverName : driverName,
		dispatchStatus : dispatchStatus
	};
	return temp;
};
// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .dvDetail_a' : function(e, value, row, index) {

		myMain.getAllContent("/tms/dispatchVehicle/init1?type='look'&id="
				+ row.dispatchVehicleId);
	}
};

var dispatchVehicle = null;
$(document).ready(function() {
			dispatchVehicle = new DispatchVehicle();
			dispatchVehicle.init();
		});
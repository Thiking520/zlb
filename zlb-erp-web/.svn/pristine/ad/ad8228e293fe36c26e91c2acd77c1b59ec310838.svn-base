
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
					$('#successPeopId').val(row.adminId);
					$('#successPeop').val(row.cnName).change();
				}
			});

	// 发运人选择框
	this.dispatcherDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#deliveryPeopId').val(row.adminId);
					$('#deliveryPeop').val(row.cnName).change();
				}
			});
	// 装车人选择框
	this.truckerDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#truckPeopId').val(row.adminId);
					$('#truckPeop').val(row.cnName).change();
				}
			});

	// 主界面 司机 选择框
	this.searchDriverDialog = new DriverDialog({
				confirmCallback : function(row) {
					$('#driver_2').val(row.adminId);
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
					$('#driver_xd').val(row.adminId);
					$('#driverName_xd').val(row.cnName);
					$('#driverPhone_xd').val(row.mobileNo);
				}
			});
	// 改派界面 车辆选择框
	this.vehicleDialog = new VehicleDialog({
				confirmCallback : function(row) {
					$('#vehicleId_xd').val(row.adminId);
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

//派车单添加运单
DispatchVehicle.addWaybill = "/tms/dispatchVehicleList/addDispatchVehicleList";

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
			this.searchListByPage();
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
			
		}.bind(this),
		columns : [{
					radio : true
				}, {
					field : 'disDispatchVehicleId',
					title : '派车单号',
					formatter : function(value, row, index) {
						return '<a class="dvDetail_a" href="javascript:void(0)" key="'
								+ row.dispatchVehicleId
								+ '">'
								+ row.disDispatchVehicleId + '</a>';
					},
					events : 'operateEvents'
				},/* {
					align : 'center',
					field : 'operatorName',
					title : '运营商'
				},*/
				{
					align : 'center',
					field : 'flatCableId',
					title : '排线编号'
				},
				{
					align : 'center',
					field : 'driverName',
					title : '司机',
					formatter : function(value, row, index) {
						return row.driverName + "</br>" + row.driverPhone;
					}
				},/* {
					align : 'center',
					field : 'driverPhone',
					title : '司机联系电话'
				},*/ {
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
				}/*, {
					field : 'modifierName',
					title : '修改人',
					align : 'center'
				}, {
					field : 'updateTime',
					title : '修改时间',
					align : 'center'
				}*/]
	});

}
/**
 * 表单验证
 */
DispatchVehicle.prototype.validateform = function() {
	// 表单验证start
	$('#xiadaForm').bootstrapValidator({
				message : 'This value is not valid',
				// feedbackIcons : {
				// 	valid : 'glyphicon glyphicon-ok',
				// 	invalid : 'glyphicon glyphicon-remove',
				// 	validating : 'glyphicon glyphicon-refresh'
				// },
				fields : {
					driverPhone_xd : {
						validators : {
							notEmpty : {
								message : '司机手机号码不能为空！'
							},
							regexp : {
								regexp : /^1[3|5|8]{1}[0-9]{9}$/,
								message : '请输入正确的手机号码'
							}

						}
					},
					truckPeop : {
						validators : {
							notEmpty : {
								message : '装车人不能为空！'
							}
						}
					}
				},
				excluded : [':disabled']
			});

	$('#truck').bootstrapValidator({
				message : 'This value is not valid',
				// feedbackIcons : {
				// 	valid : 'glyphicon glyphicon-ok',
				// 	invalid : 'glyphicon glyphicon-remove',
				// 	validating : 'glyphicon glyphicon-refresh'
				// },
				fields : {
					truckPeop : {
						trigger : "change",
						validators : {
							notEmpty : {
								message : '装车人不能为空！'
							}
						}
					}
				},
				excluded : [':disabled']
			});

	$('#delivery').bootstrapValidator({
				message : 'This value is not valid',
				// feedbackIcons : {
				// 	valid : 'glyphicon glyphicon-ok',
				// 	invalid : 'glyphicon glyphicon-remove',
				// 	validating : 'glyphicon glyphicon-refresh'
				// },
				fields : {
					deliveryPeop : {
						trigger : "change",
						validators : {
							notEmpty : {
								message : '发运人不能为空！'
							}
						}
					}
				},
				excluded : [':disabled']
			});

	$('#success').bootstrapValidator({
				message : 'This value is not valid',
				// feedbackIcons : {
				// 	valid : 'glyphicon glyphicon-ok',
				// 	invalid : 'glyphicon glyphicon-remove',
				// 	validating : 'glyphicon glyphicon-refresh'
				// },
				fields : {
					successPeop : {
						trigger : "change",
						validators : {
							notEmpty : {
								message : '配送人不能为空！'
							}
						}
					}
				},
				excluded : [':disabled']
			});
	// 表单验证end
}
/**
 * 派车单作废
 * 
 * @param {}
 *            id
 */
DispatchVehicle.prototype.noUse = function(id) {
	var params = {
		"dispatchVehicleId" : id,
		"dispatchStatus" : '98'
	};
	$.dialogConfirm({
				message : '作废后将无法恢复，请您确认真要作废吗？',
				callback : function(result) {
					if (result) {
						$.callAjax({
									type : "post",
									url : DispatchVehicle.updateStatusUrl,
									data : params,
									success : function(data) {
										var code = data.code;
										if (code != "0000") {
											toastr['warning'](data.msg);
											return;
										}
										$.toastrSuccess('操作成功！');
										$('#dvManagerTable')
												.bootstrapTable('refresh');
									},
									error : function() {
										$.toastrError();
									}
								});
					}
				}
			});
}
/**
 * 根据车辆信息 查询详情
 * 
 * @param {}
 *            id
 */
DispatchVehicle.prototype.carsDetais = function(id) {
	var params = {
		'id' : id
	};
	$.callAjax({
				url : DispatchVehicle.getCarsDetaisUrl,
				data : params,
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
					$.showModal('#myModal04');

				}.bind(this),
				error : function() {
					$.toastrError();
				}
			});
}
/**
 * 装车确认 发运确认 完成确认
 * 
 * @param {}
 *            id
 * @param {}
 *            type
 */
DispatchVehicle.prototype.updateSimpleTime = function(id, type) {
	
	var selects = $("#dvManagerTable").bootstrapTable('getSelections');//获取选中的派车单
	var urlVal = "";
	var params = "";
	
	if (type == "truck") {
		if (((new Date((Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"))))
				.getTime()) <= ((new Date($('#truckLoadingTime01').val())))
				.getTime()) {
			$('#truckTS').text("时间不能大于当前时间！");
			return;
		}
		$('#truckPeopId').val();
		params = {
			'dispatchVehicleId' : id,
			'truckLoadingTime' : $('#truckLoadingTime01').val(),
			'truckLoadingId' : $('#truckPeopId').val(),
			'dispatchStatus' : '30'
		};
		urlVal = DispatchVehicle.updateTLTUrl;
	} else if (type == "delivery") {
		if (((new Date((Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"))))
				.getTime()) <= ((new Date($('#practicalDepartTime01').val())))
				.getTime()) {
			$('#deliveryTS').text("时间不能大于当前时间！");
			return;
		}
		
		if ((new Date(selects[0].truckLoadingTime)
				.getTime()) >= ((new Date($('#practicalDepartTime01').val())))
				.getTime()) {
			$('#deliveryTS').text("发运时间不能早于装车时间！");
			return;
		}
		params = {
			'dispatchVehicleId' : id,
			'practicalDepartTime' : $('#practicalDepartTime01').val(),
			'practicalDepartId' : $('#deliveryPeopId').val(),
			'dispatchStatus' : '40'
		};
		urlVal = DispatchVehicle.updatePDTUrl;
	} else if (type == "success") {
		if (((new Date((Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"))))
				.getTime()) <= ((new Date($('#finishTime01').val()))).getTime()) {
			$('#successTS').text("时间不能大于当前时间！");
			return;
		}
		
		if ((new Date(selects[0].practicalDepartTime).getTime()) >= ((new Date($('#finishTime01').val()))).getTime()) {
			$('#successTS').text("完成时间不能早于发运时间！");
			return;
		}
		params = {
			'dispatchVehicleId' : id,
			'finishTime' : $('#finishTime01').val(),
			'finishId' : $('#successPeopId').val(),
			'dispatchStatus' : '99'
		};
		urlVal = DispatchVehicle.updateFTUrl;
	}
	$.callAjax({
				type : "post",
				url : urlVal,
				data : params,
				success : function(data) {
					if (data.code != "0000") {
						$.toastrWarning(data.msg);
						return;
					}
					$.hideModal('#myModal01');
					$('#dvManagerTable').bootstrapTable('refresh');
				},
				error : function() {
					$.toastrError();
				}
			});
}
/**
 * 改派操作
 */
DispatchVehicle.prototype.updateByXiada = function() {
	var params = {
		'dispatchVehicleId' : $('#dispatchVehicleId_xd').val(),
		'driver' : $('#driver_xd').val(),
		'driverName' : $('#driverName_xd').val(),
		'driverPhone' : $('#driverPhone_xd').val(),
		'vehicleId' : $('#vehicleId_xd').val(),
		'vehicleNumber' : $('#vehicleNumber_xd').val(),
		'describes' : $("#describes_xd").val()
	}
	$.callAjax({
				type : "post",
				url : DispatchVehicle.updateUrlByXiada,
				data : params,
				success : function(data) {
					if (data.code != "0000") {
						$.toastrWarning(data.msg);
						return;
					}
					$.hideModal('#myModal04');
					$('#dvManagerTable').bootstrapTable('refresh');
				},
				error : function() {
					$.toastrError();
				}
			});
}
/**
 * 向已存在的派车单中添加运单
 */
DispatchVehicle.prototype.addCWB = function() {
	if ($('#waybillId').val() == '') {
		$.toastrWarning('请填写运单号');
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
/**
 * 批量打印面单
 * 
 * @param {}
 *            dispatchVehicleIds
 */
DispatchVehicle.prototype.waybillBatchPrint = function(dispatchVehicleIds) {
	// 触发Ajax
	var params = "?ids=" + dispatchVehicleIds;
	var contextPath = $("#contextPath").val();

	// 请求打印
	window.open(contextPath + DispatchVehicle.waybillBatchPrintUrl + params);

}
/**
 * 批量打印派车单
 * 
 * @param {}
 *            dispatchVehicleIds
 */
DispatchVehicle.prototype.dispatchVehicleBatchPrint = function(
		dispatchVehicleIds) {
	// 触发Ajax
	var params = "?ids=" + dispatchVehicleIds;
	var contextPath = $("#contextPath").val();
	// 请求打印
	window.open(contextPath + DispatchVehicle.dispatchVehicleBatchPrintUrl
			+ params);

}

//根据条件查询运单列表
DispatchVehicle.prototype.wayBillListUrl = function() {
		return '/tms/waybill/list';
}

DispatchVehicle.prototype.queryParamsWayBill = function(params) {
	var temp;
		temp = {
			pageSize : params.limit, // 页面大小
			offset : this.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
			status : 2,// 状态
			sort : params.sort,
			order : params.order,
			city : $("#topCitySelect option:selected").val(),
			area : $("#topAreaSelect option:selected").val(),
			childWaybillId : $("#queryChildWaybillId").val(),
			// childWalbillStatus : $("#queryChildWalbillStatus").val(),
			// 变更为状态位
//			childWalbillStatus : $("#feature-tab").find(".active").find("a")
//					.attr("queryChildWalbillStatus"),
			flatCableStatus : 0, //默认只查询未排线的  
			truckingStatus : 0, //默认只查询未派车的
			flatCableId : $("#queryFlatCableId").val(),
			dispatchVehicleId : $("#queryDispatchVehicleId").val(),
			orderId : $("#queryOrderId").val(),
			priority : $("#queryPriority").val(),
			paymentTimeStart : $("#queryPaymentTimeStart").val(),
			paymentTimeEnd : $("#queryPaymentTimeEnd").val()
		};
	return temp;
}

////根据条件查询运单列表 地图上无分页查询

///**
// * 初始化 主运单列表
// */
DispatchVehicle.prototype.initMainWayBillListTable = function() {
	$.pageTable({
				tableId : "#mainWayBillList",
				url : this.wayBillListUrl(),
				queryParams : this.queryParamsWayBill,
				onLoadSuccess : function(data) {
					
				}.bind(this),
				columns : [ {
					// radio : true
					checkbox : true
				}, {
					align : 'center',
					field : 'disChildWaybillId',
					title : '运单号',
					formatter : function(value, row, index) {
						return '<a class="fcDetail_a" href="javascript:void(0)" key="'
								+ row.disChildWaybillId
								+ '">'
								+ row.disChildWaybillId
								+ '</a>';
					},
					events : 'operateEventsTuo'
				}, {
					align : 'center',
					field : 'orderId',
					title : '订单号'
				},
				 {
				 align : 'center',
				 field : 'flatCableId',
				 title : '排线编号'
				 },
				 {
					 align : 'center',
					 field : 'disDispatchVehicleId',
					 title : '派车单号'
				},
				{
					align : 'center',
					field : 'isSubsection',
					title : '分段运单',
					formatter : function(value, row, index) {
						if (value == '0') {
							return "否";
						} else if (value == '1') {
							return "是";
						} else {
							return "其他";
						}
					}
				}, {
					align : 'center',
//					field : 'walbillStatus',//主运单状态
					field : 'childWalbillStatus',//子运单状态
					title : '运单状态',
					formatter : function(value, row, index) {
						if (value == '10') {
							return "新建";
						} else if (value == '20') {
							return "已确认";
						} else if (value == '30') {
							return "已装车/已揽收";
						} else if (value == '50') {
							return "在途中";
						} else if (value == '98') {
							return "已取消";
						} else if (value == '99') {
							return "已签收";
						}
					}
				}, /*{
					align : 'center',
					field : 'waybillType',
					title : '运单分类',
					formatter : function(value, row, index) {
						if (value == '10') {
							return "揽收件";
						} else if (value == '20') {
							return "配送件";
						}
					}
				}, {
					align : 'center',
					field : 'operationSiteName',
					title : '运营站点'
				},*/ {
					align : 'center',
					field : 'deliverSiteName',
					title : '发货站点'
				}, {
					align : 'center',
					field : 'takeSiteName',
					title : '收货站点'
				}, 
				/*{
					align : 'center',
					field : 'paymentTime',
					title : '支付时间'
				},*/{
					align : 'center',
					field : 'flatCableStatus',
					title : '排线状态',
					formatter : function(value, row, index) {
						if (value == '0') {
							return "未排线";
						} else if (value == '1') {
							return "已排线";
						}
					}
				},  {
					align : 'center',
					field : 'truckingStatus',
					title : '派车状态',
					formatter : function(value, row, index) {
						if (value == '0') {
							return "未派车";
						} else if (value == '1') {
							return "已派车";
						}
					}
				}, {
					align : 'center',
					field : 'printStatus',
					title : '面单打印标记',
					formatter : function(value, row, index) {
						if (value == '0') {
							return "未打印";
						} else if (value == '1') {
							return "已打印";
						}
					}
				}, /*{
					align : 'center',
					field : 'timingDelivery',
					title : '定时派送',
					formatter : function(value, row, index) {
						if (value == '' || value == null) {
							return "否";
						} else {
							return "是";
						}
					}
				},*/ {
					align : 'center',
					title : '要求送货时间',
					formatter : function(value, row, index) {
						var time = "";
						if ($.isNotNull(row.deliveryTime)) {
							time = time + row.deliveryTime;
						}
						if ($.isNotNull(row.arrivalTime)) {
							time = time + " " + row.arrivalTime;
						}
						return time;
					}
				}, {
					align : 'center',
					field : 'consumerName',
					title : '顾客姓名'
				}, {
					align : 'center',
					field : 'consumerMobile',
					title : '顾客手机'
				}, {
					align : 'center',
					field : 'consumerAddress',
					title : '收货地址',
					width:200,
					formatter:function(value,row,index){
						var str = '<div style="width: 200px">'+value+'</div>';
						return str;
					}
				}, {
					align : 'center',
					field : 'orderType',
					title : '订单类型',
					formatter : function(value, row, index) {
						if (value == '10') {
							return "销售订单";
						} else if (value == '20') {
							return "退货订单";
						} else if (value == '30') {
							return "换货订单";
						}
					}
				},
				 {
					align : 'center',
					field : 'saleTime',
					title : '下单时间'
				}, 
				/* {
					align : 'center',
					field : 'subsections',
					title : '运单段数'
				},*/ {
					align : 'center',
					field : 'pickUpGoodsPeopleName',
					title : '揽收人'
				}, {
					align : 'center',
					field : 'pickUpGoodsTime',
					title : '揽收时间'
				}, {
					align : 'center',
					field : 'signInPeople',
					title : '签收人'
				}, {
					align : 'center',
					field : 'signInTime',
					title : '签收时间'
				},

				{
					align : 'center',
					field : 'signInResult',
					title : '签收结果',
					formatter : function(value, row, index) {
						if (value == '0') {
							return "异常签收";
						} else if (value == '1') {
							return "正常签收";
						}
					}
				}, /*{
					align : 'center',
					field : 'signInType',
					title : '签收异常分类',
					formatter : function(value, row, index) {
						if (value == '10') {
							return "联系不到客户";
						} else if (value == "20") {
							return "客户拒收";
						}
					}
				}, {
					align : 'center',
					field : 'signInReason',
					title : '异常原因详情'
				}, {
					align : 'center',
					field : 'disposeScheme',
					title : '处理方案',
					formatter : function(value, row, index) {
						if (value == '10') {
							return "再投";
						} else if (value == "20") {
							return "原路返回";
						}
					}
				},*/ {
					align : 'center',
					field : 'distributionNote',
					title : '备注'
				}, {
					align : 'center',
					field : 'creatorName',
					title : '创建人'
				}, {
					align : 'center',
					field : 'createTime',
					title : '创建时间'
				}/*, {
					align : 'center',
					field : 'modifierName',
					title : '修改人'
				}, {
					align : 'center',
					field : 'updateTime',
					title : '修改时间'
				}*/ ]
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
	$("#btn_clean").on("click", function() {
				document.getElementById("addOrEditeSearchForm").reset();
			});
	// 打印面单按钮点击事件
	$("#print1").on("click", function() {

				$("#print1").addClass("disabled");
				var ids = $.getIdSelections("#dvManagerTable",
						"dispatchVehicleId");
				if (ids == null || ids == '') {
					$.toastrWarning('请先选择记录再操作！');
					return false;
				}
				this.waybillBatchPrint(ids);
			}.bind(this));
	// 打印派车单按钮点击事件
	$("#print2").on("click", function() {
				$("#print1").addClass("disabled");
				var ids = $.getIdSelections("#dvManagerTable",
						"dispatchVehicleId");
				if (ids == null || ids == '') {
					$.toastrWarning('请先选择记录再操作！');
					return false;
				}
				this.dispatchVehicleBatchPrint(ids);
			}.bind(this));

	// 主界面 搜索按钮点击事件
	$("#btn_search").on("click", function() {
				$("#btn_search").addClass("disabled");
				this.isResetOffset = 1;
				$('#dvManagerTable').bootstrapTable('refresh');
			}.bind(this));

	// 查看派车单
	$("#btn_show_edit").click(function() {

		if ($("#dvManagerTable").bootstrapTable('getSelections').length == 1) {
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						myMain
								.getAllContent("/tms/dispatchVehicle/init1?type='look'&id="
										+ row.dispatchVehicleId);
					});
		} else {
			$.toastrWarning("请选择一条数据进行编辑！");
		}

	});

	// 添加分段运单 弹框事件
	$("#btn_add_waybill").click(function() {
		if ($("#dvManagerTable").bootstrapTable('getSelections').length == 1) {
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						if (row.dispatchStatus == 10
								|| row.dispatchStatus == 50) {
							$('#dv_id').val(row.dispatchVehicleId);
							$('#myModalLabel01').text('添加运单');
							$('#waybillId').val(null);
							$('#waybill').show();
							$('#truck').hide();
							$('#delivery').hide();
							$('#success').hide();
//							$.showModal('#myModal01');
							$.showModal('#mywaybill');
						} else {
							$.toastrWarning("派车单已在运作，不能再分段添加运单！");
						}
					});
		} else {
			$.toastrWarning("请选择一条数据进行编辑！");
		}
	});
	// 装车确认 事件
	$('#btn_true_truck').click(function() {
		if ($("#dvManagerTable").bootstrapTable('getSelections').length == 1) {
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						if (row.dispatchStatus != 20 && row.dispatchStatus != 50) {
							$.toastrWarning("目前状态不允许装车操作！");
							return;
						}
						var date = new Date();
						$('#truckLoadingTime01').val(Util.dateFormat(date,
								"yyyy-MM-dd HH:mm:ss"));
						$('#myModalLabel01').text('确认装车');
						$('#waybill').hide();
						
						$.clearForm('truck');
						$('#truck').show();
						$('#delivery').hide();
						$('#success').hide();
						$('#truckTS').text("");
						$.showModal('#myModal01');
					});
		} else {
			$.toastrWarning("请选择一条数据进行编辑！");
		}
	});
	// 发运确认 弹框事件
	$("#btn_true_delivery").click(function() {

		if ($("#dvManagerTable").bootstrapTable('getSelections').length == 1) {
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						if (row.dispatchStatus == 30) {
							var date = new Date();
							$('#practicalDepartTime01').val(Util.dateFormat(
									date, "yyyy-MM-dd HH:mm:ss"));
							$('#myModalLabel01').text('确认发运');
							$('#waybill').hide();
							$('#truck').hide();
							
							$.clearForm('delivery');
							$('#delivery').show();
							$('#success').hide();
							$('#deliveryTS').text("");
							$.showModal('#myModal01');
						} else {
							$.toastrWarning("目前状态不允许发运操作！");
						}
					});
		} else {
			$.toastrWarning("请选择一条数据进行编辑！");
		}
	});
	// 完成确认 弹框事件
	$('#btn_true_success').click(function() {
		if ($("#dvManagerTable").bootstrapTable('getSelections').length == 1) {
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						if (row.dispatchStatus == 40) {
							var date = new Date();
							$('#finishTime01').val(Util.dateFormat(date,
									"yyyy-MM-dd HH:mm:ss"));
							$('#myModalLabel01').text('完成确认');
							$('#waybill').hide();
							$('#truck').hide();
							$('#delivery').hide();
							
							$.clearForm('success');
							$('#success').show();
							$('#successTS').text("");
							$.showModal('#myModal01');
						} else {
							$.toastrWarning("目前状态不允许完成确认操作！");
						}
					});
		} else {
			$.toastrWarning("请选择一条数据进行编辑！");
		}

	});
	// 作废
	$('#btn_is_use').click(function() {
				var selects = $("#dvManagerTable")
						.bootstrapTable('getSelections');
				if (selects.length == 1) {
					var row = selects[0];
					if (row.dispatchStatus == '50'
							|| row.dispatchStatus == '10') {
						this.noUse(row.dispatchVehicleId);
					} else {
						$.toastrWarning("该派车单已经在运作不能进行作废操作！");
					}
				} else {
					$.toastrWarning("请选择一条数据进行编辑！");
				}
			}.bind(this));

	// 装车人 弹出框
	$('#search_truckPeop').click(function() {
				this.truckerDialog.show("员工列表");
			}.bind(this));

	// 发运人 弹出框事件
	$('#search_deliveryPeop').click(function() {
				this.dispatcherDialog.show("员工列表");
			}.bind(this));

	// 配送人 弹出框事件
	$('#search_successPeop').click(function() {
				this.deliveryManDialog.show("员工列表");
			}.bind(this));
	// 装车确认
	$('#btn_truck').click(function() {
				var bootstrapValidator = $("#truck").data('bootstrapValidator');
				bootstrapValidator.validate();
				if (!bootstrapValidator.isValid()) {
					return;
				}
				if ($('#truckLoadingTime01').val() == '') {
					$.toastrWarning("装车完成时间不能为空");
					return;
				}
				var selects = $("#dvManagerTable")
						.bootstrapTable('getSelections');
				var row = selects[0];

				this.updateSimpleTime(row.dispatchVehicleId, 'truck');
			}.bind(this));

	// 发运确认
	$("#btn_delivery").click(function() {
				var bootstrapValidator = $("#delivery")
						.data('bootstrapValidator');
				bootstrapValidator.validate();
				if (!bootstrapValidator.isValid()) {
					return;
				}
				if ($('#practicalDepartTime01').val() == '') {
					$.toastrWarning("发运时间不能为空");
					return;
				}
				var selects = $("#dvManagerTable")
						.bootstrapTable('getSelections');
				var row = selects[0];
				this.updateSimpleTime(row.dispatchVehicleId, 'delivery');

			}.bind(this));
	// 完成确认
	$('#btn_success').click(function() {
				var bootstrapValidator = $("#success")
						.data('bootstrapValidator');
				bootstrapValidator.validate();
				if (!bootstrapValidator.isValid()) {
					return;
				}
				if ($('#finishTime01').val() == '') {
					$.toastrWarning("完成时间不能为空");
					return;
				}
				var selects = $("#dvManagerTable")
						.bootstrapTable('getSelections');
				var row = selects[0];
				this.updateSimpleTime(row.dispatchVehicleId, 'success');
			}.bind(this));

	// 查询条件 司机弹框事件
	$("#search_driver_2").on("click", function() {
				this.searchDriverDialog.show();
			}.bind(this));

	// 条件查询司机search_driver
	$("#search_car_2").on("click", function() {
				this.searchVehicleDialog.show();
			}.bind(this));

	// 改派按钮 弹框事件
	$("#btn_is_xiada").on("click", function() {
				var selects = $("#dvManagerTable")
						.bootstrapTable('getSelections');
				if (selects.length == 1) {

					var row = selects[0];
					if (row.dispatchStatus != '10'
							&& row.dispatchStatus != '50') {
						$.toastrWarning("该数据处于运作状态，不能进行改派操作！");
					} else {
						document.getElementById("xiadaForm").reset();
						$('#dispatchVehicleId_xd').val(row.dispatchVehicleId);
						$('#driverName_xd').val(row.driverName);
						$('#driverPhone_xd').val(row.driverPhone);
						$('#vehicleId_xd').val(row.vehicleId);
						$('#vehicleNumber_xd').val(row.vehicleNumber);
						$('#describes_xd').val(row.describes);
						this.carsDetais(row.vehicleId);
					}

				} else {
					$.toastrWarning("请选择一条数据进行操作！");
				}
			}.bind(this));
	// 改派确认操作
	$("#xiada_save").on("click", function() {
				$.dialogConfirm({
							message : '您确定要改派吗？',
							callback : function(result) {
								if (result) {
									this.updateByXiada();
								}
							}.bind(this)
						});
			}.bind(this));

	// 改派界面 司机选择弹框事件
	$("#search_driver_xd").on("click", function() {
				this.driverDialog.show();
			}.bind(this));

	// 改派界面 车辆选择弹框事件
	$("#search_car_xd").on("click", function() {
				this.vehicleDialog.show();
			}.bind(this));
	// 添加运单确认
	$("#btn_waybillId").on("click", function() {
				this.addCWB();
			}.bind(this));
	// 操作日志
	$("#btn_show_log").on("click", function() {
				var array = $("#dvManagerTable")
						.bootstrapTable('getSelections');
				if (array.length == 1) {
					$('#bill_1').val(array[0].dispatchVehicleId);
					this.logDialog.show();
				} else {
					$.toastrWarning("请选择一条数据进行操作！");
				}

			}.bind(this));

	// 运单号 去除空格
	$('#waybillId').keyup(function() {
				var waybillId = $('#waybillId')
				var waybillIdval = $.trim(waybillId.val());
				waybillId.val(waybillIdval);
			});
	
	// tabs
	$('#myTab a:first').tab('show');
	$('#myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
	
	// 更多条件 按钮事件
	$('.L_Popup').click(function() {
		if ($('.L_specific_Popup').css('display') == "none") {
			$('.L_specific_Popup').css('display', 'block');
		} else {
			$('.L_specific_Popup').css('display', 'none');
		}
		;
		$('.L_specific_Popup1').css('display', 'none');
	});
	
	// 更多条件 弹框 确定按钮事件
	$("#queryAffirm").click(function() {
		$("#mainWayBillList").bootstrapTable('refresh', {
			url : $("#contextPath").val() + this.wayBillListUrl()
		});
		$('.L_specific_Popup').css('display', 'none');
	}.bind(this));

	// 更多条件 弹框 确定按钮事件
	$("#queryAffirm2").click(function() {

		$("#mainWayBillList").bootstrapTable('refresh', {
			url : $("#contextPath").val() + this.wayBillListUrl()
		});
		$('.L_specific_Popup').css('display', 'none');
	}.bind(this));
	// 更多条件 弹框 取消按钮事件
	$("#queryCancle").click(function() {
		$('.L_specific_Popup').css('display', 'none');
	});
	// 清空事件
	$("#queryQingkong").on("click", function() {
		$.clearForm("mainForm");
	});
	// 更多条件 弹框 取消按钮事件
	$("#queryCancle").click(function() {
		$('.L_specific_Popup').css('display', 'none');
	});
	
	// 点击运单列表的确认按钮
	$("#queButton").click(function() {

		// 获取选中的运单
		var selects = $.getIdSelections("#mainWayBillList", "childWaybillId");// 获取选中的运单号
		var selectids = $.getIdSelections("#mainWayBillList", "disChildWaybillId");// 获取选中的外部运单号
		
//		var selects = $("#mainWayBillList").bootstrapTable('getSelections');
		if (selects.length == 0) {
			$.toastrWarning("请先选择运单");
			return;
		}

		// 获取选中的派车单
//		var paiche = $.getIdSelections("#dvManagerTable", "disFlatCableId");
		var paiche = $("#dvManagerTable").bootstrapTable('getSelections');// 获取选中的派车单号
		
		if ($.isNull(paiche) || paiche.length != 1) {
			$.toastrWarning("请选择一个派车单进行操作！");
			return;
		}

		var disDispatchVehicleId = paiche[0].disDispatchVehicleId;
		var params = {
			'disDispatchVehicleId' : disDispatchVehicleId,
			childWaybillIds : selects,
			disChildWaybillIds : selectids
		}
		$.callAjax({
			type : "post",
			url : DispatchVehicle.addWaybill,
			data : params,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				
				$('#dvManagerTable').bootstrapTable('refresh');
				$('#mainWayBillList').bootstrapTable('refresh');
				$.hideModal('#mywaybill');
				$.toastrSuccess('操作成功！');
			},
			error : function() {
				$.toastrError();
			}
		});
		
//		var flatCableListVos = new Array();
//		for (var i = 0, len = selects.length; i < len; i++) {
//			flatCableListVos[i] = {
//				'childWaybillId' : selects[i].childWaybillId
//			};
//		}
//		var params = {
//			'flatCableId' : paixian[0],
//			'flatCableListVos' : flatCableListVos
//		}
//		$.callAjax({
//			type : "post",
//			url : WaybillManage.addToExistFlatCableUrl,
//			data : params,
//			success : function(data) {
//				if (data.code != "0000") {
//					$.toastrWarning(data.msg);
//					return;
//				}
//				$.toastrSuccess('操作成功！');
//				$('#dvManagerTable').bootstrapTable('refresh');
//				$('#mainWayBillList').bootstrapTable('refresh');
//				$.hideModal('#mywaybill');
//			},
//			error : function() {
//				$.toastrError();
//			}
//		});
	}.bind(this));

	// 点击排线列表的取消按钮
	$("#qvButton").click(function() {
		$.hideModal('#mywaybill');
	}.bind(this));
	
}
DispatchVehicle.prototype.init = function() {
//	this.queryParamsWayBill;
	
	this.carInitDropDownBox();
	this.initDropDownBox();
	

	//初始化运单列表
	this.initMainWayBillListTable();
	
	this.validateform();
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
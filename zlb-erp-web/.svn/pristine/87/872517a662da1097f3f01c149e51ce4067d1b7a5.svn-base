var dispatchStatusArr = [];
var printStatusArr = [];
printStatusArr[1] = "已打印";
printStatusArr[0] = "未打印";
var childWalbillStatusArr = [];
var signInTypeArr = [];
var walbillStatusArr = [];
var waybillTypeArr = [];
var dvListManager = {
	isResetOffset : 0,
	URL : {
		detailsUrl : function() {
			return '/tms/dispatchVehicle/queryDispatchVehicleDetails';
		},// 查询运单信息
		queryDVList : function() {
			return '/tms/dispatchVehicleList/list';
		},
		addDVList : function() {
			return '/tms/dispatchVehicleList/queryDispatchVehicleDetails';
		},
		addDVListDetails : function() {
			return '/tms/dispatchVehicleList/addDispatchVehicle';
		},// 司机列表
		driverListUrl : function() {
			return '/tms/emp/list';
		},
		carListUrl : function() {
			return '/publicData/cars/list';
		},// 查看车辆详情的请求地址
		getCarsDetaisUrl : function() {
			return '/publicData/cars/queryCarsDetails';
		},// 更新全部
		updateUrl : function() {
			return '/tms/dispatchVehicle/updateDispatchVehicle';
		},
		initDropDownBox : function() {
			return '/tms/dispatchVehicle/initDropDownBox';
		},
		waybillInitDropDownBox : function() {
			return '/tms/waybill/initDropDownBox';
		}
	},
	/**
	 * 派车单下拉框
	 */
	initDropDownBox : function() {
		$.callAjax({
			type : "post",
			url : dvListManager.URL.initDropDownBox(),
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				for (var i = 0; i < data.data.dispatchStatusList.length; i++) {
					dispatchStatusArr[data.data.dispatchStatusList[i].dictValue] = data.data.dispatchStatusList[i].dictDesc;
				}
			},
			error : function() {
				$.toastrError();
			}
		});
	},
	/**
	 * 运单列表下拉框
	 */
	waybillInitDropDownBox : function() {
		$.callAjax({
			type : "post",
			url : dvListManager.URL.waybillInitDropDownBox(),
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				for (var i = 0; i < data.data.childWalbillStatusList.length; i++) {
					childWalbillStatusArr[data.data.childWalbillStatusList[i].dictValue] = data.data.childWalbillStatusList[i].dictDesc;
				}
				for (var i = 0; i < data.data.signInTypeList.length; i++) {
					signInTypeArr[data.data.signInTypeList[i].dictValue] = data.data.signInTypeList[i].dictDesc;
				}
				for (var i = 0; i < data.data.walbillStatusList.length; i++) {
					walbillStatusArr[data.data.walbillStatusList[i].dictValue] = data.data.walbillStatusList[i].dictDesc;
				}
				for (var i = 0; i < data.data.waybillType.length; i++) {
					waybillTypeArr[data.data.waybillType[i].dictValue] = data.data.waybillType[i].dictDesc;
				}
				
				
				var type = myMain.getUrlValue('type');
				var id = myMain.getUrlValue('id');
				// 初始化表单验证
				if (type == 'edit') {
					dvListManager.getDVDetails(id, 'edit');

				} else {
					dvListManager.getDVDetails(id, 'look');
				}
				
			},
			error : function() {
				$.toastrError();
			}
		});
	},
	// 查看详情或者编辑
	getDVDetails : function(id, type) {
		var params = {
			'dispatchVehicleId' : id
		}
		$.callAjax({
					type : "post",
					url : dvListManager.URL.detailsUrl(),
					data : params,
					success : function(data) {
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							return;
						}
						$("#dispatchVehicleId")
								.val(data.data.dispatchVehicleId);
						$("#disDispatchVehicleId")
								.val(data.data.disDispatchVehicleId);
						$("#dispatchStatus")
								.val(dispatchStatusArr[data.data.dispatchStatus]);
						$("#deliveryRecordId").val(data.data.deliveryRecordId);
						$("#deliveryRecordName")
								.val(data.data.deliveryRecordName);
						$("#vehicleId").val(data.data.vehicleId);
						$("#vehicleNumber").val(data.data.vehicleNumber);
						$("#driver").val(data.data.driver);
						$("#driverName").val(data.data.driverName);
						$("#driverPhone").val(data.data.driverPhone);
						$("#planDepartTime").val(dvListManager
								.format(data.data.planDepartTime,
										"yyyy-MM-dd HH:mm:ss"));
						$("#practicalDepartTime").val(dvListManager.format(
								data.data.practicalDepartTime,
								"yyyy-MM-dd HH:mm:ss"));
						$("#operatorId").val(data.data.operatorId);
						$("#operatorName").val(data.data.operatorName);
						$("#truckLoadingTime").val(dvListManager.format(
								data.data.truckLoadingTime,
								"yyyy-MM-dd HH:mm:ss"));
						$("#finishTime").val(dvListManager.format(
								data.data.finishTime, "yyyy-MM-dd HH:mm:ss"));
						$("#deliveryPrintStatus")
								.val(printStatusArr[data.data.deliveryPrintStatus]);
						$("#surfacePrintStatus")
								.val(printStatusArr[data.data.surfacePrintStatus]);
						$("#describes").val(data.data.describes);

						if (type == 'look') {
							$("#btn_save_submit").hide();
							$("#btn_edit_submit").hide();
							$("#btn_back_submit").click(function(){
								myMain.getAllContent('/tms/dispatchVehicle/init');
							});
						} else if (type == 'edit') {
							$("#btn_save_submit").hide();
							$("#btn_edit_submit").show();
							$("#btn_back_submit").hide();
						}

						dvListManager.searchDVL();
						$.showModal('#myModal');

					},
					error : function() {
						$.toastrError();
					}
				});
	},
	format : function(time, format) {
		if (time != null && time != '') {
			var t = new Date(time);
			var tf = function(i) {
				return (i < 10 ? '0' : '') + i
			};
			return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
						switch (a) {
							case 'yyyy' :
								return tf(t.getFullYear());
								break;
							case 'MM' :
								return tf(t.getMonth() + 1);
								break;
							case 'mm' :
								return tf(t.getMinutes());
								break;
							case 'dd' :
								return tf(t.getDate());
								break;
							case 'HH' :
								return tf(t.getHours());
								break;
							case 'ss' :
								return tf(t.getSeconds());
								break;
						};
					}));
		}
		return null;
	},

	setValue : function(row) {
		// 进行你的操作，如弹出新窗口
		$('#childWaybillId_1').text(row.disChildWaybillId == null
				? ''
				: row.disChildWaybillId);
		$('#childWalbillStatus_1')
				.text(childWalbillStatusArr[row.childWalbillStatus]);
		$('#flatCableStatus_1').text((row.flatCableStatus) == '1'
				? '已排线'
				: ((row.flatCableStatus) == '0' ? '未排线' : ''));
		$('#deliverSiteId_1').text(row.deliverSiteName == null
				? ''
				: row.deliverSiteName);
		$('#takeSiteId_1').text(row.takeSiteName == null
				? ''
				: row.takeSiteName);
		$('#operationSiteId_1').text(row.operationSiteName == null
				? ''
				: row.operationSiteName);
		$('#consumerCompany_1').text(row.consumerCompany == null
				? ''
				: row.consumerCompany);
		$('#consumerName_1').text(row.consumerName == null
				? ''
				: row.consumerName);
		$('#consumerEmail_1').text(row.consumerEmail == null
				? ''
				: row.consumerEmail);
		$('#consumerCity_1').text(row.consumerCity == null
				? ''
				: row.consumerCity);
		$('#consumerArea_1').text(row.consumerArea == null
				? ''
				: row.consumerArea);
		$('#consumerStreet_1').text(row.consumerStreet == null
				? ''
				: row.consumerStreet);
		$('#consumerAddress_1').text(row.consumerAddress == null
				? ''
				: row.consumerAddress);
	},
	// 查询运单列表
	searchDVL : function() {
		$.pageTable({
					tableId : "#dvlistManagerTable",// 需要分页的table ID
					url : dvListManager.URL.queryDVList(),// 请求后台的URL（*）
					queryParams : queryParamsDVL,
					striped : false,
					buttonsAlign : 'left',
					onLoadSuccess : function(data) {
						dvListManager.isResetOffset = 0;
						if (data.rows.length > 0) {
							dvListManager.setValue(data.rows[0]);
						}
					},
					onCheck:function(row){
						dvListManager.setValue(row);
					},
					onClickRow : function(row, $element) {
						dvListManager.setValue(row);

					},
					columns : [{
								radio : true
							},  {
								align : 'center',
								field : 'disChildWaybillId',
								title : '运单号'
							}, {
								align : 'center',
								field : 'operatorName',
								title : '运营商'
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
							}, {
								align : 'center',
								field : 'waybillType',
								title : '运单分类',
								formatter : function(value, row, index) {
									return waybillTypeArr[value];
								}
							},  {
								align : 'center',
								field : 'childWalbillStatus',
								title : '运单状态',
								formatter : function(value, row, index) {
									return childWalbillStatusArr[value];
								}
							}, {
								align : 'center',
								field : 'operationSiteName',
								title : '运营站点'
							}, {
								align : 'center',
								field : 'deliverSiteName',
								title : '发货站点'
							}, {
								align : 'center',
								field : 'takeSiteName',
								title : '收货站点'
							}, {
								align : 'center',
								field : 'cityName',
								title : '城市'
							}, {
								align : 'center',
								field : 'areaName',
								title : '区/县'
							}, {
								align : 'center',
								field : 'streetName',
								title : '街道'
							}, {
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
							}, {
								align : 'center',
								field : 'printStatus',
								title : '面单打印状态',
								formatter : function(value, row, index) {
									return printStatusArr[value];
								}
							}, {
								align : 'center',
								field : 'saleTime',
								title : '下单时间'

							}, {
								align : 'center',
								field : 'paymentTime',
								title : '支付时间'

							}, {
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
							}, {
								align : 'center',
								field : 'deliveryTime',
								title : '要求送货日期'

							}, {
								align : 'center',
								field : 'arrivalTime',
								title : '要求送货时间'

							}, {
								align : 'center',
								field : 'distributionNote',
								title : '配送备注'
							}, {
								align : 'center',
								field : 'consumerCompany',
								title : '顾客公司'
							}, {
								align : 'center',
								field : 'consumerName',
								title : '顾客姓名'
							}, {
								align : 'center',
								field : 'consumerEmail',
								title : '顾客电子邮箱'
							}, {
								align : 'center',
								field : 'consumerMobile',
								title : '顾客手机'
							}, {
								align : 'center',
								field : 'consumerPhone',
								title : '顾客电话'
							}, {
								align : 'center',
								field : 'consumerCountry',
								title : '顾客国家'
							}, {
								align : 'center',
								field : 'consumerProvince',
								title : '顾客省份'
							}
//							, {
//								align : 'center',
//								field : 'priority',
//								title : '订单优先级'
//							}
							, {
								align : 'center',
								field : 'orderTotalAmount',
								title : '订单总金额'
							}, {
								align : 'center',
								field : 'orderDiscount',
								title : '订单优惠金额'
							}, {
								align : 'center',
								field : 'balanceAmount',
								title : '余额支付金额'
							}, {
								align : 'center',
								field : 'couponsAmount',
								title : '优惠劵金额'
							}, {
								align : 'center',
								field : 'giftCardAmount',
								title : '礼品卡金额'
							}, {
								align : 'center',
								field : 'othercharge',
								title : '其他金额'
							}, {
								align : 'center',
								field : 'actualAmount',
								title : '实际支付金额'
							}, {
								align : 'center',
								field : 'isInvoice',
								title : '发票标记',
								formatter : function(value, row, index) {
									if (value == '0') {
										return "不开发票";
									} else if (value == '1') {
										return "开发票";
									}
								}
							}, {
								align : 'center',
								field : 'invoiceType',
								title : '发票类型'
							}, {
								align : 'center',
								field : 'invoiceNo',
								title : '发票号'
							}, {
								align : 'center',
								field : 'invoiceTitle',
								title : '发票抬头'
							}, {
								align : 'center',
								field : 'invoiceContent',
								title : '发票内容'
							}, {
								align : 'center',
								field : 'invoiceAcount',
								title : '发票金额'
							}, {
								align : 'center',
								field : 'orderId',
								title : '销售订单号'
							}, {
								align : 'center',
								field : 'externalOrderId',
								title : '平台交易号'
							}, {
								align : 'center',
								field : 'place',
								title : '交易平台',
								formatter : function(value, row, index) {
									if (value == '1') {
										return "乐摇网APP";
									} else if (value == '2') {
										return "乐摇网微信商城";
									} else if (value == '3') {
										return "淘宝";
									} else if (value == '4') {
										return "美团外卖";
									} else if (value == '5') {
										return "百度外卖";
									}
								}
							}, {
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
							}, {
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
							}, {
								align : 'center',
								field : 'signInType',
								title : '签收异常分类',
								formatter : function(value, row, index) {
									return signInTypeArr[value];
								}
							}, {
								align : 'center',
								field : 'signInReason',
								title : '异常原因详情'
							}, {
								align : 'center',
								field : 'disposeScheme',
								title : '处理方案'
							}, {
								align : 'center',
								field : 'describes',
								title : '描述'
							}, {
								align : 'center',
								field : 'creatorName',
								title : '创建人'
							}, {
								align : 'center',
								field : 'createTime',
								title : '创建时间'

							}, {
								align : 'center',
								field : 'modifierName',
								title : '修改人'
							}, {
								align : 'center',
								field : 'updateTime',
								title : '修改时间'

							}]
				});
	},
	addOrUpdateDV : function(type) {
		var urlVal = '';

		if (type == 'add') {
			urlVal = dvListManager.URL.addUrl();
		} else if (type == 'edit') {
			urlVal = dvListManager.URL.updateUrl();
		}

		var params = {
			'dispatchVehicleId' : $("#dispatchVehicleId").val(),
			'dispatchStatus' : $('#dispatchStatus').val(),
			'deliveryRecordId' : $('#deliveryRecordId').val(),
			'vehicleId' : $('#vehicleId').val(),
			'vehicleNumber' : $('#vehicleNumber').val(),
			'driver' : $("#driver").val(),
			'driverName' : $('#driverName').val(),
			'driverPhone' : $('#driverPhone').val(),
			'planDepartTime' : $('#planDepartTime').val(),
			'practicalDepartTime' : $('#practicalDepartTime').val(),
			'operatorId' : $('#operatorId').val(),
			'truckLoadingTime' : $('#truckLoadingTime').val(),
			'finishTime' : $('#finishTime').val(),
			'deliveryPrintStatus' : $('#deliveryPrintStatus').val(),
			'surfacePrintStatus' : $('#surfacePrintStatus').val(),
			'describes' : $('#describes').val()
		}

		$.callAjax({
					type : "post",
					url : urlVal,
					data : params,
					success : function(data) {
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							// 填充dialog
							// 显示dialog
							return;
						}
						$.toastrSuccess("修改成功！");
					},
					error : function() {
						$.toastrError();
					}
				});

	},
	// 查询司机列表
	searchDriver : function() {
		$.pageTable({
					tableId : "#driverList",// 需要分页的table ID
					url : dvListManager.URL.driverListUrl(),// 请求后台的URL（*）
					queryParams : queryParamsDriver,
					onLoadSuccess : function() {
						dvListManager.isResetOffset = 0;
						$("#btn_search_driver").removeClass("disabled");
					},
					columns : [{
								checkbox : true
							}, {
								field : 'uniqueKey',
								title : '编码'
							}, {
								align : 'center',
								field : 'cnName',
								title : '中文名'
							}, {
								align : 'center',
								field : 'mobileNo',
								title : '手机号码'
							}]
				});
	},
	/** 分页获取列表* */
	searchCar : function() {
		// 分页组件
		$.pageTable({
					tableId : "#carList",// 需要分页的table ID
					url : dvListManager.URL.carListUrl(),// 请求后台的URL（*）
					queryParams : queryParamsCar,
					onLoadSuccess : function() {
						dvListManager.isResetOffset = 0;
						$("#btn_search_car").removeClass("disabled");
					},
					columns : [{
								checkbox : true
							}, {
								field : 'carId',
								title : '编码'
							}, {
								field : 'carNumber',
								title : '车牌号'
							}, {
								field : 'isTransportLiquid',
								title : '可配送液体',
								align : 'center'
							}, {
								field : 'isTransportFreezing',
								title : '可配送冻品',
								align : 'center'
							}, {
								field : 'isTransportStorage',
								title : '可配送冷藏',
								align : 'center'
							}]
				});
	},
	bindEvent : function() {

		$("#btn_edit_submit").click(function() {
					dvListManager.addOrUpdateDV('edit');
				});
		// 查询司机search_driver
		$("#search_driver").on("click", function() {

					dvListManager.searchDriver();
					$('#driver_save').show();
					$('#driver_save_2').hide();
					$('#driver_save_4').hide();
					$.showModal('#myModal02');
				});
		// btn_search_driver查询
		$("#btn_search_driver").on("click", function() {
					$("#btn_search_driver").addClass("disabled");
					dvListManager.isResetOffset = 1;
					$('#driverList').bootstrapTable('refresh');
				});
		// driver_save保存选择的司机
		$("#driver_save").on("click", function() {
			if ($("#driverList").bootstrapTable('getSelections').length == 1) {
				$.map($("#driverList").bootstrapTable('getSelections'),
						function(row) {
							$('#driver').val(row.id);
							$('#driverName').val(row.cnName);
							$('#driverPhone').val(row.mobileNo);
							$.hideModal('#myModal02');
						});
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		// 查询car search_car
		$("#search_car").on("click", function() {
					dvListManager.searchCar();
					$('#car_save_2').hide();
					$('#car_save').show();
					$('#car_save_4').hide();
					$.showModal('#myModal03');

				});
		// btn_search_car查询
		$("#btn_search_car").on("click", function() {
					$("#btn_search_car").addClass("disabled");
					dvListManager.isResetOffset = 1;
					$('#carList').bootstrapTable('refresh');
				});
		// car_save保存选择的司机
		$("#car_save").on("click", function() {
			if ($("#carList").bootstrapTable('getSelections').length == 1) {
				$.map($("#carList").bootstrapTable('getSelections'), function(
								row) {
							$('#vehicleId').val(row.id);
							$('#vehicleNumber').val(row.carNumber);
							$.hideModal('#myModal03');
						});
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});

	},
	init : function() {
		dvListManager.initDropDownBox();
		dvListManager.waybillInitDropDownBox();
		
	}
}

var queryParamsDVL = function(params) {

	var dispatchVehicleId = $('#dispatchVehicleId').val();

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : dvListManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		dispatchVehicleId : dispatchVehicleId
	};
	return temp;
};
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParamsDriver = function(params) {

	var cnName = $('#name').val();
	var mobileNo = $('#tel').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : dvListManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		occupationId : '40',
		enabled : '1',
		cnName : cnName,
		mobileNo : mobileNo
	};
	return temp;
};
var queryParamsCar = function(params) {
	carNumber = $('#carNumber').val();
	carType = $('#carType').val();
	selfSupport = $('#selfSupport').val();
	isTransportLiquid = document.getElementById('isTransportLiquid').checked
			? 1
			: 0;
	isTransportFreezing = document.getElementById('isTransportFreezing').checked
			? 1
			: 0;
	isTransportStorage = document.getElementById('isTransportStorage').checked
			? 1
			: 0;
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : dvListManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
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
$(document).ready(function() {
			// 1、初始化加载列表数据
			dvListManager.init();
			// 2、初始化绑定增删改查事件
			dvListManager.bindEvent();
		});

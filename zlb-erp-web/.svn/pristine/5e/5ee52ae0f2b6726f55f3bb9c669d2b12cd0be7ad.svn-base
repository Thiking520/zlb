/**
 * 暂停维护  启用dispatchVehicle2.js
 * @type 
 */

var dispatchStatusArr = [];
var carTypeArr = [];
var regionArr = [];
var selfSupportArr = [];

var dvManager = {
	isResetOffset : 0,
	URL : {
		// 条件查询（派车单）
		searchListByPageUrl : function() {
			return '/tms/dispatchVehicle/list';
		},
		// 派车
		addUrl : function() {
			return '/tms/dispatchVehicle/addDispatchVehicle';
		},
		// 派车单详细
		detailsUrl : function() {
			return '/tms/dispatchVehicle/queryDispatchVehicleDetails';
		},
		delUrl : function() {
			return '/tms/dispatchVehicle/deleteDispatchVehicle';
		},// 更新全部
		updateUrl : function() {
			return '/tms/dispatchVehicle/updateDispatchVehicle';
		},// 更新下达时候
		updateUrlByXiada : function() {
			return '/tms/dispatchVehicle/updateDispatchVehicleByXiada';
		},// 更新派车单状态
		updateStatusUrl : function() {
			return '/tms/dispatchVehicle/updateDispatchVehicleStatus';
		},// 更新派车单实际出发时间
		updatePDTUrl : function() {
			return '/tms/dispatchVehicle/updateDispatchVehiclePDT';
		},// 更新派车单装车时间
		updateTLTUrl : function() {
			return '/tms/dispatchVehicle/updateDispatchVehicleTLT';
		},// 更新派车单完成时间
		updateFTUrl : function() {
			return '/tms/dispatchVehicle/updateDispatchVehicleFT';
		},// 司机列表
		driverListUrl : function() {
			return '/tms/emp/list';
		},
		// 车辆列表
		carListUrl : function() {
			return '/publicData/cars/list';
		},// 查看车辆详情的请求地址
		getCarsDetaisUrl : function() {
			return '/publicData/cars/queryCarsDetails';
		},// 查询运单信息
		queryDVList : function() {
			return '/tms/dispatchVehicleList/list';
		},
		queryDVListDetails : function() {
			return '/tms/dispatchVehicleList/queryDispatchVehicleDetails';
		},
		initDropDownBox : function() {
			return '/tms/dispatchVehicle/initDropDownBox';
		},
		carInitDropDownBox : function() {
			return '/publicData/cars/initDropDownBox';
		},// 添加运单
		addCWB : function() {
			return '/tms/dispatchVehicleList/addDispatchVehicleList';
		},
		// 批量打印面单请求url
		waybillBatchPrintUrl : function() {
			return '/tms/dispatchVehicle/print/waybill';
		},// 批量打印派车单请求url
		dispatchVehicleBatchPrintUrl : function() {
			return '/tms/dispatchVehicle/print/dispatchVehicle';
		}
	},

	initDropDownBox : function() {
		$.callAjax({
			type : "post",
			url : dvManager.URL.initDropDownBox(),
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				for (var i = 0; i < data.data.dispatchStatusList.length; i++) {
					dispatchStatusArr[data.data.dispatchStatusList[i].dictValue] = data.data.dispatchStatusList[i].dictDesc;
					$('#dispatchStatus_2').append("<option value='"
							+ data.data.dispatchStatusList[i].dictValue + "'>"
							+ data.data.dispatchStatusList[i].dictDesc
							+ "</option>");
				}
			},
			error : function() {
				$.toastrError();
			}
		});

	},
	carInitDropDownBox : function() {
		$.callAjax({
			type : "post",
			url : dvManager.URL.carInitDropDownBox(),
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
			},
			error : function() {
				$.toastrError();
			}
		});

	},

	/** 分页获取列表* */
	searchListByPage : function() {
		$.pageTable({
			tableId : "#dvManagerTable",
			url : dvManager.URL.searchListByPageUrl(),
			queryParams : queryParams,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				dvManager.isResetOffset = 0;
				$("#btn_search").removeClass("disabled");
			},
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
					},*/ {
						align : 'center',
						field : 'driverName',
						title : '司机',
						formatter : function(value, row, index) {
							return row.driverName + "<br/>" + row.driverPhone;
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
							return dispatchStatusArr[value];
						}
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
					}/*, {
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
					}*/]
		});

	},
	/**
	 * 表单验证
	 */
	validateform : function() {
		// 表单验证start
		$('#xiadaForm').bootstrapValidator({
					message : 'This value is not valid',
					feedbackIcons : {
						valid : 'glyphicon glyphicon-ok',
						invalid : 'glyphicon glyphicon-remove',
						validating : 'glyphicon glyphicon-refresh'
					},
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
					feedbackIcons : {
						valid : 'glyphicon glyphicon-ok',
						invalid : 'glyphicon glyphicon-remove',
						validating : 'glyphicon glyphicon-refresh'
					},
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
					feedbackIcons : {
						valid : 'glyphicon glyphicon-ok',
						invalid : 'glyphicon glyphicon-remove',
						validating : 'glyphicon glyphicon-refresh'
					},
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
					feedbackIcons : {
						valid : 'glyphicon glyphicon-ok',
						invalid : 'glyphicon glyphicon-remove',
						validating : 'glyphicon glyphicon-refresh'
					},
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
	},
	/**
	 * 派车单作废
	 * 
	 * @param {}
	 *            id
	 */
	noUse : function(id) {
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
										url : dvManager.URL.updateStatusUrl(),
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
	},
	/**
	 * 根据车辆信息 查询详情
	 * @param {} id
	 */
	carsDetais : function(id) {
		var params = {
			'id' : id
		};
		$.callAjax({
			url : dvManager.URL.getCarsDetaisUrl(),
			data : params,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				if (data.data == null) {
					$.toastrSuccess('查询结果为空！');
				}
				$("#carType_xd").val(carTypeArr[data.data.carType]);
				$("#region_xd").val(regionArr[data.data.region]);
				$("#selfSupport_xd").val(selfSupportArr[data.data.selfSupport]);
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

			},
			error : function() {
				$.toastrError();
			}
		});
	},
	/**
	 * 装车确认 发运确认 完成确认
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            type
	 */
	updateSimpleTime : function(id, type) {
		var urlVal = "";
		var params = "";
		if (type == "truck") {
			if (((new Date((Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"))))
					.getTime()) <= ((new Date($('#truckLoadingTime01').val())))
					.getTime()) {
				$('#truckTS').text("时间不能大于当前时间！");
				return;
			}
			params = {
				'dispatchVehicleId' : id,
				'truckLoadingTime' : $('#truckLoadingTime01').val(),
				'truckLoadingId' : $('#truckPeopId').val(),
				'dispatchStatus' : '30'
			};
			urlVal = dvManager.URL.updateTLTUrl();
		} else if (type == "delivery") {
			if (((new Date((Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"))))
					.getTime()) <= ((new Date($('#practicalDepartTime01').val())))
					.getTime()) {
				$('#deliveryTS').text("时间不能大于当前时间！");
				return;
			}
			params = {
				'dispatchVehicleId' : id,
				'practicalDepartTime' : $('#practicalDepartTime01').val(),
				'practicalDepartId' : $('#deliveryPeopId').val(),
				'dispatchStatus' : '40'
			};
			urlVal = dvManager.URL.updatePDTUrl();
		} else if (type == "success") {
			if (((new Date((Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"))))
					.getTime()) <= ((new Date($('#finishTime01').val())))
					.getTime()) {
				$('#successTS').text("时间不能大于当前时间！");
				return;
			}
			params = {
				'dispatchVehicleId' : id,
				'finishTime' : $('#finishTime01').val(),
				'finishId' : $('#successPeopId').val(),
				'dispatchStatus' : '99'
			};
			urlVal = dvManager.URL.updateFTUrl();
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
	},
	/**
	 * 改派操作
	 */
	updateByXiada : function() {
		var params = {
			'dispatchVehicleId' : $('#dispatchVehicleId_xd').val(),
			'driver' : $('#driver_xd').val(),
			'driverName' : $('#driverName_xd').val(),
			'vehicleId' : $('#vehicleId_xd').val(),
			'vehicleNumber' : $('#vehicleNumber_xd').val(),
			'describes' : $("#describes_xd").val()
		}
		$.callAjax({
					type : "post",
					url : dvManager.URL.updateUrlByXiada(),
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
	},
	/**
	 * 向已存在的派车单中添加运单
	 */
	addCWB : function() {
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
					url : dvManager.URL.addCWB(),
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
	},
	// 批量打印面单
	waybillBatchPrint : function(dispatchVehicleIds) {
		// 触发Ajax
		var params = "?ids=" + dispatchVehicleIds;
		var contextPath = $("#contextPath").val();

		// 请求打印
		window
				.open(contextPath + dvManager.URL.waybillBatchPrintUrl()
						+ params);

	},
	// 批量打印派车单
	dispatchVehicleBatchPrint : function(dispatchVehicleIds) {
		// 触发Ajax
		var params = "?ids=" + dispatchVehicleIds;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + dvManager.URL.dispatchVehicleBatchPrintUrl()
				+ params);

	},
	bindEvent : function() {
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
			var ids = $.getIdSelections("#dvManagerTable", "dispatchVehicleId");
			if (ids == null || ids == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}
			dvManager.waybillBatchPrint(ids);
		});
		// 打印派车单按钮点击事件
		$("#print2").on("click", function() {
			$("#print1").addClass("disabled");
			var ids = $.getIdSelections("#dvManagerTable", "dispatchVehicleId");
			if (ids == null || ids == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}
			dvManager.dispatchVehicleBatchPrint(ids);
		});

		// 主界面 搜索按钮点击事件
		$("#btn_search").on("click", function() {
					$("#btn_search").addClass("disabled");
					dvManager.isResetOffset = 1;
					$('#dvManagerTable').bootstrapTable('refresh');
				});

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
								$('#myModalLabel01').text('添加分段运单');
								$('#waybillId').val(null);
								$('#waybill').show();
								$('#truck').hide();
								$('#delivery').hide();
								$('#success').hide();
								$.showModal('#myModal01');
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
							if (row.dispatchStatus == 50) {
								var date = new Date();
								$('#truckLoadingTime01').val(Util.dateFormat(
										date, "yyyy-MM-dd HH:mm:ss"));
								$('#myModalLabel01').text('确认装车');
								$('#waybill').hide();
								$('#truck').show();
								$('#delivery').hide();
								$('#success').hide();
								$('#truckTS').text("");
								$.showModal('#myModal01');
							} else {
								$.toastrWarning("目前状态不允许装车操作！");
							}
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
								$('#practicalDepartTime01')
										.val(Util.dateFormat(date,
												"yyyy-MM-dd HH:mm:ss"));
								$('#myModalLabel01').text('确认发运');
								$('#waybill').hide();
								$('#truck').hide();
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
			if ($("#dvManagerTable").bootstrapTable('getSelections').length == 1) {
				$.map($("#dvManagerTable").bootstrapTable('getSelections'),
						function(row) {
							if (row.dispatchStatus == '50'
									|| row.dispatchStatus == '10') {
								dvManager.noUse(row.dispatchVehicleId);
							} else {
								$.toastrWarning("该派车单已经在运作不能进行作废操作！");
							}
						});
			} else {
				$.toastrWarning("请选择一条数据进行编辑！");
			}
		});

		// 装车人 弹出框
		$('#search_truckPeop').click(function() {
					truckerDialog.show();
				});

		// 发运人 弹出框事件
		$('#search_deliveryPeop').click(function() {
					dispatcherDialog.show();
				});

		// 配送人 弹出框事件
		$('#search_successPeop').click(function() {
					deliveryManDialog.show();
				});
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
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						dvManager.updateSimpleTime(row.dispatchVehicleId,
								'truck');
					});
		});
		// 发运确认
		$("#btn_delivery").click(function() {
			var bootstrapValidator = $("#delivery").data('bootstrapValidator');
			bootstrapValidator.validate();
			if (!bootstrapValidator.isValid()) {
				return;
			}
			if ($('#practicalDepartTime01').val() == '') {
				$.toastrWarning("发运时间不能为空");
				return;
			}
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						dvManager.updateSimpleTime(row.dispatchVehicleId,
								'delivery');
					});
		});
		// 完成确认
		$('#btn_success').click(function() {
			var bootstrapValidator = $("#success").data('bootstrapValidator');
			bootstrapValidator.validate();
			if (!bootstrapValidator.isValid()) {
				return;
			}
			if ($('#finishTime01').val() == '') {
				$.toastrWarning("完成时间不能为空");
				return;
			}
			$.map($("#dvManagerTable").bootstrapTable('getSelections'),
					function(row) {
						dvManager.updateSimpleTime(row.dispatchVehicleId,
								'success');
					});
		});

		// 查询条件 司机弹框事件
		$("#search_driver_2").on("click", function() {
					searchDriverDialog.show();
				});

		// 条件查询司机search_driver
		$("#search_car_2").on("click", function() {
					searchVehicleDialog.show();
				});

		// 改派按钮 弹框事件
		$("#btn_is_xiada").on("click", function() {
			if ($("#dvManagerTable").bootstrapTable('getSelections').length == 1) {
				$.map($("#dvManagerTable").bootstrapTable('getSelections'),
						function(row) {

							if (row.dispatchStatus != '10'
									&& row.dispatchStatus != '50') {
								$.toastrWarning("该数据处于运作状态，不能进行改派操作！");
							} else {
								document.getElementById("xiadaForm").reset();
								$('#dispatchVehicleId_xd')
										.val(row.dispatchVehicleId);
								$('#driverName_xd').val(row.driverName);
								$('#driverPhone_xd').val(row.driverPhone);
								$('#vehicleId_xd').val(row.vehicleId);
								$('#vehicleNumber_xd').val(row.vehicleNumber);
								$('#describes_xd').val(row.describes);
								dvManager.carsDetais(row.vehicleId);
							}
						});
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		// 改派确认操作
		$("#xiada_save").on("click", function() {
					$.dialogConfirm({
								message : '您确定要改派吗？',
								callback : function(result) {
									if (result) {
										dvManager.updateByXiada();
									}
								}
							});
				});

		// 改派界面 司机选择弹框事件
		$("#search_driver_xd").on("click", function() {

					driverDialog.show();

				});

		// 改派界面 车辆选择弹框事件
		$("#search_car_xd").on("click", function() {
					vehicleDialog.show();
				});
		// 添加运单确认
		$("#btn_waybillId").on("click", function() {
					dvManager.addCWB();
				});
		// 操作日志
		$("#btn_show_log").on("click", function() {
					var array = $("#dvManagerTable")
							.bootstrapTable('getSelections');
					if (array.length == 1) {
						$('#bill_1').val(array[0].dispatchVehicleId);
						logDialog.show();
					} else {
						$.toastrWarning("请选择一条数据进行操作！");
					}

				});

		// 运单号 去除空格
		$('#waybillId').keyup(function() {
					var waybillId = $('#waybillId')
					var waybillIdval = $.trim(waybillId.val());
					waybillId.val(waybillIdval);
				});

	},
	// 初始化分页查询列表数据 ★★★分页主体列表★★★
	init : function() {
		// 初始化表单验证
	
		dvManager.carInitDropDownBox();
		dvManager.initDropDownBox();
		dvManager.searchListByPage();

		dvManager.validateform();
		// 初始化日期控件
		dateUtils.initDate();
	}

}
// 操作日志弹框
var logDialog = new LogDialog();
// 配送人选择框
var deliveryManDialog = new DriverDialog({
			confirmCallback : function(row) {
				$('#successPeopId').val(row.id);
				$('#successPeop').val(row.cnName).change();
			}
		});

// 发运人选择框
var dispatcherDialog = new DriverDialog({
			confirmCallback : function(row) {
				$('#deliveryPeopId').val(row.id);
				$('#deliveryPeop').val(row.cnName).change();
			}
		});
// 装车人选择框
var truckerDialog = new DriverDialog({
			confirmCallback : function(row) {
				$('#truckPeopId').val(row.id);
				$('#truckPeop').val(row.cnName).change();
			}
		});

// 主界面 司机 选择框
var searchDriverDialog = new DriverDialog({
			confirmCallback : function(row) {
				$('#driver_2').val(row.id);
				$('#driverName_2').val(row.cnName);
			}
		});

// 改派界面 车辆选择框
var searchVehicleDialog = new VehicleDialog({
			confirmCallback : function(row) {
				$('#vehicleNumber_2').val(row.carNumber);
			}
		});
// 改派界面 司机选择框
var driverDialog = new DriverDialog({
			confirmCallback : function(row) {
				$('#driver_xd').val(row.id);
				$('#driverName_xd').val(row.cnName);
				$('#driverPhone_xd').val(row.mobileNo);
			}
		});
// 改派界面 车辆选择框
var vehicleDialog = new VehicleDialog({
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
		$("#carType_xd").val(carTypeArr[data.data.carType]);
		$("#region_xd").val(regionArr[data.data.region]);
		$("#selfSupport_xd").val(selfSupportArr[data.data.selfSupport]);
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
		$.showModal('#myModal04');
	}
});
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {
	var dispatchVehicleId = $('#dispatchVehicleId_2').val();
	var vehicleNumber = $('#vehicleNumber_2').val();
	var driverName = $('#driverName_2').val();
	var dispatchStatus = $('#dispatchStatus_2').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : dvManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		dispatchVehicleId : dispatchVehicleId,
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

$(document).ready(function() {

			// 1、初始化加载列表数据
			dvManager.init();
			// 2、初始化绑定增删改查事件
			dvManager.bindEvent();
		});

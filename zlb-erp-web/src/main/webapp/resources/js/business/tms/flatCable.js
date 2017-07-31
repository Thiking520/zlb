
/**
 * 此文件 暂停维护  启用新的flatCable2.js　文件
 * @type 
 */

var fcStatusArr = [];
var carTypeArr = [];
var regionArr = [];
var selfSupportArr = [];

var childWalbillStatusArr = [];
var signInTypeArr = [];
var walbillStatusArr = [];
var waybillTypeArr = [];


var fcManager = {
	isResetOffset : 0,
	URL : {
		// 分页获取列表请求地址
		searchListByPageUrl : function() {
			return '/tms/flatCable/list';
		},// 查看详情的请求地址
		getFCDetaisUrl : function() {
			return '/tms/flatCable/queryFlatCableDetails';
		},
		// 查看详情的请求地址
		getCarsDetaisUrl : function() {
			return '/publicData/cars/queryCarsDetails';
		},
		// 根据排线单查询
		queryByFlatCableId : function() {
			return '/tms/flatCable/queryByFlatCableId';
		},
		//排线单作废
		updateStatus : function() {
			return '/tms/flatCable/updateFlatCableStatus';
		},
		initDropDownBox : function() {
			return '/tms/flatCable/initDropDownBox';
		},
		initDropDownBoxCar : function() {
			return '/publicData/cars/initDropDownBox';
		},
		waybillInitDropDownBox : function() {
			return '/tms/waybill/initDropDownBox';
		},// 批量打印面单请求url
		waybillBatchPrintUrl : function() {
			return '/tms/flatCable/print/waybill';
		},// 打印拣货单请求url
		flatCableBatchPrintUrl : function() {
			return '/tms/flatCable/print/flatCable';
		}
	},
	initDropDownBox : function() {
		$.callAjax({
			type : "post",
			url : fcManager.URL.initDropDownBox(),
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}

				for (var i = 0; i < data.data.fcStatusList.length; i++) {
					fcStatusArr[data.data.fcStatusList[i].dictValue] = data.data.fcStatusList[i].dictDesc;
					$('#flatCableStatus_3').append("<option value='"
							+ data.data.fcStatusList[i].dictValue + "'>"
							+ data.data.fcStatusList[i].dictDesc + "</option>");
				}
			},
			error : function() {
				$.toastrError();

			}
		});

		$.callAjax({
			type : "post",
			url : fcManager.URL.initDropDownBoxCar(),
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					// 填充dialog
					// 显示dialog
					return;
				}

				for (var i = 0; i < data.data.carTypeList.length; i++) {
					carTypeArr[data.data.carTypeList[i].dictValue] = data.data.carTypeList[i].dictDesc;
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

	/**
	 * 运单列表下拉框
	 */
	waybillInitDropDownBox : function() {
		$.callAjax({
			type : "post",
			url : fcManager.URL.waybillInitDropDownBox(),
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					// 填充dialog
					// 显示dialog
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
			},
			error : function() {
				$.toastrError();
			}
		});
	},

	/** 分页获取列表* */
	searchListByPage : function() {
		// 分页组件
		$.pageTable({
			tableId : "#fcManagerTable",// 需要分页的table ID
			url : fcManager.URL.searchListByPageUrl(),// 请求后台的URL（*）
			queryParams : queryParams,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function() {
				fcManager.isResetOffset = 0;
				$("#btn_search").removeClass("disabled");
				// $.resizeTable("fcManagerTable");
			},
			columns : [{
						radio : true
					}, {
						field : 'disFlatCableId',
						title : '排线编号',
						formatter : function(value, row, index) {
							return '<a class="fcDetail_a" href="javascript:void(0)" key="'
									+ row.flatCableId
									+ '">'
									+ row.disFlatCableId + '</a>';
						},
						events : 'operateEvents'
					}, {
						align : 'center',
						field : 'operatorName',
						title : '运营商'
					}, {
						align : 'center',
						field : 'cableDescribe',
						title : '线路描述'
					}, {
						align : 'center',
						field : 'waybillAmount',
						title : '运单个数'
					}, {
						field : 'orderDetails',
						align : 'center',
						width : 300,
						title : '订单详情'
					}, {
						align : 'center',
						field : 'flatCableStatus',
						title : '排线单状态',
						formatter : function(value, row, index) {
							return fcStatusArr[value];
						}
					}/*, {
						align : 'center',
						field : 'createTime',
						title : '创建时间'
					}, {
						align : 'center',
						field : 'creatorName',
						title : '创建人'
					}, {
						align : 'center',
						field : 'updateTime',
						title : '修改时间'
					}, {
						align : 'center',
						field : 'modifierName',
						title : '修改人'
					}*/]
		});
	},
	/** 分页获取列表* */
	queryByFlatCableId : function() {
		// 分页组件
		$.pageTable({
					tableId : "#dvlistManagerTable2",// 需要分页的table ID
					url : fcManager.URL.queryByFlatCableId(),// 请求后台的URL（*）
					queryParams : queryParamsDVL,
					striped : false,
					setValues : function(row) {
						// 进行你的操作，如弹出新窗口
						$('#childWaybillId_2')
								.text(row.disChildWaybillId == null
										? ''
										: row.disChildWaybillId);
						$('#childWalbillStatus_2')
								.text(childWalbillStatusArr[row.childWalbillStatus]);
						$('#flatCableStatus_2')
								.text((row.flatCableStatus) == '1'
										? '已排线'
										: ((row.flatCableStatus) == '0'
												? '未排线'
												: ''));
						$('#deliverSiteName_2')
								.text(row.deliverSiteName == null
										? ''
										: row.deliverSiteName);
						$('#takeSiteName_2').text(row.takeSiteName == null
								? ''
								: row.takeSiteName);
						$('#operationSiteName_2')
								.text(row.operationSiteName == null
										? ''
										: row.operationSiteName);
						$('#consumerCompany_2')
								.text(row.consumerCompany == null
										? ''
										: row.consumerCompany);
						$('#consumerName_2').text(row.consumerName == null
								? ''
								: row.consumerName);
						$('#consumerEmail_2').text(row.consumerEmail == null
								? ''
								: row.consumerEmail);
						$('#consumerCity_2').text(row.consumerCity == null
								? ''
								: row.consumerCity);
						$('#consumerArea_2').text(row.consumerArea == null
								? ''
								: row.consumerArea);
						$('#consumerStreet_2').text(row.consumerStreet == null
								? ''
								: row.consumerStreet);
						$('#consumerAddress_2')
								.text(row.consumerAddress == null
										? ''
										: row.consumerAddress);
					},
					onLoadSuccess : function(data) {
						fcManager.isResetOffset = 0;

						if (data.rows.length > 0) {
							this.setValues(data.rows[0]);
						}
					},
					onClickRow : function(row, $element) {
						this.setValues(row);
					},
					columns : [{
								align : 'center',
								field : 'disParentWaybillId',
								title : '运单号'
							}, {
								align : 'center',
								field : 'disChildWaybillId',
								title : '分段运单号'
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
							}, {
								align : 'center',
								field : 'waybillStatus',
								title : '运单状态',
								formatter : function(value, row, index) {
									return walbillStatusArr[value];
								}
							}, {
								align : 'center',
								field : 'childWalbillStatus',
								title : '分段运单状态',
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
								title : '从配送点'
							}, {
								align : 'center',
								field : 'takeSiteName',
								title : '至配送点'
							}, {
								align : 'center',
								field : 'consumerCity',
								title : '收件人城市'
							}, {
								align : 'center',
								field : 'consumerArea',
								title : '收件人区/县'
							}, {
								align : 'center',
								field : 'consumerStreet',
								title : '收件人街道'
							}, {
								align : 'center',
								field : 'consumerAddress',
								title : '收件人地址'
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
									if (value == '0') {
										return "未打印";
									} else if (value == '1') {
										return "已打印";
									}
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
								title : '收件人公司'
							}, {
								align : 'center',
								field : 'consumerName',
								title : '收件人姓名'
							}, {
								align : 'center',
								field : 'consumerEmail',
								title : '收件人电子邮箱'
							}, {
								align : 'center',
								field : 'consumerMobile',
								title : '收件人手机'
							}, {
								align : 'center',
								field : 'consumerPhone',
								title : '收件人电话'
							}, {
								align : 'center',
								field : 'consumerCountry',
								title : '收件人国家'
							}, {
								align : 'center',
								field : 'consumerProvince',
								title : '收件人省份'
							}, {
								align : 'center',
								field : 'priority',
								title : '订单优先级'
							}, {
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
								title : '发票类型',
								formatter : function(value, row, index) {
									if (value == '1') {
										return "公司";
									} else if (value == '2') {
										return "个人";
									}
								}
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
	/**
	 * 排线单作废
	 * @param {} id
	 */
	updateStatus : function(id) {
		var params = {
			'flatCableId' : id,
			'flatCableStatus' : 98
		}
		$.dialogConfirm({
					message : '作废后将无法恢复，请您确认真要作废吗？',
					callback : function(result) {
						if (result) {
							$.callAjax({
										type : "post",
										url : fcManager.URL.updateStatus(),
										data : params,
										success : function(data) {
											if (data.code != "0000") {
												$.toastrWarning(data.msg);
												return;
											}
											$('#fcManagerTable')
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
	 * 查看详情或者编辑
	 * 
	 * @param {}
	 *            id
	 */
	getFCDetails : function(id) {
		var params = {
			'flatCableId' : id
		}
		$.callAjax({
					type : "post",
					url : fcManager.URL.getFCDetaisUrl(),
					data : params,
					success : function(data) {
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							return;
						}

						$("#disFlatCableId").val(data.data.disFlatCableId);
						$("#flatCableId").val(data.data.flatCableId);
						$("#flatCableStatus")
								.val(fcStatusArr[data.data.flatCableStatus]);
						$("#cableDescribe").val(data.data.cableDescribe);
						$("#waybillAmount").val(data.data.waybillAmount);
						$("#orderDetails").val(data.data.orderDetails);
						$("#operatorId").val(data.data.operatorId);
						$("#operatorName").val(data.data.operatorName);

						$.showModal('#myModal');
						$('#dvlistManagerTable2').bootstrapTable('refresh');
					},
					error : function() {
						$.toastrError();
					}
				});
	},
	// 根据默认查询条件加载右侧运单信息
	// 批量打印面单
	waybillBatchPrint : function(dispatchVehicleIds) {
		// 触发Ajax
		var params = "?ids=" + dispatchVehicleIds;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window
				.open(contextPath + fcManager.URL.waybillBatchPrintUrl()
						+ params);

	},
	// 批量打印面单
	waybillBatchPrint : function(flatCableIds) {
		// 触发Ajax
		var params = "?ids=" + flatCableIds;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window
				.open(contextPath + fcManager.URL.waybillBatchPrintUrl()
						+ params);

	},
	// 批量打印拣货单
	flatCableBatchPrint : function(flatCableIds) {
		// 触发Ajax
		var params = "?ids=" + flatCableIds;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + fcManager.URL.flatCableBatchPrintUrl()
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
		// 打印面单按钮
		$("#print1").on("click", function() {
					$("#print1").addClass("disabled");
					var ids = $.getIdSelections("#fcManagerTable",
							"flatCableId");
					if (ids == null || ids == '') {
						$.toastrWarning('请先选择记录再操作！');
						return false;
					}
					fcManager.waybillBatchPrint(ids);
				});
		// 打印派车单按钮
		$("#print2").on("click", function() {
					$("#print1").addClass("disabled");
					var ids = $.getIdSelections("#fcManagerTable",
							"flatCableId");
					if (ids == null || ids == '') {
						$.toastrWarning('请先选择记录再操作！');
						return false;
					}
					fcManager.flatCableBatchPrint(ids);
				});
		// btn_search查询
		$("#btn_search").on("click", function() {
					$("#btn_search").addClass("disabled");
					fcManager.isResetOffset = 1;
					$('#fcManagerTable').bootstrapTable('refresh');
				});
		// 查看
		$('#btn_show_look').on("click", function() {
			if ($("#fcManagerTable").bootstrapTable('getSelections').length == 1) {
				$.map($("#fcManagerTable").bootstrapTable('getSelections'),
						function(row) {
							fcManager.getFCDetails(row.flatCableId);
						});
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		// 派车btn_use_car
		$("#btn_use_car").on("click", function() {

			if ($("#fcManagerTable").bootstrapTable('getSelections').length == 1) {
				$.map($("#fcManagerTable").bootstrapTable('getSelections'),
						function(row) {
							if (row.flatCableStatus == 10) {
								dispatchVehicleDialog.show(row);
							} else {
								$.toastrWarning("此排线单状态不是‘未派车’状态，请不要重复操作派车按钮!");
							}
						});
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		$("#btn_is_use").on("click", function() {
			if ($("#fcManagerTable").bootstrapTable('getSelections').length == 1) {
				$.map($("#fcManagerTable").bootstrapTable('getSelections'),
						function(row) {
							if (row.flatCableStatus == 10) {
								fcManager.updateStatus(row.flatCableId);
							} else {
								$
										.toastrWarning("此操作只能在排线单‘未派车’时才能操作，请不要重复操作此按钮！");
							}
						});
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		$("#btn_show_log").on("click", function() {
			if ($("#fcManagerTable").bootstrapTable('getSelections').length == 1) {
				$.map($("#fcManagerTable").bootstrapTable('getSelections'),
						function(row) {
							$('#bill_1').val(row.flatCableId);
							logDialog.show();
						});
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});

	},

	init : function() {
		fcManager.waybillInitDropDownBox();
		fcManager.queryByFlatCableId();
		fcManager.initDropDownBox();
		fcManager.searchListByPage();
	}

}
var dispatchVehicleDialog = new DispatchVehicleDialog();

var logDialog = new LogDialog();

var queryParams = function(params) {
	var flatCableId = $('#flatCableId_2').val();
	var cableDescribe = $('#cableDescribe_2').val();
	var flatCableStatus = $('#flatCableStatus_3').val();

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : fcManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		flatCableId : flatCableId,
		cableDescribe : cableDescribe,
		flatCableStatus : flatCableStatus
	
	};
	return temp;
};
var queryParamsOL1 = function(params) {
	var temp = {
		pageSize : params.limit, // 页面大小
		offset : fcManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		bill : $('#dvLog_id').val(),
		type : '1'
	};
	return temp;
};
var queryParamsDVL = function(params) {
	var flatCableId = $('#flatCableId').val();

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : fcManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		flatCableId : flatCableId
	};
	return temp;
};
// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .fcDetail_a' : function(e, value, row, index) {
		document.getElementById("addAnchorForm").reset();
		// 触发查询商品详情的方法
		fcManager.getFCDetails(row.flatCableId);
	}
};

$(document).ready(function() {
			fcManager.init();
			fcManager.bindEvent();
		});

$("#selectMySite").on("change", function() {
			
			$('#fcManagerTable').bootstrapTable('refresh');
		});

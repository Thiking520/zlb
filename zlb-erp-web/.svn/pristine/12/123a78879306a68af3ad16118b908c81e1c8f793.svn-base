/**
 * 重构 于2017/05/17 
 * 排线单管理 by Tobin
 */
function FlatCable() {
	this.dispatchVehicleDialog = new DispatchVehicleDialog();

	this.logDialog = new LogDialog();

	this.fcStatusArr = [];
	this.carTypeArr = [];
	this.regionArr = [];
	this.selfSupportArr = [];

	this.childWalbillStatusArr = [];
	this.signInTypeArr = [];
	this.walbillStatusArr = [];
	this.waybillTypeArr = [];

	this.isResetOffset = 0;
}
// 分页获取列表请求地址
FlatCable.searchListByPageUrl = "/tms/flatCable/list";
// 查看详情的请求地址
FlatCable.getFCDetaisUrl = "/tms/flatCable/queryFlatCableDetails";
// 查看详情的请求地址
FlatCable.getCarsDetaisUrl = "/publicData/cars/queryCarsDetails";
// 根据排线单查询
FlatCable.queryByFlatCableId = "/tms/flatCable/queryByFlatCableId";
// 排线单作废
FlatCable.invalidFlatCableUrl = "/tms/flatCable/updateFlatCableStatus";

FlatCable.initDropDownBox = "/tms/flatCable/initDropDownBox";
FlatCable.initDropDownBoxCar = "/publicData/cars/initDropDownBox";
FlatCable.waybillInitDropDownBox = "/tms/waybill/initDropDownBox";
// 批量打印面单请求url
FlatCable.waybillBatchPrintUrl = "/tms/flatCable/print/waybill";
// 打印拣货单请求url
FlatCable.flatCableBatchPrintUrl = "/tms/flatCable/print/flatCable";

FlatCable.prototype.queryParams = function(params) {
	var flatCableId = $('#flatCableId_2').val();
	var cableDescribe = $('#cableDescribe_2').val();
	var flatCableStatus = "10";

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : this.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		flatCableId : flatCableId,
		cableDescribe : cableDescribe,
		flatCableStatus : flatCableStatus
	};
	return temp;
};

FlatCable.prototype.queryParamsOL1 = function(params) {
	var temp = {
		pageSize : params.limit, // 页面大小
		offset : this.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		bill : $('#dvLog_id').val(),
		type : '1'
	};
	return temp;
};

FlatCable.prototype.queryParamsDVL = function(params) {
	var flatCableId = $('#flatCableId').val();

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : this.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		flatCableId : flatCableId
	};
	return temp;

}
FlatCable.prototype.init = function() {
	this.waybillInitDropDownBox();
	this.queryByFlatCableId();
	this.initDropDownBox();
	this.searchListByPage();

	this.initVariable();
	this.bindEvent();
}
FlatCable.prototype.initVariable = function() {

}
FlatCable.prototype.bindEvent = function() {
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
	// btn_search查询
	$("#btn_search").on("click", function() {
				$("#btn_search").addClass("disabled");
				this.isResetOffset = 1;
				$('#fcManagerTable').bootstrapTable('refresh');
			}.bind(this));
	

}
FlatCable.prototype.initDropDownBox = function() {
	$.callAjax({
		type : "post",
		url : FlatCable.initDropDownBox,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			for (var i = 0; i < data.data.fcStatusList.length; i++) {
				this.fcStatusArr[data.data.fcStatusList[i].dictValue] = data.data.fcStatusList[i].dictDesc;
			}
		}.bind(this),
		error : function() {
			$.toastrError();

		}
	});

	$.callAjax({
		type : "post",
		url : FlatCable.initDropDownBoxCar,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}

			for (var i = 0; i < data.data.carTypeList.length; i++) {
				this.carTypeArr[data.data.carTypeList[i].dictValue] = data.data.carTypeList[i].dictDesc;
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
/**
 * 运单列表下拉框
 */
FlatCable.prototype.waybillInitDropDownBox = function() {
	$.callAjax({
		type : "post",
		url : FlatCable.waybillInitDropDownBox,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			for (var i = 0; i < data.data.childWalbillStatusList.length; i++) {
				this.childWalbillStatusArr[data.data.childWalbillStatusList[i].dictValue] = data.data.childWalbillStatusList[i].dictDesc;
			}
			for (var i = 0; i < data.data.signInTypeList.length; i++) {
				this.signInTypeArr[data.data.signInTypeList[i].dictValue] = data.data.signInTypeList[i].dictDesc;
			}
			for (var i = 0; i < data.data.walbillStatusList.length; i++) {
				this.walbillStatusArr[data.data.walbillStatusList[i].dictValue] = data.data.walbillStatusList[i].dictDesc;
			}
			for (var i = 0; i < data.data.waybillType.length; i++) {
				this.waybillTypeArr[data.data.waybillType[i].dictValue] = data.data.waybillType[i].dictDesc;
			}
		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});

}
/**
 * 分页查询排线单列表
 */
FlatCable.prototype.searchListByPage = function() {
	$.pageTable({
		tableId : "#fcManagerTable",
		url : FlatCable.searchListByPageUrl,
		queryParams : this.queryParams,
		toolbar : '#toolbar',
		toolbarAlign : 'right',
		onLoadSuccess : function() {
			this.isResetOffset = 0;
			$("#btn_search").removeClass("disabled");
		},
		columns : [{
					radio : true
				}, {
					field : 'disFlatCableId',
					title : '排线编号',
					formatter : function(value, row, index) {
						return row.disFlatCableId;
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
						return this.fcStatusArr[value];
					}.bind(this)
				}, {
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
				}]
	});
}
/**
 * 查看排线单详情
 */
FlatCable.prototype.queryByFlatCableId = function() {
	$.pageTable({
				tableId : "#dvlistManagerTable2",
				url : FlatCable.queryByFlatCableId,
				queryParams : this.queryParamsDVL,
				striped : false,
				setValues : function(row) {
					// 进行你的操作，如弹出新窗口
					$('#childWaybillId_2').text(row.disChildWaybillId == null
							? ''
							: row.disChildWaybillId);
					$('#childWalbillStatus_2')
							.text(this.childWalbillStatusArr[row.childWalbillStatus]);
					$('#flatCableStatus_2').text((row.flatCableStatus) == '1'
							? '已排线'
							: ((row.flatCableStatus) == '0' ? '未排线' : ''));
					$('#deliverSiteName_2').text(row.deliverSiteName == null
							? ''
							: row.deliverSiteName);
					$('#takeSiteName_2').text(row.takeSiteName == null
							? ''
							: row.takeSiteName);
					$('#operationSiteName_2')
							.text(row.operationSiteName == null
									? ''
									: row.operationSiteName);
					$('#consumerCompany_2').text(row.consumerCompany == null
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
					$('#consumerAddress_2').text(row.consumerAddress == null
							? ''
							: row.consumerAddress);
				}.bind(this),
				onLoadSuccess : function(data) {
					this.isResetOffset = 0;

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
								return this.waybillTypeArr[value];
							}.bind(this)
						}, {
							align : 'center',
							field : 'waybillStatus',
							title : '运单状态',
							formatter : function(value, row, index) {
								return this.walbillStatusArr[value];
							}.bind(this)
						}, {
							align : 'center',
							field : 'childWalbillStatus',
							title : '分段运单状态',
							formatter : function(value, row, index) {
								return this.childWalbillStatusArr[value];
							}.bind(this)
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
						}
//						, {
//							align : 'center',
//							field : 'priority',
//							title : '订单优先级'
//						}
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
}




// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .fcDetail_a' : function(e, value, row, index) {
		document.getElementById("addAnchorForm").reset();
		// 触发查询商品详情的方法
		flatCable.getFCDetails(row.flatCableId);
	}
};
var flatCable = null;
$(document).ready(function() {
			flatCable = new FlatCable();
			flatCable.init();
		});

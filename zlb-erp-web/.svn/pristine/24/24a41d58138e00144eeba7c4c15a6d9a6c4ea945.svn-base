//定义下拉框数组
var warehouseTypeList = [ {
	'value' : '10',
	'text' : '总仓'
}, {
	'value' : '20',
	'text' : '微仓'
} ];
var warehouseTypeArr = [];
var commonActiveList = [ {
	'value' : '0',
	'text' : '生效'
}, {
	'value' : '1',
	'text' : '失效'
} ];
var commonActiveArr = [];
var commonActiveAllList = [ {
	'value' : '',
	'text' : '全部'
}, {
	'value' : '0',
	'text' : '生效'
}, {
	'value' : '1',
	'text' : '失效'
} ];
var warehouseTypeArr = [];
var regionArr = [];
var selfSupportArr = [];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var warehouse = {
	// 是否重置分页偏移值0：否，1：是
	isResetOffset : 0,
	// 封装异步请求的所有ajax的URL地址
	URL : {
		// 仓库分页获取列表请求地址
		searchWarehouseListByPageUrl : function() {
			return '/publicData/deliveryRecord/list';
		},
		// 分页获取列表请求地址
		searchListByPageUrl : function() {
			return '/wms/warehouse/list';
		},
		getWarehouseDetaisUrl : function() {
			return '/wms/warehouse/queryWarehouseDetails';
		},// 更新仓库状态
		changeWarehouseStatusUrl : function() {
			return '/wms/warehouse/updateWarehouseStatus';
		},// 更新
		updateWarehouse : function() {
			return '/wms/warehouse/updateWarehouse';
		},// 司机列表
		driverListUrl : function() {
			return '/tms/emp/list';
		},// 省级联动
		getOwnOperatorUrl : function() {
			return '/login/qryManagerOperator';
		},
		addWarehouseUrl : function() {
			return '/wms/warehouse/add';
		},
		getAllWarehouse : function() {
			return '/wms/warehouse/allWarehouse';
		},
		searchWmsHomepageUrl : function() {
			return '/wms/homepageWarehouse';
		}
	},
	/**
	 * 页面下拉框查询
	 */
	initDropDownBox : function() {
		for (var i = 0; i < commonActiveList.length; i++) {
			commonActiveArr[commonActiveList[i].value] = commonActiveList[i].text;
			$('#disabled').append(
					"<option value='" + commonActiveList[i].value + "'>"
							+ commonActiveList[i].text + "</option>");
		}

		for (var i = 0; i < commonActiveAllList.length; i++) {
			$('#carType_c').append(
					"<option value='" + commonActiveAllList[i].value + "'>"
							+ commonActiveAllList[i].text + "</option>");
		}

		for (var i = 0; i < warehouseTypeList.length; i++) {
			warehouseTypeArr[warehouseTypeList[i].value] = warehouseTypeList[i].text;
			$('#warehouseType').append(
					"<option value='" + warehouseTypeList[i].value + "'>"
							+ warehouseTypeList[i].text + "</option>");
		}

	},

	/** 分页获取车辆列表* */
	searchListByPage : function() {
		// 分页组件
		$.pageTable({
					tableId : "#warhouseManagerTable",// 需要分页的table ID
					url : warehouse.URL.searchListByPageUrl(),// 请求后台的URL（*）
					queryParams : queryParams,
					toolbar : '#toolbar',
					toolbarAlign : 'right',
					onLoadSuccess : function() {
						warehouse.isResetOffset = 0;
						$("#btn_search").removeClass("disabled");
					},
					sortable : true,
					sortName : 'created',
					sortOrder : 'desc',
					columns : [
							{
								field : 'warehouseCode',
								title : '仓库编码',
								formatter : function(value, row, index) {
									return '<a class="warehouseDetail" href="javascript:void(0)" warehouseCode="'
											+ row.warehouseCode
											+ '">'
											+ row.warehouseCode + '</a>';
								},
								events : 'operateEvents'
							},
							{
								field : 'warehouseName',
								title : '仓库名称'
							},
							{
								field : 'disabled',
								title : '状态',
								align : 'center',
								formatter : function(value, row, index) {
				    				if(value==0){
										return '生效';
									}else if(value==1){
										return '<span style=\"color:red;\">失效</span>';
									}
								}
							},
							{
								field : 'type',
								title : '类型',
								formatter : function(value, row, index) {
									if (value == 10) {
										return '总仓';
									} else if (value == 20) {
										return '微仓';
									}else if(value == 30){
										return '配送点';
									}
								}
							},
							{
								field : 'detailAddress',
								title : '行政地址',
							},
							{
								field : 'created',
								title : '创建时间',
								align : 'center',
								formatter : function(value, row, index) {
									return warehouse.format(row.created,
											"yyyy-MM-dd HH:mm:ss");
								}
							},
							{
								field : 'modified',
								title : '修改时间',
								align : 'center',
								formatter : function(value, row, index) {
									return warehouse.format(row.modified,
											"yyyy-MM-dd HH:mm:ss");
								}
							},
							{
								field : 'id',
								title : '操作',
								formatter : function(value, row, index) {
									var html = '';
									if (row.disabled == 1) {
										html += '<a class="btn btn-success btn-sm status_a" href="javascript:void(0)" >生效</a>';
									} else {
										html += '<a class="btn btn-warning btn-sm status_a" href="javascript:void(0)" >失效</a>';
									}
									return html;
								},
								events : 'operateEvents'
							} ]
				});
	},
	/** 分页获取上级站点列表* */
	searchListByPageSJ : function() {
		// 分页组件
		$.pageTable({
			tableId : "#superiorList",// 需要分页的table ID
			url : warehouse.URL.searchWarehouseListByPageUrl(),// 请求后台的URL（*）
			queryParams : queryParamsSJ,
			onLoadSuccess : function() {
				warehouse.isResetOffset = 0;
				$("#btn_search_s").removeClass("disabled");
			},
			columns : [ {
				radio : true
			}, {
				field : 'code',
				title : '编码'
			}, {
				field : 'name',
				title : '名称',
				align : 'center'
			} ]
		});
	},
	// 查询负责列表
	searchEmp : function() {
		$.pageTable({
			tableId : "#empList",// 需要分页的table ID
			url : warehouse.URL.driverListUrl(),// 请求后台的URL（*）
			queryParams : queryParamsEmp,
			onLoadSuccess : function() {
				warehouse.isResetOffset = 0;
				$("#btn_search_emp").removeClass("disabled");
			},
			columns : [ {
				radio : true
			}, {
				field : 'uniqueKey',
				title : 'key值'
			}, {
				align : 'center',
				field : 'cnName',
				title : '中文名'
			}, {
				align : 'center',
				field : 'mobileNo',
				title : '手机号码'
			} ]
		});
	},
	// 查询仓库列表
	searchWarehouse : function() {
		$.pageTable({
			tableId : "#warehouseList",// 需要分页的table ID
			url : warehouse.URL.searchWmsHomepageUrl(),// 请求后台的URL（*）
			queryParams : queryParamsWarehouse,
			onLoadSuccess : function(data) {
				warehouse.isResetOffset = 0;
				$("#btn_search_warehouse").removeClass("disabled");
			},
			columns : [ {
				radio : true
			}, {
				field : 'code',
				title : '仓库编码'
			}, {
				field : 'name',
				title : '仓库名称'
			} ]
		});
	},
	/** 删：删除* */
	deleteCars : function(carsId) {
		$.dialogConfirm({
			message : '您确定要删除商品ID为[' + carsId + ']的商品吗?',
			callback : function(result) {
				if (result) {
					var params = {
						"id" : carsId
					};
					$.callAjax({
						url : warehouse.URL.deleteUrl(),
						data : params,
						async: false,
						success : function(data) {
							if (data.code != "0000") {
								$.toastrWarning(data.msg);
								return;
							}
							$('#warehouseTable').bootstrapTable('refresh');
							$.toastrSuccess('删除成功！');
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
	 * 改变仓库状态
	 */
	changeCarsStatus : function(id, enabled) {
		var params = {
			"id" : id,
			"enabled" : enabled
		}
		$.callAjax({
			type : "post",
			url : warehouse.URL.changeCarStatusUrl(),
			data : params,
			async: false,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					// 填充dialog
					// 显示dialog
					return;
				}
				$('#warehouseTable').bootstrapTable('refresh');
				$.toastrSuccess('操作成功！');
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
				case 'yyyy':
					return tf(t.getFullYear());
					break;
				case 'MM':
					return tf(t.getMonth() + 1);
					break;
				case 'mm':
					return tf(t.getMinutes());
					break;
				case 'dd':
					return tf(t.getDate());
					break;
				case 'HH':
					return tf(t.getHours());
					break;
				case 'ss':
					return tf(t.getSeconds());
					break;
				}
				;
			}));
		}
		return null;
	},
	/** 编辑，查看详情* */
	getWarehouseDetais : function(id, type) {
		// 触发Ajax
		var params = {
			'id' : id
		};
		$.callAjax({
			type : "post",
			url : warehouse.URL.getWarehouseDetaisUrl(),
			data : params,
			async: false,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				if (data.data == null) {
					$.toastrSuccess('查询结果为空！');
				}
				$("#operatorCode").val(data.data.operatCode);

				$("#operatorName").val(myMain.selfCompanyName);

				$("#operatCode").val(data.data.operatCode);

				$("#warehouseCodeAdd").val(data.data.warehouseCode);

				$("#warehouseNameAdd").val(data.data.warehouseName);

				$("#warehouseType").val(data.data.type);

				$("#disabled option[value='" + data.data.disabled + "']").attr(
						"selected", true);
				if (data.data.disabled == true) {
					$("#disabled").val(1);
				} else {
					$("#disabled").val(0);
				}

				$("#contact").val(data.data.contact);

				$("#areaSize").val(data.data.area);

				$("#detailAddres").val(data.data.detailAddress);

				$("#descrip").val(data.data.descrip);

				$("#parentCode").val(data.data.parentCode);

				$("#superior").val(data.data.parentName);

				$("#deliveryHeadId").val(data.data.admCode);

				$("#deliveryHead").val(data.data.adm);

				$("#describes").val(data.data.describes);

				if (type == "look") {
					$("#myModalLabel").text("查看仓库详情");
					$("#btn_save_submit").hide();
					$("#btn_edit_submit").hide();
					warehouse.disableForm('addAnchorForm', true);
					$('#fromSousuo').hide();
				} else if (type == "edit") {
					$("#myModalLabel").text("编辑仓库");
					$("#btn_edit_submit").show();
					$("#btn_save_submit").hide();
					$('#warehouseType').attr("disabled", true);
					warehouse.disableForm('addAnchorForm', false);
					$('#operatorName').attr("disabled", true);
					$('#warehouseCodeAdd').attr("disabled", true);
					$('#warehouseNameAdd').attr("disabled", true);
					$('#fromSousuo').show();
				}
				
				//禁用
				$("#fromSouSuo01").css("cursor","not-allowed");
				$("#fromSouSuo01").css("background-color","#eee");
				//点击失效
				$("#search_warehouse").unbind("click");	
				
				//禁用
				$("#fromSouSuo02").css("cursor","not-allowed");
				$("#fromSouSuo02").css("background-color","#eee");
				//点击失效
				$("#search_deliveryHead").unbind("click");
				
				$.showModal('#myModal');
			},
			error : function() {
				$.toastrError();
			}
		});

	},
	/**
	 * 失效表单里面的控件
	 * 
	 * @param formId
	 * @param isDisabled
	 */
	disableForm : function(formId, isDisabled) {
		var attr = "disable";
		if (!isDisabled) {
			attr = "enable";
		}
		$("form[id='" + formId + "'] :text").attr("disabled", isDisabled);
		$("form[id='" + formId + "'] textarea").attr("disabled", isDisabled);
		$("form[id='" + formId + "'] select").attr("disabled", isDisabled);
		$("form[id='" + formId + "'] :radio").attr("disabled", isDisabled);
		$("form[id='" + formId + "'] :checkbox").attr("disabled", isDisabled);
	},

	// 添加或修改
	addOrUpdate : function(type) {
		var urlValue;
		if (type == "add") {
			urlValue = warehouse.URL.addWarehouseUrl();
		}
		if (type == "update") {
			urlValue = warehouse.URL.updateWarehouse();
		}

		var params = {
			'id' : $("#rowId").val(),
			'warehouseCode' : $('#warehouseCodeAdd').val(),
			'warehouseName' : $('#warehouseNameAdd').val(),
			'typeName' : $('#warehouseType option:selected').text(),
			'type' : $('#warehouseType').val(),
			'disabled' : $("#disabled").val(),
			'parentCode' : $('#parentCode').val(),
			'parentName' : $('#superior').val(),
			'admCode' : $('#deliveryHeadId').val(),
			'adm' : $('#deliveryHead').val(),
			'contact' : $('#contact').val(),
			'area' : $('#areaSize').val(),
			'detailAddress' : $('#detailAddres').val(),
			'descrip' : $('#descrip').val(),
		}

		$.callAjax({
			type : "post",
			url : urlValue,
			data : params,
			async: false,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					// 填充dialog
					// 显示dialog
					return;
				}
				$.hideModal('#myModal');
				$('#warhouseManagerTable').bootstrapTable('refresh');
			},
			error : function() {
				$.toastrError();
			}
		});

	},
	// 表单检验
	validateform : function() {
		// 表单验证start
		$('#addAnchorForm').bootstrapValidator({
			message : 'This value is not valid',
			feedbackIcons : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			fields : {
				warehouseCodeAdd : {
					validators : {
						notEmpty : {
							message : '仓库编码不能为空！'
						},
					}
				},
				warehouseNameAdd : {
					validators : {
						notEmpty : {
							message : '仓库名称不能为空！'
						},
					}
				},
				operatCode : {
					validators : {
						notEmpty : {
							message : '运营商不能为空！'
						},
					}
				},
				type : {
					validators : {
						notEmpty : {
							message : '类型不能为空！'
						},
					}
				},
				operatorId : {
					validators : {
						notEmpty : {
							message : '运营商不能为空！'
						},
					}
				},
				contact : {
					validators : {
						notEmpty : {
							message : '联系电话不能为空！'
						},
					}
				},
				detailAddres : {
					validators : {
						notEmpty : {
							message : '详细地址不能为空！'
						},
					}
				}
			},
			excluded : [ ':disabled' ]
		});
		// 表单验证end
	},// 查询区域
	searchDriver : function() {
		$.pageTable({
			tableId : "#driverList",// 需要分页的table ID
			url : warehouse.URL.driverListUrl(),// 请求后台的URL（*）
			queryParams : queryParamsDriver,
			onLoadSuccess : function() {
				warehouse.isResetOffset = 0;
				$("#btn_search_driver").removeClass("disabled");
			},
			columns : [ {
				radio : true
			}, {
				align : 'center',
				field : 'cnName',
				title : '中文名'
			}, {
				align : 'center',
				field : 'mobileNo',
				title : '手机号码'
			} ]
		});
	},
	/**
	 * 修改库区状态
	 */
	modifyStatus : function(roleId, disabled) {
		var params = {
			"id" : roleId,
			"disabled" : disabled
		};

		$.callAjax({
			type : "post",
			url : warehouse.URL.changeWarehouseStatusUrl(),
			data : params,
			async: false,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				$('#warhouseManagerTable').bootstrapTable('refresh');
			},
			error : function() {
				$.toastrError();
			}
		});
	},
	bindEvent : function() {
		// 绑定条件查询按钮事件
		$("#btn_search").on("click", function() {
			// $("#btn_search").addClass("disabled");
			// warehouse.isResetOffset = 1;
			$('#warhouseManagerTable').bootstrapTable('refresh');
		});

		// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
			document.getElementById("addAnchorForm").reset();
			$('#addAnchorForm').data('bootstrapValidator').resetForm();
			warehouse.disableForm('addAnchorForm', false);
			$("#myModalLabel").text("新增仓库");
			$("#btn_save_submit").show();
			$("#btn_edit_submit").hide();
			$("#operatorName").val(myMain.selfCompanyName);
			$.showModal('#myModal');
		});

		// 绑定键盘事件
		$("#searchContent").keydown(function(event) {
			if (event.keyCode == 13) {
				$("#btn_search").addClass("disabled");
				warehouse.isResetOffset = 1;
				$('#warehouseTable').bootstrapTable('refresh');
			}
		});

		// 提交
		$("#btn_save_submit").click(
				function() {
					var bootstrapValidator = $("#addAnchorForm").data(
							'bootstrapValidator');
					bootstrapValidator.validate();
					if (bootstrapValidator.isValid())
						warehouse.addOrUpdate('add');
					else
						return;
				});
		// 更新
		$("#btn_edit_submit").click(
				function() {
					var bootstrapValidator = $("#addAnchorForm").data(
							'bootstrapValidator');
					bootstrapValidator.validate();
					if (bootstrapValidator.isValid())
						warehouse.addOrUpdate('update');
					else
						return;
				});
		// 查询司机search_driver
		$("#search_driver").on("click", function() {
			warehouse.searchDriver();
			$('#driver_save').show();
			$('#driver_save_c').hide();
			$('#driverList').bootstrapTable('refresh');
			$.showModal('#myModal02');
		});

		// btn_search_driver查询
		$("#btn_search_driver").on("click", function() {
			$("#btn_search_driver").addClass("disabled");
			warehouse.isResetOffset = 1;
			document.getElementById("fromModal02").reset();
			$('#driverList').bootstrapTable('refresh');
		});
		$("#btn_show_deiver_c").on("click", function() {
			warehouse.searchDriver();
			$('#driver_save').hide();
			$('#driver_save_c').show();
			document.getElementById("fromModal02").reset();
			$('#driverList').bootstrapTable('refresh');
			$.showModal('#myModal02');
		});
		// driver_save保存选择的司机
		$("#driver_save")
				.on(
						"click",
						function() {
							if ($("#driverList")
									.bootstrapTable('getSelections').length == 1) {
								$.map($("#driverList").bootstrapTable(
										'getSelections'), function(row) {
									$('#driver').val(row.id);
									$('#driverName').val(row.cnName);
									// $('#driverPhone').val(row.mobileNo);
									$.hideModal('#myModal02');
								});
							} else {
								$.toastrWarning("请选择一条数据进行操作！");
							}
						});
		$("#driver_save_c")
				.on(
						"click",
						function() {
							if ($("#driverList")
									.bootstrapTable('getSelections').length == 1) {
								$.map($("#driverList").bootstrapTable(
										'getSelections'), function(row) {
									$('#driver_c').val(row.id);
									$('#driverName_c').val(row.cnName);
									$.hideModal('#myModal02');
								});
							} else {
								$.toastrWarning("请选择一条数据进行操作！");
							}
						});

		$("#btn_clean").on("click", function() {
			$.clearForm("fromModal01");
		});
	},

	// 初始化分页查询列表数据 ★★★分页主体列表★★★
	init : function() {
		warehouse.initDropDownBox();

		warehouse.validateform();
		warehouse.searchListByPage();
	}
}

// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParamsDriver = function(params) {

	var cnName = $('#name').val();
	var mobileNo = $('#tel').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : warehouse.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
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
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {
	// 自定义查询参数,仓库编码、仓库、名称
	var warehouseCode = $('#warehouseCode').val();
	var warehouseName = $('#warehouseName').val();
	var disabled = $('#carType_c').val();
	// var disabled=$('#disabled option:selected').val();
	// 时间区间
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : warehouse.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		warehouseName : warehouseName,
		warehouseCode : warehouseCode,
		disabled : disabled,
	};
	return temp;
};

var queryParamsSJ = function(params) {
	// 自定义查询参数,昵称、公司名
	var code = $('#code_2').val();
	var name = $('#name_2').val();
	var enabled = '1';
	var deliveryType = null;

	// 时间区间
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : warehouse.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		code : code,
		name : name,
		enabled : enabled,
	};
	return temp;
};

var queryParamsWarehouse = function(params) {
	var name = $('#warehouse_name_sea').val();
	var code = $('#warehouse_code_sea').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : warehouse.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		occupationId : null,
		name : name,
		code : code
	};
	return temp;
};

var queryParamsEmp = function(params) {

	var cnName = $('#name_emp').val();
	var mobileNo = $('#tel_emp').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : warehouse.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		status : 2,// 状态
		sort : params.sort,
		order : params.order,
		occupationId : null,
		enabled : '1',
		cnName : cnName,
		mobileNo : mobileNo
	};
	return temp;
};
 
// 负责人
$("#search_deliveryHead").click(function() {
	warehouse.searchEmp();
	document.getElementById("empForm").reset();
	$('#empList').bootstrapTable('refresh');
	$.showModal('#myModal03');
});

$("#btn_search_emp").click(function() {
	$('#empList').bootstrapTable('refresh');
});

$("#emp_save").click(function() {

	if ($("#empList").bootstrapTable('getSelections').length == 1) {
		$.map($("#empList").bootstrapTable('getSelections'), function(row) {
			$('#deliveryHeadId').val(row.id);
			$('#deliveryHead').val(row.cnName);
			$('#contact').val(row.emergentMobileNo);
			$("#deliveryHead").trigger("input");
			$("#contact").trigger("input");
			$.hideModal('#myModal03');
		});
	} else {
		$.toastrWarning("请选择一条数据进行操作！");
	}

});

function disClick() {
	alert("1");
}
// 查询仓库
$("#search_warehouse").click(function() {
	warehouse.searchWarehouse();
	document.getElementById("warehouseForm").reset();
	$('#warehouseList').bootstrapTable('refresh');
	$.showModal('#myModal04')
});

$("#btn_search_warehouse").click(function() {
	$('#warehouseList').bootstrapTable('refresh');
});

$("#warehouse_save")
		.click(
				function() {

					if ($("#warehouseList").bootstrapTable('getSelections').length == 1) {
						$.map($("#warehouseList").bootstrapTable(
								'getSelections'), function(row) {
							$('#warehouseCodeAdd').val(row.code);
							$('#warehouseNameAdd').val(row.name);
							$("#warehouseCodeAdd").trigger("input");
							$("#warehouseNameAdd").trigger("input");
							$.hideModal('#myModal04');
						});
					} else {
						$.toastrWarning("请选择一条数据进行操作！");
					}

				});

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .warehouseDetail' : function(e, value, row, index) {
		document.getElementById("addAnchorForm").reset();
		$('#addAnchorForm').bootstrapValidator('resetForm', true);
		// 触发查询详情的方法
		warehouse.getWarehouseDetais(row.id, 'look');
	},
	// 删除
	'click .delete_warehouse' : function(e, value, row, index) {
		$.toastrSuccess('删除暂不做处理');
	},
	// 修改仓库区状态
	'click .status_a' : function(e, value, row, index) {
		warehouse.modifyStatus(row.id, row.disabled);
	},
	// 编辑
	'click .edit_warehouse' : function(e, value, row, index) {
		document.getElementById("addAnchorForm").reset();
		$('#addAnchorForm').bootstrapValidator('resetForm', true);
		$("#rowId").val(row.id);
		warehouse.getWarehouseDetais(row.id, 'edit');

	}

};

$(document).ready(function() {

	// 1、初始化加载列表数据
	warehouse.init();
	// 2、初始化绑定增删改查事件
	warehouse.bindEvent();
});
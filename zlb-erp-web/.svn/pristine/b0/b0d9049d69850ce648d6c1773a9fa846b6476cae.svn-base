/**
 * 调度管理 by Tobin 重构于 2017/05/19
 */
function WaybillManage() {
	// 当前指定站点所处城市名称
	this.curCityName = "";
	// 当前指定站点所处城市id
	this.curCityId = "";
	// 百度地图API功能
	this.map = {};
	// 行政区域数据
	this.areas = new Array();
	// 地图上显示的所有运单信息
	this.allWaybills = null;
	// 主运单列表 数据集
	this.mainWayBillList = new Array();
	// 右键选择的运单
	this.rightKeyWayBillList = new Array();

	this.isResetOffset = 0;

	// 地图上小圆点大小
	this.circleSize = 120;
	// 地图上大圆点大小
	this.bigCircleSize = 200;

	// 新建派车单弹出框
	this.dispatchVehicleDialog = new DispatchVehicleDialog();
	// 司机弹出框
	this.driverDialog1 = new DriverDialog({
		// 确认按钮 点击事件的回调函数
		confirmCallback : function(row) {
			$('#driver_xd_1').val(row.id);
			$('#driverName_xd_1').val(row.cnName);
			$('#driverPhone_xd_1').val(row.mobileNo);
		}
	});
	// 日志弹出框
	this.logDialog = new LogDialog();
	// 物流信息弹出框
	this.logisticsDialog = new LogisticsDialog();

	// 车辆弹出框
	this.vehicleDialog1 = new VehicleDialog(
			{
				confirmCallback : function(row) {
					$('#vehicleId_xd_1').val(row.id);
					$('#vehicleNumber_xd_1').val(row.carNumber);
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
					$("#carType_xd_1 option[value='" + data.data.carType + "']")
							.attr("selected", true);
					$("#region_xd_1 option[value='" + data.data.region + "']")
							.attr("selected", true);
					$(
							"#selfSupport_xd_1 option[value='"
									+ data.data.selfSupport + "']").attr(
							"selected", true);
					$("#length_xd_1").val(data.data.length);
					$("#width_xd_1").val(data.data.width);
					$("#high_xd_1").val(data.data.high);
					var checkElements = document
							.getElementsByName('isTransportLiquid_xd_1');
					for (var i = 0; i < checkElements.length; i++) {
						var checkElement = checkElements[i];
						if (data.data.isTransportLiquid == 1) {
							checkElement.checked = "checked";
						} else {
							checkElement.checked = "";
						}
					}

					var checkElements = document
							.getElementsByName('isTransportFreezing_xd_1');
					for (var i = 0; i < checkElements.length; i++) {
						var checkElement = checkElements[i];
						if (data.data.isTransportFreezing == 1) {
							checkElement.checked = "checked";
						} else {
							checkElement.checked = "";
						}
					}

					var checkElements = document
							.getElementsByName('isTransportStorage_xd_1');
					for (var i = 0; i < checkElements.length; i++) {
						var checkElement = checkElements[i];
						if (data.data.isTransportStorage == 1) {
							checkElement.checked = "checked";
						} else {
							checkElement.checked = "";
						}
					}

					// $("#carDescribes_xd").val(data.data.describes);

				}
			});
}
// 1 根据条件查询 2根据排线单查询
WaybillManage.queryType = "1";

//当前选中的运单对象
WaybillManage.waybill = {};

// 根据区域查询运单汇总信息
WaybillManage.queryWayBillInfoByAreaNameUrl = "/tms/waybill/info/areaName";
// 根据城市查询运单汇总信息
WaybillManage.queryWayBillInfoByCityNameUrl = "/tms/waybill/info/cityName";
// 根据条件查询运单列表
WaybillManage.prototype.wayBillListUrl = function() {
	if (WaybillManage.queryType == '1') {
		return '/tms/waybill/list';
	} else {
		return '/tms/waybill/queryWayBillListByFlatCableId';
	}
}
// 根据条件查询运单列表 地图上无分页查询
WaybillManage.prototype.wayBillListNoPageUrl = function() {
	if (WaybillManage.queryType == '1') {
		return '/tms/waybill/list/nopage';
	} else {
		return '/tms/waybill/queryWayBillListByFlatCableId/nopage';
	}
}
// 更新状态 这里作废业务有用到
WaybillManage.updateStatus = "/tms/flatCable/updateFlatCableStatus";
// 今日排线
WaybillManage.flatCableListTodayUrl = "/tms/flatCable/listToday";
// 新增排线单
WaybillManage.addFlatCableUrl = "/tms/flatCable/addFlatCable";
// 查询行政区域列表数据
WaybillManage.quereAreaUrl = "/publicData/baseArea/quereArea";
// 添加到已有的排线单
WaybillManage.addToExistFlatCableUrl = "/tms/flatCable/addToExistFlatCable";
// 新增排线单并创建派车单
WaybillManage.addFlatCableAndDispatchVehicleUrl = "/tms/flatCable/addFlatCableAndDispatchVehicle";
// 运单添加到派车单
WaybillManage.addDVList = "/tms/dispatchVehicleList/addDispatchVehicleList";
// 揽收
WaybillManage.pickUpdate = "/tms/waybill/updateWayBillListPick";
// 签收
WaybillManage.signUpdate = "/tms/waybill/updateWayBillListSign";
// 今日排线打印面单请求url
WaybillManage.waybillPrintUrl = "/tms/flatCable/print/waybill";
// 今日排线打印拣货单请求url
WaybillManage.flatCablePrintUrl = "/tms/flatCable/print/flatCable";
// 今日排线打印派车单请求url
WaybillManage.dispatchVehiclePrintUrl = "/tms/flatCable/print/dispatchVehicle";
// 批量打印面单请求url
WaybillManage.waybillBatchPrintUrl = "/tms/waybill/print/waybill";
// 查询当前选择的站点
WaybillManage.queryCurrSite = "/tms/distributionSite/getCurrSite";
/**
 * 批量打印面单
 * 
 * @param {}
 *            dispatchVehicleIds
 */
WaybillManage.prototype.waybillBatchPrint = function(dispatchVehicleIds) {
	// 触发Ajax
	var params = "?ids=" + dispatchVehicleIds;
	var contextPath = $("#contextPath").val();
	// 请求打印
	window.open(contextPath + WaybillManage.waybillBatchPrintUrl + params);
}

/**
 * 正常签收表单校验
 */
WaybillManage.prototype.validateform1 = function() {
	// 表单验证start
	$("#signForm1").bootstrapValidator({
		message : 'This value is not valid',
		fields : {
			signId : {
				validators : {
					notEmpty : {
						message : '签收人不能为空'
					},
					stringLength : {
						max : '20',
						message : '最多20个字符'
					}
				}
			},
			signTime : {
				validators : {
					notEmpty : {
						message : '签收时间不能为空'
					}
				}
			},
		}
	});
	// 表单验证end
}

/**
 * 异常签收表单校验
 */
WaybillManage.prototype.validateform2 = function() {
	// 表单验证start
	$("#signForm2").bootstrapValidator({
		message : 'This value is not valid',
		fields : {
			signId_2 : {
				validators : {
					notEmpty : {
						message : '签收人不能为空'
					},
					stringLength : {
						max : '20',
						message : '最多20个字符'
					}
				}
			},
			signTime : {
				validators : {
					notEmpty : {
						message : '签收时间不能为空'
					}
				}
			},
			signInType_2 : {
				validators : {
					notEmpty : {
						message : '异常分类不能为空'
					}
				}
			},
			signInReason_2 : {
				validators : {
					notEmpty : {
						message : '异常签收原因不能为空'
					},
					stringLength : {
						max : '200',
						message : '最多200个字符'
					}
				}
			}
		}
	});
	// 表单验证end
}
/**
 * 生成排线单
 */
WaybillManage.prototype.addFlatCable = function() {

	if ($('#cableDescribe').val().length == 0) {
		$.toastrWarning("请填写线路描述");
		return;
	}

	var flatCableListVos = new Array();
	var selects = $("#mainWayBillList").bootstrapTable('getSelections');

	for (var i = 0, len = selects.length; i < len; i++) {
		flatCableListVos[i] = {
			'childWaybillId' : selects[i].childWaybillId
		};
	}
	var params = {
		'cableDescribe' : $('#cableDescribe').val(),
		'orderDetails' : "运单总数：" + $('#waybill_count_create_flatcable').text()
				+ "  大约总重量(千克)：" + $('#weight_total_create_flatcable').text()
				+ "  货品总数：" + $('#goods_count_create_flatcable').text()
				+ "  配送分类：" + $('#send_mode_create_flatcable').text()
				+ "  件型分类：" + $('#size_type_create_flatcable').text(),
		'flatCableId' : $('#flatCableId').val(),
		'flatCableListVos' : flatCableListVos
	}
	// return;
	$.callAjax({
		type : "post",
		url : WaybillManage.addFlatCableUrl,
		data : params,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			$.hideModal('#addFlatCableModal');
			// 刷新运单列表数据
			$('#mainWayBillList').bootstrapTable('refresh');
			// 刷新今日排线
			$("#flatCableList").bootstrapTable('refresh');

			$.toastrSuccess('创建路线成功！');
			$.clearForm("flatCableForm");
		},
		error : function() {
			$.toastrError();
		}
	});
}
/**
 * 创建排线单并生成派车单
 */
WaybillManage.prototype.addFlatCableAndDispatchVehicle = function() {
	if ($('#cableDescribe').val().length == 0) {
		$.toastrWarning("请填写线路描述");
		return;
	}
	
	if ($('#describes').val().length == 0) {
		$.toastrWarning("请填写派车描述");
		return;
	}
	
	if ($('#driver_xd_1').val().length == 0) {
		$.toastrWarning("请选择司机");
		return;
	}
	if ($('#driverPhone_xd_1').val().length == 0) {
		$.toastrWarning("请填写司机联系电话");
		return;
	}
	if ($('#vehicleNumber_xd_1').val().length == 0) {
		$.toastrWarning("请选择车辆");
		return;
	}
	var flatCableListVos = new Array();
	// 获取右侧运单表格所选运单数据
	var selects = $("#mainWayBillList").bootstrapTable('getSelections');
	for (var i = 0, len = selects.length; i < len; i++) {
		flatCableListVos[i] = {
			'childWaybillId' : selects[i].childWaybillId
		};
	}
	var params = {
		'flatCableVo' : {
			'cableDescribe' : $('#cableDescribe').val(),
			'orderDetails' : "运单总数："
					+ $('#waybill_count_create_flatcable').val()
					+ "  大约总重量(千克)："
					+ $('#weight_total_create_flatcable').val() + "  货品总数："
					+ $('#goods_count_create_flatcable').val() + "  配送分类："
					+ $('#send_mode_create_flatcable').val() + "  件型分类："
					+ $('#size_type_create_flatcable').val(),
			'flatCableId' : $('#flatCableId').val(),
			'flatCableListVos' : flatCableListVos
		},
		'dispatchVehicleVo' : {
			'driver' : $('#driver_xd_1').val(),
			'driverName' : $('#driverName_xd_1').val(),
			'driverPhone' : $('#driverPhone_xd_1').val(),
			'vehicleId' : $('#vehicleId_xd_1').val(),
			'vehicleNumber' : $('#vehicleNumber_xd_1').val()

		}
	}
	$.callAjax({
		type : "post",
		url : WaybillManage.addFlatCableAndDispatchVehicleUrl,
		data : params,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			$.hideModal('#addFlatCableModal');
			// 刷新运单列表数据
			$('#mainWayBillList').bootstrapTable('refresh');
			// 刷新今日排线
			$("#flatCableList").bootstrapTable('refresh');

			$.toastrSuccess('创建路线并派车成功！');
			$.clearForm("flatCableForm");
		},
		error : function() {
			$.toastrError();
		}
	});
}
/**
 * 添加到已有的排线单
 */
WaybillManage.prototype.addToExistFlatCable1 = function() {

	if ($('#flatCableId_1').val() == "") {
		$.toastrWarning("请填写线路编号");
		return;
	}
	var flatCableListVos = new Array();
	var selects = $("#rightWayBillList").bootstrapTable('getSelections');
	for (var i = 0, len = selects.length; i < len; i++) {
		flatCableListVos[i] = {
			'childWaybillId' : selects[i].childWaybillId
		};
	}

	var params = {
		'flatCableId' : $('#flatCableId_1').val(),
		'flatCableListVos' : flatCableListVos
	}
	$.callAjax({
		type : "post",
		url : WaybillManage.addToExistFlatCableUrl,
		data : params,
		success : function(data) {

			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			$.toastrSuccess('操作成功！');
			$('#mainWayBillList').bootstrapTable('refresh');
			$.hideModal('#myModal5');
		},
		error : function() {
			$.toastrError();
		}
	});

}
/**
 * 添加到已有的排线单
 */
WaybillManage.prototype.addToExistFlatCable2 = function() {

	if ($('#flatCableId_2').val() == "") {
		$.toastrWarning("请填写线路编号");
		return;
	}
	var flatCableListVos = new Array();

	flatCableListVos.push(this.rightKeyWayBillList[0])

	var params = {
		'flatCableId' : $('#flatCableId_2').val(),
		'flatCableListVos' : flatCableListVos
	}
	$.callAjax({
		type : "post",
		url : WaybillManage.addToExistFlatCableUrl,
		data : params,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			$.toastrSuccess('操作成功！');
			$('#mainWayBillList').bootstrapTable('refresh');
			$.hideModal('#myModal15');
		},
		error : function() {
			$.toastrError();
		}
	});

}
/**
 * 根据行政区域查询运单信息
 * 
 * @param {}
 *            params
 * @param {}
 *            url
 */
WaybillManage.prototype.queryWayBillInfoByName = function(params, url) {

	$.callAjax({
		type : "post",
		url : url,
		data : params,
		success : function(data) {
			var code = data.code;
			if (code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}

			var length = data.data.length;
			var rows = data.data;

			var obj;

			// 把运单汇总信息显示在地图上
			for (var i = 0; i < length; i++) {
				obj = rows[i];
				this.showWayBillInfo(obj.name, obj.sumnum, obj.notTruckingNum);
			}
		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});
}
/**
 * 获取当前选择站点
 */
WaybillManage.prototype.queryCurrSite = function() {
	$.callAjax({
		url : WaybillManage.queryCurrSite,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			// 把所属站点城市信息存在全局变量里
			this.curCityId = data.data.city;
			this.curCityName = data.data.cityName;

			// 初始化页面数据
			this.initPage();
		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});
}
/**
 * 在地图上显示运单信息
 * 
 * @param {}
 *            rows
 */
WaybillManage.prototype.showWayBill = function(rows2) {
	var rows = new Array();
	for (var i = 1, len = rows2.length; i <= len; i++) {
		rows.push(rows2[len - i]);
	}
	this.map.clearOverlays();

	// 地图连线
	this.ligature(rows);

	var waybill;
	// 在地图上绘制代表运单的圆点
	for (var i = 0, length = rows.length; i < length; i++) {
		waybill = rows[i];

		if (waybill["flag"] == true) {
			continue;
		}
		var point = new BMap.Point(waybill.longitude, waybill.latitude);

		var waybills = this.searchSamePoint(waybill, rows);

		if (waybills.length == 0) {
			if (waybill.truckingStatus == "1") {
				this.creatGrayPoint(point, waybill);
			} else if (waybill.flatCableStatus == "1") {
				this.creatGreenPointNoEvent(point, waybill);
			} else {
				this.creatRedPoint(point, waybill);
			}
		} else {
			waybill["flag"] = true;
			waybills.push(waybill);
			if (waybill.truckingStatus == "1") {
				this.creatBigGrayPoint(point, waybills);
			} else if (waybill.flatCableStatus == "1") {
				this.creatBigGreenPointNoEvent(point, waybills);
			} else {
				this.creatBigRedPoint(point, waybills);
			}

		}

	}

}
/**
 * 寻找相同配送位置的运单
 * 
 * @param {}
 *            point
 * @param {}
 *            waybill
 * @param {}
 *            rows
 * @return {}
 */
WaybillManage.prototype.searchSamePoint = function(waybill, rows) {
	var waybills = new Array();
	for (index in rows) {
		if (waybill.longitude == rows[index].longitude
				&& waybill.latitude == rows[index].latitude
				&& waybill.truckingStatus == rows[index].truckingStatus
				&& waybill.flatCableStatus == rows[index].flatCableStatus
				&& waybill.childWaybillId != rows[index].childWaybillId) {
			rows[index]["flag"] = true;
			waybills.push(rows[index]);
		}
	}
	return waybills;
}

/**
 * 在地图上展示运单汇总信息
 * 
 * @param {}
 *            areaName
 * @param {}
 *            sumnum
 * @param {}
 *            notTruckingNum
 */
WaybillManage.prototype.showWayBillInfo = function(areaName, sumnum,
		notTruckingNum) {

	var url = config.url_map_geocoder + "&address=" + areaName + "&city="
			+ this.curCityName + "&ak=" + config.url_map_ak;

	$
			.ajax({
				type : "GET",
				url : url,
				data : "",
				dataType : "jsonp",/* 加上datatype */
				success : function(data) {

					var point = new BMap.Point(data.result.location.lng,
							data.result.location.lat);

					var circle = new BMap.Circle(point, 1200, {
						strokeColor : "white",
						strokeWeight : 5,
						strokeOpacity : 1,
						fillOpacity : 1,
						fillColor : "red"
					}); // 创建圆

					// 添加文字
					var opts = {
						position : point, // 指定文本标注所在的地理位置
						offset : new BMap.Size(-25, -25)
					// 设置文本偏移量
					}
					var label = new BMap.Label(areaName + "<br>总:" + sumnum
							+ "<br>未派车:" + notTruckingNum, opts); // 创建文本标注对象
					label.setStyle({
						color : "#ffffff",
						fontSize : "10px",
						fontColor : "white",
						backgroundColor : "transparent",
						textAlign : "center",
						height : "40px",
						border : '0px'

					});

					var attribute = function(tag) {
						this.scope.map.clearOverlays();
						// 定位到某个区
						this.scope.map.centerAndZoom(this.areaName, 14);
						var areaId = "";
						for (var i = 0, length = this.scope.areas.length; i < length; i++) {
							if (this.scope.areas[i].areaName == this.areaName) {
								areaId = this.scope.areas[i].id;
								break;
							}
						}
						$('#topAreaSelect').val(areaId);
						// 刷新运单信息
						$('#mainWayBillList').bootstrapTable('refresh');
					}
					circle.addEventListener("click", attribute.bind({
						scope : this,
						"areaName" : areaName
					}));
					label.addEventListener("click", attribute.bind({
						scope : this,
						"areaName" : areaName
					}));
					// 增加圆
					this.map.addOverlay(circle);

					this.map.addOverlay(label);

				}.bind(this)
			});
}
/**
 * 地图连线
 * 
 * @param {}
 *            rows
 */
WaybillManage.prototype.ligature = function(rows) {
	// 所有运单涉及的排线单
	var flatCables = new Array();
	// 所有已排线的运单
	var waybills = new Array();
	var count = 0;
	// 过滤出已排线的运单 存入waybills
	for (index in rows) {
		if (rows[index].flatCableStatus == "1") {
			waybills[count] = rows[index];
			count++;
		}
	}
	count = 0;
	// 筛选出运单涉及的所有排线单 存入flatCables
	for (index in waybills) {
		// 如果flatCables还没有排线单 那么直接把排线单放入其中
		if (flatCables.length == 0) {
			flatCables[count] = waybills[index].flatCableId;
			count++;
			continue;
		}
		var ishave = false;
		// 判断当前排线单是否已经在flatCables中
		for (index2 in flatCables) {
			if (flatCables[index2] == waybills[index].flatCableId) {
				ishave = true;
			}
		}
		// 判断当前排线单没有flatCables中，那么把当前排线单插入flatCables
		if (!ishave) {
			flatCables[count] = waybills[index].flatCableId;
			count++;
		}
	}
	count = 0;
	var tempWaybills // 临时的运单集合
	var tempFlatCabiesId;// 临时的排线单id
	// 开始连线
	for (index in flatCables) {
		tempFlatCabiesId = flatCables[index];
		tempWaybills = new Array();
		for (index2 in waybills) {
			if (waybills[index2].flatCableId == tempFlatCabiesId) {
				tempWaybills[count] = waybills[index2];
				count++;
			}
		}
		var polyline = new BMap.Polyline([], {
			strokeColor : "green",
			strokeWeight : 2,
			strokeOpacity : 0.5
		}); // 创建折线

		var count2 = 0;
		var points = new Array();
		for (index3 in tempWaybills) {
			points[count2] = new BMap.Point(tempWaybills[index3].longitude,
					tempWaybills[index3].latitude);
			count2++;
		}
		polyline.setPath(points);

		this.map.addOverlay(polyline); // 增加折线

	}

}
/**
 * 创建大绿点
 * 
 * @param {}
 *            point
 * @param {}
 *            waybills
 */
WaybillManage.prototype.creatBigGreenPoint = function(point, waybills) {
	// 创建圆
	var circle = new BMap.Circle(point, this.bigCircleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 1,
		fillColor : "green",
		fillOpacity : 1
	});

	// 添加文字
	var opts = {
		// 指定文本标注所在的地理位置
		position : point,
		// 设置文本偏移量
		offset : new BMap.Size(-8, -8)

	}
	var label = new BMap.Label(waybills.length, opts); // 创建文本标注对象
	label.setStyle({
		color : "#ffffff",
		fontSize : "10px",
		fontColor : "white",
		backgroundColor : "transparent",
		textAlign : "center",
		height : "40px",
		border : '0px'
	});

	var attribute = function(tag) {
		this.scope.map.removeOverlay(circle);
		this.scope.creatBigRedPoint(point, this.waybills);

		var wayBillIds = new Array();

		for (index in this.waybills) {
			wayBillIds.push(this.waybills[index].childWaybillId);
		}
		$("#rightWayBillList").bootstrapTable('remove', {
			field : 'childWaybillId',
			values : wayBillIds
		});

		$("#rightWayBillList").bootstrapTable("checkAll");
		$("#goodsList").bootstrapTable('refresh');
	}
	circle.addEventListener("click", attribute.bind({
		scope : this,
		"waybills" : waybills
	}));
	label.addEventListener("click", attribute.bind({
		scope : this,
		"waybills" : waybills
	}));

	this.map.addOverlay(circle); // 增加圆

	this.map.addOverlay(label);
}
/**
 * 创建大红点
 * 
 * @param {}
 *            point
 * @param {}
 *            waybills
 */
WaybillManage.prototype.creatBigRedPoint = function(point, waybills) {

	var circle = new BMap.Circle(point, this.bigCircleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 1,
		fillColor : "red",
		fillOpacity : 1
	}); // 创建圆

	// 添加文字
	var opts = {
		position : point, // 指定文本标注所在的地理位置
		offset : new BMap.Size(-8, -8)
	// 设置文本偏移量
	}
	var label = new BMap.Label(waybills.length, opts); // 创建文本标注对象
	label.setStyle({
		color : "#ffffff",
		fontSize : "10px",
		fontColor : "white",
		backgroundColor : "transparent",
		textAlign : "center",
		height : "40px",
		border : '0px'
	});
	// 点击事件 切换选择状态
	var attribute = function(tag) {
		this.scope.map.removeOverlay(circle);
		this.scope.creatBigGreenPoint(point, this.waybills);

		$("#rightWayBillList").bootstrapTable('append', this.waybills);
		$("#rightWayBillList").bootstrapTable("checkAll");
		$("#goodsList").bootstrapTable('refresh');
	}
	circle.addEventListener("click", attribute.bind({
		scope : this,
		"waybills" : waybills
	}));
	label.addEventListener("click", attribute.bind({
		scope : this,
		"waybills" : waybills
	}));

	this.map.addOverlay(circle); // 增加圆

	this.map.addOverlay(label);
}
/**
 * 创建大灰点
 * 
 * @param {}
 *            point
 * @param {}
 *            waybills
 */
WaybillManage.prototype.creatBigGrayPoint = function(point, waybills) {
	var circle = new BMap.Circle(point, this.bigCircleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 0.5,
		fillOpacity : 1,
		fillColor : "gray"
	}); // 创建圆
	var signInMarker = function(e, ee, marker) {
		var i = 0;
	}
	// 添加文字
	var opts = {
		position : point, // 指定文本标注所在的地理位置
		offset : new BMap.Size(-8, -8)
	// 设置文本偏移量
	}
	var label = new BMap.Label(waybills.length, opts); // 创建文本标注对象
	label.setStyle({
		color : "#ffffff",
		fontSize : "10px",
		fontColor : "white",
		backgroundColor : "transparent",
		textAlign : "center",
		height : "40px",
		border : '0px'
	});

	// TODO 暂时去掉右键菜单 由于多点重合很难处理
	// // 创建右键菜单
	// var markerMenu = new BMap.ContextMenu();
	// markerMenu
	// .addItem(new BMap.MenuItem('签收', signInMarker.bind(waybills)));
	//		
	// circle.addContextMenu(markerMenu);
	this.map.addOverlay(circle);
	// map.addOverlay(label);
}
/**
 * 地图上创建不带点击事件的绿色点 (大点)
 * 
 * @param {}
 *            point
 * @param {}
 *            waybill
 */
WaybillManage.prototype.creatBigGreenPointNoEvent = function(point, waybills) {
	var circle = new BMap.Circle(point, this.bigCircleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 0.5,
		fillOpacity : 1,
		fillColor : "green"
	}); // 创建圆
	// TODO 暂时去掉右键菜单 由于多点重合很难处理
	// var newMarker = function(e, ee, marker) {
	// if (this[0].truckingStatus == 10) {
	// dispatchVehicleDialog.show(this);
	// } else if (this[0].truckingStatus == 20) {
	// $.toastrWarning("已经‘部分派车’，不可再次操作派车!");
	// } else if (this[0].truckingStatus == 30) {
	// $.toastrWarning("已经‘全部派车’，请不要重复派车!");
	// }
	// }
	// var addMarker = function(e, ee, marker) {
	// $('#childWaybillId_7').val(this[0].childWaybillId);
	// $.showModal('#myModal7');
	// }
	// // 创建右键菜单
	// var markerMenu = new BMap.ContextMenu();
	// markerMenu
	// .addItem(new BMap.MenuItem('新建派车单', newMarker.bind(waybills)));
	// markerMenu
	// .addItem(new BMap.MenuItem('添加到派车单', addMarker.bind(waybills)));
	// circle.addContextMenu(markerMenu);

	this.map.addOverlay(circle);

}
/**
 * 地图上创建灰色点
 * 
 * @param {}
 *            point
 * @param {}
 *            waybill
 */
WaybillManage.prototype.creatGrayPoint = function(point, waybill) {
	var circle = new BMap.Circle(point, this.circleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 0.5,
		fillOpacity : 1,
		fillColor : "gray"
	}); // 创建圆

	// TODO 暂时去掉右键菜单 由于多点重合很难处理
	// var signInMarker = function(e, ee, marker) {
	// var i = 0;
	// }
	// // 创建右键菜单
	// var markerMenu = new BMap.ContextMenu();
	// markerMenu.addItem(new BMap.MenuItem('签收',
	// signInMarker.bind(waybill)));
	//
	// circle.addContextMenu(markerMenu);
	this.map.addOverlay(circle);
}
/**
 * 地图上创建红色点
 * 
 * @param {}
 *            point
 * @param {}
 *            waybill
 */
WaybillManage.prototype.creatRedPoint = function(point, waybill) {
	var circle = new BMap.Circle(point, this.circleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 0.5,
		fillOpacity : 1,
		fillColor : "red"
	}); // 创建圆
	var attribute = function(tag) {

		this.scope.map.removeOverlay(circle);
		this.scope.creatGreenPoint(point, this.waybill);

		$("#rightWayBillList").bootstrapTable('append', [ this.waybill ]);
		$("#rightWayBillList").bootstrapTable("checkAll");
		$("#goodsList").bootstrapTable('refresh');
	}
	circle.addEventListener("click", attribute.bind({
		scope : this,
		"waybill" : waybill
	}));

	// TODO 暂时去掉右键菜单 由于多点重合很难处理

	// var addMarker = function(e, ee, marker) {
	// rightKeyWayBillList.push(this);
	// $.showModal('#myModal15');
	// }
	// // 创建右键菜单
	// var markerMenu = new BMap.ContextMenu();
	// markerMenu
	// .addItem(new BMap.MenuItem('添加到排线单', addMarker.bind(waybill)));
	//
	// circle.addContextMenu(markerMenu);

	this.map.addOverlay(circle);
}
/**
 * 地图上创建绿色点
 * 
 * @param {}
 *            point
 * @param {}
 *            waybill
 */
WaybillManage.prototype.creatGreenPoint = function(point, waybill) {
	var circle = new BMap.Circle(point, this.circleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 0.5,
		fillOpacity : 1,
		fillColor : "green"
	}); // 创建圆
	var attribute = function(tag) {
		this.scope.map.removeOverlay(circle);
		this.scope.creatRedPoint(point, this.waybill);

		var index = 0;
		$("#rightWayBillList").bootstrapTable('remove', {
			field : 'childWaybillId',
			values : [ this.waybill.childWaybillId ]
		});

		$("#rightWayBillList").bootstrapTable("checkAll");
		$("#goodsList").bootstrapTable('refresh');
	}
	circle.addEventListener("click", attribute.bind({
		scope : this,
		"waybill" : waybill
	}));

	// TODO 暂时去掉右键菜单 由于多点重合很难处理
	// var addMarker = function(e, ee, marker) {
	// $.showModal('#myModal5');
	// }
	// // 创建右键菜单
	// var markerMenu = new BMap.ContextMenu();
	// markerMenu
	// .addItem(new BMap.MenuItem('添加到排线单', addMarker.bind(waybill)));
	// circle.addContextMenu(markerMenu);

	this.map.addOverlay(circle);

}
/**
 * 地图上创建不带点击事件的绿色点
 * 
 * @param {}
 *            point
 * @param {}
 *            waybill
 */
WaybillManage.prototype.creatGreenPointNoEvent = function(point, waybill) {
	var circle = new BMap.Circle(point, this.circleSize, {
		strokeColor : "white",
		strokeWeight : 2,
		strokeOpacity : 0.5,
		fillOpacity : 1,
		fillColor : "green"
	}); // 创建圆

	// TODO 暂时去掉右键菜单 由于多点重合很难处理
	// var newMarker = function(e, ee, marker) {
	// if (this.truckingStatus == 10) {
	// dispatchVehicleDialog.show(this);
	// } else if (this.truckingStatus == 20) {
	// $.toastrWarning("已经‘部分派车’，不可再次操作派车!");
	// } else if (this.truckingStatus == 30) {
	// $.toastrWarning("已经‘全部派车’，请不要重复派车!");
	// }
	// }
	// var addMarker = function(e, ee, marker) {
	// $('#childWaybillId_7').val(this.childWaybillId);
	// $.showModal('#myModal7');
	// }
	// // 创建右键菜单
	// var markerMenu = new BMap.ContextMenu();
	// markerMenu.addItem(new BMap.MenuItem('新建派车单',
	// newMarker.bind(waybill)));
	// markerMenu
	// .addItem(new BMap.MenuItem('添加到派车单', addMarker.bind(waybill)));
	// circle.addContextMenu(markerMenu);

	this.map.addOverlay(circle);

}
/**
 * 加载今日排线单列表数据
 */
WaybillManage.prototype.loadFlatCableList = function() {
	$
			.pageTable({
				tableId : "#flatCableList",
				url : WaybillManage.flatCableListTodayUrl,
				queryParams : this.queryParamsWayBill,
				onLoadSuccess : function(data) {

				},
				columns : [
						{
							checkbox : true
						},
						{
							field : 'disFlatCableId',
							title : '线路编号',
							width : 100
						},
						{
							align : 'center',
							field : 'cableDescribe',
							width : 200,
							title : '线路描述'
						},
						{
							align : 'center',
							field : 'waybillAmount',
							width : 80,
							title : '运单个数'
						},
						{
							align : 'center',
							field : 'orderDetails',
							title : '订单详情'
						},
						{
							align : 'center',
							field : 'flatCableStatus',
							width : 80,
							title : '派车状态',
							formatter : function(value, row, index) {
								if (value == '10') {
									return "未派车";
								} else if (value == '20') {
									return "部分派车";
								} else if (value == '30') {
									return "全部派车";
								} else if (value == '40') {
									return "已取消";
								}
							}
						},
						{
							field : 'operation',
							title : '操作',
							width : 280,
							formatter : function(value, row, index) {

								var dispatchVehicleBtn = '<a class="btn btn-info dispatchVehicleBtn" href="javascript:void(0)" id="'
										+ row.id + '" >派车</a> ';

								var cancleBtn = '<a style="margin-right:5px;" class="btn btn-danger cancleBtn" href="javascript:void(0)" id="'
										+ row.id + '" >作废</a>';

								var waybillPrintBtn = '<a style="margin-right:5px;" class="btn btn-danger waybillPrintBtn" href="javascript:void(0)" id="'
										+ row.id + '" >打印面单</a>';

								var flatCablePrintBtn = '<a style="margin-right:5px;" class="btn btn-danger flatCablePrintBtn" href="javascript:void(0)" id="'
										+ row.id + '" >按线路打印拣货单</a>';

								var dispatchVehiclePrintBtn = '<a style="margin-right:5px;" class="btn btn-danger dispatchVehiclePrintBtn" href="javascript:void(0)" id="'
										+ row.id + '" >打印派车单</a>';

								var btns = "";
								if (row.flatCableStatus == '10') {
									btns += dispatchVehicleBtn + cancleBtn;
								}
								btns += waybillPrintBtn + flatCablePrintBtn;
								if (row.flatCableStatus == '30'
										|| row.flatCableStatus == '20') {
									btns += dispatchVehiclePrintBtn;
								}
								return btns;
							},
							events : 'operateEventsTuo'
						} ]
			});
}
/**
 * 查询货品明细
 */
WaybillManage.prototype.queryWayBillGoods = function() {
 	var array = $("#mainWayBillList").bootstrapTable('getSelections');
 	var params = {"childWaybillId" :array[0].childWaybillId};
	$.pageTable({
		tableId : "#goodsList",
		url : "/tms/waybill/queryWayBillGoods",
		queryParams : params,
		toolbar : '#toolbar',
		pagination : false,
		onLoadSuccess : function(data) {
			array = data.rows;
			$("#waybill_count_right")
					.text(
							$("#rightWayBillList").bootstrapTable(
									'getSelections').length);
			$("#waybill_count_goods_list")
					.text(
							$("#rightWayBillList").bootstrapTable(
									'getSelections').length);
			$("#waybill_count_create_flatcable")
					.text(
							$("#mainWayBillList").bootstrapTable(
									'getSelections').length);

			$("#goods_count_right").text(array.length);
			$("#goods_count_goods_list").text(array.length);

			$("#goods_count_create_flatcable").text(array.length);

			// 计算总体积 总重量，分类汇总
			var totalWeight = 0;
			var sendModes = new Array();
			var sizeTypes = new Array();

			for (index in array) {
				var row = array[index];

				totalWeight += Number(row.weight);
				var hasSendMode = false;
				for (index2 in sendModes) {

					if (sendModes[index2] == row.sendMode) {
						hasSendMode = true;
					}
				}
				if (!hasSendMode) {
					sendModes.push(row.sendMode);
				}

				var hasSizeType = false;
				for (index3 in sizeTypes) {
					if (sizeTypes[index3] == row.sizeType) {
						hasSizeType = true;
					}
				}
				if (!hasSizeType) {
					sizeTypes.push(row.sizeType);
				}
			}

			$("#weight_total_right").text(totalWeight);
			$("#weight_total_goods_list").text(totalWeight);
			$("#weight_total_create_flatcable").text(totalWeight);

			$("#send_mode_create_flatcable").text(sendModes.join("+"));
			$("#send_mode_goods_list").text(sendModes.join("+"));
			$("#size_type_create_flatcable").text(sizeTypes.join("+"));
			$("#size_type_goods_list").text(sizeTypes.join("+"));
		},
		columns : [ {
			align : 'center',
			field : 'goodsCode',
			title : '商品编码'
		}, {
			align : 'center',
			field : 'goodsName',
			title : '商品名称'
		}, {
			align : 'center',
			field : 'skuName',
			title : '规格'
		}, {
			align : 'center',
			field : 'packType',
			title : '默认包装'
		}, {
			align : 'center',
			field : 'sendMode',
			title : '配送分类'
		}, {
			align : 'center',
			field : 'sizeType',
			title : '件型分类'
		}, {
			align : 'center',
			field : 'goodsTypeName',
			title : '商品分类'
		}, {
			align : 'center',
			field : 'amount',
			title : '数量小计'
		}, {
			align : 'center',
			field : 'weight',
			title : '毛重小计(千克)'
		}, {
			align : 'center',
			field : 'volume',
			title : '体积小计'
		} ]
	});
}
/**
 * 初始化运单商品明细列表
 */
WaybillManage.prototype.initGoodsDetailTable = function(array) {
    WaybillManage.waybill = array;
//	var array = $("#mainWayBillList").bootstrapTable('getSelections');
//  	var params = {"childWaybillId" :array.childWaybillId};
	$.pageTable({
		tableId : "#goodsDetail_tab",// 需要分页的table ID
		url : "/tms/waybill/queryWayBillGoods",// 请求后台的URL（*）
		queryParams : this.queryParamsWayBillGoods2,
		toolbar : '#toolbar',
        pagination:false,
		onLoadSuccess : function(data) {

		},
		onClickRow : function(row) {
			Util.setValues(row);
		},
		columns : [ {
			align : 'center',
			field : 'disChildWaybillId',
			title : '运单号'
		}, {
			align : 'center',
			field : 'goodsCode',
			title : '商品编码'
		}, {
			align : 'center',
			field : 'goodsName',
			title : '商品名称'
		}, {
			align : 'center',
			field : 'skuName',
			title : '规格'
		}, {
			align : 'center',
			field : 'sizeType',
			title : '货品分类'
		},{
			align : 'center',
			field : 'amount',
			title : '数量'
		}, {
			align : 'center',
			field : 'amount',
			title : '实签收量'
		}, {
			align : 'center',
			field : '',
			title : '途损数量'
		},{
			align : 'center',
			field : 'unit',
			title : '数量单位'
		}, 
		{
			align : 'center',
			field : 'weight',
			title : '净重(千克)'
		}, {
			align : 'center',
			field : 'volume',
			title : '体积'
		} ]
	});
}
/**
 * 根据查询条件加载运单（未分页）
 */
WaybillManage.prototype.loadAllWayBills = function() {
	$.callAjax({
		type : 'post',
		data : this.queryParamsWayBill({
			'limit' : 10
		}),
		url : this.wayBillListNoPageUrl(),
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			this.allWaybills = data.data.rows;
			this.showWayBill(this.allWaybills);
		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});
}
/**
 * 初始化 主运单列表
 */
WaybillManage.prototype.initMainWayBillListTable = function() {
	$.pageTable({
		
		tableId : "#mainWayBillList",
		url : this.wayBillListUrl(),
		queryParams : this.queryParamsWayBill,
		onLoadSuccess : function(data) {
			$("#rightWayBillList").bootstrapTable('removeAll');
			$("#goodsList").bootstrapTable('refresh');
			if ($("#topAreaSelect option:selected").val() != "") {
				this.loadAllWayBills();
			}
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
//			field : 'walbillStatus',//主运单状态
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
/**
 * 初始化运单右侧列表
 */
WaybillManage.prototype.initRightWayBillTable = function() {

	// 列表组件
	$("#rightWayBillList")
			.bootstrapTable(
					{
						data : new Array(),
						columns : [
								{
									checkbox : true
								},
								{
									field : 'disChildWaybillId',
									title : '分段运单'
								},
								{
									align : 'center',
									field : 'areaName',
									title : '区域'
								},
								{
									field : 'operation',
									title : '操作',
									formatter : function(value, row, index) {

										var detailBtn = '<a class="btn btn-info detailBtn" href="javascript:void(0)" id="'
												+ row.id + '" >详情</a>';

										return detailBtn;
									},
									events : 'operateEventsTuo'
								} ],
						onLoadSuccess : function(data) {
						},
						onUncheck : function(row) {
							$("#rightWayBillList").bootstrapTable('remove', {
								field : 'childWaybillId',
								values : [ row.childWaybillId ]
							});
							$("#goodsList").bootstrapTable('refresh');
							if (row["flag"] == true) {
								var rightWaybills = $("#rightWayBillList")
										.bootstrapTable('getData')
								var waybills = this.searchSamePoint(row,
										rightWaybills);
								if (waybills.length == 0) {
									var point = new BMap.Point(row.longitude,
											row.latitude);
									this.removeOverlayByPoint(point);
									var waybills = this.searchSamePoint(row,
											this.allWaybills);
									waybills.push(row);
									this.creatBigRedPoint(point, waybills);
								}
								return;
							}
							var point = new BMap.Point(row.longitude,
									row.latitude);
							this.removeOverlayByPoint(point);
							this.creatRedPoint(point, row);

						}.bind(this)
					});

	$("#rightWayBillList").bootstrapTable('hideLoading');// 去掉商品列表的正在加载提示
}
/**
 * 根据point来删除覆盖物
 * 
 * @param {}
 *            point
 * @return {Boolean}
 */
WaybillManage.prototype.removeOverlayByPoint = function(point) {
	var allOverlay = this.map.getOverlays();
	for (var i = 0; i < allOverlay.length; i++) {
		if (allOverlay[i].eQ == "Circle") {
			if (allOverlay[i].point.lat == point.lat
					&& allOverlay[i].point.lng == point.lng) {
				this.map.removeOverlay(allOverlay[i]);
				return false;
			}
		}
	}
}
/**
 * 添加运单到已有派车单
 */
WaybillManage.prototype.addDVList = function() {

	var selects = $.getIdSelections("#mainWayBillList", "childWaybillId");// 获取选中的运单号
	var selectids = $.getIdSelections("#mainWayBillList", "disChildWaybillId");// 获取选中的外部运单号
	// var status = $.getIdSelections("#mainWayBillList","flatCableStatus");
	// var selects =
	// $("#mainWayBillList").bootstrapTable('getSelections');//获取选中的运单

	var dis = $("#dvManagerTable").bootstrapTable('getSelections');// 获取选中的派车单号

	if (dis.length == 0) {
		$.toastrWarning("请选择一个派车单号!");
		return;
	}

	var disDispatchVehicleId = dis[0].disDispatchVehicleId;
	var params = {
		'disDispatchVehicleId' : disDispatchVehicleId,
		childWaybillIds : selects,
		disChildWaybillIds : selectids
	}
	$.callAjax({
		type : "post",
		url : WaybillManage.addDVList,
		data : params,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			
			$('#dvManagerTable').bootstrapTable('refresh');
			$('#mainWayBillList').bootstrapTable('refresh');
			$.hideModal('#mypaiche');
			$.toastrSuccess("添加到派车单成功");
		},
		error : function() {
			$.toastrError();
		}
	});
}
/**
 * 揽收
 */
WaybillManage.prototype.pickUpdate = function() {
	if ($('#pickId').val() == null || $('#pickId').val() == '') {
		$('#pickTs').html("揽收人不能为空");
		return;
	}
	if ($('#pickTime').val() == null || $('#pickTime').val() == '') {
		$('#pickTs').html("时间不能为空");
		return;
	}

	var params = {
		'pickUpGoodsPeople' : $('#pickId').val(),
		'childWaybillId' : $('#childWaybillId_8').val(),
		'pickUpGoodsTime' : $('#pickTime').val()
	}
	$.callAjax({
		type : "post",
		url : WaybillManageL.pickUpdate,
		data : params,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			$('#mainWayBillList').bootstrapTable('refresh');
			$.hideModal('#myModal8');
			$.toastrSuccess("揽收成功！");

		},
		error : function() {
			$.toastrError();
		}
	});

}
/**
 * 签收
 */
WaybillManage.prototype.signUpdate = function() {
	var params = "";
	var radios = document.getElementsByName("rSign");
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked == true) {
			if (i == 0) {// 正常签收
				waybillManage.validateform1();
				$("#signForm1").data('bootstrapValidator').validate();
				var valid = $("#signForm1").data('bootstrapValidator')
						.isValid();
				if (!valid) {
					return;
				}

				params = {
					'signInPeople' : $('#signId').val(),
					'childWaybillId' : $('#childWaybillId_9').val(),
					'signInTime' : $('#signTime').val(),
					'signInType' : null,
					'signInReason' : null,
					'disposeScheme' : null,
					'signInResult' : "1"
				}
			} else if (i == 1) {// 异常签收
				waybillManage.validateform2();
				$("#signForm2").data('bootstrapValidator').validate();
				var valid = $("#signForm2").data('bootstrapValidator')
						.isValid();
				if (!valid) {
					return;
				}
				params = {
					'signInPeople' : $('#signId_2').val(),
					'childWaybillId' : $('#childWaybillId_9').val(),
					'signInType' : $('#signInType_2').val(),
					'signInReason' : $('#signInReason_2').val(),
					'disposeScheme' : $('#disposeScheme_2').val(),
					'signInTime' : null,
					'signInResult' : "0"
				}
			}
		}

	}
	$.callAjax({
		type : "post",
		url : WaybillManage.signUpdate,
		data : params,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			$('#mainWayBillList').bootstrapTable('refresh');
			$.hideModal('#myModal9');
			$('#btn_look_show_sign').hide();

			$.toastrSuccess("签收成功！");
		},
		error : function() {
			$.toastrError();
		}
	});
}
/**
 * 初始化顶部 区域下拉框数据
 */
WaybillManage.prototype.initTopAreaCombobox = function() {

	$('#topCitySelect').append(
			"<option value='" + this.curCityId + "'>" + this.curCityName
					+ "</option>");

	var params = {
		'id' : this.curCityId
	}
	$.callAjax({
		type : "post",
		url : WaybillManage.quereAreaUrl,
		data : params,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			var rows = data.data;
			$('#topAreaSelect').append("<option value=''>全部</option>");
			for (var i = 0, length = rows.length; i < length; i++) {
				$('#topAreaSelect').append(
						"<option value='" + rows[i].id + "'>"
								+ rows[i].areaName + "</option>");
				this.areas[i] = {
					"id" : rows[i].id,
					"areaName" : rows[i].areaName
				}
			}

		}.bind(this),
		error : function() {
			$.toastrError();
		}
	});
}

/**
 * 查询运单详情
 * 
 * @param {}
 *            waybill
 */
WaybillManage.prototype.lookWaybillDetail = function(waybill) {
	// 是否显示 签收按钮
	if (waybill.childWalbillStatus == '50') {
		$("#btn_look_show_sign").show();
	} else {
		$("#btn_look_show_sign").hide();
	}
	//因为sum这个属性名跟收件人地址信息冲突，所以先剔除掉
	delete waybill.sum;
	Util.setValues(waybill);
	$("#goodsDetail_tab").bootstrapTable('refresh');
	$.showModal('#myModal');
}

// 点击已有排线，弹出排线列表
$("#btnYiPaiXian").click(function() {
	// 获取选中的运单
	var selects = $.getIdSelections("#mainWayBillList", "disChildWaybillId");
	var status = $.getIdSelections("#mainWayBillList", "flatCableStatus");
	var sum = true;
	if ($.isNotNull(selects) && selects.length >= 1) {
		for (var int = 0; int < status.length; int++) {
			if (status[int] == "" || status[int] == null || status[int] == 1) {
				sum = false;
			}
		}
		if (sum) {
			var waybill = selects;
			$.clearForm("addOrEditeSearchForm");
			$.showModal('#mypaixian');
			var selects = $("#mainWayBillList").bootstrapTable('getSelections');
//			this.lookWaybillDetail(selects[0]);
		} else {
			$.toastrWarning("请选择未排线的运单!");
		}

	} else {
		$.toastrWarning("请最少选择一条数据进行操作!");
	}
}.bind(this));

/**
 * 查询排线列表
 * 
 * @param {}
 *            waybill
 */
WaybillManage.prototype.lookFlatCable = function(waybill) {
	// 是否显示 签收按钮
	if (waybill.childWalbillStatus == '50') {
		$("#btn_look_show_sign").show();
	} else {
		$("#btn_look_show_sign").hide();
	}

	Util.setValues(waybill);
	$("#goodsDetail_tab").bootstrapTable('refresh');
	$.showModal('#myModal');
}

/**
 * 重置签收表单
 */
WaybillManage.prototype.resetSignForm = function() {
	// 重置校验
	// 初始化表单验证
	waybillManage.validateform1();
	waybillManage.validateform2();
	$("#signForm1").data('bootstrapValidator').destroy();
	$('#signForm1').data('bootstrapValidator', null);
	$("#signForm2").data('bootstrapValidator').destroy();
	$('#signForm2').data('bootstrapValidator', null);

	// 清空表单
	$.clearForm("signForm1");
	$.clearForm("signForm2");
	$("#signInType_2").val("10");
	// 默认勾选正常签收
	$("#radio_rSign2").removeAttr("checked");
	$("#radio_rSign1").prop("checked", "checked");
	$("#signForm1_wrap").show();
	$("#signForm2_wrap").hide();
}
/**
 * 重置签收表单2 -- 正常签收与异常签收切换时使用
 */
WaybillManage.prototype.resetSignForm2 = function() {
	// 重置校验
	// 初始化表单验证
	waybillManage.validateform1();
	waybillManage.validateform2();
	$("#signForm1").data('bootstrapValidator').destroy();
	$('#signForm1').data('bootstrapValidator', null);
	$("#signForm2").data('bootstrapValidator').destroy();
	$('#signForm2').data('bootstrapValidator', null);

	// 清空表单
	$("#signId").val("");
	$("#signId_2").val("");
	$("#signInReason_2").val("");

}
WaybillManage.prototype.bindEvent = function() {
	//近7天移入事件
	$("#btn_date_7days").on("mouseover",function () {
		if($(this).attr("isClick") != 1){//如果没有被点击设为蓝色，如果被点击了，什么都不做
			$(this).attr("class","btn btn-primary btn-sm");
		}
	});
	//近7天移出事件
	$("#btn_date_7days").on("mouseout",function () {
		if($(this).attr("isClick") != 1){//如果没有被点击设为默认，如果已点击，什么都不做
			$(this).attr("class","btn btn-inverse btn-default btn-sm");
		}
	});
	//近30天移入事件
	$("#btn_date_30days").on("mouseover",function () {
		if($(this).attr("isClick") != 1){//如果没有被点击设为蓝色，如果被点击了，什么都不做
			$(this).attr("class","btn btn-primary btn-sm");
		}
	});
	//近30天移出事件
	$("#btn_date_30days").on("mouseout",function () {
		if($(this).attr("isClick") != 1){//如果没有被点击设为默认，如果已点击，什么都不做
			$(this).attr("class","btn btn-inverse btn-default btn-sm");
		}
	});
	
	//绑定近7天界面事件
	$("#btn_date_7days").click(function () {
		//设置点击标识及点击样式
		$(btn_date_7days).attr("class","btn btn-primary btn-sm");
		$(btn_date_7days).attr("isClick",1);
		$(btn_date_30days).attr("class","btn btn-inverse btn-default btn-sm");
		$(btn_date_30days).attr("isClick",0);
		
		var date=new Date();
		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		
		var startDate =new Date((+date)-7*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		
		$("#queryPaymentTimeStart").val(startDate);
		$("#queryPaymentTimeEnd").val(today);
	});
	
	//绑定近30天界面事件
	$("#btn_date_30days").click(function () {
		$(btn_date_30days).attr("class","btn btn-primary btn-sm");
		$(btn_date_30days).attr("isClick",1);
		$(btn_date_7days).attr("class","btn btn-inverse btn-default btn-sm");
		$(btn_date_7days).attr("isClick",0);
		var date=new Date();
		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		var startDate =new Date((+date)-30*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		$("#queryPaymentTimeStart").val(startDate);
		$("#queryPaymentTimeEnd").val(today);
	});
	
	// 控制正常签收表单或异常签收表单的显示与隐藏
	$("#radio_rSign1").on("change", function() {
		var $this = $(this);
		if ($this.val() == '0') {
			$("#signForm1_wrap").show();
			$("#signForm2_wrap").hide();
			WaybillManage.resetSignForm2;
		} else {
			$("#signForm2_wrap").show();
			$("#signForm1_wrap").hide();
		}
	}).change();

	$("#radio_rSign2").on("change", function() {
		var $this = $(this);
		if ($this.val() == '1') {
			$("#signForm2_wrap").show();
			$("#signForm1_wrap").hide();
			WaybillManage.resetSignForm2;
		} else {
			$("#signForm1_wrap").show();
			$("#signForm2_wrap").hide();
		}
	});

	// 点击排线列表的确认按钮
	$("#queButton").click(function() {

		// 获取选中的运单
		// var selects =
		// $.getIdSelections("#mainWayBillList","disChildWaybillId");
		var selects = $("#mainWayBillList").bootstrapTable('getSelections');
		if (selects.length == 0) {
			$.toastrWarning("请先选择运单");
			return;
		}

		// 获取选中的排线
		var paixian = $.getIdSelections("#fcManagerTable", "disFlatCableId");

		if ($.isNull(paixian) || paixian.length != 1) {
			$.toastrWarning("请选择一条数据进行操作！");
			return;
		}

		var flatCableListVos = new Array();
		for (var i = 0, len = selects.length; i < len; i++) {
			flatCableListVos[i] = {
				'childWaybillId' : selects[i].childWaybillId
			};
		}
		var params = {
			'flatCableId' : paixian[0],
			'flatCableListVos' : flatCableListVos
		}
		$.callAjax({
			type : "post",
			url : WaybillManage.addToExistFlatCableUrl,
			data : params,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				$.toastrSuccess('操作成功！');
				$('#fcManagerTable').bootstrapTable('refresh');
				$('#mainWayBillList').bootstrapTable('refresh');
				$.hideModal('#mypaixian');
				$.hideModal('#myModal15');
			},
			error : function() {
				$.toastrError();
			}
		});
	}.bind(this));

	// 点击排线列表的取消按钮
	$("#qvButton").click(function() {
		$.hideModal('#mypaixian');
	}.bind(this));

	// 点击派车单列表的取消按钮
	$("#qvpcButton").click(function() {
		$.hideModal('#mypaiche');
	}.bind(this));

	// 打印面单按钮点击事件
	$("#print1").on("click", function() {
		$("#print1").addClass("disabled");
		var ids = $.getIdSelections("#mainWayBillList", "childWaybillId");
		if (ids == null || ids == '') {
			$.toastrWarning('请先选择记录再操作！');
			return false;
		}
		this.waybillBatchPrint(ids);
	}.bind(this));
	// 区域选择事件
	$('#topAreaSelect').change(
			function() {
				var areaName = $("#topAreaSelect").children('option:selected')
						.text();
				if (areaName == "全部") {
					this.map.clearOverlays();
					this.map.centerAndZoom(this.curCityName, 13);
					var params = {
						"cityName" : this.curCityName
					};
					this.queryWayBillInfoByName(params,
							WaybillManage.queryWayBillInfoByCityNameUrl);
					$("#mainWayBillList").bootstrapTable('refresh');
				} else {
					this.map.centerAndZoom(areaName, 14);
					$("#mainWayBillList").bootstrapTable('refresh');
				}

			}.bind(this));

	// 生成路线 弹出框
	$("#addFlatCable").click(
			function() {
				// var selects =
				// $.getIdSelections("#mainWayBillList","disChildWaybillId");
				// if (selects.length == 0) {
				// $.toastrWarning("请先选择运单");
				// return;
				// }
				// 获取选中的运单
				var selects = $.getIdSelections("#mainWayBillList",
						"disChildWaybillId");
				var status = $.getIdSelections("#mainWayBillList",
						"flatCableStatus");
				var sum = true;
				if ($.isNotNull(selects) && selects.length >= 1) {
					for (var int = 0; int < status.length; int++) {
						if (status[int] == "" || status[int] == null
								|| status[int] == 1) {
							sum = false;
						}
					}
					if (sum) {
						var waybill = selects;
//						$.showModal('#mypaixian');
//						this.lookWaybillDetail(waybill);

						$("#waybill_count_right").text(
								$("#mainWayBillList").bootstrapTable(
										'getSelections').length);
						$("#waybill_count_goods_list").text(
								$("#mainWayBillList").bootstrapTable(
										'getSelections').length);
						$("#waybill_count_create_flatcable").text(
								$("#mainWayBillList").bootstrapTable(
										'getSelections').length);
                          
						$("#goods_count_right").text(waybill.length);
						$("#goods_count_goods_list").text(waybill.length);

						$("#goods_count_create_flatcable").text(waybill.length);
						$.showModal('#addFlatCableModal');

					} else {
						$.toastrWarning("请选择未排线的运单!");
					}

				} else {
					$.toastrWarning("请最少选择一条数据进行操作!");
				}

			}.bind(this));
	// 生成路线
	$("#btnAddFlatCable").click(function() {
		this.addFlatCable();
	}.bind(this));
	// 生成路线并创建派车单
	$("#btnDddFlatCableAndDispatchVehicle").click(function() {
		this.addFlatCableAndDispatchVehicle();
	}.bind(this));

	// 清空事件
	$("#queryQingkong").on("click", function() {
		$.clearForm("mainForm");
	});

	// 绑定状态栏点击事件
	$(".orderStateClass").click(function() {
		$("#feature-tab").find(".active").removeClass("active");
		$(this).addClass("active");
		// 刷新列表数据
		$('#mainWayBillList').bootstrapTable('refresh');
	});

	// 添加到已有排线单弹框事件
	$("#addToExistFlatCable").click(function() {
		var selects = $("#rightWayBillList").bootstrapTable('getSelections');
		if (selects.length == 0) {
			$.toastrWarning("请先选择运单");
			return;
		}
		$.showModal('#myModal5');
	});

	// 查看货品明细
	$("#btnQueryWayBillGoods").click(function() {
		var selects = $("#rightWayBillList").bootstrapTable('getSelections');
		if (selects.length == 0) {
			$.toastrWarning("请先选择运单");
			return;
		}
		$.showModal('#myModal1');
	});
	// 添加到已有排线单确定按钮事件 右侧的
	$("#btnAffirm").click(function() {
		this.addToExistFlatCable1();
	}.bind(this));

	// 添加到已有排线单确定按钮事件 地图上的
	$("#btnAffirm_1").click(function() {
		this.addToExistFlatCable2();
	}.bind(this));

	// 司机弹出框
	$("#search_driver_xd_1").on("click", function() {
		$(".modal-backdrop").remove();
		this.driverDialog1.show();
	}.bind(this));
	// 车辆弹出框
	$("#search_car_xd_1").on("click", function() {
		this.vehicleDialog1.show();
	}.bind(this));

	// 主运单列表 查看事件
	$("#btn_show_look").click(function() {
		var selects = $("#mainWayBillList").bootstrapTable('getSelections');
		$(".modal-body input").css("background-color","white");
		$(".modal-body select").css("background-color","white");
		if (selects.length == 1) {
			var waybill = selects[0];
//			this.queryWayBillGoods();
			this.initGoodsDetailTable(waybill);
			this.lookWaybillDetail(waybill);
			
		} else {
			$.toastrWarning("只能选择一条数据进行操作！");
		}
	}.bind(this));

	// 添加到派车单 弹出框
	$("#btn_show_add_to_DV").click(
			function() {

				// 获取选中的运单
				var selects = $.getIdSelections("#mainWayBillList",
						"disChildWaybillId");
				var status = $.getIdSelections("#mainWayBillList",
						"flatCableStatus");
				var sum = true;
				if ($.isNotNull(selects) && selects.length >= 1) {
					for (var int = 0; int < status.length; int++) {
						if (status[int] == "" || status[int] == null
								|| status[int] == 1) {
							sum = false;
						}
					}
					if (sum) {
						var waybill = selects;
						$.showModal('#mypaiche');
					} else {
						$.toastrWarning("请选择未排线的运单!");
					}

				} else {
					$.toastrWarning("请最少选择一条数据进行操作!");
				}
			});
	// 确认添加到派车单
	$("#quepcButton").click(function() {
		this.addDVList();
	}.bind(this));
	$('.form_datetime').datetimepicker({
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		forceParse : 0,
		showMeridian : 1
	});
	// 揽收 弹出框
	$("#btn_show_pick").click(
			function() {
				var selects = $("#mainWayBillList").bootstrapTable(
						'getSelections');
				if (selects.length == 1) {
					var waybill = selects[0];
					if (waybill.pickUpGoodsPeople == null
							|| waybill.pickUpGoodsPeople == '') {

						$('#pickTime').val(
								Util.dateFormat(new Date(),
										"yyyy-MM-dd HH:mm:ss"));
						$('#childWaybillId_8').val(waybill.childWaybillId);
						$('#pickTs').html("");
						$.showModal('#myModal8');
					} else {
						$.toastrWarning("此运单已经被揽收请不要重复提交！");
					}
				} else {
					$.toastrWarning("请选择一条数据进行操作！");
				}

			});
	// 揽收 弹出框
	$("#btn_look_show_pick").click(function() {
		$('#pickTime').val(Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"));
		$('#childWaybillId_8').val($('#childWaybillId').val());
		$('#pickTs').html("");
		$.showModal('#myModal8');
	});
	// 揽收确认
	$("#btn_pick").click(function() {
		this.pickUpdate();
	}.bind(this));
	// 签收弹出框
	$("#btn_look_show_sign").click(function() {
		WaybillManage.resetSignForm();

		$('#signTime').val(Util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"));
		$('#childWaybillId_9').val($('#childWaybillId').val());
		$.showModal('#myModal9');
	});
	// 签收弹出框
	$("#btn_show_sign")
			.click(
					function() {
						var selects = $("#mainWayBillList").bootstrapTable(
								'getSelections');
						if (selects.length == 1) {
							this.resetSignForm();

							var waybill = selects[0];
							if (waybill.childWalbillStatus != '50') {
								$.toastrWarning("只有在途中的运单才能做签收操作");
								return;
							}
							$('#signTime').val(
									Util.dateFormat(new Date(),
											"yyyy-MM-dd HH:mm:ss"));
							$('#childWaybillId_9').val(waybill.childWaybillId);
							$.showModal('#myModal9');
						} else {
							$.toastrWarning("请选择一条数据进行操作！");
						}
					}.bind(this));
	// 签收
	$("#btn_sign").click(function() {
		this.signUpdate();

	}.bind(this));
	// 更多条件 弹框 确定按钮事件
	$("#queryAffirm").click(function() {
		WaybillManage.queryType = "1";

		$("#mainWayBillList").bootstrapTable('refresh', {
			url : $("#contextPath").val() + this.wayBillListUrl()
		});
		$('.L_specific_Popup').css('display', 'none');
	}.bind(this));

	// 更多条件 弹框 确定按钮事件
	$("#queryAffirm2").click(function() {
		WaybillManage.queryType = "1";

		$("#mainWayBillList").bootstrapTable('refresh', {
			url : $("#contextPath").val() + this.wayBillListUrl()
		});
		$('.L_specific_Popup').css('display', 'none');
	}.bind(this));
	// 更多条件 弹框 取消按钮事件
	$("#queryCancle").click(function() {
		$('.L_specific_Popup').css('display', 'none');
	});
	// 今日排线 弹框确定按钮事件
	$("#todayAffirm").click(function() {
		WaybillManage.queryType = "2";
		$("#mainWayBillList").bootstrapTable('refresh', {
			url : $("#contextPath").val() + this.wayBillListUrl()
		});
		$('.L_specific_Popup1').css('display', 'none');
	}.bind(this));
	// 今日排线 弹框取消按钮事件
	$("#todayCancle").click(function() {
		$('.L_specific_Popup1').css('display', 'none');
	});

	// 操作日志 按钮事件
	$("#btn_show_OL1").click(function() {
		var selects = $("#mainWayBillList").bootstrapTable('getSelections');
		if (selects.length == 1) {
			var waybill = selects[0];
			$('#bill_1').val(waybill.childWaybillId);
			this.logDialog.show();
		} else {
			$.toastrWarning("请选择一条数据进行操作！");
		}
		;
	}.bind(this));
	// 物流信息 按钮事件
	$("#btn_show_OL2").click(function() {
		var selects = $("#mainWayBillList").bootstrapTable('getSelections');
		if (selects.length == 1) {
			var waybill = selects[0];

			$('#bill_2').val(waybill.disChildWaybillId);
			this.logisticsDialog.show();
		} else {
			$.toastrWarning("请选择一条数据进行操作！");
		}

	}.bind(this));

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
	// 今日排线 按钮事件
	$('.L_Popup1').click(function() {
		if ($('.L_specific_Popup1').css('display') == "none") {
			$('.L_specific_Popup1').css('display', 'block');
		} else {
			$('.L_specific_Popup1').css('display', 'none');
		}
		;
		$('.L_specific_Popup').css('display', 'none');
	});

	// 派车单号 去除空格
	$('#dvId_7').keyup(function() {
		var dvId7 = $('#dvId_7')
		var dvIdval = $.trim(dvId7.val());
		dvId7.val(dvIdval);
	});

	// tabs
	$('#myTab a:first').tab('show');
	$('#myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

}

WaybillManage.prototype.init = function() {

	this.queryCurrSite();
	this.bindEvent();
	
}

WaybillManage.prototype.initPage = function() {
	this.map = new BMap.Map("allmap", {
		enableMapClick : false
	});
	var point = new BMap.Point(113.960902, 22.542507);
	this.map.centerAndZoom(this.curCityName, 13);// 层级13

	this.map.disableDoubleClickZoom();
	this.initTopAreaCombobox();

	var params = {
		"cityName" : this.curCityName
	};
	// 根据行政区域显示运单汇总信息
	this.queryWayBillInfoByName(params,
			WaybillManage.queryWayBillInfoByCityNameUrl);

	// 初始化右侧运单列表
	this.initRightWayBillTable();
	//this.queryWayBillGoods();
	this.initMainWayBillListTable();
//	this.initGoodsDetailTable();
	// 加载今日排线单数据
	this.loadFlatCableList();

	// 初始化日期控件
	dateUtils.initDate();
}

WaybillManage.prototype.deliveryRecordSelected = function() {
	this.map.centerAndZoom(this.curCityName, 13);// 层级13
	// 初始化表单验证
	var params = {
		"cityName" : this.curCityName
	};
	// 根据行政区域显示运单汇总信息
	this.queryWayBillInfoByName(params, WaybillManage
			.queryWayBillInfoByCityNameUrl());
}

WaybillManage.prototype.queryParamsWayBill = function(params) {
	var temp;
	if (WaybillManage.queryType == '1') {
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
			childWalbillStatus : $("#feature-tab").find(".active").find("a")
					.attr("queryChildWalbillStatus"),
			flatCableStatus : $("#queryFlatCableStatus").val(),
			truckingStatus : $("#queryTruckingStatus").val(),
			flatCableId : $("#queryFlatCableId").val(),
			dispatchVehicleId : $("#queryDispatchVehicleId").val(),
			orderId : $("#queryOrderId").val(),
			priority : $("#queryPriority").val(),
			paymentTimeStart : $("#queryPaymentTimeStart").val(),
			paymentTimeEnd : $("#queryPaymentTimeEnd").val()
		};
	} else {
		var array = $("#flatCableList").bootstrapTable('getSelections');
		var flatCableIds = "";
		for (var i = 0, length = array.length; i < length; i++) {
			if (i == 0) {
				flatCableIds += array[i].flatCableId;

			} else {
				flatCableIds += "," + array[i].flatCableId;
			}
		}
		temp = {
			pageSize : params.limit, // 页面大小
			offset : this.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
			status : 2,// 状态
			sort : params.sort,
			order : params.order,
			flatCableId : flatCableIds
		};
	}

	return temp;
}

WaybillManage.prototype.queryParamsWayBillGoods2 = function(params) {
	var temp = {
		"childWaybillId" : WaybillManage.waybill.childWaybillId
	}
	return temp;
}

WaybillManage.prototype.queryParamsWayBillGoods = function() {
	var array = $("#mainWayBillList").bootstrapTable('getSelections');
	var childWaybillIds = "";
	for (var i = 0, length = array.length; i < length; i++) {
		if (i == 0) {
			childWaybillIds += array[i].childWaybillId;
		} else {
			childWaybillIds += "," + array[i].childWaybillId;
		}
	}
	var params = {
		childWaybillId : childWaybillIds
	}
	return params;
}

Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEventsTuo = {
	//点击运单号触发查看运单详情
	'click .fcDetail_a' : function(e, value, row, index) {
		//alert("e:"+e+" value:"+value+" row:"+row+" index:"+index);
//		var selects = $("#mainWayBillList").bootstrapTable('getSelections');
		
		var allTableData = $("#mainWayBillList").bootstrapTable('getData');//获取表格的所有内容行
		$(".modal-body input").css("background-color","white");
		$(".modal-body select").css("background-color","white");
//			var waybill = selects[index];
//			this.queryWayBillGoods();
			waybillManage.initGoodsDetailTable(allTableData[index]);
			waybillManage.lookWaybillDetail(allTableData[index]);
			
	},
		
	// 详情
	'click .detailBtn' : function(e, value, row, index) {
		WaybillManage.lookWaybillDetail(row);
	},
	// 打印面单
	'click .waybillPrintBtn' : function(e, value, row, index) {
		var params = "?ids=" + row.flatCableId;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + WaybillManage.waybillPrintUrl + params);
	},
	// 按线路打印拣货单
	'click .flatCablePrintBtn' : function(e, value, row, index) {
		var params = "?ids=" + row.flatCableId;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + WaybillManage.flatCablePrintUrl + params);
	},
	// 打印派车单
	'click .dispatchVehiclePrintBtn' : function(e, value, row, index) {
		var params = "?ids=" + row.flatCableId;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + WaybillManage.dispatchVehiclePrintUrl
				+ params);
	},
	// 派车
	'click .dispatchVehicleBtn' : function(e, value, row, index) {
		WaybillManage.dispatchVehicleDialog.show(row);
	},
	// 作废
	'click .cancleBtn' : function(e, value, row, index) {
		var params = {
			'flatCableId' : row.flatCableId,
			'flatCableStatus' : 98
		}
		$.dialogConfirm({
			message : '作废后将无法恢复，请您确认真要作废吗？',
			callback : function(result) {
				if (result) {
					$.callAjax({
						type : "post",
						url : WaybillManage.updateStatus,
						data : params,
						success : function(data) {
							if (data.code != "0000") {
								$.toastrWarning(data.msg);
								return;
							}
							$('#flatCableList').bootstrapTable('refresh');

						},
						error : function() {
							$.toastrError();
						}
					});
				}
			}
		});
	}
};
var waybillManage = null;
$(document).ready(function() {
	waybillManage = new WaybillManage();
	waybillManage.init();
});
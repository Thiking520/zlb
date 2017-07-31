// 当前指定站点所处城市名称
var curCityName = "";
// 当前指定站点所处城市id
var curCityId = "";
// 百度地图API功能
var map = {};

// 行政区域数据
var areas = new Array();

var allWaybills = null;
// 主运单列表 数据集
var mainWayBillList = new Array();
// 右键选择的运单
var rightKeyWayBillList = new Array();
// 1 根据条件查询 2根据排线单查询
var queryType = "1";

var dmManager = {
	isResetOffset : 0,
	// 地图上小圆点大小
	circleSize : 120,
	// 地图上大圆点大小
	bigCircleSize : 200,
	URL : {
		// 根据区域查询运单汇总信息
		queryWayBillInfoByAreaNameUrl : function() {
			return '/tms/waybill/info/areaName';
		},
		// 根据城市查询运单汇总信息
		queryWayBillInfoByCityNameUrl : function() {
			return '/tms/waybill/info/cityName';
		},
		// 根据条件查询运单列表
		wayBillListUrl : function() {
			if (queryType == '1') {
				return '/tms/waybill/list';
			} else {
				return '/tms/waybill/queryWayBillListByFlatCableId';
			}
		},
		// 根据条件查询运单列表
		wayBillListNoPageUrl : function() {
			if (queryType == '1') {
				return '/tms/waybill/list/nopage';
			} else {
				return '/tms/waybill/queryWayBillListByFlatCableId/nopage';
			}
		},
		// 更新状态 这里作废业务有用到
		updateStatus : function() {
			return '/tms/flatCable/updateFlatCableStatus';
		},
		// 今日排线
		flatCableListTodayUrl : function() {
			return '/tms/flatCable/listToday';
		},
		// 新增排线单
		addFlatCableUrl : function() {
			return '/tms/flatCable/addFlatCable';
		},
		// 查询行政区域列表数据
		quereAreaUrl : function() {
			return '/publicData/baseArea/quereArea';
		},
		// 添加到已有的排线单
		addToExistFlatCableUrl : function() {
			return '/tms/flatCable/addToExistFlatCable';
		},
		// 新增排线单并创建派车单
		addFlatCableAndDispatchVehicleUrl : function() {
			return '/tms/flatCable/addFlatCableAndDispatchVehicle';
		},
		// 运单添加到派车单
		addDVList : function() {
			return '/tms/dispatchVehicleList/addDispatchVehicleList';
		},// 揽收
		pickUpdate : function() {
			return '/tms/waybill/updateWayBillListPick';
		},// 签收
		signUpdate : function() {
			return '/tms/waybill/updateWayBillListSign';
		},
		// 今日排线打印面单请求url
		waybillPrintUrl : function() {
			return '/tms/flatCable/print/waybill';
		},// 今日排线打印拣货单请求url
		flatCablePrintUrl : function() {
			return '/tms/flatCable/print/flatCable';
		},// 今日排线打印派车单请求url
		dispatchVehiclePrintUrl : function() {

			return '/tms/flatCable/print/dispatchVehicle';
		},
		queryCurrSite : function() {
			return '/tms/distributionSite/getCurrSite';
		},// 批量打印面单请求url
		waybillBatchPrintUrl : function() {
			return '/tms/waybill/print/waybill';
		}

	},
	// 批量打印面单
	waybillBatchPrint : function(dispatchVehicleIds) {
		// 触发Ajax
		var params = "?ids=" + dispatchVehicleIds;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window
				.open(contextPath + dmManager.URL.waybillBatchPrintUrl()
						+ params);
	},

	/**
	 * 生成排线单
	 */
	addFlatCable : function() {

		if ($('#cableDescribe').val().length == 0) {
			$.toastrWarning("请填写线路描述");
			return;
		}

		var flatCableListVos = new Array();
		var selects = $("#rightWayBillList").bootstrapTable('getSelections');

		for (var i = 0, len = selects.length; i < len; i++) {
			flatCableListVos[i] = {
				'childWaybillId' : selects[i].childWaybillId
			};
		}
		// debugger;
		var params = {
			'cableDescribe' : $('#cableDescribe').val(),
			'orderDetails' : "运单总数："
					+ $('#waybill_count_create_flatcable').text()
					+ "  大约总重量(千克)："
					+ $('#weight_total_create_flatcable').text() + "  货品总数："
					+ $('#goods_count_create_flatcable').text() + "  配送分类："
					+ $('#send_mode_create_flatcable').text() + "  件型分类："
					+ $('#size_type_create_flatcable').text(),
			'flatCableId' : $('#flatCableId').val(),
			'flatCableListVos' : flatCableListVos
		}
		// return;
		$.callAjax({
					type : "post",
					url : dmManager.URL.addFlatCableUrl(),
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
					},
					error : function() {
						$.toastrError();
					}
				});
	},
	/**
	 * 创建排线单并生成派车单
	 */
	addFlatCableAndDispatchVehicle : function() {
		if ($('#cableDescribe').val().length == 0) {
			$.toastrWarning("请填写线路描述");
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
		var selects = $("#rightWayBillList").bootstrapTable('getSelections');
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
					url : dmManager.URL.addFlatCableAndDispatchVehicleUrl(),
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
					},
					error : function() {
						$.toastrError();
					}
				});
	},
	/**
	 * 添加到已有的排线单
	 */
	addToExistFlatCable1 : function() {

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
					url : dmManager.URL.addToExistFlatCableUrl(),
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

	},
	/**
	 * 添加到已有的排线单
	 */
	addToExistFlatCable2 : function() {

		if ($('#flatCableId_2').val() == "") {
			$.toastrWarning("请填写线路编号");
			return;
		}
		var flatCableListVos = new Array();

		flatCableListVos.push(rightKeyWayBillList[0])

		var params = {
			'flatCableId' : $('#flatCableId_2').val(),
			'flatCableListVos' : flatCableListVos
		}
		$.callAjax({
					type : "post",
					url : dmManager.URL.addToExistFlatCableUrl(),
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

	},
	/**
	 * 根据行政区域查询运单信息
	 * 
	 * @param {}
	 *            params
	 * @param {}
	 *            url
	 */
	queryWayBillInfoByName : function(params, url) {

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
							dmManager.showWayBillInfo(obj.name, obj.sumnum,
									obj.notTruckingNum);
						}
					},
					error : function() {
						$.toastrError();
					}
				});
	},
	/**
	 * 获取当前选择站点
	 */
	queryCurrSite : function() {
		$.callAjax({
					url : dmManager.URL.queryCurrSite(),
					success : function(data) {
						// debugger;
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							return;
						}
						// 把所属站点城市信息存在全局变量里
						curCityId = data.data.city;
						curCityName = data.data.cityName;

						// 初始化页面数据
						dmManager.initPage();
					},
					error : function() {
						$.toastrError();
					}
				});
	},
	/**
	 * 在地图上显示运单信息
	 * 
	 * @param {}
	 *            rows
	 */
	showWayBill : function(rows2) {
		var rows = new Array();
		for (var i = 1, len = rows2.length; i <= len; i++) {
			rows.push(rows2[len - i]);
		}
		map.clearOverlays();

		// debugger;
		// 地图连线
		dmManager.ligature(rows);

		var waybill;
		// 在地图上绘制代表运单的圆点
		for (var i = 0, length = rows.length; i < length; i++) {
			waybill = rows[i];

			if (waybill["flag"] == true) {
				continue;
			}
			var point = new BMap.Point(waybill.longitude, waybill.latitude);

			var waybills = dmManager.searchSamePoint(waybill, rows);

			if (waybills.length == 0) {
				if (waybill.truckingStatus == "1") {
					dmManager.creatGrayPoint(point, waybill);
				} else if (waybill.flatCableStatus == "1") {
					dmManager.creatGreenPointNoEvent(point, waybill);
				} else {
					dmManager.creatRedPoint(point, waybill);
				}
			} else {
				waybill["flag"] = true;
				waybills.push(waybill);
				if (waybill.truckingStatus == "1") {
					dmManager.creatBigGrayPoint(point, waybills);
				} else if (waybill.flatCableStatus == "1") {
					dmManager.creatBigGreenPointNoEvent(point, waybills);
				} else {
					dmManager.creatBigRedPoint(point, waybills);
				}

			}

		}

	},
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
	searchSamePoint : function(waybill, rows) {
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
	},
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
	showWayBillInfo : function(areaName, sumnum, notTruckingNum) {
		var url = config.url_map_geocoder + "&address=" + areaName + "&city="
				+ curCityName + "&ak=" + config.url_map_ak;

		$.ajax({
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
							// debugger
							map.clearOverlays();
							// 定位到某个区
							map.centerAndZoom(this.areaName, 14);
							var areaId = "";
							for (var i = 0, length = areas.length; i < length; i++) {
								if (areas[i].areaName == this.areaName) {
									areaId = areas[i].id;
									break;
								}
							}
							$('#topAreaSelect').val(areaId);
							// 刷新运单信息
							$('#mainWayBillList').bootstrapTable('refresh');
						}
						circle.addEventListener("click", attribute.bind({
											"areaName" : areaName
										}));
						label.addEventListener("click", attribute.bind({
											"areaName" : areaName
										}));
						// 增加圆
						map.addOverlay(circle);

						map.addOverlay(label);

					}.bind(this)
				});
	},

	/**
	 * 地图连线
	 * 
	 * @param {}
	 *            rows
	 */
	ligature : function(rows) {
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

			map.addOverlay(polyline); // 增加折线

		}

	},
	/**
	 * 创建大绿点
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybills
	 */
	creatBigGreenPoint : function(point, waybills) {
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
			map.removeOverlay(circle);
			dmManager.creatBigRedPoint(point, this);

			var wayBillIds = new Array();

			for (index in waybills) {
				wayBillIds.push(waybills[index].childWaybillId);
			}
			$("#rightWayBillList").bootstrapTable('remove', {
						field : 'childWaybillId',
						values : wayBillIds
					});

			$("#rightWayBillList").bootstrapTable("checkAll");
			$("#goodsList").bootstrapTable('refresh');
		}
		circle.addEventListener("click", attribute.bind(waybills));
		label.addEventListener("click", attribute.bind(waybills));

		map.addOverlay(circle); // 增加圆

		map.addOverlay(label);
	},
	/**
	 * 创建大红点
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybills
	 */
	creatBigRedPoint : function(point, waybills) {

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
			map.removeOverlay(circle);
			dmManager.creatBigGreenPoint(point, this);

			$("#rightWayBillList").bootstrapTable('append', this);
			$("#rightWayBillList").bootstrapTable("checkAll");
			$("#goodsList").bootstrapTable('refresh');
		}
		circle.addEventListener("click", attribute.bind(waybills));
		label.addEventListener("click", attribute.bind(waybills));

		map.addOverlay(circle); // 增加圆

		map.addOverlay(label);
	},
	/**
	 * 创建大灰点
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybills
	 */
	creatBigGrayPoint : function(point, waybills) {
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
		map.addOverlay(circle);
		// map.addOverlay(label);
	},
	/**
	 * 地图上创建不带点击事件的绿色点 (大点)
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybill
	 */
	creatBigGreenPointNoEvent : function(point, waybills) {
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

		map.addOverlay(circle);

	},
	/**
	 * 地图上创建灰色点
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybill
	 */
	creatGrayPoint : function(point, waybill) {
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
		map.addOverlay(circle);
	},
	/**
	 * 地图上创建红色点
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybill
	 */
	creatRedPoint : function(point, waybill) {
		var circle = new BMap.Circle(point, this.circleSize, {
					strokeColor : "white",
					strokeWeight : 2,
					strokeOpacity : 0.5,
					fillOpacity : 1,
					fillColor : "red"
				}); // 创建圆
		var attribute = function(tag) {

			map.removeOverlay(circle);
			dmManager.creatGreenPoint(point, this);

			$("#rightWayBillList").bootstrapTable('append', [waybill]);
			$("#rightWayBillList").bootstrapTable("checkAll");
			$("#goodsList").bootstrapTable('refresh');
		}
		circle.addEventListener("click", attribute.bind(waybill));

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

		map.addOverlay(circle);
	},
	/**
	 * 地图上创建绿色点
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybill
	 */
	creatGreenPoint : function(point, waybill) {
		var circle = new BMap.Circle(point, this.circleSize, {
					strokeColor : "white",
					strokeWeight : 2,
					strokeOpacity : 0.5,
					fillOpacity : 1,
					fillColor : "green"
				}); // 创建圆
		var attribute = function(tag) {
			map.removeOverlay(circle);
			dmManager.creatRedPoint(point, this);

			var index = 0;
			$("#rightWayBillList").bootstrapTable('remove', {
						field : 'childWaybillId',
						values : [waybill.childWaybillId]
					});

			$("#rightWayBillList").bootstrapTable("checkAll");
			$("#goodsList").bootstrapTable('refresh');
		}
		circle.addEventListener("click", attribute.bind(waybill));

		// TODO 暂时去掉右键菜单 由于多点重合很难处理
		// var addMarker = function(e, ee, marker) {
		// $.showModal('#myModal5');
		// }
		// // 创建右键菜单
		// var markerMenu = new BMap.ContextMenu();
		// markerMenu
		// .addItem(new BMap.MenuItem('添加到排线单', addMarker.bind(waybill)));
		// circle.addContextMenu(markerMenu);

		map.addOverlay(circle);

	},
	/**
	 * 地图上创建不带点击事件的绿色点
	 * 
	 * @param {}
	 *            point
	 * @param {}
	 *            waybill
	 */
	creatGreenPointNoEvent : function(point, waybill) {
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

		map.addOverlay(circle);

	},
	/**
	 * 加载今日排线单列表数据
	 */
	loadFlatCableList : function() {
		$.pageTable({
			tableId : "#flatCableList",// 需要分页的table ID
			url : dmManager.URL.flatCableListTodayUrl(),// 请求后台的URL（*）
			queryParams : queryParamsWayBill,
			onLoadSuccess : function(data) {

			},
			columns : [{
						checkbox : true
					}, {
						field : 'disFlatCableId',
						title : '线路编号',
						width : 100
					}, {
						align : 'center',
						field : 'cableDescribe',
						width : 200,
						title : '线路描述'
					}, {
						align : 'center',
						field : 'waybillAmount',
						width : 80,
						title : '运单个数'
					}, {
						align : 'center',
						field : 'orderDetails',
						title : '订单详情'
					}, {
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
					}, {
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
						events : 'operateEvents'
					}]
		});
	},
	/**
	 * 查询货品明细
	 */
	queryWayBillGoods : function() {
		$.pageTable({
					tableId : "#goodsList",// 需要分页的table ID
					url : "/tms/waybill/queryWayBillGoods",// 请求后台的URL（*）
					queryParams : queryParamsWayBillGoods,
					toolbar : '#toolbar',
					pagination : false,
					onLoadSuccess : function(data) {
						// debugger;
						array = data.rows;
						$("#waybill_count_right").text($("#rightWayBillList")
								.bootstrapTable('getSelections').length);
						$("#waybill_count_goods_list")
								.text($("#rightWayBillList")
										.bootstrapTable('getSelections').length);
						$("#waybill_count_create_flatcable")
								.text($("#rightWayBillList")
										.bootstrapTable('getSelections').length);

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

						$("#send_mode_create_flatcable").text(sendModes
								.join("+"));
						$("#send_mode_goods_list").text(sendModes.join("+"));
						$("#size_type_create_flatcable").text(sizeTypes
								.join("+"));
						$("#size_type_goods_list").text(sizeTypes.join("+"));
					},
					columns : [{
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
							}]
				});
	},
	/**
	 * 初始化运单商品明细列表
	 */
	initGoodsDetailTable : function() {
		$.pageTable({
					tableId : "#goodsDetail_tab",// 需要分页的table ID
					url : "/tms/waybill/queryWayBillGoods",// 请求后台的URL（*）
					queryParams : queryParamsWayBillGoods2,
					toolbar : '#toolbar',
					onLoadSuccess : function(data) {

					},
					onClickRow : function(row) {
						Util.setValues(row);
					},
					columns : [{
								align : 'center',
								field : 'disChildWaybillId',
								title : '分段运单号'
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
								field : 'amount',
								title : '数量'
							}, {
								align : 'center',
								field : 'unit',
								title : '单位'
							}, {
								align : 'center',
								field : 'price',
								title : '单价'
							}, {
								align : 'center',
								field : 'activityAmount',
								title : '优惠金额'
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
								title : '数量'
							}, {
								align : 'center',
								field : 'weight',
								title : '净重(千克)'
							}, {
								align : 'center',
								field : 'volume',
								title : '体积'
							}]
				});
	},
	/**
	 * 根据查询条件加载运单（未分页）
	 */
	loadAllWayBills : function() {
		$.callAjax({
					type : 'post',
					data : queryParamsWayBill({
								'limit' : 10
							}),
					url : dmManager.URL.wayBillListNoPageUrl(),
					success : function(data) {
						// debugger;
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							return;
						}
						allWaybills = data.data.rows;
						dmManager.showWayBill(allWaybills);
					},
					error : function() {
						$.toastrError();
					}
				});
	},
	/**
	 * 初始化 主运单列表
	 */
	initMainWayBillListTable : function() {

		$.pageTable({
					tableId : "#mainWayBillList",
					url : dmManager.URL.wayBillListUrl(),
					queryParams : queryParamsWayBill,
					onLoadSuccess : function(data) {
						$("#rightWayBillList").bootstrapTable('removeAll');
						$("#goodsList").bootstrapTable('refresh');
						if ($("#topAreaSelect option:selected").val() != "") {
							dmManager.loadAllWayBills();
						}
					},
					columns : [{
								radio : true
							}, {
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
								field : 'orderId',
								title : '销售订单号'
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
									if (value == '10') {
										return "揽收件";
									} else if (value == '20') {
										return "配送件";
									}
								}
							}, {
								align : 'center',
								field : 'walbillStatus',
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
							}, {
								align : 'center',
								field : 'childWalbillStatus',
								title : '分段运单状态',
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
								title : '装车人'
							}, {
								align : 'center',
								field : 'pickUpGoodsTime',
								title : '装车时间'
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
							}, {
								align : 'center',
								field : 'describes',
								title : '描述'
							}/*, {
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
							}*/]
				});

	},

	/**
	 * 初始化运单右侧列表
	 */
	initRightWayBillTable : function() {

		// 列表组件
		$("#rightWayBillList").bootstrapTable({
			data : new Array(),
			columns : [{
						checkbox : true
					}, {
						field : 'disChildWaybillId',
						title : '分段运单'
					}, {
						align : 'center',
						field : 'areaName',
						title : '区域'
					}, {
						field : 'operation',
						title : '操作',
						formatter : function(value, row, index) {

							var detailBtn = '<a class="btn btn-info detailBtn" href="javascript:void(0)" id="'
									+ row.id + '" >详情</a>';

							return detailBtn;
						},
						events : 'operateEvents'
					}],
			onLoadSuccess : function(data) {
			},
			onUncheck : function(row) {
				$("#rightWayBillList").bootstrapTable('remove', {
							field : 'childWaybillId',
							values : [row.childWaybillId]
						});
				$("#goodsList").bootstrapTable('refresh');
				// debugger;
				if (row["flag"] == true) {
					var rightWaybills = $("#rightWayBillList")
							.bootstrapTable('getData')
					var waybills = dmManager
							.searchSamePoint(row, rightWaybills);
					if (waybills.length == 0) {
						var point = new BMap.Point(row.longitude, row.latitude);
						dmManager.removeOverlayByPoint(point);
						var waybills = dmManager.searchSamePoint(row,
								allWaybills);
						waybills.push(row);
						dmManager.creatBigRedPoint(point, waybills);
					}
					return;
				}
				var point = new BMap.Point(row.longitude, row.latitude);
				dmManager.removeOverlayByPoint(point);
				dmManager.creatRedPoint(point, row);

			}
		});

		$("#rightWayBillList").bootstrapTable('hideLoading');// 去掉商品列表的正在加载提示
	},
	/**
	 * 根据point来删除覆盖物
	 * 
	 * @param {}
	 *            point
	 * @return {Boolean}
	 */
	removeOverlayByPoint : function(point) {
		var allOverlay = map.getOverlays();
		for (var i = 0; i < allOverlay.length; i++) {
			// debugger;
			if (allOverlay[i].eQ == "Circle") {
				if (allOverlay[i].point.lat == point.lat
						&& allOverlay[i].point.lng == point.lng) {
					map.removeOverlay(allOverlay[i]);
					return false;
				}
			}
		}
	},

	/**
	 * 添加运单到已有派车单
	 */
	addDVList : function() {
		if ($('#dvId_7').val() == "") {
			$.toastrWarning("请输入派车单号");
			return;
		}
		var params = {
			'disDispatchVehicleId' : $('#dvId_7').val(),
			'childWaybillId' : $('#childWaybillId_7').val()
		}
		$.callAjax({
					type : "post",
					url : dmManager.URL.addDVList(),
					data : params,
					success : function(data) {
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							return;
						}
						$('#mainWayBillList').bootstrapTable('refresh');

						$.hideModal('#myModal7');
						$.toastrSuccess("添加到派车单成功");
					},
					error : function() {
						$.toastrError();
					}
				});
	},

	/**
	 * 揽收
	 */
	pickUpdate : function() {
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
					url : dmManager.URL.pickUpdate(),
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

	},
	/**
	 * 签收
	 */
	signUpdate : function() {
		var params = "";

		var radios = document.getElementsByName("rSign");
		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked == true) {
				if (i == 0) {
					$('#signTs_2').html("");
					if ($('#signId').val() == null || $('#signId').val() == '') {
						$('#signTs').html("签收人不能为空！");
						return;
					}
					if ($('#signTime').val() == null
							|| $('#signTime').val() == '') {
						$('#signTs').html("签收时间不能为空！");
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
				} else if (i == 1) {
					$('#signTs').html("");
					if ($('#signId_2').val() == null
							|| $('#signId_2').val() == '') {
						$('#signTs_2').html("异常签收人不能为空！");
						return;
					}
					if ($('#signInReason_2').val() == null
							|| $('#signInReason_2').val() == '') {
						$('#signTs_2').html("异常签收原因不能为空！");
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
					url : dmManager.URL.signUpdate(),
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
	},

	/**
	 * 初始化顶部 区域下拉框数据
	 */
	initTopAreaCombobox : function() {

		$('#topCitySelect').append("<option value='" + curCityId + "'>"
				+ curCityName + "</option>");

		var params = {
			'id' : curCityId
		}
		$.callAjax({
					type : "post",
					url : dmManager.URL.quereAreaUrl(),
					data : params,
					success : function(data) {
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							return;
						}
						var rows = data.data;
						$('#topAreaSelect')
								.append("<option value=''>全部</option>");
						for (var i = 0, length = rows.length; i < length; i++) {
							$('#topAreaSelect').append("<option value='"
									+ rows[i].id + "'>" + rows[i].areaName
									+ "</option>");
							areas[i] = {
								"id" : rows[i].id,
								"areaName" : rows[i].areaName
							}
						}

					},
					error : function() {
						$.toastrError();
					}
				});
	},
	/**
	 * 查询运单详情
	 * 
	 * @param {}
	 *            waybill
	 */
	lookWaybillDetail : function(waybill) {
		// 是否显示 签收按钮
		if (waybill.childWalbillStatus == '50') {
			$("#btn_look_show_sign").show();
		} else {
			$("#btn_look_show_sign").hide();
		}

		Util.setValues(waybill);
		$("#goodsDetail_tab").bootstrapTable('refresh');
		$.showModal('#myModal');
	},
	bindEvent : function() {
		// 打印面单按钮点击事件
		$("#print1").on("click", function() {
					$("#print1").addClass("disabled");
					var ids = $.getIdSelections("#mainWayBillList",
							"childWaybillId");
					if (ids == null || ids == '') {
						$.toastrWarning('请先选择记录再操作！');
						return false;
					}
					dmManager.waybillBatchPrint(ids);
				});
		// 区域选择事件
		$('#topAreaSelect').change(function() {
			var areaName = $(this).children('option:selected').text();
			// debugger
			if (areaName == "全部") {
				map.clearOverlays();
				map.centerAndZoom(curCityName, 13);
				var params = {
					"cityName" : curCityName
				};
				dmManager.queryWayBillInfoByName(params, dmManager.URL
								.queryWayBillInfoByCityNameUrl());
				$("#mainWayBillList").bootstrapTable('refresh');
			} else {
				map.centerAndZoom(areaName, 14);
				$("#mainWayBillList").bootstrapTable('refresh');
			}

		});

		// 生成路线 弹出框
		$("#addFlatCable").click(function() {
			var selects = $("#rightWayBillList")
					.bootstrapTable('getSelections');
			if (selects.length == 0) {
				$.toastrWarning("请先选择运单");
				return;
			}
			$.showModal('#addFlatCableModal');
		});
		// 生成路线
		$("#btnAddFlatCable").click(function() {
					dmManager.addFlatCable();
				});
		// 生成路线并创建派车单
		$("#btnDddFlatCableAndDispatchVehicle").click(function() {
					dmManager.addFlatCableAndDispatchVehicle();
				});
		// 添加到已有排线单弹框事件
		$("#addToExistFlatCable").click(function() {
			var selects = $("#rightWayBillList")
					.bootstrapTable('getSelections');
			if (selects.length == 0) {
				$.toastrWarning("请先选择运单");
				return;
			}
			$.showModal('#myModal5');
		});

		// 查看货品明细
		$("#btnQueryWayBillGoods").click(function() {
			var selects = $("#rightWayBillList")
					.bootstrapTable('getSelections');
			if (selects.length == 0) {
				$.toastrWarning("请先选择运单");
				return;
			}
			$.showModal('#myModal1');
		});
		// 添加到已有排线单确定按钮事件 右侧的
		$("#btnAffirm").click(function() {
					dmManager.addToExistFlatCable1();
				});

		// 添加到已有排线单确定按钮事件 地图上的
		$("#btnAffirm_1").click(function() {
					dmManager.addToExistFlatCable2();
				});

		// 司机弹出框
		$("#search_driver_xd_1").on("click", function() {
					driverDialog1.show();
				});
		// 车辆弹出框
		$("#search_car_xd_1").on("click", function() {
					vehicleDialog1.show();
				});

		// 主运单列表 查看事件
		$("#btn_show_look").click(function() {
			var selects = $("#mainWayBillList").bootstrapTable('getSelections');
			if (selects.length == 1) {
				var waybill = selects[0];
				dmManager.lookWaybillDetail(waybill);
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		// 添加到派车单 弹出框
		$("#btn_show_add_to_DV").click(function() {
			var selects = $("#mainWayBillList").bootstrapTable('getSelections');
			if (selects.length == 1) {
				var waybill = selects[0];
				$('#childWaybillId_7').val(waybill.childWaybillId);
				$.showModal('#myModal7');
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		// 确认添加到派车单
		$("#btn_add_to_DV").click(function() {
					dmManager.addDVList();
				});
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
		$("#btn_show_pick").click(function() {
			var selects = $("#mainWayBillList").bootstrapTable('getSelections');
			if (selects.length == 1) {
				var waybill = selects[0];
				if (waybill.pickUpGoodsPeople == null
						|| waybill.pickUpGoodsPeople == '') {

					$('#pickTime').val(Util.dateFormat(new Date(),
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
			$('#pickTime').val(Util.dateFormat(new Date(),
					"yyyy-MM-dd HH:mm:ss"));
			$('#childWaybillId_8').val($('#childWaybillId').val());
			$('#pickTs').html("");
			$.showModal('#myModal8');
		});
		// 揽收确认
		$("#btn_pick").click(function() {
					dmManager.pickUpdate();
				});
		// 签收弹出框
		$("#btn_look_show_sign").click(function() {

			$('#signTime').val(Util.dateFormat(new Date(),
					"yyyy-MM-dd HH:mm:ss"));
			$('#childWaybillId_9').val($('#childWaybillId').val());
			$('#signTs').html("");
			$('#signTs_2').html("");
			$.showModal('#myModal9');
		});
		// 签收弹出框
		$("#btn_show_sign").click(function() {
			var selects = $("#mainWayBillList").bootstrapTable('getSelections');
			if (selects.length == 1) {
				var waybill = selects[0];
				if (waybill.childWalbillStatus != '50') {
					$.toastrWarning("只有在途中的分段运单才能可以做签收操作");
					return;
				}
				$('#signTime').val(Util.dateFormat(new Date(),
						"yyyy-MM-dd HH:mm:ss"));
				$('#childWaybillId_9').val(waybill.childWaybillId);
				$('#signTs').html("");
				$('#signTs_2').html("");
				$.showModal('#myModal9');
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}
		});
		// 签收
		$("#btn_sign").click(function() {

					dmManager.signUpdate();

				});
		// 更多条件 弹框 确定按钮事件
		$("#queryAffirm").click(function() {
			queryType = "1";

			$("#mainWayBillList").bootstrapTable('refresh', {
						url : $("#contextPath").val()
								+ dmManager.URL.wayBillListUrl()
					});
			$('.L_specific_Popup').css('display', 'none');
		});
		// 更多条件 弹框 取消按钮事件
		$("#queryCancle").click(function() {
					$('.L_specific_Popup').css('display', 'none');
				});
		// 今日排线 弹框确定按钮事件
		$("#todayAffirm").click(function() {
			queryType = "2";
			$("#mainWayBillList").bootstrapTable('refresh', {
						url : $("#contextPath").val()
								+ dmManager.URL.wayBillListUrl()
					});
			$('.L_specific_Popup1').css('display', 'none');
		});
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
				logDialog.show();
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			};
		});
		// 物流信息 按钮事件
		$("#btn_show_OL2").click(function() {
			var selects = $("#mainWayBillList").bootstrapTable('getSelections');
			if (selects.length == 1) {
				var waybill = selects[0];

				$('#bill_2').val(waybill.parentWaybillId);
				logisticsDialog.show();
			} else {
				$.toastrWarning("请选择一条数据进行操作！");
			}

		});

		// 更多条件 按钮事件
		$('.L_Popup').click(function() {
					if ($('.L_specific_Popup').css('display') == "none") {
						$('.L_specific_Popup').css('display', 'block');
					} else {
						$('.L_specific_Popup').css('display', 'none');
					};
					$('.L_specific_Popup1').css('display', 'none');
				});
		// 今日排线 按钮事件
		$('.L_Popup1').click(function() {
					if ($('.L_specific_Popup1').css('display') == "none") {
						$('.L_specific_Popup1').css('display', 'block');
					} else {
						$('.L_specific_Popup1').css('display', 'none');
					};
					$('.L_specific_Popup').css('display', 'none');
				});

		// 派车单号 去除空格
		$('#dvId_7').keyup(function() {
					var dvId7 = $('#dvId_7')
					var dvIdval = $.trim(dvId7.val());
					dvId7.val(dvIdval);
				});
		
		

	},

	// 初始化分页查询列表数据 ★★★分页主体列表★★★
	init : function() {

		dmManager.queryCurrSite();
		dmManager.bindEvent();
	},
	initPage : function() {
		map = new BMap.Map("allmap", {
					enableMapClick : false
				});
		// var point = new BMap.Point(113.960902, 22.542507);
		map.centerAndZoom(curCityName, 13);// 层级13

		map.disableDoubleClickZoom();
		dmManager.initTopAreaCombobox();

		var params = {
			"cityName" : curCityName
		};
		// 根据行政区域显示运单汇总信息
		dmManager.queryWayBillInfoByName(params, dmManager.URL
						.queryWayBillInfoByCityNameUrl());

		// 初始化右侧运单列表
		dmManager.initRightWayBillTable();
		dmManager.queryWayBillGoods();
		dmManager.initMainWayBillListTable();
		dmManager.initGoodsDetailTable();
		// 加载今日排线单数据
		dmManager.loadFlatCableList();

		// 初始化日期控件
		dateUtils.initDate();
	},
	deliveryRecordSelected : function() {
		map.centerAndZoom(curCityName, 13);// 层级13
		// 初始化表单验证
		var params = {
			"cityName" : curCityName
		};
		// 根据行政区域显示运单汇总信息
		dmManager.queryWayBillInfoByName(params, dmManager.URL
						.queryWayBillInfoByCityNameUrl());
	}
}
// 新建派车单弹出框
var dispatchVehicleDialog = new DispatchVehicleDialog();
// 司机弹出框
var driverDialog1 = new DriverDialog({
			// 确认按钮 点击事件的回调函数
			confirmCallback : function(row) {
				// debugger;
				$('#driver_xd_1').val(row.id);
				$('#driverName_xd_1').val(row.cnName);
				$('#driverPhone_xd_1').val(row.mobileNo);
			}
		});

var logDialog = new LogDialog();
var logisticsDialog = new LogisticsDialog();

// 车辆弹出框
var vehicleDialog1 = new VehicleDialog({
			confirmCallback : function(row) {
				// debugger;
				$('#vehicleId_xd_1').val(row.id);
				$('#vehicleNumber_xd_1').val(row.carNumber);
				this.carsDetais(row.id);
			},
			success : function(data) {
				// debugger;
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
				$("#selfSupport_xd_1 option[value='" + data.data.selfSupport
						+ "']").attr("selected", true);
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
				$.showModal('#myModal04');;
			}
		});
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParamsWayBill = function(params) {
	var temp;
	if (queryType == '1') {
		// debugger;
		temp = {
			pageSize : params.limit, // 页面大小
			offset : dmManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
			status : 2,// 状态
			sort : params.sort,
			order : params.order,
			city : $("#topCitySelect option:selected").val(),
			area : $("#topAreaSelect option:selected").val(),
			childWaybillId : $("#queryChildWaybillId").val(),
			childWalbillStatus : $("#queryChildWalbillStatus").val(),
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
			offset : dmManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
			status : 2,// 状态
			sort : params.sort,
			order : params.order,
			flatCableId : flatCableIds
		};
	}

	return temp;
};

var queryParamsWayBillGoods2 = function() {
	var params = {
		"childWaybillId" : $("#childWaybillId").val()
	}
	return params;
}

var queryParamsWayBillGoods = function() {
	var array = $("#rightWayBillList").bootstrapTable('getSelections');
	var childWaybillIds = "";
	for (var i = 0, length = array.length; i < length; i++) {
		if (i == 0) {
			childWaybillIds += array[i].childWaybillId;
		} else {
			childWaybillIds += "," + array[i].childWaybillId;
		}
	}
	var params = {
		"childWaybillId" : childWaybillIds
	}
	return params;
}


// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {

	// 详情
	'click .detailBtn' : function(e, value, row, index) {
		dmManager.lookWaybillDetail(row);
	},
	// 打印面单
	'click .waybillPrintBtn' : function(e, value, row, index) {
		var params = "?ids=" + row.flatCableId;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + dmManager.URL.waybillPrintUrl() + params);
	},
	// 按线路打印拣货单
	'click .flatCablePrintBtn' : function(e, value, row, index) {
		var params = "?ids=" + row.flatCableId;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + dmManager.URL.flatCablePrintUrl() + params);
	},
	// 打印派车单
	'click .dispatchVehiclePrintBtn' : function(e, value, row, index) {
		var params = "?ids=" + row.flatCableId;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + dmManager.URL.dispatchVehiclePrintUrl()
				+ params);
	},
	// 派车
	'click .dispatchVehicleBtn' : function(e, value, row, index) {
		dispatchVehicleDialog.show(row);
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
										url : dmManager.URL.updateStatus(),
										data : params,
										success : function(data) {
											if (data.code != "0000") {
												$.toastrWarning(data.msg);
												return;
											}
											$('#flatCableList')
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
};
$(document).ready(function() {
			// 1、初始化
			dmManager.init();
		});
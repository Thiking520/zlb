var deliveryTypeArr=[];
var levelArr=[];
var deliveryManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//类型,1:覆盖范围  2 排除范围
	scopeType : 0,
	//站点覆盖范围的表单ID
	coverScopeTableId : "coverScopeTable",
	//站点排除范围的表单ID
	excludeScopeTableId : "excludeScopeTable",
	//从列表选中的覆盖范围对象或排除范围对象
	selectScopeObj : null,
	//站点基本信息表单
	deliveryBaseInfoForm : "deliveryBaseInfoForm",
	//覆盖/排除范围基础信息表单
	coverAndExcludeScopeForm : "coverAndExcludeScopeForm",
	//包裹覆盖/排除范围基础信息表单的Div
	scopeFormDivId : "coverAndExcludeScope",
	baiduMap : {},
	//绘制的覆盖物对象
	overlayObj : null,
	//绘制的覆盖物类型，0:不是覆盖物,1:点,2:多边形(矩形),3:圆形,4:线
	overlayObjType : null,
	//站点所在城市
	deliveryCityName : null,
	//站点所在区
	deliveryAreaName : null,
	//当前站点ID
	curDeliveryRecordId : null,
	//当前站点对应的marker红点
	curDeliveryRecordMark : null,
	//通过站点ID从数据库获取的站点对象
	dbDeliveryRecord : null,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//初始化下拉框
        initDropDownBoxUrl: function () {
            return '/publicData/deliveryRecord/initDropDownBox';
        },
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/deliveryRecord/list';
        },//分页获取站点范围列表URL
        searchScopeListUrl :function() {
        	return '/publicData/deliveryScope/list';
        },//获取覆盖物点集合URL
        searchScopePointsUrl :function() {
        	return '/publicData/deliveryScope/overLayPoints';
        },//员工列表
        driverListUrl: function () {
            return '/tms/emp/list';
        },//新增站点基本信息
	    addDRUrl: function () {
	        return '/publicData/deliveryRecord/add';
	    },//更新站点基本信息
	    updateDR:function(){
	        return '/publicData/deliveryRecord/updateDeliveryRecord';
	    },//新增站点覆盖范围
        addDeliveryScope :function() {
        	return '/publicData/deliveryScope/add';
        },//修改站点覆盖范围
        updateDeliveryScope :function() {
        	return '/publicData/deliveryScope/updateDeliveryScope';
        },//删除站点范围
        deleteDeliveryScopeUrl :function() {
        	return '/publicData/deliveryScope/delete';
        },//查看站点详情的请求地址
        getDRDetaisUrl: function () {
            return '/publicData/deliveryRecord/queryDeliveryRecordDetails';
        }
    /**通过ID获取站点详情**/
    },getDeliveryDetailById : function () {
    	$.callAjax({
			url : deliveryManage.URL.getDRDetaisUrl(),
			data : {"id":deliveryManage.curDeliveryRecordId},
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if($.isNotNull(data.data)){
         			$("#deliveryName").html("[" + data.data.name + "]");
         			Util.setValues(data.data);
	         		deliveryManage.dbDeliveryRecord = data.data;
	         		deliveryManage.initDropDownBox();
	         		
	         		deliveryManage.initMap();
	         		//渲染地图
	         		//deliveryManage.createMapPoint(data.data)
         		}
			}
		});
    },initDropDownBox : function () {
    	$.callAjax({
			url : deliveryManage.URL.initDropDownBoxUrl(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		//构建仓库类型下拉框
         		var deliveryTypeOption = "";
         		for (var i = 0; i < data.data.deliveryTypeList.length; i++) {
					deliveryTypeArr[data.data.deliveryTypeList[i].dictValue] = data.data.deliveryTypeList[i].dictDesc;
					deliveryTypeOption += '<option value="' + data.data.deliveryTypeList[i].dictValue + '" '
					+ ("add" != initOperationType && data.data.deliveryTypeList[i].dictValue === deliveryManage.dbDeliveryRecord.deliveryType ? 'selected="selected"' : "") +' >' 
					+ data.data.deliveryTypeList[i].dictDesc + "</option>";
				}
				$('#deliveryType').html(deliveryTypeOption);
				
				//回写站点状态、是否自提
				if ("add" != initOperationType && $.isNotNull(deliveryManage.dbDeliveryRecord)) {
					$("#enabled option").each(function() { 
						if($(this).val() == deliveryManage.dbDeliveryRecord.enabled){
						   $(this).attr("selected",'selected');
						}
					});
					$("#selfPickup option").each(function() {
						if($(this).val() == deliveryManage.dbDeliveryRecord.selfPickup){
						   $(this).attr("selected",'selected');
						}
					});
				} 
				deliveryManage.disClick();
				
				//构建覆盖范围类型下拉框
				var scopeLeveTypeOption = "";
				for (var i = 0; i < data.data.levelList.length; i++) {
					levelArr[data.data.levelList[i].dictValue] = data.data.levelList[i].dictDesc;
					scopeLeveTypeOption += "<option value='" + data.data.levelList[i].dictValue + "'>" + data.data.levelList[i].dictDesc + "</option>";
				}
				$('#scopeLeveType').html(scopeLeveTypeOption);
				//加载覆盖范围列表、排除范围列表
				if($.isNotNull(deliveryManage.curDeliveryRecordId)){
				  deliveryManage.searchCoverOrExcludeScopeListByPage(deliveryManage.coverScopeTableId);
				  deliveryManage.searchCoverOrExcludeScopeListByPage(deliveryManage.excludeScopeTableId);
				}
			}
		});
    },/**分页获取站点覆盖或排除范围列表**/
    searchCoverOrExcludeScopeListByPage: function (tableId) {
    	//分页组件
    	$.pageTable({
    		tableId: "#" + tableId,//需要分页的table ID
    		url: deliveryManage.URL.searchScopeListUrl(),//请求后台的URL（*）
    		queryParams:queryCoverOrExcludeScopeParams,
    		onLoadSuccess:function(){
    			deliveryManage.isResetOffset = 0;
	        },
			onClickRow : function(row) {
				deliveryManage.baiduMap.panTo(new BMap.Point(row.longitude, row.latitude)); 
				deliveryManage.selectScopeObj = row;
				deliveryManage.fillScopeInfo(row);
				deliveryManage.resetCoverAndExcludeScope();
				deliveryManage.createMapOverLays();
				deliveryManage.hideOrShowSomeDrawTools(row.level);
			},
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			radio: true,
    			events: 'operateEvents'
    		}, {
    			field: 'name',
    			title: '名称',
    			width:'70%',
    			align: 'center'
    		}, {
    			field: 'level',
    			title: '类型',
    			width:'30%',
    			align: 'center',
    			formatter:function(value,row,index){
    				return levelArr[value];
    			}
    		}, {
    			field: 'id',
    			title: '操作',
    			align: 'center',
    	        formatter:function(value,row,index){
    	           var deleteBtn;
    	           if("view" != initOperationType){
    	           	   deleteBtn = '<a class="btn btn-danger btn-sm delete_scope_a" href="javascript:void(0)" >删除</a>';
    	           }
    	           return deleteBtn; 
    	        },
    	        events: 'operateEvents'
    	    } 
    		]
    	});
    },/**分页获取上级站点列表**/
	searchListByPageSJ: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#superiorList",//需要分页的table ID
    		url: deliveryManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsSJ,
    		onLoadSuccess:function(){
    			deliveryManage.isResetOffset = 0;
    			$("#btn_search_s").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'code',
    			title: '编码'
    		}, {
    			field: 'name',
    			title: '名称',
    			align: 'center'
    		}, {
    			field: 'deliveryType',
    			title: '类型',
    			align: 'center',
    			formatter:function(value,row,index){
					return deliveryTypeArr[value];
    			}
    		}
    		]
    	});
	},/**分页查询员工列表**/
	searchEmp :function(){
		$.pageTable({
    		tableId: "#empList",//需要分页的table ID
    		url: deliveryManage.URL.driverListUrl(),//请求后台的URL（*）
    		queryParams:queryParamsEmp,
    		onLoadSuccess:function(){
    			deliveryManage.isResetOffset = 0;
    			$("#btn_search_emp").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'uniqueKey',
    			title: 'key值'
    		}, {
    			align: 'center',
    			field: 'cnName',
    			title: '中文名'
    		},{
    			align: 'center',
    			field: 'mobileNo',
    			title: '手机号码'
    		} 
    		]
    	});
	},
    /**新增或修改站点基本信息**/
    addOrUpdateDeliveryBaseInfo: function () {
    	var ajaxUrl;
    	if("add" === initOperationType){
    		ajaxUrl = deliveryManage.URL.addDRUrl();
    		if($.isNull(deliveryManage.overlayObj)){
	    		$.toastrWarning("请先操作地图右上角的绘图工具在地图上画点，用于标记站点位置，再进行保存。");
	    		return; 
			}
    	} else {
			ajaxUrl = deliveryManage.URL.updateDR();
		}
		var params = deliveryManage.getAjaxParams(deliveryManage.overlayObjType,deliveryManage.deliveryBaseInfoForm);
		params.id = deliveryManage.curDeliveryRecordId;
		params.superior = $("#superior").val();
		params.deliveryHead = $("#deliveryHead").val();
		params.deliveryHeadPhone = $("#deliveryHeadPhone").val();
		params.cityName = deliveryManage.deliveryCityName;
		params.areaName = deliveryManage.deliveryAreaName;
    	$.callAjax({
			url : ajaxUrl,
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if("add" === initOperationType){
         			deliveryManage.cleanLastOverLay();
         			deliveryManage.curDeliveryRecordId = data.data.id;
         			$("#btn_delivery_submit").hide();
         		}
         		deliveryManage.dbDeliveryRecord = data.data;
         		$.toastrSuccess("保存成功!");
         		$("#deliveryName").html("[" + $("#name").val() + "]");
         		deliveryManage.initDrawingManager();
         		deliveryManage.hideDrawTools();
			}
	    });
    },
    /**新增或修改覆盖/排除范围基本信息**/
    addOrUpdateScopeInfo: function () {
    	var ajaxUrl;
    	var drawingScopeWaring = "请先操作地图右上角的绘图工具,在地图上绘制" + (deliveryManage.scopeType == 1 ? "覆盖范围" : "排除范围") + "再进行保存。";
    	if("add" === initOperationType){
    		ajaxUrl = deliveryManage.URL.addDeliveryScope();
    		if($.isNull(deliveryManage.curDeliveryRecordId)){
    			$.toastrWarning("请先录入站点基本信息再进行该操作。");
    			return;
    		}
    		if($.isNull(deliveryManage.overlayObj)){
	    		$.toastrWarning(drawingScopeWaring);
	    		return; 
			}
    	} 
    	//覆盖范围主键ID
    	var deliveryScopeId = null;
    	if ("edit" === initOperationType) {
    		//如果没选中列表中的某条数据则代表新增操作，否则代表更新操作
			if ($.isNull(deliveryManage.selectScopeObj)) {
				ajaxUrl = deliveryManage.URL.addDeliveryScope();
				if ($.isNull(deliveryManage.overlayObj)) {
					$.toastrWarning(drawingScopeWaring);
					return;
				}
			} else {
				ajaxUrl = deliveryManage.URL.updateDeliveryScope();
				deliveryScopeId = deliveryManage.selectScopeObj.id;
			}
		}
		var params = deliveryManage.getAjaxParams(deliveryManage.overlayObjType,deliveryManage.coverAndExcludeScopeForm);
		params.deliveryRecordId = deliveryManage.curDeliveryRecordId;
		params.isDelivery = deliveryManage.scopeType;
		params.overlayType = deliveryManage.overlayObjType;
		params.scopeHead = $("#scopeHead").val();
		params.overLayPoints = deliveryManage.getPointPathArray();
		params.id = deliveryScopeId;
		params.detailedAddress = $("#scopeDetailedAddress").val();
		
    	$.callAjax({
			url : ajaxUrl,
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$.toastrSuccess("保存成功!");
         		deliveryManage.cleanLastOverLay();
     			$.clearForm(deliveryManage.coverAndExcludeScopeForm);
     			deliveryManage.resetCoverAndExcludeScope();
         		deliveryManage.refreshScopeTableList();
         		deliveryManage.initDrawingManager();
			}
	    });
    },
    /** 删除站点范围*/
    deleteDeliveryScope : function (id,scopeName) {
    	$.dialogConfirm({
            message: '您确定要删除[' + scopeName + ']站点范围吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id,'deliveryRecordId':deliveryManage.curDeliveryRecordId};
        			$.callAjax({
        				url : deliveryManage.URL.deleteDeliveryScopeUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$.toastrSuccess('删除成功！');
    		         		$.clearForm(deliveryManage.coverAndExcludeScopeForm);
    		         		deliveryManage.resetCoverAndExcludeScope();
    		         		deliveryManage.refreshScopeTableList();
    		         		deliveryManage.selectScopeObj = null;
        				}
        			});
                }
            }
        });
    },
    /**获取入参**/
    getAjaxParams: function (overlayType,formId) {
    	var params = $.getFromParmObject(formId);
    	//覆盖物类型，0:不是覆盖物,1:点,2:多边形(矩形),3:圆形,4:线
    	switch(overlayType){
		  	case 1:
		  	  var markerPoint = deliveryManage.overlayObj.getPosition();
		  	  params.latitude = markerPoint.lat;
		  	  params.longitude = markerPoint.lng;
		  	break;
		  	case 2:
		  	case 4:
		  	  var overlayBounds = deliveryManage.overlayObj.getBounds();
		      var southWestPoint = overlayBounds.getSouthWest();
		      var northEastPoint = overlayBounds.getNorthEast();
		      params.southWestPointLat = southWestPoint.lat;
		  	  params.southWestPointLng = southWestPoint.lng;
		  	  params.northEastPointLat = northEastPoint.lat;
		  	  params.northEastPointLng = northEastPoint.lng;
		  	  params.latitude = overlayBounds.getCenter().lat; 
		  	  params.longitude = overlayBounds.getCenter().lng; 
		  	break;
		  	case 3:
		  	  var circlePoint = deliveryManage.overlayObj.getCenter();
		  	  params.latitude = circlePoint.lat;
		  	  params.longitude = circlePoint.lng;
		  	  params.circleRadius = deliveryManage.overlayObj.getRadius();
		  	break;
		}
    	return params;
    },/**创建地图覆盖物**/
	createMapOverLays :function(){
		var params = {"deliveryRecordId" : deliveryManage.curDeliveryRecordId,"isDelivery" : deliveryManage.scopeType};
		$.callAjax({
			url : deliveryManage.URL.searchScopePointsUrl(),
			data : params,
			success : function(data){
				deliveryManage.cleanOverLays();
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		var overLaysList = data.data;
         		if($.isNull(overLaysList)){
         		    return;
         		}
         		for (var i = 0; i < overLaysList.length; i++) {
					// 覆盖物类型，0:不是覆盖物,1:点,2:多边形(矩形),3:圆形,4:线
					switch (overLaysList[i].overlayType) {
						case 1 :
							deliveryManage.createMapPoint(overLaysList[i]);
							break;
						case 2 :
							deliveryManage.createMapPolygon(overLaysList[i]);
							break;
						case 3 :
							deliveryManage.createMapCircle(overLaysList[i]);
							break;
						case 4 :
							deliveryManage.createMapPolyline(overLaysList[i]);
							break;
					}
				}
			}
	    });
	},/**创建点**/
	createMapPoint :function(overLayObject){
		var myIcon;
		//若在站点基本信息界面在启用仓库图标
		if(0 === deliveryManage.scopeType){
			myIcon = new BMap.Icon(contextPath + "/resources/img/map_warehouse.gif", new BMap.Size(58,58));
		} else {
		    myIcon = new BMap.Icon(contextPath + "/resources/img/map_mark_small_red.png", new BMap.Size(25,28));
		}
		var point = new BMap.Point(overLayObject.longitude, overLayObject.latitude);
        var marker = new BMap.Marker(point,{icon:myIcon});
        deliveryManage.baiduMap.addOverlay(marker);
        if(0 === deliveryManage.scopeType){
        	deliveryManage.baiduMap.panTo(point); 
			marker.setAnimation(BMAP_ANIMATION_BOUNCE);
		} else {
			if ($.isNotNull(deliveryManage.selectScopeObj)) {
				if (deliveryManage.selectScopeObj.id === overLayObject.id) {
					marker.setAnimation(BMAP_ANIMATION_BOUNCE);
				}
			}
		}
        return marker;
        
	},/**创建多边形(矩形)**/
	createMapPolygon :function(overLayObject){
		var overLayPoints = overLayObject.overLayPoints;
		if($.isNull(overLayPoints)){
		  return;
		}
		var pointArr = deliveryManage.getOverLayPoints(overLayPoints);
		var polygon = new BMap.Polygon(pointArr, deliveryManage.getOverLayOptions(overLayObject)); 
	    deliveryManage.baiduMap.addOverlay(polygon); 
	},/**创建圆形**/
	createMapCircle :function(overLayObject){
		var point = new BMap.Point(overLayObject.longitude, overLayObject.latitude);
		var circleRadius = overLayObject.circleRadius;
		var circle = new BMap.Circle(point,circleRadius,deliveryManage.getOverLayOptions(overLayObject));
		deliveryManage.baiduMap.addOverlay(circle);
	},/**创建线**/
	createMapPolyline :function(overLayObject){
		var overLayPoints = overLayObject.overLayPoints;
		if($.isNull(overLayPoints)){
		  return;
		}
		var pointArr = deliveryManage.getOverLayPoints(overLayPoints);
		var polyline = new BMap.Polyline(pointArr, {strokeColor:"#EE7C6B", strokeWeight:3}); 
	    deliveryManage.baiduMap.addOverlay(polyline); 
	},/**获取覆盖物样式**/
	getOverLayOptions :function(overLayObject){
		var polygonOptions = {fillColor:"#EE7C6B", strokeWeight:0.1};
		if($.isNotNull(deliveryManage.selectScopeObj)){
			if(deliveryManage.selectScopeObj.id === overLayObject.id){
			   polygonOptions.strokeWeight = 3;
			   polygonOptions.strokeColor = "#E33539";
			}
		}
		return polygonOptions;
	},/**获取某覆盖物点集合,用于回写至地图**/
	getOverLayPoints :function(overLayPoints){
		var pointArr = new Array();
		for (var i = 0; i < overLayPoints.length; i++) {
			pointArr.push(new BMap.Point(overLayPoints[i].pointLongitude, overLayPoints[i].pointLatitude));
		}
		return pointArr;
	},/**获取地图上某覆盖物点集合**/
	getPointPathArray :function(){
		var pointArr = null;
		//只有矩形和线类型的覆盖物才会有点集合
		if (2 == deliveryManage.overlayObjType || 4 == deliveryManage.overlayObjType) {
			// 覆盖物的点集合
			var pointPathArray = deliveryManage.overlayObj.getPath();
			if ($.isNotNull(pointPathArray)) {
				pointArr = new Array();
				for (var i = 0; i < pointPathArray.length; i++) {
					pointArr.push({
						"pointLongitude" : pointPathArray[i].lng,
						"pointLatitude" : pointPathArray[i].lat
					});
				}
			}
		}
		return pointArr;
	},
    /**清除地图上的所有覆盖物**/
    cleanOverLays: function () {
    	//清除覆盖物
		deliveryManage.baiduMap.clearOverlays();
		deliveryManage.cleanLastOverLay();
    },
    /**清除最后绘制覆盖物对象**/
    cleanLastOverLay: function () {
		deliveryManage.overlayObj = null;
		deliveryManage.overlayObjType = null;
    },
    /**重新加载覆盖范围或排除范围的分页列表**/
    refreshScopeTableList: function () {
    	if(deliveryManage.scopeType == 1){
			deliveryManage.refreshCoverScopeList();
		} else {
			deliveryManage.refreshExcludeScopeList();
		}
    },
    /**重新加载覆盖范围分页列表**/
    refreshCoverScopeList: function () {
    	deliveryManage.searchCoverOrExcludeScopeListByPage(deliveryManage.coverScopeTableId);
    	$('#' + deliveryManage.coverScopeTableId).bootstrapTable('refresh');
    	deliveryManage.createMapOverLays();
    },
    /**重新加载排除范围分页列表**/
    refreshExcludeScopeList: function () {
    	deliveryManage.searchCoverOrExcludeScopeListByPage(deliveryManage.excludeScopeTableId)
    	$('#' + deliveryManage.excludeScopeTableId).bootstrapTable('refresh');
    	deliveryManage.createMapOverLays();
    },
    /**隐藏配送/排除范围表单**/
    hideScopeForm: function () {
    	$('#' + deliveryManage.scopeFormDivId).addClass("hide");
    },
    /**显示配送/排除范围表单**/
    showScopeForm: function () {
    	$('#' + deliveryManage.scopeFormDivId).removeClass("hide");
    },
    /**隐藏多余控件**/
    hideDrawTools: function () {
    	$(".BMapLib_circle").hide();
	    $(".BMapLib_polyline").hide();
	    $(".BMapLib_polygon").hide();
	    $(".BMapLib_rectangle").hide();
    },
    /**显示多余控件**/
    showDrawTools: function () {
    	$(".BMapLib_circle").show();
	    $(".BMapLib_polyline").hide();
	    $(".BMapLib_polygon").show();
	    $(".BMapLib_rectangle").show();
    },//根据覆盖类型显示绘图工具项
	hideOrShowSomeDrawTools : function (scopeLeveType) {
		switch (scopeLeveType) {
			case "10" :
				deliveryManage.hideDrawTools();
				break;
			case "20" :
				deliveryManage.showDrawTools();
				break;
		}
	},//隐藏搜索结果列表
	hideBaiDuSearchResult : function () {
		$("#baiDuSearchResult").hide();
	},
    /**重置覆盖/排除范围界面和绘图工具**/
    resetCoverAndExcludeScope: function () {
    	$("#" + deliveryManage.coverAndExcludeScopeForm).data('bootstrapValidator').resetForm();
		deliveryManage.showDrawTools();
		deliveryManage.showScopeForm();
    },//上级站点校验
    disClick: function () {
		var type = $("#deliveryType").val();
		if(type == 10) {
			$("#fromSouSuo01").css("cursor","not-allowed");
			$("#fromSouSuo01").css("background-color","#eee");
			//点击失效
			$("#search_superior").unbind("click");
			//清空数据
			$("#superior").val("");
		} else {
			$("#fromSouSuo01").css("cursor","pointer");
			$("#fromSouSuo01").css("background-color","#fff");
			//点击有效
			$("#search_superior").click(function(){
	 		   deliveryManage.searchListByPageSJ();
	 		   document.getElementById("sForm").reset();
	 		   $('#superiorList').bootstrapTable('refresh');
		 	   $.showModal('#myModal02');
		    });
		}
	},//禁用tab
	disableTab : function(tabId) {
		var tabObj = 'a[href="#' + tabId + '"]';
		// 禁用选项卡
		$(tabObj).bind('show.bs.tab', function(e) {
			e.preventDefault();
		});
		$(tabObj).parent().css("background-color", "#eee");
		$(tabObj).css("cursor", "not-allowed");
		$(tabObj).css("color", "##2fa4e7");
	},//恢复选项卡点击
	recoveryTab : function (tabId) {
		var tabObj = 'a[href="#' + tabId + '"]';
		$(tabObj).unbind('show.bs.tab');
		$(tabObj).parent().css("background-color","#fff");
		$(tabObj).css("cursor","pointer");
		$(tabObj).css("color","#555");
	},
    //初始化绘图插件
    initDrawingManager:function(){
    	$(".BMapLib_Drawing").remove();
    	 var styleOptions = {
	        strokeColor:"red",    //边线颜色。
	        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
	        strokeWeight: 3,       //边线的宽度，以像素为单位。
	        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
	        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
	        strokeStyle: 'solid' //边线的样式，solid或dashed。
	    }
	    var drawingManager = new BMapLib.DrawingManager(deliveryManage.baiduMap, {
	        isOpen: false, //是否开启绘制模式
	        enableDrawingTool: true, //是否显示工具栏
	        drawingToolOptions: {
	            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
	            offset: new BMap.Size(5, 5), //偏离值
	        },
	        circleOptions: styleOptions, //圆的样式
	        polylineOptions: styleOptions, //线的样式
	        polygonOptions: styleOptions, //多边形的样式
	        rectangleOptions: styleOptions //矩形的样式
	    }); 
	    
	    var overlaycomplete = function(e){
			if ($.isNotNull(deliveryManage.overlayObj)) {
				deliveryManage.baiduMap.removeOverlay(deliveryManage.overlayObj);
			}
			deliveryManage.overlayObj = e.overlay;
			// 覆盖物类型，0:不是覆盖物,1:点,2:多边形(矩形),3:圆形,4:线
			if (e.overlay instanceof BMap.Marker) {
				deliveryManage.overlayObjType = 1;
				deliveryManage.getLocationByPoint(e.overlay.getPosition());
				if(0 === deliveryManage.scopeType){
					$("#" + deliveryManage.deliveryBaseInfoForm).data('bootstrapValidator').resetForm();
				}
				if($.isNotNull(deliveryManage.curDeliveryRecordMark)){
					deliveryManage.baiduMap.removeOverlay(deliveryManage.curDeliveryRecordMark);
			    }
			} else if (e.overlay instanceof BMap.Circle) {
				deliveryManage.overlayObjType = 3;
				e.overlay.enableEditing();
			} else if (e.overlay instanceof BMap.Polygon) {
				deliveryManage.overlayObjType = 2;
				e.overlay.enableEditing();
			} else if (e.overlay instanceof BMap.Polyline) {
				deliveryManage.overlayObjType = 4;
			}
	    };
	    /**添加鼠标绘制工具监听事件，用于获取绘制结果**/
	    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    },
    //初始化站点基本信息表单检验
    initDeliveryBaseInfoFormValidate:function(){
    	$('#' + deliveryManage.deliveryBaseInfoForm).bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	        	      valid: 'glyphicon glyphicon-ok',
	        	      invalid: 'glyphicon glyphicon-remove',
	        	      validating: 'glyphicon glyphicon-refresh'
            },
	        fields: {
	        	deliveryType: {
	                validators: {
	                    notEmpty: {message: '站点类型不能为空！'}
	                }
	            },
	            detailedAddress: {
	                validators: {
	                    notEmpty: {message: '站点地址不能为空！'}
	                }
	            },
	            name: {
	                validators: {
	                    notEmpty: {message: '站点名称不能为空！'}
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    },
    //初始化覆盖/排除范围基本信息表单检验
    initCoverAndExcludeScopeFormValidate:function(){
    	$('#' + deliveryManage.coverAndExcludeScopeForm).bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	        	      valid: 'glyphicon glyphicon-ok',
	        	      invalid: 'glyphicon glyphicon-remove',
	        	      validating: 'glyphicon glyphicon-refresh'
            },
	        fields: {
	        	level: {
	                validators: {
	                    notEmpty: {message: '范围类型不能为空！'}
	                }
	            },
	            name: {
	                validators: {
	                    notEmpty: {message: '名称不能为空！'}
	                }
	            }
	           /* ,
	            scopeHeadPhone:{
	            	validators: {
	                     regexp: {
	                         regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
	                         message: '请输入正确的手机号码'
	                     }
	                }
	            }*/
	        },
	        excluded: [':disabled'] 
	    });
    },
    //搜索地址
    searchAdress:function(){
	    var local = new BMap.LocalSearch(deliveryManage.baiduMap, {
			renderOptions: {map: deliveryManage.baiduMap, panel: "baiDuSearchResult"},
			onSearchComplete: function(results){     
				$("#baiDuSearchResult").show();
		    } 
		});
		local.search($("#baiDuSearchContext").val());
		
		//设置添加标注后的回调函数。参数：pois: Array<LocalResultPoi>，通过marker属性可得到其对应的标注。
		local.setMarkersSetCallback(function(pois) {
			var attribute = function(tag) {
				if(0 === deliveryManage.scopeType){
					deliveryManage.overlayObjType = 1;
					deliveryManage.overlayObj = this.searchResultMarker;
				}
				this.scope.deliveryManage.fillDetailAddress(this.markerDetailAddress);
			}
			for (var i = 0; i < pois.length; i++) {
				var searchResultMarker = pois[i].marker;
				//点击搜索出来的小红点时自动获取详情地址
				/*searchResultMarker.addEventListener("click", attribute.bind({
					scope : this,
					"markerDetailAddress" : pois[i].address
				}));*/
				//小红点显示标注信息时自动获取详情地址
				searchResultMarker.addEventListener("infowindowopen",attribute.bind({
					scope : this,
					"searchResultMarker" : pois[i].marker,
					"markerDetailAddress" : pois[i].address
				}));
			}
		})
    },
    //获取点的详情地址
    getLocationByPoint:function(markerPoint){
		var geoc = new BMap.Geocoder(); 
  	    geoc.getLocation(markerPoint, function(rs){
  	    	//获取详细地址
			deliveryManage.fillDetailAddress(rs.address);
			//获取市名称
			deliveryManage.deliveryCityName = rs.addressComponents.city;
			//获取区名称
			deliveryManage.deliveryAreaName = rs.addressComponents.district; 
		}); 
    },
    //往DOM填充详情地址
    fillDetailAddress:function(detailAddress){
		if(deliveryManage.scopeType === 0){
		    $("#deliveryDetailedAddress").val(detailAddress);
		} else {
		    $("#scopeDetailedAddress").val(detailAddress);
		}
    },
	// 填充覆盖/排除范围表单默认值
	fillScopeInfo : function(row) {
		$("#scopeLeveType").val(row.level);
		$("#scopeName").val(row.name);
		$("#scopeDetailedAddress").val(row.detailedAddress);
		$("#scopeHeadName").val(row.scopeHeadName);
		$("#scopeHeadPhone").val(row.scopeHeadPhone);
	},
    // 初始化覆盖/排除范围基本信息表单检验
    autoGetGeolocation:function(){
	    var geolocation = new BMap.Geolocation();
		    geolocation.getCurrentPosition(function(r) {
			if (this.getStatus() != BMAP_STATUS_SUCCESS) {
				$.toastrWarning("定位失败，请手工选择地址.");
				return;
			} 
			deliveryManage.baiduMap.panTo(r.point);
		}, { enableHighAccuracy : true });
    },
	/**初始化百度地图**/
    initMap: function () { 
		// 百度地图API功能
		deliveryManage.baiduMap = new BMap.Map("deliveryMap");
		var poi = new BMap.Point(116.331398,39.897445);
		if($.isNotNull(deliveryManage.dbDeliveryRecord)){
		    poi = new BMap.Point(deliveryManage.dbDeliveryRecord.longitude,deliveryManage.dbDeliveryRecord.latitude);
		}
		deliveryManage.baiduMap.centerAndZoom(poi, 13);
		deliveryManage.baiduMap.enableScrollWheelZoom();
		
		//如果是新增站点则自动定位
		if($.isNull(deliveryManage.dbDeliveryRecord)){
		    deliveryManage.autoGetGeolocation();
		}
		
		function hideBaiDuSearchResult(e) {
			deliveryManage.hideBaiDuSearchResult()
		}
		//监听左右键隐藏搜索结果列表
		deliveryManage.baiduMap.addEventListener("click", hideBaiDuSearchResult);
		deliveryManage.baiduMap.addEventListener("rightclick", hideBaiDuSearchResult);
		//地图加载完整调整缩放控件位置
		deliveryManage.baiduMap.addEventListener("tilesloaded", function() {
			$(".BMap_stdMpCtrl").css('top', '60px');
		});
		
	    /**实例化鼠标绘制工具**/
	    deliveryManage.initDrawingManager();
	    
	    /**实例缩放比例尺工具**/
	    var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_LARGE});  
        deliveryManage.baiduMap.addControl(top_left_navigation);
	    
	    //初始隐藏多余图形工具
	    deliveryManage.hideDrawTools();
		
		if($.isNotNull(deliveryManage.dbDeliveryRecord)){
			deliveryManage.curDeliveryRecordMark = deliveryManage.createMapPoint(deliveryManage.dbDeliveryRecord);
		}
    },
    bindEvent: function () { 
    	//点击tab
    	$(".deliveryTab").click(function() {
    		deliveryManage.initDrawingManager();
			$.clearForm(deliveryManage.coverAndExcludeScopeForm);
			deliveryManage.cleanOverLays();
			deliveryManage.hideBaiDuSearchResult();
			var tabType = $(this).attr("id");
			switch (tabType) {
				case 'deliveryJbxx' :
				    deliveryManage.scopeType = 0;
				    $("#" + deliveryManage.deliveryBaseInfoForm).data('bootstrapValidator').resetForm();
					deliveryManage.hideDrawTools();
					deliveryManage.hideScopeForm();
					deliveryManage.createMapPoint(deliveryManage.dbDeliveryRecord);
					break;
				case 'deliveryFgfw' :
					deliveryManage.scopeType = 1;
					deliveryManage.resetCoverAndExcludeScope();
					// 加载覆盖范围遮盖物
					deliveryManage.refreshCoverScopeList();
					break;
				case 'deliveryPcfw' :
					deliveryManage.scopeType = 2;
					deliveryManage.resetCoverAndExcludeScope();
					// 加载排除范围遮盖物
					deliveryManage.refreshExcludeScopeList();
					break;
			}
		});
		
		//百度地图搜索功能
		$("#baiDuSearch_btn").click(function() {
    		deliveryManage.searchAdress();
		});
		
		// 绑定百度地图搜索功能键盘事件
		$("#baiDuSearchContext").keydown(function(event) {
			if (event.keyCode == 13) {
				deliveryManage.searchAdress();
			}
		});
		
		// 点击继续按钮
		$("#btn_delivery_submit").click(function(){
			var bootstrapValidator = $("#" + deliveryManage.deliveryBaseInfoForm).data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(!bootstrapValidator.isValid()){
    		   return;
    		}
    		
    		if($("#deliveryType").val() != 10) {
				if($("#superior").val() == null || $("#superior").val().trim().length == 0) {
					$.toastrWarning("请选择上级站点");
					return;
				}
			}
    		
			deliveryManage.addOrUpdateDeliveryBaseInfo();
		});
		
		// 点击保存覆盖范围/排除范围按钮
		$("#btn_scope_submit").click(function(){
			var bootstrapValidator = $("#" + deliveryManage.coverAndExcludeScopeForm).data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(!bootstrapValidator.isValid()){
    		   return;
    		}
			deliveryManage.addOrUpdateScopeInfo();
		});
		
		//点击新增范围/排除范围按钮
		$("#btn_scope_add").click(function(){
			deliveryManage.resetCoverAndExcludeScope();
			$.clearForm(deliveryManage.coverAndExcludeScopeForm);
			deliveryManage.selectScopeObj = null;
			switch (deliveryManage.scopeType) {
				case 1 :
					$('#' + deliveryManage.coverScopeTableId).bootstrapTable('refresh');
					break;
				case 2 :
					$('#' + deliveryManage.excludeScopeTableId).bootstrapTable('refresh');
					break;
			}
		});
		
		// 查询上级
		$("#search_superior").click(function(){
			deliveryManage.searchListByPageSJ();
			document.getElementById("sForm").reset();
			$('#superiorList').bootstrapTable('refresh');
			$.showModal('#myModal02');
		});
		
		//条件搜索上级列表
		$("#btn_search_s").click(function(){
	 		deliveryManage.isResetOffset = 1;
	 		$('#superiorList').bootstrapTable('refresh');
		});

		// 负责人
		$(".search_deliveryHead").click(function() {
			deliveryManage.searchEmp();
			document.getElementById("empForm").reset();
			$('#empList').bootstrapTable('refresh');
			$.showModal('#myModal03');
		});
		
		//条件搜索负责人列表
		$("#btn_search_emp").click(function() {
			deliveryManage.isResetOffset = 1;
			$('#empList').bootstrapTable('refresh');
		});

		// 站点类型下拉框变动时动态控制上级搜索框是否可点击
		$("#deliveryType").change(function() {
			$("#superior").val("");
			$("#superiorName").val("");
			deliveryManage.disClick();
		});
		
		//覆盖区域类型变化时，处理可操控的覆盖物类型
		$("#scopeLeveType").change(function() {
			deliveryManage.initDrawingManager();
			deliveryManage.hideOrShowSomeDrawTools($(this).val());
		});
		
		//清空FORM表单
		$("#btn_clean_sForm").click(function() {
			$.clearForm("sForm");
		});
		$("#btn_clean_empForm").click(function() {
			$.clearForm("empForm");
		});
		
		//点击确认挑选的上级
		$("#s_save").click(function(){
			var selections = $("#superiorList").bootstrapTable('getSelections');
		    if($.isNull(selections) || 1 != selections.length){
				$.toastrWarning("请选择一条数据进行操作！");
				return;
 		    } 
			$.map(selections, function(row) {
 				$("#superiorType").val(row.deliveryType)
 				$('#superior').val(row.id);
 				$('#superiorName').val(row.name);
 				$.hideModal('#myModal02');
            });
		 });
		 
		 //点击确认挑选的负责人
		 $("#emp_save").click(function(){
		 	var selections = $("#empList").bootstrapTable('getSelections');
		    if($.isNull(selections) || 1 != selections.length){
				$.toastrWarning("请选择一条数据进行操作！");
				return;
 		    } 
			$.map(selections, function(row) {
				if(1 === deliveryManage.scopeType || 2 === deliveryManage.scopeType){
					$('#scopeHead').val(row.id);
	 				$('#scopeHeadName').val(row.cnName);
	 				$('#scopeHeadPhone').val(row.mobileNo);
				} else {
					$('#deliveryHead').val(row.id);
	 				$('#deliveryHeadName').val(row.cnName);
	 				$('#deliveryHeadPhone').val(row.mobileNo);
				}
 				$.hideModal('#myModal03');
            });
		 });
		 
		 $("#btn_delivery_cancel").click(function() {
		    myMain.getAllContent(myMain.currClickTreeUrl);
		});
		
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	deliveryManage.initDeliveryBaseInfoFormValidate();
    	deliveryManage.initCoverAndExcludeScopeFormValidate();
    	
    	if ($.isNotNull(dbDeliveryRecordId)) {
			deliveryManage.curDeliveryRecordId = dbDeliveryRecordId;
		}
    	if ("add" === initOperationType) {
			$("#operationTitle").html("新增站点");
			deliveryManage.initDropDownBox();
			deliveryManage.initMap();
		} else {
			deliveryManage.getDeliveryDetailById();
			if ("edit" === initOperationType) {
				$("#operationTitle").html("编辑站点");
			} else if ("view" === initOperationType) {
				$("#btn_delivery_submit").hide();
				$("#btn_scope_add").hide();
				$("#btn_scope_submit").hide();
				$("#operationTitle").html("查看站点");
				
				$.disabledForm(deliveryManage.deliveryBaseInfoForm);
				$.disabledForm(deliveryManage.coverAndExcludeScopeForm);
				
		        $(".input-group-addon").css("cursor","not-allowed");
				$(".input-group-addon").css("background-color","#eee");
				//点击失效
				$("#search_superior").unbind("click");
				$("#search_deliveryHead").unbind("click");
				$("#search_scopeHead").unbind("click");
				
			}
		}
		//禁用选项卡
    	/*deliveryManage.disableTab("fgfw");
    	deliveryManage.disableTab("pcfw");*/
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: params.offset     //分页偏移值
	};
	return temp;
};

var queryParamsSJ = function (params) {
	//自定义查询参数,昵称、公司名
	var code = $.ToCDB($('#code_2').val());
	var name = $.ToCDB($('#name_2').val());
	var enabled = '1';
	var deliveryType = $("#deliveryType").val();
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: deliveryManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		code:code,
		name:name,
		enabled:enabled,
		deliveryType:deliveryType,
		custom1:'sj'
	};
	return temp;
};

var queryParamsEmp = function (params) {
	var cnName=$('#name_emp').val();
	var mobileNo=$('#tel_emp').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: deliveryManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:null,
			enabled:'1',
			cnName:cnName,
			mobileNo:mobileNo
		};
	return temp;
};	

//获取覆盖或排除范围查询入参
var queryCoverOrExcludeScopeParams = function (params) {
	var temp = {   
		pageSize: params.limit,  
		offset: deliveryManage.isResetOffset == 1 ? 0 : params.offset,  
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		deliveryRecordId: null == deliveryManage.curDeliveryRecordId ? 0 : deliveryManage.curDeliveryRecordId,
		isDelivery:deliveryManage.scopeType
	};
	return temp;
};

window.operateEvents = {
	'click input[name="btSelectItem"]' : function(e, value, row, index) {
		deliveryManage.fillScopeInfo(row);
	},'click .delete_scope_a' : function(e, value, row, index) {
		deliveryManage.deleteDeliveryScope(row.id,row.name);
	}
	
};

$(document).ready(function(){
	//2、初始化绑定增删改查事件
	deliveryManage.bindEvent();
	//1、初始化加载列表数据
	deliveryManage.init();
	
});
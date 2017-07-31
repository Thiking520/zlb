// 存放每个功能模块业务逻辑JS
// javascript 模块化
var dispatchVehicleId_ss = 0;
var packManager = {
	returnLeft: true,
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	dispatchVehicleListUrl : function() {//派车单列表
			return '/tms/dispatchVehicle/dispatchVehicleList';
		},
		getDeliveryRecordListUrl: function () {//获取站点
            return '/publicData/deliveryRecord/list';
        },
        getwayBillListUrl:function(){//获取运单列表
        	return '/tms/waybill/queryWayBillListByDispatchVehicleId';
        },
        addPackUrl:function() {//添加一个装箱单
        	return '/tms/packing/add';
        },
        packListUrl:function() {//装箱单列表
        	return '/tms/packing/list';
        },
        getSelectedWayBillUrl:function() {//查找已选运单（通过装箱单号）
        	return '/tms/waybill/selectedWayBill';
        },
        addWaybillUrl:function() {
        	return '/tms/packing/addWaybill';
        }
    },
    
    addPack : function() {
    	var result = false;
    	//获取右侧列表
    	var rows =$("#s2 tbody tr");
    	var wayBills = "";
    	if(rows.length > 0) {
    		for (var int = 0; int < rows.length; int++) {
        		if(int == 0) {
        			wayBills += $("#s2 tbody tr:eq("+int+") td:eq(1)").html(); 
        		} else {
        			wayBills += "," + $("#s2 tbody tr:eq("+int+") td:eq(1)").html(); 
        		}
        		
    		}
    	} else {
    		$.toastrWarning("请选择运单");
    		return;
    	}
    	
    	var totalVolume = $("#totalVolume").val();
    	var totalWeight = $("#totalWeight").val();
    	if(totalVolume != null && totalVolume != '') {
    		if(isNaN(totalVolume)) {
    			$.toastrWarning("请输入正确的体积");
    		}
    	}
    	
    	if(totalWeight != null && totalWeight != '') {
    		if(isNaN(totalWeight)) {
    			$.toastrWarning("请输入正确的重量");
    		}
    	}
    	
    	var params = {
    		'receivingCompany':$.ToCDB($("#receivingCompany").val()),
    		'receiver':$.ToCDB($("#receiver").val()),
    		'contactEmail':$.ToCDB($("#contactEmail").val()),
    		'contactPhone':$.ToCDB($("#contactPhone").val()),
    		'receiveAddress':$.ToCDB($("#receiveAddress").val()),
    		'carNumber':$.ToCDB($("#carNumber").val()),
    		'printStatus':$("#surfacePrintStatus").val(),
    		'remarks':$.ToCDB($("#remarks").val()),
    		'packListNum':$.ToCDB($("#packList").val()),
    		'planTime':$.ToCDB($("#planDepartTime").val()),
    		'totalWeight':$.ToCDB($("#totalWeight").val()),
    		'totalVolume':$.ToCDB($("#totalVolume").val()),
    		'deliverSiteId':$("#point").val(),
    		'childWaybillIds':wayBills,
    		'dispatchVehicleId':$("#ipt_dispatchVehicleId").val()
    	};
    	$.callAjax({
			type:"post",
			data : params,
			async: false,
			url : packManager.URL.addPackUrl(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		result = true;
			},
			error : function(){
				$.toastrError();
			}
		});
    	return result;
    },
    
    
    addWaybill : function(packCode) {
    	var result = false;
    	//获取右侧列表
    	var rows =$("#s2_e tbody tr");
    	var wayBills = "";
    	if(rows.length > 0) {
    		for (var int = 0; int < rows.length; int++) {
        		if(int == 0) {
        			wayBills += $("#s2_e tbody tr:eq("+int+") td:eq(1)").html(); 
        		} else {
        			wayBills += "," + $("#s2_e tbody tr:eq("+int+") td:eq(1)").html(); 
        		}
    		}
    	} else {
    		$.toastrWarning("请选择运单");
    		return;
    	}
    	var params = {
    		'packCode':packCode,
    		'childWaybillIds':wayBills,
    		'dispatchVehicleId':$("#ipt_dispatchVehicleId").val()
    	};
    	$.callAjax({
			type:"post",
			data : params,
			async: false,
			url : packManager.URL.addWaybillUrl(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		result = true;
			},
			error : function(){
				$.toastrError();
			}
		});
    	return result;
    },
    
    getDispatchVehicleList : function() {
		$.pageTable({
			tableId : "#dispatchOrderList",
			url : packManager.URL.dispatchVehicleListUrl(),
			queryParams : queryParams_dri,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			async:false,
			onLoadSuccess : function(data) {
				packManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						radio : true
					}, {
						align : 'center',
						field : 'dispatchVehicleId',
						title : '内部派车单号'
					}, {
						align : 'center',
						field : 'disDispatchVehicleId',
						title : '派车单号'
					},{
						align : 'center',
						field : 'driverName',
						title : '司机姓名'
					}, {
						align : 'center',
						field : 'deliveryRecordName',
						title : '运营配送点'
					}, {
						align : 'center',
						field : 'vehicleNumber',
						title : '车牌号'
					},{
						align : 'center',
						field : 'surfacePrintStatus',
						title : '打印状态'
					}]
		});
		$('#dispatchOrderList').bootstrapTable('hideColumn', 'dispatchVehicleId');
		$('#dispatchOrderList').bootstrapTable('hideColumn', 'surfacePrintStatus');
	},
    
	//获取运单列表
	getWayBillList : function() {
		$.pageTable({
			tableId : "#s1",
			async:false,
			url : packManager.URL.getwayBillListUrl(),
			queryParams :queryParams_wb,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				packManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						checkbox : true
					}, {
						align : 'center',
						field : 'childWaybillId',
						title : '运单号',
						smartDisplay:false
					}, {
						align : 'center',
						field : 'disChildWaybillId',
						title : '运单号'
					}, {
						align : 'center',
						field : 'childWalbillStatus',
						title : '运单状态',
						formatter:function(value,row,index){
							switch(row.childWalbillStatus){
								case "10":return '新建';
								case "20":return '确认';
								case "30":return  row.waybillType=='10'?'已装车':'已揽收';
								case "50":return '在途中';
								case "98":return '已取消';
								case "99":return '已签收';
							}
						}
					}, {
						align : 'center',
						field : 'isSubsection',
						title : '分段运单',
						formatter:function(value,row,index){
							if(value == '1') {
								return '是'
							} else {
								return '否'
							}
						}
					}, {
						align : 'center',
						field : 'waybillType',
						title : '运单分类',
						formatter:function(value,row,index){
							switch(row.waybillType){
								case "10":return '揽收件';
								case "20":return '配送件';
							}
						}
					}, {
						align : 'center',
						field : 'receiveSiteName',
						title : '收件站点'
					}, {
						align : 'center',
						field : 'arrivalTime',
						title : '要求送货时间'
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
						title : '收货地址'
					}]
		});
		
		$.pageTable({
			tableId : "#s2",
			columns : [{
						checkbox : true
					}, {
						align : 'center',
						field : 'childWaybillId',
						title : '运单号',
						smartDisplay:false
					}, {
						align : 'center',
						field : 'disChildWaybillId',
						title : '运单号'
					}, {
						align : 'center',
						field : 'childWalbillStatus',
						title : '运单状态'
					}, {
						align : 'center',
						field : 'childWaybill',
						title : '分段运单'
					}, {
						align : 'center',
						field : 'waybillType',
						title : '运单分类'
					}, {
						align : 'center',
						field : 'receiveSiteName',
						title : '收件站点'
					}, {
						align : 'center',
						field : 'arrivalTime',
						title : '要求送货时间'
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
						title : '收货地址'
					}]
		});
		$("#s2 tbody tr").remove();
		$('#s1').bootstrapTable('hideColumn', 'childWaybillId');
		$('#s2').bootstrapTable('hideColumn', 'childWaybillId');
		$(".no-records-found").remove();
	},
	
	//获取运单列表
	getWayBillList_e : function() {
		$.pageTable({
			tableId : "#s1_e",
			async:false,
			url : packManager.URL.getwayBillListUrl(),
			queryParams :queryParams_wbet,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				packManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						checkbox : true
					}, {
						align : 'center',
						field : 'childWaybillId',
						title : '运单号',
						smartDisplay:false
					}, {
						align : 'center',
						field : 'disChildWaybillId',
						title : '运单号'
					}, {
						align : 'center',
						field : 'childWalbillStatus',
						title : '运单状态',
						formatter:function(value,row,index){
							switch(row.childWalbillStatus){
								case "10":return '新建';
								case "20":return '确认';
								case "30":return  row.waybillType=='10'?'已装车':'已揽收';
								case "50":return '在途中';
								case "98":return '已取消';
								case "99":return '已签收';
							}
						}
					}, {
						align : 'center',
						field : 'isSubsection',
						title : '分段运单',
						formatter:function(value,row,index){
							if(value == '1') {
								return '是'
							} else {
								return '否'
							}
						}
					}, {
						align : 'center',
						field : 'waybillType',
						title : '运单分类',
						formatter:function(value,row,index){
							switch(row.waybillType){
								case "10":return '揽收件';
								case "20":return '配送件';
							}
						}
					}, {
						align : 'center',
						field : 'receiveSiteName',
						title : '收件站点'
					}, {
						align : 'center',
						field : 'arrivalTime',
						title : '要求送货时间'
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
						title : '收货地址'
					}]
		});
		
		$.pageTable({
			tableId : "#s2_e",
			columns : [{
						checkbox : true
					}, {
						align : 'center',
						field : 'childWaybillId',
						title : '运单号',
						smartDisplay:false
					}, {
						align : 'center',
						field : 'disChildWaybillId',
						title : '运单号'
					}, {
						align : 'center',
						field : 'childWalbillStatus',
						title : '运单状态'
					}, {
						align : 'center',
						field : 'childWaybill',
						title : '分段运单'
					}, {
						align : 'center',
						field : 'waybillType',
						title : '运单分类'
					}, {
						align : 'center',
						field : 'receiveSiteName',
						title : '收件站点'
					}, {
						align : 'center',
						field : 'arrivalTime',
						title : '要求送货时间'
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
						title : '收货地址'
					}]
		});
		$("#s2_e tbody tr").remove();
		$('#s1_e').bootstrapTable('hideColumn', 'childWaybillId');
		$('#s2_e').bootstrapTable('hideColumn', 'childWaybillId');
		$(".no-records-found").remove();
	},
	
	
	//通过装箱单获取运单列表
	getSelectedWayBill : function(packCode) {
		$.pageTable({
			tableId : "#s2_l",
			url : packManager.URL.getSelectedWayBillUrl(),
			queryParams : {"packCode":packCode},
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				packManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						align : 'center',
						field : 'disChildWaybillId',
						title : '运单号'
					}, {
						align : 'center',
						field : 'childWalbillStatus',
						title : '运单状态',
						formatter:function(value,row,index){
							if(value != null && value != "") {
								switch(value) {
									case '10' : return '新建'
									case '20' : return '已确认'
									case '30' : return row.waybillType=='20'?'已装车':'已揽收'
									case '50' : return '在途中'
									case '98' : return '已取消'
									case '99' : return '已签收'
								}
							}
						}
							
					}, {
						align : 'center',
						field : 'isSubsection',
						title : '分段运单',
						formatter:function(value,row,index){
							if(row.isSubsection == "1") {
								return "是"
							} else {
								return "否"
							}
						}
					}, {
						align : 'center',
						field : 'waybillType',
						title : '运单分类',
						formatter:function(value,row,index){
							if(value == '10') {
								return '揽收件';
							} else {
								return '配送件';
							}
						}
					}, {
						align : 'center',
						field : 'receiveSiteName',
						title : '收件站点'
					}, {
						align : 'center',
						field : 'arrivalTime',
						title : '要求送货时间'
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
						title : '收货地址'
					}]
		});
	},
    /**
     * 获取站点
     */
	getDeliveryRecordList:function (selectId) {
		var params = {"custom1":"all","offset":"0","pageSize":"999"};
    	$.callAjax({
			type:"post",
			data : params,
			async: false,
			url : packManager.URL.getDeliveryRecordListUrl(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		var pointSize = data.data.rows.length;
         		var arr = new Array();
        		if(pointSize > 0) {
             		for(var item in data.data.rows) {
             			arr.push("<option ");
             			arr.push("value='");
             			arr.push(data.data.rows[item].id);
             			arr.push("'");
             			arr.push(">");
             			arr.push(data.data.rows[item].name);
             			arr.push("</option>")
             			arr.push("\r\n");
             		}
             		var str = arr.join("");
             		$("#"+selectId).html(str);
        		} else {
        			$("#"+selectId).html("<option value=''>无站点</option>");
        		}
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**
     * 装箱单分页列表
     */
    getPackList : function() {
		$.pageTable({
			tableId : "#packingListTable",
			url : packManager.URL.packListUrl(),
			queryParams : queryParams,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				packManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						radio : true
					}, {
						align : 'center',
						field : 'packCode',
						title : '装箱单号',
						formatter:function(value,row,index){
							return '<a class="look_pack" href="javascript:void(0)" code="' + row.packCode +'">' + row.packCode + '</a>';
		    			},
		    	        events: 'operateEvents'
					},{
						align : 'center',
						field : 'status',
						title : '状态',
						formatter:function(value,row,index){
							switch(row.status){
								case "10":return '新增';
								case "20":return '确认';
								case "30":return '已装车';
								case "40":return '配送中';
								case "50":return '已取消';
								case "99":return '已签收';
							}
						}
					}, {
						align : 'center',
						field : 'disDispatchVehicleId',
						title : '派车单号'
					}, {
						align : 'center',
						field : 'deliverySiteName',
						title : '发货站点'
					}, {
						align : 'center',
						field : 'receiveSiteName',
						title : '收件站点'
					}, {
						align : 'center',
						field : 'receiver',
						title : '收货联系人'
					}, {
						align : 'center',
						field : 'contactPhone',
						title : '收货联系人手机'
					}, {
						align : 'center',
						field : 'vehicleNumber',
						title : '车牌号'
					}, {
						align : 'center',
						field : 'driverName',
						title : '司机'
					}, {
						align : 'center',
						field : 'remarks',
						title : '备注'
					}, {
						align : 'center',
						field : 'packStatus',
						title : '装箱状态'
					}, {
						align : 'center',
						field : 'receiveAddress',
						title : '收货地址'
					}, {
						align : 'center',
						field : 'contactEmail',
						title : '联系人邮箱'
					}, {
						align : 'center',
						field : 'receivingCompany',
						title : '收货公司'
					}]
		});
		$('#packingListTable').bootstrapTable('hideColumn', 'packStatus');
		$('#packingListTable').bootstrapTable('hideColumn', 'receiveAddress');
		$('#packingListTable').bootstrapTable('hideColumn', 'contactEmail');
		$('#packingListTable').bootstrapTable('hideColumn', 'receivingCompany');
	},
	//表单检验
    validateform:function(){
    	//表单验证start
    	$('#addAnchorForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	        	      valid: 'glyphicon glyphicon-ok',
	        	      invalid: 'glyphicon glyphicon-remove',
	        	      validating: 'glyphicon glyphicon-refresh'
            },
	        fields: {
	        	remarks: {
	                validators: {
	                    stringLength: {
                            min: 0,
                            max: 100,
                            message: '备注最多100个字符'
                        }
	                }
	            },
	            totalVolume:{
	            	validators:{
	            		numeric:{message:'请输入数值'}
	            	}
	            },
	            totalWeight:{
	            	validators:{
	            		numeric:{message:'请输入数值'}
	            	}
	            }
	            
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    
    bindEvent: function () {
    	//打开新建面板
    	$("#btn_show_add").on("click",function() {
    		document.getElementById("addAnchorForm").reset();
    		$("#left table,#right table").html("");
    		$("#left .fixed-table-pagination").css("display","none")
    		packManager.getDeliveryRecordList("point");
    		$("#point").val($("#selectMySite").val());
    		$.showModal('#myModal');
    	});
    	//打开派车单选择列表
    	$("#findDispatch").on("click",function(){
    		packManager.getDispatchVehicleList();
    		$('#dispatchOrderList').bootstrapTable('refresh');
    		$.showModal('#dispatchList');
    	});
    	//选择确认派车单
    	$("#dispatch_save").on("click",function(){
    		if($("#dispatchOrderList").bootstrapTable('getSelections').length==1){
    			$.map($("#dispatchOrderList").bootstrapTable('getSelections'), function(row) {
    				$('#planDepartTime').val(row.planDepartTime);
    				$('#driverName').val(row.driverName);
    				$('#carNumber').val(row.vehicleNumber);
    				$("#dispatchVehicleId").val(row.disDispatchVehicleId);
    				$('#surfacePrintStatus').val(row.surfacePrintStatus);
    				$("#ipt_dispatchVehicleId").val(row.dispatchVehicleId);
    				packManager.getWayBillList();
    				//刷新表单
    				$('#s1').bootstrapTable('refresh');
    				$.hideModal('#dispatchList');
                });
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
    	
    	$("#btn_save_submit").on("click",function(){
    		var result = packManager.addPack();
    		if(result) {
    			$.toastrSuccess("装箱成功");
         		$.hideModal('#myModal');
         		//刷新列表
         		$('#packingListTable').bootstrapTable('refresh');
    		}
    	});
    	
    	//清空
    	$("#btn_clean").on("click",function() {
    		document.getElementById("addOrEditeSearchForm").reset();
    	});
    	
    	$("#btn_clean_s").on("click",function() {
    		$("#consumerName").val("");
    		$("#consumerAddress").val("");
    	});
    	//清空
    	$("#btn_clean_car").on("click",function() {
    		document.getElementById("selectFrom").reset();
    	});
    	
    	//派车单搜索
    	$("#btn_search_driver").on("click",function() {
    		$('#dispatchOrderList').bootstrapTable('refresh');
    	});
    	
    	$("#btn_search_s").on("click",function() {
    		$('#s1').bootstrapTable('refresh');
    	});
    	
    	$("#btn_show_look").on("click",function(){
    		$("#myModalLabelLook").html("查看");
    		$("#lookDV").css("display","block");
    		$("#addwaybillDV").css("display","none");
    		
    		$("#close_e").css("display","inline");
    		$("#cancel_e").css("display","none");
    		$("#save_e").css("display","none");
    		
    		if($("#packingListTable").bootstrapTable('getSelections').length==1){
    			$.map($("#packingListTable").bootstrapTable('getSelections'), function(row) {
    				packManager.getDeliveryRecordList("point_l");
    				$('#planDepartTime_l').val(row.planTime);
    				$('#driverName_l').val(row.driverName);
    				$("#dispatchVehicleId_l").val(row.disDispatchVehicleId);
    				$("#packListNum_l").val(row.packCode);
    				$("#packList_l").val(row.packListNum);
    				$("#point_l").val(row.deliverSiteId);
    				if(row.printStatus) {
    					$('#surfacePrintStatus_l').val(1);
    				} else {
    					$('#surfacePrintStatus_l').val(0);
    				}
    				$("#carNumber_l").val(row.vehicleNumber);
    				$("#totalWeight_l").val(row.totalWeight);
    				$("#totalVolume_l").val(row.totalVolume);
    				$('#remarks_l').val(row.remarks);
    				$("#receivingCompany_l").val(row.receivingCompany);
    				$("#receiver_l").val(row.receiver);
    				$("#contactEmail_l").val(row.contactEmail);
    				$("#contactPhone_l").val(row.contactPhone);
    				$("#receiveAddress_l").val(row.receiveAddress);
    				$("#status_l").val(row.status);
    				
    				packManager.getSelectedWayBill(row.packCode);
    				$('#s2_l').bootstrapTable('refresh');
    				$(".modal-content input").css("background-color","white");
    				$(".modal-content select").css("background-color","white");
    			});
    			
    			$.showModal('#lookModal');
    		} else {
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
    	
    	$("#btn_add_waybill").on("click",function(){
    		$("#myModalLabelLook").html("添加运单");
    		$("#lookDV").css("display","none");
    		$("#addwaybillDV").css("display","block");
    		$('#s1').bootstrapTable('refresh');
    		$("#close_e").css("display","none");
    		$("#cancel_e").css("display","inline");
    		$("#save_e").css("display","inline");
    		
    		if($("#packingListTable").bootstrapTable('getSelections').length==1){
    			$.map($("#packingListTable").bootstrapTable('getSelections'), function(row) {
    				packManager.getDeliveryRecordList("point_l");
    				$('#planDepartTime_l').val(row.planTime);
    				$('#driverName_l').val(row.driverName);
    				$("#dispatchVehicleId_l").val(row.disDispatchVehicleId);
    				$("#packListNum_l").val(row.packCode);
    				$("#packList_l").val(row.packListNum);
    				$("#point_l").val(row.deliverSiteId);
    				if(row.printStatus) {
    					$('#surfacePrintStatus_l').val(1);
    				} else {
    					$('#surfacePrintStatus_l').val(0);
    				}
    				$("#carNumber_l").val(row.vehicleNumber);
    				$("#totalWeight_l").val(row.totalWeight);
    				$("#totalVolume_l").val(row.totalVolume);
    				$('#remarks_l').val(row.remarks);
    				$("#receivingCompany_l").val(row.receivingCompany);
    				$("#receiver_l").val(row.receiver);
    				$("#contactEmail_l").val(row.contactEmail);
    				$("#contactPhone_l").val(row.contactPhone);
    				$("#receiveAddress_l").val(row.receiveAddress);
    				$("#status_l").val(row.status);
    				
    				if(row.status != '10') {
    					$.toastrWarning("当前状态不可添加运单");
    					return;
    				}
    				if(row.packStatus == '2') {
    					$.toastrWarning("当前派车单内所有运单都已装箱");
    					return;
    				}
    				
    				$("#ipt_dispatchVehicleId").val(row.dispatchVehicleId);
    				packManager.getWayBillList_e();
    				$('#s1_e').bootstrapTable('refresh');
    				$(".modal-content input").css("background-color","white");
    				$(".modal-content select").css("background-color","white");
    				
    				$.showModal('#lookModal');
    			});
    		} else {
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
    	
    	$("#save_e").on("click",function() {
    		var packCode = $("#packListNum_l").val();
    		var result = packManager.addWaybill(packCode);
    		
    		if(result) {
    			$.toastrSuccess("添加运单成功");
         		$.hideModal('#lookModal');
         		//刷新列表
         		$('#packingListTable').bootstrapTable('refresh');
    		}
    		
		 });
    	
    	$("#btn_cancel").on("click",function() {
			 $.modalCancel("addAnchorForm","myModal");
		 });
    	
    	$("#btn_search").on("click",function() {
    		$('#packingListTable').bootstrapTable('refresh');
    	});
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	//packManager.validateform();
    }
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .look_pack': function (e, value, row, index) {
		
		$("#myModalLabelLook").html("查看");
		$("#lookDV").css("display","block");
		$("#addwaybillDV").css("display","none");
		
		$("#close_e").css("display","inline");
		$("#cancel_e").css("display","none");
		$("#save_e").css("display","none");
		
		packManager.getDeliveryRecordList("point_l");
		$('#planDepartTime_l').val(row.planTime);
		$('#driverName_l').val(row.driverName);
		$("#dispatchVehicleId_l").val(row.disDispatchVehicleId);
		$("#packListNum_l").val(row.packCode);
		$("#packList_l").val(row.packListNum);
		$("#point_l").val(row.deliverSiteId);
		if(row.printStatus) {
			$('#surfacePrintStatus_l').val(1);
		} else {
			$('#surfacePrintStatus_l').val(0);
		}
		$("#carNumber_l").val(row.vehicleNumber);
		$("#totalWeight_l").val(row.totalWeight);
		$("#totalVolume_l").val(row.totalVolume);
		$('#remarks_l').val(row.remarks);
		$("#receivingCompany_l").val(row.receivingCompany);
		$("#receiver_l").val(row.receiver);
		$("#contactEmail_l").val(row.contactEmail);
		$("#contactPhone_l").val(row.contactPhone);
		$("#receiveAddress_l").val(row.receiveAddress);
		$("#status_l").val(row.status);
		
		packManager.getSelectedWayBill(row.packCode);
		$('#s2_l').bootstrapTable('refresh');
		$(".modal-content input").css("background-color","white");
		$(".modal-content select").css("background-color","white");
		$.showModal('#lookModal');
	}
};

var queryParams = function(params) {
	var dispatchVehicleId = $('#dispatchVehicleId_s').val();
	var packListNum = $('#packListNum').val();
	var wayBillNum = $('#wayBillNum').val();
	var status = $('#dispatchStatus').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : packManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		disDispatchVehicleId : dispatchVehicleId,
		packCode : packListNum,
		disChildWaybillId : wayBillNum,
		status : status
	};
	return temp;
};

var queryParams_dri = function(params) {
	var dispatchVehicle_s = $('#dispatchVehicle_s').val();
	var driverName_s = $('#driverName_s').val();
	var carNo_s = $('#carNo_s').val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : packManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		disDispatchVehicleId : dispatchVehicle_s,
		driverName : driverName_s,
		vehicleNumber : carNo_s
	};
	return temp;
};


var queryParams_wb = function(params) {
	
	var arr = new Array();
    $("#s2 tbody tr").each(function(){
		var text = $(this).children("td").eq(1).text();
		arr.push(text);
    });
	var consumerName = $("#consumerName").val();
	var consumerAddress = $("#consumerAddress").val();
	
	var dispatchVehicleId = $("#ipt_dispatchVehicleId").val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : packManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		dispatchVehicleId:dispatchVehicleId,
		disWayBillList:arr,
		consumerName:consumerName,
		consumerAddress:consumerAddress
	};
	return temp;
	
};

var queryParams_wbet = function(params) {
	var arr = new Array();
	var text = "";
    $("#s2_e tbody tr").each(function(){
    	//选择已选中的
    	if(packManager.returnLeft) {
    		text = $(this).children("td").eq(1).text();
    		arr.push(text);
    	} else {
    		if(!($(this).children("td").eq(0).children("input")[0].checked)) {
        		text = $(this).children("td").eq(1).text();
        		arr.push(text);
        	}
    	}
    	
    });
	var dispatchVehicleId = $("#ipt_dispatchVehicleId").val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : packManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		dispatchVehicleId:dispatchVehicleId,
		disWayBillList:arr
	};
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	packManager.init();
	//2、初始化绑定增删改查事件
	packManager.bindEvent();
	packManager.getPackList();
});


$("#selectMySite").on("change",function() {
	$('#packingListTable').bootstrapTable('refresh');
});




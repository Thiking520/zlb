// 存放每个功能模块业务逻辑JS
// javascript 模块化
var anomalyFlags= eval([{name: '正常', value: '10'},{name: '异常', value: '20'}]);
var cancelFlags= eval([{name: '正常', value: '10'},{name: '异常', value: '20'}]);
var queryType = "1";// 1 根据条件查询 
var storageInManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	globalParams:"",
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/storagein/list';
        },
        //确认
        confirmStorInUrl: function () {
		    return '/wms/storagein/confirmStorIn';
		},
		//查询分配人列表
        driverListUrl: function () {
            return '/tms/emp/list';
        },
		//分派
        pickFpUrl: function () {
            return '/wms/storagein/pickIsSate'
        },
		//入账
		takeAccountUrl: function () {
		    return '/wms/storagein/takeAccount';
		},
		//生成上架作业单
		createOperationBillUrl: function () {
		    return '/wms/operationbill/createOperationBill';
		},
		//导出
		exportListUrl: function () {
        	return '/wms/storagein/exportExcel';
        },
        //打印
        printStorageDeliveryUrl: function () {
        	return '/wms/storagein/print/printDeliveryStorage';
        },
        //关闭订单
		colseOrderUrl: function () {
		    return '/wms/storagein/colseOrder';
		}
    },
    /**分页获取换货订单列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#storageInManageTable",//需要分页的table ID
    		url: storageInManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			storageInManage.isResetOffset = 0;
    			queryType=1;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'storage_in_no',
    		sortOrder:'desc',
    		showRefresh:false,
    		columns: [{
    			checkbox: true
    		},{
    			field: 'storageInNo',
    			title: '入库单号',
				formatter:function(value,row,index){
					return '<a class="detail_a" href="javascript:void(0)">'+row.storageInNo+'</a>';
				},
				events: 'operateEvents'	
    		}, /*{
    			field: 'operator',
    			title: '运营商'
    		},{
    			field: 'warehouseCode',
    			title: '仓库编码'
    		},*/{
    			field: 'assigner',
    			title: '分派人'
    		},{
    			field: 'purchaseNo',
    			title: '来源单据号'
    		},{
    			field: 'billType',
    			title: '来源单据类型',
    			formatter:function(value,row,index){
    					var billType =""
    					$("#billType option").each(function(){
    						if($(this).val()==value){
    							billType = $(this).text();
    						}
    					});
    					return billType;
    			}
    		},/*{
    			field: 'orderNum',
    			title: '订单号码'
    		},{
    			field: 'orderDate',
    			title: '订单日期',
				formatter:function(value,row,index){
					return storageInManage.format(row.orderDate,"yyyy/MM/dd");
				}
    		},*/{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return storageInManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'expectDate',
    			title: '预计收货时间',
    			formatter:function(value,row,index){
					return storageInManage.format(row.expectDate,"yyyy-MM-dd HH:mm:ss");
				}
    		},{
    			field: 'receiveState',
    			title: '收货状态',
    			formatter:function(value,row,index){
					var receiveState =""
					$("#receiveState option").each(function(){
						if($(this).val()==value){
							receiveState = $(this).text();
						}
					});
					return receiveState;
    			}
    		},{
    			field: 'anomalyFlag',
    			title: '异常标记',
    			formatter:function(value,row,index){
    				var anomalyFlag =""
    				$.each(anomalyFlags,function(index,obj){
    					if(obj.value==value){
    						anomalyFlag=obj.name;
    					}
    				});
					return anomalyFlag;
    			}	
    		},/*{
    			field: 'cancelFlag',
    			title: '取消标记',
    			formatter:function(value,row,index){
					var cancelFlag =""
					$.each(cancelFlags,function(index,obj){
    					if(obj.value==value){
    						cancelFlag=obj.name;
    					}
    				});
					return cancelFlag;
    			}
    		},*/{
    			field: 'purchaser',
    			title: '采购员',
				formatter:function(value,row,index){
					return value + "<br/>" + row.purchaserPhone
				}
    		},/*{
    			field: 'purchaserPhone',
    			title: '采购员电话'
    		},*/{
    			field: 'supplierCode',
    			title: '供应商代码'
    		}/*, {
    			field: 'purhcaseRemark',
    			title: '采购订单备注',
    		}, {
    			field: 'express',
    			title: '承运商',
    		},{
    			field: 'vehicleNo',
    			title: '车辆号',
    		},{
    			field: 'driverName',
    			title: '司机',
    		},{
    			field: 'driverPhone',
    			title: '司机电话',
    		},{
    			field: 'salesNo',
    			title: '销售订单号',
    		},{
    			field: 'ecTransactionNo',
    			title: '平台交易号',
    		},{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return storageInManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'creator',
    			title: '创建人',
    	    }*/
    		]
    	});
    	  $('#storageInManageTable').bootstrapTable('hideColumn','id');
    },
    //查询负责列表
    searchEmp: function () {
        $.pageTable({
            tableId: "#empList",//需要分页的table ID
            url: storageInManage.URL.driverListUrl(),//请求后台的URL（*）
            queryParams: queryParamsEmp,
            onLoadSuccess: function () {
            	storageInManage.isResetOffset = 0;
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
            }, {
                align: 'center',
                field: 'mobileNo',
                title: '手机号码'
            }
            ]
        });
    },
    /**批量导出**/
    exportStorageList: function () {
    	var contextPath = $("#contextPath").val();
    	$("#mainForm").attr('action',contextPath+storageInManage.URL.exportListUrl());
    	$("#mainForm").submit();
    	$("#mainForm").attr('action','#');
    	/*var params = storageInManage.globalParams;
    	$.callAjax({
    		type:"post",
    		url : storageInManage.URL.exportListUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    				return;
    			}else{
					$.toastrSuccess('正在导出！');
					var fileName = data.data;
					var contextPath = $("#contextPath").val();
					//请求下载excel
					location.href=contextPath+"/wms/storagein/download?fileName="+fileName;
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});*/
    },
    format :  function(time, format){ 
		if(time != null && time !=''){
			var t = new Date(time); 
			var tf = function(i){return (i < 10 ? '0' : '') + i}; 
			return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){ 
				switch(a){ 
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
				}; 
			}));
		}
		return null;
	},
	// 批量打印
	storageDeliveryPrint : function(ids) {
		// 触发Ajax
		var params = "?ids=" + ids;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + storageInManage.URL.printStorageDeliveryUrl()
						+ params);

	},
    //允许/拒绝弹出框
    bindEvent: function () {
    	 //时间控件X事件
        $(".glyphicon-remove").off().on('click',function () {
            $(this).parent().off();
            $(this).parent().prev().prev().val("");
        });   
        
    	$("#btn_show_export").click(function () {
    		storageInManage.exportStorageList();
    	});
    	//绑定近7天界面事件
    	$("#btn_date_7days").click(function () {
    		var date=new Date();
    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
    		var startDate =new Date((+date)-7*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
    		$("#datetimepickerStart").val(startDate);
    		$("#datetimepickerEnd").val(today);
    	});
    	
    	//绑定近30天界面事件
    	$("#btn_date_30days").click(function () {
    		var date=new Date();
    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
    		var startDate =new Date((+date)-30*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
    		$("#datetimepickerStart").val(startDate);
    		$("#datetimepickerEnd").val(today);
    	});
    	
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		storageInManage.isResetOffset = 1;
    		$('#storageInManageTable').bootstrapTable('refresh');
    	});
    	//绑定状态栏确定事件
    	$("#btn_confirm").click(function(){
    		var ids = $.getIdSelections("#storageInManageTable","id");
    		if(ids==null||ids==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		var receiveStates = $.getIdSelections("#storageInManageTable","receiveState");
    		var isOk = true;
    		$.each(receiveStates,function(index,receiveState){
				 if(receiveState!='10'){
					 isOk=false;
					 return false;
				 }
			});
			if(!isOk){
				$.toastrWarning('只有"新建"状态的入库订单,才能进行确认！');
				return false;
			} 
			$("#btn_confirm").attr("disabled",true); 
        	$.dialogConfirm({
                message: '您确认要开始进行收货吗?',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : storageInManage.URL.confirmStorInUrl()+"?ids="+ids,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				toastr['warning'](data.msg); 
    			    				$("#btn_confirm").attr("disabled",false);
    			    			}else{
    			    				//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
    			    				$.toastrSuccess('确认成功！');
    			    				$('#storageInManageTable').bootstrapTable('refresh');
    			    				$("#btn_confirm").attr("disabled",false);
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    			$("#btn_confirm").attr("disabled",false);
    			    		}
    			    	});
                    }
                    $("#btn_confirm").attr("disabled",false);
                }
            });
    		
    		$('#storageInManageTable').bootstrapTable('refresh');
    	});
    	//绑定收货事件
    	$("#btn_take_goods").click(function () {
    		var id = $.getIdSelections("#storageInManageTable","id");
    		if(id==null||id==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		if(id.length!=1){
    			$.toastrWarning('请先选择一条记录进行收货！');  
        		return false;
    		}
    		var receiveState = $.getIdSelections('#storageInManageTable',"receiveState")
    		if(receiveState==10){
    			$.toastrWarning('您还未进行确认,请先进行确认！');  
        		return false;
    		}
    		//只有“待收货”状态的入库订单，才弹出“入库订单编辑”页面
    		/*var receiveStates = $.getIdSelections("#storageInManageTable","receiveState");
    		if(receiveStates!=null && receiveStates.toString() !='30'){
    			$.toastrWarning('只有"待收货"状态的入库订单,才能进行收货！');  
        		return false;
    		}*/
    		var receiveState = $.getIdSelections("#storageInManageTable","receiveState");
    		var supplierCode = $.getIdSelections("#storageInManageTable","supplierCode");
    		var supplierName = $.getIdSelections("#storageInManageTable","supplierName");
    		$("#storageInId").val(id.toString());
    		$("#storStatu").val(receiveState);
	    	$("#supplierCodeHidden").val(supplierCode);
	    	$("#supplierNameHidden").val(supplierName);
    		$.showModal('#myModal');
    		var initUrl = $("#leftMeun").find("li").eq(1).attr("data-href");
			var contextPath = $("#contextPath").val();
			$("#leftMeun ul li").removeClass("active");
			$("#leftMeun").find("li").eq(1).addClass("active");
			$("#centerDiv").children().remove();  
			$("#centerDiv").load(contextPath+initUrl);
    	});
    	//绑定展示入账界面事件
    	$("#btn_take_account").click(function () {
    		var ids = $.getIdSelections("#storageInManageTable","id");
    		if(ids==null||ids==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
            $("#btn_take_account").attr("disabled",true);
        	$.dialogConfirm({
                message: '入帐确认后不允许撤回，您确认入帐吗？',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : storageInManage.URL.takeAccountUrl()+"?ids="+ids,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				if(code=="6003"){
    			    					$.dialogConfirm({
        			    	                message: data.msg,
        			    	                callback: function(result) {
        			    	                    if(result) {
        			    	    			    	$.callAjax({
        			    	    			    		type:"post",
        			    	    			    		url : storageInManage.URL.takeAccountUrl()+"?ids="+ids+"&isContinue=1",
        			    	    			    		success : function(data){   
        			    	    			    			var code = data.code;
        			    	    			    			if(code!="0000"){
        			    	    			    				toastr['warning'](data.msg); 
        			    	    			    				$("#btn_take_account").attr("disabled",false);
        			    	    			    			}else{
        			    	    			    				$.toastrSuccess('入账成功！');
        			    	    			    				$('#storageInManageTable').bootstrapTable('refresh');
        			    	    			    				$("#btn_take_account").attr("disabled",false);
        			    	    			    			}
        			    	    			    		},
        			    	    			    		error : function(){
        			    	    			    			$.toastrError();
        			    	    			    			$("#btn_take_account").attr("disabled",false);
        			    	    			    		}
        			    	    			    	});
        			    	                    }
        			    	                }
        			    	            });
    			    				}else{
    			    					toastr['warning'](data.msg); 
    			    					$("#btn_take_account").attr("disabled",false);
    			    				}
    			    			}else{
    			    				$.toastrSuccess('入账成功！');
    			    				$('#storageInManageTable').bootstrapTable('refresh');
    			    				$("#btn_take_account").attr("disabled",false);
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    			$("#btn_take_account").attr("disabled",false);
    			    		}
    			    	});
                    }
                    $("#btn_take_account").attr("disabled",false);
                }
            });
    	});
    	//绑定生成上架作业单
    	$("#btn_build_joblist").click(function () {
    		var ids = $.getIdSelections("#storageInManageTable","id");
    		if(ids==null||ids==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		var receiveStates = $.getIdSelections("#storageInManageTable","receiveState");
    		var isOk = true;
    		$.each(receiveStates,function(index,receiveState){
				 if(receiveState!='50' && receiveState!='99'){
					 isOk=false;
					 return false;
				 }
			});
			if(!isOk){
				$.toastrWarning('只有"已入账/已关闭"状态的入库订单,才能生成上架作业单！');
				return false;
			}  
			$("#btn_build_joblist").attr("disabled",true);
        	$.dialogConfirm({
                message: '您确认要生成上架作业单吗?',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : storageInManage.URL.createOperationBillUrl()+"?ids="+ids,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				toastr['warning'](data.msg); 
    			    				$("#btn_build_joblist").attr("disabled",false);
    			    			}else{
    			    				//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
    			    				$.toastrSuccess('生成上架作业单成功！');
    			    				$('#storageInManageTable').bootstrapTable('refresh');
    			    				$("#btn_build_joblist").attr("disabled",false);
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    			$("#btn_build_joblist").attr("disabled",false);
    			    		}
    			    	});
                    }
                    $("#btn_build_joblist").attr("disabled",false);
                }
            });
    	});
    	//关闭订单
    	$("#btn_take_close").click(function () {
    		
    		var ids = $.getIdSelections("#storageInManageTable","id");
    		if(ids==null||ids==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		if(ids.length>1){
                 $.toastrWarning('每次只能选择一条记录进行操作！');
                 return false;
            }
            var state = $.getIdSelections("#storageInManageTable","receiveState");
    		if(state==99){
    			toastr['warning']("该订单已经关闭,请勿重复发起关闭操作"); 
    			return false;
    		}
    		if(state==98){
    			toastr['warning']("该订单已经取消,无法再进行关闭操作"); 
    			return false;
    		}
    		var id = ids;
        	$.dialogConfirm({
                message: '订单关闭后不允许进行其他操作，您确认关闭吗？',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : storageInManage.URL.colseOrderUrl()+"?id="+id,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				toastr['warning'](data.msg); 
    			    			}else{
    			    				$.toastrSuccess('关闭成功！');
    			    				$('#storageInManageTable').bootstrapTable('refresh');
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    		}
    			    	});
                    }
                }
            });
    	});
    	
    	
    	//绑定键盘事件
    	$(document).keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 storageInManage.isResetOffset = 1;
    			 $('#storageInManageTable').bootstrapTable('refresh');
    		}
	    });
    	//清空事件
    	$("#btn_reset").click(function () {
    		$("#mainForm input").val("");
    		$("#mainForm select").val("");
    	});
    	// 更多条件 按钮事件
		$('.L_Popup').click(function() {
			if ($('.L_specific_Popup').css('display') == "none") {
				$('.L_specific_Popup').css('display', 'block');
			} else {
				$('.L_specific_Popup').css('display', 'none');
			};
		});
		// 更多条件 弹框查询按钮事件
		$("#queryAffirm").click(function() {
			queryType = "2";
			$('#storageInManageTable').bootstrapTable('refresh');
			$('.L_specific_Popup').css('display', 'none');
		});
		// 更多条件 弹框 收起按钮事件
		$("#queryCancle").click(function() {
			$('.L_specific_Popup').css('display', 'none');
		});
		//预计到达时间
		$(":radio[name='expectDate']").click(function(){
			  if($(this).val==1){
				  	var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-1*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#expectDateTimeStart").val(startDate);
		    		$("#expectDateTimeEnd").val(today);
			  }else if($(this).val==2){
		    		var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-7*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#expectDateTimeStart").val(startDate);
		    		$("#expectDateTimeEnd").val(today);
			  }else if($(this).val==3){
		    		var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-30*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#expectDateTimeStart").val(startDate);
		    		$("#expectDateTimeEnd").val(today);
			  }
		});
		//订单日期
		$(":radio[name='orderDate']").click(function(){
			  if($(this).val()==1){
				  	var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-1*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#orderDateStart").val(startDate);
		    		$("#orderDateEnd").val(today);
			  }else if($(this).val()==2){
		    		var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-7*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#orderDateStart").val(startDate);
		    		$("#orderDateEnd").val(today);
			  }else if($(this).val()==3){
		    		var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-30*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#orderDateStart").val(startDate);
		    		$("#orderDateEnd").val(today);
			  }
		});
		//预计到达时间
		$(":radio[name='expectDate']").click(function(){
			  if($(this).val()==1){
				  	var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-1*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#expectDateTimeStart").val(startDate);
		    		$("#expectDateTimeEnd").val(today);
			  }else if($(this).val()==2){
		    		var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-7*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#expectDateTimeStart").val(startDate);
		    		$("#expectDateTimeEnd").val(today);
			  }else if($(this).val()==3){
		    		var date=new Date();
		    		var today=date.format("yyyy-MM-dd hh:mm:ss"); 
		    		var startDate =new Date((+date)-30*24*3600*1000).format("yyyy-MM-dd hh:mm:ss");
		    		$("#expectDateTimeStart").val(startDate);
		    		$("#expectDateTimeEnd").val(today);
			  }
		});
		//分派按钮事件
        $('#btn_assign').click(function () {
            var id = $.getIdSelections("#storageInManageTable","id");
            if(id==null||id==''){
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            if(id.length>1){
                $.toastrWarning('每次只能选择一条记录进行分派！');
                return false;
            }
            var state = $.getIdSelections("#storageInManageTable","receiveState");
            if( state !=20 ){
    			$.toastrWarning("只有状态为待收货才能进行分派！");
				return;
    		}
            $.showModal("#pickFpModel");
        });
        //绑定分派人条件查询按钮事件
        $("#btn_search_emp").on("click", function () {
            $("#btn_search_emp").addClass("disabled");
            storageInManage.isResetOffset = 1;
            $('#empList').bootstrapTable('refresh');
        });
      //调出员工负责人列表
        $("#pick_div_emp").click(function () {
        	storageInManage.searchEmp();
        	$("#emp_id").val("");
        	$("#pick_name").val("");
        	$("#empForm")[0].reset();
            $('#empList').bootstrapTable('refresh');
            $.showModal('#myModal03');
        })
        //保存分派人
        $("#btn_pickQrEmp").click(function () {
                var ids = $.getIdSelections("#storageInManageTable","id");
                var pickName = $('#pick_name').val();
                var pickEmpCode = $('#emp_id').val();
                if(pickName!='' && pickName!=undefined){
                	 $.hideModal("#pickFpModel");
                	 $.callAjax({
                         type:"post",
                         url : storageInManage.URL.pickFpUrl()+"?ids="+ids+"&pickName=" + pickName+"&pickEmpCode="+pickEmpCode,
                         success : function(data){
                             var code = data.code;
                             if(code!="0000"){
                                 toastr['warning'](data.msg);
                                 return;
                             }else{
                                 //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                                 $.toastrSuccess('分派成功！');
                                 $('#pickListTable').bootstrapTable('refresh');
                                 $('#storageInManageTable').bootstrapTable('refresh');
                                 return;
                             }
                         },
                         error : function(){
                             $.toastrError();
                             return;
                         }
                     });
                }else{
                	 toastr['warning']("请选择待分派人员"); 
                }
        });
        $("#emp_save").click(function () {

            if ($("#empList").bootstrapTable('getSelections').length == 1) {
                $.map($("#empList").bootstrapTable('getSelections'), function (row) {
                    $('#emp_id').val(row.id);
                    $('#pick_name').val(row.cnName);
                    $('#myModal03').modal('hide');
                });
            } else {
                $.toastrWarning("每次只能选择一条记录进行进行操作！");
            }

        });
    	//绑定頁面切換事件
    	$("#leftMeun ul li").click(function () {
    		var contextPath = $("#contextPath").val();
    		var url = $(this).attr("data-href");
    		/*$("#leftMeun ul li").css("text-decoration","");
    		$("this").css("text-decoration","underline");*/
    		$("#leftMeun ul li").removeClass("active");
    		$(this).addClass("active");
    		$("#centerDiv").children().remove(); 
    		$("#centerDiv").load(contextPath+url);
    	});
    	
    	$("#btn_billPrint").click(function () {
			var ids = $.getIdSelections("#storageInManageTable", "id");
			if (ids == null || ids == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}
    		storageInManage.storageDeliveryPrint(ids);
    	});
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	//初始化日期下拉框
    	/*$(".form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii:ss",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });*/
    	dateUtils.initDate();
    	storageInManage.searchListByPage();
    },
}

//负责人查询参数
var queryParamsEmp = function (params) {
    var cnName = $('#name_emp').val();
    var mobileNo = $('#tel_emp').val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: storageInManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        status: 2,//状态
        sort: params.sort,
        order: params.order,
        occupationId: null,
        enabled: '1',
        cnName: cnName,
        mobileNo: mobileNo
    };
    return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var temp;
	/*if (queryType == '1') {
		//自定义查询参数
		var storageInNo = $("#storageInNo").val();
		var salesNo = $("#salesNo").val();
		var billType = $("#billType").val();
		var receiveState = $("#receiveState").val();
		//选择更多进行查询
		temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				storageInNo: storageInNo,	//入库订单号
				salesNo: salesNo,	//销售订单号
				billType: billType,	//订单类型
				receiveState:receiveState, //收货状态
				pageSize: params.limit,   //页面大小
				offset: storageInManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
				sort: params.sort,
				order: params.order
			};
	}else{*/
		var storageInNo = $("#storageInNo").val();
		var salesNo = $("#salesNo").val();
		var billType = $("#billType").val();
		var receiveState = $("#receiveState").val();
		var ecTransactionNo = $("#ecTransactionNo").val();
		var purchaseNo = $("#purchaseNo").val();
		var purchaser = $("#purchaser").val();
		var	shipperContactPhone = $("#shipperContactPhone").val();
		var supplierCode = $("#supplierCode").val();
		var purchaserPhone = $("#purchaserPhone").val();
		var driverName = $("#driverName").val();
		var driverPhone = $("#driverPhone").val();
		var receiveResult = $("#receiveResult").val();
		var shipperContactPhone = $("#shipperContactPhone").val();
		var orderDateStart = $("#orderDateStart").val();
		var orderDateEnd = $("#orderDateEnd").val();
		var expectDateTimeStart = $("#expectDateTimeStart").val();
		var anomalyFlag = "";
		if($("#anomalyFlag").is(':checked')) {
			anomalyFlag=$("#anomalyFlag").val();
		}
		var cancelFlag="";
		if($("#cancelFlag").is(':checked')) {
			cancelFlag=$("#cancelFlag").val();
		}	
		var vehicleNo = $("#vehicleNo").val();
		var expectDateTimeEnd = $("#expectDateTimeEnd").val();
		temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			ecTransactionNo: ecTransactionNo,	//平台交易号
			purchaseNo: purchaseNo,	//来源订单号
			purchaser: purchaser,	//采购员
			shipperContactPhone:shipperContactPhone, //联系电话
			supplierCode:supplierCode, //供应商代码
			purchaserPhone:purchaserPhone, //采购员电话
			driverName:driverName, //司机名称
			driverPhone:driverPhone, //司机电话
			vehicleNo:vehicleNo, //车牌号
			receiveResult:receiveResult, //收货结果
			shipperContactPhone:shipperContactPhone, //收货状态
			orderDateStart:orderDateStart,//订单日期开始时间
			orderDateEnd:orderDateEnd,//订单日期结束时间
			expectDateTimeStart:expectDateTimeStart,//预计到达时间开始时间
			expectDateTimeEnd:expectDateTimeEnd,//预计到达时间结束时间
			anomalyFlag:anomalyFlag,//异常标记
			cancelFlag:cancelFlag,//取消标记
			storageInNo: storageInNo,	//入库订单号
			salesNo: salesNo,	//销售订单号
			billType: billType,	//订单类型
			receiveState:receiveState, //收货状态
			pageSize: params.limit,   //页面大小
			offset: storageInManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order
		};
	/*}*/
	storageInManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .detail_a': function (e, value, row, index) {
	    	$("#storageInId").val(row.id);
	    	$("#storStatu").val(row.receiveState);
	    	$("#supplierCodeHidden").val(row.supplierCode);
	    	$("#supplierNameHidden").val(row.supplierName);
    		$.showModal('#myModal');
    		var initUrl = $("#leftMeun").find("li").eq(1).attr("data-href");
			var contextPath = $("#contextPath").val();
			$("#leftMeun ul li").removeClass("active");
			$("#leftMeun").find("li").eq(1).addClass("active");
			$("#centerDiv").children().remove();  
			$("#centerDiv").load(contextPath+initUrl);
	    }
	};

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

$(document).ready(function(){
	//1、初始化加载列表数据
	storageInManage.init();
	//2、初始化绑定事件
	storageInManage.bindEvent();
});
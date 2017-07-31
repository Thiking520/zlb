// 存放每个功能模块业务逻辑JS
// javascript 模块化
var anomalyFlags= eval([{name: '正常', value: '10'},{name: '异常', value: '20'}]);
var cancelFlags= eval([{name: '正常', value: '10'},{name: '异常', value: '20'}]);
var operationbillManage = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	globalParams:"",
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/operationbill/list';
        },
        getInfoUrl: function () {
            return '/wms/operationbill/getInfo';
        },
        getPlanDetailUrl:function(){
        	return '/wms/operationbill/getPlanDetail'; 
        },
        getOperateRecordUrl:function(){
        	return '/wms/operationbill/getOperateRecord'; 
        },
        //领取作业单
        signOperationBillUrl: function () {
		    return '/wms/operationbill/signOperationBill';
		},
        //确认完成作业
        confirmFinishOperateUrl: function () {
		    return '/wms/operationbill/confirmFinishOperate';
		},
        //提交
        submitOperateUrl: function () {
		    return '/wms/operationbill/submitOperate';
		},
		//查询分配人列表
        driverListUrl: function () {
            return '/tms/emp/list';
        },
        //分派
        pickFpUrl: function () {
            return '/wms/operationbill/pickIsSate'
        },
        //打印上架清单
        printOperationUrl: function () {
            return '/wms/operationbill/print/operation'
        },
		/*
		//分派
        confirmStorInUrl: function () {
		    return '/wms/storagein/takeAccount';
		},*/
		
		//导出
		exportListUrl: function () {
        	return '/wms/operationbill/exportExcel';
        }
    },
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#operationbillManageTable",//需要分页的table ID
    		url: operationbillManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			operationbillManage.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		},{
    			field: 'billNo',
    			title: '作业单',
				formatter:function(value,row,index){
					return '<a class="detail_a" href="javascript:void(0)">'+row.billNo+'</a>';
				},
				events: 'operateEvents'
    		}, {
    			field: 'sourceType',
    			title: '来源类型',
    			formatter:function(value,row,index){
    				var sourceType ="";
    				$("#sourceType option").each(function(){
    					if($(this).val()==value){
    						sourceType = $(this).text();
    					}
    				});
    				return sourceType;
    			}
    		},{
    			field: 'sourceBill',
    			title: '来源单号'
    		},{
    			field: 'state',
    			title: '状态',
    			formatter:function(value,row,index){
    					var state =""
    					$("#state option").each(function(){
    						if($(this).val()==value){
    							state = $(this).text();
    						}
    					});
    					return state;
    			}
    		},{
    			field: 'operateResult',
    			title: '结果',
    			formatter:function(value,row,index){
    					var operateResult =""
    					$("#operateResult option").each(function(){
    						if($(this).val()==value){
    							operateResult = $(this).text();
    						}
    					});
    					return operateResult;
    			}
    		},/*{
    			field: 'reasonCode',
    			title: '原因代码',
    			formatter:function(value,row,index){
    					var reasonCode =""
    					$("#reasonCode option").each(function(){
    						if($(this).val()==value){
    							reasonCode = $(this).text();
    						}
    					});
    					return reasonCode;
    			}
    		},{
    			field: 'reason',
    			title: '原因'
    		},{
    			field: 'printCount',
    			title: '打印次数',
    		},*/{
    			field: 'executor',
    			title: '作业人'
    		},{
    			field: 'receiveTime',
    			title: '领取时间',
    			formatter:function(value,row,index){
					return operationbillManage.format(row.receiveTime,"yyyy/MM/dd HH:mm:ss");
				}
    		},{
    			field: 'implementTime',
    			title: '作业时间',
    			formatter:function(value,row,index){
					return operationbillManage.format(row.implementTime,"yyyy/MM/dd HH:mm:ss");
				}	
    		}/*,{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return operationbillManage.format(row.created,"yyyy/MM/dd HH:mm:ss");
				}
    	    },{
    			field: 'creator',
    			title: '创建人',
    	    }*/  
    		]
    	});
    	  $('#operationbillManageTable').bootstrapTable('hideColumn','id');
    },
    setPlanTableValue:function(row){
    	$("#operationRow01").val(row.operationRow);
    	$("#storageInTradingNo01").val(row.storageInTradingNo);
    	$("#skuCode01").val(row.skuCode);
    	$("#sourceRow01").val(row.sourceRow);
    	$("#state02").val(row.state);
    	$("#planQty01").val(row.planQty);
    	$("#originalLocation01").val(row.originalLocation);
    	$("#operation01").val(row.operation);
    	$("#unit01").val(row.unit);
    	$("#actualQty01").val(row.actualQty);
    	$("#recommendLocation01").val(row.recommendLocation);
    	$("#operationTime01").val(operationbillManage.format(row.operationTime,"yyyy-MM-dd"));
    	$("#skuProDate01").val(operationbillManage.format(row.skuProDate,"yyyy-MM-dd"));
    	$("#skuFailDate01").val(operationbillManage.format(row.skuFailDate,"yyyy-MM-dd"));
    	$("#skuProBatchNo01").val(row.skuProBatchNo);
    	$("#skuStorageDate01").val(operationbillManage.format(row.skuStorageDate,"yyyy-MM-dd"));
    	$("#supplierCode01").val(row.supplierName);
    	$("#skuStockBatchBo01").val(row.skuStockBatchBo);
    	$("#skuState01").val(row.skuState);
    	var state01 = $("#state01").val();
    	var statu = row.state;
    	if(statu!=10 || state01!=30){
    		$("#recordDiv").css("display","none");
    	}else{
    		$("#recordDiv").css("display","");
    	}
    },
    /**
     * 计划明细
     */
    searchPlanListByPage: function (id) {
    	//分页组件
    	$.pageTable({
    		tableId: "#planDetailTable",//需要分页的table ID
    		url: operationbillManage.URL.getPlanDetailUrl()+"?id="+id,//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		toolbar: '#toolbar',
			toolbarAlign:'right',
            sortable: true,
    		onClickRow:function(row,$element){
    			operationbillManage.setPlanTableValue(row);
            },
            onLoadSuccess:function(data){
            	operationbillManage.isResetOffset = 0;
            	if(data.rows.length>0){
            		operationbillManage.setPlanTableValue(data.rows[0]);
            	}else{
            		$("#playDetalForm")[0].reset();
            	}
            },
    		columns: [
    		{
    			field: 'operationRow',
    			title: '作业行号'
    		}, {
    			field: 'skuCode',
    			title: '货品编码'
    		},{
    			field: 'skuName',
    			title: '货品名称'
    		},{
    			field: 'state',
    			title: '作业状态',
    			formatter:function(value,row,index){
    					var state =""
    					$("#state02 option").each(function(){
    						if($(this).val()==value){
    							state = $(this).text();
    						}
    					});
    					return state;
    			}
    		},{
    			field: 'planQty',
    			title: '计划数量\净重'
    		},{
    			field: 'actualQty',
    			title: '已作业数量\净重'
    		},{
    			field: 'unit',
    			title: '单位'
    		},{
    			field: 'originalLocation',
    			title: '原库位',
    		},{
    			field: 'recommendLocation',
    			title: '目标库位'
    		},{
    			field: 'sourceRow',
    			title: '来源订单行号'
    		},{
    			field: 'storageInTradingNo',
    			title: '收货交易号'
    		},{
    			field: 'skuStockBatchNo',
    			title: '库存批次号'
    		},{
    			field: 'remark',
    			title: '备注'
    		},{
    			field: 'operator',
    			title: '运营商'
    		},{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return operationbillManage.format(row.created,"yyyy/MM/dd HH:mm:ss");
				}
    	    },{
    			field: 'creator',
    			title: '创建人',
    	    },{
    			field: 'modified',
    			title: '最后修改时间',
    			formatter:function(value,row,index){
					return operationbillManage.format(row.modified,"yyyy/MM/dd HH:mm:ss");
				}
    	    },{
    			field: 'modifier',
    			title: '最后修改人',
    	    }   
    		]
    	});
    	  $('#planDetailTable').bootstrapTable('hideColumn','id');
    },
    setOperateRecordValue:function(row){
    	$("#operationRow03").val(row.operationRow);
    	$("#storageInTradingNo03").val(row.storageInTradingNo);
    	$("#skuCode03").val(row.skuCode);
    	$("#sourceRow03").val(row.sourceRow);
    	$("#operationQty03").val(row.operationQty);
    	$("#originalLocation03").val(row.originalLocation);
    	$("#operation03").val(row.operation);
    	$("#unit03").val(row.unit);
    	$("#recommendLocation03").val(row.planLocation);
    	$("#actualLocation03").val(row.actualLocation);
    	$("#operationTime03").val(operationbillManage.format(row.operationTime,"yyyy-MM-dd"));
    	$("#skuProDate02").val(operationbillManage.format(row.skuProDate,"yyyy-MM-dd"));
    	$("#skuFailDate02").val(operationbillManage.format(row.skuFailDate,"yyyy-MM-dd"));
    	$("#skuProBatchNo02").val(row.skuProBatchNo);
    	$("#skuStorageDate02").val(operationbillManage.format(row.skuStorageDate,"yyyy-MM-dd"));
    	$("#supplierCode02").val(row.supplierName);
    	$("#skuStockBatchBo02").val(row.skuStockBatchBo);
    	$("#skuState02").val(row.skuState);
    },
    /**
     * 作业记录
     */
    searchOperateRecordByPage: function (id) {
    	//分页组件
    	$.pageTable({
    		tableId: "#operateRecordTable",//需要分页的table ID
    		url: operationbillManage.URL.getOperateRecordUrl()+"?id="+id,//请求后台的URL（*）
    		method: 'POST',//默认启用POST
            sortable: true,
    		sortName:'id',
    		sortOrder:'desc',
    		onClickRow:function(row,$element){
    			operationbillManage.setOperateRecordValue(row);
            },
            onLoadSuccess:function(data){
            	operationbillManage.isResetOffset = 0;
            	if(data.rows.length>0){
            		operationbillManage.setOperateRecordValue(data.rows[0]);	
            	}else{
            		$("#oprateRecordForm")[0].reset();
            	}
            },
    		columns: [
    		{
    			field: 'operationDealRow',
    			title: '作业交易行号'
    		}, {
    			field: 'skuCode',
    			title: '货品编码'
    		},{
    			field: 'skuName',
    			title: '货品名称'
    		},{
    			field: 'operationQty',
    			title: '作业数量\净重'
    		},{
    			field: 'unit',
    			title: '单位'
    		},{
    			field: 'originalLocation',
    			title: '原库位',
    		},{
    			field: 'planLocation',
    			title: '目标库位'
    		},{
    			field: 'actualLocation',
    			title: '实际库位'
    		},{
    			field: 'sourceNoRow',
    			title: '来源订单行号'
    		},{
    			field: 'storageInTransactionNo',
    			title: '收货交易号'
    		},{
    			field: 'skuStockBatchNo',
    			title: '库存批次号'
    		},{
    			field: 'remark',
    			title: '备注'
    		},{
    			field: 'operatorCode',
    			title: '运营商'
    		},{
    			field: 'warehouseCode',
    			title: '仓库编码'
    		},{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return operationbillManage.format(row.created,"yyyy/MM/dd HH:mm:ss");
				}
    	    },{
    			field: 'creator',
    			title: '创建人',
    	    },{
    			field: 'modified',
    			title: '最后修改时间',
    			formatter:function(value,row,index){
					return operationbillManage.format(row.modified,"yyyy/MM/dd HH:mm:ss");
				}
    	    },{
    			field: 'modifier',
    			title: '最后修改人',
    	    }   
    		]
    	});
    	  $('#operateRecordTable').bootstrapTable('hideColumn','id');
    },
    //查询负责列表
    searchEmp: function () {
        $.pageTable({
            tableId: "#empList",//需要分页的table ID
            url: operationbillManage.URL.driverListUrl(),//请求后台的URL（*）
            queryParams: queryParamsEmp,
            onLoadSuccess: function () {
                operationbillManage.isResetOffset = 0;
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
    exportList: function () {
    	var contextPath = $("#contextPath").val();
    	$("#mainForm").attr('action',contextPath+operationbillManage.URL.exportListUrl());
    	$("#mainForm").submit();
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
	// 批量打印面单
	operationbillPrint : function(ids) {
		// 触发Ajax
		var params = "?ids=" + ids;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + operationbillManage.URL.printOperationUrl()
						+ params);

	},
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		operationbillManage.isResetOffset = 1;
    		$('#operationbillManageTable').bootstrapTable('refresh');
    	});
    	//绑定导出
    	$("#btn_show_export").click(function () {
    		operationbillManage.exportList();
    	});
    	//绑定编辑事件
    	$("#btn_edit").click(function () {
    		var id = $.getIdSelections("#operationbillManageTable","id");
    		if(id==null||id==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		if(id.length!=1){
    			$.toastrWarning('每次只能选择一条记录进行编辑！');  
        		return false;
    		}
    		var state = $.getIdSelections("#operationbillManageTable","state");
    		if(state!=30){
    			$.toastrWarning('只有待上架的上架作业单才可以进行编辑操作！');  
        		return false;
    		}
    		$.clearForm("recordForm");
    		$("#operationId").val(id.toString());
    		$.showModal("#myModal");
    		operationbillManage.getInfo(id);
    		$("#planDetailTable").bootstrapTable('destroy');
    		$("#operateRecordTable").bootstrapTable('destroy');
    		operationbillManage.searchPlanListByPage(id);
    		operationbillManage.searchOperateRecordByPage(id);
    		$("#leftMeun li a").first().trigger("click");
    	});
    	//清空负责人查询框
    	$("#clear_search_emp").on("click",function () {
    		$.clearForm("empForm");
    	});
    	//提交
    	$("#btn_take_account01").click(function(){
    		if($("#operationRow01").val()==null ||$("#operationRow01").val()==""){
    			$.toastrWarning("请选择具体计划明细后进行操作");
				return;
    		}
    		if($("#state02").val() !=10){
    			$.toastrWarning("只有计划明细状态为未完成的上架单明细才能进行该操作！");
				return;
    		}
    		if($("#state01").val() !=30){
    			$.toastrWarning("只有上架中的作业单才可以进行上架操作！");
				return;
    		}
    		
    		var operationQty = $("#operationQty").val();
    		if(operationQty==''){
    			$.toastrWarning('请填写作业数量！');  
        		return false;
    		}
    		var numberTest = /^([0-9]{1,9}.?[0-9]{0,2})$/;
    		if(operationQty!='' && !numberTest.test(operationQty)){
    			$.toastrWarning('作业数量只能是9位数字且最多保留两位小数哦');
    			return false;
    		}
    		
			var actualLocation = $('#actualLocation').val();
			if(actualLocation==''){
    			$.toastrWarning('请填写实际库位！');  
        		return false;
    		}
    		var params={
    				'operationQty':$("#operationQty").val(),
        			'actualLocation':$('#actualLocation').val(),
        			'operationRow':$('#operationRow01').val(),
        			'billNo':$("#billNo01").val()
        		}
    		$("#btn_take_account01").attr("disabled",true);
        	$.callAjax({
        		type:"post",
        		url : operationbillManage.URL.submitOperateUrl(),
        		data : params,
        		success : function(data){
        			if(data.code != "0000"){
        				$.toastrWarning(data.msg);
        				$("#btn_take_account01").attr("disabled",false);
        			}else{
        				$.hideModal("#myModal");
        				$('#operationbillManageTable').bootstrapTable('refresh');
        				$("#btn_take_account01").attr("disabled",false);
        			}
        		},
        		error : function(){
        			$.toastrError();
        			$("#btn_take_account01").attr("disabled",false);
        		}
        	});
    	});
    	//绑定键盘事件
    	$(document).keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 operationbillManage.isResetOffset = 1;
    			 $('#operationbillManageTable').bootstrapTable('refresh');
    		}
	    });
    	//清空事件
    	$("#btn_reset").click(function () {
    		$("#mainForm input").val("");
    		$("#mainForm select").val("");
    	});
    	//分派按钮事件
        $('#btn_assign').click(function () {
            var id = $.getIdSelections("#operationbillManageTable","id");
            if(id==null||id==''){
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            if(id.length>1){
                $.toastrWarning('每次只能选择一条记录进行分派！');
                return false;
            }
            var state = $.getIdSelections("#operationbillManageTable","state");
            if( state !=10 ){
    			$.toastrWarning("只有状态为待分派才能进行分派！");
				return;
    		}
            $.showModal("#pickFpModel");
        });
        //绑定分派人条件查询按钮事件
        $("#btn_search_emp").on("click", function () {
            $("#btn_search_emp").addClass("disabled");
            operationbillManage.isResetOffset = 1;
            $('#empList').bootstrapTable('refresh');
        });
      //调出员工负责人列表
        $("#pick_div_emp").click(function () {
        	operationbillManage.searchEmp();
        	$("#empForm")[0].reset();
            $('#empList').bootstrapTable('refresh');
            $.showModal('#myModal03');
        })
        //保存分派人
        $("#btn_pickQrEmp").click(function () {
                var ids = $.getIdSelections("#operationbillManageTable","id");
                var pickName = $('#pick_name').val();
                if(pickName!='' && pickName!=undefined){
                	 $.hideModal("#pickFpModel");
                	 $.callAjax({
                         type:"post",
                         url : operationbillManage.URL.pickFpUrl()+"?ids="+ids+"&pickName="+pickName,
                         success : function(data){
                             var code = data.code;
                             if(code!="0000"){
                                 toastr['warning'](data.msg);
                                 return;
                             }else{
                                 //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                                 $.toastrSuccess('分派成功！');
                                 $('#pickListTable').bootstrapTable('refresh');
                                 $('#operationbillManageTable').bootstrapTable('refresh');
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
        //绑定确认完成作业
    	$("#btn_finished").click(function(){
    		var ids = $.getIdSelections("#operationbillManageTable","id");
    		if(ids==null||ids==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		var states = $.getIdSelections("#operationbillManageTable","state");
    		var isOk = true;
    		$.each(states,function(index,state){
				 if(state=='98'){
					 isOk=false;
					 return false;
				 }
			});
			if(!isOk){
				$.toastrWarning('已作废的作业单，不允许上架确认！');
				return false;
			}  
			$("#btn_finished").attr("disabled",true);
        	$.dialogConfirm({
                message: '您确认要确认完成作业吗?',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : operationbillManage.URL.confirmFinishOperateUrl()+"?ids="+ids,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				toastr['warning'](data.msg); 
    			    				$("#btn_finished").attr("disabled",false);
    			    			}else{
    			    				//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
    			    				$.toastrSuccess('确认成功！');
    			    				$('#operationbillManageTable').bootstrapTable('refresh');
    			    				$("#btn_finished").attr("disabled",false);
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    			$("#btn_finished").attr("disabled",false);
    			    		}
    			    	});
                    }
                    $("#btn_finished").attr("disabled",false);
                }
            });
    		$('#storageInManageTable').bootstrapTable('refresh');
    	});
    	
    	//绑定领取点击事件
    	$("#btn_sign").click(function(){
    		var ids = $.getIdSelections("#operationbillManageTable","id");
    		if(ids==null||ids==''){
        		$.toastrWarning('请先选择记录再操作！');  
        		return false;
        	}
    		var states = $.getIdSelections("#operationbillManageTable","state");
    		var isOk = true;
    		$.each(states,function(index,state){
				 if(state!='20'){
					 isOk=false;
					 return false;
				 }
			});
			if(!isOk){
				$.toastrWarning('只有状态为待领取的上架作业单才可以领取！');
				return false;
			}  
			$("#btn_sign").attr("disabled",true);
        	$.dialogConfirm({
                message: '您确认要领取该作业单吗?',
                callback: function(result) {
                    if(result) {
    			    	$.callAjax({
    			    		type:"post",
    			    		url : operationbillManage.URL.signOperationBillUrl()+"?ids="+ids,
    			    		success : function(data){   
    			    			var code = data.code;
    			    			if(code!="0000"){
    			    				toastr['warning'](data.msg); 
    			    				$("#btn_sign").attr("disabled",false);
    			    			}else{
    			    				$.toastrSuccess('领取成功！');
    			    				$('#operationbillManageTable').bootstrapTable('refresh');
    			    				$("#btn_sign").attr("disabled",false);
    			    			}
    			    		},
    			    		error : function(){
    			    			$.toastrError();
    			    			$("#btn_sign").attr("disabled",false);
    			    		}
    			    	});
                    }
                    $("#btn_sign").attr("disabled",false);
                }
            });
    		$('#storageInManageTable').bootstrapTable('refresh');
    	});
    	
    	$("#btn_operation_print").on("click", function() {
			//$("#btn_operation_print").addClass("disabled");
			var ids = $.getIdSelections("#operationbillManageTable", "id");
			if (ids == null || ids == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}
			operationbillManage.operationbillPrint(ids); 
		});
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	operationbillManage.searchListByPage();
    },
    //根据ID获取基本信息
    getInfo: function (id) {
		$.callAjax({
			type:"post",
			url : operationbillManage.URL.getInfoUrl()+"?id="+id,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         			return;
         		}
         		$("#billNo01").val(data.data.billNo);
         		$("#sourceType").val(data.data.sourceType);
         		$("#sourceBill01").val(data.data.sourceBill);
         		$("#reasonCode").val(data.data.reasonCode);
         		$("#printCount").val(data.data.printCount);
         		$("#reason").val(data.data.reason);
         		$("#state01").val(data.data.state);
         		$("#receiveTime").val(operationbillManage.format(data.data.receiveTime,"yyyy-MM-dd HH:mm:ss"));
         		$("#executor").val(data.data.executor);
         		$("#operateResult01").val(data.data.operateResult);
         		$("#implementTime").val(operationbillManage.format(data.data.implementTime,"yyyy-MM-dd HH:mm:ss"));
         		return;
			},
			error : function(){
				$.toastrError();
				return;
			}
		});
    },
}

//负责人查询参数
var queryParamsEmp = function (params) {
    var cnName = $('#name_emp').val();
    var mobileNo = $('#tel_emp').val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: operationbillManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
	var temp ={//这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				billNo: $("#billNo").val(),	//作业单号
				sourceType: $("#sourceType").val(),	//来源类型
				sourceBill:$("#sourceBill").val(),//来源单号
				state: $("#state").val(),	//状态
				operateResult:$("#operateResult").val(), //结果
				pageSize: params.limit,   //页面大小
				offset: operationbillManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
				sort: params.sort,
				order: params.order
			};
	operationbillManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		'click .detail_a': function (e, value, row, index) {
			$("#operationId").val(row.id);
    		$.showModal("#myModal");
    		operationbillManage.getInfo(row.id);
    		$.clearForm("recordForm");
    		$("#planDetailTable").bootstrapTable('destroy');
    		$("#operateRecordTable").bootstrapTable('destroy');
    		operationbillManage.searchPlanListByPage(row.id);
    		operationbillManage.searchOperateRecordByPage(row.id);
    		$("#leftMeun li a").first().trigger("click");
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
	operationbillManage.init();
	//2、初始化绑定事件
	operationbillManage.bindEvent();
	/*//3、li切换
	// 页签选择改变事件，从后台获取数据
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
        var activeTab = $(e.target).text();
        // 获取前一个激活的标签页的名称
        var previousTab = $(e.relatedTarget).text();
        if(activeTab == "基本信息"){
        	if(operationbillManage.id != undefined)
            	operationbillManage.getMaterialListByGoodsId(operationbillManage.type);
	    }
        else if(activeTab == "计划明细"){
        	operationbillManage.type = 1;
        	if(operationbillManage.id != undefined)
            	operationbillManage.getMaterialListByGoodsId(operationbillManage.type);
	    }
        else if(activeTab == "作业记录"){
	    	// 获取属性配置列表
        	operationbillManage.getPropertyList();
        	if(operationbillManage.id != undefined)
            	operationbillManage.getPropertyListByGoodsId();
	    }
    });*/
});
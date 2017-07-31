var takeGoodsManage = {
		globalParams:"",
		//是否重置分页偏移值0：否，1：是
		isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取换货订单列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/storagein/storageinDetailList';
        },
		//导出
		exportListUrl: function () {
        	return '/wms/storagein/exportExcel';
        },
        //收货操作
        takegoodsOperateUrl:function(){
        	return '/wms/storagein/takegoodsOperate';
        },
        //收货完成
        takegoodsFinishedUrl: function () {
        	return '/wms/storagein/takegoodsFinished';
        },
        //供应商
        supplierListUrl: function () {
        	return '/supplier/list';
        },
        //打印
        printStorageInUrl: function () {
        	return '/wms/storagein/print/storageIn';
        }
    },
    clearTakegoodDetailTableClass:function(){
    	$("#takegoodDetailTable tr").each(function() {
    		if ($(this).hasClass("takegoodDetailTable_selected")) {
    			$(this).removeClass("takegoodDetailTable_selected");
    		}
    	});
    },
    /**分页获取换货订单列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#takegoodDetailTable",//需要分页的table ID
    		url: takeGoodsManage.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'POST',//默认启用POST
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		queryParams:queryParams,
    		onLoadSuccess:function(data){
    			takeGoodsManage.isResetOffset = 0;
    			if(data.rows.length>0){
    			takeGoodsManage.setTakegoodDetailTableValue(data.rows[0]);
    			//takeGoodsManage.clearTakegoodDetailTableClass();
    			//$("#takegoodDetailTable tr").eq(1).addClass("takegoodDetailTable_selected");
    			}
            },
            onClickRow:function(row,$element){
            	takeGoodsManage.setTakegoodDetailTableValue(row);
            	takeGoodsManage.clearTakegoodDetailTableClass();
            	$element.addClass("takegoodDetailTable_selected");
            },
            sortable: true,
    		sortName:'detail_row',
    		sortOrder:'desc',
    		columns: [{
    			field: 'detailRow',
    			title: '入库明细行号'
    		}, {
    			field: 'storageInNo',
    			title: '入库单号'
    		},{
    			field: 'skuCode',
    			title: '货品编码'
    		},{
    			field: 'skuName',
    			title: '货品名称'
    		},/*{
    			field: 'receiveState',
    			title: '收货状态',
    			formatter:function(value,row,index){
					var receiveState =""
					$("#receiveState01 option").each(function(){
						if($(this).val()==value){
							receiveState = $(this).text();
						}
					});
					return receiveState;
    			}
    		},*/{
    			field: 'receiveResult',
    			title: '收货结果',
    			formatter:function(value,row,index){
					var receiveResult ="";
					$("#receiveResult01 option").each(function(){
						if($(this).val()==value){
							receiveResult = $(this).text();
						}
					});
					return receiveResult;
    			}
    		},{
    			field: 'expectQty',
    			title: '应收数量'
    		},{
    			field: 'skuQty',
    			title: '已收良品数量'
    		},{
    			field: 'brokenQty',
    			title: '已收破损数量'
    		},{
    			field: 'refuseQty',
    			title: '已拒收数量'
    		},{			
    			field: 'notReceiveQty',
    			title: '未收数量'
    		},{
    			field: 'shelfQty',
    			title: '已上架数量'
    		},{
    			field: 'unit',
    			title: '数量单位'
    		},{
    			field: 'purchaseRow',
    			title: '采购单行号'
    		},{
    			field: 'purchaseRemark',
    			title: '采购单行号备注'
    		},{
    			field: 'created',
    			title: '创建时间',
    			formatter:function(value,row,index){
					return takeGoodsManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'creator',
    			title: '创建人',
    	    },{
    			field: 'modified',
    			title: '最后修改时间',
    			formatter:function(value,row,index){
					return takeGoodsManage.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    	    },{
    			field: 'modifier',
    			title: '最后修改人',
    	    }
    		]
    	});
    	  $('#takegoodDetailTable').bootstrapTable('hideColumn','id');
    },
    setTakegoodDetailTableValue: function(row) {
    	$("#detailId").val(row.id);
    	$("#detailRow01").val(row.detailRow);
    	$("#skuCode01").val(row.skuCode);
    	$("#receiveState01").val(row.receiveState);
    	$("#expectQty01").val(row.expectQty);
    	$("#skuQty01").val(row.skuQty);
    	$("#purchaseno01").val(row.purchaseno);
    	$("#purchaseRow01").val(row.purchaseRow);
    	$("#receiveResult01").val(row.receiveResult);
    	$("#notReceiveQty01").val(row.notReceiveQty);
    	$("#brokenQty01").val(row.brokenQty);
    	$("#unit01").val(row.unit);
    	$("#shelfQty01").val(row.shelfQty);
    	$("#refuseQty01").val(row.refuseQty);
    	$("#remark01").val(row.remark);
    	$("#notShelfQty01").val(row.expectQty-row.shelfQty);
    	$("#detailRowHidden").val(row.detailRow);
    },
    //供应商列表
    searchListSupplier:function () {
        $.pageTable({
            tableId: "#supplierTable",//需要分页的table ID
            toolbar: '#toolbar',
            toolbarAlign: 'right',
            queryParams: queryParamSupplier,
            url: takeGoodsManage.URL.supplierListUrl(),//请求后台的URL（*）
            onLoadSuccess: function () {
            	takeGoodsManage.isResetOffset = 0;
            },
            sortable: true,
            sortName: 'id',
            sortOrder: 'desc',
            columns: [
                {
                    radio: true
                },
                {
                    field: 'supplierCode',
                    title: '供应商编码',

                },
                {
                    field: 'supplier',
                    title: '供应商名称',

                },
                {
                    field: 'goodsName',
                    title: '供应商品类别'
                }
            ]
        });
    },
    /**批量导出**/
    exportStorageList: function () {
    	var params = takeGoodsManage.globalParams;
    	$.callAjax({
    		type:"post",
    		url : takeGoodsManage.URL.exportListUrl(),
    		data : params,
    		success : function(data){
    			if(data.code != "0000"){
    				$.toastrWarning(data.msg);
    				return;
    			}else{
    				if($.isNotNull(data.data)){
    					$.toastrSuccess('正在导出！');
    					var fileName = data.data;
    					var contextPath = $("#contextPath").val();
    					//请求下载excel
    					location.href=contextPath+"/wms/storagein/download?fileName="+fileName;
    				}else{
    					$.toastrSuccess(data.msg);
    				}
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
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
	storageInListBillPrint : function(ids) {
		// 触发Ajax
		var params = "?ids=" + ids;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + takeGoodsManage.URL.printStorageInUrl()
						+ params);

	},
    bindEvent: function () {
    	//录入收货结果
    	$("#btn_put_result").click(function(){
    		if($("#storStatu").val() ==10){
    			$.toastrWarning("该入库单未确认,请先确认！");
				return;
    		}
	    	if($("#storStatu").val() ==98){
				$.toastrWarning("该入库单已取消,不允许再进行收货！");
				return;
			}
	    	if($("#storStatu").val() ==99){
				$.toastrWarning("该入库单已关闭,不允许再进行收货！");
				return;
			}
    		var result = $("#receiveResult01").val();
    		if(result=='20'){
    			$.toastrWarning("已全部收货,不允许再进行收货！");
				return;
    		}
    		
    		if($("#detailRow01").val()==null ||$("#detailRow01").val()==""){
    			$.toastrWarning("请选择具体的入库明细然后进行操作");
				return;
    		}
    		/*$.clearForm("takeOperateForm");*/
    		$("#takeOperateForm")[0].reset();
    		$("#supplierCode05").val($("#supplierCodeHidden").val());
    		$("#supplierName05").val($("#supplierNameHidden").val());
    		$("#myOperateModal #skuCode02").val($("#skuCode01").val());
    		$("#myOperateModal #expectQty02").val($("#expectQty01").val());
    		$("#myOperateModal #notReceiveQty02").val($("#notReceiveQty01").val());
    		$("#myOperateModal #unit02").val($("#unit01").val());
    		$.showModal('#myOperateModal');
    	});
    	//收货完成
    	$("#btn_finished").click(function(){
    		if($("#detailId").val()==null ||$("#detailId").val()==""){
    			$.toastrWarning("请选择具体的入库明细行然后进行操作");
				return;
    		}
    		if(!($("#receiveState01").val() ==30 || $("#receiveState01").val() ==20)){
    			$.toastrWarning("只有状态为待收货/收货中的入库单才能进行完成收货操作！");
				return;
    		}
    		$("#btn_finished").attr("disabled",true);
    		$.callAjax({
        		type:"post",
        		url : takeGoodsManage.URL.takegoodsFinishedUrl()+"?id="+$("#detailId").val(),
        		success : function(data){
		    		if(data.code != "0000"){
		    			toastr['warning'](data.msg); 
		    			$("#btn_finished").attr("disabled",false);
		    		}else{
		    			$.toastrSuccess('收货成功！');
		    			$('#takegoodDetailTable').bootstrapTable('refresh');
		    			$('#storageInManageTable').bootstrapTable('refresh');
		    			$("#btn_finished").attr("disabled",false);
		    		}
        		},
        		error : function(){
        			$.toastrError();
        			$("#btn_finished").attr("disabled",false);
        		}
        	});
    	});
    	
    	//提交并继续收货
    	$("#btn_continue_submit").click(function(){
    		if(!takeGoodsManage.validateData()){
    			return false;
    		}
    		var params={
    				'id':$("#detailId").val(),
    				'detailRow':$("#detailRow01").val(),
        			'refuseQty':$('#refuseQty05').val(),
        			'refuseReason':$('#refuseReason05').val(),
        			'refuseDesc':$('#refuseDesc').val(),
        			'productDate':$('#skuProDate').val(),
        			'expiredDate':$('#skuFailDate').val(),
    				'storageDate':$('#skuStorageDate').val(),
    				'skuProBatchNo':$('#skuProBatchNo').val(),
    				'supplierCode':$('#supplierCode05').val(),
    				'supplierName':$('#supplierName05').val(),
    				'skuQty':$('#skuQty05').val(),
    				'brokenQty':$('#brokenQty05').val(),
    				'isBeyondTakes':"0"
        		}
    		$("#btn_continue_submit").attr("disabled",true);
        	$.callAjax({
        		type:"post",
        		url : takeGoodsManage.URL.takegoodsOperateUrl(),
        		data : params,
        		success : function(data){
	    			var code = data.code;
	    			if(code!="0000"){
	    				$.toastrWarning(data.msg);
	    				$("#btn_continue_submit").attr("disabled",false);
	    			}else{
	    				//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
	    				$.toastrSuccess('收货成功！');
	    				takeGoodsManage.clearTakeData();
	    				$("#btn_continue_submit").attr("disabled",false);
	    				$("#storageInManageTable").bootstrapTable('refresh');
	    			}
		    	},
	    		error : function(){
	    			$.toastrError();
	    			$("#btn_continue_submit").attr("disabled",false);
	    		}
        	});
    	});
    	//提交
    	$("#btn_submit").click(function(){
    		if(!takeGoodsManage.validateData()){
    			return false;
    		}
    		var params={
    				'id':$("#detailId").val(),
    				'detailRow':$("#detailRow01").val(),
        			'refuseQty':$('#refuseQty05').val(),
        			'refuseReason':$('#refuseReason05').val(),
        			'refuseDesc':$('#refuseDesc').val(),
        			'productDate':$('#skuProDate').val(),
        			'expiredDate':$('#skuFailDate').val(),
    				'storageDate':$('#skuStorageDate').val(),
    				'skuProBatchNo':$('#skuProBatchNo').val(),
    				'supplierCode':$('#supplierCode05').val(),
    				'supplierName':$('#supplierName05').val(),
    				'skuQty':$('#skuQty05').val(),
    				'brokenQty':$('#brokenQty05').val(),
    				'isBeyondTakes':"0"
        		}
				$("#btn_submit").attr("disabled",true);
				$.callAjax({
		    		type:"post",
		    		url : takeGoodsManage.URL.takegoodsOperateUrl(),
		    		data : params,
		    		success : function(data){
		    			if(data.code != "0000"){
		    				$.toastrWarning(data.msg);
		    				$("#btn_submit").attr("disabled",false);
		    			}else{
		    				$("#btn_submit").attr("disabled",false);
		    				$.hideModal("#myOperateModal");
		    				$("#storageInManageTable").bootstrapTable('refresh');
		    				var contextPath = $("#contextPath").val();
		    	    		var url = $("#leftMeun ul li").eq(1).attr("data-href");
		    	    		$("#centerDiv").children().remove(); 
		    	    		$("#centerDiv").load(contextPath+url);
		    			}
		    		},
	        		error : function(){
	        			$.toastrError();
	        			$("#btn_submit").attr("disabled",false);
	        		}
    			});
    		});
    	//供应商
        $("#clickSupplier").click(function () {
            $.showModal('#supplierModel');
            takeGoodsManage.searchListSupplier();  //供应商列表
        });
        //供应商查询
        $("#btn_search_supplier").on("click", function () {
            takeGoodsManage.isResetOffset = 1;
            $('#supplierTable').bootstrapTable('refresh');
        });
        //清空供应商的查询
        $("#clear_search_supplier").on("click",function () {
        	$.clearForm("fromModal03");
        });
        //供应商保存按钮
        $("#driver_supplier_save").off().click(function () {
           var supplierCode = $.getIdSelections("#supplierTable","supplierCode");
           var shipper = $.getIdSelections("#supplierTable","supplier");
           if(supplierCode.length==0){
               $.toastrWarning('请先选择记录再操作！');
               return false;
           }else {
               $("#supplierName05").val(shipper);
               $("#supplierCode05").val(supplierCode);
               $.hideModal('#supplierModel');
           }
        })
    	//返回的时候
    	$("#btn_go_back").click(function(){
    		$.hideModal("#myOperateModal");
    		var contextPath = $("#contextPath").val();
    		var url = $("#leftMeun ul li").eq(1).attr("data-href");
    		$("#centerDiv").children().remove(); 
    		$("#centerDiv").load(contextPath+url);
    		var row = $("#detailRow01").val();
    		takeGoodsManage.clearTakegoodDetailTableClass();
    		$("#takegoodDetailTable tr").eq(row).addClass("takegoodDetailTable_selected");
    		takeGoodsManage.setTakegoodDetailTableValue(row);
    	});
        $("#myOperateModal button[class='close']").click(function(){
        	$.hideModal("#myOperateModal");
    		var contextPath = $("#contextPath").val();
    		var url = $("#leftMeun ul li").eq(1).attr("data-href");
    		$("#centerDiv").children().remove(); 
    		$("#centerDiv").load(contextPath+url);
    		var row = $("#detailRow01").val();
    		takeGoodsManage.clearTakegoodDetailTableClass();
    		$("#takegoodDetailTable tr").eq(row).addClass("takegoodDetailTable_selected");
        });
        
        $("#btn_print_goodtag").click(function(){
        	takeGoodsManage.storageInListBillPrint($("#detailId").val());
        });
        //重新加载一次数据  事件控件进行了冒泡 后面看是否有好的方式处理
        /*$("#myOperateModal").on('hide.bs.modal',function(){
        	var contextPath = $("#contextPath").val();
    		var url = $("#leftMeun ul li").eq(1).attr("data-href");
    		$("#centerDiv").load(contextPath+url);
    		var row = $("#detailRow01").val();
    		takeGoodsManage.clearTakegoodDetailTableClass();
    		$("#takegoodDetailTable tr").eq(row).addClass("takegoodDetailTable_selected");
    		takeGoodsManage.setTakegoodDetailTableValue(row);
        });*/
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	takeGoodsManage.searchListByPage();
    	$(".form_datetime_month").datetimepicker({
            format: "yyyy-mm-dd",
            language:  'zh-CN',  //中文显示
            minView:"month",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });
    },
    clearTakeData:function(){
    	var newNotReceiveQty = $("#notReceiveQty02").val()-$('#refuseQty05').val()-$('#skuQty05').val()-$('#brokenQty05').val();
		$("#notReceiveQty02").val(newNotReceiveQty);
		$('#refuseQty05').val("");
		$('#refuseReason').val("-");
		$('#refuseDesc').val("");
		$('#skuProDate').val("");
		$('#skuFailDate').val("");
		$('#skuStorageDate').val("");
		$('#skuProBatchNo').val("");
		$("#supplierCode05").val($("#supplierCodeHidden").val());
		$("#supplierName05").val($("#supplierNameHidden").val());
		$('#skuQty05').val("");
		$('#brokenQty05').val("");
		$('#refuseReason05').val("-");
    },
    validateData:function(){
    	
    	var skuStorageDate = $("#skuStorageDate").val();
    	if(skuStorageDate =='' || skuStorageDate== null){
			$.toastrWarning('请填写入库日期');
			return false;
		}
    	/*var skuProDate = $("#skuProDate").val();
    	if(skuProDate =='' || skuProDate==null){
			$.toastrWarning('请填写生产日期');
			return false;
		}
    	
    	var skuFailDate = $("#skuFailDate").val();
    	if(skuFailDate =='' || skuFailDate==null){
			$.toastrWarning('请填写失效日期');
			return false;
		}
    	
    	var skuProBatchNo = $("#skuProBatchNo").val();
    	if(skuProBatchNo =='' || skuProBatchNo==null){
			$.toastrWarning('请填写生产批次号');
			return false;
		}
    	if(skuProBatchNo.length<4 || skuProBatchNo.length>16){
    		$.toastrWarning('生产批次号长度必须在4到16位之间');
			return false;
    	}*/
    	
    	var numberTest = /^([0-9]{1,9}.?[0-9]{0,2})$/;
    	var skuQty = $("#skuQty05").val();
    	if(skuQty!='' && !numberTest.test(skuQty)){
			$.toastrWarning('良品最多只能是9位数字且最多保留两位小数哦');
			return false;
		}
    	if(skuQty!='' && skuQty<=0){
    		$.toastrWarning('良品数量必须大于0哟');
			return false;
    	}
    	var brokenQty = $("#brokenQty05").val();
    	if(brokenQty!='' && !numberTest.test(brokenQty)){
			$.toastrWarning('破品最多只能是9位数字且最多保留两位小数哦');
			return false;
		}
    	if(brokenQty!=''&& brokenQty<=0){
    		$.toastrWarning('破品数量必须大于0哟');
			return false;
    	}
    	var refuseQty = $("#refuseQty05").val();
    	if(refuseQty!='' && !numberTest.test(refuseQty)){
			$.toastrWarning('拒收数量最多只能9位数字且最多保留两位小数哦');
			return false;
		}
    	if(refuseQty!=''&& refuseQty<=0){
    		$.toastrWarning('拒收数量必须大于0哟');
			return false;
    	}
    	if(skuQty=='' && brokenQty=='' && refuseQty ==''){
    		$.toastrWarning('良品/破损/拒收数量中必须要填写其中一个');
			return false;
    	}
    	
		var refuseQty = $("#refuseQty05").val();
		var refuseReason = $("#refuseReason05").val();
		if(refuseQty!=0 && refuseQty!='' && refuseReason=='-'){
			$.toastrWarning('请填写拒收原因');
			return false;
		}
		var refuseQty = $("#refuseQty05").val();
		var refuseReason = $("#refuseReason05").val();
		if((refuseQty<=0 || refuseQty =='') && refuseReason !='-'){
			$.toastrWarning('请填写拒收数量');
			return false;
		}
		return true;
	},
}


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: takeGoodsManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort,
			order: params.order,
			id:$("#storageInId").val(),
		
	};
	takeGoodsManage.globalParams = temp;
	temp = JSON.stringify(temp);
	return temp;
};

//供应商查询参数
var queryParamSupplier = function (params) {
    var supplierCode =$("#supplierC").val();
    var supplier = $("#shipper").val();
    var goodsTypeCodes = $("#skuCode02").val();
    var tempSupplier ={
        pageSize: params.limit,   //页面大小
        offset: takeGoodsManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        supplierCode:supplierCode, //供应商编码
        supplier:supplier  //供应商名称
    };
    return tempSupplier;
}

$(document).ready(function(){
	$("#btn_continue_submit").unbind();
	$("#btn_finished").unbind();
	$("#btn_submit").unbind();
	//1、初始化加载列表数据
	takeGoodsManage.init();
	//2、初始化绑定事件
	takeGoodsManage.bindEvent();
});
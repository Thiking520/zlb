<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
</head>
<body>
	
	<div id="content">
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>财务管理>采购单核账</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<!-- 隐藏路径 -->
					<input type="hidden" value="${contextPath}" id="contextPath" />
					<div class="box-content">
						<!-- 表单查询区域begin -->

						
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onsubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
							        	<span>付款状态：</span>
							        	<select id="payState" class="form-control" style="width: 120px">
							        		<option value="">---全部---</option>
										  <option value="payed">已付款</option>
										  <option value="not_pay">未付款</option>
										</select>
							        </div>
							        <div class="form-group">
							        	<span>是否已生成对账单：</span>
							        	<select id="isCheck" class="form-control" style="width: 120px">
							        		<option value="">---全部---</option>
										  <option value="Y">是</option>
										  <option value="N">否</option>
										</select>
							        </div>
									<div class="form-group">
							        	<span>供应商名称：</span>
							        	<input type="text" name="searchKeywordSuName" id="searchKeywordSuName" class="form-control input-small" style="width: 150px;" />
							        </div>
									<div class="form-group">
							        	<span>采购完成日期：</span>
							        </div>
							   		<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control datebimg" value=""
											id="completeTimeStart" readonly>
									</div>
							   		~
							   		<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control datebimg" value=""
											id="completeTimeEnd" readonly>
									</div>
									<div class="form-group">
							        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
							        	<button class="btn btn-primary btn-flat"
												type="reset">清空</button>
							        </div>
								</div>
								<!--时间控件end  -->
							</form>
						</div>
						<!-- 表单查询区域end -->
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
									<button id="btn_print1" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon-plus" style="color: green;"></span>生成对账单</button>
							</div>
							</div>
							<table id="purchaseManageTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
		
	</div>
	
<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm" method="post">
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:950px" role="document">
		      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">对账单生成</h4>
			        </div>
		        
			        <div class="modal-body" >
					   <div class="form-group">
							<table id="printTable" class="table table-hover table-striped table-bordered">
							    
							</table>
				       </div>
				       <div class="modal-footer" style="text-align: center;">
				          <button id="btn_create_check" type="button" class="btn btn-primary"  style="width: 150px">
				          		<span aria-hidden="true"></span>生成对账单
				          </button>
				          <button id="btn_cancel_check" type="button"  class="btn btn-primary" data-dismiss="modal" style="width: 150px">
				          		<span aria-hidden="true"></span>取消
				           </button>
				       </div>
			       </div>
		        </div>
		        <div class="modal-footer">
		        </div>
		      </div>
		    </div>
	</form>

	<div class="modal fade" id="payModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" style="width: 950px" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">采购付款</h4>
				</div>
				<!-- modal-header end -->
				
				<div class="modal-body">
						<form id="payform" method="post" role="form" class="form-horizontal">
						 	 <div class="form-group">
							    	<label for="purchaseCode" class="col-sm-2 control-label">采购单号：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="purchaseCode" readonly="true">
							    	</div>
							  </div>
							  	<div class="form-group">
							    	<label for="supplier" class="col-sm-2 control-label">供应商名称：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="supplier" readonly="true">
							    	</div>
							  </div>
						 	 <div class="form-group">
							    	<label for="purchaseAmount" class="col-sm-2 control-label">采购金额：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="purchaseAmount" readonly="true">
							    	</div>
							  </div>
							<div class="form-group">
							    	<label for="actualAmount" class="col-sm-2 control-label">实际付款金额：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="actualAmount">
							    	</div>
							  </div>
						</form>
				
				</div>
				<!-- modal-body end -->
				<div class="modal-footer" style="text-align: center;">
	
					<button id="btn_save" type="button" name="button" class="btn btn-primary" data-dismiss="modal"  style="width: 150px">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确定付款
					</button>
					<button id="btn_cancel_pay" type="button" class="btn btn-primary" data-dismiss="modal" style="width: 150px">
						<span aria-hidden="true"></span>取消
					</button>
				</div>
				<!-- modal-footer end -->
				
			</div>
		</div>
	</div>

	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/pms/financial/financialListManage.js" type="text/javascript"></script>
    <script type="text/javascript">

    var financialManage = {
    	//是否重置分页偏移值0：否，1：是
    	isResetOffset: 0,
    	//封装异步请求的所有ajax的URL地址
        URL: {
        	//分页获取采购列表请求地址
        	searchListByPageUrl: function () {
                return '/financial/list';
            },
            searchGoodsByPageUrl: function () {
                return '/financial/goods';
            },
            preparePrintUrl: function () {
            	return '/financial/preparePrint';
            },
            payPurchase:function () {
            	return '/financial/payPurchase';
            },
            createcheckSheet:function () {
            	return '/financial/createcheckSheet';
            },
        },
        /**分页获取采购建议列表**/
        searchListByPage: function () {
//        	debugger;
        	//分页组件
        	$.pageTable({
        		tableId: "#purchaseManageTable",//需要分页的table ID
        		url: financialManage.URL.searchListByPageUrl(),//请求后台的URL（*）
        		method: 'POST',//默认启用POST
        		queryParams:queryParams,
        		onLoadSuccess:function(){
        			financialManage.isResetOffset = 0;
        			$("#btn_search").removeClass("disabled");
                },
                sortable: true,
        		sortName:'created',
        		sortOrder:'desc',
        		columns: [
        		{checkbox: true},
        		{field: 'purchaseCode',title: '采购单号',align: 'center'},
        		{field: 'applyTime',title: '采购申请时间',align: 'center',
    				formatter:function(value,row,index){
   					return financialManage.format(row.applyTime,"yyyy-MM-dd HH:mm:ss");
    				}
        		},
        		
        		{field: 'supplier',title: '供应商',align: 'center'},
        		{field: 'completeTime', title: '完成时间',align: 'center',
        			formatter:function(value,row,index){
        				return financialManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
        			}
        		},
        		{field: 'purchaseState',title: '采购状态', align: 'center',
        			formatter:function(value,row,index){
        				var result = "";
        				switch(row.purchaseState){
    	    				case "NEW":result = "待采购";break;
    	    				case "SUB":result = "发起采购";break;
    	    				case "PAR":result = "部分入库";break;
    	    				case "CLO":result = "完成采购";break;
    	    				default :result = "待采购";break;
        				}
        				return result;
    				}
        		},
        		{field: 'payState',title: '付款状态', align: 'center',
        			formatter:function(value,row,index){
        				var result = "";
        				switch(value){
    	    				case "payed":result = "<label style='color:green;'>已付款</label>";break;
    	    				case "not_pay":result = "<label style='color:red;'>未付款</label>";break;
        				}
        				return result;
    				}
        		},
        		{field: 'purchaseAmount',title: '采购金额',align: 'center'},
        		{field: 'ischeck',title: '是否已生成对账单', align: 'center',
        			formatter:function(value,row,index){
        				if(row.checksheetId==null||row.checksheetId==''){
        					return "<label style='color:red;'>否</label>";
        				}else{
        					return "是";
        				}
    				}
        		},
        		{field: 'checksheetId',title: '对账单号', align: 'center'}
        		]
        	});
        },
        
      
        preparePrint:function(){
			var checksuccess = true;
			var supplier="";
			var selected = $("#purchaseManageTable").bootstrapTable('getSelections').length;
			if(selected==0){
				$.toastrWarning("请选择采购单数据");
				return false;
			}
			$.map($("#purchaseManageTable").bootstrapTable('getSelections'),
					function(row) {
						if(row.checksheetId!=null&&row.checksheetId!=''){
							$.toastrWarning("采购单'"+row.purchaseCode+"'不能重复生成对账单");
							checksuccess = false;
							return;
						}
						if(supplier!=""){
							if(supplier!=row.supplier.trim()){
								$.toastrWarning("不同供应商的采购单不能生成同一个对账单");
								checksuccess = false;
								return;
							}
						}
						supplier = row.supplier.trim();
			});
			if(!checksuccess){
				return false;
			}
			
			var ids = $.getIdSelections("#purchaseManageTable","id");
    		$.showModal('#editModal');
    	
    		var params = {"ids":ids};
    	    	$.callAjax({
    	    		type:"post",
    	    		url : financialManage.URL.preparePrintUrl(),
    	    		data : params,
    	    		success : function(data){
    			    	$("#printTable").bootstrapTable({
    			    		data:data.data,
    			       		columns: [
    			       	    		{field: 'purchaseCode',title: '采购单号',align: 'center'},
    			       	    		{field: 'applyTime',title: '采购申请时间',align: 'center',
    			       					formatter:function(value,row,index){
    			       						return financialManage.format(row.applyTime,"yyyy-MM-dd HH:mm:ss");
    			       					}
    			       	    		},
    			       	    		{field: 'purchaseAmount',title: '采购金额',align: 'center'},
    			       	    		{field: 'supplier',title: '供应商',align: 'center'},
    			       	    		{field: 'completeTime', title: '完成时间',align: 'center',
    			       	    			formatter:function(value,row,index){
    			       	    				return financialManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
    			       	    			}
    			       	    		},
    			       	    		{field: 'payState',title: '付款状态', align: 'center',
    			       	    			formatter:function(value,row,index){
    			       	    				var result = "";
    			       	    				switch(value){
    			       		    				case "payed":result = "已付款";break;
    			       		    				case "not_pay":result = "未付款";break;
    			       	    				}
    			       	    				return result;
    			       					}
    			       	    		},
    			       	    		{field: 'ischeck',title: '是否已生成对账单', align: 'center',
    			       	    			formatter:function(value,row,index){
    			       	    				if(row.checksheetId==null||row.checksheetId==''){
    			       	    					return "否";
    			       	    				}else{
    			       	    					return "是";
    			       	    				}
    			       					}
    			       	    		}
    			       	    		]
    			        	});
    					$("#printTable").bootstrapTable('hideLoading');//去掉商品列表的正在加载提示
    					$("#printTable").bootstrapTable('load',data.data);
    	    		},
    	    		error : function(){
    	    			$.toastrError();
    	    		}
    	    	});
        },
        
        
        
        bindEvent: function () {
        	//付款
        	$("#btn_save").on('click',function() {
        		financialManage.invokePay();
        	});
        	//打开对账单生成弹出框
        	$("#btn_print1").on('click',function() {
        		financialManage.preparePrint();
        	});
        	//生成对账单
        	$("#btn_create_check").on('click',function() {
        		financialManage.createcheckSheet();
        	});
        	
        
        	$("#btn_search").on('click',function() {
        		$("#btn_search").addClass("disabled");
        		financialManage.isResetOffset = 1;
        		$('#purchaseManageTable').bootstrapTable('refresh');
        	});
        	//时间控件选择日期，用中文提示选择
    		$.fn.datetimepicker.dates['zh'] = {  
    		        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
    		        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
    		        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
    		        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
    		        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
    		        meridiem:    ["上午", "下午"],  
    		        //suffix:      ["st", "nd", "rd", "th"],  
    		        today:       "今天"  ,
    		        clear:       "清空"  
    		};
    		//时间控件的样式
    		$(".datebimg").css({
    			"background":"url('"+$("#contextPath").val()+"/resources/img/pms/pms_calendar.jpg') no-repeat right"
    			,"background-size":"20% 80%"
    			,"background-color": "white"//背景颜色要反正背景图片的后面， 否则无法生效
    			,"width": "190px"
    		});
    		//当时间控件文本框为空时显示提示输入信息
    		$(".datebimg").attr("placeholder","点击选择时间");
    		// 开始时间
    		$('#completeTimeStart').datetimepicker({
    			todayBtn : true,
    			format : "yyyy-mm-dd hh:ii:ss",
    			autoclose : true,
    			language:  'zh', 
    			clearBtn:true,// 自定义属性,true 显示 清空按钮 false 隐藏 默认:true
    			endDate : new Date(),
    			todayHighlight : true
    		}).on(
    				'changeDate',
    				function(e) {
    					$('#completeTimeEnd').datetimepicker('setStartDate',
    							this.value);
    				});
    		// 结束时间：
    		$('#completeTimeEnd').datetimepicker({
    			todayBtn : true,
    			format : "yyyy-mm-dd hh:ii:ss",
    			autoclose : true,
    			language:  'zh', 
    			clearBtn:true,// 自定义属性,true 显示 清空按钮 false 隐藏 默认:true
    			endDate : new Date(),
    			todayHighlight : true
    		}).on(
    				'changeDate',
    				function(e) {
    					$('#completeTimeStart').datetimepicker('setEndDate',
    							this.value);
    				});
        	
        },
        
        //初始化分页查询列表数据 ★★★分页主体列表★★★
        init: function () {
        	financialManage.searchListByPage();
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
    	//执行支付
    	invokePay:function(){
    		$(this).addClass("disabled");
    		var purchaseCode = $("#purchaseCode").val();
    		var purchaseAmount = $("#purchaseAmount").val();
    		var actualAmount = $("#actualAmount").val();
    		var params = {"purchaseCode":purchaseCode,"purchaseAmount":purchaseAmount,"actualAmount":actualAmount};
    		
    		$.callAjax({
    			type:"post",
    			url : financialManage.URL.payPurchase(),
    			data : params,
    			success : function(data){
    		    	//去掉商品列表的正在加载提示
//    				$("#printTable").bootstrapTable('hideLoading');
//    				$("#printTable").bootstrapTable('load',data.data);
    				$.toastrSuccess('操作成功！');
    				$('#payModal').modal('hide');
    				$('#purchaseManageTable').bootstrapTable('refresh');
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
    	},
    	//生成对账单
    	createcheckSheet:function(){
//     		$(this).addClass("disabled");
    		var purchaseCodes = new Array();
    		var datas = $('#printTable').bootstrapTable('getData');
    		if(datas.length==0){
    			$.toastrWarning("请先选择列表数据");
    			return false;
    		}
    	 	$.each(datas, function (i, row) {
    	 		purchaseCodes[i]=row.purchaseCode;
    	 	});
    		
    		var params = {"purchaseCodes":purchaseCodes};
    		
    		$.callAjax({
    			type:"post",
    			url : financialManage.URL.createcheckSheet(),
    			data : params,
    			success : function(data){
    				if(data.code=="0000"){
    					$('#editModal').modal('hide');
    					$('#purchaseManageTable').bootstrapTable('refresh');
    					$.toastrSuccess('操作成功！');
    				}else{
    					$.toastrWarning(data.msg);
    				}
    			},
    			error : function(){
    				$.toastrError("网络异常");
    			}
    		});
    	}
    }

    //得到查询的参数          ★★★分页表单查询参数★★★
    var queryParams = function (params) {
    	
    	var purchaseState = "CLO";
    	var payState = $("#payState").val();
    	var isCheck = $("#isCheck").val();
    	var supplier = $("#searchKeywordSuName").val();
    	var completeTimeStart = $("#completeTimeStart").val();
    	var completeTimeEnd = $("#completeTimeEnd").val();
    	var temp = {   
    			pageSize: params.limit,   //页面大小
    			offset: financialManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
    			sort: params.sort,
    			order: params.order,
    			purchaseState:purchaseState,
    			payState:payState,
    			isCheck:isCheck,
    			supplier:supplier,
    			completeTimeStart:completeTimeStart,
    			completeTimeEnd:completeTimeEnd
    	};
    	
    	financialManage.globalParams = temp;
    	temp = JSON.stringify(temp);
    	return temp;
    };

    //预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
    window.operateEvents = {
    	// 编辑供应商
    	'click .edit_pay' : function(e, value, row, index) {
    		var purchaseCode = row.purchaseCode;
    		var supplier = row.supplier;
    		//采购金额
    		var purchaseAmount = row.purchaseAmount;
    		$("#purchaseCode").val(purchaseCode);
    		$("#supplier").val(supplier);
    		$("#purchaseAmount").val(purchaseAmount);
    		$("#actualAmount").val(purchaseAmount);
    		$.showModal('#payModal');
    	}
    };

    $(document).ready(function(){
    	//1、初始化加载列表数据
    	financialManage.init();
    	//2、初始化按钮事件
    	financialManage.bindEvent();
    });
    </script>

</body>
</html>

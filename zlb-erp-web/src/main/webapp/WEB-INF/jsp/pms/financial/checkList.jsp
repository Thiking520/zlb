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
						<h2><i class="glyphicon glyphicon-user"></i>财务管理>对账单管理</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<!-- 隐藏路径 -->
					<input type="hidden" value="${contextPath}" id="contextPath" />
					<div class="box-content">
						<!-- 表单查询区域begin -->

						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onsubmit="return false;" method="get">
								<div class="controls controls-row">
<!-- 									<div class="form-group"> -->
<!-- 							        	<span>采购单号：</span> -->
<!-- 							        	<input type="text" name="purchaseCode" id="purchaseCode" class="form-control input-small" style="width: 150px;" /> -->
<!-- 							        </div> -->
									<div class="form-group">
							        	<span>对账单号：</span>
							        	<input type="text" name="checkSheetCode" id="checkSheetCode" class="form-control input-xlarge" style="width: 150px;" />
							        </div>
							        
							        								<div class="form-group">
									<span>生成日期：</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control" value=""
											id="datetimepickerStart" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
									<span>到</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control" value=""
											id="datetimepickerEnd" readonly> <span class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
								</div>
									<div class="form-group">
							        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
							        	<button class="btn btn-primary btn-flat" type="reset">清空</button>
							        </div>
							        
								</div>
								<!--时间控件end  -->
							</form>
							
						</div>
						<!-- 表单查询区域end -->
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<table id="checklistManageTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
		
	</div>

	<form id="printForm" method="post">
		<div class="modal fade" id="printModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:950px" role="document">
		      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">对账单打印</h4>
			        </div>
		        
		        
			        <div class="modal-body">
		        		<div class="form-group">
						    	<label for="print_checkSheetCode" class="col-sm-2 control-label">对账单号：</label>
						    	<div class="col-sm-10">
						      		<input type="text" class="form-control input-small" id="print_checkSheetCode" readonly="true">
						    	</div>
						  </div>
						<div class="form-group">
							    	<label for="print_supplier" class="col-sm-2 control-label">供应商名称：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="print_supplier" readonly="true">
							    	</div>
							  </div>
					 	 <div class="form-group">
						    	<label for="totalAmount" class="col-sm-2 control-label">应付金额：</label>
						    	<div class="col-sm-10">
						      		<input type="text" class="form-control input-small" id="totalAmount" readonly="true">
						    	</div>
						  </div>
					 	 <div class="form-group">
						    	<label for="print_totalAmount" class="col-sm-2 control-label">实付金额：</label>
						    	<div class="col-sm-10">
						      		<input type="text" class="form-control input-small" id="print_totalAmount" readonly="true">
						    	</div>
						  </div>
						<div class="form-group">
							    	<label for="print_remark" class="col-sm-2 control-label">说明：</label>
							    	<div class="col-sm-10">
							      		 <textarea class=" form-control input-xlarge" id="print_remark" rows="3" readonly="true"></textarea>
							    	</div>
						</div>
							
													  						  
						 <div class="form-group" style="margin-top:100px;padding-top:180px;">
							<table id="printTable" class="table table-hover table-striped table-bordered">
							    
							</table>
						</div>
				       <div class="modal-footer" style="text-align: center;">
				          <button id="btn_print" type="button" class="btn btn-primary"  style="width: 150px">
				          		<span aria-hidden="true"></span>打印
				          </button>
				          <button id="btn_cancel_check" type="button"  class="btn btn-default" data-dismiss="modal" style="width: 150px">
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
					<h4 class="modal-title" id="myModalLabel">对账单付款</h4>
				</div>
				<!-- modal-header end -->
				
				<div class="modal-body">
						<form id="payform" method="post" role="form" class="form-horizontal">
						 	 <div class="form-group">
							    	<label for="pay_checkSheetCode" class="col-sm-2 control-label">对账单号：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="pay_checkSheetCode" readonly="true">
							    	</div>
							  </div>
							  	<div class="form-group">
							    	<label for="pay_supplier" class="col-sm-2 control-label">供应商名称：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="pay_supplier" readonly="true">
							    	</div>
							  </div>
						 	 <div class="form-group">
							    	<label for="pay_totalAmount" class="col-sm-2 control-label">应付金额：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="pay_totalAmount" readonly="true">
							    	</div>
							  </div>
							<div class="form-group">
							    	<label for="pay_actualAmount" class="col-sm-2 control-label">实付金额：</label>
							    	<div class="col-sm-10">
							      		<input type="text" class="form-control input-small" id="pay_actualAmount">
							    	</div>
							  </div>
							<div class="form-group">
							    	<label for="pay_remark" class="col-sm-2 control-label">说明：</label>
							    	<div class="col-sm-10">
							      		 <textarea class=" form-control input-xlarge" id="pay_remark" rows="3"></textarea>
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
    <script src="${contextPath}/resources/js/business/pms/financial/checkListManage.js" type="text/javascript"></script>
    <script type="text/javascript">

    var checklistManage = {
    	//是否重置分页偏移值0：否，1：是
    	isResetOffset: 0,
    	//封装异步请求的所有ajax的URL地址
        URL: {
        	//分页获取采购列表请求地址
        	searchListByPageUrl: function () {
                return '/financial/checklist';
            },
            searchChecklistDeatil:function(){
                return '/financial/checklistDetail';
            },
            payCheckSheet:function () {
            	return '/financial/payCheckSheet';
            },
            printCheckSheet:function(){
            	return '/financial/printChecklistDetail';
            }
        },
        /**分页获取对账单列表**/
        searchListByPage: function () {
        	//分页组件
        	$.pageTable({
        		tableId: "#checklistManageTable",//需要分页的table ID
        		url: checklistManage.URL.searchListByPageUrl(),//请求后台的URL（*）
        		method: 'POST',//默认启用POST
        		queryParams:queryParams,
        		onLoadSuccess:function(){
        			checklistManage.isResetOffset = 0;
        			$("#btn_search").removeClass("disabled");
                },
                sortable: true,
        		sortName:'created',
        		sortOrder:'desc',
        		columns: [
        		{field: 'checkSheetCode',title: '对账单号',align: 'center'},
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
        		{field: 'totalAmount',title: '应付金额',align: 'center'},
        		{field: 'actualAmount',title: '实付金额',align: 'center'},
        		{field: 'supplierName',title: '供应商',align: 'center'},
        		{field: 'created',title: '生成日期',align: 'center',
    				formatter:function(value,row,index){
    					return checklistManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
    				}
        		},
        		{field: 'operate',title: '操作',align: 'center',	
        			formatter:function(value,row,index){
        				var payState = row.payState;
        				var html = '<a class="btn btn-primary btn-sm toprint" href="javascript:void(0)" >打印对账单</a>&nbsp;&nbsp;'
        				if(payState!=null&&payState=="not_pay"){
        					html = html+ '<a class="btn btn-primary btn-sm edit_pay" href="javascript:void(0)" >付款</a>&nbsp;&nbsp;'
        				}
        				return html;
    				},
    				events : 'operateEvents'
        		}
        		]
        	});
        },
    	//执行支付
    	invokePay:function(){
    		$(this).addClass("disabled");
    		var checkSheetCode = $("#pay_checkSheetCode").val();
    		var totalAmount = $("#pay_totalAmount").val();
    		var actualAmount = $("#pay_actualAmount").val();
    		var payRemark = $("#pay_remark").val();
    		
    		var params = {"checkSheetCode":checkSheetCode,"totalAmount":totalAmount,"actualAmount":actualAmount,"remark":payRemark};
    		
    		$.callAjax({
    			type:"post",
    			url : checklistManage.URL.payCheckSheet(),
    			data : params,
    			success : function(data){
    				$.toastrSuccess('操作成功！');
    				$('#payModal').modal('hide');
    				$('#checklistManageTable').bootstrapTable('refresh');
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
    	},   
    	// 打印对账单
    	checkbillPrint : function(checkSheetCode) {
    		// 触发Ajax
    		var params = "?checkSheetCode=" + checkSheetCode;
    		var contextPath = $("#contextPath").val();
    		// 请求打印
    		window.open(contextPath + checklistManage.URL.printCheckSheet()
    						+ params);
    	},
        bindEvent: function () {
        	$("#btn_search").on('click',function() {
        		$("#btn_search").addClass("disabled");
        		checklistManage.isResetOffset = 1;
        		$('#checklistManageTable').bootstrapTable('refresh');
        	});
        	
        	//付款
        	$("#btn_save").on('click',function() {
        		checklistManage.invokePay();
        	});
        	//打印
        	$("#btn_print").on('click',function() {
        		checklistManage.checkbillPrint($("#print_checkSheetCode").val());
        	});
        	
        	//打印上周对账单
        	$("#btn_print3").on('click',function() {
        		$.showModal('#editModal');
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
        
        
        
        //初始化分页查询列表数据 ★★★分页主体列表★★★
        init: function () {
        	checklistManage.searchListByPage();
        	
        	//初始化日期控件
        	$.fn.datetimepicker.dates['zh-CN'] = {  
                    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],  
                    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],  
                    daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],  
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
                    today: "今天",  
                    suffix: [],  
                    meridiem: ["上午", "下午"]  
            };  
            $(".form_datetime").datetimepicker({
            	minView: "month", //选择日期后，不会再跳转去选择时分秒 
            	language:  'zh-CN',  //中文显示
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                pickerPosition: "bottom-left"
            });
        },
    }

    //得到查询的参数          ★★★分页表单查询参数★★★
    var queryParams = function (params) {
//     	var purchaseCode = $("#purchaseCode").val();
    	var checkSheetCode = $("#checkSheetCode").val();
    	var datetimepickerStart = $("#datetimepickerStart").val();
    	var datetimepickerEnd = $("#datetimepickerEnd").val();
    	
    	var temp = {   
    			pageSize: params.limit,   //页面大小
    			offset: checklistManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
    			sort: params.sort,
    			order: params.order,
    			checkSheetCode:checkSheetCode,
    			datetimepickerStart:datetimepickerStart,
    			datetimepickerEnd:datetimepickerEnd
    	};
    	checklistManage.globalParams = temp;
    	temp = JSON.stringify(temp);
    	return temp;
    };

    //预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
    window.operateEvents = {
    	// 编辑供应商
    	'click .toprint' : function(e, value, row, index) {
    		$("#print_checkSheetCode").val(row.checkSheetCode);
    		$("#print_totalAmount").val(row.actualAmount);
    		$("#print_supplier").val(row.supplierName);
    		$("#print_remark").val(row.remark);
    		$.showModal('#printModal');
    		toPrintCheckListDetail(row.checkSheetCode);
    	},
    	
    	'click .edit_pay' : function(e, value, row, index) {
    		var checkSheetCode = row.checkSheetCode;
    		$("#pay_checkSheetCode").val(checkSheetCode);
    		$("#pay_totalAmount").val(row.totalAmount);
    		$("#pay_supplier").val(row.supplierName);
    		$.showModal('#payModal');
    	}
    };

   function toPrintCheckListDetail(checkSheetCode){
	var params = {"checkSheetCode":checkSheetCode};
   	$.callAjax({
		type:"post",
		url : checklistManage.URL.searchChecklistDeatil(),
		data : params,
		success : function(data){
			$("#totalAmount").val(data.data.totalAmount);
	    	$("#printTable").bootstrapTable({
	    		data:data.data.pmsPurchaseVos,
	       		columns: [
	       	    		{field: 'purchaseCode',title: '采购单号',align: 'center'},
	       	    		{field: 'applyTime',title: '采购申请时间',align: 'center',
	       					formatter:function(value,row,index){
	       						return checklistManage.format(row.applyTime,"yyyy-MM-dd HH:mm:ss");
	       					}
	       	    		},
	       	    		{field: 'purchaseAmount',title: '应付金额',align: 'center'},
	       	    		{field: 'supplier',title: '供应商',align: 'center'},
	       	    		{field: 'completeTime', title: '完成时间',align: 'center',
	       	    			formatter:function(value,row,index){
	       	    				return checklistManage.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
   } 
    $(document).ready(function(){
    	//1、初始化加载列表数据
    	checklistManage.init();
    	//2、初始化按钮事件
   		checklistManage.bindEvent();
    });
    </script>
</body>
</html>

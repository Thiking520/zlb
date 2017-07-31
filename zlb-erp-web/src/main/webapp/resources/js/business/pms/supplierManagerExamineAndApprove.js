// 存放每个功能模块业务逻辑JS
// javascript 模块化

var supplierManager = {
	// 是否重置分页偏移值0：否，1：是
	isResetOffset : 0,
	supplierId : null,
	// 封装异步请求的所有ajax的URL地址
	URL : {
		// 分页获取商品列表请求地址
		searchListByPageUrl : function() {
			return '/supplier/managerList';
		},
		detailSupplierUrl : function() {
			return '/supplier/edit';
		},
		firstApproveSupplierUrl : function() {
			return '/supplier/firstApprove';
		},
		secondApproveSupplierUrl : function() {
			return '/supplier/secondApprove';
		},
		rejectSupplierUrl : function() {
			return '/supplier/firstRejectSupplier';
		}
	},
	/** 分页获取商品列表* */
	searchListByPage : function() {
		// 分页组件
		$
				.pageTable({
					tableId : "#listTable",// 需要分页的table ID
					url : supplierManager.URL.searchListByPageUrl(),// 请求后台的URL（*）
					queryParams : queryParams,
					onLoadSuccess : function() {
						supplierManager.isResetOffset = 0;

						// 将操作的限制解除，如：button按钮被限制不能点击，执行下面代码，则是进行解除不能点击限制
						$("#btn_search_moreCondition").removeClass("disabled");

					},
					sortable : true,
					sortName : 'modified',
					sortOrder : 'desc',
					columns : [
							{
								field : 'supplier',
								title : '供应商名称',
								align : 'center',
								formatter : function(value, row, index) {

									return '<a class="detail_a" href="javascript:void(0)">'
											+ row.supplier + '</a>';
								},
								events : 'operateEvents'
							},
							{
								field : 'goodsTypeNames',
								title : '供应商品',
								align : 'center'
							},
							{
								field : 'contactPeople',
								title : '联系人',
								align : 'center'
							},
							{
								field : 'contactPhone',
								title : '联系电话',
								align : 'center'
							},
							{
								field : 'ontimeRate',
								title : '送货准时率',
								align : 'center',
								formatter : function(value, row, index) {

									return value+"%";
								}
							},
							{
								field : 'stockinRate',
								title : '送货入库率',
								align : 'center',
								formatter : function(value, row, index) {

									return value+"%";
								}
							},
							{
								field : 'returnRate',
								title : '退货率',
								align : 'center',
								formatter : function(value, row, index) {

									return value+"%";
								}
							},
							{
								field : 'approvalOprate',
								title : '审核事项',
								align : 'center',
								width : '6%',
								valign : 'middle',
								formatter : function(value, row, index) {
									var result = "";
									if (row.supplierState == 'WPA'
											|| row.supplierState == 'WFA') {
										switch (row.approvalOprate) {
										case "NEW":
											result = "新建";
											break;
										case "MOD":
											result = "修改";
											break;
										case "DEL":
											result = "删除";
											break;
										}
									}
									return result;
								}
							},
							{
								field : 'modified',
								title : '申请时间',
								align : 'center',
								width : '6%',
								valign : 'middle',
				    			sortable: true,
								formatter : function(value, row, index) {
									return supplierManager.format(
											row.approvalTime,
											"yyyy-MM-dd HH:mm:ss");
								}
							}, {
								field : 'supplierState',
								title : '审批状态',
								align : 'center',
								formatter : function(value, row, index) {
									var result;
									switch (row.supplierState) {
									case "NEW":
										result = "未审批";
										break;
									case "WPA":
										result = "待经理审批";
										break;
									case "WFA":
										result = "待财务审批";
										break;
									case "REJ":
										result = "已驳回";
										break;
									case "APP":
										result = "审批通过";
										break;
									}
									return result;
								}
							} ]
				});
	},

	showDetail : function(supplierId, supplierState) {
		var hides = [ "NEW", "REJ", "APP" ];// 声明新增（未审批）、驳回、审批通过的数组
		var showState = "inline";
		// 在状态为新增（未审批）、驳回、审批通过时，不可以同意、驳回。
		if (hides.indexOf(supplierState) > -1) {// 如果indexOf()方法返回-1表示supplierState的值不等于数组任意元素
			showState = "none";// 隐藏元素
		}
		// 使用display，隐藏元素并且不占空间
		document.getElementById("btn_approve").style.display = showState;
		document.getElementById("btn_reject").style.display = showState;

		$.showModal('#managerCheckModal');
		supplierManager.supplierId = supplierId;
		supplierManager.supplierState = supplierState;

		var params = {
			"id" : supplierId
		};
		$.callAjax({
			url : supplierManager.URL.detailSupplierUrl(),
			data : params,
			success : function(data) {
				$('#supplierCode').text(data.data.supplierCode);
				$('#supplier').text(data.data.supplier);
				$('#contactPeople').text(data.data.contactPeople);
				$('#contactPhone').text(data.data.contactPhone);
				$('#contactAddress').text(data.data.contactAddress);
				$('#email').text(data.data.email);
				$('#bankName').text(data.data.bankName);
				$('#accountNumber').text(data.data.accountNumber);
				$('#accountName').text(data.data.accountName);
				$('#license').attr("src",data.data.license==""?$("#contextPath").val()+"/resources/img/no_image.jpg":data.data.license);
				$('#organization').text(data.data.organization);
				
				$('#imageShow1').attr("src",data.data.contractCopy1==""?$("#contextPath").val()+"/resources/img/no_image.jpg":data.data.contractCopy1);
				$('#imageShow2').attr("src",data.data.contractCopy2==""?$("#contextPath").val()+"/resources/img/no_image.jpg":data.data.contractCopy2);
				$('#imageShow3').attr("src",data.data.contractCopy3==""?$("#contextPath").val()+"/resources/img/no_image.jpg":data.data.contractCopy3);
				$('#imageShow4').attr("src",data.data.contractCopy4==""?$("#contextPath").val()+"/resources/img/no_image.jpg":data.data.contractCopy4);
				
				$('#goodsTypeCodes').text(data.data.goodsTypeCodes);
				$('#goodsTypeNames').text(data.data.goodsTypeNames);
			}
		});
	},
	approveSupplier : function() {

		var approveUrl = supplierManager.URL.firstApproveSupplierUrl();

		if (supplierManager.supplierState == 'WFA')
			approveUrl = supplierManager.URL.secondApproveSupplierUrl();
		else
			approveUrl = supplierManager.URL.firstApproveSupplierUrl();

		$.dialogConfirm({
			message : '您确定要审批通过此供应商申请吗?',
			callback : function(result) {
				if (result) {
					var params = {
						"id" : supplierManager.supplierId
					};
					$.callAjax({
						url : approveUrl,
						data : params,
						success : function(data) {
							$.toastrSuccess('审批通过！');
							  $.hideModal('#managerCheckModal');
							$('#listTable').bootstrapTable('refresh');
						}
					});
				}
			}
		});
	},

	rejectSupplier : function() {
		$.dialogConfirm({
			message : '您确定要驳回此供应商申请吗?',
			callback : function(result) {
				if (result) {
					var params = {
						"id" : supplierManager.supplierId
					};
					$.callAjax({
						url : supplierManager.URL.rejectSupplierUrl(),
						data : params,
						success : function(data) {
							$.toastrSuccess('驳回成功！');
							  $.hideModal('#managerCheckModal');
							$('#listTable').bootstrapTable('refresh');
						}
					});
				}
			}
		});
	},

	bindEvent : function() {
		//同意
		$("#btn_approve").on('click', function() {
			supplierManager.approveSupplier();
		});
		//驳回
		$("#btn_reject").on('click', function() {
			supplierManager.rejectSupplier();
		});
		// 绑定条件查询按钮事件
		$("#btn_search_moreCondition").on("click", function() {
			$(this).addClass("disabled");
			/*
			 * 下面2行我也没看懂，没有研究，只是知道我需要用它实现分页查询异步更新表格
			 */
			supplierManager.isResetOffset = 1;
			$('#listTable').bootstrapTable('refresh');
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
//		//时间控件的样式
//		$(".datebimg").css({
//			"background":"url('"+$("#contextPath").val()+"/resources/img/pms/pms_calendar.jpg') no-repeat right"
//			,"background-size":"20% 80%"
//			,"background-color": "white"//背景颜色要反正背景图片的后面， 否则无法生效
//			,"width": "190px"
//		});
		//当时间控件文本框为空时显示提示输入信息
		$(".datebimg").attr("placeholder","点击选择时间");
		// 开始时间
		/*$('#datetimepickerStart, .input-group-addon').datetimepicker({
			todayBtn : true,
			format : "yyyy-mm-dd hh:ii:ss",
			autoclose : true,
			language:  'zh', 
			clearBtn:true,// 自定义属性,true 显示 清空按钮 false 隐藏 默认:true
			endDate : new Date(),
			pickerPosition: "bottom-left",
			todayHighlight : true
		}).on(
				'changeDate',
				function(e) {
					$('#datetimepickerEnd').datetimepicker('setStartDate',
							this.value);
				});
		// 结束时间：
		$('#datetimepickerEnd, .input-group-addon').datetimepicker({
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
					$('#datetimepickerStart').datetimepicker('setEndDate',
							this.value);
				});*/
		$(".removeId").off().on('click',function () {
            $(this).prev().prev().val("");
        }); 
		
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
    		$("#datetimepickerStart").val(startDate);
    		$("#datetimepickerEnd").val(today);
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
    		$("#datetimepickerStart").val(startDate);
    		$("#datetimepickerEnd").val(today);
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

	// 初始化分页查询列表数据 ★★★分页主体列表★★★
	init : function() {
		supplierManager.searchListByPage();
		dateUtils.initDate();
	}
}

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .detail_a' : function(e, value, row, index) {
		supplierManager.showDetail(row.id, row.supplierState);
	}
};
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {
	// 自定义查询参数
	var supplier = $("#searchKeywordSuName").val();// 供应商名称
	var goodsName = $("#searchKeywordGoName").val();// 商品名称
	var supplierState = $("#sele_search_suState").val();// 供应商审核状态
	var approvalOprate = $("#sele_search_oprate").val();// 操作类型
	var timeStart = $("#datetimepickerStart").val();// 
	var timeEnd = $("#datetimepickerEnd").val();// 

	// 时间区间
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : supplierManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		supplier : supplier,// 供应商名称
		goodsName : goodsName,// 供应的商品名称列表
		supplierState : supplierState,// 供应商审批状态
		approvalOprate : approvalOprate, // 操作类型
		timeStart : timeStart, // 开始时间
		timeEnd : timeEnd, // 结束时间
		sort : params.sort,
		order : params.order
	};
	return temp;
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

$(document).ready(function() {
	// 1、初始化加载列表数据
	supplierManager.init();
	// 2、初始化绑定增删改查事件
	supplierManager.bindEvent();
});
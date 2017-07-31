// 存放每个功能模块业务逻辑JS
// javascript 模块化
var smsManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	addTemplateURL : function() {//派车单列表
			return '/tms/sms/addTemplate';
		},
		getTemplateListURL : function() {
			return '/tms/sms/templateList';
		},
		getReceiverListURL : function() {
			return '/tms/sms/getReceiverList';
		},
		getSmsRecordListURL : function () {
			return '/tms/sms/getSmsRecoredList';
		},
		sendSmsURL : function () {
			return '/tms/sms/sendSms';
		}
    },
    
    addTemplate : function() {
    	var result = false;
    	var params = {
    		'templateTheme':$.ToCDB($("#theme").val()),
    		'templateContent':$.ToCDB($("#content").val()),
    	};
    	$.callAjax({
			type:"post",
			data : params,
			url : smsManager.URL.addTemplateURL(),
			async: false,
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
    
    sendSms : function(wayBills) {
    	var result = false;
    	var params = {
    		'templateId':$("#templateId").val(),
    		'wayBills':wayBills
    	};
    	$.callAjax({
			type:"post",
			data : params,
			async: false,
			url : smsManager.URL.sendSmsURL(),
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
    
    getTemplateList : function() {
		$.pageTable({
			tableId : "#templateListTable",
			url : smsManager.URL.getTemplateListURL(),
			queryParams : queryParams_temp,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			
			onLoadSuccess : function(data) {
				smsManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						radio : true
					}, {
						align : 'center',
						field : 'templateCode',
						title : '模版编码'
					},{
						align : 'center',
						field : 'templateTheme',
						title : '短信主题'
					}, {
						align : 'center',
						field : 'templateContent',
						title : '短信内容'
					}]
		});

	},
    
	//获取接手列表
	getReceiverList : function() {
		$.pageTable({
			tableId : "#wayBillListTable",
			url : smsManager.URL.getReceiverListURL(),
			queryParams : queryParams_rec,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				smsManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						checkbox : true
					}, {
						align : 'center',
						field : 'disDispatchVehicleId',
						title : '派车单号'
					},{
						align : 'center',
						field : 'packCode',
						title : '装箱单号'
					}, {
						align : 'center',
						field : 'disChildWaybillId',
						title : '运单号'
					}, {
						align : 'center',
						field : 'consumerName',
						title : '收件人姓名'
					}, {
						align : 'center',
						field : 'consumerMobile',
						title : '收件人电话'
					}, {
						align : 'center',
						field : 'consumerAddress',
						title : '收件人地址'
					}]
		});

	},
	//格式化时间
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
	//获取短信记录
	getSmsRecordList : function() {
		$.pageTable({
			tableId : "#smsRecordListTable",
			url : smsManager.URL.getSmsRecordListURL(),
			queryParams : queryParams,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				smsManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						align : 'center',
						field : 'smsCode',
						title : '短信编码',
						formatter:function(value,row,index){
							return '<a class="smsDetail_a" href="javascript:void(0)" smsCode="' + row.smsCode +'">' + row.smsCode + '</a>';
		    			},
		    	        events: 'operateEvents'
					},{
						align : 'center',
						field : 'smsStatus',
						title : '状态',
						formatter:function(value,row,index){
							if(row.smsStatus == 1) {
								return '发送成功'
							} else if(row.smsStatus == 2){
								return '发送中...'
							} else {
								return '发送失败'
							}
						}
					}, {
						align : 'center',
						field : 'templateTheme',
						title : '主题'
					}, {
						align : 'center',
						field : 'smsContent',
						title : '发送内容',
						formatter: function (value, row, index) {
							if(value !=null && value.length >50){
								return '<a style="color:#555;text-decoration:none;" title="'+value+'" href="javascript:void(0)" >'+value.substr(0,50)+'...</a>';
							} else {
								return value;
							}
						}
					}, {
						align : 'center',
						field : 'creatorName',
						title : '发送人'
					}, {
						align : 'center',
						field : 'createTime',
						title : '发送时间',
						formatter:function(value,row,index){
							return smsManager.format(row.createTime,"yyyy-MM-dd HH:mm:ss");
						}
					}]
		});

	},
	
    bindEvent: function () {
    	//打开新建面板
    	$("#btn_show_add").on("click",function() {
    		$("#receiverNum").val("");
    		$('#wayBillListTable').bootstrapTable('refresh');
    		$.showModal('#myModal');
    	});
    	$("#btn_save_submit").on("click",function(){
    		var result = smsManager.addTemplate();
    		if(result) {
    			$.toastrSuccess("添加成功");
         		$.hideModal('#myModal');
         		//刷新列表
         		$('#templateListTable').bootstrapTable('refresh');
    		} else {
    			$.toastrWarning("操作失败");
    		}
    	});
    	
    	//取消
    	$("#btn_cancel").on("click",function() {
			 $.modalCancel("addAnchorForm","myModal");
		 });
    	
    	//打开接收人选取
    	$("#btn_show_waybill").on("click",function() {
    		smsManager.getReceiverList();
    		$.showModal("#wayBillModal");
    	});
    	//选取接收人
    	$("#wayBill_save").on("click",function () {
    		var wayBills = new Array();
    		if($("#wayBillListTable").bootstrapTable('getSelections').length>=1){
    			$.map($("#wayBillListTable").bootstrapTable('getSelections'), function(row) {
    				wayBills.push(row.childWaybillId);
    			});
    			$("#receiverNum").val($("#wayBillListTable").bootstrapTable('getSelections').length);
    			$.hideModal('#wayBillModal');
    		} else {
    			$.toastrWarning("请选择接收人");
    		}
    	});
    	
    	//打开短信模版选取
    	$("#btn_show_template").on("click",function() {
    		//获取模版列表
    		smsManager.getTemplateList();
    		$.showModal("#templateModal");
    	});
    	//选择模板
    	$("#template_save").on("click",function () {
    		if($("#templateListTable").bootstrapTable('getSelections').length==1){
    			$.map($("#templateListTable").bootstrapTable('getSelections'), function(row) {
    				$("#templateCode").val(row.templateCode);
    				$("#theme").val(row.templateTheme);
    				$("#content").val(row.templateContent);
    				$("#templateId").val(row.id);
    				$.hideModal("#templateModal");
    			});
    		} else {
    			$.toastrWarning("请选择短信模版");
    		}
    	});
    	
    	//短信搜索
    	$("#btn_search").on("click",function() {
    		$('#smsRecordListTable').bootstrapTable('refresh');
    	});
    	
    	//短信清空
    	$("#btn_clean").on("click",function() {
    		document.getElementById("addOrEditeSearchForm").reset();
    	});
    	
    	//选取人搜索
    	$("#btn_search_rec").on("click",function() {
    		$('#wayBillListTable').bootstrapTable('refresh');
    	});
    	
    	//选取人清空
    	$("#btn_clean_rec").on("click",function() {
    		document.getElementById("selectFrom").reset();
    	});
    	
    	//主题搜索
    	$("#btn_search_template").on("click",function() {
    		$('#templateListTable').bootstrapTable('refresh');
    	});
    	
    	//主题清空
    	$("#btn_clean_template").on("click",function() {
    		document.getElementById("templateFrom").reset();
    	});
    	
    	
    	//发送短信
    	$("#btn_send_sms").on("click",function() {
    		//调用发送接口
    		
    		var templateCode = $("#templateCode").val();
    		var receiverNum = $("#receiverNum").val();
    		if(receiverNum == null || receiverNum == '') {
    			$.toastrWarning("请选择接收人");
    			return;
    		}
    		if(templateCode == null || templateCode == '') {
    			$.toastrWarning("请选择短信模版");
    			return;
    		}
    		var wayBills = new Array();
    		if($("#wayBillListTable").bootstrapTable('getSelections').length>=1){
    			$.map($("#wayBillListTable").bootstrapTable('getSelections'), function(row) {
    				wayBills.push(row.childWaybillId);
    			});
    			var result = smsManager.sendSms(wayBills);
    			if(result) {
    				//关闭窗口
    	    		$.hideModal("#myModal");
    	    		$.toastrSuccess("发送成功");
    	    		//刷新短信列表
    	    		$('#smsRecordListTable').bootstrapTable('refresh');
    			}
    		} else {
    			$.toastrWarning("请选择模版");
    			return;
    		}
    		
    	});
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	smsManager.getSmsRecordList();
    }
}

var queryParams = function(params) {
	
	var smsCodeWeb = $("#smsCode_s").val();
	var theme = $("#theme_s").val();
	var content = $("#content_s").val();
	var status = $("#status_s").val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : smsManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		enabled : true,
		smsCodeWeb:smsCodeWeb,
		smsStatus:status,
		theme:theme,
		content:content
	};
	return temp;
};

var queryParams_temp = function(params) {
	
	var templateTheme = $("#templateTheme_s").val();
	var templateContent = $("#templateContent_s").val();
	var templateCode = $("#templateCode_s").val();
	
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : smsManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		enabled:true,
		templateTheme:templateTheme,
		templateContent:templateContent,
		templateCode:templateCode
	};
	return temp;
};


var queryParams_rec = function(params) {
	
	var disDispatchVehicleId = $("#disPatch_s").val();
	var disWayBillId = $("#wayBill_s").val();
	var packCode = $("#packCode_s").val();
	var consumerName = $("#consumerName_s").val();
	
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : smsManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		disDispatchVehicleId:disDispatchVehicleId,
		disWayBillId:disWayBillId,
		packCode:packCode,
		consumerName:consumerName
	};
	return temp;
};

$(document).ready(function(){
	//1、初始化加载列表数据
	smsManager.init();
	//2、初始化绑定增删改查事件
	smsManager.bindEvent();
});


function appendText() {
	var org = $("#content").val();
	var text = $("#smsParam").find("option:selected").text();
	newText = org + "#" + text + "#";
	$("#content").val(newText);
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .smsDetail_a': function (e, value, row, index) {
		
		$("#smsNum_l").val(row.smsCode);
		$("#templateCode_l").val(row.templateCode);
		$("#theme_l").val(row.templateTheme);
		$("#content_l").val(row.smsContent);
		$.showModal('#myModal_l');
		$(".modal-content input").css("background-color","white");
		$(".modal-content textArea").css("background-color","white");
		
	}
}

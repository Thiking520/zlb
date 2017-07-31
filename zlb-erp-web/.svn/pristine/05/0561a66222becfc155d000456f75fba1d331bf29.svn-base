// 存放每个功能模块业务逻辑JS
// javascript 模块化
var tmpManager = {
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
		modifyStatusURL : function() {
			return '/tms/sms/modifyStatus';
		},
		deleteUrl : function() {
			return '/tms/sms/template/delete';
		},
		modifyTemplateURL : function () {
			return '/tms/sms/template/modifyInfo';
		}
    },
    
    //添加短信模版
    addTemplate : function() {
    	var result = false;
    	var params = {
    		'templateTheme':$.ToCDB($("#theme").val()),
    		'templateContent':$.ToCDB($("#content").val()),
    	};
    	$.callAjax({
			type:"post",
			data : params,
			url : tmpManager.URL.addTemplateURL(),
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
    
    //修改短信模版
    modifyTemplate : function(templateId) {
    	var result = false;
    	var params = {
    		'templateTheme':$.ToCDB($("#theme").val()),
    		'templateContent':$.ToCDB($("#content").val()),
    		'id':templateId
    	};
    	$.callAjax({
			type:"post",
			data : params,
			url : tmpManager.URL.modifyTemplateURL(),
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
    getTemplateList : function() {
		$.pageTable({
			tableId : "#templateListTable",
			url : tmpManager.URL.getTemplateListURL(),
			queryParams : queryParams,
			toolbar : '#toolbar',
			toolbarAlign : 'right',
			onLoadSuccess : function(data) {
				tmpManager.isResetOffset = 0;
				//$("#btn_search").removeClass("disabled");
			},
			columns : [{
						checkbox : true
					}, {
						align : 'center',
						field : 'templateCode',
						title : '模版编码',
						formatter:function(value,row,index){
							return '<a class="tmpsDetail_a" href="javascript:void(0)" templateCode="' + row.templateCode +'">' + row.templateCode + '</a>';
		    			},
		    	        events: 'operateEvents'
					},{
						align : 'center',
						field : 'templateTheme',
						title : '模版主题'
					},{
						align : 'center',
						field : 'enabled',
						title : '模板状态',
						formatter:function(value,row,index){
							if(row.enabled) {
								return '已启用';
							} else {
								return '已禁用';
							}
						}
					},{
						align : 'center',
						field : 'templateContent',
						title : '短信内容',
						formatter: function (value, row, index) {
							if(value !=null && value.length >30){
								return '<a style="color:#555;text-decoration:none;" title="'+value+'" href="javascript:void(0)" >'+value.substr(0,30)+'...</a>';
							} else {
								return value;
							}
						}
					}, /*{
						align : 'center',
						field : 'creatorName',
						title : '创建人'
					}, {
						align : 'center',
						field : 'createTime',
						title : '创建时间',
						formatter:function(value,row,index){
							return tmpManager.format(row.createTime,"yyyy-MM-dd HH:mm:ss");
						}
					}, {
						align : 'center',
						field : 'modifierName',
						title : '最后修改人'
					}, {
						align : 'center',
						field : 'updateTime',
						title : '修改时间',
						formatter:function(value,row,index){
							return tmpManager.format(row.updateTime,"yyyy-MM-dd HH:mm:ss");
						}
					},*/{
		    			field: 'id',
		    			title: '操作',
		    			align: 'center',
		    	        formatter:function(value,row,index){
		    	        	var html='<a class="btn btn-sm btn-primary editTemplate_a" href="javascript:void(0)" >编辑</a><a class="btn btn-sm btn-danger deleteTemplate_a" href="javascript:void(0)" >删除</a>';
		    	            return html; 
		    	        },
		    	        events: 'operateEvents'
		    	    }]
		});
	},
	modifyStatus:function(tmpsIds,enabled) {
    	var params = {"templateIds":tmpsIds,"enabled":enabled};
		$.callAjax({
			type:"post",
			url : tmpManager.URL.modifyStatusURL(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#templateListTable').bootstrapTable('refresh');
         		$.toastrSuccess();
			},
			error : function(){
				$.toastrError();
			}
		});
    },
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
	        	theme: {
	                validators: {
	                	notEmpty: {
	                        message: '主题不能为空！'
	                    },
	                	stringLength: {
                            min: 2,
                            max: 10,
                            message: '主题请控制在2-10个字符'
                        },
	                }
	            },
	        	content: {
	                validators: {
	                    notEmpty: {
	                        message: '短信内容不能为空！'
	                    },
	                    stringLength: {
                            max: 100,
                            message: '短信内容不能超过100个字符'
                        },
	                }
	            }
	        },
	    });
    	//表单验证end
    },
    /**删：删除短信模版**/
    deleteTemplate: function (templateId,templateCode) {
    	$.dialogConfirm({
            message: '您确定要删除编号为['+templateCode+']的短信模版吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":templateId};
        			$.callAjax({
        				url : tmpManager.URL.deleteUrl(),
        				data : params,
        				async: false,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#templateListTable').bootstrapTable('refresh');
    		         		$.toastrSuccess('删除成功！');
        				},
        				error : function(){
        					$.toastrError();
        				}
        			});
                }
            }
        });
    	
    },
    bindEvent: function () {
    	//打开新建面板
    	$("#btn_show_add").on("click",function() {
    		//清空表单
     		document.getElementById("addAnchorForm").reset();
     		$("#myModalLabel").html("新增短信模版");
    		$("#theme").attr("readonly",false);
    		$("#content").attr("readonly",false);
    		$("#smsParam").attr("disabled",false);
    		$("#mainDV").css("height",300);
    		$("#title").show();
    		$("#opContent").show();
    		$("#btn_cancel").show();
    		$("#btn_close").hide();
    		$("#btn_save_submit").show();
    		$("#btn_edit_submit").hide();
    		$.showModal('#myModal');
    	});
    	
    	//提交新增短信模版
    	$("#btn_save_submit").on("click",function(){
    		
    		var theme = $("#theme").val();
    		if(theme == null || theme.trim().length ==0) {
    			$.toastrWarning("请输入主题");
    			return;
    		}
    		if(theme.trim().length > 10 || theme.trim().length < 2) {
    			$.toastrWarning("主题名称请控制在2-10个字符");
    			return;
    		}
    		
    		var content = $("#content").val();
    		if(content == null || content.trim().length ==0) {
    			$.toastrWarning("请输入模版短信内容");
    			return;
    		}
    		if(content.trim().length > 100 || content.trim().length < 2) {
    			$.toastrWarning("模版短信内容请控制在2-100个字符");
    			return;
    		}
    		
    		
    		var result = tmpManager.addTemplate();
    		if(result) {
    			$.toastrSuccess("添加成功");
         		$.hideModal('#myModal');
         		//刷新列表
         		$('#templateListTable').bootstrapTable('refresh');
    		}
    	});
    	
    	//提交编辑短信模版
		$("#btn_edit_submit").on("click",function(){
    		
    		var theme = $("#theme").val();
    		if(theme == null || theme.trim().length ==0) {
    			$.toastrWarning("请输入主题");
    			return;
    		}
    		if(theme.trim().length > 10 || theme.trim().length < 2) {
    			$.toastrWarning("主题名称请控制在2-10个字符");
    			return;
    		}
    		
    		var content = $("#content").val();
    		if(content == null || content.trim().length ==0) {
    			$.toastrWarning("请输入模版短信内容");
    			return;
    		}
    		if(content.trim().length > 100 || content.trim().length < 2) {
    			$.toastrWarning("模版短信内容请控制在2-100个字符");
    			return;
    		}
    		var id = $("#ipt_id").val();
    		var result = tmpManager.modifyTemplate(id);
    		if(result) {
    			$.toastrSuccess("修改成功");
         		$.hideModal('#myModal');
         		//刷新列表
         		$('#templateListTable').bootstrapTable('refresh');
    		}
    	});
    	
		//取消
    	$("#btn_cancel").on("click",function() {
			 $.modalCancel("addAnchorForm","myModal");
		 });
    	
    	//搜索
    	$("#btn_search").on("click",function() {
    		$('#templateListTable').bootstrapTable('refresh');
    	});
    	
    	//清空
    	$("#btn_clean").on("click",function() {
    		document.getElementById("addOrEditeSearchForm").reset();
    	});
    	
    	//生效按钮
    	$("#btn_is_true").click(function(){
    		var status = false;
	    	var ids = new Array();
	    	if($("#templateListTable").bootstrapTable('getSelections').length>0){
	    		$.map($("#templateListTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==0){
						status = true;
		    			ids.push(row.id);
					}
	            });
	    		if(!status) {
	    			$.toastrWarning("已经是‘启用’状态！");
	    			return;
	    		}
	    		tmpManager.modifyStatus(ids,true);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
    		
    	});
    	//失效按钮
	    $("#btn_is_false").click(function(){
	    	var status = false;
	    	if($("#templateListTable").bootstrapTable('getSelections').length>0){
	    		var ids = new Array();
		    	$.map($("#templateListTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==1){
						status = true;
		    			ids.push(row.id);
					}
	            });
		    	if(!status) {
	    			$.toastrWarning("已经是‘禁用’状态！");
	    			return;
	    		}
		    	tmpManager.modifyStatus(ids,false);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
	    	
    	});
	  
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	tmpManager.getTemplateList();
    	//tmpManager.validateform();
    }
}

var queryParams = function(params) {
	var templateCode = $("#templateCode_s").val();
	var theme = $("#theme_s").val();
	var content = $("#content_s").val();
	var status = $("#status_s").val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : tmpManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		sort : params.sort,
		order : params.order,
		templateCode:templateCode,
		enabled:status,
		templateTheme:theme,
		templateContent:content
	};
	return temp;
};


$(document).ready(function(){
	//1、初始化加载列表数据
	tmpManager.init();
	//2、初始化绑定增删改查事件
	tmpManager.bindEvent();
	
});

//追加文字
function appendText() {
	var org = $("#content").val();
	var text = $("#smsParam").find("option:selected").text();
	newText = org + "#" + text + "#";
	if(newText.length > 100) {
		$.toastrWarning("模版短信内容字符过多，请简化文字后再操作");
		return;
	}
	$("#content").val(newText);
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	'click .tmpsDetail_a': function (e, value, row, index) {
		$("#myModalLabel").html("短信模版详情");
		$("#theme").attr("readonly",true);
		$("#theme").val(row.templateTheme);
		$("#smsNum").val(row.templateCode);
		$("#content").attr("readonly",true);
		$("#content").val(row.templateContent);
		$("#smsParam").attr("disabled",true);
		$("#mainDV").css("height",240);
		$("#title").hide();
		$("#opContent").hide();
		$("#btn_cancel").hide();
		$("#btn_close").show();
		$("#btn_save_submit").hide();
		$("#btn_edit_submit").hide();
		$.showModal('#myModal');
		$("#mainDV input").css("background-color","white");
		$("#mainDV textArea").css("background-color","white");
	},
	//删除
	'click .deleteTemplate_a': function (e, value, row, index) {
		tmpManager.deleteTemplate(row.id,row.templateCode);
	},
	
	//编辑
	'click .editTemplate_a': function (e, value, row, index) {
 		$("#myModalLabel").html("新增短信模版");
		$("#theme").attr("readonly",false);
		$("#smsNum").val(row.templateCode);
		$("#theme").val(row.templateTheme.replace("【","").replace("】",""));
		$("#content").attr("readonly",false);
		$("#content").val(row.templateContent);
		$("#smsParam").attr("disabled",false);
		$("#mainDV").css("height",300);
		$("#title").show();
		$("#opContent").show();
		$("#btn_cancel").show();
		$("#btn_close").hide();
		$("#btn_save_submit").hide();
		$("#btn_edit_submit").show();
		$("#ipt_id").val(row.id);
		$.showModal('#myModal');
	}
}

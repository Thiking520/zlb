// 存放每个功能模块业务逻辑JS
// javascript 模块化
var paramDict = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	isAdmin:false,//是否是超级管理员
	operatorId:"",//运营商ID-只用于默认模板管理
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/param/dict/list';
        },
		//新增修改跳转地址
		toparamUrl: function () {
			return '/param/dict/to';
		},
		//新增保存地址
		addparamUrl: function () {
			return '/param/dict/add';
		},
		//更新保存地址
		updateparamUrl: function () {
			return '/param/dict/update';
		},
		//更新保存地址
		effectUrl: function () {
			return '/param/dict/effect';
		},
		//更新保存地址
		notEffectUrl: function () {
			return '/param/dict/notEffect';
		},//获取所有运营商列表
        getAllOperatorUrl:function() {
        	return '/operator/qryOperator';
        }
    },
    /**查：所有运营商**/
    getAllOperator: function (selecteID) {
    	var params ={"viewSearchVo":{"pageSize":"999999","offset":"0"},"enabled":1};
		$.callAjax({
			type:"post",
            async: false,
			url : paramDict.URL.getAllOperatorUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		var arr = new Array();
         		//如果是超级管理员 添加0-系统模板
         		if(paramDict.isAdmin){
         			arr.push('<option value="0">系统模板</option>');
         		}
         		for(var item in data.data.rows) {
         			arr.push("<option ");
         			arr.push("value='");
         			arr.push(data.data.rows[item].companyKey);
         			arr.push("'");
         			arr.push(">");
         			arr.push(data.data.rows[item].companyName);
         			arr.push("</option>")
         			arr.push("\r\n");
         		}
         		var str = arr.join("");
         		$("#" + selecteID).html(str);
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**分页获取参数列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: paramDict.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'post',	//请求方式（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			paramDict.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
    		sortable: true,
    		sortName:'create_time',
    		sortOrder:'desc',
    		columns: [{
//    			checkbox: true
//    		}, {
    			field: 'dictTitle',
    			title: '字典标题'
    		}, {
    			field: 'operatorName',
    			title: '运营商',
    			formatter:function(value,row,index){
    				if($.isNull(value) && paramDict.isAdmin){
    					return "系统模板";
    				}else{
    					return value;
    				}
    			}
    		}, {
    			field: 'dictType',
    			title: '字典类型'
    		}, {
//    			field: 'dictKey',
//    			title: '参数key'
//    		}, {
    			field: 'dictValue',
    			title: '参数值'
    		}, {
    			field: 'dictDesc',
    			title: '描述'
    		}, {
    			field: 'dictOrder',
    			title: '排序值'
    		}, {
    			field: 'statusStr',
    			title: '状态',
                formatter:function(value,row,index){
                    if(row.status==1){
                        return '生效';
                    }else if(row.status==0){
                        return '<span style=\"color:red;\">失效</span>';
                    }
                }
    		}, {
    			field: 'modifiableStr',
    			title: '可修改'
    		}, {
    			field: 'creatorName',
    			title: '创建人'
    		},{
    			field: 'createTime',
    			title: '创建时间',
    			sortable: true,
    			order:'desc'
    		},{
                field: 'modifyRecord',
                title: '修改记录',
                formatter:function (value, row, index) {
                    var str = row.modifierName + '</br>';
                    str = str + row.updateTime + '</br>';
                    str = '<div style="width: 135px">'+str+'</div>';
                    return str;
                }
    		// },{
    		// 	field: 'modifierName',
    		// 	title: '修改人'
    		// },{
    		// 	field: 'updateTime',
    		// 	title: '最后修改时间'
    		},{
    	        field: 'operation',
    	        title: '操作',
    	        align: 'left',
                valign: 'middle',
    	        formatter:function(value,row,index){

    	        	var html='';
    				var updateparamUrl = paramDict.URL.updateparamUrl();
    				if(auth.isAuth(updateparamUrl)){
    			    	if(row.modifiable == 1){//允许修改的数据展示编辑按钮 
    			    		html += '<a class="btn btn-primary btn-sm editBtn" href="javascript:void(0)" did="' + row.id + '" >编辑</a>';
    			    	}
    				}
    				
    				var effectUrl = paramDict.URL.effectUrl();
    				var notEffectUrl = paramDict.URL.notEffectUrl();
    				if(row.status == 1){
    					if(auth.isAuth(effectUrl)){
    						html += '<a class="btn btn-warning btn-sm notEffectBtn" href="javascript:void(0)" status="'+row.status+'" did="' + row.id + '" >失效</a>';
    					}
    				}else{
    					if(auth.isAuth(effectUrl)){
    						html += '<a class="btn btn-success btn-sm effectBtn" href="javascript:void(0)" status="'+row.status+'" did="' + row.id + '" >生效</a>';
    					}
    				}
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    }  
    		]
    	});
    },
    /**保存参数**/
    saveparam: function () {
    	var id = $("#id").val();
    	var operatorId = $("#operatorId").val();
//    	var dictKey = $("#dictKey").val();
    	var dictType = $("#dictType").val();
    	if(id == ''){
    		var url = paramDict.URL.addparamUrl();
    	}else{
    		var url = paramDict.URL.updateparamUrl();
    	}
    	var data = $("#addForm",$("#load_body")).serializeObject();
    	
    	data.operatorId = operatorId;
//    	data.dictKey = dictKey;
    	data.dictType = dictType;
    	
    	data.dictValue = $("#dictValue").val();
    	data.dictTitle = $("#dictTitle").val();
    	data.status = $("#status2").val();
    	data.dictDesc = $("#dictDesc").val();
    	data.dictOrder = $("#dictOrder").val();
    	data.modifiable = $("#modifiable:checked").val();
    	$.callAjax({
			type:"post",
			url : url,
			data : data,
			success : function(data){
				
				//---------异步消息通知begin
				if(data.code == '0000'){
					$.hideModal('#myModal');
					$.toastrSuccess('保存成功！');
					$("#listTable").bootstrapTable('refresh');
				} else {
					$("#btn_submit").removeClass("disabled");
					$.toastrError(data.msg);
				}
	                //---------异步消息通知end
			},
			error : function(){
				$.toastrError();
				$("#btn_submit").removeClass("disabled");
			}
		});
    },
    /**生效**/
    effect: function (id) {
    	$.dialogConfirm({
            message: '您确定要使ID为['+id+']的字典项生效吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id,"status":1};
        			$.callAjax({
        				url : paramDict.URL.effectUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$.toastrSuccess('操作成功！');
    		         		$('#listTable').bootstrapTable('refresh');
        				},
        				error : function(){
        					$.toastrError();
        				}
        			});
                }
            }
        });
    	
    },
    /**失效**/
    notEffect: function (id) {
    	$.dialogConfirm({
    		message: '您确定要使ID为['+id+']的字典项失效吗?',
    		callback: function(result) {
    			if(result) {
    				var params = {"id":id,"status":0};
    				$.callAjax({
    					url : paramDict.URL.notEffectUrl(),
    					data : params,
    					success : function(data){
    						if(data.code != "0000"){
    							$.toastrWarning(data.msg); 
    							return;
    						}
    						$.toastrSuccess('操作成功！');
    						$('#listTable').bootstrapTable('refresh');
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
    	//绑定展示新增界面事件
    	$("#btn_add").click(function () {
    		$("#myModalLabel").text("参数新增");
	    	$("#load_body").children().remove().end().load($("#contextPath").val()+paramDict.URL.toparamUrl()+" #form_div",function(){
                // try{
                //     $('input, textarea').placeholder();
                // }catch (e2){
                //
                // }
	    		//当前激活的运营商ID
	    		var operatorId = $("#operator").val();
	    		//如果是超级管理员 获取所有运营商
         		if(paramDict.isAdmin){
         			paramDict.getAllOperator("operatorId");
         			$("#operatorId").val(operatorId);
         		}else{//如果不是超级管理员 禁用运营商下拉框
         			$("#operatorId").attr("disabled",true);
         			$("#operatorId").append('<option value="'+operatorId+'">'+myMain.selfCompanyName+'</option>');
         		}
         		
	    		paramDict.validateform();
	    		$("#btn_submit").removeClass("disabled");
	    		$.showModal('#myModal');
	    	});
	    });
    	
    	//绑定点击保存新增按钮事件
    	$("#btn_submit").on("click",function(){
    		$("#btn_submit").addClass("disabled");
    		$("#addForm",$("#load_body")).data('bootstrapValidator').validate();
    		var valid = $("#addForm",$("#load_body")).data('bootstrapValidator').isValid();
    		if(valid){
    			paramDict.saveparam();
    		}else{
    			$("#btn_submit").removeClass("disabled");
    		}
		});
        //绑定点击取消按钮事件
        $("#btn_cancel").on("click",function(){
            //formId为表单id,modalId为蒙太框id
            $.modalCancel("addForm","myModal");
        });
    	
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		paramDict.isResetOffset = 1;
    		$('#listTable').bootstrapTable('refresh');
    	});
    	
    	$("#btn_clear").on("click",function () {
    		$('#mainForm')[0].reset();
    	});
    	
    	//系统模板管理入口
    	$("#btn_template_manage").on("click",function () {
    		$("#btn_template_manage").addClass("disabled");
    		paramDict.operatorId = 0;
    		paramDict.isResetOffset = 1;
    		$('#listTable').bootstrapTable('refresh');
    		$("#btn_template_manage").hide();
    	});

    	
    	  
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	paramDict.searchListByPage();
    },
    
    
    validateform:function(){
    	//表单验证start
    	$("#addForm",$("#load_body")).bootstrapValidator({
            message: 'This value is not valid',
            fields: {
            	dictTitle: {
                    validators: {
                        notEmpty: {
                            message: '参数标题不能为空'
                        },
                        stringLength: {
                        	max: '64',
				    		message: '最多64个字符'
				    	}
                    }
                },
                dictType: {
                	validators: {
                		notEmpty: {
                			message: '字典类型不能为空'
                		},
                		stringLength: {
                			max: '64',
                			message: '最多64个字符'
                		}
                	}
                },
                dictKey: {
                	validators: {
                		notEmpty: {
                			message: '参数key不能为空'
                		},
                		stringLength: {
                			max: '64',
                			message: '最多64个字符'
                		}
                	}
                },
                dictValue: {
                	validators: {
                		notEmpty: {
                			message: '参数值不能为空'
                		},
                		stringLength: {
                			max: '255',
                			message: '最多255个字符'
                		}
                	}
                },
                dictDesc: {
                	validators: {
                		notEmpty: {
                			message: '字典描述不能为空'
                		},
                		stringLength: {
                			max: '255',
                			message: '最多255个字符'
                		}
                	}
                },
                dictOrder: {
                	validators: {
                		notEmpty: {
                			message: '字典排序值不能为空'
                		},
                		between: {
                            min: 1,
                            max: 999999999,
                            message: '请输入1~999999999之间的整数'
                        },
                        integer: {
                            message: '请输入1~999999999之间的整数'
                        }
                	}
                },
                operatorId: {
                	validators: {
                		notEmpty: {
                			message: '运营商不能为空'
                		}
                	}
                },
                status: {
                	validators: {
                		notEmpty: {
                			message: '状态不能为空'
                		}
                	}
                }
                
            }
        });
    	//表单验证end
    	
    }
}


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,名称
	var searchKey = $("#searchKey").val();//字典类型
	var searchName = $("#searchName").val();//字典标题
	var searchDesc = $("#searchDesc").val();//描述
	var status = $("#status").val();
	var operatorId = paramDict.operatorId;//系统模块管理
	//时间区间
	//var searchDateRange = $("#searchDateRange").html();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: paramDict.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort.replace(/([A-Z])/g,"_$1").toLowerCase(),//驼峰转下划线
		order: params.order,
		searchKey:searchKey,
		searchName: searchName,
        searchDesc: searchDesc,
		status: status, //状态
		operatorId:operatorId //运营商ID
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		//更新
	    'click .editBtn': function (e, value, row, index) {
//	    	if(row.modifiable == 0){
//	    		$.toastrWarning('数据不允许修改');
//	    		return false;
//	    	}
	    	$("#myModalLabel").text("参数修改");
	    	var data = {id:row.id};
	    	$("#load_body").children().remove().end().load($("#contextPath").val()+paramDict.URL.toparamUrl()+"?id="+row.id+" #form_div",function(){
                // try{
                //     $('input, textarea').placeholder();
                // }catch (e2){
                //
                // }
	    		paramDict.getAllOperator("operatorId");
	    		var operatorId = $("#operator").val();
	    		$("#operatorId").val(operatorId);
	    		$("#operatorId").attr("disabled",true);
	    		$("#dictKey").attr("disabled",true);
	    		$("#dictType").attr("disabled",true);
	    		$("#dictValue").attr("disabled",true);
	    		
	    		var modifiable = row.modifiable;
	    		if(modifiable == 0){
	    			$("#dictTitle").attr("disabled",true);
	    			$("#status2").attr("disabled",true);
	    			$("#dictDesc").attr("disabled",true);
	    			$("#dictOrder").attr("disabled",true);
	    			$("#modifiableFormGroup").hide();
	    		}
	    		paramDict.validateform();
	    		$("#btn_submit").removeClass("disabled");
	    		$.showModal('#myModal');
	    	});
	    },
		//生效
		'click .effectBtn': function (e, value, row, index) {
			paramDict.effect(row.id);
		},
		//失效
	    'click .notEffectBtn': function (e, value, row, index) {
	    	paramDict.notEffect(row.id);
	    }
};

$(document).ready(function(){

	//是否是超管
	paramDict.isAdmin = myMain.getUserType() == 0 ? true:false;//0运维，1运营商
	if(paramDict.isAdmin){
		$("#btn_template_manage").show();
	}else{
		$("#btn_template_manage").hide();
	}
	//列表外的按钮显示权限控制
	auth.managerAuth({
		'btn_add':paramDict.URL.addparamUrl(),
	});
//	var btn_add = paramDict.URL.addparamUrl();
//	if(auth.isAuth(btn_add)){
//		$("#btn_add").show();
//	}else{
//		$("#btn_add").hide();
//	}
	//1、初始化加载列表数据
	paramDict.init();
	//2、初始化绑定增删改查事件
	paramDict.bindEvent();
});
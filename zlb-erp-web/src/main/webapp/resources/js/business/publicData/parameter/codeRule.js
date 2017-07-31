// 存放每个功能模块业务逻辑JS
// javascript 模块化
var codeRule = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	isResetOffset2: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/param/codeRule/list';
        },
        //分页获取配送点列表请求地址
        searchDeliveryListByPageUrl: function () {
        	return '/param/codeRule/deliveryList';
        },
		//新增修改跳转地址
		toparamUrl: function () {
			return '/param/codeRule/to';
		},
		//新增保存地址
		addparamUrl: function () {
			return '/param/codeRule/add';
		},
		//更新保存地址
		updateparamUrl: function () {
			return '/param/codeRule/update';
		},
		//更新保存地址
		effectUrl: function () {
			return '/param/codeRule/effect';
		},
		//更新保存地址
		notEffectUrl: function () {
			return '/param/codeRule/notEffect';
		}
    },
    //初始化下拉框数据
    initDropDownBox: function (){
    	
    },
    /**分页获取参数列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: codeRule.URL.searchListByPageUrl(),//请求后台的URL（*）
    		method: 'post',	//请求方式（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			codeRule.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
    		sortable: true,
    		sortName:'create_time',
    		sortOrder:'desc',
    		columns: [{
//    			checkbox: true
//    		}, {
    			field: 'flowCode',
    			title: '流水号编码'
    		}, {
    			field: 'operatorId',
    			title: '运营商'
    		}, {
    			field: 'statusStr',
    			title: '状态'
    		}, {
    			field: 'flowType',
    			title: '流水号类型'
    		}, {
    			field: 'prefix',
    			title: '前缀'
    		}, {
    			field: 'deliveryRecordIdStr',
    			title: '配送点'
    		}, {
    			field: 'dateFormat',
    			title: '日期格式'
    		}, {
    			field: 'flowLength',
    			title: '流水号长度'
    		}, {
    			field: 'nowCode',
    			title: '目前编码'
    		}, {
    			field: 'description',
    			title: '描述'
    		}, {
    			field: 'creator',
    			title: '创建人'
    		},{
    			field: 'createTime',
    			title: '创建时间',
    			sortable: true,
    			order:'desc'
    		},{
    			field: 'modifier',
    			title: '修改人'
    		},{
    			field: 'updateTime',
    			title: '最后修改时间'
    		},{
    	        field: 'operation',
    	        title: '操作',
    	        align: 'center',
    	        formatter:function(value,row,index){
    	            var html = '';
    	            html += '<a class="btn btn-primary btn-flat editBtn" href="javascript:void(0)" did="' + row.id + '" >编辑</a>';
    	            if(row.status == 1){
    	            	html += '<a class="btn btn-primary btn-flat notEffectBtn" href="javascript:void(0)">失效</a>';
    	            }else{
    	            	html += '<a class="btn btn-primary btn-flat effectBtn" href="javascript:void(0)">生效</a>';
    	            }
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    }  
    		]
    	});
    },
    /**分页获取参数列表**/
    searchDeliveryListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#deliveryListTable",//需要分页的table ID
    		url: codeRule.URL.searchDeliveryListByPageUrl(),//请求后台的URL（*）
    		method: 'post',	//请求方式（*）
    		queryParams:queryParams2,
    		onLoadSuccess:function(){
    			codeRule.isResetOffset2 = 0;
    			$("#btn_search2").removeClass("disabled");
    		},
    		sortable: true,
    		sortName:'create_time',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'code',
    			title: '编码'
    		}, {
    			field: 'name',
    			title: '运营商'
    		},{
    			field: 'operation',
    			title: '操作',
    			align: 'center',
    			formatter:function(value,row,index){
    				var html = '';
    				html += '<a class="btn btn-primary btn-flat editBtn" href="javascript:void(0)" did="' + row.id + '" >编辑</a>';
    				if(row.status == 1){
    					html += '<a class="btn btn-primary btn-flat notEffectBtn" href="javascript:void(0)">失效</a>';
    				}else{
    					html += '<a class="btn btn-primary btn-flat effectBtn" href="javascript:void(0)">生效</a>';
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
    	if(id == ''){
    		var url = codeRule.URL.addparamUrl();
    	}else{
    		var url = codeRule.URL.updateparamUrl();
    	}
    	var data = $("#addForm",$("#load_body")).serializeObject();
//    	data = JSON.stringify(data);
    	
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
            message: '您确定要使ID为['+id+']的参数项生效吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id,"status":1};
        			$.callAjax({
        				url : codeRule.URL.effectUrl(),
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
    		message: '您确定要使ID为['+id+']的参数项失效吗?',
    		callback: function(result) {
    			if(result) {
    				var params = {"id":id,"status":0};
    				$.callAjax({
    					url : codeRule.URL.notEffectUrl(),
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
    	//展示配送点蒙态框
    	$("#load_body").on("click","#search_delivery",function() {
    		alert("正在开发中。。。")
    		codeRule.searchDeliveryListByPage();
    		$("#myModalLabel02").text("配送点");
    		$.showModal('#myModal02');
    	});
    	
    	//配送点查找按钮
    	$("#btn_search2").click(function () {
    		$("#btn_search2").addClass("disabled");
    		codeRule.isResetOffset2 = 1;
    		$('#deliveryListTable').bootstrapTable('refresh');
    	});
    	
    	$("#btn_add").click(function () {
    		$("#myModalLabel").text("参数新增");
	    	$("#load_body").children().remove().end().load($("#contextPath").val()+codeRule.URL.toparamUrl()+" #form_div",function(){
	    		codeRule.validateform();
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
    			codeRule.saveparam();
    		}else{
    			$("#btn_submit").removeClass("disabled");
    		}
		});
    	
    	
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		codeRule.isResetOffset = 1;
    		$('#listTable').bootstrapTable('refresh');
    	});

    	
    	  
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	codeRule.initDropDownBox();
    	codeRule.searchListByPage();
    },
    
    
    validateform:function(){
    	//表单验证start
    	$("#addForm",$("#load_body")).bootstrapValidator({
            message: 'This value is not valid',
            fields: {
            	flowCode: {
                    validators: {
                        notEmpty: {
                            message: '流水号编码不能为空'
                        },
                        stringLength: {
                        	max: '64',
				    		message: '最多64个字符'
				    	}
                    }
                },
                flowType: {
                	validators: {
                		notEmpty: {
                			message: '流水号类型不能为空'
                		},
                		stringLength: {
                			max: '64',
                			message: '最多64个字符'
                		}
                	}
                },
                prefix: {
                	validators: {
                		notEmpty: {
                			message: '前缀不能为空'
                		},
                		stringLength: {
                			max: '50',
                			message: '最多50个字符'
                		}
                	}
                },
                deliveryRecordId: {
                	validators: {
                		notEmpty: {
                			message: '配送点不能为空'
                		}
                	}
                },
                dateFormat: {
                	validators: {
                		notEmpty: {
                			message: '日期格式不能为空'
                		},
                		stringLength: {
                			max: '50',
                			message: '最多50个字符'
                		}
                	}
                },
                flowLength: {
                	validators: {
                		notEmpty: {
                			message: '流水号长度不能为空'
                		},
                		stringLength: {
                			max: '50',
                			message: '最多50个字符'
                		}
                	}
                },
                description: {
                	validators: {
                		notEmpty: {
                			message: '描述不能为空'
                		},
                		stringLength: {
                			max: '50',
                			message: '最多50个字符'
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
	var searchKey = $("#searchKey").val();//参数key
//	var searchDesc = $("#searchDesc").val();//描述
	var searchType = $("#searchType").val();//搜索分类
	var status = $("#status").val();//搜索状态
	//时间区间
	//var searchDateRange = $("#searchDateRange").html();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: codeRule.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort.replace(/([A-Z])/g,"_$1").toLowerCase(),//驼峰转下划线
		order: params.order,
		searchKey:searchKey,
//		searchDesc:searchDesc,
		searchType:searchType,
		status: status //状态
	};
	return temp;
};

var queryParams2 = function (params) {
	//自定义查询参数,名称
	var searchKey = $("#delivery_searchKey").val();//参数key
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: codeRule.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			sort: params.sort.replace(/([A-Z])/g,"_$1").toLowerCase(),//驼峰转下划线
			order: params.order,
			searchKey:searchKey
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		//更新
	    'click .editBtn': function (e, value, row, index) {
	    	$("#myModalLabel").text("参数修改");
	    	$("#load_body").children().remove().end().load($("#contextPath").val()+codeRule.URL.toparamUrl()+row.id+" #form_div",function(){
	    		codeRule.validateform();
	    		$("#btn_submit").removeClass("disabled");
	    		$.showModal('#myModal');
	    	});
	    },
		//生效
		'click .effectBtn': function (e, value, row, index) {
			codeRule.effect(row.id);
		},
		//失效
	    'click .notEffectBtn': function (e, value, row, index) {
	    	codeRule.notEffect(row.id);
	    }
};

$(document).ready(function(){
	//1、初始化加载列表数据
	codeRule.init();
	//2、初始化绑定增删改查事件
	codeRule.bindEvent();
});
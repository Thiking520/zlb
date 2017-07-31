//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var source={'value':'1','text':'生效'};
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var propertyManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
        //分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/property/list';
        },
    	searchListDetailByPageUrl: function () {
            return '/wms/propertyDetail/list';
        },//删除的请求地址
        deleteUrl: function () {
            return '/publicData/cars/deleteCars';
        },//查看批次属性的请求地址
        getPropertyUrl: function () {
            return '/wms/property/queryProperty';
        },//更新批属性状态
        allWarehouseUrl: function () {
            return '/wms/warehouse/allWarehouse';
        },//添加批次属性和批次批次属性明细
        addPropertyUrl:function() {
        	return '/wms/property/addProperty';
        },
        updatePropertyUrl:function() {
        	return '/wms/property/updateProperty';
        }
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : propertyManager.URL.initDropDownBox(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		for(var i=0;i<data.data.carTypeList.length;i++){
         			carTypeArr[data.data.carTypeList[i].dictValue]=data.data.carTypeList[i].dictDesc;
         			$('#carType').append("<option value='"+data.data.carTypeList[i].dictValue+"'>"+data.data.carTypeList[i].dictDesc+"</option>");
         			$('#carType_c').append("<option value='"+data.data.carTypeList[i].dictValue+"'>"+data.data.carTypeList[i].dictDesc+"</option>");
         		}
         		for(var i=0;i<data.data.regionList.length;i++){
         			regionArr[data.data.regionList[i].dictValue]=data.data.regionList[i].dictDesc;
         			$('#region').append("<option value='"+data.data.regionList[i].dictValue+"'>"+data.data.regionList[i].dictDesc+"</option>");
         		}
         		for(var i=0;i<data.data.selfSupportList.length;i++){
         			selfSupportArr[data.data.selfSupportList[i].dictValue]=data.data.selfSupportList[i].dictDesc;
         			$('#selfSupport').append("<option value='"+data.data.selfSupportList[i].dictValue+"'>"+data.data.selfSupportList[i].dictDesc+"</option>");
         		}
         		for(var i=0;i<commonActiveList.length;i++){
         			commonActiveArr[commonActiveList[i].value]=commonActiveList[i].text;
         			$('#enabled_c').append("<option value='"+commonActiveList[i].value+"'>"+commonActiveList[i].text+"</option>");
         			$('#enabled').append("<option value='"+commonActiveList[i].value+"'>"+commonActiveList[i].text+"</option>");
         		}
			},
			error : function(){
				$.toastrError();
			}
		});
    	
    },
    /**分页获取批属性列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#propertyManagerTable",//需要分页的table ID
    		url: propertyManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			propertyManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'propertyCode',
    			title: '批属性编码',
    			formatter:function(value,row,index){
					return '<a class="property_detail" href="javascript:void(0)" propertyCode="' + row.propertyCode +'">' + row.propertyCode + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'propertyName',
    			title: '批属性名称'
    		}, {
    			field: 'operat',
    			title: '运营商'
    		}, {
    			field: 'disabled',
    			title: '状态',
    		    align: 'center',
    			formatter:function(value,row,index){
    				if(value==0){
						return '生效';
					}else if(value==1){
						return '失效';
					}
    			}
    		}, {
    			field: 'warehouseName',
    			title: '仓库名称'
    		}, {
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return propertyManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'modifier',
    			title: '修改人',
    		    align: 'center'
    		}, {
    			field: 'modified',
    			title: '修改时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return propertyManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-danger btn-sm delete_property" href="javascript:void(0)" >删除</a><a class="btn btn-primary btn-sm edit_propert" href="javascript:void(0)" >编辑</a>';
    	        	if(row.disabled==1){
    	        		html+='<a class="btn btn-success btn-sm status_a" href="javascript:void(0)" >生效</a>';
    	        	}else{
    	        		html+='<a class="btn btn-warning btn-sm status_a" href="javascript:void(0)" >失效</a>';
    	        	}
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    }  
    		]
    	});
    },
    searchListDetailByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#propertyDetailTable",//需要分页的table ID
    		url: propertyManager.URL.searchListDetailByPageUrl(),//请求后台的URL（*）
    		queryParams:queryDetailParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			propertyManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'isUse',
    			title: '是否使用',
                formatter: function (value, row, index) {
                	var isUser = "";
                    if(value == 0){
                    	isUser = '是';
                    }else{
                    	isUser = '否';
                    }
                    return "<a href=\"#\" disabled=\"true\"   name=\"isUse\" data-type=\"select\"  data-pk=\""+row.Id+"\" data-title=\"是否显示\" data-source=[{value:\"0\",text:\"是\"},{value:\"1\",text:\"否\"}] >" 
                    +isUser+
                    "</a>";
                },
    		}, {
    			field: 'propertyBatch',
    			title: '批次属性',
    			formatter:function(value,row,index){
    				if(value==10){
						return '生产日期';
					}else if(value==20){
						return '失效日期';
					}else if(value==30){
						return '入库日期';
					}else if(value==40){
						return '生产批次'
					}else if(value==50){
						return '供应商'
					}
    			}
    		}, {
    			field: 'fieldShow',
    			title: '栏位显示',
                formatter: function (value, row, index) {
                    return "<a href=\"#\"  name=\"fieldShow\" data-type=\"text\" data-pk=\""+row.Id+"\" data-title=\"栏位显示\">" + value + "</a>";
                },
    		}, {
    			field: 'isRequired',
    			title: '是否必输',
    		    align: 'center',
                formatter: function (value, row, index) {
                	var isRequired = "";
                    if(value == 0){
                    	isRequired = '是';
                    }else{
                    	isRequired = '否';
                    }
                    return "<a href=\"#\" name=\"isRequired\" data-type=\"select\" data-pk=\""+row.Id+"\" data-title=\"是否必输\" data-source=[{value:\"0\",text:\"是\"},{value:\"1\",text:\"否\"}] >" + isRequired + "</a>";
                },
    	    }, {
				field: 'type',
				title: '格式',
			    align: 'center',
	            formatter: function (value, row, index) {
	            	var type = "";
	                if(value == 10){
	                	type = '日期格式';
	                }else{
	                	type = '字符格式';
	                }
	                return "<a href=\"#\" name=\"type\" data-type=\"select\" data-pk=\""+row.Id+"\" data-title=\"格式选择\" data-source=[{value:\"10\",text:\"日期格式\"},{value:\"20\",text:\"字符格式\"}] >" + type + "</a>";
	            },
		    } 
    		],
            onClickRow: function (row, $element) {
                curRow = row;
            },
            onLoadSuccess: function (value, row, index) {
            	
                $("#propertyDetailTable a").editable({
                    url: function (params) {
                        var sName = $(this).attr("name");
                        curRow[sName] = params.value;
                        $.callAjax({
                            type: 'POST',
                            url: "/wms/propertyDetail/updatePropertyDetail",
                            data: curRow,
                            async: false,
                            dataType: 'JSON',
                            success: function (data) {
        		         		if(data.code != "0000"){
        		         			$.toastrWarning(data.msg); 
        		         			return;
        		         		}
                            },
							error : function() {
								alert(curRow.id);
								alert(curRow.propertyCode);
								alert(sName);
							}
                        });
                    },
                    type: 'text',
                    validate: function (v) {
                	  	if (!v) return '请选择或输入!';
                    }
                });
            },
    	});
    },
    /**删：删除**/
    deleteCars: function (carsId) {
    	$.dialogConfirm({
            message: '您确定要删除商品ID为['+carsId+']的商品吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":carsId};
        			$.callAjax({
        				url : propertyManager.URL.deleteUrl(),
        				data : params,
        				async: false,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#propertyManagerTable').bootstrapTable('refresh');
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
    /**
     * 改变批属性状态
     */
    changeAreaStatus:function (id,enabled){
    	var params={
    		"id":id,
    		"enabled":enabled	
    	}
    	$.callAjax({
			type:"post",
			url : propertyManager.URL.changeAreaStatusUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$('#propertyManagerTable').bootstrapTable('refresh');
         		$.toastrSuccess('操作成功！');
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
    /**编辑，查看详情**/
	getProperty: function (id,type) {
    	//document.getElementById("addAnchorForm").reset();
	    //$('#addAnchorForm').bootstrapValidator('resetForm', true);
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : propertyManager.URL.getPropertyUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         		}
         		$("#propertyCodeAdd").val(data.data.propertyCode);
         		$("#propertyNameAdd").val(data.data.propertyName);
           		$("#operatorCode").val(data.data.operatCode);
        		$("#operatorName").val(data.data.operat);
        		$("#warehouseNameAdd").val(data.data.warehouseName);
         	    $("#disabled option[value='"+data.data.disabled+"']").attr("selected",true);
         		$("#descrip").val(data.data.descrip);
         		
          		if(type=="look"){
         			$("#myModalLabel").text("查看批次属性详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			propertyManager.disableForm('addAnchorForm',true);
         			 $('#fromSousuo').hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑批次属性");
         			$("#btn_edit_submit").show();
         			$("#btn_edit_submit").show();
         			propertyManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
         			$('#propertyCodeAdd').attr("disabled",true);
         			$('#propertyNameAdd').attr("disabled",true);
         			$('#fromSousuo').show();
         		}
         	    $.showModal('#myModal');
			},
			error : function(){
				$.toastrError();
			}
		});
		
    },
    /**
	 * 失效表单里面的控件
	 * @param formId
	 * @param isDisabled
	 */
	disableForm : function (formId,isDisabled) {    
	    var attr="disable";    
	    if(!isDisabled){    
	       attr="enable";    
	    }    
	    $("form[id='"+formId+"'] :text").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] textarea").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] select").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] :radio").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] :checkbox").attr("disabled",isDisabled);
	},    

    
  //添加或修改
	addOrUpdate:function(type){
		var urlValue;
		if(type=="add"){
			urlValue=propertyManager.URL.addPropertyUrl();
		}if(type=="update"){
			urlValue=propertyManager.URL.updatePropertyUrl();
		}
		var params={
				'id':$("#rowId").val(),
    			'warehouseName':$('#warehouseNameAdd').val(),
    			'disabled':$("#disabled").val(),
    			'propertyCode':$('#propertyCodeAdd').val(),
    			'propertyName':$('#propertyNameAdd').val(),
    			'operatorCode':$('#operatorCode').val(),
    			'operatorName':$('#operatorName').val(),
    			'descrip':$('#descrip').val(),
    			'isUse':$('#isUse').val(),
    			'propertyBatch':$('#propertyBatch').val(),
    			'fieldShow':$('#fieldShow').val(),
    			'isRequired':$('#isRequired').val(),
    			'type':$('#type').val()
    		}
    		
    		$.callAjax({
    			type:"post",
    			url : urlValue,
    			data : params,
    			async: false,
    			success : function(data){
             		if(data.code != "0000"){
             			$.toastrWarning(data.msg);
             			//填充dialog
             	    	//显示dialog
             			return;
             		}
             		if("update" == type){
             			$.hideModal('#myModal');
             		}
        			$('#propertyCodeAdd').attr("disabled",true);
         			$('#propertyNameAdd').attr("disabled",true);
             		$('#propertyManagerTable').bootstrapTable('refresh');
             		$('#propertyDetailTable').bootstrapTable('refresh');
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
		
	},
	//表单检验
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
	        	propertyCodeAdd: {
	                validators: {
	                    notEmpty: {
	                        message: '属性批次编码不能为空！'
	                    },
	                    stringLength: {
                            min: 4,
                            max: 11,
                            message: '属性批次长度必须在4到8位之间'
                        },
	                }
	            },
	            propertyNameAdd: {
	                validators: {
	                    notEmpty: {message: '属性批次名称不能为空！'},
	                }
	            },
	            operatorName: {
	                validators: {
	                    notEmpty: {type: '运营商名称不能为空！'},
	                }
	            },
	            warehouseNameAdd: {
	                validators: {
	                    notEmpty: {message: '仓库名称不能为空！'},
	                }
	            },
	            fieldShow: {
	                validators: {
	                    notEmpty: {message: '栏位显示不能为空！'},
	                }
	            },
	            type: {
	                validators: {
	                    notEmpty: {message: '格式不能为空！'},
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    /**
     * 修改批次状态
     */
    modifyStatus:function(roleId,disabled) {
    	var params = {"id":roleId,"disabled":disabled};
    	
		$.callAjax({
			type:"post",
			url : propertyManager.URL.updatePropertyUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#propertyManagerTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    //查询仓库列表
	searchPro :function(){
		$.pageTable({
    		tableId: "#warehouseList",//需要分页的table ID
    		url: propertyManager.URL.allWarehouseUrl(),//请求后台的URL（*）
    		queryParams:queryParamsPro,
    		onLoadSuccess:function(){
    			propertyManager.isResetOffset = 0;
    			$("#btn_search_pro").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'warehouseCode',
    			title: '仓库编码'
    		}, {
    			align: 'center',
    			field: 'warehouseName',
    			title: '仓库名称'
    		}
    		]
    	});
	},
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  //$("#btn_search").addClass("disabled");
    		  //propertyManager.isResetOffset = 1;
    		  $('#propertyManagerTable').bootstrapTable('refresh');
    	});

		    	// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
		    document.getElementById("addAnchorForm").reset();
		    $('#addAnchorForm').bootstrapValidator('resetForm', true);
		    $('#propertyManagerTable').bootstrapTable('refresh');
		    $('#propertyDetailTable').bootstrapTable('refresh');
		    propertyManager.disableForm('addAnchorForm',false);
			$("#myModalLabel").text("新增批次属性");
			$("#operatorName").val(myMain.selfCompanyName);
			$("#warehouseNameAdd").val(homepage.warehouseName);
			
		    $("#btn_save_submit").show();
		    $("#btn_edit_submit").hide();
		    $.showModal('#myModal');
		});
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 propertyManager.isResetOffset = 1;
    			 $('#propertyManagerTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			propertyManager.addOrUpdate('add');
    		else return;
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
//    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
//    		bootstrapValidator.validate();
//    		if(bootstrapValidator.isValid())
    			propertyManager.addOrUpdate('update');
//    		else return;
    	});
	  
	    $("#btn_save_resh").click(function(){
	    	$('#propertyManagerTable').bootstrapTable('refresh');
	    	$('#propertyDetailTable').bootstrapTable('refresh');
	    });
	    

	    $("#btn_save_detail").click(function(){
	    	var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
	    	bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			propertyManager.addOrUpdate('add');
    		else return;
	    });

    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	/*propertyManager.initDropDownBox();*/
    	propertyManager.validateform();
    	propertyManager.searchListByPage();
    	propertyManager.searchListDetailByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryDetailParams = function (params) {
	var propertyCode=$('#propertyCodeAdd').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: propertyManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			enabled:'1',
			propertyCode:propertyCode,
		};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,仓库编码、仓库、名称
	var warehouseCode=$('#warehouseCode').val();
	var propertyCode=$('#propertyCode').val();
	var propertyName=$('#propertyName').val();
	var disabled=$('#disabled').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: propertyManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		propertyCode:propertyCode,
		propertyName:propertyName,
		warehouseCode:warehouseCode,
		disabled:disabled,
	};
	return temp;
};

var queryParamsPro = function (params) {
	
	var warehouseCode=$('#warehouseCodePro').val();
	var warehouseCode=$('#warehouseNamePro').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: propertyManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:null,
			enabled:'1',
			warehouseCode:warehouseCode,
			warehouseCode:warehouseCode
		};
	return temp;
};

//清空
$("#btn_clean").on("click",function () {
	$.clearForm("fromModal01");
});

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .property_detail': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发查询详情的方法
	    	propertyManager.getProperty(row.id,'look');
	       	$('#propertyDetailTable').bootstrapTable('refresh');
	    },
		//删除
		'click .delete_property': function (e, value, row, index) {
			$.toastrSuccess('暂不支持删除');
		},
		//修改库区状态
		'click .status_a': function (e, value, row, index) {
			propertyManager.modifyStatus(row.id,row.disabled);
		},
	    //编辑
	    'click .edit_propert': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
			$("#rowId").val(row.id);
			$("#propertyCodeAdd").val(row.propertyCode);
			propertyManager.getProperty(row.id,'edit');
		   	$('#propertyDetailTable').bootstrapTable('refresh');

		},
		
};



$(document).ready(function(){
	//1、初始化加载列表数据
	propertyManager.init();
	//2、初始化绑定增删改查事件
	propertyManager.bindEvent();
});
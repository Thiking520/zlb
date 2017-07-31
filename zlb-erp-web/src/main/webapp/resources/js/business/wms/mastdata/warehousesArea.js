//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var warhouseAreaManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//仓库分页获取列表请求地址
    	searchWarehouseListByPageUrl: function () {
            return '/publicData/deliveryRecord/list';
        },
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/warehouseArea/list';
        },//删除的请求地址
        deleteUrl: function () {
            return '/publicData/cars/deleteCars';
        },//查看库区详情的请求地址
        getWarehouseAreaDetaisUrl: function () {
            return '/wms/warehouseArea/queryAreaDetails';
        },//更新库区状态
        changeAreaStatusUrl: function () {
            return '/wms/warehouseArea/updateAreaStatus';
        },//更新
        updateArea:function(){
        	return '/wms/warehouseArea/updateArea';
        },//查询仓库
        allWarehouseUrl: function () {
            return '/wms/warehouse/allWarehouse';
        },//初始化下拉框
        initDropDownBox: function () {
            return '/publicData/cars/initDropDownBox';
        },
        addWarehouseUrl:function() {
        	return '/wms/warehouseArea/addWarehouseArea';
        }
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	
     		for(var i=0;i<commonActiveList.length;i++){
     			commonActiveArr[commonActiveList[i].value]=commonActiveList[i].text;
     			$('#enabled_c').append("<option value='"+commonActiveList[i].value+"'>"+commonActiveList[i].text+"</option>");
     			$('#enabled').append("<option value='"+commonActiveList[i].value+"'>"+commonActiveList[i].text+"</option>");
     		}
		
    	
    },
    /**分页获取库区列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#warhouseAreaManagerTable",//需要分页的table ID
    		url: warhouseAreaManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			warhouseAreaManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'areaCode',
    			title: '库区编码',
				formatter:function(value,row,index){
					return '<a class="warehouse_area_click" href="javascript:void(0)" areaCode="' + row.areaCode +'">' + row.areaCode + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'areaName',
    			title: '库区名称'
    		},{
    			field: 'warehouseCode',
    			title: '仓库编码',
    		}, {
    			field: 'warehouseName',
    			title: '仓库名称'
    		}, {
    			field: 'disabled',
    			title: '状态',
    		    align: 'center',
    			formatter:function(value,row,index){
    				if(value==0){
						return '生效';
					}else if(value==1){
						return '<span style=\"color:red;\">失效</span>';
					}
    			}
    		}, {
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return warhouseAreaManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return warhouseAreaManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_area" href="javascript:void(0)" >编辑</a>';
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
    /**删：删除**/
    deleteCars: function (carsId) {
    	$.dialogConfirm({
            message: '您确定要删除商品ID为['+carsId+']的商品吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":carsId};
        			$.callAjax({
        				url : warhouseAreaManager.URL.deleteUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#warhouseAreaManagerTable').bootstrapTable('refresh');
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
     * 改变库区状态
     */
    changeAreaStatus:function (id,enabled){
    	var params={
    		"id":id,
    		"enabled":enabled	
    	}
    	$.callAjax({
			type:"post",
			url : warhouseAreaManager.URL.changeAreaStatusUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$('#warhouseAreaManagerTable').bootstrapTable('refresh');
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
    getWarehouseAreaDetais: function (id,type) {
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : warhouseAreaManager.URL.getWarehouseAreaDetaisUrl(),
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
         		
         		$("#warehouse_area_code_add").val(data.data.areaCode);
         		$("#warehouse_area_name_add").val(data.data.areaName);
         		$("#warehouseCodeAdd").val(data.data.warehouseCode);
         		$("#warehouseNameAdd").val(data.data.warehouseName);
         	    $("#disabledAdd option[value='"+data.data.disabled+"']").attr("selected",true);
         	    if(data.data.disabled == true){
         	    	$("#disabledAdd").val(1);
         	    }else{
         	    	$("#disabledAdd").val(0);
         	    }
         		$("#remark").val(data.data.remark);
         		
          		if(type=="look"){
         			$("#myModalLabel").text("查看库区详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			warhouseAreaManager.disableForm('addAnchorForm',true);
         			 $('#fromSousuo').hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑库区");
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").hide();
         			warhouseAreaManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
         			$('#warehouse_area_code_add').attr("disabled",true);
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
			urlValue=warhouseAreaManager.URL.addWarehouseUrl();
		}if(type=="update"){
			urlValue=warhouseAreaManager.URL.updateArea();
		}
		
		var params={
				'id':$("#rowId").val(),
    			'warehouseCode':$('#warehouseCodeAdd').val(),
    			'warehouseName':$('#warehouseNameAdd').val(),
    			'disabled':$("#disabledAdd").val(),
    			'areaCode':$('#warehouse_area_code_add').val(),
    			'areaName':$('#warehouse_area_name_add').val(),
    			'remark':$('#remark').val(),
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
             		$.hideModal('#myModal');
             		$('#warhouseAreaManagerTable').bootstrapTable('refresh');
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
	        	warehouse_area_code_add: {
	                validators: {
	                    notEmpty: {
	                        message: '仓库编码不能为空！'
	                    }
	                }
	            },
	            area_code: {
	                validators: {
	                    notEmpty: {message: '运营商不能为空！'},
	                }
	            },
	            warehouse_area_name_add: {
	                validators: {
	                    notEmpty: {message: '库区名称不能为空！'},
	                }
	            },
	            warehouse_code_add: {
	                validators: {
	                    notEmpty: {message: '运营商不能为空！'},
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    /**
     * 修改库区状态
     */
    modifyStatus:function(roleId,disabled) {
    	var params = {"id":roleId,"disabled":disabled};
    	
		$.callAjax({
			type:"post",
			url : warhouseAreaManager.URL.changeAreaStatusUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#warhouseAreaManagerTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
	searchWarehouse :function(){
		$.pageTable({
    		tableId: "#warehouseList",//需要分页的table ID
    		url: warhouseAreaManager.URL.allWarehouseUrl(),//请求后台的URL（*）
    		queryParams:queryParamsWarehouse,
    		onLoadSuccess:function(){
    			warhouseAreaManager.isResetOffset = 0;
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
    		  //warhouseAreaManager.isResetOffset = 1;
    		  $('#warhouseAreaManagerTable').bootstrapTable('refresh');
    	});

		    	// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
		    document.getElementById("addAnchorForm").reset();
		    $('#addAnchorForm').bootstrapValidator('resetForm', true);
		    warhouseAreaManager.disableForm('addAnchorForm',false);
			$("#myModalLabel").text("新增库区");
			$("#warehouse_area_code_add").val("自动生成");
			$("#warehouseNameAdd").val(homepage.warehouseName);
		    $("#btn_save_submit").show();
		    $("#btn_edit_submit").hide();
		    $.showModal('#myModal');
		});
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			warhouseAreaManager.addOrUpdate('add');
    		else return;
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			warhouseAreaManager.addOrUpdate('update');
    		else return;
    	});
 
    	$("#btn_clean").on("click",function () {
    		$.clearForm("fromModal01");
    	});
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	/*warhouseAreaManager.initDropDownBox();*/
    	warhouseAreaManager.validateform();
    	warhouseAreaManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsDriver = function (params) {
	
	var cnName=$('#name').val();
	var mobileNo=$('#tel').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: warhouseAreaManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			enabled:'1',
			cnName:cnName,
			mobileNo:mobileNo
		};
	return temp;
};

var queryParamsWarehouse = function (params) {
	
	var warehouseCode=$('#warehouseCodePro').val();
	var warehouseName=$('#warehouseNamePro').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: warhouseAreaManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:null,
			enabled:'1',
			warehouseCode:warehouseCode,
			warehouseName:warehouseName
		};
	return temp;
};


//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,仓库编码、仓库、名称
	var warehouseCode=$('#warehouse_code').val();
	var warehouseAreaName=$('#warehouse_area_name').val();
	var warehouseAreaCode=$('#warehouse_area_code').val();
	var disabled=$('#disabled').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: warhouseAreaManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		areaName:warehouseAreaName,
		areaCode:warehouseAreaCode,
		warehouseCode:warehouseCode,
		disabled:disabled,
	};
	return temp;
};

$("#s_save").click(function(){
	 
	  if($("#superiorList").bootstrapTable('getSelections').length==1){
			$.map($("#superiorList").bootstrapTable('getSelections'), function(row) {
				
				$('#parentCode').val(row.id);
				$('#superior').val(row.name);
				$.hideModal('#myModal02');
           });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

$("#btn_search_emp").click(function(){
		$('#empList').bootstrapTable('refresh');
		
});


//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .warehouse_area_click': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发查询详情的方法
	    	warhouseAreaManager.getWarehouseAreaDetais(row.id,'look');
	    },
		//删除
		'click .delete_area': function (e, value, row, index) {
			$.toastrSuccess('库位暂不支持删除');
			//warhouseAreaManager.deleteCars(row.id);
		},
		//修改库区状态
		'click .status_a': function (e, value, row, index) {
			warhouseAreaManager.modifyStatus(row.id,row.disabled);
		},
	    //编辑
	    'click .edit_area': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
			$("#rowId").val(row.id);
			warhouseAreaManager.getWarehouseAreaDetais(row.id,'edit');
		},
		
};

$(document).ready(function(){
	
	//1、初始化加载列表数据
	warhouseAreaManager.init();
	//2、初始化绑定增删改查事件
	warhouseAreaManager.bindEvent();
});
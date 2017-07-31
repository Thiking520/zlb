//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var shelfRulesManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	type:'detail',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/shelfRules/list';
        },//分页获取明细列表请求地址
    	searchListDetailByPageUrl: function () {
            return '/wms/shelfRulesDetail/list';
        },//删除的请求地址
        getShelfRulesDetaisUrl: function () {
            return '/wms/shelfRules/queryShelRules';
        },//查看库位
        getWarehouseLocationUrl: function () {
            return '/wms/warehouseLocation/list';
        },
        deleteShelfRulesUrl:function(){
        	return '/wms/shelfRules/updateShelfRules';
        },
        deleteShelfRulesDetailUrl:function(){
        	return '/wms/shelfRulesDetail/deleteShelfRulesDetail';
        },//查询仓库
        allWarehouseUrl: function () {
            return '/wms/warehouse/allWarehouse';
        },
        addShelfRulesUrl:function() {
        	return '/wms/shelfRules/addShelRules';
        },
        getWarehouseAreaUrl:function(){
        	return '/wms/warehouseArea/list';
        },
        updateShelfRulesUrl:function(){
        	return '/wms/shelfRules/updateShelfRules';
        }
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : shelfRulesManager.URL.initDropDownBox(),
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
    /**分页获取上架规则列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#shelfRulesManagerTable",//需要分页的table ID
    		url: shelfRulesManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			shelfRulesManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'rulesCode',
    			title: '规则编码',
    			formatter:function(value,row,index){
					return '<a class="shelfRulesDetail" href="javascript:void(0)" warehouseCode="' + row.rulesCode +'">' + row.rulesCode + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'rulesName',
    			title: '规则名称'
    		}, {
    			field: 'warehouseCode',
    			title: '仓库编码'
    		}, {
    			field: 'autoRecommend',
    			title: '是否免上架操作',
    			formatter:function(value,row,index){
    				if(value==1){
    					return '是';
    				}else{
    					return '否';
    				}
    			}
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
					return shelfRulesManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return shelfRulesManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_shelf" href="javascript:void(0)" >编辑</a>';
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
    /**分页获取上架明细规则列表**/
    searchListDetailByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#shelfRulesDetailManagerTable",//需要分页的table ID
    		url: shelfRulesManager.URL.searchListDetailByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsDetail,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			shelfRulesManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
    			if(shelfRulesManager.type=='detail'){
    				$(".delete_shelf_detail").attr("disabled",true);
    			}
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'orderNo',
    			title: '步骤号'
    		}, {
    			field: 'storageType',
    			title: '入库订单类型',
    			formatter:function(value,row,index){
    				if(value==10){
						return '采购入库';
					}else if(value==20){
						return '退货入库';
					}else if(value==30){
						return '调拨入库';
					}else if(value==40){
						return '赠品入库';
					}else if(value==50){
						return '换货入库';
					}else if(value==60){
						return '其他入库';
					}
    			}
    		}, {
       			field: 'shelfTactics',
    			title: '上架策略',
    			formatter:function(value,row,index){
    				if(value==10){
						return '尝试将产品置入货品资料中的“首选库位”';
					}else if(value==20){
						return '尝试与货品资料中的“首选库区”现有产品合并';
					}else if(value==30){
						return '尝试在货品资料中的“首选库区”找到可用库位';
					}else if(value==40){
						return '尝试与这一步中的“至区”现有产品合并';
					}else if(value==50){
						return '尝试在这一步中的“至区”找到可用库位';
					}else if(value==60){
						return '尝试将产品置入这一步指定的“至库位”';
					}else if(value==70){
						return '尝试与货品档案中的“退货区”现有产品合并';
					}else if(value==80){
						return '尝试在货品档案中的“退货区”找到可用库位';
					}
    			}
    		}, {
       			field: 'inventoryState',
    			title: '货品状态',
				formatter:function(value,row,index){
					if(value==10){
						return '良品';
					}else if(value==20){
						return '残品';
					}
				}
    		}, {
    			
       			field: 'toArea',
    			title: '至库区'
    		}, {
       			field: 'toLocation',
    			title: '至库位'
    		}, {
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return shelfRulesManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return shelfRulesManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    	    }
    		,{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
	        		var html='<a class="btn btn-danger btn-sm delete_shelf_detail"  href="javascript:void(0)" >删除</a>';
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
        				url : shelfRulesManager.URL.deleteUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#shelfRulesManagerTable').bootstrapTable('refresh');
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
    getShelfRulesDetais: function (id,type) {
    	//document.getElementById("addAnchorForm").reset();
	    //$('#addAnchorForm').bootstrapValidator('resetForm', true);
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : shelfRulesManager.URL.getShelfRulesDetaisUrl(),
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
         		$("#rulesCodeAdd").val(data.data.rulesCode);
         		$("#rulesNameAdd").val(data.data.rulesName);
         		$("#operatorCode").val(data.data.operatCode);
        		$("#operatorName").val(data.data.operat);
         		$("#warehouseCodeAdd").val(data.data.warehouseCode);
         		$("#warehouseNameAdd").val(data.data.warehouseName);
         	    $("#disabled option[value='"+data.data.disabled+"']").attr("selected",true);
          	    if(data.data.disabled == true){
          	    	$("#disabledAdd").val(1);
          	    }else{
          	    	$("#disabledAdd").val(0);
          	    }
          	    
         		$("#descrip").val(data.data.descrip);
         		
         		var checkElements=document.getElementsByName('autoRecommend');  
                for(var i=0;i<checkElements.length;i++){  
                    var checkElement=checkElements[i];  
                    if(data.data.autoRecommend==1){
                    	checkElement.checked="checked";  
                    }
                }
          		if(type=="look"){
         			$("#myModalLabel").text("查看上架规则");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			shelfRulesManager.disableForm('addAnchorForm',true);
         			$(".delete_shelf_detail").attr("disabled",true);
         			$('#fromSousuo').hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑上架规则");
         			$("#btn_edit_submit").show();
         			shelfRulesManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
         			$('#rulesCodeAdd').attr("disabled",true);
        			//默认选中
        			$("#storageType").val("10");
        			$("#inventoryState").val("10");
        			$("#shelfTactics").val("10");
        			
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
		var disabledAdd = 0;
		if(type=="add"){
			urlValue=shelfRulesManager.URL.addShelfRulesUrl();
			
			if($("#disabledAdd").val() == "1"){
				disabledAdd = 1
			}else{
				disabledAdd = 0;
			}
			
		}if(type=="update"){
			urlValue=shelfRulesManager.URL.updateShelfRulesUrl();
			
			if($("#disabledAdd").val() == "1"){
				disabledAdd = 0
			}else{
				disabledAdd = 1;
			}
		}
		
		var autoRecommend = false;
		if ($("#autoRecommend").is(":checked")) {
			autoRecommend = true;
		}
		
		var params={
				'id':$("#rowId").val(),
    			'rulesCode':$('#rulesCodeAdd').val(),
    			'rulesName':$('#rulesNameAdd').val(),
    			'disabled':disabledAdd,
    			'warehouseCode':$('#warehouseCodeAdd').val(),
    			'warehouseName':$('#warehouseNameAdd').val(),
    			'descrip':$('#descrip').val(),
    			'autoRecommend':autoRecommend,
    			'orderNo':$('#orderNo').val(),
    			'storageType':$('#storageType').val(),
    			'inventoryState':$('#inventoryState').val(),
    			'toArea':$('#warehouseAreaCodeAdd').val(),
    			'toLocation':$('#warehouseLocationCode').val(),
    			'shelfTactics':$('#shelfTactics').val(),
    			'remark':$('#remark').val(),
    		}
    		
    		$.callAjax({
    			type:"post",
    			url : urlValue,
    			data : params,
    			success : function(data){
             		if(data.code != "0000"){
             			$.toastrWarning(data.msg);
             			//填充dialog
             	    	//显示dialog
             			return;
             		}
             		if(type == "update"){
             			$.hideModal('#myModal');
             		}else{
                  		$('#rulesCodeAdd').val(data.data.rulesCode);
                   		$("#rowId").val(data.data.id);
             		}
         			$('#rulesCodeAdd').attr("disabled",true);
             	    $('#shelfRulesManagerTable').bootstrapTable('refresh');
                 	$('#shelfRulesDetailManagerTable').bootstrapTable('refresh');
             			
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
	        	rulesCodeAdd: {
	                validators: {
	                    notEmpty: {
	                        message: '规则编码不能为空！'
	                    },
	                }
	            },
	            rulesNameAdd: {
	                validators: {
	                    notEmpty: {message: '规则名称不能为空！'},
	                }
	            },
	            operatorName: {
	                validators: {
	                    notEmpty: {type: '运营商不能为空！'},
	                }
	            },
	            warehouseNameAdd: {
	                validators: {
	                    notEmpty: {message: '仓库不能为空！'},
	                }
	            },
	            orderNo: {
	                validators: {
	                    notEmpty: {message: '序号不能为空！'},
	                }
	            },
	            warehouseAreaNameAdd: {
	                validators: {
	                    notEmpty: {message: '库区不能为空！'},
	                }
	            },
	            warehouseLoactionName: {
	                validators: {
	                    notEmpty: {message: '库位不能为空！'},
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    /**
     * 修改上架状态
     */
    modifyStatus:function(roleId,disabled) {
    	var params = {"id":roleId,"disabled":disabled};
    	
		$.callAjax({
			type:"post",
			url : shelfRulesManager.URL.updateShelfRulesUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#shelfRulesManagerTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**
     * 删除规则明细
     */
    deleteShelfRulesDetais:function(roleId) {
    	var params = {"id":roleId};
    	
		$.callAjax({
			type:"post",
			url : shelfRulesManager.URL.deleteShelfRulesDetailUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$.toastrSuccess('删除成功');
         		$('#shelfRulesDetailManagerTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    //查询库区列表
	searchPro :function(){
		$.pageTable({
    		tableId: "#warehouseAreaList",//需要分页的table ID
    		url: shelfRulesManager.URL.getWarehouseAreaUrl(),//请求后台的URL（*）
    		queryParams:queryParamsArea,
    		onLoadSuccess:function(){
    			shelfRulesManager.isResetOffset = 0;
    			$("#btn_search_pro").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'areaCode',
    			title: '库区编码'
    		}, {
    			align: 'center',
    			field: 'areaName',
    			title: '库区名称'
    		}
    		]
    	});
	},
    //查询库位列表
	searchLocation :function(){
		$.pageTable({
    		tableId: "#warehouseLocationList",//需要分页的table ID
    		url: shelfRulesManager.URL.getWarehouseLocationUrl(),//请求后台的URL（*）
    		queryParams:queryParamsLocation,
    		onLoadSuccess:function(){
    			shelfRulesManager.isResetOffset = 0;
    			$("#btn_search_pro").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'locationCode',
    			title: '库位编码'
    		}, {
    			align: 'center',
    			field: 'locationName',
    			title: '库位名称'
    		}
    		]
    	});
	},//仓库
	searchWarehouse :function(){
		$.pageTable({
    		tableId: "#warehouseList",//需要分页的table ID
    		url: shelfRulesManager.URL.allWarehouseUrl(),//请求后台的URL（*）
    		queryParams:queryParamsWarehouse,
    		onLoadSuccess:function(){
    			shelfRulesManager.isResetOffset = 0;
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
    		  //shelfRulesManager.isResetOffset = 1;
    		  $('#shelfRulesManagerTable').bootstrapTable('refresh');
    	});

		    	// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
		    document.getElementById("addAnchorForm").reset();
		    $('#addAnchorForm').bootstrapValidator('resetForm', true);
		    //shelfRulesManager.searchListDetailByPage();
		    $('#shelfRulesDetailManagerTable').bootstrapTable('refresh');
		    shelfRulesManager.disableForm('addAnchorForm',false);
			$("#myModalLabel").text("新增上架规则");
			//默认选中
			$("#storageType").val("10");
			$("#inventoryState").val("10");
			$("#shelfTactics").val("10");
			$("#rowId").val('');
			$('#rulesCodeAdd').val("自动生成");
			
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
    			 shelfRulesManager.isResetOffset = 1;
    			 $('#shelfRulesManagerTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid()){
    	    	var inputValue=document.getElementById("orderNo").value;
	    	    var inputValueFilter=/^\d+$/;
	    	    if(!inputValueFilter.test(inputValue)){
	    	          $.toastrWarning("请在输入框中输入数字！");
	    	          return false;
	    	    }
    			shelfRulesManager.addOrUpdate('add');
    		}
    		else {
    			return
    		};
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
//    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
//    		bootstrapValidator.validate();
//    		if(bootstrapValidator.isValid())
    			shelfRulesManager.addOrUpdate('update');
//    		else return;
    	});
    	
    	$("#btn_search_pro").click(function(){
    		   $('#warehouseAreaList').bootstrapTable('refresh');
    	});
    	
    	$("#btn_search_location").click(function(){
 		   $('#warehouseLocationList').bootstrapTable('refresh');
    	});
    	
    	$("#driver_save_c").on("click",function () {
    		if($("#driverList").bootstrapTable('getSelections').length==1){
    			$.map($("#driverList").bootstrapTable('getSelections'), function(row) {
    				$('#driver_c').val(row.id);
    				$('#driverName_c').val(row.cnName);
    				$.hideModal('#myModal02');
                });
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
	    });
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	/*shelfRulesManager.initDropDownBox();*/
    	shelfRulesManager.validateform();
    	shelfRulesManager.searchListByPage();
    	shelfRulesManager.searchListDetailByPage()
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsDriver = function (params) {
	
	var cnName=$('#name').val();
	var mobileNo=$('#tel').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: shelfRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsArea = function (params) {
	
	var areaCode=$('#warehouseAreaCode').val();
	var areaName=$('#warehouseAreaName').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: shelfRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			enabled:'1',
			areaCode:areaCode,
			areaName:areaName,
			disabled:0
		};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsLocation = function (params) {
	
	var locationCode=$('#warehouseLocationSerchCode').val();
	var locationName=$('#warehouseLocationSerchName').val();
	var areaCode=$('#warehouseAreaCodeAdd').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: shelfRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			enabled:'1',
			locationCode:locationCode,
			locationName:locationName,
			areaCode:areaCode,
			disabled:0
		};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,仓库编码、仓库、名称
	var rulesCode=$('#rulesCode').val();
	var rulesName=$('#rulesName').val();
	var warehouseCode=$('#warehouseCode').val();
	var disabled=$('#disabled').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: shelfRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		rulesCode:rulesCode,
		rulesName:rulesName,
		warehouseCode:warehouseCode,
		disabled:disabled,
	};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsDetail = function (params) {
	//自定义查询参数
	var rulesCode=$('#rulesCodeAdd').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: shelfRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		rulesCode:rulesCode,
	};
	return temp;
};

var queryParamsWarehouse = function (params) {
	
	var warehouseCode=$('#warehouseCodePro').val();
	var warehouseCode=$('#warehouseNamePro').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: shelfRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
 //上级
$("#search_superior").click(function(){
	   shelfRulesManager.searchListByPageSJ();
	   document.getElementById("sForm").reset();
	   $('#superiorList').bootstrapTable('refresh');
	   $.showModal('#myModal02');
});

//查询仓库
$("#btn_search_s").click(function(){
	   $('#superiorList').bootstrapTable('refresh');
});

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

//查询库区
$("#searchShelRulesName").click(function(){
	   shelfRulesManager.searchPro();
	   document.getElementById("areaCodeForm").reset();
	    $('#warehouseAreaList').bootstrapTable('refresh');
		$.showModal('#myModal03');
});
//查询库位
$("#searchWarehouseLocationName").click(function(){
	   if($("#warehouseAreaCodeAdd").val() == "" || $("#warehouseAreaCodeAdd").val() == null){
		   $.toastrWarning("请选择库区在选择库位");
		   return false;
	   }
	   shelfRulesManager.searchLocation();
	   document.getElementById("locationForm").reset();
	    $('#warehouseLocationList').bootstrapTable('refresh');
		$.showModal('#myModal02');
});


$("#area_save").click(function(){
	  if($("#warehouseAreaList").bootstrapTable('getSelections').length==1){
			$.map($("#warehouseAreaList").bootstrapTable('getSelections'), function(row) {
				$('#warehouseAreaCodeAdd').val(row.areaCode);
				$("#warehouseAreaCodeAdd").trigger("input");
				$.hideModal('#myModal03');
         });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

$("#location_save").click(function(){
	  if($("#warehouseLocationList").bootstrapTable('getSelections').length==1){
			$.map($("#warehouseLocationList").bootstrapTable('getSelections'), function(row) {
				$('#warehouseLocationCode').val(row.locationCode);
				$("#warehouseLocationCode").trigger("input");
				$.hideModal('#myModal02');
       });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

$("#btn_clean").on("click",function () {
	$.clearForm("fromModal01");
});

$("#btn_areaCode_clean").on("click",function () {
	$.clearForm("areaCodeForm");
});

$("#btn_location_clean").on("click",function () {
	$.clearForm("locationForm");
});

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .shelfRulesDetail': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发查询详情的方法
	    	shelfRulesManager.type='detail';
	    	shelfRulesManager.getShelfRulesDetais(row.id,'look');
	    	$('#shelfRulesDetailManagerTable').bootstrapTable("destroy");
	    	shelfRulesManager.searchListDetailByPage();
	    },
		//删除
		'click .delete_area': function (e, value, row, index) {
			$.toastrSuccess('暂不支持删除');
		},
		'click .delete_shelf_detail': function (e, value, row, index) {
			shelfRulesManager.deleteShelfRulesDetais(row.id);
		},
		//修改库区状态
		'click .status_a': function (e, value, row, index) {
			shelfRulesManager.modifyStatus(row.id,row.disabled);
		},
	    //编辑
	    'click .edit_shelf': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	shelfRulesManager.type='edit';
			$("#rowId").val(row.id);
			shelfRulesManager.getShelfRulesDetais(row.id,'edit');
		    $("#btn_save_submit").show();
			$('#shelfRulesDetailManagerTable').bootstrapTable("destroy");
			shelfRulesManager.searchListDetailByPage();
		},
		
};

$(document).ready(function(){
	
	/*auth.managerAuth({
		//'btn_show_add':operatorManager.URL.addOperatorUrl(),
		'btn_is_true':shelfRulesManager.URL.changeCarStatusUrl(),
		'btn_is_false':shelfRulesManager.URL.changeCarStatusUrl(),
		
		'btn_save_submit':shelfRulesManager.URL.addCarUrl(),
		'btn_edit_submit':shelfRulesManager.URL.updateCar()
		
	});*/
	
	//1、初始化加载列表数据
	shelfRulesManager.init();
	//2、初始化绑定增删改查事件
	shelfRulesManager.bindEvent();
});
//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var preAllocatedRulesManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	type:'detail',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	searchListByPageUrl:function(){
    		 return '/wms/preAllocatedRules/list';
    	},
        //分页获取明细列表请求地址
    	searchListDetailByPageUrl: function () {
            return '/wms/preAllocatedRulesDetail/list';
        },//查看详情的请求地址
        getPreAllocatedDetaisUrl: function () {
            return '/wms/preAllocatedRules/queryAllocate';
        },//查看库位
        getWarehouseLocationUrl: function () {
            return '/wms/warehouseLocation/list';
        },//更新
        updatePreAllocatedRulesUrl:function(){
        	return '/wms/preAllocatedRules/updateAllocated';
        },//查询仓库
        allWarehouseUrl: function () {
            return '/wms/warehouse/allWarehouse';
        },
        addPreAllocateRulesUrl:function() {
        	return '/wms/preAllocatedRules/addPreAllocatedRules';
        },
        getWarehouseAreaUrl:function(){
        	return '/wms/warehouseArea/list';
        },
        deletePreAllocatedDetailUrl:function(){
        	return '/wms/preAllocatedRulesDetail/deletePreAllocatedDetail';
        }
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : preAllocatedRulesManager.URL.initDropDownBox(),
			async: false,
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
    /**分页获取预分配规则列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#preAllocatedRulesManagerTable",//需要分页的table ID
    		url: preAllocatedRulesManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			preAllocatedRulesManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'rulesCode',
    			title: '规则编码',
    			formatter:function(value,row,index){
					return '<a class="preAllocated_detail" href="javascript:void(0)" warehouseCode="' + row.rulesCode +'">' + row.rulesCode + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'rulesName',
    			title: '规则名称'
    		}, {
    			field: 'warehouseCode',
    			title: '仓库编码'
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
					return preAllocatedRulesManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return preAllocatedRulesManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_pre" href="javascript:void(0)" >编辑</a>';
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
    		tableId: "#preAllocateRulesDetailManagerTable",//需要分页的table ID
    		url: preAllocatedRulesManager.URL.searchListDetailByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsDetail,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			preAllocatedRulesManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
    			if(preAllocatedRulesManager.type=='detail'){
    				$(".deletePreAllocatedDetail").attr("disabled",true);
    			}
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'orderNo',
    			title: '步骤号'
    		}, {
    			field: 'propertyBatch',
    			title: '批次属性',
    			formatter:function(value,row,index){
    				if(value==10){
						return '生产日期';
					}else if(value==20){
						return '失效日期';
					}if(value==30){
						return '入库日期';
					}else if(value==40){
						return '生产批次';
					}if(value==50){
						return '供应商';
					}
    			}
    		}, {
       			field: 'sorting',
    			title: '排序',
    			formatter:function(value,row,index){
    				if(value==10){
						return '从小到大';
					}else if(value==20){
						return '从大到小';
					}
    			}
    		}, {
       			field: 'descrip',
    			title: '描述'
    		}, {
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return preAllocatedRulesManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return preAllocatedRulesManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    	    }
    		//先预留,删除功能是可以的，不要把代码删除
     		,{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-danger btn-sm deletePreAllocatedDetail" href="javascript:void(0)" >删除</a>';
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
        				url : preAllocatedRulesManager.URL.deleteUrl(),
        				data : params,
        				async: false,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#preAllocatedRulesManagerTable').bootstrapTable('refresh');
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
     * 删除规则明细
     */
    deletePreAllocatedRulesDetais:function(roleId) {
    	var params = {"id":roleId};
    	
		$.callAjax({
			type:"post",
			url : preAllocatedRulesManager.URL.deletePreAllocatedDetailUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$.toastrSuccess('删除成功');
         		$('#preAllocateRulesDetailManagerTable').bootstrapTable('refresh');
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
	getPreAllocatedDetais: function (id,type) {
    	//document.getElementById("addAnchorForm").reset();
	    //$('#addAnchorForm').bootstrapValidator('resetForm', true);
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : preAllocatedRulesManager.URL.getPreAllocatedDetaisUrl(),
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
         		$("#warehouseNameAdd").val(data.data.warehouseName);
         	    $("#disabled option[value='"+data.data.disabled+"']").attr("selected",true);
         		$("#descrip").val(data.data.descrip);
         		
          		if(type=="look"){
         			$("#myModalLabel").text("查看预分配详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			preAllocatedRulesManager.disableForm('addAnchorForm',true);
         			$('#fromSousuo').hide();
            	    $("#preDiv").hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑预分配规则");
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").show();
         			preAllocatedRulesManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
        			$('#rulesCodeAdd').attr("disabled",true);
        			$('#rulesNameAdd').attr("disabled",true);
         			$('#fromSousuo').show();
         		    $("#preDiv").show();
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
			urlValue=preAllocatedRulesManager.URL.addPreAllocateRulesUrl();
			if($("#disabledAdd").val() == "1"){
				disabledAdd = 1
			}else{
				disabledAdd = 0;
			}
			
		}if(type=="update"){ 	
			urlValue=preAllocatedRulesManager.URL.updatePreAllocatedRulesUrl();
			//状态修改取反
			if($("#disabledAdd").val() == "1"){
				disabledAdd = 0
			}else{
				disabledAdd = 1;
			}
		}
		
		var params={
				'id':$("#rowId").val(),
    			'rulesCode':$('#rulesCodeAdd').val(),
    			'rulesName':$('#rulesNameAdd').val(),
    			'disabled':disabledAdd,
    			'warehouseName':$('#warehouseNameAdd').val(),
    			'descrip':$('#descrip').val(),
    			'orderNo':$('#orderNo').val(),
    			'propertyBatch':$('#propertyBatch').val(),
    			'sorting':$('#sorting').val(),
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
             		if(type == "update"){
             			$.hideModal('#myModal');
             		}else{
                   		$('#rulesCodeAdd').val(data.data.rulesCode);
                   		$("#rowId").val(data.data.id);
             		}
        			$('#rulesCodeAdd').attr("disabled",true);
         			$('#rulesNameAdd').attr("disabled",true);
             	    $('#preAllocatedRulesManagerTable').bootstrapTable('refresh');
                 	$('#preAllocateRulesDetailManagerTable').bootstrapTable('refresh');
             			
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
			url : preAllocatedRulesManager.URL.updatePreAllocatedRulesUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#preAllocatedRulesManagerTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
	 /**查：所有仓库**/
    getAllWarehouse: function (selecteID) {
    	var params ={"viewSearchVo":{"pageSize":"999999","offset":"0"}};
		$.callAjax({
			type:"post",
			url : preAllocatedRulesManager.URL.allWarehouseUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		debugger;
         		var arr = new Array();
         		for(var item in data.rows) {
         			arr.push("<option ");
         			arr.push("value='");
         			arr.push(data.rows[item].warehouseCode);
         			arr.push("'");
         			arr.push(">");
         			arr.push(data.rows[item].warehouseName);
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
    //查询库区列表
	searchPro :function(){
		$.pageTable({
    		tableId: "#warehouseAreaList",//需要分页的table ID
    		url: preAllocatedRulesManager.URL.getWarehouseAreaUrl(),//请求后台的URL（*）
    		queryParams:queryParamsArea,
    		onLoadSuccess:function(){
    			preAllocatedRulesManager.isResetOffset = 0;
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
    		url: preAllocatedRulesManager.URL.getWarehouseLocationUrl(),//请求后台的URL（*）
    		queryParams:queryParamsLocation,
    		onLoadSuccess:function(){
    			preAllocatedRulesManager.isResetOffset = 0;
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
    		url: preAllocatedRulesManager.URL.allWarehouseUrl(),//请求后台的URL（*）
    		queryParams:queryParamsWarehouse,
    		onLoadSuccess:function(){
    			preAllocatedRulesManager.isResetOffset = 0;
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
    		  //preAllocatedRulesManager.isResetOffset = 1;
    		  $('#preAllocatedRulesManagerTable').bootstrapTable('refresh');
    	});

		    	// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
		    document.getElementById("addAnchorForm").reset();
		    $('#addAnchorForm').bootstrapValidator('resetForm', true);
		    $('#preAllocateRulesDetailManagerTable').bootstrapTable('refresh');
		    preAllocatedRulesManager.disableForm('addAnchorForm',false);
			$("#myModalLabel").text("新增预分配规则");
			$("#operatorName").val(myMain.selfCompanyName);
			$("#warehouseNameAdd").val(homepage.warehouseName);
			$("#rowId").val('');
    		$('#rulesCodeAdd').val("自动生成");
    		
    		//默认显示排序和批次属性
    		$('#propertyBatch').val("10");
    		$('#sorting').val("10");
    		
			//显示添加规则明细内容
			$("#preDiv").show();
		    $("#btn_save_submit").show();
		    $("#btn_edit_submit").hide();
		    $.showModal('#myModal');
		});
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 preAllocatedRulesManager.isResetOffset = 1;
    			 $('#preAllocatedRulesManagerTable').bootstrapTable('refresh');
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
    			preAllocatedRulesManager.addOrUpdate('add');
    		}else{
    		    return;
    		}
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
//    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
//    		bootstrapValidator.validate();
//    		if(bootstrapValidator.isValid())
    			preAllocatedRulesManager.addOrUpdate('update');
//    		else return;
    	});
	  //查询司机search_driver
    	$("#search_driver").on("click",function () {
    		preAllocatedRulesManager.searchDriver();
    		$('#driver_save').show();
    		$('#driver_save_c').hide();
    		//document.getElementById("fromModal02").reset();
    		$('#driverList').bootstrapTable('refresh');
    		$.showModal('#myModal02');
    	});
	    $("#btn_is_true").click(function(){
    		if($("#preAllocatedRulesManagerTable").bootstrapTable('getSelections').length==1){
    			$.map($("#preAllocatedRulesManagerTable").bootstrapTable('getSelections'), function(row) {
    				if(row.enabled==1){
    					$.toastrWarning("此数据已经是‘生效’状态！");
    				}else if(row.enabled==0){
    					preAllocatedRulesManager.changeAreaStatus(row.id,1);
    				}
                });
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
	    $("#btn_is_false").click(function(){
    		if($("#preAllocatedRulesManagerTable").bootstrapTable('getSelections').length==1){
    			$.map($("#preAllocatedRulesManagerTable").bootstrapTable('getSelections'), function(row) {
    				if(row.enabled==1){
    					preAllocatedRulesManager.changeAreaStatus(row.id,0);
    				}else if(row.enabled==0){
    					$.toastrWarning("此数据已经是‘失效’状态！");
    				}
                });
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
    	});
	  //btn_search_driver查询
		$("#btn_search_driver").on("click",function () {
	  		  $("#btn_search_driver").addClass("disabled");
	  		  preAllocatedRulesManager.isResetOffset = 1;
	  		  document.getElementById("fromModal02").reset();
	  		  $('#driverList').bootstrapTable('refresh');
	    });
	    $("#btn_show_deiver_c").on("click",function () {
	    	preAllocatedRulesManager.searchDriver();
	    	$('#driver_save').hide();
    		$('#driver_save_c').show();
    		document.getElementById("fromModal02").reset();
    		$('#driverList').bootstrapTable('refresh');
    		$.showModal('#myModal02');
	    });
		//driver_save保存选择的司机
    	$("#driver_save").on("click",function () {
    		if($("#driverList").bootstrapTable('getSelections').length==1){
    			$.map($("#driverList").bootstrapTable('getSelections'), function(row) {
    				$('#driver').val(row.id);
    				$('#driverName').val(row.cnName);
    				//$('#driverPhone').val(row.mobileNo);
    				$.hideModal('#myModal02');
                });
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
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
    	/*preAllocatedRulesManager.initDropDownBox();*/
    	preAllocatedRulesManager.validateform();
    	preAllocatedRulesManager.searchListByPage();
    	preAllocatedRulesManager.searchListDetailByPage()
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsDriver = function (params) {
	
	var cnName=$('#name').val();
	var mobileNo=$('#tel').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: preAllocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
			offset: preAllocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			enabled:'1',
			areaCode:areaCode,
			areaName:areaName
		};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsLocation = function (params) {
	
	var locationCode=$('#warehouseLocationCode').val();
	var locationName=$('#warehouseLocationName').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: preAllocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			enabled:'1',
			locationCode:locationCode,
			locationName:locationName
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
		offset: preAllocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
		offset: preAllocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
			offset: preAllocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
	   preAllocatedRulesManager.searchListByPageSJ();
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
	   preAllocatedRulesManager.searchPro();
	   document.getElementById("proForm").reset();
	    $('#warehouseAreaList').bootstrapTable('refresh');
		$.showModal('#myModal03');
});
//查询库位
$("#searchWarehouseLocationName").click(function(){
	   preAllocatedRulesManager.searchLocation();
	   document.getElementById("proForm").reset();
	    $('#warehouseLocationList').bootstrapTable('refresh');
		$.showModal('#myModal02');
});


$("#area_save").click(function(){
	  if($("#warehouseAreaList").bootstrapTable('getSelections').length==1){
			$.map($("#warehouseAreaList").bootstrapTable('getSelections'), function(row) {
				$('#warehouseAreaCodeAdd').val(row.areaCode);
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
				$.hideModal('#myModal02');
       });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

//查询仓库
$("#searchWarehouseName").click(function(){
	   preAllocatedRulesManager.searchWarehouse();
	   document.getElementById("proForm").reset();
	    $('#warehouseList').bootstrapTable('refresh');
	    $.showModal('#myModal04');
});


$("#btn_clean").on("click",function () {
	$.clearForm("fromModal01");
});

$("#emp_save").click(function(){
	  if($("#empList").bootstrapTable('getSelections').length==1){
			$.map($("#empList").bootstrapTable('getSelections'), function(row) {
				
				$('#deliveryHeadId').val(row.id);
				$('#deliveryHead').val(row.cnName);
				$.hideModal('#myModal03');
           });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .preAllocated_detail': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发查询详情的方法
	    	preAllocatedRulesManager.type='detail';
	    	preAllocatedRulesManager.getPreAllocatedDetais(row.id,'look');
			$('#preAllocateRulesDetailManagerTable').bootstrapTable('refresh');
	    },
		//删除
		'click .delete_pre': function (e, value, row, index) {
			$.toastrSuccess('暂不支持删除');
			//preAllocatedRulesManager.deleteCars(row.id);
		},
		//删除
		'click .deletePreAllocatedDetail': function (e, value, row, index) {
			preAllocatedRulesManager.deletePreAllocatedRulesDetais(row.id);
		},
		
		//修改预分配状态
		'click .status_a': function (e, value, row, index) {
			preAllocatedRulesManager.modifyStatus(row.id,row.disabled);
		},
	    //编辑
	    'click .edit_pre': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
			$("#rowId").val(row.id);
			preAllocatedRulesManager.getPreAllocatedDetais(row.id,'edit');
			//默认选择中批次属性、排序
			$("#propertyBatch").val(10);
			$("#sorting").val(10);
			preAllocatedRulesManager.type='edit';
			$('#preAllocateRulesDetailManagerTable').bootstrapTable("destroy");
			preAllocatedRulesManager.searchListDetailByPage();
			
		},
		
};

$(document).ready(function(){
	
	/*auth.managerAuth({
		//'btn_show_add':operatorManager.URL.addOperatorUrl(),
		'btn_is_true':preAllocatedRulesManager.URL.changeCarStatusUrl(),
		'btn_is_false':preAllocatedRulesManager.URL.changeCarStatusUrl(),
		
		'btn_save_submit':preAllocatedRulesManager.URL.addCarUrl(),
		'btn_edit_submit':preAllocatedRulesManager.URL.updateCar()
		
	});*/
	
	//1、初始化加载列表数据
	preAllocatedRulesManager.init();
	//2、初始化绑定增删改查事件
	preAllocatedRulesManager.bindEvent();
});
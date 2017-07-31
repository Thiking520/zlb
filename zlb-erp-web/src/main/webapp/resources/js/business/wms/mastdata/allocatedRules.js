//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS'
 
// javascript 模块化
var allocatedRulesManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	type:'detail',
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/allocatedRules/list';
        },//分页获取明细列表请求地址
    	searchListDetailByPageUrl: function () {
            return '/wms/allocatedRulesDetail/list';
        },//查看详情的请求地址
        getAllocatedDetaisUrl: function () {
            return '/wms/allocatedRules/queryAllocate';
        },//查看库位
        getWarehouseLocationUrl: function () {
            return '/wms/warehouseLocation/list';
        },//更新
        updateAllocatedUrl:function(){
        	return '/wms/allocatedRules/updateAllocated';
        },//查询仓库
        allWarehouseUrl: function () {
            return '/wms/warehouse/allWarehouse';
        },
        addAllocatedRulesUrl:function() {
        	return '/wms/allocatedRules/addAllocatedRules';
        },
        getWarehouseAreaUrl:function(){
        	return '/wms/warehouseArea/list';
        },
        deleteAllocatedDetailUrl:function(){
        	return '/wms/allocatedRulesDetail/deleteAllocatedDetail';
        }
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : allocatedRulesManager.URL.initDropDownBox(),
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
    /**分页获取分配规则列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#allocatedRulesManagerTable",//需要分页的table ID
    		url: allocatedRulesManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			allocatedRulesManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'rulesCode',
    			title: '规则编码',
    			formatter:function(value,row,index){
					return '<a class="allocated_code" href="javascript:void(0)" warehouseCode="' + row.rulesCode +'">' + row.rulesCode + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'rulesName',
    			title: '规则名称'
    		}, {
    			field: 'warehouseCode',
    			title: '仓库编码'
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
					return allocatedRulesManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return allocatedRulesManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_allocated" href="javascript:void(0)" >编辑</a>';
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
    		tableId: "#allocatedRulesDetailManagerTable",//需要分页的table ID
    		url: allocatedRulesManager.URL.searchListDetailByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsDetail,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			allocatedRulesManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
    			if(allocatedRulesManager.type=='detail'){
    				$(".deleteAllocatedDetail").attr("disabled",true);
    			}
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'orderNo',
    			title: '步骤号'
    		}, {
    			field: 'locationRevolve',
    			title: '库位周转',
				formatter:function(value,row,index){
					if(value==10){
						return '快速周转';
					}else if(value==20){
						return '中速周转';
					}else if(value==30){
						return '慢速周转';
					}
				}
    		}, {
       			field: 'locationType',
    			title: '库位类型',
    			formatter:function(value,row,index){
					if(value==10){
						return '货架';
					}else if(value==20){
						return '托盘';
					}else if(value==30){
						return '地面平仓';
					}
				}
    		}, {
       			field: 'outType',
    			title: '出库类型',
    			formatter:function(value,row,index){
					if(value==10){
						return '销售订单';
					}else if(value==20){
						return '返厂订单';
					}else if(value==30){
						return '换货订单';
					}else if(value==40){
						return '调拨订单';
					}else if(value==50){
						return '拼团订单';
					}
				}
    		}, {
       			field: 'locationUse',
    			title: '库位使用',
    			formatter:function(value,row,index){
					if(value==10){
						return '收货默认存放库位 "一个仓库这种类型库位只能设置一个"';
					}else if(value==20){
						return '拣货默认存放库位 "一个仓库这种类型库位只能设置一个"';
					}else if(value==30){
						return '件拣货库位';
					}else if(value==40){
						return '箱拣货库位';
					}else if(value==50){
						return '存储库位';
					}else if(value==60){
						return '过渡库位';
					}else if(value==70){
						return '理货工作区';
					}else if(value==80){
						return '组装工作区';
					}else if(value==90){
						return '复核工作区';
					}else if(value==91){
						return '包装工作区';
					}
				}
    		}, {
       			field: 'locationProperty',
    			title: '库位属性',
    			formatter:function(value,row,index){
					if(value==10){
						return '良品';
					}else if(value==20){
						return '残品';
					}else if(value==30){
						return '封存';
					}
				}
    		}, {
       			field: 'areaOne',
    			title: '库区1'
    		}, {
       			field: 'areaTwo',
    			title: '库区2'
    		}, {
       			field: 'areaThree',
    			title: '库区3'
    		}, {
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return allocatedRulesManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return allocatedRulesManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    	    }
     		,{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-danger btn-sm deleteAllocatedDetail" href="javascript:void(0)" >删除</a>';
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    } 
    		]
    	});
    },
    /**
     * 删除规则明细
     */
    deleteAllocatedRulesDetais:function(roleId) {
    	var params = {"id":roleId};
    	
		$.callAjax({
			type:"post",
			url : allocatedRulesManager.URL.deleteAllocatedDetailUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$.toastrSuccess('删除成功');
         		$('#allocatedRulesDetailManagerTable').bootstrapTable('refresh');
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
	getAllocatedDetais: function (id,type) {
    	//document.getElementById("addAnchorForm").reset();
	    //$('#addAnchorForm').bootstrapValidator('resetForm', true);
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : allocatedRulesManager.URL.getAllocatedDetaisUrl(),
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
				if (data.data.disabled == true) {
					$("#disabledAdd").val(1);
				} else {
					$("#disabledAdd").val(0);
				}
          		if(type=="look"){
         			$("#myModalLabel").text("查看分配规则");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			allocatedRulesManager.disableForm('addAnchorForm',true);
         			$('#fromSousuo').hide();
         			$('#allDiv').hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑分配规则");
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").show();
         			allocatedRulesManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
         			$('#fromSousuo').show();
         			$('#allDiv').show();
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
			urlValue=allocatedRulesManager.URL.addAllocatedRulesUrl();
			if($("#disabledAdd").val() == "1"){
				disabledAdd = 1
			}else{
				disabledAdd = 0;
			}
			
		}if(type=="update"){
			urlValue=allocatedRulesManager.URL.updateAllocatedUrl();
			
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
    			'warehouseCode':$('#warehouseCodeAdd').val(),
    			'warehouseName':$('#warehouseNameAdd').val(),
    			'descrip':$('#descrip').val(),
    			'orderNo':$('#orderNo').val(),
    			'outType':$('#outType').val(),
    			'locationRevolve':$('#locationRevolve').val(),
    			'locationType':$('#locationType').val(),
    			'unit':$('#unit').val(),
    			'locationUse':$('#locationUse').val(),
    			'locationProperty':$('#locationProperty').val(),
    			'areaOne':$('#warehouseAreaOne').val(),
    			'areaTwo':$('#warehouseAreaTwo').val(),
    			'areaThree':$('#warehouseAreaThree').val(),
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
         		
             	    $('#allocatedRulesManagerTable').bootstrapTable('refresh');
                 	$('#allocatedRulesDetailManagerTable').bootstrapTable('refresh');
             			
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
	            warehouseAreaOne: {
	                validators: {
	                    notEmpty: {message: '库区1不能为空！'},
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
			url : allocatedRulesManager.URL.updateAllocatedUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#allocatedRulesManagerTable').bootstrapTable('refresh');
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
			url : allocatedRulesManager.URL.allWarehouseUrl(),
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
    		url: allocatedRulesManager.URL.getWarehouseAreaUrl(),//请求后台的URL（*）
    		queryParams:queryParamsArea,
    		onLoadSuccess:function(){
    			allocatedRulesManager.isResetOffset = 0;
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
    		url: allocatedRulesManager.URL.getWarehouseLocationUrl(),//请求后台的URL（*）
    		queryParams:queryParamsLocation,
    		onLoadSuccess:function(){
    			allocatedRulesManager.isResetOffset = 0;
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
    		url: allocatedRulesManager.URL.allWarehouseUrl(),//请求后台的URL（*）
    		queryParams:queryParamsWarehouse,
    		onLoadSuccess:function(){
    			allocatedRulesManager.isResetOffset = 0;
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
    		  //allocatedRulesManager.isResetOffset = 1;
    		  $('#allocatedRulesManagerTable').bootstrapTable('refresh');
    	});

		    	// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
		    document.getElementById("addAnchorForm").reset();
		    $('#addAnchorForm').bootstrapValidator('resetForm', true);
		    $('#allocatedRulesDetailManagerTable').bootstrapTable('refresh');
		    allocatedRulesManager.disableForm('addAnchorForm',false);
			$("#myModalLabel").text("新增分配规则");
			$("#operatorName").val(myMain.selfCompanyName);
			$("#warehouseNameAdd").val(homepage.warehouseName);
			$("#rowId").val('');
    		$('#rulesCodeAdd').val("自动生成");
		    $("#btn_save_submit").show();
		    $("#btn_edit_submit").hide();
		    $('#allDiv').show();
		    $.showModal('#myModal');
		});
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 allocatedRulesManager.isResetOffset = 1;
    			 $('#allocatedRulesManagerTable').bootstrapTable('refresh');
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
	    	    };
	    	    
    			allocatedRulesManager.addOrUpdate('add');
    		}else{
    		    return;
    		}
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
    		 allocatedRulesManager.addOrUpdate('update');
    	});
    	
    	$("#btn_search_pro").click(function(){
    		   $('#warehouseAreaList').bootstrapTable('refresh');
    	});
    	
    	$("#btn_search_location").click(function(){
 		   $('#warehouseLocationList').bootstrapTable('refresh');
    	});
    	
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	/*allocatedRulesManager.initDropDownBox();*/
    	allocatedRulesManager.validateform();
    	allocatedRulesManager.searchListByPage();
    	allocatedRulesManager.searchListDetailByPage()
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsDriver = function (params) {
	
	var cnName=$('#name').val();
	var mobileNo=$('#tel').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: allocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
			offset: allocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
	
	var locationCode=$('#warehouseLocationCode').val();
	var locationName=$('#warehouseLocationName').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: allocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
		offset: allocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
		offset: allocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		rulesCode:rulesCode,
	};
	return temp;
};

var queryParamsWarehouse = function (params) {
	
	var warehouseCode=$('#warehouseCodePro').val();
	var warehouseName=$('#warehouseNamePro').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: allocatedRulesManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
 //上级
$("#search_superior").click(function(){
	   allocatedRulesManager.searchListByPageSJ();
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
$("#searchAllOne").click(function(){
	   allocatedRulesManager.searchPro();
	   document.getElementById("areaCodeForm").reset();
	    $('#warehouseAreaList').bootstrapTable('refresh');
	    $('#flag').val("searchAllOne");
		$.showModal('#myModal03');
});

$("#searchAllTwo").click(function(){
	   allocatedRulesManager.searchPro();
	   document.getElementById("areaCodeForm").reset();
	   $('#flag').val("searchAllTwo");
	   $('#warehouseAreaList').bootstrapTable('refresh');
	   $.showModal('#myModal03');
		
});

$("#searchAllThree").click(function(){
	   allocatedRulesManager.searchPro();
	   document.getElementById("areaCodeForm").reset();
	    $('#flag').val("searchAllThree");
	   $('#warehouseAreaList').bootstrapTable('refresh');
	   $.showModal('#myModal03');
		
});

$("#area_save").click(function(){
	  if($("#warehouseAreaList").bootstrapTable('getSelections').length==1){
			$.map($("#warehouseAreaList").bootstrapTable('getSelections'), function(row) {
				if($('#flag').val()=="searchAllTwo"){
					$('#warehouseAreaTwo').val(row.areaCode);
					$("#warehouseAreaTwo").trigger("input");
				}else if($('#flag').val()=="searchAllOne"){
					$('#warehouseAreaOne').val(row.areaCode);
					$("#warehouseAreaOne").trigger("input");
				}else{
					$('#warehouseAreaThree').val(row.areaCode);
					$("#warehouseAreaThree").trigger("input");
				}
 
				
				$.hideModal('#myModal03');
       });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

$("#btn_clean").on("click",function () {
	$.clearForm("fromModal01");
});

$("#btn_area_clean").on("click",function () {
	$.clearForm("areaCodeForm");
});
 
//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .allocated_code': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发查询详情的方法
	    	allocatedRulesManager.type='detail';
	    	allocatedRulesManager.getAllocatedDetais(row.id,'look');
	    	$('#allocatedRulesDetailManagerTable').bootstrapTable('refresh');
	    },
		//删除
		'click .deleteAllocatedDetail': function (e, value, row, index) {
			allocatedRulesManager.deleteAllocatedRulesDetais(row.id);
		},
		//修改库区状态
		'click .status_a': function (e, value, row, index) {
			allocatedRulesManager.modifyStatus(row.id,row.disabled);
		},
	    //编辑
	    'click .edit_allocated': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	allocatedRulesManager.type='edit';
			$("#rowId").val(row.id);
			allocatedRulesManager.getAllocatedDetais(row.id,'edit');
			$('#allocatedRulesDetailManagerTable').bootstrapTable("destroy");
			allocatedRulesManager.searchListDetailByPage();
		
		},
		
};

$(document).ready(function(){
	//1、初始化加载列表数据
	allocatedRulesManager.init();
	//2、初始化绑定增删改查事件
	allocatedRulesManager.bindEvent();
});
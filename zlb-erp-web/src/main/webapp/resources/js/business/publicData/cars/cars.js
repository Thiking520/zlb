//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var carsManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/cars/list';
        },//删除车辆的请求地址
        deleteUrl: function () {
            return '/publicData/cars/deleteCars';
        },//查看车辆详情的请求地址
        getCarsDetaisUrl: function () {
            return '/publicData/cars/queryCarsDetails';
        },//查看车辆详情的请求地址
        addCarUrl: function () {
            return '/publicData/cars/addCars';
        },//更新车辆状态
        changeCarStatusUrl: function () {
            return '/publicData/cars/updateCarsStatus';
        },//更新
        updateCar:function(){
        	return '/publicData/cars/updateCars';
        },//司机列表
        driverListUrl: function () {
            return '/tms/emp/list';
        },//初始化下拉框
        initDropDownBox: function () {
            return '/publicData/cars/initDropDownBox';
        },
        checkPlateNumberUrl:function() {
        	return '/publicData/cars/checkPlateNumber'
        }
        
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : carsManager.URL.initDropDownBox(),
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
    
    /**
     * 校验车牌号
     */
    checkPlateNumber: function (plateNumber,carId) {
    	var params = {"carNumber":plateNumber,"id":carId};
    	var result = true;
    	$.callAjax({
			type:"post",
			url : carsManager.URL.checkPlateNumberUrl(),
			data:params,
			async: false,
			success : function(data){
         		result = data;
			},
			error : function(){
				$.toastrError();
			}
		});
    	return result;
    },
    
    /**分页获取车辆列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#carsManagerTable",//需要分页的table ID
    		url: carsManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			carsManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'carId',
    			title: '编码',
    			align: 'center',
    			formatter:function(value,row,index){
					return '<a class="carsDetail_a" href="javascript:void(0)" carId="' + row.carId +'">' + row.carId + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'carNumber',
    			title: '车牌号',
    			align: 'center',
    		}, {
    			field: 'enabled',
    			title: '状态',
    		    align: 'center',
    			formatter:function(value,row,index){
					if(commonActiveArr[value] == "失效") {
						return '<span style="color:red">'+commonActiveArr[value]+'</span>'
					} else {
						return commonActiveArr[value];
					}
    			}
    		}, {
    			field: 'weight',
    			title: '载重（吨）',
    		    align: 'center'
    		}, {
    			field: 'length',
    			title: '长*宽*高(体积m³)',
    			align: 'center',
    			
		    	formatter:function(value,row,index){
		    		var length=row.length==null?0:row.length;
		    		var width=row.width==null?0:row.width;
		    		var high=row.high==null?0:row.high;
		    		var volume = length*width*high;
		    		volume = volume.toFixed(2);
					return length+" * "+width+" * "+high+"(" + row.volume +")";
    			}
    		}, {
    			field: 'carType',
    			title: '车辆类型',
    		    align: 'center',
    			formatter:function(value,row,index){
    				return carTypeArr[value];
    			}
    		}, {
    			field: 'region',
    			title: '干线\区线',
    		    align: 'center',
    			formatter:function(value,row,index){
    				return regionArr[value];
    			}
    		}, {
    			field: 'selfSupport',
    			title: '自营\外包',
    		    align: 'center',
    			formatter:function(value,row,index){
    				return selfSupportArr[value];
    			}
    		}, {
    			field: 'isTransportLiquid',
    			title: '配送液体、冻品、冷藏品',
    		    align: 'center',
    			formatter:function(value,row,index){
    				var isTransportLiquid = row.isTransportLiquid==1?'是':'否';
    				var isTransportFreezing = row.isTransportFreezing==1?'是':'否';
    				var isTransportStorage = row.isTransportStorage==1?'是':'否';
    				return isTransportLiquid + " -- " + isTransportFreezing + " -- " + isTransportStorage
    			}
    		}, {
    			field: 'driverName',
    			title: '司机',
    		    align: 'center'
    		}, {
    			field: 'describes',
    			title: '描述',
    		    align: 'center'
    		},/* {
    			field: 'creatorName',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'createTime',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return carsManager.format(row.createTime,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'updateTime',
    			title: '修改记录',
    		    align: 'center',
				formatter:function(value,row,index){
					var name = row.modifierName==null?"":row.modifierName
					var time = row.updateTime==null?"":carsManager.format(row.updateTime,"yyyy-MM-dd HH:mm:ss");
					return name +"</br>" + time;
				}
    		},*/{
    			field: 'id',
    			title: '操作',
    			align: 'center',
    	        formatter:function(value,row,index){
    	        	//注释掉按钮的权限控制
    	        	/*var loadUpdateUrl=carsManager.URL.deleteUrl();
    				var html='';
    				if(auth.isAuth(loadUpdateUrl)){
    					html='<a class="btn btn-success deleteCars_a" href="javascript:void(0)" >删除</a>';
    				}
    				
    	        	html+="";
    	        	
    	        	var loadUpdateUrl=carsManager.URL.getCarsDetaisUrl();
    				var html='';
    				if(auth.isAuth(loadUpdateUrl)){
    					html+='<a class="btn btn-info editCars_a" href="javascript:void(0)" >编辑</a>';
    				}*/
    	        	var html='<a class="btn btn-sm btn-primary editCars_a" href="javascript:void(0)" >编辑</a><a class="btn btn-sm btn-danger deleteCars_a" href="javascript:void(0)" >删除</a>';
    	            return html; 
    	        },
    	        events: 'operateEvents'
    	    }  
    		]
    	});
    },
    /**删：删除车辆**/
    deleteCars: function (carsId) {
    	$.dialogConfirm({
            message: '您确定要删除车辆ID为['+carsId+']的车辆吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":carsId};
        			$.callAjax({
        				url : carsManager.URL.deleteUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#carsManagerTable').bootstrapTable('refresh');
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
     * 改变车辆状态
     */
    changeCarsStatus:function (id,enabled){
    	var params={
    		"ids":id,
    		"enabled":enabled	
    	}
    	$.callAjax({
			type:"post",
			url : carsManager.URL.changeCarStatusUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$('#carsManagerTable').bootstrapTable('refresh');
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
    getCarsDetais: function (id,type) {
    	document.getElementById("addAnchorForm").reset();
	    $('#addAnchorForm').bootstrapValidator('resetForm', true);
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : carsManager.URL.getCarsDetaisUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         		}
         		
         		$("#carId").val(data.data.carId);
         		/*$("#enabled option[value='"+ data.data.enabled+"']").attr("selected",true);*/
         		$("#enabled").val(data.data.enabled);
         		
         		$("#operatorId").val(data.data.operatorId);
         		$("#operatorName").val(data.data.operatorName);
         		$("#carNumber").val(data.data.carNumber);
         		$("#city").val(data.data.city);
         		$("#driver").val(data.data.driver);
         		$("#driverName").val(data.data.driverName);
         		/*$("#carType option[value='"+ data.data.carType+"']").attr("selected",true);*/
         		$("#carType").val(data.data.carType);
         		
         		/*$("#region option[value='"+ data.data.region+"']").attr("selected",true);*/
         		$("#region").val(data.data.region);
         		
         		$("#selfSupport option[value='"+ data.data.selfSupport+"']").attr("selected",true);
         		$("#selfSupport").val(data.data.selfSupport);
         		
         		$("#length").val(data.data.length);
         		$("#width").val(data.data.width);
         		$("#high").val(data.data.high);
         		$("#volume").val(data.data.volume);
         		$("#weight").val(data.data.weight);
         		//data.data.isTransportLiquid
         		//等于 1 被选中
         		var checkElements=document.getElementsByName('isTransportLiquid');  
                for(var i=0;i<checkElements.length;i++){  
                    var checkElement=checkElements[i];  
                    if(data.data.isTransportLiquid==1){
                    	checkElement.checked="checked";  
                    }
                } 
                
                var checkElements=document.getElementsByName('isTransportFreezing');  
                for(var i=0;i<checkElements.length;i++){  
                    var checkElement=checkElements[i];  
                    if(data.data.isTransportFreezing==1){
                    	checkElement.checked="checked";  
                    }
                }  
                
                var checkElements=document.getElementsByName('isTransportStorage');  
                for(var i=0;i<checkElements.length;i++){  
                    var checkElement=checkElements[i];  
                    if(data.data.isTransportStorage==1){
                    	checkElement.checked="checked";  
                    }
                }
                
         		$("#describes").val(data.data.describes);
         		
         		if(type=="look"){
         			$("#myModalLabel").text("查看车辆详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			carsManager.disableForm('addAnchorForm',true);
         			 $('#fromSousuo').hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑车辆");
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").hide();
         			carsManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
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
		var checkResult;
		if(type=="add"){
			urlValue=carsManager.URL.addCarUrl();
			checkResult = carsManager.checkPlateNumber($('#carNumber').val(),null);
		}if(type=="update"){
			urlValue=carsManager.URL.updateCar();
			checkResult = carsManager.checkPlateNumber($('#carNumber').val(),$("#rowId").val());
		}
		var params={
				'id':$.ToCDB($("#rowId").val()),
    			'carId':$.ToCDB($('#carId').val()),
    			'operatorId':$.ToCDB($('#operatorId').val()),	
    			'carNumber':$.ToCDB($('#carNumber').val()),
    			'enabled':$.ToCDB($("#enabled").val()),
    			'province':$.ToCDB($('#province').val()),
    			'city':$.ToCDB($('#city').val()),
    			'weight':$.ToCDB($('#weight').val()),	
    			'length':$.ToCDB($('#length').val()),
    			'width':$.ToCDB($('#width').val()),
    			'high':$.ToCDB($('#high').val()),
    			'volume':$.ToCDB($('#volume').val()),
    			'carType':$.ToCDB($('#carType').val()),	
    			'region':$.ToCDB($('#region').val()),
    			'selfSupport':$.ToCDB($('#selfSupport').val()),
    			'isTransportLiquid':document.getElementById('isTransportLiquid').checked?1:0,
    			'isTransportFreezing':document.getElementById('isTransportFreezing').checked?1:0,
    			'isTransportStorage':document.getElementById('isTransportStorage').checked?1:0,	
    			'driver':$.ToCDB($('#driver').val()),
    			'describes':$.ToCDB($('#describes').val())
    		}
			
			if(checkResult) {
				$.toastrWarning('该车牌号已经存在');
				return;
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
             		$.hideModal('#myModal');
             		$('#carsManagerTable').bootstrapTable('refresh');
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
	        	/*carId: {
	                validators: {
	                    notEmpty: {
	                        message: 'key值不能为空！'
	                    },
	                    stringLength: {
                            min: 4,
                            max: 11,
                            message: '用户名长度必须在4到11位之间'
                        },
	                }
	            },*/
	        	carNumber: {
	                validators: {
	                    notEmpty: {
	                        message: '车牌号不能为空！'
	                    },
	                    stringLength: {
                            min: 4,
                            max: 11,
                            message: '车牌号长度必须在4到11位之间'
                        }
	                }
	            },
	            city: {
	                validators: {
	                    notEmpty: {message: '车牌所在地不能为空！'}
	                }
	            },
	            driverName: {
	                validators: {
	                    notEmpty: {message: '司机不能为空！'}
	                }
	            },
	            operatorId: {
	                validators: {
	                    notEmpty: {message: '运营商不能为空！'}
	                }
	            },
	            length:{
	            	validators:{
	            		numeric:{message:'请输入数值'}
	            	}
	            },
	            width:{
	            	validators:{
	            		numeric:{message:'请输入数值'}
	            	}
	            },
	            high:{
	            	validators:{
	            		numeric:{message:'请输入数值'}
	            	}
	            },
	            volume:{
	            	validators:{
	            		numeric:{message:'请输入数值'}
	            	}
	            },
	            weight:{
	            	validators:{
	            		numeric:{message:'请输入数值'}
	            	}
	            }
	            
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
  //查询司机列表
	searchDriver :function(){
		$.pageTable({
    		tableId: "#driverList",//需要分页的table ID
    		url: carsManager.URL.driverListUrl(),//请求后台的URL（*）
    		queryParams:queryParamsDriver,
    		onLoadSuccess:function(){
    			carsManager.isResetOffset = 0;
    			$("#btn_search_driver").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			align: 'center',
    			field: 'cnName',
    			title: '姓名'
    		},{
    			align: 'center',
    			field: 'mobileNo',
    			title: '手机号码'
    		}
    		]
    	});
	},
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  $("#btn_search").addClass("disabled");
    		  carsManager.isResetOffset = 1;
    		  $('#carsManagerTable').bootstrapTable('refresh');
    	});
    	
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		
    		$("#btn_cancel").off("click");
	    	//按钮文字更换
	    	$("#btn_cancel").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消');
	    	//去掉关闭属性
	    	$("#btn_cancel").removeAttr('data-dismiss');
	    	//绑定点击取消弹出提示框事件
	 		 $("#btn_cancel").on("click",function() {
	 			 $.modalCancel("addAnchorForm","myModal");
	 		 })
    		 document.getElementById("addAnchorForm").reset();
    		 $('#addAnchorForm').data('bootstrapValidator').resetForm();
    		 $("#myModalLabel").text("新增车辆");
    		 $("#operatorName").val(myMain.selfCompanyName);
		     $("#btn_save_submit").show();
		     $("#btn_edit_submit").hide();
		     carsManager.disableForm('addAnchorForm',false);
  			 $('#operatorName').attr("disabled",true);
  			 $('#fromSousuo').show();
		     $.showModal('#myModal');
		     
		     $("#driverName").css("width","199px");
	    });
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 carsManager.isResetOffset = 1;
    			 $('#carsManagerTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			carsManager.addOrUpdate('add');
    		else return;
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			carsManager.addOrUpdate('update');
    		else return;
    	});
	  
	  //查询司机search_driver
    	$("#search_driver").on("click",function () {
    		carsManager.searchDriver();
    		$('#driver_save').show();
    		$('#driver_save_c').hide();
    		document.getElementById("fromModal02").reset();
    		$('#driverList').bootstrapTable('refresh');
    		$.showModal('#myModal02');
    	});
	    $("#btn_is_true").click(function(){
	    	var status = false;
	    	if($("#carsManagerTable").bootstrapTable('getSelections').length>0){
	    		var ids = new Array();
		    	$.map($("#carsManagerTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==0){
						status = true;
		    			ids.push(row.id);
					}
	            });
		    	if(!status) {
	    			$.toastrWarning("已经是‘生效’状态！");
	    			return;
	    		}
		    	carsManager.changeCarsStatus(ids,1);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
	    	
    	});
	    $("#btn_is_false").click(function(){
	    	var status = false;
	    	if($("#carsManagerTable").bootstrapTable('getSelections').length>0){
	    		var ids = new Array();
		    	$.map($("#carsManagerTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==1){
						status = true;
		    			ids.push(row.id);
					}
	            });
		    	if(!status) {
	    			$.toastrWarning("已经是‘失效’状态！");
	    			return;
	    		}
		    	carsManager.changeCarsStatus(ids,0);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
	    	
    	});
	  //btn_search_driver查询
		$("#btn_search_driver").on("click",function () {
	  		  $("#btn_search_driver").addClass("disabled");
	  		  carsManager.isResetOffset = 1;
	  		  $('#driverList').bootstrapTable('refresh');
	    });
	    $("#btn_show_deiver_c").on("click",function () {
	    	carsManager.searchDriver();
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
    				$('#addAnchorForm').data('bootstrapValidator').resetForm();
	     			var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
	     	    	bootstrapValidator.validate();
    				//$('#driverPhone').val(row.mobileNo);
    				
    				$.hideModal('#myModal02');
                });
    		}else{
    			$.toastrWarning("请选择一条数据进行操作！");
    		}
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
    	carsManager.initDropDownBox();
    	carsManager.validateform();
		carsManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsDriver = function (params) {
	
	var cnName=$.ToCDB($('#name').val());
	var mobileNo=$.ToCDB($('#tel').val());
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: carsManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
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
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	var carId=$.ToCDB($('#carId_c').val());
	var carNumber=$.ToCDB($('#carNumber_c').val());
	var driver=$('#driver_c').val();
	var carType=$('#carType_c').val();
	var enabled=$('#enabled_c').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: carsManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		carNumber:carNumber,
		driver:driver,
		carType:carType,
		enabled:enabled,
		carId:carId
	};
	return temp;
};

function cleanSearch() {
	document.getElementById("searchForm").reset();
	//清除司机选择
	driver=$('#driver_c').val("");
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .carsDetail_a': function (e, value, row, index) {
	    	//按钮文字更换
	    	$("#btn_cancel").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭');
	    	//增加窗口关闭属性
	    	$("#btn_cancel").attr('data-dismiss','modal');
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	$("#btn_cancel").off("click");
	    	//触发查询详情的方法
	    	carsManager.getCarsDetais(row.id,'look');
	    	$("#driverName").css("width","239px");
	    	$(".modal-body input").css("background-color","white");
	    	$(".modal-body select").css("background-color","white");
	    },
		//删除
		'click .deleteCars_a': function (e, value, row, index) {
			
			carsManager.deleteCars(row.id);
		},
	    //编辑
	    'click .editCars_a': function (e, value, row, index) {
	    	$("#btn_cancel").off("click");
	    	//按钮文字更换
	    	$("#btn_cancel").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消');
	    	//去掉关闭属性
	    	$("#btn_cancel").removeAttr('data-dismiss');
	    	//绑定点击取消弹出提示框事件
	 		 $("#btn_cancel").on("click",function() {
	 			 $.modalCancel("addAnchorForm","myModal");
	 		 })
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
			$("#rowId").val(row.id);
			carsManager.getCarsDetais(row.id,'edit');
			$("#driverName").css("width","199px");
		}
		
};

$(document).ready(function(){
	
	/*auth.managerAuth({
		//'btn_show_add':operatorManager.URL.addOperatorUrl(),
		'btn_is_true':carsManager.URL.changeCarStatusUrl(),
		'btn_is_false':carsManager.URL.changeCarStatusUrl(),
		
		'btn_save_submit':carsManager.URL.addCarUrl(),
		'btn_edit_submit':carsManager.URL.updateCar()
		
	});*/
	
	//1、初始化加载列表数据
	carsManager.init();
	//2、初始化绑定增删改查事件
	carsManager.bindEvent();
});
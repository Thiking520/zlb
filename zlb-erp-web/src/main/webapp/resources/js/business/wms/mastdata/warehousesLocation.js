//定义下拉框数组
var carTypeArr=[];
var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var areaArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var warhouseLocationManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/warehouseLocation/list';
        },//删除的请求地址
        deleteUrl: function () {
            return '/publicData/cars/deleteCars';
        },//查看库位详情的请求地址
        getWarehouseLocationDetaisUrl: function () {
            return '/wms/warehouseLocation/queryLocationDetails';
        },//更新
        updateLocation:function(){
        	return '/wms/warehouseLocation/updateWarehouseLocation';
        },//获取所有运营商列表
        addLocationUrl:function() {
        	return '/wms/warehouseLocation/addWarehouseLocation';
        },
        searchAreaUrl:function() {
        	return '/wms/warehouseArea/list';
        },
        initDropDownBox:function(){
        	return '/wms/warehouseArea/queryList';
        }
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : warhouseLocationManager.URL.initDropDownBox(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		for(var i=0;i<data.data.rows.length;i++){
         			$('#areaCode').append("<option value='"+data.data.rows[i].areaCode+"'>"+data.data.rows[i].areaName+"</option>");
         		}
			},
			error : function(){
				$.toastrError();
			}
		});
    	
    },
    /**分页获取库区列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#warhouseLocationManagerTable",//需要分页的table ID
    		url: warhouseLocationManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			warhouseLocationManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'locationCode',
    			title: '库位编码',
    			formatter:function(value,row,index){
					return '<a class="warehouse_location" href="javascript:void(0)" locationCode="' + row.locationCode +'">' + row.locationCode + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'locationName',
    			title: '库位名称'
    		}, {
    			field: 'areaCode',
    			title: '库区编码'
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
    			field: 'locationUse',
    			title: '库位使用',
    			align: 'center',
				formatter:function(value,row,index){
    				if(value==10){
						return '收货默认存放库位';
					}else if(value==20){
						return '拣货默认存放库位';
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
    			field: 'locationType',
    			title: '库位类型',
    			align: 'center',
      			formatter:function(value,row,index){
      				if(value==10){
  						return '货架';
  					}else if(value==20){
  						return '托盘';
  					}else if(value==30){
  						return '地面';
  					}
      			}
    		}, {
    			field: 'cycle',
    			title: '循环周期',
				align: 'center',
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
    			field: 'locationAttribute',
    			title: '库位属性',
    			align: 'center',
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
    			field: 'warm',
    			title: '温度要求',
				align: 'center',
      			formatter:function(value,row,index){
      				if(value==10){
  						return '冷藏';
  					}else if(value==20){
  						return '冷冻';
  					}else if(value==30){
  						return '常温';
  					}
          		}
    		}, {
    			field: 'hybridSku',
    			title: '允许混放SKU',
    			align: 'center',
      			formatter:function(value,row,index){
      				if(value==true){
  						return '是';
  					}else if(value==false){
  						return '否';
  					}
      			}
    		}, {
    			field: 'hybridBatch',
    			title: '允许混放批次',
    			align: 'center',
      			formatter:function(value,row,index){
      				if(value==true){
  						return '是';
  					}else if(value==false){
  						return '否';
  					}
      			}
    		}, {
    			field: 'length',
    			title: '长（CM）'
    		}, {
    			field: 'wide',
    			title: '宽（CM）'
    		}, {
    			field: 'height',
    			title: '高（CM）'
    		}, {
    			field: 'xPoint',
    			title: 'X坐标'
    		}, {
    			field: 'yPoint',
    			title: 'Y坐标'
    		}, {
    			field: 'creator',
    			title: '创建人',
    		    align: 'center'
    		}, {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return warhouseLocationManager.format(row.created,"yyyy-MM-dd HH:mm:ss");
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
					return warhouseLocationManager.format(row.modified,"yyyy-MM-dd HH:mm:ss");
				}
    		}, {
    			field: 'id',
    			title: '操作',
    			width : '8%',
    			align: 'center',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm edit_location" href="javascript:void(0)" >编辑</a>';
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
        				url : warhouseLocationManager.URL.deleteUrl(),
        				data : params,
        				async: false,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#warhouseLocationManagerTable').bootstrapTable('refresh');
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
     * 改变仓库库位状态
     */
    changeAreaStatus:function (id,enabled){
    	var params={
    		"id":id,
    		"enabled":enabled	
    	}
    	$.callAjax({
			type:"post",
			url : warhouseLocationManager.URL.updateLocation(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$('#warhouseLocationManagerTable').bootstrapTable('refresh');
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
	getWarehouseLocationDetais: function (id,type) {
    	//document.getElementById("addAnchorForm").reset();
	    //$('#addAnchorForm').bootstrapValidator('resetForm', true);
    	//触发Ajax
    	var params = {
    		'id':id
    	};
    	
		$.callAjax({
			type:"post",
			url : warhouseLocationManager.URL.getWarehouseLocationDetaisUrl(),
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
         		$("#remark").val(data.data.remark);
    			$('#locationCodeAdd').val(data.data.locationCode);
    			$('#locationNameAdd').val(data.data.locationName);
    			$('#areaCodeAdd').val(data.data.areaCode);
    			$('#areaNameAdd').val(data.data.areaName);
    			$('#warehouseCodeAdd').val(data.data.warehouseCode);
    			$('#locationUseAdd').val(data.data.locationUse);
    			$('#locationTypeAdd').val(data.data.locationType);
         	    $("#cycleAdd option[value='"+data.data.cycle+"']").attr("selected",true);
         		$('#locationAttributeAdd').val(data.data.locationAttribute);
         	   
         	    $("#warmAdd option[value='"+data.data.warm+"']").attr("selected",true);
    	        $("#warmAdd").val(data.data.warm);
    			$('#shelfOrderAdd').val(data.data.shelfOrder);
    			$('#pickingOrderAdd').val(data.data.pickingOrder);
    			$('#volumeLimitAdd').val(data.data.volumeLimit);
    			$('#weightLimitAdd').val(data.data.weightLimit);
    			$('#boxLimitAdd').val(data.data.boxLimit);
    			$('#numLimitAdd').val(data.data.numLimit);
    			$('#trayLimitAdd').val(data.data.trayLimit);
    			$('#skuLimitAdd').val(data.data.skuLimit);
    			$('#LengthAdd').val(data.data.length);
    			$('#wideAdd').val(data.data.wide);
    			$('#heightAdd').val(data.data.height);
    			$('#xPointAdd').val(data.data.xPoint);
    			$('#yPointAdd').val(data.data.yPoint);
    			
				var select = document.getElementById("disabledAdd");
				for (var i = 0; i < select.options.length; i++) {
					select.options[i].selected = !data.data.disabled;
				}
    	            
         		var checkElements=document.getElementsByName('hybridSku');  
                for(var i=0;i<checkElements.length;i++){  
                    var checkElement=checkElements[i];  
                    if(data.data.hybridSku==1){
                    	checkElement.checked="checked";  
                    }
                }
    			
         		var checkElements=document.getElementsByName('hybridBatch');  
                for(var i=0;i<checkElements.length;i++){  
                    var checkElement=checkElements[i];  
                    if(data.data.hybridBatch==1){
                    	checkElement.checked="checked";  
                    }
                } 
    			
          		if(type=="look"){
         			$("#myModalLabel").text("查看库位详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			warhouseLocationManager.disableForm('addAnchorForm',true);
         			
        			$("#fromSouSuo01").css("cursor","not-allowed");
        			$("#fromSouSuo01").css("background-color","#eee");
        			//点击失效
        			$("#search_name").unbind("click");
        			
         			$('#fromSouSuo01').attr('disabled',"true");
         			$('#search_name').attr('disabled',"true");
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑库位");
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").hide();
         			warhouseLocationManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
         			$('#locationCodeAdd').attr("disabled",true);
         			
        			$("#fromSouSuo01").css("cursor","pointer");
        			$("#fromSouSuo01").css("background-color","#fff");
        			$("#search_name").click(function(){
        				   warhouseLocationManager.searchListByPageArea();
        				   document.getElementById("sForm").reset();
        				   $('#warehouseLocation').bootstrapTable('refresh');
        				   $.showModal('#myModal02');
        			});
        			
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
		var disabledAdd = $("#disabledAdd").val();
		if(type=="add"){
			urlValue=warhouseLocationManager.URL.addLocationUrl();
		}if(type=="update"){
			urlValue=warhouseLocationManager.URL.updateLocation();
			
			if($("#disabledAdd").val() == "1"){
				disabledAdd = 0
			}else{
				disabledAdd = 1;
			}
		}
		//判读是否选择选中允许混放产品、允许混放批次
		var hybridSku = false;
		var hybridBatch = false;
		if ($("#hybridSku").is(":checked")) {
			hybridSku = true;
		}
		if ($("#hybridBatch").is(":checked")) {
			hybridBatch = true;
		}
		
		
    	var xPoint=document.getElementById("xPointAdd").value;
    	if(xPoint != ""){
        	var xPointFilter=/^\d+$/;
        	if(!xPointFilter.test(xPoint)){
        	          $.toastrWarning("X坐标请在输入框中输入数字！");
        	          return false;
        	}
    	}
    	var yPoint=document.getElementById("yPointAdd").value;
    	if(yPoint != ""){
        	var yPointFilter=/^\d+$/;
        	if(!yPointFilter.test(yPoint)){
        	          $.toastrWarning("Y坐标请在输入框中输入数字！");
        	          return false;
        	}
    	}

		var params={
				'id':$("#rowId").val(),
    			'locationCode':$('#locationCodeAdd').val(),
    			'locationName':$('#locationNameAdd').val(),
    			'areaCode':$('#areaCodeAdd').val(),
    			'areaName':$('#areaNameAdd').val(),
    			'warehouseCode':$('#warehouseCodeAdd').val(),
    			'locationUse':$('#locationUseAdd').val(),
    			'locationType':$('#locationTypeAdd').val(),
    			'disabled':disabledAdd,
    			'cycle':$('#cycleAdd').val(),
    			'locationAttribute':$('#locationAttributeAdd').val(),
    			'warm':$('#warmAdd').val(),
    			'shelfOrder':$('#shelfOrderAdd').val(),
    			'pickingOrder':$('#pickingOrderAdd').val(),
    			'hybridSku':hybridSku,
    			'hybridBatch':hybridBatch,
    			'volumeLimit':$('#volumeLimitAdd').val(),
    			'weightLimit':$('#weightLimitAdd').val(),
    			'boxLimit':$('#boxLimitAdd').val(),
    			'numLimit':$('#numLimitAdd').val(),
    			'trayLimit':$('#trayLimitAdd').val(),
    			'skuLimit':$('#skuLimitAdd').val(),
    			'Length':$('#LengthAdd').val(),
    			'wide':$('#wideAdd').val(),
    			'height':$('#heightAdd').val(),
    			'xPoint':$('#xPointAdd').val(),
    			'yPoint':$('#yPointAdd').val(),
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
             		$('#warhouseLocationManagerTable').bootstrapTable('refresh');
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
	        	locationCodeAdd: {
	        		  validators: {
		                    notEmpty: {message: '库位编码不能为空！'},
		                }
	            },
	        	locationNameAdd: {
	        		  validators: {
		                    notEmpty: {message: '库位名称不能为空！'},
		                }
	            },
	            areaNameAdd: {
	                validators: {
	                    notEmpty: {message: '库区编码不能为空！'},
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    /**
     * 修改库位状态
     */
    modifyStatus:function(roleId,disabled) {
    	var params = {"id":roleId,"disabled":disabled};
    	
		$.callAjax({
			type:"post",
			url : warhouseLocationManager.URL.updateLocation(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#warhouseLocationManagerTable').bootstrapTable('refresh');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
    /**分页获取库区列表**/
    searchListByPageArea: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#warehouseLocation",//需要分页的table ID
    		url: warhouseLocationManager.URL.searchAreaUrl(),//请求后台的URL（*）
    		queryParams:queryParamsAarea,
    		onLoadSuccess:function(){
    			warhouseLocationManager.isResetOffset = 0;
    			$("#btn_search_s").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'areaCode',
    			title: '编码'
    		}, {
    			field: 'areaName',
    			title: '名称',
    			align: 'center'
    		}
    		]
    	});
    },
    bindEvent: function () {
		 $(".my_btn").click(function () {
	          if($('.data_input').css("display") =="none"){
	              $('.data_input').css("display","block");
	          }else (
	              $('.data_input').css("display","none")
	          );
	     });
    	  
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  //$("#btn_search").addClass("disabled");
    		  //warhouseLocationManager.isResetOffset = 1;
    		$('#warhouseLocationManagerTable').bootstrapTable('refresh');
    	});

		// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
		    document.getElementById("addAnchorForm").reset();
		    $('#addAnchorForm').bootstrapValidator('resetForm', true);
		    warhouseLocationManager.disableForm('addAnchorForm',false);
			$("#myModalLabel").text("新增库位");
			$("#warehouseCodeAdd").val(homepage.warehouseName);
			//默认选中 库位属性 温度要求
			$("#locationAttributeAdd").val(10);
			$("#warmAdd").val(30);
			$("#disabledAdd").val(0);
			$("#locationCodeAdd").val("自动生成");
		    $("#btn_save_submit").show();
		    $("#btn_edit_submit").hide();
		    
		    //恢复库区选择器
  			$("#fromSouSuo01").css("cursor","pointer");
			$("#fromSouSuo01").css("background-color","#fff");
			$("#search_name").click(function(){
				   warhouseLocationManager.searchListByPageArea();
				   document.getElementById("sForm").reset();
				   $('#warehouseLocation').bootstrapTable('refresh');
				   $.showModal('#myModal02');
			});
			
			
		    $.showModal('#myModal');
		});
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 warhouseLocationManager.isResetOffset = 1;
    			 $('#warhouseLocationManagerTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			warhouseLocationManager.addOrUpdate('add');
    		else return;
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			warhouseLocationManager.addOrUpdate('update');
    		else return;
    	});
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
   
    	warhouseLocationManager.initDropDownBox();
    	warhouseLocationManager.validateform();
    	warhouseLocationManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,仓库库位编码
	var locationCode=$('#locationCode').val();
	var cycle=$('#cycle').val();
	var disabled=$('#state').val();
	var locationUse=$('#locationUse').val();
	var locationType=$('#locationType').val();
	var warm=$('#warm').val();
	var locationAttribute=$('#locationAttribute').val();
	var disabled=$('#state').val();
	var areaCode=$('#areaCode').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: warhouseLocationManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		locationCode:locationCode,
		cycle:cycle,
		locationUse:locationUse,
		locationType:locationType,
		disabled:disabled,
		locationAttribute:locationAttribute,
		warm:warm,
		areaCode:areaCode
	};
	return temp;
};

var queryParamsAarea = function (params) {
	//自定义查询参数 库区、库区名称
	var code=$('#code_2').val();
	var name=$('#name_2').val();
	var disabled='0';
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: warhouseLocationManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		areaCode:code,
		areaName:name,
		disabled:disabled,
	};
	return temp;
};

 //库区编码
$("#search_name").click(function(){
	   warhouseLocationManager.searchListByPageArea();
	   document.getElementById("sForm").reset();
	   $('#warehouseLocation').bootstrapTable('refresh');
	   $.showModal('#myModal02');
		
});

//查询仓库
$("#btn_search_s").click(function(){
	   $('#warehouseLocation').bootstrapTable('refresh');
});

$("#s_save").click(function(){
	 
	  if($("#warehouseLocation").bootstrapTable('getSelections').length==1){
			$.map($("#warehouseLocation").bootstrapTable('getSelections'), function(row) {
				$('#areaCodeAdd').val(row.areaCode);
				$('#areaNameAdd').val(row.areaName);
				$("#areaNameAdd").trigger("input");
				$.hideModal('#myModal02');
           });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});


//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .warehouse_location': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发查询详情的方法
	    	warhouseLocationManager.getWarehouseLocationDetais(row.id,'look');
	    },
		//删除
		'click .delete_area': function (e, value, row, index) {
			$.toastrSuccess('库位暂不支持删除');
			//warhouseLocationManager.deleteCars(row.id);
		},
		//修改库区状态
		'click .status_a': function (e, value, row, index) {
			warhouseLocationManager.modifyStatus(row.id,row.disabled);
		},
	    //编辑
	    'click .edit_location': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
			$("#rowId").val(row.id);
			warhouseLocationManager.getWarehouseLocationDetais(row.id,'edit');
		},
		
};

$("#btn_clean").on("click",function () {
	$.clearForm("addOrEditeSearchForm");
});

$("#btn_areaCode_clean").on("click",function () {
	$.clearForm("sForm");
});

$(document).ready(function(){
	//1、初始化加载列表数据
	warhouseLocationManager.init();
	//2、初始化绑定增删改查事件
	warhouseLocationManager.bindEvent();
});
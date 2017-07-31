//定义下拉框数组
var commonActiveAllList=[{'value':'','text':'全部'},{'value':'0','text':'生效'},{'value':'1','text':'失效'}];
var skuConfigTypeArr=[];
var regionArr=[];
var selfSupportArr=[];
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var skuConfig = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//上架规则分页获取列表请求地址
    	searchSkuConfigListByPageUrl: function () {
            return '/wms/shelfRules/list';
        },
        //分页查询商品资料
    	searchGoodsListByPageUrl: function () {
            return '/wms/skuConfig/listGoods';
        },
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/wms/skuConfig/list';
        },
        getSkuConfigDetailUrl: function () {
            return '/wms/skuConfig/querySkuConfigDetails';
        },//更新仓库状态
        changeSkuConfigStatusUrl: function () {
            return '/wms/skuConfig/updateSkuConfigStatus';
        },//更新
        updateSkuConfig:function(){
        	return '/wms/skuConfig/updateSkuConfig';
        },//获取当前可操控运营商列表
        getOwnOperatorUrl:function(){
        	return '/login/qryManagerOperator';
        },
        addSkuConfigUrl:function() {
        	return '/wms/skuConfig/add';
        },
        getWarehouseAreaUrl:function(){
        	return '/wms/warehouseArea/list';
        },//查看库位
        getWarehouseLocationUrl: function () {
            return '/wms/warehouseLocation/list';
        },
        getPropertyUrl: function () {
            return '/wms/property/list';
        },
        getAllocatedUrl: function () {
        	 return '/wms/allocatedRules/list';
        },
        getPreAllocatedUrl: function () {
       	 return '/wms/preAllocatedRules/list';
       }
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function() {
		for (var i = 0; i < commonActiveAllList.length; i++) {
			$('#disabled').append(
					"<option value='" + commonActiveAllList[i].value + "'>"
							+ commonActiveAllList[i].text + "</option>");
		}

	},
    
    /**分页获取SKU配置列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#skuConfigManagerTable",//需要分页的table ID
    		url: skuConfig.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
    		onLoadSuccess:function(){
    			skuConfig.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'created',
    		sortOrder:'desc',
    		columns: [{
    			field: 'skuCode',
    			title: '货品编码',
    			formatter:function(value,row,index){
					return '<a class="sku_config_detail" href="javascript:void(0)" warehouseCode="' + row.skuCode +'">' + row.skuCode + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'skuName',
    			title: '货品名称'
       		},/* {
    			field: 'warehouseName',
    			title: '仓库名称'
       		}, {
    			field: 'warehouseCode',
    			title: '仓库编码'
    		},*/ {
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
    		},/* {
    			field: 'rulesName',
    			title: '上架规则'
    		},  {
    			field: 'created',
    			title: '创建时间',
    		    align: 'center',
				formatter:function(value,row,index){
					return skuConfig.format(row.created,"yyyy-MM-dd HH:mm:ss");
				}
    		},*/  {
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
   	        	var html='<a class="btn btn-info btn-sm edit_sku_config" href="javascript:void(0)" >编辑</a>';
    	        	if(row.disabled==1){
    	        		html+='<a class="btn btn-sm btn-success status_a" href="javascript:void(0)" >生效</a>';
    	        	}else{
    	        		html+='<a class="btn btn-sm btn-warning status_a" href="javascript:void(0)" >失效</a>';
    	        	}
    	            return html;
    	        },
    	        events: 'operateEvents'
    	    }  
    		]
    	});
    },
    /**分页获取列表**/
    searchListByPageRules: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#skuConfigList",//需要分页的table ID
    		url: skuConfig.URL.searchSkuConfigListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsRules,
    		onLoadSuccess:function(){
    			skuConfig.isResetOffset = 0;
    			$("#btn_search_s").removeClass("disabled");
            },
    		columns: [{
    			field: 'state',
    			radio: true
    		}, {
    			field: 'rulesCode',
    			title: '编码'
    		}, {
    			field: 'rulesName',
    			title: '名称',
    			align: 'center'
    		}
    		]
    	});
    },
    /**分页获取列表**/
    searchGoodsListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#skuGoodsList",//需要分页的table ID
    		url: skuConfig.URL.searchGoodsListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParamsGoods,
    		onLoadSuccess:function(){
    			skuConfig.isResetOffset = 0;
    			$("#btn_search_s").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'goodsCode',
    			title: '商品编码'
    		}, {
    			field: 'title',
    			title: '商品名称',
    			align: 'center'
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
        				url : skuConfig.URL.deleteUrl(),
        				data : params,
        				async: false,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$('#skuConfigTable').bootstrapTable('refresh');
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
     * 改变货品档案状态
     */
    changeCarsStatus:function (id,enabled){
    	var params={
    		"id":id,
    		"enabled":enabled	
    	}
    	$.callAjax({
			type:"post",
			url : skuConfig.URL.changeCarStatusUrl(),
			data : params,
			async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$('#skuConfigTable').bootstrapTable('refresh');
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
    getSkuConfigDetais: function (id,type) {
    	//触发Ajax
    	var params = {
    		'id':id
    	};
		$.callAjax({
			type:"post",
			url : skuConfig.URL.getSkuConfigDetailUrl(),
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
        		$("#skuCodeAdd").val(data.data.skuCode);
          		$("#skuNameAdd").val(data.data.skuName);
          		$("#rulesCode").val(data.data.rulesCode);
          		$("#rulesName").val(data.data.rulesName);
          		$("#warehouseAreaCodeAdd").val(data.data.prefeArea);
          		$("#warehouseLocationCode").val(data.data.prefeLocation);
          		$("#warehouseAreaSpare").val(data.data.standbyArea);
          		$("#warehouseAreaReturn").val(data.data.returnArea);
        		$("#cycle").val(data.data.cycle);
        		$("#skuUnit").val(data.data.skuUnit);
           		$("#preAllocatedCode").val(data.data.preTactics);
         		$("#preAllocatedName").val(data.data.preTacticsName);
           		$("#allocatedCode").val(data.data.allocationTactics);
           		$("#allocatedName").val(data.data.allocationTacticsName);
           		$("#qualityCycle").val(data.data.qualityCycle);
           		$("#stockLimit").val(data.data.stockLimit);
           		$("#stockLower").val(data.data.stockLower);
           		$("#replenBulking").val(data.data.replenBulking);
                $("#replenUnit option[value='"+data.data.replenUnit+"']").attr("selected",true);
           		$("#replenUnit").val(data.data.replenUnit);
           		$("#lifeDays").val(data.data.lifeDays);
        		$("#life").val(data.data.life);
           		$("#preTactics").val(data.data.preTactics);
                $("#skuClassify option[value='"+data.data.skuClassify+"']").attr("selected",true);
           		$('#skuClassify').val(data.data.skuClassify);
           		$('#skuBarCode').val(data.data.skuBarCode);
           		$('#grossWeight').val(data.data.grossWeight);
           		$('#lenght').val(data.data.lenght);
           		$('#wide').val(data.data.wide);
           		$('#heigh').val(data.data.heigh);
           		$('#price').val(data.data.price);
           		$('#goodsClassifyName').val(data.data.goodsClassifyName);
           		$('#storageMode').val(data.data.storageMode);
           		$('#aType').val(data.data.aType);
           		$('#distribution').val(data.data.distribution);
           		$('#assistUnit').val(data.data.assistUnit);
				var imgUrl = data.data.imgUrl;
				if (imgUrl==null || imgUrl=="") {
					imgUrl=$("#contextPath").val()+"/resources/img/noneImg.jpg";
				}
	    		$("#skuImgShow").attr("src",imgUrl); 
           		
         		var checkElements=document.getElementsByName('outNo');  
                for(var i=0;i<checkElements.length;i++){
                    var checkElement=checkElements[i];  
                    if(data.data.outNo==1){
                    	checkElement.checked="checked";  
                    }
                }
                
         		var checkElements=document.getElementsByName('skuCodeManage');  
                for(var i=0;i<checkElements.length;i++){
                    var checkElement=checkElements[i];  
                    if(data.data.skuCodeManage==1){
                    	checkElement.checked="checked";  
                    }
                }
                
         		var checkElements=document.getElementsByName('storageNo');  
                for(var i=0;i<checkElements.length;i++){  
                    var checkElement=checkElements[i];  
                    if(data.data.storageNo==1){
                    	checkElement.checked="checked";  
                    }
                }
                
         		if(type=="look"){
         			$("#myModalLabel").text("查看货品档案详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			skuConfig.disableSearch(true);
         			skuConfig.disableForm('addAnchorForm',true);
         			 $('#fromSousuo').hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑货品档案");
         			skuConfig.disableSearch(false);
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").hide();
         			skuConfig.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true);
         			$('#skuConfigCodeAdd').attr("disabled",true);
         			
        			//禁用货品选择
        			$("#skuNameSearch").css("cursor","not-allowed");
        			$("#skuNameSearch").css("background-color","#eee");
        			//点击失效
        			$("#skuCodeQuery").unbind("click");
        			$('#skuClassify').attr("disabled",true);
        			$('#skuUnit').attr("disabled",true);
         			$('#fromSousuo').show();
         		}
         		$.showModal('#myModal');
    			$("#leftMeun ul li").removeClass("active");
    			$("#leftMeun").find("li").eq(0).addClass("active");
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
	disableSearch:function(isDisabled){
		if(isDisabled){
			//禁用货品选择
			$("#skuNameSearch").css("cursor","not-allowed");
			$("#skuNameSearch").css("background-color","#eee");
			//点击失效
			$("#skuCodeQuery").unbind("click");
			
			//禁用上架规则选择
			$("#rulesNameSearch").css("cursor","not-allowed");
			$("#rulesNameSearch").css("background-color","#eee");
			//点击失效
			$("#search_rulesName").unbind("click");
			
			//禁用首选库区选择
			$("#areaSearch").css("cursor","not-allowed");
			$("#areaSearch").css("background-color","#eee");
			//点击失效
			$("#searchShelRulesName").unbind("click");
			
			//禁用首选库位选择
			$("#locationSearch").css("cursor","not-allowed");
			$("#locationSearch").css("background-color","#eee");
			//点击失效
			$("#searchWarehouseLocationName").unbind("click");
			
			//禁用备用库区选择
			$("#areaSpareSearch").css("cursor","not-allowed");
			$("#areaSpareSearch").css("background-color","#eee");
			//点击失效
			$("#searchAllSpare").unbind("click");
			
			//禁用退货库区选择
			$("#areaReturnSearch").css("cursor","not-allowed");
			$("#areaReturnSearch").css("background-color","#eee");
			//点击失效
			$("#searchAllReturn").unbind("click");
			
			//禁用预分配
			$("#preAllocatedSearch").css("cursor","not-allowed");
			$("#preAllocatedSearch").css("background-color","#eee");
			//点击失效
			$("#searchPreAllocated").unbind("click");
			
			//禁用预分配
			$("#preAllocatedSearch").css("cursor","not-allowed");
			$("#preAllocatedSearch").css("background-color","#eee");
			//点击失效
			$("#searchPreAllocated").unbind("click");
			
			//禁用分配
			$("#allocatedSearch").css("cursor","not-allowed");
			$("#allocatedSearch").css("background-color","#eee");
			//点击失效
			$("#searchAllocated").unbind("click");
		}else{
			//禁用货品选择
			$("#skuNameSearch").css("cursor","pointer");
			$("#skuNameSearch").css("background-color","#fff");
			$("#skuCodeQuery").click(function(){
				   skuConfig.searchGoodsListByPage();
				   document.getElementById("skuCodeForm").reset();
				   $('#skuGoodsList').bootstrapTable('refresh');
				   $.showModal('#myModal08')
			});
			
			//禁用上架规则选择
			$("#rulesNameSearch").css("cursor","pointer");
			$("#rulesNameSearch").css("background-color","#fff");
			$("#search_rulesName").click(function(){
				   skuConfig.searchListByPageRules();
				   document.getElementById("sForm").reset();
				   $('#skuConfigList').bootstrapTable('refresh');
				   $.showModal('#myModal02');
			});
			
			//禁用首选库区选择
			$("#areaSearch").css("cursor","pointer");
			$("#areaSearch").css("background-color","#fff");
			$("#searchShelRulesName").click(function(){
					skuConfig.searchPro();
					$('#flag').val("searchchoice");
					document.getElementById("proForm").reset();
					$('#warehouseAreaList').bootstrapTable('refresh');
					$.showModal('#myModal03');
			});
			
			//禁用首选库位选择
 			$("#locationSearch").css("cursor","pointer");
			$("#locationSearch").css("background-color","#fff");
			$("#searchWarehouseLocationName").click(function(){
				   if($("#warehouseAreaCodeAdd").val() == "" || $("#warehouseAreaCodeAdd").val() == null){
					   $.toastrWarning("请选择首选库区在选择首选库位");
					   return false;
				   }
				   skuConfig.searchLocation();
				   document.getElementById("locationForm").reset();
				   $('#warehouseLocationList').bootstrapTable('refresh');
				   $.showModal('#myModal04');
			});
			
			//禁用备用库区选择
			$("#areaSpareSearch").css("cursor","pointer");
			$("#areaSpareSearch").css("background-color","#fff");
			$("#searchAllSpare").click(function(){
				   skuConfig.searchPro();
				   $('#flag').val("searchSpare");
				   document.getElementById("proForm").reset();
				   $('#warehouseAreaList').bootstrapTable('refresh');
				   $.showModal('#myModal03');
			});
			
			//禁用退货库区选择
			$("#areaReturnSearch").css("cursor","pointer");
			$("#areaReturnSearch").css("background-color","#fff");
			$("#searchAllReturn").click(function(){
				   skuConfig.searchPro();
				   $('#flag').val("searchReturn");
				   document.getElementById("proForm").reset();
				    $('#warehouseAreaList').bootstrapTable('refresh');
					$.showModal('#myModal03');
			});
			
			//禁用预分配
			$("#preAllocatedSearch").css("cursor","pointer");
			$("#preAllocatedSearch").css("background-color","#fff");
			$("#searchPreAllocated").click(function(){
				   skuConfig.searchPreAllocated();
				   document.getElementById("proForm").reset();
				    $('#preAllocatedList').bootstrapTable('refresh');
					$.showModal('#myModal07');
			});
			
			//禁用分配
			$("#allocatedSearch").css("cursor","pointer");
			$("#allocatedSearch").css("background-color","#fff");
			$("#searchAllocated").click(function(){
				   skuConfig.searchAllocated();
				   document.getElementById("proForm").reset();
				    $('#allocatedList').bootstrapTable('refresh');
					$.showModal('#myModal06');
			});
		}
    },
  //添加或修改
	addOrUpdate:function(type){
		var urlValue;
		if(type=="add"){
			urlValue=skuConfig.URL.addSkuConfigUrl();
		}if(type=="update"){
			urlValue=skuConfig.URL.updateSkuConfig();
		}
		
/*    	var inputValue=document.getElementById("qualityCycle").value;
    	if(inputValue.length > 0){
			var inputValueFilter=/^\d+$/;
			if(!inputValueFilter.test(inputValue)){
			      $.toastrWarning("质检周期(H),请在输入框中输入数字！");
			      return false;
			}
			if(inputValue.length > 2){
				$.toastrWarning("请输入限制两位数！");
			      return false;
			}
      	}*/
		
		//判读是否选择选中
		var storageNo = false;
		var outNo = false;
		var skuCodeManage = false;
		if ($("#storageNo").is(":checked")) {
			storageNo = true;
		}
		if ($("#outNo").is(":checked")) {
			outNo = true;
		}
		if ($("#skuCodeManage").is(":checked")) {
			skuCodeManage = true;
		}
		var params={
				'id':$("#rowId").val(),
    			'skuCode':$('#skuCodeAdd').val(),
    			'skuName':$('#skuNameAdd').val(),	
    			'rulesCode':$('#rulesCode').val(),
    			'rulesName':$('#rulesName').val(),
    			'prefeArea':$("#warehouseAreaCodeAdd").val(),
    			'prefeLocation':$('#warehouseLocationCode').val(),
    			'standbyArea':$('#warehouseAreaSpare').val(),
    			'returnArea':$('#warehouseAreaReturn').val(),	
    			'cycle':$('#cycle').val(),	
    			'skuUnit':$('#skuUnit').val(),	
    			'preTactics':$('#preAllocatedCode').val(),
    			'allocationTactics':$('#allocatedCode').val(),
    			'preTacticsName':$('#preAllocatedName').val(),
    			'allocationTacticsName':$('#allocatedName').val(),
    			'qualityCycle':$('#qualityCycle').val(),
    			'stockLimit':$('#stockLimit').val(),
    			'stockLower':$('#stockLower').val(),
    			'replenBulking':$('#replenBulking').val(),
    			'replenUnit':$('#replenUnit').val(),
    			'life':$('#life').val(),
    			'lifeDays':$('#lifeDays').val(),
    			'skuClassify':$('#skuClassify').val(),
      			'outNo':outNo,
      			'storageNo':storageNo,
      			'skuCodeManage':skuCodeManage,
      			'skuBarCode':$('#skuBarCode').val(),
    			'grossWeight':$('#grossWeight').val(),
    			'lenght':$('#lenght').val(),
    			'wide':$('#wide').val(),
    			'heigh':$('#heigh').val(),
    			'price':$('#price').val(),
    			'goodsClassifyName':$('#goodsClassifyName').val(),
    			'storageMode':$('#storageMode').val(),
    			'aType':$('#aType').val(),
    			'distribution':$('#distribution').val(),
    			'assistUnit':$('#assistUnit').val()
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
             		$('#skuConfigManagerTable').bootstrapTable('refresh');
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
	        	rulesName: {
	                validators: {
	                    notEmpty: {
	                        message: '上架规则不能为空！'
	                    }
	                }
	            },
	            preAllocatedName: {
	                validators: {
	                    notEmpty: {message: '预分配规则不能为空！'},
	                }
	            },
	            allocatedName: {
	                validators: {
	                    notEmpty: {message: '分配规则不能为空！'},
	                }
	            },
	            skuCodeAdd: {
	                validators: {
	                    notEmpty: {message: '货品编码不能为空！'},
	                }
	            },
	            skuNameAdd: {
	                validators: {
	                    notEmpty: {message: '货品名称不能为空！'},
	                }
	            },
	            warehouseAreaCodeAdd: {
	                validators: {
	                    notEmpty: {message: '首选库区不能为空！'},
	                }
	            },
	            warehouseLocationCode: {
	                validators: {
	                    notEmpty: {message: '首选库位不能为空！'},
	                }
	            },
	            qualityCycle: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '质检周期(H),请在输入框中输入数字！'
	                    }
	            	}

	            },
	            lenght: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	            wide: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	            heigh: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	            skuBarCode: {
	                validators: {
	                    notEmpty: {message: '货品条码不能为空！'},
	                    stringLength: {
	                            min: 1,
	                            max: 36,
	                            message: '长度必须在1到36位之间'
	                        }
	                }
	            },
	            grossWeight: {
	            	validators: {
	                    regexp: {
	                        regexp: /^-?\d+\.?\d{0,2}$/,
	                        message: '请在输入框中可保留2位数字！'
	                    }
	            	}

	            },
	            price: {
	            	validators: {
	                    regexp: {
	                        regexp: /^-?\d+\.?\d{0,2}$/,
	                        message: '请在输入框中可保留2位数字！'
	                    }
	            	}

	            },
	            lifeDays: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	            life: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	            stockLimit: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	            replenBulking: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	            stockLower: {
	            	validators: {
	                    regexp: {
	                        regexp: /^\d+$/,
	                        message: '请在输入框中输入数字！'
	                    }
	            	}

	            },
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    /**
     * 修改货品档案状态
     */
    modifyStatus:function(roleId,disabled) {
    	var params = {"id":roleId,"disabled":disabled};
    	
		$.callAjax({
			type:"post",
			url : skuConfig.URL.changeSkuConfigStatusUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg); 
         			return;
         		}
         		$('#skuConfigManagerTable').bootstrapTable('refresh');
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
    		url: skuConfig.URL.getWarehouseAreaUrl(),//请求后台的URL（*）
    		queryParams:queryParamsArea,
    		onLoadSuccess:function(){
    			skuConfig.isResetOffset = 0;
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
    		url: skuConfig.URL.getWarehouseLocationUrl(),//请求后台的URL（*）
    		queryParams:queryParamsLocation,
    		onLoadSuccess:function(){
    			skuConfig.isResetOffset = 0;
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
	},
	//分配规则
	searchAllocated :function(){
		$.pageTable({
    		tableId: "#allocatedList",//需要分页的table ID
    		url: skuConfig.URL.getAllocatedUrl(),//请求后台的URL（*）
    		queryParams:queryParamsAllocated,
    		onLoadSuccess:function(){
    			skuConfig.isResetOffset = 0;
    			$("#btn_search_pro").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'rulesCode',
    			title: '规则编码'
    		}, {
    			align: 'center',
    			field: 'rulesName',
    			title: '规则名称'
    		}
    		]
    	});
	},
	//预分配规则
	searchPreAllocated :function(){
		$.pageTable({
    		tableId: "#preAllocatedList",//需要分页的table ID
    		url: skuConfig.URL.getPreAllocatedUrl(),//请求后台的URL（*）
    		queryParams:queryParamsPreAllocated,
    		onLoadSuccess:function(){
    			skuConfig.isResetOffset = 0;
    			$("#btn_search_pro").removeClass("disabled");
            },
    		columns: [{
    			radio: true
    		}, {
    			field: 'rulesCode',
    			title: '规则编码'
    		}, {
    			align: 'center',
    			field: 'rulesName',
    			title: '规则名称'
    		}
    		]
    	});
	},
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  //$("#btn_search").addClass("disabled");
    		  $('#skuConfigManagerTable').bootstrapTable('refresh');
    	});

		    	// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
		    document.getElementById("addAnchorForm").reset();
			$('#addAnchorForm').data('bootstrapValidator').resetForm();
			skuConfig.disableForm('addAnchorForm',false);
			skuConfig.disableSearch(false);
			$("#myModalLabel").text("新增"); 
		    $("#btn_save_submit").show();
		    $("#btn_edit_submit").hide();
		    $("#operatorName").val(myMain.selfCompanyName);
			$('#skuClassify').attr("disabled",true);
		    $.showModal('#myModal');
		});
    	
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 skuConfig.isResetOffset = 1;
    			 $('#skuConfigTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			
    			skuConfig.addOrUpdate('add');
    		else return;
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			skuConfig.addOrUpdate('update');
    		else return;
    	});
    },
    
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	skuConfig.initDropDownBox();
    	skuConfig.validateform();
		skuConfig.searchListByPage();
    }
};

 
//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsDriver = function (params) {
	
	var cnName=$('#name').val();
	var mobileNo=$('#tel').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			disabled:'0',
			cnName:cnName,
			mobileNo:mobileNo
		};
	return temp;
};
//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,仓库编码、仓库、名称
	var skuCode=$('#skuCode').val();
	var skuName=$('#skuName').val();
	var disabled=$('#disabled').val();
	var warehouseCode=$('#warehouseCode').val();
	//var disabled=$('#disabled option:selected').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		skuCode:skuCode,
		skuName:skuName,
		disabled:disabled,
		warehouseCode:warehouseCode
	};
	return temp;
};

var queryParamsRules = function (params) {
	//自定义查询参数,昵称、公司名
	var code=$('#shelf_code').val();
	var name=$('#shelf_name').val();
	var disabled='0';
	var deliveryType=null;
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		rulesCode:code,
		rulesName:name,
		disabled:disabled,
	};
	return temp;
};

var queryParamsGoods = function (params) {
	//自定义查询参数,昵称、公司名
	var skuCode=$('#goodsCode').val();
	var skuName=$('#goodsName').val();
	var goodsMode=$('#goodsMode').val();
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		skuCode:skuCode,
		skuName:skuName,
		goodsMode:goodsMode,
	};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsArea = function (params) {
	
	var areaCode=$('#warehouseAreaCode').val();
	var areaName=$('#warehouseAreaName').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			disabled:'0',
			areaCode:areaCode,
			areaName:areaName
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
			offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			disabled:'0',
			locationCode:locationCode,
			locationName:locationName,
			areaCode:areaCode
		};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsAllocated = function (params) {
	
	var rulesCode=$('#allocatedSerchCode').val();
	var rulesName=$('#allocatedSerchName').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			disabled:'0',
			rulesCode:rulesCode,
			rulesName:rulesName,
			disabled:false
		};
	return temp;
};

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParamsPreAllocated = function (params) {
	
	var rulesCode=$('#preAllocatedSerchCode').val();
	var rulesName=$('#preAllocatedSerchName').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: skuConfig.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:'40',
			disabled:'0',
			rulesCode:rulesCode,
			rulesName:rulesName,
			disabled:false,
		};
	return temp;
};

 //上架规则
$("#search_rulesName").click(function(){
	   skuConfig.searchListByPageRules();
	   document.getElementById("shelfForm").reset();
	   $('#skuConfigList').bootstrapTable('refresh');
	   $.showModal('#myModal02');
});

////查询库位
//$("#searchWarehouseLocationName").click(function(){
////	   if($("#warehouseAreaCodeAdd").val() == "" ){
////		   $.toastrWarning("请选择首选库区在选择首选库位");
////		   return false;
////	   }
////	   skuConfig.searchLocation();
////	   document.getElementById("proForm").reset();
////	   $('#warehouseLocationList').bootstrapTable('refresh');
////	   $.showModal('#myModal04');
//});

//查询库位
$("#btn_search_location").click(function(){
	   $('#warehouseLocationList').bootstrapTable('refresh');
});

//保存库位
$("#location_save").click(function(){
	  if($("#warehouseLocationList").bootstrapTable('getSelections').length==1){
			$.map($("#warehouseLocationList").bootstrapTable('getSelections'), function(row) {
				$('#warehouseLocationCode').val(row.locationCode);
				$("#warehouseLocationCode").trigger("input");
				$.hideModal('#myModal04');
			});
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});
 
//查询分配
$("#searchAllocated").click(function(){
	   skuConfig.searchAllocated();
	   document.getElementById("allocatedForm").reset();
	    $('#allocatedList').bootstrapTable('refresh');
		$.showModal('#myModal06');
});

//查询分配
$("#btn_search_allocated").click(function(){
	   $('#allocatedList').bootstrapTable('refresh');
});

//保存分配
$("#allocated_save").click(function(){
	  if($("#allocatedList").bootstrapTable('getSelections').length==1){
			$.map($("#allocatedList").bootstrapTable('getSelections'), function(row) {
				$('#allocatedCode').val(row.rulesCode);
				$('#allocatedName').val(row.rulesName);
				$("#allocatedName").trigger("input");
				$.hideModal('#myModal06');
     });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});


//查询预分配
$("#searchPreAllocated").click(function(){
	   skuConfig.searchPreAllocated();
	   document.getElementById("preAllocatedForm").reset();
	    $('#preAllocatedList').bootstrapTable('refresh');
		$.showModal('#myModal07');
});

//查询预分配
$("#btn_search_preAllocated").click(function(){
	   $('#preAllocatedList').bootstrapTable('refresh');
});

//保存预分配
$("#preAllocated_save").click(function(){
	  if($("#preAllocatedList").bootstrapTable('getSelections').length==1){
			$.map($("#preAllocatedList").bootstrapTable('getSelections'), function(row) {
				$('#preAllocatedCode').val(row.rulesCode);
				$('#preAllocatedName').val(row.rulesName);
				$("#preAllocatedName").trigger("input");
				$.hideModal('#myModal07');
		 });
	    } else {
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

//查询仓库
$("#btn_search_s").click(function(){
	   $('#skuConfigList').bootstrapTable('refresh');
});

//查询首选库区
$("#searchShelRulesName").click(function(){
	   skuConfig.searchPro();
	   $('#flag').val("searchchoice");
	   document.getElementById("proForm").reset();
	    $('#warehouseAreaList').bootstrapTable('refresh');
		$.showModal('#myModal03');
});

//查询备用库区
$("#searchAllSpare").click(function(){
	   skuConfig.searchPro();
	   $('#flag').val("searchSpare");
	   document.getElementById("proForm").reset();
	    $('#warehouseAreaList').bootstrapTable('refresh');
		$.showModal('#myModal03');
});

//查询退货库区
$("#searchAllReturn").click(function(){
	   skuConfig.searchPro();
	   $('#flag').val("searchReturn");
	   document.getElementById("proForm").reset();
	    $('#warehouseAreaList').bootstrapTable('refresh');
		$.showModal('#myModal03');
});

$("#area_save").click(function(){
	  if($("#warehouseAreaList").bootstrapTable('getSelections').length==1){
			$.map($("#warehouseAreaList").bootstrapTable('getSelections'), function(row) {
				if($('#flag').val()=="searchchoice"){
					$('#warehouseAreaCodeAdd').val(row.areaCode);
					$("#warehouseAreaCodeAdd").trigger("input");
				}else if($('#flag').val()=="searchSpare"){
					$('#warehouseAreaSpare').val(row.areaCode);
				}else{
					$('#warehouseAreaReturn').val(row.areaCode);
				}
				$.hideModal('#myModal03');
       });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
});

$("#skuCodeQuery").click(function(){
	   skuConfig.searchGoodsListByPage();
	   document.getElementById("skuCodeForm").reset();
	   $('#skuGoodsList').bootstrapTable('refresh');
	   $.showModal('#myModal08')
});

$("#btn_search_goods").click(function(){
	$('#skuGoodsList').bootstrapTable('refresh');
});

//保存商品
$("#goods_save").click(function(){
	  if($("#skuGoodsList").bootstrapTable('getSelections').length==1){
			$.map($("#skuGoodsList").bootstrapTable('getSelections'), function(row) {
				//截取首字母区分 原料 成品
				var goosCoode = row.goodsCode;
				if(goosCoode.substring(0,1) == "O"){
					$('#skuClassify').val("10");
				}else{
					$('#skuClassify').val("20");
				}
				
				$('#skuCodeAdd').val(row.goodsCode);
				$('#skuNameAdd').val(row.title);
				$("#skuNameAdd").trigger("input");
				$("#skuCodeAdd").trigger("input");
				$.hideModal('#myModal08');
			});
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
	
});

$("#btn_clean").on("click",function () {
	$.clearForm("fromModal01");
});

$("#btn_goods_clean").on("click",function () {
	document.getElementById("skuCodeForm").reset();
	
});

$("#btn_shelf_clean").on("click",function () {
	$.clearForm("shelfForm");
});

$("#btn_pro_clean").on("click",function () {
	$.clearForm("proAreaForm");
});

$("#btn_location_clean").on("click",function () {
	$.clearForm("locationForm");
});

$("#btn_preAllocated_clean").on("click",function () {
	$.clearForm("preAllocatedForm");
});

$("#btn_allocated_clean").on("click",function () {
	$.clearForm("allocatedForm");
});


$("#s_save").click(function(){
	  if($("#skuConfigList").bootstrapTable('getSelections').length==1){
			$.map($("#skuConfigList").bootstrapTable('getSelections'), function(row) {
				$('#rulesCode').val(row.rulesCode);
				$('#rulesName').val(row.rulesName);
				$("#rulesName").trigger("input");
				$.hideModal('#myModal02');
			
           });
		}else{
			$.toastrWarning("请选择一条数据进行操作！");
		}
		
});

//查询库区
$("#btn_search_pro").click(function(){
	   $('#warehouseAreaList').bootstrapTable('refresh');
});

 
//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	    'click .sku_config_detail': function (e, value, row, index) {
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发查询详情的方法
	    	skuConfig.getSkuConfigDetais(row.id,'look');
	    },
		//删除
		'click .deleteCars_a': function (e, value, row, index) {
			$.toastrSuccess('删除暂不做处理');
		},
		//修改货品档案状态
		'click .status_a': function (e, value, row, index) {
			skuConfig.modifyStatus(row.id,row.disabled);
		},
	    //编辑
	    'click .edit_sku_config': function (e, value, row, index) {
 	    	document.getElementById("addAnchorForm").reset();
 	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
 			$("#rowId").val(row.id);
 			skuConfig.getSkuConfigDetais(row.id,'edit');
	    	$.showModal("#myModal");

		}
		
};

$(document).ready(function(){
	//1、初始化加载列表数据
	skuConfig.init();
	//2、初始化绑定增删改查事件
	skuConfig.bindEvent();
});
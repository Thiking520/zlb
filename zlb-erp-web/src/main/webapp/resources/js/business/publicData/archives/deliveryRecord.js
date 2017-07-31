var deliveryTypeArr=[];
var levelArr=[];
var drManager = {
		//是否重置分页偏移值0：否，1：是
		isResetOffset: 0,
		URL: {
	    	//分页获取列表请求地址
	    	searchListByPageUrl: function () {
	            return '/publicData/deliveryRecord/list';
	        },//删除站点的请求地址
	        deleteDRUrl: function () {
	            return '/publicData/deliveryRecord/delete';
	        },//查看站点详情的请求地址
	        getDRDetaisUrl: function () {
	            return '/publicData/deliveryRecord/queryDeliveryRecordDetails';
	        },//站点详情的请求地址
	        addDRUrl: function () {
	            return '/publicData/deliveryRecord/add';
	        },//更新站点状态
	        changeDRStatusUrl: function () {
	            return '/publicData/deliveryRecord/updateDeliveryRecordStatus';
	        },//更新
	        updateDR:function(){
	        	return '/publicData/deliveryRecord/updateDeliveryRecord';
	        },//一下URL为站点范围的操作
	        dsSearchListByPageUrl :function() {
	        	return '/publicData/deliveryScope/list';
	        },
	        queryDeliveryScopeDetails :function() {
	        	return '/publicData/deliveryScope/queryDeliveryScopeDetails';
	        },
	        deleteDeliveryScope :function() {
	        	return '/publicData/deliveryScope/delete';
	        },
	        addDeliveryScope :function() {
	        	return '/publicData/deliveryScope/add';
	        },
	        updateDeliveryScope :function() {
	        	return '/publicData/deliveryScope/updateDeliveryScope';
	        },//省级联动
	        quereArea :function() {
	        	return '/publicData/baseArea/quereArea';
	        },//员工列表
	        driverListUrl: function () {
	            return '/tms/emp/list';
	        },//初始化下拉框
	        initDropDownBox: function () {
	            return '/publicData/deliveryRecord/initDropDownBox';
	        },//获取所有运营商列表
	        getAllOperatorUrl:function() {
	        	return '/operator/qryOperator';
	        },//获取当前运营商id和角色所属运营商id
	        getOperatorIds:function() {
	        	return '/publicData/user/operatorIds';
	        },//初始进入新增/编辑/查看站点
	        initAddOrUpdateDeliveryUrl: function () {
	            return '/publicData/deliveryRecord/initAddOrUpdateDelivery';
	        }
	    },
	    
	    /**
	     * 页面下拉框查询
	     */
	    initDropDownBox : function () {
	    	$.callAjax({
				type:"post",
				url : drManager.URL.initDropDownBox(),
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			//填充dialog
	         	    	//显示dialog
	         			return;
	         		}
	         		for(var i=0;i<data.data.deliveryTypeList.length;i++){
	         			deliveryTypeArr[data.data.deliveryTypeList[i].dictValue]=data.data.deliveryTypeList[i].dictDesc;
	         			$('#deliveryType').append("<option value='"+data.data.deliveryTypeList[i].dictValue+"'>"+data.data.deliveryTypeList[i].dictDesc+"</option>");
	         			$('#deliveryType_01').append("<option value='"+data.data.deliveryTypeList[i].dictValue+"'>"+data.data.deliveryTypeList[i].dictDesc+"</option>");
	         		}
	         		for(var i=0;i<data.data.levelList.length;i++){
	         			levelArr[data.data.levelList[i].dictValue]=data.data.levelList[i].dictDesc;
	         			$('#level_ds').append("<option value='"+data.data.levelList[i].dictValue+"'>"+data.data.levelList[i].dictDesc+"</option>");
	         		}
	         		
				},
				error : function(){
					$.toastrError();
				}
			});
	    },
	    /**查：所有运营商**/
	    getAllOperator: function (selecteID) {
	    	var params ={"viewSearchVo":{"pageSize":"999999","offset":"0"},"enabled":1};
			$.callAjax({
				type:"post",
				url : drManager.URL.getAllOperatorUrl(),
				data : params,
				async: false,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			//填充dialog
	         	    	//显示dialog
	         			return;
	         		}
	         		//alert(data.data.rows[0].companyName);
	         		var arr = new Array();
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
	    /**
	     * 获取用户当前所在运营商和所属运营商Id
	     */
	    getOperatorIds:function (){
	    	var res = null;
	    	$.callAjax({
				type:"post",
				url : drManager.URL.getOperatorIds(),
                async: false,
				data : {},
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			return;
	         		}
	         		//获取数据
	         		var currOID = data.data.operatorId;//当前运营商ID
	         		var userType = data.data.userType;//用户类型，0：运维（超管），1：运营商
	         		res = currOID + "," + userType;
				},
				error : function(){
					$.toastrError();
					return;
				}
			});
	    	return res;
	    },
	    /**分页获取站点列表**/
	    searchListByPage: function () {
	    	//分页组件
	    	$.pageTable({
	    		tableId: "#drManagerTable",//需要分页的table ID
	    		url: drManager.URL.searchListByPageUrl(),//请求后台的URL（*）
	    		queryParams:queryParams,
	    		toolbar: '#toolbar',
				toolbarAlign:'right',
	    		onLoadSuccess:function(){
	    			drManager.isResetOffset = 0;
	    			$("#btn_search").removeClass("disabled");
	            },
	            sortable: true,
	    		sortName:'createTime',
	    		sortOrder:'desc',
	    		columns: [{
	    			checkbox: true
	    		}, {
	    			field: 'code',
	    			title: '编码',
	    			formatter:function(value,row,index){
						return '<a class="drDetail_a" href="javascript:void(0)" code="' + row.code +'">' + row.code + '</a>';
	    			},
	    	        events: 'operateEvents'
	    		},  {
	    			field: 'name',
	    			title: '名称',
	    			align: 'center'
	    		}, {
	    			field: 'deliveryType',
	    			title: '类型',
	    			align: 'center',
	    			formatter:function(value,row,index){
							return deliveryTypeArr[value];
	    			}
	    		}, {
	    			field: 'superiorName',
	    			title: '上级',
	    			align: 'center',
	    			formatter:function(value,row,index){
						if(value==""){
							return '-';
						} else {
							return value;
						}
	    			}
	    		}, {
	    			field: 'enabled',
	    			title: '状态',
	    		    align: 'center',
	    			formatter:function(value,row,index){
						if(value==1){
							return '生效';
						}else if(value==0){
							return '<span style="color:red">失效</span>';
						}
	    			}
	    		}, {
	    			field: 'province',
	    			title: '站点地址',
	    			align: 'center',
	    			formatter:function(value,row,index){
	    				return row.detailedAddress;
	    				/*var html="";
	    				if(row.provinceName!=''&&row.provinceName!=null){
	    					html+=row.provinceName;
	    				}
	    				if(row.cityName!=''&&row.cityName!=null){
	    					html+=">>"+row.cityName;
	    				}
	    				if(row.areaName!=''&&row.areaName!=null){
	    					html+=">>"+row.areaName;
	    				}
	    				if(row.streetName!=''&&row.streetName!=null){
	    					html+=">>"+row.streetName;
	    				}
	    				var address = row.detailedAddress==null?"":row.detailedAddress;
						return html +">>"+ address;*/
	    			}
	    		}, {
	    			field: 'deliveryHeadName',
	    			title: '负责人',
	    		    align: 'center'
	    		}, {
	    			field: 'deliveryHeadPhone',
	    			title: '联系电话',
	    		    align: 'center'
	    		}, /*{
	    			field: 'describes',
	    			title: '描述',
	    		    align: 'center'
	    		},*//* {
	    			field: 'createTime',
	    			title: '创建记录',
	    		    align: 'center',
					formatter:function(value,row,index){
						var time = row.createTime==null?"":drManager.format(row.createTime,"yyyy-MM-dd HH:mm:ss")
						var name = row.creatorName==null?"":row.creatorName;
						return name+"</br>"+time;
					}
	    		}, {
	    			field: 'updateTime',
	    			title: '修改记录',
	    		    align: 'center',
					formatter:function(value,row,index){
						var time = row.updateTime==null?"":drManager.format(row.updateTime,"yyyy-MM-dd HH:mm:ss");
						var name = row.modifierName==null?"":row.modifierName;
						return name+"</br>"+time;
					}
	    		},*/{
	    			field: 'id',
	    			title: '操作',
	    			align: 'center',
	    	        formatter:function(value,row,index){
	    	        	
	    	        	//注释掉按钮的权限控制
	    	        	/*var loadUpdateUrl=drManager.URL.deleteDRUrl();
	    				var html='';
	    				if(auth.isAuth(loadUpdateUrl)){
	    					html='<a class="btn btn-success delete_a" href="javascript:void(0)" >删除</a>';
	    				}
	    				
	    	        	html+="";
	    	        	
	    	        	var loadUpdateUrl=drManager.URL.getDRDetaisUrl();
	    				var html='';
	    				if(auth.isAuth(loadUpdateUrl)){
	    					html+='<a class="btn btn-info edit_a" href="javascript:void(0)" >编辑</a>';
	    				}*/
	    	        	
	    	        	
	    	        	//var html='<a class="btn btn-sm btn-primary edit_a" href="javascript:void(0)" >编辑</a><a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
	    	        	var html='<a class="btn btn-primary btn-sm edit_btn" href="javascript:void(0)" >编辑</a><a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
	    	            return html; 
	    	        },
	    	        events: 'operateEvents'
	    	    }  
	    		]
	    	});
	    },
	    
	    
	    getPointList: function (selecteID) {
			$.callAjax({
				type:"post",
				url : drManager.URL.searchListByPageUrl(),
				queryParams : queryParams_list,
				async: false,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			//填充dialog
	         	    	//显示dialog
	         			return;
	         		}
	         		var arr = new Array();
	         		arr.push("<option value=''>所有站点</option>");
	         		for(var item in data.data.rows) {
	         			arr.push("<option ");
	         			arr.push("value='");
	         			arr.push(data.data.rows[item].id);
	         			arr.push("'");
	         			arr.push(">");
	         			arr.push(data.data.rows[item].name);
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
	    /**分页获取上级站点列表**/
	    searchListByPageSJ: function () {
	    	//分页组件
	    	$.pageTable({
	    		tableId: "#superiorList",//需要分页的table ID
	    		url: drManager.URL.searchListByPageUrl(),//请求后台的URL（*）
	    		queryParams:queryParamsSJ,
	    		onLoadSuccess:function(){
	    			drManager.isResetOffset = 0;
	    			$("#btn_search_s").removeClass("disabled");
	            },
	    		columns: [{
	    			radio: true
	    		}, {
	    			field: 'code',
	    			title: '编码'
	    		}, {
	    			field: 'name',
	    			title: '名称',
	    			align: 'center'
	    		}, {
	    			field: 'deliveryType',
	    			title: '类型',
	    			align: 'center',
	    			formatter:function(value,row,index){
						return deliveryTypeArr[value];
	    			}
	    		}
	    		]
	    	});
	    },
	  //查询司机列表
		searchEmp :function(){
			$.pageTable({
	    		tableId: "#empList",//需要分页的table ID
	    		url: drManager.URL.driverListUrl(),//请求后台的URL（*）
	    		queryParams:queryParamsEmp,
	    		onLoadSuccess:function(){
	    			drManager.isResetOffset = 0;
	    			$("#btn_search_emp").removeClass("disabled");
	            },
	    		columns: [{
	    			radio: true
	    		}, {
	    			field: 'uniqueKey',
	    			title: 'key值'
	    		}, {
	    			align: 'center',
	    			field: 'cnName',
	    			title: '中文名'
	    		},{
	    			align: 'center',
	    			field: 'mobileNo',
	    			title: '手机号码'
	    		}
	    		]
	    	});
		},
	    
	    /**分页获取站点范围列表**/
	    searchListByPage01: function () {
	    	//分页组件
	    	$.pageTable({
	    		tableId: "#dsManagerTable1",//需要分页的table ID
	    		url: drManager.URL.dsSearchListByPageUrl(),//请求后台的URL（*）
	    		queryParams:queryParams01,
	    		onLoadSuccess:function(){
	    			drManager.isResetOffset = 0;
	            },
	            sortable: true,
	            async: false,
	    		sortName:'createTime',
	    		sortOrder:'desc',
	    		columns: [{
	    			radio: true
	    		}, {
	    			field: 'PCAS',
	    			title: '行政区域',
	    			formatter:function(value,row,index){
	    				var html="";
	    				if(row.provinceName!=''&&row.provinceName!=null){
	    					html+=row.provinceName;
	    				}
	    				if(row.cityName!=''&&row.cityName!=null){
	    					html+=">>"+row.cityName;
	    				}
	    				if(row.areaName!=''&&row.areaName!=null){
	    					html+=">>"+row.areaName;
	    				}
	    				if(row.streetName!=''&&row.streetName!=null){
	    					html+=">>"+row.streetName;
	    				}
						return html;
	    			},
	    	        events: 'operateEvents'
	    		}, {
	    			field: 'name',
	    			title: '名称',
	    			align: 'center'
	    		}, {
	    			field: 'level',
	    			title: '类型',
	    			align: 'center',
	    			formatter:function(value,row,index){
	    				
							return levelArr[value];
	    			}
	    		}, {
	    			field: 'creatorName',
	    			title: '创建人',
	    		    align: 'center'
	    		}, {
	    			field: 'createTime',
	    			title: '创建时间',
					formatter:function(value,row,index){
						return drManager.format(row.createTime,"yyyy-MM-dd HH:mm:ss");
					},
	    		    align: 'center'
	    		}
	    		]
	    	});
	    },
	    /**分页获取站点范围排除列表**/
	    searchListByPage02: function () {
	    	//分页组件
	    	$.pageTable({
	    		tableId: "#dsManagerTable2",//需要分页的table ID
	    		url: drManager.URL.dsSearchListByPageUrl(),//请求后台的URL（*）
	    		queryParams:queryParams02,
	    		onLoadSuccess:function(){
	    			drManager.isResetOffset = 0;
	            },
	            sortable: true,
	    		sortName:'createTime',
	    		sortOrder:'desc',
	    		columns: [{
	    			radio: true
	    		}, {
	    			field: 'PCAS',
	    			title: '行政区域',
	    			formatter:function(value,row,index){
	    				var html="";
	    				if(row.provinceName!=''&&row.provinceName!=null){
	    					html+=row.provinceName;
	    				}
	    				if(row.cityName!=''&&row.cityName!=null){
	    					html+=">>"+row.cityName;
	    				}
	    				if(row.areaName!=''&&row.areaName!=null){
	    					html+=">>"+row.areaName;
	    				}
	    				if(row.streetName!=''&&row.streetName!=null){
	    					html+=">>"+row.streetName;
	    				}
						return html;
	    			},
	    	        events: 'operateEvents'
	    		}, {
	    			field: 'name',
	    			title: '名称',
	    			align: 'center'
	    		}, {
	    			field: 'level',
	    			title: '类型',
	    			align: 'center',
	    			formatter:function(value,row,index){
	    				return levelArr[value];
	    			}
	    		}, {
	    			field: 'creatorName',
	    			title: '创建人',
	    		    align: 'center'
	    		}, {
	    			field: 'createTime',
	    			title: '创建时间',
					formatter:function(value,row,index){
						return drManager.format(row.createTime,"yyyy-MM-dd HH:mm:ss");
					},
	    		    align: 'center'
	    		}
	    		]
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
		/**
		 * 删除站点
		 * @param id
		 */
	    deleteDR : function (id) {
	    	$.dialogConfirm({
	            message: '您确定要删除ID为['+id+']的站点吗?',
	            callback: function(result) {
	                if(result) {
	           		    var params = {"id":id};
	        			$.callAjax({
	        				url : drManager.URL.deleteDRUrl(),
	        				data : params,
	        				success : function(data){
	    		         		if(data.code != "0000"){
	    		         			$.toastrWarning(data.msg); 
	    		         			return;
	    		         		}
	    		         		$('#drManagerTable').bootstrapTable('refresh');
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
	     * 删除站点范围
	     * @param id
	     * @param type
	     */
	    deleteDS : function (id,type) {
	    	$.dialogConfirm({
	            message: '您确定要删除ID为['+id+']的站点范围吗?',
	            callback: function(result) {
	                if(result) {
	           		    var params = {"id":id,'deliveryRecordId':$.ToCDB($('#formId').val())};
	        			$.callAjax({
	        				url : drManager.URL.deleteDeliveryScope(),
	        				data : params,
	        				success : function(data){
	    		         		if(data.code != "0000"){
	    		         			$.toastrWarning(data.msg); 
	    		         			return;
	    		         		}
	    		         		
	    		         		if(type=='1'){
	    		         			$('#dsManagerTable1').bootstrapTable('refresh');
	    		         		}else if(type=='2'){
	    		         			$('#dsManagerTable2').bootstrapTable('refresh');
	    		         		}
	    		         		$('#drManagerTable').bootstrapTable('refresh');
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
	    
	    
	    //省
	    createSelect :function(){
	    	
	    	
	    	
	    	
	    },
	    
	    //查询区域//通过上级ID查找下级
quereArea :function(id,type){
	    	
	    	var params={
	    		'id':id	
	    	};
	    	$.callAjax({
    			type:"post",
    			url : drManager.URL.quereArea(),
    			data : params,
    			async: false,
    			success : function(data){
             		if(data.code != "0000"){
             			$.toastrWarning(data.msg);
             			//填充dialog
             	    	//显示dialog
             			return;
             		}
             		data = data.data;
	             	if(type=="province" && data.length != 0 ){
	             		document.getElementById('provinceId').options.length = 0;
	             		$('#dropdownOptionsForprovinceId ul').html("");
	             		
	             		for(var i=0;i<data.length;i++){
	             			province = province.add({
		             		    text : data[i].areaName,
		             		    value : data[i].id
		             		});
	             		}
	             		$('#dropdownThemeForprovinceId span nobr').html(data[0].areaName)
	             		$("#province_val").val(data[0].id);
	             		drManager.quereArea(data[0].id,'city');
	             		
	             		
	             	}else if(type=="city" && data.length != 0){
	             		document.getElementById('cityId').options.length = 0;
	             		$('#dropdownOptionsForcityId ul').html("");
	             		city = city.add({
	             		    text : '',
	             		    value : ''
	             		});
	             		for(var i=0;i<data.length;i++){
	             			city = city.add({
		             		    text : data[i].areaName,
		             		    value : data[i].id
		             		});
	             		}
	             		$('#dropdownThemeForcityId span nobr').html(data[0].areaName);
	             		$("#city_val").val(data[0].id);
	             		drManager.quereArea(data[0].id,'area');
	             	}else if(type=="area"){
	             		document.getElementById('areaId').options.length = 0;
	             		$('#dropdownOptionsForareaId ul').html("");
	             		area = area.add({
	             		    text : '',
	             		    value : ''
	             		});
	             		for(var i=0;i<data.length;i++){
	             			area = area.add({
		             		    text : data[i].areaName,
		             		    value : data[i].id
		             		});
	             			
	             		}
	             		if(data.length != 0){
	             			$('#dropdownThemeForareaId span nobr').html(data[0].areaName);
		             		$("#area_val").val(data[0].id);
		             		drManager.quereArea(data[0].id,'street');
	             		}else{
	             			$('#dropdownThemeForareaId span nobr').html("")
	             			$("#area_val").val(null);
	             			drManager.quereArea('','street');
	             		}
	             		
	             	}else if(type=="street" ){
	             		document.getElementById('streetId').options.length = 0;
	             		$('#dropdownOptionsForstreetId ul').html("");
	             		street = street.add({
	             		    text : '',
	             		    value : ''
	             		});
	             		for(var i=0;i<data.length;i++){
	             			
	             			street = street.add({
		             		    text : data[i].areaName,
		             		    value : data[i].id
		             		});
	             		}
	             		if(data.length != 0){
	             			$('#dropdownThemeForstreetId span nobr').html(data[0].areaName)
	             			$("#street_val").val(data[0].id);
	             		}else{
	             			$('#dropdownThemeForstreetId span nobr').html("")
	             			$("#street_val").val(null);
	             		}
	             	}
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
	    	
	    	
	    },
	  //查询站点范围区域
	    quereAreaDS :function(id,type){
	    	var params={
	    		'id':id	
	    	};
	    	$.callAjax({
    			url : drManager.URL.quereArea(),
    			data : params,
    			async: false,
    			success : function(data){
             		if(data.code != "0000"){
             			$.toastrWarning(data.msg);
             			//填充dialog
             	    	//显示dialog
             			return;
             		}
	             	if(type=="province" && data.data.length != 0 ){
	             		document.getElementById('provinceId_ds').options.length = 0;
	             		$('#dropdownOptionsForprovinceId_ds ul').html("");
	             		
	             		for(var i=0;i<data.data.length;i++){
	             			province_ds = province_ds.add({
		             		    text : data.data[i].areaName,
		             		    value : data.data[i].id
		             		});
	             		}
	             		$('#dropdownThemeForprovinceId_ds span nobr').html(data.data[0].areaName)
	             		$("#province_val_ds").val(data.data[0].id);
	             		drManager.quereAreaDS(data.data[0].id,'city');
	             		
	             		
	             	}else if(type=="city" && data.data.length != 0){
	             		document.getElementById('cityId_ds').options.length = 0;
	             		$('#dropdownOptionsForcityId_ds ul').html("");
	             		city_ds = city_ds.add({
	             		    text : '',
	             		    value : ''
	             		});
	             		for(var i=0;i<data.data.length;i++){
	             			city_ds = city_ds.add({
		             		    text : data.data[i].areaName,
		             		    value : data.data[i].id
		             		});
	             		}
	             		$('#dropdownThemeForcityId_ds span nobr').html(data.data[0].areaName);
	             		$("#city_val_ds").val(data.data[0].id);
	             		drManager.quereAreaDS(data.data[0].id,'area');
	             	}else if(type=="area"){
	             		document.getElementById('areaId_ds').options.length = 0;
	             		$('#dropdownOptionsForareaId_ds ul').html("");
	             		area_ds = area_ds.add({
	             		    text :'',
	             		    value : ''
	             		});
	             		for(var i=0;i<data.data.length;i++){
	             			area_ds = area_ds.add({
		             		    text : data.data[i].areaName,
		             		    value : data.data[i].id
		             		});
	             		}
	             		if(data.data.length != 0){
	             			$('#dropdownThemeForareaId_ds span nobr').html(data.data[0].areaName);
	             			$("#area_val_ds").val(data.data[0].id);
	             			drManager.quereAreaDS(data.data[0].id,'street');
	             		}else{
	             			$('#dropdownThemeForareaId_ds span nobr').html("")
	             			$("#area_val_ds").val(null);
	             			drManager.quereAreaDS('','street');
	             		}
	             		
	             	}else if(type=="street" ){
	             		document.getElementById('streetId_ds').options.length = 0;
	             		$('#dropdownOptionsForstreetId_ds ul').html("");
	             		street_ds = street_ds.add({
	             		    text : '',
	             		    value : ''
	             		});
	             		for(var i=0;i<data.data.length;i++){
	             			
	             			street_ds = street_ds.add({
		             		    text : data.data[i].areaName,
		             		    value : data.data[i].id
		             		});
	             		}
	             		if(data.data.length != 0){
	             			$('#dropdownThemeForstreetId_ds span nobr').html(data.data[0].areaName)
	             			$("#street_val_ds").val(data.data[0].id);
	             		}else{
	             			$('#dropdownThemeForstreetId_ds span nobr').html("")
	             			$("#street_val_ds").val(null);
	             		}
	             	}
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
	    	
	    	
	    },
	    
	    /**
	     * 添加更新站点范围
	     * @param type
	     */
	    
	    addOrUpdateDS :function(type){
	    	var urlValue;
			if(type=="add"){
				urlValue=drManager.URL.addDeliveryScope();
			}if(type=="update"){
				urlValue=drManager.URL.updateDeliveryScope();
			}
			var addressType = $("#level_ds").val();
			var street = $("#street_val_ds").val();
			var area = $("#area_val_ds").val();
			if(addressType == 10) {
				area = "";
				street = "";
			} else if (addressType == 20) {
				street = "";
			}
			var params={
					'id':$.ToCDB($('#id_ds').val()),
					'deliveryRecordId':$.ToCDB($('#formId').val()),
					'deliveryRecordType':$.ToCDB($('#deliveryType').val()),
					'operatorId':$.ToCDB($('#operatorId').val()),
					'province':$.ToCDB($('#province_val_ds').val()),
	    			'city':$.ToCDB($('#city_val_ds').val()),
	    			'area':$.ToCDB(area),	
	    			'street':$.ToCDB(street),
					'level':$.ToCDB($('#level_ds').val()),
					'name':$.ToCDB($('#name_ds').val()),
					'isDelivery':$.ToCDB($('#type_ds').val()),
					'level':$.ToCDB($("#level_ds").val())
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
	             		$.hideModal('#myModal01');
	             		if($('#type_ds').val()=='1'){
	             			$('#dsManagerTable1').bootstrapTable('refresh');
	             			
	             		}else if($('#type_ds').val()=='2'){
	             			$('#dsManagerTable2').bootstrapTable('refresh');
	             		}
	             		resetAddress();
	             		//刷新站点表单
	             		$('#drManagerTable').bootstrapTable('refresh');
	    			},
	    			error : function(){
	    				$.toastrError();
	    			}
	    		});
			
		},
	    /**
	     * 添加更新站点edit_a
	     * @param type
	     */
		addOrUpdateDR :function(type){
			if($("#deliveryType").val() != 10) {
				if($("#superior").val() == null || $("#superior").val().trim().length == 0) {
					$.toastrWarning("请选择上级站点");
					return;
				}
			}
			if($("#superiorType").val() > $("#deliveryType").val()) {
				$.toastrWarning("请选择正确的上级站点，总仓>微仓>配送点");
				return;
			}
			var urlValue;
			if(type=="add"){
				urlValue=drManager.URL.addDRUrl();
			}if(type=="update"){
				urlValue=drManager.URL.updateDR();
			}
			var params={
					'id':$.ToCDB($('#formId').val()),
					'code':$.ToCDB($("#code").val()),
	    			'name':$.ToCDB($('#name').val()),
	    			'deliveryType':$.ToCDB($('#deliveryType').val()),	
	    			'superior':$.ToCDB($('#superiorId').val()),
	    			'deliveryHead':$.ToCDB($("#deliveryHeadId").val()),
	    			'deliveryHeadName':$.ToCDB($("#deliveryHead").val()),
	    			'provinceName':$.ToCDB($("#province span").text()),
	    			'cityName':$.ToCDB($("#city span").text()),
	    			'areaName':$.ToCDB($("#area span").text()),
	    			'streetName':$.ToCDB($("#street span").text()),
	    			'deliveryHeadPhone':$.ToCDB($('#deliveryHeadPhone').val()),
	    			'latitude':$.ToCDB($('#latitude').val()),
	    			'longitude':$.ToCDB($('#longitude').val()),	
	    			'operatorId':$.ToCDB($('#operatorId').val()),
	    			'enabled':$.ToCDB($('#enabled').val()),
	    			'province':$.ToCDB($('#province_val').val()),
	    			'city':$.ToCDB($('#city_val').val()),
	    			'area':$.ToCDB($('#area_val').val()),
	    			'street':$.ToCDB($('#street_val').val()),
	    			'detailedAddress':$.ToCDB($('#detailedAddress').val())
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
	             			if(type=="add"){
	             				 //$("#btn_save_submit").addClass("disabled");
	             			}
	             			return;
	             		}
	             		
	             		if(type=="add"){
	             			$('#formId').val(data.data.id);
	             			disableTab();
	             			$.toastrSuccess('添加成功！');
	             		} else {
	             			$.toastrSuccess('保存成功！');
	             		}
	             		
	             		
	             		//$.hideModal('#myModal');
	             		$('#drManagerTable').bootstrapTable('refresh');
	    			},
	    			error : function(){
	    				$.toastrError();
	    			}
	    		});
			
			
		},
		/**
	     * 改变状态
	     */
	    changeDRStatus:function (id,enabled){
	    	var params={
	    		"ids":id,
	    		"enabled":enabled	
	    	}
	    	$.callAjax({
				type:"post",
				url : drManager.URL.changeDRStatusUrl(),
				data : params,
				async: false,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			//填充dialog
	         	    	//显示dialog
	         			return;
	         		}
	         		$('#drManagerTable').bootstrapTable('refresh');
	         		$.toastrSuccess('操作成功！');
				},
				error : function(){
					$.toastrError();
				}
			});
	    },
		/**编辑，查看详情**/
	    getDRDetais: function (id,type) {
	    	document.getElementById("addAnchorForm").reset();
		    //$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发Ajax
	    	var params = {
	    		'id':id
	    	};
			$.callAjax({
				type:"post",
				url : drManager.URL.getDRDetaisUrl(),
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
	         		
	         		$('#formId').val(data.data.id);
	         		$("#code").val(data.data.code);
	         		/*$("#enabled option[value='"+ data.data.enabled+"']").attr("selected",true);*/
	         		$("#enabled").val(data.data.enabled);
	         		$("#operatorId").val(data.data.operatorId);
	         		$("#operatorName").val(data.data.operatorName);
	         		$("#name").val(data.data.name);
	         		//$("#deliveryType option[value='"+ data.data.deliveryType+"']").attr("selected",true);
	         		$("#deliveryType").val(data.data.deliveryType);
	         		$("#superiorId").val(data.data.superior);
	         		$("#superior").val(data.data.superiorName);
	         		$("#deliveryHeadId").val(data.data.deliveryHead);
	         		$("#deliveryHead").val(data.data.deliveryHeadName);
	         		$("#deliveryHeadPhone").val(data.data.deliveryHeadPhone);
	         		$("#latitude").val(data.data.latitude);
	         		$("#longitude").val(data.data.longitude);
	         		
	         		$('#province_val').val(data.data.province);
	         		$('#city_val').val(data.data.city);
	         		$('#area_val').val(data.data.area);
	         		$('#street_val').val(data.data.street);
	         		
	         		$('#dropdownThemeForprovinceId span nobr').html(data.data.provinceName);
	         		$('#dropdownThemeForcityId span nobr').html(data.data.cityName);
	         		$('#dropdownThemeForareaId span nobr').html(data.data.areaName);
	         		$('#dropdownThemeForstreetId span nobr').html(data.data.streetName);
	         		
	         		$("#detailedAddress").val(data.data.detailedAddress);
	         		
	         		defaultValue(data.data.province,data.data.city,data.data.area,data.data.street,0);
	         		
	         		if(type=="look"){
	         			$("#myModalLabel").text("查看站点详情");
	         			$("#btn_save_submit").hide();
	         			$("#btn_edit_submit").hide();
	         			drManager.disableForm('addAnchorForm',true);
	         			$('#fromSouSuo01').hide();
	         			$('#fromSouSuo02').hide();
	         		}else if(type=="edit"){
	         			$("#myModalLabel").text("编辑站点");
	         			$("#btn_edit_submit").show();
	         			$("#btn_save_submit").hide();
	         			drManager.disableForm('addAnchorForm',false);
	         			$('#fromSouSuo01').show();
	         			$('#fromSouSuo02').show();
	         			$('#operatorName').attr("disabled",true);
	         		}
	    		    $('#dsManagerTable1').bootstrapTable('refresh');
	    		    $('#dsManagerTable2').bootstrapTable('refresh');
	         		$.showModal('#myModal');;
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
		        	/*code: {
		                validators: {
		                    notEmpty: {
		                        message: '编码值不能为空！'
		                    }
		                }
		            },*/
		            name: {
		                validators: {
		                    notEmpty: {
		                        message: '名字不能为空！'
		                    }
		                }
		            },
		            /*superior: {
		                validators: {
		                    notEmpty: {message: '上级不能为空！'},
		                }
		            },*/
		            /*deliveryHead: {
		                validators: {
		                    notEmpty: {message: '负责人不能为空！'},
		                }
		            },*/
		            deliveryHeadPhone: {
		            	validators: {
		                    notEmpty: {message: '联系电话不能为空！'},
		                    regexp: {
		                         regexp:/^((0\d{2,3}-\d{7,8})|(1[73584]\d{9}))$/,//  /^1[3|5|8]{1}[0-9]{9}$/
		                         message: '请输入正确的电话号码'
		                     }
		                }
		            },
		           /* operatorId: {
		                validators: {
		                    notEmpty: {message: '运营商不能为空！'},
		                }
		            },*/
		            detailedAddress: {
		                validators: {
		                    notEmpty: {message: '站点地址不能为空！'}
		                }
		            }
		        },
		        excluded: [':disabled'] 
		    });
	    	//表单验证end
	    },
	    
	     
	  //站点表单检验
	    validatePoint:function(){
	    	//表单验证start
	    	$('#dsForm').bootstrapValidator({
		        message: 'This value is not valid',
		        feedbackIcons: {
		        	      valid: 'glyphicon glyphicon-ok',
		        	      invalid: 'glyphicon glyphicon-remove',
		        	      validating: 'glyphicon glyphicon-refresh'
	            },
		        fields: {
		        	name_ds: {
		                validators: {
		                    notEmpty: {
		                        message: '名字不能为空！'
		                    },
		                    stringLength: {
		                         min: 2,
		                         max: 10,
		                         message: '请输入2-10个汉字之间的名称'
		                     }
		                }
		            }
		        },
		        excluded: [':disabled'] 
		    });
	    	//表单验证end
	    },
	    
	    /**站点范围编辑，查看详情**/
	    getDSDetais: function (id) {
	    	document.getElementById("dsForm").reset();
		    //$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//触发Ajax
	    	var params = {
	    		'id':id
	    	};
			$.callAjax({
				type:"post",
				url : drManager.URL.queryDeliveryScopeDetails(),
				data : params,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			return;
	         		}
	         		if(data.data==null){
	         			$.toastrSuccess('查询结果为空！');
	         		}
	         		
	         		
	         		$("#name_ds").val(data.data.name);
	         		/*$("#level_ds option[value='"+ data.data.level+"']").attr("selected",true);*/
	         		$("#level_ds").val(data.data.level);
	         		
	         		$("#province_val_ds").val(data.data.province);
	         		$("#city_val_ds").val(data.data.city);
	         		$("#area_val_ds").val(data.data.area);
	         		$("#street_val_ds").val(data.data.street);
	         		
	         		$('#dropdownThemeForprovinceId_ds span nobr').html(data.data.provinceName);
	         		$('#dropdownThemeForcityId_ds span nobr').html(data.data.cityName);
	         		$('#dropdownThemeForareaId_ds span nobr').html(data.data.areaName);
	         		$('#dropdownThemeForstreetId_ds span nobr').html(data.data.streetName);
	         		defaultValue(data.data.province,data.data.city,data.data.area,data.data.street,1);
	         		$("#type_ds").val(data.data.isDelivery);
	         		changeAddress();
	         		$.showModal('#myModal01');;
				},
				error : function(){
					$.toastrError();
				}
			});
			
	    },
	    
	    
	    bindEvent: function(){
	    	$("#btn_search").on("click",function () {
		  		  $("#btn_search").addClass("disabled");
		  		  drManager.isResetOffset = 1;
		  		  $('#drManagerTable').bootstrapTable('refresh');
		  		  
		    });
		    
		    //绑定编辑站点信息按钮
		    $("#btn_delivery_edit").click(function () {
		    	var recordTbSelections = $("#drManagerTable").bootstrapTable('getSelections');
		    	if($.isNull(recordTbSelections) || recordTbSelections.length <= 0){
		    		$.toastrWarning("请选择一条数据进行操作！");
		    		return;
		    	}
		    	if(recordTbSelections.length > 1){
		    		$.toastrWarning("请只选定一条数据进行操作！");
		    		return;
		    	}
		    	var deliveryRecord = recordTbSelections[0];
			
		        myMain.getAllContent(drManager.URL.initAddOrUpdateDeliveryUrl() + "?operationType=edit&deliveryRecordId=" + deliveryRecord.id);
		    });
		    
		    //绑定查看站点信息
		    $("#btn_view_detail").click(function() {
			var recordTbSelections = $("#drManagerTable").bootstrapTable('getSelections');
			if ($.isNull(recordTbSelections) || recordTbSelections.length <= 0) {
				$.toastrWarning("请选择一条数据进行操作！");
				return;
			}
			if (recordTbSelections.length > 1) {
				$.toastrWarning("请只选定一条数据进行操作！");
				return;
			}
			var deliveryRecord = recordTbSelections[0];
			myMain.getAllContent(drManager.URL.initAddOrUpdateDeliveryUrl() + "?operationType=view&deliveryRecordId=" + deliveryRecord.id);
		});
		    
	    	// 绑定展示新增界面事件
	    	$("#btn_show_add").click(function () {
	    		myMain.getAllContent(drManager.URL.initAddOrUpdateDeliveryUrl() + "?operationType=add");
	    		
	    		return;
	    		//启用覆盖范围、排除范围的新增、编辑、删除按钮
	    		buttonController('enabled');
	    		
	    		 document.getElementById("addAnchorForm").reset();
	    		 //恢复绑定
	    		 recoveryTab();
	    		 $('#addAnchorForm').bootstrapValidator('resetForm', true);
	    		 //上级站点校验
	    		 disClick();
	    		 //获取当前运营商和userType
	    		 var str = drManager.getOperatorIds();
	    		 //当前运营商Id
	    		 var operatorId = str.split(',')[0];
	    		 //用户类型
	    		 var userType = str.split(',')[1];
	    		 //打开运营商列表
	    		 drManager.getAllOperator('operatorId');
	    		 //默认选中当前运营商
	    		 $("#operatorId").val(operatorId);
	    		 drManager.quereArea('0','province');
	    		// $('#addAnchorForm').data('bootstrapValidator').resetForm();
	    		 $("#myModalLabel").text("新增站点");
	    		 $("#operatorName").val(myMain.selfCompanyName);
			     $("#btn_save_submit").show();
			     $("#btn_edit_submit").hide();
			     $('#formId').val(0);
			     $('#dsManagerTable1').bootstrapTable('refresh');
	    		 $('#dsManagerTable2').bootstrapTable('refresh');
	    		 $("#btn_save_submit").removeClass("disabled");
	    		 drManager.disableForm('addAnchorForm',false);
	    		 
	    		 if(userType != 0) { 
	    			 $("#operatorId").attr("disabled",true);
	    		 } else {
	    			 $("#operatorId").attr("disabled",false);
	    		 }
	    		 $("#operatorId").attr("disabled",true);
      			 $('#fromSouSuo01').show();
      			 $('#fromSouSuo02').show();
      			 $('#operatorName').attr("disabled",true);
      			
      			 $("#deliveryHead").css("width","199px");
      			 $("#superior").css("width","199px");
      			 $("#btn_cancel").css("margin-left","55px");
			     $.showModal('#myModal');
		    });
	    	
	    	$("#btn_save_submit").click(function () {
	    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
	    		bootstrapValidator.validate();
	    		if(bootstrapValidator.isValid())
	    			drManager.addOrUpdateDR('add');
	    		else return;
		    });
	    	$("#btn_edit_submit").click(function(){
	    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
	    		bootstrapValidator.validate();
	    		if(bootstrapValidator.isValid())
	    			drManager.addOrUpdateDR('update');
	    		else return;
	    		$.hideModal('#myModal');
	    	});
	    	
	    	 $("#btn_is_true").click(function(){
	    		var status = false;
	    		if($("#drManagerTable").bootstrapTable('getSelections').length>0){
	    			var ids = new Array();
		 	    	$.map($("#drManagerTable").bootstrapTable('getSelections'), function(row) {
	     				if(row.enabled==0){
	     					status = true;
	     					ids.push(row.id);
	     				}
	                 });
		 	    	if(!status) {
						$.toastrWarning("已经是‘生效’状态！");
		    			return;
		    		}
		 	    	drManager.changeDRStatus(ids,1);
	    		} else {
	    			$.toastrWarning("请选择一条数据进行操作！");
	    		}
	 	    	
	     	});
	 	    $("#btn_is_false").click(function(){
	 	    	var status = false;
	 	    	if($("#drManagerTable").bootstrapTable('getSelections').length>0){
	 	    		var ids = new Array();
			    	$.map($("#drManagerTable").bootstrapTable('getSelections'), function(row) {
	     				if(row.enabled==1){
	     					status = true;
	    	    			ids.push(row.id);
	     				}
	                 });
			    	if(!status) {
						$.toastrWarning("已经是‘失效’状态！");
		    			return;
		    		}
			    	drManager.changeDRStatus(ids,0);
	 	    	} else {
	 	    		$.toastrWarning("请选择一条数据进行操作！");
	 	    	}
		    	
	     	});
	 	    $("#btn_show_add_ds").click(function(){
	 	    	$('#id_ds').val("");
	 	    	defaultValue($("#province_val").val(),$("#city_val").val(),$("#area_val").val(),$("#street_val").val(),1);
	 	    	resetAddress();
	 	    	changeAddress();
	 	    	$('#dsForm').bootstrapValidator('resetForm', true);
		 	    if($('#formId').val()!="" && $('#formId').val()!="0"){
		 	    	$("#type_ds").val('1');
		 	    	$('#car_save_ds').show();
		 	    	$('#car_edit_ds').hide();
		 	    	document.getElementById("dsForm").reset();
		 	    	$.showModal('#myModal01');;
		 	    }else{
		 	    	$.toastrWarning("请先保存站点信息后，在操作站点范围！");
		 	    }
	 	    });
	 	   $("#btn_show_add_ds2").click(function(){
	 		   $('#id_ds').val("");
	 		   defaultValue($("#province_val").val(),$("#city_val").val(),$("#area_val").val(),$("#street_val").val(),1);
	 		   resetAddress();
	 		   changeAddress();
	 		   	if($('#formId').val()!="" && $('#formId').val()!="0"){
			 	    	$("#type_ds").val('2');
			 	    	$('#car_save_ds').show();
			 	    	$('#car_edit_ds').hide();
			 	    	document.getElementById("dsForm").reset();
			 	    	$.showModal('#myModal01');;
		 		 }else{
			 	    	$.toastrWarning("请先保存站点信息后，在操作站点范围！");
			 	  }
	 	    });
	 	   
	 	  $("#btn_show_edit").click(function(){
	 		 resetAddress();
	 		 $('#dsForm').bootstrapValidator('resetForm', true);
	 		 if($("#dsManagerTable1").bootstrapTable('getSelections').length==1){
	     			$.map($("#dsManagerTable1").bootstrapTable('getSelections'), function(row) {
	     				$('#car_save_ds').hide();
	    	 	    	$('#car_edit_ds').show();
	    	 	    	$('#id_ds').val(row.id);
	    	 	    	drManager.getDSDetais(row.id);
	                 });
	     		}else{
	     			$.toastrWarning("请选择一条数据进行操作！");
	     		}
	 		  
	 	    });
	 	  
	 	   $("#btn_show_edit2").click(function(){
	 		  resetAddress(); 
	 		  $('#dsForm').bootstrapValidator('resetForm', true);
	 		 //changeAddress();
	 		  if($("#dsManagerTable2").bootstrapTable('getSelections').length==1){
	     			$.map($("#dsManagerTable2").bootstrapTable('getSelections'), function(row) {
	     				$('#car_save_ds').hide();
	    	 	    	$('#car_edit_ds').show();
	    	 	    	$('#id_ds').val(row.id);
	    	 	    	drManager.getDSDetais(row.id);
	                 });
	     		}else{
	     			$.toastrWarning("请选择一条数据进行操作！");
	     		}
	 	    });
	 	   
	 	   $("#car_save_ds").click(function(){
	 		   var result = checkPoint();
	 		   if(result == "0000") {
	 			  drManager.addOrUpdateDS('add');
	 		   } else {
	 			  $.toastrWarning(result);
	 		   }
	 		  
	 	   });
	 	   
	 	  $("#car_edit_ds").click(function(){
	 		  	
	 		   var result = checkPoint();
	 		   if(result == "0000") {
	 			  drManager.addOrUpdateDS('update');
	 		   } else {
	 			  $.toastrWarning(result);
	 		   }
	 	   });
	 	  
	 	 $("#car_save_ds2").click(function(){
	 		   
	 		  drManager.addOrUpdateDS('add');
	 		   
	 	   });
	 	   
	 	  $("#car_edit_ds2").click(function(){
	 		  
	 		  drManager.addOrUpdateDS('update');
	 		  
	 	   });
	 	  
	 	  $("#btn_show_del").click(function(){
	 		   
	 		  	if($("#dsManagerTable1").bootstrapTable('getSelections').length==1){
	     			$.map($("#dsManagerTable1").bootstrapTable('getSelections'), function(row) {
	     				drManager.deleteDS(row.id,'1');
	                 });
	     		}else{
	     			$.toastrWarning("请选择一条数据进行操作！");
	     		}
	 	   });
	 	 $("#btn_show_del2").click(function(){
	 		   
	 		if($("#dsManagerTable2").bootstrapTable('getSelections').length==1){
     			$.map($("#dsManagerTable2").bootstrapTable('getSelections'), function(row) {
     				drManager.deleteDS(row.id,'2');
                 });
     		}else{
     			$.toastrWarning("请选择一条数据进行操作！");
     		}
	 	 });
	 	 //上级
	 	 $("#search_superior").click(function(){
	 		   drManager.searchListByPageSJ();
	 		   document.getElementById("sForm").reset();
	 		   $('#superiorList').bootstrapTable('refresh');
		 	   $.showModal('#myModal02');
		  });
	 	
	 	 $("#btn_search_s").click(function(){
	 		drManager.isResetOffset = 1;
	 		$('#superiorList').bootstrapTable('refresh');
	 		
		  });
		  $("#s_save").click(function(){
		 		 
			  if($("#superiorList").bootstrapTable('getSelections').length==1){
	     			$.map($("#superiorList").bootstrapTable('getSelections'), function(row) {
	     				$("#superiorType").val(row.deliveryType)
	     				$('#superiorId').val(row.id);
	     				$('#superior').val(row.name);
	     				$.hideModal('#myModal02');
	                 });
	     		}else{
	     			$.toastrWarning("请选择一条数据进行操作！");
	     		}
		 		
		 });
		  //负责人
		  $("#search_deliveryHead").click(function(){
	 		   drManager.searchEmp();
	 		   document.getElementById("empForm").reset();
	 		    $('#empList').bootstrapTable('refresh');
		 		$.showModal('#myModal03');
		  });
		  
		  $("#btn_search_emp").click(function(){
			  	drManager.isResetOffset = 1;
		 		$('#empList').bootstrapTable('refresh');
		 		
	      });
		  $("#emp_save").click(function(){
			  if($("#empList").bootstrapTable('getSelections').length==1){
	     			$.map($("#empList").bootstrapTable('getSelections'), function(row) {
	     				$('#deliveryHeadId').val(row.id);
	     				$('#deliveryHead').val(row.cnName);
	     				$('#deliveryHeadPhone').val(row.mobileNo);
	     				$('#addAnchorForm').data('bootstrapValidator').resetForm();
		     			/*var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
		     	    	bootstrapValidator.validate();*/
	     				$.hideModal('#myModal03');
	                 });
	     		}else{
	     			$.toastrWarning("请选择一条数据进行操作！");
	     		}
		 		
		 });
		  
		/* //绑定点击取消事件
 		 $("#btn_cancel").on("click",function() {
 			 $.modalCancel("addAnchorForm","myModal");
 		 }); */
		  
	    },
	    
		
	    init: function () {
	    	drManager.quereArea('0','province');
	    	drManager.quereAreaDS('0','province');
	    	drManager.initDropDownBox();
	    	
	    	drManager.validateform();
	    	//drManager.validatePoint();
			drManager.searchListByPage();
			drManager.searchListByPage01();
			drManager.searchListByPage02();
			drManager.createSelect();
			drManager.getPointList('parent');
	    }	
		
}
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	var code=$.ToCDB($('#code_01').val());
	var name=$.ToCDB($('#name_01').val());
	var enabled=$('#enabled_01').val();
	var deliveryType=$('#deliveryType_01').val();
	var superiorName = $("#superior").val();
	var superior = $("#parent").val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: drManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		code:code,
		name:name,
		enabled:enabled,
		deliveryType:deliveryType,
		custom1:'all',
		superiorName:superiorName,
		superior:superior
	};
	return temp;
};

var queryParams_list = function (params) {
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: drManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		enabled:"",
		deliveryType:"",
		custom1:'all'
	};
	return temp;
};

var queryParamsSJ = function (params) {
	//自定义查询参数,昵称、公司名
	var code=$.ToCDB($('#code_2').val());
	var name=$.ToCDB($('#name_2').val());
	var enabled='1';
	var deliveryType=$("#deliveryType").val();
	
	
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: drManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		code:code,
		name:name,
		enabled:enabled,
		deliveryType:deliveryType,
		custom1:'sj'
	};
	return temp;
};
var queryParamsEmp = function (params) {
	
	var cnName=$('#name_emp').val();
	var mobileNo=$('#tel_emp').val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: drManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			occupationId:null,
			enabled:'1',
			cnName:cnName,
			mobileNo:mobileNo
		};
	return temp;
};	
var queryParams01 = function (params) {
	//自定义查询参数,昵称、公司名
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: drManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		deliveryRecordId:$('#formId').val(),
		isDelivery:'1'
	};
	return temp;
};
var queryParams02 = function (params) {
	//自定义查询参数,昵称、公司名
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: drManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		deliveryRecordId:$('#formId').val(),
		isDelivery:'2'
	};
	return temp;
};

var province = DropDownList.create({
    container :$('#province'),
    attrs : {
        id : 'provinceId',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:100,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options : [
               ['','']
              ]
	
});
var province_ds = DropDownList.create({
    container :$('#province_ds'),
    attrs : {
        id : 'provinceId_ds',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:100,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options : [
               ['','']
              ]
	
});

var city = DropDownList.create({
    container :$('#city'),
    attrs : {
        id : 'cityId',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:100,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options : [
               ['','']
               ]
	
});

var city_ds = DropDownList.create({
    container :$('#city_ds'),
    attrs : {
        id : 'cityId_ds',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:100,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options : [
               ['','']
               ]
	
});

var area = DropDownList.create({
    container :$('#area'),
    attrs : {
        id : 'areaId',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:100,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options : [
               ['','']
               
              ]
	
});
var area_ds = DropDownList.create({
    container :$('#area_ds'),
    attrs : {
        id : 'areaId_ds',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:100,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options : [
               ['','']
               
              ]
	
});

var street = DropDownList.create({
    container :$('#street'),
    attrs : {
        id : 'streetId',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:150,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options :[
               ['','']
               
              ]
	
});
var street_ds = DropDownList.create({
    container :$('#street_ds'),
    attrs : {
        id : 'streetId_ds',   // 给dropdownlist一个id
        column :5,         // 展示4行
        width:150,         // 宽度为150px
        height: 30          // 每个option选项的高度
    },	
    options :[
               ['','']
               
              ]
	
});
province.change(function(){
	$('#province_val').val(province.val());
	drManager.quereArea(province.val(),'city');
	
	//city.configs.options.length=0;
});

province_ds.change(function(){
	$('#city_ds').addClass("disabled");
	$('#province_val_ds').val(province_ds.val());
	drManager.quereAreaDS(province_ds.val(),'city');
	//city.configs.options.length=0;
});

city.change(function(){
	$('#city_val').val(city.val());
	drManager.quereArea(city.val(),'area');
	
});

city_ds.change(function(){
	$('#city_val_ds').val(city_ds.val());
	drManager.quereAreaDS(city_ds.val(),'area');
	
});
area.change(function(){
	$('#area_val').val(area.val());
	drManager.quereArea(area.val(),'street');
	
});
area_ds.change(function(){
	$('#area_val_ds').val(area_ds.val());
	drManager.quereAreaDS(area_ds.val(),'street');
	
});
street.change(function(){
	$('#street_val').val(street.val());
});
street_ds.change(function(){
	$('#street_val_ds').val(street_ds.val());
});

window.operateEvents = {
	    'click .drDetail_a': function (e, value, row, index) {
	    	myMain.getAllContent(drManager.URL.initAddOrUpdateDeliveryUrl() + "?operationType=view&deliveryRecordId=" + row.id);
	    	return;
	    	
	    	
	    	//禁用派送范围、排除范围的新增、编辑、删除按钮
	    	buttonController('disabled');
	    	recoveryTab();
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	//按钮文字更换
	    	$("#btn_cancel").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭');
	    	//添加关闭属性
	    	$("#btn_cancel").attr('data-dismiss','modal');
	    	//调整位置
	    	$("#btn_cancel").css('margin-left','127px')
	    	$("#btn_cancel").off("click");
	    	//覆盖范围，排除范围不可编辑
	    	
	    	$("#name").css("background-color","white");
	    	$("#deliveryType").css("background-color","white");
	    	$("#superior").css("background-color","white");
	    	$("#deliveryHead").css("background-color","white");
	    	$("#deliveryHeadPhone").css("background-color","white");
	    	$("#operatorId").css("background-color","white");
	    	$("#enabled").css("background-color","white");
	    	$("#detailedAddress").css("background-color","white");
	    	
	    	$("#deliveryHead").css("width","239px");
	    	$("#superior").css("width","239px");
	    	//触发查询详情的方法
	    	drManager.getDRDetais(row.id,'look');
	    },
		//删除
		'click .delete_a': function (e, value, row, index) {
			drManager.deleteDR(row.id);
		},
		//新版编辑
		'click .edit_btn': function (e, value, row, index) {
	        myMain.getAllContent(drManager.URL.initAddOrUpdateDeliveryUrl() + "?operationType=edit&deliveryRecordId=" + row.id);
		},
	    //编辑
	    'click .edit_a': function (e, value, row, index) {
	    	//启用覆盖范围、排除范围的新增、编辑、删除按钮
    		buttonController('enabled');
    		
	    	$("#btn_cancel").off("click");
	    	//恢复绑定
	    	recoveryTab();
	    	disClick();
	    	//按钮文字更换
	    	$("#btn_cancel").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消');
	    	//去掉关闭属性
	    	$("#btn_cancel").removeAttr('data-dismiss');
	    	//调整位置
	    	$("#btn_cancel").css('margin-left','55px')
	    	//绑定点击取消弹出提示框事件
	 		 $("#btn_cancel").on("click",function() {
	 			$.modalCancel("addAnchorForm","myModal");
	 		 })
	    	document.getElementById("addAnchorForm").reset();
	    	$('#addAnchorForm').bootstrapValidator('resetForm', true);
	    	$('#formId').val(row.id);
			drManager.getDRDetais(row.id,'edit');
			//打开运营商列表
   		 	drManager.getAllOperator('operatorId');
   		 	//默认选中当前运营商
   		 	$("#operatorId").val(row.operatorId);
   		 	//获取当前运营商和userType
	   		 var str = drManager.getOperatorIds();
	   		 //用户类型
	   		 var userType = str.split(',')[1];
	   		if(userType != 0) {
	   			 //非运维
	   			 $("#operatorId").attr("disabled",true);
	   		 } else {
	   			$("#operatorId").attr("disabled",false);
	   		 }
	   		$("#deliveryHead").css("width","199px");
 			$("#superior").css("width","199px");
		},
		
};

function cleanSearch() {
	document.getElementById("searchForm").reset();
}
//上级站点校验
function disClick() {
	var type = $("#deliveryType").val();
	if(type == 10) {
		$("#fromSouSuo01").css("cursor","not-allowed");
		$("#fromSouSuo01").css("background-color","#eee");
		//点击失效
		$("#search_superior").unbind("click");
		//清空数据
		$("#superior").val("");
	} else {
		$("#fromSouSuo01").css("cursor","pointer");
		$("#fromSouSuo01").css("background-color","#fff");
		//点击有效
		$("#search_superior").click(function(){
	 		   drManager.searchListByPageSJ();
	 		   document.getElementById("sForm").reset();
	 		   $('#superiorList').bootstrapTable('refresh');
		 	   $.showModal('#myModal02');
		  });
	}
}
//校验覆盖范围合法性
function checkPoint() {
	//返回结果
	var result;
	//条件1,区与街道
	var condition1 = false;
	//条件2，名称必填
	var condition2 = false;
	//条件3，字数少于10
	var condition3 = false;
	//类型是市，要有市
	var ownCity = true;
	//类型是区，要有区
	var ownArea = true;
	//类型是街道要有街道
	var ownStreet = true;
	//获取市
	var city = $("#cityId_ds").val();
	var city_nbar = $("#dropdownThemeForcityId_ds").find("nobr").text();
	//获取区
	var area = $("#areaId_ds").val();
	var area_nbar = $("#dropdownThemeForareaId_ds").find("nobr").text();
	//获取街道
	var street = $("#streetId_ds").val();
	var street_nbar = $("#dropdownThemeForstreetId_ds").find("nobr").text();
	//获取类型
	var type = $("#level_ds").val();
	//获取名称
	var name = $("#name_ds").val();
	//如果用户选择了类型为"区/街道"，要判断覆盖范围数据里面是否存在类型为"市/区"数据
	//10市，20区，30街道，40村，50路，60小区，70写字楼
	if(type == 10) {
		condition1 = true;
		ownCity = (city.length>0||city_nbar.length>0)?true:false;
	} else if(type == 20) {
		condition1 = (city.length>0||city_nbar.length>0)?true:false;
		ownArea = (area.length>0||area_nbar.length>0)?true:false;
	} else if(type == 30) {
		condition1 = (area.length>0||area_nbar.length>0)?true:false;
		ownStreet = (street.length>0||street_nbar.length>0)?true:false;
	} else {
		condition1 = true;
	}
	//如果类型为"市、区、街道"此字段不必填，否则此字段都必填，比如：村、小区、写字楼 名称必填。
	if(type != 10 && type != 20 && type != 30) {
		condition2 = name.length>0?true:false;
	} else {
		condition2 = true;
	}
	//判断字数
	condition3 = name.length<=10?true:false;
	//返回结果
	if(condition1&condition2&condition3&ownStreet&ownArea&ownCity){
		return result ="0000";
	} else {
		if(!condition1) {
			return result = "如果覆盖了整个市/区，就不允许在此以区/街道维度创建覆盖范围";
		} else if(!condition2) {
			return result = "请输入名称";
		} else if(!condition3) {
			return result = "名称不能超过10个字符";
		} else if(!ownArea) {
			return result = "请选择区域";
		} else if(!ownStreet) {
			return result = "请选择街道";
		} else if(!ownCity) {
			return result = "请选择城市";
		}
	}
	
}

//通过类型控制地址区域
function changeAddress() {
	//获取市
	var city = $("#cityId_ds").val();
	var city_nbar = $("#dropdownThemeForcityId_ds").find("nobr").text();
	//获取区
	var area = $("#areaId_ds").val();
	var area_nbar = $("#dropdownThemeForareaId_ds").find("nobr").text();
	//获取街道
	var street = $("#streetId_ds").val();
	var street = $("#dropdownThemeForstreetId_ds").find("nobr").text();
	//获取类型//10市，20区，30街道，40村，50路，60小区，70写字楼
	var type = $("#level_ds").val();
	if(type == 10) {
		//类型为市，区和街道不显示
		$("#dropdownThemeForareaId_ds").find("nobr").hide();
		$("#dropdownThemeForstreetId_ds").find("nobr").hide();
		//鼠标样式
		$("#areaDV").css("cursor","not-allowed");
		$("#dropdownThemeForareaId_ds").css("background-color","#eee");
		$("#streetDV").css("cursor","not-allowed");
		$("#dropdownThemeForstreetId_ds").css("background-color","#eee");
		//禁止点击
		$("#areaDV").css("display","block");
		$("#streetDV").css("display","block");
		
		
	} else if(type == 20) {
		//类型为区，街道不显示
		$("#dropdownThemeForareaId_ds").find("nobr").show();
		$("#dropdownThemeForstreetId_ds").find("nobr").hide();
		$("#areaDV").css("cursor","default");
		//鼠标样式
		$("#streetDV").css("cursor","not-allowed");
		$("#dropdownThemeForstreetId_ds").css("background-color","#eee");
		//禁止点击
		$("#areaDV").css("display","none");
		$("#streetDV").css("display","block");
	} else {
		//否则全部显示
		$("#dropdownThemeForareaId_ds").find("nobr").show();
		$("#dropdownThemeForstreetId_ds").find("nobr").show();
		//鼠标样式
		$("#areaDV").css("cursor","default");
		$("#streetDV").css("cursor","default");
		//恢复点击
		$("#areaDV").css("display","none");
		$("#streetDV").css("display","none");
	}
}
//重置三级联动
function resetAddress() {
	//获取省
	$("#province_val_ds").val($("#province_val").val());
	$("#dropdownThemeForprovinceId_ds").find("nobr").text($("#dropdownThemeForprovinceId").find("nobr").text());
	//获取市
	$("#city_val_ds").val($("#city_val").val());
	$("#dropdownThemeForcityId_ds").find("nobr").text($("#dropdownThemeForcityId").find("nobr").text());
	//获取区
	$("#area_val_ds").val($("#area_val").val());
	$("#dropdownThemeForareaId_ds").find("nobr").text($("#dropdownThemeForareaId").find("nobr").text());
	//获取街道
	$("#street_val_ds").val($("#street_val").val());
	$("#dropdownThemeForstreetId_ds").find("nobr").text($("#dropdownThemeForstreetId").find("nobr").text());
	//获取类型//10市，20区，30街道，40村，50路，60小区，70写字楼
	$("#level_ds").val("10");
}

function disableTab() {
	//切换选项卡
	$('#myTab a[href="#fgfw"]').tab('show');
	//禁用选项卡
	$('a[href="#jbxx"]').bind('show.bs.tab', function(e) {
		  e.preventDefault();
	});
	$('a[href="#jbxx"]').parent().css("background-color","#eee");
	$('a[href="#jbxx"]').css("cursor","not-allowed");
	$('a[href="#jbxx"]').css("color","##2fa4e7");
}

//选项卡恢复点击
function recoveryTab() {
	//恢复选项卡点击
	$('a[href="#jbxx"]').unbind('show.bs.tab');
	//重置选项卡
	$('#addAnchorForm a[href="#jbxx"]').tab('show');
	$('a[href="#jbxx"]').parent().css("background-color","#fff");
	$('a[href="#jbxx"]').css("cursor","pointer");
	//$('a[href="#jbxx"]').css("color","#555");
	$("#jbxx").css("color","#555");
}

//三级联动默认值
function defaultValue(province,city,area,street,type) {
	//type:0，行政区域；1，覆盖范围。
	var provinceId;
	var cityId;
	var areaId;
	var streetId;
	if(type == 0) {
		provinceId = '#dropdownOptionsForprovinceId';
		cityId = '#dropdownOptionsForcityId';
		areaId = '#dropdownOptionsForareaId';
		streetId = '#dropdownOptionsForstreetId';
	} else if(type == 1) {
		provinceId = '#dropdownOptionsForprovinceId_ds';
		cityId = '#dropdownOptionsForcityId_ds';
		areaId = '#dropdownOptionsForareaId_ds';
		streetId = '#dropdownOptionsForstreetId_ds';
	}
	//遍历该元素下所有的li元素
	//省
	$(provinceId+" li").each(function (){
		//获取li下a标签自定义的属性data-value的值
		if($(this).find('a').data('value') == province) {
			$(this).addClass('dropdown-options-focus');
			$(this).find('a').click();
		}
	});
	//市
	$(cityId+" li").each(function (){
		//获取li下a标签自定义的属性data-value的值
		if($(this).find('a').data('value') == city) {
			$(this).addClass('dropdown-options-focus');
			$(this).find('a').click();
		}
	});
	//区
	$(areaId+" li").each(function (){
		//获取li下a标签自定义的属性data-value的值
		if($(this).find('a').data('value') == area) {
			$(this).addClass('dropdown-options-focus');
			$(this).find('a').click();
		}
	});
	//街道
	$(streetId+" li").each(function (){
		//获取li下a标签自定义的属性data-value的值
		if($(this).find('a').data('value') == street) {
			$(this).addClass('dropdown-options-focus');
			$(this).find('a').click();
		}
	});
}
function buttonController(type){
	if(type == 'disabled') {//禁用
		$("#btn_show_add_ds").attr("disabled",true);
		$("#btn_show_edit").attr("disabled",true);
		$("#btn_show_del").attr("disabled",true);
		$("#btn_show_add_ds2").attr("disabled",true);
		$("#btn_show_edit2").attr("disabled",true);
		$("#btn_show_del2").attr("disabled",true);
	} else {
		$("#btn_show_add_ds").removeAttr("disabled",true);
		$("#btn_show_edit").removeAttr("disabled",true);
		$("#btn_show_del").removeAttr("disabled",true);
		$("#btn_show_add_ds2").removeAttr("disabled",true);
		$("#btn_show_edit2").removeAttr("disabled",true);
		$("#btn_show_del2").removeAttr("disabled",true);
	}
}


$(document).ready(function(){
	
	/*auth.managerAuth({
	//'btn_show_add':operatorManager.URL.addOperatorUrl(),
	'btn_is_true':drManager.URL.changeDRStatusUrl(),
	'btn_is_false':drManager.URL.changeDRStatusUrl(),
	
	'btn_save_submit':drManager.URL.addDRUrl(),
	'btn_edit_submit':drManager.URL.updateDR()
	
	});*/
	//1、初始化加载列表数据
	drManager.init();
	//2、初始化绑定增删改查事件
	drManager.bindEvent();
});

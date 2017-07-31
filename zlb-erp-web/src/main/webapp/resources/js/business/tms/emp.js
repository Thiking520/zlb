var commonActiveList=[{'value':'1','text':'生效'},{'value':'0','text':'失效'}];
var commonActiveArr=[];
var kindredIdArr=[];
var occupationIdArr=[];
var empManager = {
	isResetOffset: 0,
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/tms/emp/list';
        },
        deleteUrl: function () {
            return '/tms/emp/deleteEmployee';
        },//查看详情的请求地址
        getEmpDetaisUrl: function () {
            return '/tms/emp/queryEmployeeDetails';
        },//查看详情的请求地址
        addEmpUrl: function () {
            return '/tms/emp/addEmployee';
        },//更新状态
        updateEmpStatus:function(){
        	return '/tms/emp/updateEmployeeStatus';
        },
        updateEmp: function () {
            return '/tms/emp/updateEmployee';
        },
        searchDR: function () {
            return '/publicData/deliveryRecord/list';
        },//初始化下拉框
        initDropDownBox: function () {
            return '/tms/emp/initDropDownBox';
        },//获取所有运营商列表
        getAllOperatorUrl:function() {
        	return '/operator/qryOperator';
        },//获取当前运营商id和角色所属运营商id
        getOperatorIds:function() {
        	return '/publicData/user/operatorIds';
        },
        checkMobileIsExistUrl:function() {
        	return '/tms/emp/mobileIsExist';
        }
        
    },
    /**
     * 页面下拉框查询
     */
    initDropDownBox : function () {
    	$.callAjax({
			type:"post",
			url : empManager.URL.initDropDownBox(),
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		
         		for(var i=0;i<commonActiveList.length;i++){
         			commonActiveArr[commonActiveList[i].value]=commonActiveList[i].text;
         			$('#enabled_2').append("<option value='"+commonActiveList[i].value+"'>"+commonActiveList[i].text+"</option>");
         			$('#enabled').append("<option value='"+commonActiveList[i].value+"'>"+commonActiveList[i].text+"</option>");
         		}
         		for(var i=0;i<data.data.kindredIdList.length;i++){
         			kindredIdArr[data.data.kindredIdList[i].dictValue]=data.data.kindredIdList[i].dictDesc;
         			$('#kindredId').append("<option value='"+data.data.kindredIdList[i].dictValue+"'>"+data.data.kindredIdList[i].dictDesc+"</option>");
         		}
         		for(var i=0;i<data.data.occupationIdList.length;i++){
         			occupationIdArr[data.data.occupationIdList[i].dictValue]=data.data.occupationIdList[i].dictDesc;
         			$('#occupationId').append("<option value='"+data.data.occupationIdList[i].dictValue+"'>"+data.data.occupationIdList[i].dictDesc+"</option>");
         		}
         		
         		for(var i=0;i<data.data.occupationIdList.length;i++){
         			occupationIdArr[data.data.occupationIdList[i].dictValue]=data.data.occupationIdList[i].dictDesc;
         			$('#occupationId_s').append("<option value='"+data.data.occupationIdList[i].dictValue+"'>"+data.data.occupationIdList[i].dictDesc+"</option>");
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
			url : empManager.URL.getAllOperatorUrl(),
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
    /**分页获取列表**/
    searchListByPage: function () {

    	//分页组件
    	$.pageTable({
    		tableId: "#empManagerTable",//需要分页的table ID
    		url: empManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		toolbar: '#toolbar',
			toolbarAlign:'right',
			async:false,
    		onLoadSuccess:function(){
    			empManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
    		columns: [{
    			checkbox: true
    		}, {
    			align: 'center',
    			field: 'uniqueKey',
    			title: '编码',
    			formatter:function(value,row,index){
					return '<a class="empDetail_a" href="javascript:void(0)" uniqueKey="' + row.uniqueKey +'">' + row.uniqueKey + '</a>';
    			},
    	        events: 'operateEvents'
    		}, {
    			align: 'center',
    			field: 'cnName',
    			title: '姓名'
    		}, {
    			align: 'center',
    			field: 'gender',
    			title: '性别',
    			formatter:function(value,row,index) {
    				if(row.gender == 0) {
    					return '男'
    				} else {
    					return '女'
    				}
    			}
    		}, {
    			align: 'center',
    			field: 'enabled',
    			title: '状态',
    			formatter:function(value,row,index){
					if(commonActiveArr[value] == "失效") {
						return "<span style='color:red'>"+commonActiveArr[value]+"</span>"
					} else {
						return commonActiveArr[value];
					}
						
    			}
    		}, {
    			align: 'center',
    			field: 'occupationId',
    			title: '员工属性',
    			formatter:function(value,row,index){
					
						return occupationIdArr[value];
    			}
    		},{
    			align: 'center',
    			field: 'idNo',
    			title: '身份证号'
    		},{
    			align: 'center',
    			field: 'currentAddress',
    			title: '现居地址'
    		},{
    			align: 'center',
    			field: 'mobileNo',
    			title: '手机号码'
    		}, {
    			align: 'center',
    			field: 'description',
    			title: '描述'
    		}, /*{
    			field: 'createTime',
    			title: '创建记录',
    		    align: 'center',
				formatter:function(value,row,index){
					var time = row.createTime==null?"":empManager.format(row.createTime,"yyyy-MM-dd HH:mm:ss");
					var name = row.creatorName==null?"":row.creatorName;
					return name+"</br>"+time;
				}
    		}, {
    			field: 'updateTime',
    			title: '修改记录',
    		    align: 'center',
				formatter:function(value,row,index){
					var time = row.updateTime==null?"":empManager.format(row.updateTime,"yyyy-MM-dd HH:mm:ss");
					var name = row.modifierName==null?"":row.modifierName;
					return name + "</br>" + time;
				}
    		},*/{
    			field: 'operation',
    			title: '操作',
    			align: 'center',
    			formatter:function(value,row,index){
    				var html='<a class="btn btn-sm btn-primary editEmp_a" href="javascript:void(0)" >编辑</a>';
    				//<a class="btn btn-sm btn-danger deleteEmp_a" href="javascript:void(0)" >删除</a>
    	            return html; 
    			},
    			events: 'operateEvents'
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
	
    /**分页获取列表**/
    searchListByPageDR: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#drList",//需要分页的table ID
    		url: empManager.URL.searchDR(),//请求后台的URL（*）
    		queryParams:queryParamsDR,
    		onLoadSuccess:function(){
    			empManager.isResetOffset = 0;
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
    		}
    		]
    	});
    },
    
   //添加或编辑关键字*
    addOrEditeKeyword: function () {
    	var params = $("#addOrEditeSearchForm").serialize();
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : empManager.URL.addKeyUrl(),
				data : params,
				success : function(data){   
					var code = data.code;
					if(code!="0000"){
						toastr['warning'](data.msg); 
					}
						//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
						$.toastrSuccess('操作成功！');
						$.hideModal('#myModal');
						$('#demoTable').bootstrapTable('refresh');
				},
				error : function(){
					$.toastrError();
				}
			});
    },
    
  //判断号码是否已经存在
    checkMobileIsExist: function () {
    	var id =  $("#rowId").val();
    	var mobileNo = $("#mobileNo").val();
    	var params = {"mobileNo":mobileNo,"id":id}
    	var res = false;
			//组装数据发起Ajax请求begin
			$.callAjax({
				type:"post",
				url : empManager.URL.checkMobileIsExistUrl(),
				data : params,
				async: false,
				success : function(data){   
					if(data.data != null) {
						$.toastrWarning("该号码已登记，请重新输入手机号");
					} else {
						res = true;
					}
				},
				error : function(){
					$.toastrError();
				}
			});
			return res;
    },
    
    //删除关键字*
    deleteEmp: function (id) {
    	//组装数据发起Ajax请求begin
    	var params = {"id":id};
    	$.dialogConfirm({
            message: '删除后将无法恢复，请您确认真要删除吗?',
            callback: function(result) {
                if(result) {
			    	$.callAjax({
			    		type:"post",
			    		url : empManager.URL.deleteUrl(),
			    		data : params,
			    		success : function(data){   
			    			var code = data.code;
			    			if(code!="0000"){
			    				toastr['warning'](data.msg);
			    				return;
			    			}
			    				//对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
			    				$.toastrSuccess('删除成功！');
			    				$('#empManagerTable').bootstrapTable('refresh');
			    		},
			    		error : function(){
			    			$.toastrError();
			    		}
			    	});
                }
            }
        });
    },
   // 检验关键字的唯一性*
    validatorKeyword: function (searchKeyName) {
    	//组装数据发起Ajax请求begin
    	var params = {"searchKeyName":searchKeyName};
    	$.callAjax({
    		type:"post",
    		url : empManager.URL.validatorKeywordUrl(),
    		data : params,
    		async: false,//同步Ajax校验
    		success : function(data){   
    			var code = data.code;
    			var isValid = data.data.isValid;
    			if(code!="0000"){
    				toastr['warning'](data.msg); 
    			}else{
    				if(isValid == true){
    					$("#demo_keyword").attr("isValid",true);
    				}else{
    					$("#demo_keyword").attr("isValid",false);
    				}
    			}
    		},
    		error : function(){
    			$.toastrError();
    		}
    	});
    },
    /**编辑，查看详情**/
    getEmpDetais: function (id,type) {
    	document.getElementById("addAnchorForm").reset();
	    $('#addAnchorForm').data('bootstrapValidator').resetForm();
    	//触发Ajax
    	var params = {"id":id};
		$.callAjax({
			type:"post",
			async: false,//同步Ajax校验
			url : empManager.URL.getEmpDetaisUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         			return;
         		}
         		
         		$("#uniqueKey").val(data.data.uniqueKey);
         		/*$("#enabled option[value='"+ data.data.enabled+"']").attr("selected",true);*/
         		$("#enabled").val(data.data.enabled);
         		$("#operatorId").val(data.data.operatorId);
         		$("#operatorName").val(data.data.operatorName);
         		$("#operatorNames").val(data.data.operatorId);
         		$("#cnName").val(data.data.cnName);
         		$("#enName").val(data.data.enName);
         		/*$("#occupationId option[value='"+ data.data.occupationId+"']").attr("selected",true);*/
         		$("#occupationId").val(data.data.occupationId);
         		
         		$("#distributionPoint").val(data.data.distributionPointName);
         		$("#distributionPointId").val(data.data.distributionPoint);
         		$("#idNo").val(data.data.idNo);
         		$("#driverNo").val(data.data.driverNo);
         		$("#registryCity").val(data.data.registryCity);
         		$("#censusAddress").val(data.data.censusAddress);
         		$("#currentAddress").val(data.data.currentAddress);
         		$("#kindredName").val(data.data.kindredName);
         		/*$("#kindredId option[value='"+ data.data.kindredId+"']").attr("selected",true);*/
         		$("#kindredId").val(data.data.kindredId);
         		$("#mobileNo").val(data.data.mobileNo);
         		$("#emergentMobileNo").val(data.data.emergentMobileNo);
         		$("#description").val(data.data.description);
         		//data.data.isTransportLiquid
         		if(type=="look"){
         			$("#myModalLabel").text("查看员工详情");
         			$("#btn_save_submit").hide();
         			$("#btn_edit_submit").hide();
         			empManager.disableForm('addAnchorForm',true);
         			$('#fromSouSuo').hide();
         		}else if(type=="edit"){
         			$("#myModalLabel").text("编辑员工");
         			$("#btn_edit_submit").show();
         			$("#btn_save_submit").hide();
         			empManager.disableForm('addAnchorForm',false);
         			$('#operatorName').attr("disabled",true)
         			$('#fromSouSuo').show();
         		}
         		$.showModal('#myModal');
			},
			error : function(){
				$.toastrError();
			}
		});
    },
  //添加或修改
	addOrUpdate:function(type){
		var urlValue;
		if(type=="add"){
			urlValue=empManager.URL.addEmpUrl();
		}if(type=="update"){
			urlValue=empManager.URL.updateEmp();
		}
		var params={
				'id':$.ToCDB($("#rowId").val()),
    			'uniqueKey':$.ToCDB($('#uniqueKey').val()),
    			'enabled':$.ToCDB($('#enabled').val()),	
    			'operatorId':$.ToCDB($('#operatorNames').val()),
    			'operatorName':$.ToCDB($('#operatorName').val()),
    			'cnName':$.ToCDB($('#cnName').val()),
    			'enName':$.ToCDB($('#enName').val()),
    			'occupationId':$.ToCDB($('#occupationId').val()),
    			'distributionPoint':$.ToCDB($('#distributionPointId').val()),	
    			'idNo':$.ToCDB($('#idNo').val()),
    			'driverNo':$.ToCDB($('#driverNo').val()),
    			'registryCity':$.ToCDB($('#registryCity').val()),
    			'censusAddress':$.ToCDB($('#censusAddress').val()),
    			'currentAddress':$.ToCDB($('#currentAddress').val()),	
    			'kindredName':$.ToCDB($('#kindredName').val()),
    			'kindredId':$.ToCDB($('#kindredId').val()),
    			'mobileNo':$.ToCDB($('#mobileNo').val()),
    			'emergentMobileNo':$.ToCDB($('#emergentMobileNo').val()),
    			'description':$.ToCDB($('#description').val()),
    			'gender':$.ToCDB($("input[name='gender']:checked").val())
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
             		$('#empManagerTable').bootstrapTable('refresh');
             		if(type=="add") {
             			$.toastrSuccess("添加成功");
             		} else {
             			$.toastrSuccess("修改成功");
             		}
    			},
    			error : function(){
    				$.toastrError();
    			}
    		});
		
	},
	/**
     * 改变状态
     */
    changeEmpStatus:function (id,enabled){
    	var params={
    		"ids":id,
    		"enabled":enabled	
    	}
    	$.callAjax({
			type:"post",
			url : empManager.URL.updateEmpStatus(),
			async:false,
			data : params,
			success : function(data){
         		if(data.code != "0000" && data.code != "0035"){
         			$.toastrWarning(data.msg);
         			//填充dialog
         	    	//显示dialog
         			return;
         		}
         		$('#empManagerTable').bootstrapTable('refresh');
         		if(data.code == "0035") {
         			$.toastrSuccess(data.msg);
         		} else {
         			$.toastrSuccess('操作成功！');
         		}
         		
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
			url : empManager.URL.getOperatorIds(),
			data : {},
			async:false,
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
	        	/*uniqueKey: {
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
	            cnName: {
	                validators: {
	                    notEmpty: {message: '中文名不能为空！'}
	                }
	            },
	            /*distributionPoint: {
	                validators: {
	                    notEmpty: {message: '配送单不能为空！'}
	                }
	            },*/
	            idNo:{
	                validators: {
	                    notEmpty: {message: '身份证号不能为空！'},
	                    stringLength: {
                            min: 18,
                            max: 18,
                            message: '身份证号长度为18位'
                        },
                        regexp: {
                            regexp: /[A-Za-z]|[0-9]/,
                            message: '请输入数字或者字母'
                        }
	                }
	            },
	            currentAddress:{
	                validators: {
	                    notEmpty: {message: '现居地址不能为空！'}
	                }
	            },
	            kindredName:{
	            	validators: {
	                    notEmpty: {message: '紧急联系人不能为空！'}
	                }
	            },
	            mobileNo:{
	            	validators: {
	                    notEmpty: {message: '联系电话不能为空！'},
	                    /* stringLength: {
	                         min: 11,
	                         max: 11,
	                         message: '请输入11位手机号码'
	                     },*/
	                     regexp: {
	                         regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
	                         message: '请输入正确的手机号码'
	                     }
	                }
	            },
	            emergentMobileNo:{
	            	validators: {
	                    notEmpty: {message: '联系电话不能为空！'},
	                     /*stringLength: {
	                         min: 11,
	                         max: 11,
	                         message: '请输入11位手机号码'
	                     },*/
	                     regexp: {
	                         regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
	                         message: '请输入正确的手机号码'
	                     }
	                }
	            }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    bindEvent: function () { 
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
  		  $("#btn_search").addClass("disabled");
  		  empManager.isResetOffset = 1;
  		  $('#empManagerTable').bootstrapTable('refresh');
    	});
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		$("#rowId").val("");
    		
    		 document.getElementById("addAnchorForm").reset();
    		 //获取当前运营商和userType
    		 var str = empManager.getOperatorIds();
    		 //当前运营商Id
    		 var operatorId = str.split(',')[0];
    		 //用户类型
    		 var userType = str.split(',')[1];
    		 //打开运营商列表
    		 empManager.getAllOperator('operatorNames');
    		 //默认选中当前运营商
    		 $("#operatorNames").val(operatorId);
    	     $('#addAnchorForm').data('bootstrapValidator').resetForm();//$('#addAnchorForm').bootstrapValidator('resetForm');

		     $("#myModalLabel").text("添加员工");
		 	 $("#operatorName").val(myMain.selfCompanyName);
		     $("#btn_save_submit").show();
		     $("#btn_edit_submit").hide();
		     empManager.disableForm('addAnchorForm',false);
		     if(userType != 0) {
    			$("#operatorNames").attr("disabled",true);
    		 } else {
    			 $("#operatorNames").attr("disabled",true);
    		 }
    	     $("#operatorNames").attr("disabled","disabled");
		     $('#operatorName').attr("disabled",true)
		     $('#fromSouSuo').show();
		     $.showModal('#myModal');
	    });
    	
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 empManager.isResetOffset = 1;
    			 $('#empManagerTable').bootstrapTable('refresh');
    		}
	    });
    	
    	//提交
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		var res = empManager.checkMobileIsExist();
    		if(bootstrapValidator.isValid()&&res)
    			empManager.addOrUpdate('add');
    		else return;
    	});
    	//更新
	    $("#btn_edit_submit").click(function(){
	    	var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		var res = empManager.checkMobileIsExist();
    		if(bootstrapValidator.isValid()&&res)
    			empManager.addOrUpdate('update');
    		else return;
    		
    	});
	    
	    $("#btn_is_true").click(function(){
	    	var status = false;
	    	if($("#empManagerTable").bootstrapTable('getSelections').length>0){
	    		var ids = new Array();
		    	$.map($("#empManagerTable").bootstrapTable('getSelections'), function(row) {
		    		if(row.enabled==0) {
		    			status = true;
		    			ids.push(row.id);
		    		}
	            });
	    		if(!status) {
	    			$.toastrWarning("已经是‘生效’状态！");
	    			return;
	    		}
	    		empManager.changeEmpStatus(ids,1);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
	    	
    	});
	    $("#btn_is_false").click(function(){
	    	var status = false;
	    	if($("#empManagerTable").bootstrapTable('getSelections').length>0){
	    		var ids = new Array();
		    	$.map($("#empManagerTable").bootstrapTable('getSelections'), function(row) {
					if(row.enabled==1){
						status = true;
		    			ids.push(row.id);
					}
	            });
				if(!status) {
					$.toastrWarning("已经是‘失效’状态！");
	    			return;
	    		}
				empManager.changeEmpStatus(ids,0);
	    	} else {
	    		$.toastrWarning("请选择一条数据进行操作！");
	    	}
	    	
    	});
    	
    	 $("#dp_search").click(function(){
    		 $('#s_save').show();
       		 $('#s_save_2').hide();
     		 empManager.searchListByPageDR();
     		 document.getElementById("fromModal02").reset();
      		 $('#drList').bootstrapTable('refresh');
    		 $.showModal('#myModal02');
     	});
    	 $("#btn_search_s").click(function(){
	 		 
 	 		$('#drList').bootstrapTable('refresh');
 	 		
 		  });
 		  $("#s_save").click(function(){
 			  if($("#drList").bootstrapTable('getSelections').length==1){
 	     			$.map($("#drList").bootstrapTable('getSelections'), function(row) {
 	     				$('#distributionPointId').val(row.id);
 	     				$('#distributionPoint').val(row.name);
 	     				$('#addAnchorForm').data('bootstrapValidator').resetForm();
 	     				var bootstrapValidator = $("#addAnchorForm").data('bootstrapValidator');
 	     	    		bootstrapValidator.validate();
 	     				$.hideModal('#myModal02');
 	                 });
 	     		}else{
 	     			$.toastrWarning("请选择一条数据进行操作！");
 	     		}
 		 		
 		 });
 		 $("#dp_search_2").click(function(){
      		empManager.searchListByPageDR();
      		$('#s_save').hide();
      		$('#s_save_2').show();
      		document.getElementById("fromModal02").reset();
      		$('#drList').bootstrapTable('refresh');
     		$.showModal('#myModal02');
     		 
      	});
 		 $("#s_save_2").click(function(){
			  if($("#drList").bootstrapTable('getSelections').length==1){
	     			$.map($("#drList").bootstrapTable('getSelections'), function(row) {
	     				$('#distributionPointId_2').val(row.id);
	     				$('#distributionPointName_2').val(row.name);
	     				$.hideModal('#myModal02');
	                 });
	     		}else{
	     			$.toastrWarning("请选择一条数据进行操作！");
	     		}
		 });
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	//初始化表单验证
    	empManager.initDropDownBox();
    	empManager.validateform();
    	empManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	var uniqueKey=$.ToCDB($("#uniqueKey_2").val());
	var cnName=$.ToCDB($("#cnName_2").val());
	var distributionPoint=$("#distributionPointId_2").val();
	var enabled=$("#enabled_2").val();
	var mobileNo = $.ToCDB($("#userMobile").val());
	var occupationId = $("#occupationId_s").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			offset: empManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
			status: 2,//状态
			sort: params.sort,
			order: params.order,
			uniqueKey:uniqueKey,
			cnName:cnName,
			distributionPoint:distributionPoint,
			enabled:enabled,
			mobileNo:mobileNo,
			occupationId:occupationId
		};
	return temp;
};

var queryParamsDR = function (params) {
	//自定义查询参数,昵称、公司名
	var code=$('#code_2').val();
	var name=$('#name_2').val();
	var enabled='1';
	var deliveryType=null;
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: empManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		status: 2,//状态
		sort: params.sort,
		order: params.order,
		code:code,
		name:name,
		enabled:enabled,
		deliveryType:deliveryType
	};
	return temp;
};
//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		//查看详情
	    'click .empDetail_a': function (e, value, row, index) {
	    	//按钮文字更换
	    	$("#btn_cancel").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭');
	    	//增加窗口关闭属性
	    	$("#btn_cancel").attr('data-dismiss','modal');
	    	document.getElementById("addAnchorForm").reset();
   	     	$('#addAnchorForm').data('bootstrapValidator').resetForm();
   	     	$("#btn_cancel").off("click");
	   		 //打开运营商列表
	   		 empManager.getAllOperator('operatorNames');
	   		 //默认选中当前运营商
		   	 $("#operatorNames").val(row.operatorId);
	    	//触发查询商品详情的方法
	    	empManager.getEmpDetais(row.id,'look');
	    	$(".modal-content input").css("background-color","white");
	    	$(".modal-content select").css("background-color","white");
	    },
		//删除
		'click .deleteEmp_a': function (e, value, row, index) {
			
			empManager.deleteEmp(row.id);
		},
	    //编辑
	    'click .editEmp_a': function (e, value, row, index) {
	    	$("#btn_cancel").off("click");
	    	//按钮文字更换
	    	$("#btn_cancel").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消');
	    	//去掉关闭属性
	    	$("#btn_cancel").removeAttr('data-dismiss');
	    	//绑定点击取消弹出框事件
	 		 $("#btn_cancel").on("click",function() {
	 			 $.modalCancel("addAnchorForm","myModal");
	 		 });
	 		 empManager.getAllOperator('operatorNames');
	 		 
	    	 //获取当前运营商和userType
	   		 var str = empManager.getOperatorIds();
	   		 //当前运营商Id
	   		 var operatorId = str.split(',')[0];
	   		 //用户类型
	   		 var userType = str.split(',')[1];
	   		 
	    	$("#rowId").val(row.id);
			empManager.getEmpDetais(row.id,'edit');
			if(row.gender == 1) {
				$("#female").attr("checked",true);
				$("#male").removeAttr("checked",true);
			} else {
				$("#female").removeAttr("checked",true);
				$("#male").attr("checked",true);
			}
			//默认选中当前运营商
		   	$("#operatorNames").val(row.operatorId);
		   	if(userType != 0) {
	   			 //非运维
	   			 $("#operatorNames").attr("disabled",true);
	   		 } else {
	   			$("#operatorNames").attr("disabled",true);
	   		 }
		}
};

function cleanSearch() {
	document.getElementById("addOrEditeSearchForm").reset();
	//清除站点选择
	$("#distributionPointId_2").val("");
}


$(document).ready(function(){
	/*auth.managerAuth({
	//'btn_show_add':operatorManager.URL.addOperatorUrl(),
	'btn_is_true':empManager.URL.updateEmpStatus(),
	'btn_is_false':empManager.URL.updateEmpStatus(),
	
	'btn_save_submit':empManager.URL.addEmpUrl(),
	'btn_edit_submit':empManager.URL.updateEmp()
	
	});*/
	
	//1、初始化加载列表数据
	empManager.init();
	//2、初始化绑定增删改查事件
	empManager.bindEvent();
});
// 存放每个功能模块业务逻辑JS
// javascript 模块化

var supplierManager = {
	// 是否重置分页偏移值0：否，1：是
	isResetOffset : 0,
	supplierId : null,// 判断是新增供应商还是修改供应商，null表示新增。
	goodsCodes : "",// 保存修改供应的，
	copyfileindex : 1,
	validate:0,
	saveOrSubmit:"",
	// 封装异步请求的所有ajax的URL地址
	URL : {
		// 分页获取商品列表请求地址
		searchListByPageUrl : function() {
			return '/supplier/list';
		},
		saveSupplierUrl : function() {
			return '/supplier/save';
		},
		submitSupplierUrl : function() {
			return '/supplier/submit';
		},
		deleteSupplierUrl : function() {
			return '/supplier/delete';
		},
		editSupplierUrl : function() {
			return '/supplier/edit';
		},
		getUpTokenUrl : function() {
			return '/publicData/goodsMaterial/getUpToken';
		},
		// 获取当前运营商下所有商品二级分类
		goodsTypeTwoLevel : '/publicData/goodsType/goodsTypeTwoLevel',
		// 查询供应商名称是否存在，返回1表示存在，否则返回NULL，表示不存在
		supplierNameIsExists : function() {
			return '/supplier/supplierNameIsExists';
		}

	},
	/** 分页获取商品列表* */
	searchListByPage : function() {

		var dataShowJson = tableDataJson();

		// 分页组件
		$.pageTable({
			tableId : "#listTable",// 需要分页的table ID
			url : supplierManager.URL.searchListByPageUrl(),// 请求后台的URL（*）
			queryParams : queryParams,
			onLoadSuccess : function() {
				supplierManager.isResetOffset = 0;
				// 将操作的限制解除，如：button按钮被限制不能点击，执行下面代码，则是进行解除不能点击限制
				$("#btn_search_moreCondition").removeClass("disabled");
			},
			sortable : true,
			sortName : 'modified',
			sortOrder : 'desc',
			columns : dataShowJson
		});
	},

	saveSupplier : function() {
		supplierManager.saveOrSubmit="save";
		//开启验证
		if (supplierManager.validate==0){
			$('#addSupplierForm').data('bootstrapValidator').validate();
			return;
		}
	    if(!$('#addSupplierForm').data('bootstrapValidator').isValid()){ 
	    	return;  
	    }
		// 名称
		var supplier = $('#supplier').val();
		if (supplier == "") {
			$.toastrWarning("供应商名称不能为空");
			return;
		}

		//供应类型id集合
		var goodsTypeCodes = $('#goodsTypeCodes').val();
		//供应类型名称集合
		var goodsTypeNames = $('#goodsTypeNames').val();
		if (goodsTypeNames == "") {
			$.toastrWarning("至少选择一个供应商品类别！");
			return;
		}
		
		// 联系人
		var contactPeople = $('#contactPeople').val();
		// 联系电话
		var contactPhone = $('#contactPhone').val();
		// 联系地址
		var contactAddress = $('#contactAddress').val();
		// email
		var email = $('#email').val();
		// 开户行
		var bankName = $('#bankName').val();
		// 银行卡号
		var accountNumber = $('#accountNumber').val();
		// 户名
		var accountName = $('#accountName').val();
		// 运营执照
		var license = $('#license').val();// 运营执照
		// 附件1
		var contractCopy1 = $('#contractCopy_1').val();
		// 附件2
		var contractCopy2 = $('#contractCopy_2').val();
		// 附件3
		var contractCopy3 = $('#contractCopy_3').val();
		// 附件4
		var contractCopy4 = $('#contractCopy_4').val();

		var params = {
			"id" : supplierManager.supplierId,
			"supplier" : supplier,
			"contactPeople" : contactPeople,
			"contactPhone" : contactPhone,
			"contactAddress" : contactAddress,
			"email" : email,
			"bankName" : bankName,
			"accountNumber" : accountNumber,
			"accountName" : accountName,
			"approvalOprate" : supplierManager.supplierId == null ? "NEW"
					: "MOD",
			"license" : license,
			"goodsTypeCodes" : goodsTypeCodes,
			"goodsTypeNames" : goodsTypeNames,
			"contractCopy1" : contractCopy1,
			"contractCopy2" : contractCopy2,
			"contractCopy3" : contractCopy3,
			"contractCopy4" : contractCopy4
		};
		$.callAjax({
			type : "post",
			url : supplierManager.URL.saveSupplierUrl(),
			data : params,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
				} else {
					$.toastrSuccess('保存成功！');
					$.hideModal('#editModal');
					$('#listTable').bootstrapTable('refresh');
				}
				$("#btn_save").removeAttr("disabled"); 		//方法1，去除disabled属性
				$("#btn_submit").attr("disabled",false); 	//方法2，去除disabled属性
			},
			error : function() {
				$.toastrError();
				$("#btn_save").removeAttr("disabled"); 		//方法1，去除disabled属性
				$("#btn_submit").attr("disabled",false); 	//方法2，去除disabled属性
			}
		});
	},

	submitSupplier : function() {
		supplierManager.saveOrSubmit="submit";
		//开启验证
		if (supplierManager.validate==0){
			$('#addSupplierForm').data('bootstrapValidator').validate();  
			return;
		}
	     if(!$('#addSupplierForm').data('bootstrapValidator').isValid()){ 
	    	 return;  
	     }
		// 名称
		var supplier = $('#supplier').val();
		if (supplier == "") {
			$.toastrWarning("供应商名称不能为空");
			return;
		}

		//供应类型id集合
		var goodsTypeCodes = $('#goodsTypeCodes').val();
		//供应类型名称集合
		var goodsTypeNames = $('#goodsTypeNames').val();
		var goodsTypeNames = $('#goodsTypeNames').val();
		if (goodsTypeNames == "") {
			$.toastrWarning("至少选择一个供应商品类别！");
			return;
		}
		var contactPeople = $('#contactPeople').val();
		var contactPhone = $('#contactPhone').val()
		var contactAddress = $('#contactAddress').val();
		var email = $('#email').val();
		var bankName = $('#bankName').val();
		var accountNumber = $('#accountNumber').val();
		var accountName = $('#accountName').val();
		var license = $('#license').val();
		var organization = $('#organization').val();
		var contractCopy = $('#contractCopy').val();

		var params = {
			"id" : supplierManager.supplierId,
			"supplier" : supplier,
			"contactPeople" : contactPeople,
			"contactPhone" : contactPhone,
			"contactAddress" : contactAddress,
			"email" : email,
			"bankName" : bankName,
			"accountNumber" : accountNumber,
			"accountName" : accountName,
			"approvalOprate" : supplierManager.supplierId == null ? "NEW"
					: "MOD",
			"license" : license,
			"organization" : organization,
			"contractCopy" : contractCopy,
			"goodsTypeCodes" : goodsTypeCodes,
			"goodsTypeNames" : goodsTypeNames
		};

		$.callAjax({
			type : "post",
			url : supplierManager.URL.submitSupplierUrl(),
			data : params,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
				} else {
					$.hideModal('#editModal');
					$.toastrSuccess('提交成功！');
					$('#listTable').bootstrapTable('refresh');
				}
				$("#btn_save").removeAttr("disabled"); 		//方法1，去除disabled属性
				$("#btn_submit").attr("disabled",false); 	//方法2，去除disabled属性
			},
			error : function() {
				$.toastrError();
			}
		});
	},
	// 弹出新增供应商模态框， 操作模态框初始化显示界面
	newSupplier : function() {
		supplierManager.supplierId = null;
		$('#supplier').val('');
		$('#contactPeople').val('');
		$('#contactPhone').val('');
		$('#contactAddress').val('');
		$('#email').val('');
		$('#bankName').val('');
		$('#accountNumber').val('');
		$('#accountName').val('');
		$('#license').val('');
		$('#organization').val('');
		$('#contractCopy').val('');
		$('#goodsTypeCodes').val('');
		$('#goodsTypeNames').val('');
		supplierManager.goodsCodes = "";
		$("#myModalLabel").html("新增供应商");
		$.showModal('#editModal');
		$("[id^='imageShow']").attr("src", $("#contextPath").val()+"/resources/img/no_image.jpg");
	},

	editOrShowSupplier : function(supplierId, editOrShow) {
		supplierManager.supplierId = supplierId;
		var params = {
			"id" : supplierId
		};
		$.callAjax({
			url : supplierManager.URL.editSupplierUrl(),
			data : params,
			success : function(data) {
				var g = data.data;
				
				if (editOrShow == 2) {// 查看
					
					$('#supplier_show').text(g.supplier);
					$('#contactPeople_show').text(g.contactPeople);
					$('#contactPhone_show').text(g.contactPhone);
					$('#contactAddress_show').text(g.contactAddress);
					$('#email_show').text(g.email);
					$('#bankName_show').text(g.bankName);
					$('#accountNumber_show').text(g.accountNumber);
					$('#accountName_show').text(g.accountName);
					$('#goodsTypeNames_show').text(g.goodsTypeNames);
					$('#license_show').text(g.license);
					$('#tiaomaId_show').text(g.supplierCode);
					$('#imageShow_show').attr("src", g.license==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.license);

					$('#imageShow1_show').attr("src", g.contractCopy1==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy1);
					$('#imageShow2_show').attr("src", g.contractCopy2==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy2);
					$('#imageShow3_show').attr("src", g.contractCopy3==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy3);
					$('#imageShow4_show').attr("src", g.contractCopy4==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy4);
					$.showModal('#showModal');
				} else {// 编辑
					$('#supplier').val(g.supplier);
					$('#contactPeople').val(g.contactPeople);
					$('#contactPhone').val(g.contactPhone);
					$('#contactAddress').val(g.contactAddress);
					$('#email').val(g.email);
					$('#bankName').val(g.bankName);
					$('#accountNumber').val(g.accountNumber);
					$('#accountName').val(g.accountName);
					$('#license').val(g.license);
					$('#tiaomaId_add_update').val(g.supplierCode);
					$('#imageShow').attr("src", g.license==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.license);

					$('#contractCopy_1').val(g.contractCopy1);
					$('#imageShow1').attr("src", g.contractCopy1==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy1);

					$('#contractCopy_2').val(g.contractCopy2);
					$('#imageShow2').attr("src", g.contractCopy2==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy2);

					$('#contractCopy_3').val(g.contractCopy3);
					$('#imageShow3').attr("src", g.contractCopy3==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy3);

					$('#contractCopy_4').val(g.contractCopy4);
					$('#imageShow4').attr("src", g.contractCopy4==""?$("#contextPath").val()+"/resources/img/no_image.jpg":g.contractCopy4);
					// 保存原先的名称，用于修改名称时，如果名称与原名称一致则可以修改！
					$("#supplier").attr("olSupplier", g.supplier);
					// 显示隐藏的选择文件按钮
					$("[id^='imgFile']").css("display", "block");
					// 保存与提交的按钮隐藏
					$("#btn_submit").css("display", "inline");
					$("#btn_save").css("display", "inline");
					// 将禁用的文本框改为启用，就是可编辑
					for (var i = 0; i < 8; i++) {
						document.getElementById($(".t-readonly")[i].id)
								.removeAttribute("readonly");
					}
					$("#myModalLabel").html("修改供应商");
					$.showModal('#editModal');

					$('#goodsTypeCodes').val('');
					$('#goodsTypeNames').val('');
					supplierManager.goodsCodes = g.goodsTypeCodes;
				}
				// alert("获取的编号集合="+g.goodsTypeCodes);
				// alert("保存成功，编号集合="+supplierManager.goodsCodes);
			}
		});
	},

	deleteSupplier : function(supplierId) {

		$.dialogConfirm({
			message : '您确定要删除吗?',
			callback : function(result) {
				if (result) {
					var params = {
						"id" : supplierId
					};
					$.callAjax({
						url : supplierManager.URL.deleteSupplierUrl(),
						data : params,
						success : function(data) {
							$.toastrSuccess('删除成功！');
							$('#listTable').bootstrapTable('refresh');
						}
					});
				}
			}
		});
	},

	bindEvent : function() {

		// 绑定条件查询按钮事件
		$("#btn_search_moreCondition").on("click", function() {
			$('#listTable').bootstrapTable('refresh');
		});

		// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
			$("#keyId").val("");
			//重置验证值
			supplierManager.validate=0;
			getAllContent(supplierManager.URL.toAddViewUrl());
		});

		$("#btn_add").on('click', function() {
			supplierManager.newSupplier();
		});

		;
		$("#btn_save").on('click', function() {
			supplierManager.saveSupplier();
		});

		$("#btn_submit").on('click', function() {
			supplierManager.submitSupplier();
		});

		// 弹出供应商的新增或修改模态框时的触发事件
		$('#editModal')
				.on(
						'shown.bs.modal',
						function() {
							// 获取当前运营商下所有商品类型二级分类，并保存到下拉框中
							$
									.callAjax({
										url : supplierManager.URL.goodsTypeTwoLevel,
										data : {},
										success : function(data) {
											// 清空左右两边div
											$('[id^=goodsTypeBinding]')
													.html('');
											for (var i = 0; i < data.length; i++) {
												/*
												 * num等于0表示左边div，1则表示右边div；
												 * 如果供应商的商品类型编码列表中，已经包含当前迭代的商品类型，
												 * 就添加到右边的已挑选的商品类型div中，
												 * 否则添加到左边可挑选的商品类型div中。
												 */
												var num = 1;// 默认为1
												if (supplierManager.goodsCodes
														.indexOf(";"
																+ data[i].id
																+ ";") >= 0) {
													// 给右边div添加已选中商品类型
													num = 2;
												}
												// 给左边div添加可选择商品类型
												addGoodsTupeDivEle(data[i].id,
														data[i].typeName, num,
														data[i].parentId);
											}
										}
									});
						});

		// 供应商选择模态框 隐藏事件
		$('#editModal').on('hidden.bs.modal', function() {
	    	/*
//	    	glyphicon glyphicon-remove
//	    	$("[data-bv-icon-for^='']").attr("display","none");
	    	$.toastrWarning($("i[data-bv-icon-for],.help-block").length);
	    	$("i[data-bv-icon-for],.help-block").attr("display","none");
	    	$.toastrWarning($("#defaultForm").data('bootstrapValidator').isValid());  
	    	if(!$("#addSupplierForm").data('bootstrapValidator').isValid()) {  
	    	    $("#addSupplierForm").data('bootstrapValidator').resetForm();  
	    	    
	    	}  */
//			$('#addSupplierForm').data('bootstrapValidator').resetField('supplier', true);
			//将模态框恢复成未编辑的样子，重置表单，并且将验证的样式恢复初始状态
			document.getElementById("addSupplierForm").reset();
			$(".form-group").removeClass("has-success has-error");
			$("i[data-bv-icon-for],.help-block").css("display","none");
			// 将保存提交按钮设置为可用
			var obj1 = document.getElementById("btn_save");
			obj1.removeAttribute("disabled");
			var obj2 = document.getElementById("btn_submit");
			obj2.removeAttribute("disabled");
		});
		
		//表单验证
		formValidator();
		
	    $("#goodsTypeNames").change(function(){
	    	$("#btn_save").removeAttr("disabled"); 		//方法1，去除disabled属性
			$("#btn_submit").attr("disabled",false); 	//方法2，去除disabled属性
	    });
		

	},// 初始化分页查询列表数据 ★★★分页主体列表★★★
	init : function() {
		supplierManager.searchListByPage();
	},

	// 获取七牛upToken和存储空间域名
	getUpToken : function() {
		var params = {};
		$.callAjax({
			type : "post",
			url : supplierManager.URL.getUpTokenUrl(),
			data : params,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				if (data.data == null) {
					$.toastrWarning("请为该运营商配置七牛公钥、私钥、域名、存储空间名称");
					return;
				}
				// 调用上传接口
				supplierManager.uploadLicence(data.data.upToken,
						data.data.domain);

				for (var i = 1; i < 5; i++) {
					// 四个照片
					supplierManager.contractCopy(data.data.upToken,
							data.data.domain, i);
				}
			}
		});
	},
	// 七牛上传方法
	uploadLicence : function(uptoken, domain) {
		Qiniu
				.uploader({
					runtimes : 'html5,flash,html4', // 上传模式，依次退化
					browse_button : 'imgFile', // 上传选择的点选按钮，必需
					uptoken : uptoken, // 后台服务器提供的uptoken
					get_new_uptoken : false, // 设置上传文件的时候是否每次都重新获取新的uptoken
					unique_names : true, // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
					domain : domain, // bucket域名，下载资源时用到，必需
					max_file_size : '2mb', // 最大文件体积限制
					flash_swf_url : 'js/plupload/Moxie.swf', // 引入flash,相对路径
					max_retries : 1, // 上传失败最大重试次数
					dragdrop : true, // 开启可拖曳上传
					chunk_size : '2mb', // 分块上传时，每块的体积
					auto_start : true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
					init : {
						'BeforeUpload' : function(up, file) {
							// 文件上传前处理相关事情
						},
						'UploadProgress' : function(up, file) {
							// 每个文件上传时，处理相关的事情
							// var chunk_size =
							// plupload.parseSize(this.getOption('chunk_size'));//文件总大小
							// 显示进度条
							$("#pgsbar").css("visibility", "visible");
							var progress = parseInt(data.loaded / data.total
									* 100, 10);
							$('#pgsbarColor').css('width', file.percent + '%');
						},
						'FileUploaded' : function(up, file, info) {
							// 上传成功后延迟1秒中隐藏进度条
							setTimeout("time()", 5000);
							// 保存图片地址
							var sourceLink = domain + "/"
									+ JSON.parse(info).key; // 获取上传成功后的文件的Url
							$("#license").val(sourceLink);
							$("#imageShow").attr("src", sourceLink);
							// 刷新表格

						},
						'Error' : function(up, err, errTip) {
							if (err.message == 'File size error.') {
								$.toastrError("文件大小有误，最大2MB");
								return;
							}
							// 上传出错时，处理相关的事情
							$.toastrError("上传失败！");
						},
					},
					// 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
					filters : {
						max_file_size : '2mb',
						prevent_duplicates : false,// 防止重复,如果开启，同一个文件再次上传会失败,但是不能避免浏览器刷新后再次上传该文件
						mime_types : [ {
							title : "Image files",
							extensions : "jpg,gif,png"
						}, // 限定jpg,gif,png后缀上传
						]
					}
				});
	},

	// 七牛上传方法
	contractCopy : function(uptoken, domain, index) {
		Qiniu
				.uploader({
					runtimes : 'html5,flash,html4', // 上传模式，依次退化
					browse_button : 'imgFile' + index, // 上传选择的点选按钮，必需
					uptoken : uptoken, // 后台服务器提供的uptoken
					get_new_uptoken : false, // 设置上传文件的时候是否每次都重新获取新的uptoken
					unique_names : true, // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
					domain : domain, // bucket域名，下载资源时用到，必需
					max_file_size : '2mb', // 最大文件体积限制
					flash_swf_url : 'js/plupload/Moxie.swf', // 引入flash,相对路径
					max_retries : 1, // 上传失败最大重试次数
					dragdrop : true, // 开启可拖曳上传
					chunk_size : '2mb', // 分块上传时，每块的体积
					auto_start : true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
					init : {
						'UploadProgress' : function(up, file) {
							// 显示进度条
							$("#pgsbar" + index).css("visibility", "visible");
							var progress = parseInt(data.loaded / data.total
									* 100, 10);
							$('#pgsbarColor' + index).css('width',
									file.percent + '%');
						},
						'FileUploaded' : function(up, file, info) {
							setTimeout("time2('" + index + "')", 5000);
							// 保存图片地址
							var sourceLink = domain + "/"
									+ JSON.parse(info).key; // 获取上传成功后的文件的Url
							$("#imageShow" + index).attr("src", sourceLink);
							$("#contractCopy_" + index).val(sourceLink);
							// 刷新表格

						},
						'Error' : function(up, err, errTip) {
							if (err.message == 'File size error.') {
								$.toastrError("文件大小有误，最大2MB");
								return;
							}
							// 上传出错时，处理相关的事情
							$.toastrError("上传失败！");
						},
					},
					// 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
					filters : {
						max_file_size : '2mb',
						prevent_duplicates : false,// 防止重复,如果开启，同一个文件再次上传会失败,但是不能避免浏览器刷新后再次上传该文件
						mime_types : [ {
							title : "Image files",
							extensions : "jpg,gif,png"
						}, // 限定jpg,gif,png后缀上传
						]
					}
				});
	},
}

// 隐藏进度条
function time() {
	$("#pgsbar").css("visibility", "hidden");
}
function time2(index) {
	$("#pgsbar" + index).css("visibility", "hidden");
}
/*
 * 商品类型选择的DIV数据判断函数 2返回左边的DIV字符串Id，反正表示右边
 */

function getDivId(num) {
	return num == 1 ? "goodsTypeBindingNoSelected" : "goodsTypeBindingSelected";
}
// 添加商品类型Div中的商品类型小div值
function addGoodsTupeDivEle(type_id, type_name, num, parentId) {

	// 0表示左边，1表示右边，传入getDivId自定义函数，返回相应的DIV的Id值
	var divId = getDivId(num);

	var addDivGoodsTypeHtmlStr = '<div id="'+type_id+num+'"  '
			+ ' onclick="closeBefore('+ type_id+num+ ','+ num+ ',this)"'
			+ ' style="width:170px;height:28px;float:left;margin:0px;overflow:hidden;padding-rigth: 0px;padding-top: 2px;" '
			+ ' class="alert alert-danger alert-dismissable divdelete'
			+ (num == 2 ? 'goodsTypes"> ' : '">')// 只有等于右边，既已经选中的商品类型div才会有goodsTypes类样式
			+ '<button type="button" id="Id'
			/*
			 * 为了避免id冲突添加了相应num，0或1，表示在左边还是右边，0左，1右
			 */
			+ type_id
			+ num
			+ '"' 
			+ ' goodsTypeIds="'
			+ type_id
			+ '"'
			+ ' goodsTypeNames="'
			+ type_name
			+ '"'
			+ ' class="close" '
			+ ' aria-hidden="true">'
			+ (num == 2 ? '×' : '√')
			+ '</button>'
			+ type_name + '</div>';
    

	
    

	// alert(addDivGoodsTypeHtmlStr);
	$("#" + divId).append(addDivGoodsTypeHtmlStr);

	// 向右边添加商品类型类型时，商品类型编码与商品类型名称的集合的隐藏文本框值要拼接数据
	if (num == 2) {
		/*
		 * 要拼接成;类型id1;类型id2;类型id3;--------------前面后面都要有：“;”分号！
		 * 判断是否为空，如果为空则在前面加一个“;”
		 */
		var gtc = $("#goodsTypeCodes").val();
		$("#goodsTypeCodes").val((gtc == "" ? ";" : "") + gtc + type_id + ";")
		// 要拼接成类型名称1;类型名称2;类型名称3;--------------与编号不用的是， 前面不用“;”，后面需要。
		var gtn = $("#goodsTypeNames").val();
		$("#goodsTypeNames").val(gtn + type_name + ";").change();
	}
}

// 左边已经挑选的类型， 被点击删除（点击小差差时），将数据添加回选中商品类型的下拉框
function closeBefore(id, num,_this) {
	id = "#Id" + id;

	// alert($(id).attr("goodsTypeIds")+"\n"+$(id).attr("goodsTypeNames"));

	// //向左边添加商品类型类型时，商品类型编码与商品类型名称的集合的隐藏文本框值要减少数据
	if (num == 2) {
		/*
		 * 要拼接成;类型id1;类型id2;类型id3;--------------前面后面都要有：“;”分号！
		 * 判断是否为空，如果为空则在前面加一个“;”
		 */
		var gtc = $("#goodsTypeCodes").val();
		var gtcStr = gtc.replace(";" + $(id).attr("goodsTypeIds") + ";", ";");
		$("#goodsTypeCodes").val(gtcStr);

		// alert(gtc+"\n"+$("#goodsTypeCodes").val());//显示修改前和修改后的编码集合信息
		$("#goodsTypeCodes").val();
		// $("#goodsTypeCodes").val((gtc==""?";":"")+gtc+type_id+";")
		// 要拼接成类型名称1;类型名称2;类型名称3;--------------与编号不用的是， 前面不用“;”，后面需要。
		var gtn = $("#goodsTypeNames").val();
		var gtnStr = gtn.replace($(id).attr("goodsTypeNames") + ";", "");
		$("#goodsTypeNames").val(gtnStr);
		$("#goodsTypeNames").val(gtnStr).change();

	}
	var tempid = $(id).attr("goodsTypeIds");
	var tempName=$(id).attr("goodsTypeNames");
	$("#"+_this.id).remove();
	addGoodsTupeDivEle(tempid,tempName,(num == 2 ? 1 : 2));
}

var tableDataJson = function() {

	var dataShowJson = [
			{
				checkbox : true,
				events : 'operateEvents',
				align : 'center'
			},
			{
				field : 'supplier',
				title : '供应商名称',
				width : '8%',
				align : 'center'
			},
			{
				field : 'supplierCode',
				title : '编码',
				width : '8%',
				align : 'center'
			},
			{
				field : 'goodsTypeNames',
				title : '供应商品',
				align : 'center'
			},
			{
				field : 'contactPeople',
				title : '联系人',
				width : '8%',
				align : 'center'
			},
			{
				field : 'contactPhone',
				title : '联系电话',
				width : '8%',
				align : 'center'
			},
			{
				field : 'ontimeRate',
				title : '送货准时率',
				width : '8%',
				align : 'center',
				formatter : function(value, row, index) {
					return value + "%";
				}
			},
			{
				field : 'stockinRate',
				title : '送货入库率',
				width : '8%',
				align : 'center',
				formatter : function(value, row, index) {
					return value + "%";
				}
			},
			{
				field : 'returnRate',
				title : '退货率',
				width : '8%',
				align : 'center',
				formatter : function(value, row, index) {
					return value + "%";
				}
			},
			{
				field : 'supplierState',
				title : '审批状态',
				width : '9%',
				align : 'center',
				formatter : function(value, row, index) {
					var result;
					var operate = "";
					if (row.supplierState == 'WPA'
							|| row.supplierState == 'WFA') {
						switch (row.approvalOprate) {
						case "NEW":
							operate = "（新建）";
							break;
						case "MOD":
							operate = "（修改）";
							break;
						case "DEL":
							operate = "（删除）";
							break;
						}
					}
					switch (row.supplierState) {
					case "NEW":
						result = "未审批";
						break;
					case "WPA":
						result = "待经理审批";
						break;
					case "WFA":
						result = "待财务审批";
						break;
					case "REJ":
						result = "已驳回";
						break;
					case "APP":
						result = "审批通过";
						break;
					}
					return "<span class='btn-sm'>" + result + operate
							+ "</span>";
				}
			},
			{
				field : 'id',
				title : '操作',
				align : 'center',
				width : '8%',
				valign : 'middle',
				formatter : function(value, row, index) {
					var html = ""
					if (row.supplierState == 'NEW'
							|| row.supplierState == 'REJ')
						html = html
								+ '<a class="btn btn-primary btn-sm edit_a" href="javascript:void(0)" >编辑</a>'
								+ '<a class="btn btn-danger btn-sm delete_a" href="javascript:void(0)" >删除</a>';
					else
						html = '<a class="btn btn-primary btn-sm show_info" href="javascript:void(0)" >查看</a>';
					return html;
				},
				events : 'operateEvents'
			} /*
				 * , { field : 'approvalOprate', title : '操作', align : 'center',
				 * width : '6%', valign : 'middle', formatter : function(value,
				 * row, index) { var result = ""; if (row.supplierState == 'WPA' ||
				 * row.supplierState == 'WFA') { switch (row.approvalOprate) {
				 * case "NEW": result = "新建"; break; case "MOD": result = "修改";
				 * break; case "DEL": result = "删除"; break; } } return result; } }
				 */];

	return dataShowJson;
}

// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {
	// 自定义查询参数
	var supplier = $("#searchKeywordSuName").val();// 供应商名称
	var goodsTypeNames = $("#searchKeywordGoName").val();// 商品名称
	var supplierState = $("#sele_search_suState").val();// 供应商审核状态

	// 时间区间
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.limit, // 页面大小
		offset : supplierManager.isResetOffset == 1 ? 0 : params.offset, // 分页偏移值
		supplier : supplier,// 供应商名称
		goodsTypeNames : goodsTypeNames,// 供应的商品名称列表
		supplierState : supplierState,// 供应商审批状态
		sort : params.sort,
		order : params.order
	};
	return temp;
};

//form验证规则
function formValidator(){
	$('#addSupplierForm').bootstrapValidator(
			{
				message : 'This value is not valid',
				feedbackIcons : {/* input状态样式图片 */
					valid : 'glyphicon glyphicon-ok',
					invalid : 'glyphicon glyphicon-remove',
					validating : 'glyphicon glyphicon-refresh'
				},
				fields : {/* 验证：规则 */
					supplier : {// 验证input项：验证规则
						message : 'The username is not valid',
						validators : {
							notEmpty : {// 非空验证：提示消息
								message : '供应商名称不能为空'
							},
							// stringLength: {
							// min: 6,
							// max: 30,
							// message: '用户名长度必须在6到30之间'
							// },
							// threshold : 6 ,
							// //有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
							remote : {// ajax验证。server
										// result:{"valid",true or false}
										// 向服务发送当前input
										// name值，获得一个json数据。例表示正确：{"valid",true}
								url : $("#contextPath").val()
										+ '/supplier/supplierNameIsExists',// 验证地址
								message : '供应商名称已存在',// 提示消息
								dataType:"json",//不加这个坑死人，传不了数据
								delay : 2000,// 每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
								type : 'POST'// 请求方式
							/***********************************************
							 * 自定义提交数据，默认值提交当前input value 
							 **********************************************/
							,data:function(){return {supplier: $("#supplier").val(), supplierId : supplierManager.supplierId};}
							}
						/*
						 * , regexp: { regexp: /^[a-zA-Z0-9_\.]+$/, message:
						 * '用户名由数字字母下划线和.组成' }
						 */
						}
					},
					contactPeople : {
						validators : {
							notEmpty : {
								message : '联系人不能为空'
							}
						}
					},
					contactPhone : {
						message : 'The phone is not valid',
						validators : {
							notEmpty : {
								message : '手机号码不能为空'
							}/*,
							stringLength : {
								min : 11,
								max : 11,
								message : '请输入11位手机号码'
							}*/,
							regexp : {//百度的找的手机号码验证正则表达式，手机号码格式如不满住需求，可更改。
								regexp : /^((1[0-9]{10})|[0-9]+-[0-9]+)$/,
								message : '请输入11位号码，或者固定号码，固定号码格式如：0735-1025145'
							}
						}
					},
					contactAddress : {
						validators : {
							regexp : {//百度的找的手机号码验证正则表达式，手机号码格式如不满住需求，可更改。
								// 正则表单是的含义：[匹配这里的任意字符]，\d表示“0-9”任意数组，\D则与\d意思完全相反，*号表示匹配前面元字符0次或多次。
								regexp : /^[\d\D]*$/,
								message : '不是吧！地址可以为空或输入任意字符，不应该能看到我这行字啊！'
							}
						}
					},
					email : {
						validators : {
							/*notEmpty : {
								message : '邮件不能为空'
							},*/
							emailAddress : {
								message : '请输入正确的邮件地址如：123@qq.com'
							}
						}
					},
					bankName : {
						validators : {
							/*notEmpty : {
								message : '开户行不能为空'
							},*/
							regexp :  {//百度的找的手机号码验证正则表达式，手机号码格式如不满住需求，可更改。
								// 正则表单是的含义：[匹配这里的任意字符]，\d表示“0-9”任意数组，\D则与\d意思完全相反，*号表示匹配前面元字符0次或多次。
								regexp : /^[\d\D]*$/,
								message : '不是吧！开户行可以为空或输入任意字符，不应该能看到我这行字啊！'
							}
						}
					},
					accountNumber : {
						validators : {
							/*notEmpty : {
								message : '收款账号不能为空'
							},*/stringLength : {
								min : 16,
								max : 19,
								message : '银行卡是16位至19位的数字，请输入正确的银行卡号。'
							}/*,
							regexp : {//百度的找的手机号码验证正则表达式，手机号码格式如不满住需求，可更改。
								regexp : /^(\d{16}|\d{19})$/,
								message : '银行卡是16位至19位的数字，请输入正确的银行卡号。'
							}*/
						}
					},
					accountName : {
						validators : {
							/*notEmpty : {
								message : '户名不能为空'
							},*/
							regexp : {//百度的找的手机号码验证正则表达式，手机号码格式如不满住需求，可更改。
								regexp : /^[a-zA-Z\u4e00-\u9fa5]+$/,
								message : '必须是中午或者字母'
							}
						}
					}
				}
			}).on('success.form.bv', function(e) {// 点击提交之后
				if (supplierManager.validate==0) {
					supplierManager.validate=1;
					if (supplierManager.saveOrSubmit=="save")
						supplierManager.saveSupplier();
					else
						supplierManager.submitSupplier();
				}
	});
}

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	// 编辑供应商
	'click .edit_a' : function(e, value, row, index) {
		supplierManager.validate=0;
		// 将提交与保存的按钮设置为可用。
		supplierManager.supplierId = row.id;
		$("#supplier").attr("check-name-exist-id",row.id);
		supplierManager.editOrShowSupplier(row.id, 1);
	},
	// 查看供应商
	'click .show_info' : function(e, value, row, index) {
		supplierManager.editOrShowSupplier(row.id, 2);
	},
	// 删除供应商
	'click .delete_a' : function(e, value, row, index) {
		supplierManager.deleteSupplier(row.id);
	},

};


$(document).ready(function() {
	// 1、初始化加载列表数据
	supplierManager.init();
	// 2、初始化绑定增删改查事件
	supplierManager.bindEvent();

	// 3、初始化上传控件
	supplierManager.getUpToken();

	// supplierManager.getUpToken2();
});
	
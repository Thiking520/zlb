// 存放每个功能模块业务逻辑JS
// javascript 模块化

/*
 * 根据传入的分页tableId，查询更新相应的table数据；
 * 将tabId赋值给searchTableId，根据不同的表，获取并绑定不同的查询条件；
 * _this，表示触发按钮元素， 在这个checkOfclick方法中，
 * 用作获取Id，如果id为btn_search_all，将不给searchTableId赋值，
 * 
 */
var checkOfclick = function(tabId, operateClass) {
	$(this).addClass("disabled");
	/*
	 * 下面2行我也没看懂，没有研究，只是知道我需要用它实现分页查询异步更新表格
	 */
	goodsManager.isResetOffset = 1;
	
	/*
	 * 不同的分页table，根据searchTableId变量，到bySearchReturnParams()，绑定不同的查询条件参数。
	 * 如果operateClass为search_all，则将searchTableId设置为空，则表示查询全部
	 */
	if (operateClass != undefined) {
		searchTableId = operateClass == "all" ? "" : tabId;
	} else {
		searchTableId = tabId;
	}

	$('#' + tabId).bootstrapTable('refresh');
}

// 存放每个功能模块业务逻辑JS
// javascript 模块化

var goodsManager = {
	// 是否重置分页偏移值0：否，1：是
	isResetOffset : 0,
	goodsId : null,
	// 封装异步请求的所有ajax的URL地址
	URL : {
		// 跳转列表页
		// initUrl : function() {
		// return '/goodsSupply/init';
		// },
		// 分页获取商品列表请求地址
		searchGoodsListByPageUrl : '/goodsSupply/auditList',
		// 根据Id获取商品供应信息详细请求地址
		searchGoodsByKeyUrl : '/goodsSupply/queryGoodsByKey',
		// 根据Id获取商品供应信息的更新记录log请求地址
		searchGoodsUpdateLogByKeyUrl : '/goodsUpdateLog/getGoodsUpdateLogByKey',
		// 根据商品类型查询能够提供其类型的供应商
		searchSupplierListByGoodsType : '/supplier/getSupplierListByGoodsType',
		// 批量更新商品供应信息
		goodsJobModify : '/goodsSupply/goodsJobModify',
			// 批量更新商品供应信息
		approveGoodsUrl : '/goodsSupply/approve',
				// 批量更新商品供应信息
		rejectGoodsUrl : '/goodsSupply/reject'
	},
	pageListTableId : {
		// 底层的分页table
		listTable : 'listTable',
		// 更新多个供应信息模态框分页talbe
		listTableTwo : 'listTableTwo',
		// 更新单个供应信息模态框分页talbe
		listTableThree : 'listTableThree',
		// 选择供应商模态框分页talbe
		listTableFour : 'listTableFour'
	},
	getDataTableId : {
		// 单个商品供应信息更新取值talbe
		dataTable : 'updateGoodsSupply_one',
		// 多个商品供应信息更新取值talbe
		dataTableTwo : 'updateGoodsSupply_more'
	},
	dataShowJson : {
		// 底层的分页table
		listTable : [
				{
					checkbox : true
				},
				{
					field : 'goodsName',
					title : '商品名称',
					formatter : function(value, row, index) {
						return '<a class="goodsUpdateJob" href="javascript:void(0)">'
								+ value + '</a>';
					},
					events : 'operateEvents'
				}, {
					field : 'goodsCode',
					title : '商品编码'
				}, {
					field : 'goodsType',
					title : '商品规格'
				}, {
					field : 'goodsUnit',
					title : '采购单位',
					events : 'operateEvents'
				}, {
					field : 'supplierName',
					title : '当前供应商'
				}, {
					field : 'goodsPrice',
					title : '单价'
				}, {
					field : 'updatePlanTimeFormatYyyyMmDd',
					title : '计划更新时间',
					align : 'center'
				}, {
					field : 'updateSupplier',
					title : '更新供应商',
					align : 'center'
				}, {
					field : 'updatePrice',
					title : '更新价格',
					align : 'center'
				}, {
					field : 'maxPrice',
					title : '历史最高价',
					align : 'center'
				}, {
					field : 'minPrice',
					title : '历史最低价',
					align : 'center'
				}, {
					field : 'avgPrice',
					title : '历史平均价'
				},{
					field : 'jobState',
					title : '审批状态',
					align : 'center',
					formatter:function(value,row,index){
						var result;
					    switch(row.jobState){
						    /*case "1":result = "新建"; break;*/
						    case "2":result = "待审批"; break;
						    case "3":result = "审批通过"; break;
						    case "4":result = "驳回"; break;
						    case "5":result = "已执行"; break;
					    }
						return result;
					}
				}],
		// 更新多个供应信息模态框分页talbe
		listTableTwo : [
				{
					field : 'goodsName',
					title : '商品名称'
				},
				{
					field : 'goodsCode',
					title : '商品编码'
				},
				{
					field : 'goodsMode',
					title : '商品规格'
				},
				{
					field : 'goodsUnit',
					title : '采购单位',
					events : 'operateEvents'
				},
				{
					field : 'goodsPrice',
					title : '单价'
				},
				{
					field : 'supplierName',
					title : '当前供应商'
				},
				{
					field : 'updatePlanTimeFormatYyyyMmDd',
					title : '计划更新时间',
					align : 'center'
				},
				{
					field : 'updateSupplier',
					title : '更新供应商',
					align : 'center',
					formatter : function(value, row, index) {
						/*
						 * xx属性为false，xx，表示不添加清除内容的小叉叉
						 * readonly属性为readonly，表示内容禁止编辑 oldValue属性，保存原供应商名称
						 * whetherChange="false"，表示是否改变，默认为为改变“false”
						 * oldId，是原供应商Id
						 * supplierOption类属性，是绑定单击事件用的
						 */
						return '<input type="text" xx="false" readonly="readonly"'
								+ ' gId="'
								+ row.id
								+ '" '
								+ ' oldId="'
								+ row.supplierId
								+ '" '
								+ ' oldValue="'
								+ row.updateSupplier
								+ '" '
								+ ' whetherChange="false" value="'
								+ row.updateSupplier
								+ '"'
								+ ' class="form-control input-small supplierOption updateSupplier"'
								+ ' style="width: 150px;" />';
					},
					events : 'operateEvents'
				},
				{
					field : 'updatePrice',
					title : '更新价格',
					align : 'center',
					formatter : function(value, row, index) {
						/*
						 * oldValue属性，保存原供应商供应价格
						 * whetherChange="false"，表示是否改变，默认为为改变“false”
						 * supplierOption类属性，是绑定单击事件用的
						 */
						return '<input type="text" ifBinDing="false" oldValue="'
								+ row.updatePrice
								+ '"'
								+ ' whetherChange="false" value="'
								+ row.updatePrice
								+ '"'
								+ ' class="form-control input-small valueChange updatePrice"'
								+ ' style="width: 150px;" />';
					},
					events : 'operateEvents'
				}, {
					field : 'maxPrice',
					title : '历史最高价',
					align : 'center'
				}, {
					field : 'minPrice',
					title : '历史最低价',
					align : 'center'
				}, {
					field : 'avgPrice',
					title : '历史平均价'
				} ],
		// 更新单个供应信息模态框分页talbe
		listTableThree : [ {
			field : 'formatModified',
			title : '更新日期',
			align : 'center'
		}, {
			field : 'updateSupplier',
			title : '供应商'
		}, {
			field : 'updateSupplyPrice',
			title : '供应价格'
		}, {
			field : 'modifier',
			title : '操作人'
		} ],
		// 更新单个供应信息模态框分页talbe
		listTableFour : [
				{
					field : 'id',
					title : '选择',
					formatter : function(value, row, index) {
						return "<input  newId='"
								+ value
								+ "' type='radio' name='checkedSupplier' value='"
								+ row.supplier + "'>";
					},
					events : 'operateEvents'
				}, {
					field : 'supplier',
					title : '供应商名称'
				}, {
					field : 'operatorId',
					title : '运营商Id'
				}, {
					field : 'goodsTypeNames',
					title : '供应商品类型集'
				}, {
					field : 'contactPeople',
					title : '联系人'
				}, {
					field : 'contactPhone',
					title : '联系电话',
				}, {
					field : 'ontimeRate',
					title : '送货准时率'
				}, {
					field : 'stockinRate',
					title : '送货入库率',
					align : 'center'
				}, {
					field : 'returnRate',
					title : '退货率',
					align : 'center'
				} ]
	},
	/** 查：根据商品类型，查出“能提供该商品类型”的全部供应商* */
	getSupplierListByGoodsType : function(goodsType, _this) {
//		alert(goodsType);
		// 保存当前商品的类型，用作查询条件
		$("#goodsType").val(goodsType);
		$.showModal('#myModalThree');

		// 保存触发供应商选择模态框的文本框元素，当点击确认时，保存id与内容到文本框；还有就是根据这个文本框
		supperlierOptionText = _this;
	},
	/** 查：通用分页table绑定数据* */
	searchListByPage : function(tabId) {
		searchTableId = tabId;
		// 分页组件
		$.pageTable({
			tableId : "#" + tabId,// 需要分页的table ID
			url : tableDataUrl(tabId),// 请求后台的URL（*）
			queryParams : queryParams,
			onLoadSuccess : function() {
				goodsManager.isResetOffset = 0;
				// 将操作的限制解除，如：button按钮被限制不能点击，执行下面代码，则是进行解除不能点击限制
				$("#btn_search_moreCondition").removeClass("disabled");
				// 绑定价格改变事件
				var uptateList = goodsManager.getDataTableId.dataTableTwo;
			},
			// 可供选择的每页的行数（*）
			pageList : [ 10, 20, 50 ],
			sortable : true,
			sortName : 'modified',
			sortOrder : 'desc',
			columns : tableDataJson(tabId)
		// 绑定table的json格式

		});
	},
	
//	审批通过
	approveGoods: function () {
		  $.dialogConfirm({
			  message: '您确定要审批通过吗?',
			  callback: function(result) {
				  if(result) {
					  var params = {"id":goodsManager.goodsId};
					  $.callAjax({
						  url : goodsManager.URL.approveGoodsUrl,
						  data : params,
						  success : function(data){
							  if (data.code != "0000") {
									$.toastrWarning(data.msg);
									return;
							  }
							  $.hideModal('#myModalTwo');
							  $.toastrSuccess('审批通过！');
							  $('#listTable').bootstrapTable('refresh');
						  }
					  });
				  }
			  }
		  });
	  },
	  
//	  驳回
	 rejectGoods: function () {
		  $.dialogConfirm({
			  message: '您确定要驳回吗?',
			  callback: function(result) {
				  if(result) {
					  var params = {"id":goodsManager.goodsId};
					  $.callAjax({
						  url : goodsManager.URL.rejectGoodsUrl,
						  data : params,
						  success : function(data){
							  if (data.code != "0000") {
									$.toastrWarning(data.msg);
									return;
							  }
							  $.hideModal('#myModalTwo');
							  $.toastrSuccess('驳回成功！');
							  $('#listTable').bootstrapTable('refresh');
						  }
					  });
				  }
			  }
		  });
	  },
	  
	/**
	 * 传入json，和提交的路径，进行增删改查，返回对象的信息。 如：查询：根据条件参数（如：{"id":123}）、url，查询返回数据对象
	 * 
	 */
	aJaxCRUD : function(params, url) {
		$
				.callAjax({
					url : url,
					data : params,
					success : function(data) {
						if (data.code != "0000") {
							$.toastrWarning(data.msg);
							return;
						}
						// 如果操作成功，更新底层数据
						if (goodsManager.URL.goodsJobModify == url) {
							checkOfclick(
									goodsManager.pageListTableId.listTable,
									"all");
						}
						// 点击供应信息列表的供应商品名称时，给弹出模态框绑定该供应商品的数据
						if (goodsManager.URL.searchGoodsByKeyUrl==url) {
							jobShowBindingData(data.data);
						}
					}
				});
	},
	bindEvent : function() {

    	$("#btn_approve").on('click',function() {
    		goodsManager.approveGoods();
    	});
    	
    	$("#btn_reject").on('click',function() {
    		goodsManager.rejectGoods();
    	});
    	
		// 多个供应信息模态框绑定初始化事件
		$('#updateMoreSupplier').click(function() {
			isInId = 1;
			$.showModal('#myModal');
		});

		// 绑定所有分页table按钮条件查询单机事件
		$("button[id^='btn_search']").click(function() {
			var isUndefined;
			// checkOfclick()函数的第二个参数如果为all，则查询全部
			if (this.id == "btn_clear_all") {
				isUndefined = "all";
			}
			checkOfclick(this.value, isUndefined);
		});

		// 多个供应信息更新计划模态框 显示事件
		$('#myModal')
				.on(
						'shown.bs.modal',
						function() {
							// 第一次进入模态框
							if (tabTwo == 0) {
								// 初始化分页查询列表数据 ★★★分页主体列表★★★
								goodsManager
										.searchListByPage(goodsManager.pageListTableId.listTableTwo);
								tabTwo = 1;// 表示已经初始化分页查询主体列表
							} else {// 刷新分页查询列表数据
								checkOfclick(goodsManager.pageListTableId.listTableTwo);
							}
						});
		// 多个供应信息更新计划模态框 隐藏事件
		$('#myModal').on('hidden.bs.modal', function() {
		});
		// 单个供应信息更新详细模态框 显示事件
		$('#myModalTwo')
				.on(
						'shown.bs.modal',
						function() {
							// 第一次进入模态框
							if (tabThree == 0) {
								// 初始化分页查询列表数据 ★★★分页主体列表★★★
								goodsManager
										.searchListByPage(goodsManager.pageListTableId.listTableThree);
								tabThree = 1;// 表示已经初始化分页查询主体列表
							} else {// 刷新分页查询列表数据
								// alert("two tabId=" + tabId);
								checkOfclick(goodsManager.pageListTableId.listTableThree);
							}
						});
		// 单个供应信息更新详细模态框 隐藏事件
		$('#myModalTwo').on('hidden.bs.modal', function() {
		});
		// 供应商选择模态框 显示事件
		$('#myModalThree')
				.on(
						'shown.bs.modal',
						function() {
							// 第一次进入模态框
							// alert(tabFour);
							if (tabFour == 0) {
								// 初始化分页查询列表数据 ★★★分页主体列表★★★
								goodsManager
										.searchListByPage(goodsManager.pageListTableId.listTableFour);
								tabFour = 1;// 表示已经初始化分页查询主体列表
							} else {// 刷新分页查询列表数据
								// alert("two tabId=" + tabId);
								checkOfclick(goodsManager.pageListTableId.listTableFour);
							}
						});
		// 供应商选择模态框 隐藏事件
		$('#myModalThree').on('hidden.bs.modal', function() {
		});
		// 绑定展示新增界面事件
		$("#btn_show_add").click(function() {
			$("#keyId").val("");
			getAllContent(goodsManager.URL.toAddViewUrl());
		});
		// 单击单个商品名称弹出的模态框中的“供应商文本框”，点击事件
		$("#choose_search_optoin_supplier").on("click", function() {
			// 获取单个商品信息的商品类型
			var goodsType = $("#goodsTypeIdOne").val();
			// alert(goodsType+"==428");
			// 将本商品的类型传入供应商选择查询方法。
			goodsManager.getSupplierListByGoodsType(goodsType, this);
		});

		// 供应商隐藏对话框 -确定后
		$("#btn_supplier_confirm").click(
				function() {
					// 获取选择的供应商单选按钮
					var che = $('input:radio[name=checkedSupplier]:checked');
					// 将选择的更新供应商保存到触发模态框的文本框
					$(supperlierOptionText).val($(che).val());
					//设置一个newId来保存要更新的商品Id
					$(supperlierOptionText).attr("newId",$(che).attr("newId"));
					
					//123123
//					 alert("newId=" + $(supperlierOptionText).attr("newId") + "过后");
					// + $(supperlierOptionText).attr("whetherChange"));
					// 判断原值与选择的值是否一致，如果不一致则whetherChange为true，表示发生过改变
					$(supperlierOptionText).attr(
							"whetherChange",
							($(supperlierOptionText).attr("oldValue") != $(
									supperlierOptionText).val() ? "true"
									: "false"));
					// 隐藏模态框
					$.hideModal('#myModalThree');
				});

		// 绑定单个商品价格改变事件
		$("#updataSupplyPrice").change(function() {
			ch(this);
		});
		// 绑定单个商品时间改变时间
		$("#updateDate_one").change(function() {
			ch(this);
		});
		// 提交更新计划
		$(":input[id^='goodsUpdate_']").click(function() {
			// alert($(this).val());
			checkOfclick(goodsManager.pageListTableId.listTable, "all");
			updateGoodsSupply(this);
		});
		// 绑定所有分页table按钮条件查询单机事件
		$("button[id^='btn_search']").click(function() {
			var isUndefined;
			// checkOfclick()函数的第二个参数如果为all，则查询全部，btn_search_all是显示全部。
			if (this.id == "btn_search_all") {
				isUndefined = "all";
			}
			checkOfclick(this.value, isUndefined);
		});
		
		
	},
	init : function() {
		var tId = goodsManager.pageListTableId.listTable;
		// 初始化分页查询列表数据 ★★★分页主体列表★★★
		goodsManager.searchListByPage(tId);
		// 初始化所有分页table条件查询按钮的value值
		btn_search_valueBinding();
		// 初始化所有提交数据按钮的value值
		btn_submit_valueBinding();
	}
}

/*
 * 第一个时间大于第二个时间吗？大于则返回true，否则返回false
 * 传入两个时间格式的字符串，格式为yyyy-MM-dd，比较第一个时间是否比第二个时间大，是则返回true，否则返回false
 */
function contrastDate(dateOne, dateTwo) {

	if (dateTwo == "" || dateOne == "") {// 任意一个时间为空则退出，不做判断
		return false;
	}
	var numbersOne = dateOne.split("-");
	var numbersTwo = dateTwo.split("-");

	/* var strs= new Array(); //定义一数组 */
	for (var i = 0; i < numbersOne.length; i++) {
//		alert(numbersOne[i] > numbersTwo[i]);
		// 上面已经将年、月、日的日期拆分成数字数组了，从年比较到日，只要有一个大于后面的数字就表示第一个时间大于第二个时间
		if (numbersOne[i] > numbersTwo[i]) {
			return true;
		}
	}
	return false;
}

// 值改变时间
var ch = function(_this) {
	// 判断原值与选择的值是否一致，如果不一致则whetherChange为true，表示发生过改变
	$(_this).attr("whetherChange",
			($(_this).attr("oldValue") != $(_this).val() ? "true" : "false"));
};
// 绑定验证价格文本框内容是否改变
function bindingUpdatePriceChange(_this) {
	// alert($(_this).attr("ifBinDing"));
	if ($(_this).attr("ifBinDing") == "false") {
		$(_this).change(function() {
			ch(this);
		});
		// 如果绑定一次后，就设置属性ifBinDing=true，避免多次绑定
		$(_this).attr("ifBinDing", "true");
	}
}
/*
 * 这里定义每个查询按钮的value值，保存相应的分页table的Id， 作用：
 * 触发时获取当前按钮的value传入checkOfclick函数，获取相应条件查询的值转为json返回，
 */
function btn_search_valueBinding() {
	/*
	 * listTable
	 */
	var listTableId = goodsManager.pageListTableId.listTable;// 条件查询按钮
	$("#btn_search_listTable").val(listTableId);// 条件查询按钮
	$("#btn_search_all").val(listTableId);// 查询全部按钮
	/*
	 * listTableTwo
	 */
	var listTableTwoId = goodsManager.pageListTableId.listTableTwo;
	$("#btn_search_listTableTwo").val(listTableTwoId);// 条件查询按钮
	/*
	 * listTableThree
	 */
	var listTableThreeId = goodsManager.pageListTableId.listTableThree;
	/*
	 * listTableFour
	 */
	var listTableFourId = goodsManager.pageListTableId.listTableFour;
	$("#btn_search_listTableFour").val(listTableFourId);// 条件查询按钮
}
/*
 * 这里定义每个提交按钮的value值，保存相应的获取数据范围的table的Id， 作用：
 * 触发时获取当前按钮元素传入updateGoodsSupply函数，根据value值判断执行相应的操作者。
 */
function btn_submit_valueBinding() {
	/*
	 * 单个供应信息更新计划保存，id=goodsUpdate_one_save保存不提交到审批、id=goodsUpdate_one_submit保存并提交到审批
	 */
	$(":input[id^='goodsUpdate_one']").val(
			goodsManager.getDataTableId.dataTable);// 单个供应信息更新提交
	/*
	 * 多个供应信息更新计划保存，id=goodsUpdate_more_save保存不提交到审批、goodsUpdate_more_submitid=保存并提交到审批
	 */
	$(":input[id^='goodsUpdate_more']").val(
			goodsManager.getDataTableId.dataTableTwo);
}

// 不同的分页table，有不同的渲染格式，这里是根据分页tableId返回相对应的显然格式
var tableDataJson = function(tableId) {
	switch (tableId) {
	case goodsManager.pageListTableId.listTable:
		return goodsManager.dataShowJson.listTable;
	case goodsManager.pageListTableId.listTableTwo:
		return goodsManager.dataShowJson.listTableTwo;
	case goodsManager.pageListTableId.listTableThree:
		return goodsManager.dataShowJson.listTableThree;
	case goodsManager.pageListTableId.listTableFour:
		return goodsManager.dataShowJson.listTableFour;
	}
	// alert("...tableDataJson一个萝卜没进坑~- -！！！ 没有对位入座");
	return {};
}
// 不同的分页table，有不同的数据获取路径，这里是根据分页tableId返回相对应的数据获取路径
var tableDataUrl = function(tableId) {
	switch (tableId) {
	case goodsManager.pageListTableId.listTable:
		return goodsManager.URL.searchGoodsListByPageUrl;
	case goodsManager.pageListTableId.listTableTwo:
		return goodsManager.URL.searchGoodsListByPageUrl;
	case goodsManager.pageListTableId.listTableThree:
		return goodsManager.URL.searchGoodsUpdateLogByKeyUrl;
	case goodsManager.pageListTableId.listTableFour:
		return goodsManager.URL.searchSupplierListByGoodsType;
	}
	// alert("...tableDataUrl一个萝卜没进坑~- -！！！ 没有对位入座");
	return "";
}

/*
 * 不同的分页table，有不同的查询条件参数，这里是根据分页searchTableId（保存值是分页table的Id）
 * 根据searchTableId，绑定不同的查询条件参数
 */
function bySearchReturnParams(sort, order) {
	
	var searchParams = "";
	// alert("searchTableId="+searchTableId);
	switch (searchTableId) {
	case goodsManager.pageListTableId.listTable:
		/*
		 * 查询模糊查询商品名称、商品编码、供应商名称。
		 */
		var jobState = $("#jobState").val();
		var goodsName_tabOne = $("#goodsName_tabOne").val();
		var goodsCode_tabOne = $("#goodsCode_tabOne").val();
		var supplierNameOne = $("#supplierNameOne").val();
		
		
		/*
		 * 如果条件为空，则不添加键，三元运算符返回一个空字符串，否则添加键与对应的值
		 */
		searchParams += goodsName_tabOne == "" ? "" : ("goodsName : '" + goodsName_tabOne + "',");// 名称
		searchParams += goodsCode_tabOne == "" ? "" : ("goodsCode : '" + goodsCode_tabOne + "',");// 编码
		searchParams += supplierNameOne == "" ? "" : ("supplierName : '" + supplierNameOne + "',");// 供应商名称
		searchParams += jobState == "" ? "" : ("jobState : '" + jobState + "',");// 状态
		break;
	case goodsManager.pageListTableId.listTableTwo:
		/*
		 * 查询模糊查询商品名称、商品编码、供应商名称、商品类型，最近多少天未更新
		 */
		var goodsName_tabTwo = $("#goodsName_tabTwo").val();
		var goodsCode_tabTwo = $("#goodsCode_tabTwo").val();
		var supplierName_tabTwo = $("#supplierName_tabTwo").val();
		var goodsType_tabTwo = $("#goodsType_tabTwo").val();
		var recentlyDay_tabTwo = $("#recentlyDay_tabTwo").val();

		// bootstrap table获取选中行的值
		var row = $.map($("#" + goodsManager.pageListTableId.listTable)
				.bootstrapTable('getSelections'), function(row) {
			return row;
		});

		// 如果复选框有选中行
		if (isInId == 1 && row.length != 0) {
			var goodsIds = "goodsIds:[";
			for (var i = 0; i < row.length; i++) {
				if (i > 0) {
					goodsIds += ",";
				}
				// alert(row[i].id);
				goodsIds += "'" + row[i].id + "'";
			}
			goodsIds += "],";
			// 如果进入这里，说明至少有一行被选中， 所有必然有数据要保存到json中。
			searchParams += goodsIds;
			// 查询结束后， 下次如果不是点击 导航了>供应商管理>供应信息：“更新供应信息”进入的查询，则不会添加上面的条件
			isInId = 0;
			// 因为进入模态框时，不需要后面的条件查询，所有后面的判断不需要了，直接跳出选择结构
			break;
		}

		/*
		 * 如果条件为空，则不添加键，三元运算符返回一个空字符串，否则添加键与对应的值
		 */
		searchParams += goodsName_tabTwo == "" ? "" : ("goodsName : '"
				+ goodsName_tabTwo + "',");// 名称
		searchParams += goodsCode_tabTwo == "" ? "" : ("goodsCode : '"
				+ goodsCode_tabTwo + "',");// 编码
		searchParams += supplierName_tabTwo == "" ? "" : ("supplierName : '"
				+ supplierName_tabTwo + "',");// 供应商名称
		searchParams += goodsType_tabTwo == "" ? "" : ("goodsType : '"
				+ goodsType_tabTwo + "',");// 商品类型
		searchParams += recentlyDay_tabTwo == "" ? "" : ("recentlyDay : '"
				+ recentlyDay_tabTwo + "',");// 有多少天未更新
		break;
	case goodsManager.pageListTableId.listTableThree:
		searchParams += "goodsId : '" + queryLogGoodsId + "',";
		break;
	case goodsManager.pageListTableId.listTableFour:

		// 查询模糊查询供应商名称
		var supplier = $("#supplier_tabFour").val();

		// 获取选择的排序字段单选按钮
		var sortOption = $("input:radio[name='optionsRadios']:checked");

		// 供应商名称
		searchParams += supplier == "" ? ""
				: ("supplier : '" + supplier + "',");
		/*
		 * 如果选择all_tabFour，表示全部， 则不改变sort的默认值，否则获取选中按钮的value，value中保存了相应的排序字段关键字
		 * default_tabFour 默认 ontimeRate_tabFour 送货准时率 stockinRate_tabFour 送货入库率
		 * returnRate_tabFour 退货率
		 */
		sort = $(sortOption).attr("id") == "default_tabFour" ? sort : $(
				sortOption).val();
		// 获取选中的排序顺序（升序或倒序）
		order = $("input:radio[name='order']:checked").val();
		// 当前商品的类型， 根据类型查询能供应该类型的供应商 goodsName表示供应商提供商品的列表字段
		searchParams += "goodsTypeCodes : '" + $("#goodsType").val() + "',";
	}
	// 排序条件
	searchParams += "sort : '" + sort + "',";// 排序字段
	searchParams += "order : '" + order + "',";// 排序升序（升序、倒序）
	return searchParams;// 返回拼接后的查询条件字符
}
// 传入按钮元素，根据该buttonid到知道table中，获取相应的数据
function updateGoodsSupply(but_element) {
	// 每个按钮元素的value值，保存有一个talbe的Id，根据按钮id到相应的table的中，获取存放的数据
	var tableId = $(but_element).val();
//	alert(tableId);
	switch (tableId) {
	case goodsManager.getDataTableId.dataTable:// 单个供应信息更新的数据在这个table中获取
		break;
	case goodsManager.getDataTableId.dataTableTwo:// 多个供应信息更新的数据在这个table中获取
		break;
	}
	// 不同的操作，返回不同的参数，save表示保存不提交，submit，表示保存并提交给相应的审批人。
	var but_id = $(but_element).attr("id");

	/*
	 * 每个更新计划操作按钮的id都是以_save、_submit结尾的，
	 * 所以直接截取最后一个“_”下标之后的字符串，就可以获取一个save或者submit， 根据url将参数传入相应的属性中，判断是否提交审批。
	 * substring(index)，从index参数开始截取字符串。
	 * lastIndexOf("string")，截取字符串中最后一个string，如“AbcAbcAbc”，A下标有0、3、6，最后一个A的下标是6。
	 * 下面+1，是为了不截取“_”，只截取下划线后的字符。
	 */
	var operate = but_id.substring(but_id.lastIndexOf("_") + 1);
	// var jobStack
	// 获取更新的供应商、价格的集合。
	// var updateSuppliers = $("[id='" + tableId
	// + "'] input[class='updateSupplier']");
	// var updatePrices = $("[id='" + tableId + "']
	// input[class='updatePrice']");

	/*
	 * 单个商品模态框或多个商品模态框的更新供应商， 单个商品模态框只有一个更新供应商， 而多个商品更新模态框，则有多个更新供应商
	 */
	var updateSuppliers = $("#" + tableId).find(".updateSupplier");
	/*
	 * 单个商品模态框或多个商品模态框的更新单价， 单个商品模态框只有一个更新单价， 而多个商品更新模态框，则有多个更新单价
	 */
	var updatePrices = $("#" + tableId).find(".updatePrice");
	// 单个商品或多个商品的更新时间都各自只有一个时间文本框
	var updateDates = $("#" + tableId).find(".updateDate");
//	alert(updateSuppliers.length + "\n" + updatePrices.length + "\n"
//			+ updateDates.length);
	
	var updateDate = updateDates[0];// 只有一个时间文本框，单个商品或多个商品的更新时间
	if (updateDate==""){
//		alert("时间不能为空");
		return;
	}
	// jobVos是com.zlb.erp.pms.core.api.vo.PmsGoodsUpdateJobVo实体类中的一个集合属性
	var json = "{jobVos:[";
	var whetherChangeCoun = 0;

	for (var i = 0; i < updateSuppliers.length; i++) {
		// alert(updateSuppliers.length);
		// 判断，如果当前商品的供应商和价格都没有发生过改变，则退出
		var supplier = updateSuppliers[i];
		var price = updatePrices[i];
		
		// 按照需求，供应商和价格是可以分别改变，
		if ($(supplier).attr("whetherChange") == "true"
				|| $(price).attr("whetherChange") == "true"
				// 如果时间改变了，并且是单个修改，那么就进入单个修改，不支持多个修改
				|| ($(updateDate).attr("whetherChange") == "true" && tableId == goodsManager.getDataTableId.dataTable)) {
			// alert("价格="+$(price).attr("whetherChange")+"\n"
			// +"供应商="+$(supplier).attr("whetherChange")
			// +"更新时间="+$(updateDate).attr("whetherChange"));
			// 如果whetherChangeCoun大于0，则说明前面添加有一个对象了，则需要用“,”逗号隔开。
			json += (whetherChangeCoun > 0 ? "," : "") + "{"
			// 如果供应商发生了改变
			if ($(supplier).attr("whetherChange") == "true") {
				// 添加更新的供应商json数据
				json += 'supplierNew : "' + $(supplier).val() + '",';// 获取供应商名称（供应商名称是唯一的）
				//123123
				json += 'supplierNewId : "' + $(supplier).attr("newId") + '",';// 获取供应商名称（供应商名称是唯一的）
			}
			
			// alert($(price).attr("whetherChange")+"---price");

			// 如果价格发生了改变
			if ($(price).attr("whetherChange") == "true") {
				// 添加更新的价格json数据
				json += 'priceNew : "' + $(price).val() + '",';// 获取供应商名称（供应商名称是唯一的）
			}
			/*
			 * 如果更新时间发生了改变，多个商品更新时间的whetherChange永远为true，
			 * 而单个商品更新时间，则如果没改变就为false，改变后就为true，为true就会提交更新
			 */
			if ($(updateDate).attr("whetherChange") == "true") {
				// 添加更新的价格json数据
				json += 'updatePlanTime : "' + $(updateDate).val() + '",';// 获取供应商名称（供应商名称是唯一的）
			}
			// 设置状态
			json += 'jobState : "' + (operate == "save" ? "1" : "2") + '",';

			// 添加id，修改时根据商品id，更新供应商或者价格
			json += 'goodsId : "' + $(supplier).attr("gId") + '"';
			json += "}";
			whetherChangeCoun++;
		}

	}
	json += "]}";
	// alert(json);
	// 执行aJax方法进行数据提交
	if (whetherChangeCoun == 0)
		return;// 如果没有改变的数据
	// (new Function("return " + json))() 这个是转换为json对象，没有问题， 不要看着别扭改动。
	goodsManager.aJaxCRUD((new Function("return " + json))(),
			goodsManager.URL.goodsJobModify);
}
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {
	// 获取查询条件，参数：params.sort,params.order 表示排序字段、顺序（升序或倒序）。
	var searchReturnParams = bySearchReturnParams(params.sort, params.order);
	// 公共分页键
	var temp = "{" // 这里的params键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			+ searchReturnParams// 注意这个变量的位置，要放在拼接字符的中间，否则会因为“,”的原因，拼接错误。
			+ "pageSize : '" + params.limit + "'," // 页面大小
			+ "offset : '"
			+ (goodsManager.isResetOffset == 1 ? 0 : params.offset) + "'" // 分页偏移值
			+ "}";
	return (new Function("return " + temp))();// 字符串转为json格式返回
};

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	// 删除商品
	'click .delete_a' : function(e, value, row, index) {
		goodsManager.deleteData(row.id);
	},
	// 编辑
	'click .edit_a' : function(e, value, row, index) {
		getAllContent(goodsManager.URL.toAddViewUrl() + "?id=" + row.id);
	},
	// 点击商品列表名称，弹出单个供应信息模态框
	'click .goodsUpdateJob' : function(e, value, row, index) {
		// 保存查询商品详细信息的Id
		
		goodsManager.goodsId = row.id;
		
		var goodId = row.id;
		// 保存当前商品的id，用来查询这个商品的更新日志
		queryLogGoodsId = goodId;
		// 保存id，用来查询
		var params = {
			"id" : goodId
		};
		goodsManager.aJaxCRUD(params,
				goodsManager.URL.searchGoodsByKeyUrl);
		
		
		var showState = "inline";
		//在状态非等于新增（1）、驳回（4）、已执行（5）时，不可以保存、提交，
		if (row.jobState=="3" || row.jobState == "4"){
			showState = "none";
		}
		document.getElementById("btn_approve").style.display=showState;
		document.getElementById("btn_reject").style.display=showState; 
		
		// 显示模态框
		$.showModal('#myModalTwo');
	},
	// 多个商品更新，弹出供应商模态框的点击事件绑定
	'click .supplierOption' : function(e, value, row, index) {
		// alert(row.goodsType+"==651");
		// 将本商品的类型传入供应商选择查询方法。
		goodsManager.getSupplierListByGoodsType(row.goodsTypeId, this);
	},
	// 多个商品更新，弹出模态框的更新价格点击事件绑定
	'click .valueChange' : function(e, value, row, index) {
		// 绑定价格改变事件
		bindingUpdatePriceChange(this);
	}
};
//改变时间类型Date对象的方法显示格式，改变后格式：yyyy-mm-dd
Date.prototype.toLocaleString = function() {
	 var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = this.getMonth() + 1;
	    var strDate = this.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = this.getFullYear() + seperator1 + month + seperator1 + strDate;
//	            + " " + this.getHours() + seperator2 + this.getMinutes()
//	            + seperator2 + date.getSeconds();
	    return currentdate;
};

function jobShowBindingData(g){
	$("#particular_goodsName").html(g.goodsName);// 商品名称
	$("#particular_goodsUnit").html(g.unitDesc);// 单价
	$("#particular_goodsType").html(g.goodsType);// 规格
	$("#particular_maxPrice").html(g.maxPrice);// 历史最高价
	$("#particular_minPrice").html(g.minPrice);// 历史最低价
	$("#particular_avgPrice").html(g.avgPrice);// 平均价
	$("#particular_goodsPrice").html(g.goodsPrice);// 当前价格
	$("#particular_supplierName").html(g.supplierName);// 供应商名称
	$("#particular_updateSupplier").html(g.updateSupplier);// 更新后供应商
	$("#particular_updatePlanTime").html(new Date(g.updatePlanTime).toLocaleString());// 更新时间
	$("#particular_updatePrice").html(g.updatePrice);// 更新价格

	/*
	 * 商品类型，用文本框保存，并且隐藏，用作供应商选择模态框中分页table的的搜索条件，
	 */
	$("#goodsTypeIdOne").val(g.goodsTypeId);
}

$(document).ready(function() {
	/*
	 * 注意： 下面变量，没有用var 声明， 将会默认未全局变量
	 */
	/* ============ 声明全局变量 start ============ */

	// 弹出模态框中的分页bootstraptable判断是否已经初始化，0没有，1已经初始化
	tabTwo = 0;
	tabThree = 0;
	tabFour = 0;

	// 商品列表， 点击更新供应商后，弹出选择供应商模态框， 点击确认后， 保存当前供应供应商选择
	supperlierOptionText = null;

	/*
	 * 导航了>供应商管理>供应信息：点击“更新供应信息”，显示选中的行的商品供应信息到模态框，
	 * bySearchReturnParams中，如果isInId等于0，则表示按选中行显示商品，否则按模态框中条件选中商品
	 */
	isInId = 0;
	// 单个商品信息更新， 点击商品名称，弹出商品信息、商品更新日志，需要根据当前商品id查询相应的更新日志，下面变量用来存放当前商品id
	queryLogGoodsId = "";
	/*
	 * 查询搜索按钮、分页table初始化，都会调用goodsManager.searchListByPage函数，
	 * searchListByPage调用了queryParams,
	 * queryParams函数又调用了bySearchReturnParams函数绑定各自需要不同的条件参数
	 * bySearchReturnParams()，是根据searchTableId来动态绑定查询条件的
	 * searchTableId为空时，表示不根据条件查询，查询当前分页表全部信息
	 * 只有传递条件的组件有值或者被选中，才会根据searchTableId添加分页table的查询条件参数； 点击后查询组件后，
	 * 触发后会根据按钮的Id值，传入相应的bootstrapTable的Id到checkOfclick()方法， 在方法执行查询之前，
	 * 根据下面这个声明的属性的不同的值，在bySearchReturnParams()方法绑定不同的条件。
	 */
	searchTableId = "";

	/* ============ 声明全局变量 end ============ */

	// 1、初始化加载列表数据
	goodsManager.init();
	// 2、初始化绑定增删改查事件
	goodsManager.bindEvent();
});
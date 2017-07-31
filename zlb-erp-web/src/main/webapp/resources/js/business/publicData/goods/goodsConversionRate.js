// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsConversionRateManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	relateOriginalGoodSkuIds:"",
	goodsId:"",
	goodsMode:"",
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//跳转列表页
    	initUrl: function () {
            return '/publicData/goods/init';
        },
		//分页获取商品列表请求地址，转换率配置界面
    	searchListByPageUrl: function () {
            return '/publicData/goods/goodsConversionRateListByPage';
        },
        //获取商品分类树目录
        goodsTypeTreeUrl: function () {
            return '/publicData/goodsType/goodsTypeTree';
        },
        //进入修改界面，获取商品库存信息
        getStockByGoodsIdUrl:function(){
        	return '/publicData/goodsStock/getStockByGoodsId';
        },
        //进入修改界面，多规格商品看详情
        goodsConversionAndRecordRateByGoodsIdUrl: function () {
            return '/publicData/GoodsConversionRate/goodsConversionAndRecordRateByGoodsId';
        },
        //进入修改界面，单品商品看详情
        singleGoodsConversionByGoodsIdUrl: function () {
            return '/publicData/GoodsConversionRate/singleGoodsConversionByGoodsId';
        },
        //选择原始商品
        queryGoodsOriginalListByPageUrl: function () {
            return '/publicData/goodsOriginal/list';
        },
        // 修改多规格的转换率
        updateSkuConversionRateUrl: function () {
            return '/publicData/goodsSkuList/updateConversionRate';
        },
        // 新增单品或多规格的转换率
        addGoodsConversionRateUrl: function () {
            return '/publicData/GoodsConversionRate/addGoodsConversionRate';
        },
        // 修改单品或多规格的转换率
        updateGoodsConversionRateUrl: function () {
            return '/publicData/GoodsConversionRate/updateGoodsConversionRate';
        },
        // 删除单品或多规格的转换率
        deleteGoodsConversionRateUrl: function () {
            return '/publicData/GoodsConversionRate/deleteGoodsConversionRate';
        }
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: goodsConversionRateManager.URL.searchListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			goodsConversionRateManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'goodsImageUrl',
    			title: '商品主图',
    			formatter:function(value,row,index){
       				return '<img width="50px;" height="50px;" src="' + row.goodsImageUrl + '" alt="LOGO" class="logo-default"/>'
       		    }
    		},{
    			field: 'goodsCode',
    			title: '商品编码'
    		}, {
    			field: 'title',
    			title: '商品名称'
    		}, {
    			field: 'typeName',
    			title: '所属分类'
    		}, {
    			field: 'goodsMode',
    			title: '商品类型',
    			formatter:function(value,row,index){
    				var html = "";
    				if (value == 0)
    					html = "单品";
    				else if (value == 1)
    					html = "多规格商品";
    				else if (value == 2)
    					html = "组合商品";
					return html;
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'goodsStatus',
    			title: '商品状态',
    			formatter:function(value,row,index){
    				var html = "";
    				if (value == 0)
    					html = "未上架";
    				else if (value == 1)
    					html = "已上架";
    				else if (value == 2)
    					html = "已下架";
    				else if (value == 3)
    					html = "已删除";
					return html;
    			},
    	        events: 'operateEvents'
    		}, {
    			field: 'createTime',
    			title: '创建时间',
    		    align: 'center'
    		},{
    			field: 'id',
    			title: '操作',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary btn-sm config_a" href="javascript:void(0)" >转换率配置</a>';
		            return html; 
    	        },
    	        events: 'operateEvents'
    	    }]
    	});
    },
    /**查：初始化商品分类，树形结构**/
    initGoodsTypeTree: function () {
		$.callAjax({
			url : goodsConversionRateManager.URL.goodsTypeTreeUrl(),
			data : "",
			success : function(serverData) {
				$('#goods_type_tree').treeview({
					data : serverData,
					levels : 99,// 展开的层次
					showCheckbox: true,
					multiSelect: false,// 是否可以同时选择多个节点，行选中不是复选框选中
					showTags : false,// 需要配合tags来使用，如text: 'Parent 2', tags: ['7']
					showBorder: true,// 是否显示分割线
					enableLinks : true,// 鼠标放上去显示<a>链接样式
					highlightSelected: true,//当选择节点时是否高亮显示
					onNodeSelected: function(event, node) {
					    if(node.state.checked){   
					        //设置不勾选
					    	$('#goods_type_tree').treeview('uncheckNode', node.nodeId);    
					    } else {
					    	//设置勾选
					    	$('#goods_type_tree').treeview('uncheckAll');  
					        //设置勾选
					    	$('#goods_type_tree').treeview('checkNode', node.nodeId);  
					    }  
					}
				});
			}
		});
    },
    /**编辑，获取商品库存信息**/
    getStockByGoodsId: function (goodsId) {
    	var params = {goodsId:goodsId};
		$.callAjax({
			url : goodsConversionRateManager.URL.singleGoodsConversionByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		var html = "<div style='height: 300px; margin-top:10px;padding-top: 10px;border:1px solid #C0C0C0;' class='L_all_spt'>";
		    	
		    	html += ""+
		    	"<div class='col-md-12 form-inline' style='margin-top:8px;'>"+
					"<div class='col-md-11 form-inline'>"+
		            	"<span class='text-required'>*</span>关联的原始商品："+
		                "<div class='input-group'>"+
		                	"<input readonly='readonly' onclick='goodsConversionRateManager.chooseOriginalGoods(\"\")' name='relateOriginalGoodName' id='relateOriginalGoodName' value='' class='form-control input-small'  placeholder='请选择原始商品' type='text'   />"+
		                	"<input name='relateOriginalGood' id='relateOriginalGood' value='' style='display: none;'/>"+
		                	"<input name='conversionRateId' id='conversionRateId' value='' style='display: none;'/>"+
						    "<div class='input-group-addon' style='background-color: white;' onclick='goodsConversionRateManager.chooseOriginalGoods(\"\")'><span class='glyphicon glyphicon-search' ></span></div>"+
		                "</div>"+
		             "</div>"+
	             "</div> "+
				"<div class='col-md-12 form-inline' style='margin-top:8px;'>"+
					"<div class='col-md-11'>"+
						"<span class='text-required'>*</span>转换率计算公式：一个单位的售卖商品 = <input type='text' style='width:180px;' value='' id='conversionRate' name='conversionRate' class='form-control' placeholder='请输入正整数或小数'>个单位数量的原始商品"+
					"</div>"+
					"<br><br><div id='toolbar' class='btn-group' >"+
						"<button type='button' class='btn btn-default  btn-sm'"+
							"id='btn_add' onclick='addOrUpdateGoodsOriginalConversionRate(\"\");'>"+
							"<span class='glyphicon' style='color: green;'></span>新增"+
						"</button>"+
						"<button style=\"display:none;\" type=\"button\""+
							" class=\"btn btn-default btn-sm\" "+ 
							"onclick=\"btn_cancel_updateClick('')\" id=\"btn_cancel_update\"><span class=\"glyphicon\" aria-hidden=\"true\"></span>取消修改</button>"+
				        "<button style=\"display:none;\" id=\"btn_save_submit\" onclick='addOrUpdateGoodsOriginalConversionRate(\"\");' type=\"button\" name=\"btn_save_submit\" class=\"btn btn-primary btn-sm\" ><span class=\"glyphicon\" aria-hidden=\"true\"></span>保存</button>"+
					"</div>"+
				"</div>";
		    	
		    	//已添加原始商品
		    	html +=/*"<label class='col-sm-8 control-label'>原始商品名称（售卖商品包含该原始商品数）</label>"+*/
		    		"<div class='col-sm-10' style='margin-top:18px;'>"+
				"<div id='sku'" +
					"style='border: 2px solid #000; "+
					"overflow: auto; height: 110px; width: 650px;'>";
		    	//已添加原始商品
		    	html += "</div>"+
				"</div>";
				html += "</div>";
				$('#addForm').append(html);
         		if(data.data != null){
	       			console.log(JSON.stringify(data.data));
	       			
			    	for (var k=0 ; k < data.data.length  ; k ++){
			    		var rateId= data.data[k].id;
			    		var oGoodsId=data.data[k].relateOriginalGood;
			    		var oGoodsName= data.data[k].relateOriginalGoodName;
						var conversionRate = data.data[k].conversionRate;
						if(conversionRate == null){
							conversionRate = "";
						}
			    		addGoodsTupeDivEle(rateId, oGoodsId, oGoodsName, "",conversionRate);
			    	}
         		}
			}
		});

    	$.showModal('#configModal');
    },
    /**编辑，获取多规格商品信息**/
    getSkuListByGoodsId: function (goodsId) {
    	var params = {goodsId:goodsId};
		$.callAjax({
			url : goodsConversionRateManager.URL.goodsConversionAndRecordRateByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		data = data.data;
         		
         		if(data != null && data.rows != null){
         			
	         		for (var i=0 ; i < data.rows.length ; i ++){
	         			var checkArray = [];
	         			var item = data.rows[i];
	         			console.log(JSON.stringify(item));
	         			var skuId = item.id;
	         			var html = "<div style='height: 320px; margin-top:10px;padding-top: 10px;border:1px solid #C0C0C0;' class='L_all_spt'>"+
				   					"<label class='col-md-2' style='padding-top: 8px;'>规格"+(i+1)+"：</label>";
    	
				    	for (var j=0 ; j < item.skuList.length ; j ++){
				    		var skuRecodeItem = item.skuList[j];
							var skuName = skuRecodeItem.skuName;
							html += "<label class='col-md-2' style='padding-top: 8px;'>";
							html += skuName;
							html += "</label>";
						}
				    	html += ""+
				    	"<div class='col-md-12 form-inline' style='margin-top:8px;'>"+
							"<div class='col-md-11 form-inline'>"+
				            	"<span class='text-required'>*</span>关联的原始商品："+
				                "<div class='input-group'>"+
				                	"<input readonly='readonly' onclick='goodsConversionRateManager.chooseOriginalGoods("+skuId+")' name='relateOriginalGoodName' id='relateOriginalGoodName"+skuId+"' value='' class='form-control input-small'  placeholder='请选择原始商品' type='text'   />"+
				                	"<input name='relateOriginalGood' id='relateOriginalGood"+skuId+"' value='' style='display: none;'/>"+
				                	"<input name='conversionRateId' id='conversionRateId"+skuId+"' value='' style='display: none;'/>"+
								    "<div class='input-group-addon' style='background-color: white;' onclick='goodsConversionRateManager.chooseOriginalGoods("+skuId+")'><span class='glyphicon glyphicon-search' ></span></div>"+
				                "</div>"+
				             "</div>"+
			             "</div> "+
						"<div class='col-md-12 form-inline' style='margin-top:8px;'>"+
							"<div class='col-md-11'>"+
								"<span class='text-required'>*</span>转换率计算公式：一个单位的售卖商品 = <input type='text' style='width:180px;' value='' id='conversionRate"+skuId+"' name='conversionRate' class='form-control' placeholder='请输入正整数或小数'>个单位数量的原始商品"+
							"</div>"+
							"<br><br><div class='btn-group'>"+
								"<br/><button type='button' class='btn btn-default  btn-sm'"+
									"id='btn_add"+skuId+"' onclick='addOrUpdateGoodsOriginalConversionRate("+skuId+");'>"+
									"<span class='glyphicon' style='color: green;'></span>新增"+
								"</button>"+
								"<button style=\"display:none;\" type=\"button\" class=\"btn btn-default btn-sm\" onclick=\"btn_cancel_updateClick('"+skuId+"')\" id=\"btn_cancel_update"+skuId+"\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>取消修改</button>"+
						        "<button style=\"display:none;\" id=\"btn_save_submit"+skuId+"\"  onclick='addOrUpdateGoodsOriginalConversionRate("+skuId+");' type=\"button\" name=\"btn_save_submit\" class=\"btn btn-primary btn-sm\" ><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=\"true\"></span>保存</button>"+
							"</div>"+
						"</div>";
				    	
				    	//已添加原始商品
				    	html +=/*"<label class='col-sm-8 control-label'>原始商品名称（售卖商品包含该原始商品数）</label>"+*/
				    		"<div class='col-sm-10' style='margin-top:18px;'>"+
						"<div id='sku"+skuId+"'" +
							"style='border: 2px solid #000; "+
							"overflow: auto; height: 110px; width: 650px;'>";

				    	//已添加原始商品
				    	html += "</div>"+
						"</div>";

						html += "</div>";
						$('#addForm').append(html);
				    	for (var k=0 ; k < item.conversionRateList.length ; k ++){
				    		var rateId=item.conversionRateList[k].id;
				    		var oGoodsId=item.conversionRateList[k].relateOriginalGood;
				    		var oGoodsName=item.conversionRateList[k].relateOriginalGoodName;
							var conversionRate = item.conversionRateList[k].conversionRate;
							if(conversionRate == null){
								conversionRate = "";
							}
				    		addGoodsTupeDivEle(rateId, oGoodsId, oGoodsName, skuId,conversionRate);

				    	}
	         		}

	            	$.showModal('#configModal');
				}
         		else{
         			$.toastrWarning("请先添加商品规格");
         		}
			}
		});
    },
    /**查：选择原始商品**/
    queryGoodsOriginalListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#originalGoodsListTable",//需要分页的table ID
    		url: goodsConversionRateManager.URL.queryGoodsOriginalListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryOriginalParams,
    		onLoadSuccess:function(){
    			goodsConversionRateManager.isResetOffset = 0;
    			$("#original_btn_search").removeClass("disabled");
            },
    		columns: [{
    			radio: true,
    			formatter:function(value,row,index){
    				var originalId = 0;
    				var goodsMode = goodsConversionRateManager.goodsMode;
    				if(goodsMode == 0)
    					originalId = $("#relateOriginalGood").val();
    				else if(goodsMode == 1)
    					originalId = $("#relateOriginalGood"+goodsConversionRateManager.relateOriginalGoodSkuIds).val();
    					
    				if(originalId == row.id){
	        			return {
	        		        checked : true//设置选中
	        	        };
	        		}
    	        }
    		},{
    			field: 'id',
    			title: 'ID'
    		}, {
    			field: 'goodsName',
    			title: '原始商品名称'
    		}, {
    			field: 'unitDesc',
    			title: '商品单位'
    		}]
    	});
    },
    updateConversionRate: function (){
    	var relateOriginalGood = $("#relateOriginalGood").val();
		var conversionRate = $("#conversionRate").val();
		if(relateOriginalGood == null || relateOriginalGood == ''){
			$.toastrWarning("关联的原始商品不能为空");
			return;
		}
    	if(conversionRate == null || conversionRate == ''){
			$.toastrWarning("转换率计算公式不能为空");
			return;
		}
		var goodsItemVo = {goodsId: goodsConversionRateManager.goodsId, relateOriginalGood: relateOriginalGood, conversionRate: conversionRate};
		
		$.callAjax({
			url : goodsConversionRateManager.URL.updateConversionRateUrl(),
			data : goodsItemVo,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$.hideModal('#configModal');
         		$('#listTable').bootstrapTable('refresh');
			}
		});
    },
    skuListUpdateConversionRate: function (){
    	var skuItemList = []; 
		var isOk = true;
		$('#addForm').children("div").each(function(){
			var skuId = $(this).attr('skuId');
			var relateOriginalGood = $("#relateOriginalGood"+skuId).val();
			var conversionRate = $("#conversionRate"+skuId).val();
			if(relateOriginalGood == null || relateOriginalGood == ''){
				$.toastrWarning("关联的原始商品不能为空");
				isOk = false;
				return;
			}
			if(conversionRate == null || conversionRate == ''){
				$.toastrWarning("转换率计算公式不能为空");
				isOk = false;
				return;
			}
			
			var json = {id: skuId, relateOriginalGood: relateOriginalGood, conversionRate: conversionRate};
			skuItemList.push(json);
		});
		
		if(!isOk){
			return;
		}
		
		$.callAjax({
			url : goodsConversionRateManager.URL.updateSkuConversionRateUrl(),
			data : skuItemList,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$.hideModal('#configModal');
         		$('#listTable').bootstrapTable('refresh');
			}
		});
    },
    //选择原始商品
    chooseOriginalGoods: function (skuId) {
    	goodsConversionRateManager.relateOriginalGoodSkuIds = skuId;
		$.showModal('#chooseOriginalGoodsModal');
		
		$.clearForm("searchOriginalForm");
		  	$('#originalGoodsListTable').bootstrapTable('refresh');
		  	goodsConversionRateManager.queryGoodsOriginalListByPage();
	},
    bindEvent: function () {
    	$("#original_btn_search").on("click",function () {
  		  $("#original_btn_search").addClass("disabled");
  		  goodsConversionRateManager.isResetOffset = 1;
  		  $('#originalGoodsListTable').bootstrapTable('refresh');
  	    });
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  $("#btn_search").addClass("disabled");
    		  goodsConversionRateManager.isResetOffset = 1;
    		  $('#listTable').bootstrapTable('refresh');
    	});
    	
    	//清空事件
    	$("#btn_clean").on("click",function () {
    		$.clearForm("searchForm");
    	});
    	
    	//绑定键盘事件
    	$("#searchForm").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 goodsConversionRateManager.isResetOffset = 1;
    			 $('#listTable').bootstrapTable('refresh');
    		}
	    }); 
    	//商品分类搜索按钮
    	$(".choose_search_goodsType").on("click",function () {
    		$.showModal('#chooseGoodsTypeModal');
    		goodsConversionRateManager.initGoodsTypeTree();
    	});
    	//商品分类隐藏对话框  -确定后
    	$("#btn_goodsType_confirm").click(function(){
    		// 获取选中的节点
    		var checkArray = $('#goods_type_tree').treeview('getChecked');
    		if(checkArray.length != 1){
    			$.toastrWarning("请选择一个分类");
    			return;
    		}
    		var obj = checkArray[0];
    		$("#searchGoodsType").val(obj.id);
    		$("#searchGoodsTypeName").val(obj.text);
    		$.hideModal('#chooseGoodsTypeModal');
    	});
    	
    	//下拉选择改变刷新列表数据
    	$("#searchGoodsStatus").change(function() {
    		$('#listTable').bootstrapTable('refresh');
    	});
    	//下拉选择改变刷新列表数据
	    $("#searchGoodsMode").change(function() {
	    	$('#listTable').bootstrapTable('refresh');
	    });
    	
    	//选择原始商品  -确定后，单选
    	$("#btn_originalGoods_confirm").click(function(){
    		var checkArray = $("#originalGoodsListTable").bootstrapTable('getSelections');
    		if(checkArray.length <= 0){
    			$.toastrWarning("请选择一个原始商品");
    			return;
    		}
    		$("#relateOriginalGood"+goodsConversionRateManager.relateOriginalGoodSkuIds).val(checkArray[0].id);
    		$("#relateOriginalGoodName"+goodsConversionRateManager.relateOriginalGoodSkuIds).val(checkArray[0].goodsName);
    		
    		/*
    		 * 问题：在使用Bootstrap时，有时候会用到模态框中再嵌套模态框。这样就会出现一个问题，就是在关闭第二个模态框时
    		 * ，会导致第一个模态框的滚动条消失，这样就会使得屏幕太小而模态框太大看不到底部信息，而没法进行操作。
    		 * 解决：就是在第二个模态框的关闭hide后， 设置第一个模态框的样式,给其加一个样式:'overflow-y':'scroll'。
    		 * 下面代码用于解决： Bootstrap中，模态框嵌套模态框时，关闭第二个模态框时，导致第一个模态框的滚动条消失 
    		 */ 
    		$.hideModal('#chooseOriginalGoodsModal');
    	});
    	
    	//新增或修改
    	$("#btn_save_submit").click(function(){
    		//单品
    		if(goodsConversionRateManager.goodsMode == 0){
    			goodsConversionRateManager.updateConversionRate();
    		}
    		// 多规格商品
    		else if(goodsConversionRateManager.goodsMode == 1){
    			goodsConversionRateManager.skuListUpdateConversionRate();
    		}
    	});
    	
    	//绑定点击取消事件
		 $("#btn_cancel").on("click",function() {
			 $.modalCancel("addForm","configModal");
		 });
		 
//		 // 隐藏更新转换率模态框后，刷新转换率列表
//		 $('#configModal').on('hidden.bs.modal', function() {
//			 $('#listTable').bootstrapTable('refresh');
//		 });
		

		// 模态框添加滚动条， 如果不添加滚动条， 在打开配置转换率模态框，再打开的选择原始商品二层模态框关闭后，一次模态框如果超搞将无法上下滚动。
 		$('#configModal').css({'overflow-y':'scroll'});

    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsConversionRateManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数
	var searchKeyword = $("#searchKeyword").val();
	
	//商品编码
	var goodsCode = $("#goodsCode").val();
	// input框里的叉叉事件怎么捕获
	if($("#searchGoodsTypeName").val() == "")
		$("#searchGoodsType").val("");
	var searchGoodsType = $("#searchGoodsType").val();
	
	var searchGoodsStatus=$('#searchGoodsStatus').val();
	
	var searchGoodsMode=$('#searchGoodsMode').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsConversionRateManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		searchKeyword: searchKeyword,//商品名称
		searchDesc : goodsCode,//商品编码，注意：goodsCode保存到Vo的searchDesc字段的。
		searchType:searchGoodsType,//所属分类，水果、蔬菜
		status:searchGoodsStatus,//商品状态
		searchName:searchGoodsMode,//商品类型，单品、多规格、组合，注意：gooodsMode保存到Vo的searchName字段的。
		sort: params.sort,
		order: params.order
	};
	return temp;
};

var queryOriginalParams = function (params) {
	//自定义查询参数
	var searchKeyword = $("#searchOriginalKeyword").val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsConversionRateManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		searchKeyword:searchKeyword
	};
	return temp;
};

// 添加单品、多规格下的原始商品显示，参数是：转换率id、原始商品id、原始商品名称、规格id、转换数。
function addGoodsTupeDivEle(rateId, oGoodsId, oGoodsName, skuId, conversionRate) {
	var divId = "sku"+skuId;

	var addDivOriginalGoodsHtmlStr = '<div id="rate_'+rateId+'" '
	+ ' '
	//如果原始商品名称大于13个字节，则将宽度调整到400px，换行
	+ ' style="width:'+(oGoodsName.length>=13?'605px':'300px')+';height:28px;float:left;margin:3px;overflow:hidden;padding-rigth: 0px;padding-top: 2px;" '
	+ ' class="alert alert-danger alert-dismissable divdelete">'
	+ "<button onclick='closeBefore("+ rateId+ ",\""+skuId+"\")' type='button' "
	+ ' oGoodsId="'+oGoodsId+'"'
	+ ' class="close" '
	+ ' aria-hidden="true">'
	+ '☒'
	+ '</button>'
	+ "<button onclick='updateBefore("+ rateId + ","+oGoodsId+",\""+oGoodsName+ "\",\""
	+ skuId+"\","+conversionRate+")'"
	+ ' type="button" ' 
	+ ' oGoodsId="'+oGoodsId+'"'
	+ ' class="close" '
	+ ' aria-hidden="true">'
	+ '✎'
	+ '</button><span id="rate_oName'+rateId+'">'
	+ oGoodsName + '（'+conversionRate+'）</span></div>';

	$("#" + divId).append(addDivOriginalGoodsHtmlStr);
}

// 点击小差差时删除原始商品
function closeBefore(rateId,skuId) {

	$.dialogConfirm({
		message : (rateId==$("#conversionRateId"+(skuId==""?"":skuId)).val()?'该原始商品正在修改，':'')+'确定要删除吗?',
		callback : function(result) {
			if (result) {
				var params = {
					"id" : rateId,
					"goodsMode" : goodsConversionRateManager.goodsMode
				};
				$.callAjax({
					url : goodsConversionRateManager.URL.deleteGoodsConversionRateUrl(),
					data : params,
					success : function(data) {
						$.toastrSuccess('删除成功！');
						var id = "rate_" + rateId;
						$("#"+id).remove();
						// 如果删除的商品正在修改
						if (rateId==$("#conversionRateId"+(skuId==""?"":skuId)).val()){
							$("#conversionRateId"+(skuId==""?"":skuId)).val('');
							$("#conversionRate"+(skuId==""?"":skuId)).val('');
							$("#relateOriginalGoodName"+(skuId==""?"":skuId)).val('');
							$("#relateOriginalGood"+(skuId==""?"":skuId)).val('');
						}
					}
				});
			}
		}
	});
}
//修改完成后，更新原始商品显示值
function updateBeforeLater(rateId,name,num) {
	var id = "rate_oName" + rateId;
	$("#"+id).text(name+"（"+num+"）");
}
// 修改原始商品值
function updateBefore(rateId, oGoodsId, oGoodsName, skuId, conversionRate) {
	$("#conversionRateId"+(skuId==0?"":skuId)).val(rateId);
	$("#relateOriginalGoodName"+(skuId==0?"":skuId)).val(oGoodsName);
	$("#relateOriginalGood"+(skuId==0?"":skuId)).val(oGoodsId);
	
	$("#conversionRate"+(skuId==0?"":skuId)).val(conversionRate);
	$("#btn_add"+skuId).css("display","none");
	$("#btn_save_submit"+skuId).css("display","block");
	$("#btn_cancel_update"+skuId).css("display","block");
	 
//	$.toastrWarning("还没做呢！"+skuId+"--"+rateId);
}

// 取消修改（如果参数skuId不为空字符（""），则表示多规格，否则表示单品，并根据skuId拼接成Id操作相应的元素）
function btn_cancel_updateClick(skuId){
	$("#conversionRateId"+(skuId==""?"":skuId)).val('');
	$("#relateOriginalGoodName"+(skuId==""?"":skuId)).val('');
	$("#relateOriginalGood"+(skuId==""?"":skuId)).val('');
	
	$("#conversionRate"+(skuId==""?"":skuId)).val('');
	$("#btn_add"+skuId).css("display","block");
	$("#btn_save_submit"+skuId).css("display","none");
	$("#btn_cancel_update"+skuId).css("display","none");
}

// 添加或者修改原始商品
function addOrUpdateGoodsOriginalConversionRate(skuId){
	var conversionRateId = $("#conversionRateId"+(skuId==""?"":skuId)).val();
	var goodsMode = goodsConversionRateManager.goodsMode;
	var goodsId = goodsConversionRateManager.goodsId;
//	var sku_id = skuId;
	var relateOriginalGood = $("#relateOriginalGood"+(skuId==""?"":skuId)).val();
	var relateOriginalGoodName = $("#relateOriginalGoodName"+(skuId==""?"":skuId)).val();

	var conversionRate = $("#conversionRate"+(skuId==""?"":skuId)).val();

	if(relateOriginalGood == null || relateOriginalGood == ''){
		$.toastrWarning("关联的原始商品不能为空");
		return;
	}

	if(conversionRate == null || conversionRate == ''){
		$.toastrWarning("转换率计算公式不能为空");
		return;
	}
	
	var params = "{" 
		+ (conversionRateId==""?"":("id :'" + conversionRateId + "',"))
		+ (skuId==""?"":("skuId :'" + skuId + "',"))
		+ "goodsMode : '" + goodsMode + "',"
		+ "goodsId : '" + goodsId + "',"
		+ "relateOriginalGood : '" + relateOriginalGood + "',"
		+ "conversionRate : '" + conversionRate + "'"
		+ "}";

	var url = conversionRateId==""?goodsConversionRateManager.URL.addGoodsConversionRateUrl():goodsConversionRateManager.URL.updateGoodsConversionRateUrl();
	$.callAjax({
		url : url,
		data : (new Function("return " + params))(),// 字符串转为json格式返回
		success : function(data){
     		if(data.code != "0000"){
     			$.toastrWarning(data.msg);
     			return;
     		}
     		if (conversionRateId!="") {//conversionRateId 非空表示修改
     			updateBeforeLater(conversionRateId,relateOriginalGoodName,conversionRate);
     		} else {//否则表示新增
//     			$("#conversionRateId"+(skuId==""?"":skuId)).val('');
     			$("#conversionRate"+(skuId==""?"":skuId)).val('');
     			$("#relateOriginalGoodName"+(skuId==""?"":skuId)).val('');
     			$("#relateOriginalGood"+(skuId==""?"":skuId)).val('');
     			addGoodsTupeDivEle(data.data.id, relateOriginalGood, relateOriginalGoodName, skuId, conversionRate);
     		}
     		
		}
	});
}
//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	//转换率配置
    'click .config_a': function (e, value, row, index) {
    	$('#addForm').empty();
    	goodsConversionRateManager.goodsMode = row.goodsMode;
    	goodsConversionRateManager.goodsId = row.id;
    	//单品
    	if(row.goodsMode == 0){
    		goodsConversionRateManager.getStockByGoodsId(row.id);
    	}//多规格商品    	
    	else if(row.goodsMode == 1){
    		goodsConversionRateManager.getSkuListByGoodsId(row.id);
    	}
	}
};

$(document).ready(function(){
	//1、初始化加载列表数据
	goodsConversionRateManager.init();
	//2、初始化绑定增删改查事件
	goodsConversionRateManager.bindEvent();
});
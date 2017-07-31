// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	id:"",
	type:0,//0 商品图片，1 商品详情图片
	skuList:[],	//销售规格库存数据集合
	oldValue:"",//销售规格页签，下拉框改变之前的值，多个以,号隔开作为skuList的key
	deleteIds:[],//界面点击删除按钮&id有值时往这里塞数据，也就是要在数据库中作删除操作
	skuPriceList:[],
	parentIds:[],
	/*oldGoodsSkuId:"",//价格页签，下拉框改变之前的值
*/	skuPropertyList:[],
	propertyOldGoodsSkuId:"",//属性页签，下拉框改变之前的值
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//跳转列表页
    	initUrl: function () {
            return '/publicData/goods/init';
        },
		//新增商品基本信息的请求地址
        addDataUrl: function () {
            return '/publicData/goods/addData';
        },
        //修改商品基本信息的请求地址
        updateDataUrl:function(){
        	return '/publicData/goods/updateData';
        },
        //进入修改界面，获取商品详情
        queryDetailsUrl:function(){
        	return '/publicData/goods/queryDetails';
        },
        //进入修改界面，多规格商品看详情
        querySkuDetailsByGoodsIdUrl: function () {
            return '/publicData/goodsSkuList/querySkuDetailsByGoodsId';
        },
        //进入修改界面，组合商品看详情
        queryCollectionDetailsByGoodsIdUrl: function () {
            return '/publicData/goodsCollection/queryCollectionDetailsByGoodsId';
        },
        //（商品相册或商品详情页签）进入修改界面，获取商品相册或商品详情
        getMaterialListByGoodsIdUrl:function(){
        	return '/publicData/goodsMaterialList/getMaterialListByGoodsId';
        },
        //进入修改界面，获取商品价格信息
        getPriceByGoodsIdUrl:function(){
        	return '/publicData/goodsPrice/getPriceByGoodsId';
        },
        //进入修改界面，获取商品库存信息
        getStockByGoodsIdUrl:function(){
        	return '/publicData/goodsStock/getStockByGoodsId';
        },
        //进入修改界面，获取商品属性信息
        getPropertyListByGoodsIdUrl:function(){
        	return '/publicData/goodsProperty/queryByGoodsId';
        },
        //获取属性配置列表
        getPropertyListUrl:function(){
        	return '/publicData/goodsProperty/list';
        },
        //新增商品属性的请求地址
        updatePropertyUrl: function () {
            return '/publicData/goodsPropertyList/updateData';
        },
        //新增商品价格的请求地址
        addOrUpdatePriceUrl: function () {
            return '/publicData/goodsPrice/updateData';
        },
        //组合商品页签，获取所有供组合的商品列表
        queryGoodsListForCollectionUrl: function () {
            return '/publicData/goods/queryGoodsListForCollection';
        },
        //单品，库存信息
        updateGoodsStockDataUrl: function () {
            return '/publicData/goodsStock/updateData';
        },
        //添加多规格商品
        updateSkuListDataUrl: function () {
            return '/publicData/goodsSkuList/updateData';
        },
        //添加组合商品
        addOrUpdateCollectionUrl: function () {
            return '/publicData/goodsCollection/updateData';
        },
        //多规格商品页签，获取规格树目录
        skuTreeUrl: function () {
            return '/publicData/goodsSku/initTree';
        },
        //获取商品分类树目录
        goodsTypeTreeUrl: function () {
            return '/publicData/goodsType/goodsTypeTree';
        },
        //选择商品标签，分页显示商品标签列表
        queryGoodsTagListByPageUrl: function () {
            return '/publicData/goodsTag/list';
        },
        //分页获取商品素材请求地址
    	searchMaterialListByPageUrl: function () {
            return '/publicData/goodsMaterial/list';
        },
        //添加商品相册/详情
        updateGoodsMaterialListUrl: function () {
            return '/publicData/goodsMaterialList/updateData';
        },
        //初始化下拉框
        initDropDownUrl: function () {
            return '/publicData/goods/initDropDown';
        },
        //获取七牛token和domain
        getUpTokenUrl:function() {
        	return '/publicData/goodsMaterial/getUpToken';
        },
        //删除商品素材关联t_goods_material_list
        deleteGoodsMaterialListUrl:function() {
        	return '/publicData/goodsMaterialList/deleteData';
        }
    },
    //初始化下拉框
    initDropDown: function (){
    	$.callAjax({
			url : goodsManager.URL.initDropDownUrl(),
			data : "",
			success : function(serverData) {

				var goodsUnitList = serverData.data.goodsUnitList;
				if(goodsUnitList != null){
					for(var i=0 ; i < goodsUnitList.length ; i ++){
						var item = goodsUnitList[i];
	         			$('.goodsUnit').append('<option value="'+item.dictValue+'">'+item.dictDesc+'</option>');
	         		}
				}
			}
		});
    },
    /**查：初始化商品分类，树形结构**/
    initTree: function () {
		$(".no-print").remove();
		$.callAjax({
			url : goodsManager.URL.goodsTypeTreeUrl(),
			data : "",
			success : function(serverData) {
				$('#chooseMaterialTreeDiv').treeview({
					data : serverData,
					levels : 99,// 展开的层次
					showCheckbox: false,
					showTags : false,// 需要配合tags来使用，如text: 'Parent 2', tags: ['7']
					showBorder: true,// 是否显示分割线
					enableLinks : true,// 鼠标放上去显示<a>链接样式
					highlightSelected: true,
					onNodeSelected : function(event, node) {
						//调用查询方法，查找对应素材
						goodsManager.searchMaterialListByPage(1,10,node.id);
					}
				});
			}
		});
	},
	//点击图片时设置复选项选中
	setImgChecked: function (id){
		$("#img"+id).attr("checked", true);
	},
	/**查：商品素材对话框，分页查询素材列表**/
	searchMaterialListByPage: function (currentPage,pageSize,goodsType) {
		var offset = 0;
		if(currentPage != null && pageSize != null) {
			var offset = (currentPage-1) * pageSize;
			var params={"offset":offset,"pageSize":pageSize,"goodsTypeId":goodsType}
		} else {
			var params={"goodsTypeId":goodsType};
		}
		$.callAjax({
			url : goodsManager.URL.searchMaterialListByPageUrl(),
			data : params,
			success : function(serverData) {
				$("#imageDiv").empty();
				//取出分页数据对象
				serverData = serverData.data.page;
				
				for (var i=0 ; i<serverData.rows.length ; i++) {
					var item = serverData.rows[i];
					var html = "<li class='thumbnail' onclick='javascript:goodsManager.setImgChecked("+item.id+")'>" +
								"<input class='el-checkbox__original' type='checkbox' name='chooseMaterial' value='"+item.id+"' id='img"+item.id+"'>"+
									"<img  id='"+i+"' src='"+item.fileUrl+"' />";
					$("#imageDiv").append(html);
				}
				//以下是处理分页内容start======================
				//alert("当前页："+ serverData.currentPage+";每页显示条数：" +serverData.pageSize + ";总条数：" + serverData.total+";起始页：" + serverData.offset);
				var arr = new Array();
				//总页数
				var countPage = 1;
				if(serverData.total%serverData.pageSize == 0) {
					countPage = parseInt(serverData.total/serverData.pageSize);
				} else {
					countPage = parseInt(serverData.total/serverData.pageSize) + 1;
				}
				//当前页没有数据的时候，当前页码减1，重新刷新数据
				if(serverData.total ==0 && countPage > 1) {
					currentPage--;
					goodsManager.searchMaterialListByPage(currentPage,pageSize,goodsType);
					return;
				}
				arr.push('<li  onclick="javascript:goodsManager.searchMaterialListByPage(1,'+serverData.pageSize+','+goodsType+');selected('+0+','+(countPage+2)+')"><a href="javascript:;"><div>&laquo;</div></a></li>');
				for(var i=1;i<=countPage;i++) {
					arr.push('<li onclick="javascript:goodsManager.searchMaterialListByPage(this.innerText,'+serverData.pageSize+','+goodsType+');selected('+i+','+(countPage+2)+')"><a href="javascript:;"><div>'+i+'</div></a></li>');
				}
				arr.push('<li onclick="javascript:goodsManager.searchMaterialListByPage('+countPage+','+serverData.pageSize+','+goodsType+');selected('+(countPage+1)+','+(countPage+2)+')"><a href="javascript:;"><div>&raquo;</div></a></li>');
				$("#pageList").html(arr.join(""));
				//将商品类型保存后续使用
				$("#materialSearchGoodsType").val(goodsType);
				//分页数据等
				$("#currentPage").val(currentPage);
				$("#pageSize").val(pageSize);
				$("#total").val(serverData.total);
			}
		});
    },
    /**查：初始化商品规格，树形结构**/
    initSkuTree: function () {
		$.callAjax({
			url : goodsManager.URL.skuTreeUrl(),
			data : "",
			success : function(serverData) {
				$('#goods_sku_list_tree').treeview({
					data : serverData,
					levels : 99,// 展开的层次
					showCheckbox: true,
					showTags : false,// 需要配合tags来使用，如text: 'Parent 2', tags: ['7']
					showBorder: true,// 是否显示分割线
					enableLinks : true,// 鼠标放上去显示<a>链接样式
					highlightSelected: true,
					onNodeSelected: function(event, node) {
					    if(node.state.checked){   
					        //设置不勾选
					    	$('#goods_sku_list_tree').treeview('uncheckNode', node.nodeId);    
					    } else {
					        //设置勾选
					    	$('#goods_sku_list_tree').treeview('checkNode', node.nodeId);  
					    }  
					}  
				});
			}
		});
    },
    /**查：选择商品标签**/
    queryGoodsTagListByPage: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#goodsTagListTable",//需要分页的table ID
    		url: goodsManager.URL.queryGoodsTagListByPageUrl(),//请求后台的URL（*）
    		queryParams:queryTagParams,
    		onLoadSuccess:function(){
    			goodsManager.isResetOffset = 0;
    			$("#tag_btn_search").removeClass("disabled");
            },
    		columns: [{
    			checkbox: true,
    			formatter:function(value,row,index){
    				var tagIds = $("#goodsTag").val();
    				var tagIdsArr = tagIds.split(",");
    	        	for(var i = 0 ; i < tagIdsArr.length ; i ++){
    	        		if(tagIdsArr[i] == row.id){
    	        			return {
    	        		        checked : true//设置选中
    	        	        };
    	        		}
    	        	}
    	        }
    		},{
    			field: 'id',
    			title: 'ID'
    		}, {
    			field: 'tagName',
    			title: '标签名称'
    		}]
    	});
    },
    /**获取所有属性信息**/
    getPropertyList: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#goodsPropertyListTable",//需要分页的table ID
    		url: goodsManager.URL.getPropertyListUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			goodsManager.isResetOffset = 0;
            },
    		columns: [{
    			checkbox: true,
    			formatter:function(value,row,index){
    				var checkFlag = false;
    				$('#addGoodsPropertyForm').children("div").each(function(){
    					var propertyId = $(this).attr('propertyId');
    					if(propertyId == row.id){
    						checkFlag = true;
    					}
    				});
    				if(checkFlag){
	    				return {
	        				disabled : 'disabled',//设置不可用
	        		        checked : true//设置选中
	        	        };
    				}
    	        }
    		},{
    			field: 'propertyName',
    			title: '属性名称'
    		}, {
    			field: 'type',
    			title: '控件类型',
    			formatter:function(value,row,index){
    		    	var typeName = "";
    	        	if(value == 1)
    	        		typeName = "文本框";
    	        	else if(value == 2)
    	        		typeName = "多选框";
    	        	else if(value == 3)
    	        		typeName = "下拉框";
		            return typeName; 
    	        },
    		    align: 'center'
    		}]
    	});
    },
    /**组合商品页签(分页获取商品列表)**/
    queryGoodsListForCollection: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#listTable",//需要分页的table ID
    		url: goodsManager.URL.queryGoodsListForCollectionUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			goodsManager.isResetOffset = 0;
    			$("#btn_search").removeClass("disabled");
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			field: 'goodsImageUrl',
    			title: '商品主图',
    			align: 'center',
    			formatter:function(value,row,index){
       				return '<img width="50px;" height="50px;" src="' + row.goodsImageUrl + '" alt="LOGO" class="logo-default"/>'
       		    }
    		}, {
    			field: 'title',
    			title: '商品名称',
    			align: 'center'
    		}, {
    			field: 'id',
    			title: '操作',
    			align: 'center',
    	        formatter:function(value,row,index){
    	        	var html='<a class="btn btn-primary add_collection_a" href="javascript:void(0)" >添加到组合</a>';
		            return html; 
    	        },
    	        events: 'operateEvents'
    	    }]
    	});
    },
    /**编辑，获取商品详情**/
    getDetails: function () {
    	var params = {id:goodsManager.id};
		$.callAjax({
			url : goodsManager.URL.queryDetailsUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data==null){
         			$.toastrSuccess('查询结果为空！');
         		}
         		//商品标签处理
         		var tagIds = "";
         		var tagNames = "";
         		for(var i = 0 ; i < data.data.tagList.length ; i ++){
         			var item = data.data.tagList[i];
         			tagIds += item.id;
         			tagIds += ",";
         			tagNames += item.tagName;
         			tagNames += "；";
         		}
         		tagIds = tagIds.substring(0, tagIds.length-1);
         		$("#goodsTagName").val(tagNames);
         		$("#goodsTag").val(tagIds);
         		//商品分类
         		$("#goodsType").val(data.data.typeId);
         		$("#goodsTypeName").val(data.data.typeName);
         		//商品基本信息
         		$("input[name='goodsMode'][value="+data.data.goodsMode+"]").attr("checked", true);
         		goodsManager.changeStockType($("input[name='goodsMode'][value="+data.data.goodsMode+"]"));
         		$("input[name='stockType'][value="+data.data.stockType+"]").attr("checked", true);
         		goodsManager.initTabs();
         		$("input[name='goodsMode']").attr('disabled', 'disabled');
         		$("input[name='stockType']").attr('disabled', 'disabled');
         		$("#goodsCode").val(data.data.goodsCode);
         		$("#title").val(data.data.title);
         		$("#slaveTitle").val(data.data.slaveTitle);
         		$("#goodsDesc").val(data.data.goodsDesc);
         		$("#sortIndex").val(data.data.sortIndex);
         		$("#goodsImageUrl").val(data.data.goodsImageUrl);
         		var goodsImageUrl = data.data.goodsImageUrl;
         		if(goodsImageUrl == null || goodsImageUrl == '')
					$("#imageShow").attr("src", $("#contextPath").val()+"/resources/img/no_image.jpg");
				else
					$("#imageShow").attr("src", goodsImageUrl);
         		
         		$("#labelText").text("编辑商品【"+data.data.title+"】");
			}
		});
    },
    /**编辑，获取商品图片或商品详情**/
    getMaterialListByGoodsId: function (type) {
    	var params = {goodsId:goodsManager.id};
		$.callAjax({
			url : goodsManager.URL.getMaterialListByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		data = data.data;
         		$("#goodsImageDiv").empty();
         		$("#imageDetailsDiv").empty();
         		for (var i=0;i<data.rows.length;i++) {
         			var item = data.rows[i];
         			//商品相册
         			if(item.type == 0){
	         			var html = "<li style='margin:0 2% 10px 0;' onmouseover='dis("+i+")' onmouseout='non("+i+")' class='thumbnail'>"+
										"<img style='height: 200px;width: 160px' id='"+i+"' src='"+item.fileUrl+"' alt='logo' class='logo-default' />"+
										"<img id='img"+i+"' onclick='deleteGoodsMaterialList("+item.id+")' style='width:20px;height:20px;position:absolute;right:0px;top:0px;visibility:hidden' src='${contextPath}/../../resources/img/close_box_red.png' />"+
								   "</li>";
	         			$("#goodsImageDiv").append(html);
         			}
         			//商品详情
         			else if(item.type == 1){
         				var html = "<li style='margin:0 2% 10px 0;' onmouseover='dis("+i+")' onmouseout='non("+i+")' class='thumbnail'>"+
										"<img id='"+i+"' src='"+item.fileUrl+"' alt='logo' class='logo-default' style='width:156px;height:156px;'/>"+
										"<img id='img"+i+"' onclick='deleteGoodsMaterialList("+item.id+")' style='width:20px;height:20px;position:absolute;right:0px;top:0px;visibility:hidden' src='${contextPath}/../../resources/img/close_box_red.png' />"+
								   "</li>";
         				$("#imageDetailsDiv").append(html);
         			}
         		}
			}
		});
    },
    /**编辑，获取商品价格信息**/
    getPriceByGoodsId: function () {
    	var params = {goodsId:goodsManager.id};
		$.callAjax({
			url : goodsManager.URL.getPriceByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		var goodsMode = $('input[name="goodsMode"]:checked').val();
         		goodsManager.skuPriceList = data.data;
       			goodsManager.modeChange(goodsManager.skuPriceList);
       		    //单品
         		if(goodsMode == 0){
         			goodsManager.setPriceViewValue(goodsManager.skuPriceList[0]);
         		}
         	 }
		});
    },
    modeChange:function(priceList){
			$("#goodGroupDiv").empty();
			var goodsMode = $('input[name="goodsMode"]:checked').val()
			if(goodsMode==0){//单品
				var html = "<div class='form-group'><p class='col-md-2 control-label'>市场价(￥)：</p><div class='col-md-6'><div> <input type='text' class='form-control' id='suggestPrice' name='suggestPrice' placeholder='请输入正整数或小数(最多保留2位小数)，范围0~999999999'></div></div></div><div class='form-group'><p class='col-md-2 control-label'>商城售价(￥)：</p>" +
						"<div class='col-md-6'> <div><input type='text' class='form-control' id='mallPrice' name='mallPrice' placeholder='请输入正整数或小数(最多保留2位小数)，范围0~999999999'></div></div></div>";
				$("#goodGroupDiv").append(html);
			}else if(goodsMode==1){//多规格
				var html = "<div id='skuShow' style='display: none;'><div class='form-group' style='margin-left: 35%;'><p class='col-md-2 control-label'>规格定价类型：</p><div class='col-md-6'><div> <p class='radio-inline'><input name='specificationType'" +
				" class='specificationType' type='radio'  checked='checked' value='0'/>多规格不同价</p></div></div></div></div>" +
				"<table style='text-align: center; width: 60%;margin: 0 auto;'  class='table table-bordered' id='goodsGroupTable'><thead><tr><th style='width: 30%;'>规格</th><th>市场价(￥)</th><th>商城售价(￥)</th></tr></thead>";
				for(var i = 0 ; i < priceList.length ; i ++){
					var priceItem = priceList[i];
					if(priceItem.suggestPrice==null){
						priceItem.suggestPrice="";
					}
					if(priceItem.mallPrice==null){
						priceItem.mallPrice="";
					}
					html += "<tr>"+
					"<td class='center L_int_txt' style='padding-top: 25px;'>"+priceItem.skuNames+"</td>"+
		        "<td class='center L_int_txt' style='padding-top: 25px;'><input type='text' placeholder='请输入正整数或小数(最多保留2位小数)，范围0~999999999' class='form-control' value="+priceItem.suggestPrice+"></td>"+
		        "<td class='center L_int_txt' style='padding-top: 25px;'><input type='text' placeholder='请输入正整数或小数(最多保留2位小数)，范围0~999999999' class='form-control' value="+priceItem.mallPrice+"></td>"+
		        "</tr>";
				}
				html += "</table>";
				$("#goodGroupDiv").append(html);
			}
			
    },
    /**编辑，获取商品库存信息**/
    getStockByGoodsId: function () {
    	var params = {id:goodsManager.id};
		$.callAjax({
			url : goodsManager.URL.getStockByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data != null){
         			$("#saleUnit").val(data.data.saleUnit);
             		$("input[name='purchaseMode'][value="+data.data.purchaseMode+"]").prop("checked",true);
             		/*$("#canSaleAmount").val(data.data.canSaleAmount);
             		$("#overAmount").val(data.data.overAmount);
             		$("#saleAmount").val(data.data.saleAmount);
             		$("#saleRate").val(data.data.saleRate);
             		
             		$("#stockUnit").val(data.data.stockUnit);
             		$("#stockAmount").val(data.data.stockAmount);
             		$("#availableAmount").val(data.data.availableAmount);
             		$("#usedAmount").val(data.data.usedAmount);
             		$("#lossAmount").val(data.data.lossAmount);*/
         		}
			}
		});
    },
    /**编辑，获取商品属性信息**/
    getPropertyListByGoodsId: function () {
    	var params = {id:goodsManager.id};
		$.callAjax({
			url : goodsManager.URL.getPropertyListByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$("#addGoodsPropertyForm div:first").nextAll().remove();
         		$("#property_sku_dropdown").empty();

         		//遍历规格集合
         		if($('input[name="goodsMode"]:checked').val() == 1){
         			if(data.data.skuList == null || data.data.skuList.length == 0){
         				$.toastrWarning("暂无规格，请先添加销售规格");
//             			return;
         			}
         		}
        		
         		if(data.data.skuList != null){
         			for (var i=0 ; i < data.data.skuList.length ; i ++){
             			var skuItem = data.data.skuList[i];
             			var html = "<option value='"+skuItem.id+"'";
             			if(i == 0){
    						html += " selected='selected' ";
    	         			goodsManager.propertyOldGoodsSkuId = skuItem.id;
    					}
             			var skuNames = "";
             			for(var j = 0 ; j < skuItem.skuList.length ; j ++){
             				skuNames += skuItem.skuList[j].skuName;
             				skuNames += "-";
             			}
             			skuNames = skuNames.substring(0, skuNames.length-1);
    					html += ">"+skuNames+"</option>";
    					$("#property_sku_dropdown").append(html);
             		}
         		}
         		
         		if(data.data.propertyList != null){
	         		for (var i=0 ; i < data.data.propertyList.length ; i ++){
	         			var item = data.data.propertyList[i];
	         			var goodsMode = $('input[name="goodsMode"]:checked').val(); 
	         			goodsManager.createPropertyRow(item);
	         			
	         			var itemData = {goodsId:goodsManager.id, goodsSkuId:item.goodsSkuId, propertyId:item.id, propertyItemValue:item.propertyItemValue};
	         			goodsManager.skuPropertyList.push(itemData);
	         		}
         		}
         		
         		//给界面赋值
         		goodsManager.setPropertyViewValue();
			}
		});
    },
    /**编辑，获取多规格商品信息**/
    getSkuListByGoodsId: function () {
    	
    	var params = {goodsId:goodsManager.id};
		$.callAjax({
			url : goodsManager.URL.querySkuDetailsByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		data = data.data;
         		$('.L_packing_specifications').empty();
         		$('.L_spt_next').empty();
         		
         		if(data != null && data.rows != null){
	         		for (var i=0 ; i < data.rows.length ; i ++){
	         			var checkArray = [];
	         			var item = data.rows[i];
	         			var stockKey = "";
	         			// 为了共用新增组合规格的createSkuListItem方法，将后台查出来的数据转换成树目录需要的id，text
	         			for (var j=0 ; j < item.skuList.length ; j ++){
	         				var skuRecodeItem = item.skuList[j];
	         				var obj = {id:skuRecodeItem.skuId, text:skuRecodeItem.skuName};
	         				checkArray.push(obj);
	         				if($.inArray(skuRecodeItem.skuParentId,goodsManager.parentIds)==-1){
	         					goodsManager.parentIds.push(skuRecodeItem.skuParentId);
	                		}
	         				stockKey = stockKey + skuRecodeItem.skuId + ",";
	         			}
	         			goodsManager.createSkuListItem(checkArray, item.id);
	         			
	         			var stockVo = item.stockVo;
	         			var stockData = {skuStore:item.skuStore,
										 skuSubtitle:item.skuSubtitle,
										 saleUnit:stockVo.saleUnit,
										 purchaseMode:stockVo.purchaseMode/*,
										 canSaleAmount:stockVo.canSaleAmount,
										 overAmount:stockVo.overAmount,
										 saleAmount:stockVo.saleAmount,
										 saleRate:stockVo.saleRate,
										 stockUnit:stockVo.stockUnit,
										 stockAmount:stockVo.stockAmount,
										 availableAmount:stockVo.availableAmount,
										 usedAmount:stockVo.usedAmount,
										 lossAmount:stockVo.lossAmount*/
							  };
	         			// 去掉最后一个,号
	         			stockKey = stockKey.substring(0, stockKey.length-1);
	     				stockData.key = stockKey;
	     				goodsManager.skuList.push(stockData);
	     				if(i==0){
	     					goodsManager.setSkuStockViewValue(stockData);
	     					goodsManager.oldValue = stockKey;
	     				}
	         		}
				}
			}
		});
    },
    /**编辑，获取组合商品信息**/
    getCollectionByGoodsId: function () {
    	var params = {goodsId:goodsManager.id};
		$.callAjax({
			url : goodsManager.URL.queryCollectionDetailsByGoodsIdUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){// || $.isNull(data.data)
         			$.toastrWarning(data.msg);
         			return;
         		}
         		data = data.data;
         		$('.L_subject').empty();
         		for (var i=0 ; i < data.rows.length ; i ++){
         			var item = data.rows[i];
         			goodsManager.createCollectionItem(item.comGoodsId, item.goodsImageUrl, item.title,item.saleUnitName,item.suggestPrice,item.mallPrice,  item.goodsMode, item.amount, item.id);
         			goodsManager.changePrice();
         		}
			}
		});
    },
    changePrice:function(){
    	goodsManager.sumSuggestPrice();
    	goodsManager.sumMallPrice();
    },
    //汇总市场价
    sumSuggestPrice:function(){
    	var price = 0;
    	$("#collectionTable tbody tr").each(function(){
    		price = price +  $(this).find(".L_int_txt").eq(1).text() *  $(this).find("input").eq(0).val() ;
    	});
    	$("#suggestPriceDiv").text("￥"+price.toFixed(2));
    },
    //汇总销售价
    sumMallPrice:function(){
    	var price = 0;
		$("#collectionTable tbody tr").each(function(){
    		price = price +  $(this).find(".L_int_txt").eq(2).text() *  $(this).find("input").eq(0).val() ;
    	});
    	$("#mallPriceDiv").text("￥"+price.toFixed(2));
    },
    //添加or修改：基本信息
	addOrUpdate:function(){
		var urlValue;
		if(goodsManager.id != "" && goodsManager.id != undefined)
			urlValue=goodsManager.URL.updateDataUrl();
		else
			urlValue=goodsManager.URL.addDataUrl();
		//修改时id处理
		var data = $("#addGoodsForm").serializeObject();
		data.id = goodsManager.id;
		
		data.goodsImageUrl = $("#goodsImageUrl").val();
		if(data.goodsType == null || data.goodsType == ''){
			$.toastrWarning("商品分类不能为空");
			return;
		}
		if(data.title == null || data.title == '' || data.title.length > 50){
			$.toastrWarning("商品主标题不能为空，长度在1-50之间");
			return;
		}
		if(data.slaveTitle.length > 125){
			$.toastrWarning("商品副标题长度在1-125之间");
			return;
		}
		if(data.goodsDesc.length > 250){
			$.toastrWarning("商品简介长度在1-250之间");
			return;
		}
		if(data.sortIndex == "" || !goodsManager.isInt(data.sortIndex)){
			$.toastrWarning("商品排序不能为空，范围在1~999999999之间");
			return;
		}
		if(data.goodsImageUrl == null || data.goodsImageUrl == ''){
			$.toastrWarning("主图不能为空，请上传主图");
			return;
		}
		
		//商品标签处理
		var tagList = [];
		var tags = $("#goodsTag").val();
		if(tags != "" && tags != null){
			var tagArr = tags.split(",");
			for(var i = 0 ; i < tagArr.length ; i++){
				var tagId = tagArr[i];
				var obj = {id:tagId};
				tagList.push(obj);
			}
		}
		data.tagList = tagList;
    	
		$.callAjax({
			url : urlValue,
			data : data,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		goodsManager.id = data.data.id;
         		$.toastrSuccess('操作成功');
         		$('#myTab li:eq(1) a').tab('show');
			}
		});
	},
	//表单检验
    validateform:function(){
    	//表单验证start
    	$('#addGoodsForm').bootstrapValidator({
	        fields: {
	        	title: {
	                validators: {
	                    notEmpty: {
	                        message: '商品主标题不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 50,
                            message: '长度在1~50之间'
                        },
	                }
	            },
	        	slaveTitle: {
	                validators: {
	                    stringLength: {
                            min: 1,
                            max: 125,
                            message: '长度在1~125之间'
                        },
	                }
	            },
	        	goodsDesc: {
	                validators: {
	                    stringLength: {
                            min: 1,
                            max: 250,
                            message: '长度在1~250之间'
                        },
	                }
	            },
	            sortIndex: {
                	validators: {
                		notEmpty: {
                			message: '排序值不能为空'
                		},
                		between: {
                            min: 1,
                            max: 999999999,
                            message: '请输入1~999999999之间的整数'
                        }
                        /*,
                        integer: {
                            message: '请输入1~999999999之间的整数'
                        }*/
                	}
                }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
	//添加：商品相册or商品详情
	addOrUpdateGoodsMaterialList:function(itemList){

		if(goodsManager.id == "" || goodsManager.id == undefined){
			$.toastrWarning("请先保存基本信息");
			return;
		}
		$.hideModal('#chooseMaterialModal');
		
		$.callAjax({
			url : goodsManager.URL.updateGoodsMaterialListUrl(),
			data : itemList,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		goodsManager.getMaterialListByGoodsId(goodsManager.type);
         		$.toastrSuccess('操作成功');
         		/*//type0 商品图片，1 商品详情图片
         		if(goodsManager.type == 0){
	         		$('#myTab li:eq(2) a').tab('show');
         		}
         		else if(goodsManager.type == 1){
         			var goodsMode = $('input[name="goodsMode"]:checked').val(); 
         			//单品
        			if(goodsMode == 0)
        				$('#myTab li:eq(3) a').tab('show');
        			//多规格
        			if(goodsMode == 1)
        				$('#myTab li:eq(4) a').tab('show');
        			//组合商品
        			if(goodsMode == 2)
        				$('#myTab li:eq(5) a').tab('show');
         		}*/
	         		
			}
		});
	},
	//获取属性界面的值，保存到list
	getPropertyViewValue: function(){
		$('#addGoodsPropertyForm').children("div").each(function(){
			var propertyType = $(this).attr('propertyType');
			var propertyId = $(this).attr('propertyId');
			//移除
    		goodsManager.ifExistDelete(propertyId);
			//文本
			if(propertyType == 1){
				var textVal = $("#" + $(this).attr('myProperty')).val();
				var item = {goodsId:goodsManager.id, goodsSkuId:goodsManager.propertyOldGoodsSkuId, propertyId:propertyId, propertyItemValue:textVal};
				goodsManager.skuPropertyList.push(item);
			} //多选
			else if(propertyType == 2){
				var checkBoxValStr = "";
				$('input[name="'+$(this).attr('myProperty')+'"]:checked').each(function(){ 
					checkBoxValStr = checkBoxValStr + $(this).val() + ",";
				});
				//去掉最后一个逗号
				checkBoxValStr = checkBoxValStr.substring(0, checkBoxValStr.length-1);
				var item = {goodsId:goodsManager.id, goodsSkuId:goodsManager.propertyOldGoodsSkuId, propertyId:propertyId, propertyItemValue:checkBoxValStr};
				goodsManager.skuPropertyList.push(item);
			} //下拉
			else if(propertyType == 3){
				var selectId = $(this).attr('myProperty');
				var selectVal = $('#'+selectId+' option:selected').val();
				var item = {goodsId:goodsManager.id, goodsSkuId:goodsManager.propertyOldGoodsSkuId, propertyId:propertyId, propertyItemValue:selectVal};
				goodsManager.skuPropertyList.push(item);
			}
		});
	},
	//判断skuPropertyList是否已经存在，存在则移除
	ifExistDelete: function(propertyId){
		for(var i=0 ; i < goodsManager.skuPropertyList.length ; i ++){
			var propertyItem = goodsManager.skuPropertyList[i];
			var goodsMode = $('input[name="goodsMode"]:checked').val(); 
			//判断是否已经存在，存在则移除，再push
			if(goodsMode == 0 || goodsMode == 2){
				if(propertyItem.goodsId == goodsManager.id && propertyItem.propertyId == propertyId){
					goodsManager.skuPropertyList.splice(i,1);
				}
			}
			else if(goodsMode == 1){
				if(propertyItem.goodsId == goodsManager.id && propertyItem.goodsSkuId == goodsManager.propertyOldGoodsSkuId && propertyItem.propertyId == propertyId){
					goodsManager.skuPropertyList.splice(i,1);
				}
			}
		}
	},
	//给属性界面赋值
	setPropertyViewValue: function(){
		$('#addGoodsPropertyForm').children("div").each(function(){
			var propertyType = $(this).attr('propertyType');
			var propertyId = $(this).attr('propertyId');
			
			var propertyItemValue = goodsManager.getItemByPropertyIdSkuId(propertyId);

			//文本
			if(propertyType == 1){
				$("#" + $(this).attr('myProperty')).val(propertyItemValue);
			} //多选
			else if(propertyType == 2){
				if(propertyItemValue != ""){
					// 逗号拆分
					var valueArr = propertyItemValue.split(",");
					$('input[name="'+$(this).attr('myProperty')+'"]').prop("checked", "");//先设置所有不选中，再根据数据设置选中
					for(var i = 0 ; i < valueArr.length ; i++){
						var tagId = valueArr[i];
						$('input[name="'+$(this).attr('myProperty')+'"][value="'+tagId+'"]').prop("checked", "checked");
					}
				}
			} //下拉
			else if(propertyType == 3){
				$('#'+$(this).attr('myProperty')+' option[value='+propertyItemValue+']').prop("selected", true);
			}
		});
	},
	//根据propertyId和当前选中的goodsSkuId从skuPropertyList中获取对象
	getItemByPropertyIdSkuId: function (propertyId){
		var currentSkuId = $("#property_sku_dropdown").val();
		for(var i = 0 ; i < goodsManager.skuPropertyList.length ; i ++){
			var item = goodsManager.skuPropertyList[i];
			var goodsMode = $('input[name="goodsMode"]:checked').val(); 
			if(goodsMode == 0 || goodsMode == 2){
				if(item.propertyId == propertyId && item.goodsId == goodsManager.id){
					return item.propertyItemValue;
				}
			}
			else if(goodsMode == 1){
				if(item.propertyId == propertyId && item.goodsId == goodsManager.id && item.goodsSkuId == currentSkuId){
					return item.propertyItemValue;
				}
			}
		}
		return "";
	},
	//添加or修改：商品属性
	addOrUpdateProperty:function(){
		if(goodsManager.id == "" || goodsManager.id == undefined){
			$.toastrWarning("请先保存基本信息");
			return;
		}
		
		//保存前获取界面的属性数据
		goodsManager.getPropertyViewValue();
		
		var checkOk = true;
		// 校验
		for(var i = 0 ; i < goodsManager.skuPropertyList.length ; i ++){
			var item = goodsManager.skuPropertyList[i];
			// 重量和体积只能输入数字，现在只考虑了一个运营商的情况，propertyId是数据库里的id
			if(item.propertyId == 1){
				if(!goodsManager.isFloat(item.propertyItemValue)){
					$.toastrWarning("重量输入有误");
					checkOk = false;
					return;
				}
			}
			if(item.propertyId == 2){
				if(!goodsManager.isFloat(item.propertyItemValue)){
					$.toastrWarning("体积输入有误");
					checkOk = false;
					return;
				}
			}
		}
		//多规格商品
		if($('input[name="goodsMode"]:checked').val() == 1){
			var len = $("#property_sku_dropdown option").length;
			if(len <= 0){
				$.toastrWarning("暂无规格，请先添加销售规格");
				return;
			}
		}
		var goodsMode = $('input[name="goodsMode"]:checked').val(); 
		if(checkOk){
			$.callAjax({
				url : goodsManager.URL.updatePropertyUrl(),
				data : goodsManager.skuPropertyList,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			return;
	         		}
	         		if(goodsMode==2){
	         			myMain.getAllContent(goodsManager.URL.initUrl());//最后一个页签操作成功后直接回列表界面
	         		}else{
	         			$.toastrSuccess('操作成功');
	         			$('#myTab li:eq(7) a').tab('show');
	         		}
				}
			});
		}
	},
	//添加or修改：单品库存
	addOrUpdateGoodsStock: function (){
		var urlValue;
		if(goodsManager.id == "" || goodsManager.id == undefined){
			$.toastrWarning("请先保存基本信息");
			return;
		}
		urlValue=goodsManager.URL.updateGoodsStockDataUrl();
		var data = $("#addGoodsItemForm").serializeObject();
		
		if(!goodsManager.verifyStock(data))
			return;		
    	
		data.goodsId = goodsManager.id;
		data.goodsMode = $("#goodsMode").val();

		$.callAjax({
			url : urlValue,
			data : data,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$.toastrSuccess('操作成功');
         		$('#myTab li:eq(6) a').tab('show');
			}
		});
	},
	//校验单品库存和销售规格的输入是否合法
	verifyStock: function (stockItem){
		/*if(!goodsManager.isInt(stockItem.canSaleAmount)){
			$.toastrWarning("可售卖量输入有误");
			return false;
		}
		if(!goodsManager.isInt(stockItem.overAmount)){
			$.toastrWarning("可超卖量输入有误");
			return false;
		}
		if(!goodsManager.isInt(stockItem.saleAmount)){
			$.toastrWarning("已售卖量输入有误");
			return false;
		}
		if(!goodsManager.isFloat(stockItem.saleRate)){
			$.toastrWarning("售卖库存率输入有误");
			return false;
		}
		if(!goodsManager.isInt(stockItem.stockAmount)){
			$.toastrWarning("总库存输入有误");
			return false;
		}
		if(!goodsManager.isInt(stockItem.availableAmount)){
			$.toastrWarning("可用库存输入有误");
			return false;
		}
		if(!goodsManager.isInt(stockItem.usedAmount)){
			$.toastrWarning("占用库存输入有误");
			return false;
		}
		if(!goodsManager.isInt(stockItem.lossAmount)){
			$.toastrWarning("损耗库存输入有误");
			return false;
		}*/
		
		return true;
	},
	//添加or修改：组合商品
	addOrUpdateCollection:function(){
		var urlValue;
		if(goodsManager.id == "" || goodsManager.id == undefined){
			$.toastrWarning("请先保存基本信息");
			return;
		}
		urlValue=goodsManager.URL.addOrUpdateCollectionUrl();
		
		//非空校验
		var trList = $("#collectionTable").find("tr");
		// 一行是表头
		if(trList.length <= 1){
			$.toastrWarning("请先添加组合商品");
			return;
		}
		// 获取数据
		var itemList = [];
		for (var i=1;i<trList.length;i++) {
			var id = trList.eq(i).attr('id');
			var tdArr = trList.eq(i).find("td");
			var comGoodsId = $('#collectionTable tr').eq(i).attr('comGoodsId');//可能是t_goods_item的id，也可能是t_goods_sku_list的id
		    var amount = tdArr.eq(4).find("input").val();//售卖量
		    /*var usedStore = tdArr.eq(3).find("input").val();//占用库存
*/		    var goodsMode = tdArr.eq(6).find("input").val();//商品规格 0 单品 1 多规格商品 2 组合商品
		    if(!goodsManager.isInt(amount)){
				$.toastrWarning("数量输入有误");
				return;
			}
		    /*if(!goodsManager.isInt(usedStore)){
				$.toastrWarning("占用库存输入有误");
				return;
			}*/
		    goodsManager.changePrice();
		    var suggestPrice = $("#suggestPriceDiv").text().substring(1);
		    var mallPrice = $("#mallPriceDiv").text().substring(1);
		    
		    var json = {goodsId:goodsManager.id,comGoodsId:comGoodsId, goodsMode:goodsMode, amount:amount, deleteIds:goodsManager.deleteIds};
		    //修改操作设置id
		    if(id != undefined && id != 'undefined')
		    	json.id = id;
	    	itemList.push(json);
		}

		var params = {"goodsId":goodsManager.id,"suggestPrice":suggestPrice,"mallPrice":mallPrice,"goodsCollectionVos":itemList}
		$.callAjax({
			url : urlValue,
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$.toastrSuccess('操作成功');
         		$('#myTab li:eq(6) a').tab('show');
			}
		});
	},
	//添加or修改：销售规格
	addOrUpdateSkuList:function(){
		var urlValue;
		if(goodsManager.id == "" || goodsManager.id == undefined){
			$.toastrWarning("请先保存基本信息");
			return;
		}
		urlValue=goodsManager.URL.updateSkuListDataUrl();
		
		//保存前获取界面的库存数据
		goodsManager.getSkuStockViewValue();
		
		//非空校验
		var len = $("#sku_list_dropdown option").length;
		// 一行是表头
		if(len < 1){
			$.toastrWarning("请先添加规格");
			return;
		}
		
		// 获取数据
		var itemList = [];
		var isCheckOk = true;
		// 遍历全部option
		$("#sku_list_dropdown option").each(function(){
			var id = this.id;//数据库的id
			var skuIds = this.value; //获取option的id
	        var skuNames = $(this).text(); //获取option的内容
	        
	        var stockVo={};
	        var skuStore = 0;
	        var skuSubtitle = "";
	        var stockType = 1;
	        //找到skuId对应的库存信息
	        for(var i = 0 ; i < goodsManager.skuList.length ; i ++){
	        	var item = goodsManager.skuList[i];
	        	if(!goodsManager.verifyStock(item))
        			isCheckOk = false;
	        	if(item.key == skuIds){
	        		stockVo = item;
	        		skuStore = item.skuStore;
	        		skuSubtitle = item.skuSubtitle;
	        		stockType = item.stockType;
	        	} 
	        }
	        
	        var json = {goodsId:goodsManager.id, skuIds:skuIds, skuNames:skuNames, skuStore: skuStore, skuSubtitle: skuSubtitle, stockType: stockType, stockVo:stockVo, deleteIds:goodsManager.deleteIds};
	        //修改操作设置id
		    if(id != undefined && id != 'undefined')
		    	json.id = id;
	    	itemList.push(json);
	    });

//		console.log(JSON.stringify(itemList));
		if(isCheckOk){
			$.callAjax({
				url : urlValue,
				data : itemList,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			return;
	         		}
	         		$.toastrSuccess('操作成功');
	         		$('#myTab li:eq(6) a').tab('show');
				}
			});
		}
	},
	//添加or修改：商品价格
	addOrUpdatePrice:function(){
		if(goodsManager.id == "" || goodsManager.id == undefined){
			$.toastrWarning("请先保存基本信息");
			return;
		}
		
		//多规格商品
		/*if($('input[name="goodsMode"]:checked').val() == 1){
			var len = $("#price_sku_dropdown option").length;
			if(len <= 0){
				$.toastrWarning("暂无规格，请先添加销售规格");
				return;
			}
		}*/
		//保存前获取界面的价格数据
		goodsManager.getPriceViewValue();
		//循环设置goodId
		for(var i = 0 ; i < goodsManager.skuPriceList.length ; i ++){
			var priceItem = goodsManager.skuPriceList[i];
			
			//校验输入是否合法
			if(!goodsManager.isFloat(priceItem.suggestPrice)){
				$.toastrWarning("建议售价输入有误");
				return;
			}
			if(!goodsManager.isFloat(priceItem.mallPrice)){
				$.toastrWarning("商城售价输入有误");
				return;
			}
			/*if(!goodsManager.isFloat(priceItem.storePrice)){
				$.toastrWarning("门店售价输入有误");
				return;
			}
			if(!goodsManager.isFloat(priceItem.companyPrice)){
				$.toastrWarning("企业售价输入有误");
				return;
			}
			if(!goodsManager.isFloat(priceItem.proxyPrice)){
				$.toastrWarning("代理售价输入有误");
				return;
			}
			if(!goodsManager.isFloat(priceItem.costPrice)){
				$.toastrWarning("成本价输入有误");
				return;
			}
			if(!goodsManager.isFloat(priceItem.purchasePrice)){
				$.toastrWarning("标准进价输入有误");
				return;
			}*/
		}
		$.callAjax({
			url : goodsManager.URL.addOrUpdatePriceUrl(),
			data : goodsManager.skuPriceList,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		myMain.getAllContent(goodsManager.URL.initUrl());//最后一个页签操作成功后直接回列表界面
			}
		});
	},
    // 判断多选框是否需要选中
    checkboxIsChecked: function (propertyId, propertyItemValue){
    	if(propertyItemValue != null && propertyItemValue != undefined){
    		var valueArr = propertyItemValue.split(",");
			for(var i = 0 ; i < valueArr.length ; i++){
				var tagId = valueArr[i];
				if(tagId == propertyId){
					return true;
				}
			}
    	}
    	return false;
    },
    // 属性添加一行
    createPropertyRow: function (data){

    	// 判断是否重复提交
    	var isExists = false;
    	$('#addGoodsPropertyForm').children("div").each(function(){
			var propertyId = $(this).attr('propertyId');
			if(data.id == propertyId){
				isExists = true;
				return;
			}
    	});
    	if(isExists){
//    		$.toastrWarning("请勿重复添加属性");
    		//已存在的不再添加
    		return;
    	}
    	
    	var html = "";
    	// 文本框，编辑时需赋值
    	if(data.type == 1){
    		html += "<div class='form-group' myProperty='property"+data.id+"' propertyId='"+data.id+"' propertyType='"+data.type+"'>"+
                        "<p for='pkgNo' class='col-md-2 control-label'>"+data.propertyName+"：</p>"+
                        "<div class='col-md-6'>"+
                            "<div>"+
                                "<input type='text' id='property"+data.id+"' value='"+data.propertyItemValue+"' class='form-control propertyValue'>"+
                            "</div>"+
                        "</div>";
    		if(data.isMust == 0)
    			html += "<button type='button' name='删除' class='btn btn-danger glyphicon' onclick='deletePropertyItem(this)'>删除</button>";
            html += "</div>";
    	}
    	// 多选框，编辑时需选中可能多个
    	else if(data.type == 2){
    		html += "<div class='form-group' myProperty='propertyCheckbox' propertyId='"+data.id+"' propertyType='"+data.type+"' >"+
                        "<p for='pkgNo' class='col-md-2 control-label'>"+data.propertyName+"：</p>"+
                        "<div class='col-md-6'>";
			    		for(var i = 0 ; i < data.itemList.length ; i++){
							var propertyItem = data.itemList[i];
							html += "<div class='col-md-3 control-label'><input type='checkbox' name='propertyCheckbox'  value='"+propertyItem.id+"' class='propertyValue' ";
							// 判断是否选中
							if(goodsManager.checkboxIsChecked(propertyItem.id, data.propertyItemValue)){
								html += " checked='checked' ";
							}
							html += ">"+propertyItem.propertyValue+"</div>";
						}
			    		html += "</div>";
			if(data.isMust == 0)
				html += "<button type='button' name='删除' class='btn btn-danger glyphicon' onclick='deletePropertyItem(this)'>删除</button>";
			html += "</div>";
    	}
    	// 下拉框，编辑时需选中
    	else if(data.type == 3){
    		html += "<div class='form-group' myProperty='property"+data.id+"' propertyId='"+data.id+"' propertyType='"+data.type+"'>"+
                        "<p for='pkgNo' class='col-md-2 control-label'>"+data.propertyName+"：</p>"+
                        "<div class='col-md-6'>"+
                            "<div>"+
                                "<select id='property"+data.id+"' class='form-control propertyValue' name='type'>";
    							for(var i = 0 ; i < data.itemList.length ; i++){
    								var propertyItem = data.itemList[i];
    								html += "<option value='"+propertyItem.id+"'";
    								// 判断是否选中
    								if(propertyItem.id == data.propertyItemValue)
    									html += " selected='selected' ";
    								html += ">"+propertyItem.propertyValue+"</option>";
    							}
    							html += "</select>"+
		                            "</div>"+
		                        "</div>";
			if(data.isMust == 0)
				html += "<button type='button' name='删除' class='btn btn-danger glyphicon' onclick='deletePropertyItem(this)'>删除</button>";
            html += "</div>";
    	}
		$("#addGoodsPropertyForm").append(html);
    },
    // 多规格商品添加一行，id可能没有所以需要放在最后
    createSkuListItem: function (checkArray, id){
    	// 判断是否已经存在
    	var idStr = "";//逗号拼接
		var nameStr = "";//空格拼接
		for (var i=0 ; i< checkArray.length ; i++) {
			var obj = checkArray[i];
			var skuId = obj.id;
			var skuName = obj.text;
			
			idStr += skuId;
			idStr += ",";
			nameStr += skuName;
			nameStr += "-";
		}
		idStr = idStr.substring(0, idStr.length-1);
		nameStr = nameStr.substring(0, nameStr.length-1);
    	var isExists = false;

    	// 遍历下拉框判断是否已经存在
    	$("#sku_list_dropdown option").each(function(){
			var skuIds = this.value; //获取option的id
	        if(skuIds == idStr){
	        	$.toastrWarning("该规格已存在，请勿重复添加");
				isExists = true;
	        }
    	});
    	if(isExists)
    		return;
    	
    	if($("#sku_list_dropdown option").length == 0)
    		goodsManager.oldValue = idStr;
    	// 界面展示
    	var rowCount = $("#sku_list_dropdown option").length;
    	rowCount++;
    	var html = "<div style='height: 30px; margin-top:20px' class='L_all_spt'>"+
				   		"<p class='col-md-2' style='padding-top: 8px;'>规格"+rowCount+"：</p>";
    	
    	var deleteSkuIds = "";
		for (var i=0 ; i< checkArray.length ; i++) {
			var obj = checkArray[i];
			var skuName = obj.text;
			html += "<p class='col-md-2' style='padding-top: 8px;'>";
			html += skuName;
			html += "</p>";
			
			deleteSkuIds += obj.id;
			deleteSkuIds += ",";
		}
		deleteSkuIds = deleteSkuIds.substring(0, deleteSkuIds.length-1);
		//deleteSkuIds=2,9,13这种格式，所以要注意这里的转义字符，不然传过去的值只有前面一个数字
		html += "<p><button class='btn btn-success' id='goodsSku_"+id+"' onclick=\"deleteSkuListItem(this, '"+deleteSkuIds+"', "+id+");\">删除</button></p>";
		html += "</div>";
		
		$('.L_packing_specifications').append(html);
		$.hideModal('#goodsSkuListTreeModal');
		// 下拉处理
		var dropDownHtml = "<option  value='"+idStr+"' id='"+id+"'>"+nameStr+"</option>";
		$('.L_spt_next').append(dropDownHtml);
    },
    // 组合商品添加一行，id可能没有所以需要放在最后
    createCollectionItem: function (goodsId, goodsImageUrl, goodsTitle, saleUnitName,suggestPrice,mallPrice, goodsMode, amount,  id){
    	// 判断是否已经存在
    	var isExists = false;
    	$('.L_subject').children("tr").each(function(){
			var trId = $(this).attr('comGoodsId');
			if(trId == goodsId){
				$.toastrWarning("该商品已存在，请勿重复添加");
				isExists = true;
			}
    	});
    	if(isExists)
    		return;
    	
    	var html = "<tr class='L_all_look' comGoodsId='"+goodsId+"' id='"+id+"'>"+
			        "<td style='text-align: left;padding-left: -69px;padding-left: 3%'><img src='"+goodsImageUrl+"' style='width: 50px; height: 50px;'>"+goodsTitle+"</td>"+
			        "<td class='center L_int_txt' style='padding-top: 25px;'>"+saleUnitName+"</td>"+
			        "<td class='center L_int_txt' style='padding-top: 25px;'>"+suggestPrice+"</td>"+
			        "<td class='center L_int_txt' style='padding-top: 25px;'>"+mallPrice+"</td>"+
			        "<td class='center L_int_nub'><input type='text' onchange='goodsManager.changePrice()' value = '"+amount+"'  class='form-control'></td>"+
			        "<td class='center'>"+
			            "<a class='btn btn-danger' href='#' onclick='deleteCollectionItem(this,"+id+")'>"+
			                "<i class='glyphicon glyphicon-trash icon-white'></i>删除"+
			            "</a>"+
			        "</td>"+
			        "<td class='center L_int_nub' style='display:none;'><input type='text' value = '"+goodsMode+"' class='form-control'></td>"+
			    "</tr>";
			var img_data = $(this).parent().parent('.L_img_add').find('.L_img_data').html();
			$('.L_subject').append(html);
			goodsManager.changePrice();
    },
    //获取界面库存，保存到list
    getSkuStockViewValue: function (){
    	//先保存值，页面的控件id和vo字段名不一样
		var currentData = {skuStore:$("#skuStore").val(),
						   skuSubtitle:$("#skuSubtitle").val(),
						   saleUnit:$("#skuSaleUnit").val(),
						   purchaseMode:$('input[name="skuPurchaseMode"]:checked').val()/*,
						   canSaleAmount:$("#skuCanSaleAmount").val(),
						   overAmount:$("#skuOverAmount").val(),
						   saleAmount:$("#skuSaleAmount").val(),
						   saleRate:$("#skuSaleRate").val(),
						   stockUnit:$("#skuStockUnit").val(),
						   stockAmount:$("#skuStockAmount").val(),
						   availableAmount:$("#skuAvailableAmount").val(),
						   usedAmount:$("#skuUsedAmount").val(),
						   lossAmount:$("#skuLossAmount").val()*/
						  };

		currentData.key = goodsManager.oldValue;
		//根据key判断是否已经存在
		for(var i=0 ; i < goodsManager.skuList.length ; i ++){
			var item = goodsManager.skuList[i];
			if(item.key == currentData.key){
				goodsManager.skuList.splice(i,1);
			}
		}
		goodsManager.skuList.push(currentData);
    },
    // 给界面赋值
    setSkuStockViewValue: function (skuStockItem){
    	if(skuStockItem != null){
    		$("#skuStore").val(skuStockItem.skuStore);
			$("#skuSubtitle").val(skuStockItem.skuSubtitle);
			$("#skuSaleUnit").val(skuStockItem.saleUnit);
			$("input[name='skuPurchaseMode'][value='"+skuStockItem.purchaseMode+"']").prop("checked",true); //默认选中值
    	}
    },
    //给界面赋值
    setPriceViewValue: function (priceVo){
    	if(priceVo != null){
     		$("#suggestPrice").val(priceVo.suggestPrice);
     		$("#mallPrice").val(priceVo.mallPrice);
 		}
    },
    //获取界面价格，保存到list
    getPriceViewValue: function (){
    	var goodsMode = $('input[name="goodsMode"]:checked').val(); 
    	if(goodsMode == 0 && goodsManager.skuPriceList.length==0){//新增单品价格
    		var priceItem = new Object();
    		priceItem.goodsId=goodsManager.id;
			priceItem.specification = 0;
			priceItem.suggestPrice = $("#suggestPrice").val();
			priceItem.mallPrice = $("#mallPrice").val();
			goodsManager.skuPriceList.push(priceItem);
		}
		for(var i=0 ; i < goodsManager.skuPriceList.length ; i ++){
			var priceItem = goodsManager.skuPriceList[i];
			if(goodsMode == 0){
				priceItem.specification = 0;
				priceItem.suggestPrice = $("#suggestPrice").val();
				priceItem.mallPrice = $("#mallPrice").val();
			}else if(goodsMode == 1){
				priceItem.specification = 1;
				var specificationType = $('input[name="specificationType"]:checked').val();
				priceItem.suggestPrice = $("#goodsGroupTable").find("tr").eq(i+1).find("input").eq(0).val();
				priceItem.mallPrice = $("#goodsGroupTable").find("tr").eq(i+1).find("input").eq(1).val();
				priceItem.specificationType=specificationType;
			}
		}
    },
    //商品规格与库存类型级联
    changeStockType:function(e){
    	var goodsModeVal =  $(e).val();
    	if(goodsModeVal=='2'){
    		$("#stockTypeBlock").css("display","none");
    		$("#stockType0").prop("checked","checked");
    	}else{
    		$("#stockTypeBlock").css("display","");
    	}
    },
    // 设置标签页的属性
    initTabs: function(){
    	var goodsMode = $('input[name="goodsMode"]:checked').val(); 
		if(goodsMode == 0){//单品
			$('#myTab li:eq(3)').removeClass("disabled");
			$('#myTab li:eq(7)').removeClass("disabled");
			$('#myTab li:eq(4)').addClass("disabled");
			$('#myTab li:eq(5)').addClass("disabled");
			
			// 还原事件，还原切换事件
			$('#myTab li:eq(3)').unbind("show.bs.tab");
			// 还原事件，还原切换事件
			$('#myTab li:eq(7)').unbind("show.bs.tab");
			// 取消事件，让选项卡不可切换
			$('#myTab li:eq(4)').on('show.bs.tab', function(e) {
				e.preventDefault();
			});
			$('#myTab li:eq(5)').on('show.bs.tab', function(e) {
				e.preventDefault();
			});
			$("#btn_save_goodsProperty").text("保存并下一页");
		}
		else if(goodsMode == 1){//多规格
			$('#myTab li:eq(3)').addClass("disabled");
			$('#myTab li:eq(4)').removeClass("disabled");
			$('#myTab li:eq(7)').removeClass("disabled");
			$('#myTab li:eq(5)').addClass("disabled");
			
			$('#myTab li:eq(3)').on('show.bs.tab', function(e) {
				e.preventDefault();
			});
			$('#myTab li:eq(4)').unbind("show.bs.tab");
			$('#myTab li:eq(7)').unbind("show.bs.tab");
			$('#myTab li:eq(5)').on('show.bs.tab', function(e) {
				e.preventDefault();
			});
			$("#btn_save_goodsProperty").text("保存并下一页");
		}
		else if(goodsMode == 2){//组合
			$('#myTab li:eq(3)').addClass("disabled");
			$('#myTab li:eq(4)').addClass("disabled");
			$('#myTab li:eq(5)').removeClass("disabled");
			$('#myTab li:eq(7)').addClass("disabled");
			$("#btn_save_goodsProperty").text("保存并返回列表");
			$('#myTab li:eq(3)').on('show.bs.tab', function(e) {
				e.preventDefault();
			});
			$('#myTab li:eq(4)').on('show.bs.tab', function(e) {
				e.preventDefault();
			});
			$('#myTab li:eq(7)').on('show.bs.tab', function(e) {
				e.preventDefault();
			});
			$('#myTab li:eq(5)').unbind("show.bs.tab");
		}
    },
    //是否为正整数  
    isInt: function (s){
    	// 去空格
    	s = $.trim(s);  
    	if(s == '')
    		return true;
    	if(s == 0)
    		return true;
    	if(s.length > 9)
    		return false;
        var re = /^[0-9]*[1-9][0-9]*$/ ;
        return re.test(s);
    },
    //是否为整数or小数 
    isFloat: function (s){
    	// 去空格
    	s = $.trim(s);  
    	if(s == '')
    		return true;
    	if(s == 0)
    		return true;
    	if(s.length > 9)
    		return false;
        var re = /^[0-9]+\.?[0-9]*$/;
        return re.test(s);
    },
    //获取七牛upToken和存储空间域名
	getUpToken:function(){
		var params={};
		$.callAjax({
			type:"post",
			url : goodsManager.URL.getUpTokenUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data == null){
         			$.toastrWarning("请为该运营商配置七牛公钥、私钥、域名、存储空间名称");
         			return;
         		}
         		//调用上传接口
         		goodsManager.upload(data.data.upToken,data.data.domain);
			}
		});
	},
	//七牛上传方法
	upload: function (uptoken,domain) {
		Qiniu.uploader({
		    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
		    browse_button: 'imgFile',         	// 上传选择的点选按钮，必需
		    uptoken :uptoken,					//后台服务器提供的uptoken
		    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
			unique_names: true,              	// 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
			domain: domain,     				// bucket域名，下载资源时用到，必需
			max_file_size: '2mb',             // 最大文件体积限制
			flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
			max_retries: 3,                     // 上传失败最大重试次数
			dragdrop: true,                     // 开启可拖曳上传
			chunk_size: '2mb',                  // 分块上传时，每块的体积
		    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
		    init:{
		    	'BeforeUpload': function(up, file) {
		    		//文件上传前处理相关事情
		        },
		    	'UploadProgress': function(up, file) {
		            // 每个文件上传时，处理相关的事情
	                //var chunk_size = plupload.parseSize(this.getOption('chunk_size'));//文件总大小
	                //显示进度条
		    		$("#pgsbar").css("visibility","visible");
				    var progress = parseInt(data.loaded / data.total * 100, 10);
			        $('#pgsbarColor').css(
			            'width',
			            file.percent + '%'
			        );
		     	},
		    	'FileUploaded': function(up, file, info) {
		    		//上传成功后延迟1秒中隐藏进度条
		    		setTimeout ("time()", 1000);
		    		//保存图片地址
		    		var sourceLink = domain +"/"+ JSON.parse(info).key; //获取上传成功后的文件的Url
		    		$("#goodsImageUrl").val(sourceLink);
		    		$("#imageShow").attr("src", sourceLink);
		    		//刷新表格
			    },'Error': function(up, err, errTip) {
			    	if(err.message == 'File size error.'){
			    		$.toastrError("文件大小有误，最大2MB");
			    		return;
			    	}
			        //上传出错时，处理相关的事情
			    	$.toastrError("上传失败！");
			    },
		    },
		    // 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
		    filters : {
		        max_file_size : '2mb',
		        prevent_duplicates: false,//防止重复,如果开启，同一个文件再次上传会失败,但是不能避免浏览器刷新后再次上传该文件
		        mime_types: [
		            {title : "Image files", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
		        ]
		    }
		});
	},
	/*specificationTypeChange: function (){
		var specificationType = $('input:radio[name="specificationType"]:checked').val();
		//多规格同价
		if(specificationType == 1){
			$("#price_sku_dropdown").attr('disabled', 'disabled');
		}
		//多规格不同价
		else if(specificationType == 0){
			$("#price_sku_dropdown").removeAttr('disabled');
    	}
	},*/
	checkIsOk: function (typeParentId, checkArray){
		if(typeParentId == 0){
			$.toastrWarning("只能选叶子节点");
			return false;
		}
		var count = 0;
		for (var i = 0 ; i < checkArray.length ; i ++){
			var checkItem = checkArray[i];
			if(typeParentId == checkItem.typeParentId){
				count ++;
				if(count > 1){
					$.toastrWarning("同一级下只能选择一个");
					return false;
				}
			}
		}
		return true;
	},
	// 商品相册或商品详情页签，删除图片关联t_goods_material_list
    deleteGoodsMaterialList: function (id) {
    	$.dialogConfirm({
            message: '您确定要删除这个吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id};
        			$.callAjax({
        				type:"post",
        				url : goodsManager.URL.deleteGoodsMaterialListUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$.toastrSuccess('删除成功！');
    		         		goodsManager.getMaterialListByGoodsId(goodsManager.type);
        				}
        			});
                }
            }
        });
    },
    showConfirm: function(formId){
    	if($.checkForm(formId)){
	    	BootstrapDialog.show({
	            title: '取消确认框',
	            message: '取消后不会保存数据，您确认取消吗？',
	            closable: false,
	            buttons: [{
	                label: '是',
	                // no title as it is optional
	                cssClass: 'btn-primary',
	                action: function(dialogRef){
	                	dialogRef.close();
	                	myMain.getAllContent(goodsManager.URL.initUrl());
	                }
	            },{
	                label: '否',
	                action: function(dialogItself){
	                	dialogItself.close();
	                }
	            }]
	        });
    	}
    	else{
    		myMain.getAllContent(goodsManager.URL.initUrl());
    	}
    },
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  $("#btn_search").addClass("disabled");
    		  goodsManager.isResetOffset = 1;
    		  $('#listTable').bootstrapTable('refresh');
    	});
    	
    	//商品标签查询
    	$("#tag_btn_search").on("click",function () {
    		  $("#tag_btn_search").addClass("disabled");
    		  goodsManager.isResetOffset = 1;
    		  $('#goodsTagListTable').bootstrapTable('refresh');
    	});
    	
    	//选择商品分类
    	$("#choose_goods_type").on("click",function () {
    		var defaultCheckedNodeIds = new Array();
    		defaultCheckedNodeIds.push($("#goodsType").val());
    		this.goodsTypeTreeDialog = new GoodsTypeTreeDialog(defaultCheckedNodeIds);
    		this.goodsTypeTreeDialog.showGoodsTypeTreeDialog();
    		/*if($.isNotNull(goodTypeId)){
    			$('#goods_type_tree').treeview('toggleNodeChecked', [ 23, { silent: true } ]);
    		}*/
    	});
    	//选择商品分类  -确定后
    	$("#btn_goodsType_confirm").click(function(){
    		// 获取选中的节点
    		var checkArray = $('#goods_type_tree').treeview('getChecked');
    		if(checkArray.length != 1){
    			$.toastrWarning("请选择一个分类");
    			return;
    		}
    		var obj = checkArray[0];
    		$("#goodsType").val(obj.id);
    		$("#goodsTypeName").val(obj.text);
    		$.hideModal('#chooseGoodsTypeModal');
    	});
    	//选择商品标签
    	$("#choose_goods_tag").on("click",function () {
    		$.showModal('#chooseGoodsTagModal');
    		$.clearForm("searchForm");
  		  	$('#goodsTagListTable').bootstrapTable('refresh');
    		goodsManager.queryGoodsTagListByPage();
    	});
    	//选择商品标签  -确定后
    	$("#btn_goodsTag_confirm").click(function(){
    		var checkArray = $("#goodsTagListTable").bootstrapTable('getSelections');
    		var tagIds="";
    		var tagNames="";
    		for (var i = 0; i < checkArray.length; i++) {
    			var item = checkArray[i];
    			tagIds += item.id;
    			tagIds += ",";
    			tagNames += item.tagName;
    			tagNames += "；";
    		}
    		tagIds = tagIds.substring(0, tagIds.length-1);
    		$("#goodsTag").val(tagIds);
    		$("#goodsTagName").val(tagNames);
    		$.hideModal('#chooseGoodsTagModal');
    	});
    	//新增商品基本信息
    	$("#btn_save_goods").click(function () {
    		var bootstrapValidator = $("#addGoodsForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			goodsManager.addOrUpdate();
    		else return;
	    });
    	//添加商品属性
    	$("#btn_add_goodsProperty").click(function () {
    		$.showModal('#chooseGoodsPropertyModal');
    		$('#goodsPropertyListTable').bootstrapTable('refresh');
    		// 获取属性配置列表
        	goodsManager.getPropertyList();
	    });
    	//选择商品属性  -确定后
    	$("#btn_goodsProperty_confirm").click(function(){
    		var checkArray = $("#goodsPropertyListTable").bootstrapTable('getSelections');
    		var tagIds="";
    		var tagNames="";
    		for (var i = 0; i < checkArray.length; i++) {
    			var item = checkArray[i];
    			goodsManager.createPropertyRow(item);
    		}
    		$.hideModal('#chooseGoodsPropertyModal');
    	});
    	//新增商品属性信息
    	$("#btn_save_goodsProperty").click(function () {
    		goodsManager.addOrUpdateProperty();
	    });
    	//新增商品价格信息
    	$("#btn_save_goodsPrice").click(function () {
    		goodsManager.addOrUpdatePrice();
	    });
    	//单品，库存信息
    	$("#btn_save_goods_item").click(function () {
    		goodsManager.addOrUpdateGoodsStock();
	    });
    	//新增组合商品
    	$("#btn_save_collection").click(function () {
    		goodsManager.addOrUpdateCollection();
	    });
    	//新增多规格商品
    	$("#btn_save_sku_list").click(function () {
    		goodsManager.addOrUpdateSkuList();
	    });
    	
    	//基本信息返回列表事件
		$("#btn_cancel_goods").on("click",function() {
			goodsManager.showConfirm("addGoodsForm");
		});
		//商品相册返回列表事件
		$("#btn_cancel_goodsIamge").on("click",function() {
			myMain.getAllContent(goodsManager.URL.initUrl());
		});
		//商品详情返回列表事件
		$("#btn_cancel_iamgeDetails").on("click",function() {
			myMain.getAllContent(goodsManager.URL.initUrl());
		});
		//单品库存返回列表事件
		$("#btn_cancel_goods_item").on("click",function() {
			goodsManager.showConfirm("addGoodsItemForm");
		});
		//销售规格返回列表事件
		$("#btn_cancel_sku_list").on("click",function() {
			goodsManager.showConfirm("addGoodsSkuForm");
		});
		//组合商品返回列表事件
		$("#btn_cancel_collection").on("click",function() {
			myMain.getAllContent(goodsManager.URL.initUrl());
		});
		//属性信息返回列表事件
		$("#btn_cancel_goodsProperty").on("click",function() {
			goodsManager.showConfirm("addGoodsPropertyForm");
		});
		//价格信息返回列表事件
		$("#btn_cancel_goodsPrice").on("click",function() {
			goodsManager.showConfirm("addGoodsPriceForm");
		});
		
    	//绑定键盘事件
    	$("#searchForm").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 goodsManager.isResetOffset = 1;
    			 $('#goodsManagerTable').bootstrapTable('refresh');
    		}
	    }); 
    	//打开素材选择框
    	$(".btn_add_goodsIamge").click(function () {
//    		$("#goods_choose_material_body").children().remove().end().load($("#contextPath").val()+goodsManager.URL.toGoodsMaterialUrl()+" #material_form_div",function(){
//	    		$("#btn_submit").removeClass("disabled");
//	    	});
    		$.showModal('#chooseMaterialModal');
    		goodsManager.initTree();
        	goodsManager.searchMaterialListByPage(1,10,0);
	    });
    	//素材选择框  -确定后
    	$("#btn_choose_material_confirm").click(function () {
    		var goodsMaterialList = [];
    		
    		// 图片数量限制，type为0表商品图片最多5张，为1表 商品详情图片最多10张
    		var checkedLen = $('input[name="chooseMaterial"]:checked').length;
    		var count = 0;
    		if(goodsManager.type == 0){
    			var imageLen = $("#goodsImageDiv li").length;
    			count = imageLen + checkedLen;
    			if(count > 5){
        			$.toastrWarning("商品图片最多5张，已有"+imageLen+"张");
        			return;
        		}
    		}
    		else if(goodsManager.type == 1){
    			var detailsLen = $("#imageDetailsDiv li").length;
    			count = detailsLen + checkedLen;
    			if(count > 10){
    				$.toastrWarning("商品详情最多10张，已有"+detailsLen+"张");
        			return;
        		}
    		}
    		
    		var i = 0;
    		$('input[name="chooseMaterial"]:checked').each(function(){
    			i++;
    			var materialId = $(this).val();
    			var item = {goodsId:goodsManager.id, materialId:materialId, type:goodsManager.type, sortIndex:i};
    			goodsMaterialList.push(item);
			});
    		goodsManager.addOrUpdateGoodsMaterialList(goodsMaterialList);
    	});
    	//新增组合规格
    	$("#btn_add_sku").click(function () {
    		$('#goods_sku_list_tree').treeview('uncheckAll', { silent: true });
    		$.showModal('#goodsSkuListTreeModal');
    	});
    	
    	$("#btn_sku_cancel").click(function () {
    		$.hideModal('#goodsSkuListTreeModal');
    	});
    	
    	// 新增组合规格  -确定后
    	$("#btn_sku_confirm").click(function(){
    		// 获取选中的节点
    		var checkArray = $('#goods_sku_list_tree').treeview('getChecked');
    		if(checkArray.length == 0){
				$.toastrWarning("请选择商品规格");
    			return;
    		}

    		var  skuListLength= $(".L_all_spt:first").find("p").length-2;
    		
    		for(var i = 0 ; i < checkArray.length ; i ++){
    			var checkItem = checkArray[i];
    			if(!goodsManager.checkIsOk(checkItem.typeParentId, checkArray))
    				return;
    			if(skuListLength<=0){
    				if($.inArray(checkItem.typeParentId,goodsManager.parentIds)==-1){
    					goodsManager.parentIds.push(checkItem.typeParentId);
            		}	
    			}else{
    				if($.inArray(checkItem.typeParentId,goodsManager.parentIds)==-1){
    					$.toastrWarning("选择的规格与您之前选择的规格不匹配,请检查");
    	    			return;
            		}
    			}
    			
    		}
    		if(skuListLength!=undefined && skuListLength>0 && checkArray.length != skuListLength){
    			$.toastrWarning("选择的规格与您之前选择的规格个数不匹配");
    			return;
    		}
    		goodsManager.createSkuListItem(checkArray);
    	});
    	//商品规格选择改变事件
    	$(".goodsMode").change(function() {
    		goodsManager.initTabs();
    		goodsManager.changeStockType(this);
    	});
    	// 共享库存、独立库存选择改变事件
    	/*$(".skuStockType").change(function() { 
    		var skuStockType = $('input:radio[name="skuStockType"]:checked').val();
    		//独立库存
    		if(skuStockType == 1){
    			$("#sku_list_dropdown").removeAttr('disabled');
    			$("#skuStoreDiv").css('display','none');
    		}
    		//共享库存
    		else if(skuStockType == 2){
    			$("#sku_list_dropdown").attr('disabled', 'disabled');	
    			$("#skuStoreDiv").css('display','block'); //显示
        	}
    	});*/
    	// 多规格同价、多规格不同价选择改变事件
    	/*$(".specificationType").change(function() { 
    		goodsManager.specificationTypeChange();
    	});*/
    	//销售规格页签，下拉框选择改变事件
    	$("#sku_list_dropdown").change(function() {
    		goodsManager.getSkuStockViewValue();
    		var currentValue = $("#sku_list_dropdown").val();
    		for(var i=0 ; i < goodsManager.skuList.length ; i ++){
    			var skuStockItem = goodsManager.skuList[i];
    			if(skuStockItem.key == currentValue){
    				goodsManager.setSkuStockViewValue(skuStockItem);
    			}
    		}
    	});
    	$("#sku_list_dropdown").click(function() {
    		goodsManager.oldValue = $("#sku_list_dropdown").val();
        });
    	//价格页签，下拉框选择改变事件
    	/*$("#price_sku_dropdown").change(function() {
    		goodsManager.getPriceViewValue();
    		var currentValue = $("#price_sku_dropdown").val();
    		for(var i=0 ; i < goodsManager.skuPriceList.length ; i ++){
    			var priceItem = goodsManager.skuPriceList[i];
    			if(priceItem.goodsSkuId == currentValue){
    				goodsManager.setPriceViewValue(priceItem);
    			}
    		}
    	});*/
    	/*$("#price_sku_dropdown").click(function() {
    		goodsManager.oldGoodsSkuId = $("#price_sku_dropdown").val();
        });*/
    	//属性页签，下拉框选择改变事件
    	$("#property_sku_dropdown").change(function() {
    		goodsManager.getPropertyViewValue();
    		goodsManager.setPropertyViewValue();
    	});
    	$("#property_sku_dropdown").click(function() {
    		goodsManager.propertyOldGoodsSkuId = $("#property_sku_dropdown").val();
        });
    	
    	$(".newPage").click(function(){
    		//type0 商品图片，1 商品详情图片
     		if(goodsManager.type == 0){
         		$('#myTab li:eq(2) a').tab('show');
     		}
     		else if(goodsManager.type == 1){
     			var goodsMode = $('input[name="goodsMode"]:checked').val(); 
     			//单品
    			if(goodsMode == 0)
    				$('#myTab li:eq(3) a').tab('show');
    			//多规格
    			if(goodsMode == 1)
    				$('#myTab li:eq(4) a').tab('show');
    			//组合商品
    			if(goodsMode == 2)
    				$('#myTab li:eq(5) a').tab('show');
     		}
    	});
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsManager.validateform();
    	//初始化下拉框
    	goodsManager.initDropDown();
    	//初始化选项卡
    	goodsManager.initTabs();
    	//判断是否修改，是就获取修改的对象详情
    	if(goodsManager.id != undefined)
        	goodsManager.getDetails();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数
	var searchKeyword = $("#searchKeyword").val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		searchKeyword:searchKeyword
	};
	return temp;
};

var queryTagParams = function (params) {
	//自定义查询参数
	var searchKeyword = $("#searchTagKeyword").val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: goodsManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		searchKeyword:searchKeyword
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	// 添加商品到集合
	'click .add_collection_a': function (e, value, row, index) {
		goodsManager.createCollectionItem(row.id, row.goodsImageUrl, row.title,row.saleUnitName, row.suggestPrice,row.mallPrice, row.goodsMode, 1);
	}
};

$(document).ready(function(){
	// 获取列表界面穿过来的id
	goodsManager.id = myMain.getUrlValue('id');
	if(goodsManager.id != undefined)
		$("#labelText").text("编辑商品");
	//1、初始化加载列表数据
	goodsManager.init();
	//2、初始化绑定增删改查事件
	goodsManager.bindEvent();
	//3、初始化上传控件
	goodsManager.getUpToken();
	
	// 页签选择改变事件，从后台获取数据
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
        var activeTab = $(e.target).text();
        // 获取前一个激活的标签页的名称
        var previousTab = $(e.relatedTarget).text();
        if(activeTab == "基本信息"){
        	if(goodsManager.id != undefined)
            	goodsManager.getDetails();
        }
        else if(activeTab == "商品相册"){
        	goodsManager.type = 0;
        	if(goodsManager.id != undefined)
            	goodsManager.getMaterialListByGoodsId(goodsManager.type);
	    }
        else if(activeTab == "商品详情"){
        	goodsManager.type = 1;
        	if(goodsManager.id != undefined)
            	goodsManager.getMaterialListByGoodsId(goodsManager.type);
	    }
        else if(activeTab == "属性信息"){
        	var goodsMode = $('input[name="goodsMode"]:checked').val();
        	if(goodsMode != 1)
        		$("#propertySkuShow").css('display','none');
        	else 
        		$("#propertySkuShow").css('display','block');
        	goodsManager.deleteIds = [];
        	if(goodsManager.id != undefined)
            	goodsManager.getPropertyListByGoodsId();
	    }
        else if(activeTab == "单品库存"){
        	if(goodsManager.id != undefined)
            	goodsManager.getStockByGoodsId();
        }
        else if(activeTab == "销售规格"){
        	// 加载树形数据
        	goodsManager.initSkuTree();
        	goodsManager.deleteIds = [];
        	if(goodsManager.id != undefined)
            	goodsManager.getSkuListByGoodsId();
        }
        else if(activeTab == "组合商品"){
        	goodsManager.queryGoodsListForCollection();
        	goodsManager.deleteIds = [];
        	if(goodsManager.id != undefined)
            	goodsManager.getCollectionByGoodsId();
        }
        else if(activeTab == "价格信息"){
        	goodsManager.modeChange(goodsManager.skuPriceList);
        	if(goodsManager.id != undefined)
            	goodsManager.getPriceByGoodsId();
	    }
    });
});

//商品属性页签删除一行
function deletePropertyItem(e){
	var index = $('div').index($(e).closest('div'));
	$('div:eq('+index+')').remove();
}

// 组合商品界面删除一行
function deleteCollectionItem(e, id){
	if(id != undefined && id != 'undefined')
		goodsManager.deleteIds.push(id);
	var index = $('tr').index($(e).closest('tr'));
	$('table tr:eq('+index+')').remove();
	goodsManager.changePrice();
}

// 多规格商品界面删除一项
function deleteSkuListItem(e, deleteSkuIds, id){
	if(id != undefined && id != 'undefined')
		goodsManager.deleteIds.push(id);
	var index = $('div').index($(e).closest('div'));
	$('div:eq('+index+')').remove();
	
	//下拉框删除这一项
	$("#sku_list_dropdown option").each(function(){
		var skuIds = this.value; //获取option的id
        if(deleteSkuIds == skuIds){
        	$(this).remove();
        }
	});
	
	//goodsManager.skuList删除一条记录 
	for(var i = 0 ; i < goodsManager.skuList.length ; i ++){
		var item = goodsManager.skuList[i];
		if(item.key == deleteSkuIds){
			goodsManager.skuList.splice(i,1);
		}
	}
}

function dis(obj){
	$("#img"+obj).css("visibility","visible");
}
function non(obj){
	$("#img"+obj).css("visibility","hidden");
}
function deleteGoodsMaterialList(id) {
	goodsManager.deleteGoodsMaterialList(id);
}

//隐藏进度条
function time(){
	$("#pgsbar").css("visibility","hidden");
}
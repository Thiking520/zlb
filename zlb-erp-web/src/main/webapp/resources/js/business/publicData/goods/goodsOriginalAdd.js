// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	id:"",
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//跳转列表页
    	initUrl: function () {
            return '/publicData/goodsOriginal/init';
        },
		//新增商品基本信息的请求地址
        addDataUrl: function () {
            return '/publicData/goodsOriginal/addData';
        },
        //初始化单位下拉框
        initDropDownUrl: function () {
            return '/publicData/goodsOriginal/initDropDown';
        },
        //修改商品基本信息的请求地址
        updateDataUrl:function(){
        	return '/publicData/goodsOriginal/updateData';
        },
        //进入修改界面，获取商品详情
        queryDetailsUrl:function(){
        	return '/publicData/goodsOriginal/queryDetails';
        },
        //获取商品分类树目录
        goodsTypeTreeUrl: function () {
            return '/publicData/goodsType/goodsTypeTree';
        },
        //分页获取商品素材请求地址
    	searchMaterialListByPageUrl: function () {
            return '/publicData/goodsMaterial/list';
        }
    },
    
    /**编辑，获取商品详情**/
    getDetails: function () {
    	if(goodsManager.id!=null){
    		var params = {id:goodsManager.id};
    		$.callAjax({
    			url : goodsManager.URL.queryDetailsUrl(),
    			data : params,
    			success : function(data){
    				if(data.code != "0000"){
    					$.toastrWarning(data.msg);
    				}else{
//    					$.toastrSuccess('操作成功！');
    					$("#goodsType").val(data.data.goodsType);
    					$("#goodsTypeName").val(data.data.typeName);
    					$("#goodsCode").val(data.data.goodsCode);
    					$("#goodsName").val(data.data.goodsName);
    					$("#goodsDesc").val(data.data.goodsDesc);
    					var imgUrl = data.data.imgUrl;
        				if (imgUrl==null || imgUrl=="") {
        					imgUrl=$("#contextPath").val()+"/resources/img/noneImg.jpg";
        				}
    		    		$("#originalGoodsImgShow").attr("src",imgUrl); 
    				}
    				if(data.data==null){
    					$.toastrSuccess('查询结果为空！');
    				}
    				
    				
    			}
    		});
    	}
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
								"<input onchange='javascript:goodsManager.setImgChecked("+item.id+")' class='el-checkbox__original'   type='radio' name='chooseMaterial' value='"+item.fileUrl+"' id='img"+item.id+"'>"+
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
	//点击图片时设置复选项选中
	setImgChecked: function (id){
		var trueOfFalse=true;
		if (document.getElementById("img"+id).checked) {
			trueOfFalse=false;
		}
		document.getElementById("img"+id).checked=trueOfFalse;
	},
    //初始化单位下拉框
    initDropDown: function (){
    	$.callAjax({
			url : goodsManager.URL.initDropDownUrl(),
			data : "",
			success : function(serverData) {

				var goodsUnitList = serverData.data.goodsUnitList;
				if(goodsUnitList != null){
					for(var i=0 ; i < goodsUnitList.length ; i ++){
						var item = goodsUnitList[i];
	         			$('#unit_value').append('<option value="'+item.dictValue+'">'+item.dictDesc+'</option>');
	         			$('#unit_desc').append('<option value="'+item.dictDesc+'">'+item.dictDesc+'</option>');
	         		}
				} else {
					$.toastrWarning("没有配置单位，请配置单位后再重新打开本页面！")
					$("#btn_save_goods").addClass("disabled");
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
	
    /**查：初始化商品分类，树形结构**/
    initGoodsTypeTree: function () {
		$.callAjax({
			url : goodsManager.URL.goodsTypeTreeUrl(),
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
 
    //添加或修改商品基本信息
	addOrUpdate:function(){
		var urlValue;
		if(goodsManager.id != "" && goodsManager.id != undefined)
			urlValue=goodsManager.URL.updateDataUrl();
		else
			urlValue=goodsManager.URL.addDataUrl();
		//修改时id处理
		var data = $("#addGoodsForm").serializeObject();
		data.id = goodsManager.id;
	
		if(data.goodsType==null|| data.goodsType == ''){
			$.toastrWarning("商品分类不能为空！");
			return;
		}
		if(data.goodsName == null || data.goodsName == '' ){
			$.toastrWarning("商品名称不能为空!");
			return;
		}
		if (data.unitValue==undefined || data.unitValue==null || data.unitValue== "") {
			$.toastrWarning("商品单位不能为空！");
			return;
		}
		if(data.goodsName.length > 50){
			$.toastrWarning("商品名称长度在1-50之间");
			return;
		}
		if(data.goodsDesc.length > 250){
			$.toastrWarning("商品简介长度在1-250之间");
			return;
		}
		
		$.callAjax({
			url : urlValue,
			data : data,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		goodsManager.id = data.data.id;
         		$.toastrSuccess('保存成功!');
         		myMain.getAllContent("/publicData/goodsOriginal/init");
			}
		});
	},
	
    //是否为正整数  
    isInt: function (s){
    	// 去空格
    	s = $.trim(s);  
    	if(s == '')
    		return true;
    	if(s.length > 8)
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
    	if(s.length > 8)
    		return false;
        var re = /^[0-9]+\.?[0-9]*$/;
        return re.test(s);
    },
    
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
    bindEvent: function () {
    	//下拉框改变事件，
    	$("#unit_value").change(function(){
    		//获取unit_value下拉框选中的文本内容，并根据内容改变unit_desc下拉框的选中值。
    		$("#unit_desc").val($("#unit_value").find("option:selected").text());
    	});
    	
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		  $("#btn_search").addClass("disabled");
    		  goodsManager.isResetOffset = 1;
    		  $('#listTable').bootstrapTable('refresh');
    	});
    	//选择商品分类
    	$(".choose_goods_type").on("click",function () {
    		$.showModal('#chooseGoodsTypeModal');
    		goodsManager.initGoodsTypeTree();
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
    		$('#chooseGoodsTypeModal').modal('hide');
    	});
    	//选择商品标签
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
    		$('#chooseGoodsTagModal').modal('hide');
    	});
    	//新增商品基本信息
    	$("#btn_save_goods").click(function () {
    		goodsManager.addOrUpdate();
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
    		$('#chooseGoodsPropertyModal').modal('hide');
    	});
    	//绑定键盘事件
    	$("#searchContent").keydown(function (event) {
    		if(event.keyCode==13){
    			 $("#btn_search").addClass("disabled");
    			 goodsManager.isResetOffset = 1;
    			 $('#goodsManagerTable').bootstrapTable('refresh');
    		}
	    }); 
    	//取消按钮
    	$("#btn_cancel_goods").click(function (event) {
    		myMain.getAllContent("/publicData/goodsOriginal/init");
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
    		
    		var imgUrl = $('input[name="chooseMaterial"]:checked')[0].value;
//    		$.toastrWarning(imgUrl);
    		$("#originalGoodsImgShow").attr("src",imgUrl); 
    		$("#imgUrl").val(imgUrl);
    	});
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsManager.initDropDown();
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

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		
};

$(document).ready(function(){
	// 获取列表界面穿过来的id

	goodsManager.id = myMain.getUrlValue('id');
	if(goodsManager.id != undefined)
		$("#labelText").text("编辑原始商品");
	//1、初始化加载列表数据
	goodsManager.init();
	//2、初始化绑定增删改查事件
	goodsManager.bindEvent();
	
});





// 存放每个功能模块业务逻辑JS
// javascript 模块化
var codeRuleManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	deleteIds:[],
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取列表请求地址
    	searchListByPageUrl: function () {
            return '/publicData/codeRule/list';
        },//修改标签的请求地址
        updateDataUrl:function(){
        	return '/publicData/codeRule/updateData';
        },//初始化下拉框
        initDropDownUrl: function () {
            return '/publicData/codeRule/initDropDown';
        },//根据单据类型获取规则项列表
        getItemListUrl: function () {
            return '/publicData/codeRuleItem/list';
        },//启用
        enabledDataUrl: function () {
            return '/publicData/codeRule/enabledData';
        }
    },
    //初始化下拉框
    initDropDown: function (){
    	$.callAjax({
			url : codeRuleManager.URL.initDropDownUrl(),
			data : "",
			success : function(serverData) {
				var codeTypeList = serverData.data.codeTypeList;
				for(var i=0 ; i < codeTypeList.length ; i ++){
					var item = codeTypeList[i];
         			$('#codeType').append('<option value="'+item.dictValue+'">'+item.dictDesc+'</option>');
         		}
				codeRuleManager.searchListByPage();
			}
		});
    },
    //失效表单里面的控件
	disableForm : function (formId,isDisabled) {    
	    var attr="disable";
	    if(!isDisabled){
	       attr="enable";
	    }
	    $("form[id='"+formId+"'] :text").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] textarea").attr("disabled",isDisabled);    
//	    $("form[id='"+formId+"'] select").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] :radio").attr("disabled",isDisabled);    
	    $("form[id='"+formId+"'] :checkbox").attr("disabled",isDisabled);
	    if(isDisabled){
            $("form[id='"+formId+"'] :button").attr("disabled",isDisabled).attr("class","btn btn-flat");
        }else{
            //还原样式
            $("form[id='"+formId+"'] :button").attr("disabled",isDisabled);
            $("form[id='"+codeRuleForm+"'] :button").attr("class","btn btn-danger btn-flat");
            $("#btn_show_add").attr("class","btn btn-success btn-flat");
            $("#btn_save_submit").attr("class","btn btn-success btn-flat");
            $("#btn_enabled").attr("class","btn btn-success btn-flat");
		}

	},
    /**获取项**/
    initItemList: function () {
    	//分页组件
    	$.pageTable({
    		tableId: "#itemListTable",//需要分页的table ID
    		url: codeRuleManager.URL.getItemListUrl(),//请求后台的URL（*）
    		queryParams:queryParams,
    		onLoadSuccess:function(){
    			codeRuleManager.isResetOffset = 0;
            },
            sortable: true,
    		sortName:'createTime',
    		sortOrder:'desc',
    		columns: [{
    			checkbox: true
    		}, {
    			field: 'ruleItemName',
    			title: '规则名',
    		    align: 'center'
    		}]
    	});
    },
    /**分页获取商品列表**/
    searchListByPage: function () {
    	var codeType=$('#codeType').val();
    	var param = {searchType:codeType};
    	$.callAjax({
			url : codeRuleManager.URL.searchListByPageUrl(),
			data : param,
			success : function(data) {
				$("#tabList tr:not(:first)").remove(); //删除除表头外的所有行
				codeRuleManager.disableForm('codeRuleForm', false);//默认都是可以操作的
				if(data.data != null){
			   		var isDisable = false;
					var value = data.data.rows;
	         		$.each(value, function(i, objectItem) {
	         			if(objectItem.enabled == 1)
	         				isDisable = true;
	         			codeRuleManager.createItemRow(objectItem);
	                });
	         		codeRuleManager.disableForm('codeRuleForm', isDisable);
				}
			}
		});
    },
    //添加或修改
	addOrUpdate:function(){

		var itemList = [];
		
		var trList = $("#tabList").find("tr");
		for (var i=1;i<trList.length;i++) {
	 		var id = trList.eq(i).attr('id');
	   		var inputArr = trList.eq(i).find("input");
	    	var itemId = inputArr.eq(0).val();//外键 t_code_rule_item
	    	var sortIndex = inputArr.eq(1).val();//排序值
	    	var inputValue = inputArr.eq(2).val();//用户输入的值
	    	if(sortIndex == null || sortIndex == ''){
	    		$.toastrWarning("排序不能为空");
	    		return false;
	    	}
	    	if(inputArr.length > 2){
	    		if(inputValue == null || inputValue == ''){
	    			$.toastrWarning("规则值不能为空");
		    		return false;
	    		}
	    	}
	    	
	    	var json = {codeType:$('#codeType').val(), itemId:itemId, sortIndex:sortIndex,inputValue:inputValue, deleteIds:codeRuleManager.deleteIds};
	    	// 修改
	    	if(id != 'undefined')
	    		json.id = id;
	    	itemList.push(json);
	  	}

		if(itemList.length <= 0){
			$.toastrWarning("请先新增数据");
			return false;
		}
		var isSuccess = false;
		$.callAjax({
			url : codeRuleManager.URL.updateDataUrl(),
			data : itemList,
            async: false,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
                    isSuccess =  false;
         		}
         		isSuccess = true;
                // 重新加载数据，把id加载过来，以便再次保存时作update，而不是insert
                codeRuleManager.searchListByPage();
                // $.toastrSuccess("操作成功");
			}
		});
        return isSuccess;
	},
    createItemRow: function (objectItem){
    	var trLen = $("#tabList").find("tr").length;
 		var html="<tr id="+objectItem.id+">"+
 		 			"<td><input type='text' class='form-control' value="+objectItem.itemId+" style='display: none;'><input type='text' class='form-control' value="+objectItem.sortIndex+"></td>"+
					"<td>"+objectItem.ruleItemName+"</td>";
 		if(objectItem.ruleItemValue == 'input')
 			html += "<td><input type='text' class='form-control' value="+objectItem.inputValue+"></td>";
 		else 
 			html += "<td>"+objectItem.ruleItemValue+"</td>";
		
		html += "<td><button type='button' class='btn btn-danger btn-flat' onclick='deleteRows(this,"+objectItem.id+")'>删除</button></td>"+
				"</tr>";
		var tr = $("#tabList tr").eq(-1);// 获取倒数第一行
		tr.after(html);
    },
    bindEvent: function () {
    	//下拉改变，切换数据重新查询数据
    	$("#codeType").change(function () {
    		codeRuleManager.searchListByPage();
    	});
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		$("#chooseItemLabel").text("为["+$("#codeType option:selected").text()+"]新增编码规则");
		   $.showModal('#chooseItemModal');
		    
		    //根据编码类型获取相应数据
		    $('#itemListTable').bootstrapTable('refresh');
		    codeRuleManager.initItemList();
	    });
    	// 新增-》选择后-》点击确定时
    	$("#btn_item_confirm").click(function(){
    		var checkArray = $("#itemListTable").bootstrapTable('getSelections');
    		var trList = $("#tabList").find("tr").length;
    		for (var i = 0; i < checkArray.length; i++) {
    			var data = checkArray[i];
    			var sortIndex = trList + i ;
    			var item = {itemId:data.id, ruleItemName:data.ruleItemName, ruleItemValue:data.ruleItemValue, inputValue:"", sortIndex:sortIndex};
    			codeRuleManager.createItemRow(item);
    		}
    		$.hideModal('#chooseItemModal');
    	});
    	
    	//新增或修改
    	$("#btn_save_submit").click(function(){
    		codeRuleManager.addOrUpdate();
    	});
    	//启用
    	$("#btn_enabled").click(function(){
    		var trList = $("#tabList").find("tr");
    		if(trList.length <= 1){
    			$.toastrWarning("请先设置好数据再启用，一旦启用将无法再更改"); 
    			return;
    		}
    		
    		$.dialogConfirm({
                message: '您确定启用['+$("#codeType option:selected").text()+']的编码规则吗？一旦启用将无法再更改。',
                callback: function(result) {
                    if(result) {
                        var isSuccess = codeRuleManager.addOrUpdate();
                        if(!isSuccess){
                        	return;
						}
            			$.callAjax({
            				url : codeRuleManager.URL.enabledDataUrl(),
            				data : {codeType: $("#codeType").val()},
            				success : function(data){
        		         		if(data.code != "0000"){
        		         			$.toastrWarning(data.msg); 
        		         			return;
        		         		}
        		         		$.toastrSuccess('启用成功！');
        		         		codeRuleManager.disableForm('codeRuleForm',true);
            				}
            			});
                    }
                }
            });
    	});
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	codeRuleManager.initDropDown();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
	//自定义查询参数,昵称、公司名
	var codeType=$('#codeType').val();
	//时间区间
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		offset: codeRuleManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
		sort: params.sort,
		order: params.order,
		searchType:codeType
	};
	return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	
};

$(document).ready(function(){
	//1、初始化加载列表数据
	codeRuleManager.init();
	//2、初始化绑定增删改查事件
	codeRuleManager.bindEvent();
});

function deleteRows(e, id){
	if(id != undefined && id != 'undefined')
		codeRuleManager.deleteIds.push(id);
	var index = $('tr').index($(e).closest('tr'));
    $('table tr:eq('+index+')').remove();
}
$.extend({
	/**
	 * 清空表单元素
	 * @param id
	 * @return
	 */
	clearForm:function(id){
		//id为form表单  id
    	$("#"+id).find(':input').each(
            function(){  
                switch(this.type){  
                    case 'passsword':
                    case 'select-multiple':
                    case 'select-one':
                    case 'text':
                    case 'textarea':
                        $(this).val('');
                        break;
                    case 'checkbox':
                    case 'radio':
                        this.checked = false;
                }
            }
        );
    },disabledForm:function(id){
		//id为form表单  id
    	$("#" + id).find(':input').each(function() {
			$(this).attr("disabled", true);
		});
    },
    /**
	 * 获取form表单数据，返回数据类型JSON
	 * 
	 * @param id
	 * @return
	 */
    getFormData:function(id){
    	//id为form表单  id
    	return $("#" + id).serializeJson();
    },
    getFromParmObject:function(id){
    	//id为form表单  id
    	return $("#" + id).serializeObject();
    },
    /**
     * 显示加载条
     */
    showAjaxloader:function(){
    	$(".ajaxloader").html('<img src="'+$("#contextPath").val() +'/resources/charisma-master/img/ajax-loaders/ajax-loader-4.gif" title="'+$("#contextPath").val() +'/resources/charisma-master/img/ajax-loaders/ajax-loader-4.gif">').show();
    },
    /**
     * 隐藏加载条
     */
    hideAjaxloader:function(){
    	$(".ajaxloader").hide();
    },
    /**
     * 全局AJAX
     * @param options
     * @return
     */
    callAjax:function(options){
    	var setting = {
    		type : "post",
    		url : "",
    		async: true,
    		processData : true,
    		data : {},
    		contentType:"application/json;charset=UTF-8",
   			dataType : "json",
    		beforeSend : function() {$.showAjaxloader(); return true;},
    		success : function() {return true;},
    		complete : function() {$.hideAjaxloader()},
    		error : function() {$.toastrError();}
    	},
    	options = options || {};
    	$.extend(true, setting, options);
    	$.ajax({
    		type : setting.type,
    		contentType : setting.contentType,
    		url : contextPath + setting.url,
    		async: setting.async,
    		processData : setting.processData,
    		data : JSON.stringify(setting.data),
    		dataType : setting.dataType,
    		beforeSend : function() {setting.beforeSend();return true;},
    		success : function(data){
    			if(data.code==constants.code_login_auth_err || data.code==constants.code_incorrect_err){
    				myMain.jumpInfo(data.msg);
    				return;
    			}
    			
    			setting.success(data);
    	    },
    		complete:function(){setting.complete();},
    		error:function(){setting.error();}
    	});
    },
    /**
     * 分页组件
     * @param options
     * @return
     */
    pageTable:function(options){
    	var setting = {
           		selectItemName:"btSelectItem",//radio or checkbox 的字段名
                classes: 'table table-hover table-striped table-bordered',
    			tableId: "",//需要分页的table ID
    			url: "",		 //请求后台的URL（*）
    			method: 'post',					  //请求方式（*）
    			//toolbar: '#toolbar',				//工具按钮用哪个容器
    			contentType:"application/json;charset=UTF-8",
    			dataType: 'json',
    			striped: true,					  //是否显示行间隔色
    			cache: false,					   //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    			pagination: true,				   //是否显示分页（*）
    			sortable: false,					 //是否启用排序
    			sortOrder: "desc",				   //排序方式
    			queryParams:$.queryParams,//传递参数（*）
    			sidePagination: "server",		   //分页方式：client客户端分页，server服务端分页（*）
    			pageNumber:1,					   //初始化加载第一页，默认第一页
    			pageSize: 10,					   //每页的记录行数（*）
    			pageList: [10, 25, 50, 100],		//可供选择的每页的行数（*）
    			//search: true,					   //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    			strictSearch: true,
    			showColumns: false,				  //是否显示 内容列下拉框
    			showRefresh: false,				  //是否显示刷新按钮
    			minimumCountColumns: 2,			 //最少允许的列数
    			clickToSelect: true,				//是否启用点击选中行
    			//height: 500,						//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    			uniqueId: "ID",					 //每一行的唯一标识，一般为主键列
    			showToggle:false,					//是否显示详细视图和列表视图的切换按钮
    			cardView: false,					//是否显示详细视图
    			detailView: false,				   //是否显示父子表
    			responseHandler:function(res) {//加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
                	if($.isNotNull(res.data) && $.isNotNull(res.data.pageSize)){
                		res = res.data;
                	}
    				return res;
    			},
    			columns: [],
    			onRefresh:function(params){

				},
                onLoadSuccess:function(data){
                	
                },
                onLoadError: function (status) {
                	
	        	},
                onCheck:function(){
                	
                },
                onUncheck:function(){
                	
                },
                onPageChange:function(){
                	
                },
                onClickRow:function(row,$element){
                	
                }
    	},
    	options = options || {};
    	$.extend(true, setting, options);
    	
		$(setting.tableId).bootstrapTable({
            selectItemName:setting.selectItemName,
            classes:setting.classes,
			url: $("#contextPath").val() + setting.url,	 //请求后台的URL（*）
			method: setting.method,					  //请求方式（*）
			//toolbar: '#toolbar',				//工具按钮用哪个容器
			contentType:setting.contentType,
			striped: setting.striped,					  //是否显示行间隔色
			cache: setting.cache,					   //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: setting.pagination,				   //是否显示分页（*）
			sortable: setting.sortable,					 //是否启用排序
			sortName: setting.sortName,				   //排序方式
			sortOrder: setting.sortOrder,				   //排序方式
			queryParams:setting.queryParams,//传递参数（*）
			sidePagination: setting.sidePagination,		   //分页方式：client客户端分页，server服务端分页（*）
			pageNumber:1,					   //初始化加载第一页，默认第一页
			pageSize: setting.pageSize,					   //每页的记录行数（*）
			pageList: setting.pageList,		//可供选择的每页的行数（*）
			//search: true,					   //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: setting.strictSearch,
			showColumns: setting.showColumns,				  //是否显示所有的列
			showRefresh: setting.showRefres,				  //是否显示刷新按钮
			minimumCountColumns: setting.minimumCountColumns,			 //最少允许的列数
			clickToSelect: setting.clickToSelect,				//是否启用点击选中行
			//height: 500,						//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId: setting.uniqueId,					 //每一行的唯一标识，一般为主键列
			showToggle:setting.showToggle,					//是否显示详细视图和列表视图的切换按钮
			cardView: setting.cardView,					//是否显示详细视图
			detailView: setting.detailView,				   //是否显示父子表
			columns: setting.columns,
			responseHandler:setting.responseHandler,
            onLoadSuccess:function(data){
            	if(data.code==constants.code_login_auth_err || data.code==constants.code_incorrect_err){
    				myMain.jumpInfo(data.msg);
    				return;
    			}
            	setting.onLoadSuccess(data);
            },
            onCheck:function(row){
            	setting.onCheck(row);
            },
            onUncheck:function(row){
            	setting.onUncheck(row);
            },
            onLoadError: function (status) {
            	setting.onLoadError(status);
            },
            onPageChange:function(number,size){
            	setting.onPageChange(number,size);
            },
            onRefresh:function(params){
                $(setting.tableId).bootstrapTable('refreshOptions',{pageNumber:1});
            	setting.onRefresh(params);
            },
            onClickRow:function(row,$element){
            	setting.onClickRow(row,$element);
            }
		});
    	
    },
    //默认的分页查询条件
    queryParams:function (params) {
    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    		pageSize: params.limit,   //页面大小
    		offset: params.offset  //分页偏移值
    	};
    	return temp;
    },
    //获取分页列表中勾选的checkBox的值tableId:表的ID，checkBoxKeyField给checkBox赋值的字段名
    getIdSelections:function (tableId,checkBoxKeyField) {
    	 return $.map($(tableId).bootstrapTable('getSelections'), function(row) {
    	        return row[checkBoxKeyField];
    	 });
    },
    //确人提示框i
    dialogConfirm:function(options){
    	var setting = {
			title: '温馨提示',
            message: '您确定要执行此操作吗?',
            type: BootstrapDialog.TYPE_WARNING,
            btnCancelLabel: '取消',
            btnOKLabel: '确定',
            btnOKClass: 'btn-warning',
    		callback : function() {return true;}
    	},
    	options = options || {};
    	$.extend(true, setting, options);
    	BootstrapDialog.confirm({
    		title : setting.title,
    		message : "<h3>" + setting.message + "</h3>",
    		type : setting.type,
    		btnCancelLabel : setting.btnCancelLabel,
    		btnOKLabel : setting.btnOKLabel,
    		btnOKClass : setting.btnOKClass,
    		callback : function(result) {setting.callback(result);}
    	});
    },
	//取消蒙太框操作弹窗
	//formId为表单id,modalId为蒙太框id
    modalCancel:function(formId,modalId){
		//1、判断input框中是否有值
		if($.checkForm(formId)){
            //2、弹窗
            //操作1允许,2拒绝
            BootstrapDialog.show({
                title: '取消确认框',
                message: '取消后不会保存数据，您确认取消吗？',
                closable: false,
                buttons: [{
                    label: '是',
                    // no title as it is optional
                    cssClass: 'btn-primary',
                    action: function(dialogRef){
                        //3.关闭modal页面
                        $.hideModal('#'+modalId);
                        dialogRef.close();
                    }
                },{
                    label: '否',
                    action: function(dialogItself){
                        //关闭弹出框后什么也不做，返回modal页面
                        dialogItself.close();
                    }
                }]
            });
		}else{
            //3.关闭modal页面
            $.hideModal('#'+modalId);
		}
    },
	//检查input框中的值是否为空，如果有一个不为空返回true，所有input都为空返回false
    checkForm:function(formId){
    	var flag = false;
        //formId为form表单id
        $("#"+formId).find(':input').each(function(){
				if(flag){//如果有一个不为空 中断循环
					return false;
				}
                switch(this.type){
                    case 'text':
                    case 'textarea':
                        var value = $(this).val();
                        if($.isNotNull(value)){
                            flag =  true;
                            break;
						};
                }
            }
        );
        return flag;
    },
    //调整表格大小--适用于订单搜索栏，导航栏页面
    resizeOrderTable:function(tableId){
        var window_height = $(window).height();
        var box_header_height = $(".box-header").outerHeight();
        var alert_info_height = $(".alert-info").outerHeight();//搜索栏
        var table_heigth = $("#"+tableId).outerHeight();
        var nav_heigth = $("#feature-tab").outerHeight();//导航栏
        //计算table可使用高度
        //隐藏搜索条前的可使用高度
        var available_table_heigth = window_height - box_header_height - alert_info_height - nav_heigth - $("#headDiv").outerHeight() - 2 * $(".fixed-table-pagination").outerHeight();
        //可使用高度大于等于500时，隐藏搜索条
        // alert(window_height + "," + box_header_height + "," + alert_info_height + "," +table_heigth+","+ available_table_heigth);
        //1600X900时可用高度为400px左右
        if(available_table_heigth <= 409 && table_heigth > available_table_heigth){
            $(".alert-info").hide();
            //隐藏搜索框后的可使用高度
            available_table_heigth = window_height - box_header_height - nav_heigth - $("#headDiv").outerHeight() - 2 * $(".fixed-table-pagination").outerHeight();
            $("#btn_show_search").show();
        }
        //添加滚动条
        $("#"+tableId).attr("style", 'display:block; max-height:' + available_table_heigth + 'px;overflow: auto;');
    },
    //调整表格大小--适用于搜索栏，导航栏，操作栏页面
    resizeTable:function(tableId){
        // alert($(".alert-info").length > 0);
        // alert($(".nav-tabs").length > 0);
        // alert($("#toolbar").length > 0);
        var window_height = $(window).height();
        var box_header_height = $(".box-header").outerHeight();
        var alert_info_height = $(".alert-info").outerHeight();//搜索栏
        var table_heigth = $("#"+tableId).outerHeight();
        var nav_heigth = $(".nav-tabs").outerHeight();//导航栏
        var toolbar_heigth = $("#toolbar").outerHeight();//操作栏
        //计算table可使用高度
        //隐藏搜索条前的可使用高度
        var available_table_heigth = window_height - box_header_height - alert_info_height - nav_heigth - toolbar_heigth - $("#headDiv").outerHeight() - 2 * $(".fixed-table-pagination").outerHeight();
        //可使用高度大于等于500时，隐藏搜索条
        // alert(window_height + "," + box_header_height + "," + alert_info_height + "," +table_heigth+","+ available_table_heigth);
        //1600X900时可用高度为400px左右s
        if(available_table_heigth < 409 && table_heigth > available_table_heigth){
            $(".alert-info").hide();
            //隐藏搜索框后的可使用高度
            available_table_heigth = window_height - box_header_height - nav_heigth - toolbar_heigth - $("#headDiv").outerHeight() - 2 * $(".fixed-table-pagination").outerHeight();
            $("#btn_show_search").show();
        }
        //添加滚动条
        $("#"+tableId).attr("style", 'display:block; max-height:' + available_table_heigth + 'px;overflow: auto;');
    },
    //调整表格大小--适用于TMS运单导航栏，操作栏页面TODO
    resizeWaybillTable:function(tableId){
        // alert($(".alert-info").length > 0);
        // alert($(".nav-tabs").length > 0);
        // alert($("#toolbar").length > 0);
        var window_height = $(window).height();
        var box_header_height = $(".box-header").outerHeight();
        var table_heigth = $("#"+tableId).outerHeight();
        var nav_heigth = $(".nav-tabs").outerHeight();//导航栏
        var toolbar_heigth = $("#toolbar").outerHeight();//操作栏
        //计算table可使用高度
        //隐藏搜索条前的可使用高度
        var available_table_heigth = window_height - box_header_height - nav_heigth - toolbar_heigth - $("#headDiv").outerHeight() - 2 * $(".fixed-table-pagination").outerHeight();
        //可使用高度大于等于500时，隐藏搜索条
        alert(window_height + "," + box_header_height + ","+table_heigth+","+ available_table_heigth);
        //添加滚动条
        $("#"+tableId).attr("style", 'display:block; max-height:' + available_table_heigth + 'px;overflow: auto;');
    },
    //成功消息提示
    toastrSuccess:function(message){
    	if($.isNull(message)){
    		message = "操作成功。";
    	}
    	$.showToastr(1,message);
    }, 
    //异常消息提示
    toastrError:function(message){
    	if($.isNull(message)){
    		message = "系统异常，请联系管理员。";
    	}
    	$.showToastr(2,message);
    },
    //警告消息提示
    toastrWarning:function(message){
    	$.showToastr(3,message);
    },
    //显示消息,对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
    showToastr:function(type,message){
    	var toastrType = "success";
    	switch(type){ 
			case 1: 
				toastrType = "success"; 
			break; 
			case 2:
				toastrType = "error"; 
			break; 
			case 3: 
				toastrType = "warning"; 
			break; 
		}; 
    	toastr.options = {  
    		   positionClass: "toast-bottom-center",  
	           timeOut: "4000" 
	    };  
	    toastr[toastrType]("<h4>" + message + "</h4>"); 
    },
    //显示模态框
    showModal:function(modalId){
    	$(modalId).modal({backdrop: 'static'});
    },
    //隐藏模态框
    hideModal:function(modalId){
    	$(modalId).modal('hide');
    },
    
    //全角转换为半角函数 
    ToCDB:function(str) {
    	
	    if(str != null) {
	    	var tmp = ""; 
		    for(var i=0;i<str.length;i++) { 
		    	if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375) { 
		    		tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
			    }else { 
			    	tmp += String.fromCharCode(str.charCodeAt(i)); 
			    } 
		    } 
		    return tmp
	    }
    },
    
    
    //判断JS对象是有值的
    isNotNull:function (obj) {
    	if (typeof (obj) == "undefined") {
    		return false;
    	} else if (obj == null) {
    		return false;
    	} else if (typeof(obj) == "string" && (obj.trim() == ""|| obj.trim() == "null")) {
    		return false;
    	} else if (obj instanceof Array && obj.length == 0) {
    		return false;
    	}
    	return true;
    },
    //判断JS对象是否为空
    isNull:function (obj) {
    	return !$.isNotNull(obj);
    },
    /**
     *判断str1字符串是否以str2为结束
     *@param str1 原字符串
     *@param str2 子串
     *@author pansen
     *@return 是-true,否-false
     */
    endWith:function(str1, str2){
     if(str1 == null || str2 == null){
      return false;
     }
     if(str1.length < str2.length){
      return false;
     }else if(str1 == str2){
      return true;
     }else if(str1.substring(str1.length - str2.length) == str2){
      return true;
     }
     return false;
    },
    /**
     *判断str1字符串是否以str2为开头
     *@param str1 原字符串
     *@param str2 子串
     *@author pansen
     *@return 是-true,否-false
     */
    startWith:function (str1, str2){
     if(str1 == null || str2 == null){
      return false;
     }
     if(str1.length < str2.length){
      return false;
     }else if(str1 == str2){
      return true;
     }else if(str1.substr(0, str2.length) == str2){
      return true;
     }
     return false;
    },
    /** 控制树形控件点击行伸缩、是否勾选 */
    monitorTreeRowClick:function (clickRow,treeId){
    	var goodsTypeTree = $('#' + treeId);
       //找到当前节点id
        var nodeid = clickRow.attr('data-nodeid');
        
        //获取当前节点对象
        var node = goodsTypeTree.treeview('getNode', nodeid);

        if(node.state.expanded){
            //处于展开状态则折叠
            goodsTypeTree.treeview('collapseNode', node.nodeId);
        } else {
            //展开
            goodsTypeTree.treeview('expandNode', node.nodeId);
        }
        if(node.state.checked){   
	        //设置不勾选
	    	goodsTypeTree.treeview('uncheckNode', node.nodeId);    
	    } else {
	    	//设置勾选
	    	goodsTypeTree.treeview('uncheckAll');  
	        //设置勾选
	    	goodsTypeTree.treeview('checkNode', node.nodeId);  
	    } 
	    goodsTypeTree.find(" .list-group-item[data-nodeid="+nodeid+"]").addClass("node-selected")
        goodsTypeTree.find(" .list-group-item[data-nodeid="+nodeid+"]").css({
            "color": "white",
            "background-color": "#428bca"
        });
        return node;
    },
    /** 控制树形控件默认选中多选或单选框 */
    doTreeDefaultChecked:function (defaultCheckedNodeArr,treeDateArr){
    	if($.isNotNull(defaultCheckedNodeArr) && $.isNotNull(treeDateArr)){
			var index;
			for (index in defaultCheckedNodeArr)
			{
				$.matchingTreeDefaultChecked(treeDateArr,defaultCheckedNodeArr[index]);
			}
		}
    },
    /** 对树形控件进行比对校验并执行默认勾选 */
    matchingTreeDefaultChecked:function (treeDateArr,defaultCheckedNodeId){
    	var index;
    	var state = {};
		for (index in treeDateArr)
		{
			if(defaultCheckedNodeId === treeDateArr[index].id){
			    state.checked = true;
		        treeDateArr[index].state = state;
			}
			if($.isNotNull(treeDateArr[index].nodes)){
			    $.matchingTreeDefaultChecked(treeDateArr[index].nodes,defaultCheckedNodeId);
			}
		}
    }
}

);
$( document ).ajaxComplete(function( event, xhr, settings ) {
	 try {
		 data = eval("(" + xhr['responseText'] + ")");
		 if(data.code == "9101"){
			 $("body").append(data.data);
		 }
	 } catch (err) {
	 }
});

//form 表单转成jsonObject
$.fn.serializeObject = function()    
{    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o[this.name]) {    
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {    
           o[this.name] = this.value || '';    
       }    
   });    
   return o;    
};


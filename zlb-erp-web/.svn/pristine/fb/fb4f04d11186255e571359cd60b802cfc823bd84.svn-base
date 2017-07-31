GoodsTypeTreeDialog.prototype.getGoodsTypeTreeUrl = '/publicData/goodsType/goodsTypeTree';
GoodsTypeTreeDialog.prototype.defaultCheckedNodeIds = null;
function GoodsTypeTreeDialog(defaultCheckedNodeIds,obj) {
	$.extend(this, obj);
	this.defaultCheckedNodeIds = defaultCheckedNodeIds;
	this.initGoodsTypeTree();
    this.bindListener();
}

GoodsTypeTreeDialog.prototype.initGoodsTypeTree = function() {
	var defaultCheckedNodeArr = this.defaultCheckedNodeIds;
    $.callAjax({
			url : this.getGoodsTypeTreeUrl,
			async:false,
			data : "",
			success : function(serverData) {
				$.doTreeDefaultChecked(defaultCheckedNodeArr,serverData);
				var GoodsTypeTree = $('#goods_type_tree');
				GoodsTypeTree.treeview({
					data : serverData,
					levels : 99,// 展开的层次
					showCheckbox: true,
					multiSelect: false,// 是否可以同时选择多个节点，行选中不是复选框选中
					showTags : false,// 需要配合tags来使用，如text: 'Parent 2', tags: ['7']
					showBorder: true,// 是否显示分割线
					enableLinks : true,// 鼠标放上去显示<a>链接样式
					onNodeSelected: function(event, node) {
					    /* if(node.state.expanded){
				           //处于展开状态则折叠
				            GoodsTypeTree.treeview('collapseNode', node.nodeId);
				        } else {
				            //展开
				            GoodsTypeTree.treeview('expandNode', node.nodeId);
				        }
					   if(node.state.checked){   
					        //设置不勾选
					    	$('#goods_type_tree').treeview('uncheckNode', node.nodeId);    
					    } else {
					    	//设置勾选
					    	$('#goods_type_tree').treeview('uncheckAll');  
					        //设置勾选
					    	$('#goods_type_tree').treeview('checkNode', node.nodeId);  
					    } */
					}
				   });
			}
		});
}

GoodsTypeTreeDialog.prototype.bindListener = function() {
    $('#goods_type_tree').parent().on("click",".list-group-item", function() {
        $.monitorTreeRowClick($(this),"goods_type_tree");
    });
    
    $("#btn_goodsType_cancel").on("click", function() {
       $.hideModal('#chooseGoodsTypeModal');
    });
}

GoodsTypeTreeDialog.prototype.showGoodsTypeTreeDialog = function() {
	$.showModal('#chooseGoodsTypeModal');
}
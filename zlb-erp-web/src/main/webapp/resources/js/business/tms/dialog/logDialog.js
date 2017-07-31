/**
 * 日志弹出框 by Tobin
 * @param {} obj
 */
function LogDialog(obj) {

	$.extend(this, obj);
	this.init();
}
LogDialog.prototype.init = function() {
	this.initTable();
}

LogDialog.prototype.operationLogUrl = '/tms/operationLog/list';
LogDialog.prototype.initTable = function() {
	$.pageTable({
				tableId : "#logTable",
				url : this.operationLogUrl,
				queryParams : this.queryParamsLog,
				onLoadSuccess : function(data) {
				},
				columns : [{
							align : 'center',
							field : 'disBill',
							title : '单据'
						}, {
							align : 'center',
							field : 'action',
							title : '操作动作'
						}, 
//						{
//							align : 'center',
//							field : 'operatorName',
//							title : '运营商'
//						},
						{
							align : 'center',
							field : 'modifierName',
							title : '操作人'
						},{
							align : 'center',
							field : 'mobileNo',
							title : '电话'
						},  {
							align : 'center',
							field : 'updateTime',
							title : '操作时间'
						}]
			});
}
LogDialog.prototype.show = function() {
	$('#logTable').bootstrapTable('refresh');
	$.showModal('#logDialog');
}
LogDialog.prototype.queryParamsLog = function(params) {
	var temp = {
		pageSize : params.limit, 
		offset :params.offset == 1 ? 0 : params.offset, 
		status : 2,
		sort : params.sort,
		order : params.order,
		bill : $('#bill_1').val(),
		type : '1'
	};
	return temp;
};
/**
 * 物流信息弹出框 by Tobin
 * @param {} obj
 */
function LogisticsDialog(obj) {

	$.extend(this, obj);
	this.init();
}
LogisticsDialog.prototype.init = function() {
	this.initTable();
}
LogisticsDialog.prototype.operationLogUrl = '/tms/logisticsLogs/list';
LogisticsDialog.prototype.initTable = function() {
	$.pageTable({
				tableId : "#logisticsTable",
				url : this.operationLogUrl,
				queryParams : this.queryParamsLog,
				onLoadSuccess : function(data) {
					if(data.total == 0){
						$("#logisticsTable  tr:not(:first)").html(""); 
					}
				},
				columns : [{
							title : '单据',
							formatter : function(value, row, index) {
								return childWaybill;
							}
						},{
							align : 'center',
							field : 'logDescribe',
							title : '描述'
						}, 
//						{
//							align : 'center',
//							field : 'operatorName',
//							title : '运营商'
//						}, 
						{
							align : 'center',
							field : 'creatorName',
							title : '操作人'
						},{
							align : 'center',
							field : 'mobileNo',
							title : '电话'
						}, {
							align : 'center',
							field : 'createTime',
							title : '操作时间'
						}]
			});
}
LogisticsDialog.prototype.show = function() {
	$('#logisticsTable').bootstrapTable('refresh');
//	this.initTable();
	$.showModal('#logisticsDialog');
}
var childWaybill ;
LogisticsDialog.prototype.queryParamsLog = function(params) {
	var temp = {
		pageSize : params.limit, 
		offset : params.offset? 0 : params.offset, 
		status : 2,
		sort : params.sort,
		order : params.order,
		dischildWaybillId : $('#bill_2').val()
	};
	childWaybill = $('#bill_2').val();
	
	return temp;
};
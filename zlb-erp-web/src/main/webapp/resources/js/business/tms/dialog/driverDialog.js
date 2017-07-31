/**
 * 司机弹出框 by Tobin
 * 
 * @param {}
 *            obj
 */
function DriverDialog(obj) {

	$.extend(this, obj);
	this.init();

}
DriverDialog.prototype.driverListUrl = '/tms/emp/list';
DriverDialog.prototype.init = function() {
	this.initTable();
	this.bindHideListener();
}
DriverDialog.prototype.bindHideListener = function() {
	$('#driverDialog').on('hide.bs.modal', function() {
				this.unbindListener();
			}.bind(this));
}
DriverDialog.prototype.initTable = function() {
	$.pageTable({
				selectItemName:'myDriverDialog',
				tableId : "#driverTable",
				url : this.driverListUrl,
				queryParams : this.queryParamsDriver,
				onLoadSuccess : function() {
					$("#btn_dialog_search_driver").removeClass("disabled");
				},
				columns : [{
							radio : true
						}, {
							field : 'uniqueKey',
							title : '编码'
						}, {
							align : 'center',
							field : 'cnName',
							title : '中文名'
						}, {
							align : 'center',
							field : 'mobileNo',
							title : '手机号码'
						}]
			});
}

DriverDialog.prototype.bindListener = function() {

	$("#btn_dialog_driver_save").on("click", function() {
				var arr = $("#driverTable").bootstrapTable('getSelections');

				if (arr.length == 1) {
					this.confirmCallback(arr[0]);
					$.hideModal('#driverDialog');
				} else {
					$.toastrWarning("请选择一条数据进行操作！");
				}
			}.bind(this));

	$("#btn_dialog_search_driver").on("click", function() {
				$('#driverTable').bootstrapTable('refresh');
			});
	$("#btn_dialog_clean_driver").on("click", function() {
				document.getElementById("form_dialog_driver").reset();
			});

}
DriverDialog.prototype.unbindListener = function() {
	$("#btn_dialog_driver_save").unbind();
	$("#btn_dialog_search_driver").unbind();
	$("#btn_dialog_clean_driver").unbind();
}
DriverDialog.prototype.confirmCallback = function(row) {
	$('#driver_xd').val(row.id);
	$('#driverName_xd').val(row.cnName);
	$('#driverPhone_xd').val(row.mobileNo);
};

DriverDialog.prototype.queryParamsDriver = function(params) {

	var cnName = $('#input_dialog_driver_name').val();
	var mobileNo = $('#input_dialog_driver_tel').val();
	var temp = {
		pageSize : params.limit,
		offset : params.offset == 1 ? 0 : params.offset,
		status : 2,
		sort : params.sort,
		order : params.order,
		occupationId : '40',
		enabled : '1',
		cnName : cnName,
		mobileNo : mobileNo
	};
	return temp;
};
DriverDialog.prototype.show = function(title) {
	if (title != null) {
		$('#driver_modal-title').text(title);
	} else {
		$('#driver_modal-title').text("司机列表");
	}
	$("#driverTable").bootstrapTable("refresh");
	$.showModal('#driverDialog');
	this.bindListener();
}

//司机弹出框隐藏时，清空搜索条件
$('#driverDialog').on('hidden.bs.modal', function () {
    $('#input_dialog_driver_name').val("");
    $('#input_dialog_driver_tel').val("");
})

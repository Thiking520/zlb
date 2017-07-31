var orderWavePickingManager = {
	// 是否重置分页偏移值0：否，1：是
	isResetOffset : 0,
	// 封装异步请求的所有ajax的URL地址
	URL : {
		// 跳转列表页
		initUrl : function() {
			return '';
		},
		// 分页获取出口单列表请求地址
		searchListByPageUrl : function() {
			return '/orderWavePicking/list';
		},
		deleteUrl : function() {
			return '/orderWavePicking/delete'
		},
		saveUpdateUrl : function() {
			return '/orderWavePicking/saveUpdate'
		},
		deleteUrl : function() {
			return '/orderWavePicking/delete'
		},
		searchUrl : function() {
			return '/orderWavePicking/search'
		}

	},
	/** 分页获拣货单列表* */
	searchListByPage : function() {
		// 分页组件
		$
				.pageTable({
					tableId : "#orderWavePickingTable",// 需要分页的table ID
					url : orderWavePickingManager.URL.searchListByPageUrl(),// 请求后台的URL（*）
					queryParams : queryParams,
					onLoadSuccess : function() {
						orderWavePickingManager.isResetOffset = 0;
						$("#btn_orderWavePicking_search").removeClass(
								"disabled");
					},
					onClickRow : function(row, tr) {
						id = row.id;
					},
                    onLoadError: function (status) {
                        $("#btn_orderWavePicking_search").removeClass("disabled");
                    },
					sortable : true,
					sortName : 'id',
					sortOrder : 'desc',
					columns : [
							{
								radio : true
							},
							{
								field : 'id',
								title : '波次号'
							},
							{
								field : 'startTime',
								title : '开始时间',
                                formatter : function(value, row, index) {
                                    return value.substring(0,5)
                                }

							},
							{
								field : 'stopTime',
								title : '结束时间',
                                formatter : function(value, row, index) {
									return value.substring(0,5)
                                }
							},
							{
								field : 'remark',
								title : '描述'
							},
							{
								field : 'createTime',
								title : '创建时间',
								formatter : function(value, row, index) {
                                    return orderWavePickingManager.format(value, "yyyy-MM-dd HH:mm:ss");
								}
							},
							{
								field : 'createName',
								title : '创建人'
							},
							{
								field : 'id',
								title : '操作',
								formatter : function(value, row, index) {
									// id += row.id + ",";
									var idss = row.id;
									var html ='<a id='
                                        + idss
                                        + ' class="btn btn-primary btn-sm edit_orderWavePicking" href="javascript:void(0)" onclick="orderWavePickingManager.editOrderWavePicking(this)" >编辑</a>' + '<a id='
											+ idss
											+ ' class="btn btn-danger btn-sm delete_orderWavePicking" href="javascript:void()" onclick="orderWavePickingManager.orderWavePickingdelete(this)">删除</a>'
											;
									return html;
								},
								events : 'operateEvents'

							}

					]

				});
	},
	format : function(time, format) {
		if (time != null && time != '') {
			var t = new Date(time);
			var tf = function(i) {
				return (i < 10 ? '0' : '') + i
			};
			return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
				switch (a) {
				case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
				case 'ss':
					return tf(t.getSeconds());
					break;
				}
				;
			}));
		}
		return null;
	},
	/** 删：删除* */
	orderWavePickingdelete : function(o) {
		$.dialogConfirm({
			message : '您确定要删除波次ID为[' + o.id + ']的波次吗?',
			callback : function(result) {
				if (result) {
					$.callAjax({
						type : "post",
						url : orderWavePickingManager.URL.deleteUrl() + "?id="
								+ o.id,

						success : function(data) {
							if (data.code != "0000") {
								$.toastrWarning(data.msg);
								$('#orderWavePickingTable').bootstrapTable(
										'refresh');
								return;
							}
							$('#orderWavePickingTable').bootstrapTable(
									'refresh');
							$.toastrSuccess(data.msg);
						},
						error : function() {
							$.toastrError();
						}
					});
				}
			}
		});

	},
	// 表单检验
	validateform : function() {
		// 表单验证start
		$('#addOrderWavePickingForm').bootstrapValidator({
			message : 'This value is not valid',
			feedbackIcons : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			fields : {
				startTime : {
					validators : {
						notEmpty : {
							message : '开始时间不能为空！'
						},
					}
				},
				stopTime : {
					validators : {
						notEmpty : {
							type : '结束时间不能为空！'
						},
					}
				},

			},
			excluded : [ ':disabled' ]
		});
		// 表单验证end
	},
	// 编辑波次
	editOrderWavePicking : function(o) {
		$("#myModalLabel03").html("编辑波次");
		$.callAjax({
			type : "post",
			url : orderWavePickingManager.URL.searchUrl() + "?id=" + o.id,
			success : function(data) {
				if (data.code != "0000") {
					$.toastrWarning("查询出错！");
				}
				$("#orderWavePickingId").val(data.data.id);
				var str = data.data.startTime.substring(0,5);
                var stp = data.data.stopTime.substring(0,5);
				$("#startTime").val( str);

				$("#stopTime").val(stp, "HH:mm:");
				$("#remark").val(data.data.remark);
				$.showModal('#addOrderWavePicking');
				return;
			},
			error : function() {
				$.toastrError();
			}
		});

	},
	bindEvent : function() {
        $(".glyphicon-remove").off().on('click',function () {
            $(this).parent().off();
            $(this).parent().prev().prev().val("");
        });
        // 绑定条件查询按钮事件
		$("#btn_orderWavePicking_search").on("click", function() {
			orderWavePickingManager.isResetOffset = 1;
			$('#orderWavePickingTable').bootstrapTable('refresh');
		});
		// 绑定清空查询条件
		$("#btn_orderWavePicking_clear").click(function() {
			$.clearForm("OrderWavePickingSearchForm");
		});
		//绑定键盘事件
    	$(document).keydown(function (event) {
    		if(event.keyCode==13){
    			 orderWavePickingManager.isResetOffset = 1;
    			 $('#orderWavePickingTable').bootstrapTable('refresh');
    		}
	    });
		$("#btn__add_orderWavePicking").click(function() {
            $("#orderWavePickingId").val("");
			$("#startTime").val("");
			$("#stopTime").val("");
			$("#remark").val("");
			$("#myModalLabel03").html("新增波次")
			$.showModal('#addOrderWavePicking');
		});

		$("#saveOrderWavePicking").click(function() {
			// var bootstrapValidator =
			// $("#addOrderWavePickingForm").data('bootstrapValidator');
			// bootstrapValidator.validate();
			var params = {
				'id' : $("#orderWavePickingId").val(),
				'startTime' : $('#startTime').val(),
				'stopTime' : $('#stopTime').val(),
				'remark' : $('#remark').val(),
			}
			if($('#startTime').val()==''){
                $.toastrWarning("请选择开始时间!");
                return;
			}
            if($('#stopTime').val()==''){
                $.toastrWarning("请选择结束时间!");
                return;
            }
			if($('#startTime').val()==$('#stopTime').val()){
                $.toastrWarning("开始和结束时间不能一样!");
				return;
			}
			$.callAjax({
				type : "post",
				url : orderWavePickingManager.URL.saveUpdateUrl(),
				data : params,
				success : function(data) {
					if (data.code != "0000") {
						$.toastrWarning(data.msg);
						return;
					}
					$.toastrSuccess(data.msg);
					$.hideModal('#addOrderWavePicking');
					$('#orderWavePickingTable').bootstrapTable('refresh');
				},
				error : function() {
					$.toastrError();
				}
			});

		});
	},
	// 初始化分页查询列表数据 ★★★分页主体列表★★★
	init : function() {
		// 初始化下拉框
		$(".form_datetime").datetimepicker({
            minuteStep: 5,
            maxView:2,
			format : "hh:ii",
			autoclose : true,
			todayBtn : true,
			startView : 1,
			pickerPosition : "bottom-left"
		});
		// orderWavePickingManager.validateform();
		orderWavePickingManager.searchListByPage();
	}
}
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {

	var wp = $("#wavePicking").val();

	// 自定义查询参数
	var temp = '{' // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			+ 'pageSize : "' + params.limit + '",' // 页面大小
			+ 'offset : "'
			+ (orderWavePickingManager.isResetOffset == 1 ? 0 : params.offset)
			+ '",' // 分页偏移值
			+ (wp == '' ? ('') : ('id : "' + wp + '",')) // 查询波次
			+ 'sort : "' + params.sort + '",' // 排序列
			+ 'order : "' + params.order + '"' // 顺序：升序还是降序
			+ '}';
	return (new Function("return " + temp))();// 字符串转为json格式返回
};

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
	// 删除商品
	'click .delete_orderWavePicking' : function(e, value, row, index) {


		orderWavePickingManager.orderWavePickingdelete(row.id);
	},
	// 编辑
	'click .edit_orderWavePicking' : function(e, value, row, index) {
		orderWavePickingManager.editOrderWavePicking(row.id);
	}
};

$(document).ready(function() {
	// 1、初始化加载列表数据
	orderWavePickingManager.init();
	// 2、初始化绑定增删改查事件
	orderWavePickingManager.bindEvent();
});
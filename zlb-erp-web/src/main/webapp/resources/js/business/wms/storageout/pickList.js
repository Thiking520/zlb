/**
 * Created by jiangfubing on 2017/4/13.
 */
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var pickListManager = {
    //是否重置分页偏移值0：否，1：是
    isResetOffset: 0,
    //封装异步请求的所有ajax的URL地址
    URL: {
        //跳转列表页
        initUrl: function () {
            return '';
        },
        //分页获取出口单列表请求地址
        searchListByPageUrl: function () {
            return '/wms/pick/list';
        },
        //查询分配人列表
        driverListUrl: function () {
            return '/tms/emp/list';
        },
        //拣货单分配
        pickFpUrl: function () {
            return '/wms/pick/pickIsSate'
        },
        //拣货完成确认
        pickCompleteUrl: function () {
            return '/wms/pick/pickComplete'
        },
        //作废
        pickCancellationUrl: function () {
            return '/wms/pick/pickCancellation'
        },
        //取消分派
        piclkCancelAssignUrl:function(){
            return '/wms/pick/piclkCancelAssign'
        },
        //批量导出
        pickExport: function () {
            return '/wms/pick/pickExport'
        },
        //打印拣货清单
        printPickUrl: function () {
            return '/wms/pick/print/pick'
        },
        //打印购物清单
        printShoppingUrl:function () {
            return '/wms/pick/print/shopping'
        },
        //打印面单
        printExpressUrl:function () {
            return '/wms/pick/print/express'
        },
        //拣货明细
        pickDetaillUrl:function () {
            return '/wms/pick/pickDetail'
        }
    },
    /**分页获拣货单列表**/
    searchListByPage: function () {
        //分页组件
        $.pageTable({
            tableId: "#pickListTable",//需要分页的table ID
            url: pickListManager.URL.searchListByPageUrl(),//请求后台的URL（*）
            queryParams: queryParams,
            onLoadSuccess: function () {
                pickListManager.isResetOffset = 0;
                $("#btn_pick_search").removeClass("disabled");
            },
            sortable: true,
            sortName: 'created',
            sortOrder: 'desc',
            columns: [/*{
             field: 'id',
             title: 'ID'
             }*/
                {
                    checkbox: true
                },
                {
                    field: 'pickCode',
                    title: '拣货单号',
                    formatter:function(value,row,index){
                        return '<a class="pick_a" href="javascript:void(0)">'+row.pickCode+'</a>';
                    },
                    events: 'operateEvents'
                }, {
                    field: 'descrip',
                    title: '描述'
                }, {
                    field: 'state',
                    title: '状态',
                    formatter: function (value, row, index) {
                        if (value == 10) {
                            return '新建'
                        }
                        if (value == 20) {
                            return '已下达'
                        }
                        if (value == 30) {
                            return '拣货中'
                        }
                        if (value == 98) {
                            return '已作废'
                        }
                        if (value == 99) {
                            return '拣货完成'
                        }
                    }
                }, {
                    field: 'pickFlag',
                    title: '拣货单打印标记',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return '已打印'
                        } else {
                            return '未打印'
                        }
                    }
                }, {
                    field: 'expressFlag',
                    title: '面单打印标记',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return '未打印'
                        } else if (value == 1) {
                            return '已打印'
                        }
                    }
                },
                {
                    field: 'pickName',
                    title: '拣货员'
                }, {
                    field: 'completeTime',
                    title: '拣货完成时间',
                    formatter: function (value, row, index) {
                        return pickListManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }/*,
                {
                    field: 'operator',
                    title: '运营商'
                }, {
                    field: 'warehouseCode',
                    title: '仓库编码'
                }, {
                    field: 'created',
                    title: '创建时间',
                    formatter: function (value, row, index) {
                        return pickListManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }, {
                    field: 'creator',
                    title: '创建人'
                }, {
                    field: 'modified',
                    title: '最后修改时间',
                    formatter: function (value, row, index) {
                        return pickListManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }, {
                    field: 'modifier',
                    title: '最后修改人'
                }*/]


        });
    },
    //查询负责列表
    searchEmp: function () {
        $.pageTable({
            tableId: "#empList",//需要分页的table ID
            url: pickListManager.URL.driverListUrl(),//请求后台的URL（*）
            queryParams: queryParamsEmp,
            onLoadSuccess: function () {
                pickListManager.isResetOffset = 0;
                $("#btn_search_emp").removeClass("disabled");
            },
            columns: [{
                radio: true
            }, {
                field: 'uniqueKey',
                title: 'key值'
            }, {
                align: 'center',
                field: 'cnName',
                title: '中文名'
            }, {
                align: 'center',
                field: 'mobileNo',
                title: '手机号码'
            }
            ]
        });
    },
    format: function (time, format) {
        if (time != null && time != '') {
            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
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
	// 批量打印面单
	pickbillPrint : function(pickCode) {
		// 触发Ajax
		var params = "?pickCode=" + pickCode;
		var contextPath = $("#contextPath").val();
		// 请求打印
		window.open(contextPath + pickListManager.URL.printPickUrl()
						+ params);

	},

    //打印购物清单
    shoppingListPrint:function (pickCode) {
        // 触发Ajax
        var params = "?pickCode=" + pickCode;
        var contextPath = $("#contextPath").val();
        // 请求打印
        window.open(contextPath + pickListManager.URL.printShoppingUrl()+params);

    },
    //打印面单
    expressPrint:function (pickCode) {
        var flag="0"
        // 触发Ajax
        var params = "?pickCode=" + pickCode+"&flag="+flag;
        var contextPath = $("#contextPath").val();
        // 请求打印
        window.open(contextPath + pickListManager.URL.printExpressUrl()+params);

    },
    //查看拣货明细
    pickDetail:function (pickCode) {
        $.showModal("#pickDetailModel");
        $.callAjax({
            type: "post",
            url: pickListManager.URL.pickDetaillUrl() + "?pickCode=" + pickCode ,
            success: function (data) {
                $("#pickDetailTable").find('tbody').remove();
                $("#pickDetailTable").find('caption').remove();
                $("#pickDetailTable").append("<caption>拣货单号:<FONT SIZE='4'>"+pickCode+"</FONT></caption>") ;
                var code = data.code;
                if (code == "0000") {
                    $("#pick_cap_code").val(pickCode);
                    $(data.data).each(function(){
                        $("#pickDetailTable").append(
                            "<tr>" +
                            "<td>"+$(this)[0].outOrderNo+"</td>" +
                            "<td>"+$(this)[0].locationCode+"</td>" +
                            "<td>"+$(this)[0].skuCode+"</td>"+
                            "<td>"+$(this)[0].skuName+"</td>"+
                            "<td>"+$(this)[0].price+"</td>"+
                            "<td>"+$(this)[0].qty+"</td>"+
                            "<td>"+$(this)[0].boxNo+"</td>"+
                            "</tr>")
                    });
                }
            },
            error: function () {
                $.toastrError();
            }
        });
    },
    bindEvent: function () {
        //绑定分派人条件查询按钮事件
        $("#btn_search_emp").on("click", function () {
            $("#btn_search_emp").addClass("disabled");
            pickListManager.isResetOffset = 1;
            $('#empList').bootstrapTable('refresh');
        });
        //绑定条件查询按钮事件
        $("#btn_pick_search").on("click", function () {
            $("#btn_pick_search").addClass("disabled");
            pickListManager.isResetOffset = 1;
            $('#pickListTable').bootstrapTable('refresh');
        });
        //绑定清空查询条件
        $("#btn_pick_clear").click(function () {
           $.clearForm("pickSearchForm");
        });
        //批量导出
        $("#btn_pick_export").click(function () {
            var contextPath = $("#contextPath").val();
            $("#pickSearchForm").attr('action',contextPath+pickListManager.URL.pickExport());
            $("#pickSearchForm").submit();
        })
        //弹出分配
        $("#btn_pick_fp").click(function () {
            var ids = $.getIdSelections("#pickListTable", "id");
            var state = $.getIdSelections("#pickListTable", "state");
            if (ids == null || ids == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            for(var i =0;i<state.length;i++){
                if(state[i]!=10 && state!=20){
                    $.toastrWarning('只有新建和已下达状态的拣货单才允许分派!');
                    return;
                }
            }
            $.showModal("#pickFpModel");

        });
        $("#clear_btn_pickemp").click(function(){
            $.clearForm("empForm");
        });
        //保存分派人
        $("#btn_pickQrEmp").click(function () {
            var ids = $.getIdSelections("#pickListTable", "id");
            var pickCode = $.getIdSelections("#pickListTable", "pickCode")
            var pickName = $('#pick_name').val();
            var pickEmpCode = $('#pick_emp_code').val();
            if(pickEmpCode!=null && pickEmpCode!=''){
                $.callAjax({
                    type: "post",
                    url: pickListManager.URL.pickFpUrl() + "?ids=" + ids + "&pickName=" + pickName+"&pickEmpCode="+pickEmpCode +"&pickCode="+pickCode,
                    success: function (data) {
                        var code = data.code;
                        if (code != "0000") {
                            $.toastrSuccess(data.msg);
                        } else {
                            //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                            $.toastrWarning(data.msg);
                            $("#pickFpModel").modal("hide");
                            $('#pickListTable').bootstrapTable('refresh');
                        }
                    },
                    error: function () {
                        $.toastrError();
                    }
                });
            }else{
                $.toastrWarning("请选择分派人！");
            }


        })
        //调出员工负责人列表
        $("#pick_div_emp").click(function () {
            pickListManager.searchEmp();
            document.getElementById("empForm").reset();
            $('#empList').bootstrapTable('refresh');
            $('#myModal03').modal();
        })
        //拣货完成确认
        $("#btn_pick_ok").click(function () {
            var ids = $.getIdSelections("#pickListTable", "id");
            var pickCode = $.getIdSelections("#pickListTable", "pickCode");
            var state = $.getIdSelections("#pickListTable", "state");
            if (ids.length == 0 || ids == null) {
                $.toastrWarning('请先选择记录再操作！');
                return
            }
            for( var i =0;i<state.length;i++){
                if(state[i]!='20'){
                    $.toastrWarning('只有已下达的拣货单才能完成拣货确认！');
                    return
                }
            }
            $.dialogConfirm({
                message: '您确定确认拣货完成吗?',
                callback: function (result) {
                    if (result) {
                        $.callAjax({
                            type: "post",
                            url: pickListManager.URL.pickCompleteUrl() + "?ids=" + ids +"&pickCode="+pickCode,
                            success: function (data) {
                                var code = data.code;
                                if (code == "002") {
                                    $.toastrSuccess(data.msg);
                                    $('#pickListTable').bootstrapTable('refresh');
                                } else {
                                    //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                                    $.toastrWarning(data.msg);
                                }
                            },
                            error: function () {
                                $.toastrError();
                            }
                        })
                    }
                }
            })
        })
        $("#pickCancellation").click(function () {
            var ids = $.getIdSelections("#pickListTable", "id");
            if (ids.length == 0 || ids == null) {
                $.toastrWarning('请先选择记录再操作！');
                return
            }
            $.dialogConfirm({
                message: '作废后将无法恢复，请您确认真要作废吗？',
                callback: function (result) {
                    if (result) {
                        $.callAjax({
                            type: "post",
                            url: pickListManager.URL.pickCancellationUrl() + "?ids=" + ids,
                            success: function (data) {
                                var code = data.code;
                                if (code == "002") {
                                    $.toastrSuccess(data.msg);
                                    $('#pickListTable').bootstrapTable('refresh');
                                    return;
                                }
                                    //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                                    $.toastrWarning(data.msg);
                            },
                            error: function () {
                                $.toastrError();
                            }
                        })
                    }
                }
            })
        })
        //打印拣货单
    	$("#btn_pick_print").on("click", function() {
			//$("#btn_operation_print").addClass("disabled");
			var pickCode = $.getIdSelections("#pickListTable", "pickCode");
			if (pickCode == null || pickCode == '') {
				$.toastrWarning('请先选择记录再操作！');
				return false;
			}

			pickListManager.pickbillPrint(pickCode);
            setTimeout($('#pickListTable').bootstrapTable('refresh'),1000)
		});
        //打印购物清单
        $("#btn_shopping_print").on("click", function() {
            var pickCode = $.getIdSelections("#pickListTable", "pickCode");
            if (pickCode == null || pickCode == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            pickListManager.shoppingListPrint(pickCode);
        });
        //打印面单
        $("#btn_express_print").on("click", function() {
            var pickCode = $.getIdSelections("#pickListTable", "pickCode");
            if (pickCode == null || pickCode == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            pickListManager.expressPrint(pickCode);
            setTimeout($('#pickListTable').bootstrapTable('refresh'),1000)
        });
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
        pickListManager.searchListByPage();
    }
}
//负责人查询参数
var queryParamsEmp = function (params) {

    var cnName = $('#name_emp').val();
    var mobileNo = $('#tel_emp').val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: pickListManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        status: 2,//状态
        sort: params.sort,
        order: params.order,
        occupationId: null,
        enabled: '1',
        cnName: cnName,
        mobileNo: mobileNo
    };
    return temp;
};
$("#emp_save").click(function () {
    if ($("#empList").bootstrapTable('getSelections').length == 1) {
        $.map($("#empList").bootstrapTable('getSelections'), function (row) {
            $('#pick_emp_code').val(row.id);
            $('#pick_name').val(row.cnName);
            $('#myModal03').modal('hide');
        });
    } else {
        $.toastrWarning("请选择一条数据进行操作！");
    }

});
//取消分派
$("#cancelAssign").click(function () {
    var ids = $.getIdSelections("#pickListTable", "id");
    var pickCode =  $.getIdSelections("#pickListTable", "pickCode");
    if (ids.length == 0 || ids == null) {
        $.toastrWarning('请先选择记录再操作！');
        return
    }
    $.dialogConfirm({
        message: '您确定要选中的拣货单取消分派吗？',
        callback: function (result) {
            if (result) {
                $.callAjax({
                    type: "post",
                    url: pickListManager.URL.piclkCancelAssignUrl() + "?ids=" + ids+"&pickCode="+pickCode,
                    success: function (data) {
                        var code = data.code;
                        if (code == "002") {
                            $.toastrSuccess(data.msg);
                            $('#pickListTable').bootstrapTable('refresh');
                        } else {
                            //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                            $.toastrWarning(data.msg);
                        }
                    },
                    error: function () {
                        $.toastrError();
                    }
                })
            }
        }
    })
})
//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
    //自定义查询参数
    var pickCode = $("#pickCode").val();
    var pickFlag = $("#pickFlag").val();
    var expressFlag = $("#expressFlag").val();
    var state = $("#state").val();
    //时间区间
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: pickListManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        pickCode: pickCode,//拣货单号
        pickFlag: pickFlag,//拣货单打印标记
        expressFlag: expressFlag,//面单打印标记
        state: state,//状态
        sort: params.sort,
        order: params.order
    };
    return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
    //查看拣货单
    'click .pick_a': function (e, value, row, index) {
        pickListManager.pickDetail(row.pickCode)
    }

};

$(document).ready(function () {
    //1、初始化加载列表数据
    pickListManager.init();
    //2、初始化绑定增删改查事件
    pickListManager.bindEvent();
});
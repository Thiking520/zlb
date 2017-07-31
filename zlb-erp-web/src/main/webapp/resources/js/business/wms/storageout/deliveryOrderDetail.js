/**
 * Created by jiangfubing on 2017/4/13.
 */
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var deliveryOrderDetailManager = {
    //是否重置分页偏移值0：否，1：是
    isResetOffset: 0,
    //封装异步请求的所有ajax的URL地址
    URL: {
        //分页获取出口单明细列表请求地址
        searchListByPageUrl: function () {
            return '/wms/deliveryorderDetail/list';
        },
        //出库订单明细保存请求地址
        updateDeliveryOrderDetail: function () {
            return '/wms/deliveryorderDetail/updateDeliveryOrderDetail';
        },
        //预分配列表请求地址
        searchListPreAllocatedRulesUrl: function () {
            return '/wms/preAllocatedRules/list';
        },
        //分配策略列表请求地址
        searchListAllocatedRulesUrl: function () {
            return '/wms/allocatedRules/list';

        },
        //供应商
        searchListSupplierUrl: function () {
            return '/supplier/list';
        }
    },
    /**货品明细**/
    searchListByPage: function () {
        //分页组件

        $.pageTable({
            tableId: "#deliveryorderDetailListTbable",//需要分页的table ID
            toolbar: '#toolbar',
            toolbarAlign: 'right',
            queryParams: queryParams,
            url: deliveryOrderDetailManager.URL.searchListByPageUrl(),//请求后台的URL（*）
            onLoadSuccess: function (data) {
                deliveryOrderDetailManager.isResetOffset = 0;
                if (data.rows.length > 0) {
                    deliveryOrderDetailManager.setdeliveryOrderDetail(data.rows[0]);
                }else {
                    $("#saveDeliveryOrderDetail").addClass("disabled");
                }
            },
            onClickRow: function (row, tr) {
                deliveryOrderDetailManager.setdeliveryOrderDetail(row, tr);
            },
            sortable: true,
            sortName: 'detail_Row',
            sortOrder: 'asc',
            columns: [
                {
                    field: 'detailRow',
                    title: '行号'
                }, {
                    field: 'skuCode',
                    title: '货品编码'

                },
                {
                    field: 'skuName',
                    title: '商品名称'

                },
                {
                    field: 'planQty',
                    title: '计划数量'

                },
                {
                    field: 'allocatedQty',
                    title: '分配数量'

                },
                {
                    field: 'pickQty',
                    title: '拣货数量'

                },
                {
                    field: 'stockState',
                    title: '库存状态',
                    formatter: function (value, row, index) {
                       if(value==10){
                           return '良品'
                       }
                       if(value==20){
                           return '残品'
                       }
                    }


                },
                {
                    field: 'proDate',
                    title: '生产日期',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd");
                    }

                },
                {
                    field: 'failDate',
                    title: '失效日期',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd");
                    }

                },
                {
                    field: 'storageDate',
                    title: '入库日期',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd");
                    }

                },
                {
                    field: 'proBatchNo',
                    title: '生产批次号'

                },
                {
                    field: 'supplier',
                    title: '供应商'

                },
                {
                    field: 'preAllocatedRulesName',
                    title: '预分配策略'

                },
                {
                    field: 'allocatedRulesName',
                    title: '分配策略'

                },
                {
                    field: 'price',
                    title: '单价'

                },
                {
                    field: 'discountPrice',
                    title: '优惠金额'

                },
                {
                    field: 'packageNo',
                    title: '套餐编号'

                },
                {
                    field: 'orderDetailRemark',
                    title: '备注'

                }
            ]
        });

    },
    //预分配列表
    searchListSupplier: function () {
        $.pageTable({
            tableId: "#supplierTable",//需要分页的table ID
            toolbar: '#toolbar',
            toolbarAlign: 'right',
            queryParams: queryParamSupplier,
            url: deliveryOrderDetailManager.URL.searchListSupplierUrl(),//请求后台的URL（*）
            onLoadSuccess: function () {
                deliveryOrderDetailManager.isResetOffset = 0;
            },
            sortable: true,
            sortName: 'id',
            sortOrder: 'desc',
            columns: [
                {
                    radio: true
                },
                {
                    field: 'supplierCode',
                    title: '供应商编码',

                },
                {
                    field: 'supplier',
                    title: '供应商名称',

                },
                {
                    field: 'goodsName',
                    title: '供应商品类别'
                }
            ]
        });
    },
    searchListAllocatedRules: function () {
        $.pageTable({
            tableId: "#allocatedRulesTable",//需要分页的table ID
            toolbar: '#toolbar',
            toolbarAlign: 'right',
            queryParams: queryParamsAllocatedRules,
            url: deliveryOrderDetailManager.URL.searchListAllocatedRulesUrl(),//请求后台的URL（*）
            onLoadSuccess: function () {
                deliveryOrderDetailManager.isResetOffset = 0;
                $("#btn_search_allocated").removeClass("disabled");
            },
            sortable: true,
            sortName: 'id',
            sortOrder: 'desc',
            columns: [
                {
                    radio: true
                },
                {
                    field: 'rulesCode',
                    title: '规则编码',

                },
                {
                    field: 'rulesName',
                    title: '规则名称'
                }
            ]
        });
    },
    searchListPreAllocatedRules: function () {
        $.pageTable({
            tableId: "#preAllocatedRulesTable",//需要分页的table ID
            toolbar: '#toolbar',
            toolbarAlign: 'right',
            queryParams: queryParamsPreAllocatedRules,
            url: deliveryOrderDetailManager.URL.searchListPreAllocatedRulesUrl(),//请求后台的URL（*）
            onLoadSuccess: function () {
                deliveryOrderDetailManager.isResetOffset = 0;
            },
            sortable: true,
            sortName: 'id',
            sortOrder: 'desc',
            columns: [
                {
                    radio: true
                },
                {
                    field: 'rulesCode',
                    title: '规则编码',

                },
                {
                    field: 'rulesName',
                    title: '规则名称'
                }
            ]
        });
    },

    //获取一行数据放入表单
    setdeliveryOrderDetail: function (row, tr) {
        $("#deliveryorderDetailId").attr("value", row.id)
        $("#detailRow").val(row.detailRow);
        $("#price").val(row.price);
        $("#skuCode").val(row.skuCode);
        $("#discountPrice").val(row.discountPrice);
        $("#omsRow").val(row.omsRow);
        $("#orderDetailRemark").val(row.orderDetailRemark);
        $("#packageNo").val(row.packageNo);
        $("#proDate").val(deliveryorderManager.format(row.proDate, "yyyy-MM-dd"));
        $("#failDate").val(deliveryorderManager.format(row.failDate, "yyyy-MM-dd"));
        $("#storageDate").val(deliveryorderManager.format(row.storageDate, "yyyy-MM-dd"));
        $("#proBatchNo").val(row.proBatchNo);
        $("#stockBatchNo").val(row.stockBatchNo);
        $("#planQty").val(row.planQty);
        $("#skuName").val(row.planQty);
        $("#pickQty").val(row.pickQty);
        $("#skuName").val(row.skuName);
        $("#supplierName1").val(row.supplier);
        $("#supplierCode1").val(row.supplierCode)
        $("#preAllocatedRulesCode").val(row.preAllocatedRulesCode);
        $("#preAllocatedRulesName").val(row.preAllocatedRulesName);
        $("#allocatedQty").val(row.allocatedQty);
        $("#unit").val(row.unit);
        $("#stockState").val(row.stockState==''?'10':row.stockState);
        $("#allocatedRulesCode").val(row.allocatedRulesCode);
        $("#allocatedRulesName").val(row.allocatedRulesName);

    },
    bindEvent: function () {
        //时间控件X事件
        $(".glyphicon-remove").off().on('click',function () {
            $(this).parent().off();
            $(this).parent().prev().prev().val("");
        });
        var deliveryorderState = $("#deliveryorderState").val();
        if (deliveryorderState == 20) {
            $("#saveDeliveryOrderDetail").removeAttr("disabled");//将按钮可用
        }
        //查询分配规则按钮事件
        $("#btn_search_allocated").on("click", function () {
            $("#btn_search_allocated").addClass("disabled");
            deliveryOrderDetailManager.isResetOffset = 1;
            $('#allocatedRulesTable').bootstrapTable('refresh');
        });
        //分配规则按钮清空
        $("#clear_btn_allocated").click(function () {
            $.clearForm("fromModal04");
        });

        //分配规则保存按钮
        $("#driver_allocated_save").off().on("click", function () {
            var rulesCode = $.getIdSelections("#allocatedRulesTable", "rulesCode");
            var rulesName = $.getIdSelections("#allocatedRulesTable", "rulesName");
            if (rulesCode.length == 0) {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            } else {
                $("#allocatedRulesCode").val(rulesCode);
                $("#allocatedRulesName").val(rulesName)
                $.hideModal('#allocatedRulesModel');
            }
        });
        //查询预分配规则按钮事件
        $("#btn_search_rules").on("click", function () {
            //$("#btn_search_rules").addClass("disabled");
            deliveryOrderDetailManager.isResetOffset = 1;
            $('#preAllocatedRulesTable').bootstrapTable('refresh');
        });
        //预分配规则清空按钮
        $("#clear_btn_rulesCode").click(function () {
            $.clearForm("fromModal02");
        });
        //预分配规则保存按钮
        $("#driver_rulesCode_save").off().on("click", function () {
            var rulesCode = $.getIdSelections("#preAllocatedRulesTable", "rulesCode");
            var rulesName = $.getIdSelections("#preAllocatedRulesTable", "rulesName");
            if (rulesCode.length == 0) {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            } else {
                $("#preAllocatedRulesCode").val(rulesCode);
                $("#preAllocatedRulesName").val(rulesName)
                $.hideModal('#locatedRulesModel');
            }

        });
        //供应商
        $("#clickSupplier").click(function () {
            $.showModal('#supplierModel');
            $.clearForm("fromModal03");
            deliveryOrderDetailManager.searchListSupplier();
            $('#supplierTable').bootstrapTable('refresh');//供应商列表
        });
        //供应商清空按钮
        $("#btn_search_clear").click(function () {
            $.clearForm("fromModal03");
        });
        $("#btn_search_supplier").on("click", function () {
            var shipper = $("#shipper").val();
           // $("#btn_search_supplier").addClass("disabled");
            deliveryOrderDetailManager.isResetOffset = 1;
            $('#supplierTable').bootstrapTable('refresh');
        });
        //供应商保存按钮
        $("#driver_supplier_save").off().click(function () {
            var supplierCode = $.getIdSelections("#supplierTable", "supplierCode");
            var shipper = $.getIdSelections("#supplierTable", "supplier");
            if (supplierCode.length == 0) {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            } else {
                $("#supplierCode1").val(supplierCode);
                $("#supplierName1").val(shipper)
                $.hideModal('#supplierModel');
            }
        })
        //分配策略点击事件
        $("#clickAllocated").click(function () {
            $.clearForm("fromModal04");
            deliveryOrderDetailManager.isResetOffset = 1;
            deliveryOrderDetailManager.searchListAllocatedRules();  //分配列表
            $('#allocatedRulesTable').bootstrapTable('refresh');
            $.showModal("#allocatedRulesModel");
        })
        //预分配策略点击事件
        $("#clickPreAllocated").click(function () {
            $.clearForm("fromModal02");
            deliveryOrderDetailManager.isResetOffset = 1;
            deliveryOrderDetailManager.searchListPreAllocatedRules();  //预分配列表
            $('#preAllocatedRulesTable').bootstrapTable('refresh');
            $.showModal("#locatedRulesModel");
        })
        //保存事件
        $("#saveDeliveryOrderDetail").click(function () {
            var detailId = $("#deliveryorderDetailId").val()
            var deliveryorderId = $("#deliveryorderId").val(); //出库订单ID
            var OutOrderNo = $("#deliveryorderOutOrderNo").val(); //出库订单号
            var detailRow = $("#detailRow").val();
            var skuName = $("#skuName").val();
            var price = $("#price").val();
            var skuCode = $("#skuCode").val();
            var discountPrice = $("#discountPrice").val();
            var omsRow = $("#omsRow").val();
            var orderDetailRemark = $("#orderDetailRemark").val();
            var packageNo = $("#packageNo").val();
            var proDate = $("#proDate").val();  //生厂日期
            var failDate = $("#failDate").val(); //失效日期
            var storageDate = $("#storageDate").val(); //入库日期
            var proBatchNo = $("#proBatchNo").val();
            var supplier = $("#supplierName1").val();//供应商
            var supplierCode = $("#supplierCode1").val();  //供应商编码
            var stockBatchNo = $("#stockBatchNo").val();  //库存批次号
            var stockState = $("#stockState").val();  //库存状态
            var planQty = $("#planQty").val();
            var pickQty = $("#pickQty").val();
            var preAllocatedRulesCode = $("#preAllocatedRulesCode").val(); //预分配策略编码
            var preAllocatedRulesName = $("#preAllocatedRulesName").val(); //预分配策略名称
            var allocatedQty = $("#allocatedQty").val(); // 分配数量
            var unit = $("#unit").val(); //单位
            var allocatedRulesCode = $("#allocatedRulesCode").val(); //分配策略编码
            var allocatedRulesName = $("#allocatedRulesName").val();  //分配策略名称


            param = {
                id: detailId,
                OutOrderNo: OutOrderNo,
                detailRow: detailRow,
                skuName: skuName,
                price: price,
                skuCode: skuCode,
                discountPrice: discountPrice,
                omsRow: omsRow,
                orderDetailRemark: orderDetailRemark,
                packageNo: packageNo,
                proDate: proDate,
                failDate: failDate,
                storageDate: storageDate,
                proBatchNo: proBatchNo,
                supplier: supplier,
                stockBatchNo: stockBatchNo,
                stockState: stockState,
                planQty: planQty,
                pickQty: pickQty,
                preAllocatedRulesCode: preAllocatedRulesCode,
                preAllocatedRulesName: preAllocatedRulesName,
                allocatedQty: allocatedQty,
                unit: unit,
                allocatedRulesCode: allocatedRulesCode,
                allocatedRulesName: allocatedRulesName,
                supplierCode: supplierCode
            },
                //保存明细分配批次
                $.callAjax({
                    type: "post",
                    data: param,
                    url: deliveryOrderDetailManager.URL.updateDeliveryOrderDetail(),
                    success: function (data) {
                        var code = data.code;
                        if (code == "001") {
                            $.toastrSuccess('操作成功!');
                            return;
                        } else {
                            $.toastrWarning(data.msg);
                        }
                    },
                    error: function () {
                        $.toastrError();
                    }
                });


        })
    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
        //初始化下拉框
        $(".form_datetime").datetimepicker({
            minView: "month", //选择日期后，不会再跳转去选择时分秒
            language:  'zh-CN',  //中文显示
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });
        $.fn.datetimepicker.dates['zh-CN'] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今天",
            suffix: [],
            meridiem: ["上午", "下午"]
        };
        deliveryOrderDetailManager.searchListByPage();



    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
    //自定义查询参数
    var outOrderNo = $("#deliveryorderOutOrderNo").val();  //出库订单ID
    var state = $("#deliveryorderState").val(); //出库订单状态
    //时间区间
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: deliveryOrderDetailManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        outOrderNo: outOrderNo
    };
    return temp;
};
//预分配规则查询参数
var queryParamsPreAllocatedRules = function (params) {
    var rulesCode = $("#rulesCode").val();
    var rulesName = $("#rulesName").val();
    var tempPre = {
        pageSize: params.limit,   //页面大小
        offset: deliveryOrderDetailManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        rulesCode: rulesCode,
        rulesName: rulesName,
        disabled:0
    };
    return tempPre;
}
//分配规则查询参数
var queryParamsAllocatedRules = function (params) {
    var allocatedCode = $("#allocatedCode").val();
    var allocatedName = $("#allocatedName").val();
    var tempAllocated = {
        pageSize: params.limit,   //页面大小
        offset: deliveryOrderDetailManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        rulesCode: allocatedCode,
        rulesName: allocatedName,
        disabled:0
    };
    return tempAllocated;
}
//供应商查询参数
var queryParamSupplier = function (params) {
    var supplierCode = $("#supplierCode").val();
    var supplier = $("#shipper").val();
    var tempSupplier = {
        pageSize: params.limit,   //页面大小
        offset: deliveryOrderDetailManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        supplierCode: supplierCode, //供应商编码
        supplier: supplier  //供应商名称

    };
    return tempSupplier;
}
//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {};

$(document).ready(function () {
    //1、初始化加载列表数据
    deliveryOrderDetailManager.init();
    //2、初始化绑定增删改查事件
    deliveryOrderDetailManager.bindEvent();
});
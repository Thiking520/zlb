/**
 * Created by jiangfubing on 2017/4/13.
 */
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var deliveryOrderDistributeManager = {
    //是否重置分页偏移值0：否，1：是
    isResetOffset: 0,
    //封装异步请求的所有ajax的URL地址
    URL: {
        //分页获取出口单明细列表请求地址
        searchListByPageUrl: function () {
            return '/wms/deliveryOrderDistribute/list';
        },
        searchWmsDeliveryOrderDistributeDetail: function () {
            return '/wms/deliveryOrderDistribute/wmsDeliveryOrderDistributeDetail';
        }

    },
    /**货品明细**/
    searchListByPage: function () {
        //分页组件

        $.pageTable({
            tableId: "#deliveryOrderDistributeTable",//需要分页的table ID
            toolbar: '#toolbar',
            toolbarAlign: 'right',
            queryParams: queryParams,
            url: deliveryOrderDistributeManager.URL.searchListByPageUrl(),//请求后台的URL（*）
            onLoadSuccess: function (data) {
                deliveryOrderDistributeManager.isResetOffset = 0;
                if(data.rows.length>0){
                  deliveryOrderDistributeManager.setdeliveryOrderDetail(data.rows[0]);
                }
            },
            onClickRow: function (row, tr) {
                deliveryOrderDistributeManager.setdeliveryOrderDetail(row, tr);
            },
            sortable: true,
            sortName: 'id',
            sortOrder: 'desc',
            columns: [
                {
                    field: 'detailRow',
                    title: '行号',
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                }, {
                    field: 'outOrderNo',
                    title: '出库单号'
                }, {
                    field: 'skuCode',
                    title: '货品编码'

                },
                {
                    field: 'skuName',
                    title: '商品名称'

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
                    field: 'skuStockBatchNo',
                    title: '库位批次号'

                },
                {
                    field: 'location',
                    title: '库位'

                },
                {
                    field: 'warehouseCode',
                    title: '仓库编码'

                }/*,
                {
                    field: 'created',
                    title: '创建时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }


                },
                {
                    field: 'modified',
                    title: '最后修改时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                },
                {
                    field: 'modifier',
                    title: '最后修改人'

                }*/
            ]
        });

    },
    //获取一行数据放入表单
    setdeliveryOrderDetail: function (row) {
        debugger;
        $.callAjax({
            type:"post",
            url : deliveryOrderDistributeManager.URL.searchWmsDeliveryOrderDistributeDetail()+"?outOrderNo="+row.outOrderNo+"&skuCode="+row.skuCode+"&skuStockBatchNo="+row.skuStockBatchNo,
            success : function(data){
                $("#skuName").val(row.skuName);
                $("#price1").val(data.data.price);
                $("#discountPrice1").val(data.data.discountPrice);
                $("#skuCode").val(row.skuCode);
                $("#outOrderNo1").val(row.outOrderNo);
                $("#packageNo1").val(data.data.packageNo);
                $("#proDate1").val(deliveryorderManager.format(data.data.proDate, "yyyy-MM-dd HH"));
                $("#failDate1").val(deliveryorderManager.format(data.data.failDate, "yyyy-MM-dd HH"));
                $("#storageDate1").val(deliveryorderManager.format(data.data.storageDate, "yyyy-MM-dd"));
                $("#proBatchNo1").val(data.data.proBatchNo);
                $("#stockBatchNo1").val(row.skuStockBatchNo);
                $("#supplier1").val(data.data.supplier);
                $("#stockState1").val(data.data.stockState);
                $("#allocatedQty1").val(row.allocatedQty);
                $("#unit").val(row.unit);
                $("#location").val(row.location);
                $("#pickQty1").val(row.pickQty);
            },
            error : function(){
                $.toastrError();
            }
        });
    },
    bindEvent: function () {
        var deliveryorderState = $("#deliveryorderState").val();
        if (deliveryorderState == 20) {
            $("#saveDeliveryOrderDetail").removeAttr("disabled");//将按钮可用
        }

    },
    //初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
        deliveryOrderDistributeManager.searchListByPage();

    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
    //自定义查询参数
    var outOrderNo = $("#deliveryorderOutOrderNo").val();  //出库订单ID
    //时间区间
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: deliveryOrderDistributeManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        sort: params.sort,
        order: params.order,
        outOrderNo: outOrderNo
    };
    return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {};

$(document).ready(function () {
    //1、初始化加载列表数据
    deliveryOrderDistributeManager.init();
    //2、初始化绑定增删改查事件
    deliveryOrderDistributeManager.bindEvent();
});
/**
 * Created by jiangfubing on 2017/4/17.
 */
var deliveryorderAssignRepertoryManage = {
    URL: {
        //查询出库订单基本数据
        ByDeliveryorderUrl: function () {
            return '/wms/deliveryorder/ByDeliveryorder';
        }
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
    bindEvent: function () {
        var id = $("#deliveryorderId").val();
        $.callAjax({
            type: "post",
            url: deliveryorderAssignRepertoryManage.URL.ByDeliveryorderUrl() + '?id=' + id,
            success: function (data) {
                if (data.data == null) {
                    $.toastrSuccess('查询结果为空！');
                    return;
                }
                $("#saleOrderNo1").val(data.data.saleOrderNo);
                $("#outOrderNo1").val(data.data.outOrderNo);
                $("#saleOrderNo1").val(data.data.saleOrderNo);
                $("#platDealNo1").val(data.data.platDealNo);
                $("#warehouseName1").val(data.data.warehouseName);
                $("#express1").val(data.data.express);
                $("#sourceOrder1").val(data.data.sourceOrder);
                $("#platDeal1").val(data.data.platDeal);
                $("#orderPriority1").val(data.data.orderPriority);
                $("#dateSend1").val(data.data.dateSend = true ? 1 : 0);
                $("#deliverNo1").val(data.data.deliverNo);
                $("#orderTime1").val(deliveryorderAssignRepertoryManage.format(data.data.orderTime, "yyyy-MM-dd HH:mm:ss"));
                $("#payTime1").val(deliveryorderAssignRepertoryManage.format(data.data.payTime, "yyyy-MM-dd HH:mm:ss"));
                $("#requireDate1").val(data.data.requireDate);
                $("#requireTime1").val(data.data.requireTime);
                $("#couponsPrice1").val(data.data.couponsPrice);
                $("#balancePay1").val(data.data.balancePay);
                $("#cardPrice1").val(data.data.cardPrice);
                $("#integralPrice1").val(data.data.integralPrice);
                $("#otherPrice1").val(data.data.otherPrice);
                $("#actualPrice1").val(data.data.actualPrice);
                $("#totalPrice1").val(data.data.totalPrice);
                if(!data.data.pringFlag){
                    $("#pringFlag1").val("0");
                }else {
                    $("#pringFlag1").val("1");
                }
                if(!data.data.invoiceFlag){
                    $("#invoiceFlag1").val("0");
                }else {
                    $("#invoiceFlag1").val("1");
                }
                $("#invoiceNo1").val(data.data.invoiceNo);
                $("#invoiceRise1").val(data.data.invoiceRise);
                $("#invoiceContent1").val(data.data.invoiceContent);
                $("#invoicePrice1").val(data.data.invoicePrice);
                $("#receiverCompany1").val(data.data.receiverCompany);
                $("#receiverName1").val(data.data.receiverName);
                $("#receiverPhone1").val(data.data.receiverPhone);
                // $("#receiverCountry1").val(data.data.receiverCountry+">>"+data.data.receiverProvice+">>"+data.data.receiverCity+">>"+data.data.receiverArea +">>"+ data.data.receiverStreet);
                $("#receiverAddress1").val(data.data.receiverAddress);
                $("#state1").val(data.data.state);
                $("#pickingName1").val(data.data.pickingName);
                $("#checkName1").val(data.data.checkName);
                $("#pickingTime1").val(deliveryorderAssignRepertoryManage.format(data.data.pickingTime, "yyyy-MM-dd HH:mm:ss"));
                $("#checkTime1").val(deliveryorderAssignRepertoryManage.format(data.data.checkTime, "yyyy-MM-dd HH:mm:ss"));
                $("#review1").val(data.data.review);
            },
            error: function () {
                $.toastrError();
            }
        });
    }
}

$(document).ready(function () {
    //2、初始化绑定事件
    deliveryorderAssignRepertoryManage.bindEvent();
});



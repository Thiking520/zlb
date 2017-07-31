<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@include file="../../common/taglib.jsp" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <style type="text/css">
        .sel {
            border-radius: 5px;
            margin-top: 2px;
            width: 180px;
            height:30px;
            border: solid 1px #c7c7c7;
        }
    </style>
</head>
<body onload="initDeliveryorder()">

<div id="content">
    <div class="nav-tabs-custom">
        <div class="form-group col-md-2" style="width: 1280px;height: 100%;margin-left: 20px;">
            <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                    <table class="table table-striped bootstrap-datatable responsive">
                        <tr>
                            <td style="min-width: 80px;">出库订单号：</td>
                            <td><input type="text" name="outOrderNo1" id="outOrderNo1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">订单类型：</td>
                            <td >
                                <div class="form-group">
                                    <div class="input-group">
                                        <select  name="orderType" id="orderType"
                                             disabled="disabled" class="sel">
                                            <option value="10">销售订单</option>
                                            <option value="20">返厂订单</option>
                                            <option value="30">换货订单</option>
                                            <option value="40">调拨订单</option>
                                            <option value="50">拼团订单</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td style="min-width: 80px;">销售订单号</td>
                            <td><input type="text" name="saleOrderNo1" id="saleOrderNo1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 105px;">平台交易单号:</td>
                            <td><input type="text" name="platDealNo1" id="platDealNo1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                        </tr>
                        <tr>
                            <td style="min-width: 80px;">发货仓库</td>
                            <td><input type="text" name="warehouseName1" id="warehouseName1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">承运商:</td>
                            <td><input type="text" name="express1" id="express1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 106px;">面单打印标记：</td>
                            <td>
                                <div class="form-group">
                                    <div class="input-group">
                                        <select  name="pringFlag1" id="pringFlag1"
                                                disabled="disabled" style="border-radius: 5px;width: 180px;height:30px;border: solid 1px #c7c7c7;">
                                            <option value="1">已打印</option>
                                            <option value="0">未打印</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td style="min-width: 80px;">
                                交易平台：
                            </td>
                            <td>
                                <div class="form-group">
                                    <div class="input-group ">
                                        <select name="platDeal1" id="platDeal1"
                                                disabled="disabled"  style="border-radius: 5px;width: 180px;height:30px;border: solid 1px #c7c7c7;">
                                            <option value="1">乐摇网APP</option>
                                            <option value="2">乐摇网微信商城</option>
                                            <option value="3">淘宝</option>
                                            <option value="4">美团外卖</option>
                                            <option value="5">百度外卖</option>
                                        </select>
                                    </div>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td style="min-width: 80px;">订单优先级：</td>
                            <td>
                                <div class="form-group">
                                    <div class="input-group">
                                        <select  name="orderPriority1" id="orderPriority1"
                                                disabled="disabled"  style="border-radius: 5px;width: 180px;height:30px;border: solid 1px #c7c7c7">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td style="min-width: 80px;">定时派送：</td>
                            <td>
                                <div class="form-group">
                                    <div class="input-group">
                                        <select  name="dateSend1" id="dateSend1"
                                                disabled="disabled"  style="border-radius: 5px;width: 180px;height:30px;border: solid 1px #c7c7c7">
                                            <option value="0">否</option>
                                            <option value="1">是</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td style="min-width: 80px;">运单号:</td>
                            <td><input type="text" name="deliverNo1" id="deliverNo1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">下单时间:</td>
                            <td><input type="text" name="orderTime1" id="orderTime1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                        </tr>
                        <tr>
                            <td style="min-width: 80px;">支付时间:</td>
                            <td><input type="text" name="payTime1" id="payTime1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">要求送货日期:</td>
                            <td><input type="text" name="requireDate1" id="requireDate1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">要求送货时间:</td>
                            <td><input type="text" name="requireTime1" id="requireTime1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                        </tr>
                        <tr>
                            <td colspan="8" style="background-color: #ffe2a2">金额信息</td>
                        </tr>
                        <td style="min-width: 105px;">优惠券抵扣金额:</td>
                        <td><input type="text" name="couponsPrice1" id="couponsPrice1" class="form-control"
                                   readonly="readonly" style="width: 180px; height: 30px;"></td>
                        <td style="min-width: 80px;">余额支付金额:</td>
                        <td><input type="text" name="balancePay1" id="balancePay1" class="form-control"
                                   readonly="readonly" style="width: 180px; height: 30px;"></td>
                        <td style="min-width: 80px;">卡券抵扣金额:</td>
                        <td><input type="text" name="cardPrice1" id="cardPrice1" class="form-control"
                                   readonly="readonly" style="width: 180px; height: 30px;"></td>
                        <td style="min-width: 80px;">积分抵扣金额:</td>
                        <td><input type="text" name="integralPrice1" id="integralPrice1" class="form-control"
                                   readonly="readonly" style="width: 180px; height: 30px;"></td>
                        </tr>
                        <tr>
                            <td style="min-width: 80px;">其他金额:</td>
                            <td><input type="text" name="otherPrice1" id="otherPrice1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">实际支付金额:</td>
                            <td><input type="text" name="actualPrice1" id="actualPrice1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">订单总金额:</td>
                            <td><input type="text" name="totalPrice1" id="totalPrice1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">发票标记：</td>
                            <td>
                                <div class="form-group">
                                    <div class="input-group">
                                        <select  name="invoiceFlag1" id="invoiceFlag1"
                                                disabled="disabled"  style="border-radius: 5px;width: 180px;border: solid 1px #c7c7c7;height: 30px;">
                                            <option value="0">未标记</option>
                                            <option value="1">已标记</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="min-width: 80px;">发票号:</td>
                            <td><input type="text" name="invoiceNo1" id="invoiceNo1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">发票抬头:</td>
                            <td><input type="text" name="invoiceRise1" id="invoiceRise1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">发票内容:</td>
                            <td><input type="text" name="invoiceContent1" id="invoiceContent1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">发票金额:</td>
                            <td><input type="text" name="invoicePrice1" id="invoicePrice1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                        </tr>
                        <tr>
                            <td colspan="8" style="background-color: #ffe2a2">收件人信息</td>
                        </tr>
                        <tr>
                            <td style="min-width: 80px;">收件人公司:</td>
                            <td><input type="text" name="receiverCompany1" id="receiverCompany1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">收件人姓名:</td>
                            <td><input type="text" name="receiverName1" id="receiverName1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">收件人手机号:</td>
                            <td><input type="text" name="receiverPhone1" id="receiverPhone1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                        </tr>
                        <tr>
                            <td style="min-width: 80px;">收件人地址:</td>
                            <td colspan="2"><input type="text" name="receiverAddress1" id="receiverAddress1"
                                                   class="form-control" readonly="readonly"
                                                   style="width: 350px; height: 30px;"></td>
                        </tr>
                        <tr>
                            <td colspan="8" style="background-color: #ffe2a2">情况</td>
                        </tr>
                        <tr>
                            <td style="min-width: 80px;">状态：</td>
                            <td>
                                <div class="control-group" style="border:none;">
                                    <div class="controls" style="border:none;text-align:left">
                                        <select name="state1" id="state1" disabled="disabled"
                                                style="border-radius: 5px;width: 180px;border: solid 1px #c7c7c7;height: 30px;">
                                            <option value="10">新建</option>
                                            <option value="20">已确认</option>
                                            <option value="40">已分配</option>
                                            <option value="60">拣货中</option>
                                            <option value="50">已生成拣货单</option>
                                            <option value="70">拣货完成</option>
                                            <option value="80">复核完成</option>
                                            <option value="90">打包完成</option>
                                            <option value="98">已取消</option>
                                            <option value="99">已出库</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td style="min-width: 80px;">拣货人:</td>
                            <td><input type="text" name="pickingName1" id="pickingName1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">拣货时间:</td>
                            <td><input type="text" name="pickingTime1" id="pickingTime1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>

                        </tr>
                        <tr>
                            <td style="min-width: 80px;">复核人:</td>
                            <td><input type="text" name="checkName1" id="checkName1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">复核时间:</td>
                            <td><input type="text" name="checkTime1" id="checkTime1" class="form-control"
                                       readonly="readonly" style="width: 180px; height: 30px;"></td>
                            <td style="min-width: 80px;">复核方式:</td>
                            <td>
                                <div class="control-group" style="border:none;">
                                    <div class="controls" style="border:none;">
                                        <select  name="review1" id="review1" disabled="disabled"
                                                style="border-radius: 5px;width: 180px;height:30px;border: solid 1px #c7c7c7;">
                                            <option value="10">扫描条码</option>
                                            <option value="20">肉眼识别</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 自己功能模块的外部JS -->
<script src="${contextPath}/resources/js/business/wms/storageout/deliveryorderAssignRepertory.js"
        type="text/javascript"></script>
</body>
</html>

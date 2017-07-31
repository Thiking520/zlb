<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <meta charset="UTF-8">
    <title>智联宝</title>
    <!-- ★ 导入公共JS库 -->
    <%@include file="../../common/commonJs.jsp"%>
</head>
<body class="skin-blue">

<div>
    <div role="grid" class="box-body table-responsive" style="overflow-x: scroll;margin-left: 10%;height: 200px">
        <table id="deliveryOrderDistributeTable" class="table table-hover table-striped table-bordered">
        </table>
    </div>
    <div style="width: 90%;margin-left: 10%">
        <table  class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
            <tr>

                <td style="min-width: 100px;border: none;">商品名称:</td>
                <td style="border: none;"><input type="text" name="skuName" id="skuName" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;border: none;">单价：</td>
                <td style="border: none;" colspan="3"><input type="text" name="price1" id="price1" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
            </tr>
            <tr>
                <td style="min-width: 100px;">货品编码：</td>
                <td><input type="text" name="skuCode" id="skuCode" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;">优惠金额：</td>
                <td><input type="text" name="discountPrice1" id="discountPrice1" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
            </tr>
            <tr>
                <td style="min-width: 100px;border: none;"> 出库订单号：</td>
                <td style="border: none;"><input type="text" name="outOrderNo1" id="outOrderNo1" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;">备注:</td>
                <td><input type="text" name="orderDetailRemark1" id="orderDetailRemark1" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;">套餐编号：</td>
                <td><input type="text" name="packageNo1" id="packageNo1" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
            </tr>
            <tr style="text-align: left;">
                <td colspan="8" style=" background-color: #ffe2a2;">分配的库存批次</td>
            </tr>
            <tr>
                <td>生产日期：</td>
                <td>
                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;" readonly>
                        <input type="text" class="form-control" value="" id="proDate1" name="proDate1" readonly style="width: 200px; height: 30px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    </div>

                </td>
                <td>失效日期：</td>
                <td style="border: none;">
                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;">
                        <input type="text" class="form-control" value="" id="failDate1" name="failDate1" readonly style="width: 200px; height: 30px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    </div>
                </td>
                <td>入库日期：</td>
                <td style="border: none;">
                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;">
                        <input type="text" class="form-control" value="" id="storageDate1" name="storageDate1" readonly style="width: 200px; height: 30px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>生产批次号：</td>
                <td style="border: none;"><input type="text" name="proBatchNo1" id="proBatchNo1" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td>供应商：</td>
                <td class="center"><input type="text" name="supplier1" id="supplier1"    class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td>库存批次号：</td>
                <td class="center"><input type="text" name="stockBatchNo1" id="stockBatchNo1" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
            </tr>
            <tr>
                <td>库存状态：</td>
                <td class="center">
                    <div class="control-group" style="border:none;">
                        <div class="controls" style="border:none;text-align:left">
                            <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="stockState1" name="stockState1" disabled="disabled">
                                <option value="10">良品</option>
                                <option value="20">残品</option>
                            </select>
                        </div>
                    </div>
                </td>

            </tr>

            <tr style="text-align: left;">
                <td colspan="8" style=" background-color: #ffe2a2;">情况</td>
            </tr>
            <tr>
                <td>分配数量：</td>
                <td class="center"><input type="text" name="allocatedQty1" id="allocatedQty1" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                <td>库位编号：</td>
                <td class="center"><input type="text" name="location" id="location" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
            </tr>
            <tr>
                <td>拣货数量：</td>
                <td class="center" colspan="8"><input type="text" name="pickQty1" id="pickQty1" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
            </tr>
        </table>
    </div>
</div>
</body>
<script src="${contextPath}/resources/js/business/wms/storageout/deliveryOrderDistribute.js" type="text/javascript"></script>
</html>

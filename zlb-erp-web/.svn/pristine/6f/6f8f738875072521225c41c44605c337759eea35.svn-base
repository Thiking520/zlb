<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1"/>
    <meta charset="UTF-8">
    <title>智联宝</title>
    <!-- ★ 导入公共JS库 -->
    <%@include file="../../common/commonJs.jsp" %>
    <style>
        .ss{
            padding: 5px 10px;
        }
    </style>
</head>
<body class="skin-blue">

<div>
    <div role="grid" class="box-body table-responsive" style="overflow-x: scroll;margin-left: 10%;height: 200px">
        <table id="deliveryorderDetailListTbable" style="display:block; max-height:200px;">
        </table>
    </div>
    <div style="width: 90%;margin-left: 10%">
        <table class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
            <input id = "deliveryorderDetailId" type="hidden" value=""/>
            <tr>
                <td style="min-width: 100px;border: none;">行号：</td>
                <td style="border: none;"><input type="text" name="detailRow" id="detailRow" class="form-control"
                                                 readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;border: none;">商品名称:</td>
                <td style="border: none;"><input type="text" name="skuName" id="skuName" class="form-control"
                                                 readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;border: none;">单价：</td>
                <td style="border: none;"><input type="text" name="price" id="price" class="form-control"
                                                 readonly="readonly" style="width: 200px; height: 30px;"></td>
            </tr>
            <tr>
                <td style="min-width: 100px;">货品编码：</td>
                <td><input type="text" name="skuCode" id="skuCode" class="form-control" readonly="readonly"
                           style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;">优惠金额：</td>
                <td><input type="text" name="discountPrice" id="discountPrice" class="form-control" readonly="readonly"
                           style="width: 200px; height: 30px;"></td>
            </tr>
            <tr>
                <td style="min-width: 100px;">备注:</td>
                <td><input type="text" name="orderDetailRemark" id="orderDetailRemark" class="form-control"
                           readonly="readonly" style="width: 200px; height: 30px;"></td>
                <td style="min-width: 100px;">套餐编号：</td>
                <td><input type="text" name="packageNo" id="packageNo" class="form-control" readonly="readonly"
                           style="width: 200px; height: 30px;"></td>
            </tr>
            <tr style="text-align: left;">
                <td colspan="8" style=" background-color: #ffe2a2;">指定分配批次</td>
            </tr>
            <tr>
                <td>生产日期：</td>
                <td>
                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;"
                         readonly>
                        <input type="text" class="form-control" readonly value="" id="proDate" name="proDate"
                               style="width: 200px; height: 30px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    </div>

                </td>
                <td>失效日期：</td>
                <td style="border: none;">
                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;">
                        <input type="text" class="form-control" readonly value="" id="failDate" name="failDate"
                               style="width: 200px; height: 30px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    </div>
                </td>
                <td>入库日期：</td>
                <td style="border: none;">
                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;">
                        <input type="text" class="form-control" readonly value="" id="storageDate" name="storageDate"
                               style="width: 200px; height: 30px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>生产批次号：</td>
                <td style="border: none;"><input type="text" name="proBatchNo" id="proBatchNo" class="form-control"
                                                 style="width: 200px; height: 30px;"></td>
                <td>供应商：</td>
                <td class="center">
                    <div class="input-group" style="width: 200px; height: 30px;">
                        <input name="supplierName1" id="supplierName1" class="form-control input-small"
                               type="text" disabled="disabled" style="width: 200px; height: 30px;">
                        <input name="supplierCode1" id="supplierCode1" style="display: none;"/>
                        <div class="input-group-addon ss" c><span class="glyphicon glyphicon-search"
                                                             id="clickSupplier"></span></div>
                    </div>
                </td>
                <td>库存批次号：</td>
                <td class="center"><input type="text" name="stockBatchNo" id="stockBatchNo" class="form-control"
                                          style="width: 200px; height: 30px;"></td>
            </tr>
            <tr>
                <td>库存状态：</td>
                <td class="center">
                    <div class="control-group" style="border:none;">
                        <div class="controls" style="border:none;text-align:left">
                            <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="stockState" name="stockState" disabled="disabled">
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
                <td>计划数量：</td>
                <td class="center"><input type="text" name="planQty" id="planQty" readonly="readonly"
                                          class="form-control" style="width: 200px; height: 30px;"></td>
                <td>拣货数量：</td>
                <td class="center"><input type="text" name="pickQty" id="pickQty" readonly="readonly"
                                          class="form-control" style="width: 200px; height: 30px;"></td>
                <td>分配数量：</td>
                <td class="center"><input type="text" name="allocatedQty" id="allocatedQty" readonly="readonly"
                                          class="form-control" style="width: 200px; height: 30px;">
                </td>
            </tr>
            <tr>


                <td>预分配规则：</td>
                <td class="center">
                    <div class="input-group" style="width: 200px;height: 30px">
                        <input name="preAllocatedRulesName" id="preAllocatedRulesName" class="form-control input-small"
                               type="text" disabled="disabled"  style="width: 200px; height: 30px;">
                        <input name="preAllocatedRulesCode" id="preAllocatedRulesCode" style="display: none;"/>
                        <div class="input-group-addon ss"><span class="glyphicon glyphicon-search"
                                                                id="clickPreAllocated"></span></div>
                    </div>
                </td>
                <td>分配规则：</td>
                <td class="center">
                    <div class="input-group" style="width: 200px;height: 30px">
                        <input name="allocatedRulesName" id="allocatedRulesName" class="form-control input-small"
                               type="text" disabled="disabled"  style="width: 200px; height: 30px;">
                        <input name="allocatedRulesCode" id="allocatedRulesCode" style="display: none;"/>
                        <div class="input-group-addon ss" ><span class="glyphicon glyphicon-search"
                                                             id="clickAllocated"></span></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="8" align="center">
                    <button disabled="disabled" type="button" class="btn btn-primary"
                            id="saveDeliveryOrderDetail">保存
                    </button>
                </td>
            </tr>
        </table>
    </div>
</div>

</body>
<script src="${contextPath}/resources/js/business/wms/storageout/deliveryOrderDetail.js"
        type="text/javascript"></script>
</html>
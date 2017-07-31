<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<meta charset="UTF-8">
<title>智联宝</title>
<style type="text/css">
ul li{
	list-style:none;
}
.L_goods_detailed{
    width: 2000px;
}
.L_goods_detailed tr th{
    text-align: center;
}
.L_goods_detailed tr td{
    text-align: center;
}
.L_goods_form tr{
    margin-top: 30px;
}
.L_goods_form  tr td{
    text-align: center;
    
}
.L_mail div p{
    float: left;
}
.L_mail div input{
    float: left;
}
.L_Eeject_two tr th{
    text-align: center;
}
.L_Eeject_two tr td{
    text-align: center;
}
#info1 table tr{
	text-align:right;
}
</style>
</head>
<body class="skin-blue">
	 <div class="modal-body">
               <div>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-panective" id="info1" style="text-align: center;">
                            <table class="table table-striped bootstrap-datatable responsive" style="margin-top: 10px;">
                                    <tr>
                                        <td style="min-width: 100px;">入库单号：</td>
                                        <td><input type="text" name="storageInNo" id="storageInNo01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <td style="min-width: 100px;">来源单据号:</td>
                                        <td><input type="text" name="orderNum" id="orderNum01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <td style="min-width: 100px;">订单类型：</td>
                                        <td>
                                            <div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="billType01" name="billType"  disabled="disabled" >
                                                        <option value="10">采购入库</option>
                                                        <option value="20">退货入库</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="min-width: 100px;">运营商:</td>
                                        <td><input type="text" name="operator" id="operator01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td style="min-width: 100px;">订单日期：</td>
                                        <td>
                                            <input type="text" name="orderDate" class="form-control" id="orderDate01"  readonly="readonly"  style="width: 200px; height: 30px;">
                                        </td>
                                        <td style="min-width: 100px;">预计收货时间：</td>
                                        <td>
                                            <input type="text" name="expectDate" id="expectDate01" class="form-control"  readonly="readonly" style="width: 200px; height: 30px;">
                                        </td>
                                        <td style="min-width: 100px;">异常标记：</td>
                                        <td>
                                        	<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="anomalyFlag01" name="anomalyFlag"  disabled="disabled" >
                                                        <option value="10">正常</option>
                                                        <option value="20">异常</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="min-width: 100px;">取消标记：</td>
                                        <td>
                                        	<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="cancelFlag01" name="cancelFlag"  disabled="disabled" >
                                                        <option value="10">正常</option>
                                                        <option value="20">异常</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                    	<td style="min-width: 100px;">销售订单号：</td>
                                        <td>
                                            <input type="text" name="salesNo" id="salesNo01" class="form-control"  readonly="readonly" style="width: 200px; height: 30px;">
                                        </td>
                                    </tr>
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">采购信息</td>
                                    </tr>
                                    <tr>
                                        <td>采购单号：</td>
                                        <td class="center"><input type="text" name="purchaseNo"id="purchaseNo01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td class="center">采购员：</td>
                                        <td class="center"><input type="text" name="purchaser"id="purchaser01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td class="center">采购员电话：</td>
                                        <td class="center"><input type="text" name="purchaserPhone" id="purchaserPhone01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td class="center">供应商：</td>
                                        <td class="center"><input type="text" name="supplierName" id="supplierName01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td>采购备注：</td>
                                        <td class="center"><input type="text" name="purhcaseRemark" id="purhcaseRemark01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <!-- <td>承运商：</td>
                                        <td class="center"><input type="text" name="express" id="express01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>车辆号：</td>
                                        <td class="center"><input type="text" name="vehicleNo" id="vehicleNo01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>司机姓名：</td>
                                        <td class="center"><input type="text" name="driverName" id="driverName01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td> -->
                                    </tr>
                                    <!-- <tr>
                                        <td>司机手机号：</td>
                                        <td class="center"><input type="text" name="driverPhone" id="driverPhone01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>应收运费：</td>
                                        <td class="center"><input type="text" name="" id="" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td></td>
                                        <td class="center"></td>
                                        <td></td>
                                        <td class="center"></td>
                                    </tr> -->
                                    <!-- <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">发货方</td>
                                    </tr>
                                    <tr>
                                        <td>发货方：</td>
                                        <td class="center"><input type="text" name="shipper" id="shipper01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>发货仓库：</td>
                                        <td class="center"><input type="text" name="shipperWarehouse" id="shipperWarehouse01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>发货人姓名：</td>
                                        <td class="center"><input type="text" name="shipperName" id="shipperName01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>联系电话：</td>
                                        <td class="center"><input type="text" name="shipperContactPhone" id="shipperContactPhone01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td>行政区域：</td>
                                        <td colspan="3" class="center"><input type="text" name="shipperAdminArea" id="shipperAdminArea01" readonly="readonly"  class="form-control" style="height: 30px;"></td>
                                        <td>详细地址：</td>
                                        <td colspan="3" class="center"><input type="text" name="shipperAddress" id="shipperAddress01" readonly="readonly"  class="form-control" style="height: 30px;"></td>
                                        <td></td>
                                    </tr> -->
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">收货方</td>
                                    </tr>
                                    <tr>
                                        <td>收货方：</td>
                                        <td class="center"><input type="text" name="receiveName" id="receiveName01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>收货仓库：</td>
                                        <td class="center"><input type="text" name="receiveWarehouse" id="receiveWarehouse01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>收货人姓名：</td>
                                        <td class="center"><input type="text" name="shipperName" id="shipperName01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>联系电话：</td>
                                        <td class="center"><input type="text" name="receiveContactPhone" id="receiveContactPhone01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td>行政区域：</td>
                                        <td colspan="3" class="center"><input type="text" name="receiveAdminArea" id="receiveAdminArea01" readonly="readonly"  class="form-control" style="height: 30px;"></td>
                                        <td>详细地址：</td>
                                        <td colspan="3" class="center"><input type="text" name="receiveAddress" id="receiveAddress01" readonly="readonly"  class="form-control" style="height: 30px;"></td>
                                        <td></td>
                                    </tr>
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">合计</td>
                                    </tr>
                                    <tr>
                                        <td>数量汇总：</td>
                                        <td class="center"><input type="text" name="totalQty" id="totalQty01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>净重汇总（千克）：</td>
                                        <td class="center"><input type="text" name="totalWeight" id="totalWeight01" readonly="readonly" class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td></td>
                                        <td class="center"></td>
                                        <td></td>
                                        <td class="center"></td>
                                    </tr>
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">收货情况</td>
                                    </tr>
                                    <tr>
                                        <td>收货状态：</td>
                                        <td class="center">
											<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="receiveState01" name="receiveState"  disabled="disabled" >
                                                        <option value="10">新建</option>
                                                        <option value="20">待收货</option>
                                                        <option value="30">收货中</option>
                                                        <option value="50">已入帐</option>
                                                        <option value="98">已取消</option>
                                                        <option value="99">关闭</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>
										</td>
                                        <td>收货结果：</td>
                                        <td>
                                        	<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="receiveResult01" name="receiveResult"  disabled="disabled" >
                                                        <option value="0">未开始收货</option>
                                                        <option value="10">部分收货</option>
                                                        <option value="20">全部收货</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td class="center"></td>
                                        <td></td>
                                        <td class="center"></td>
                                    </tr>
                            </table>
                            <button class="btn btn-primary btn-sm" id="btn_take_account01" style="margin-left: 20px;width: 76px;">入账</button>
                            <button class="btn btn-primary btn-sm" id="btn_close_order" style="margin-left: 20px;">关闭订单</button>
                            <!-- <button class="btn btn-primary btn-sm" id="btn_cancel_order" style="margin-left: 20px;">取消订单</button> -->
                        </div>
                    </div>
                </div>
            </div>
</body>
 <script src="${contextPath}/resources/js/business/wms/storagein/takegoodsInfo.js" type="text/javascript"></script>
</html>
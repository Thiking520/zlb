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
	<div role="grid" class="box-body table-responsive" style="max-height: 200px;overflow-x: scroll;">
		<table id="operationBillDetailTable" class="table table-hover table-striped table-bordered">
		
		</table>
	</div>
	<div>
		<table  class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
									<tr>
                                        <td style="min-width: 100px;border: none;">行号：</td>
                                        <td style="border: none;"><input type="text" name="operationRow" id="operationRow04" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <!-- <td style="min-width: 100px;border: none;">中文描述:</td>
                                        <td colspan="3" style="border: none;"><input type="text" name="orderNum" id="orderNum01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td> -->
                                        <td style="min-width: 100px;border: none;">入库明细行号：</td>
                                        <td><input type="text" name="detailRow" id="detailRow04" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td style="min-width: 100px;">货品编码：</td>
                                        <td><input type="text" name="skuCode" id="skuCode04" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <!-- <td style="min-width: 100px;">英文描述:</td>
                                        <td colspan="3"><input type="text" name="orderNum" id="orderNum01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td> -->
                                        <td style="min-width: 100px;">跟踪号：</td>
                                        <td><input type="text" name="purchaseRow" id="purchaseRow04" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">批次属性</td>
                                    </tr>
                                    <tr>
                                        <td>生产日期：</td>
                                        <td class="center">
                                        	<input type="text" class="form-control form_datetime" readonly="readonly" style="width: 200px; height: 30px;" value="" id="skuProDate07" name="skuProDate">
										</td>
                                        <td>失效日期：</td>
                                        <td class="center">
                                        	<input type="text" class="form-control form_datetime" readonly="readonly" style="width: 200px; height: 30px;" value="" id="skuFailDate07" name="skuFailDate">
										</td>
                                        <td>生产批次号：</td>
                                        <td class="center">
                                        	<input type="text" name="skuProBatchNo" id="skuProBatchNo07" readonly="readonly" class="form-control" style="width: 200px; height: 30px;">
										</td>
                                        <td>入库日期：</td>
                                        <td class="center">
                                        	<input type="text" name="skuStorageDate" id="skuStorageDate07"  readonly="readonly" class="form-control form_datetime"  style="width: 200px; height: 30px;">
										</td>
                                    </tr>
                                    <tr>
                                        <td>供应商：</td>
                                        <td class="center">
                                        	<input type="text" name="supplierCode" id="supplierCode07" class="form-control" readonly="readonly" style="width: 200px; height: 30px;">
										</td>
                                        <td>库存批次号：</td>
                                        <td class="center"><input type="text" name="skuStockBatchBo" id="skuStockBatchBo07" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>货品状态：</td>
                                        <td class="center">
                                        	<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 100%;border: solid 1px #c7c7c7;height: 30px;" id="skuState07" name="skuState" disabled="disabled" >
															<option value="10">良品</option>
															<option value="20">残品</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td class="center"></td>
                                    </tr>
                                    
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">情况</td>
                                    </tr>
                                    <tr>
                                        <td>状态：</td>
                                        <td class="center">
											<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="state04" name="state"  disabled="disabled" >
															<option value="10">未完成</option>
															<option value="98">作废</option>
															<option value="99">作业完成</option>
                                                    </select>
                                                </div>
                                            </div>
										</td>
                                        <td>数量：</td>
                                        <td class="center"><input type="text" name="operationQty" id="operationQty04" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>收货库位：</td>
                                        <td class="center"><input type="text" name="originalLocation" id="originalLocation04" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>推荐库位：</td>
                                        <td class="center"><input type="text" name="recommendLocation" id="recommendLocation04" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <!-- <td>上架策略：</td>
                                        <td class="center"><input type="text" name="notShelfQty" id="notShelfQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td> -->
                                    </tr>
                                    <tr>
                                        <td>单位：</td>
										<td class="center">
										<input type="text" name="unit" id="unit04" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;">
										</td>                                       
                                        <!-- <td>上架人：</td>
                                        <td class="center"><input type="text" name="executor" id="executor04" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td> -->
                                    </tr>
                                     <!-- <tr>
                                        <td></td>
                                        <td class="center">
                                        <td></td>
                                        <td class="center">
										</td>
										<td>上架库位</td>
                                        <td class="center"><input type="text" name="actualLocation" id="actualLocation04" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>上架时间：</td>
                                        <td class="center"><input type="text" name="implementTime" id="implementTime04" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr> -->
		</table>
	</div>
</body>
<script src="${contextPath}/resources/js/business/wms/storagein/operationbillDetail.js" type="text/javascript"></script>
</html>
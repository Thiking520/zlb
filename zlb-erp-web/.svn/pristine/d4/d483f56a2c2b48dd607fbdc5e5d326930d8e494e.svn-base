<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<meta charset="UTF-8">
<title>智联宝</title>
</head>
<body class="skin-blue">
	<div role="grid" class="box-body table-responsive" style="max-height: 200px;overflow-x: scroll;">
		<table id="takegoodsTransactionTable" class="table table-hover table-striped table-bordered">
		
		</table>
	</div>
	<div style="text-align:center;">
		<table  class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
									<tr>
                                        <td style="min-width: 100px;border: none;">交易号：</td>
                                        <td style="border: none;"><input type="text" name="billNo" id="billNo" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <!-- <td style="min-width: 100px;border: none;">中文描述:</td>
                                        <td colspan="3" style="border: none;"><input type="text" name="orderNum" id="orderNum01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td> -->
                                        <td style="min-width: 100px;border: none;">入库明细行号：</td>
                                        <td><input type="text" name="detailRow" id="detailRow03" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td style="min-width: 100px;">货品编码：</td>
                                        <td><input type="text" name="skuCode" id="skuCode03" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <!-- <td style="min-width: 100px;">英文描述:</td>
                                        <td colspan="3"><input type="text" name="orderNum" id="orderNum01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td> -->
                                        <td style="min-width: 100px;">跟踪号：</td>
                                        <td><input type="text" name="purchaseRow" id="purchaseRow01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">批次属性</td>
                                    </tr>
                                    <tr>
                                        <td>生产日期：</td>
                                        <td class="center">
                                        	<input type="text" class="form-control form_datetime" readonly="readonly"   style="width: 200px; height: 30px;" value="" id="skuProDate06" name="skuProDate">
										</td>
                                        <td>失效日期：</td>
                                        <td class="center">
                                        	<input type="text" class="form-control form_datetime" readonly="readonly"   style="width: 200px; height: 30px;" value="" id="skuFailDate06" name="skuFailDate">
										</td>
                                        <td>生产批次号：</td>
                                        <td class="center">
                                        	<input type="text" name="skuProBatchNo" id="skuProBatchNo06" class="form-control" readonly="readonly"   style="width: 200px; height: 30px;">
										</td>
                                        <td>入库日期：</td>
                                        <td class="center">
                                        	<input type="text" name="skuStorageDate" id="skuStorageDate06" readonly="readonly" class="form-control form_datetime"  style="width: 200px; height: 30px;">
										</td>
                                    </tr>
                                    <tr>
                                        <td>供应商：</td>
                                        <td class="center">
                                        	<input type="text" name="supplierCode" id="supplierCode06" readonly="readonly"   class="form-control" style="width: 200px; height: 30px;">
										</td>
                                        <td>库存批次号：</td>
                                        <td class="center"><input type="text" name="skuStockBatchBo" id="skuStockBatchBo06" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>货品状态：</td>
                                        <td class="center">
                                        	<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 100%;border: solid 1px #c7c7c7;height: 30px;" id="skuState06" name="skuState" disabled="disabled">
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
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="shelfState" name="shelfState"  disabled="disabled" >
															<option value="0">未生成上架作业单</option>
															<option value="1">已生成上架作业单</option>
                                                    </select>
                                                </div>
                                            </div>
										</td>
                                        <td>数量：</td>
                                        <td class="center"><input type="text" name="skuQty" id="skuQty" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>收货库位：</td>
                                        <td class="center"><input type="text" name="storageInLocation" id="storageInLocation" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>上架规则：</td>
                                        <td class="center"><input type="text" name="shelfRulesName" id="shelfRulesName" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td>是否已入账</td>
                                        <td class="center">
                                        	<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="isTakeAccount" name="isTakeAccount"  disabled="disabled" >
															<option value="false">未入账</option>
															<option value="true">已入账</option>
                                                    </select>
                                                </div>
                                            </div>
										</td>
                                        <td>单位：</td>
										<td class="center">
										<input type="text" name="unit" id="unit03" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;">
											<!-- <div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="unit03" name="unit"  disabled="disabled" >
															<option value="10">个</option>
															<option value="20">份</option>
															<option value="30">件</option>
															<option value="40">箱</option>
															<option value="50">瓶</option>
															<option value="60">千克</option>
															<option value="70">克</option>
                                                    </select>
                                                </div>
                                            </div> -->
										</td>                                       
										<td>推荐库位：</td>
                                        <td class="center"><input type="text" name="recommendLocationName" id="recommendLocationName" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>收货人：</td>
                                        <td class="center"><input type="text" name="deName" id="deName" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                     <tr>
                                        <td></td>
                                        <td class="center">
                                        <td></td>
                                        <td class="center">
										</td>
										<td></td>
                                        <td class="center"></td>
                                        <td>收货时间：</td>
                                        <td class="center"><input type="text" name="deTime" id="deTime" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr>
		</table>
		<button class="btn btn-primary btn-sm" id="btn_cancel_deal" style="margin-left: 20px;">取消此笔交易</button>
	</div>
</body>
<script src="${contextPath}/resources/js/business/wms/storagein/takegoodsTransaction.js" type="text/javascript"></script>
</html>
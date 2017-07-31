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
		<table id="takegoodDetailTable"  class="table table-hover table-striped table-bordered">
		
		</table>
	</div>
	<div style="text-align: center;">
		<input type="hidden" id="detailId" name="detailId"/>
		<table  class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
									<tr>
                                        <td style="min-width: 100px;border: none;">行号：</td>
                                        <td style="border: none;"><input type="text" name="detailRow" id="detailRow01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <!-- <td style="min-width: 100px;border: none;">中文描述:</td>
                                        <td colspan="3" style="border: none;"><input type="text" name="orderNum" id="orderNum01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td> -->
                                        <td style="min-width: 100px;border: none;">PO订单号：</td>
                                        <td><input type="text" name="purchaseno" id="purchaseno01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td style="min-width: 100px;">货品编码：</td>
                                        <td><input type="text" name="skuCode" id="skuCode01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                        <!-- <td style="min-width: 100px;">英文描述:</td>
                                        <td colspan="3"><input type="text" name="orderNum" id="orderNum01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td> -->
                                        <td style="min-width: 100px;">PO订单行号：</td>
                                        <td><input type="text" name="purchaseRow" id="purchaseRow01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                     <tr>
                                        <td style="min-width: 100px;">备注：</td>
                                        <td class="center" colspan="5" ><input type="text" name="remark" id="remark01" readonly="readonly"  class="form-control" style="height: 30px;"></td>
                                    </tr>
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">收货情况</td>
                                    </tr>
                                    <tr>
                                        <!-- <td>收货状态：</td>
                                        <td class="center">
											<div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="receiveState01" name="receiveState"  disabled="disabled" >
                                                        <option value="10">新建</option>
                                                        <option value="20">待收件</option>
                                                        <option value="30">收货中</option>
                                                        <option value="40">收货完成</option>
                                                        <option value="50">已入帐</option>
                                                        <option value="98">已取消</option>
                                                        <option value="99">关闭</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>
										</td> -->
										<td></td>
										<td class="center"></td>
                                        <td>应收数量：</td>
                                        <td class="center"><input type="text" name="expectQty" id="expectQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>已收良品数量：</td>
                                        <td class="center"><input type="text" name="skuQty" id="skuQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>已收破损数量：</td>
                                        <td class="center"><input type="text" name="brokenQty" id="brokenQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                    </tr>
                                    <tr>
                                        <td>收货结果：</td>
                                        <td class="center">
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
                                        <td>未收数量：</td>
                                        <td class="center"><input type="text" name="notReceiveQty" id="notReceiveQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>已拒收数量：</td>
                                        <td class="center"><input type="text" name="refuseQty" id="refuseQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>单位：</td>
                                        <td class="center">
                                        	<input type="text" name="unit" id="unit01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;">
											<!-- <div class="control-group" style="border:none;">
                                                <div class="controls" style="border:none;">
                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="unit01" name="unit"  disabled="disabled" >
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
                                    </tr>
                                    
                                    <tr style="text-align: left;">
                                        <td colspan="8" style=" background-color: #FF8C69;">上架情况</td>
                                    </tr>
                                    <tr>
                                        <td>已上架数量：</td>
                                        <td class="center"><input type="text" name="shelfQty" id="shelfQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td>未上架数量：</td>
                                        <td class="center"><input type="text" name="notShelfQty" id="notShelfQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    
		</table>
			<button class="btn btn-primary btn-sm" id="btn_put_result" style="margin-left: 20px;">录入收货结果</button>
			<!-- <button class="btn btn-primary btn-sm" id="btn_finished" style="margin-left: 20px;">收货完成</button> -->
	        <button class="btn btn-primary btn-sm" id="btn_print_goodtag" style="margin-left: 20px;">打印货品标签</button>
	</div>
</body>
<script src="${contextPath}/resources/js/business/wms/storagein/takegoodDetail.js" type="text/javascript"></script>
</html>
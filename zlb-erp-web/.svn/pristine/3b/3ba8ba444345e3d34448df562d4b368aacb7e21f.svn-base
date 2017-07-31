<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<style>
.content{
    margin-top: -540px;
    margin-left: 150px;
}
#myModal ul li{
	margin-top: 15px;
}
.col-md-10 .fixed-table-body{
	overflow: visible;
}
</style>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" style="text-align: -webkit-center;" aria-labelledby="myModal" aria-hidden="true">
 <div class="modal-dialog" style="width:90%;margin: 50px auto;" >
	<div class="modal-content" style="width: 85%;height: 780px;margin: 0 auto;"> 
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">×</span>
			</button>
		</div>
		<div class="modal-body">
			<input type="hidden" id="operationId" name="operationId">
			<div class="nav-tabs-custom">
				<div class="form-group col-md-1" id="leftMeun">
					 <div class="row">
						<ul class="nav nav-pills nav-stacked">
								<li class="active"><a href="#tab_1" class="picList" data-toggle="tab">基本信息</a></li>
								<li><a href="#tab_2" class="picList"  data-toggle="tab">计划明细</a></li>
								<li><a href="#tab_3" class="picList"  data-toggle="tab">作业记录</a></li>
						</ul>
					</div>
				</div>
				<div class="form-group col-md-1" style="width: 20px;height: 700px;border-left: 1px solid #999;margin-left: 2%"></div>
				<div class="form-group col-md-10" style="padding-left:0px;width: 87%;"> 
					<div class="tab-content">
					<div class="tab-pane active" id="tab_1">
						<table class="table table-striped bootstrap-datatable responsive" style="margin-top: 10px;">
							<tr>
								<td style="min-width: 100px;">作业单：</td>
								<td><input type="text" name="billNo" id="billNo01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
								<td style="min-width: 100px;">来源：</td>
								<td>
									<div class="control-group" style="border: none;text-align: left;">
										<div class="controls" style="border: none;">
											<select style="border-radius: 5px; width: 200px; border: solid 1px #c7c7c7; height: 30px;" id="sourceType" name="sourceType" disabled="disabled">
												<option value="10">上架</option>
												<option value="20">移库</option>
											</select>
										</div>
									</div>
								</td>
								<td style="min-width: 100px;">来源单号</td>
								<td><input type="text" name="sourceBill" id="sourceBill01" class="form-control" readonly="readonly"	style="width: 200px; height: 30px;"></td>
							</tr>
							<tr>
								<td style="min-width: 100px;">原因代码：</td>
								<td>
									<div class="control-group" style="border: none;text-align: left;">
										<div class="controls" style="border: none;">
											<select style="border-radius: 5px; width: 200px; border: solid 1px #c7c7c7; height: 30px;" id="reasonCode" name="reasonCode" disabled="disabled">
												<option value="10">破损货品需要转移</option>
												<option value="20">补货转库</option>
												<option value="30">上架</option>
											</select>
										</div>
									</div>
								</td>
								<td style="min-width: 100px;">打印次数：</td>
								<td><input type="text" name="printCount" id="printCount" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
								<td style="min-width: 100px;"></td>
								<td></td>
							</tr>
							<tr>
								<td style="min-width: 100px;">原因：</td>
								<td colspan="5"><input type="text" name="reason" class="form-control" id="reason" readonly="readonly" style="width: 200px; height: 30px;"></td>
							</tr>
							<tr style="text-align: left;">
								<td colspan="8" style="background-color: #FF8C69;">作业情况</td>
							</tr>
							<tr>
								<td style="min-width: 100px;">状态：</td>
								<td>
									<div class="control-group" style="border: none;text-align: left;">
										<div class="controls" style="border: none;">
											<select style="border-radius: 5px; width: 200px; border: solid 1px #c7c7c7; height: 30px;" id="state01" name="state" disabled="disabled">
												<option value="10">待分派</option>
												<option value="20">待领取</option>
												<option value="30">上架中</option>
												<option value="98">已作废</option>
												<option value="99">完成</option>
											</select>
										</div>
									</div>
								</td>
								<td style="min-width: 100px;">领取时间：</td>
								<td><input type="text" name="receiveTime" id="receiveTime" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
								<td style="min-width: 100px;">作业人：</td>
								<td><input type="text" name="executor" id="executor" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
							</tr>
							<tr>
								<td style="min-width: 100px;">结果：</td>
								<td>
								<div class="control-group" style="border: none;text-align: left;">
										<div class="controls" style="border: none;">
											<select style="border-radius: 5px; width: 200px; border: solid 1px #c7c7c7; height: 30px;" id="operateResult01" name="operateResult" disabled="disabled">
												<option value="">全部</option>
												<option value='10'>部分完成</option>
												<option value='20'>全部完成</option>
											</select>
										</div>
									</div>
								</td>
								<td style="min-width: 100px;">作业时间：</td>
								<td><input type="text" name="implementTime" class="form-control" id="implementTime" readonly="readonly" style="width: 200px; height: 30px;"></td>
							</tr>
						</table>
					</div>
					<!-- 计划明细 -->
					<div class="tab-pane" id="tab_2">
						<div role="grid" class="box-body table-responsive" style="height:150px;overflow-x: scroll">
							<table id="planDetailTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
						<form id="playDetalForm" action="#">
							<table  class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
														<tr>
					                                        <td style="min-width: 100px;border: none;">作业行号：</td>
					                                        <td style="border: none;"><input type="text" name="operationRow" id="operationRow01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                        <td style="min-width: 100px;border: none;">收货交易号：</td>
					                                        <td><input type="text" name="storageInTradingNo" id="storageInTradingNo01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                                    <tr>
					                                        <td style="min-width: 100px;">货品编码：</td>
					                                        <td><input type="text" name="skuCode" id="skuCode01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                        <td style="min-width: 100px;">来源单行号：</td>
					                                        <td><input type="text" name="sourceRow" id="sourceRow01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                                    
					                                    <tr style="text-align: left;">
	                                        				<td colspan="8" style=" background-color: #FF8C69;">批次属性</td>
					                                    </tr>
					                                    <tr>
					                                        <td>生产日期：</td>
					                                        <td class="center">
					                                        	<input type="text" class="form-control form_datetime" readonly="readonly" style="width: 200px; height: 30px;" value="" id="skuProDate01" name="skuProDate">
															</td>
					                                        <td>失效日期：</td>
					                                        <td class="center">
					                                        	<input type="text" class="form-control form_datetime" readonly="readonly" style="width: 200px; height: 30px;" value="" id="skuFailDate01" name="skuFailDate">
															</td>
					                                        <td>生产批次号：</td>
					                                        <td class="center">
					                                        	<input type="text" name="skuProBatchNo" id="skuProBatchNo01"  readonly="readonly" class="form-control" style="width: 200px; height: 30px;">
															</td>
					                                        <td>入库日期：</td>
					                                        <td class="center">
					                                        	<input type="text" name="skuStorageDate" id="skuStorageDate01" readonly="readonly" class="form-control form_datetime"  style="width: 200px; height: 30px;">
															</td>
					                                    </tr>
					                                    <tr>
					                                        <td>供应商：</td>
					                                        <td class="center">
					                                        	<input type="text" name="supplierCode" id="supplierCode01" class="form-control" readonly="readonly" style="width: 200px; height: 30px;">
															</td>
					                                        <td>库存批次号：</td>
					                                        <td class="center"><input type="text" name="skuStockBatchBo" id="skuStockBatchBo01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>货品状态：</td>
					                                        <td class="center">
					                                        	<div class="control-group" style="border:none;text-align: left;">
					                                                <div class="controls" style="border:none;">
					                                                    <select style="border-radius: 5px;width: 100%;border: solid 1px #c7c7c7;height: 30px;" id="skuState01" name="skuState"  disabled="disabled" >
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
					                                        <td colspan="8" style=" background-color: #FF8C69;">作业情况</td>
					                                    </tr>
					                                    <tr>
					                                        <td>状态：</td>
					                                        <td class="center">
																<div class="control-group" style="border:none;text-align: left;">
					                                                <div class="controls" style="border:none;">
					                                                    <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="state02" name="state"  disabled="disabled"  >
					                                                        <option value="10">未完成</option>
					                                                        <option value="98">作废</option>
					                                                        <option value="99">作业完成</option>
					                                                    </select>
					                                                </div>
					                                            </div>
															</td>
					                                        <td>计划数量\净重：</td>
					                                        <td class="center"><input type="text" name="planQty" id="planQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>原库位：</td>
					                                        <td class="center"><input type="text" name="originalLocation" id="originalLocation01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>作业人：</td>
					                                        <td class="center"><input type="text" name="operation" id="operation01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                                    <tr>
					                                        <td>单位：</td>
					                                        <td class="center">
					                                        <input type="text" name="unit" id="unit01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;">
																<!-- <div class="control-group" style="border:none;text-align: left;">
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
					                                        <td>已作业数量\净重：</td>
					                                        <td class="center"><input type="text" name="actualQty" id="actualQty01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>推荐库位：</td>
					                                        <td class="center"><input type="text" name="recommendLocation" id="recommendLocation01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>作业时间：</td>
					                                         <td class="center"><input type="text" name="operationTime" id="operationTime01" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                     </table>
					    </form>               
					                     <div style="text-align: center;" id="recordDiv">
					                     <form id="recordForm">
						                     <table class="table">
						                                    <tr style="text-align: left;">
						                                        <td colspan="8" style=" background-color: #FF8C69;">录入作业结果</td>
						                                    </tr>
						                                    <tr>
						                                        <td>作业数量：</td>
						                                        <td class="center"><input type="text" name="operationQty" id="operationQty"  class="form-control input-small" style="width: 200px; height: 30px;"></td>
						                                        <td>实际库位：</td>
						                                        <td class="center"><input type="text" name=actualLocation id="actualLocation" class="form-control input-small" style="width: 200px; height: 30px;"></td>
						                                        <td></td>
						                                        <td></td>
						                                        <td></td>
						                                    </tr>
						                    </table>
						                    <button class="btn btn-primary btn-sm" type="button" id="btn_take_account01" style="margin-left: 20px;width: 76px;">提交</button>
					                    </form>
					                    </div>
						</div>
					<!-- 计划明细 end -->
					<!-- 作业记录begin -->
					<div class="tab-pane" id="tab_3">
						<div role="grid" class="box-body table-responsive" style="overflow-x: scroll;height: 150px;">
							<table id="operateRecordTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
						<form id="oprateRecordForm" action="#">
											<table  class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
														<tr>
					                                        <td style="min-width: 100px;border: none;">作业行号：</td>
					                                        <td style="border: none;"><input type="text" name="operationRow" id="operationRow03" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                        <td style="min-width: 100px;border: none;">收货交易号：</td>
					                                        <td><input type="text" name="storageInTradingNo" id="storageInTradingNo03" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                                    <tr>
					                                        <td style="min-width: 100px;">货品编码：</td>
					                                        <td><input type="text" name="skuCode" id="skuCode03" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                        <td style="min-width: 100px;">来源单行号：</td>
					                                        <td><input type="text" name="sourceRow" id="sourceRow03" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                                    
					                                    <tr style="text-align: left;">
	                                        				<td colspan="8" style=" background-color: #FF8C69;">批次属性</td>
					                                    </tr>
					                                    <tr>
					                                        <td>生产日期：</td>
					                                        <td class="center">
					                                        	<input type="text" class="form-control form_datetime" style="width: 200px; height: 30px;"   readonly="readonly"value="" id="skuProDate02" name="skuProDate">
															</td>
					                                        <td>失效日期：</td>
					                                        <td class="center">
					                                        	<input type="text" class="form-control form_datetime" style="width: 200px; height: 30px;"  readonly="readonly" value="" id="skuFailDate02" name="skuFailDate">
															</td>
					                                        <td>生产批次号：</td>
					                                        <td class="center">
					                                        	<input type="text" name="skuProBatchNo" id="skuProBatchNo02" class="form-control" readonly="readonly" style="width: 200px; height: 30px;">
															</td>
					                                        <td>入库日期：</td>
					                                        <td class="center">
					                                        	<input type="text" name="skuStorageDate" id="skuStorageDate02"  readonly="readonly" class="form-control form_datetime"  style="width: 200px; height: 30px;">
															</td>
					                                    </tr>
					                                    <tr>
					                                        <td>供应商：</td>
					                                        <td class="center">
					                                        	<input type="text" name="supplierCode" id="supplierCode02" class="form-control" readonly="readonly" style="width: 200px; height: 30px;">
															</td>
					                                        <td>库存批次号：</td>
					                                        <td class="center"><input type="text" name="skuStockBatchBo" id="skuStockBatchBo02" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>货品状态：</td>
					                                        <td class="center">
					                                        	<div class="control-group" style="border:none;text-align: left;">
					                                                <div class="controls" style="border:none;">
					                                                    <select style="border-radius: 5px;width: 100%;border: solid 1px #c7c7c7;height: 30px;" disabled="disabled" id="skuState02" name="skuState">
																				<option value="10">良品</option>
																				<option value="20">残品</option>
					                                                    </select>
					                                                </div>
					                                            </div>
					                                        </td>
					                                        <td></td>
					                                        <td class="center"></td>
					                                    </tr>
					                                    </table>
					                                  <table class="table">
					                                    <tr style="text-align: left;">
					                                        <td colspan="8" style=" background-color: #FF8C69;">作业情况</td>
					                                    </tr>
					                                    <tr>
					                                    	<td></td>
					                                        <td class="center">
															</td>
					                                        <td>作业数量\净重：</td>
					                                        <td class="center">
					                                        <input type="text" name="operationQty" id="operationQty03" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;">
															</td>
					                                        <td>原库位：</td>
					                                        <td class="center"><input type="text" name="originalLocation" id="originalLocation03" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>作业人：</td>
					                                        <td class="center"><input type="text" name="operation" id="operation03" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                                    <tr>
					                                    	<td></td>
					                                        <td class="center"></td>
					                                        <td>单位：</td>
					                                        <td class="center">
					                                        <input type="text" name="unit" id="unit03" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;">
																<!-- <div class="control-group" style="border:none;text-align: left;">
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
					                                        <td>目标库位：</td>
					                                        <td class="center"><input type="text" name="recommendLocation" id="recommendLocation03" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td>作业时间：</td>
					                                         <td class="center"><input type="text" name="operationTime" id="operationTime03" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
					                                    </tr>
					                                    <tr>
					                                        <td></td>
					                                        <td class="center"></td>
					                                        <td>实际库位：</td>
					                                        <td class="center"><input type="text" name=actualLocation id="actualLocation03" class="form-control" style="width: 200px; height: 30px;"></td>
					                                        <td></td>
					                                        <td></td>
					                                        <td></td>
					                                    </tr>
					                                    
							</table>
						</form>
						</div>
						<!-- 作业记录end -->
					</div>
				</div>
			</div>
		</div>
	</div>
 </div>
</div>

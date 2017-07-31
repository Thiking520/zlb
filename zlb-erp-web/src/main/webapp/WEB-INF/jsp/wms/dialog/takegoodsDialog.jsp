<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
	
<style type="text/css">
#leftMeun ul li{
	margin-top: 15px;
}
.col-md-10 .fixed-table-body{
	overflow: visible;
}
</style>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" style="text-align:-webkit-center;" aria-labelledby="myModal" aria-hidden="true">
	<div class="modal-dialog" style="width:100%;margin: 50px auto;" >
		<div class="modal-content" style="width:80%;height:780px;margin:0 auto;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="nav-tabs-custom">
				 <div id="leftMeun"  class="form-group col-md-1">
				 	<div class="row">
					<ul class="nav nav-pills nav-stacked">
						<li  data-href="/wms/storagein/takegoodsInfo"><a href="javascript:;">基本信息</a></li>
						<li class="active" data-href="/wms/storagein/takegoodsInfoDetail"><a href="javascript:;">入库单货品明细</a></li>
						<li data-href="/wms/storagein/takegoodsTransaction"><a href="javascript:;">收货记录</a></li>
						<li data-href="/wms/operationbill/operationbillDetail"><a href="javascript:;">上架列表</a></li>
					</ul>
					</div>
				</div>
				</div>
				<input type="hidden" id="storageInId">
				<input type="hidden" id="storStatu">
				<input type="hidden" id="supplierCodeHidden">
				<input type="hidden" id="supplierNameHidden">
				<div class="form-group col-md-1" style="width: 20px;height: 700px;border-left: 1px solid #999;margin-left: 2%"></div>
				<!-- 页面的动态加载 -->
				<div class="form-group col-md-10" style="padding-left:0px;"> 
				<div id="centerDiv"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="myOperateModal" tabindex="-2" role="dialog" style="text-align:-webkit-center;" aria-labelledby="myOperateModal" aria-hidden="true">
 <div class="modal-dialog" style="width:50%;margin: 50px auto;" >
	<div class="modal-content" style="width:1000px;">		
	  <div class="modal-header">
		<button type="button" class="close">
			<span>×</span>
		</button>
	  </div>
	<div class="modal-body">
							<table  class="table" style="margin-top: 10px;border: solid 1px #b1a2a2;">
								<tr style="text-align: left;">
                                       <td colspan="8" style=" background-color: #FF8C69;">收货操作</td>
                                   </tr>
                                   <tr>
                                       <td style="min-width: 100px;">货品编码：</td>
                                       <td colspan="5"><input type="text" name="skuCode" id="skuCode02" class="form-control" readonly="readonly" style="width: 200px; height: 30px;"></td>
                                   </tr>
                                   <tr>
                                       <td>应收数量：</td>
                                       <td class="center"><input type="text" name="expectQty" id="expectQty02" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                       <td>未收数量：</td>
                                       <td class="center"><input type="text" name="notReceiveQty" id="notReceiveQty02" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;"></td>
                                       <td>单位：</td>
                                       <td class="center">
                                       <input type="text" name="unit" id="unit02" readonly="readonly"  class="form-control" style="width: 200px; height: 30px;">
										<!-- <div class="control-group" style="border:none;">
                                               <div class="controls" style="border:none;">
                                                   <select style="border-radius: 5px;width: 200px;border: solid 1px #c7c7c7;height: 30px;" id="unit02" name="unit"  disabled="disabled" >
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
                                 </table>
                                 <form action="#" id="takeOperateForm">
	                                 <table class="table" style="border: solid 1px #b1a2a2;">
		                                   <tr style="text-align: left;">
		                                       <td colspan="8" style=" background-color: #FF8C69;">收货登记</td>
		                                   </tr>
		                                   <tr>
		                                       <td>生产日期：</td>
		                                       <td class="center">
		                                       	<div class="input-group input-append date form_datetime_month" style="width: 80%;">
												      		<input type="text" class="form-control" value="" id="skuProDate" name="skuProDate" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
															<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                				</div>
				                			   </td>
		                                       <td>失效日期：</td>
		                                       <td class="center"> 
												<div class="input-group input-append date form_datetime_month"  style="width: 80%;">
												      		<input type="text" class="form-control" value="" id="skuFailDate" name="skuFailDate" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
															<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                				</div>
					                		</td>
		                                   </tr>
		                                   <tr>
		                                       <td>入库日期：<span style="color: red;">*</span></td>
		                                       <td class="center">
		                                          <div class="input-group input-append date form_datetime_month" style="width: 80%;">
												      		<input type="text" class="form-control" value="" id="skuStorageDate" name="skuStorageDate" readonly>
															<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
															<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				                				  </div>
				                				</td>
		                                       <td>生产批次号：</td>
		                                       <td class="center"><input type="text" name="skuProBatchNo" id="skuProBatchNo" maxLength="16" class="form-control" style="width: 200px; height: 30px;"></td>
		                                   </tr>
		                                   <tr>
		                                       <td>供应商：</td>
		                                       <td class="center">
		                                        <div class="input-group" style="width: 250px; height: 30px;">
							                        <input name="supplierName" id="supplierName05" class="form-control input-small"  type="text" disabled="disabled" style="width: 200px; height: 30px;">
							                        <input name="supplierCode" id="supplierCode05" type="hidden"/>
							                        <div class="input-group-addon"><span class="glyphicon glyphicon-search" id="clickSupplier"></span></div>
							                    </div>
		                                       </td>
		                                       <td></td>
		                                       <td class="center"></td>
		                                   </tr>
		                                   <tr>
		                                       <td>良品数量：</td>
		                                       <td class="center"><input type="text" name="skuQty" id="skuQty05" maxLength="16" class="form-control" style="width: 200px; height: 30px;"></td>
		                                       <td>破损数量</td>
		                                       <td class="center"><input type="text" name="brokenQty" id="brokenQty05" maxLength="16" class="form-control" style="width: 200px; height: 30px;"></td>
		                                   </tr>
	                                 </table>
	                                 <table class="table" style="border: solid 1px #b1a2a2;">
	                                   <tr style="text-align: left;">
	                                       <td colspan="8" style=" background-color: #FF8C69;">拒收登记</td>
	                                   </tr>
	                                   <tr>
	                                       <td>拒收数量：</td>
	                                       <td class="center"><input type="text" name="refuseQty" id="refuseQty05" class="form-control" style="width: 200px; height: 30px;"></td>
	                                       <td>拒收原因：</td>
	                                       <td class="center"  colspan="2" >
											<div class="control-group" style="border:none;">
	                                               <div >
	                                                   <select  style="border-radius: 5px;width: 100%;border: solid 1px #c7c7c7;height: 30px;" id="refuseReason05" name="refuseReason">
															<option value="-" selected ="selected">-</option>
															<option value="10">质量不达标</option>
															<option value="20">超出的数量拒收</option>
	                                                   </select>
	                                               </div>
	                                           </div>
										</td>
	                                   </tr>
	                                   <tr>
	                                   <td>描述：</td>
	                                   <td colspan="5" class="center"><input type="text" name="refuseDesc" id="refuseDesc" class="form-control" style="height: 30px;"></td>
	                                   </tr>
									</table>
								</form>
		<button class="btn btn-primary btn-sm" id="btn_continue_submit" style="margin-left: 20px;">提交并继续收货</button>
		<button class="btn btn-primary btn-sm" id="btn_submit" style="margin-left: 20px;">提交</button>
        <button class="btn btn-primary btn-sm" id="btn_go_back" style="margin-left: 20px;">返回</button>
       </div>
</div>
</div>
</div>
<!--隐藏的供应商MODEL-->
<div class="modal fade" id="supplierModel" tabindex="-3" role="dialog"
     aria-labelledby="myModalLabel03" aria-hidden="true">
    <div class="modal-dialog" style="margin: 50px auto;" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel04"> 选择供应商</h4>
            </div>
            <div class="modal-body">
                <form id="fromModal03" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
                    <div class="controls controls-row">
                        <div class="form-group">
                            <span>编码:</span><input name="supplierCode" id="supplierC" class="form-control"
                                                   style="width: 100px;">
                        </div>
                        <div class="form-group">
                            <span>名称:</span><input name="shipper" id="shipper" class="form-control"
                                                   style="width: 130px;">
                        </div>

                        <button type="button" class="btn btn-success" id="btn_search_supplier">搜索</button>
                        <button type="button" class="btn btn-primary" id="clear_search_supplier">清空</button>
                    </div>
                </form>
                <table id="supplierTable"></table>
                <div class="modal-footer">
	               	 <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                     <button type="button" class="btn btn-primary" id="driver_supplier_save">确认</button>
	            </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="pickFpModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
	   <div class="modal-dialog">
	       <div class="modal-content" style="height: 300px">
	           <div class="modal-header">
	               <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                   &times;
	               </button>
	               <h4 class="modal-title" id="myModalLabel02" >
	                  	
	               </h4>
	           </div>
	           <div class="modal-body" id="pick_div">
	               <div class="form-group">
	                   <p class="col-md-3 control-label">分派：</p>
	                   <div class="col-md-6">
	                               <div class="input-group">
	                                   <input name="" id="pick_name" class="form-control input-small" type="text" disabled="disabled">
	                                   <input name="" id="emp_id" style="display: none;"/>
	                                   <div class="input-group-addon"><span class="glyphicon glyphicon-search" id="pick_div_emp"></span></div>
	                               </div>
	                               <div style="margin: 50px">
	                                   <button type="button" class="btn btn-primary" id="btn_pickQrEmp" >确定</button>
	                                   <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	                               </div>
	                   </div>
	               </div>
	           </div>
	       </div>
	   </div>
	</div>
	
<div class="modal fade" id="myModal03" tabindex="-1" role="dialog"
	     aria-labelledby="myModalLabel03" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal"
	                        aria-hidden="true">&times;</button>
	                <h4 class="modal-title" id="myModalLabel03">选择负责人</h4>
	            </div>
	            <div class="modal-body">
	                <form action="" class="form-inline" role="form" id="empForm">
	                    <div class="controls controls-row">
	                        <div class="form-group">
	                            <span>姓名:</span><input name="name_emp" id="name_emp"
	                                                   class="form-control" style="width: 100px;">
	                       </div>
	                       <div class="form-group">
	                           <span>电话:</span><input name="tel_emp" id="tel_emp"
	                                                  class="form-control" style="width: 130px;">
	                       </div>
	                       <div class="form-group">
	                           <button type="button" class="btn btn-success btn-flat" id="btn_search_emp">搜索</button>
	                           <button type="button" class="btn btn-primary btn-flat" id="clear_search_emp">清空</button>         
	                       </div>
	                   </div>
	               </form>
	                <table id="empList"></table>
	                <div class="modal-footer">
	               	<button type="button" class="btn btn-default"  data-dismiss="modal">取消</button>
	               	<button type="button" class="btn btn-primary" id="emp_save">确认</button>
	               </div>
	           </div>
	       </div>
	       <!-- /.modal-content -->
	   </div>
	   <!-- /.modal -->
	</div>
	
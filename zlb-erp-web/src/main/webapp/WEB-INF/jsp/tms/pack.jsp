<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	#divCss .fixed-table-toolbar{
		position: fixed;
		left: 92%;
		top:28%;
	}
	#packInfo{
		width: 100%;
	}
	#packInfo li {
		width: 170px;
		float: left;
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
	}
	#packInfo li:nth-child(odd) {
		width: 110px !important;
		text-align: right;
		margin-left: 10px;
	}
	#waybillInfo {
		width: 100%;
	}
	#waybillInfo li {
		width: 150px;
		float: left;
		height: 40px;
		line-height: 40px;
	}
	#waybillInfo li:nth-child(odd) {
		width: 90px !important;
		text-align: right;
		margin-left: 10px;
	}
	#targetInfo{
		width: 100%;
	}
	#targetInfo li {
		width: 150px;
		float: left;
		height: 40px;
		line-height: 40px;
		margin-bottom: 10px;
	}
	#targetInfo li:nth-child(odd) {
		width: 90px !important;
		text-align: right;
		margin-left: 30px;
		
	}
	#control li{
		width: 100%;
		height: 30px;
		margin-top: 30px;
	}
	#control li input {
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 100%;
	}
</style>
</head>
<body class="skin-blue">
	<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>配送管理>装箱管理</h2>
						<!-- 嵌入我负责的站点界面 -->
						<%@include file="myDistributionSite.jsp"%>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content" >
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">

							<form id="addOrEditeSearchForm" class="form-inline" role="form">
								<div class="controls controls-row">
									<div class="form-group">
								   	<span>装箱单号：</span><input name="packListNum" id="packListNum" type="text" class="form-control input-small" />	
								   </div>
								   <div class="form-group">
								   	<span>派车单号：</span><input name="dispatchVehicleId_s" id="dispatchVehicleId_s" type="text" class="form-control input-small" />
								   </div>
								   <!-- <div class="form-group">
								   	<span>运单号：</span><input name="wayBillNum" id="wayBillNum" type="text" class="form-control input-small" />
								   </div> -->
							        <div class="form-group">
								      		<label>状态：</label>	
									        <select class="form-control" name="dispatchStatus" id="dispatchStatus">
											    <option value="">全部</option>
											    <option value="10">新增</option>
									    		<option value="20">确认</option>
									    		<option value="30">已装车</option>
									    		<option value="40">配送中</option>
									    		<option value="50">已取消</option>
									    		<option value="99">已签收</option>
										    </select>
									</div>
						        	<div class="form-group">
							        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
							        </div>
							        
							        <div class="form-group">
							        	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
							        </div>
						         </div>
							</form>
						</div>
						<!-- 表单查询区域end -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新建</button>
							    <!-- <button type="button" class="btn btn-default  btn-sm" id="btn_show_look"><span class="glyphicon glyphicon-zoom-in" style="color: green;"></span>查看</button> -->
							    <button type="button" class="btn btn-default  btn-sm" id="btn_add_waybill"><span class="glyphicon glyphicon-log-in" style="color:green;"></span>添加运单</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_print"><span class="glyphicon glyphicon-download-alt" style="color:green;"></span>打印</button>
							 </div>
							</div>
						</div>
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive" >
					        <div id="divCss">
								<table id="packingListTable" class="table table-hover table-striped table-bordered" >
									
								</table>
							</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->
					
				</div>
			</div>
		</div>
	</div>
    </div>
	</div>
	</section>

	<form id="addAnchorForm" method="post">
		<div class="modal fade" id="myModal" tabindex="-2" role="dialog" aria-labelledby="myModalLabel" style="overflow: scroll;">
		    <div class="modal-dialog" role="document" style="width: 1200px;">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新建</h4>
		        </div>
		       <label style="color: #2FA4E7;margin-left: 20px;">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">装箱信息</label>————————————————————————————————————————————————————————————————————————————</label>
		        <%-- ===================================这里新增页面==========================Start==== --%>
		        <div class="modal-body" style="padding-top:0px;height: 800px;width:1200px;">
		        	<ul id="packInfo">
		        		<li style="margin-left: 0px;"><label>装箱单号：</label></li>
		        		<li><input type="text" name="packListNum" class="form-control" id="packListNum" readonly="readonly" style="width:170px;display: inline;"></li>
		        		<li><label>装箱单：</label></li>
		        		<li><input type="text" name="packList" class="form-control" id="packList" maxlength="20" style="width:170px;display: inline;"></li>
		        		<li><label><span class="text-required">*</span>派车单号：</label></li>
		        		<li>
		        			<div style="width: 170px;float: right;">
					      		<div style="float: left;"><input class="form-control input-small" id="dispatchVehicleId" name="dispatchVehicleId" readonly="readonly" type="text" style="width: 130px;"></div>
					    		<div class="input-group-addon findDispatch" id="findDispatch" style = "background: white;width: 40px;height:38px;float:left;"><span id="glyphicon-search-1" class="glyphicon glyphicon-search"></span></div>
					    	</div>
					    </li>
		        		<li><label><span class="text-required">*</span>状态：</label></li>
					    <li>
					    	<select class="form-control" disabled="disabled" name="status" id="status" style="width: 170px;display: inline;">
					    		<option value="0">新建</option>
					    	</select>
					    </li>
					    
					    <li style="margin-left: 0px;clear: both;"><label>预计发车时间：</label></li>
		        		<li><input type="text" name="planDepartTime" class="form-control" id="planDepartTime" readonly="readonly" style="width:170px;display: inline;"></li>
		        		<li><label>发货站点：</label></li>
		        		<li>
		        			<select class="form-control" name="point" id="point" style="width: 170px;display: inline;">
		        				
		        			</select>
		        		</li>
		        		<li><label>面单打印标记：</label></li>
		        		<li>
		        			<select class="form-control" name="surfacePrintStatus" disabled="disabled" id="surfacePrintStatus" style="width: 170px;display: inline;">
		        				<option value=""></option>
		        				<option value="0">未打印</option>
		        				<option value="1">已打印</option>
		        			</select>
		        		</li>
		        		<li><label>车牌号：</label></li>
		        		<li><input type="text" name="carNumber" class="form-control" id="carNumber" readonly="readonly" style="width:170px;display: inline;"></li>
					    
					    <li style="margin-left: 0px;clear: both;"><label>总重量：</label></li>
		        		<li><input type="text" name="totalWeight" class="form-control" maxlength="10" id="totalWeight" style="width:170px;display: inline;"></li>
		        		<li><label>总体积：</label></li>
		        		<li><input type="text" maxlength="10" name="totalVolume" class="form-control" id="totalVolume"  style="width:170px;display: inline;"></li>
		        		<li><label>司机：</label></li>
		        		<li><input type="text" name="driverName" class="form-control" id="driverName" readonly="readonly" style="width:170px;display: inline;"></li>
		        		<li><label>备注：</label></li>
		        		<li><input type="text" name="remarks" class="form-control" maxlength="100" id="remarks" style="width:170px;display: inline;"></li>
		        	</ul>
		        	<label style="color: #2FA4E7">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">运单信息</label>————————————————————————————————————————————————————————————————————————————</label>
		        	<ul id="waybillInfo">
		        		<!-- <li style="margin-left: 0px;"><label>运单分类：</label></li>
		        		<li><select class="form-control" name="operatorId" id="operatorId" style="width: 170px;display: inline;"></select></li> -->
		        		<li><label>顾客姓名：</label></li>
		        		<li><input type="text" name="uniquekey" class="form-control" id="consumerName" style="width:150px;display: inline;"></li>
		        		<!-- <li><label>收货站点：</label></li>
		        		<li><select class="form-control" name="operatorId" id="operatorId" style="width: 170px;display: inline;"></select></li> -->
		        		<li><label>收货地址：</label></li>
		        		<li><input class="form-control" id="consumerAddress" style="width: 170px;display: inline;"/></li>
		        		<li style="width: 60px;"><button id="btn_search_s" class="btn btn-success btn-flat" type="button">搜索</button></li>
		        		<li style="width: 60px;padding-left: 10px;"><button id="btn_clean_s" class="btn btn-primary btn-flat" type="button">清空</button></li>
		        	</ul>
		        	<div style="border: 1px solid #CCC;width: 100%;margin-top: 45px;"></div>
		        	<div style="width: 100%;height: 410px;">
		        		<div style="width: 45%;height: 100%;float: left;">
		        			<div style="text-align: center;font-weight: bold;">可选运单</div>
		        			<div id="left" style="width: 100%;height: 90%;border: 1px solid #CCC;border-radius: 5px;overflow: auto;">
		        				<input type="hidden" id="ipt_dispatchVehicleId"/>
		        				<table id="s1" name="s1">
		        					
		        				</table>
		        			</div>
		        		</div>
		        		<div style="width: 60px;height: 100%;margin-left: 20px;margin-right: 20px;float: left;">
		        			<div style="text-align: center;">&nbsp;</div>
		        			<div id="right" style="width: 100%;height: 90%;">
		        				<ul id="control" style="padding-top: 50px;">
		        					<li><input id="b1" type="button" value="--&gt;"/></li>
		        					<li><input type="button" id="b2" value="--&gt;&gt;" /></li>
		        					<li><input type="button" id="b3" value="&lt;--" /></li>
		        					<li><input type="button" id="b4" value="&lt;&lt;--" /></li>
		        				</ul>
		        			</div>
		        		</div>
		        		<div style="width: 45%;height: 100%;float: left;overflow: auto;">
		        			<div style="text-align: center;font-weight: bold;">已选运单</div>
		        			<div id="right" style="width: 100%;height: 90%;border: 1px solid #CCC;border-radius: 5px;">
		        				<!-- <select id="s2" name="s2" style="width:100%;height:100%;" multiple="multiple"></select> -->
		        				<table id="s2" name="s2">
		        					
		        				</table>
		        			</div>
		        		</div>
		        	</div>
		        	<!-- <div style="width: 100%;text-align: center;">
		        		<button id="btn_search" class="btn-sm btn-success btn-flat" type="button">确认</button>
		        		<button style="margin-left: 50px;" id="btn_clean" class="btn-sm btn-primary btn-flat" type="button">取消</button>
		        	</div> -->
		        	<label style="color: #2FA4E7">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">目的地信息</label>———————————————————————————————————————————————————————————————————————————</label>
		        	<ul id="targetInfo">
		        		<li><label>收货公司：</label></li>
		        		<li><input type="text" name="receivingCompany" maxlength="30" class="form-control" id="receivingCompany" style="width:150px;display: inline;"></li>
		        		<li><label>收货联系人：</label></li>
		        		<li><input type="text" name="receiver" maxlength="20" class="form-control" id="receiver" style="width:150px;display: inline;"></li>
		        		<li><label>联系人邮箱：</label></li>
		        		<li><input type="text" name="contactEmail" maxlength="30" class="form-control" id="contactEmail" style="width:150px;display: inline;"></li>
		        		<li><label>联系人手机：</label></li>
		        		<li><input type="text" name="contactPhone" maxlength="20" class="form-control" id="contactPhone"  style="width:150px;display: inline;"></li>
		        		<li style="clear: both;"><label>收件地址：</label></li>
		        		<li style="width: 420px;"><input type="text" maxlength="100" name="receiveAddress" class="form-control" id="receiveAddress" style="width:420px;display: inline;"></li>
		        	</ul>
		        	
			       <%-- ===================================这里新增页面==========================Start==== --%>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_save_submit"  type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="dispatchList" tabindex="9999" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog" style="width: 700px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							派车单列表
						</h4>
					</div>
					<div class="modal-body">
						<form id="selectFrom" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
							<div class="controls controls-row" style="margin-bottom: 20px">
								<div class="form-group">
						    		<span>派车单号:</span><input name="dispatchVehicle_s" id="dispatchVehicle_s" class="form-control" style="width: 130px;">
						    	</div>
								<div class="form-group">
									<span>司机姓名:</span><input name="driverName_s" id="driverName_s" class="form-control" style="width: 100px;">
						    	</div>
						    	<div class="form-group">
						    		<span>车牌号:</span><input name="carNo_s" id="carNo_s" class="form-control" style="width: 130px;">
						    	</div>
						    	<div class="form-group" style="">
									<button type="button" class="btn btn-success" id="btn_search_driver" >搜索</button>
									<button type="button" class="btn btn-primary" style="margin-left: 5px" id="btn_clean_car" >清空</button>
						    	</div>
						    </div>
							<table id="dispatchOrderList"></table>
						</form>
					</div>
					<div style="margin-left: 560px; margin-bottom: 20px">
						<button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
						<button style="margin-left: 5px" type="button" class="btn btn-primary" id="dispatch_save" >确认</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

	<!-- 查看 -->
	<form id="lookForm" method="post">
		<div class="modal fade" id="lookModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" role="document" style="width: 1200px;">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabelLook">查看</h4>
		        </div>
		       <label style="color: #2FA4E7;margin-left: 20px;">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">装箱信息</label>————————————————————————————————————————————————————————————————————————————</label>
		        <%-- ===================================这里新增页面==========================Start==== --%>
		        <div class="modal-body" style="padding-top:0px;height: 730px;">
		        	<ul id="packInfo">
		        		<li style="margin-left: 0px;"><label>装箱单号：</label></li>
		        		<li><input type="text" name="packListNum_l" class="form-control" id="packListNum_l" readonly="readonly" style="width:170px;display: inline;"></li>
		        		<li><label>装箱单：</label></li>
		        		<li><input type="text" name="packList_l" readonly="readonly" class="form-control" id="packList_l" style="width:170px;display: inline;"></li>
		        		<li><label><span class="text-required">*</span>派车单号：</label></li>
		        		<li>
		        			<div style="width: 170px;float: right;">
					      		<div style="float: left;"><input class="form-control input-small" id="dispatchVehicleId_l" name="dispatchVehicleId_l" readonly="readonly" type="text" style="width: 170px;"></div>
					    	</div>
					    </li>
		        		<li><label><span class="text-required">*</span>状态：</label></li>
					    <li>
					    	<select class="form-control" disabled="disabled" name="status" id="status_l" style="width: 170px;display: inline;">
					    		<option value="10">新增</option>
					    		<option value="20">确认</option>
					    		<option value="30">已装车</option>
					    		<option value="40">配送中</option>
					    		<option value="50">已取消</option>
					    		<option value="99">已签收</option>
					    	</select>
					    </li>
					    
					    <li style="margin-left: 0px;clear: both;"><label>预计发车时间：</label></li>
		        		<li><input type="text" name="planDepartTime_l" class="form-control" id="planDepartTime_l" readonly="readonly" style="width:170px;display: inline;"></li>
		        		<li><label>发货站点：</label></li>
		        		<li>
		        			<select class="form-control" name="point_l" disabled="disabled" id="point_l" style="width: 170px;display: inline;">
		        				
		        			</select>
		        		</li>
		        		<li><label>面单打印标记：</label></li>
		        		<li>
		        			<select class="form-control" name="surfacePrintStatus_l" disabled="disabled" id="surfacePrintStatus_l" style="width: 170px;display: inline;">
		        				<option value="" ></option>
		        				<option value="0">未打印</option>
		        				<option value="1">已打印</option>
		        			</select>
		        		</li>
		        		<li><label>车牌号：</label></li>
		        		<li><input type="text" name="carNumber_l" class="form-control" id="carNumber_l" readonly="readonly" style="width:170px;display: inline;"></li>
					    
					    <li style="margin-left: 0px;clear: both;"><label>总重量：</label></li>
		        		<li><input type="text" name="totalWeight_l" readonly="readonly" class="form-control" id="totalWeight_l" style="width:170px;display: inline;"></li>
		        		<li><label>总体积：</label></li>
		        		<li><input type="text" name="totalVolume_l" readonly="readonly" class="form-control" id="totalVolume_l"  style="width:170px;display: inline;"></li>
		        		<li><label>司机：</label></li>
		        		<li><input type="text" name="driverName_l" class="form-control" id="driverName_l" readonly="readonly" style="width:170px;display: inline;"></li>
		        		<li><label>备注：</label></li>
		        		<li><input type="text" name="remarks_l" readonly="readonly" class="form-control" id="remarks_l" style="width:170px;display: inline;"></li>
		        	</ul>
		        	<label style="color: #2FA4E7">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">运单信息</label>————————————————————————————————————————————————————————————————————————————</label>
		        	<!-- <div style="border: 1px solid #CCC;width: 100%;"></div> -->
		        	<div style="width: 100%;height: 410px;" id="lookDV">
		        		<div style="width: 100%;height: 100%;float: left;">
		        			<!-- <div style="text-align: left;font-weight: bold;padding-left: 25px;">已选运单</div> -->
		        			<div id="right_l" style="width: 100%;height: 90%;border: 1px solid #CCC;border-radius:5px ">
		        				<!-- <select id="s2" name="s2" style="width:100%;height:100%;" multiple="multiple"></select> -->
		        				<table id="s2_l" name="s2">
		        					
		        				</table>
		        			</div>
		        		</div>
		        	</div>
		        	
		        	<div style="width: 100%;height: 410px;" id="addwaybillDV">
		        		<div style="width: 45%;height: 100%;float: left;">
		        			<div style="text-align: center;font-weight: bold;">可选运单</div>
		        			<div id="left_e" style="width: 100%;height: 90%;border: 1px solid #CCC;border-radius: 5px;overflow: auto;">
		        				<input type="hidden" id="ipt_dispatchVehicleId"/>
		        				<table id="s1_e" name="s1_e">
		        					
		        				</table>
		        			</div>
		        		</div>
		        		<div style="width: 60px;height: 100%;margin-left: 20px;margin-right: 20px;float: left;">
		        			<div style="text-align: center;">&nbsp;</div>
		        			<div id="right" style="width: 100%;height: 90%;">
		        				<ul id="control" style="padding-top: 50px;">
		        					<li><input id="b1_e" type="button" value="--&gt;"/></li>
		        					<li><input type="button" id="b2_e" value="--&gt;&gt;" /></li>
		        					<li><input type="button" id="b3_e" value="&lt;--" /></li>
		        					<li><input type="button" id="b4_e" value="&lt;&lt;--" /></li>
		        				</ul>
		        			</div>
		        		</div>
		        		<div style="width: 45%;height: 100%;float: left;overflow: auto;">
		        			<div style="text-align: center;font-weight: bold;">已选运单</div>
		        			<div id="right_e" style="width: 100%;height: 90%;border: 1px solid #CCC;border-radius: 5px;">
		        				<!-- <select id="s2" name="s2" style="width:100%;height:100%;" multiple="multiple"></select> -->
		        				<table id="s2_e" name="s2_e">
		        					
		        				</table>
		        			</div>
		        		</div>
		        	</div>
		        	
		        	
		        	<label style="color: #2FA4E7">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">目的地信息</label>———————————————————————————————————————————————————————————————————————————</label>
		        	<ul id="targetInfo">
		        		<li><label>收货公司：</label></li>
		        		<li><input type="text" name="receivingCompany_l" readonly="readonly" class="form-control" id="receivingCompany_l" style="width:150px;display: inline;"></li>
		        		<li><label>收货联系人：</label></li>
		        		<li><input type="text" name="receiver_l" readonly="readonly" class="form-control" id="receiver_l" style="width:150px;display: inline;"></li>
		        		<li><label>联系人邮箱：</label></li>
		        		<li><input type="text" name="contactEmail_l" readonly="readonly" class="form-control" id="contactEmail_l" style="width:150px;display: inline;"></li>
		        		<li><label>联系人手机：</label></li>
		        		<li><input type="text" name="contactPhone_l" readonly="readonly" class="form-control" id="contactPhone_l"  style="width:150px;display: inline;"></li>
		        		<li style="clear: both;"><label>收件地址：</label></li>
		        		<li style="width: 420px;"><input type="text" readonly="readonly" name="receiveAddress_l" class="form-control" id="receiveAddress_l" style="width:420px;display: inline;"></li>
		        	</ul>
		        	
			       <%-- ===================================这里新增页面==========================Start==== --%>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal" id="close_e"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
		          <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel_e">取消</button><button style="margin-left: 5px" type="button" class="btn btn-primary" id="save_e" >确认</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>


	 <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
		<script
		src="${contextPath}/resources/js/business/tms/util/util.js"
		type="text/javascript"></script>
		<script
		src="${contextPath}/resources/js/business/tms/pack.js"
		type="text/javascript"></script>

		<script type="text/javascript" src="${contextPath}/resources/js/business/tms/multipleSelect/lab2.js"></script>
</body>
	<script>
		$(function () { 
			$("[data-toggle='popover']").popover();
		});
	</script>
</html>
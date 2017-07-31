<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	#ipt li{
		float: left;
		height: 40px;
		line-height: 40px;
		margin-top: 20px;
	}
	#ipt li:nth-child(odd) {
		width: 90px !important;
		text-align: right;
		margin-left: 30px;
		padding-right: 20px;
	}
</style>
</head>
<body class="skin-blue">
	<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>配送管理>短信发送记录</h2>
						<!-- 嵌入我负责的站点界面 -->
						<%@include file="myDistributionSite.jsp"%>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
					<!-- 表单查询区域begin -->
					<div class="alert alert-info">

						<form id="addOrEditeSearchForm" class="form-inline" role="form" >
							<div class="controls controls-row">
								<div class="form-group">
							   	<span>短信编码：</span><input name="smsCode_s" id="smsCode_s" type="text" class="form-control input-small" />	
							   </div>
							   <div class="form-group">
							   	<span>主题：</span><input name="theme_s" id="theme_s" type="text" class="form-control input-small" />
							   </div>
							   <div class="form-group">
							   	<span>发送内容：</span><input name="content_s" id="content_s" type="text" class="form-control input-small" />
							   </div>
						        <div class="form-group">
						      		<label>状态：</label>	
							        <select class="form-control" name="status_s" id="status_s">
							        	<option value="">全部</option>
									    <option value="1">发送成功</option>
							    		<option value="0">发送失败</option>
							    		<option value="2">发送中</option>
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
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>发送短信</button>
							 </div>
							</div>
						</div>
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
					        <div id="divCss">
								<table id="smsRecordListTable" class="table table-hover table-striped table-bordered" >
									
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
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" role="document" style="width: 600px;">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">发送短信</h4>
		        </div>
		        <div style="width: 600px;height: 300px;">
		        	<ul id="ipt">
		        		<li>短信编号</li>
		        		<li><input type="text" name="smsNum" class="form-control" id="smsNum" readonly="readonly" style="width:170px;"></li>
		        		<li>接收人数</li>
		        		<li>
		        			<input class="form-control input-small" type="text" name="receiverNum" id="receiverNum" style="width: 130px;" readonly="readonly">
						    <div class="input-group-addon" style="background-color: white;width: 40px;height: 38px;position: absolute;left: 90.4%;top:19.4%;"><span class="glyphicon glyphicon-search" id="btn_show_waybill"></span></div>
		        		</li>
		        		<li  style="clear: both;">短信模版</li>
		        		<li>
		        			<input type="hidden" id="templateId"/>
		        			<input class="form-control input-small" type="text" name="templateCode" id="templateCode" style="width: 130px;" readonly="readonly">
						    <div class="input-group-addon" style="background-color: white;width: 40px;height: 38px;position: absolute;left: 41.9%;top:32.9%;"><span class="glyphicon glyphicon-search" id="btn_show_template"></span></div>
		        		</li>
		        		<li style="margin-left: 70px;">短信主题</li>
		        		<li><input type="text" readonly="readonly" name="theme" class="form-control" id="theme" style="width:170px;"></li>
		        		<li style="clear: both;height: 110px;">短信内容</li>
		        		<li style="width: 460px;height: 110px;"><textarea readonly="readonly" class="form-control" id="content" style="line-height: 16px;" cols="73" rows="7"></textarea></li>
		        	</ul>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_send_sms"  type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>发送</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="wayBillModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog" style="width: 910px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							接收人选取
						</h4>
					</div>
					<div class="modal-body">
						<form id="selectFrom" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
							<div class="controls controls-row" style="margin-bottom: 20px">
								<div class="form-group">
						    		<span>派车单号:</span><input name="disPatch_s" id="disPatch_s" class="form-control" style="width: 125px;">
						    	</div>
								<div class="form-group">
									<span>运单号:</span><input name="wayBill_s" id="wayBill_s" class="form-control" style="width: 125px;">
						    	</div>
						    	<div class="form-group">
						    		<span>装箱单号:</span><input name="packCode_s" id="packCode_s" class="form-control" style="width: 125px;">
						    	</div>
						    	<div class="form-group">
						    		<span>收件人姓名:</span><input name="consumerName_s" id="consumerName_s" class="form-control" style="width: 125px;">
						    	</div>
						    	<div class="form-group">
									<button type="button" class="btn-sm btn-success" id="btn_search_rec" >搜索</button>
									<button type="button" class="btn-sm btn-primary" style="margin-left: 5px" id="btn_clean_rec" >清空</button>
						    	</div>
						    </div>
							<table id="wayBillListTable"></table>
						</form>
					</div>
					<div style="margin-left: 760px; margin-bottom: 20px">
						<button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
						<button type="button" class="btn btn-primary" id="wayBill_save" >确认</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

<!-- 模态框（Modal） -->
		<div class="modal fade" id="templateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog" style="width: 910px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							短信模版选取
						</h4>
					</div>
					<div class="modal-body">
						<form id="templateFrom" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
							<div class="controls controls-row" style="margin-bottom: 20px">
								<div class="form-group">
						    		<span>模版编码:</span><input name="templateCode_s" id="templateCode_s" class="form-control" style="width: 170px;">
						    	</div>
						    	<div class="form-group" style="margin-left: 20px;margin-right: 20px;">
						    		<span>短信主题:</span><input name="templateTheme_s" id="templateTheme_s" class="form-control" style="width: 170px;">
						    	</div>
						    	<div class="form-group">
						    		<span>短信内容:</span><input name="templateContent_s" id="templateContent_s" class="form-control" style="width: 170px;">
						    	</div>
						    	<div class="form-group">
									<button type="button" class="btn-sm btn-success" id="btn_search_template" >搜索</button>
									<button type="button" class="btn-sm btn-primary" style="margin-left: 5px" id="btn_clean_template" >清空</button>
						    	</div>
						    </div>
							<table id="templateListTable"></table>
						</form>
					</div>
					<div style="margin-left: 760px; margin-bottom: 20px">
						<button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
						<button type="button" class="btn btn-primary" id="template_save" >确认</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

<!-- 查看模态框（Modal） -->
		<div class="modal fade" id="myModal_l" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" role="document" style="width: 600px;">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel_l">短信详情</h4>
		        </div>
		        <div style="width: 600px;height: 300px;">
		        	<ul id="ipt">
		        		<li>短信编号</li>
		        		<li><input type="text" name="smsNum_l" class="form-control" id="smsNum_l" readonly="readonly" style="width:170px;"></li>
		        		<li  style="clear: both;">短信模版</li>
		        		<li>
		        			<input class="form-control input-small" type="text" name="templateCode_l" id="templateCode_l" style="width: 170px;" readonly="readonly">
		        		</li>
		        		<li style="margin-left: 30px;">短信主题</li>
		        		<li><input type="text" readonly="readonly" name="theme_l" class="form-control" id="theme_l" style="width:170px;"></li>
		        		<li style="clear: both;height: 110px;">短信内容</li>
		        		<li style="width: 460px;height: 110px;"><textarea readonly="readonly" class="form-control" id="content_l" style="line-height: 16px;" cols="73" rows="7"></textarea></li>
		        	</ul>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal" id="btn_close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
		        </div>
		      </div>
		    </div>
		  </div>

	 <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
		<script
		src="${contextPath}/resources/js/business/tms/sms.js"
		type="text/javascript"></script>

</body>
	<script>
		$(function () { 
			$("[data-toggle='popover']").popover();
		});
	</script>
</html>
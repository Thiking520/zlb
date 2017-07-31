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
						<h2><i class="glyphicon glyphicon-user"></i>配送管理>短信模版</h2>
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
							   	<span>模版编码：</span><input name="templateCode_s" id="templateCode_s" type="text" class="form-control input-small" />	
							   </div>
							   <div class="form-group">
							   	<span>模版主题：</span><input name="theme_s" id="theme_s" type="text" class="form-control input-small" />
							   </div>
							   <div class="form-group">
							   	<span>短信内容：</span><input name="content_s" id="content_s" type="text" class="form-control input-small" />
							   </div>
						        <div class="form-group">
						      		<label>状态：</label>	
							        <select class="form-control" name="status_s" id="status_s">
							        	<option value="">全部</option>
							    		<option value="0">禁用</option>
							    		<option value="1">启用</option>
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
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_true"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>启用</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_false"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>禁用</button>
							 </div>
							</div>
						</div>
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
					        <div id="divCss">
								<table id="templateListTable" class="table table-hover table-striped table-bordered" >
									
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
		          <h4 class="modal-title" id="myModalLabel">新增短信模版</h4>
		        </div>
		        <div id="mainDV" style="width: 600px;height: 240px;">
		        	<ul id="ipt">
		        		<li>编号</li>
		        		<li><input type="text" name="smsNum" class="form-control" id="smsNum" readonly="readonly" style="width:170px;"><input type="hidden" id="ipt_id"/></li>
		        		<li>短信主题</li>
		        		<li><input type="text" name="theme" class="form-control" id="theme" maxlength="10" style="width:170px;"></li>
		        		<li style="clear: both;height: 110px;">短信内容</li>
		        		<li style="width: 460px;height: 110px;"><textarea class="form-control" maxlength="100" id="content" style="line-height: 16px;" cols="73" rows="7"></textarea></li>
		        		<li id="title" style="clear: both;margin-top: 40px;">短信参数</li>
		        		<li id="opContent" style="margin-top: 40px;">
		        			<select class="form-control" onchange="appendText();" name="smsParam" id="smsParam" style="width: 170px;display: inline;">
		        				<option value=""></option>
		        				<option value="0">运单号</option>
		        				<option value="1">运单收货人</option>
		        				<option value="2">运单收货人电话</option>
		        				<option value="3">运单收货人地址</option>
		        				<option value="4">装箱单号</option>
		        				<option value="5">装箱单收货人</option>
		        				<option value="6">装箱单收货人电话</option>
		        				<option value="7">装箱单收货人地址</option>
		        				<option value="8">派车单号</option>
		        				<option value="9">订单号</option>
		        				<option value="10">发货站点</option>
		        				<option value="11">收货站点</option>
		        				<option value="12">运营站点</option>
		        				<option value="13">运营商</option>
		        			</select>
		        		</li>
		        	</ul>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button type="button" style="margin-left: 493px;" data-dismiss="modal" class="btn btn-default" id="btn_close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
		          <button id="btn_save_submit" type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		          <button id="btn_edit_submit" style="display: none;" type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="dispatchList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog" style="width: 680px;">
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
						    		<span>派车单号:</span><input name="tel" id="tel" class="form-control" style="width: 130px;">
						    	</div>
								<div class="form-group">
									<span>司机姓名:</span><input name="driverName_s" id="driverName_s" class="form-control" style="width: 100px;">
						    	</div>
						    	<div class="form-group">
						    		<span>车牌号:</span><input name="tel" id="tel" class="form-control" style="width: 130px;">
						    	</div>
						    	<div class="form-group">
									<button type="button" class="btn-sm btn-success" id="btn_search_driver" >搜索</button>
									<button type="button" class="btn-sm btn-primary"  style="margin-left: 5px" id="btn_clean" >清空</button>
						    	</div>
						    </div>
							<table id="dispatchOrderList"></table>
						</form>
					</div>
					<div style="margin-left: 530px; margin-bottom: 20px">
						<button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
						<button type="button" class="btn btn-primary" id="dispatch_save" >确认</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>


	 <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
		<script
		src="${contextPath}/resources/js/business/tms/template.js"
		type="text/javascript"></script>

</body>
	<script>
		$(function () { 
			$("[data-toggle='popover']").popover();
		});
	</script>
</html>
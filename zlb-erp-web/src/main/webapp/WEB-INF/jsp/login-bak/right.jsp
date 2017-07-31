<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>demo</title>
    <!-- ★ 导入公共样式库 -->
  	<%@include file="../common/commonCss.jsp"%>
</head>
<body class="skin-blue">
	<aside class="right-side"> 
	    <!-- 1 框架头部区域begin -->
		<section class="content-header">
			<h4>
				<ol class="breadcrumb">
					<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
					<li><a href="#">demo管理</a></li>
					<li class="active" href="${contextPath}/demo/list" >demo列表</li>
				</ol>
			</h4>
		</section> 
	    <!-- 1 框架头部区域end -->
	    
	    <!-- 2 框架数据主体区域begin -->
		<section class="content">
		<div class="row">
			<div class="col-xs-12">
				<div class="box box-warning">
				
				<!-- (表单+列表)begin -->
				<div class="box-body">
					<!-- 表单查询区域begin -->
					<form role="form"  class="form-inline" id="mainForm" action="${contextPath}/demmo/list"
						onSubmit="return false;" method="get">
						<div class="form-group col-md-1">
							<!-- 下拉框 -->
							<select class="form-control" name="order" id="order">
								<option value=''>--订单号--</option>
								<option value='1'>订单1</option>
								<option value='3'>订单2</option>
							</select>
						</div>
						<div class="form-group col-md-1">
							
							<input type="text" id="searchContent" name="searchContent"
								onkeydown="if(event.keyCode==13){$('#demoTable').bootstrapTable('refresh');}"
								class="form-control input-small" placeholder="输入">
						</div>
						<!--时间控件  -->
						<div class="controls">
							<div id="reportrange" class="pull-left dateRange">
								<h4>
									<label class="control-label">&nbsp;&nbsp;&nbsp;下单时间：</label> <i
										class="glyphicon glyphicon-calendar fa fa-calendar"></i> <span
										id="searchDateRange"></span><b class="caret"></b>
								</h4>
							</div>
						</div>
						<div class="form-group col-md-2">
							<!-- 下拉框 -->
							<label>付款方式：
								<select class="form-control" name="pay" id="pay">
									<option value='0'>支付宝</option>
									<option value='1'>微信</option>
									<option value='3'>银联</option>
								</select>
							</label>
						</div>
					</form>
					<button id="btn_search" class="btn btn-success btn-flat"
						type="button">搜索</button>
					<!-- 导航列表 -->
					<div style="Height: 15px;"></div>
					<!--样式一  -->
					<hr class="feature-divider">
					<ul class="nav nav-tabs pull-left" role="tablist" id="feature-tab">
						<li class="active"><a href="#tab-all" role="tab" data-toggle="tab">全部</a></li>
						<li><a href="#tab-1" role="tab" data-toggle="tab">待付款企业</a></li>
						<li><a href="#tab-2" role="tab" data-toggle="tab">待客户审核</a></li>
						<li><a href="#tab-3" role="tab" data-toggle="tab">待财务审核</a></li>
					</ul>
					<div class="pull-right">
						<button id="btn_addKeyword" class="btn btn-success btn-flat"
							type="button">新建订单</button>
						<button id="btn_search" class="btn btn-success btn-flat"
							type="button">批量导出</button>
					</div>
					
					<div style="Height: 60px;"></div>
					<!-- 样式二 -->
					<div>
						<ul class="nav navbar-nav pull-left" style="margin-left: 15px;">
							<li class="active"><a href="#">全部</a></li>
							<li><a href="#">待付款企业</a></li>
							<li><a href="#">待客服审核</a></li>
						</ul>
						<div class="pull-right">
							<button id="btn_addKeyword" class="btn btn-success btn-flat" type="button">新建订单</button>
							<button id="btn_search" class="btn btn-success btn-flat" type="button">批量导出</button>
						</div>
					</div>
					<!-- 列表区域begin -->
					<div role="grid" class="box-body table-responsive">
						<table id="demoTable" class="table table-hover table-striped table-bordered">
						
						</table>
					</div>
				</div>
				<!--(表单+列表)end -->
					
				</div>
			</div>
		</div>
		</section>
	    <!-- 2 框架数据主体区域end -->
	</aside>
	<!-- 4、隐藏的添加编辑面板begin -->
		<div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">添加</h4>
		        </div>
		        <div class="modal-body" >
					<!-- 列表区域begin -->
					<form class="demoForm" id="addOrEditeSearchForm">
						<input type="hidden" id="id" name="id" value=""/>
					    <div class="form-group" id="labelKeyword">
					        <label>热门搜索关键字</label>
							<input type="text" id="demo_keyword" name="searchKeyName" searchKeyNameOld='' class="form-control" total="-1" placeholder="请输入关键字">
							<small style="color:#a94442;display:none;" class="help-block"  id="keywordMsg" data-bv-result="INVALID">热门搜索关键字重复了，请重新输入！</small>
					    </div>
					    <div class="form-group">
					        <label>搜索值</label>
							<input type="text" id="demo_searchCount" name="searchCount" searchCountOld='' class="form-control" placeholder="只能输入正整数和零">  
					    </div>
					</form>
					<!-- 列表区域end -->
				</div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		          <button type="button" id="btn_submit" submitType="" class="btn btn-primary" ><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>保存</button>
		        </div>
		    </div>
		  </div>
		</div>
	<!-- 4、隐藏的添加编辑面板end -->
    <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
	<!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/demo/demo.js" type="text/javascript"></script>
        


</body>
</html>


<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<!-- ★ 导入公共样式库 -->
	<%@include file="../common/commonCss.jsp"%>
	<%--<link rel="shortcut icon" href="img/favicon.ico">--%>
	<style type="text/css">
		.form-group {
			margin:15px 15px 0 15px;
		}
	</style>
</head>
<body>

<div id="content">
	<div>
		<div>
			<div class="box-inner">
				<div class="box-header well" data-original-title="">
					<h2><i class="glyphicon glyphicon-user"></i> 业务规则>订单波次管理</h2>
				</div>

				<!-- 每个人只用关注这块区域starts -->
				<div class="box-content">
					<!-- 表单查询区域begin -->
<%--					<div class="alert alert-info">
						<form id="WaveSearchForm" class="form-inline" role="form"  onkeydown="if(event.keyCode==13) return false;" action="#"  method="post">
							<div class="controls controls-row">
								<div class="form-group">
									<span>波次号：</span><input type="text" name="wavePicking" id="wavePicking" onkeyup="this.value=this.value.replace(/[^\d]/ig,'')" placeholder="请输入数字" class="form-control input-small" style="width: 150px;"/>
								</div>
								<button id="btn_wave_search" class="btn btn-success btn-flat" type="button">搜索</button>
								<button id="btn_wave_clear" class="btn btn-primary btn-flat" type="button">清空</button>
							</div>
						</form>
					</div>--%>
					<!-- 表单查询区域end -->

					<!-- 分页列表区域begin -->
					<div role="grid" class="box-body table-responsive" >
<%--						<label class="checkbox-inline">
							<input type="radio" name="operatorWave" id="operator_wave" value=false >启用波次管理
						</label>--%>
						<div class="table_nav">
						<div id="toolbar" class="btn-group">
							<input type="radio" name="operatorWave" id="operator_wave" value=false hidden>
							<button type="button" class="btn btn-default  btn-sm" id="btn_add_wave"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
							<button type="button" class="btn btn-default  btn-sm operator_wave" id="btn_enable" value="false"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>启用波次管理</button>
							<button type="button" class="btn btn-default  btn-sm operator_wave" id="btn_disable" value="true"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>禁用波次管理</button>
						</div>
						</div>
						<table id="waveTable" class="table table-hover table-striped table-bordered" style="min-width: 800px;">

						</table>
					</div>
					<!-- 分页列表区域ends -->
				</div>
				<!-- 每个人只用关注这块区域starts -->
			</div>
		</div>
	</div>

	<!-- 新增和编辑（Modal） -->
	<div class="modal fade" id="addWave" tabindex="-1" param="dialog"
		 aria-labelledby="myModalLabel03" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width:600px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel03">新增波次</h4>
				</div>
				<div class="modal-body">
					<input type="hidden" value="" id = "waveId" name="waveId">
					<form action="" class="form-horizontal" id="addWaveForm">
						<div class="form-group row">
							<label class="col-md-3 control-label "><span class="text-required">*</span>开始时间：</label>
							<div class="col-md-8">
								<div class="input-group  date form_datetime" >
									<input type="text" class="form-control input-small" value="" id="startTime" name="startTime" readonly
									>
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
									<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-3 control-label "><span class="text-required">*</span>结束时间：</label>
							<div class="col-md-8">
								<div class="input-group  date form_datetime">
									<input type="text" class="form-control input-small" value="" id="stopTime" name="stopTime" readonly>
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
									<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-3 control-label "><span class="text-required">*</span>开始配送时间：</label>
							<div class="col-md-1">
								<input type="text" id="deliveryStartTimeDay" name="deliveryStartTimeDay"
									   class="form-control input-small" placeholder="" style="width: 50px;">
							</div>
							<label class="col-md-1 text-center control-label">天后</label>
							<div class="col-md-6">
								<div class="input-group  date form_datetime">
									<input type="text" class="form-control input-small" value="" id="deliveryStartTime" name="deliveryStartTime" readonly >
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
									<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-3 control-label "><span class="text-required">*</span>结束配送时间：</label>
							<div class="col-md-1">
								<input type="text" id="deliveryStopTimeDay" name="deliveryStopTimeDay"
									   class="form-control input-small" placeholder="" style="width: 50px;">
							</div>
							<label class="col-md-1 text-center control-label">天后</label>
							<div class="col-md-6">
								<div class="input-group  date form_datetime">
									<input type="text" class="form-control input-small" value="" id="deliveryStopTime" name="deliveryStopTime" readonly>
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
									<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-3 control-label ">描述：</label>
							<div class="col-md-8">
									<input type="text" name="remark" id="remark" class="form-control">
							</div>
						</div>

					</form>
				</div>
				<div class="modal-footer">
					<button id="saveWave" type="button" class="btn btn-primary"  ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
					<button id="btn_cancel" type="button" data-dismiss="modal"  class="btn btn-default"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>

</div>





<!-- ★ 导入公共JS库 -->
<%@include file="../common/commonJs.jsp"%>
<!-- 自己功能模块的外部JS -->
<script src="${contextPath}/resources/js/business/oms/waveListManage.js" type="text/javascript"></script>
</body>
</html>

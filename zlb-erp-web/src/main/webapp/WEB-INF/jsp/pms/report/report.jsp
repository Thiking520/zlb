<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
</head>

<style type="text/css">
#warehouseCode ul li {
	float: left;
	border: 1px solid orange;
	margin-right: 50px;
	border-radius: 3px;
	height: 50px;
	text-align: center;
	width: 100px;
	font-size: 15px;
}

#warehouseCode ul {
	display: inline-block;
}

#warehouseCode {
	text-align: center;
	margin-top: 20px;
}

#warehouseCode ul li a {
	display: block;
	line-height: 35px;
}

.selected {
	background-color: #dddddd;
}

.top-table table {
	text-align: center;
	border: solid 1px #d7e3ff;
	position: absolute;
	left: 2.5%;
	width: 70%;
}

.top-table table tr td {
	width: 100px;
	text-align: center;
	border: solid 1px #d7e3ff;
}

.top-table table tr {
	text-align: center;
	border: solid 1px #d7e3ff;
}

.top-table th {
	text-align: center;
	border: solid 1px #d7e3ff;
	background-color: #fff5d7;
}

.fixed-table-pagination {
	display: none;
}
</style>
<style>
.table {
	margin-bottom: 0px;
}

.goodstable>tbody>tr>td {
	padding: 1px;
}

.goodstable>thead>tr>th {
	padding: 2px;
}

.ordertable>tbody>tr>td {
	padding: 0px;
}
/* */
*
/
</style>

<body>

	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">首页</a></li>
				<!-- 				<li><a href="#">采购建议</a></li> -->
			</ul>
		</div>
		<!-- 菜单位置导航ends -->
		<div class="row" style="width: 100%;">
			<div >
				<div class="box-inner" style="width: 100%;">
					<div class="box-header well">
						<h2 style="font-size: 18px;">
							<i class="glyphicon glyphicon-info-sign"></i>查看代办信息
						</h2>

						<div class="box-icon">
							<a href="#" class="btn btn-setting btn-round btn-default"><i
								class="glyphicon glyphicon-cog"></i></a> <a href="#"
								class="btn btn-minimize btn-round btn-default"><i
								class="glyphicon glyphicon-chevron-up"></i></a> <a href="#"
								class="btn btn-close btn-round btn-default"><i
								class="glyphicon glyphicon-remove"></i></a>
						</div>
					</div>
					<!-- 下拉 -->
					<!-- 首页展示开始 -->
					<div style="min-width: 100%; height: 200px;" id="topTab">
						<div class="alert alert-success"
							style="width: 95%; height: 150px; position: absolute; top: 7%; left: 2.5%;">
							<div id="warehouseCode">
								<ul>
									<li onclick=""
										data-code="ST00007" id="updateSchedule"><a href="#"><span>更新待办事项</span></a></li>
									<li onclick=""
										data-code="ST00008" id="skipSuggest"><a href="#"><span>建议采购</span></a></li>
									<li onclick=""
										data-code="ST00008"><a href="#"><span>库存预警</span></a></li>
								</ul>
							</div>
						</div>
					</div>
					<div
						style="margin: 10px; border-bottom: 1px solid #d0d0d0; margin-top: 30px;">
						<span
							style="color: #EE951D; position: absolute; margin-top: -11px; background: white; margin-left: 150px; padding: 0 10px;">供应商信息</span>
					</div>
					<div style="width: 100%; height: 100px; margin-top: 20px">
						<div style="margin-top: 20px" class="top-table">
							<table id="searchSupplierReport" style="width: 70%"
								class="table table-hover table-striped table-bordered">
								<thead>
									<tr>
										<th style="" data-field="subCont" tabindex="0"><div
												class="th-inner ">待审批</div>
											<div class="fht-cell"></div></th>
										<th style="" data-field="rejCount" tabindex="0"><div
												class="th-inner ">驳回</div>
											<div class="fht-cell"></div></th>
									</tr>
								</thead>
								<tbody id="searchSupplierReportTr">

								</tbody>
							</table>
						</div>
					</div>
					<div
						style="margin: 10px; border-bottom: 1px solid #d0d0d0; margin-top: 30px;">
						<span
							style="color: #EE951D; position: absolute; margin-top: -11px; background: white; margin-left: 150px; padding: 0 10px;">采购申请</span>
					</div>
					<div style="width: 100%; height: 100px; margin-top: 10px">
						<div style="margin-top: 20px" class="top-table">
							<table id="searchApplyReport" style="width: 70%"
								class="table table-hover table-striped table-bordered">
								<thead>
									<tr>
										<th style="" data-field="subCont" tabindex="0"><div
												class="th-inner ">待审批</div>
											<div class="fht-cell"></div></th>
										<th style="" data-field="rejCount" tabindex="0"><div
												class="th-inner ">驳回</div>
											<div class="fht-cell"></div></th>
									</tr>
								</thead>
								<tbody id="searchApplyReportTr">

								</tbody>
							</table>
						</div>
					</div>
					<div
						style="margin: 10px; border-bottom: 1px solid #d0d0d0; margin-top: 30px;">
						<span
							style="color: #EE951D; position: absolute; margin-top: -11px; background: white; margin-left: 150px; padding: 0 10px;">供应信息</span>
					</div>
					<div style="width: 100%; height: 100px; margin-top: 10px">
						<div style="margin-top: 20px" class="top-table">
							<table id="searchGoodsReport" style="width: 70%"
								class="table table-hover table-striped table-bordered">
								<thead>
									<tr>
										<th style="" data-field="subCont" tabindex="0"><div
												class="th-inner ">待审批</div>
											<div class="fht-cell"></div></th>
										<th style="" data-field="rejCount" tabindex="0"><div
												class="th-inner ">驳回</div>
											<div class="fht-cell"></div></th>
									</tr>
								</thead>
								<tbody id="searchGoodsSupplyReportTr">

								</tbody>
							</table>
						</div>
					</div>
					<!-- 首页展示结束 -->
				</div>
			</div>
		</div>
		<!-- <div class="row">
			<div >
				<div class="box-inner">
					每个人只用关注这块区域starts
					<div class="box-content">
						<div role="grid" class="box-body table-responsive">
							<table id="PmsManageTable"
								class="table table-hover table-striped table-bordered">
								<tr height="280px">
									<td style="width: 33%;" align="center" valign="middle">
										<div id="chart1" style=""></div>
									</td>
									<td style="width: 33%;" align="center">
										<div id="chart2" style=""></div>
									</td>
									<td style="width: 33%;" align="center">
										<div id="chart3" style=""></div>
									</td>
								</tr>
								<tr height="280px">
									<td style="width: 33%;" align="center">
										<div id="chart4" style=""></div>
									</td>
									<td style="width: 33%;" align="center">
										<div id="chart5" style=""></div>
									</td>
									<td style="width: 33%;" align="center">
										<div id="chart6" style=""></div>
									</td>
								</tr>
							</table>
						</div>
					</div>
					每个人只用关注这块区域starts

				</div>
			</div>
		</div> -->

	</div>


	<!-- <div id="chart2"></div> -->
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	
	<script src="${contextPath}/resources/js/business/pms/report/report.js"
		type="text/javascript"></script>
	<%-- <script src="${contextPath}//resources/charisma-master/plugins/daterangepicker/js/daterangepicker.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/common/daterange-picker.js" type="text/javascript"></script> --%>
	<!-- 自己功能模块的外部JS -->
	<!-- 统计图的js     start -->
	<%-- <script type="text/javascript">
		var d = {
			base : ""
		};
	</script>
	<script language="JavaScript" type="text/javascript"
		src="${contextPath}/resources/js/business/pms/jqplot/jquery.jqplot.min.js"></script>
	<script language="JavaScript" type="text/javascript"
		src="${contextPath}/resources/js/business/pms/jqplot/plugins/jqplot.logAxisRenderer.min.js"></script>
	<script language="JavaScript" type="text/javascript"
		src="${contextPath}/resources/js/business/pms/jqplot/plugins/jqplot.categoryAxisRenderer.min.js"></script>
	<script language="JavaScript" type="text/javascript"
		src="${contextPath}/resources/js/business/pms/jqplot/plugins/jqplot.barRenderer.min.js"></script>
	<script language="JavaScript" type="text/javascript"
		src="${contextPath}/resources/js/business/pms/jqplot/plugins/jqplot.pointLabels.min.js"></script>
	<script language="JavaScript" type="text/javascript"
		src="${contextPath}/resources/js/business/pms/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script>
	<link class="include" rel="stylesheet" type="text/css"
		href="${contextPath}/resources/js/business/pms/jqplot/jquery.jqplot.min.css" />
	<script language="JavaScript" type="text/javascript"
		src="${contextPath}/resources/js/business/pms/m_jqplot.js"></script>
	<!-- 统计图的js     end --> --%>


</body>
</html>



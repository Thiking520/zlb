<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
</head>
<body>
	
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">库存查询</a></li>
				<li><a href="#">库存展望量</a></li>
			</ul>
		</div>
		<!-- 菜单位置导航ends -->
		<div class="row">
			<div class="box col-md-12">
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user">库存展望量列表</i></h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div style="Height: 5px;"></div>
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" id="mainForm" onkeydown="if(event.keyCode==13)return false;" action="#" method="post">
								<div class="controls controls-row">
									<div class="form-group">
							        	<span>站点：</span>
							        	<select id="warehouse" name="warehouse" class="form-control" style="width: 120px" >
							        		<option value="">---全部---</option>
										  <option value="NEW">新建</option>
										  <option value="FINISH">完成</option>
										</select>
							        </div>
									<div class="form-group ">
										<span>展望天数：</span><input name="days" id="days" type="text" class="form-control input-small" />
									</div>
									<div class="form-group">
							        	<span>货品类别：</span>
							        	<select id="skuType" name="skuType" class="form-control" style="width: 120px" >
							        		<option value="">---全部---</option>
										  <option value="NEW">原始</option>
										  <option value="FINISH">售卖</option>
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
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<table id="outLookTable" class="table table-bordered table-hover">
							
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
<!-- 模态框（Modal） -->
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/wms/warehouseinside/outLookList.js" type="text/javascript"></script>
</body>
</html>

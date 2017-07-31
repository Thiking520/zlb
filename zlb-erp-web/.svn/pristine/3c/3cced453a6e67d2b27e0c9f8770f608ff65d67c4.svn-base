<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	

</style>
</head>
<body class="skin-blue">
	<div id="content">
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>参数设置>编码规则</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<form class="form-inline" role="form"  id="codeRuleForm" onSubmit="return false;">
						<div class="box-content">
							<!-- 表单查询区域begin -->
							<div class="alert alert-info">
								<div class="controls controls-row">
										<div class="form-group">
											<span>编码类型：</span>
	                                        <select class="form-control L_spt_next" id="codeType" name="codeType">
	<!-- 					                	<option value="1">份</option> -->
	                                        </select>
										</div>
							     </div>
							</div>
							<!-- 表单查询区域end -->
							
							<!-- 分页列表区域begin -->
							<div role="grid" class="box-body table-responsive">
								<div class="table_nav">
									<div id="toolbar" class="btn-group">
									<button type="button" class="btn btn-success btn-flat" id="btn_show_add">
										<span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
									</div>
								</div>
								<table id="tabList" class="table table-hover table-striped table-bordered">
									<tr>
										<td class="col-md-2">排序</td>
										<td class="col-md-2">规则名</td>
										<td class="col-md-2">规则值</td>
										<td class="col-md-2">操作</td>
									</tr>
								</table>
							</div>
							<div class="form-group">
						        <button id="btn_save_submit" class="btn btn-success btn-flat" type="button">保存</button>
					        	<button id="btn_enabled" class="btn btn-success btn-flat" type="button">启用</button>
					        </div>
							<!-- 分页列表区域ends -->
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 隐藏的dialog 新增时选择子项 -->
	<div class="modal fade" id="chooseItemModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" param="document">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title" id="chooseItemLabel">为【xxx】新增编码规则</h4>
	        </div>
	        
	        <div role="grid" class="box-body table-responsive">
				<table id="itemListTable" class="table table-hover table-striped table-bordered">
				
				</table>
			</div>
	        
	        <div class="modal-footer">
	          <button id="btn_item_confirm" type="button" name="submit" class="btn btn-primary"  >确定</button>
	        </div>
	      </div>
	    </div>
	  </div>
	
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/parameter/codeRuleManager.js" type="text/javascript"></script>
	    
</body>
</html>
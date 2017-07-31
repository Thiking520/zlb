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
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>采购计划>采购申请审批</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->

						
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onsubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
							        	<span>审批状态：</span>
							        	<select id="applyState" class="form-control" style="width: 120px">
							        		<option value="">---全部---</option>
										  <option value="SUB">已提交</option>
										  <option value="APP">审批通过</option>
										  <option value="REJ">驳回</option>
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
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<table id="applyManageTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
	</div>
	
<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm" method="post">
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:1300px" role="document">
		      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">采购申请</h4>
			        </div>
		        
			        <div class="modal-body" >

					   <div class="form-group">
							<table id="applyGoodsTable" class="table table-hover table-striped table-bordered">
							    
							</table>
				       </div>
				        <div class="modal-footer" style="text-align: center;" id="btn_div">
				          <button id="btn_approve" type="button" class="btn btn-primary" style="width: 150px">同意 </button>
				         <!--  <button id="btn_save" type="button" class="btn btn-primary" data-dismiss="modal" style="width: 150px">
				          		<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
				          </button> -->
				          <button id="btn_reject" type="button" name="btn_reject" class="btn btn-primary" style="width: 150px">
				          		驳回
				           </button>
				        </div>
			       </div>
		        </div>
		      </div>
		    </div>
	</form>	
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/pms/plan/applyAuditManage.js?version=v1" type="text/javascript"></script>
</body>
</html>

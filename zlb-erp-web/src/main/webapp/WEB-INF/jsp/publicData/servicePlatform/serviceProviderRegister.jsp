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
	<div id="content" >
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>基础数据>服务商管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form" >
								<div class="controls controls-row">
									<div class="form-group">
										<span>服务商名称：</span><input type="text" name="searchKeyword" id="searchKeyword" class="form-control input-small" style="width: 150px;"/>
									</div>
						        <div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
						        	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
						        </div>
						      </div>
							</form>
						</div>
						
						<div class="form-group">
							<button type="button" class="btn btn-default btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
						</div>
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<table id="listTable" class="table table-hover table-striped table-bordered">
								
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 隐藏的dialog Begin -->
	<div class="modal fade" id="myModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" param="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增</h4>
		        </div>
		        
		        <div class="modal-body" id="load_body">
		        	<form id="addForm" action="" class="form-horizontal" >
                    	<input type="hidden" id="id" name="id"/>
                        <div class="form-group">
                            <p for="ecServiceId" class="col-md-3 control-label">服务商名称：</p>
                            <div class="col-md-8">
                                <div>
                                    <select class="form-control L_spt_next" id="ecServiceId" name="ecServiceId">
					                </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <p for="ecAppKey" class="col-md-3 control-label">AppKey：</p>
                            <div class="col-md-8">
                                <div>
                                    <input type="text" class="form-control" id="ecAppKey" name="ecAppKey"/>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <p for="commonApiUrl" class="col-md-3 control-label">common Api Url：</p>
                            <div class="col-md-8">
                                <div>
                                    <input type="text" class="form-control" id="commonApiUrl" name="commonApiUrl"/>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <p for="notifyUrl" class="col-md-3 control-label">事件订阅回调地址：</p>
                            <div class="col-md-8">
                                <div>
                                    <input type="text" class="form-control" id="notifyUrl" name="notifyUrl"/>
                                </div>
                            </div>
                        </div>
                     </form>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_save_submit" type="button" name="submit" class="btn btn-primary"  ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/servicePlatform/serviceProviderRegisterManager.js" type="text/javascript"></script>
</body>
</html>
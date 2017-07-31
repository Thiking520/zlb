<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@include file="../../common/taglib.jsp"%>
<%@ taglib prefix="d" uri="/lyxdict-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>参数列表</title>
    <!-- ★ 导入公共样式库 -->
  	<%@include file="../../common/commonCss.jsp"%>
</head>
<body>
<div id="content">		
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>参数设置>数据字典</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
						     <!-- 表单查询区域begin -->
							<form role="form" class="form-inline" id="mainForm" action="#" onSubmit="return false;" method="get">

								<div class="form-group" >
									<span>字典标题：
									</span>
									<input type="text" id="searchName" name="searchName" class="form-control" placeholder="">
								</div>
								<div class="form-group" >
									<span>字典类型：
									</span>
									<input type="text" id="searchKey" name="searchKey" class="form-control" placeholder="">
								</div>
								<div class="form-group" >
									<span>描述：
									</span>
									<input type="text" id="searchDesc" name="searchDesc" class="form-control" placeholder="">
								</div>

								<div class="form-group">
										<!-- 下拉框 -->
										<span>状态：</span>
											<select class="form-control" name="status" id="status">
												<!-- <option value='1'>生效</option>
												<option value='0'>失效</option> -->
								                <c:forEach var="item"   items="${data.statusList}">
													<option value='${item.dictValue}'>${item.dictDesc}</option>
								                </c:forEach>
											</select>

								<div class="form-group">
							    	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
								</div>
								<div class="form-group">
							    	<button id="btn_clear" class="btn btn-primary btn-flat" type="button">清空</button>
								</div>
								</div>
							</form>
						</div>
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
									<button id="btn_add" class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
									<button id="btn_template_manage" class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-pencil" style="color: green;">进入系统模板管理</button>
								</div>
							</div>
						<div>
							<table id="listTable" class="table table-hover table-striped table-bordered" style="min-width: 1009px;">
                                                                             								         
	                         </table>
	                    </div>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
		
	</div>					     
					    
	<!-- 3、隐藏的新增面板begin -->
		<div class="modal fade" id="myModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" param="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增</h4>
		        </div>
		        
		        
		        <div class="modal-body" id="load_body">
		        </div>
		        <div class="modal-footer">
		          <button id="btn_cancel" type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_submit" type="button" name="submit" class="btn btn-primary"  ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	<!-- 3、隐藏的新增面板end -->
             
                   

    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/publicData/parameter/paramDict.js" type="text/javascript"></script>
        

</body>
</html>


<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>参数</title>
    <!-- ★ 导入公共样式库 -->
  	<%-- <%@include file="../../common/commonCss.jsp"%> --%>
  	
  	<style type="text/css">
  	</style>
  	
</head>
<body>
	
<div id="content">
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>参数设置>全局参数管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<div class="alert alert-info">
					     <!-- 表单区域begin -->
							<div id="form_div">
								<form id="addForm" action="" class="form-horizontal" >
				                    	<input type="hidden" id="id" name="id" value="${data.vo.id}"/>
				                    	<input type="hidden" id="operator" name="operator" value="${data.vo.operatorId}"/>
				                     
				                        <div class="form-group">
				                            <label for="paramKey" class="col-md-3 control-label"><span class="text-required">*</span>参数key：</label>
				                            <div class="col-md-8">
				                                <div>
				                                    <input type="text" class="form-control" id="paramKey"  name="paramKey" value="${data.vo.paramKey }" placeholder="参数key"/>
				                                </div>
				                            </div>
				                        </div>
				                     
				                        <div class="form-group">
				                            <label for="paramValue" class="col-md-3 control-label"><span class="text-required">*</span>参数值：</label>
				                            <div class="col-md-8">
				                                <div>
				                                    <input type="text" class="form-control" id="paramValue"  name="paramValue" value="${data.vo.paramValue }" placeholder="参数值"/>
				                                </div>
				                            </div>
				                        </div>
										<div class="form-group">
												<!-- 下拉框 -->
												<label for="groupName" class="col-md-3 control-label"><span class="text-required">*</span>分组名：</label>
												<div class="col-md-8">
													<select class="form-control" name="groupName" id="groupName">
														<c:forEach var="item"   items="${data.groupList}">
															<c:if test="${data.vo.groupName == item.dictValue}">
															<option value='${item.dictValue}' selected>${item.dictDesc}</option>
															</c:if>
															<c:if test="${data.vo.groupName != item.dictValue}">
															<option value='${item.dictValue}'>${item.dictDesc}</option>
															</c:if>
										                </c:forEach>
													</select>
												</div>
										</div>
										<div class="form-group">
												<!-- 下拉框 -->
												<label for="module" class="col-md-3 control-label"><span class="text-required">*</span>模块分类：</label>
												<div class="col-md-8">
													<select class="form-control" name="module" id="module">
														<!-- <option value='10'>oms</option> -->
														<c:forEach var="item"   items="${data.moduleList}">
															<c:if test="${data.vo.module == item.dictValue}">
															<option value='${item.dictValue}' selected>${item.dictDesc}</option>
															</c:if>
															<c:if test="${data.vo.module != item.dictValue}">
															<option value='${item.dictValue}'>${item.dictDesc}</option>
															</c:if>
										                </c:forEach>
													</select>
												</div>
										</div>
										<div class="form-group">
												<!-- 下拉框 -->
												<label for="status" class="col-md-3 control-label"><span class="text-required">*</span>状态：</label>
												<div class="col-md-8">
													<select class="form-control" name="status" id="status">
														<!-- <option value='1'>生效</option>
														<option value='0'>失效</option> -->
														<c:forEach var="item"   items="${data.statusList}">
															<c:if test="${data.vo.status == item.dictValue}">
															<option value='${item.dictValue}' selected>${item.dictDesc}</option>
															</c:if>
															<c:if test="${data.vo.status != item.dictValue}">
															<option value='${item.dictValue}'>${item.dictDesc}</option>
															</c:if>
										                </c:forEach>
													</select>
												</div>
										</div>
				                        <div class="form-group">
				                            <label for="paramDesc" class="col-md-3 control-label"><span class="text-required">*</span>参数描述：</label>
				                            <div class="col-md-8">
				                                <div>
				                                    <input type="text" class="form-control" id="paramDesc"  name="paramDesc" value="${data.vo.paramDesc }" placeholder="参数描述"/>
				                                </div>
				                            </div>
				                        </div>
				                        <div class="form-group">
				                            <label for="operatorId" class="col-md-3 control-label"><span class="text-required">*</span>运营商：</label>
				                            <div class="col-md-8">
				                                <select class="form-control" name="operatorId" id="operatorId">
								  
							 					</select>
				                            </div>
				                        </div>
<%-- 				                        <div class="form-group">
				                        		<div class="col-md-3"></div>
												<div class="col-md-6">
													<div class="md-radio-inline">
															<label>
													<c:forEach var="item"   items="${modifiablelist}">
														<c:if test="${vo.modifiable == item.dictValue}">
																<input type="radio" name="modifiable" id="modifiable" value="${item.dictValue}" checked> ${item.dictDesc}
														</c:if>
														<c:if test="${vo.modifiable != item.dictValue}">
																<input type="radio" name="modifiable" id="modifiable" value="${item.dictValue}"> ${item.dictDesc}
														</c:if>
									                </c:forEach>
									                		</label>
													</div>
												</div>
										</div> --%>
			              		 </form>
							</div>
                         <!-- 表单区域end -->
				</div>
			</div>
		</div>
	</div>
  </div>
</div>
</body>
</html>


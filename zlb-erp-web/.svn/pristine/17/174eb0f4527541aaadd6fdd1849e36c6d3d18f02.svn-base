<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
</head>
<style>
/* /* */
 .table { 
	margin-bottom: 0px;
}

.goodstable > tbody > tr > td { 
 	padding: 1px; 
} 

 .goodstable > thead > tr > th{  
  	padding: 2px;  
 }  

.ordertable > tbody > tr > td { 
 	padding: 0px; 
} 
/* */ */
</style>

<body>
	
	<div id="content">
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>采购计划>采购建议</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->

						<!-- <div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onsubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
										<button id="btn_new" class="btn btn-success btn-flat" type="button">生成采购建议</button>
									</div>
						        </div>
								时间控件end 
							</form>
						</div> -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
									<button id="btn_new" class="btn btn-default  btn-sm" type="button">
										<span class="glyphicon glyphicon-plus" style="color: green;"></span>生成采购建议</button>
								</div>
							</div>
							<table id="suggestManageTable" class="table table-hover table-striped table-bordered">
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
	<form id="addSuggestForm"   method="post">
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:1300px" role="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">采购建议</h4>
		        </div>
		        <div class="modal-body" >
				  <table style="width:100%;">
					 <tr>
					   <!-- <td style="width:15%;">
					   		<button id="btn_create" class="btn btn-primary" type="button" style="width: 150px">生成采购建议清单</button>
					   	</td>	
					   	<td style="width:15%;">
					      	<button id="btn_remove" class="btn btn-primary" type="button" style="width: 150px">移    除</button>
					   </td> -->
					   <td style="width:20%;" align="right" valign="middle">
							<span>商品类别：</span>	
					   </td>
					   <td style="width:15%;" align="left" valign="middle">
							<div class="input-group">
									  <input id="goodsType_key" class="form-control input-small" style="width: 150px;" type="text">
									  <button id="btn_search" class="btn btn-success btn-flat" type="button" style="margin-left:5px; ">搜索</button>
						    </div>
					   </td>
					   <td style="width:15%;" align="left" valign="middle">
							
					   </td>
					   <!-- <td style="width:20%;" align="right" valign="middle">
							<button id="btn_reset" class="btn btn-success btn-flat" type="button">重置(测试用)</button>
					   </td> -->
					 </tr>
				   </table>
					
				   <div class="form-group">
			   			<h2><i class="glyphicon glyphicon-user">先单后采商品采购建议</i></h2>
						<table id="suggestGoodsTable1" class="table table-bordered table-hover goodstable">
						</table>
			       </div>
			       
<!--			       
 				   <div class="form-group">
			   			<h2><i class="glyphicon glyphicon-user">先采单后商品采购建议</i></h2>
					<table>
						<tr>
							<td>
								 <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;" readonly>
			                        <input type="text" class="form-control" value="" id="dateBegin" name="dateBegin" readonly style="width: 200px; height: 30px;">
			                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
			                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
			                     </div>
							</td>
							<td>
								<div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;" readonly>
			                        <input type="text" class="form-control" value="" id="dateEnd" name="dateEnd" readonly style="width: 200px; height: 30px;">
			                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
			                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
			                     </div>
							</td>
							<td>
								日均使用量。                   <button id="btn_xchd" class="btn btn-primary" type="button" style="width: 150px">先采后单建议</button>
							</td>
						</tr>
					</table>
                    
					<table id="suggestGoodsTable2" class="table table-bordered table-hover goodstable">
					</table>
			       </div>
 -->
		        </div>
		        <div class="modal-footer"  style="text-align: center;">
		          <button id="btn_save_submit" type="button" name="button" class="btn btn-primary" style="width: 150px">
		          		<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>生成采购申请
		          </button>
		          <button type="button" class="btn btn-default" data-dismiss="modal" style="width: 150px">
		          		<span class="glyphicon" aria-hidden="true"></span>取消
		          </button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>	
	
	<!-- 隐藏的dialog Begin -->
		<div class="modal fade" id="detialModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:1300px" role="document">
		      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">采购建议单</h4>
			        </div>
			        <div class="modal-body" >
					   <div class="form-group">
							<table id="goodsListTable" class="table table-hover table-striped table-bordered">
							</table>
				       </div>
			       </div>
		        </div>
		      </div>
		    </div>
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<%-- <script src="${contextPath}//resources/charisma-master/plugins/daterangepicker/js/daterangepicker.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/common/daterange-picker.js" type="text/javascript"></script> --%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/pms/plan/suggestListManage.js?version=v1" type="text/javascript"></script>

    
</body>
</html>

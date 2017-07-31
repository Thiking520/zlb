<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta charset="UTF-8">
        <title>AdminLTE | Dashboard</title>
        <!-- ★ 导入公共样式库 -->
  		<%@include file="../common/commonCss.jsp"%> 
  		<link href="http://cdn.bootcss.com/bootstrap-treeview/1.2.0/bootstrap-treeview.min.css" rel="stylesheet">
  		
</head>
<body class="skin-blue">




<aside class="left-side sidebar-offcanvas" style="min-height: 2174px;">
    
    <div id="tree"></div>
 </aside>
    
      <!-- ★ 导入公共JS库 -->
	  <%@include file="../common/commonJs.jsp"%>     
	  <script src="http://cdn.bootcss.com/bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>       

</body>
<script>
	$(function() {
        $(".no-print").remove();
        function getTree() {
            // Some logic to retrieve, or generate tree structure
            var data = [
				  {
				    text: "订单管理",
				    nodes: [
				      {
				        text: "销售订单管理",
				        nodes: [
				          {
				            text: "订单详情",
				            href: "/demo/init"
				          },
				          {
				            text: "合单筛选"
				          }
				        ]
				      },
				      {
				        text: "退货订单管理"
				      }
				    ]
				  },
				  {
				    text: "商品管理"
				  },
				  {
				    text: "业务规则"
				  }
				]; 
            return data;
        }
        $('#tree').treeview({
        	data: getTree(),
        	levels: 3,
        	enableLinks:false,
        	onNodeSelected: function(event, data) {
        	    // Your logic goes here
        	   //alert(data.href);
        	   if(data.href){
        		   
        		   top.frames['main'].document.location = $("#contextPath").val()+data.href;
        	   }
        	}
        }); 
	});
</script>
</html>


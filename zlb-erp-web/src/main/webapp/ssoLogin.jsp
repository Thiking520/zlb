<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<input id="userName" type="hidden" value="">
<input id="pwd" type="hidden" value="">
<script src="<%=contextPath%>/resources/charisma-master/bower_components/jquery/jquery.min.js"></script>
<script src="<%=contextPath%>/resources/charisma-master/js/jquery.cookie.js"></script>
<script src="<%=contextPath%>/resources/js/common/constants.js" type="text/javascript"></script> 
<script src="<%=contextPath%>/resources/charisma-master/plugins/toastr/js/toastr.js" type="text/javascript"></script>
<script src="<%=contextPath%>/resources/js/common/zhilianbao-util.js" type="text/javascript"></script>
<script src="<%=contextPath%>/resources/charisma-master/bower_components/bootstrap-tour/docs/assets/vendor/md5.js"></script>
<script src="<%=contextPath%>/resources/js/business/login/login.js"></script>
<script type="text/javascript">
   var contextPath = '<%=contextPath%>';
   login.loginJson();
</script>
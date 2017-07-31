<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>乐摇网-智联宝生态科技</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link id="link_fav" rel="shortcut icon" href="/smember/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="/smember/static/jquery/jquery.min.js"></script>
<script type="text/javascript" src="/smember/static/variable.js"></script>
<script type="text/javascript" src="/smember/static/init.js"></script>

<!--[if let IE 9]>
<script type="text/javascript">
    alert('不支持IE9及以下版本');
</script>
<![endif]-->
</head>
<body>
	<input type="hidden" id="state" value="<%=request.getParameter("state")%>">
	<input type="hidden" id="siteName" value="<%=request.getParameter("site_name")%>">
	<input type="hidden" id="service" value="<%=request.getParameter("service")%>">
</body>
<script type="text/javascript">
	$(function() {
		var params = {};
		params.state = $("#state").val();
		params.siteName = $("#siteName").val();
		params.service = $("#service").val();
		$.ajax({
			url : "/thirdlogin?r=" + Math.random(),
			type : "post",
			data : params,
			dataType : "json",
			timeout : 30000,
			success : function(data, s) {
				if (data.result) {
					location.href = params.service + "?ticket=" + data.ticket;
				} else {
					alert(data.msg);
					location.href = projectWebRoot;
				}
			},
			error : function(er) {
				alert('请求数据失败。');
			}
		});
	});
</script>
</html>
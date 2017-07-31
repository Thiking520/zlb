<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <!-- ★ 导入公共样式库 -->
	<%@include file="../common/commonMainCss.jsp"%>
    <!--[if lte IE 9]>
    <script src="${contextPath}/resources/charisma-master/bower_components/bootstrap/js/html5shiv.min.js"></script>
    <script src="${contextPath}/resources/charisma-master/bower_components/bootstrap/js/respond.js"></script>
    <![endif]-->
</head>

<body>

<div class="ch-container">
    <div class="row">
        
    <div class="row">
        <div class="col-md-12 center login-header">
            <h2>生鲜运营支撑系统</h2>
        </div>
        <!--/span-->
    </div><!--/row-->

    <div class="row">
        <div class="well col-md-5 center login-box">
            <div class="alert alert-info">
                Please login with your Username and Password.
            </div>
            <form class="form-horizontal">
                <fieldset>
                    <div class="input-group input-group-lg">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user red"></i></span>
                        <input type="text" class="form-control" placeholder="用户名" name="userName" id="userName" value="">
                    </div>
                    <div class="clearfix"></div><br>

                    <div class="input-group input-group-lg">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock red"></i></span>
                        <input type="password" class="form-control" placeholder="密码" name="pwd" id="pwd" value="">
                    </div>
                    <div class="clearfix"></div>

                    
                    <div class="clearfix"></div>

                    <p class="center col-md-5">
                        <button id="login_btn" class="btn btn-primary" type="button">登录</button>
                    </p>
                </fieldset>
            </form>
        </div>
        <!--/span-->
    </div><!--/row-->
</div><!--/fluid-row-->

</div>

<%@include file="../common/commonMainJs.jsp"%>	

<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap-tour/docs/assets/vendor/md5.js"></script>
<script src="${contextPath}/resources/js/business/login/login.js"></script>
<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap/js/placeholder.js"></script>
<script>
    $(function () {
        // Invoke the plugin
        $('input, textarea').placeholder();
    });
</script>
</body>
</html>

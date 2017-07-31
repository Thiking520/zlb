<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>智屏-账号绑定</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link id="link_fav" rel="shortcut icon" href="/smember/favicon.ico" type="image/x-icon" />

<link type="text/css" rel="stylesheet" href="/smember/static/bootstrap/css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="/smember/static/formValidator/style/validator.css" />
<script type="text/javascript" src="/smember/static/jquery/jquery.min.js"></script>
<script type="text/javascript" src="/smember/static/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/smember/static/formValidator/formValidator_min.js"></script>
<script type="text/javascript" src="/smember/static/formValidator/formValidatorRegex.js"></script>
<script type="text/javascript" src="/static/variable.js"></script>
<script type="text/javascript" src="/smember/static/init.js"></script>
<script type="text/javascript" src="/smember/static/thirdconnectlogin.js"></script>
<link href="/smember/static/css/app.css" type="text/css" rel="stylesheet" />
<!-- <link href="//cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" type="text/css" rel="stylesheet" /> -->

<!--[if let IE 9]>
<script type="text/javascript">
    alert('不支持IE9及以下版本');
</script>
<![endif]-->

<style>
body .nav-tabs {
	border-bottom: 1px solid #F8F9FA;
}

.nav-tabs>li {
	margin-bottom: -1px;
	text-align: center;
}

.nav-tabs>li>a {
	font-size: 18px;
	border-radius: 0;
	border: 0;
	border-bottom: 1px solid transparent;
	margin-right: 0;
	padding: 18px 5px;
}

.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover
	{
	color: #01CCAD;
	cursor: default;
	background-color: #fff;
	border: 0;
	border-bottom: 1px solid #01CCAD;
}

.nav>li>a:focus, .nav>li>a:hover {
	border-top: 0;
	border-left: 0;
	border-right: 0;
	background-color: transparent;
	color: inherit;
	border-bottom: 1px solid #01CCAD;
}
.btn-block + a:hover,.btn-block + a:active, .btn-block + a:focus {
	text-decoration: none;
	color: #8E8E8E !important;
}
</style>
</head>
<body class="smember">
	<header class="login-header srow">
		<div class="wrapper">
			<div class="header-logo inline-vc">
				<a href="#"> <!-- img使用背景替换，便于主题切换 --> <!-- <img class="icon" src="static/images/re/logo.png"> -->
				</a> <span style="color: #ccc;font-size: 35px;">|</span><span class="text">&nbsp;账号绑定</span>
			</div>
			<div class="link-group">
				<!-- <a href="" id="a_mainPage">首页</a> -->
			</div>
		</div>
	</header>
	<section class="register-content srow" style="min-height: calc(100vh - 20vh - 50px)">
		<div class="flex-vhc">
			<!-- <div style="margin-right: 8px;"><img src="http://q.qlogo.cn/qqapp/100312990/DE1931D5330620DBD07FB4A5422917B6/40" style="max-width: 100%; height: auto"></div> -->
			<div>Hi, <b><%=request.getParameter("nick_name")%></b> 欢迎来到智屏</div> 
		</div>
		<h3 style="text-align: center; margin-bottom: 30px; font-size: 16px; margin-top: 15px;">您已成功验证了账号！马上绑定智屏账号，下次登录更便捷哦^_^</h3>
		<div class="wrapper">
			<input type="hidden" id="nickName" value="<%=request.getParameter("nick_name")%>"> 
			<input type="hidden" id="state" value="<%=request.getParameter("state")%>">
			<input type="hidden" id="siteName" value="<%=request.getParameter("site_name")%>"> 
			<input type="hidden" id="service" value="<%=request.getParameter("service")%>">
			<ul id="myTab" class="nav nav-tabs flex">
				<li class="active flex-item"><a href="#tab1" data-toggle="tab">已有智屏账号，请绑定 </a></li>
				<li class="flex-item"><a href="#tab2" data-toggle="tab">没有智屏账号，立即注册</a></li>
			</ul>
			<div id="myTabContent" class="tab-content" style="min-height: 460px;">
				<div class="tab-pane fade in active" id="tab1">
					<ul class="register-items">
						<li class="inline-vc"><label>用户名</label> <input type="text" class="form-control" placeholder="用户名/手机号码" id="username" name="username"></li>
						<li class="inline-vc"><label>密码</label> <input type="password" class="form-control" placeholder="请输入密码" id="password" name="password"></li>
						<li class="inline-vc"><label>验证码</label>
							<div class="auth-code inline-vc">
								<input type="text" class="form-control" placeholder="请输入验证码" id="authCode" name="authCode">
								<div class="auth-code-img">
									<img src="" id="authCodeIMG" onclick="createAuthCode()">
									<button class="btn btn-default btn-auth-code btn-block" onclick="createAuthCode()">获取验证码</button>
								</div>
							</div></li>
						<li class="inline-vc"><label></label>
							<button style="width: 230px;" class="btn btn-default btn-block btn-register" id="submitButton" name="submit" type="button" onclick="submitTab1Form()">立&nbsp;即&nbsp;绑&nbsp;定&nbsp;</button>&nbsp;&nbsp;
							<a href="javascript:void(0);" style="color: #ccc;" onclick="goMain();">下次再说 >></a></li>
						<li class="inline-vc">
							<div class="login-msg drow">
								<span id="msg"></span>
							</div>
						</li>
					</ul>
				</div>
				<div class="tab-pane fade" id="tab2">
					<ul class="register-items">
						<li class="inline-vc"><label>手机号码</label> <input type="text" class="form-control" placeholder="请输入手机号码" id="userMobile" name="userMobile" onkeyup="onKeyupClick(this);">
							<div class="reg-tip">
								<div class="reg-tip-inner" id="userMobileTip"></div>
								<div class="reg-tip-arrow"></div>
							</div></li>
						<li class="inline-vc"><label>短信验证码</label>
							<div class="message-auth-code inline-vc">
								<input type="text" class="form-control" placeholder="请输入手机验证码" id="mobileCode" name="mobileCode" disabled="disabled">
								<button class="btn btn-default" id="sendMobileCode" onclick="sendVerifySMS(this);" disabled="disabled">获取短信验证码</button>
							</div>
							<div class="reg-tip">
								<div class="reg-tip-inner" id="mobileCodeTip"></div>
								<div class="reg-tip-arrow"></div>
							</div></li>
						<li class="inline-vc"><label>密码</label> <input type="password" class="form-control" placeholder="请输入6-20位字符密码" id="password1" name="password1">
							<div class="reg-tip">
								<div class="reg-tip-inner" id="password1Tip"></div>
								<div class="reg-tip-arrow"></div>
							</div></li>
						<li class="inline-vc"><label>确认密码</label> <input type="password" class="form-control" placeholder="请再次确认您的密码" id="password2" name="password2">
							<div class="reg-tip">
								<div class="reg-tip-inner" id="password2Tip"></div>
								<div class="reg-tip-arrow"></div>
							</div></li>
						<li class="inline-vc"><label>验证码</label>
							<div class="auth-code inline-vc">
								<input type="text" class="form-control" placeholder="请输入验证码" id="authCode2" name="authCode2">
								<div class="auth-code-img">
									<img src="" id="authCodeIMG2" onclick="getAuthCode2(this)">
									<button class="btn btn-default btn-auth-code btn-block" onclick="getAuthCode2(this.parentNode.children[0])">获取验证码</button>
								</div>
							</div>
							<div class="reg-tip">
								<div class="reg-tip-inner" id="authCode2Tip"></div>
								<div class="reg-tip-arrow"></div>
							</div></li>
						<li class="inline-vc"><label></label>
							<div class="agreements">
								<div class="checkbox">
									<label><input type="checkbox" id="readCheckBox"> 我已阅读并接受 </label> <a href="#" data-toggle="modal" data-target="#modalProtocl">《注册用户协议》</a>
								</div>
							</div>
							<div class="register-tip"></div></li>
						<li class="inline-vc"><label></label>
							<button style="width: 323px;" class="btn btn-default btn-block btn-register" id="submitButton2" name="submit2" type="button" onclick="submitTab2Form()">立即注册并绑定</button></li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<footer class="login-footer srow inline-vhc" style="height: 60px;">
		<span>© 2015-2016 </span> <span> &nbsp;深圳市智联宝生态科技有限公司 </span> <a href="http://www.miibeian.gov.cn" target="_blank"> 粤ICP备15102042号-5</a>
	</footer>
	<!-- 注册协议modal -->
	<!-- Modal -->
	<div class="modal fade" id="modalProtocl" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">智屏服务协议</h4>
				</div>
				<div class="modal-body">
					<iframe src="../smember/protocol/index.html" frameborder="0" width="100%" height="100%"></iframe>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">同意并继续</button>
				</div>
			</div>
		</div>
		<script>
			$('#modalProtocl').on('hide.bs.modal', function(e) {
				$('#readCheckBox').prop("checked", true);
			})
		</script>
	</div>
</body>
</html>
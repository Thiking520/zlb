$(function() {
	initSysPath();
	var service = $("#service").val();
	$.formValidator.initConfig({
		onerror : function(msg) {
			alert(msg);
		}
	});

	$("#password1").formValidator({
		onshow : "请输入您的密码",
		onfocus : "6-20位字符，建议由字母，数字和符号两种以上组合",
		oncorrect : "密码合法"
	}).inputValidator({
		min : 6,
		max : 20,
		onerror : "密码长度只能在6-20位字符之间"
	});
	$("#password2").formValidator({
		onshow : "请输入确认密码",
		onfocus : "两次密码必须一致",
		oncorrect : "密码输入正确"
	}).inputValidator({
		min : 6,
		max : 20,
		onerror : "密码长度只能在6-20位字符之间"
	}).compareValidator({
		desid : "password1",
		operateor : "=",
		onerror : "2次密码不一致,请确认"
	});
	$("#userMobile").formValidator({
		onshow : "请输入您的手机号码",
		onfocus : "请输入11位的手机号码",
		oncorrect : "恭喜！该手机号可以注册"
	}).inputValidator({
		min : 11,
		max : 11,
		onerror : "手机号码必须是11位的,请确认"
	}).regexValidator({
		regexp : "mobile",
		datatype : "enum",
		onerror : "你输入的手机号码格式不正确"
	}).ajaxValidator({
		type : "get",
		url : "/validateuser?r=" + Math.random(),
		datatype : "json",
		data : "&service=" + service,
		success : function(data) {
			if (data.success) {
				$('#sendMobileCode').attr('disabled', true);
				return false;
			} else {
				$('#sendMobileCode').attr('disabled', false);
			}
			return true;
		},
		buttons : $("#submitButton2"),
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror : "手机号码已被注册",
		onwait : "正在对用户名进行合法性校验，请稍候..."
	});
	$("#mobileCode").formValidator({
		onshow : "请输入您的手机验证码",
		onfocus : "点击获取手机验证码",
		oncorrect : ""
	}).inputValidator({
		min : 4,
		max : 6,
		onerror : "点击获取手机验证码"
	});
	$("#authCode2").formValidator({
		onshow : "请输入验证码",
		onfocus : "点击获取验证码",
		oncorrect : ""
	}).inputValidator({
		min : 4,
		max : 6,
		onerror : "点击获取验证码"
	});
});
// 登陆
function submitTab1Form() {
	var params = {};
	params.username = $("#username").val();
	params.password = $("#password").val();
	params.authcode = $("#authCode").val();
	params.state = $("#state").val();
	params.siteName = $("#siteName").val();
	params.service = $("#service").val();
	// var backurl = $.getUrlParam('service');
	// if (backurl) {
	// params.service = backurl;
	// }
	$.ajax({
		url : "/loginbind",
		type : "post",
		data : params,
		dataType : "json",
		timeout : 30000,
		success : function(data, s) {
			if (data.result) {
				location.href = params.service + "?ticket=" + data.ticket;
			} else {
				$('#msg').text(data.msg);
			}
		},
		error : function(er) {
			alert('请求数据失败。');
		}
	});
}

// 重新生成验证码
function createAuthCode() {
	$('#successImg').hide();
	$('#authCode').val('');
	document.getElementById("authCodeIMG").src = "/getcode?r=" + Math.random();
	$('#msg').text('');
}
// 验证码验证
function verifyAuthCode(t, obj) {
	var e = arguments.callee.caller.arguments[0];
	if (e && e.keyCode == 13) {
		return false;
	}
	var str = document.getElementById(obj).value;
	if (str) {
		str = str.replace(/\s+/g, "");
		if (str.length > 3) {
			$.get("/getcode?ac=" + str + "&r=" + Math.random(), function(data) {
				if (data.result == true) {
					$('#successImg').show();
					$('#msg').text("");
				} else {
					$('#successImg').hide();
					$('#msg').text(data.msg);
				}
				;
			});
		} else {
			$('#successImg').hide();
		}
	} else {
		$('#successImg').hide();
	}
}

// tab2业务
// 注册
function submitTab2Form() {
	if ($.formValidator.pageIsValid('1')) {
		if (!$('#readCheckBox').is(':checked')) {
			alert("请阅读用户协议并接受");
		} else {
			var params = {};
			params.userMobile = $("#userMobile").val();
			params.mobileCode = $("#mobileCode").val();
			params.password = $("#password1").val();
			params.authCode = $("#authCode2").val();
			params.state = $("#state").val();
			params.siteName = $("#siteName").val();
			params.service = $("#service").val();
			$.ajax({
				url : "/reguser?r=" + Math.random(),
				type : "post",
				data : params,
				dataType : "json",
				timeout : 30000,
				success : function(data, s) {
					if (data.result) {
						alert("注册成功");
						location.href = params.service + "?ticket=" + data.ticket;
					} else {
						alert(data.msg);
						getAuthCode2();
					}
				},
				error : function(er) {
					alert('请求数据失败。');
				}
			});
		}
	}
}
// 发送短信验证码
function sendVerifySMS(val) {
	var exp = new RegExp("^(13|15|17|18)[0-9]{9}$", "i");
	if (exp.test($("#userMobile").val())) {
		verifySendSMSBtn(val);
		$.ajax({
			url : "/sendsms?r=" + Math.random(),
			type : "post",
			data : {
				userMobile : $("#userMobile").val(),
				state : $("#state").val(),
				service : $("#service").val()
			},
			dataType : "json",
			timeout : 30000,
			success : function(data, s) {
				if (data.success) {
					$('#mobileCode').removeAttr("disabled");
				} else {
					alert(data.msg);
				}
			},
			error : function(er) {
				alert('请求数据失败。');
			}
		});
	} else {
		alert("请输入正确的手机号码");
	}
}
var countdown = 60;
var timerObj = undefined;
function verifySendSMSBtn(val) {
	if (countdown == 0) {
		$(val).removeAttr("disabled");
		$(val).text("获取短信验证码");
		// val.removeAttribute("disabled");
		// val.text = "获取短信验证码";
		countdown = 60;
		if (timerObj) {
			clearTimeout(timerObj);
			return false;
		}
	} else {
		// val.setAttribute("disabled", true);
		// val.text = "重新发送(" + countdown + ")";
		$(val).attr('disabled', "true");
		$(val).text("重新发送(" + countdown + ")");
		countdown--;
	}
	timerObj = setTimeout(function() {
		verifySendSMSBtn(val);
	}, 1000);
}
// 输入完11位手机号触发失去焦点事件
function onKeyupClick(val) {
	if ($(val).val()) {
		var str = $(val).val().replace(/\s+/g, "");
		if (str.length == 11) {
			$('#mobileCode').focus();
		}
	}

}
// 获取验证码
function getAuthCode2() {
	$('#authCode2').val('');
	document.getElementById("authCodeIMG2").src = "/getcode?r=" + Math.random();
}
// 下次再说，直接登录回到首页
function goMain() {
	var params = {};
	params.state = $("#state").val();
	params.siteName = $("#siteName").val();
	params.service = $("#service").val();
	params.nickName = $("#nickName").val();
	$.ajax({
		url : "/thirdreguser?r=" + Math.random(),
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
}

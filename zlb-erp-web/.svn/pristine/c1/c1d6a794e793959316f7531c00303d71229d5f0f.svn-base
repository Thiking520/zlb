document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode == 13) {
		submitForm();
		return false;
	}
};

$(function() {
	initSysPath();
	$.formValidator.initConfig({
		onerror : function(msg) {
			alert(msg);
		}
	});
	$("#userAlias").formValidator({
		onshow : "请输入您的用户名",
		onfocus : "4-20位字符，字母开头，支持字母、数字、\"_\"组合",
		oncorrect : "该用户名可以注册"
	}).inputValidator({
		min : 4,
		max : 20,
		onerror : "用户名只能在4-20位字符之间"
	}).regexValidator({
		regexp : "username",
		datatype : "enum",
		onerror : "用户名格式不正确"
	}).ajaxValidator({
		type : "get",
		url : "../pub/pubController/verifyUserExist?r=" + Math.random(),
		datatype : "json",
		success : function(data) {
			if (data.success) {
				return false;
			}
			return true;
		},
		buttons : $("#submitButton"),
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror : "用户名已被注册，请更换用户名",
		onwait : "正在对用户名进行合法性校验，请稍候..."
	});
	$("#password").formValidator({
		onshow : "请输入您的密码",
		onfocus : "6-20位字符，建议由字母，数字和符号两种以上组合",
		oncorrect : "密码合法"
	}).inputValidator({
		min : 6,
		max : 20,
		onerror : "密码长度只能在6-20位字符之间"
	});
	$("#password2").formValidator({
		onshow : "请输入重复密码",
		onfocus : "两次密码必须一致",
		oncorrect : "密码输入正确"
	}).inputValidator({
		min : 6,
		max : 20,
		onerror : "密码长度只能在6-20位字符之间"
	}).compareValidator({
		desid : "password",
		operateor : "=",
		onerror : "2次密码不一致,请确认"
	});
	$("#userMobile").formValidator({
		onshow : "请输入您的手机号码",
		onfocus : "请输入11位的手机号码",
		oncorrect : "手机号码输入正确"
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
		url : "../pub/pubController/verifyUserMobileExist?r=" + Math.random(),
		datatype : "json",
		success : function(data) {
			if (data.success) {
				$('#sendMobileCode').attr('disabled', true);
				return false;
			}
			$('#sendMobileCode').attr('disabled', false);
			return true;
		},
		buttons : $("#submitButton"),
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
	$("#authCode").formValidator({
		onshow : "请输入验证码",
		onfocus : "点击获取验证码",
		oncorrect : ""
	}).inputValidator({
		min : 4,
		max : 6,
		onerror : "点击获取验证码"
	}).ajaxValidator({
		type : "get",
		url : "../pub/pubController/verifyAuthCode?r=" + Math.random(),
		datatype : "json",
		success : function(data) {
			if (data.success) {
				return true;
			}
			getAuthCode();
			return false;
		},
		buttons : $("#submitButton"),
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror : "验证码输入错误",
		onwait : "正在对用户名进行合法性校验，请稍候..."
	});
});
// 注册
function submitForm() {
	if ($.formValidator.pageIsValid('1')) {
		if (!$('#readCheckBox').is(':checked')) {
			alert("请阅读用户协议并接受");
		} else {
			var params = {};
			params.userMobile = $("#userMobile").val();
			params.userAlias = $("#userAlias").val();
			params.mobileCode = $("#mobileCode").val();
			params.password = $("#password").val();
			params.authCode = $("#authCode").val();
			$.ajax({
				url : "../pub/pubController/regUser?r=" + Math.random(),
				type : "post",
				data : params,
				dataType : "json",
				timeout : 30000,
				success : function(data, s) {
					if (data.success) {
						alert("注册成功");
						window.location = projectWebRoot;
					} else {
						alert(data.msg);
						getAuthCode();
					}
				},
				error : function(er) {
					alert('请求数据失败。');
				}
			});
		}
	} else {
		getAuthCode();
	}
}
// 发送短信验证码
function sendVerifySMS(val) {
	var exp = new RegExp("^(13|15|17|18)[0-9]{9}$", "i");
	if (exp.test($("#userMobile").val())) {
		verifySendSMSBtn(val);
		$.ajax({
			url : "../pub/pubController/sendMobileCode?r=" + new Date(),
			type : "post",
			data : {
				userMobile : $("#userMobile").val()
			},
			dataType : "json",
			timeout : 30000,
			success : function(data, s) {
				if (!data.success) {
					alert(data.msg);
				} else {
					$('#mobileCode').removeAttr("disabled");
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
function getAuthCode() {
	$('#authCode').val('');
	document.getElementById("authCodeIMG").src = "../pub/pubController/getAuthCode?r=" + Math.random();
}

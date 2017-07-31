$(function() {
	initystep();
	$(".ystep1").setStep(1);
	getAuthCode();
	$.formValidator.initConfig({
		validatorgroup : "1",
		onerror : function(msg) {
			alert(msg);
		}
	});
	$.formValidator.initConfig({
		validatorgroup : "2",
		onerror : function(msg) {
			alert(msg);
		}
	});
	$.formValidator.initConfig({
		validatorgroup : "3",
		onerror : function(msg) {
			alert(msg);
		}
	});
	$("#userAlias").formValidator({
		validatorgroup : "1",
		onshow : "请输入您的用户名/绑定手机号",
		onfocus : "请输入您的用户名/绑定手机号",
		oncorrect : "用户名正确"
	}).inputValidator({
		min : 4,
		max : 20,
		onerror : "请输入您的用户名/绑定手机号"
	}).ajaxValidator({
		isvalid : true,
		type : "get",
		url : "../pub/pubController/userExist?r=" + Math.random(),
		datatype : "json",
		success : function(data) {
			if (data.success) {
				return false;
			}
			return true;
		},
		buttons : $("#step1Btn"),
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror : "用户名不存在，请更换用户名",
		onwait : "正在对用户名进行合法性校验，请稍候..."
	});
	$("#authCode").formValidator({
		validatorgroup : "1",
		onshow : "请输入验证码",
		onfocus : "请输入验证码",
		oncorrect : "验证码正确"
	}).inputValidator({
		min : 4,
		max : 6,
		onerror : "验证码错误"
	}).ajaxValidator({
		isvalid : true,
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
		buttons : $("#step1Btn"),
		error : function() {
			alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onerror : "验证码输入错误",
		onwait : "正在对用户名进行合法性校验，请稍候..."
	});
});

function initystep() {
	$(".ystep1").loadStep({
		size : "large",
		color : "green",
		steps : [ {
			title : "填写账户名",
			content : "输入用户名或手机号码"
		}, {
			title : "验证身份",
			content : "发送手机验证码"
		}, {
			title : "设置新密码",
			content : "设置一个新密码"
		}, {
			title : "完成",
			content : "新密码设置成功"
		} ]
	});
}
// 获取验证码
function getAuthCode() {
	$('#authCode').val('');
	document.getElementById("authCodeIMG").src = "../pub/pubController/getAuthCode?r=" + Math.random();
}
// 验证身份
function goStep2() {
	if (jQuery.formValidator.pageIsValid('1')) {
		$('#sendMobileCode').removeAttr("disabled");
		var userMobileTxt = '';
		var userEmailTxt = '';
		$.ajax({
			url : "../pub/pubController/getUser?r=" + Math.random(),
			method : 'POST',
			data : {
				userAlias : $('#userAlias').val(),
				authCode : $('#authCode').val()
			},
			dataType : 'json',
			success : function(data) {
				if (data.success) {
					userMobileTxt = data.object.userMobile;
					$('#step2UserAlias').text(data.object.userAlias);
					$('#step2UsermobileNum').text(data.object.userMobile);
					if (data.object.userEmail) {
						userEmailTxt = data.object.userEmail;
						$("#verifyType").append("<option value='1'>已验证邮箱</option>");
					}

					$("#verifyType").change(function() {
						if ($(this).val() == 0) {
							$('#labelTxt1').text('已验证手机号');
							$('#labelTxt2').text('短信验证码');
							$('#sendMobileCode').text('获取短信验证码');
							$('#step2UsermobileNum').text(userMobileTxt);
						} else if ($(this).val() == 1) {
							$('#labelTxt1').text('已验证邮箱');
							$('#labelTxt2').text('邮箱验证码');
							$('#sendMobileCode').text('获取邮箱验证码');
							$('#step2UsermobileNum').text(userEmailTxt);
						}
					});

					$('#fstep1').hide();
					$('#fstep2').show();
					$(".ystep1").setStep(2);
					initStep2();
				} else {
					alert(data.msg);
				}
			}
		});
	}
}
function initStep2() {
	$("#mobileCode").formValidator({
		validatorgroup : "2",
		onshow : "请输入您的手机验证码",
		onfocus : "点击获取手机验证码",
		oncorrect : ""
	}).inputValidator({
		min : 4,
		max : 6,
		onerror : "验证码错误"
	});
}
// 设置新密码
function goStep3() {
	if (jQuery.formValidator.pageIsValid('2')) {
		$.ajax({
			url : "../pub/pubController/verifyMobileCode?r=" + Math.random(),
			type : "post",
			data : {
				mobileCode : $('#mobileCode').val(),
				verifyType : $('#verifyType').val()
			},
			dataType : "json",
			timeout : 30000,
			success : function(data, s) {
				if (data.success) {
					$('#fstep2').hide();
					$('#fstep3').show();
					$(".ystep1").setStep(3);
					initStep3();
				} else {
					alert(data.msg);
				}
			},
			error : function(er) {
				alert('请求数据失败。');
			}
		});
	}
}
function initStep3() {
	$("#password").formValidator({
		validatorgroup : "3",
		onshow : "请输入您的密码",
		onfocus : "6-20位字符，建议由字母，数字和符号两种以上组合",
		oncorrect : "密码合法"
	}).inputValidator({
		min : 6,
		max : 20,
		onerror : "密码长度只能在6-20位字符之间"
	});
	$("#password2").formValidator({
		validatorgroup : "3",
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
}

function goStep4() {
	if (jQuery.formValidator.pageIsValid('3')) {
		$.ajax({
			url : "../pub/pubController/setNewPassword?r=" + Math.random(),
			type : "post",
			data : {
				mobileCode : $('#mobileCode').val(),
				password : $("#password").val(),
				verifyType : $('#verifyType').val()
			},
			dataType : "json",
			timeout : 30000,
			success : function(data, s) {
				if (data.success) {
					$('#fstep3').hide();
					$('#fstep4').show();
					$(".ystep1").setStep(4);
				} else {
					alert(data.msg);
				}
			},
			error : function(er) {
				alert('请求数据失败。');
			}
		});
	}
}
// 发送短信验证码
function sendVerifySMS(val) {
	verifySendSMSBtn(val);
	$.ajax({
		url : "../pub/pubController/sendMobileCode?r=" + Math.random(),
		type : "post",
		data : {
			'verifyType' : $('#verifyType').val()
		},
		dataType : "json",
		timeout : 30000,
		success : function(data, s) {
			if (!data.success) {
				if (data.resultCode == "999") {
					alert("当前流程已失效，请重新操作");
					window.reload();
				} else {
					alert(data.msg);
				}
			} else {
				$('#mobileCode').removeAttr("disabled");
			}
		},
		error : function(er) {
			alert('请求数据失败。');
		}
	});
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
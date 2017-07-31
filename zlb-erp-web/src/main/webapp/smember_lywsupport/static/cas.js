document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode == 13) {
		submitForm();
		return false;
	}
};
(function($) {
	$("#authCode").val('')
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}
})(jQuery);
// 登陆
function submitForm() {
	var params = {};
	params.username = $("#username").val();
	params.password = $("#password").val();
	params.authcode = $("#authCode").val();
	var backurl = $.getUrlParam('service');
	if (backurl) {
		params.service = backurl;
	}
	$.ajax({
		url : "/login",
		type : "post",
		data : params,
		dataType : "json",
		timeout : 30000,
		success : function(data, s) {
			if (data.result) {
				location.href = backurl + "?ticket=" + data.ticket;
			} else {
				$('#msg').text(data.msg);
				$('#getcodeImg').attr('src',"/getcode?r=" + Math.random()); 
			}
		},
		error : function(er) {
			alert('请求数据失败。');
		}
	});
}

// 重新生成验证码
function createAuthCode(obj) {
	$('#authCode').val('');
	$('#msg').text('');
	$('#successImg').hide();
	obj.src = "/getcode?r=" + Math.random();
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

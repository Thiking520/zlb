var login={
		loginJson:function () {
			var params = {"userName":$("#userName").val(),"pwd":md5($("#pwd").val())};
				$.callAjax({
					type:"post",
					url : "/login/doLogin",
					data : params,
					success : function(data){
						if(data.code == constants.code_success){
							$.cookie(constants.oper_key, JSON.stringify(data.data),{ path: '/' }); 
			        		location.href = contextPath + "/login/main";
			        	}else{
			        		location.href = contextPath + "/login/unAuthorized?msg="+data.msg;
			        	}
		      		
					},
					error : function(){
						$.toastrError();
					}
				});
			
		}
}



$(document).ready(function(){
	// 初始化
	$("#login_btn").click(function(){
		login.loginJson();
	});
});
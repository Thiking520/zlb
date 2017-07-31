
var myMain={
		//当前点击的左侧树形菜单地址
		currClickTreeUrl:'',
		selfCompanyName:'',
		allMenu:{},
		urlMenu:[],
		manaOperator:[],
		initData:function (operatorIdToken){
			var params = {'operatorIdToken':operatorIdToken};
			$.callAjax({
				type:"post",
				url : "/login/allMenu",
				data : params,
				async: false,
				success : function(data){
					if(data.code == constants.code_success){
						
						myMain.allMenu=data.data.loginMenuVoList;
						myMain.manaOperator=data.data.loginManagerOperatorVoList;
						myMain.selfCompanyName=data.data.companyName;
						
						myMain.initMain();
						if(operatorIdToken == 0){
							myMain.managerOperator();
						}
					}else{
			    		$.toastrWarning(data.msg);
			    	}
					$(".modal-backdrop").remove();
				}
			});
		}
		,
		next:function (id,url,menuUrl,isExternalSystemUrl){
			myMain.leftMenu(id);
			if(url){
				myMain.enterTopMenu(url,menuUrl,isExternalSystemUrl);
			}
			
		}
		,
		nodeMenu:function (id){
			var leftMenu = new Array();
			leftMenu.push('[');
			for(var i=0;i<myMain.allMenu.length;i++){
				if(myMain.allMenu[i].parentId == id){
					if(myMain.allMenu[i].menuType==1){
						leftMenu.push('{');
						leftMenu.push('"text":"'+myMain.allMenu[i].menuName+'",');
						// leftMenu.push('"color":"#dedede",');
						leftMenu.push('"nodes":[');
						for(var j=0;j<myMain.allMenu.length;j++){
							if(myMain.allMenu[j].parentId==myMain.allMenu[i].id){
								if(myMain.allMenu[j].menuType==1){
									leftMenu.push('{');
									leftMenu.push('"text":"'+myMain.allMenu[j].menuName+'",');
									// leftMenu.push('"color":"#dedede",');
									leftMenu.push('"nodes":[');
									for(var z=0;z<myMain.allMenu.length;z++){
										if(myMain.allMenu[z].parentId==myMain.allMenu[j].id){
											if(myMain.allMenu[z].menuType==2){
												leftMenu.push('{');
									            leftMenu.push('"text":"'+myMain.allMenu[z].menuName+'",');
									            // leftMenu.push('"color":"#dedede",');
									            leftMenu.push('"href":"'+myMain.allMenu[z].menuUrl+'"');
									            leftMenu.push('},');
											}
										}
									}
									leftMenu.push(']');
									leftMenu.push('},');
									
								}
							}
						}
						
						for(var jj=0;jj<myMain.allMenu.length;jj++){
							if(myMain.allMenu[jj].parentId==myMain.allMenu[i].id){
								if(myMain.allMenu[jj].menuType==2){
									leftMenu.push('{');
						            leftMenu.push('"text":"'+myMain.allMenu[jj].menuName+'",');
						            // leftMenu.push('"color":"#dedede",');
						            leftMenu.push('"href":"'+myMain.allMenu[jj].menuUrl+'"');
						            leftMenu.push('},');
								}
							}
						}
						leftMenu.push(']');
						leftMenu.push('},');
				    }
			    }
			}
			leftMenu.push(']');
			var str=leftMenu.join("");
			str=str.replace(/},]/g, "}]");

			return str;
		}
		,
		initTopMenu:function (){
			var topAllMenu=myMain.allMenu;
			if(topAllMenu){
				$("#topMenu").empty();
                var count = 0;
				for(var i=0; i<topAllMenu.length; i++){
					 if(topAllMenu[i].parentId == 0){
					 	if(count===0){
                            $("#topMenu").append('<li class="active" method="myMain.next('+topAllMenu[i].id+',\''+topAllMenu[i].moduleUrl+'\',\''+topAllMenu[i].menuUrl+'\',' + topAllMenu[i].isExternalSystemUrl + '  )"><a href="#"><span class="menuName">'+topAllMenu[i].menuName+'</span></a></li>');
                        }else {
                            $("#topMenu").append('<li method="myMain.next('+topAllMenu[i].id+',\''+topAllMenu[i].moduleUrl+'\',\''+topAllMenu[i].menuUrl+'\',' + topAllMenu[i].isExternalSystemUrl + '  )"><a href="#"><span class="menuName">'+topAllMenu[i].menuName+'</span></a></li>');
                        }
                        count++;
					 }
				     
				} 
				//初始化默认左侧菜单
				// $("#topMenu li:first-child").trigger("click");
                var method = $("#topMenu li:first-child").attr("method");
				var methodFunc = new Function(method);
				methodFunc();
			}
		}
		,
		getTree:function (id){
			return myMain.nodeMenu(id);
		}
		,
		leftMenu:function (id){
            $("#tree").empty();
            var dataTree = myMain.getTree(id);
            $('#tree').treeview({
		    	data: JSON.parse(dataTree),
		    	levels: 2,
		    	enableLinks:false,
                expandIcon: 'glyphicon glyphicon-chevron-right',
                collapseIcon: 'glyphicon glyphicon-chevron-down',
                // selectedIcon:"glyphicon glyphicon-ok",
                color: '#d0d0d0', // '#000000',
                backColor: '#282d30', // '#FFFFFF',
                borderColor: '#4c4c4c', // '#dddddd',
                onhoverColor: '#f92d40',
                selectedColor: '#f92d40',
                selectedBackColor: '#000000'
/*		    	onNodeSelected: function(event, data) {
					if (data.nodes != null) {
						var select_node = $('#tree').treeview('getSelected');
						if (select_node[0].state.expanded) {
							$('#tree').treeview('collapseNode', select_node);
							select_node[0].state.selected = false;
							select_node[0].state.selectable = false;
						} else {
							$('#tree').treeview('expandNode', select_node);
							select_node[0].state.selected = false;
							select_node[0].state.selectable = false;
						}
					}
					if (data.href) {
						myMain.getAllContent(data.href);
						myMain.currClickTreeUrl = data.href;
					}
		    	}*/
		    }); 
		}
		,
		initHeight:function (){
			$("#headDiv").css("margin-bottom",0);
			var contentHeight=$(window).height()-$("#headDiv").outerHeight(true)-10;
			$("#leftcontent").css("height",contentHeight);
			$("#rightcontent").css("height",contentHeight);
			
		}
		,
		initWidth:function (){
			var contentWidth=$(window).width()-$("#leftcontent").outerWidth(true);
			$("#rightcontent").css("width",contentWidth);
			
		}
		,
		initMain:function (){
			
			myMain.urlMenu=[];
			for(var i=0; i<myMain.allMenu.length; i++){  
				if(myMain.allMenu[i].menuType==3){//功能按钮
					myMain.urlMenu.push(myMain.allMenu[i].menuUrl);
				}
			}
			myMain.initTopMenu();
			
		}
		,
		managerOperator:function (){
			var managerOperator=$('#managerOperator');
			if(myMain.manaOperator){
				var arr = new Array();
				for(var i=0; i<myMain.manaOperator.length; i++){
					arr.push('<option value="'+myMain.manaOperator[i].operatorIdToken+'">'+myMain.manaOperator[i].companyName+'</option>');
				}
				arr.reverse();//右上角反转
				managerOperator.html(arr.join(""));
				managerOperator.change();
				if(myMain.manaOperator.length>0){
					managerOperator.css('display','block');
				}
				myMain.initData(myMain.manaOperator[myMain.manaOperator.length-1].operatorIdToken);
				managerOperator.change(function(){
					myMain.initData(managerOperator.val());
				});
			}
			
		}
		,
		getAllContent:function (url){
			myMain.loadCurUrl=url;
			$("#allcontent").load(contextPath+url, function(data,statusTxt,xhr) {
				if(statusTxt=="error"){
					//跳转到登录页面
                    top.location.href = contextPath;
					return;
				}
				try{
					var json=JSON.parse(data);
					if(json.code==constants.code_login_auth_err || json.code==constants.code_incorrect_err){
						myMain.jumpInfo(json.msg);
						return;
					}
				}catch(e){
					
				}
            });
		},
		enterTopMenu:function (url,menuUrl,isExternalSystemUrl){
			var leftTreeDiv = $("#leftcontent");
			myMain.loadCurUrl = url;
			url = contextPath + url;
			if($.isNotNull(isExternalSystemUrl) && 1 == isExternalSystemUrl){
				leftTreeDiv.hide();
				url += "?redirectUrl=" + menuUrl;
				$('#rightcontent').removeAttr("style");
				$("#rightcontent").removeClass("rightcontent");
				$("#rightcontent").addClass("externalSystemMenu");
			} else {
				leftTreeDiv.show()
				myMain.initWidth();
				$("#rightcontent").removeClass("externalSystemMenu");
				$("#rightcontent").addClass("rightcontent");
			}
			$("#allcontent").load(url, function(data,statusTxt,xhr) {
				if(statusTxt=="error"){
					//跳转到登录页面
                    myMain.jumpInfo("登录已失效，请重新登录！");
					return;
				}
				try{
					var json=JSON.parse(data);
					if(json.code==constants.code_login_auth_err || json.code==constants.code_incorrect_err){
						myMain.jumpInfo(json.msg);
						return;
					}
				}catch(e){
					
				}
            });
			myMain.initHeight();
		}
		,
		getUrlPara:function (name){
			var str = location.href;  
			return myMain.urlGetValue(str,name);
		}
        ,
		loadCurUrl:"",
        getUrlValue:function (name){
        	return myMain.urlGetValue(myMain.loadCurUrl,name);
		}
		,
		//=====layerTwo
		layerTwoUrl:"",
		getLayerTwo:function (url){
			myMain.layerTwoUrl=url;
			$("#layerTwo").load(contextPath+url, function(data,statusTxt,xhr) {
				if(statusTxt=="error"){
					myMain.reqInfo(xhr.status);
					return;
				}
			});
		}
		,
		getLayerTwoPara:function (name){
			return myMain.urlGetValue(myMain.layerTwoUrl,name);
		}
		,
		//=====layerOne
		layerOneUrl:"",
		getLayerOne:function (url){
			myMain.layerOneUrl=url;
			$("#layerOne").load(contextPath+url, function(data,statusTxt,xhr) {
				if(statusTxt=="error"){
					myMain.reqInfo(xhr.status);
					return;
				}
			});
		}
        ,
        getLayerOnePara:function (name){
        	return myMain.urlGetValue(myMain.layerOneUrl,name);
		}
        ,
        urlGetValue:function (url,para){
        	var regExp = new RegExp("(^|&)"+ para +"=([^&]*)(&|$)");  
        	var valueArr = url.substr(url.indexOf("\?")+1).match(regExp);  
        	if (valueArr!=null){
        		return unescape(valueArr[2]); 
        	}
        	return null;  
        }
        ,
        getUserType:function(){
        	var operKey=$.cookie(constants.oper_key,{ path: '/' });
        	var operKeyJson=JSON.parse(operKey);
        	return operKeyJson.userType;
        }
        ,
        jumpInfo:function(text){
        	top.location.href = contextPath+'/login/topSkipLogin?info='+text;
        }
        ,
        reqInfo:function(status){
        	$.toastrError(status+",请联系管理员！");
        },
        
        //修改密码
        modifyPwd:function(){
        	var password = $("#sourcePwd").val().trim();
        	var newPwd = $("#newPwd").val().trim();
        	var newPwdTwo = $("#newPwdTwo").val().trim();
        	if(password.length > 16 || newPwd.length > 16 || newPwdTwo.length > 16 ) {
        		$.toastrWarning('密码长度不能大于16个字符');
        		return;
        	} else if(password.length < 6 || newPwd.length < 6 || newPwdTwo.length < 6 ) {
        		if(password.length == 0) {
        			$.toastrWarning('原始密码不能为空');
        		} else if(newPwd.length == 0) {
        			$.toastrWarning('新密码不能为空');
        		} else if(newPwdTwo.length == 0) {
        			$.toastrWarning('确认密码不能为空');
        		} else {
        			$.toastrWarning('密码长度不能小于6个字符');
        		}
        		return;
        	}
        	if(password == newPwd) {
        		$.toastrWarning('新密码不能与旧密码相同');
        		return;
        	} else if(newPwd != newPwdTwo) {
        		$.toastrWarning('两次密码不一致');
        		return;
        	}
        	
        	var params = {"password":password,"newPwd":newPwd};
        	$.callAjax({
				type:"post",
				url : "/login/modifyPwd",
				data : params,
				success : function(data){
					if(data == "0000"){
						$.toastrSuccess("修改密码成功");
						$.hideModal('#myModal13');
					}else{
			    		$.toastrWarning(data);
			    	}
				}
			});
        },
      //表单检验
        validateform:function(){
        	//表单验证start
        	$('#pwdForm').bootstrapValidator({
    	        message: 'This value is not valid',
    	        feedbackIcons: {
    	        	      valid: 'glyphicon glyphicon-ok',
    	        	      invalid: 'glyphicon glyphicon-remove',
    	        	      validating: 'glyphicon glyphicon-refresh'
                },
    	        fields: {
    	        	sourcePwd: {
    	                validators: {
    	                    notEmpty: {message: '旧密码不能为空！'},
    	                    stringLength: {
                                min: 16,
                                max: 16,
                                message: '密码长度不能大于16位'
                            }
    	                }
    	            },
    	            newPwd: {
    	            	validators: {
    	                    notEmpty: {message: '新密码不能为空！'},
    	                    stringLength: {
                                min: 16,
                                max: 16,
                                message: '密码长度不能大于16位'
                            }
    	                }
    	            },
    	            newPwdTwo: {
    	            	validators: {
    	                    notEmpty: {message: '新密码不能为空！'},
    	                    stringLength: {
                                min: 16,
                                max: 16,
                                message: '密码长度不能大于16位'
                            }
    	                },
    	                identical: {//相同
                            field: 'newPwd', //需要进行比较的input name值
                            message: '两次密码不一致'
                        }
    	            },
	                
    	        },
    	        excluded: [':disabled'] 
    	    });
        	//表单验证end
        },
    bindEvent : function() {

        $("#topMenu").on("click","li", function() {
            treeInitClick();
            var $obj = $(this);
            $("#topMenu li").removeClass("active");
            $obj.addClass("active");
            var method = $obj.attr("method");
            var methodFunc = new Function(method);
            methodFunc();
            $(".treeview").off();
        });
        treeInitClick();

    }
}


$(document).ready(function(){
	/*myMain.validateform();*/
	myMain.initData(constants.mana_role_type);
	myMain.initHeight();
	myMain.initWidth();
	$(window).resize(function() {
		myMain.initHeight();
		myMain.initWidth();
	});
    myMain.bindEvent();
});
//
// function itemOnclick(target){
//     //找到当前节点id
//     var nodeid = $(target).attr('data-nodeid');
//     var tree = $('#tree');
//     //获取当前节点对象
//     var node = tree.treeview('getNode', nodeid);
//
//     if(node.state.expanded){
//         //处于展开状态则折叠
//         tree.treeview('collapseNode', node.nodeId);
//     } else {
//         //展开
//         tree.treeview('expandNode', node.nodeId);
//     }
//     if (node.href) {
//     	//设置父节点 当前节点样式
//         $("#tree .list-group-item[data-nodeid="+nodeid+"]").addClass("node-selected")
//         $("#tree .list-group-item[data-nodeid="+nodeid+"]").css({
//             "color": "#f92d40",
//             "background-color": "#000000"
//         });
//         var parentId = node.parentId;
//         $("#tree .list-group-item[data-nodeid="+parentId+"]").addClass("node-selected")
//         $("#tree .list-group-item[data-nodeid="+parentId+"]").css({
//             "color": "#f92d40",
//             "background-color": "#000000"
//         });
//         myMain.getAllContent(node.href);
//         myMain.currClickTreeUrl = node.href;
//     }
// }

function treeInitClick() {

    $("#tree").parent().off().on("click",".list-group-item", function() {
        //找到当前节点id
        var nodeid = $(this).attr('data-nodeid');
        var tree = $('#tree');
        //获取当前节点对象
        var node = tree.treeview('getNode', nodeid);

        if(node.state.expanded){
            //处于展开状态则折叠
            tree.treeview('collapseNode', node.nodeId);
        } else {
            //展开
            tree.treeview('expandNode', node.nodeId);
        }
        if (node.href) {
            //设置父节点 当前节点样式
            $("#tree .list-group-item[data-nodeid="+nodeid+"]").addClass("node-selected")
            $("#tree .list-group-item[data-nodeid="+nodeid+"]").css({
                "color": "#f92d40",
                "background-color": "#000000"
            });
            var parentId = node.parentId;
            $("#tree .list-group-item[data-nodeid="+parentId+"]").addClass("node-selected")
            $("#tree .list-group-item[data-nodeid="+parentId+"]").css({
                "color": "#f92d40",
                "background-color": "#000000"
            });
            myMain.getAllContent(node.href);
            myMain.currClickTreeUrl = node.href;
        }
    });

}


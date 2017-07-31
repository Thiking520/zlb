// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsMaterialManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//获取所有商品分类请求地址
    	goodsTypeTreeUrl: function () {
            return '/publicData/goodsType/goodsTypeTree';
        },//分页获取商品素材请求地址
    	searchListByPageUrl: function () {
            return '/publicData/goodsMaterial/list';
        },//新增的请求地址
        addDataUrl: function () {
            return '/publicData/goodsMaterial/addData';
        },//修改的请求地址
        updateDataUrl:function(){
        	return '/publicData/goodsMaterial/updateData';
        },//删除素材
        deleteImgUrl:function() {
        	return '/publicData/goodsMaterial/deleteImg';
        },//获取七牛token和domain
        getUpTokenUrl:function() {
        	return '/publicData/goodsMaterial/getUpToken'
        }
    },
    /**查：初始化商品分类，树形结构**/
    initTree: function () {
		$(".no-print").remove();
		$.callAjax({
			url : goodsMaterialManager.URL.goodsTypeTreeUrl(),
			data : "",
			success : function(serverData) {
				$('#goodsMaterialTreeDiv').treeview({
					data : serverData,
					levels : 99,// 展开的层次
					showCheckbox: false,
					showTags : false,// 需要配合tags来使用，如text: 'Parent 2', tags: ['7']
					showBorder: true,// 是否显示分割线
					enableLinks : true,// 鼠标放上去显示<a>链接样式
					highlightSelected: true,
					onNodeSelected : function(event, node) {
						//调用查询方法，查找对应素材
						goodsMaterialManager.searchListByPage(1,10,node.id);
					}
				});
			}
		});
	},
	/**查：初始化商品分类，树形结构**/
	searchListByPage: function (currentPage,pageSize,goodsType) {
		var offset = 0;
		var params = {};
		if(currentPage != null && pageSize != null) {
			var offset = (currentPage-1) * pageSize;
			params={"offset":offset,"pageSize":pageSize,"goodsTypeId":goodsType};
		} else {
			params={"goodsTypeId":goodsType};
		}
		params.searchKeyword = $('#searchKeyword').val();
		$.callAjax({
			url : goodsMaterialManager.URL.searchListByPageUrl(),
			data : params,
			success : function(serverData) {
				$("#btn_search").removeClass("disabled");
				$("#imageDiv").empty();
				//判断是否为文件夹，如果是文件夹，则没有添加功能
//				if(serverData.data.isDir) {
//					//隐藏“文件名称”面板
//					$("#fName").css("visibility","hidden");
//					//隐藏上传控件
//					$(".col-md-6").css("visibility","hidden");
//				} else {
//					//显示“文件名称”面板
//					$("#fName").css("visibility","visible");
//					//显示上传控件
//					$(".col-md-6").css("visibility","visible");
//				}
				
				//取出分页数据对象
				serverData = serverData.data.page;
				var a =0;
				for (var i=0 ; i<serverData.rows.length ; i++) {
					a++;
					var item = serverData.rows[i];
					var fileName = item.fileName;
					if(fileName.length > 6){
						fileName = fileName.substring(0, 6) + "...";
					}
					var html = "<li onmouseover='dis("+i+")' onmouseout='non("+i+")' class='thumbnail'>" +
								"<input class='el-checkbox__original' type='checkbox' value='"+item.id+"'>"+
									"<img  id='"+i+"' src='"+item.fileUrl+"' />"+
									"<img id='img"+i+"' onclick='deleteImg("+item.id+")' style='width:20px;height:20px;position:absolute;right:0px;top:0px;visibility:hidden' src='${contextPath}/../../resources/img/close_box_red.png' />"+
									"<p  style='text-align: center;'>"+fileName+"</p>";
					$("#imageDiv").append(html);
				}
				//以下是处理分页内容start======================
				//alert("当前页："+ serverData.currentPage+";每页显示条数：" +serverData.pageSize + ";总条数：" + serverData.total+";起始页：" + serverData.offset);
				var arr = new Array();
				//总页数
				var countPage = 1;
				if(serverData.total%serverData.pageSize == 0) {
					countPage = parseInt(serverData.total/serverData.pageSize);
				} else {
					countPage = parseInt(serverData.total/serverData.pageSize) + 1;
				}
				//当前页没有数据的时候，当前页码减1，重新刷新数据
				if(serverData.total ==0 && countPage > 1) {
					currentPage--;
					goodsMaterialManager.searchListByPage(currentPage,pageSize,goodsType);
					return;
				}
				arr.push('<li  onclick="javascript:goodsMaterialManager.searchListByPage(1,'+serverData.pageSize+','+goodsType+');selected('+0+','+(countPage+2)+')"><a href="javascript:;"><div>&laquo;</div></a></li>');
				for(var i=1;i<=countPage;i++) {
					arr.push('<li onclick="javascript:goodsMaterialManager.searchListByPage(this.innerText,'+serverData.pageSize+','+goodsType+');selected('+i+','+(countPage+2)+')"><a href="javascript:;"><div>'+i+'</div></a></li>');
				}
				arr.push('<li onclick="javascript:goodsMaterialManager.searchListByPage('+countPage+','+serverData.pageSize+','+goodsType+');selected('+(countPage+1)+','+(countPage+2)+')"><a href="javascript:;"><div>&raquo;</div></a></li>');
				$("#pageList").html(arr.join(""));
				//处理分页内容end======================
				
				//判断当前页数据
				//将商品类型保存后续使用
				$("#goodsType").val(goodsType);
				//分页数据等
				$("#currentPage").val(currentPage);
				$("#pageSize").val(pageSize);
				$("#total").val(serverData.total);
			}
		});
    },
    /**
     * 删除素材
     */
    deleteImg: function (id) {
    	$.dialogConfirm({
            message: '您确定要删除这个吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":id};
        			$.callAjax({
        				type:"post",
        				url : goodsMaterialManager.URL.deleteImgUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$.toastrSuccess('删除成功！');
    		         		//刷新数据
    		         		var goodsType = $("#goodsType").val();
    		         		var currentPage = $("#currentPage").val();
    		         		var pageSize = $("#pageSize").val();
    		         		goodsMaterialManager.searchListByPage(currentPage,pageSize,goodsType);
        				},
        				error : function(){
        					$.toastrError();
        				}
        			});
                }
            }
        });
    },
	//获取七牛upToken和存储空间域名
	getUpToken:function(){
		var params={};
		$.callAjax({
			type:"post",
			url : goodsMaterialManager.URL.getUpTokenUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		if(data.data == null){
         			$.toastrWarning("请为该运营商配置七牛公钥、私钥、域名、存储空间名称");
         			return;
         		}
         		//调用上传接口
         		upload(data.data.upToken,data.data.domain);
			}
		});
	},
	//添加素材
	addData:function(){
		var goodsType = $("#goodsType").val();
		var fileName = $("#fileName").val();
		var fileUrl = $("#fileUrl").val();
		var params={"goodsType":goodsType,"fileName":fileName,"fileUrl":fileUrl}
		
		$.callAjax({
			type:"post",
			url : goodsMaterialManager.URL.addDataUrl(),
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		//清空文件名输入框
         		$("#fileName").val("");
         		$.toastrSuccess('上传成功！');
         		checkName();
         		//刷新数据
         		var goodsType = $("#goodsType").val();
         		var currentPage = $("#currentPage").val();
         		var pageSize = $("#pageSize").val();
         		var countPage = $("#countPage").val();
         		var total = $("#total").val();
         		while(pageSize * currentPage <= total) {
         			currentPage++;
         		}
//         		goodsMaterialManager.searchListByPage(currentPage,pageSize,goodsType);
         		goodsMaterialManager.searchListByPage(1,pageSize,goodsType);
			},
			error : function(ddd){
				$.toastrError();
			}
		});
	},
    bindEvent: function () {
    	//绑定条件查询按钮事件
    	$("#btn_search").on("click",function () {
    		$("#btn_search").addClass("disabled");
    		goodsMaterialManager.isResetOffset = 1;
    		var goodsType = $("#goodsType").val();
    		if(goodsType==null || goodsType == ''){
    			goodsType = 0;
    		}
    		goodsMaterialManager.searchListByPage(1,10,goodsType);
    	});
    	
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsMaterialManager.initTree();
    	goodsMaterialManager.searchListByPage(1,10,0);
    }
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		
};

$(document).ready(function(){
	//1、初始化加载列表数据
	goodsMaterialManager.init();
	//2、初始化绑定增删改查事件
	goodsMaterialManager.bindEvent();
	//3、初始化上传控件
	goodsMaterialManager.getUpToken();
});

function dis(obj){
	$("#img"+obj).css("visibility","visible");
}
function non(obj){
	$("#img"+obj).css("visibility","hidden");
}
function deleteImg(id) {
	goodsMaterialManager.deleteImg(id);
}

//七牛上传方法
function upload(uptoken,domain) {
	Qiniu.uploader({
	    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
	    browse_button: 'imgFile',         	// 上传选择的点选按钮，必需
	    uptoken :uptoken,					//后台服务器提供的uptoken
	    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
		unique_names: true,              	// 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
		domain: domain,     				// bucket域名，下载资源时用到，必需
		//container: 'imgFile',             // 上传区域DOM ID，默认是browser_button的父元素
		max_file_size: '2mb',             // 最大文件体积限制
		flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
		max_retries: 3,                     // 上传失败最大重试次数
		dragdrop: true,                     // 开启可拖曳上传
		//drop_element: 'container',        // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		chunk_size: '2mb',                  // 分块上传时，每块的体积
	    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
	    init:{
	    	'BeforeUpload': function(up, file) {
	    		//文件上传前处理相关事情
	            var fileName = $("#fileName").val();
	            if(fileName == null || fileName.trim().length == 0) {
	            	//中止上传
	            	up.stop();
	            	$.toastrWarning("请输入文件名称");
	            } 
	        },
	    	'UploadProgress': function(up, file) {
	            // 每个文件上传时，处理相关的事情
                //var chunk_size = plupload.parseSize(this.getOption('chunk_size'));//文件总大小
                //显示进度条
	    		$("#pgsbar").css("visibility","visible");
			    var progress = parseInt(data.loaded / data.total * 100, 10);
		        $('#pgsbarColor').css(
		            'width',
		            file.percent + '%'
		        );
	     	},
	    	'FileUploaded': function(up, file, info) {
	            // 每个文件上传成功后，处理相关的事情
	            // 其中info是文件上传成功后，服务端返回的json，形式如：
	            // {
	            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
	            //    "key": "gogopher.jpg"
	            //  }
	    		//上传成功后延迟1秒中隐藏进度条
	    		setTimeout ("time()", 1000);
	    		//保存图片地址
	    		var sourceLink = domain +"/"+ JSON.parse(info).key; //获取上传成功后的文件的Url
	    		$("#fileUrl").val(sourceLink);
	    		//调用添加方法
	    		goodsMaterialManager.addData();
	    		//刷新表格
	    		
		    },'Error': function(up, err, errTip) {
		    	if(err.message == 'File size error.'){
		    		$.toastrError("文件大小有误，最大2MB");
		    		return;
		    	}
		        //上传出错时，处理相关的事情
		    	$.toastrError("上传失败！");
		    },
	    },
	    // 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
	    filters : {
	        max_file_size : '2mb',
	        prevent_duplicates: false,//防止重复,如果开启，同一个文件再次上传会失败,但是不能避免浏览器刷新后再次上传该文件
	        mime_types: [
	            //{title : "flv files", extensions : "flv"}, // 限定flv后缀上传格式上传
	            //{title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
	            {title : "Image files", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
	            //{title : "Zip files", extensions : "zip"} // 限定zip后缀上传
	        ]
	    }
	    
	});
}
//隐藏进度条
function time(){
	$("#pgsbar").css("visibility","hidden");
}

//分页选中，当前页背景颜色加深
//两个参数，第一个为当前选中的li的下标，第二个为li总数量
function selected(currentLiNum,countLiNum){
	$(".pagination").click(function(){
		//先去掉颜色已经加深过的
		for(var j = 0;j<countLiNum;j++) {
			$(".pagination li").eq(j).removeClass('active');
		}
		//选中后颜色加深
		$(".pagination li").eq(currentLiNum).addClass('active');
	});
}

function checkName(){
	var fileName = $("#fileName").val();//去左右空格
	fileName = fileName.replace(/(^\s*)|(\s*$)/g, "");
	if(fileName.length > 0){
		$("#imgFile").removeAttr('disabled');
	}else{
		$("#imgFile").attr("disabled", "true");
	}
}
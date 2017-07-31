// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsTypeManager = {
	//是否重置分页偏移值0：否，1：是
	isResetOffset: 0,
	seletedNode: null,
	//有效性 0 有效 1 无效
	isInvalid: 0,
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//分页获取所有商品分类请求地址
    	goodsTypeTreeUrl: function () {
            return '/publicData/goodsType/goodsTypeTree';
        },//删除商品分类的请求地址
        deleteUrl: function () {
            return '/publicData/goodsType/deleteData';
        },//新增商品分类的请求地址
        addDataUrl: function () {
            return '/publicData/goodsType/addData';
        },//修改商品分类的请求地址
        updateDataUrl:function(){
        	return '/publicData/goodsType/updateData';
        },//获取七牛token和domain
        getUpTokenUrl:function() {
        	return '/publicData/goodsMaterial/getUpToken';
        }
    },
    /**查：初始化商品分类，树形结构**/
    initTree: function () {
		$(".no-print").remove();
		$.callAjax({
			url : goodsTypeManager.URL.goodsTypeTreeUrl(),
			data : "",
			success : function(serverData) {
				$('#goodsTypeTreeDiv').treeview({
					data : serverData,
					levels : 99,// 展开的层次
					showCheckbox: false,
					showTags : false,// 需要配合tags来使用，如text: 'Parent 2', tags: ['7']
					showBorder: true,// 是否显示分割线
					enableLinks : true,// 鼠标放上去显示<a>链接样式
					highlightSelected: true
				});
			}
		});
	},
    /**删：删除商品**/
    deleteGoods: function (goodsId) {
    	$.dialogConfirm({
            message: '您确定要删除商品分类ID为['+goodsId+']的分类吗?',
            callback: function(result) {
                if(result) {
           		    var params = {"id":goodsId};
        			$.callAjax({
        				type:"post",
        				url : goodsTypeManager.URL.deleteUrl(),
        				data : params,
        				success : function(data){
    		         		if(data.code != "0000"){
    		         			$.toastrWarning(data.msg); 
    		         			return;
    		         		}
    		         		$.toastrSuccess('删除成功！');
    		         		goodsTypeManager.initTree();
        				}
        			});
                }
            }
        });
    },
    //添加或修改
	addOrUpdate:function(){
		var id = $("#keyId").val();
		var urlValue;
		if(id != "")
			urlValue=goodsTypeManager.URL.updateDataUrl();
		else
			urlValue=goodsTypeManager.URL.addDataUrl();
		var params={
			'id':id,
			'parentId':$('#parentId').val(),
			'typeName':$('#typeName').val(),
			'typeDesc':$('#typeDesc').val(),
			'sortIndex':$('#sortIndex').val(),
			'enabled':goodsTypeManager.isInvalid,	
			'imageUrl':$('#imageUrl').val()
		}
		$.callAjax({
			type:"post",
			url : urlValue,
			data : params,
			success : function(data){
         		if(data.code != "0000"){
         			$.toastrWarning(data.msg);
         			return;
         		}
         		$.toastrSuccess('操作成功！');
         		goodsTypeManager.seletedNode = null;
         		goodsTypeManager.initTree();
         		
         		// 防止重复提交
         		$.clearForm("addForm");
         		$('#addForm').data('bootstrapValidator').resetForm();
         		
         		$("#addType").css("display","none");
			}
		});
	},
	//表单检验
    validateform:function(){
    	//表单验证start
    	$('#addForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	        	      valid: 'glyphicon glyphicon-ok',
	        	      invalid: 'glyphicon glyphicon-remove',
	        	      validating: 'glyphicon glyphicon-refresh'
            },
	        fields: {
	        	typeName: {
	                validators: {
	                    notEmpty: {
	                        message: '分类名称不能为空！'
	                    },
	                    stringLength: {
                            min: 1,
                            max: 50,
                            message: '长度必须在1到50位之间'
                        },
	                }
	            },
	            sortIndex: {
                	validators: {
                		notEmpty: {
                			message: '排序值不能为空'
                		},
                		between: {
                            min: 1,
                            max: 999999999,
                            message: '请输入1~999999999之间的整数'
                        }
                        /*,
                        integer: {
                            message: '请输入1~999999999之间的整数'
                        }*/
                	}
                }
	        },
	        excluded: [':disabled'] 
	    });
    	//表单验证end
    },
    //获取七牛upToken和存储空间域名
	getUpToken:function(){
		var params={};
		$.callAjax({
			type:"post",
			url : goodsTypeManager.URL.getUpTokenUrl(),
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
         		goodsTypeManager.upload(data.data.upToken,data.data.domain);
			}
		});
	},
	//七牛上传方法
	upload: function (uptoken,domain) {
		Qiniu.uploader({
		    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
		    browse_button: 'imgFile',         	// 上传选择的点选按钮，必需
		    uptoken :uptoken,					//后台服务器提供的uptoken
		    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
			unique_names: true,              	// 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
			domain: domain,     				// bucket域名，下载资源时用到，必需
			max_file_size: '2mb',             // 最大文件体积限制
			flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
			max_retries: 1,                     // 上传失败最大重试次数
			dragdrop: true,                     // 开启可拖曳上传
			chunk_size: '2mb',                  // 分块上传时，每块的体积
		    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
		    init:{
		    	'BeforeUpload': function(up, file) {
		    		//文件上传前处理相关事情
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
		    		//上传成功后延迟1秒中隐藏进度条
		    		setTimeout ("time()", 1000);
		    		//保存图片地址
		    		var sourceLink = domain +"/"+ JSON.parse(info).key; //获取上传成功后的文件的Url
		    		$("#imageUrl").val(sourceLink);
		    		$("#imageShow").attr("src", sourceLink);
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
		            {title : "Image files", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
		        ]
		    }
		});
	},
    bindEvent: function () {
    	$('#goodsTypeTreeDiv').parent().on("click",".list-group-item", function() {
    		var node = $.monitorTreeRowClick($(this),"goodsTypeTreeDiv");
    		goodsTypeManager.seletedNode = node;
			var parentNodeData = $('#goodsTypeTreeDiv').treeview('getParent', node);
			var parentName = "顶级分类";
			if(parentNodeData.id != undefined)
				parentName = parentNodeData.text;
			// 赋值
			$("#keyId").val(node.id);
			$("#parentId").val(node.typeParentId);
			$("#parentName").val(parentName);
			$("#typeName").val(node.text);
			$("#typeDesc").val(node.typeDesc);
			$("#sortIndex").val(node.sortIndex);
			$("#typeCode").val("T"+node.id);//编码， T+id，
			$("input[name='typeEnabled'][value="+node.enabled+"]").prop("checked","checked"); // 赋值
			if(node.imageUrl == null || node.imageUrl == '')
				$("#imageShow").attr("src", $("#contextPath").val()+"/resources/img/no_image.jpg");
			else
				$("#imageShow").attr("src", node.imageUrl);
			$("#addType").css("display","block");
    	});
    	
    	$(".typeEnabled").click(function () {
    		goodsTypeManager.isInvalid = $(this).val();
	    });
    
    	//绑定展示新增界面事件
    	$("#btn_show_add").click(function () {
    		//至允许新增2级
    		if($.isNotNull(goodsTypeManager.seletedNode)){
    		  var parentId = goodsTypeManager.seletedNode.parentId;
    		  if($.isNotNull(parentId)){
    		  	 $.toastrWarning("只能新建最多2级分类"); 
    		     return;
    		  }
    		}
    		
    		$("#addType").css("display","block");
    		
    		$("#myModalLabel").text("新增分类");
    		
    		//父级分类
    		$("#parentId").val(goodsTypeManager.seletedNode==null?'0':goodsTypeManager.seletedNode.id);
    		$("#parentName").val(goodsTypeManager.seletedNode==null?'顶级分类':goodsTypeManager.seletedNode.text);
    		
    		$("#keyId").val("");
			$("#typeName").val("");
			$("#typeDesc").val("");
			$("#sortIndex").val("");
			$("#typeCode").val("");
			$("input[name='typeEnabled'][value=0]").attr("checked",true); 
			
			//图片
			$("#imageShow").attr("src", $("#contextPath").val()+"/resources/img/no_image.jpg");
			$("#imageUrl").val("");
	    });
    	//绑定删除事件
    	$("#btn_show_delete").click(function () {
    		var keyId = $("#keyId").val();
    		if(keyId == ""){
    			$.toastrWarning("请选择要删除的分类");
    			return;
    		}
			goodsTypeManager.deleteGoods(keyId);
			$("#addType").css("display","none");
	    });
    	//新增或修改
    	$("#btn_save_submit").click(function(){
    		var bootstrapValidator = $("#addForm").data('bootstrapValidator');
    		bootstrapValidator.validate();
    		if(bootstrapValidator.isValid())
    			goodsTypeManager.addOrUpdate();
    		else return;
    	});
    },//初始化分页查询列表数据 ★★★分页主体列表★★★
    init: function () {
    	goodsTypeManager.validateform();
    	goodsTypeManager.initTree();
    }
}

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
		
};

$(document).ready(function(){
	//1、初始化加载列表数据
	goodsTypeManager.init();
	//2、初始化绑定增删改查事件
	goodsTypeManager.bindEvent();
	//3、初始化上传控件
	goodsTypeManager.getUpToken();
});

//隐藏进度条
function time(){
	$("#pgsbar").css("visibility","hidden");
}
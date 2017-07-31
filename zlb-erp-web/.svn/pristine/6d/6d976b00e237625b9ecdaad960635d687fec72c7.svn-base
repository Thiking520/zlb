var waveManage = {
    // 是否重置分页偏移值0：否，1：是
    isResetOffset : 0,
    // 封装异步请求的所有ajax的URL地址
    URL : {
        // 跳转列表页
        initUrl : function() {
            return '/wave/init';
        },
        // 分页获取出口单列表请求地址
        searchListByPageUrl : function() {
            return '/wave/list';
        },
        deleteUrl : function() {
            return '/wave/delete'
        },
        updateUrl : function() {
            return '/wave/update'
        },
        saveUrl : function() {
            return '/wave/save'
        },
        queryUrl : function() {
            return '/wave/query'
        },
        enableUrl : function() {
            return '/wave/enable'
        },
        disableUrl : function() {
            return '/wave/disable'
        },
        queryOperatorWaveUrl : function() {
            return '/wave/queryOperatorWave'
        }

    },
    /** 分页获拣货单列表* */
    searchListByPage : function() {
        // 分页组件
        $.pageTable({
                tableId : "#waveTable",// 需要分页的table ID
                method: 'POST',//默认启用POST
                url : waveManage.URL.searchListByPageUrl(),// 请求后台的URL（*）
                queryParams : queryParams,
                onLoadSuccess : function() {
                    waveManage.isResetOffset = 0;
                    $("#btn_wave_search").removeClass(
                        "disabled");
                    waveManage.queryOperatorWaveStatus();
                },
/*                onClickRow : function(row, tr) {
                    id = row.id;
                },*/
                onLoadError: function (status) {
                    $("#btn_wave_search").removeClass("disabled");
                },
                sortable : true,
                sortName : 'startTime',
                sortOrder : 'ASC',
                columns : [
                    // {
                    //     radio : true
                    // },
                    {
                        field : 'id',
                        title : '波次号'
                    },
                    {
                        field : 'startTime',
                        title : '开始时间',
                        formatter : function(value, row, index) {
                            return value.substring(0,5)
                        }

                    },
                    {
                        field : 'stopTime',
                        title : '结束时间',
                        formatter : function(value, row, index) {
                            return value.substring(0,5)
                        }
                    },
                    {
                        field : 'deliveryStartTime',
                        title : '开始配送时间',
                        formatter : function(value, row, index) {
                            if(row.deliveryStartTimeDay != 0){
                                return row.deliveryStartTimeDay+"天后"+value.substring(0,5);
                            }else{
                                return "当天"+value.substring(0,5)
                            }
                        }
                    },
                    {
                        field : 'deliveryStopTime',
                        title : '完成配送时间',
                        formatter : function(value, row, index) {
                            if(row.deliveryStopTimeDay != 0){
                                return row.deliveryStopTimeDay+"天后"+value.substring(0,5);
                            }else{
                                return "当天"+value.substring(0,5);
                            }
                        }
                    },
                    {
                        field : 'remark',
                        title : '描述'
                    },
                    {
                        field : 'createTime',
                        title : '创建时间'
                        // ,
                        // formatter : function(value, row, index) {
                        //     return waveManage.format(value, "yyyy-MM-dd HH:mm:ss");
                        // }
                    },
                    {
                        field : 'createName',
                        title : '创建人'
                    },
                    {
                        title : '操作',
                        formatter : function(value, row, index) {

                            var html ='<button type="button" class="btn btn-primary btn-sm edit_wave" href="javascript:void(0)">编辑</button>';
                                html += '<button type="button"" class="btn btn-danger btn-sm delete_wave" href="javascript:void(0)">删除</button>';
                            return html;
                        },
                        events : 'operateEvents'

                    }

                ]

            });
    },
    format : function(time, format) {
        if (time != null && time != '') {
            var t = new Date(time);
            var tf = function(i) {
                return (i < 10 ? '0' : '') + i
            };
            return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
                ;
            }));
        }
        return null;
    },
    /** 删：删除* */
    wavedelete : function(id) {
        $.dialogConfirm({
            message : '您确定要删除波次ID为[' + id + ']的波次吗?',
            callback : function(result) {
                if (result) {
                    $.callAjax({
                        type : "post",
                        url : waveManage.URL.deleteUrl(),
                        data : {"id":id},

                        success : function(data) {
                            if (data.code != "0000") {
                                $.toastrWarning(data.msg);
                                $('#waveTable').bootstrapTable(
                                    'refresh');
                                return;
                            }
                            $('#waveTable').bootstrapTable(
                                'refresh');
                            $.toastrSuccess(data.msg);
                        },
                        error : function() {
                            $.toastrError();
                        }
                    });
                }
            }
        });

    },
    // 表单检验
    validateform : function() {
        // 表单验证start
        $('#addWaveForm').bootstrapValidator({
            message : 'This value is not valid',
            // feedbackIcons : {
            //     valid : 'glyphicon glyphicon-ok',
            //     invalid : 'glyphicon glyphicon-remove',
            //     validating : 'glyphicon glyphicon-refresh'
            // },
            fields : {
                startTime : {
                    validators : {
                        callback: {
                            message: '开始时间不能为空！',
                            callback: function(value, validator) {
                                var val = $("#startTime").val();
                                if($.isNull(val)){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    }
                },
                stopTime : {
                    validators : {
                        callback: {
                            message: '结束时间不能为空！',
                            callback: function(value, validator) {
                                var val = $("#stopTime").val();
                                if($.isNull(val)){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    }
                },
                deliveryStartTimeDay : {
                    validators : {
                        notEmpty : {
                            message : '配送开始天数不能为空！'
                        },
                        integer: {
                            message: '请输入0~999之间的整数'
                        },
                        between: {
                            min: 0,
                            max: 99,
                            message: '请输入0~999之间的整数'
                        }
                    }
                },
                deliveryStopTimeDay : {
                    validators : {
                        notEmpty : {
                            message : '配送结束天数不能为空！'
                        },
                        integer: {
                            message: '请输入0~99之间的整数'
                        },
                        between: {
                            min: 0,
                            max: 99,
                            message: '请输入0~99之间的整数'
                        }
                    }
                },
                deliveryStartTime : {
                    validators : {
                        callback: {
                            message: '配送开始时间不能为空！',
                            callback: function(value, validator) {
                                var val = $("#deliveryStartTime").val();
                                if($.isNull(val)){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    }
                },
                deliveryStopTime : {
                    validators : {
                        callback: {
                            message: '配送结束时间不能为空！',
                            callback: function(value, validator) {
                                var val = $("#deliveryStopTime").val();
                                if($.isNull(val)){
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        });
        // 表单验证end
    },
    // 编辑波次
    editWave : function(id) {
        $("#myModalLabel03").html("编辑波次");
        $.callAjax({
            type : "post",
            url : waveManage.URL.queryUrl(),
            data : {"id":id},
            success : function(data) {
                if (data.code != "0000") {
                    $.toastrWarning("查询出错！");
                }
                $("#waveId").val(data.data.id);
                var str = data.data.startTime.substring(0,5);
                var stp = data.data.stopTime.substring(0,5);
                var deliveryStartTime = data.data.deliveryStartTime.substring(0,5);
                var deliveryStopTime = data.data.deliveryStopTime.substring(0,5);

                var deliveryStartTimeDay = data.data.deliveryStartTimeDay;
                var deliveryStopTimeDay = data.data.deliveryStopTimeDay;

                $("#deliveryStartTimeDay").val( deliveryStartTimeDay);
                $("#deliveryStopTimeDay").val( deliveryStopTimeDay);

                $("#startTime").val( str);

                $("#stopTime").val(stp, "HH:mm:");

                $("#deliveryStartTime").val( deliveryStartTime);

                $("#deliveryStopTime").val(deliveryStopTime, "HH:mm:");
                $("#remark").val(data.data.remark);
                $.showModal('#addWave');
                return;
            },
            error : function() {
                $.toastrError();
            }
        });

    },
    //数据重置 关闭蒙态框 或 提交后隐藏蒙态框时调用
    waveReset:function(){
        //重置表单校验
        $("#addWaveForm").data('bootstrapValidator').destroy();
        $('#addWaveForm').data('bootstrapValidator', null);
        //初始化表单验证
        waveManage.validateform();
        //重置表单数据
        $("#waveId").val("");
        $("#startTime").val("");
        $("#stopTime").val("");
        $("#remark").val("");
        $("#deliveryStartTimeDay").val("");
        $("#deliveryStopTimeDay").val("");
        $("#deliveryStartTime").val("");
        $("#deliveryStopTime").val("");

    },
    //启用或禁用运营商波次管理
    enableOrDisableOperatorWave:function(enabled){
        //当前激活的运营商ID
        // var operatorId = $("#operator").val();
        // var enabled = $('#operator_wave').val();

        // false 禁用状态--点击后将发起禁用请求 true 启用状态--点击后将发起启用请求
        if(enabled === "true"){
            var url = waveManage.URL.disableUrl();
        }else {
            var url = waveManage.URL.enableUrl();
        }

        $.callAjax({
            type : "post",
            url : url,
            async: false,
            data : {},
            success : function(data) {
                if(data.code == '0000'){
                    $.toastrSuccess('操作成功！');
                } else {
                    $.toastrWarning(data.msg);
                }
            },
            error : function() {
                $.toastrError();
            }
        });
        waveManage.queryOperatorWaveStatus();

    },
    //查询运营商目前的波次管理启用状态
    queryOperatorWaveStatus:function(){

        $.callAjax({
            type : "post",
            url : waveManage.URL.queryOperatorWaveUrl(),
            async: false,
            data : {},
            success : function(data) {
                if(data.code == '0000'){
                    var operatorWave = data.data;
                    if($.isNull(operatorWave)){
                        return;
                    }
                    var waveEnabled = operatorWave.waveEnabled;

                    if(waveEnabled){
                        //1.勾选单选框
                        // $('#operator_wave').attr("checked",true);
                        //2.禁用新增/修改按钮
                        waveManage.disableButton(true);
                    }else{
                        // $('#operator_wave').removeAttr("checked");
                        //启用新增/修改按钮
                        waveManage.disableButton(false);
                    }
                    $('#operator_wave').val(waveEnabled);

                } else {
                    $.toastrError(data.msg);
                }
            },
            error : function() {
                $.toastrError();
            }
        });

    },
    //检查是否允许新增修改操作
    checkOperation:function(){

        waveManage.queryOperatorWaveStatus();
        var enabled = $('#operator_wave').val();
        if(enabled === 'true'){
            $.toastrWarning("当前波次管理已启用，若要进行新增/修改操作，请先禁用波次管理。")
            return false;
        }else {
            return true;
        }

    },
    //失效表单里面的控件
    disableButton : function (isDisabled) {
        if(isDisabled){//启用
            //禁用启用按钮，激活禁用按钮
            $("#btn_enable").attr("disabled",true).attr("class","btn btn-flat btn-sm operator_wave");
            $("#btn_disable").attr("disabled",false).attr("class","btn btn-default  btn-sm operator_wave");
            $("#btn_add_wave").attr("disabled",isDisabled).attr("class","btn btn-flat btn-sm");
            $(".delete_wave").attr("disabled",isDisabled).attr("class","btn btn-flat btn-sm delete_wave");
            $(".edit_wave").attr("disabled",isDisabled).attr("class","btn btn-flat btn-sm edit_wave");
        }else{//禁用
            //激活启用按钮，禁用禁用按钮
            $("#btn_enable").attr("disabled",false).attr("class","btn btn-default  btn-sm operator_wave");
            $("#btn_disable").attr("disabled",true).attr("class","btn btn-flat btn-sm operator_wave");
            //还原样式
            $("#btn_add_wave").attr("disabled",isDisabled).attr("class","btn btn-default btn-sm");
            $(".delete_wave").attr("disabled",isDisabled).attr("class","btn btn-danger btn-sm delete_wave");
            $(".edit_wave").attr("disabled",isDisabled).attr("class","btn btn-primary btn-sm edit_wave");

        }

    },
    bindEvent : function() {
        //添加修改波次弹出框隐藏时，清空校验并重置表单
        $('#addWave').on('hidden.bs.modal', function () {
            waveManage.waveReset();
        });
        //添加修改波次弹出框展现时
        $('#addWave').on('show.bs.modal', function () {

        });

        // $(".glyphicon-remove").off().on('click',function () {
        //     $(this).parent().off();
        //     $(this).parent().prev().prev().val("");
        //     var field = $(this).parent().parent().find(":input").attr("id");
        //     $("#addWaveForm").data('bootstrapValidator')
        //         .updateStatus(field, 'NOT_VALIDATED',null)
        //         .validateField(field);
        // });
        $(".glyphicon-remove").parent().off().on('click',function () {
            $(this).prev().prev().val("");
            var field = $(this).parent().find(":input").attr("id");
            $("#addWaveForm").data('bootstrapValidator')
                .updateStatus(field, 'NOT_VALIDATED',null)
                .validateField(field);
        });
        // 绑定条件查询按钮事件
        $("#btn_wave_search").on("click", function() {
            waveManage.isResetOffset = 1;
            $('#waveTable').bootstrapTable('refresh');
        });
        // 绑定清空查询条件
        $("#btn_wave_clear").click(function() {
            $.clearForm("WaveSearchForm");
        });
        //绑定键盘事件
        $(document).keydown(function (event) {
            if(event.keyCode==13){
                waveManage.isResetOffset = 1;
                $('#waveTable').bootstrapTable('refresh');
            }
        });
        $("#btn_add_wave").click(function() {
            var checkOperation = waveManage.checkOperation();
            if(!checkOperation){
                return;
            }
            $("#myModalLabel03").html("新增波次");
            $.showModal('#addWave');
        });
        $(".operator_wave").click(function() {
            // var enabled = $('#operator_wave').val();
            var enabled = $(this).val();
            var operatorStr = enabled === 'true'?"禁用":"启用";
            $.dialogConfirm({
                message : '您确定要'+operatorStr+'波次管理吗?',
                callback : function(result) {

                    if (result) {
                        waveManage.enableOrDisableOperatorWave(enabled);
                    }else{
                        // if(enabled === 'true'){
                        //     $('#operator_wave').attr("checked",true);
                        // }else{
                        //     $('#operator_wave').removeAttr("checked");
                        // }
                    }
                }
            });


        });

        $("#saveWave").click(function() {
            var deliveryStartTimeDay = $('#deliveryStartTimeDay').val();
            var deliveryStopTimeDay = $('#deliveryStopTimeDay').val();
            var deliveryStartTime = $('#deliveryStartTime').val();
            var deliveryStopTime = $('#deliveryStopTime').val();
            var id = $("#waveId").val();
            var startTime = $('#startTime').val();
            var stopTime = $('#stopTime').val();
            var remark = $('#remark').val();

            //重置表单校验
            $("#addWaveForm").data('bootstrapValidator').destroy();
            $('#addWaveForm').data('bootstrapValidator', null);
            //初始化表单验证
            waveManage.validateform();
            $("#addWaveForm").data('bootstrapValidator').validate();
            var valid = $("#addWaveForm").data('bootstrapValidator').isValid();
            if(!valid){
                return;
            }

            var params = {
                'id' : id,
                'startTime' : startTime,
                'stopTime' : stopTime,
                'deliveryStartTime' : deliveryStartTime,
                'deliveryStopTime' : deliveryStopTime,
                'deliveryStartTimeDay' : deliveryStartTimeDay,
                'deliveryStopTimeDay' : deliveryStopTimeDay,
                'remark' : remark,
            }
            if($('#startTime').val()==$('#stopTime').val()){
                $.toastrWarning("开始和结束时间不能一样!");
                return;
            }
            if($.isNull(id)){
                var url = waveManage.URL.saveUrl();
            }else{
                var url = waveManage.URL.updateUrl();
            }
            $.callAjax({
                type : "post",
                url : url,
                data : params,
                success : function(data) {
                    if (data.code != "0000") {
                        $.toastrWarning(data.msg);
                        return;
                    }
                    $.toastrSuccess(data.msg);
                    $.hideModal('#addWave');
                    $('#waveTable').bootstrapTable('refresh');
                },
                error : function() {
                    $.toastrError();
                }
            });

        });
    },
    // 初始化分页查询列表数据 ★★★分页主体列表★★★
    init : function() {
        $("#addWave .form_datetime").datetimepicker({
            format: "hh:ii",
            autoclose: true,
            clearBtn:true,// 自定义属性,true 显示 清空按钮 false 隐藏 默认:true
            todayBtn: true,
            startView: 1,
            forceParse:false,
            pickerPosition: "bottom-left"
        }).on('hide',function(e) {
            var field = $(this).find(":input").attr("id");
            $("#addWaveForm").data('bootstrapValidator')
                .updateStatus(field, 'NOT_VALIDATED',null)
                .validateField(field);
        });
        waveManage.queryOperatorWaveStatus();
        waveManage.validateform();//初始化表单校验
        waveManage.searchListByPage();
    }
}
// 得到查询的参数 ★★★分页表单查询参数★★★
var queryParams = function(params) {

    var wp = $("#wavePicking").val();

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        id:wp,
        so:{
            pageSize: params.limit,   //页面大小
            offset: waveManage.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
            sort: params.sort.replace(/([A-Z])/g,"_$1").toLowerCase(),//驼峰转下划线,
            order: params.order
        }
    };
    temp = JSON.stringify(temp);
    return temp;
};

// 预埋分页列表中的window事件 ★★★分页列表里的按钮事件★★★
window.operateEvents = {
    // 删除波次
    'click .delete_wave' : function(e, value, row, index) {
        waveManage.wavedelete(row.id);
    },
    // 编辑
    'click .edit_wave' : function(e, value, row, index) {
        var checkOperation = waveManage.checkOperation();
        if(!checkOperation){
            return;
        }
        waveManage.editWave(row.id);
    }
};

$(document).ready(function() {
    // 1、初始化加载列表数据
    waveManage.init();
    // 2、初始化绑定增删改查事件
    waveManage.bindEvent();
});
// 存放每个功能模块业务逻辑JS
// javascript 模块化
var deliveryorderManager = {
    //是否重置分页偏移值0：否，1：是
    isResetOffset: 0,
    //封装异步请求的所有ajax的URL地址
    URL: {
        //跳转列表页
        initUrl: function () {
            return '';
        },
        //确认出库订单
        changeCarStatusUrl: function () {
            return '/wms/deliveryorder/stateQr';
        },
        //分页获取出口单列表请求地址
        searchListByPageUrl: function () {
            return '/wms/deliveryorder/list';
        },
        //分配事件请求地址
        deliveryorderFpUrl: function () {
            return '/wms/deliveryorder/deliveryorderFp'
        },
        //确认出库订单出库
        deliveryorderOutQr: function () {
            return '/wms/deliveryorder/deliveryorderOutQr'
        },
        //生成拣货单
        deliveryorderPick: function () {
            return '/wms/deliveryorder/deliveryorderPick'
        },
        //批量导出出库订单
        deliveryorderListExport: function () {
            return '/wms/deliveryorder/deliveryorderListExport'
        },
        //复核确认
        checkReviewUrl: function () {
            return '/wms/deliveryorder/checkReview'
        },
        //打上异常标记
        offAbnormalFlagUrl: function () {
            return '/wms/deliveryorder/offAbnormalFlag'
        },
        //取消分配
        cancelAllocationUrl: function () {
            return '/wms/deliveryorder/cancelAllocation'
        },
        //补打面单
        printExpressUrl:function () {
            return '/wms/pick/print/express'
        }

    },
    /**分页获取出库订单列表**/
    searchListByPage: function () {
        //分页组件
        $.pageTable({
            tableId: "#deliveryorderListTable",//需要分页的table ID
            url: deliveryorderManager.URL.searchListByPageUrl(),//请求后台的URL（*）
            queryParams: queryParams,
            onLoadSuccess: function () {
                deliveryorderManager.isResetOffset = 0;
                $("#btn_delivery_search").removeClass("disabled");
            },
            onLoadError: function (status) {
                $("#btn_delivery_search").removeClass("disabled");
            },
            sortable: true,
            sortName: 'created',
            sortOrder: 'desc',
            columns: [/*{
             field: 'id',
             title: 'ID'
             }*/
                {
                    checkbox: true
                },
                {
                    field: 'outOrderNo',
                    title: '出库单号',
                    formatter:function(value,row,index){
                        return "<a  href='#' onclick=\"deliveryorderManager.sys("+row.state+","+index+",'"+row.outOrderNo+"','"+row.id+"')\">"+row.outOrderNo+"</a>";
                    },
                }, {
                    field: 'saleOrderNo',
                    title: '来源订单号'
                }, /*{
                    field: 'platDealNo',
                    title: '平台交易单号'
                }, {
                    field: 'orderType',
                    title: '订单类型',
                    formatter: function (value, row, index) {
                        if (value == 10) {
                            return '销售订单'
                        }
                        if(value == 20) {
                            return '退货订单'
                        }
                        if(value == 30) {
                            return '换货订单'
                        }
                    }
                },*/ {
                    field: 'state',
                    title: '状态',
                    formatter: function (value, row, index) {
                        if (value == 10) {
                            return '新建'
                        }
                        if (value == 20) {
                            return '已确认'
                        }
                        if (value == 40) {
                            return '已分配'
                        }
                        if (value == 60) {
                            return '拣货中'
                        }
                        if (value == 50) {
                            return '已生成拣货单'
                        }
                        if (value == 70) {
                            return '拣货完成'
                        }
                        if (value == 80) {
                            return '复核完成'
                        }
                        if (value == 90) {
                            return '打包完成'
                        }
                        if (value == 98) {
                            return '已取消'
                        }
                        if (value == 99) {
                            return '已出库'
                        }
                    }
                }, /*{
                    field: 'orderTime',
                    title: '下单时间',
                    align: 'center',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }, {
                    field: 'payTime',
                    title: '支付时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                },*/ {
                    field: 'dateSend',
                    title: '定时派送',
                    formatter: function (value, row, index) {
                        if (value == true) {
                            return '是'
                        } else {
                            return '否'
                        }
                    }

                }, {
                    field: 'requireDate',
                    title: '要求送货时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                },
                {
                    field: 'buyerRemark',
                    title: '买家留言'
                },
                /* {
                    field: 'requireTime',
                    title: '要求送货时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "HH:mm:ss");
                    }
                }, {
                    field: 'orderPriority',
                    title: '订单优先级'
                },{
                    field: 'sellerRemark',
                    title: '卖家留言'
                }, {
                    field: 'receiverCompany',
                    title: '收件方公司'
                }, {
                    field: 'receiverName',
                    title: '收件方姓名'
                }, {
                    field: 'receiverPhone',
                    title: '收件方手机'
                },{
                 field: 'receiverCountry',
                 title: '收件方国家'
                 }, {
                 field: 'receiverProvice',
                 title: '收件方省份'
                 }, {
                 field: 'receiverCity',
                 title: '收件方城市'
                 }, {
                 field: 'receiverArea',
                 title: '收件方区/县'
                 }, {
                 field: 'receiverStreet',
                 title: '收件方街道'
                 }, */{
                    field: 'receiverAddress',
                    title: '收件方信息',
                    formatter: function (value, row, index) {
                      return  row.receiverName+'</br>'+ row.receiverPhone+'</br>'+value
                    }
    }, /*{
                    field: 'totalPrice',
                    title: '订单总金额'
                }, {
                    field: 'couponsPrice',
                    title: '优惠券抵扣金额'
                }, {
                    field: 'cardPrice',
                    title: '卡券抵扣金额'
                }, {
                    field: 'integralPrice',
                    title: '积分抵扣金额'
                }, {
                    field: 'balancePay',
                    title: '余额支付金额'
                }, {
                    field: 'otherPrice',
                    title: '其他金额'
                }, {
                    field: 'freight',
                    title: '运费'
                }, {
                    field: 'actualPrice',
                    title: '实际支付金额'
                }, {
                    field: 'sourceOrder',
                    title: '订单来源',
                    formatter: function (value, row, index) {
                        if (value == "1") {
                            return '线上商城'
                        }
                        if (value == "3") {
                            return '线下门店'
                        }
                        if (value == "2") {
                            return 'B2B渠道'
                        }
                    }
                }, {
                    field: 'platDeal',
                    title: '交易平台',
                    formatter: function (value, row, index) {
                        if (value == "1") {
                            return '乐摇网'
                        }
                        if (value == "2") {
                            return '乐摇网微信商城'
                        }
                        if (value == "3") {
                            return '淘宝'
                        }
                        if (value == "4") {
                            return '美团外卖'
                        }
                        if (value == "5") {
                            return '百度外卖'
                        }
                    }
                }, {
                    field: 'delivery',
                    title: '配送方式',
                    formatter: function (value, row, index) {
                        if (value == "1") {
                            return '自营配送'
                        }
                        if (value == "2") {
                            return '第三方物流'
                        }
                    }
                }, {
                    field: 'express',
                    title: '承运商'
                }, {
                    field: 'expressSer',
                    title: '承运商服务'
                }, {
                    field: 'lineCode',
                    title: '线路编号'
                },*/ {
                    field: 'deliverNo',
                    title: '运单号'
                }, {
                    field: 'pickingNo',
                    title: '拣货单号'
                }, /*{
                    field: 'review',
                    title: '复核方式',
                    formatter: function (value, row, index) {
                        if (value == "10") {
                            return '扫描条码'
                        }
                        if (value == "20") {
                            return '肉眼识别'
                        }
                    }
                }, {
                    field: 'pringFlag',
                    title: '面单打印标记',
                    formatter: function (value, row, index) {
                        if (value == "0") {
                            return '未打印'
                        }
                        if (value == "1") {
                            return '已打印'
                        }
                    }
                }, {
                    field: 'cancelFlag',
                    title: '取消标记',
                    formatter: function (value, row, index) {
                        if (value == "10") {
                            return '正常'
                        }
                        if (value == "20") {
                            return '取消'
                        }
                    }
                }, {
                    field: 'abnormalFlag',
                    title: '异常标记',
                    formatter: function (value, row, index) {
                        if (value == "10") {
                            return '正常'
                        }
                        if (value == "20") {
                            return '异常'
                        }
                    }
                }, {
                    field: 'singleFlag',
                    title: '单品标记'
                }, {
                    field: 'invoiceFlag',
                    title: '发票标记',
                    formatter: function (value, row, index) {
                        if (value == "0") {
                            return '未标记'
                        }
                        if (value == "1") {
                            return '已标记'
                        }
                    }
                }, {
                    field: 'invoiceType',
                    title: '发票类型',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return '个人'
                        }
                        if (value == 2) {
                            return '公司'
                        }
                    }
                }, {
                    field: 'invoiceNo',
                    title: '发票号'
                }, {
                    field: 'invoiceRise',
                    title: '发票抬头'
                }, {
                    field: 'invoiceContent',
                    title: '发票内容'
                }, {
                    field: 'invoicePrice',
                    title: '发票金额'
                }, {
                    field: 'pageRequire',
                    title: '包装要求'
                }, {
                    field: 'deliveryRequire',
                    title: '配送要求'
                }, {
                    field: 'orderRemark',
                    title: '订单备注'
                }, {
                    field: 'operat',
                    title: '运营商'
                }, {
                    field: 'warehouseCode',
                    title: '仓库编码'
                },*/ {
                    field: 'pickingTime',
                    title: '拣货时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }, {
                    field: 'pickingName',
                    title: '拣货人'
                }, {
                    field: 'checkTime',
                    title: '复核时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }, {
                    field: 'checkName',
                    title: '复核人'
                }/*, {
                    field: 'created',
                    title: '创建时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }, {
                    field: 'creator',
                    title: '创建人'
                }, {
                    field: 'modified',
                    title: '修改时间',
                    formatter: function (value, row, index) {
                        return deliveryorderManager.format(value, "yyyy-MM-dd HH:mm:ss");
                    }
                }, {
                    field: 'modifier',
                    title: '修改人'
                }*/]


        });
    },
    //出库订单确认
    deliveryorderSate: function (ids) {
        ids = ids.substring(0, ids.length - 1)
        var params = {
            ids: ids
        }
        $.callAjax({
            type: "post",
            url: deliveryorderManager.URL.changeCarStatusUrl() + '?ids=' + ids,
            //data: params,
            success: function (data) {
                if (data.code == "0000") {
                    $.toastrSuccess(data.msg);
                    $('#deliveryorderListTable').bootstrapTable('refresh');
                    return;
                }
                $.toastrWarning(data.msg)

            },
            error: function () {
                $.toastrError();
            }
        });
    },
    //更改异常标记
    chengkIsAbnormalFlag: function (ids, flag) {
        $.callAjax({
            type: "post",
            url: deliveryorderManager.URL.offAbnormalFlagUrl() + "?ids=" + ids + "&flag=" + flag,
            success: function (data) {
                var code = data.code;
                if (code == "0000") {
                    $.toastrSuccess(data.msg);
                    $('#deliveryorderListTable').bootstrapTable('refresh');
                    return;
                }
                //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                $.toastrWarning(data.msg);
            },
            error: function () {
                $.toastrError();
            }
        })
    },

    format: function (time, format) {
        if (time != null && time != '') {
            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
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
    sys:function (state,index,outOrderNo,id) {
        $('#deliveryorderListTable').bootstrapTable("uncheckAll",index)
        //把需要的数据放入隐藏输入框
        $("#deliveryorderId").attr("value", id);
        $("#deliveryorderOutOrderNo").attr("value", outOrderNo);
        $("#deliveryorderState").attr("value", state);
        $.showModal("#deliveryorderAssignRepertoryModal");
        $("#deliveryorderAssignRepertoryDiv").find("li").each(function () {
            $(this).removeClass("active");
        });
        $("#deliveryorderAssignRepertoryDiv").find("li").first().addClass("active");
        var initUrl = $("#deliveryorderAssignRepertoryDiv").find("li a").attr("data-href");
        var contextPath = $("#contextPath").val();
        $("#centerDiv").load(contextPath + initUrl);
    },
    bindEvent: function () {
        //时间控件X事件
        $(".glyphicon-remove").off().on('click', function () {
            $(this).parent().off();
            $(this).parent().prev().prev().val("");
        });
        $(".my_btn").click(function () {
            if ($('.data_input').css("display") == "none") {
                $('.data_input').css("display", "block");
            } else (
                $('.data_input').css("display", "none")
            );
        });
        //load页面切换事件
        $("#deliveryorderAssignRepertoryDiv ul li").find("a").click(function () {
            var contextPath = $("#contextPath").val();
            var url = $(this).attr("data-href");
            $("#centerDiv").load(contextPath + url);
        });
        //绑定键盘事件
        $(document).keydown(function (event) {
            if(event.keyCode==13){
                $("#btn_delivery_search").addClass("disabled");
                deliveryorderManager.isResetOffset = 1;
                $('#deliveryorderListTable').bootstrapTable('refresh');
            }
        });
        //绑定条件查询按钮事件
        $("#btn_delivery_search").on("click", function () {
            $("#btn_delivery_search").addClass("disabled");
            deliveryorderManager.isResetOffset = 1;
            $('#deliveryorderListTable').bootstrapTable('refresh');
        });
        //绑定清空查询条件
        $("#btn_delivery_clear").click(function () {
            $.clearForm("deliveryorderSearchForm");
            $("#searchType").val(1);
        });
        //绑定复核确认
        $("#checkReview").click(function () {
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            var outOrderNos = $.getIdSelections("#deliveryorderListTable", "outOrderNo");
            var state = $.getIdSelections("#deliveryorderListTable", "state");
            if ($("#deliveryorderListTable").bootstrapTable('getSelections').length != 0) {
                for (var i = 0; i < state.length; i++) {
                    if (state[i] != 70) {
                        $.toastrWarning("只有拣货完成状态的出库单才允许复核确认!请查看你选的数据!");
                        return false;
                    }
                }
                $.dialogConfirm({
                    message: '您确定要复核出库订单吗?',
                    callback: function (result) {
                        if (result) {
                            $.callAjax({
                                type: "post",
                                url: deliveryorderManager.URL.checkReviewUrl() + '?ids=' + ids + "&outOrderNo=" + outOrderNos,
                                //data: params,
                                success: function (data) {
                                    if (data.code == "0000") {
                                        $.toastrSuccess(data.msg);
                                        $('#deliveryorderListTable').bootstrapTable('refresh');
                                        return;
                                    }
                                    $.toastrWarning(data.msg);
                                },
                                error: function () {
                                    $.toastrError();
                                }
                            });
                        }
                    }
                })
            } else {
                $.toastrWarning("请选择数据进行操作！");
            }
        });
        //确认出库订单
        $("#deliveryorderQr").click(function () {
            var ids = "";
            if ($("#deliveryorderListTable").bootstrapTable('getSelections').length != 0) {
                $.dialogConfirm({
                    message: '您确定要确认出库订单吗?',
                    callback: function (result) {
                        if (result) {
                            $.map($("#deliveryorderListTable").bootstrapTable('getSelections'), function (row) {
                                ids += row.id + ",";
                            });
                            deliveryorderManager.deliveryorderSate(ids)
                        }
                    }
                })
            } else {
                $.toastrWarning("请选择数据进行操作！");
            }
        });
        //弹出生成拣货策略Model
        $("#deliveryorderAndPick").click(function () {
            var id = $.getIdSelections("#deliveryorderListTable", "id");
            var state = $.getIdSelections("#deliveryorderListTable", "state");
            if (id == null || id == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            for (var i = 0; i < state.length; i++) {
                if (state[i] != 40) {
                    $.toastrWarning('只有已经分配完成的订单才能生成拣货单！');
                    return false;
                }
            }
            $.showModal('#MydeliveryorderAndPick');
        })
        //指定出库批次
        $("#deliveryorderAssignRepertory").click(function () {
            var id = $.getIdSelections("#deliveryorderListTable", "id");
            var outOrderNo = $.getIdSelections("#deliveryorderListTable", "outOrderNo");
            var state = $.getIdSelections("#deliveryorderListTable", "state");
            if (id == null || id == '') {
                    $.toastrWarning('请先选择记录再操作！');
                    return false;

            }
            if (id.length > 1) {
                $.toastrWarning('请先选择一条记录再操作！');
                return false;
            }
            //把需要的数据放入隐藏输入框
            $("#deliveryorderId").attr("value", id);
            $("#deliveryorderOutOrderNo").attr("value", outOrderNo);
            $("#deliveryorderState").attr("value", state);
            $.showModal("#deliveryorderAssignRepertoryModal");
            $("#deliveryorderAssignRepertoryDiv").find("li").each(function () {
                $(this).removeClass("active");
            });
            $("#deliveryorderAssignRepertoryDiv").find("li").first().addClass("active");
            var initUrl = $("#deliveryorderAssignRepertoryDiv").find("li a").attr("data-href");
            var contextPath = $("#contextPath").val();
            $("#centerDiv").load(contextPath + initUrl);

        })

        //生成拣货单确定按钮事件
        $("#MydeliveryorderAndPickQd").click(function () {
            var pick = $('#pick_div input:radio:checked').val();
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            $.callAjax({
                type: "post",
                url: deliveryorderManager.URL.deliveryorderPick() + "?pick=" + pick + "&ids=" + ids,
                success: function (data) {
                    var code = data.code;
                    if (code == "0000") {
                        $('#deliveryorderListTable').bootstrapTable('refresh');
                        $.toastrSuccess(data.msg);
                        $.hideModal("#MydeliveryorderAndPick");
                    } else {
                        //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                        $.toastrWarning(data.msg);
                        $.hideModal("#MydeliveryorderAndPick");
                    }
                },
                error: function () {
                    $.toastrError();
                }
            });
        })
        //分配按钮事件
        $('#deliveryorderFp').click(function () {
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            var state = $.getIdSelections("#deliveryorderListTable", "state");
            if (ids == null || ids == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            if (ids.length > 1) {
                $.toastrWarning('请先选择一条记录再操作！');
                return false;
            }
            for(var i =0;i<state.length;i++){
                if(state[i]!=20){
                    $.toastrWarning('只有已确认的出库订单才能分配!请选择正确的数据操作！');
                    return;
                }
            }
            $.dialogConfirm({
                message: '您确定要分配出库订单吗?',
                callback: function (result) {
                    if (result) {
                        $.callAjax({
                            type: "post",
                            url: deliveryorderManager.URL.deliveryorderFpUrl() + "?ids=" + ids,
                            success: function (data) {
                                var code = data.code;
                                if (code == "0000") {
                                    $.toastrSuccess(data.msg);
                                    $('#deliveryorderListTable').bootstrapTable('refresh');
                                    return;
                                }
                                //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                                $.toastrWarning(data.msg);
                            },
                            error: function () {
                                $.toastrError();
                            }
                        });
                    }
                }
            });

        })
        //出库确认
        $("#deliveryorderOutQr").click(function () {
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            var outOrderNos = $.getIdSelections("#deliveryorderListTable", "outOrderNo");
            var state = $.getIdSelections("#deliveryorderListTable", "state");
            var abnormalFlag = $.getIdSelections("#deliveryorderListTable", "abnormalFlag");
            if (ids == null || ids == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            for (var i = 0; i < state.length; i++) {
                if (state[i] != 80 && state[i] != 90) {
                    $.toastrWarning("只有复核完成或者打包完成的出库单才允许出库确认请查看你选的数据!");
                    return false;
                }
                if(abnormalFlag[i] !=10){
                    $.toastrWarning("异常的出库单不能出库请查看你选的数据!");
                    return false;
                }
            }
            $.dialogConfirm({
                message: '您确定要订单出库吗?',
                callback: function (result) {
                    if (result) {
                        $.callAjax({
                            type: "post",
                            url: deliveryorderManager.URL.deliveryorderOutQr() + "?ids=" + ids + "&outOrderNos=" + outOrderNos,
                            success: function (data) {
                                var code = data.code;
                                if (code == "0000") {
                                    $.toastrSuccess(data.msg);
                                    $('#deliveryorderListTable').bootstrapTable('refresh');
                                } else {
                                    //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                                    $.toastrWarning(data.msg);
                                }
                            },
                            error: function () {
                                $.toastrError();
                            }
                        });
                    }
                }
            })
        })
        //批量导出
        $("#btn_deliveryorderList_export").click(function () {
            var contextPath = $("#contextPath").val();
            $("#deliveryorderSearchForm").attr('action', contextPath + deliveryorderManager.URL.deliveryorderListExport());
            $("#deliveryorderSearchForm").submit();
        })
        //打上或者取消异常标记
        $("#offAbnormalFlag").click(function () {
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            if (ids == null || ids == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            $.dialogConfirm({
                message: '您确定要给订单标记异常吗?',
                callback: function (result) {
                    if (result) {
                        var flag = "20"
                        deliveryorderManager.chengkIsAbnormalFlag(ids, flag)
                    }
                }
            })
        })
        $("#noAbnormalFlag").click(function () {
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            if (ids == null || ids == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            $.dialogConfirm({
                message: '您确定要取消订单标记异常吗?',
                callback: function (result) {
                    if (result) {
                        var flag = "10"
                        deliveryorderManager.chengkIsAbnormalFlag(ids, flag)
                    }
                }
            })
        })
        //取消分配
        $("#cancelAllocation").click(function () {
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            var outOrderNos = $.getIdSelections("#deliveryorderListTable", "outOrderNo");
            if (ids == null || ids == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            if (ids.length > 1) {
                $.toastrWarning('请先选择一条记录再操作！');
                return false;
            }
            $.dialogConfirm({
                message: '您确定要取消订单分配吗?',
                callback: function (result) {
                    if (result) {
                        $.callAjax({
                            type: "post",
                            url: deliveryorderManager.URL.cancelAllocationUrl() + "?ids=" + ids + "&outOrderNos=" + outOrderNos,
                            success: function (data) {
                                var code = data.code;
                                if (code == "002") {
                                    $.toastrSuccess(data.msg);
                                    $('#deliveryorderListTable').bootstrapTable('refresh');
                                } else {
                                    //对应不同业务填写不同参数： success 成功,绿色;info 信息,蓝色; warning 警告,橙色;error 错误,深红色;
                                    $.toastrWarning(data.msg);
                                }
                            },
                            error: function () {
                                $.toastrError();
                            }
                        })
                    }
                }
            })
        })
        //补打面单
        $("#btnout_express_print").click(function () {
            var ids = $.getIdSelections("#deliveryorderListTable", "id");
            if (ids == null || ids == '') {
                $.toastrWarning('请先选择记录再操作！');
                return false;
            }
            var flag ="1"
            // 触发Ajax
            var params = "?pickCode=" + ids+"&flag="+flag;
            var contextPath = $("#contextPath").val();
            // 请求打印
            window.open(contextPath + deliveryorderManager.URL.printExpressUrl()
                + params);
            setTimeout($('#deliveryorderListTable').bootstrapTable('refresh'),1000)

        })
    },//初始化分页查询列表数据 ★★★分页主体列表★★★

    init: function () {
        dateUtils.initDate();
        deliveryorderManager.searchListByPage();
    }
}

//得到查询的参数              ★★★分页表单查询参数★★★
var queryParams = function (params) {
    //自定义查询参数
    var searchType = $("#searchType").val();
    var searchKeyword = $("#searchKeyword").val();
    if(searchType==1){
        var outOrderNo =searchKeyword;
    }
    if(searchType==2){
        var saleOrderNo=searchKeyword;
    }
    if(searchType==3){
        var pickingNo = searchKeyword;
    }
    if(searchType==4){
        var deliverNo = searchKeyword;
    }
    if(searchType==5){
        var receiverName = searchKeyword;
    }
    if(searchType==6){
        var receiverPhone = searchKeyword;
    }
    if(searchType==7){
        var receiverAddress =searchKeyword;
    }
    //var saleOrderNo = $("#saleOrderNo").val();
    //var outOrderNo = $("#outOrderNo").val();
    var orderType = $("#orderType").val();
    var state = $("#state").val();
    var platDealNo = $("#platDealNo").val();
    //var receiverName = $("#receiverName").val();
    var orderPriority = $("#orderPriority").val();
    var platDeal = $("#platDeal").val();
    var buyerRemark = $("#buyerRemark").val();
    var sellerRemark = $("#sellerRemark").val();
    var lineCode = $("#lineCode").val();
    var sourceOrder = $("#sourceOrder").val();
    var express = $("#express").val();
    var pringFlag = $("#pringFlag").val();
    var abnormalFlag = $("#abnormalFlag").val();
    var cancelFlag = $("#cancelFlag").val();
    var invoiceFlag = $("#invoiceFlag").val();
    //var pickingNo = $("#pickingNo").val();
   // var deliverNo = $("#deliverNo").val();
    var orderTime = $("#orderTime").val();
    var orderTime2 = $("#orderTime2").val();
    var payTime = $("#payTime").val();
    var payTime2 = $("#payTime2").val();
    //时间区间
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.limit,   //页面大小
        offset: deliveryorderManager.isResetOffset == 1 ? 0 : params.offset,  //分页偏移值
        saleOrderNo: saleOrderNo,//销售订单号
        outOrderNo: outOrderNo,//出库订单号
        orderType: orderType,//订单类型
        state: state,// 订单状态
        platDealNo: platDealNo, //平台交易单号
        receiverName: receiverName, //收件方姓名
        receiverPhone:receiverPhone, //收件方手机
        receiverAddress:receiverAddress,//收件方地址
        orderPriority: parseInt(orderPriority), //订单优先级
        sourceOrder: sourceOrder, //订单来源
        platDeal: platDeal, //交易平台
        express: express, //承运商
        buyerRemark: buyerRemark, //买家留言
        sellerRemark: sellerRemark, //卖家留言
        lineCode: lineCode, //线路编号
        pringFlag: pringFlag,  //
        abnormalFlag: abnormalFlag,  //异常标记
        cancelFlag: cancelFlag, //取消标记
        invoiceFlag: invoiceFlag,  //发票标记
        pickingNo: pickingNo, //拣货单号
        deliverNo: deliverNo,  //运单号
        orderTime: orderTime, //下单时间
        endOrderTime:orderTime2,//下单结束时间
        payTime: payTime, //支付时间
        endPayTime:payTime2,//支付结束时间
        sort: params.sort,
        order: params.order

    };
    return temp;
};

//预埋分页列表中的window事件  ★★★分页列表里的按钮事件★★★
window.operateEvents = {
    'click .detail_a': function (e, value, row, index) {

    }
};

$(document).ready(function () {
    //1、初始化加载列表数据
    deliveryorderManager.init();
    //2、初始化绑定增删改查事件
    deliveryorderManager.bindEvent();
});
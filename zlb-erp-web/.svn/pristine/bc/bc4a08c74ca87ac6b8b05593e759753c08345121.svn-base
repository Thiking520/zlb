package com.zhilianbao.erp.web.wms.controller.storageout;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.wms.core.api.service.IWmsDeliveryOrderService;
import com.zlb.erp.wms.core.api.vo.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/20.
 */
@Controller
@RequestMapping("wms/deliveryOrderDistribute")
public class DeliveryOrderDistributeController extends BaseController {
    protected Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Reference
    IWmsDeliveryOrderService wmsDeliveryOrderService;

    /**
     * 查询出库订单分配列表
     * @param searchVo
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderDistributeVo> list(@RequestBody WmsDeliveryOrderDistributeSearchVo searchVo) {
        LOGGER.info("分页查询出库订单分配列表数据，请求参数json：{}", searchVo);
        ResponseResult<WmsDeliveryOrderDistributeVo> wmsDeliveryOrderDistributeVoResponseResult = wmsDeliveryOrderService.queryWmsDeliveryOrderDistributeByPage(searchVo);
        return wmsDeliveryOrderDistributeVoResponseResult;
    }
    /**
     * 查询出库订单分配
     * @param
     * @return
     */
    @RequestMapping(value = "/wmsDeliveryOrderDistributeDetail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<StockBatchesDeliveryOrderVo> queryWmsDeliveryOrderDistributeDetail(String outOrderNo, String skuCode,String skuStockBatchNo) {
        LOGGER.info("分页查询出库订单分配列表数据，请求参数json：{}", outOrderNo,skuCode);
        Map<String,String> param = new HashMap<String,String>();
        String operatorId = getOperatorId() + "";
        param.put("operatorCode",operatorId);
        param.put("outOrderNo", outOrderNo);
        param.put("skuCode", skuCode);
        param.put("skuStockBatchNo",skuStockBatchNo);
        ResponseResult<StockBatchesDeliveryOrderVo> wmsDeliveryOrderDistributeVoResponseResult =wmsDeliveryOrderService.queryWmsDeliveryOrderDetail(param);
        LOGGER.info("入库分页查询数据,返回的参数json：{}", wmsDeliveryOrderDistributeVoResponseResult);
        return wmsDeliveryOrderDistributeVoResponseResult;
    }
}

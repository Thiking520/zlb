package com.zhilianbao.erp.web.wms.controller.storageout;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.ISupplierService;
import com.zlb.erp.pms.core.api.vo.*;
import com.zlb.erp.wms.core.api.service.IWmsDeliveryOrderService;
import com.zlb.erp.wms.core.api.vo.*;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by jiangfubing on 2017/4/18.
 * 出库订单明细控制层
 */
@Controller
@RequestMapping("wms/deliveryorderDetail")
public class DeliveryOrderDetailController extends BaseController {
    protected Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Reference
    IWmsDeliveryOrderService wmsDeliveryOrderService;
    @Reference
    ISupplierService supplierService;
    /**
     * 出库订单明细分页查询
     * @param searchVo
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderDetailVo> list(@RequestBody WmsDeliveryOrderDetailSearchVo searchVo) {
        LOGGER.info("分页查询出库订单数据，请求参数json：{}", searchVo);
        searchVo.setOperatCode(getOperatorId().toString());
        ResponseResult<WmsDeliveryOrderDetailVo> wmsDeliveryOrderVoResponseResult =  wmsDeliveryOrderService.queryWmsDeliveryOrderDetailByPage(searchVo);
        return  wmsDeliveryOrderVoResponseResult;
    }
    /**
     * 修改保存出库订单明细(分配库存批次)信息
     * @param
     * @return
     */
    @RequestMapping(value = "/updateDeliveryOrderDetail",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderDetailVo> updateDeliveryOrderDetail(@RequestBody WmsDeliveryOrderDetailVo wmsDeliveryOrderDetailVo) {
        //
        ResponseResult<WmsDeliveryOrderDetailVo>  wmsDeliveryOrderDetailVoResponseResult = wmsDeliveryOrderService.updateDeliveryOrderDetail(wmsDeliveryOrderDetailVo);
        return wmsDeliveryOrderDetailVoResponseResult;
    }

}

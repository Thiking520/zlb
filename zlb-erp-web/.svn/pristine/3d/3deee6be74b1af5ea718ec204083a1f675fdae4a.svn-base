package com.zhilianbao.erp.web.wms.controller.storageout;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.parameter.ISystemParamService;
import com.zhilianbao.erp.common.util.office.PoiExcelUtils;
import com.zhilianbao.erp.web.base.BaseController;
import com.zhilianbao.erp.web.wms.util.ExcelTitleMap;
import com.zhilianbao.erp.web.wms.util.ExportToExcelUtil;
import com.zlb.erp.wms.core.api.service.IWmsDeliveryOrderService;
import com.zlb.erp.wms.core.api.vo.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * wms出库订单控制层
 *
 * @author jiangfubing
 */
@Controller
@RequestMapping("wms/deliveryorder")
public class DeliveryOrderController extends BaseController {
    protected Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Reference
    IWmsDeliveryOrderService wmsDeliveryOrderService;
    @Reference
    private ISystemParamService systemParamService;//RPC调用获取全局参数

    @RequestMapping(value = "/init", method = RequestMethod.GET)
    public String init(Model model, HttpServletRequest request) {
        return setResponseModel("wms/storageout/deliveryorderList", model, request);
    }

    @RequestMapping(value = "/initDeliveryorder", method = RequestMethod.GET)
    public String initDeliveryorder(Model model, HttpServletRequest request) {
        return setResponseModel("wms/storageout/deliveryorderAssignRepertory", model, request);
    }

    @RequestMapping(value = "/initDeliveryorderDetail", method = RequestMethod.GET)
    public String initDeliveryorderDetail(Model model, HttpServletRequest request) {
        return setResponseModel("wms/storageout/deliveryOrderDetail", model, request);
    }

    @RequestMapping(value = "/initWmsDeliveryOrderDistribute", method = RequestMethod.GET)
    public String initWmsDeliveryOrderDistribute(Model model, HttpServletRequest request) {
        return setResponseModel("wms/storageout/deliveryOrderDistribute", model, request);
    }

    /**
     * 出库分页查询
     *
     * @param searchVo
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> list(@RequestBody WmsDeliveryOrderSearchVo searchVo) {
        LOGGER.info("分页查询出库订单数据，请求参数json：{}", searchVo);
        searchVo.setOperatCode(getOperatorId().toString());
        searchVo.setWarehouseCode(getCookieWCode());
        ResponseResult<WmsDeliveryOrderVo> wmsDeliveryOrderVoResponseResult = wmsDeliveryOrderService.queryWmsDeliveryOrderByPage(searchVo);
        return wmsDeliveryOrderVoResponseResult;
    }

    /**
     * 出库订单确认
     *
     * @param ids 出库订单ID字符串
     * @return
     */
    @RequestMapping(value = "/stateQr", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> updateWmsDeliveryOrderStatus(String ids) {
        LOGGER.info("出库确认请求参数json：{}", ids);
        if (StringUtils.isNotEmpty("ids")) {
            String[] confrimIds = ids.split(",");
            String operatorId = getOperatorId() + "";
            String userName = getUserName();
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            param.put("userName",userName);
            ResponseResult<WmsDeliveryOrderVo> wmsDeliveryOrderVoResponseResult = wmsDeliveryOrderService.updatemsDeliveryOrderState(param);
            LOGGER.info("出库确认返回参数json：{}", wmsDeliveryOrderVoResponseResult);
            return wmsDeliveryOrderVoResponseResult;
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 出库订单分配
     *
     * @param ids 出库订单ID字符串
     * @return
     */
    @RequestMapping(value = "/deliveryorderFp", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> deliveryorderFp(String ids) {
        LOGGER.info("出库订单分配请求参数json：{}", ids);
        if (StringUtils.isNotEmpty("ids")) {
            String[] confrimIds = ids.split(",");
            String operatorId = getOperatorId() + "";
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("userName",getUserName());
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            return wmsDeliveryOrderService.deliveryorderFp(param);
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 出库订单出库确认订单
     *
     * @param ids 出库订单ID字符串
     * @return
     */
    @RequestMapping(value = "/deliveryorderOutQr", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> deliveryorderOutQr(String ids, String outOrderNos) {
        LOGGER.info("出库订单出库确认请求参数json：{}", ids);
        if (StringUtils.isNotEmpty(ids) && StringUtils.isNotEmpty(outOrderNos)) {
            String[] confrimIds = ids.split(",");
            String[] outOrderNo = outOrderNos.split(",");
            String operatorId = getOperatorId() + "";
            String operatorName = getSelfOperatorName(); //运营商编码
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            param.put("outOrderNos", outOrderNo);
            param.put("operatorName",operatorName);
            param.put("userName",getUserName());
            return wmsDeliveryOrderService.deliveryorderOutQr(param);
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 复核确认
     *
     * @param ids
     * @param
     * @return
     */
    @RequestMapping(value = "/checkReview", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> checkReview(String ids, String outOrderNo) {
        LOGGER.info("出库订单复核确认请求参数json：{}", ids);
        if (StringUtils.isNotEmpty(ids)) {
            String[] confrimIds = ids.split(",");
            String[] outOrderNos = outOrderNo.split(",");
            String operatorId = getOperatorId() + "";
            String userName = getUserName();
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("operatCode", operatorId);
            param.put("outOrderNos", outOrderNos);
            param.put("ids", confrimIds);
            param.put("checkName", userName);
            return wmsDeliveryOrderService.checkReview(param);
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 生成拣货单
     *
     * @param ids
     * @param pick
     * @return
     */
    @RequestMapping(value = "/deliveryorderPick", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> deliveryorderPick(String ids, String pick) {
        LOGGER.info("生成拣货单请求参数json：{}", ids);
        if (StringUtils.isNotEmpty(ids) && StringUtils.isNotEmpty(pick)) {
            String[] id = ids.split(",");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("operatCode", getOperatorId());
            params.put("userName",getUserName());
            params.put("type", pick);
            params.put("ids", id);
            return wmsDeliveryOrderService.deliveryorderPick(params);
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 出库订单信息
     *
     * @param id 出库订单ID字符串
     * @return ResponseResult
     */
    @RequestMapping(value = "/ByDeliveryorder", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> ByDeliveryorder(String id) {
        LOGGER.info("查询出库订单基本信息，请求参数json：{}", id);
        if (StringUtils.isNotEmpty("id")) {
            ResponseResult<WmsDeliveryOrderVo> wmsDeliveryOrderVoResponseResult = wmsDeliveryOrderService.queryWmsDeliveryOrder(id);
            LOGGER.info("出库订单信息,返回的参数json：{}", wmsDeliveryOrderVoResponseResult);
            return wmsDeliveryOrderVoResponseResult;
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 出库订单导出
     *
     * @param
     * @param
     * @param searchVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/deliveryorderListExport", method = RequestMethod.POST)
    public void deliveryorderListExport(WmsDeliveryOrderSearchVo searchVo, HttpServletResponse response) {
        LOGGER.info("导出上架作业单数据，请求参数json：{}", searchVo);
        try {
            long operatorId = getOperatorId();
            searchVo.setOperatCode(operatorId + "");
            searchVo.setWarehouseCode(getCookieWCode());
            String fileName = "出库订单列表";
            PoiExcelUtils.setDownFileCommonHttpHeader(response,fileName,request);
            List<WmsDeliveryOrderVo> datas = wmsDeliveryOrderService.deliveryorderListExport(searchVo);
            ExportToExcelUtil.writeExecl(datas, ExcelTitleMap.DELIVERORDER_STORTITLE, fileName, response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("出库订单业单导出出错json：{}" + e.getMessage());
        }
    }

    /**
     * 异常标记
     *
     * @param ids
     * @param flag
     * @return
     */
    @RequestMapping(value = "/offAbnormalFlag", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> offAbnormalFlag(String ids, String flag) {
        LOGGER.info("打上异常标记请求参数json：{}", ids);
        if (StringUtils.isNotEmpty(ids)) {
            String[] id = ids.split(",");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("operatCode", getOperatorId());
            params.put("userName",getUserName());
            params.put("ids", id);
            params.put("abnormalFlag", flag);
            return wmsDeliveryOrderService.offAbnormalFlag(params);
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 取消分配
     *
     * @param ids
     * @param
     * @return
     */
    @RequestMapping(value = "/cancelAllocation", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsDeliveryOrderVo> cancelAllocation(String ids, String outOrderNos) {
        LOGGER.info("打上异常标记请求参数json：{}", ids);
        if (StringUtils.isNotEmpty(ids)) {
            String[] id = ids.split(",");
            String[] outOrderNo = outOrderNos.split(",");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("userName",getUserName());
            params.put("operatCode", getOperatorId());
            params.put("ids", id);
            params.put("outOrderNos", outOrderNo);
            return wmsDeliveryOrderService.cancelAllocation(params);
        } else {
            return new ResponseResult<WmsDeliveryOrderVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 出库订单同步OMS/PMS
     *
     * @param synDeliveryorderOmsVo
     * @return responseResult
     */
    @RequestMapping(value = "/syncPmsPurchase", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult<SynDeliveryorderOmsVo> syncDeliveryOrder(SynDeliveryorderOmsVo synDeliveryorderOmsVo) {
        LOGGER.info("同步出库订单,请求参数json：{}", synDeliveryorderOmsVo);
        ResponseResult<SynDeliveryorderOmsVo> responseResult = wmsDeliveryOrderService.synDeliveryorderOms(synDeliveryorderOmsVo);
        LOGGER.info("同步出库订单,返回的参数json：{}", responseResult);
        return responseResult;
    }

    /**
     * 首页统计出库订单情况
     *
     * @return
     */
    @RequestMapping(value = "/searchOutStorge", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult<DeliveryOrderStatisticsVo> searchOutStorge() {
        LOGGER.info("统计出库订单情况,请求参数json：{}");
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("operatCode", getOperatorId());
        params.put("wcode", getCookieWCode());
        ResponseResult<DeliveryOrderStatisticsVo> responseResult = wmsDeliveryOrderService.searchOutStorge(params);
        LOGGER.info("统计出库订单情况,返回的参数json：{}", responseResult);
        return responseResult;
    }
}

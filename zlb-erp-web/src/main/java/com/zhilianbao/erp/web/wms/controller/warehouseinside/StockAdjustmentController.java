package com.zhilianbao.erp.web.wms.controller.warehouseinside;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.wms.core.api.service.IStockAdjustmentService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsStockAdjustmentSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsStockAdjustmentVo;

@Controller
@RequestMapping("wms/stockAdjustment")
public class StockAdjustmentController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IStockAdjustmentService stockAdjustmentService;
	
	

	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockAdjustment", model, request);
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockAdjustmentVo> listStockAdjustment(@RequestBody WmsStockAdjustmentSearchVo searchVo) {
		LOGGER.info("分页查询调整数据，请求参数json：{}", searchVo);
		searchVo.setOperatorCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return stockAdjustmentService.querySaleOrderListByPage(searchVo);
	}
	
	@RequestMapping(value = "/confirmStockAdjustment", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockAdjustmentVo> confirmStockAdjustment(@RequestBody WmsStockAdjustmentVo searchVo) {
		LOGGER.info("分页查询调整数据，请求参数json：{}", searchVo);
		searchVo.setOperatorCode(getOperatorId().toString());
		searchVo.setOperator(getSelfOperatorName());
		searchVo.setWarehouseCode(getCookieWCode());
		searchVo.setWarehouseName(getCookieWName());
		searchVo.setCreator(getUserName());
		searchVo.setModifier(getUserName());
		return stockAdjustmentService.confirmStockAdjustment(searchVo);
	}
}

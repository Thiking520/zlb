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
import com.zlb.erp.wms.core.api.service.IStockAdjustmentDetailService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsStockAdjustmentDetailSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsStockAdjustmentDetailVo;

@Controller
@RequestMapping("wms/stockAdjustmentDetail")
public class StockAdjustmentDetailController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IStockAdjustmentDetailService stockAdjustmentDetailService;
	
	

	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockAdjustment", model, request);
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockAdjustmentDetailVo> listStockAdjustment(@RequestBody WmsStockAdjustmentDetailSearchVo searchVo) {
		LOGGER.info("分页查询调整明细数据，请求参数json：{}", searchVo);
		return stockAdjustmentDetailService.querySaleOrderListByPage(searchVo);
	}
	
	
	@RequestMapping(value = "/updateAjustmentDetail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockAdjustmentDetailVo> updateAjustmentDetail(@RequestBody WmsStockAdjustmentDetailVo stockAdjustmentDetailVo) {
		LOGGER.info("添加调整明细数据，请求参数json：{}", stockAdjustmentDetailVo);
		
		return stockAdjustmentDetailService.updateAjustmentDetail(stockAdjustmentDetailVo,getCookieWCode(),getOperatorId().toString());
	}
	
}

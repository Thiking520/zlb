package com.zhilianbao.erp.web.wms.controller.warehouseinside;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.wms.core.api.service.IStockTradingService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.StockTradingSearch;
import com.zlb.erp.wms.core.api.vo.StockTradingVo;
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

@Controller
@RequestMapping("wms/stockTrading")
public class StockTradingController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IStockTradingService stockTradingService;
	
	

	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockTrading", model, request);
	}

	@RequestMapping(value = "/listStockTrading", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockTradingVo> listStockTrading(@RequestBody StockTradingSearch searchVo) {
		LOGGER.info("分页查询仓库数据，请求参数json：{}", searchVo);
		searchVo.setOperatorCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return stockTradingService.querySaleOrderListByPage(searchVo);
	}
}

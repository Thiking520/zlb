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
import com.zlb.erp.wms.core.api.service.IStockOutSumService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.StockOutSumVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInSearchVo;

/**
 * 
* @Title: WmsMangerController
* @author liushilei
* @date 2017年5月17日上午11:56:12
* @description:获取仓位列表
 */
@Controller
@RequestMapping("/stockOut")
public class StockOutLookController extends BaseController {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	private IStockOutSumService stockOutSumService;
	
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockOutList",model,request);
	}
	
	/**
	 * 展望量查询
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockOutSumVo> list(@RequestBody WmsStorageInSearchVo searchVo) throws Exception{
		LOGGER.info("展望量查询,请求参数json：{}", searchVo);
		String operatorId= getOperatorId()+"";
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<StockOutSumVo> responseResult = stockOutSumService.queryStockOutSum(searchVo);
		LOGGER.info("展望量查询,返回的参数json：{}", responseResult);
		return responseResult;
	}
}

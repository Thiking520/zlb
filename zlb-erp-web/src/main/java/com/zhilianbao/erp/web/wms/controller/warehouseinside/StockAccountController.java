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

import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.StockAccountSeachVo;
import com.zlb.erp.wms.core.api.vo.StockAccountVo;

/**
 * 
* @Title: WmsInsideMangerController
* @author yp
* @date 2017年5月17日上午11:56:12
* @description:台帐列表
 */
@Controller
@RequestMapping("/stockAccount")
public class StockAccountController extends BaseController {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());

	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockOutList",model,request);
	}
	
	/**
	 * 账台查询
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockAccountVo> list(@RequestBody StockAccountSeachVo searchVo) throws Exception{
		LOGGER.info("账台查询,请求参数json：{}", searchVo);
		ResponseResult<StockAccountVo> responseResult = null;
		LOGGER.info("账台查询,返回的参数json：{}", responseResult);
		return responseResult;
	}
}

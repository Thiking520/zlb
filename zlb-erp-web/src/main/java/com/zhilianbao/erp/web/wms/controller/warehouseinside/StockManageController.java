package com.zhilianbao.erp.web.wms.controller.warehouseinside;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.wms.core.api.service.IStockBatchService;
import com.zlb.erp.wms.core.api.service.IStockLocationService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.StockBatchVo;
import com.zlb.erp.wms.core.api.vo.StockLocationVo;
import com.zlb.erp.wms.core.api.vo.StockSearchVo;

/**
 * wms库内管理模块库存余量功能控制层
 * 
 * @author fan
 *
 */
@Controller
@RequestMapping("wms/stockmanage")
public class StockManageController extends BaseController {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());

	@Reference
	private IStockLocationService stockLocationService;

	@Reference
	private IStockBatchService stockBatchService;

	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockmanage", model, request);
	}

	@RequestMapping(value = "/listStockBatch", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockBatchVo> listStockBatch(@RequestBody StockSearchVo searchVo) {
		LOGGER.info("分页查询仓库数据，请求参数json：{}", searchVo);
		searchVo.setOperatorCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return stockBatchService.querySaleOrderListByPage(searchVo);
	}

	@RequestMapping(value = "/listStockLocation", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockLocationVo> listStockLocation(@RequestBody StockSearchVo searchVo) {
		LOGGER.info("分页查询仓库数据，请求参数json：{}", searchVo);
		searchVo.setOperatorCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return stockLocationService.querySaleOrderListByPage(searchVo);
	}
	
	/**
	 * 手动勾选生成调整单
	 * @return
	 */
	@RequestMapping(value = "/generateAdjustment", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockLocationVo> generateAdjustment(@RequestParam(value = "ids", required = true)String ids){
		LOGGER.info("盘点单数据，请求参数json：{}", ids);
		String[] id = ids.split(",");
		//获取基本参数,仓库编码\仓库名称\运营商
		HashMap<String, Object> hasMap = new HashMap<String, Object>();
		hasMap.put("warehouseCode", getCookieWCode());
		hasMap.put("warehouseName", getCookieWName());
		hasMap.put("operatCode", getOperatorId().toString());
		hasMap.put("operatName", getSelfOperatorName());
		hasMap.put("userName", getUserName());
		return stockLocationService.generateAdjustment(hasMap,id);
	}
	
}

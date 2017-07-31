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
import com.zlb.erp.wms.core.api.service.IStockPhysicalDetailService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsStockPhysicalDetailSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsStockPhysicalDetailVo;

/**
 * wms库内管理模块盘点明细
 * 
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/physicalDetail")
public class StockPhysicalDetailController extends BaseController {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());

	@Reference
	private IStockPhysicalDetailService stockPhysicalDetailService;


	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockPhysical", model, request);
	}

	/**
	 * 分页查询盘点明细
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockPhysicalDetailVo> queryListByPage(@RequestBody WmsStockPhysicalDetailSearchVo searchVo) {
		LOGGER.info("分页盘点数据，请求参数json：{}", searchVo);
		return stockPhysicalDetailService.queryListByPage(searchVo);
	}
    /**
	 * 盘点SKU添加盘点数量
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/addPhysicalDetail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockPhysicalDetailVo> addPhysicalDetail(@RequestBody WmsStockPhysicalDetailSearchVo searchVo) {
		LOGGER.info("盘点单盘点增加数量，请求参数vo json：{}", searchVo);
		searchVo.setCreator(getUserName());
		searchVo.setModifier(getUserName());
		return stockPhysicalDetailService.addPhysicalDetail(searchVo);
	}
	
	/*
	 /**
	 * 确认原料转为成品
	 * @param searchVo
	 * @return
	 *//*
	@RequestMapping(value = "/materialPlusReduce", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsMaterialVo> materialPlusReduce(@RequestBody WmsMaterialVo wmsMaterialVo) {
		LOGGER.info("确认原料转为成品数据，请求参数json：{}", wmsMaterialVo);
		wmsMaterialVo.setOperatorCode(getOperatorId().toString());
		wmsMaterialVo.setOperat(getSelfOperatorName());
		wmsMaterialVo.setWarehouseCode(getCookieWCode());
		wmsMaterialVo.setWarehouseName(getCookieWName());
		return wmsMaterialService.materialPlusReduce(wmsMaterialVo);
	}*/
}

package com.zhilianbao.erp.web.wms.controller.mastdata;

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
import com.zlb.erp.wms.core.api.service.IWarehouseLocationService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsWarehouseLocationSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsWarehouseLocationVo;

/**
 * 主数据模块，库位功能控制层
 * 参考库位档案管理：CarsController.java
 * 参考：warehousesLocation.jsp warehousesLocation.js文件
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/warehouseLocation")
public class WarehouseLocationController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWarehouseLocationService warehouseLocationService;
	

	 
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/warehousesLocation",model,request);
	}
	
	/**
	 * 分页查询仓库库位数据，请求json数据要求有如下数据
	//		searchVo.setOffset(36);
	//		searchVo.setPageSize(4);
	//		searchVo.setSort("created");
	//		searchVo.setOrder("desc");
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseLocationVo> list(@RequestBody WmsWarehouseLocationSearchVo searchVo) {
		LOGGER.info("分页查询库位数据，请求参数json：{}", searchVo);
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsWarehouseLocationVo> list = warehouseLocationService.queryListByPage(searchVo);
		 return list;
	}
	
	/**
	 * 添加仓库库位
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/addWarehouseLocation",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseLocationVo> addWarehouseLocation(@RequestBody WmsWarehouseLocationVo searchVo) {
		LOGGER.info("添加仓库库位数据，请求参数json：{}", searchVo);
		searchVo.setModifier(getUserName());
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setOperat(getSelfOperatorName());
		searchVo.setWarehouseCode(getCookieWCode());
	    return warehouseLocationService.addWarehouseLocation(searchVo);
	}
 
	/**
	 * 根据ID查询仓库库位信息
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryLocationDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseLocationVo> queryWarehouseDetails(@RequestBody WmsWarehouseLocationVo searchVo) {
		LOGGER.info("根据ID查询仓库库位信息数据，请求参数json：{}", searchVo);
	    return warehouseLocationService.queryWarehouseDetails(searchVo);
	}
	
	/**
	 * 修改库位信息
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateWarehouseLocation",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseLocationVo> updateWarehouseLocation(@RequestBody WmsWarehouseLocationVo warehouseVo) {
		LOGGER.info("修改库位信息数据，请求参数json：{}", warehouseVo);
		warehouseVo.setModifier(getUserName());
		warehouseVo.setWarehouseCode(getCookieWCode());
		warehouseVo.setOperatCode(getOperatorId().toString());
	    return warehouseLocationService.updateWarehouseLocation(warehouseVo);
	}
	
}

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
import com.zlb.erp.wms.core.api.service.IWarehouseAreaService;
import com.zlb.erp.wms.core.api.vo.Page;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsWarehouseAreaSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsWarehouseAreaVo;

/**
 * 主数据模块，仓库库区功能控制层
 * 参考仓库库区管理：WarehouseAreaController.java
 * 参考：WarehousesArea.jsp WarehousesArea.js文件
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/warehouseArea")
public class WarehouseAreaController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWarehouseAreaService warehouseAreaService;
	

	 
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/warehousesArea",model,request);
	}
	
	/**
	 * 分页查询仓库库区
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<WmsWarehouseAreaVo>> list(@RequestBody WmsWarehouseAreaSearchVo searchVo) {
		LOGGER.info("分页查询仓库库区数据，请求参数json：{}", searchVo);
		searchVo.setCreator(getUserName());
		searchVo.setModifier(getUserName());
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return warehouseAreaService.queryListByPage(searchVo);
	}
	
	/**
	 * 添加库区
	 * @param addAreaVo
	 * @return
	 */
	@RequestMapping(value = "/addWarehouseArea",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseAreaVo> addWarehouseArea(@RequestBody WmsWarehouseAreaSearchVo addAreaVo) {
		LOGGER.info("添加仓库库区数据，请求参数json：{}", addAreaVo);
		addAreaVo.setModifier(getUserName());
		addAreaVo.setCreator(getUserName());
		addAreaVo.setOperatCode(getOperatorId().toString());
		addAreaVo.setOperat(getSelfOperatorName());
		addAreaVo.setWarehouseCode(getCookieWCode());
		addAreaVo.setWarehouseName(getCookieWName());
	    return warehouseAreaService.addWrehouseArea(addAreaVo);
	}
	
	/**
	 * 根据ID查询仓库库区信息
	 * @param SearchVo
	 * @return
	 */
	@RequestMapping(value = "/queryAreaDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseAreaVo> queryAreaDetails(@RequestBody WmsWarehouseAreaVo SearchVo) {
		LOGGER.info("根据ID查询仓库库区数据，请求参数json：{}", SearchVo);
		SearchVo.setWarehouseCode(getCookieWCode());
		SearchVo.setOperatCode(getOperatorId().toString());
		return warehouseAreaService.queryAreaDetails(SearchVo);
	}
	
	/**
	 * 修改库区信息
	 * @param SearchVo
	 * @return
	 */
	@RequestMapping(value = "/updateArea",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseAreaVo> updateArea(@RequestBody WmsWarehouseAreaVo SearchVo) {
		LOGGER.info("修改库区信息数据，请求参数json：{}", SearchVo);
		SearchVo.setModifier(getUserName());
		SearchVo.setWarehouseCode(getCookieWCode());
		SearchVo.setOperatCode(getOperatorId().toString());
		return warehouseAreaService.updateArea(SearchVo);
	}
	
	/**
	 * 修改库区状态
	 * @param SearchVo
	 * @return
	 */
	@RequestMapping(value = "/updateAreaStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseAreaVo> updateAreaStatus(@RequestBody WmsWarehouseAreaVo SearchVo) {
		LOGGER.info("修改库区状态信息数据，请求参数json：{}", SearchVo);
		SearchVo.setModifier(getUserName());
		SearchVo.setWarehouseCode(getCookieWCode());
		SearchVo.setOperatCode(getOperatorId().toString());
		return warehouseAreaService.updateAreaStatus(SearchVo);
	}
	
	/**
	 * 分页查询仓库库区
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryList",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsWarehouseAreaVo> queryList(WmsWarehouseAreaSearchVo searchVo) {
		LOGGER.info("分页查询仓库库区数据，请求参数json：{}", searchVo);
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return warehouseAreaService.queryList(searchVo);
	}
	
}

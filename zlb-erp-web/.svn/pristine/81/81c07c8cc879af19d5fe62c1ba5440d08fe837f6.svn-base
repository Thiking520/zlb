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
import 	com.zlb.erp.wms.core.api.service.IWarehouseService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WarehouseSearchVo;
import com.zlb.erp.wms.core.api.vo.WarehouseVo;

/**
 * 主数据模块，仓库功能控制层
 * 参考仓库档案管理：WarehouseController.java
 * 参考：warehouses.jsp warehouses.js文件
 * @author fan
 *
 */
@Controller
@RequestMapping("wms/warehouse")
public class WarehouseController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWarehouseService warehoueService;
	

	 
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/warehouses",model,request);
	}
	
	/**
	 * 分页查询仓库数据，请求json数据要求有如下数据
	//		searchVo.setOffset(36);
	//		searchVo.setPageSize(4);
	//		searchVo.setSort("created");
	//		searchVo.setOrder("desc");
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WarehouseVo> list(@RequestBody WarehouseSearchVo searchVo) {
		LOGGER.info("分页查询仓库数据，请求参数json：{}", searchVo);
		searchVo.setOperatCode(getOperatorId().toString());
		return warehoueService.querySaleOrderListByPage(searchVo);
	}
	
	/**
	 * 添加仓库
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/add",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WarehouseVo> addWarehouse(@RequestBody WarehouseSearchVo searchVo) {
		LOGGER.info("添加仓库数据，请求参数json：{}", searchVo);
		searchVo.setCreator(getUserName());
		searchVo.setModifier(getUserName());
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setOperat(getSelfOperatorName());
		searchVo.setWarehouseCode(searchVo.getWarehouseCode());
		searchVo.setWarehouseName(searchVo.getWarehouseName());
	    return warehoueService.addWrehouse(searchVo);
	}
	
	/***
	 * 查询全部仓库
	 * @param paraOperatorVo
	 * @return
	 */
	@RequestMapping(value = "/allWarehouse")
	@ResponseBody
	public ResponseResult<WarehouseVo> qryWarehouse(@RequestBody WarehouseVo warehouseVo) {
		LOGGER.info("查询所有仓库数据，请求参数json：{}", warehouseVo);
		warehouseVo.setOperatCode(getOperatorId().toString());
		return	warehoueService.qryWarehouse(warehouseVo);
	}
	
	/**
	 * 根据ID查询仓库信息
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryWarehouseDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WarehouseVo> queryWarehouseDetails(@RequestBody WarehouseSearchVo searchVo) {
		LOGGER.info("根据ID查询仓库信息数据，请求参数json：{}", searchVo);
	    return warehoueService.queryWarehouseDetails(searchVo);
	}
	
	/**
	 * 修改仓库信息
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateWarehouse",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WarehouseVo> updateWarehouse(@RequestBody WarehouseVo warehouseVo) {
		LOGGER.info("修改仓库信息数据，请求参数json：{}", warehouseVo);
		warehouseVo.setModifier(getUserName());
	    return warehoueService.updateWarehouse(warehouseVo);
	}
	
	/**
	 * 修改状态
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateWarehouseStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WarehouseVo> updateWarehouseStatus(@RequestBody WarehouseVo warehouseVo) {
		LOGGER.info("修改仓库状态数据，请求参数json：{}", warehouseVo);
		warehouseVo.setModifier(getUserName());
	    return warehoueService.updateWarehouseStatus(warehouseVo);
	}
	
}

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
import com.zlb.erp.wms.core.api.service.IWmsAllocatedRulesService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsAllocatedRulesMoreVo;
import com.zlb.erp.wms.core.api.vo.WmsAllocatedRulesSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsAllocatedRulesVo;

/**
 * 主数据模块，分配规则功能控制层
 * 参考分配规则管理：AllocatedRulesController.java
 * 参考：allocatedRules.jsp allocatedRules.js文件
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/allocatedRules")
public class AllocatedRulesController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsAllocatedRulesService wmsAllocatedRulesService;
	

	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/allocatedRules",model,request);
	}
	
	/**
	 * 分页查询分配数据，请求json数据要求有如下数据
	//		searchVo.setOffset(36);
	//		searchVo.setPageSize(4);
	//		searchVo.setSort("created");
	//		searchVo.setOrder("desc");
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsAllocatedRulesVo> list(@RequestBody WmsAllocatedRulesSearchVo searchVo) {
		LOGGER.info("分页查询属性批次数据，请求参数json：{}", searchVo);
		
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsAllocatedRulesVo> list = wmsAllocatedRulesService.queryListByPage(searchVo);
		
		return list;
	}

	/**
	 * 添加分配数据
	 * @param allocatedRulesMoreVo
	 * @return
	 */
	@RequestMapping(value = "/addAllocatedRules",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsAllocatedRulesVo> addAllocatedRules(@RequestBody WmsAllocatedRulesMoreVo allocatedRulesMoreVo) {
		LOGGER.info("添加分配数据，请求参数json：{}", allocatedRulesMoreVo);
		
		allocatedRulesMoreVo.setModifier(getUserName());
		allocatedRulesMoreVo.setCreator(getUserName());
		allocatedRulesMoreVo.setOperatCode(getOperatorId().toString());
		allocatedRulesMoreVo.setOperat(getSelfOperatorName());
		allocatedRulesMoreVo.setWarehouseCode(getCookieWCode());
		allocatedRulesMoreVo.setWarehouseName(getCookieWName());
	    return wmsAllocatedRulesService.addAllocatedRules(allocatedRulesMoreVo);
	}
 
	/**
	 * 根据ID查询信息
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryAllocate",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsAllocatedRulesVo> queryAllocateDetails(@RequestBody WmsAllocatedRulesVo searchVo) {
		LOGGER.info("根据ID查询信息数据，请求参数json：{}", searchVo);
	    return wmsAllocatedRulesService.queryAllocateDetails(searchVo);
	}
	
	/**
	 * 修改分配信息
	 * @param wmsShelfRulesMoreVo
	 * @return
	 */
	@RequestMapping(value = "/updateAllocated",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsAllocatedRulesVo> updateAllocated(@RequestBody WmsAllocatedRulesVo wmsAllocatedRulesVo) {
		LOGGER.info("修改分配信息数据，请求参数json：{}", wmsAllocatedRulesVo);
		wmsAllocatedRulesVo.setModifier(getUserName());
		return wmsAllocatedRulesService.updateAllocated(wmsAllocatedRulesVo);
	}
	
}

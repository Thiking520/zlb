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
import com.zlb.erp.wms.core.api.service.IWmsPreAllocatedRulesDetailService;
import com.zlb.erp.wms.core.api.service.IWmsPreAllocatedRulesService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsPreAllocatedRulesMoreVo;
import com.zlb.erp.wms.core.api.vo.WmsPreAllocatedRulesSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsPreAllocatedRulesVo;

/**
 * 主数据模块，预分配规则功能控制层
 * 参考分配规则管理：preAllocatedRulesController.java
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/preAllocatedRules")
public class PreAllocatedRulesController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsPreAllocatedRulesService wmsPreAllocatedRulesService;
	
	@Reference
	IWmsPreAllocatedRulesDetailService wmsPreAllocatedRulesDetailService;

	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/preAllocatedRules",model,request);
	}
	
	/**
	 * 分页查询预分配数据，请求json数据要求有如下数据
	//		searchVo.setOffset(36);
	//		searchVo.setPageSize(4);
	//		searchVo.setSort("created");
	//		searchVo.setOrder("desc");
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPreAllocatedRulesVo> list(@RequestBody WmsPreAllocatedRulesSearchVo searchVo) {
		LOGGER.info("分页查询预分配数据，请求参数json：{}", searchVo);
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsPreAllocatedRulesVo> list = wmsPreAllocatedRulesService.queryListByPage(searchVo);
		return list;
	}
 
	/**
	 * 添加预分配主规则和明细规则
	 * @param preAllocatedRulesMoreVo
	 * @return
	 */
	@RequestMapping(value = "/addPreAllocatedRules",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPreAllocatedRulesVo> addPreAllocatedRules(@RequestBody WmsPreAllocatedRulesMoreVo preAllocatedRulesMoreVo) {
		LOGGER.info("添加预分配主规则和明细规则数据，请求参数json：{}", preAllocatedRulesMoreVo);
		preAllocatedRulesMoreVo.setCreator(getUserName());
		preAllocatedRulesMoreVo.setModifier(getUserName());
		preAllocatedRulesMoreVo.setOperatCode(getOperatorId().toString());
		preAllocatedRulesMoreVo.setOperat(getSelfOperatorName());
		preAllocatedRulesMoreVo.setWarehouseCode(getCookieWCode());
		preAllocatedRulesMoreVo.setWarehouseName(getCookieWName());
		return wmsPreAllocatedRulesService.addPreAllocatedRules(preAllocatedRulesMoreVo);
	}
	
	
	/**
	 * 根据ID查询信息
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryAllocate",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPreAllocatedRulesVo> queryAllocateDetails(@RequestBody WmsPreAllocatedRulesVo preAllocatedRulesVo) {
		LOGGER.info("根据ID查询信息预分配主规则数据，请求参数json：{}", preAllocatedRulesVo);
	    return wmsPreAllocatedRulesService.queryPreAllocate(preAllocatedRulesVo);
	}
	
	/**
	 * 修改信息
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateAllocated",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPreAllocatedRulesVo> updateAllocated(@RequestBody WmsPreAllocatedRulesVo preAllocatedRulesVo) {
		LOGGER.info("修改预分配主规则数据，请求参数json：{}", preAllocatedRulesVo);
		preAllocatedRulesVo.setModifier(getUserName());
		return wmsPreAllocatedRulesService.updatePreAllocated(preAllocatedRulesVo);
	}
	
}

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
import com.zlb.erp.wms.core.api.service.IWmsShelfRulesService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsShelfRulesMoreVo;
import com.zlb.erp.wms.core.api.vo.WmsShelfRulesSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsShelfRulesVo;

/**
 * 主数据模块，上架规则功能控制层
 * 参考上架规则管理：ShelfRulesController.java
 * @author pentor
 *
 */
@Controller
@RequestMapping("wms/shelfRules")
public class ShelfRulesController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsShelfRulesService wmsShelfRulesService;
	

	 
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/shelfRules",model,request);
	}
	
	/**
	 * 分页查询上架数据，请求json数据要求有如下数据
	//		searchVo.setOffset(36);
	//		searchVo.setPageSize(4);
	//		searchVo.setSort("created");
	//		searchVo.setOrder("desc");
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsShelfRulesVo> list(@RequestBody WmsShelfRulesSearchVo searchVo) {
		LOGGER.info("分页查询属性批次数据，请求参数json：{}", searchVo);
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsShelfRulesVo> list = wmsShelfRulesService.queryListByPage(searchVo);
		return list;
	}

	/**
	 * 添加上架规则
	 * @param shelfRulesMoreVo
	 * @return
	 */
	@RequestMapping(value = "/addShelRules",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsShelfRulesVo> addShelRules(@RequestBody WmsShelfRulesMoreVo shelfRulesMoreVo) {
		LOGGER.info("添加上架规则数据，请求参数json：{}", shelfRulesMoreVo);
		shelfRulesMoreVo.setCreator(getUserName());
		shelfRulesMoreVo.setModifier(getUserName());
		shelfRulesMoreVo.setOperatCode(getOperatorId().toString());
		shelfRulesMoreVo.setOperat(getSelfOperatorName());
		shelfRulesMoreVo.setWarehouseCode(getCookieWCode());
		shelfRulesMoreVo.setWarehouseName(getCookieWName());
	    return wmsShelfRulesService.addShelRules(shelfRulesMoreVo);
	}
 
	/**
	 * 根据ID查询信息
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryShelRules",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsShelfRulesVo> queryShelRulesDetails(@RequestBody WmsShelfRulesVo searchVo) {
		LOGGER.info("根据ID查询信息数据，请求参数json：{}", searchVo);
	    return wmsShelfRulesService.queryShelRulesDetails(searchVo);
	}
	
	/**
	 * 修改上架规则信息
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateShelfRules",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsShelfRulesVo> updatePropertyDetail(@RequestBody WmsShelfRulesMoreVo wmsShelfRulesMoreVo) {
		LOGGER.info("修改上架规则信息数据，请求参数json：{}", wmsShelfRulesMoreVo);
		wmsShelfRulesMoreVo.setModifier(getUserName());
		return wmsShelfRulesService.updatePropertyDetail(wmsShelfRulesMoreVo);
	}
	
}

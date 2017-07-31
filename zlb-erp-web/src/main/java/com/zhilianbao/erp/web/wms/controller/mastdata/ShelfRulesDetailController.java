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
import com.zlb.erp.wms.core.api.service.IWmsShelfRulesDetailService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsShelfRulesDetailSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsShelfRulesDetailVo;

/**
 * 主数据模块，上架规则功能控制层
 * 参考上架规则管理：ShelfRulesController.java
 * @author pentor
 *
 */
@Controller
@RequestMapping("wms/shelfRulesDetail")
public class ShelfRulesDetailController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsShelfRulesDetailService wmsShelfRulesDetailService;
	

	 
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
	public ResponseResult<WmsShelfRulesDetailVo> list(@RequestBody WmsShelfRulesDetailSearchVo searchVo) {
		LOGGER.info("分页查询属性批次数据，请求参数json：{}", searchVo);
		ResponseResult<WmsShelfRulesDetailVo> list = wmsShelfRulesDetailService.queryListByPage(searchVo);
		return list;
	}
	
 
	
	/**
	 * 删除规则明细
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/deleteShelfRulesDetail",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsShelfRulesDetailVo> updatePropertyDetail(@RequestBody WmsShelfRulesDetailVo shelfRulesDetail) {
	    return wmsShelfRulesDetailService.deleteShelfRulesDetail(shelfRulesDetail);
	}
	
}

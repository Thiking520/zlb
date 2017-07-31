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
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsPreAllocatedRulesDetailSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsPreAllocatedRulesDetailVo;

/**
 * 主数据模块，预分配明细规则功能控制层
 * 参考分配规则管理：allocatedRulesDetailController.java
 * @author pentor
 *
 */
@Controller
@RequestMapping("wms/preAllocatedRulesDetail")
public class PreAllocatedRulesDetailController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
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
	public ResponseResult<WmsPreAllocatedRulesDetailVo> list(@RequestBody WmsPreAllocatedRulesDetailSearchVo searchVo) {
		LOGGER.info("分页查询预分配明细数据，请求参数json：{}", searchVo);
		ResponseResult<WmsPreAllocatedRulesDetailVo> list = wmsPreAllocatedRulesDetailService.queryListByPage(searchVo);
		return list;
	}
	
	/**
	 * 删除预分配明细
	 * @param preAllocatedRulesDetailVo
	 * @return
	 */
	@RequestMapping(value = "/deletePreAllocatedDetail",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPreAllocatedRulesDetailVo> deletePreAllocatedDetail(@RequestBody WmsPreAllocatedRulesDetailVo preAllocatedRulesDetailVo){
		LOGGER.info("分页查询预分配明细数据，请求参数json：{}", preAllocatedRulesDetailVo);
		ResponseResult<WmsPreAllocatedRulesDetailVo> list = wmsPreAllocatedRulesDetailService.deletePreAllocatedDetail(preAllocatedRulesDetailVo);
		return list;
	}
	
}

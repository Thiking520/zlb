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
import com.zlb.erp.wms.core.api.service.IWmsAllocatedRulesDetailService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsAllocatedRulesDetailSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsAllocatedRulesDetailVo;

/**
 * 主数据模块，分配规则功能控制层
 * 参考分配规则管理：AllocatedRulesDetailController.java
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/allocatedRulesDetail")
public class AllocatedRulesDetailController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsAllocatedRulesDetailService wmsAllocatedRulesDetailService;
	

	 
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
	public ResponseResult<WmsAllocatedRulesDetailVo> list(@RequestBody WmsAllocatedRulesDetailSearchVo searchVo) {
		LOGGER.info("分页查询属性批次数据，请求参数json：{}", searchVo);
		ResponseResult<WmsAllocatedRulesDetailVo> list = wmsAllocatedRulesDetailService.queryListByPage(searchVo);
		return list;
	}
	
	/**
	 * 删除预分配明细
	 * @param preAllocatedRulesDetailVo
	 * @return
	 */
	@RequestMapping(value = "/deleteAllocatedDetail",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsAllocatedRulesDetailVo> deleteAllocatedDetail(@RequestBody WmsAllocatedRulesDetailVo allocatedRulesDetailVo){
		LOGGER.info("分页查询预分配明细数据，请求参数json：{}", allocatedRulesDetailVo);
		ResponseResult<WmsAllocatedRulesDetailVo> list = wmsAllocatedRulesDetailService.deleteAllocatedDetail(allocatedRulesDetailVo);
		return list;
	}
}

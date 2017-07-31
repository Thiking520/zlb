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
import com.zlb.erp.wms.core.api.service.IWmsPropertyDetailService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsPropertyDetailSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsPropertyDetailVo;

/**
 * 主数据模块，批次属性明细功能控制层
 * 参考批次属性明细档案管理：PropertyDetailController.java
 * 参考：property.jsp property.js文件
 * @author fan
 *
 */
@Controller
@RequestMapping("wms/propertyDetail")
public class PropertyDetailController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsPropertyDetailService wmsPropertyDetailService;
	

	 
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/property",model,request);
	}
	
	/**
	 * 分页查询批次属性明细数据，请求json数据要求有如下数据
	//		searchVo.setOffset(36);
	//		searchVo.setPageSize(4);
	//		searchVo.setSort("created");
	//		searchVo.setOrder("desc");
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPropertyDetailVo> list(@RequestBody WmsPropertyDetailSearchVo searchVo) {
		LOGGER.info("分页查询批次属性明细数据，请求参数json：{}", searchVo);
		ResponseResult<WmsPropertyDetailVo> list = wmsPropertyDetailService.queryListByPage(searchVo);
		return list;
	}
	
	/**
	 * 修改批次属性明细信息
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updatePropertyDetail",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPropertyDetailVo> updatePropertyDetail(@RequestBody WmsPropertyDetailVo warehouseVo) {
		LOGGER.info("修改批次属性明细信息数据，请求参数json：{}", warehouseVo);
	    return wmsPropertyDetailService.updatePropertyDetail(warehouseVo);
	}
	
}

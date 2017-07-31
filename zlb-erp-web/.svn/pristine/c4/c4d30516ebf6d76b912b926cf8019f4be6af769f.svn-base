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
import com.zlb.erp.wms.core.api.service.IWmsPropertyService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsPropertyMoreVo;
import com.zlb.erp.wms.core.api.vo.WmsPropertySearchVo;
import com.zlb.erp.wms.core.api.vo.WmsPropertyVo;

/**
 * 主数据模块，批次属性功能控制层
 * 参考批次属性档案管理：PropertyController.java
 * 参考：Property.jsp Property.js文件
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/property")
public class PropertyController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsPropertyService wmsPropertyService;
	

	 
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/property",model,request);
	}
	
	/**
	 * 分页查询批次属性数据，请求json数据要求有如下数据
	//		searchVo.setOffset(36);
	//		searchVo.setPageSize(4);
	//		searchVo.setSort("created");
	//		searchVo.setOrder("desc");
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPropertyVo> list(@RequestBody WmsPropertySearchVo searchVo) {
		LOGGER.info("分页批次属性数据，请求参数json：{}", searchVo);
		searchVo.setOperatCode(getOperatorId().toString());
		ResponseResult<WmsPropertyVo> list = wmsPropertyService.queryListByPage(searchVo);
		 return list;
	}
	
	/**
	 * 批次属性新增
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/addProperty",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPropertyVo> addPropertyAndDetail(@RequestBody WmsPropertyMoreVo propertyMoreVo) {
		LOGGER.info("添加批次属性数据，请求参数json：{}", propertyMoreVo);
		propertyMoreVo.setOperatCode(getOperatorId().toString());
		propertyMoreVo.setOperat(getSelfOperatorName());
		propertyMoreVo.setWarehouseCode(getCookieWCode());
		propertyMoreVo.setWarehouseName(getCookieWName());
	    return wmsPropertyService.addPropertyAndDetail(propertyMoreVo);
	}
 
	/**
	 * 根据ID查询批次属性信息
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryProperty",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPropertyVo> queryProperty(@RequestBody WmsPropertyVo searchVo) {
		LOGGER.info("根据ID查询批次属性信息数据，请求参数json：{}", searchVo);
	    return wmsPropertyService.queryProperty(searchVo);
	}
	
	/**
	 * 修改批次属性信息
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateProperty",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsPropertyVo> updateProperty(@RequestBody WmsPropertyVo propertyVo) {
		LOGGER.info("修改批次属性信息数据，请求参数json：{}", propertyVo);
	    return wmsPropertyService.updateProperty(propertyVo);
	}
	
}

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
import com.zhilianbao.erp.auth.service.goods.IGoodsService;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.wms.core.api.service.IWmsSkuConfigService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsSkuConfigSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsSkuConfigVo;

/**
 * 主数据模块，SKU配置功能控制层
 * 参考货品档案管理：SkuConfigController.java
 * 参考：skuConfig.jsp skuConfig.js文件
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/skuConfig")
public class SkuConfigController  extends BaseController{
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	IWmsSkuConfigService skuConfigService;
	
	@Reference
	IGoodsService goodsService;
	 
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/mastdata/skuConfig",model,request);
	}
	
	/**
	 * 分页查询SKU配置
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsSkuConfigVo> list(@RequestBody WmsSkuConfigSearchVo searchVo) {
		LOGGER.info("分页查询SKU配置数据，请求参数json：{}", searchVo);
		searchVo.setOperatCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return skuConfigService.queryListByPage(searchVo);
	}
	
	/**
	 * 添加SKU配置
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/add",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsSkuConfigVo> addWarehouse(@RequestBody WmsSkuConfigVo skuConfigVo) {
		LOGGER.info("添加SKU配置数据，请求参数json：{}", skuConfigVo);
		skuConfigVo.setModifier(getUserName());
		skuConfigVo.setCreator(getUserName());
		skuConfigVo.setOperatCode(getOperatorId().toString());
		skuConfigVo.setOperat(getSelfOperatorName());
		skuConfigVo.setWarehouseCode(getCookieWCode());
		skuConfigVo.setWarehouseName(getCookieWName());
	    return skuConfigService.addSkuConfig(skuConfigVo);
	}
	
	
	/**
	 * 根据ID查询SKU配置信息
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/querySkuConfigDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsSkuConfigVo> querySkuConfigDetails(@RequestBody WmsSkuConfigVo wmsSkuConfigVo) {
		LOGGER.info("根据ID查询SKU配置信息数据，请求参数json：{}", wmsSkuConfigVo);
	    return skuConfigService.querySkuConfig(wmsSkuConfigVo);
	}
	
	/**
	 * 修改货品档案信息
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateSkuConfig",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsSkuConfigVo> updateSkuConfig(@RequestBody WmsSkuConfigVo wmsSkuConfigVo) {
		LOGGER.info("修改SKU配置信息数据，请求参数json：{}", wmsSkuConfigVo);
		wmsSkuConfigVo.setModifier(getUserName());
	    return skuConfigService.updateSkuConfig(wmsSkuConfigVo);
	}
	
	/**
	 * 修改状态
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/updateSkuConfigStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsSkuConfigVo> updateSkuConfigStatus(@RequestBody WmsSkuConfigVo wmsSkuConfigVo) {
		LOGGER.info("修改SKU配置状态数据，请求参数json：{}", wmsSkuConfigVo);
		wmsSkuConfigVo.setModifier(getUserName());
	    return skuConfigService.updateSkuConfigStatus(wmsSkuConfigVo);
	}
	
	/**
	 * 查询公共数据商品
	 * @param warehouseVo
	 * @return
	 */
	@RequestMapping(value = "/listGoods",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public com.zhilianbao.erp.common.vo.ResponseResult<Page<GoodsVo>> queryGoodsListPage(@RequestBody WmsSkuConfigSearchVo wmsSkuConfigSearchVo) {
		LOGGER.info("修改SKU配置状态数据，请求参数json：{}", wmsSkuConfigSearchVo);
		ViewSearchVo viewSearchVo = new ViewSearchVo();
		viewSearchVo.setSearchDesc(wmsSkuConfigSearchVo.getGoodsMode());
		viewSearchVo.setPageSize(wmsSkuConfigSearchVo.getPageSize());
		viewSearchVo.setOffset(wmsSkuConfigSearchVo.getOffset());
		viewSearchVo.setOperatorId(getOperatorId());
		viewSearchVo.setSearchKey(wmsSkuConfigSearchVo.getSkuCode());
		viewSearchVo.setSearchKeyword(wmsSkuConfigSearchVo.getSkuName());
		return  goodsService.queryGoodsListPage(viewSearchVo);
	}
	
}

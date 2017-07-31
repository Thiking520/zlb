package com.zhilianbao.erp.web.wms.controller.storagein;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
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
import com.zlb.erp.wms.core.api.service.IWmsStorageInRandomService;
import com.zlb.erp.wms.core.api.vo.BatchVo;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.StockBatchVo;
import com.zlb.erp.wms.core.api.vo.WmsRandomSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInRandomDetailVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInRandomVo;

/**
 * 
* @Title: StorageInRandomController
* @author liushilei
* @date 2017年6月26日下午4:17:59
* @description:随机入库
 */
@Controller
@RequestMapping("wms/storageinRandom")
public class StorageInRandomController extends BaseController{
protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	private IWmsStorageInRandomService storageInRandomService;
	/**
	 * 页面初始化跳转
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/storagein/storageInRandomList",model,request);
	}
	
	/**
	 * 随机入库列表页查询
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInRandomVo> list(@RequestBody WmsRandomSearchVo searchVo) throws Exception{
		LOGGER.info("随机入库列表页查询数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId()+"";
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsStorageInRandomVo> responseResult = storageInRandomService.queryStorageRandomListByPage(searchVo);
		LOGGER.info("随机入库列表页查询数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 随机入库详情列表页查询
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/detailList",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInRandomDetailVo> detailList(@RequestBody WmsRandomSearchVo searchVo) throws Exception{
		LOGGER.info("随机入库列表页查询数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId()+"";
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsStorageInRandomDetailVo> responseResult = storageInRandomService.queryStorageRandomDetailListByPage(searchVo);
		LOGGER.info("随机入库列表页查询数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	/**
	 * 随机入库保存
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/save",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInRandomVo> save(@RequestBody BatchVo searchVo) throws Exception{
		LOGGER.info("随机入库列表页查询数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId().toString();
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		searchVo.setOperator(getSelfOperatorName());
		searchVo.setWarehouseName(getCookieWName());
		searchVo.setCreator(getUserName());
		ResponseResult<WmsStorageInRandomVo> responseResult = storageInRandomService.saveStoRandom(searchVo);
		LOGGER.info("随机入库列表页查询数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 删除
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/delete",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<String> delete(@RequestBody BatchVo searchVo) throws Exception{
		LOGGER.info("删除,请求参数json：{}", searchVo);
		String operatorId= getOperatorId().toString();
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<String> responseResult = storageInRandomService.deleteStroRandom(searchVo);
		LOGGER.info("随机入审批数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 审批
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/approve",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInRandomVo> approve(@RequestBody BatchVo searchVo) throws Exception{
		LOGGER.info("随机入审批数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId().toString();
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		searchVo.setOperator(getSelfOperatorName());
		searchVo.setAuditor(getUserName());
		searchVo.setWarehouseName(getCookieWName());
		ResponseResult<WmsStorageInRandomVo> responseResult = storageInRandomService.approve(searchVo);
		LOGGER.info("随机入审批数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 获取默认的库位
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getDefaultLocation",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String,String>> getDefaultLocation() throws Exception{
		LOGGER.info("获取默认的库位开始");
		ResponseResult<Map<String,String>> responseResult = storageInRandomService.getDefaultLocation(getCookieWCode());
		LOGGER.info("获取默认的库位,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 根据批次属性获取商品已经货品状态相关信息
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getStockBatch",produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockBatchVo> getStockBatch(String skuStockBatchNo) throws Exception{
		LOGGER.info("根据批次属性获取商品已经货品状态相关信息,请求参数json：{}", skuStockBatchNo);
		Map<String,String> param = new HashMap<String,String>();
		String operatorId= getOperatorId().toString();
		param.put("skuStockBatchNo", StringUtils.isEmpty(skuStockBatchNo)==true?"-1":skuStockBatchNo);//反正用户不小心传递一个空字符串导致程序报错
		param.put("operatorCode", operatorId);
		param.put("warehouseCode", getCookieWCode());
		ResponseResult<StockBatchVo> responseResult = storageInRandomService.getStockBatch(param);
		LOGGER.info("随机入审批数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
}

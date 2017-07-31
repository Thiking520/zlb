package com.zhilianbao.erp.web.wms.controller.warehouseinside;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.wms.core.api.service.IStockPhysicalService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.ResultEnum;
import com.zlb.erp.wms.core.api.vo.WmsStockPhysicalSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsStockPhysicalVo;

/**
 * wms库内管理模块盘点
 * 
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/physical")
public class StockPhysicalController extends BaseController {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());

	@Reference
	private IStockPhysicalService stockPhysicalService;


	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/stockPhysical", model, request);
	}

	/**
	 * 分页查询盘点
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/listPhysical", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockPhysicalVo> queryListByPage(@RequestBody WmsStockPhysicalSearchVo searchVo) {
		LOGGER.info("分页盘点数据，请求参数json：{}", searchVo);
		searchVo.setOperatorCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return stockPhysicalService.queryListByPage(searchVo);
	}

	 /**
	 * 盘点单生成单
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/generatePhysical", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockPhysicalVo> generatePhysical(@RequestParam(value = "locationCodes", required = true)String locationCodes,@RequestParam(value = "stockBatchNos", required = true)String stockBatchNos,String physicalMode) {
		LOGGER.info("盘点生成单数据，请求参数json：{}", locationCodes+"-"+physicalMode);
		if(locationCodes.isEmpty()){
			 return new ResponseResult<WmsStockPhysicalVo>(ResultEnum.SYS_ERR);
		}
		String[] locationCode = locationCodes.split(",");
		String[] stockBatchNo = stockBatchNos.split(",");
		//String[] locationCode = arrayNnique(locationCodeValue);
		//获取基本参数,仓库编码\仓库名称\运营商
		HashMap<String, Object> hasMap = new HashMap<String, Object>();
		hasMap.put("locationCodes", locationCode);
		hasMap.put("stockBatchNos", stockBatchNo);
		hasMap.put("physicalMode", physicalMode);
		hasMap.put("warehouseCode", getCookieWCode());
		hasMap.put("warehouseName", getCookieWName());
		hasMap.put("operatCode", getOperatorId().toString());
		hasMap.put("operat", getSelfOperatorName());
		hasMap.put("userName", getUserName());
		return stockPhysicalService.generatePhysical(hasMap);
	}
 
	 /**
	 * 确认盘点完成
	 * @param searchVo
	 * @return
	 */ 
	@RequestMapping(value = "/confirmPhysical", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockPhysicalVo> confirmPhysical(@RequestParam(value = "physicalNos", required = true)String physicalNos) {
		LOGGER.info("确认盘点完成数据，请求参数json：{}", physicalNos);
		String[] physicalNo = physicalNos.split(",");
		//获取基本参数,仓库编码\仓库名称\运营商
		HashMap<String, Object> hasMap = new HashMap<String, Object>();
		hasMap.put("physicalNos", physicalNo);
		hasMap.put("warehouseCode", getCookieWCode());
		hasMap.put("warehouseName", getCookieWName());
		hasMap.put("operatCode", getOperatorId().toString());
		hasMap.put("operatName", getSelfOperatorName());
		hasMap.put("userName", getUserName());
		return stockPhysicalService.confirmPhysical(hasMap);
	} 
  
	//去除数组中重复的记录
	public  String[] arrayNnique(String[] locationCode) {
	    // array_unique
	    List<String> list = new LinkedList<String>();
	    for(int i = 0; i < locationCode.length; i++) {
	        if(!list.contains(locationCode[i])) {
	            list.add(locationCode[i]);
	        }
	    }
	    return (String[])list.toArray(new String[list.size()]);
	}

	/**
	 * 盘点确认完成，有差异生成调整单
	 * @return
	 */
	@RequestMapping(value = "/generateAdjustment", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStockPhysicalVo> generateAdjustment(@RequestParam(value = "physicalNos", required = true)String physicalNos){
		LOGGER.info("盘点单数据，请求参数json：{}", physicalNos);
		String[] physicalNo = physicalNos.split(",");
		//获取基本参数,仓库编码\仓库名称\运营商
		HashMap<String, Object> hasMap = new HashMap<String, Object>();
		hasMap.put("physicalNos", physicalNo);
		hasMap.put("warehouseCode", getCookieWCode());
		hasMap.put("warehouseName", getCookieWName());
		hasMap.put("operatCode", getOperatorId().toString());
		hasMap.put("operatName", getSelfOperatorName());
		hasMap.put("userName", getUserName());
		return stockPhysicalService.generateAdjustment(hasMap);
	}
}

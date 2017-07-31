package com.zhilianbao.erp.web.wms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.archives.facade.IDeliveryRecordRestService;
import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordSearchVo;
import com.zhilianbao.erp.auth.vo.archives.DeliveryShortRecordVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ResponseValue;
import com.zhilianbao.erp.web.base.BaseController;

/**
 * 
* @Title: WmsMangerController
* @author liushilei
* @date 2017年5月17日上午11:56:12
* @description:获取仓位列表
 */
@Controller
@RequestMapping("/wms")
public class WmsMangerController extends BaseController {
	
	@Reference
	private IDeliveryRecordRestService deliveryRecordRestService;

	@RequestMapping(value = "/homepage",  method = RequestMethod.GET)
	public String homepage(Model model, HttpServletRequest request) {
		return setResponseModel("wms/wmsHomepage",model,request);
	}
	
	/**
	 * 获取用户仓库列表
	 * @return
	 */
	@RequestMapping(value = "/homepageData",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseValue<List<DeliveryShortRecordVo>> homepageData() {
		DeliveryRecordSearchVo deliveryRecordSearchVo = new DeliveryRecordSearchVo();
		deliveryRecordSearchVo.setPageSize(999);
		deliveryRecordSearchVo.setUserId(getUserId());
		deliveryRecordSearchVo.setCustom1("all");
		deliveryRecordSearchVo.setOperatorId(getOperatorId());
		return deliveryRecordRestService.getOwnPointList(deliveryRecordSearchVo);
	}

	/**
	 * 获取用户选择的数据
	 * @return
	 */
	@RequestMapping(value = "/getDefaultWCode",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseValue<DeliveryShortRecordVo> getDefaultWCode() {
		ResponseValue<DeliveryShortRecordVo> result = new ResponseValue<DeliveryShortRecordVo>();
		DeliveryShortRecordVo deliveryShortRecordVo = new DeliveryShortRecordVo();
		deliveryShortRecordVo.setCode(getCookieWCode());
		deliveryShortRecordVo.setName(getCookieWName());
		result.setData(deliveryShortRecordVo);
		return result;
	}
	
	/**
	 * 将用户选择的仓库code放入到cookie中
	 * @return
	 */
	@RequestMapping(value = "/putWarehouseCode",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseValue<String> putWarehouseCode(String warehouseCode,String warehouseName) {
		ResponseValue<String> result = new ResponseValue<String>();
		try {
			putWarehouseCodeToCookie(warehouseCode,warehouseName);
		} catch (Exception e) {
			return result.err();
		}
		return result.success();
	}
	
	/**
	 * 获取用户仓库分页列表
	 * @return
	 */
	@RequestMapping(value = "/homepageWarehouse",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<DeliveryShortRecordVo>> homepageWarehouse() {
		DeliveryRecordSearchVo deliveryRecordSearchVo = new DeliveryRecordSearchVo();
		deliveryRecordSearchVo.setPageSize(999);
		deliveryRecordSearchVo.setUserId(getUserId());
		deliveryRecordSearchVo.setCustom1("all");
		deliveryRecordSearchVo.setOperatorId(getOperatorId());
		return deliveryRecordRestService.getWarehouseList(deliveryRecordSearchVo);
	}
}

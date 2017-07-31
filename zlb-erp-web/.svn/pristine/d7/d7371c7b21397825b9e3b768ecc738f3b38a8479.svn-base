package com.zhilianbao.erp.web.oms.controller;

import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.util.DateFormatUtils;
import com.zhilianbao.erp.common.util.ResourceUtil;
import com.zhilianbao.erp.common.util.datehelp.DateUtils;
import com.zhilianbao.erp.oms.vo.*;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.parameter.ISystemParamService;
import com.zhilianbao.erp.common.annotation.Auth;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.util.office.PoiExcelUtils;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.oms.service.IOrderService;
import com.zhilianbao.erp.web.base.BaseController;

@Controller
@RequestMapping("/returnOrders")
public class ReturnOrderController extends BaseController {
	private static Logger logger = LogManager.getLogger(ReturnOrderController.class);
	@Reference
	private IOrderService service;
	@Reference
	private ISystemParamService systemParamService;//RPC调用获取全局参数
	
	
	/**
	 * 
	* @Title: init
	* @author liyang
	* @date 2017年3月2日上午11:44:32
	* @description:初始化换货订单列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("oms/returnOrderList",model,request);
	}
	
	/**
	 * 
	* @Title: initDropDownBox
	* @author liyang
	* @date 2017年3月3日上午11:34:32
	* @description:初始化换货订单列表页面的下拉列表
	 */
	@ResponseBody
	@RequestMapping(value = "/initDropDownBox",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<Map<String,Object>> initDropDownBox(Model model, HttpServletRequest request) {
		return service.initDropDownBox( getOperatorId());
	}
	
	
	/**
	 * 
	* @Title: list
	* @author liyang
	* @date 2017年3月5日上午10:17:18
	* @param vo
	* @return ResponseResult<ExchangeGoodsOrderVo>
	* @description:分页获取退货订单列表
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<ResponseOrderVo>> list(@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOrderType("20");
		sv.setOperatorId(getOperatorId());
		return service.queryReturnOrderListByPage(sv);
	}
	
	
	
	/**
	 * 
	* @Title: selectReturnOrderDetails
	* @author liyang
	* @date 2017年2月27日上午10:16:57
	* @description:初始化进入退货订单详情页面
	 */
	@RequestMapping(value = "/selectReturnOrderDetails",  method = RequestMethod.GET)
	public String selectOrderDetails(Model model, HttpServletRequest request) {

		return setResponseModel("oms/returnOrdersDetails",model,request);
	}
	

	/**
	 * 
	* @Title: queryReturnOrderDetails
	* @author liyang
	* @date 2017年3月6日上午10:17:18
	* @param vo
	* @return ResponseResult<SaleGoodsOrderVo>
	* @description:获取退货订单详情
	 */
	@RequestMapping(value = "/queryReturnOrderDetails",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ResponseOrderVo> queryReturnOrderDetails(@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOperatorId(getOperatorId());
		return service.queryReturnOrderDetails(vo);
	}
	
	
	/**
	 * 
	* @Title: exportExcel
	* @author liyang
	* @date 2017年3月24日上午11:24:25
	* @param request
	* @param response
	* @param vo void
	* @description:批量导出退货订单信息，请求生成excel文件
	 */
	@Auth
	@ResponseBody
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	public ResponseResult<String> exportExcel(HttpServletRequest request, HttpServletResponse response,
			@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOrderType("20");
		sv.setOperatorId(getOperatorId());
		return service.createReturnGoodsOrderExportExcel(vo);
	}
	
	/**
	 * 
	* @Title: download
	* @author kuangzengye
	* @date 2017年3月17日上午9:26:15
	* @param request
	* @param response
	* @param fileName void
	* @description:下载导出的excel
	 */
	@Auth
	@RequestMapping(value = "/download", method = RequestMethod.GET)
	public void download(HttpServletRequest request, HttpServletResponse response ,String fileName){
		try {
			PoiExcelUtils.download(response,fileName,fileName);
		} catch (Exception e) {
			logger.error("【导出excel下载】，响应异常：{}",e);
		}
	}
	
	/**
	 * 
	* @Title: batchAudit
	* @author liyang
	* @date 2017年3月28日上午11:54:01
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:批量审核
	 */
	@Auth
	@RequestMapping(value = "/batchAudit",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> batchAudit(@RequestBody BatchAuditVo vo) {
		BatchAuditVo sv = (vo != null) ? vo : new BatchAuditVo();
		sv.setModifier(getUserId());
		return service.batchAuditReturnGoodsOrder(sv);
	}
	
	/**
	 * 
	* @Title: updateReturnGoodsOrderRemark
	* @author liyang
	* @date 2017年3月3日下午3:15:00
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:更新退货订单备注
	 */
	@Auth
	@RequestMapping(value = "/updateRemark",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> updateReturnGoodsOrderRemark(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		return service.updateDistributionNote(sv);
	}
	
	/**
	 * 
	* @Title: adoptedReturnOrder
	* @author liyang
	* @date 2017年3月15日上午10:17:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:退货订单审核通过
	 */
	@Auth
	@RequestMapping(value = "/adoptedReturnOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> adoptedReturnOrder(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addReturnOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: refuseReturnOrder
	* @author liyang
	* @date 2017年3月15日下午2:37:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:退货订单审核拒绝
	 */
	@Auth
	@RequestMapping(value = "/refuseReturnOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> refuseReturnOrder(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addReturnOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: adoptedLanshouReturnOrder
	* @author liyang
	* @date 2017年3月15日上午10:17:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:退货订单-配送员确认揽收
	 */
	@Auth
	@RequestMapping(value = "/adoptedLanshouReturnOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> adoptedLanshouReturnOrder(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addReturnOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: refuseLanshouReturnOrder
	* @author liyang
	* @date 2017年3月15日下午2:37:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:退货订单-配送员拒绝揽收
	 */
	@Auth
	@RequestMapping(value = "/refuseLanshouReturnOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> refuseLanshouReturnOrder(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addReturnOrderOperation(sv);
	}
	
	
	/**
	 * 
	* @Title: adoptedFinanceReturnOrder
	* @author liyang
	* @date 2017年3月16日上午10:17:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:退货订单-财务同意退款
	 */
	@Auth
	@RequestMapping(value = "/adoptedFinanceReturnOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> adoptedFinanceReturnOrder(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addReturnOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: refuseFinanceReturnOrder
	* @author liyang
	* @date 2017年3月16日上午10:47:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:退货订单-财务拒绝退款
	 */
	@Auth
	@RequestMapping(value = "/refuseFinanceReturnOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> refuseFinanceReturnOrder(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addReturnOrderOperation(sv);
	}

}

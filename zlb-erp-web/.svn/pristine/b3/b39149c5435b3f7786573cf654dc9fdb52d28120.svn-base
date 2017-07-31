package com.zhilianbao.erp.web.oms.controller;

import java.io.*;
import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.util.SftpUtils;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
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
import com.zhilianbao.erp.common.util.DateFormatUtils;
import com.zhilianbao.erp.common.util.ResourceUtil;
import com.zhilianbao.erp.common.util.datehelp.DateUtils;
import com.zhilianbao.erp.common.util.office.PoiExcelUtils;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.oms.service.IHttpOrderService;
import com.zhilianbao.erp.oms.service.IOrderService;
import com.zhilianbao.erp.oms.vo.BatchAuditVo;
import com.zhilianbao.erp.oms.vo.OrderAddresseeVo;
import com.zhilianbao.erp.oms.vo.OrderGoodsVo;
import com.zhilianbao.erp.oms.vo.OrderInvoiceVo;
import com.zhilianbao.erp.oms.vo.OrderSearchVo;
import com.zhilianbao.erp.oms.vo.OrderStatisticsVo;
import com.zhilianbao.erp.oms.vo.OrderVo;
import com.zhilianbao.erp.oms.vo.ResponseOrderVo;
import com.zhilianbao.erp.web.base.BaseController;

@Controller
@RequestMapping("/orders")
public class OrderController extends BaseController {
	private static Logger logger = LogManager.getLogger(OrderController.class);
	@Reference
	private IOrderService orderService;
	
	@Reference
	private IHttpOrderService IService;
	@Reference
	private ISystemParamService systemParamService;//RPC调用获取全局参数
	
	
	/**
	 * 
	* @Title: homepage
	* @author liyang
	* @date 2017年4月8日上午10:44:32
	* @description:初始化订单首页页面
	 */
	@RequestMapping(value = "/homepage",  method = RequestMethod.GET)
	public String homepage(Model model, HttpServletRequest request) {

		return setResponseModel("oms/ordersHomepage",model,request);
	}
	
	/**
	 * 
	* @Title: homepageData
	* @author liyang
	* @date 2017年4月8日上午10:17:18
	* @param vo
	* @return ResponseResult<OrderStatisticsVo>
	* @description:获取首页初始化数据
	 */
	@RequestMapping(value = "/homepageData",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderStatisticsVo> homepageData(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setOperatorId(getOperatorId());
		return orderService.homepageData(sv);
	}
	
	/**
	 * 
	* @Title: init
	* @author liyang
	* @date 2017年3月2日上午11:44:32
	* @description:初始化销售订单列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("oms/orderList",model,request);
	}

	@ResponseBody
	@RequestMapping(value = "/initDropDownBox",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<Map<String,Object>> initDropDownBox(Model model, HttpServletRequest request) {
		return orderService.initDropDownBox(getOperatorId());
	}
	
	
	/**
	 * 
	* @Title: list
	* @author liyang
	* @date 2017年3月2日上午10:17:18
	* @param vo
	* @return ResponseResult<ResponseOrderVo>
	* @description:分页获取销售订单列表
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<ResponseOrderVo>> list(@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOrderType("10");
		sv.setOperatorId(getOperatorId());
		return orderService.querySaleOrderListByPage(sv);
	}
	
	/**
	 * 
	* @Title: init
	* @author liyang
	* @date 2017年2月27日上午10:16:57
	* @description:初始化进入销售订单详情界面
	 */
	@RequestMapping(value = "/selectOrderDetails",  method = RequestMethod.GET)
	public String selectOrderDetails(Model model, HttpServletRequest request) {

		return setResponseModel("oms/ordersDetails",model,request);
	}
	

	/**
	 * 
	* @Title: details
	* @author liyang
	* @date 2017年3月6日上午10:17:18
	* @param vo
	* @return ResponseResult<SaleGoodsOrderVo>
	* @description:获取订单详情
	 */
	@RequestMapping(value = "/queryOrderDetails",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ResponseOrderVo> queryOrderDetails(@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOperatorId(getOperatorId());
		return orderService.queryOrderDetails(sv);
	}
	
	/**
	 * 
	* @Title: exportExcel
	* @author liyang
	* @date 2017年3月24日上午11:24:25
	* @param request
	* @param response
	* @param vo void
	* @description:批量导出销售订单信息，请求生成excel文件
	 */
	@Auth
	@ResponseBody
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	public ResponseResult<String> exportExcel(HttpServletRequest request, HttpServletResponse response,
		@RequestBody OrderSearchVo vo) {
		long start = System.currentTimeMillis();
		ResponseResult<String> rspResult;
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOrderType("10");
		sv.setOperatorId(getOperatorId());
		rspResult = orderService.createSaleGoodsOrderExportExcel(sv);
		logger.info("【1-1生成excel文件】，响应耗时:{}ms",System.currentTimeMillis() - start);
		return rspResult;
	}
	
	/**
	 * 
	* @Title: download
	* @author liyang
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
			long start = System.currentTimeMillis();
			PoiExcelUtils.download(response,fileName,fileName);
			logger.info("【2-1导出excel下载】，响应耗时:{}ms",System.currentTimeMillis() - start);
		} catch (Exception e) {
			logger.error("【导出excel下载】，响应异常：{}",e);
		}
	}

	/**
	 * 
	* @Title: batchAudit
	* @author liyang
	* @date 2017年3月23日上午11:54:01
	* @param vo
	* @return ResponseResult<OrderVo>
	* @description:销售订单批量审核
	 */
	@Auth
	@RequestMapping(value = "/batchAudit",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> batchAudit(@RequestBody BatchAuditVo vo) {
			BatchAuditVo sv = (vo != null) ? vo : new BatchAuditVo();
			sv.setOperatorId(getOperatorId());
			sv.setModifier(getUserId());
			return  orderService.batchAuditSaleGoodsOrder(sv);
	}
	
	/**
	 * 
	* @Title: updateSaleGoodsOrderRemark
	* @author liyang
	* @date 2017年3月3日下午3:15:00
	* @param vo
	* @return ResponseResult<OrderVo>
	* @description:更新销售订单备注
	 */
	@Auth
	@RequestMapping(value = "/updateRemark",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> updateSaleGoodsOrderRemark(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		return orderService.updateDistributionNote(sv);
	}
	
	/**
	 * 
	* @Title: audit
	* @author liyang
	* @date 2017年3月10日上午10:17:18
	* @param vo
	* @return ResponseResult<SaleGoodsOrderVo>
	* @description:销售订单审核通过
	 */
	@Auth
	@RequestMapping(value = "/auditSaleOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> auditSaleOrder(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return orderService.addOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: userConfirm
	* @author liyang
	* @date 2017年3月10日上午10:17:18
	* @param vo
	* @return ResponseResult<SaleGoodsOrderVo>
	* @description:销售订单用户确认签收
	 */
	@Auth
	@RequestMapping(value = "/userConfirm",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> userConfirm(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return orderService.addOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: saveOMSOrder
	* @author liyang
	* @date 2017年4月5日上午10:17:18
	* @param vo
	* @return ResponseResult<RequestOrderVo>
	* @description:订单录入接口
	 */
//	@RequestMapping(value = "/saveHttpOrder",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public ResponseResult<RequestOrderVo> saveOMSOrder(@RequestBody RequestOrderVo vo){
//		System.out.println("---------------");
//		ResponseResult<RequestOrderVo>  result=new ResponseResult<RequestOrderVo> ();
//		IService.saveHttpOrder(vo.getOrderInfo(), vo.getOrderAddressee(), vo.getGoodsList(), vo.getOrderInvoice());
//		return result;
//	}

}

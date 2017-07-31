package com.zhilianbao.erp.web.oms.controller;

import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.parameter.ISystemParamService;
import com.zhilianbao.erp.auth.vo.parameter.rpc.DictVo;
import com.zhilianbao.erp.common.annotation.Auth;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.util.DateFormatUtils;
import com.zhilianbao.erp.common.util.ResourceUtil;
import com.zhilianbao.erp.common.util.datehelp.DateUtils;
import com.zhilianbao.erp.common.util.office.PoiExcelUtils;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.oms.service.IExchangeGoodsOrderService;
import com.zhilianbao.erp.oms.service.IOrderService;
import com.zhilianbao.erp.oms.vo.AcceptSingleResultVo;
import com.zhilianbao.erp.oms.vo.AcceptSingleVo;
import com.zhilianbao.erp.oms.vo.BatchAuditVo;
import com.zhilianbao.erp.oms.vo.OrderGoodsVo;
import com.zhilianbao.erp.oms.vo.OrderInvoiceVo;
import com.zhilianbao.erp.oms.vo.OrderSearchVo;
import com.zhilianbao.erp.oms.vo.OrderVo;
import com.zhilianbao.erp.oms.vo.ResponseOrderVo;
import com.zhilianbao.erp.web.base.BaseController;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年4月5日下午3:05:53
 * @description:换货订单控制类
 */
@Controller
@RequestMapping("/orderManage/exchangeGoodsOrder")
public class ExchangeGoodsOrderController extends BaseController {

	private static Logger logger = LogManager.getLogger(OrderController.class);

	@Reference
	private IOrderService orderService;
	
	@Reference
	private IExchangeGoodsOrderService service;
	@Reference
	private ISystemParamService systemParamService;//RPC调用获取全局参数
	
	/**
	 * 
	* @Title: init
	* @author kuangzengye
	* @date 2017年3月2日上午11:44:32
	* @description:初始化换货订单列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(ModelAndView mv,Model model, HttpServletRequest request) {
		return setResponseModel("oms/exchangeGoodsOrderList",model,request);
	}
	
	@ResponseBody
	@RequestMapping(value = "/initDropDownBox",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<Map<String,Object>> initDropDownBox(Model model, HttpServletRequest request) {
		return orderService.initDropDownBox(getOperatorId());
	}
	
	
	/**
	 * 
	* @Title: list
	* @author kuangzengye
	* @date 2017年3月2日上午10:17:18
	* @param vo
	* @return ResponseResult<ExchangeGoodsOrderVo>
	* @description:分页获取换货订单列表
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<ResponseOrderVo>> list(@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOrderType("30");
		sv.setOperatorId(getOperatorId());
		return service.queryExchangeGoodsOrderListByPage(sv);
	}
		
	/**
	 * 
	* @Title: selectReturnOrderDetails
	* @author liyang
	* @date 2017年3月16日下午7:16:57
	* @description:初始化换货订单详情页面
	 */
	@RequestMapping(value = "/selectExchangeOrdersDetails",  method = RequestMethod.GET)
	public String selectOrderDetails(Model model, HttpServletRequest request) {

		return setResponseModel("oms/exchangeOrdersDetails",model,request);
	}
	

	/**
	 * 
	* @Title: details
	* @author liyang
	* @date 2017年3月6日上午10:17:18
	* @param vo
	* @return ResponseResult<SaleGoodsOrderVo>
	* @description:获取换货订单详情
	 */
	@RequestMapping(value = "/queryExchangeOrderDetails",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ResponseOrderVo> queryExchangeOrderDetails(@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOperatorId(getOperatorId());
		return service.queryExchangeOrderDetails(sv);
	}
	
	
	/**
	 * 
	* @Title: adoptedExchangeGoods
	* @author liyang
	* @date 2017年3月15日上午10:17:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:换货订单-同意换货
	 */
	@Auth
	@RequestMapping(value = "/adoptedExchangeGoods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> adoptedExchangeGoods(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addExchangeOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: refuseExchangeGoods
	* @author liyang
	* @date 2017年3月15日下午2:37:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:换货订单-拒绝换货
	 */
	@Auth
	@RequestMapping(value = "/refuseExchangeGoods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> refuseExchangeGoods(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addExchangeOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: adoptedLanshou
	* @author liyang
	* @date 2017年3月15日上午10:17:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:换货订单-配送员确认揽收
	 */
	@Auth
	@RequestMapping(value = "/adoptedLanshou",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> adoptedLanshou(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addExchangeOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: refuseLanshou
	* @author liyang
	* @date 2017年3月15日下午2:37:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:换货订单-配送员拒绝揽收
	 */
	@Auth
	@RequestMapping(value = "/refuseLanshou",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> refuseLanshou(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addExchangeOrderOperation(sv);
	}
	
	
	/**
	 * 
	* @Title: adoptedSign
	* @author liyang
	* @date 2017年3月16日上午10:17:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:换货订单-用户同意签收
	 */
	@Auth
	@RequestMapping(value = "/adoptedSign",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> adoptedSign(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addExchangeOrderOperation(sv);
	}
	
	/**
	 * 
	* @Title: refuseFinanceExchangeOrder
	* @author liyang
	* @date 2017年3月16日上午10:47:18
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:换货订单-用户拒绝签收
	 */
	@Auth
	@RequestMapping(value = "/refuseSign",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> refuseSign(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		sv.setOperatorId(getOperatorId());
		return service.addExchangeOrderOperation(sv);
	}

	/**
	 * 
	* @Title: updateExchangeGoodsOrderRemark
	* @author kuangzengye
	* @date 2017年3月3日下午3:15:00
	* @param vo
	* @return ResponseResult<OmsOrderVo>
	* @description:更新换货订单备注
	 */
	@Auth
	@RequestMapping(value = "/updateRemark",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<OrderVo> updateExchangeGoodsOrderRemark(@RequestBody OrderVo vo) {
		OrderVo sv = (vo != null) ? vo : new OrderVo();
		sv.setModifier(getUserId());
		return orderService.updateDistributionNote(sv);
	}
	
	/**
	 * 
	* @Title: batchAudit
	* @author kuangzengye
	* @date 2017年3月23日上午11:54:01
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
		return service.batchAuditExchangeGoodsOrder(sv);
	}
	
	/**
	 * 
	* @Title: batchPrint
	* @author kuangzengye
	* @date 2017年4月18日下午7:58:02
	* @param ids
	* @description:批量打印
	 */
	@Auth
	@RequestMapping(value = "/batchPrint",  method = RequestMethod.GET)
	public String batchPrint(@RequestParam(value = "ids", required = true)String ids,Model model) {

		String[] idArray = ids.split(",");
		//获取运营商Id
		long operatorId = getOperatorId()==0L?1L:getOperatorId();
		ResponseResult<AcceptSingleResultVo> batchPrintResult = service.batchPrintExchangeGoodsOrder(idArray,operatorId);
		
		//获取揽收单数据
		List<AcceptSingleVo> list = batchPrintResult.getData().getAcceptSingleList();
		//获取运营商信息
		AcceptSingleVo data = batchPrintResult.getData().getAcceptSingle();
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(list);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptAcceptSingle.jasper");
		model.addAttribute("format", "pdf"); // 报表格式
		model.addAttribute("jrMainDataSource", jrDataSource);
		
		//传入自定义的参数
		model.addAttribute("appUrl", data.getAppUrl());//TODO
		model.addAttribute("operatorName", data.getOperatorName());
		model.addAttribute("operatorAddress", data.getOperatorAddress());
		
		return "iReportView"; // 对应jasper-defs.xml中的bean id
	}
	
	/**
	 * 
	* @Title: exportExcel
	* @author kuangzengye
	* @date 2017年3月16日上午11:24:25
	* @param request
	* @param response
	* @param vo void
	* @description:批量导出换货订单信息，请求生成excel文件
	 */
	@Auth
	@ResponseBody
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	public ResponseResult<String> exportExcel(HttpServletRequest request, HttpServletResponse response,
		@RequestBody OrderSearchVo vo) {
		OrderSearchVo sv = (vo != null) ? vo : new OrderSearchVo();
		sv.setOrderType("30");
		sv.setOperatorId(getOperatorId());
		return service.createExchangeGoodsOrderExportExcel(sv);
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


}

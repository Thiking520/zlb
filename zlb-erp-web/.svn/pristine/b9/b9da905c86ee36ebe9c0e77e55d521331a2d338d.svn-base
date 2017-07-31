package com.zhilianbao.erp.web.pms.controller;

import java.io.File;
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
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IPurchaseGoodsService;
import com.zlb.erp.pms.core.api.service.IPurchaseService;
import com.zlb.erp.pms.core.api.vo.PmsPrintPurchaseGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
@RequestMapping("/purchase")
public class PurchaseController extends BaseController {
	
	Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	private IPurchaseService purchaseService;
	
	@Reference
	private IPurchaseGoodsService purchaseGoodsService;
			
//	@Reference
//	private IHttpOrderService IService;
	
	/**
	 * 
	* @Title: init
	* @author luliang
	* @date 2017年4月1日
	* @description:初始化换货订单列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {

		return setResponseModel("pms/purchase/purchaseList",model,request);
	}
	
	
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseVo> list(@RequestBody PmsPurchaseSearchVo vo) {
		
		PmsPurchaseSearchVo sv = (vo != null) ? vo : new PmsPurchaseSearchVo();
		sv.setOperatorId(getOperatorId().toString());
		return purchaseService.queryPurchaseListByPage(sv); 
	}
	
	@RequestMapping(value = "/goods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseGoodsVo> goods(@RequestBody PmsPurchaseGoodsSearchVo vo) {
		
		PmsPurchaseGoodsSearchVo sv = (vo != null) ? vo : new PmsPurchaseGoodsSearchVo();
		
		return purchaseGoodsService.queryPurchaseGoodsByPage(sv); 
	}
	
	@RequestMapping(value = "/detail",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseVo> detail(@RequestBody PmsPurchaseVo vo) {
		return purchaseService.getPurchaseDetail(vo); 
	}
	
	/**
	 * @Title: detail 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<PmsPurchaseVo>    返回类型 
	 * @Description:要货单
	 */
	@RequestMapping(value = "/enquiryBill",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseVo> enquiryBill(@RequestBody PmsPurchaseVo vo) {
		return purchaseService.getEnquiryBillPurchaseDetail(vo); 
	}
	
	@RequestMapping(value = "/start",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseVo> start(@RequestBody PmsPurchaseVo vo) {
		
		vo.setOperatorId(getOperatorId().toString());
		vo.setOperatorName(getSelfOperatorName());
		vo.setPurchaseBeginer(getUserName());
		vo.setCreator(getUserName());
		return purchaseService.startPurchase(vo); 
	}
	
	@RequestMapping(value = "/change",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseVo> change(@RequestBody PmsPurchaseVo vo) {
		return purchaseService.changePurchase(vo); 
	}
	

	@RequestMapping(value = "/audit/init",  method = RequestMethod.GET)
	public String auditInit(Model model, HttpServletRequest request) {
		return setResponseModel("pms/plan/purchaseAudit",model,request);
	}
	
	
	@RequestMapping(value = "/audit/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseVo> audit(@RequestBody PmsPurchaseSearchVo vo) {
		
		PmsPurchaseSearchVo sv = (vo != null) ? vo : new PmsPurchaseSearchVo();
		
		return purchaseService.queryPurchaseListByPage(sv); 
	}

	@RequestMapping(value = "/print/printPurchase",  method = RequestMethod.GET)
	public String printPurchase(@RequestParam(value = "ids", required = true)String ids,Model model) {
		LOGGER.info("上架清单打印请求参数json：{}", ids);
		String[] idArray = ids.split(",");

		List<PmsPrintPurchaseGoodsVo> batchPrintResult = purchaseService.printPurchase(idArray);
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptPurchase.jasper");
		model.addAttribute("format", "pdf"); // 报表格式
		model.addAttribute("jrMainDataSource", jrDataSource);
		
		//传入自定义的参数
		//动态获取jasper目录路径
		String jasperPath =  System.getProperty(Constants.WEB_ROOT) + 
				"WEB-INF"+File.separator+"jasper"+File.separator;
		//传递子报表目录路径
		model.addAttribute("SUBREPORT_DIR",jasperPath);
		return "iReportView"; // 对应jasper-defs.xml中的bean id
	}
	
	@RequestMapping(value = "/print/printPurchaseRequire",  method = RequestMethod.GET)
	public String printPurchaseRequire(@RequestParam(value = "ids", required = true)String ids,Model model) {
		LOGGER.info("上架清单打印请求参数json：{}", ids);
		String[] idArray = ids.split(",");

		List<PmsPrintPurchaseGoodsVo> batchPrintResult = purchaseService.printPurchase(idArray);
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptPurchaseRequire.jasper");
		model.addAttribute("format", "pdf"); // 报表格式
		model.addAttribute("jrMainDataSource", jrDataSource);
		
		//传入自定义的参数
		//动态获取jasper目录路径
		String jasperPath =  System.getProperty(Constants.WEB_ROOT) + 
				"WEB-INF"+File.separator+"jasper"+File.separator;
		//传递子报表目录路径
		model.addAttribute("SUBREPORT_DIR",jasperPath);
		return "iReportView"; // 对应jasper-defs.xml中的bean id
	}
}

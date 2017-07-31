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
import com.zlb.erp.pms.core.api.service.IFinancialService;
import com.zlb.erp.pms.core.api.service.IPurchaseGoodsService;
import com.zlb.erp.pms.core.api.service.IPurchaseService;
import com.zlb.erp.pms.core.api.vo.BatchVo;
import com.zlb.erp.pms.core.api.vo.PmsChecksheetCreateVo;
import com.zlb.erp.pms.core.api.vo.PmsChecksheetSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsChecksheetVo;
import com.zlb.erp.pms.core.api.vo.PmsPrintChecksheetVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.WmsOperationPrintVo;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
@RequestMapping("/financial")
public class FinancialController extends BaseController {
	
	Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	private IPurchaseService purchaseService;
	
	@Reference
	private IFinancialService financialService;
	
	@Reference
	private IPurchaseGoodsService purchaseGoodsService;
			
	/**
	 * 
	* @Title: init
	* @author luliang
	* @date 2017年4月1日
	* @description:初始化换货订单列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {

		return setResponseModel("pms/financial/financialList",model,request);
	}
	
	
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseVo> list(@RequestBody PmsPurchaseSearchVo vo) {
		
		PmsPurchaseSearchVo sv = (vo != null) ? vo : new PmsPurchaseSearchVo();
		vo.setOperatorId(getOperatorId().toString());
		return purchaseService.queryPurchaseListByPage(sv); 
	}
	
	@RequestMapping(value = "/goods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsPurchaseGoodsVo> goods(@RequestBody PmsPurchaseGoodsSearchVo vo) {
		
		PmsPurchaseGoodsSearchVo sv = (vo != null) ? vo : new PmsPurchaseGoodsSearchVo();
		
		return purchaseGoodsService.queryPurchaseGoodsByPage(sv); 
	}
	
	@RequestMapping(value = "/preparePrint",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<PmsPurchaseVo>> queryPurchaseByIds(@RequestBody BatchVo vo) {
		
		vo = (vo != null) ? vo : new BatchVo();
		
		vo.setUserName(getUserName());
		
		ResponseResult<List<PmsPurchaseVo>> res = financialService.queryPurchaseByIds(vo); 
		
		return res; 
	}
	
	@ResponseBody
	@RequestMapping(value = "/payCheckSheet",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<String> payCheckSheet(@RequestBody PmsChecksheetVo vo){
		ResponseResult<String> rsult= financialService.payCheckSheet(vo);
		return rsult;
	}

	
	@ResponseBody
	@RequestMapping(value = "/createcheckSheet",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<String> createcheckSheet(@RequestBody PmsChecksheetCreateVo vo){
		vo.setOperatorId(getOperatorId());
		vo.setCreator(getUserName());
		ResponseResult<String> rsult= financialService.createcheckSheet(vo);
		return rsult;
	}
	
	/**
	* @Title: init
	* @author luliang
	* @date 2017年4月1日
	* @description:初始化对账单列表页面
	 */
	@RequestMapping(value = "/checkinit",  method = RequestMethod.GET)
	public String checkinit(Model model, HttpServletRequest request) {
		//financial/checkinit
		return setResponseModel("pms/financial/checkList",model,request);
	}
	
	@RequestMapping(value = "/checklist",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsChecksheetVo> checklist(@RequestBody PmsChecksheetSearchVo vo) {
		vo.setOperatorId(getOperatorId());
		return financialService.queryChecklistByPage(vo); 
	}
	
	
	@RequestMapping(value = "/checklistDetail",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsChecksheetSearchVo> checklistDetail(@RequestBody PmsChecksheetSearchVo vo) {
		ResponseResult<PmsChecksheetSearchVo> res = financialService.checklistDetail(vo); 
		return res; 
	}
	
	
	@RequestMapping(value = "/printChecklistDetail",  method = RequestMethod.GET)
	public String printChecklistDetail(@RequestParam(value = "checkSheetCode", required = true)String checkSheetCode,Model model) {
		LOGGER.info("打印对账单打印请求参数json：{}", checkSheetCode);
		//获取运营商Id
		List<PmsPrintChecksheetVo> batchPrintResult = financialService.printChecklistDetail(checkSheetCode);
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptFinance.jasper");
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

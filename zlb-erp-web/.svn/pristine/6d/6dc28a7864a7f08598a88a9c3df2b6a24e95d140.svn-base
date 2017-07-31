package com.zhilianbao.erp.web.wms.controller.storagein;

import java.io.File;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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
import com.zhilianbao.erp.auth.service.parameter.ISystemParamService;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.web.base.BaseController;
import com.zhilianbao.erp.web.wms.util.ExcelTitleMap;
import com.zhilianbao.erp.web.wms.util.ExportToExcelUtil;
import com.zlb.erp.wms.core.api.service.IWmsOperationBilService;
import com.zlb.erp.wms.core.api.vo.OperationRecordVo;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.ResultEnum;
import com.zlb.erp.wms.core.api.vo.WmsOperationBillSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsOperationBillVo;
import com.zlb.erp.wms.core.api.vo.WmsOperationDetailRecord;
import com.zlb.erp.wms.core.api.vo.WmsOperationDetailVo;
import com.zlb.erp.wms.core.api.vo.WmsOperationPrintVo;
import com.zlb.erp.wms.core.api.vo.WmsOperationRecordVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInSearchVo;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import tk.mybatis.mapper.util.StringUtil;

/**

/**
 * 
* @Title: WmsStorageInController
* @author liushilei
* @date 2017年4月10日下午5:53:36
* @description:上架作业单
 */
@Controller
@RequestMapping("wms/operationbill")
public class OperationBillController extends BaseController{
	
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	@Reference
	private ISystemParamService systemParamService;//RPC调用获取全局参数
	@Reference
	private IWmsOperationBilService wmsOperationBilService;
	
	/**
	 * 页面初始化跳转
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/storagein/operationbillList",model,request);
	}
	
	/**
	 * 上架作业列表页查询
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsOperationBillVo> list(@RequestBody WmsOperationBillSearchVo searchVo) throws Exception{
		LOGGER.info("上架作业列表查询数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId()+"";
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsOperationBillVo> responseResult = wmsOperationBilService.queryWmsOperationBilListByPage(searchVo);
		LOGGER.info("上架作业列表查询,返回的参数json：{}", responseResult);
		return responseResult;
	}
	/**
	 * 上架列表
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/operationbillDetail",  method = RequestMethod.GET)
	public String operationbillDetail(Model model, HttpServletRequest request){
		return setResponseModel("wms/storagein/operationbillDetail",model,request);
	}
	/**
	 * 上架列表基本信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getInfo")
	@ResponseBody
	public ResponseResult<WmsOperationBillVo> getInfo(String id){
		LOGGER.info("上架列表基本信息请求参数json：{}", id);
		if(StringUtil.isNotEmpty(id)){
			String operatorId= getOperatorId()+"";
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("id", id);
			ResponseResult<WmsOperationBillVo> responseResult = wmsOperationBilService.queryOperationBillById(param);	
			LOGGER.info("上架列表基本信息返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsOperationBillVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	/**
	 * 计划明细
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getPlanDetail")
	@ResponseBody
	public ResponseResult<WmsOperationDetailVo> getPlanDetail(String id){
		LOGGER.info("上架列表基本信息请求参数json：{}", id);
		if(StringUtil.isNotEmpty(id)){
			String operatorId= getOperatorId()+"";
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("id", id);
			ResponseResult<WmsOperationDetailVo> responseResult = wmsOperationBilService.getPlanDetail(param);	
			LOGGER.info("上架列表基本信息返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsOperationDetailVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	/**
	 * 作业记录
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getOperateRecord")
	@ResponseBody
	public ResponseResult<WmsOperationRecordVo> getOperateRecord(String id){
		LOGGER.info("作业记录请求参数json：{}", id);
		if(StringUtil.isNotEmpty(id)){
			String operatorId= getOperatorId()+"";
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("id", id);
			ResponseResult<WmsOperationRecordVo> responseResult = wmsOperationBilService.getOperateRecord(param);	
			LOGGER.info("作业记录返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsOperationRecordVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	
	/**
	 * 上架列表页查询 (收货界面)
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/operationbilllist",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsOperationDetailRecord> operationbilllist(@RequestBody WmsStorageInSearchVo searchVo) throws Exception{
		LOGGER.info("上架列表页查询 (收货界面),请求参数json：{}", searchVo);
		String operatorId= getOperatorId()+"";
		searchVo.setOperatorCode(operatorId);
		ResponseResult<WmsOperationDetailRecord> responseResult = wmsOperationBilService.queryOperationbilllist(searchVo);
		LOGGER.info("上架作业列表查询,返回的参数json：{}", responseResult);
		return responseResult;
	}
	

	/**
	 * 生成上架作业单
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/createOperationBill",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsOperationBillVo> createOperationBill(String ids) throws Exception{
		LOGGER.info("生成上架作业单请求参数json：{}", ids);
		if(StringUtil.isNotEmpty(ids)){
			String[] storageIds = ids.split(",");
			String operatorId= getOperatorId()+"";
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("ids", storageIds);
			param.put("modifier", getUserName());
			ResponseResult<WmsOperationBillVo> responseResult = wmsOperationBilService.createOperationBill(param);	
			LOGGER.info("生成上架作业单返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsOperationBillVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	
	 /**
     * 分派上架作业单
     * @param
     * @return
     */
    @RequestMapping(value = "/pickIsSate",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsOperationBillVo> pickIsSate(String ids,String pickName) {
        if(StringUtils.isNotEmpty("ids")){
            String[] confrimIds = ids.split(",");
            String operatorId= getOperatorId()+"";
            Map<String,Object> param = new HashMap<String,Object>();
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            param.put("pickName",pickName);
            param.put("modifier", getUserName());
            return wmsOperationBilService.pickIsStateFp(param);
        }else
        {
            return new ResponseResult<WmsOperationBillVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }
    
	/**
	 *领取上架作业单
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/signOperationBill",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsOperationBillVo> signOperationBill(String ids) throws Exception{
		LOGGER.info("领取上架作业单请求参数json：{}", ids);
		if(StringUtil.isNotEmpty(ids)){
			String[] storageIds = ids.split(",");
			String operatorId= getOperatorId()+"";
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("ids", storageIds);
			param.put("modifier", getUserName());
			ResponseResult<WmsOperationBillVo> responseResult = wmsOperationBilService.signOperationBill(param);	
			LOGGER.info("领取上架作业单返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsOperationBillVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	
	
	/**
	 * 确认完成作业
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/confirmFinishOperate",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsOperationBillVo> confirmFinishOperate(String ids) throws Exception{
		LOGGER.info("确认完成作业请求参数json：{}", ids);
		if(StringUtil.isNotEmpty(ids)){
			String[] storageIds = ids.split(",");
			String operatorId= getOperatorId()+"";
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("ids", storageIds);
			param.put("modifier", getUserName());
			ResponseResult<WmsOperationBillVo> responseResult = wmsOperationBilService.confirmFinishOperate(param);	
			LOGGER.info("确认完成作业返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsOperationBillVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	/**
	 * 保存作业记录操作
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/submitOperate", method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsOperationRecordVo> submitOperate(@RequestBody OperationRecordVo operationRecordVo){
		LOGGER.info("作业记录请求参数json：{}", operationRecordVo);
		if(operationRecordVo!=null && operationRecordVo.getOperationRow()!=null && operationRecordVo.getBillNo()!=null ){
			if( operationRecordVo.getOperationQty() !=null && !operationRecordVo.getOperationQty().equals(BigDecimal.ZERO) && StringUtils.isNoneEmpty(operationRecordVo.getActualLocation()) ){
				operationRecordVo.setCreator(getUserName());
				operationRecordVo.setOperatorCode(getOperatorId()+"");
				ResponseResult<WmsOperationRecordVo> responseResult = wmsOperationBilService.submitOperate(operationRecordVo);	
				LOGGER.info("作业记录返回的参数json：{}", responseResult);
				return responseResult;
			}else{
				return new ResponseResult<WmsOperationRecordVo>(ResultEnum.ILLEGAL_PARAM);
			}
		}else{
			return new ResponseResult<WmsOperationRecordVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	/**
	 * 批量导出
	 * @param request
	 * @param response
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	public void exportExcel(WmsOperationBillSearchVo searchVo,HttpServletResponse response,HttpServletRequest request) {
		LOGGER.info("导出上架作业单数据，请求参数json：{}", searchVo);
		try {
			long operatorId= getOperatorId();
			searchVo.setOperatorCode(String.valueOf(operatorId));
			searchVo.setWarehouseCode(getCookieWCode());
			String fileName = "上架作业单列表";
			fileName=fileName+".xls";
			 String userAgent = request.getHeader("User-Agent");
	         byte[] bytes = userAgent.contains("MSIE") ? fileName.getBytes() : fileName.getBytes("UTF-8"); // name.getBytes("UTF-8")处理safari的乱码问题
	         fileName = new String(bytes, "ISO-8859-1"); // 各浏览器基本都支持ISO编码
	         response.setHeader("Content-disposition", String.format("attachment; filename=\"%s\"", fileName)); 
			//PoiExcelUtils.setDownFileCommonHttpHeader(response,fileName,request);
			List<WmsOperationBillVo>  datas=  wmsOperationBilService.queryOperationBillExportExcel(searchVo);
			ExportToExcelUtil.writeExecl(datas, ExcelTitleMap.OPERATIONBILL_STORTITLE, fileName, response.getOutputStream());	
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("上架作业单导出出错json：{}"+e.getMessage());
		}
	}
	/**
	 * 
	* @Title: operationBillBatchPrint 
	* @author yp
	* @date 2017年4月12日上午9:36:18
	* @param ids
	* @description:上架清单打印
	 */
	@RequestMapping(value = "/print/operation",  method = RequestMethod.GET)
	public String operationBillBatchPrint(@RequestParam(value = "ids", required = true)String ids,Model model) {
		LOGGER.info("上架清单打印请求参数json：{}", ids);
		String[] idArray = ids.split(",");
		//获取运营商Id
		String operatorId = getOperatorId().toString();
		List<WmsOperationPrintVo> batchPrintResult = wmsOperationBilService.operationBillBatchPrint(idArray,operatorId);
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptShelves.jasper");
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

package com.zhilianbao.erp.web.wms.controller.storagein;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
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
import com.zhilianbao.erp.common.util.office.PoiExcelUtils;
import com.zhilianbao.erp.web.base.BaseController;
import com.zhilianbao.erp.web.wms.util.ExcelTitleMap;
import com.zhilianbao.erp.web.wms.util.ExportToExcelUtil;
import com.zlb.erp.wms.core.api.service.IWmsStorageInService;
import com.zlb.erp.wms.core.api.vo.DeliveryOrderStatisticsVo;
import com.zlb.erp.wms.core.api.vo.PurchaseVo;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.ResultEnum;
import com.zlb.erp.wms.core.api.vo.TakeGoodsVo;
import com.zlb.erp.wms.core.api.vo.WmsPrintStorageDetailVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInDetailVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInTransactionVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInVo;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import tk.mybatis.mapper.util.StringUtil;
/**

/**
 * 
* @Title: WmsStorageInController
* @author liushilei
* @date 2017年4月10日下午5:53:36
* @description:入库管理模块
 */
@Controller
@RequestMapping("wms/storagein")
public class StorageInController extends BaseController{
protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	@Reference
	private ISystemParamService systemParamService;//RPC调用获取全局参数
	@Reference
	private IWmsStorageInService storageInService;
	/**
	 * 页面初始化跳转
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("wms/storagein/storageInList",model,request);
	}
	
	/**
	 * 采购订单(pmp/oms)数据的同步
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/syncPurchase",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<PurchaseVo> syncPurchase(PurchaseVo purchaseVo){
		LOGGER.info("入库分页查询数据,请求参数json：{}", purchaseVo);
		ResponseResult<PurchaseVo> responseResult = storageInService.syncPurchase(purchaseVo);
		LOGGER.info("入库分页查询数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 收货操作
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/takegoodsOperate",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<TakeGoodsVo> takegoodsOperate(@RequestBody TakeGoodsVo takeGoodsVo){
		LOGGER.info("收货操作请求参数json：{}", takeGoodsVo);
		if(takeGoodsVo!=null && StringUtils.isNotEmpty(takeGoodsVo.getId())){
			boolean qtyIsNull = takeGoodsVo.getSkuQty()==null && takeGoodsVo.getBrokenQty()==null && takeGoodsVo.getRefuseQty()==null ; 
			if(qtyIsNull){
				return new ResponseResult<TakeGoodsVo>(ResultEnum.ILLEGAL_PARAM);
			}
			takeGoodsVo.setCreator(getUserName());
			takeGoodsVo.setModifier(getUserName());
			takeGoodsVo.setDeName(getUserName());
			takeGoodsVo.setOperatorCode(String.valueOf(getOperatorId()));
			takeGoodsVo.setWarehouseCode(getCookieWCode());
			ResponseResult<TakeGoodsVo> responseResult = storageInService.takegoodsOperate(takeGoodsVo);
			LOGGER.info("收货操作返回的参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<TakeGoodsVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	/**
	 * 入库列表页查询
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInVo> list(@RequestBody WmsStorageInSearchVo searchVo) throws Exception{
		LOGGER.info("入库分页查询数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId()+"";
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsStorageInVo> responseResult = storageInService.queryStorageInListByPage(searchVo);
		LOGGER.info("入库分页查询数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 入库详情页查询
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/storageinDetailList",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInDetailVo> storageinDetailList(@RequestBody WmsStorageInSearchVo searchVo) throws Exception{
		LOGGER.info("入库分页查询数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId().toString();
		searchVo.setOperatorCode(operatorId);
		searchVo.setWarehouseCode(getCookieWCode());
		ResponseResult<WmsStorageInDetailVo> responseResult = storageInService.queryStorageInDetailListByPage(searchVo);
		LOGGER.info("入库分页查询数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 入库确认操作
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/confirmStorIn",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInVo> confirmStorIn(String ids) throws Exception{
		LOGGER.info("入库确认请求参数json：{}", ids);
		if(StringUtil.isNotEmpty(ids)){
			String[] confrimIds = ids.split(",");
			String operatorId= getOperatorId().toString();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("ids", confrimIds);
			param.put("modifier", getUserName());
			ResponseResult<WmsStorageInVo> responseResult = storageInService.confirmWmsStorageIn(param);	
			LOGGER.info("入库确认返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsStorageInVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}


	/**
	 * 收货完成
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/takegoodsFinished",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInDetailVo> takegoodsFinished(String id) throws Exception{
		LOGGER.info("收货完成请求参数json：{}", id);
		if(StringUtil.isNotEmpty(id)){
			String operatorId= getOperatorId().toString();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("id", id);
			ResponseResult<WmsStorageInDetailVo> responseResult = storageInService.takegoodsFinished(param);	
			LOGGER.info("收货完成返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsStorageInDetailVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}

	/**
	 * 入库入账操作
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/takeAccount",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInVo> takeAccount(String ids,String isContinue) throws Exception{
		LOGGER.info("入库入账请求参数json：{}", ids);
		if(StringUtil.isNotEmpty(ids)){
			String operatorId= getOperatorId().toString();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("ids", ids.split(","));
			param.put("isContinue", isContinue);
			param.put("modifier", getUserName());
			ResponseResult<WmsStorageInVo> responseResult = storageInService.takeAccount(param);	
			LOGGER.info("入库入账返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsStorageInVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	
	 /**
     * 分派入库单
     * @param
     * @return
     */
    @RequestMapping(value = "/pickIsSate",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsStorageInVo> pickIsSate(String ids,String pickEmpCode,String pickName) {
        if(StringUtils.isNotEmpty("ids")){
            String[] confrimIds = ids.split(",");
            String operatorId= getOperatorId()+"";
            Map<String,Object> param = new HashMap<String,Object>();
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            param.put("pickEmpCode",pickEmpCode);
            param.put("pickName",pickName);
            param.put("modifier", getUserName());
            return storageInService.pickIsStateFp(param);
        }else
        {
            return new ResponseResult<WmsStorageInVo>(ResultEnum.ILLEGAL_PARAM);
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
	@ResponseBody
	public void exportExcel(WmsStorageInSearchVo searchVo) {
		LOGGER.info("导出入库数据，请求参数json：{}", searchVo);
		try {
			long operatorId= getOperatorId();
			searchVo.setOperatorCode(String.valueOf(operatorId));
			searchVo.setWarehouseCode(getCookieWCode());
			String fileName = "入库订单列表";
			PoiExcelUtils.setDownFileCommonHttpHeader(response,fileName,request);
			List<WmsStorageInVo>  datas=  storageInService.queryStorageInExportExcel(searchVo);
			ExportToExcelUtil.writeExecl(datas, ExcelTitleMap.STORTITLE, fileName, response.getOutputStream());
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("导出入库数据出错json：{}"+e.getMessage());
		}
			
	}
	/**
	 * 批量导出
	 * @param request
	 * @param response
	 * @param vo
	 * @return
	 *//*
	@Deprecated
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<String> exportExcel(@RequestBody WmsStorageInSearchVo searchVo) {
		LOGGER.info("导出入库数据，请求参数json：{}", searchVo);
		ResponseResult<String> responseResult = new  ResponseResult<String>();
		try {
			long operatorId= getOperatorId();
			searchVo.setOperatorCode(String.valueOf(operatorId));
			searchVo.setWarehouseCode(getCookieWCode());
			String filePath = systemParamService.getParamValue(operatorId, Constants.EXCEL_EXPORT_FILE_LOCATION).getData();
			if(StringUtils.isEmpty(filePath)){
				responseResult.failure("001", "临时文件目录不存在");
			}else{
				List<WmsStorageInVo>  datas=  storageInService.queryStorageInExportExcel(searchVo);
				String fileName = ExportToExcelUtil.writeExecl(datas, ExcelTitleMap.STORTITLE, filePath,"入库上架列表");	
				responseResult.setData(fileName);
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.info("导出入库出错json：{}", e.getMessage());
			return responseResult.err();
		}
		return responseResult;
	}*/
	/**
	 * 下载导出的excel
	 * @param request
	 * @param response
	 * @param fileName
	 */
	@RequestMapping(value = "/download", method = RequestMethod.GET)
	@ResponseBody
	public void download(HttpServletRequest request, HttpServletResponse response ,String fileName){
		try {
			Long operatorId = getOperatorId();
			String filePath =systemParamService.getParamValue(operatorId, Constants.EXCEL_EXPORT_FILE_LOCATION).getData()+"/"+fileName;
			Workbook wb = WorkbookFactory.create(new FileInputStream(filePath));//通过fileName获取excel
			fileName=fileName+".xls";
			String userAgent = request.getHeader("User-Agent");
	        byte[] bytes = userAgent.contains("MSIE") ? fileName.getBytes() : fileName.getBytes("UTF-8"); // name.getBytes("UTF-8")处理safari的乱码问题
	        fileName = new String(bytes, "ISO-8859-1"); // 各浏览器基本都支持ISO编码
	        response.setHeader("Content-disposition", String.format("attachment; filename=\"%s\"", fileName)); 
	        wb.write(response.getOutputStream());
			wb.close();
			//PoiExcelUtils.writeWorkbook(response, wb,fileName);
		} catch (EncryptedDocumentException e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		} catch (InvalidFormatException e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		}
	}
	/**
	 * 收货页面基本信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getInfo")
	@ResponseBody
	public ResponseResult<WmsStorageInVo> getInfo(String id){
		LOGGER.info("入库入账请求参数json：{}", id);
		if(StringUtil.isNotEmpty(id)){
			String operatorId= getOperatorId().toString();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("id", id);
			ResponseResult<WmsStorageInVo> responseResult = storageInService.queryStorageInById(param);	
			LOGGER.info("入库入账返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsStorageInVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	
	/**
	 * 收货页面基本信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/takegoodsInfo",  method = RequestMethod.GET)
	public String takegoodsInfo(Model model, HttpServletRequest request){
		return setResponseModel("wms/storagein/takegoodsInfo",model,request);
	}

	/**
	 * 入库订单关闭操作
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/colseOrder",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInVo> colseOrder(String id) throws Exception{
		LOGGER.info("入库订单关闭请求参数json：{}", id);
		if(StringUtil.isNotEmpty(id)){
			String operatorId= getOperatorId().toString();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("userName", getUserName());
			param.put("id", id);
			ResponseResult<WmsStorageInVo> responseResult = storageInService.colseOrder(param);	
			LOGGER.info("入库订单关闭返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsStorageInVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	/**
	 * 入库订单取消操作
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/cancelOrder",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInVo> cancelOrder(String id) throws Exception{
		LOGGER.info("入库确认请求参数json：{}", id);
		if(StringUtil.isNotEmpty(id)){
			String operatorId= getOperatorId().toString();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("id", id);
			ResponseResult<WmsStorageInVo> responseResult = storageInService.cancelOrder(param);	
			LOGGER.info("入库确认返回参数json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsStorageInVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	
	/**
	 * 收货交易列表
	 * @param searchVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/transactionList",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInTransactionVo> transactionList(@RequestBody WmsStorageInSearchVo searchVo) throws Exception{
		LOGGER.info("入库分页查询数据,请求参数json：{}", searchVo);
		String operatorId= getOperatorId().toString();
		searchVo.setOperatorCode(operatorId);
		ResponseResult<WmsStorageInTransactionVo> responseResult = storageInService.queryTransactionListByPage(searchVo);
		LOGGER.info("入库分页查询数据,返回的参数json：{}", responseResult);
		return responseResult;
	}
	
	/**
	 * 取消交易
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/cancelDeal",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsStorageInTransactionVo> cancelDeal(String billNo) throws Exception{
		LOGGER.info("取消交易参数json：{}", billNo);
		if(StringUtil.isNotEmpty(billNo)){
			String operatorId= getOperatorId().toString();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("operatorCode", operatorId);
			param.put("billNo", billNo);
			ResponseResult<WmsStorageInTransactionVo> responseResult = storageInService.cancelDeal(param);	
			LOGGER.info("取消交易json：{}", responseResult);
			return responseResult;
		}else{
			return new ResponseResult<WmsStorageInTransactionVo>(ResultEnum.ILLEGAL_PARAM);
		}
	}
	
	/**
	 * 入库单货品明细
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/takegoodsInfoDetail",  method = RequestMethod.GET)
	public String takegoodsInfoDetail(Model model, HttpServletRequest request){
		return setResponseModel("wms/storagein/takegoodsInfoDetail",model,request);
	}
	/**
	 * 收货交易
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/takegoodsTransaction",  method = RequestMethod.GET)
	public String takegoodsTransaction(Model model, HttpServletRequest request){
		return setResponseModel("wms/storagein/takegoodsTransaction",model,request);
	}
	
	 /**
     * 首页统计入库订单情况
     * @return
     */
    @RequestMapping(value = "/searchInStorge",  method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult<DeliveryOrderStatisticsVo> searchInStorge(){
        LOGGER.info("统计入库订单情况,请求参数json：{}");
        String operatorId= getOperatorId().toString();
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("operatorCode", operatorId);
		param.put("warehouseCode", getCookieWCode());
        ResponseResult<DeliveryOrderStatisticsVo> responseResult = storageInService.countStorageIn(param);
        LOGGER.info("统计入库订单情况,返回的参数json：{}", responseResult);
        return responseResult;
    }
    
    /**
     * 打印条码标签
     * @param ids
     * @param model
     * @return
     */
	@RequestMapping(value = "/print/storageIn",  method = RequestMethod.GET)
	public String printPurchase(@RequestParam(value = "ids", required = true)String ids,Model model) {
		LOGGER.info("上架清单打印请求参数json：{}", ids);
		String[] idArray = ids.split(",");

		List<WmsStorageInDetailVo> batchPrintResult = storageInService.printStorageIn(idArray);
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptLable.jasper");
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
	
    /**
     * 打印条码标签
     * @param ids
     * @param model
     * @return
     */
	@RequestMapping(value = "/print/printDeliveryStorage",  method = RequestMethod.GET)
	public String printDeliveryStorage(@RequestParam(value = "ids", required = true)String ids,Model model) {
		LOGGER.info("上架清单打印请求参数json：{}", ids);
		String[] idArray = ids.split(",");

		List<WmsPrintStorageDetailVo> batchPrintResult = storageInService.printDeliveryStorage(idArray);
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptStorageDelivery.jasper");
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

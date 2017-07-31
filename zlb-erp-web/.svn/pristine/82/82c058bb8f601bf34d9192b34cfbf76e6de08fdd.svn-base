package com.zhilianbao.erp.web.wms.controller.warehouseinside;

import java.io.File;
import java.util.HashMap;
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
import com.zlb.erp.wms.core.api.service.IWmsMaterialService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.StockLocationVo;
import com.zlb.erp.wms.core.api.vo.WmsMaterialSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsMaterialVo;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

/**
 * wms库内管理模块原料转成品功能控制层
 * 
 * @author yp
 *
 */
@Controller
@RequestMapping("wms/materialManager")
public class MaterialController extends BaseController {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());

	@Reference
	private IWmsMaterialService wmsMaterialService;


	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("wms/warehouseinside/material", model, request);
	}

	/**
	 * 分页查询原料转成品
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/listMaterial", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsMaterialVo> queryListByPage(@RequestBody WmsMaterialSearchVo searchVo) {
		LOGGER.info("分页查询原料转成品数据，请求参数json：{}", searchVo);
		searchVo.setOperatorCode(getOperatorId().toString());
		searchVo.setWarehouseCode(getCookieWCode());
		return wmsMaterialService.queryListByPage(searchVo);
	}

	/**
	 * 查询库存
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/queryLocationStocks", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<StockLocationVo> queryLocationStocks(@RequestBody StockLocationVo searchVo) {
		LOGGER.info("查询库存数据，请求参数json：{}", searchVo);
		searchVo.setWarehouseCode(getCookieWCode());
		searchVo.setOperatorCode(getOperatorId().toString());
		return wmsMaterialService.queryLocationStocks(searchVo);
	}
	
	/**
	 * 原料转成品生成单
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/generateMaterialPro", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsMaterialVo> generateMaterialPro(@RequestBody WmsMaterialVo wmsMaterialVo) {
		LOGGER.info("原料转成品生成单数据，请求参数json：{}", wmsMaterialVo);
		wmsMaterialVo.setOperatorCode(getOperatorId().toString());
		wmsMaterialVo.setWarehouseCode(getCookieWCode());
		wmsMaterialVo.setWarehouseName(getCookieWName());
		wmsMaterialVo.setCreator(getUserName());
		wmsMaterialVo.setModifier(getUserName());
		return wmsMaterialService.generateMaterialPro(wmsMaterialVo);
	}
	
	/**
	 * 确认原料转为成品
	 * @param searchVo
	 * @return
	 */
	@RequestMapping(value = "/materialPlusReduce", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsMaterialVo> materialPlusReduce(@RequestBody WmsMaterialVo wmsMaterialVo) {
		LOGGER.info("确认原料转为成品数据，请求参数json：{}", wmsMaterialVo);
		wmsMaterialVo.setOperatorCode(getOperatorId().toString());
		wmsMaterialVo.setOperat(getSelfOperatorName());
		wmsMaterialVo.setWarehouseCode(getCookieWCode());
		wmsMaterialVo.setWarehouseName(getCookieWName());
		wmsMaterialVo.setCreator(getUserName());
		wmsMaterialVo.setModifier(getUserName());
		return wmsMaterialService.materialPlusReduce(wmsMaterialVo);
	}
	
	/**
	 * 作废原料转成品 
	 * @param locationCodes
	 * @param physicalMode
	 * @return
	 */
	@RequestMapping(value = "/confirmMateProNo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<WmsMaterialVo> confirmMateProNo(@RequestParam(value = "mateProNos", required = true)String mateProNos){
		LOGGER.info("作废原料转成品数据，请求参数json：{}", mateProNos);
		ResponseResult<WmsMaterialVo> rsp = new ResponseResult<WmsMaterialVo>();
		if(mateProNos.isEmpty()){
			return rsp.failure("001", "参数不能空");
		}
		String[] mateProNo = mateProNos.split(",");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("mateProNos", mateProNo);
		map.put("warehouseCode", getCookieWCode());
		map.put("operatorCode", getOperatorId().toString());
		map.put("userName", getUserName());
		return wmsMaterialService.confirmMateProNo(map,mateProNo);
	}
	
	@RequestMapping(value = "/print/printMaterial",  method = RequestMethod.GET)
	public String printPurchase(@RequestParam(value = "mateProNos", required = true)String mateProNos,Model model) {
		LOGGER.info("打印原料请求参数json：{}", mateProNos);
		String[] mateProNo = mateProNos.split(",");
		
		List<WmsMaterialVo> batchPrintResult = wmsMaterialService.printMaterial(mateProNo);
		
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptMaterial.jasper");
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

package com.zhilianbao.erp.web.tms.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
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
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.IFlatCableService;
import com.zhilianbao.erp.tms.vo.DispatchVehiclePrintVo;
import com.zhilianbao.erp.tms.vo.FlatCableAndDispatchVehicleVo;
import com.zhilianbao.erp.tms.vo.FlatCableListVo;
import com.zhilianbao.erp.tms.vo.FlatCablePrintVo;
import com.zhilianbao.erp.tms.vo.FlatCableSearchVo;
import com.zhilianbao.erp.tms.vo.FlatCableVo;
import com.zhilianbao.erp.tms.vo.WaybillPrintVo;
import com.zhilianbao.erp.web.base.BaseController;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
/**
 * 排线单管理
 * @author wangshengxia
 *
 */
@Controller
@RequestMapping("tms/flatCable")
public class FlatCableController extends BaseController{

	@Reference
	private IFlatCableService iFlatCableService;
	
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("tms/flatCable",model,request);
	}
	
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<FlatCableVo>> list(@RequestBody FlatCableSearchVo vo) {
		FlatCableSearchVo sv = (vo != null) ? vo : new FlatCableSearchVo();
		sv.setOperatorId(getOperatorId());
		sv.setUserId(getUserId());
		return iFlatCableService.queryFlatCableByPage(sv);
	}
	
	@RequestMapping(value = "/queryFlatCableDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<FlatCableVo> queryFlatCableDetails(@RequestBody FlatCableVo vo) {
		vo.setUserId(getUserId());
		vo.setCreator(getUserId());
		return iFlatCableService.queryFlatCableDetails(vo);
	}
	
	@RequestMapping(value = "/addFlatCable")
	@ResponseBody
	public ResponseResult<FlatCableVo> addFlatCable(@RequestBody FlatCableVo vo) {
		vo.setOperatorId(getOperatorId());
		vo.setUserId(getUserId());
		vo.setCreator(getUserId());
		return iFlatCableService.addFlatCable(vo);
	}
	
	@RequestMapping(value = "/updateFlatCable",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<FlatCableVo> updateFlatCable(@RequestBody FlatCableVo vo) {
		
		return iFlatCableService.updateFlatCable(vo);
	}
	@RequestMapping(value = "/updateFlatCableStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<FlatCableVo> updateFlatCableStatus(@RequestBody FlatCableVo vo) {
		vo.setModifier(getUserId());
		return iFlatCableService.updateFlatCableStatus(vo);
	}
	
	/**
	 * 查询今日排线
	 * @Title:FlatCableController
	 * @author wangshengxia
	 * @date 2017年4月5日下午5:21:02
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/listToday",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<FlatCableVo>> listToday(@RequestBody FlatCableSearchVo vo) {
		FlatCableSearchVo sv = (vo != null) ? vo : new FlatCableSearchVo();
		sv.setUserId(getUserId());
		sv.setOperatorId(getOperatorId());
		return iFlatCableService.queryFlatCableToday(sv);
	}
	
	@RequestMapping(value = "/addFlatCableAndDispatchVehicle" ,method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<FlatCableAndDispatchVehicleVo> addFlatCableAndDispatchVehicle(@RequestBody FlatCableAndDispatchVehicleVo vo) {
		vo.getFlatCableVo().setOperatorId(getOperatorId());
		vo.getDispatchVehicleVo().setOperatorId(getOperatorId());
		vo.setUserId(getUserId());
		vo.setOperatorId(getOperatorId());
		return iFlatCableService.addFlatCableAndDispatchVehicle(vo);
	}
	
	@RequestMapping(value = "/addToExistFlatCable",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<FlatCableVo> addToExistFlatCable(@RequestBody FlatCableVo vo) {
		vo.setOperatorId(getOperatorId());
		return iFlatCableService.addToExistFlatCable(vo);
	}
	
	@RequestMapping(value = "/initDropDownBox",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String, Object>> initDropDownBox() {
		long operatorId=getOperatorId();
		return iFlatCableService.initDropDownBox(operatorId);
	}
	
	//运单详情---查看运单列表
	@RequestMapping(value = "/queryByFlatCableId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<FlatCableListVo>> queryByFlatCableId(@RequestBody FlatCableListVo vo) {
		return iFlatCableService.queryByFlatCableId(vo);
	}
	
	/**
	 * 
	* @Title: batchPrint
	* @author kuangzengye
	* @date 2017年4月11日上午10:06:33
	* @param ids
	* @description:打印面单（运单）
	 */
	@RequestMapping(value = "/print/waybill",  method = RequestMethod.GET)
	public String batchPrint(@RequestParam(value = "ids", required = true)String ids,Model model) {

		String[] idArray = ids.split(",");
		//获取运营商Id
		long operatorId = getOperatorId();
		ResponseResult<List<WaybillPrintVo>> batchPrintResult = iFlatCableService.batchPrintWaybill(idArray,operatorId);
		
		//获取揽收单数据
		List<WaybillPrintVo> list = batchPrintResult.getData();
		//如果没有返回数据 填充空白PDF
		if (CollectionUtils.isEmpty(list)) {
			list = new ArrayList<WaybillPrintVo>();
		}
		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(list);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptWaybill.jasper");
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
	 * 
	* @Title: flatCableBatchPrint
	* @author kuangzengye
	* @date 2017年4月17日上午9:12:55
	* @description:拣货单打印
	 */
	@RequestMapping(value = "/print/flatCable",  method = RequestMethod.GET)
	public String flatCableBatchPrint(@RequestParam(value = "ids", required = true)String ids,Model model) {
		
		String[] idArray = ids.split(",");
		//获取运营商Id
		long operatorId = getOperatorId();
		ResponseResult<List<FlatCablePrintVo>> batchPrintResult = iFlatCableService.batchPrintFlatCable(idArray,operatorId);
		
		//获取排线单数据
		List<FlatCablePrintVo> list = batchPrintResult.getData();
		if (CollectionUtils.isEmpty(list)) {
			list = new ArrayList<FlatCablePrintVo>();
		}

		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(list);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptFlatCable.jasper");
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
	 * 
	* @Title: dispatchVehicleBatchPrint
	* @author kuangzengye
	* @date 2017年4月12日上午9:36:18
	* @param ids
	* @description:派车单打印
	 */
	@RequestMapping(value = "/print/dispatchVehicle",  method = RequestMethod.GET)
	public String dispatchVehicleBatchPrint(@RequestParam(value = "ids", required = true)String ids,Model model) {
		
		String[] idArray = ids.split(",");
		//获取运营商Id
		long operatorId = getOperatorId();
		ResponseResult<List<DispatchVehiclePrintVo>> batchPrintResult = iFlatCableService.batchPrintDispatchVehicle(idArray,operatorId);
		
		//获取派车单数据
		List<DispatchVehiclePrintVo> list = batchPrintResult.getData();
		if (CollectionUtils.isEmpty(list)) {
			list = new ArrayList<DispatchVehiclePrintVo>();
		}

		// 报表数据源
		JRDataSource jrDataSource = new JRBeanCollectionDataSource(list);
		// 动态指定报表模板url
		model.addAttribute("url", "/WEB-INF/jasper/rptDispatchVehicle.jasper");
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

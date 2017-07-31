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
import com.zhilianbao.erp.tms.service.IDispatchVehicleService;
import com.zhilianbao.erp.tms.vo.DispatchVehiclePrintVo;
import com.zhilianbao.erp.tms.vo.DispatchVehicleSearchVo;
import com.zhilianbao.erp.tms.vo.DispatchVehicleVo;
import com.zhilianbao.erp.tms.vo.WaybillPrintVo;
import com.zhilianbao.erp.web.base.BaseController;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
/**
 * 派车单管理
 * @author wangshengxia 
 *
 */
@Controller
@RequestMapping("tms/dispatchVehicle")
public class DispatchVehicleController extends BaseController{

	@Reference
	private IDispatchVehicleService iDVService;
	
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("tms/dispatchVehicle",model,request);
	}
	
	@RequestMapping(value = "/init1",  method = RequestMethod.GET)
	public String init1(Model model, HttpServletRequest request){
		
		return setResponseModel("tms/dvchildWaybill_list",model,request);
	}
	
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<DispatchVehicleVo>> list(@RequestBody DispatchVehicleSearchVo vo) {
		DispatchVehicleSearchVo sv = (vo != null) ? vo : new DispatchVehicleSearchVo();
		sv.setOperatorId(getOperatorId());
		sv.setUserId(getUserId());
		return iDVService.queryDispatchVehicleByPage(sv);
	}
	
	@RequestMapping(value = "/dispatchVehicleList",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<DispatchVehicleVo>> getDispatchVehicleList(@RequestBody DispatchVehicleSearchVo vo) {
		DispatchVehicleSearchVo sv = (vo != null) ? vo : new DispatchVehicleSearchVo();
		sv.setOperatorId(getOperatorId());
		sv.setUserId(getUserId());
		return iDVService.getDispatchVehicleList(sv);
	}
	
	@RequestMapping(value = "/queryDispatchVehicleDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> queryDispatchVehicleDetails(@RequestBody DispatchVehicleVo vo) {
		return iDVService.queryDispatchVehicleDetails(vo);
	}
	
	@RequestMapping(value = "/addDispatchVehicle")
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> addDispatchVehicle(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		vo.setOperatorId(getOperatorId());
		return iDVService.addDispatchVehicle(vo);
	}
	
	@RequestMapping(value = "/updateDispatchVehicle",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> updateDispatchVehicle(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		return iDVService.updateDispatchVehicle(vo);
	}
	
	
	@RequestMapping(value = "/updateDispatchVehicleStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> updateDispatchVehicleStatus(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		vo.setUserId(getUserId());
		vo.setOperatorId(getOperatorId());
		return iDVService.updateDispatchVehicleStatus(vo);
	}
	/**
	 * 
	 * @Title:DispatchVehicleController
	 * @author wnagshengxia
	 * @date 2017年3月6日下午3:28:50
	 * @param vo
	 * @return
	 * 发运确认  修改实际出发时间
	 */
	@RequestMapping(value = "/updateDispatchVehiclePDT",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> updateDispatchVehiclePDT(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		vo.setUserId(getUserId());
		vo.setOperatorId(getOperatorId());
		return iDVService.updateDispatchVehicleByType(vo,"practical_depart_time");
	}
	/**
	 * 
	 * @Title:DispatchVehicleController
	 * @author wnagshengxia
	 * @date 2017年3月6日下午3:28:50
	 * @param vo
	 * @return
	 * 装车确认  修改装车时间
	 */
	@RequestMapping(value = "/updateDispatchVehicleTLT",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> updateDispatchVehicleTLT(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		vo.setUserId(getUserId());
		vo.setOperatorId(getOperatorId());
		return iDVService.updateDispatchVehicleByType(vo,"truck_loading_time");
	}
	
	/**
	 * 
	 * @Title:DispatchVehicleController
	 * @author wnagshengxia
	 * @date 2017年3月10日上午9:29:30
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/updateDispatchVehicleByXiada",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> updateDispatchVehicleByXiada(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		vo.setUserId(getUserId());
		vo.setOperatorId(getOperatorId());
		return iDVService.updateDispatchVehicleByXiada(vo);
	}
	
	/**
	 * 
	 * @Title:DispatchVehicleController
	 * @author wnagshengxia
	 * @date 2017年3月6日下午3:28:50
	 * @param vo
	 * @return
	 *  完成确认  修改完成时间
	 */
	@RequestMapping(value = "/updateDispatchVehicleFT",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> updateDispatchVehicleFT(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		vo.setUserId(getUserId());
		vo.setOperatorId(getOperatorId());
		return iDVService.updateDispatchVehicleByType(vo,"finish_time");
	}
	
	
	@RequestMapping(value = "/deleteDispatchVehicle",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> deleteDispatchVehicle(@RequestBody DispatchVehicleVo vo) {
		vo.setModifier(getUserId());
		return iDVService.deleteDispatchVehicle(vo);
	}
	/**
	 * 按排线单派车
	* @Title: addDVAndUpdateFC
	* @author Tobin
	* @date 2017年5月16日上午10:09:30
	* @param vo
	* @return ResponseResult<DispatchVehicleVo>
	* @description:
	 */
	@RequestMapping(value = "/addDVAndUpdateFC",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleVo> addDVAndUpdateFC(@RequestBody DispatchVehicleVo vo) {
		vo.setCreator(getUserId());
		vo.setOperatorId(getOperatorId());
		vo.setUserId(getUserId());
		return iDVService.addDVAndUpdateFC(vo);
	}
	
	@RequestMapping(value = "/initDropDownBox",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String, Object>> initDropDownBox() {
		long operatorId=getOperatorId();
		return iDVService.initDropDownBox(operatorId);
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
		ResponseResult<List<WaybillPrintVo>> batchPrintResult = iDVService.batchPrintWaybill(idArray,operatorId);
		//如果成功
//		if(StringUtils.equalsIgnoreCase(ResultEnum.SUCCESSE.getCode(), batchPrintResult.getCode()) 
//			&& StringUtils.equalsIgnoreCase(ResultEnum.SUCCESSE.getCode(), batchPrintResult.getCode())){
//			
//		}
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
		model.addAttribute("SUBREPORT_DIR",jasperPath);
		//传递子报表目录路径
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
		ResponseResult<List<DispatchVehiclePrintVo>> batchPrintResult = iDVService.batchPrintDispatchVehicle(idArray,operatorId);
		
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
//		String jasperPath = request.getServletContext().getRealPath(File.separator+ 
//				"WEB-INF"+File.separator+"jasper"+File.separator);
		//传递子报表目录路径
		model.addAttribute("SUBREPORT_DIR",jasperPath);
		return "iReportView"; // 对应jasper-defs.xml中的bean id
	}
	
}

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
import com.zhilianbao.erp.tms.service.IChildWayBillService;
import com.zhilianbao.erp.tms.vo.ChildWaybillListVo;
import com.zhilianbao.erp.tms.vo.ChildWaybillVo;
import com.zhilianbao.erp.tms.vo.PackingWebVo;
import com.zhilianbao.erp.tms.vo.QueryWayBillConditionVo;
import com.zhilianbao.erp.tms.vo.WayBillDetailVo;
import com.zhilianbao.erp.tms.vo.WayBillInfoVo;
import com.zhilianbao.erp.tms.vo.WaybillPrintVo;
import com.zhilianbao.erp.tms.vo.WaybillVo;
import com.zhilianbao.erp.web.base.BaseController;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

/** 
* @author Tobin  
* @version 创建时间：2017年3月6日 上午10:44:30 
* 类说明 
*/
@Controller
@RequestMapping("tms/waybill")
public class WaybillController extends BaseController{

	@Reference
	private IChildWayBillService iChildWayBillService;
	
	
	/**
	 * 
	* @Title: homepage
	* @author liyang
	* @date 2017年7月18日下午16:44:32
	* @description:初始化运单首页页面
	 */
	@RequestMapping(value = "/homepage",  method = RequestMethod.GET)
	public String homepage(Model model, HttpServletRequest request) {

		return setResponseModel("tms/waybillHomepage",model,request);
	}
	
	
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("tms/dispatchManage",model,request);
	}
	
	/***
	 * 访问运单管理页面
	 * @return
	 */
	@RequestMapping(value = "/initWaybill",  method = RequestMethod.GET)
	public String initWaybill(Model model, HttpServletRequest request){
		return setResponseModel("tms/waybillManage",model,request);
	}
	
	/***
	 * 根据区查询街道运单汇总信息(目前没有用到)
	 * @param childWaybillVo
	 * @return
	 */
	@RequestMapping(value = "/info/areaName",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ArrayList<WayBillInfoVo>> queryWayBillInfoByAreaName(@RequestBody ChildWaybillVo childWaybillVo) {
		
		return iChildWayBillService.queryWayBillInfoByAreaName(childWaybillVo.getAreaName());
	}
	/***
	 * 根据城市查询运单汇总信息
	 * @param childWaybillVo
	 * @return
	 */
	@RequestMapping(value = "/info/cityName",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ArrayList<WayBillInfoVo>> queryWayBillInfoByCityName(@RequestBody ChildWaybillVo childWaybillVo) {
		childWaybillVo.setOperatorId(getOperatorId());
		childWaybillVo.setUserId(getUserId());
		return iChildWayBillService.queryWayBillInfoByCityName(childWaybillVo.getCityName(),getOperatorId(),getUserId());
	}
	/***
	 * 运单列表
	 * @param queryWayBillConditionVo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<WayBillDetailVo>> queryWayBillList(@RequestBody QueryWayBillConditionVo queryWayBillConditionVo) {
		queryWayBillConditionVo.setOperatorId(getOperatorId());
		queryWayBillConditionVo.setUserId(getUserId());
		return iChildWayBillService.queryWayBillList(queryWayBillConditionVo,true);
	}
	/**
	 *地图上运单列表信息（默认进入时调的）
	 * @param queryWayBillConditionVo
	 * @return
	 */
	@RequestMapping(value = "/list/nopage",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<WayBillDetailVo>> queryWayBillListNoPage(@RequestBody QueryWayBillConditionVo queryWayBillConditionVo) {
		queryWayBillConditionVo.setOperatorId(getOperatorId());
		queryWayBillConditionVo.setUserId(getUserId());
		return iChildWayBillService.queryWayBillList(queryWayBillConditionVo,false);
	}
	/***
	 * 揽收操作（目前没有用到）
	 * @param childWaybillVo
	 * @return
	 */
	@RequestMapping(value = "/updateWayBillListPick",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ChildWaybillVo> updateWayBillListPick(@RequestBody ChildWaybillVo childWaybillVo) {
		childWaybillVo.setOperatorId(getOperatorId());
		childWaybillVo.setUserId(getUserId());
		return iChildWayBillService.updateWayBillListPick(childWaybillVo);
	}
	/**
	 * 运单签收
	* @Title: updateWayBillListSign
	* @author Tobin
	* @date 2017年5月16日下午7:20:16
	* @param childWaybillVo
	* @return ResponseResult<ChildWaybillVo>
	* @description:
	 */
	@RequestMapping(value = "/updateWayBillListSign",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ChildWaybillVo> updateWayBillListSign(@RequestBody ChildWaybillVo childWaybillVo) {
		childWaybillVo.setOperatorId(getOperatorId());
		childWaybillVo.setUserId(getUserId());
		return iChildWayBillService.updateWayBillListSign(childWaybillVo);
	}
	/**
	 * 查询运单货品信息（查看货品明细）
	 * @param childWaybillVo
	 * @return
	 */
	@RequestMapping(value = "/queryWayBillGoods",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<ChildWaybillListVo>> queryWayBillGoods(@RequestBody ChildWaybillVo childWaybillVo) {
		
		return iChildWayBillService.queryWayBillGoods(childWaybillVo.getChildWaybillId());
	}
	/***
	 * 通过排线单 查询 运单 列表
	 * @param queryWayBillConditionVo
	 * @return
	 */
	@RequestMapping(value = "/queryWayBillListByFlatCableId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<WayBillDetailVo>> queryWayBillListByFlatCableId(@RequestBody QueryWayBillConditionVo queryWayBillConditionVo) {
		queryWayBillConditionVo.setOperatorId(getOperatorId());
		return iChildWayBillService.queryWayBillListByFlatCableId(queryWayBillConditionVo,true);
	}
	/***
	 * 地图上运单列表信息（通过排线单 查询 运单 列表    时调的）
	 * @param queryWayBillConditionVo
	 * @return
	 */
	@RequestMapping(value = "/queryWayBillListByFlatCableId/nopage",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<WayBillDetailVo>> queryWayBillListByFlatCableIdNoPage(@RequestBody QueryWayBillConditionVo queryWayBillConditionVo) {
		queryWayBillConditionVo.setOperatorId(getOperatorId());
		return iChildWayBillService.queryWayBillListByFlatCableId(queryWayBillConditionVo,false);
	}
	/***
	 * 调度页面所有下拉框列表
	 * @param queryWayBillConditionVo
	 * @return
	 */
	@RequestMapping(value = "/initDropDownBox",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String,Object>> initDropDownBox(@RequestBody QueryWayBillConditionVo queryWayBillConditionVo) {
		return iChildWayBillService.initDropDownBox(getOperatorId());
	}
	
	/**
	 * 
	* @Title: batchPrint
	* @author kuangzengye
	* @date 2017年4月22日下午3:20:04
	* @param ids
	* @description:通过运单ID打印面单
	 */
	@RequestMapping(value = "/print/waybill",  method = RequestMethod.GET)
	public String batchPrint(@RequestParam(value = "ids", required = true)String ids,Model model) {

		String[] idArray = ids.split(",");
		//获取运营商Id
		long operatorId = getOperatorId();
		ResponseResult<List<WaybillPrintVo>> batchPrintResult = iChildWayBillService.batchPrintWaybill(idArray,operatorId);
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
	
	/***
	 * 通过派车单 查询 运单 列表
	 * @param queryWayBillConditionVo
	 * @return
	 */
	@RequestMapping(value = "/queryWayBillListByDispatchVehicleId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<WayBillDetailVo>> queryWayBillListByDispatchVehicleId(@RequestBody QueryWayBillConditionVo queryWayBillConditionVo) {
		queryWayBillConditionVo.setOperatorId(getOperatorId());
		return iChildWayBillService.queryWayBillListByDispatchVehicleId(queryWayBillConditionVo,true);
	}
	
	/**
	 * 通过装箱单查找运单列表
	 * @param packingWebVo
	 * @return
	 */
	@RequestMapping(value = "/selectedWayBill",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<WayBillDetailVo>> selectedWayBill(@RequestBody PackingWebVo packingWebVo){
		return iChildWayBillService.selectedWayBillByPackCode(packingWebVo);
	}
}
 
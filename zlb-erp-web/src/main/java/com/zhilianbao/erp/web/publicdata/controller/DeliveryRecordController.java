package com.zhilianbao.erp.web.publicdata.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.archives.IDeliveryRecordService;
import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordSearchVo;
import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;

/**
 * 站点档案管理
 * @author wangshengxia
 *
 */
@Controller
@RequestMapping("/publicData/deliveryRecord")
public class DeliveryRecordController extends BaseController{

	@Reference
	private IDeliveryRecordService service;
	
	
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("publicData/archives/deliveryRecord",model,request);
	}
	
	/*@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("publicData/archives/deliveryRecordManage",model,request);
	}*/
	
	@RequestMapping(value = "/list",  method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE,  produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<DeliveryRecordVo>> list(@RequestBody DeliveryRecordSearchVo vo) {
		DeliveryRecordSearchVo sv = (vo != null) ? vo : new DeliveryRecordSearchVo();
		if(getUserType() != 0 || vo.getOperatorId() == null) {
			sv.setOperatorId(getOperatorId());
		} else if(getUserType() == 0 && vo.getOperatorId() != null){
			sv.setOperatorId(vo.getOperatorId());
		}
		sv.setUserId(super.getUserId());
		return service.queryDeliveryRecordListByPage(sv);
	}
	
	@RequestMapping(value = "/queryDeliveryRecordDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryRecordVo> queryDeliveryRecordDetails(@RequestBody DeliveryRecordVo key) {
		key.setUserId(getUserId());
		key.setOperatorId(getOperatorId());
		return service.queryDeliveryRecordDetails(key);
	}
	
	@RequestMapping(value = "/add",  method = RequestMethod.POST, consumes= MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryRecordVo> add(@RequestBody DeliveryRecordVo vo) {
		long userId=getUserId();
		vo.setCreator(userId);
		vo.setOperatorId(getOperatorId());
		vo.setOperatorName(getSelfOperatorName());
		return service.addDeliveryRecord(vo);
	}
	

	@RequestMapping(value = "/delete",  method = RequestMethod.POST, consumes= MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryRecordVo> delete(@RequestBody DeliveryRecordVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		return service.deleteDeliveryRecord(vo);
	}
	
	
	@RequestMapping(value = "/updateDeliveryRecord",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryRecordVo> updateDeliveryRecord(@RequestBody DeliveryRecordVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		vo.setOperatorId(getOperatorId());
		return service.updateDeliveryRecord(vo);
	}
	
	@RequestMapping(value = "/updateDeliveryRecordStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryRecordVo> updateDeliveryRecordStatus(@RequestBody DeliveryRecordVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		vo.setOperatorId(getOperatorId());
		return service.updateDeliveryRecordStatus(vo);
	}
	
	/**
	 * 查询站点的档案页面的所有下拉框的列表值-
	 * @Title:DeliveryRecordController
	 * @author wangshengxia
	 * @date 2017年4月5日下午5:26:24
	 * @return
	 */
	@RequestMapping(value = "/initDropDownBox",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String, Object>> initDropDownBox() {
		long operatorId=getOperatorId();
		return service.initDropDownBox(operatorId);
	}
	
	/**
	 * 查询用户对应的站点信息
	 * @Title:DeliveryRecordController
	 * @author wangshengxia
	 * @date 2017年4月10日下午2:41:28
	 * @param key
	 * @return
	 */
	@RequestMapping(value = "/queryDRByUserID",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryRecordVo> queryDRByUserID(@RequestBody DeliveryRecordVo key) {
		return service.queryDRByUserID(getUserId());
	}
	
	/**
	* @company zhilianbao
	* @author chengjianhui
	* @date 2017年7月16日下午5:34:57
	* @description:新增或编辑站点
	*/
	@RequestMapping(value = "/initAddOrUpdateDelivery",  method = RequestMethod.GET)
	public String initAddOrUpdateDelivery(Model model, HttpServletRequest request,String operationType,String deliveryRecordId){
		model.addAttribute("operationType", operationType);
		model.addAttribute("deliveryRecordId", deliveryRecordId);
		return setResponseModel("publicData/archives/deliveryRecordManage",model,request);
	}
}
 
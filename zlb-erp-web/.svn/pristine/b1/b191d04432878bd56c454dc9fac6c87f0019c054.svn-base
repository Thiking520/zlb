package com.zhilianbao.erp.web.auth.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.operators.IOperatorService;
import com.zhilianbao.erp.auth.service.parameter.ISystemDictService;
import com.zhilianbao.erp.auth.vo.operators.OperatorVo;
import com.zhilianbao.erp.auth.vo.operators.ParaOperatorVo;
import com.zhilianbao.erp.auth.vo.parameter.rpc.DictVo;
import com.zhilianbao.erp.common.annotation.Auth;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseValue;
import com.zhilianbao.erp.common.vo.StatusVo;
import com.zhilianbao.erp.web.base.BaseController;

@RequestMapping("/operator")
@Controller
public class OperatorController extends BaseController {
	private static Logger logger=LogManager.getLogger(OperatorController.class);
	
	@Reference
	private IOperatorService operatorService;
	@Reference
	private ISystemDictService systemDictService;//RPC调用获取数据字典
	
	/***
	 * 进入运营商列表
	 * @param model
	 * @param request
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String initOperator(Model model, HttpServletRequest request) {
		return setResponseModel("auth/operator",model,request);
	}
	/***
	 * 查询运营商
	 * @param paraOperatorVo
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/qryOperator")
	@ResponseBody
	public ResponseValue<Page<OperatorVo>> qryOperator(@RequestBody ParaOperatorVo paraOperatorVo) {
		ResponseValue<Page<OperatorVo>> responseValue=new ResponseValue<Page<OperatorVo>>();
		paraOperatorVo.setOperatorId(getOperatorId());
		try{
			paraOperatorVo.setOperatorId(getOperatorId());
			paraOperatorVo.setUserType(getUserType());
			responseValue=operatorService.qryOperator(paraOperatorVo);
		}catch(Exception e){
			logger.error("OperatorController,qryOperator",e);
			return responseValue.err();
		}
		
		return responseValue;
	}
	/***
	 * 增加运营商
	 * @param operatorVo
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/addOperator")
	@ResponseBody
	public ResponseValue<String> addOperator(@RequestBody OperatorVo operatorVo) {
		long userId=getUserId();
		operatorVo.setCreator(userId);
		operatorVo.setModifier(userId);
		operatorVo.setUserId(userId);
		ResponseValue<String> responseValue=new ResponseValue<String>();
		try{
			responseValue=operatorService.addOperator(operatorVo);
		}catch(Exception e){
			logger.error("OperatorController,addOperator",e);
			return responseValue.err();
		}
		
		return responseValue;
	}
	/***
	 * 进入编辑运营商数据
	 * @param operatorVo
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/loadOperatorUpdate")
	@ResponseBody
	public ResponseValue<OperatorVo> loadOperatorUpdate(@RequestBody OperatorVo operatorVo) {
		
		ResponseValue<OperatorVo> responseValue=new ResponseValue<OperatorVo>();
		try{
			responseValue=operatorService.loadOperatorUpdate(operatorVo);
		}catch(Exception e){
			logger.error("OperatorController,qryOperatorUpdate",e);
			return responseValue.err();
		}
		
		return responseValue;
	}
	/***
	 * 编辑运营商
	 * @param operatorVo
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/updateOperator")
	@ResponseBody
	public ResponseValue<String> updateOperator(@RequestBody OperatorVo operatorVo) {
		long userId=getUserId();
		operatorVo.setModifier(userId);
		ResponseValue<String> responseValue=new ResponseValue<String>();
		try{
			responseValue=operatorService.updateOperator(operatorVo);
		}catch(Exception e){
			logger.error("OperatorController,updateOperator",e);
			return responseValue.err();
		}
		
		return responseValue;
	}
	/***
	 * 获取状态
	 * @return
	 */
	@RequestMapping(value = "/getStatusOption")
	@ResponseBody
	public ResponseValue<List<DictVo>> getStatusOption() {
		ResponseValue<List<DictVo>> responseValue=new ResponseValue<List<DictVo>>();
		long operatorId=getOperatorId();
		List<DictVo> statusList = systemDictService.getDictList(operatorId,Constants.TYPE_COMMON_ACTIVE).getData();//从缓存获取通用的生效/失效list
		return responseValue.success(statusList);
	}
	/***
	 * 生效
	 * @param statusVo
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/updateEnableOperator")
	@ResponseBody
	public ResponseValue<String> updateEnableOperator(@RequestBody StatusVo statusVo) {
		return this.updateStatusOperator(statusVo);
	}
	/***
	 * 失效
	 * @param statusVo
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/updateDisenableOperator")
	@ResponseBody
	public ResponseValue<String> updateDisenableOperator(@RequestBody StatusVo statusVo) {
		return this.updateStatusOperator(statusVo);
	}
	/***
	 * 生效，失效
	 * @param statusVo
	 * @return
	 */
	private ResponseValue<String> updateStatusOperator(StatusVo statusVo) {
		long userId=getUserId();
		statusVo.setModifier(userId);
		statusVo.setOperatorId(getOperatorId());
		ResponseValue<String> responseValue=new ResponseValue<String>();
		try{
			responseValue=operatorService.updateStatusOperator(statusVo);
		}catch(Exception e){
			logger.error("OperatorController,updateOperator",e);
			return responseValue.err();
		}
		return responseValue;
	}
	
}

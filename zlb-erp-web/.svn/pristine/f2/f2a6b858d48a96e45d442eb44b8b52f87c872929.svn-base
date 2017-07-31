package com.zhilianbao.erp.web.tms.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.ISmsService;
import com.zhilianbao.erp.tms.vo.QueryVo;
import com.zhilianbao.erp.tms.vo.ReceiverVo;
import com.zhilianbao.erp.tms.vo.SmsRecordVo;
import com.zhilianbao.erp.tms.vo.SmsTemplateVo;
import com.zhilianbao.erp.web.base.BaseController;

@Controller
@RequestMapping("/tms/sms")
public class SmsController extends BaseController{

	@Reference
	private ISmsService smsService;
	
	/**
	 * 初始化模版列表
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/template/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("tms/template",model,request);
	}
	
	/**
	 * 初始化发送短信记录列表
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String smsInit(Model model, HttpServletRequest request){
		return setResponseModel("tms/sms",model,request);
	}
	
	/**
	 * 添加一个短信模版
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/addTemplate",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<SmsTemplateVo> addTemplate(@RequestBody SmsTemplateVo templateVo){
		templateVo.setCreator(getUserId());
		templateVo.setOperatorId(getOperatorId());
		return smsService.addTemplate(templateVo);
	}
	
	/**
	 * 修改短信模版状态
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/modifyStatus",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<SmsTemplateVo> modifyStatus(@RequestBody SmsTemplateVo templateVo){
		templateVo.setModifier(getUserId());
		return smsService.modifyStatus(templateVo);
	}
	
	/**
	 * 删除短信模版
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/template/delete",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<SmsTemplateVo> deleteTemplate(@RequestBody SmsTemplateVo templateVo){
		templateVo.setModifier(getUserId());
		return smsService.deleteTemplate(templateVo);
	}
	
	/**
	 * 修改短信模版信息
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/template/modifyInfo",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<SmsTemplateVo> modifyTemplateInfo(@RequestBody SmsTemplateVo templateVo){
		templateVo.setModifier(getUserId());
		return smsService.modifyTemplateInfo(templateVo);
	}
	
	/**
	 * 短信模版分页列表
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/templateList",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<SmsTemplateVo>> templateList(@RequestBody SmsTemplateVo templateVo){
		templateVo.setOperatorId(getOperatorId());
		return smsService.templateLists(templateVo);
	}
	
	/**
	 * 接收人列表
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/getReceiverList",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<ReceiverVo>> getReceiverList(@RequestBody SmsTemplateVo templateVo){
		templateVo.setOperatorId(getOperatorId());
		return smsService.getReceiverList(templateVo);
	}
	
	/**
	 * 获取短信发送记录列表
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/getSmsRecoredList",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<SmsRecordVo>> getSmsRecoredList(@RequestBody QueryVo smsRecordVo){
		smsRecordVo.setOperatorId(getOperatorId());
		smsRecordVo.setUserId(getUserId());
		return smsService.getSmsRecoredList(smsRecordVo);
	}
	
	/**
	 * 发送短信
	 * @param model
	 * @param templateVo
	 * @return
	 */
	@RequestMapping(value = "/sendSms",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<SmsRecordVo> sendSms(@RequestBody SmsRecordVo smsRecordVo){
		smsRecordVo.setCreator(getUserId());
		smsRecordVo.setOperatorId(getOperatorId());
		return smsService.sendSms(smsRecordVo);
	}
}

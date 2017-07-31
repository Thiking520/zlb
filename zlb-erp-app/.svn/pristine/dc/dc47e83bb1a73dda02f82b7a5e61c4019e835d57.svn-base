package com.zhilianbao.erp.app.impl.sms;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.RpcContext;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.app.service.sms.ISmsStateReportService;
import com.zhilianbao.erp.common.sms.SmsBean;
import com.zhilianbao.erp.common.sms.SmsPush;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.ISmsService;
import com.zhilianbao.erp.tms.vo.SmsRecordVo;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年6月23日上午10:06:30
* @description:供短信平台回调的状态报告接口
*/
@Path("message")
@Consumes({MediaType.APPLICATION_FORM_URLENCODED, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
@Service
public class SmsStateReportServiceImpl implements ISmsStateReportService {
	private static Logger logger = LogManager.getLogger(SmsStateReportServiceImpl.class);
	@Reference
	private ISmsService smsService;

	@POST
	@Path("smsStateReport")
	@Override
	public ResponseResult<String> smsStateReport() {
		ResponseResult<String> resp = new ResponseResult<String>();
		try {
			HttpServletRequest request = RpcContext.getContext().getRequest(HttpServletRequest.class);
			if (request == null) {
				return resp.failure("9999", "获取入参异常");
			}
			String sendid = request.getParameter("sendid");
			String state = request.getParameter("state");
			String mobile = request.getParameter("mobile");
			String time = request.getParameter("time");
			logger.info("SmsStateReport Param=>sendid={},state={},mobile={},time={}",sendid,state,mobile,time);
			String sendStatus = "0";
			String smsStatusDescribe = "用户未接收到短信";
			switch (state) {
				case "DELIVRD":
					sendStatus = "1";
					smsStatusDescribe = "发送成功";
					break;
				case "EXPIRED":
					smsStatusDescribe = "短消息超过有效期";			
					break;
				case "UNDELIV":
					smsStatusDescribe = "短消息是不可达的";
					break;
				case "UNKNOWN":
					smsStatusDescribe = "未知短消息状态";
					break;
				case "REJECTD":
					smsStatusDescribe = "短消息被短信中心拒绝";
					break;
				case "ERR:104":
					smsStatusDescribe = "系统忙";			
					break;
				case "DTBLACK":
					smsStatusDescribe = "目的号码是黑名单号码";			
					break;
				case "REJECT":
					smsStatusDescribe = "审核驳回";
					break;
				case "SGIP:12":
					smsStatusDescribe = "目标是空号";
					break;
				default:
					smsStatusDescribe = state;
					break;
			}
			SmsRecordVo sr = new SmsRecordVo();
			sr.setSendid(sendid);
			sr.setSmsStatus(sendStatus);
			sr.setSmsStatusDescribe(smsStatusDescribe);
			smsService.updateSmsRecordSmsStatusBySendid(sr);
		}catch (Exception e){
			logger.error("获取状态报告异常：",e);
			return resp.failure("9999", "获取入参异常");
		}
		return resp.success();
	}
	
	public static void main(String[] args) {
		List<SmsBean> smsSendList = new ArrayList<>();
		//构建发送短信数据
		SmsBean sms = new SmsBean();
		sms.setMobile("18665910731");
		sms.setSign("【快件收取】");
		sms.setContent("您好！程先森，您的快件S24176220620156666，已到达广东省深圳市南山区南油大厦，请及时前来领取。（测试test-测试）");
		smsSendList.add(sms);
		SmsPush.send(smsSendList);
	}
}



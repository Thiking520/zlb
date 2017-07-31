package com.zhilianbao.erp.app.impl.sms;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.alibaba.fastjson.JSON;
import com.zhilianbao.erp.app.impl.cache.UserCacheUtil;
import com.zhilianbao.erp.app.service.sms.IPdaSmsService;
import com.zhilianbao.erp.app.utils.PdaConstants;
import com.zhilianbao.erp.app.utils.PdaVoUtils;
import com.zhilianbao.erp.app.vo.ReqBaseVo;
import com.zhilianbao.erp.app.vo.sms.*;
import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.app.vo.waybill.DriverInfoVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.redis.RedisCache;
import com.zhilianbao.erp.common.sms.SmsBean;
import com.zhilianbao.erp.common.sms.SmsPush;
import com.zhilianbao.erp.common.util.CollectionUtils;
import com.zhilianbao.erp.common.util.datehelp.DateUtils;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.ISmsService;
import com.zhilianbao.erp.tms.service.IWaybillService;
import com.zhilianbao.erp.tms.vo.*;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @Company zhilianbao
 * @Title: MessageServiceImpl
 * @Author kuangzengye
 * @Date 2017/6/14 9:48
 * @Description:短信管理
 */
@Path("sms")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
@Service
public class PdaSmsServiceImpl implements IPdaSmsService {

	private static Logger logger = LogManager.getLogger(PdaSmsServiceImpl.class);

	private static ExecutorService smsPool = Executors.newFixedThreadPool(5);

	@Reference
	private IWaybillService waybillService;
	@Reference
	private ISmsService smsService;

	@POST
    @Path("send")
	public ResponseResult<String> pusSms(ReqBaseVo rbv) {
		ResponseResult<String> rsp = new ResponseResult<String>();
		//通过派车单号从tms获取短信接收人、接收号码、收货站点、装箱单号、运营商名称数据。
		//组装数据并下发短信
		SmsPush.send("18665910731", "快件收取", rbv.getuCenterId() + "您的货物已经到达，请注意取件。");
		return rsp;
	}

	/**
	 * @param reqSmsQueryVo
	 * @Title:
	 * @Author kuangzengye
	 * @Date 2017/6/13 17:16
	 * @description:查询装箱单列表信息
	 */
	@POST
	@Path("queryPackingList")
	@Override
	public ResponseResult<Map<String,Object>> queryPackingList(ReqSmsQueryVo reqSmsQueryVo) {
		logger.info("【查询装箱单列表接口】请求参数：{}", JSON.toJSONString(reqSmsQueryVo));
		ResponseResult<Map<String,Object>> rspResult = new ResponseResult<>();
		if(StringUtils.isBlank(reqSmsQueryVo.getDisPieNo())){
			return rspResult.failure(ResultEnum.PIE_NO_NULL);
		}
		try {
			//查询Vo转换
			QueryVo vo = new QueryVo();
			AppUserVo user = UserCacheUtil.getUser(reqSmsQueryVo.getuCenterId());
			vo.setDriver(user.getEmployeeId());
			//1、派车单选择：分派给当前用户，状态“已装车、配送中”，必选，为空则提示用户先选择派车单；
			List<String> dispatchStatusList = new ArrayList<>();
			dispatchStatusList.add(Constants.DISPATCH_STATUS_TRUNKED);
			dispatchStatusList.add(Constants.DISPATCH_STATUS_SEND);
			vo.setDispatchStatusList(dispatchStatusList);
			vo.setOffset(PdaVoUtils.getOffset(reqSmsQueryVo));
			vo.setPageSize(reqSmsQueryVo.getPageSize());
			vo.setDisDispatchVehicleId(reqSmsQueryVo.getDisPieNo());
			vo.setConsumerAddress(reqSmsQueryVo.getDeliveryAddress());
			//获取装箱单列表信息
			logger.info("【TMS--分页查询装箱单运单列表】请求参数：{}", JSON.toJSONString(vo));
			ResponseResult<List<ChildWaybillApiVo>> queryWaybillListResult = waybillService.queryPackingWaybillListByPage(vo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(queryWaybillListResult.getCode()) || queryWaybillListResult.getData() == null){
				logger.info("【TMS--分页查询装箱单运单列表】响应结果：{}", JSON.toJSONString(queryWaybillListResult));
				return rspResult.failure(queryWaybillListResult.getCode(),queryWaybillListResult.getMsg());
			}
			logger.info("【TMS--分页查询装箱单运单列表】响应结果：{}", JSON.toJSONString(queryWaybillListResult));
			List<ChildWaybillApiVo> childWaybillApiVoList = queryWaybillListResult.getData();
			if(CollectionUtils.isEmpty(childWaybillApiVoList)){
				return rspResult.failure(ResultEnum.EMPTY);
			}
			//查询结果集转换
			List<DriverInfoVo> truckBoxs = getTruckBoxs(childWaybillApiVoList);
			Map<String,Object> data = new HashMap<>();
			data.put("truckBoxs",truckBoxs);
			rspResult.setData(data);
			logger.info("【查询装箱单列表接口】响应信息：{}", JSON.toJSONString(rspResult));
		}catch (Exception e){
			logger.error("【查询装箱单列表接口】查询装箱单列表信息异常，异常信息：",e);
			return rspResult.err();
		}
		return rspResult;
	}

	/**
	 * @param reqSmsQueryVo
	 * @author kuangzengye
	 * @date 2017/6/15 16:51
	 * @description:搜索需要发送短信运单列表接口
	 */
	@POST
	@Path("querySendSmsWaybillList")
	@Override
	public ResponseResult<Map<String,Object>> querySendSmsWaybillList(ReqSmsQueryVo reqSmsQueryVo) {
		logger.info("【搜索需要发送短信运单列表接口】请求参数：{}", JSON.toJSONString(reqSmsQueryVo));
		ResponseResult<Map<String,Object>> rspResult = new ResponseResult<>();
		if(StringUtils.isBlank(reqSmsQueryVo.getDisPieNo())){
			return rspResult.failure(ResultEnum.PIE_NO_NULL);
		}
		try {
			//查询Vo转换
			QueryVo vo = new QueryVo();
			AppUserVo user = UserCacheUtil.getUser(reqSmsQueryVo.getuCenterId());
			vo.setDriver(user.getEmployeeId());
			//1、派车单选择：分派给当前用户，状态“已装车、配送中”，必选，为空则提示用户先选择派车单；
			List<String> dispatchStatusList = new ArrayList<>();
			dispatchStatusList.add(Constants.DISPATCH_STATUS_TRUNKED);
			dispatchStatusList.add(Constants.DISPATCH_STATUS_SEND);
			vo.setDispatchStatusList(dispatchStatusList);
			vo.setOffset(PdaVoUtils.getOffset(reqSmsQueryVo));
			vo.setPageSize(reqSmsQueryVo.getPageSize());
			vo.setDisDispatchVehicleId(reqSmsQueryVo.getDisPieNo());
			vo.setPackCodeList(reqSmsQueryVo.getTruckBoxs());
			vo.setDisChildWaybillId(reqSmsQueryVo.getDisDriverNo());
			vo.setConsumerAddress(reqSmsQueryVo.getDeliveryAddress());
			vo.setSignStatus(PdaConstants.SIGN_STATUS_NOT_SIGNED);//只查询未签收的数据  已签收的运单不能再发送短信

			//获取装箱单列表信息
			logger.info("【TMS--分页查询运单列表】请求参数：{}", JSON.toJSONString(vo));
			ResponseResult<List<ChildWaybillApiVo>> queryWaybillResult = waybillService.queryWaybillListByPage(vo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(queryWaybillResult.getCode()) || queryWaybillResult.getData() == null){
				logger.info("【TMS--分页查询运单列表】响应结果：{}", JSON.toJSONString(queryWaybillResult));
				return rspResult.failure(queryWaybillResult.getCode(),queryWaybillResult.getMsg());
			}
			logger.info("【TMS--分页查询运单列表】响应结果：{}", JSON.toJSONString(queryWaybillResult));
			List<ChildWaybillApiVo> childWaybillApiVoList = queryWaybillResult.getData();
			if(CollectionUtils.isEmpty(childWaybillApiVoList)){
				return rspResult.failure(ResultEnum.EMPTY);
			}
			//查询结果集转换
			List<DriverInfoVo> truckBoxs = getTruckBoxs(childWaybillApiVoList);
			Map<String,Object> data = new HashMap<>();
			data.put("driverInfos",truckBoxs);
			rspResult.setData(data);
			logger.info("【搜索需要发送短信运单列表接口】响应信息：{}", JSON.toJSONString(rspResult));
		}catch (Exception e){
			logger.error("【搜索需要发送短信运单列表接口】响应异常，异常信息：",e);
			return rspResult.err();
		}
		return rspResult;
	}

	/**
	 * @param reqPdaSmsTemplateVo
	 * @author kuangzengye
	 * @date 2017/6/16 15:19
	 * @description:发送短信接口
	 */
	@POST
	@Path("sendSms")
	@Override
	public ResponseResult<Map<String, Object>> sendSms(ReqPdaSmsTemplateVo reqPdaSmsTemplateVo) {
		logger.info("【发送短信接口】请求参数：{}", JSON.toJSONString(reqPdaSmsTemplateVo));
		ResponseResult<Map<String,Object>> rspResult = new ResponseResult<>();
		if(StringUtils.isBlank(reqPdaSmsTemplateVo.getTemplateCode())){
			return rspResult.failure(ResultEnum.TEMPLATE_CODE_NULL);
		}
		List<String> driverNos = reqPdaSmsTemplateVo.getDriverNos();
		if(CollectionUtils.isEmpty(driverNos)){
			return rspResult.failure(ResultEnum.RECEIVE_DRIVER_INFOS_NULL);
		}

		try {
     		//调用获取短信模板接口--根据短信模版ID获取短信模板
			logger.info("【TMS--通过短信模版Code查询短信模板】请求参数：{}", JSON.toJSONString(reqPdaSmsTemplateVo.getTemplateCode()));
			ResponseResult<SmsTemplateVo> querySmsTemplateByCodeResult = smsService.querySmsTemplateByCode(reqPdaSmsTemplateVo.getTemplateCode());
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(querySmsTemplateByCodeResult.getCode()) || querySmsTemplateByCodeResult.getData() == null){
				logger.info("【TMS--通过短信模版Code查询短信模板】响应结果：{}", JSON.toJSONString(querySmsTemplateByCodeResult));
				return rspResult.failure(ResultEnum.QUERY_SMS_TEMPLATE_INFO_ERROR);
			}
			logger.info("【TMS--通过短信模版Code查询短信模板】响应结果：{}", JSON.toJSONString(querySmsTemplateByCodeResult));
			SmsTemplateVo smsTemplate = querySmsTemplateByCodeResult.getData();
			String templateContent = smsTemplate.getTemplateContent();
			AppUserVo user = UserCacheUtil.getUser(reqPdaSmsTemplateVo.getuCenterId());

			//调用TMS后台发送短信接口
			SmsRecordVo smsRecordVo = new SmsRecordVo();
			smsRecordVo.setOperatorId(user.getOperatorId());
			smsRecordVo.setCreator(Long.parseLong(user.getuCenterId()));
			smsRecordVo.setTemplateId(smsTemplate.getId());
			smsRecordVo.setWayBills(reqPdaSmsTemplateVo.getDriverNos());
			smsRecordVo.setDriver(user.getEmployeeId());//过滤pda数据，只能看到我的数据
			logger.info("【发送短信接口】--【TMS--发送短信】请求参数：{}", JSON.toJSONString(smsRecordVo));
			ResponseResult<SmsRecordVo> smsRecordVoResponseResult = smsService.sendSms(smsRecordVo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(smsRecordVoResponseResult.getCode()) || smsRecordVoResponseResult.getData() == null){
				logger.info("【TMS--发送短信】响应结果：{}", JSON.toJSONString(smsRecordVoResponseResult));
				return rspResult.failure(smsRecordVoResponseResult.getCode(),smsRecordVoResponseResult.getMsg());
			}
			logger.info("【发送短信接口】--【TMS--发送短信】响应结果：{}", JSON.toJSONString(smsRecordVoResponseResult));

			logger.info("【发送短信接口】响应信息：{}", JSON.toJSONString(rspResult));
	}catch (Exception e){
		logger.error("【发送短信接口】发送短信接口异常，异常信息：",e);
		return rspResult.err();
	}
		return rspResult;
	}

	/**
	 * @param reqSmsQueryVo
	 * @author kuangzengye
	 * @date 2017/6/19 9:37
	 * @description:查询已经发送短信列表接口
	 */
	@POST
	@Path("querySentSmsList")
	@Override
	public ResponseResult<Map<String, Object>> querySentSmsList(ReqSmsQueryVo reqSmsQueryVo) {
		logger.info("【查询已经发送短信列表接口】请求参数：{}", JSON.toJSONString(reqSmsQueryVo));
		ResponseResult<Map<String,Object>> rspResult = new ResponseResult<>();
		try {
			//查询Vo转换
			QueryVo vo = new QueryVo();
			AppUserVo user = UserCacheUtil.getUser(reqSmsQueryVo.getuCenterId());
			vo.setDriver(user.getEmployeeId());
			vo.setOffset(PdaVoUtils.getOffset(reqSmsQueryVo));
			vo.setPageSize(reqSmsQueryVo.getPageSize());

			//获取装箱单列表信息
			logger.info("【TMS--查询已经发送短信列表接口】请求参数：{}", JSON.toJSONString(vo));
			ResponseResult<List<SmsCodeRecordVo>> querySentSmsListResult =  smsService.querySmsCodeRecordList(vo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(querySentSmsListResult.getCode()) || querySentSmsListResult.getData() == null){
				logger.info("【TMS--查询已经发送短信列表接口】响应结果：{}", JSON.toJSONString(querySentSmsListResult));
				return rspResult.failure(querySentSmsListResult.getCode(),querySentSmsListResult.getMsg());
			}
			logger.info("【TMS--查询已经发送短信列表接口】响应结果：{}", JSON.toJSONString(querySentSmsListResult));
			List<SmsCodeRecordVo> querySentSmsList = querySentSmsListResult.getData();
			if(CollectionUtils.isEmpty(querySentSmsList)){
				return rspResult.failure(ResultEnum.EMPTY);
			}
			//查询结果集转换 转换成pda 短信对象
			List<PdaSmsRecordVo> msgVos = getMsgVos(querySentSmsList);
			Map<String,Object> data = new HashMap<>();
			data.put("msgVos",msgVos);
			rspResult.setData(data);
			logger.info("【查询已经发送短信列表接口】响应信息：{}", JSON.toJSONString(rspResult));
		}catch (Exception e){
			logger.error("【查询已经发送短信列表接口】,异常响应信息：{}",e);
			return rspResult.err();
		}
		return rspResult;
	}

	/**
	 * @param reqSmsQueryVo
	 * @author kuangzengye
	 * @date 2017/6/19 11:13
	 * @description:查询短信模版列表接口
	 */
	@POST
	@Path("querySmsTemplateList")
	@Override
	public ResponseResult<Map<String, Object>> querySmsTemplateList(ReqSmsQueryVo reqSmsQueryVo) {
		logger.info("【查询短信模版列表接口】请求参数：{}", JSON.toJSONString(reqSmsQueryVo));
		ResponseResult<Map<String,Object>> rspResult = new ResponseResult<>();
		try {
			//查询Vo转换
			QueryVo vo = new QueryVo();
			AppUserVo user = UserCacheUtil.getUser(reqSmsQueryVo.getuCenterId());
			vo.setDriver(user.getEmployeeId());
			vo.setOffset(PdaVoUtils.getOffset(reqSmsQueryVo));
			vo.setPageSize(reqSmsQueryVo.getPageSize());

			//获取装箱单列表信息
			logger.info("【TMS--查询短信模版列表接口】请求参数：{}", JSON.toJSONString(vo));
			ResponseResult<List<SmsTemplateVo>> querySmsTemplateListResult =  smsService.querySmsTemplateList(vo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(querySmsTemplateListResult.getCode()) || querySmsTemplateListResult.getData() == null){
				logger.info("【TMS--查询短信模版列表接口】响应结果：{}", JSON.toJSONString(querySmsTemplateListResult));
				return rspResult.failure(querySmsTemplateListResult.getCode(),querySmsTemplateListResult.getMsg());
			}
			logger.info("【TMS--查询短信模版列表接口】响应结果：{}", JSON.toJSONString(querySmsTemplateListResult));
			List<SmsTemplateVo> smsTemplateVoList = querySmsTemplateListResult.getData();
			if(CollectionUtils.isEmpty(smsTemplateVoList)){
				return rspResult.failure(ResultEnum.EMPTY);
			}
			//查询结果集转换
			List<RspPdaSmsTemplateVo> msgModels = getMsgModels(smsTemplateVoList);
			Map<String,Object> data = new HashMap<>();
			data.put("msgModels",msgModels);
			rspResult.setData(data);
			logger.info("【查询短信模版列表接口】响应信息：{}", JSON.toJSONString(rspResult));
		}catch (Exception e){
			logger.error("【查询短信模版列表接口】响应异常，异常信息：",e);
			return rspResult.err();
		}
		return rspResult;
	}

	/**
	 * @param reqSmsQueryVo
	 * @author kuangzengye
	 * @date 2017/6/19 11:39
	 * @description:查询已经发送短信对应接收人接口
	 */
	@POST
	@Path("querySentSmsWaybillList")
	@Override
	public ResponseResult<Map<String, Object>> querySentSmsWaybillList(ReqSmsQueryVo reqSmsQueryVo) {
		logger.info("【查询已经发送短信对应接收人接口】请求参数：{}", JSON.toJSONString(reqSmsQueryVo));
		ResponseResult<Map<String,Object>> rspResult = new ResponseResult<>();
		try {
			//查询Vo转换
			QueryVo vo = new QueryVo();
			AppUserVo user = UserCacheUtil.getUser(reqSmsQueryVo.getuCenterId());
			vo.setDriver(user.getEmployeeId());
			vo.setOffset(PdaVoUtils.getOffset(reqSmsQueryVo));
			vo.setPageSize(reqSmsQueryVo.getPageSize());
			vo.setSmsCode(reqSmsQueryVo.getSmsCode());

			//获取运单列表信息
			logger.info("【TMS--查询已发送短信运单接口】请求参数：{}", JSON.toJSONString(vo));
			ResponseResult<List<ChildWaybillApiVo>> querySentSmsWaybillListResult =  waybillService.querySentSmsWaybillList(vo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(querySentSmsWaybillListResult.getCode()) || querySentSmsWaybillListResult.getData() == null){
				logger.info("【TMS--查询已发送短信运单接口】响应结果：{}", JSON.toJSONString(querySentSmsWaybillListResult));
				return rspResult.failure(querySentSmsWaybillListResult.getCode(),querySentSmsWaybillListResult.getMsg());
			}
			logger.info("【TMS--查询已发送短信运单接口】响应结果：{}", JSON.toJSONString(querySentSmsWaybillListResult));
			List<ChildWaybillApiVo> childWaybillApiVoList = querySentSmsWaybillListResult.getData();
			if(CollectionUtils.isEmpty(childWaybillApiVoList)){
				return rspResult.failure(ResultEnum.EMPTY);
			}
			//查询结果集转换
			List<DriverInfoVo> driverInfos = getTruckBoxs(childWaybillApiVoList);
			String disPieNo = driverInfos.get(0).getDisPieNo();
			Map<String,Object> data = new HashMap<>();
			data.put("driverInfos",driverInfos);
			data.put("disPieNo",disPieNo);
			rspResult.setData(data);
			logger.info("【查询已经发送短信对应接收人接口】响应信息：{}", JSON.toJSONString(rspResult));
		}catch (Exception e){
			logger.error("【查询已经发送短信对应接收人接口】响应异常，异常信息：",e);
			return rspResult.err();
		}
		return rspResult;
	}

	/**
	 * @param reqResendSmsVo
	 * @author kuangzengye
	 * @date 2017/6/23 9:10
	 * @description:重发短信--支持批量跟单个重发
	 */
	@POST
	@Path("resendSms")
	@Override
	public ResponseResult<Map<String, Object>> resendSms(ReqResendSmsVo reqResendSmsVo) {
		logger.info("【重发短信接口】请求参数：{}", JSON.toJSONString(reqResendSmsVo));
		ResponseResult<Map<String,Object>> rspResult = new ResponseResult<>();
		Boolean isAllResend = reqResendSmsVo.getIsAll();
		if(isAllResend == null){
			return rspResult.failure(ResultEnum.IS_ALL_RESEND_ERROR);
		}

		SmsRecordVo reqSmsRecordVo = new SmsRecordVo();
		//调用重发短信接口
		reqSmsRecordVo.setSmsCode(reqResendSmsVo.getSmsCode());
		reqSmsRecordVo.setChildWaybillId(reqResendSmsVo.getDriverNo());

		//1.判断是否是全部重发
		if(isAllResend){//全部重发
			if(StringUtils.isBlank(reqResendSmsVo.getSmsCode())){
				return rspResult.failure(ResultEnum.SMS_CODE_NULL);
			}

			logger.info("【TMS--批量重发短信接口】请求参数：{}", JSON.toJSONString(reqSmsRecordVo));
			ResponseResult responseResult = smsService.resendSmsBatch(reqSmsRecordVo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(responseResult.getCode())){
				logger.info("【TMS--批量重发短信接口】响应结果：{}", JSON.toJSONString(responseResult));
				return rspResult.failure(responseResult.getCode(),responseResult.getMsg());
			}
			logger.info("【TMS--批量重发短信接口】响应结果：{}", JSON.toJSONString(responseResult));

		}else {//单条重发
			if(StringUtils.isBlank(reqResendSmsVo.getDriverNo())){
				return rspResult.failure(ResultEnum.CHILD_WAYBILL_ID_NULL);
			}
			logger.info("【TMS--重发短信接口】请求参数：{}", JSON.toJSONString(reqSmsRecordVo));
			ResponseResult responseResult = smsService.resendSms(reqSmsRecordVo);
			if(!Constants.CODE_SUCCESS.equalsIgnoreCase(responseResult.getCode())){
				logger.info("【TMS--重发短信接口】响应结果：{}", JSON.toJSONString(responseResult));
				return rspResult.failure(responseResult.getCode(),responseResult.getMsg());
			}
			logger.info("【TMS--重发短信接口】响应结果：{}", JSON.toJSONString(responseResult));
		}
		return rspResult;
	}

	/**
	* @author kuangzengye
	* @date 2017/6/19 11:21
	* @description:获取/转换短信模版列表
	*/
	private List<RspPdaSmsTemplateVo> getMsgModels(List<SmsTemplateVo> smsTemplateVoList) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
		List<RspPdaSmsTemplateVo> pdaSmsTemplateVoList = new ArrayList<>();
		for (SmsTemplateVo smsTemplateVo : smsTemplateVoList) {
			RspPdaSmsTemplateVo pdaSmsTemplateVo = new RspPdaSmsTemplateVo();
			PropertyUtils.copyProperties(pdaSmsTemplateVo,smsTemplateVo);
			pdaSmsTemplateVoList.add(pdaSmsTemplateVo);
		}
		return pdaSmsTemplateVoList;
	}

	/**
	* @author kuangzengye
	* @date 2017/6/19 10:33
	* @description:获取/转换短信Code列表
	*/
	private List<PdaSmsRecordVo> getMsgVos(List<SmsCodeRecordVo> smsCodeList) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
		List<PdaSmsRecordVo> pdaSmsRecordVoList = new ArrayList<>();
		for (SmsCodeRecordVo smsCodeRecordVo : smsCodeList) {
			PdaSmsRecordVo pdaSmsRecordVo = new PdaSmsRecordVo();
			pdaSmsRecordVo.setSmsCode(smsCodeRecordVo.getSmsCode());
			pdaSmsRecordVo.setReceivePersons(smsCodeRecordVo.getReceivePersons());
			pdaSmsRecordVo.setSendStatus(smsCodeRecordVo.getSendStatus());
			SmsRecordVo smsRecordVo = smsCodeRecordVo.getSmsRecordVoList().get(0);
			pdaSmsRecordVo.setTemplateCode(smsRecordVo.getTemplateCode());
			pdaSmsRecordVo.setTemplateContent(smsRecordVo.getTemplateContent());
			pdaSmsRecordVo.setTemplateTheme(smsRecordVo.getTemplateTheme());
			pdaSmsRecordVoList.add(pdaSmsRecordVo);
		}
		return pdaSmsRecordVoList;
	}

	/**
	 * @author kuangzengye
	 * @date 2017/6/16 9:45
	 * @description:获取/转换装箱单列表
	 */
	private List<DriverInfoVo> getTruckBoxs(List<ChildWaybillApiVo> childWaybillApiVoList) {
		List<DriverInfoVo> truckBoxs = new ArrayList<>();
		for (ChildWaybillApiVo childWaybillApiVo : childWaybillApiVoList) {
			DriverInfoVo pdaDriverInfoVo = new DriverInfoVo();

			pdaDriverInfoVo.setDisDriverNo(childWaybillApiVo.getDisChildWaybillId());
			pdaDriverInfoVo.setDriverNo(childWaybillApiVo.getChildWaybillId());
			pdaDriverInfoVo.setDisParentDriverNo(childWaybillApiVo.getDisWaybillId());
			pdaDriverInfoVo.setParentDriverNo(childWaybillApiVo.getParentWaybillId());
			pdaDriverInfoVo.setDistributeSite(childWaybillApiVo.getOperationSite());
			pdaDriverInfoVo.setReceiveSite(childWaybillApiVo.getConsumerAddress());
			pdaDriverInfoVo.setCustomerName(childWaybillApiVo.getConsumerName());
			pdaDriverInfoVo.setCustomerPhone(childWaybillApiVo.getConsumerMobile());

			//转换运单 是否确认装车
			pdaDriverInfoVo.setSureTruck(PdaVoUtils.isSureTruck(childWaybillApiVo.getChildWalbillStatus()));
			pdaDriverInfoVo.setSignResult(childWaybillApiVo.getSignInResult());
			pdaDriverInfoVo.setTruckBoxNo(childWaybillApiVo.getPackCode());
			pdaDriverInfoVo.setPieNo(childWaybillApiVo.getDispatchVehicleId());
			pdaDriverInfoVo.setDisPieNo(childWaybillApiVo.getDisDispatchVehicleId());
			pdaDriverInfoVo.setIsSent(childWaybillApiVo.getIsSent());
			pdaDriverInfoVo.setSmsStatus(childWaybillApiVo.getSmsStatus());
			truckBoxs.add(pdaDriverInfoVo);
		}
		return truckBoxs;
	}

}



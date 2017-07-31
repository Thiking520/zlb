package com.zhilianbao.erp.app.impl.dispatchvehicle;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.collections.CollectionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.app.impl.cache.UserCacheUtil;
import com.zhilianbao.erp.app.service.dispatchvehicle.IDispatchVehicleService;
import com.zhilianbao.erp.app.vo.dispatchvehicle.PieTruckSignAmountReqVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.PieTruckSignAmountRespVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqAcceptPieVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqDispatchVehicleVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqDistributeSureVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqLoadUpVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqSearchFinishPieInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspAcceptPieVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspDispatchVehicleObjectVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspLoadUpVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspSearchFinishPieInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspWaybillDetailObjectVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspWaybillObjectVo;
import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.IPdaDispatchVehicleBillService;
import com.zhilianbao.erp.tms.service.IPdaWayBillService;
import com.zhilianbao.erp.tms.vo.ChildWaybillVo;
import com.zhilianbao.erp.tms.vo.DispatchVehicleSearchVo;
import com.zhilianbao.erp.tms.vo.DispatchVehicleVo;
import com.zhilianbao.erp.tms.vo.QueryWayBillConditionVo;
import com.zhilianbao.erp.tms.vo.pda.PdaDriverInfoDetailVo;
import com.zhilianbao.erp.tms.vo.pda.PdaDriverInfoVo;
import com.zhilianbao.erp.tms.vo.pda.PdaPieInfoVo;

/**
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月15日上午10:58:49
* @description:调度管理(派车相关操作)
*/
@Path("dispatch")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
@Service

public class DispatchvehicleServiceImpl implements IDispatchVehicleService {
	
	private static Logger logger = LogManager.getLogger(DispatchvehicleServiceImpl.class);

	@Reference
	private IPdaDispatchVehicleBillService  pdaDispatchVehicleBillService;
	@Reference
	private IPdaWayBillService  pdaWayBillService;
	
	/**
	* @Title: getDispatchVehicleList
	* @author chenzhancheng
	* @date 2017年3月17日下午2:40:26
	* @param rspDispatchVehicleVo
	* @return ResponseResult<RspDispatchVehicleVo>
	* @description:获取派车单列表
	*/
	@POST
    @Path("dispatchVehicleList")
	@Override
	public ResponseResult<RspDispatchVehicleObjectVo> getDispatchVehicleList(ReqDispatchVehicleVo reqDispatchVehicleVo){
		ResponseResult<RspDispatchVehicleObjectVo> resp = new ResponseResult<RspDispatchVehicleObjectVo>();
		try {
			AppUserVo user = UserCacheUtil.getUser(reqDispatchVehicleVo.getuCenterId());
			DispatchVehicleSearchVo dispatchVehicleVo = new DispatchVehicleSearchVo();
			dispatchVehicleVo.setDriver(Long.valueOf(user.getEmployeeId()));
			
			String opType = reqDispatchVehicleVo.getType();
			List<String> paramList = new ArrayList<String>();
			if (null != reqDispatchVehicleVo && opType.equals(Constants.APP_DISPATCH_STATUS_ACCEPT)) {
				paramList.add(Constants.DISPATCH_STATUS_PAI);
			} else if (null != reqDispatchVehicleVo && opType.equals(Constants.APP_DISPATCH_STATUS_EXECUTE)) {
				paramList.add(Constants.DISPATCH_STATUS_ACCEPTED);
				paramList.add(Constants.DISPATCH_STATUS_TRUNKED);
				paramList.add(Constants.DISPATCH_STATUS_SEND);
			} else if (null != reqDispatchVehicleVo && opType.equals(Constants.APP_DISPATCH_STATUS_COMPLETE)) {
				paramList.add(Constants.DISPATCH_STATUS_COMPLETE);
			} else if (null != reqDispatchVehicleVo && opType.equals(Constants.APP_DISPATCH_STATUS_SMS_SEND)) {
				paramList.add(Constants.DISPATCH_STATUS_TRUNKED);
				paramList.add(Constants.DISPATCH_STATUS_SEND);
			}
			dispatchVehicleVo.setParamList(paramList);
			dispatchVehicleVo.setDispatchVehicleId(reqDispatchVehicleVo.getPieNo());
			dispatchVehicleVo.setPageSize(reqDispatchVehicleVo.getPageSize());
			dispatchVehicleVo.setCurrentPage((reqDispatchVehicleVo.getPageNo() - 1) * reqDispatchVehicleVo.getPageSize());
			dispatchVehicleVo.setType(opType);
			List<PdaPieInfoVo> pieInfoList = pdaDispatchVehicleBillService
					.queryDispatchVehicleBillByPage(dispatchVehicleVo);
			return resp.success(new RspDispatchVehicleObjectVo(pieInfoList));
		} catch (Exception e) {
			e.printStackTrace();
			return resp.err();
		}
	}
	
	/**
	 * 
	* @Title: searchFinishPieInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午5:48:34
	* @param reqSearchFinishPieInfoVo
	* @return 
	* @description:按派车单号搜索派车单列表（支持模糊查询）
	 */
	@POST
    @Path("searchFinishPieInfo")
	@Override
	public ResponseResult<RspSearchFinishPieInfoVo> searchFinishPieInfo(ReqSearchFinishPieInfoVo reqSearchFinishPieInfoVo) {
		AppUserVo user = UserCacheUtil.getUser(reqSearchFinishPieInfoVo.getuCenterId());
		
		DispatchVehicleSearchVo vo = new DispatchVehicleSearchVo();
		List<String> paramList = new ArrayList<String>();
		paramList.add(Constants.DISPATCH_STATUS_COMPLETE);
		vo.setDriver(Long.valueOf(user.getEmployeeId()));
		vo.setDisDispatchVehicleId(reqSearchFinishPieInfoVo.getPieNo());
		vo.setParamList(paramList);
		vo.setPageSize(reqSearchFinishPieInfoVo.getPageSize());
		vo.setCurrentPage((reqSearchFinishPieInfoVo.getPageNo() - 1) * reqSearchFinishPieInfoVo.getPageSize());
		List<PdaPieInfoVo> voList = pdaDispatchVehicleBillService.queryDispatchVehicleBillByPage(vo);
		return new ResponseResult<RspSearchFinishPieInfoVo>().success(new RspSearchFinishPieInfoVo(voList));
	}
	
	


	/**
	* @Title: getWaybillList
	* @author chenzhancheng
	* @date 2017年3月17日下午2:47:17
	* @param rspWaybillVo
	* @return ResponseResult<RspWaybillVo>
	* @description:获取运单列表
	*/
	@POST
    @Path("waybillList")
	@Override
	public ResponseResult<RspWaybillObjectVo> getWaybillList(ReqDispatchVehicleVo reqDispatchVehicleVo) {
		ResponseResult<RspWaybillObjectVo> resp = new ResponseResult<RspWaybillObjectVo>();
		QueryWayBillConditionVo vo=new QueryWayBillConditionVo();
		vo.setDispatchVehicleId(reqDispatchVehicleVo.getPieNo());
		vo.setPageSize(reqDispatchVehicleVo.getPageSize());
		vo.setCurrentPage((reqDispatchVehicleVo.getPageNo()-1)*reqDispatchVehicleVo.getPageSize());
		try {
			List<PdaDriverInfoVo> voList=pdaWayBillService.queryWayBillByPage(vo);
			return resp.success(new RspWaybillObjectVo(voList));
		} catch (Exception e) {
			logger.error(e);
			return resp.err();
		}
	}

	/**
	* @Title: getWaybillVoDetail
	* @author chenzhancheng
	* @date 2017年3月17日下午2:58:59
	* @param rspWaybillVoDetail
	* @return ResponseResult<RspWaybillDetailVo>
	* @description:查询运单详情
	*/
	@POST
    @Path("waybillDetail")
	@Override
	public ResponseResult<RspWaybillDetailObjectVo> getWaybillVoDetail(ReqDispatchVehicleVo reqDispatchVehicleVo) {
		ResponseResult<RspWaybillDetailObjectVo> resp = new ResponseResult<RspWaybillDetailObjectVo>();
		QueryWayBillConditionVo vo = new QueryWayBillConditionVo();
		vo.setChildWaybillId(reqDispatchVehicleVo.getDriverNo());
		vo.setPageSize(reqDispatchVehicleVo.getPageSize());
		vo.setCurrentPage((reqDispatchVehicleVo.getPageNo() - 1) * reqDispatchVehicleVo.getPageSize());
		try {
			List<PdaDriverInfoDetailVo> voList = pdaWayBillService.queryWayBillDetail(vo);
			if(CollectionUtils.isEmpty(voList)){
				return resp.failure(ResultEnum.EMPTY);
			}
			PdaDriverInfoDetailVo pidVo = voList.get(0);
			return resp.success(new RspWaybillDetailObjectVo(pidVo));
		} catch (Exception e) {
			logger.error(e);
			return resp.err();
		}
	}

	/**
	 * 
	* @Title: acceptPie
	* @author chenzhancheng
	* @date 2017年3月29日下午2:57:37
	* @param reqDispatchVehicleVo
	* @return 
	* @description:接收派单
	 */
	@POST
    @Path("acceptPie")
	@Override
	public ResponseResult<RspAcceptPieVo> acceptPie(ReqAcceptPieVo reqAcceptPieVo) {
		ResponseResult<RspAcceptPieVo> resp = new ResponseResult<RspAcceptPieVo>();
		DispatchVehicleVo dispatchVehicleVo=new DispatchVehicleVo();
		dispatchVehicleVo.setDispatchVehicleId(reqAcceptPieVo.getPieNo());
		dispatchVehicleVo.setDispatchStatus(Constants.DISPATCH_STATUS_ACCEPTED);
		try {
			pdaDispatchVehicleBillService.updateDispatchVehicleStatus(dispatchVehicleVo);
			return resp.success();
		} catch (Exception e) {
			logger.error(e);
			return resp.err();
		}
	}
	
	/**
	* @Title: updateLoadUpState
	* @author chenzhancheng
	* @date 2017年3月17日下午3:17:37
	* @param reqLoadUpVo
	* @return ResponseResult<RspLoadUpVo>
	* @description:确认装车/全部确认装车，移除装车/移除全部装车(修改装车状态)
	*/
	@POST
    @Path("updateLoadUpState")
	@Override
	public ResponseResult<RspLoadUpVo> updateLoadUpState(ReqLoadUpVo reqLoadUpVo) {
		AppUserVo user = UserCacheUtil.getUser(reqLoadUpVo.getuCenterId());
		ResponseResult<RspLoadUpVo> resp = new ResponseResult<RspLoadUpVo>();
		DispatchVehicleVo dispatchVehicleVo = new DispatchVehicleVo();
		ChildWaybillVo childWaybillVo = new ChildWaybillVo();
		childWaybillVo.setChildWaybillId(reqLoadUpVo.getDriverNo());
		if (reqLoadUpVo.getIsTruck()) {
			childWaybillVo.setPickUpGoodsTime(new Date());
			childWaybillVo.setChildWalbillStatus(Constants.DISPATCH_STATUS_TRUNKED);
		} else {
			childWaybillVo.setChildWalbillStatus(Constants.DISPATCH_STATUS_ACCEPTED);
		}
		
		QueryWayBillConditionVo cwbVo = new QueryWayBillConditionVo();
		cwbVo.setChildWalbillStatus(Constants.DISPATCH_STATUS_TRUNKED);
		cwbVo.setDispatchVehicleId(reqLoadUpVo.getPieNo());
		int sureTruckAmount = 0;
		int truckAmount = 0;
		dispatchVehicleVo.setDispatchVehicleId(reqLoadUpVo.getPieNo());
		dispatchVehicleVo.setTruckLoadingId(Long.valueOf(reqLoadUpVo.getuCenterId()));
		dispatchVehicleVo.setOperatorId(Long.valueOf(user.getOperatorId()));
		DispatchVehicleVo pieVo = pdaDispatchVehicleBillService.queryDispatchVehicleBillDetail(dispatchVehicleVo);
		if (null == pieVo) {
			return resp.failure("00001", "派车单号有误，禁止任何操作！");
		}
		if (pieVo.getDispatchStatus().equals(Constants.DISPATCH_STATUS_SEND)) {
			return resp.failure("00002", "派车单有误，禁止任何操作！请确认派车单状态是否允许装车或者拆除");
		}
		
		if (reqLoadUpVo.getIsAll()) {
			pdaWayBillService.updateVehicleOfChildWayBillStatus(dispatchVehicleVo, childWaybillVo);
			int vehicleResult = pdaDispatchVehicleBillService.updateDispatchVehicleStatus(dispatchVehicleVo);
			sureTruckAmount = pdaWayBillService.queryChildWayBillByStatus(cwbVo);
			cwbVo.setChildWalbillStatus(null);
		} else {
			pdaWayBillService.updateChildWayBillStatus(childWaybillVo);
			sureTruckAmount = pdaWayBillService.queryChildWayBillByStatus(cwbVo);
			cwbVo.setChildWalbillStatus(null);
		}
		List<String> paramList = new ArrayList<String>();
		paramList.add(Constants.DISPATCH_STATUS_ACCEPTED);
		paramList.add(Constants.DISPATCH_STATUS_TRUNKED);
		cwbVo.setParamList(paramList);
		truckAmount = pdaWayBillService.queryChildWayBillByStatus(cwbVo);
		logger.info("Req=======>"+(reqLoadUpVo.getIsTruck() ? "确认装车操作，" : "移除装车操作，")+"sureTruckAmount={},truckAmount={}",sureTruckAmount,truckAmount);
		if (reqLoadUpVo.getIsTruck()) {
			if (sureTruckAmount == truckAmount) {
				dispatchVehicleVo.setTruckLoadingTime(new Date());
				dispatchVehicleVo.setDispatchStatus(Constants.DISPATCH_STATUS_TRUNKED);
				pdaDispatchVehicleBillService.updateDispatchVehicleStatus(dispatchVehicleVo);
			}
		} else {
			dispatchVehicleVo.setDispatchStatus(Constants.DISPATCH_STATUS_ACCEPTED);
			pdaDispatchVehicleBillService.updateDispatchVehicleStatus(dispatchVehicleVo);
		}
		
		return resp.success(new RspLoadUpVo(sureTruckAmount, truckAmount));
	}

	/**
	* @Title: distributeSure
	* @author chenzhancheng
	* @date 2017年3月16日下午1:46:04
	* @param reqLoadUpVo
	* @return ResponseResult
	* @description:发运确认
	*/
	@POST
    @Path("distributeSure")
	@Override
	public ResponseResult<Object> distributeSure(ReqDistributeSureVo reqLoadUpVo) {
		AppUserVo user = UserCacheUtil.getUser(reqLoadUpVo.getuCenterId());
		ResponseResult<Object> resp = new ResponseResult<Object>();
		String dispatchVehicleId = reqLoadUpVo.getPieNo();
		DispatchVehicleVo dispatchVehicleVo=new DispatchVehicleVo();
		dispatchVehicleVo.setDispatchVehicleId(reqLoadUpVo.getPieNo());
		dispatchVehicleVo.setDispatchStatus(Constants.DISPATCH_STATUS_SEND);
		dispatchVehicleVo.setPracticalDepartTime(new Date());
		
		dispatchVehicleVo.setPracticalDepartId(Long.valueOf(reqLoadUpVo.getuCenterId()));
		dispatchVehicleVo.setOperatorId(Long.valueOf(user.getOperatorId()));
		try {
			//检测已装车运单数量是否与运单总数相等，是才允许发车
			Map<String,Object> resultMap = pdaDispatchVehicleBillService.getSureTruckAmountAndSumAmount(dispatchVehicleId);
			if(null == resultMap){
				return resp.failure(ResultEnum.EMPTY);
			}
			//已装车运单数
			int sureTruckAmount = Integer.parseInt(resultMap.get("suretruckamount").toString());
			//运单总数
			int truckAmount = Integer.parseInt(resultMap.get("truckamount").toString());
			logger.info("Req===>已装车运单数量={},运单总数={}",sureTruckAmount,truckAmount);
			if(sureTruckAmount != truckAmount){
				return resp.failure(ResultEnum.WAYBILL_NOT_All_SURE_TRUCK);
			}
			
			pdaDispatchVehicleBillService.updateDispatchVehicleStatus(dispatchVehicleVo);
			//更新运单状态为在途中
			ChildWaybillVo vo = new ChildWaybillVo();
			vo.setChildWalbillStatus("50");
			vo.setTruckingStatus("1");
			pdaWayBillService.updateVehicleOfChildWayBillStatus(dispatchVehicleVo, vo);
			return resp.success();
		} catch (Exception e) {
			logger.error(e);
			return resp.err();
		}
	}

	/**
	 * 
	* @Title: cancelAcceptDispatchTask
	* @author chenzhancheng
	* @date 2017年4月11日下午6:03:55
	* @param reqLoadUpVo
	* @return ResponseResult<Object>
	* @description:取消已经接受的派车单接口
	 */
	@POST
    @Path("cancelAcceptDispatchTask")
	@Override
	public ResponseResult<Object> cancelAcceptDispatchTask(ReqDistributeSureVo reqLoadUpVo){
		ResponseResult<Object> resp = new ResponseResult<Object>();
		DispatchVehicleVo dispatchVehicleVo=new DispatchVehicleVo();
		dispatchVehicleVo.setDispatchVehicleId(reqLoadUpVo.getPieNo());
		dispatchVehicleVo.setDispatchStatus(Constants.DISPATCH_STATUS_CANCLE);
		try {
			pdaDispatchVehicleBillService.updateDispatchVehicleStatus(dispatchVehicleVo);
			return resp.success();
		} catch (Exception e) {
			logger.error(e);
			return resp.err();
		}
	}
	
	/**
	 * @title:getPieTruckSignAmount
	 * @author plm
	 * @date 2017年6月2日 上午11:35:32
	 * @return ResponseResult<PieTruckSignAmountRespVo>
	 * @description: 获取派车单对应，装车与未装车、签收与未签收数量
	 */
	@POST
	@Path("getPieTruckSignAmount")
	@Override
	public ResponseResult<PieTruckSignAmountRespVo> getPieTruckSignAmount(PieTruckSignAmountReqVo req) {
		Integer sureTruckAmount = null;
		Integer truckAmount = null;
		Integer sureSignAmount = null;
		Integer signAmount;
		ResponseResult<PieTruckSignAmountRespVo> resp = new ResponseResult<PieTruckSignAmountRespVo>();
		PieTruckSignAmountRespVo respVo = new PieTruckSignAmountRespVo();
		try {
			String pieNo = req.getPieNo();
			// 查询条件
			QueryWayBillConditionVo cwbVo = new QueryWayBillConditionVo();
			cwbVo.setChildWalbillStatus(Constants.DISPATCH_STATUS_TRUNKED);
			cwbVo.setDispatchVehicleId(pieNo);
			// 获取已装车数量
			sureTruckAmount = pdaWayBillService.queryChildWayBillByStatus(cwbVo);
			cwbVo.setChildWalbillStatus(null);
			// 获取需要装车总数
			List<String> paramList = new ArrayList<String>();
			paramList.add(Constants.DISPATCH_STATUS_ACCEPTED);
			paramList.add(Constants.DISPATCH_STATUS_TRUNKED);
			cwbVo.setParamList(paramList);
			truckAmount = pdaWayBillService.queryChildWayBillByStatus(cwbVo);

			respVo.setSureTruckAmount(sureTruckAmount);
			respVo.setTruckAmount(truckAmount);
			
			cwbVo.setParamList(null);
			cwbVo.setChildWalbillStatus(null);
			cwbVo.setDispatchVehicleId(pieNo);
			cwbVo.setChildWalbillStatus("99");
			//查询派车单对应-已经签收总数
			sureSignAmount = pdaWayBillService.queryChildWayBillByStatus(cwbVo);
			cwbVo.setChildWalbillStatus(null);
			
			//查询派车单对应需要签收总数
			signAmount = pdaWayBillService.queryChildWayBillByStatus(cwbVo);
			respVo.setSignAmount(signAmount);
			respVo.setSureSignAmount(sureSignAmount);

		} catch (Exception e) {
			e.printStackTrace();
			return resp.err();
		}
		return resp.success(respVo);
	}
}

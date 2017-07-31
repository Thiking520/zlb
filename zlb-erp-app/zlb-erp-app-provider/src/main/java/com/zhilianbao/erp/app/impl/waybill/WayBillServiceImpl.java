package com.zhilianbao.erp.app.impl.waybill;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.app.impl.cache.UserCacheUtil;
import com.zhilianbao.erp.app.service.waybill.IWayBillService;
import com.zhilianbao.erp.app.vo.ReqBaseVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqExceptionSignSureVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqQuerySignInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqSearchSignInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqSearchTruckInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqSignSureVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.ReqTruckInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspExceptionClassVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspQueryTruckInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspSearchTruckInfoVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspSignInfoDetailVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspSignSureVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspTruckInfoDetailVo;
import com.zhilianbao.erp.app.vo.dispatchvehicle.RspTruckInfoVo;
import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.app.vo.waybill.ExceptionClassVo;
import com.zhilianbao.erp.auth.service.parameter.ISystemDictService;
import com.zhilianbao.erp.auth.vo.parameter.rpc.DictVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.util.CollectionUtils;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.IDispatchVehicleService;
import com.zhilianbao.erp.tms.service.IPdaWayBillService;
import com.zhilianbao.erp.tms.vo.ChildWaybillVo;
import com.zhilianbao.erp.tms.vo.DispatchVehicleVo;
import com.zhilianbao.erp.tms.vo.QueryWayBillConditionVo;
import com.zhilianbao.erp.tms.vo.pda.PdaDriverInfoDetailVo;
import com.zhilianbao.erp.tms.vo.pda.PdaDriverInfoVo;
@Service
@Path("waybill")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
public class WayBillServiceImpl implements IWayBillService{
	private static Logger logger = LogManager.getLogger(WayBillServiceImpl.class);
	@Reference
	private IPdaWayBillService  pdaWayBillService;
	@Reference
	private ISystemDictService systemDictService;
	@Reference
	private IDispatchVehicleService iDVService;

	/**
	 * 
	* @Title: queryTruckInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午3:40:30
	* @param reqTruckInfoVo
	* @return ResponseResult<List<RspTruckInfoVo>>
	* @description:按派车单-查询确认/未确认装车运单列表
	 */
	@POST
    @Path("queryTruckInfo")
	@Override
	public ResponseResult<RspQueryTruckInfoVo> queryTruckInfo(ReqTruckInfoVo reqTruckInfoVo) {
		ResponseResult<RspQueryTruckInfoVo> resp = new ResponseResult<RspQueryTruckInfoVo>();
		QueryWayBillConditionVo vo = new QueryWayBillConditionVo();
		vo.setDispatchVehicleId(reqTruckInfoVo.getPieNo());
		List<String> walbillStatList = new ArrayList<String>();
		if (reqTruckInfoVo.getIsTruck()) {
			//已装车或在途中状态的都算做已装车的运单
			walbillStatList.add("30");
			walbillStatList.add("50");
		} else {
			walbillStatList.add("20");
		}
		vo.setWalbillStatList(walbillStatList);
		vo.setPageSize(reqTruckInfoVo.getPageSize());
		vo.setCurrentPage((reqTruckInfoVo.getPageNo() - 1) * reqTruckInfoVo.getPageSize());
		List<PdaDriverInfoVo> wayBillList = pdaWayBillService.queryWayBillByPage(vo);
		return resp.success(new RspQueryTruckInfoVo(wayBillList));
	}
	/**
	 * 
	* @Title: searchTruckInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午3:47:02
	* @param reqSearchTruckInfoVo
	* @return ResponseResult<List<RspTruckInfoVo>>
	* @description:通过派车单号或运单号，模糊搜索未被签收的：确认/未确认装车列表
	 */
	@POST
    @Path("searchTruckInfo")
	@Override
	public ResponseResult<RspSearchTruckInfoVo> searchTruckInfo(ReqSearchTruckInfoVo reqSearchTruckInfoVo) {
		ResponseResult<RspSearchTruckInfoVo> resp = new ResponseResult<RspSearchTruckInfoVo>();
		AppUserVo user = UserCacheUtil.getUser(reqSearchTruckInfoVo.getuCenterId());
		QueryWayBillConditionVo vo = new QueryWayBillConditionVo();
		List<String> walbillStatList = new ArrayList<String>();
		walbillStatList.add("20");
		vo.setUserId(Long.valueOf(user.getEmployeeId()));
		vo.setDispatchStatus("20");
		vo.setWalbillStatList(walbillStatList);
		vo.setSearchTag(reqSearchTruckInfoVo.getSearchTag());
		vo.setPageSize(reqSearchTruckInfoVo.getPageSize());
		vo.setCurrentPage((reqSearchTruckInfoVo.getPageNo() - 1) * reqSearchTruckInfoVo.getPageSize());

		List<PdaDriverInfoVo> wayBillList = pdaWayBillService.queryWayBillByPage(vo);
		return resp.success(new RspSearchTruckInfoVo(wayBillList));
	}
	/**
	 * 
	* @Title: querySignInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午3:54:48
	* @param reqQuerySignInfoVo
	* @return ResponseResult<List<RspTruckInfoVo>>
	* @description:查询确认/未确认签收运单列表
	 */
	@POST
    @Path("querySignInfo")
	@Override
	public ResponseResult<RspTruckInfoVo> querySignInfo(ReqQuerySignInfoVo reqQuerySignInfoVo) {
		ResponseResult<RspTruckInfoVo> resp = new ResponseResult<RspTruckInfoVo>();
		QueryWayBillConditionVo vo = new QueryWayBillConditionVo();
		
		vo.setDispatchVehicleId(reqQuerySignInfoVo.getPieNo());
		vo.setPageSize(reqQuerySignInfoVo.getPageSize());
		vo.setCurrentPage((reqQuerySignInfoVo.getPageNo() - 1) * reqQuerySignInfoVo.getPageSize());
		List<String> walbillStatList = new ArrayList<String>();
		if (reqQuerySignInfoVo.getIsSign()) {
			walbillStatList.add("99");
		} else {
			//必须是已发车的派车单才能查出未签收的运单列表
			vo.setDispatchStatus("40");
			walbillStatList.add("30");
			walbillStatList.add("50");
		}
		vo.setWalbillStatList(walbillStatList);
		vo.setPageSize(reqQuerySignInfoVo.getPageSize());
		vo.setCurrentPage((reqQuerySignInfoVo.getPageNo() - 1) * reqQuerySignInfoVo.getPageSize());
		List<PdaDriverInfoVo> wayBillList = pdaWayBillService.queryWayBillByPage(vo);
		return resp.success(new RspTruckInfoVo(wayBillList));
	}
	/**
	 * 
	* @Title: searchSignInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午4:00:19
	* @param reqSearchSignInfoVo
	* @return ResponseResult<List<RspTruckInfoDetailVo>>
	* @description:快捷签收模糊搜索
	 */
	@POST
    @Path("searchSignInfo")
	@Override
	public ResponseResult<RspTruckInfoDetailVo> searchSignInfo(ReqSearchSignInfoVo reqSearchSignInfoVo) {
		ResponseResult<RspTruckInfoDetailVo> resp = new ResponseResult<RspTruckInfoDetailVo>();
		AppUserVo user = UserCacheUtil.getUser(reqSearchSignInfoVo.getuCenterId());
		QueryWayBillConditionVo vo = new QueryWayBillConditionVo();
		vo.setUserId(Long.valueOf(user.getEmployeeId()));
		vo.setSearchTag(reqSearchSignInfoVo.getSearchTag());
		Map<String, Object> map = new HashMap<String, Object>();
		//已发运的运单才允许被签收
		map.put("status", "50");
		vo.setMap(map);
		vo.setPageSize(reqSearchSignInfoVo.getPageSize());
		vo.setCurrentPage((reqSearchSignInfoVo.getPageNo() - 1) * reqSearchSignInfoVo.getPageSize());
		List<PdaDriverInfoDetailVo> wayBillList = pdaWayBillService.queryWayBillDetail(vo);
		return resp.success(new RspTruckInfoDetailVo(wayBillList));
	}
	
	/**
	 * 
	* @Title: querySignDetailInfo
	* @author chenzhancheng
	* @date 2017年4月5日下午5:25:45
	* @param reqSearchSignInfoVo
	* @return 
	* @description:按运单号查询签收详情
	 */
	@POST
    @Path("querySignDetailInfo")
	@Override
	public ResponseResult<RspSignInfoDetailVo> querySignDetailInfo(ReqSearchSignInfoVo reqSearchSignInfoVo) {
		ResponseResult<RspSignInfoDetailVo> resp = new ResponseResult<RspSignInfoDetailVo>();
		QueryWayBillConditionVo vo = new QueryWayBillConditionVo();
		vo.setChildWaybillId(reqSearchSignInfoVo.getDriverNo());
		List<PdaDriverInfoDetailVo> driverList = pdaWayBillService.queryWayBillDetail(vo);
		if (CollectionUtils.isEmpty(driverList)) {
			return resp.failure(ResultEnum.EMPTY);
		}
		PdaDriverInfoDetailVo driverInfoDetailVo = driverList.get(0);
		return resp.success(new RspSignInfoDetailVo(driverInfoDetailVo));
		

	}
	
	/**
	* @Title: signSure
	* @author chenzhancheng
	* @date 2017年3月20日下午1:57:52
	* @param reqSignSureVo
	* @return ResponseResult<RspSignSureVo>
	* @description:正常签收运单
	*/
	@POST
    @Path("signSure")
	@Override
	public ResponseResult<RspSignSureVo> signSure(ReqSignSureVo reqSignSureVo) {
		AppUserVo user = UserCacheUtil.getUser(reqSignSureVo.getuCenterId());
		ResponseResult<RspSignSureVo> resp = new ResponseResult<RspSignSureVo>();
		// 派车单
		String dispatchVehicleId = reqSignSureVo.getPieNo();
		// 運單
		String childWaybillId = reqSignSureVo.getDriverNo();
		if(StringUtils.isBlank(dispatchVehicleId)){
			dispatchVehicleId = pdaWayBillService.queryDispatchVehicleIdByChildWaybillId(childWaybillId);
		}
		ChildWaybillVo vo = new ChildWaybillVo();
		vo.setChildWaybillId(childWaybillId);
		vo.setChildWalbillStatus("99");
		vo.setSignInResult("1");
		
		vo.setOperatorId(Long.valueOf(user.getOperatorId()));
		vo.setUserId(Long.valueOf(reqSignSureVo.getuCenterId()));
		
		vo.setSignInPeople(reqSignSureVo.getuCenterId());
		vo.setSignInTime(new Date());
		
		pdaWayBillService.updateChildWayBillStatus(vo);
		QueryWayBillConditionVo conditionVo = new QueryWayBillConditionVo();
		conditionVo.setDispatchVehicleId(dispatchVehicleId);
		conditionVo.setChildWalbillStatus("99");
		int sureSignAmount = pdaWayBillService.queryChildWayBillByStatus(conditionVo);
		conditionVo.setChildWalbillStatus(null);
		int signAmount = pdaWayBillService.queryChildWayBillByStatus(conditionVo);
		// 若派车单下的所有运单都被正常签收则更新派车单状态为已完成状态
		logger.info("正常签收运单,sureSignAmount={},signAmount={}",sureSignAmount,signAmount);
		updateDispatchVehicleComplete(dispatchVehicleId, sureSignAmount, signAmount);
		return resp.success(new RspSignSureVo(sureSignAmount, signAmount));
	}
	
	/**
	* @Title: updateDispatchVehicleComplete
	* @author chenzhancheng
	* @date 2017年5月11日下午8:07:49
	* @param dispatchVehicleId
	* @param sureSignAmount 已签收的运单数
	* @param signAmount 运单总数
	* @description:若派车单下的所有运单都被正常签收则更新派车单状态为已完成状态
	*/
	private void updateDispatchVehicleComplete(String dispatchVehicleId, int sureSignAmount, int signAmount) {
		if (sureSignAmount == signAmount) {
			DispatchVehicleVo dv = new DispatchVehicleVo();
			dv.setDispatchVehicleId(dispatchVehicleId);
			dv.setDispatchStatus("99");
			dv.setFinishTime(new Date());
			iDVService.updateDispatchVehicle(dv);
		}
	}
	
    /**
     * 
    * @Title: exceptionSignSure
    * @author chenzhancheng
    * @date 2017年3月29日下午5:48:24
    * @param reqExceptionSignSureVo
    * @return 
    * @description:异常签收运单
     */
	@POST
    @Path("exceptionSignSure")
	@Override
	public ResponseResult<RspSignSureVo> exceptionSignSure(ReqExceptionSignSureVo reqExceptionSignSureVo) {
		AppUserVo user = UserCacheUtil.getUser(reqExceptionSignSureVo.getuCenterId());
		ResponseResult<RspSignSureVo> resp = new ResponseResult<RspSignSureVo>();
		// 派车单
		String dispatchVehicleId = reqExceptionSignSureVo.getPieNo();
		// 運單
		String childWaybillId = reqExceptionSignSureVo.getDriverNo();

		ChildWaybillVo vo = new ChildWaybillVo();
		vo.setChildWaybillId(childWaybillId);
		vo.setChildWalbillStatus("99");
		vo.setSignInResult("0");
		
		vo.setOperatorId(Long.valueOf(user.getOperatorId()));
		vo.setUserId(Long.valueOf(reqExceptionSignSureVo.getuCenterId()));
		
		if (reqExceptionSignSureVo.getSignException() != null) {
			vo.setSignInReason(reqExceptionSignSureVo.getSignException().getExceptionReason());
			vo.setSignInType(reqExceptionSignSureVo.getSignException().getSignExceptionClassID());
		}
		pdaWayBillService.updateChildWayBillStatus(vo);
		
		QueryWayBillConditionVo conditionVo = new QueryWayBillConditionVo();
		conditionVo.setDispatchVehicleId(dispatchVehicleId);
		conditionVo.setChildWalbillStatus("99");
		int sureSignAmount = pdaWayBillService.queryChildWayBillByStatus(conditionVo);
		conditionVo.setChildWalbillStatus(null);
		int signAmount = pdaWayBillService.queryChildWayBillByStatus(conditionVo);
		updateDispatchVehicleComplete(dispatchVehicleId, sureSignAmount, signAmount);
		return resp.success(new RspSignSureVo(sureSignAmount, signAmount));
	}
	
	/**
	 * 
	* @Title: queryExceptionClass
	* @author chenzhancheng
	* @date 2017年4月13日下午1:59:17
	* @param reqBaseVo
	* @return 
	* @description:获取异常处理分类
	 */
	@POST
    @Path("queryExceptionClass")
	@Override
	public ResponseResult<RspExceptionClassVo> queryExceptionClass(ReqBaseVo reqBaseVo) {
		ResponseResult<RspExceptionClassVo> resp = new ResponseResult<RspExceptionClassVo>();
		List<DictVo> dbList = systemDictService
				.getDictList(Long.parseLong(reqBaseVo.getOperatorId()), Constants.TMS_SIGN_IN_TYPE).getData();
		List<ExceptionClassVo> ecList = new ArrayList<ExceptionClassVo>();
		if (CollectionUtils.isNotEmpty(dbList)) {
			for (DictVo vo : dbList) {
				ExceptionClassVo exceptionClassVo = new ExceptionClassVo();
				exceptionClassVo.setExId(vo.getDictValue());
				exceptionClassVo.setExName(vo.getDictDesc());
				ecList.add(exceptionClassVo);
			}
		}
		return resp.success(new RspExceptionClassVo(ecList));
	}
	
}
package com.zhilianbao.erp.app.service.dispatchvehicle;

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
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月15日上午11:49:30
* @description:车辆调度管理servic
*/
public interface IDispatchVehicleService {
	
	/**
	* @Title: getDispatchVehicleList
	* @author chenzhancheng
	* @date 2017年3月17日下午2:40:26
	* @param rspDispatchVehicleVo
	* @return ResponseResult<RspDispatchVehicleObjectVo>
	* @description:获取派车单列表
	*/
	public ResponseResult<RspDispatchVehicleObjectVo> getDispatchVehicleList(ReqDispatchVehicleVo reqDispatchVehicleVo);

	/**
	* @Title: getWaybillList
	* @author chenzhancheng
	* @date 2017年3月17日下午2:47:17
	* @param rspWaybillVo
	* @return ResponseResult<RspWaybillObjectVo>
	* @description:获取运单列表
	*/
	public ResponseResult<RspWaybillObjectVo> getWaybillList(ReqDispatchVehicleVo reqDispatchVehicleVo);
	
	/**
	* @Title: getWaybillVoDetail
	* @author chenzhancheng
	* @date 2017年3月17日下午2:58:59
	* @param rspWaybillVoDetail
	* @return ResponseResult<RspWaybillDetailObjectVo>
	* @description:查询运单详情
	*/
	public ResponseResult<RspWaybillDetailObjectVo> getWaybillVoDetail(ReqDispatchVehicleVo reqDispatchVehicleVo);
	
	/**
	* @Title: updateLoadUpState
	* @author chenzhancheng
	* @date 2017年3月17日下午3:17:37
	* @param reqLoadUpVo
	* @return ResponseResult<RspLoadUpVo>
	* @description:确认装车/全部确认装车，移除装车/移除全部装车(修改装车状态)
	*/
	public ResponseResult<RspLoadUpVo> updateLoadUpState(ReqLoadUpVo reqLoadUpVo);
	
	/**
	* @Title: distributeSure
	* @author chenzhancheng
	* @date 2017年3月16日下午1:46:04
	* @param reqLoadUpVo
	* @return ResponseResult
	* @description:发运确认
	*/
	public ResponseResult<Object> distributeSure(ReqDistributeSureVo reqLoadUpVo);
	
	
	/**
	 * 
	* @Title: acceptPie
	* @author chenzhancheng
	* @date 2017年3月28日上午10:51:27
	* @param reqDispatchVehicleVo
	* @return ResponseResult<RspAcceptPieVo>
	* @description:接受派单接口
	 */
	public ResponseResult<RspAcceptPieVo> acceptPie(ReqAcceptPieVo reqAcceptPieVo);
	
	/**
	 * 
	* @Title: searchFinishPieInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午5:08:28
	* @param reqSearchFinishPieInfoVo
	* @return ResponseResult<RspSearchFinishPieInfoVo>
	* @description:按派车单号搜索派车单列表（支持模糊查询）
	 */
	public ResponseResult<RspSearchFinishPieInfoVo> searchFinishPieInfo(ReqSearchFinishPieInfoVo reqSearchFinishPieInfoVo);

	/**
	 * 
	* @Title: cancelAcceptDispatchTask
	* @author chenzhancheng
	* @date 2017年4月11日下午6:06:23
	* @param reqLoadUpVo
	* @return ResponseResult<Object>
	* @description:取消已经接受的派车单接口
	 */
	public ResponseResult<Object> cancelAcceptDispatchTask(ReqDistributeSureVo reqLoadUpVo);

	/**
	 * @title:getPieTruckSignAmount
	 * @author plm
	 * @date 2017年6月2日 上午11:35:32
	 * @return ResponseResult<PieTruckSignAmountRespVo>
	 * @description: 获取派车单对应，装车与未装车、签收与未签收数量
	 */
	public ResponseResult<PieTruckSignAmountRespVo> getPieTruckSignAmount(PieTruckSignAmountReqVo req);
	
}

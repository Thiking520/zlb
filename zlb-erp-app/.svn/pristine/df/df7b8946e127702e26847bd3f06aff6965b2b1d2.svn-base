package com.zhilianbao.erp.app.service.waybill;

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
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月28日上午10:59:02
* @description:运单接口
 */
public interface IWayBillService {

	/**
	 * 
	* @Title: queryTruckInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午3:40:30
	* @param reqTruckInfoVo
	* @return ResponseResult<List<RspTruckInfoVo>>
	* @description:按派车单-查询确认/未确认装车运单列表
	 */
	public ResponseResult<RspQueryTruckInfoVo> queryTruckInfo(ReqTruckInfoVo reqTruckInfoVo);
	
	/**
	 * 
	* @Title: searchTruckInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午3:47:02
	* @param reqSearchTruckInfoVo
	* @return ResponseResult<List<RspTruckInfoVo>>
	* @description:模糊搜索：确认/未确认装车列表
	 */
	public ResponseResult<RspSearchTruckInfoVo> searchTruckInfo(ReqSearchTruckInfoVo reqSearchTruckInfoVo);
	
	/**
	 * 
	* @Title: querySignInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午3:54:48
	* @param reqQuerySignInfoVo
	* @return ResponseResult<List<RspTruckInfoVo>>
	* @description:查询确认/未确认签收运单列表
	 */
	public ResponseResult<RspTruckInfoVo> querySignInfo(ReqQuerySignInfoVo reqQuerySignInfoVo);
	
	/**
	 * 
	* @Title: searchSignInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午4:00:19
	* @param reqSearchSignInfoVo
	* @return ResponseResult<List<RspTruckInfoDetailVo>>
	* @description:搜索：确认/未确认签收运单列表
	 */
	public ResponseResult<RspTruckInfoDetailVo> searchSignInfo(ReqSearchSignInfoVo reqSearchSignInfoVo);
	
	/**
	 * 
	* @Title: querySignDetailInfo
	* @author chenzhancheng
	* @date 2017年4月5日下午5:21:53
	* @param reqSearchSignInfoVo
	* @return ResponseResult<List<RspTruckInfoDetailVo>>
	* @description:按运单号查询签收详情
	 */
	public ResponseResult<RspSignInfoDetailVo> querySignDetailInfo(ReqSearchSignInfoVo reqSearchSignInfoVo);
	
	
	/**
	* @Title: signSure
	* @author chenzhancheng
	* @date 2017年3月20日下午1:57:52
	* @param reqSignSureVo
	* @return ResponseResult<RspSignSureVo>
	* @description:正常/异常签收运单
	*/
	public ResponseResult<RspSignSureVo> signSure(ReqSignSureVo reqSignSureVo);
    
	/**
	 * 
	* @Title: ExceptionSignSure
	* @author chenzhancheng
	* @date 2017年3月29日下午4:20:47
	* @param reqSignSureVo
	* @return ResponseResult<RspSignSureVo>
	* @description:异常签收运单
	 */
	public ResponseResult<RspSignSureVo> exceptionSignSure(ReqExceptionSignSureVo reqExceptionSignSureVo);
	
	/**
	 * 
	* @Title: queryExceptionClass
	* @author chenzhancheng
	* @date 2017年4月11日下午5:20:16
	* @param reqBaseVo
	* @return ResponseResult<RspExceptionClassVo>
	* @description:获取异常分类
	 */
	public ResponseResult<RspExceptionClassVo> queryExceptionClass(ReqBaseVo reqBaseVo);
}

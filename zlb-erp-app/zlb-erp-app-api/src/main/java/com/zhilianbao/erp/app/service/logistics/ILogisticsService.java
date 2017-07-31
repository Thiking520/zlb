package com.zhilianbao.erp.app.service.logistics;

import com.zhilianbao.erp.app.vo.logistics.ReqQueryLogisticInfoVo;
import com.zhilianbao.erp.app.vo.logistics.ResQueryLogisticInfoVo;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月15日上午11:49:30
* @description:物流管理service
*/
public interface ILogisticsService {
	/**
	 * 
	* @Title: queryLogisticInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午4:58:20
	* @param reqQueryLogisticInfoVo
	* @return ResponseResult<ResQueryLogisticInfoVo>
	* @description:按运单号查询物流信息
	 */
	public ResponseResult<ResQueryLogisticInfoVo> queryLogisticInfo(ReqQueryLogisticInfoVo reqQueryLogisticInfoVo);

    
    
}

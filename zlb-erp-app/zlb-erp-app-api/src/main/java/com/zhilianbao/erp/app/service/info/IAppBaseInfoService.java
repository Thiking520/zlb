package com.zhilianbao.erp.app.service.info;

import com.zhilianbao.erp.app.vo.user.ReqGetAppVersionVo;
import com.zhilianbao.erp.app.vo.user.ResGetAppVersionVo;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
 *   
* @company zhilianbao
* @author chenzhancheng
* @date 2017年4月20日上午10:10:13
* @description:app信息接口
 */
public interface IAppBaseInfoService {

	/**
	 * 
	* @Title: queryAppVersionInfo
	* @author chenzhancheng
	* @date 2017年4月20日上午11:15:01
	* @param vo
	* @return ResponseResult<ResGetAppVersionVo>
	* @description:获取app版本更新
	 */
	public ResponseResult<ResGetAppVersionVo> queryAppVersionInfo(ReqGetAppVersionVo vo);
}

package com.zhilianbao.erp.auth.service.parameter;

import java.util.Map;

import com.zhilianbao.erp.auth.vo.parameter.SystemParamVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;


/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年3月7日下午3:19:52
 * @description:系统数据参数服务
 */
public interface ISystemParamService {
	
	/**
	 * 根据id获取系统参数
	 * @param id
	 * @return
	 */
	public ResponseResult<SystemParamVo> getSystemParamById(Long id);
	
	/**
	 * 获取分页
	 * @param vo
	 * @return
	 */
	public ResponseResult<Page<SystemParamVo>> getPageByVo(ViewSearchVo vo);
	
	/**
	 * 删除
	 * @param bean
	 * @return
	 */
//	public ResponseResult<SystemParamVo> modifyDelSystemParamById(String type, Long id);
	
	/**
	 * 
	* @Title: addSystemParam
	* @author kuangzengye
	* @date 2017年3月8日下午1:02:27
	* @param vo
	* @return ResponseResult<SystemParamVo>
	* @description:新增
	 */
//	public ResponseResult<SystemParamVo> addSystemParam(SystemParamVo vo);
	
	/**
	 * 
	* @Title: updateSystemParam
	* @author kuangzengye
	* @date 2017年3月8日下午1:02:40
	* @param vo
	* @return ResponseResult<SystemParamVo>
	* @description:更新
	 */
//	public ResponseResult<SystemParamVo> updateSystemParam(SystemParamVo vo);

	/**
	 * 
	* @Title: effectSystemParam
	* @author kuangzengye
	* @date 2017年3月10日下午4:35:22
	* @param vo
	* @return ResponseResult<SystemParamVo>
	* @description:生效/失效
	 */
	public ResponseResult<SystemParamVo> effectSystemParam(SystemParamVo vo);

	/**
	 * 
	* @Title: effectSystemParam
	* @author kuangzengye
	* @date 2017年3月10日下午4:35:22
	* @param vo
	* @return ResponseResult<SystemParamVo>
	* @description:添加或更新系统参数
	 */
	public ResponseResult<SystemParamVo> addOrModifySystemParam(SystemParamVo vo);

	/**
	 * 
	* @Title: getParamValue
	* @author kuangzengye
	* @date 2017年4月27日下午5:27:36
	* @return ResponseResult<String>
	* @description:获取全局参数value
	 */
	public ResponseResult<String> getParamValue(Long operatorId,String paramKey);

	/**
	 * 
	* @Title: initDropDownBox
	* @author kuangzengye
	* @date 2017年4月28日上午8:39:06
	* @param operatorId
	* @return ResponseResult<Map<String,Object>>
	* @description:获取初始化下拉框数据
	 */
	public ResponseResult<Map<String, Object>> initDropDownBox(Long operatorId);

	/**
	 * 
	* @Title: getToDropDownBox
	* @author kuangzengye
	* @date 2017年4月28日上午9:21:48
	* @param operatorId
	* @param vo
	* @return ResponseResult<Map<String,Object>>
	* @description:获取新增/编辑下拉框数据
	 */
	public ResponseResult<Map<String, Object>> getToDropDownBox(Long operatorId, SystemParamVo vo);
	 	
}

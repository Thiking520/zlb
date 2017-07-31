package com.zhilianbao.erp.auth.service.parameter;


import java.util.List;
import java.util.Map;

import com.zhilianbao.erp.auth.vo.parameter.SystemDictVo;
import com.zhilianbao.erp.auth.vo.parameter.rpc.DictVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ResponseValue;
import com.zhilianbao.erp.common.vo.ViewSearchVo;


/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年3月7日下午3:19:52
 * @description:系统数据字典服务
 */
public interface ISystemDictService {
	
	/**
	 * 根据id获取系统字典
	 * @param id
	 * @return
	 */
	public ResponseResult<SystemDictVo> getSystemDictById(Long id);
	
	/**
	 * 获取分页
	 * @param vo
	 * @return
	 */
	public ResponseResult<Page<SystemDictVo>> getPageByVo(ViewSearchVo vo);
	
	/**
	 * 删除
	 * @param bean
	 * @return
	 */
//	public ResponseResult<SystemDictVo> modifyDelSystemDictById(String type, Long id);
	
	/**
	 * 
	* @Title: addOrModifySystemDict
	* @author kuangzengye
	* @date 2017年4月7日下午4:45:23
	* @param vo
	* @return ResponseResult<SystemDictVo>
	* @description:添加或删除数据字典
	 */
	public ResponseResult<SystemDictVo> addOrModifySystemDict(SystemDictVo vo);
	
	/**
	 * 
	* @Title: addSystemDict
	* @author kuangzengye
	* @date 2017年3月8日下午1:02:27
	* @param vo
	* @return ResponseResult<SystemDictVo>
	* @description:新增
	 */
	@Deprecated
	public ResponseResult<SystemDictVo> addSystemDict(SystemDictVo vo);
	

	/**
	 * 
	* @Title: updateSystemDict
	* @author kuangzengye
	* @date 2017年3月8日下午1:02:40
	* @param vo
	* @return ResponseResult<SystemDictVo>
	* @description:更新
	 */
	@Deprecated
	public ResponseResult<SystemDictVo> updateSystemDict(SystemDictVo vo);

	/**
	 * 
	* @Title: effectSystemDict
	* @author kuangzengye
	* @date 2017年3月10日下午4:35:22
	* @param vo
	* @return ResponseResult<SystemDictVo>
	* @description:生效/失效
	 */
	public ResponseResult<SystemDictVo> effectSystemDict(SystemDictVo vo);
	
 	
	/**
	 * 获取全部类型列表
	 * @return
	 */
//	public ResponseResult<List<Map<String,Object>>> getAllTypeMapList(); 
	
	/***
	 * 初始配置运营商基础数据
	 * @return
	 */
	public ResponseValue<String> addOperatorBaseDict(long operatorId,long creator,long modifier);

	/**
	 * 
	* @Title: getDictList
	* @author kuangzengye
	* @date 2017年4月27日下午7:22:37
	* @param operatorId
	* @param paramKey
	* @return ResponseResult<List<DictBean>>
	* @description:获取数据字典list
	 */
	public ResponseResult<List<DictVo>> getDictList(Long operatorId, String dictType);

	/**
	 * 
	* @Title: initDropDownBox
	* @author kuangzengye
	* @date 2017年4月28日上午9:02:35
	* @param operatorId
	* @return ResponseResult<Map<String,Object>>
	* @description:初始化页面下拉框数据
	 */
	public ResponseResult<Map<String, Object>> initDropDownBox(Long operatorId);

	/**
	 * 
	* @Title: getToDropDownBox
	* @author kuangzengye
	* @date 2017年4月28日上午9:15:30
	* @param operatorId,vo
	* @return ResponseResult<Map<String,Object>>
	* @description:获取新增修改蒙太框下拉框数据
	 */
	public ResponseResult<Map<String, Object>> getToDropDownBox(Long operatorId,SystemDictVo vo);

	/**
	 * 
	* @Title: getDescOfValueByType
	* @author kuangzengye
	* @date 2017年4月28日上午11:30:32
	* @param operatorId
	* @param dictType
	* @param value
	* @return ResponseResult<List<DictVo>>
	* @description:获取单个数据字典的描述
	 */
	public ResponseResult<String> getDescOfValueByType(Long operatorId, String dictType, String value);
}

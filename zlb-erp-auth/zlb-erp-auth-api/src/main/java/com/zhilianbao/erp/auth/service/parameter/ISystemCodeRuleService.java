package com.zhilianbao.erp.auth.service.parameter;

import com.zhilianbao.erp.auth.vo.parameter.SystemCodeRuleVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;


/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年3月13日上午11:43:47
 * @description:编码规则业务接口
 */
public interface ISystemCodeRuleService {
	
	/**
	 * 根据id获取编码规则
	 * @param id
	 * @return
	 */
	public ResponseResult<SystemCodeRuleVo> getSystemCodeRuleById(Long id);
	
	/**
	 * 获取分页
	 * @param vo
	 * @return
	 */
	public ResponseResult<Page<SystemCodeRuleVo>> getPageByVo(ViewSearchVo vo);
	
	/**
	 * 删除
	 * @param bean
	 * @return
	 */
//	public ResponseResult<SystemCodeRuleVo> modifyDelSystemCodeRuleById(String type, Long id);
	
	/**
	 * 
	* @Title: addSystemCodeRule
	* @author kuangzengye
	* @date 2017年3月13日下午1:02:27
	* @param vo
	* @return ResponseResult<SystemCodeRuleVo>
	* @description:新增
	 */
	public ResponseResult<SystemCodeRuleVo> addSystemCodeRule(SystemCodeRuleVo vo);
	
	/**
	 * 
	* @Title: updateSystemCodeRule
	* @author kuangzengye
	* @date 2017年3月13日下午1:02:40
	* @param vo
	* @return ResponseResult<SystemCodeRuleVo>
	* @description:更新
	 */
	public ResponseResult<SystemCodeRuleVo> updateSystemCodeRule(SystemCodeRuleVo vo);

	/**
	 * 
	* @Title: effectSystemCodeRule
	* @author kuangzengye
	* @date 2017年3月13日下午2:30:22
	* @param vo
	* @return ResponseResult<SystemCodeRuleVo>
	* @description:生效/失效
	 */
	public ResponseResult<SystemCodeRuleVo> effectSystemCodeRule(SystemCodeRuleVo vo);

	/**
	 * 
	* @Title: effectSystemCodeRule
	* @author kuangzengye
	* @date 2017年3月13日下午2:30:22
	* @param vo
	* @return ResponseResult<SystemCodeRuleVo>
	* @description:添加或更新编码规则
	 */
//	public ResponseResult<SystemCodeRuleVo> addOrModifySystemCodeRule(SystemCodeRuleVo vo);
	 	
}

package com.zhilianbao.erp.auth.service.systemparameter;

import java.util.List;

import com.zhilianbao.erp.auth.vo.systemparameter.BaseAreaVo;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
 * 
 * @author Tobin
 *
 */
public interface IBaseAreaService {
	/**
	 * 查询区域
	 * @param vo
	 * @return
	 */
	public ResponseResult<List<BaseAreaVo>> queryArea(BaseAreaVo vo);
	
	/**
	 * 根据id查询区域信息
	 * @param vo
	 * @return
	 */
	public List<BaseAreaVo> mulArea(List<Long> list);
	
	/**
	 * ID查询
	 * @param vo
	 * @return
	 */
	public ResponseResult<List<BaseAreaVo>> queryAreaId(BaseAreaVo vo);
}

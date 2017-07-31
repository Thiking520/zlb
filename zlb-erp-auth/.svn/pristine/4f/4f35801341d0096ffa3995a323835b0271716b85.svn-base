package com.zhilianbao.erp.auth.service.archives;

import java.util.List;

import com.zhilianbao.erp.auth.vo.archives.DeliveryScopeSearchVo;
import com.zhilianbao.erp.auth.vo.archives.DeliveryScopeVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;

/** 
* @author Tobin  
* @version 创建时间：2017年3月4日 上午10:54:44 
* 类说明 
*/
public interface IDeliveryScopeService {
	/**
	 * 
	 * @Title:IDeliveryScopeService
	 * @author wangshengxia
	 * @date 2017年3月13日上午10:17:12
	 * @param vo
	 * @return
	 */
	public ResponseResult<Page<DeliveryScopeVo>> queryDeliveryScope(DeliveryScopeSearchVo vo);
	
	/**
	 * 
	 * @Title:IDeliveryScopeService
	 * @author wangshengxia
	 * @date 2017年3月13日上午10:18:43
	 * @param vo
	 * @return
	 */
	public ResponseResult<DeliveryScopeVo> queryDeliveryScopeDetails(DeliveryScopeVo vo);
	/**
	 * 
	 * @Title:IDeliveryScopeService
	 * @author wangshengxia
	 * @date 2017年3月13日上午10:20:18
	 * @param vo
	 * @return
	 */
	public ResponseResult<DeliveryScopeVo> updateDeliveryScopeStatus(DeliveryScopeVo vo);
	
	/**
	 * 
	 * @Title:IDeliveryScopeService
	 * @author wangshengxia
	 * @date 2017年3月13日上午10:21:18
	 * @param vo
	 * @return
	 */
	public ResponseResult<DeliveryScopeVo> updateDeliveryScope(DeliveryScopeVo vo);
	
	public ResponseResult<DeliveryScopeVo> deleteDeliveryScope(DeliveryScopeVo vo);
	
	public ResponseResult<DeliveryScopeVo> addDeliveryScope(DeliveryScopeVo vo);
	
	/**
	 * @Title:IDeliveryScopeService
	 * @author chengjianhui
	 * @date 2017年3月13日上午10:21:18
	 * @param List<Long> prodIds 省ID集合
	 * @description:通过省ID 获取省的管理区域(省 市 区)
	 */
	public ResponseResult<List<DeliveryScopeVo>> queryBaseAreaByProvinceIds(List<Long> prodIds);
	
	/**
	* @company zhilianbao
	* @author chengjianhui
	* @date 2017年7月14日上午9:43:03
	* @description:获取覆盖物点集合
	*/
	public ResponseResult<List<DeliveryScopeVo>> getOverLayPoints(DeliveryScopeVo vo);
}
 
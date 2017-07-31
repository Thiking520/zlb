package com.zhilianbao.erp.auth.service.archives;


import java.util.List;
import java.util.Map;

import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordSearchVo;
import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;

/** 
* @author Tobin  
* @version 创建时间：2017年3月2日 下午1:59:21 
* 类说明      站点业务接口
*/
public interface IDeliveryRecordService {

	
	/**
	 * 
	* @Title: queryDeliveryRecordListByPage
	* @author Tobin
	* @date 2017年3月2日 下午1:59:21 
	* @param vo
	* @return ResponseResult<Page<DeliveryRecordVo>>
	* @description:分页查询站点
	 */
	public ResponseResult<Page<DeliveryRecordVo>> queryDeliveryRecordListByPage(DeliveryRecordSearchVo vo);
	
	public ResponseResult<DeliveryRecordVo> queryDeliveryRecordDetails(DeliveryRecordVo key);
	
	public ResponseResult<DeliveryRecordVo> deleteDeliveryRecord(DeliveryRecordVo key);
	
	public ResponseResult<DeliveryRecordVo> updateDeliveryRecord(DeliveryRecordVo vo);
	
	/**
	 * 更新站点管理的状态
	 * @Title:IDeliveryRecordService
	 * @author wangshengxia
	 * @date 2017年3月13日上午10:22:34
	 * @param vo
	 * @return
	 */
	public ResponseResult<DeliveryRecordVo> updateDeliveryRecordStatus(DeliveryRecordVo vo);
	/**
	 * 添加站点档案
	 * @Title:IDeliveryRecordService
	 * @author wangshengxia
	 * @date 2017年3月27日上午11:14:45
	 * @param vo
	 * @return
	 */
	public ResponseResult<DeliveryRecordVo> addDeliveryRecord(DeliveryRecordVo vo );
	
	/**
	 * 查询此页面的所有下拉框
	 * @Title:ICarsService
	 * @author wangshengxia
	 * @date 2017年3月24日下午2:09:55
	 * @param operatorId
	 * @return
	 */
	public ResponseResult<Map<String,Object>>  initDropDownBox(Long operatorId);
	
	/**
	 * 根据站点ID集合查询对应站点信息
	 * @Title:IDeliveryRecordService
	 * @author wangshengxia
	 * @date 2017年3月27日下午2:46:37
	 * @param list
	 * @return
	 */
	public List<DeliveryRecordVo> mulDRName(List<Long> list);
	/**
	 * 通过用户查询所在站点信息
	 * @Title:IDeliveryRecordService
	 * @author wangshengxia
	 * @date 2017年4月10日下午2:21:21
	 * @param paraDeliveryRecordRestSearchVo
	 * @return
	 */
	public ResponseResult<DeliveryRecordVo> queryDRByUserID(Long centerId);
	
	/**
	* @Title: getMyDistributionSiteList
	* @author chengjianhui
	* @date 2017年4月19日下午8:25:20
	* @param userId
	* @return ResponseResult<Page<DeliveryRecordVo>>
	* @description:获取我负责的站点列表
	*/
	public ResponseResult<List<DeliveryRecordVo>> getMyDistributionSiteList(DeliveryRecordSearchVo vo);

	public boolean checkSuperAdmin(DeliveryRecordSearchVo vo);
	
	/**
	* @company zhilianbao
	* @author chengjianhui
	* @date 2017年7月17日下午5:27:42
	* @description:获取站点列表
	*/
	public ResponseResult<List<DeliveryRecordVo>> getRecordList(DeliveryRecordSearchVo vo);
}
 
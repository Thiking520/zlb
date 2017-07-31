package com.zhilianbao.erp.auth.service.cars;

import java.util.Map;

import com.zhilianbao.erp.auth.vo.cars.CarsSearchVo;
import com.zhilianbao.erp.auth.vo.cars.CarsVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
 * 车辆档案业务接口
 * @author wangshengxia
 *
 */
public interface ICarsService {
	/**
	 * 分页查询车辆档案
	 * @Title:queryCarByPage
	 * @author wangshengxia
	 * @date 2017年2月28日上午11:23:30
	 * @param vo
	 * @return
	 * 
	 */
	public ResponseResult<Page<CarsVo>> queryCarByPage(CarsSearchVo vo);
	
	/**
	 * 根据ID查询车辆档案详情
	 * @Title:queryCarDetails
	 * @author wangshengxia
	 * @date 2017年2月28日上午11:23:38
	 * @param key
	 * @return
	 */
	public ResponseResult<CarsVo> queryCarDetails(CarsVo key);
	
	/**
	 * 根据运营商ID+car_id查询
	 * @Title:queryCarDetails
	 * @author wangshengxia
	 * @date 2017年2月28日上午11:23:38
	 * @param key
	 * @return
	 */
	public ResponseResult<CarsVo> queryCarDetailsByCarId(CarsVo key);
	
	/**
	 * 添加车辆
	 * @Title:addCar
	 * @author wangshengxia
	 * @date 2017年2月28日上午11:23:43
	 * @param co
	 * @return
	 */
	public ResponseResult<CarsVo> addCar(CarsVo vo);
	
	/**
	 * 删除车辆
	 * @Title:deleteCar
	 * @author wangshengxia
	 * @date 2017年2月28日上午11:23:50
	 * @param vo
	 * @return
	 */
	public ResponseResult<CarsVo> deleteCar(CarsVo vo);
	
	/**
	 * 更新车辆
	 * @Title:updateCar
	 * @author wangshengxia
	 * @date 2017年2月28日上午11:23:56
	 * @param vo
	 * @return
	 */
	public ResponseResult<CarsVo> updateCar(CarsVo vo);
	
	/**
	 * 更新车辆状态
	 * @Title:updateCarState
	 * @author wangshengxia
	 * @date 2017年2月28日下午8:17:55
	 * @param vo
	 * @return
	 */
	public ResponseResult<CarsVo> updateCarState(CarsVo vo);
	/**
	 * 查询此页面的所有下拉框
	 * @Title:ICarsService
	 * @author Administrator
	 * @date 2017年3月24日下午2:09:55
	 * @param operatorId
	 * @return
	 */
	public ResponseResult<Map<String,Object>>  initDropDownBox(Long operatorId);

	/**
	 * 校验车牌号
	 * @param vo
	 * @return
	 */
	public boolean checkPlateNumber(CarsVo vo);
}

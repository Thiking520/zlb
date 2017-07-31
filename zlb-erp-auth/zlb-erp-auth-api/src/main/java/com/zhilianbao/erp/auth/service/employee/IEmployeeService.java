package com.zhilianbao.erp.auth.service.employee;

import java.util.List;
import java.util.Map;

import com.zhilianbao.erp.auth.vo.employee.EmployeeSearchVo;
import com.zhilianbao.erp.auth.vo.employee.EmployeeVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
 * 员工档案接口
 * @author wangshengxia
 *
 */
public interface IEmployeeService {
	/**
	 * 
	 * @Title:IEmployeeService
	 * @author wangshengxia
	 * @date 2017年2月28日上午10:20:56
	 * @param vo
	 * @return
	 */
	public ResponseResult<Page<EmployeeVo>> queryEmployeeByPage(EmployeeSearchVo vo);
	
	/**
	 * 
	 * @Title:IEmployeeService
	 * @author wangshengxia
	 * @date 2017年2月28日上午10:28:28
	 * @param key
	 * @return
	 */
	public ResponseResult<EmployeeVo> queryEmployeeDetails(EmployeeVo key);
	
	/**
	 * 
	 * @Title:IEmployeeService
	 * @author wangshengxia
	 * @date 2017年2月28日上午10:22:48
	 * @param vo
	 * @return
	 */
	public ResponseResult<EmployeeVo> addEmployee(EmployeeVo vo);
	
	/**
	 * 
	 * @Title:IEmployeeService
	 * @author wangshengxia
	 * @date 2017年2月28日上午10:24:53
	 * @param vo
	 * @return
	 */
	public ResponseResult<EmployeeVo> updateEmployee(EmployeeVo vo);
	
	/**
	 * 
	 * @Title:IEmployeeService
	 * @author wangshengxia
	 * @date 2017年3月4日上午10:57:07
	 * @param vo
	 * @return
	 */
	public ResponseResult<EmployeeVo> updateEmployeeStatus(EmployeeVo vo);
	
	/**
	 * 
	 * @Title:IEmployeeService
	 * @author wangshengxia
	 * @date 2017年2月28日上午10:25:03
	 * @param vo
	 * @return
	 */
	public ResponseResult<EmployeeVo> deleteEmployee(EmployeeVo vo);
	/**
	 * 查询此页面的所有下拉框
	 * @Title:IEmployeeService
	 * @author Administrator
	 * @date 2017年3月24日下午4:32:13
	 * @param operatorId
	 * @return
	 */
	public ResponseResult<Map<String,Object>>  initDropDownBox(Long operatorId);

	/**
	 * 通过手机号码查找员工
	 * @param userName
	 * @return
	 */
	public EmployeeVo findEmployeeByMobileNo(String userName);

	/**
	 * 查找号码在员工表中是否已经存在
	 * @param vo
	 * @return
	 */
	public List<EmployeeVo> mobileIsExist(EmployeeVo vo);

	
}
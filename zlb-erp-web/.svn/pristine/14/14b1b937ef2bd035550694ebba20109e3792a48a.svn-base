package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.employee.IEmployeePointListService;
import com.zhilianbao.erp.auth.service.employee.IEmployeeService;
import com.zhilianbao.erp.auth.vo.employee.EmployeePointListVo;
import com.zhilianbao.erp.auth.vo.employee.EmployeeSearchVo;
import com.zhilianbao.erp.auth.vo.employee.EmployeeVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;

/**
 * 员工档案管理
 * @author wangshengxia
 *
 */

@Controller
@RequestMapping("tms/emp")
public class EmpController extends BaseController{
	
	@Reference
	private IEmployeeService iEmployeeService;
	
	@Reference
	private IEmployeePointListService eplService;
	
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		System.out.println("进入方法中......");
		return setResponseModel("tms/empManager",model,request);
	}
	
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<EmployeeVo>> list(@RequestBody EmployeeSearchVo vo) {
		EmployeeSearchVo sv = (vo != null) ? vo : new EmployeeSearchVo();
		//判断是运营商还是运维
		if(getUserType() == 1 || vo.getOperatorId() == null) {
			sv.setOperatorId(getOperatorId());
		} else {
			sv.setOperatorId(vo.getOperatorId());
		}
		return iEmployeeService.queryEmployeeByPage(sv);
	} 
	
	@RequestMapping(value = "/queryEmployeeDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<EmployeeVo> queryEmployeeDetails(@RequestBody EmployeeVo emp) {
		
		return iEmployeeService.queryEmployeeDetails(emp);
	}
	
	@RequestMapping(value = "/addEmployee")
	@ResponseBody
	public ResponseResult<EmployeeVo> addEmployee(@RequestBody EmployeeVo vo) {
		long userId=getUserId();
		vo.setCreator(userId);
		if(getUserType() != 0) {
			vo.setOperatorId(getOperatorId());
		}
		
		return iEmployeeService.addEmployee(vo);
	}
	
	@RequestMapping(value = "/updateEmployeeStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<EmployeeVo> updateEmployeeStatus(@RequestBody EmployeeVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		vo.setUserId(userId);
		return iEmployeeService.updateEmployeeStatus(vo);
	}
	
	@RequestMapping(value = "/updateEmployee",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<EmployeeVo> updateEmployee(@RequestBody EmployeeVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		vo.setUserId(userId);
		return iEmployeeService.updateEmployee(vo);
	}
	
	
	@RequestMapping(value = "/deleteEmployee",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<EmployeeVo> deleteEmployee(@RequestBody EmployeeVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		return iEmployeeService.deleteEmployee(vo);
	}
	/**
	 * 查询员工档案页面下拉框的所有类表
	 * @Title:EmpController
	 * @author wnagshengxia
	 * @date 2017年4月5日下午5:24:42
	 * @return
	 */
	@RequestMapping(value = "/initDropDownBox",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String, Object>> initDropDownBox() {
		long operatorId=getOperatorId();
		//cars.setModifier(userId);
		return iEmployeeService.initDropDownBox(operatorId);
	}
	
	
	/**
	 * 获取当前用户负责所有站点
	 */
	@RequestMapping(value = "/allPoints",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<EmployeePointListVo> getAllPoints(@RequestBody EmployeeVo vo) {
		return eplService.getAllPoints(vo);
	}
	
	/**
	 * 判断号码是否已经存在
	 */
	@RequestMapping(value = "/mobileIsExist",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<EmployeeVo> mobileIsExist(@RequestBody EmployeeVo vo) {
		List<EmployeeVo> listevo = iEmployeeService.mobileIsExist(vo);
		ResponseResult<EmployeeVo> rs= new ResponseResult<EmployeeVo>();
		if(listevo != null && listevo.size() > 0) {
			rs.setData(listevo.get(0));
		}
		return rs;
	}
	
}

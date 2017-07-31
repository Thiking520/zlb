package com.zhilianbao.erp.web.publicdata.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.user.IUserService;
import com.zhilianbao.erp.auth.vo.employee.EmployeeArchiveVo;
import com.zhilianbao.erp.auth.vo.user.UserPageVo;
import com.zhilianbao.erp.auth.vo.user.UserVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;

@Controller
@RequestMapping("/publicData/user")
public class UserController extends BaseController{

	@Reference
	private IUserService userService;
	
	
	/**
	 * 
	* @Title: init
	* @author shilijin
	* @date 2017年3月13日上午10:16:57
	* @description:初始化进入用户列表
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String initRole(Model model, HttpServletRequest request) {

		return setResponseModel("publicData/user/user",model,request);
	}
	
	/**
	 * 分页查找所有用户信息
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/getAllUsers",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<UserVo>> findAll(@RequestBody UserPageVo vo){
		vo.setOperatorId(getOperatorId());
		return userService.findAll(vo);
	}
	
	/**
	 * 逻辑删除用户信息
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/deleteUser",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<EmployeeArchiveVo> deleteUser(@RequestBody EmployeeArchiveVo vo){
		long userId = getUserId();
		vo.setModifier(userId+"");
		ResponseResult<EmployeeArchiveVo> response = userService.deleteUser(vo);
		return response;
	}
	
	/**
	 * 修改用户状态
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/modifyStatus",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<UserVo> modifyStatus(@RequestBody UserVo vo){
		long userId = getUserId();
		vo.setModifier(userId);
		vo.setUserId(userId);
		ResponseResult<UserVo> response = userService.modifyStatus(vo);
		return response;
	}
	
	/**
	 * 获取当前用户信息
	 * 
	 */
	@RequestMapping(value = "/getUserInfo",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<UserVo> getUserInfo(@RequestBody UserVo vo){
		
		ResponseResult<UserVo> response = userService.getUserInfo(vo);
		return response;
	}
	
	/**
	 * 新增/修改用户档案
	 * 
	 */
	@RequestMapping(value = "/saveUserArchive",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<UserVo> addUserArchive(@RequestBody EmployeeArchiveVo vo){
		long userId = getUserId();
		vo.setUserId(userId);
		vo.setModifier(getUserId()+"");
		if(getUserType() != 0) {
			vo.setOperatorId(getOperatorId());
		}
		
		ResponseResult<UserVo> response = userService.addUserArchive(vo);
		return response;
	}

	/**
	 * 获取用户当前所在运营商和所属运营商Id
	 */
	@RequestMapping(value = "/operatorIds",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<UserVo> getOperatorIds(){
		long type = getUserType();
		long operatorId = getOperatorId();
		ResponseResult<UserVo> response = new ResponseResult<UserVo>();
		UserVo uv = new UserVo();
		uv.setOperatorId(operatorId);
		uv.setUserType(type);
		response .setData(uv);
		return response;
	}
	
}

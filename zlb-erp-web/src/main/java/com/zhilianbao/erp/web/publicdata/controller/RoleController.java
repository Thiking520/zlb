package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.user.IRoleMenuListService;
import com.zhilianbao.erp.auth.service.user.IRoleService;
import com.zhilianbao.erp.auth.vo.user.MenuVo;
import com.zhilianbao.erp.auth.vo.user.RoleMenuListVo;
import com.zhilianbao.erp.auth.vo.user.RolePageVo;
import com.zhilianbao.erp.auth.vo.user.RoleVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;

@Controller
@RequestMapping("/publicData/role")
public class RoleController extends BaseController{

	@Reference
	private IRoleService roleService;
	
	@Reference
	private IRoleMenuListService userRoleListService;
	
	/**
	 * 
	* @Title: init
	* @author shilijin
	* @date 2017年2月27日上午10:16:57
	* @description:初始化进入角色列表
	 */
	@RequestMapping(value = "/init/role",  method = RequestMethod.GET)
	public String initRole(Model model, HttpServletRequest request) {

		return setResponseModel("publicData/user/role",model,request);
	}
	
	/**
	 * 
	* @Title: init
	* @author shilijin
	* @date 2017年2月27日上午10:16:57
	* @description:初始化进入角色列表
	 */
	@RequestMapping(value = "/init/auth",  method = RequestMethod.GET)
	public String initAuth(Model model, HttpServletRequest request) {

		return setResponseModel("publicData/user/roleAuth",model,request);
	}
	
	
	/**
	 * 添加一个角色
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/addRole",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<RoleVo> addRole(@RequestBody RoleVo vo) {
		
		long userId = getUserId();
		vo.setCreator(userId);
		ResponseResult<RoleVo> response = roleService.addRole(vo);
		return response;
	}
	
	
	/**
	 * 分页查找所有角色
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/findAllRoles",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<RoleVo>> findAllRoles(@RequestBody RolePageVo vo) {
		/*//如果不是运维超管
		if(getUserType() != 0) {
			vo.setOperatorId(getOperatorId());
		}*/
		vo.setOperatorId(getOperatorId());
		return roleService.findAllRoles(vo);
	}
	
	/**
	 * 分页查找所有角色
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/findAllRolesCurrent",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<RoleVo>> findAllRolesCurrent(@RequestBody RolePageVo vo) {
		vo.setOperatorId(getOperatorId());
		vo.setUserType(getUserType());
		return roleService.findAllRoles(vo);
	}
	/**
	 * 获取所有角色
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/getAllRoles",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<List<RoleVo>> getAllRoles(@RequestBody RolePageVo vo) {
		vo.setOperatorId(getOperatorId());
		return roleService.getAllRoles(vo);
	}
	
	/**
	 * 删除角色
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/deleteRole",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<RoleVo> deleteRole(@RequestBody RoleVo vo) {
		long userId = getUserId();
		vo.setModifier(userId);
		ResponseResult<RoleVo> response = roleService.deleteRoleById(vo);
		return response;
	}
	
	/**
	 * 修改角色状态
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/modifyStatus",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<RoleVo> modifyStatus(@RequestBody RoleVo vo) {
		long userId = getUserId();
		vo.setModifier(userId);
		ResponseResult<RoleVo> response = roleService.modifyStatusById(vo);
		return response;
	}
	
	/**
	 * 获取角色信息
	 */
	@RequestMapping(value = "/getRoleInfo",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<RoleVo> getRoleInfo(@RequestBody RoleVo vo) {
		vo.setType(getUserType());
		ResponseResult<RoleVo> response = roleService.findRoleById(vo);
		return response;
	}
	
	/**
	 * 修改角色信息
	 */
	@RequestMapping(value = "/modifyRoleInfo",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<RoleVo> modifyRoleInfo(@RequestBody RoleVo vo) {
		long userId = getUserId();
		vo.setModifier(userId);
		ResponseResult<RoleVo> response = roleService.modifyRoleById(vo);
		return response;
	}
	
	/**
	 * 通过角色ID查找对应的权限
	 */
	@RequestMapping(value = "/getAuthByRole",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<List<MenuVo>> getAuthByRole(@RequestBody RoleMenuListVo vo) {
		vo.setOperatorId(getOperatorId());
		vo.setUserType(getUserType());
		return userRoleListService.getAuthByRole(vo);
	}
	
	/**
	 * 修改角色权限
	 */
	@RequestMapping(value = "/modifyAuth",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<MenuVo> modifyAuth(@RequestBody RoleMenuListVo vo) {
		vo.setModifier(getUserId());
		ResponseResult<MenuVo> response = userRoleListService.modifyAuth(vo);
		return response;
	}
	
	/**
	 * 获取所有菜单
	 */
	@RequestMapping(value = "/getAllMenu",method=RequestMethod.POST)
	@ResponseBody
	public ResponseResult<List<MenuVo>> getAllMenu(@RequestBody RoleMenuListVo vo) {
		vo.setUserType(getUserType());
		ResponseResult<List<MenuVo>> response = userRoleListService.getAllMenu(vo);
		return response;
	}
}

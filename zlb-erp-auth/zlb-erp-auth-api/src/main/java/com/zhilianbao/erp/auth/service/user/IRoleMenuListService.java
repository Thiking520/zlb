package com.zhilianbao.erp.auth.service.user;

import java.util.List;

import com.zhilianbao.erp.auth.vo.user.MenuVo;
import com.zhilianbao.erp.auth.vo.user.RoleMenuListVo;
import com.zhilianbao.erp.common.vo.ResponseResult;

public interface IRoleMenuListService {

	/**
	 * 获取当前角色所有权限
	 * @param vo
	 * @return
	 */
	ResponseResult<List<MenuVo>> getAuthByRole(RoleMenuListVo vo);
	/**
	 * 修改角色权限
	 * @param vo
	 * @return
	 */
	ResponseResult<MenuVo> modifyAuth(RoleMenuListVo vo);
	
	/**
	 * 获取所有菜单
	 * @param vo
	 * @return
	 */
	ResponseResult<List<MenuVo>> getAllMenu(RoleMenuListVo vo);

}
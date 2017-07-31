package com.zhilianbao.erp.auth.service.user;

import java.util.List;

import com.zhilianbao.erp.auth.vo.user.RolePageVo;
import com.zhilianbao.erp.auth.vo.user.RoleVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;

public interface IRoleService {

	/**
	 * 新增一个角色
	 * @param vo
	 * @return
	 */
	ResponseResult<RoleVo> addRole(RoleVo vo);

	/**
	 * 分页查找当前运营商下所有角色
	 * @param vo
	 * @return
	 */
	ResponseResult<Page<RoleVo>> findAllRoles(RolePageVo vo);

	/**
	 * 通过角色ID逻辑删除该角色
	 * @param vo
	 * @return
	 */
	ResponseResult<RoleVo> deleteRoleById(RoleVo vo);

	/**
	 * 通过角色ID将该角色修改状态
	 * @param vo
	 * @return
	 */
	ResponseResult<RoleVo> modifyStatusById(RoleVo vo);

	/**
	 * 通过角色ID查找该角色
	 * @param vo
	 * @return
	 */
	ResponseResult<RoleVo> findRoleById(RoleVo vo);

	/**
	 * 通过角色ID修改角色信息
	 * @param vo
	 * @return
	 */
	ResponseResult<RoleVo> modifyRoleById(RoleVo vo);

	/**
	 * 通过运营商ID查找该运营商下所有角色
	 * @param vo
	 * @return
	 */
	ResponseResult<List<RoleVo>> getAllRoles(RolePageVo vo);

	/**
	 * 通过用户Id查找用户当前角色
	 * @param rvo
	 * @return
	 */
	List<RoleVo> findRoleByUserId(RoleVo rvo);

}
package com.zhilianbao.erp.auth.service.user;

import java.util.List;

import com.zhilianbao.erp.auth.vo.employee.EmployeeArchiveVo;
import com.zhilianbao.erp.auth.vo.user.LoginManagerOperatorVo;
import com.zhilianbao.erp.auth.vo.user.LoginManagerVo;
import com.zhilianbao.erp.auth.vo.user.LoginOperatorVo;
import com.zhilianbao.erp.auth.vo.user.LoginUserVo;
import com.zhilianbao.erp.auth.vo.user.LoginVo;
import com.zhilianbao.erp.auth.vo.user.RetUserVo;
import com.zhilianbao.erp.auth.vo.user.UserPageVo;
import com.zhilianbao.erp.auth.vo.user.UserRoleListVo;
import com.zhilianbao.erp.auth.vo.user.UserVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ResponseValue;

public interface IUserService {
	/**
	 * @Title: doLogin
	 * @author chengjianhui
	 * @date 2017年3月25日上午11:33:39
	 * @param loginVo
	 * @param int loginType 登录方式：0：本地登录，1：SSO登录
	 * @return ResponseValue<LoginUserVo>
	 * @description:用户登录
	 */
	public ResponseValue<LoginUserVo> doLogin(LoginVo loginVo);
	
	/**
	* @Title: saveSsoToken
	* @author chengjianhui
	* @date 2017年4月28日上午10:46:15
	* @param LoginUserVo
	* @return ResponseValue<String>
	* @description:缓存用户从SSO端获取的token，用于操作研发中心API
	*/
	public ResponseResult<String> saveSsoToken(LoginUserVo userVo);
	
	/**
	* @Title: getSsoToken
	* @author chengjianhui
	* @date 2017年4月28日上午10:46:15
	* @param Long userId
	* @return String
	* @description:获取用户从SSO端得到的token，用于操作研发中心API
	*/
	public String getSsoToken(Long userId);
	
    /***
     * 获取用户菜单
     * @param loginOperatorVo
     * @return
     */
    public ResponseValue<LoginManagerVo> queryAllMenu(LoginOperatorVo loginOperatorVo);
    /***
     * 获取多个用户信息
     * @param list
     * @return
     */
    public List<RetUserVo> mulUserName(List<Long> list);
    /***
     * 获取运维管理的运营商
     * @param loginOperatorVo
     * @return
     */
    public List<LoginManagerOperatorVo> qryManagerOperator(LoginOperatorVo loginOperatorVo);

    /**
     * 分页查找所有用户列表
     * @param vo
     * @return
     */
	public ResponseResult<Page<UserVo>> findAll(UserPageVo vo);

	/**
	 * 通过员工ID删除用户
	 * @param vo
	 * @return
	 */
	public ResponseResult<EmployeeArchiveVo> deleteUser(EmployeeArchiveVo vo);

	/**
	 * 修改用户状态
	 * @param vo
	 * @return
	 */
	public ResponseResult<UserVo> modifyStatus(UserVo vo);

	
	/**
	 * 获取用户信息
	 * @param vo
	 * @return
	 */
	public ResponseResult<UserVo> getUserInfo(UserVo vo);

	/**
	 * 新增员工档案信息（用户注册）
	 * @param vo
	 * @return
	 */
	public ResponseResult<UserVo> addUserArchive(EmployeeArchiveVo vo);
    
    
	/**
	 * 通过用户名(电话号码)查找是否已经存在
	 * @param userVo
	 * @return
	 */
	public UserVo findIsExistByUserName(UserVo userVo);

	/**
	 * 新增一个用户
	 * @param userAdminVo
	 * @return
	 */
	public boolean addUser(UserVo userAdminVo);

	/**
	 * 用户登录
	 * @param lvo
	 * @return
	 */
	public LoginUserVo login(LoginVo lvo);
	/** 传入用户id,菜单名称，判断该用户是否拥有此菜单权限 */
	public boolean isOwnThisMenu(UserVo usvo);
	ResponseResult<UserVo> getSimpleUserInfo(UserVo vo);
	/**
	 * 更新用户信息
	 * @param userVo
	 * @return
	 */
	public boolean update(UserVo userVo);
	/**
	 * 通过统一中心的userId查找一个用户
	 * @param userVo
	 * @return
	 */
	public UserVo findByCenterId(UserVo userVo);
	/**
	 * 通过统一中心的userId查找一个用户角色关系
	 * @param userAdminVo
	 * @return
	 */
	public UserRoleListVo findByUCenterId(UserVo userAdminVo);
	/**
	 * 通过统一中心的token和userId修改密码
	 * @param token
	 * @param userId
	 * @return
	 */
	public String moidfyPwd(UserVo uv);

	/**
	 * 通过手机号码查找一个
	 * @param loginVo
	 * @return
	 */
	public List<UserVo> findByUserName(String userMobile);

    
}

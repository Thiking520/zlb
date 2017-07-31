package com.zhilianbao.erp.app.impl.user;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.app.impl.cache.UserCacheUtil;
import com.zhilianbao.erp.app.service.user.IUserAccountService;
import com.zhilianbao.erp.app.vo.user.AppLoginVo;
import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.auth.service.employee.IEmployeeService;
import com.zhilianbao.erp.auth.service.parameter.ISystemParamService;
import com.zhilianbao.erp.auth.service.user.IUserService;
import com.zhilianbao.erp.auth.service.user.facade.IUserRestService;
import com.zhilianbao.erp.auth.vo.employee.EmployeeVo;
import com.zhilianbao.erp.auth.vo.user.LoginUserVo;
import com.zhilianbao.erp.auth.vo.user.LoginVo;
import com.zhilianbao.erp.auth.vo.user.UserVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.constant.SSOFunc;
import com.zhilianbao.erp.common.util.BaseUtil;
import com.zhilianbao.erp.common.util.MD5;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.SSORequestVo;
import com.zhilianbao.erp.common.vo.SsoResponeVo;
import com.zhilianbao.erp.common.vo.UserInfoVo;

/**
* @company zhilianbao
* @author shilijin
* @date 2017年3月15日上午10:58:49
* @description:用户账号相关行为(注册、登录、找回密码...)
*/
@Path("users")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
@Service
public class UserAccountServiceImpl implements IUserAccountService {
	
	private static Logger logger = LogManager.getLogger(UserAccountServiceImpl.class);

	@Reference
	private IUserService userService;
	
	@Reference
	private IEmployeeService employeeService;
	
	@Reference
	private IUserRestService userRoleServce;
	@Reference
	private ISystemParamService systemParamService;//RPC调用获取全局参数
	
	/**
	* @Title: doLogin
	* @author shilijin
	* @date 2017年3月15日上午10:59:27
	* @description:用户登录
	*/
	@POST
    @Path("login")
	public ResponseResult<AppUserVo> doLogin(AppLoginVo loginVo) {
		ResponseResult<AppUserVo> response = new ResponseResult<AppUserVo>();
		SSORequestVo requestVo = new SSORequestVo();
		requestVo.setPassword(MD5.produceUUID(loginVo.getPassword()));
		requestVo.setUserName(loginVo.getAccount());
		
		
		AppUserVo userVo = new AppUserVo();
		try {
			//判断用户是否在统一中心存在
			requestVo.setValidInfo(loginVo.getAccount());
			/*int userResult = SSOFunc.validateUser(requestVo);
			if(userResult != 413) {
				//判断erp系统是否存在该帐号
				return response.failure(ResultEnum.USER_IS_NOT_EXIST);
			}*/
			//判断统一登录是否成功
			SsoResponeVo ssoVo = SSOFunc.login(requestVo);
			if(ssoVo != null) {
				if(!ssoVo.isSuccess()) {
					ResultEnum.PASSWORD_ERROR.setMsg(ssoVo.getMsg());
					return response.failure(ResultEnum.PASSWORD_ERROR);
				}
			} else {
				return response.failure(ResultEnum.OPERATION_FAILD);
			}
			//调用本地登录
			LoginVo lvo = new LoginVo();
			lvo.setUserName(loginVo.getAccount());
			lvo.setPwd(MD5.produceUUID(MD5.produceUUID(loginVo.getPassword())));
			LoginUserVo loginUserVo = userService.login(lvo);
			EmployeeVo evo =  employeeService.findEmployeeByMobileNo(loginVo.getAccount());
			if(loginUserVo == null) {
				//判断是帐号还是密码有误
				UserVo uv = new UserVo();
				uv.setUserName(loginVo.getAccount());
				UserVo vo = userService.findIsExistByUserName(uv);
				if(vo == null) {
					//本地写入数据
					//1、查找员工档案，必须是“员工”才能注册
					if(evo == null) {
						//不是员工不能注册
						return response.failure(ResultEnum.ILLEGAL_ACCESS);
					}
					//3、本地注册
					UserVo userAdminVo = new UserVo();
					userAdminVo.setCenterId((long)((UserInfoVo)ssoVo.getResult()).getUserId());
					
					userAdminVo.setUniquekey(new Date().getTime()+"");
					userAdminVo.setCreator((long)((UserInfoVo)ssoVo.getResult()).getUserId());
					userAdminVo.setCreateTime(new Date());
					userAdminVo.setDeleted(false);
					if(((UserInfoVo)ssoVo.getResult()) != null) {
						userAdminVo.setNickname(((UserInfoVo)ssoVo.getResult()).getNickName());
					} else {
						userAdminVo.setNickname(loginVo.getAccount());
					}
					userAdminVo.setNickname(loginVo.getAccount());
					userAdminVo.setMobileNo(loginVo.getAccount());
					userAdminVo.setUserName(loginVo.getAccount());
					userAdminVo.setEnabled(true);
					userAdminVo.setLastLoginTime(new Date());
					userAdminVo.setOperatorId(evo.getOperatorId());//运营商
					userAdminVo.setPwdMd5(MD5.produceUUID(MD5.produceUUID(loginVo.getPassword())));
					userAdminVo.setRegisterTime(new Date());
					boolean res = userService.addUser(userAdminVo);
					if(!res) {
						return response.failure(ResultEnum.OPERATION_FAILD);
					}
					
					//统一存在，本地不存在判断该帐号的userRole是否正确
					//UserRoleListVo urvo =  userRoleServce.findByUCenterId(userAdminVo);
					UserVo uvo = userService.findByCenterId(userAdminVo);
					loginUserVo = new LoginUserVo();
					loginUserVo.setCenterId(uvo.getCenterId());
					loginUserVo.setUserId(uvo.getId());
					loginUserVo.setCompanyKey(uvo.getOperatorId());
					
				} else {
					if( vo.getEnabled()== false || vo.getDeleted() == true) {
						return response.failure(ResultEnum.NO_LOGIN);
					} else {
						return response.failure(ResultEnum.PASSWORD_ERROR);
					}
				}
			}
			
			if(evo == null) {
				//员工已经禁用或被删除
				return response.failure(ResultEnum.EMPLOYEE_NOT_EXIST);
			}
			
			//判断登录失败次数，锁定登录？？？？？
			
			UserVo usvo = new UserVo();
			usvo.setId(loginUserVo.getUserId());
			usvo.setMenuName(systemParamService.getParamValue(loginUserVo.getCompanyKey(), Constants.TMS_PDA).getData());//TMS_PDA菜单名称
			//判断角色权限======
			boolean isPDA = userService.isOwnThisMenu(usvo);
			if(!isPDA) {
				return response.failure(ResultEnum.PDA_AUTH_ERROR);
			}
			//登录成功，返回数据
			userVo.setUserId(loginUserVo.getUserId());//erp用户ID
			userVo.setEmployeeId(String.valueOf(evo.getId()));
			userVo.setuCenterId(((UserInfoVo)ssoVo.getResult()).getUserId() + "");//统一中心ID
			userVo.setLoginTime(new Date().getTime()+"");
			userVo.setNickName(((UserInfoVo)ssoVo.getResult()).getUserAlias());
			userVo.setOperatorId(loginUserVo.getCompanyKey());
			userVo.setSex(2);
			userVo.setToken(((UserInfoVo)ssoVo.getResult()).getTokenId());
			//userVo.setSignature(signature);
			//userVo.setAge(lvo.get);//年龄
			//userVo.setBirthday(birthday);//
			//userVo.setIconUrl(iconUrl);
			
			UserCacheUtil.saveUser(((UserInfoVo) ssoVo.getResult()).getUserId() + "", userVo);
			
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("LoginImpl,doLogin",e);
			return response.err();
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("userInfo", userVo);
		return response.success(map);
	}

	/**
	* @Title: register
	* @author shilijin
	* @date 2017年3月15日上午11:46:55
	* @description:用户注册
	*/
	@POST
    @Path("register")
	@Override
	public ResponseResult<AppUserVo> register(AppLoginVo loginVo) {
		ResponseResult<AppUserVo> response = new ResponseResult<AppUserVo>();
		SSORequestVo requestVo = new SSORequestVo();
		requestVo.setMobileCode(loginVo.getValidCode());
		requestVo.setUserAlias(loginVo.getNickName());
		requestVo.setPassword(MD5.produceUUID(loginVo.getPassword()));
		requestVo.setUserMobile(loginVo.getAccount());
		try {
			//校验手机号码格式
			if(!BaseUtil.isMobileNo(loginVo.getAccount())) {
				return response.failure(ResultEnum.FORMAT_ERROR_MOBILE);
			}
			//密码长度校验=================
			//String value = ParamCacheUtil.get(1L, Constants.PWD_LENGTH_MIN);
			int min = Integer.parseInt(systemParamService.getParamValue(1L, Constants.PWD_LENGTH_MIN).getData());
			int max = Integer.parseInt(systemParamService.getParamValue(1L, Constants.PWD_LENGTH_MAX).getData());
			if(loginVo.getPassword().length() < min) {
				return response.failure(ResultEnum.PASSWORD_LENGTH_TOO_SHORT);
			}
			if(loginVo.getPassword().length() > max) {
				return response.failure(ResultEnum.PASSWORD_LENGTH_TOO_LONG);
			}
			
			//验证该帐号是否已经存在
			requestVo.setValidInfo(loginVo.getAccount());
			int userResult = SSOFunc.validateUser(requestVo);  //0和412都是未注册
			if(userResult == 413) {
				//判断erp系统是否存在该帐号
				return response.failure(ResultEnum.USER_IS_EXISTED);
			} else if(userResult == 412 || userResult == 0) {
				/*UserVo userVo = new UserVo();
				userVo.setUserName(loginVo.getAccount());
				UserVo vo = userService.findIsExistByUserName(userVo);*/
				//统一平台不存在，要判断erp体系是否存在
				/*if(vo != null) {
					//erp帐号已存在，则注册统一中心
					//确保万无一失，判断统一中心是否有，没有注册，有就直接返回
					
					
					
					
					response.setCode("0000");
					response.setMsg("注册成功");
				} else {*/
					//都不存在
					//1、查找员工档案，必须是“员工”才能注册
					EmployeeVo evo =  employeeService.findEmployeeByMobileNo(loginVo.getAccount());
					if(evo == null) {
						//不是员工不能注册
						return response.failure(ResultEnum.ILLEGAL_ACCESS);
					}
					//2、调用统一中心注册接口
					UserInfoVo userInfoVo = SSOFunc.regUser(requestVo);
					if(userInfoVo == null) {
						return response.failure(ResultEnum.REGISETR_FAILED);
					}
					//3、本地注册
					UserVo userAdminVo = new UserVo();
					userAdminVo.setCenterId((long)userInfoVo.getUserId());
					userAdminVo.setUniquekey(new Date().getTime()+"");
					userAdminVo.setCreator((long)userInfoVo.getUserId());
					userAdminVo.setCreateTime(new Date());
					userAdminVo.setDeleted(false);
					userAdminVo.setNickname(loginVo.getNickName());
					userAdminVo.setMobileNo(loginVo.getAccount());
					userAdminVo.setUserName(loginVo.getAccount());
					userAdminVo.setEnabled(true);
					userAdminVo.setLastLoginTime(new Date());
					userAdminVo.setOperatorId(evo.getOperatorId());//运营商
					userAdminVo.setPwdMd5(MD5.produceUUID(MD5.produceUUID(loginVo.getPassword())));
					userAdminVo.setRegisterTime(new Date());
					boolean res = userService.addUser(userAdminVo);
					if(res) {
						return response.success();
					} else {
						return response.failure(ResultEnum.REGISETR_FAILED);
					}
				//}
			} else {
				return response.failure(ResultEnum.OPERATION_FAILD);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return response.err();
		}
	}

	/**
	* @Title: 注册验证码
	* @author shilijin
	* @date 2017年3月15日上午11:46:55
	* @description:用户注册
	*/
	@POST
    @Path("register/validateCode")
	@Override
	public ResponseResult<AppUserVo> verificationCode(AppLoginVo loginVo) {
		ResponseResult<AppUserVo> response = new ResponseResult<AppUserVo>();
		//校验帐号是否存在
		SSORequestVo validateUser = new SSORequestVo();
		try {
			if("1".equals(loginVo.getType())) {//1、注册
				validateUser.setValidInfo(loginVo.getUserMobile());
				int userResult = SSOFunc.validateUser(validateUser);
				if(userResult == 413) {
					return response.failure(ResultEnum.USER_IS_EXISTED);
				}
			} else {//2、重置密码
				List<UserVo> userList = userService.findByUserName(loginVo.getUserMobile());
				if(userList == null || userList.size() == 0) {
					return response.failure(ResultEnum.USER_IS_NOT_EXIST);
				}
			}
			//调用发送短信接口
			validateUser.setUserMobile(loginVo.getUserMobile());
			SsoResponeVo ssoBody = SSOFunc.sendSms(validateUser);
			if(ssoBody == null) {
				return response.failure(ResultEnum.OPERATION_FAILD);
			} else if(ssoBody.getMsgCode() != 0) {
				ResultEnum.OPERATION_FAILD.setMsg(ssoBody.getMsg());
				return response.failure(ResultEnum.OPERATION_FAILD);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return response.err();
		}
		return response.success();
	}
	
	/**
	* @Title: register
	* @author shilijin
	* @date 2017年3月15日上午11:46:55
	* @description:校验验证码
	*/
	@POST
    @Path("check/validateCode")
	@Override
	public ResponseResult<AppUserVo> checkCode(AppLoginVo loginVo) {
		ResponseResult<AppUserVo> response = new ResponseResult<AppUserVo>();
		SSORequestVo validateUser = new SSORequestVo();
		try {
			validateUser.setMobileCode(loginVo.getValidCode());
			validateUser.setUserMobile(loginVo.getUserMobile());
			SsoResponeVo ssoBody = SSOFunc.checkSms(validateUser);
			if(ssoBody == null) {
				return response.failure(ResultEnum.OPERATION_FAILD);
			} else if(ssoBody.getMsgCode() != 0){
				ResultEnum.VERIFICATION_ERROR.setMsg(ssoBody.getMsg());
				return response.failure(ResultEnum.VERIFICATION_ERROR);
			} else {
				return response.success();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return response.err();
		}
	}
	
	/**
	* @Title: modifyPwd
	* @author shilijin
	* @date 2017年3月15日上午11:46:55
	* @description:修改密码
	*/
	@POST
    @Path("modify/password")
	@Override
	public ResponseResult<AppUserVo> modifyPwd(AppLoginVo loginVo) {
		ResponseResult<AppUserVo> response = new ResponseResult<AppUserVo>();
		SSORequestVo validateUser = new SSORequestVo();
		try {
			//第一步，验证token是否有效
			validateUser.setTokenId(loginVo.getToken());
			validateUser.setUserId(loginVo.getuCenterId());
			SsoResponeVo ssoBy = SSOFunc.verifyLoginUser(validateUser);
			if(ssoBy == null) {
				return response.failure(ResultEnum.OPERATION_FAILD);
			} else if(ssoBy.getMsgCode() != 0) {
				ResultEnum.TOKEN_ERROR.setMsg(ssoBy.getMsg());
				return response.failure(ResultEnum.TOKEN_ERROR);
			}
			//查找本地用户
			UserVo userVo = new UserVo();
			userVo.setCenterId(loginVo.getuCenterId());
			UserVo uv = userService.findByCenterId(userVo);
			if(uv != null) {
				if(!(MD5.produceUUID(MD5.produceUUID(loginVo.getOldPassword()))).equals(uv.getPassword())) {
					return response.failure(ResultEnum.OLD_PASSWORD_ERROR);
				}
				UserVo uvo = new UserVo();
				uvo.setId(uv.getId());
				uvo.setPwdMd5(MD5.produceUUID(MD5.produceUUID(loginVo.getNewPassword())));
				boolean rs = userService.update(uvo);
				if(!rs) {
					return response.failure(ResultEnum.OPERATION_FAILD);
				}
			} else {
				return response.failure(ResultEnum.USER_IS_NOT_EXIST);
			}
			//第二步，修改密码 
			//修改统一中心
			validateUser.setUserId(loginVo.getuCenterId());
			validateUser.setTokenId(loginVo.getToken());
			validateUser.setOldPwd(MD5.produceUUID(loginVo.getOldPassword()));
			validateUser.setNewPwd(MD5.produceUUID(loginVo.getNewPassword()));
			SsoResponeVo ssoBody = SSOFunc.updateUserPwd(validateUser);
			if(ssoBody == null) {
				return response.failure(ResultEnum.OPERATION_FAILD);
			} else if(ssoBody.getMsgCode() != 0) {
				ResultEnum.MODIFY_PASSWORD_FAILD.setMsg(ssoBody.getMsg());
				return response.failure(ResultEnum.MODIFY_PASSWORD_FAILD);
			} else {
				return response.success();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return response.err();
		}
	}
	
	/**
	* @Title: resetPwd
	* @author shilijin
	* @date 2017年3月15日上午11:46:55
	* @description:重置密码
	*/
	@POST
    @Path("reset/password")
	@Override
	public ResponseResult<AppUserVo> resetPwd(AppLoginVo loginVo) {
		ResponseResult<AppUserVo> response = new ResponseResult<AppUserVo>();
		SSORequestVo validateUser = new SSORequestVo();
		try {
			//1、判断统一中心和ERP系统是否都存在该号码
			//查找本系统
			UserVo uv = new UserVo();
			uv.setMobileNo(loginVo.getAccount());
			uv.setUserName(loginVo.getAccount());
			UserVo vo = userService.findIsExistByUserName(uv);
			//查找统一中心
			validateUser.setValidInfo(loginVo.getAccount());
			int val = SSOFunc.validateUser(validateUser);
			//统一中心不存在，ERP也不存在
			if(val != 413 && vo == null) {
				return response.failure(ResultEnum.USER_IS_NOT_EXIST);
			}
			//统一中心存在，ERP也存在,则重置密码
			if(val == 413 && vo != null) {
				//调用统一中心接口
				validateUser.setUserMobile(loginVo.getAccount());
				validateUser.setPassword(MD5.produceUUID(loginVo.getPassword()));
				validateUser.setMobileCode(loginVo.getValidCode());
				SsoResponeVo ssoBody = SSOFunc.resetUserPwd(validateUser);
				if(ssoBody.getMsgCode() == 0) {
					//统一中心重置成功，继续重置ERP系统
					UserVo userVo = new UserVo();
					userVo.setId(vo.getId());
					userVo.setPwdMd5(MD5.produceUUID(MD5.produceUUID(loginVo.getPassword())));
					boolean re = userService.update(userVo);
					if(!re) {
						return response.failure(ResultEnum.OPERATION_FAILD);
					} else {
						return response.success();
					}
				}
			}
			//统一中心存在，ERP不存在，只修改统一中心
			if(val == 413 && vo != null) {
				//调用统一中心接口
				validateUser.setUserMobile(loginVo.getAccount());
				validateUser.setPassword(MD5.produceUUID(loginVo.getPassword()));
				validateUser.setMobileCode(loginVo.getValidCode());
				SsoResponeVo ssoBody = SSOFunc.resetUserPwd(validateUser);
				if(ssoBody == null) {
					return response.failure(ResultEnum.OPERATION_FAILD);
				} else if(ssoBody.getMsgCode() != 0) {
					ResultEnum.RESET_PASSWORD_FAILD.setMsg(ssoBody.getMsg());
					return response.failure(ResultEnum.RESET_PASSWORD_FAILD);
				} else {
					return response.success();
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return response.err();
		}
		//ERP存在，统一中心不存在？
		return response.failure(ResultEnum.USER_IS_NOT_EXIST);
	}
	
	/**
	* @Title: logout
	* @author shilijin
	* @date 2017年3月15日上午11:46:55
	* @description:登出
	*/
	@POST
    @Path("logout")
	@Override
	public ResponseResult<AppUserVo> logout(AppLoginVo loginVo) {
		ResponseResult<AppUserVo> response = new ResponseResult<AppUserVo>();
		try {
			UserCacheUtil.delUser(loginVo.getuCenterId() + "");
			//调用注销接口
			return response.success();
		} catch (Exception e) {
			e.printStackTrace();
			return response.err();
		}
	}
}



package com.zhilianbao.erp.web.system.controller;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.scripting.xmltags.ForEachSqlNode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.zhilianbao.erp.auth.service.system.IAuthSystemService;
import com.zhilianbao.erp.auth.service.user.IUserService;
import com.zhilianbao.erp.auth.vo.user.LoginManagerOperatorVo;
import com.zhilianbao.erp.auth.vo.user.LoginManagerVo;
import com.zhilianbao.erp.auth.vo.user.LoginMenuVo;
import com.zhilianbao.erp.auth.vo.user.LoginOperatorVo;
import com.zhilianbao.erp.auth.vo.user.LoginUserVo;
import com.zhilianbao.erp.auth.vo.user.LoginVo;
import com.zhilianbao.erp.auth.vo.user.UserVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.entity.OperatorBean;
import com.zhilianbao.erp.common.redis.RedisUtils;
import com.zhilianbao.erp.common.util.LoginUtils;
import com.zhilianbao.erp.common.util.MD5;
import com.zhilianbao.erp.common.vo.ResponseValue;
import com.zhilianbao.erp.tms.service.ITmsSystemService;
import com.zhilianbao.erp.web.base.BaseController;
import com.zhilianbao.erp.web.base.security.ErpUserPrincipal;
import com.zhilianbao.erp.web.base.security.MyCasRealm;

/**
 * @company zhilianbao
 * @author  
 * @date   2016-08-31 上午 8:39:17
 * @description:登录模块
 * 
*/
@Controller
@RequestMapping("/login")
public class LoginController extends BaseController {
	
	private static Logger logger=LogManager.getLogger(LoginController.class);
	
	@Reference
	private IUserService userService;
	@Reference
	private IAuthSystemService authSystemServiceImpl;
	@Reference
	private ITmsSystemService tmsSystemServiceImpl;
	
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String enterMainJsp(Model model) {
		String forwardUrl = "login/login";
		ErpUserPrincipal ssoUser = MyCasRealm.getSsoUserInfo();
		if(null != ssoUser){
			forwardUrl = "login/myMain";
		}
		return setResponseModel(forwardUrl,model,request);
	}
	
	/***
	 * 出错跳转
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/topSkipLogin",  method = RequestMethod.GET)
	public String topSkipLogin(Model model) {
		return setResponseModel("login/topSkipLogin",model,request);
	}
	
	/***
	 * ajax出错跳转
	 * @param info
	 * @return
	 */
	@RequestMapping(value = "/ajaxInfo")
	@ResponseBody
	public ResponseValue<String> ajaxInfo(String info) {
		ResponseValue<String> responseValue=new ResponseValue<String>();
		String msg=urlEncode(info);
		return responseValue.failureLoginAuth(msg);
	}
	
	/***
	 * 用户登录
	 * @param loginVo
	 * @return
	 */
	@RequestMapping(value = "/doLogin")
	@ResponseBody
	public ResponseValue<LoginUserVo> doLogin(@RequestBody LoginVo loginVo) {
		ResponseValue<LoginUserVo> responseValue = new ResponseValue<LoginUserVo>();
		try {
			LoginUserVo loginUserVo = null;
			String mpwd = MD5.getMD5String(StringUtils.trimToEmpty(loginVo.getPwd()));
			loginVo.setPwd(mpwd);
			
			ErpUserPrincipal ssoUser = MyCasRealm.getSsoUserInfo();
			//保存SSO用户信息,登录方式：0：本地登录，1：SSO登录
			if (null != ssoUser) {
				String ssoLoginAccount = ssoUser.getUserName();
				loginVo = new LoginVo(ssoLoginAccount,1);
				//缓存SSO端token,以备操作研发中心api.
				loginUserVo = new LoginUserVo(ssoLoginAccount,Long.parseLong(ssoUser.getuCenterId()),ssoUser.getToken());
				userService.saveSsoToken(loginUserVo);
			} 
			
			responseValue = userService.doLogin(loginVo);
			
			String code = responseValue.getCode();
			if (!Constants.CODE_SUCCESS.equals(code)) {
				return responseValue.failure(ResultEnum.USER_IS_NOT_EXIST);
			}
			
			loginUserVo = responseValue.getData();
			
			long companyKey=loginUserVo.getCompanyKey();
            if(companyKey != 0){//0:运维，其他：运营商
				if(loginUserVo.getOcEnabled() == 0){//运营商失效
					return responseValue.failure("帐号对应的运营商失效，请联系管理员。");
				}
			}
			
			OperatorBean operatorBean = new OperatorBean();
			PropertyUtils.copyProperties(operatorBean, loginUserVo);
			
			RedisUtils.rLoginSet(loginUserVo.getUserId() + Constants.USER_ID+LoginUtils.sameUserKeyToken(loginUserVo.getToken()), operatorBean);
		} catch (Exception e) {
			logger.error("LoginController,doLogin", e);
			return responseValue.err();
		}
		return responseValue;
	}
	
	/***
	 * 获取菜单
	 * @param loginOperatorVo
	 * @return
	 */
	@RequestMapping(value = "/allMenu")
	@ResponseBody
	public ResponseValue<LoginManagerVo> qryAllMenu(@RequestBody LoginOperatorVo loginOperatorVo) {
		ResponseValue<LoginManagerVo> responseValue=new ResponseValue<LoginManagerVo>();
		
		//long userId=getUserId();//sso id
		long operatorId=getOperatorId();//sso id
		long selfOperatorId=getSelfOperatorId();
		long selfUserId=getSelfUserId();
		String selfCompanyName=getSelfOperatorName();
		
		loginOperatorVo.setUserId(selfUserId);
		
		String operatorIdToken=loginOperatorVo.getOperatorIdToken();
		long paraOperatorId=0;//sso id
		long paraSelfOperatorId=0;
		String paraSelfCompanyName=null;
		
		List<Long> manaOperatorIds=new ArrayList<Long>();
		List<LoginManagerOperatorVo> operatorVoList=null;
		
		boolean isSuperAdmin = (getUserType() == Constants.MANA_ROLE_TYPE) ? true : false;
		if(isSuperAdmin){//运维
			if(!String.valueOf(Constants.MANA_ROLE_TYPE).equals(operatorIdToken)){
				Object manaOperatorIdObj=RedisUtils.rGet(String.valueOf(selfUserId)+Constants.MANA_OPERATOR_IDS+LoginUtils.sameUserKeyToken(getUserToken()));
				if(manaOperatorIdObj != null){
		    		String jsonMObj=JSON.toJSONString(manaOperatorIdObj);
		        	List<LoginManagerOperatorVo> loginManagerOperatorVoList = JSON.parseArray(jsonMObj, LoginManagerOperatorVo.class);
		        	for(LoginManagerOperatorVo loginManagerOperatorVo:loginManagerOperatorVoList){
		        		if(loginManagerOperatorVo.getOperatorIdToken().equals(operatorIdToken)){
		        			paraOperatorId=loginManagerOperatorVo.getCompanyKey();
		        			paraSelfOperatorId=loginManagerOperatorVo.getOperatorId();
		        			paraSelfCompanyName=loginManagerOperatorVo.getCompanyName();
		        			break;
		        		}
		        	}
				}
				if(paraOperatorId == 0){
					return responseValue.failureIncorrect("请正确操作！");
				}
				manaOperatorIds.add(paraOperatorId);
			}else{
				operatorVoList=userService.qryManagerOperator(loginOperatorVo);
				if(operatorVoList!=null && operatorVoList.size()>0){
					paraOperatorId=operatorVoList.get(0).getCompanyKey();
					paraSelfOperatorId=operatorVoList.get(0).getOperatorId();
					paraSelfCompanyName=operatorVoList.get(0).getCompanyName();
					manaOperatorIds.add(paraOperatorId);
				}
			}
			manaOperatorIds.add(Constants.MANA_ROLE_TYPE);
		}else{
			paraOperatorId=operatorId;
			paraSelfOperatorId=selfOperatorId;
			paraSelfCompanyName=selfCompanyName;
			manaOperatorIds.add(paraOperatorId);
		}
		
		loginOperatorVo.setOperatorIds(manaOperatorIds);
		
		responseValue=userService.queryAllMenu(loginOperatorVo);
		
		String code = responseValue.getCode();
		if (!Constants.CODE_SUCCESS.equals(code)) {
			return responseValue;
		}
		List<LoginMenuVo> loginMenuVoList = responseValue.getData().getLoginMenuVoList();
		
		for (LoginMenuVo loginMenuVo : loginMenuVoList) {
			if(1 == loginMenuVo.getIsExternalSystemUrl()){
				logger.info(JSON.toJSONString(loginMenuVo));
				loginMenuVo.setMenuUrl(loginMenuVo.getMenuUrl() + "?opid=" + super.getOperatorId() + "&opname=" + super.getSelfOperatorName() + "&issuper=" + isSuperAdmin);
				logger.info(JSON.toJSONString(loginMenuVo));
			}
		}
		OperatorBean operatorBean=RedisUtils.rLoginGet(selfUserId+Constants.USER_ID+LoginUtils.sameUserKeyToken(getUserToken()));
		operatorBean.setCompanyKey(paraOperatorId);
		operatorBean.setOperatorId(paraSelfOperatorId);
		operatorBean.setCompanyName(paraSelfCompanyName);
		RedisUtils.rLoginSet(selfUserId+Constants.USER_ID+LoginUtils.sameUserKeyToken(getUserToken()),operatorBean);
		
		RedisUtils.rLoginSet(selfUserId+Constants.MENU+LoginUtils.sameUserKeyToken(getUserToken()),loginMenuVoList);
		
		if(operatorVoList!=null && operatorVoList.size()>0){
			responseValue.getData().setLoginManagerOperatorVoList(operatorVoList);
			RedisUtils.rLoginSet(selfUserId+Constants.MANA_OPERATOR_IDS+LoginUtils.sameUserKeyToken(getUserToken()),operatorVoList);
		}
		
		responseValue.getData().setCompanyName(paraSelfCompanyName);
		
		return responseValue;
	}
	
	/***
	 * 获取管理的运营商
	 * @return
	 */
	@RequestMapping(value = "/qryManagerOperator")
	@ResponseBody
	public ResponseValue<List<LoginManagerOperatorVo>> qryManagerOperator() {
		ResponseValue<List<LoginManagerOperatorVo>> responseValue=new ResponseValue<List<LoginManagerOperatorVo>>();
		return responseValue.success(qryManagerOperatorList());
	}
	
	/***
	 * 进入主页面
	 * @param model
	 * @param username
	 * @param pwd
	 * @return
	 */
	@RequestMapping(value = "/main",  method = RequestMethod.GET)
	public String main(Model model, String username, String pwd) {
		return setResponseModel("login/myMain",model,request);
	}
	
	@RequestMapping(value = "/top",  method = RequestMethod.GET)
	public String getTop(Model model) {
		return setResponseModel("login/top",model,request);
	}
	
	@RequestMapping(value = "/left",  method = RequestMethod.GET)
	public String getLeft(Model model) {
		return setResponseModel("login/left",model,request);
	}
	
	@RequestMapping(value = "/right",  method = RequestMethod.GET)
	public String getRight(Model model) {
		return setResponseModel("login/right",model,request);
	}
	
	/***
	 * 退出登录
	 * @return
	 */
	@RequestMapping(value = "/logout",  method = RequestMethod.GET)
	public String logout() {
		String redirectMsg = "";
		try {
			RedisUtils.rDel(String.valueOf(getSelfUserId()) + Constants.USER_ID + LoginUtils.sameUserKeyToken(getUserToken()));
			RedisUtils.rDel(String.valueOf(getSelfUserId()) + Constants.MENU + LoginUtils.sameUserKeyToken(getUserToken()));
			RedisUtils.rDel(String.valueOf(getSelfUserId()) + Constants.MANA_OPERATOR_IDS + LoginUtils.sameUserKeyToken(getUserToken()));

			// 清理auth板块缓存
			authSystemServiceImpl.cleanAllAuthCache(super.getUserId());
			// 清理tms板块缓存
			tmsSystemServiceImpl.cleanAllTmsCache(super.getUserId(),super.getOperatorId());
			// TODO 清理oms板块缓存
			
			
			SecurityUtils.getSubject().logout();
			
			redirectMsg = "已退出登录";
		} catch (Exception e) {
			logger.error("LoginController,logout", e);
			redirectMsg = "退出登录异常，请联系管理员!";
		}
		return "redirect:/login/topSkipLogin?info=" + urlEncode(redirectMsg);
	}
	
	/***
	 * url encode
	 * @param msg
	 * @return
	 */
	private String urlEncode(String msg){
		try {
			return URLEncoder.encode(msg, Constants.UTF_8);
		} catch (Exception e) {
			logger.error("LoginController,urlEncode", e);
			return null;
		}
	}
	
	/**
	 *修改密码
	 */
	@RequestMapping(value = "/modifyPwd",  method = RequestMethod.POST)
	@ResponseBody
	public String modifyPwd(@RequestBody UserVo uv) {
		
		//获取token与userId
		Long userId = getUserId();
		//UserCacheUtil.getUserSsoToken(userId);
		uv.setCenterId(userId);
		return userService.moidfyPwd(uv);
	}
	
	/**
	* @Title: unAuthorized
	* @author chengjianhui
	* @date 2017年4月19日上午11:54:56
	* @description:SSO没有权限跳转的地址  
	 */
	@RequestMapping(value = "/unAuthorized",  method = RequestMethod.GET)
	public String unAuthorized(@RequestParam("msg") String msg) {
		String errorMsg = "您的账号已在其他设备上登录，如果不是您亲自进行此操作，建议您立刻修改登录密码";
		String ssoUrl = "/login/logout";
		if(StringUtils.isNotBlank(msg)){
			errorMsg = msg;
		}
		SecurityUtils.getSubject().logout();
		return "redirect:/login/topSkipLogin?info=" + urlEncode(errorMsg) + "&ssoUrl="+ssoUrl;
	}
}















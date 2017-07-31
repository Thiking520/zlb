package com.zhilianbao.erp.app.service.user;

import com.zhilianbao.erp.app.vo.user.AppLoginVo;
import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.common.vo.ResponseResult;

public interface IUserAccountService {
	
    /**
    * @Title: doLogin
    * @author shilijin
    * @date 2017年3月15日上午11:45:33
    * @param loginVo
    * @return ResponseValue<AppUserVo>
    * @description:用户登录
    */
    public ResponseResult<AppUserVo> doLogin(AppLoginVo loginVo);
    
    /**
    * @Title: register
    * @author shilijin
    * @date 2017年3月15日上午11:46:34
    * @param loginVo
    * @return ResponseValue<AppUserVo>
    * @description:用户注册
    */
    //public ResponseValue<ResAccountRegisterVo> register(ReqAccountRegisterVo reqAccountRegisterVo);

    /**
     * 注册获取验证码
     * @param loginVo
     * @return
     */
	ResponseResult<AppUserVo> verificationCode(AppLoginVo loginVo);
	/**
     * 校验验证码
     * @param loginVo
     * @return
     */
	ResponseResult<AppUserVo> checkCode(AppLoginVo loginVo);

	ResponseResult<AppUserVo> register(AppLoginVo loginVo);

	ResponseResult<AppUserVo> modifyPwd(AppLoginVo loginVo);

	ResponseResult<AppUserVo> resetPwd(AppLoginVo loginVo);

	ResponseResult<AppUserVo> logout(AppLoginVo loginVo);

	//ResponseValue<AppUserVo> verificationCode(ValidCodeRequestVo loginVo);

	//ResponseBodyPojo test(HttpHeaders headers, HttpServletRequest request);
    
    
}

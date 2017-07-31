package com.zhilianbao.erp.web.base.security;

import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cas.CasAuthenticationException;
import org.apache.shiro.cas.CasRealm;
import org.apache.shiro.cas.CasToken;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.StringUtils;
import org.jasig.cas.client.authentication.AttributePrincipal;
import org.jasig.cas.client.validation.Assertion;
import org.jasig.cas.client.validation.TicketValidationException;
import org.jasig.cas.client.validation.TicketValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月22日下午5:55:19
* @description:身份认证信息处理类
*/
public class MyCasRealm extends CasRealm{  
      
	private static Logger logger = LoggerFactory.getLogger(MyCasRealm.class);
	
	
	@Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        CasToken casToken = (CasToken) token;
        if (token == null) {
            return null;
        }
        
        String ticket = (String)casToken.getCredentials();
        if (!StringUtils.hasText(ticket)) {
            return null;
        }
        
        TicketValidator ticketValidator = ensureTicketValidator();

        try {
            // contact CAS server to validate service ticket
            Assertion casAssertion = ticketValidator.validate(ticket, getCasService());
            // get principal, user id and attributes
            AttributePrincipal casPrincipal = casAssertion.getPrincipal();
            logger.debug("【SSO】1->Validate ticket={} | CAS server={} | casPrincipal={}",ticket,getCasServerUrlPrefix(),JSON.toJSONString(casPrincipal));
            Map<String, Object> attributes = casPrincipal.getAttributes();
            logger.debug("【SSO】2->attributes={} ", JSON.toJSONString(attributes));
            
            String loginAccount = casPrincipal.getName();
            String uCenterId = String.valueOf(attributes.get("UserID"));
            String userAlias = String.valueOf(attributes.get("UserAlias"));
            String tokenId = String.valueOf(attributes.get("tokenID"));
            
            casToken.setUserId(loginAccount);
            String rememberMeAttributeName = getRememberMeAttributeName();
            String rememberMeStringValue = (String)attributes.get(rememberMeAttributeName);
            logger.debug("【SSO】->casToken=> ", casToken.toString());
            boolean isRemembered = rememberMeStringValue != null && Boolean.parseBoolean(rememberMeStringValue);
            if (isRemembered) {
                casToken.setRememberMe(true);
            }
            // create simple authentication info
            SimpleAuthenticationInfo saInfo;
           
            ErpUserPrincipal principal = new ErpUserPrincipal();
    		principal.setUserName(loginAccount);
    		principal.setUserAlias(userAlias);
    		principal.setToken(tokenId);
    		principal.setuCenterId(uCenterId);
    		saInfo = new SimpleAuthenticationInfo(principal, ticket, getName());
    		return saInfo;
        } catch (TicketValidationException e) { 
            throw new CasAuthenticationException("Unable to validate ticket [" + ticket + "]", e);
        }
    }
	
    @Override  
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {  
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
         
		//TODO获取资源菜单
		
		return info;
    }
    
    /**
    * @Title: getSsoUserInfo
    * @author chengjianhui
    * @date 2017年3月25日下午3:10:26
    * @return String
    * @description:获取SSO用户登录对象
    */
    public static ErpUserPrincipal getSsoUserInfo(){
		ErpUserPrincipal userPrincipal = null;
    	try {
    		Subject subject = SecurityUtils.getSubject();
    		Object principal = subject.getPrincipal();
    		if (null == principal) {
    			return userPrincipal;
    		}
    		if (principal != null && principal instanceof ErpUserPrincipal) {
    			userPrincipal = (ErpUserPrincipal) principal;
    		}
    		return userPrincipal;
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("获取SSO用户登录对象异常!");
			return userPrincipal;
		}
    }
}  
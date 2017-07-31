package com.zhilianbao.erp.web.interceptor;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.zhilianbao.erp.auth.vo.user.LoginUserVo;
import com.zhilianbao.erp.auth.vo.user.MenuVo;
import com.zhilianbao.erp.common.annotation.Auth;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.entity.OperatorBean;
import com.zhilianbao.erp.common.redis.RedisUtils;
import com.zhilianbao.erp.common.util.LoginUtils;
import com.zhilianbao.erp.web.system.controller.LoginController;

public class LoginInterceptor implements HandlerInterceptor {
	private static Logger logger = LogManager.getLogger(LoginController.class);
	
	private List<String> excludedUrls;

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object obj, Exception exception)
			throws Exception {
		

	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object obj, ModelAndView modelAndView)
			throws Exception {
		

	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object obj) throws Exception {
		String requestUrl = request.getRequestURI();
		String contextPath=request.getContextPath();
		String pathInfo="";
		String requestType = request.getHeader("X-Requested-With");
		if(requestType==null){
			pathInfo=contextPath+"/login/topSkipLogin";
		}else{
			pathInfo=contextPath+"/login/ajaxInfo";
		}
		
		HttpSession session=request.getSession();
		
		String requestUri = request.getRequestURI();
        for (String url : excludedUrls) {
            if (requestUri.contains(url)) {
                return true;
            }
        }
        
        String operVal=null;
        String operValue=request.getHeader("Cookie");
        if(operValue==null){
        	logger.info("★★★★==1>" + requestUrl);
        	String info=URLEncoder.encode("获取不到cookie,请重新登录！",Constants.UTF_8);
        	response.sendRedirect(pathInfo+"?info="+info);
            return false;
        }
        operValue=URLDecoder.decode(operValue,"utf-8");   
        String[] operValueArr=null;
        String[] cookieOperValueArr=null;
        if(operValue!=null){
        	operValueArr=operValue.split(";");
        	for(int i=0;i<operValueArr.length;i++){
        		cookieOperValueArr=operValueArr[i].split("=");
        		if(Constants.OPER_KEY.equals(cookieOperValueArr[0].trim())){
        			operVal=cookieOperValueArr[1];
        		}
        	}
        }
        if(operVal==null || "".equals(operVal)){
        	logger.info("★★★★==2>" + requestUrl);
        	String info=URLEncoder.encode("cookie失效，请重新登录！",Constants.UTF_8);
        	response.sendRedirect(pathInfo+"?info="+info);
            return false;
        }
        
        LoginUserVo loginUserVo = JSON.parseObject(operVal, LoginUserVo.class); 
        
    	OperatorBean operatorBean=RedisUtils.rLoginGet(String.valueOf(loginUserVo.getUserId())+Constants.USER_ID+LoginUtils.sameUserKeyToken(loginUserVo.getToken()));
    	if(operatorBean==null){
    		logger.info("★★★★==3>" + requestUrl);
    		String info=URLEncoder.encode("登录失效,请重新登录！",Constants.UTF_8);
        	response.sendRedirect(pathInfo+"?info="+info);
            return false;
    	}
    	
    	String oToken=operatorBean.getToken();
    	long oUserId=operatorBean.getUserId();
    	String oUserName=operatorBean.getUserName();
    	long oOperatorId=operatorBean.getOperatorId();
    	long oUserType=operatorBean.getUserType();
    	long companyKey=operatorBean.getCompanyKey();
    	long centerId=operatorBean.getCenterId();
    	String companyName=operatorBean.getCompanyName();
    	
    	String uToken=loginUserVo.getToken();
    	long uUserId=loginUserVo.getUserId();
    	
    	if(!oToken.equals(uToken) || oUserId != uUserId){
    		String info=URLEncoder.encode("请正确请求或已被踢出,请重新登录！",Constants.UTF_8);
        	response.sendRedirect(pathInfo+"?info="+info);
            return false;
    	}
    	
    	session.setAttribute(Constants.USER_ID, oUserId);
    	session.setAttribute(Constants.USER_NAME, oUserName);
    	session.setAttribute(Constants.OPERATOR_ID, oOperatorId);
    	session.setAttribute(Constants.USER_TYPE, oUserType);
    	session.setAttribute(Constants.USER_TOKEN, oToken);
    	
    	session.setAttribute(Constants.COMPANY_KEY, companyKey);
    	session.setAttribute(Constants.CENTER_ID, centerId);
    	session.setAttribute(Constants.COMPANY_NAME, companyName);
    	
    	HandlerMethod method=null;
    	try {
    		method = (HandlerMethod)obj;
		} catch (Exception e) {
			String info=URLEncoder.encode("请确定请求的URI有效，"+requestUri,Constants.UTF_8);
        	response.sendRedirect(pathInfo+"?info="+info);
            return false;
		}
    	  
        Auth auth = method.getMethodAnnotation(Auth.class);
        if(auth != null){
        	String authUrl = requestUri.replaceAll(contextPath, "");
        	List<String> urlList=getMenu(oUserId,oToken);
        	if(!urlList.contains(authUrl)){
        		String info=URLEncoder.encode(authUrl+",没有权限,请重新登录！",Constants.UTF_8);
            	response.sendRedirect(pathInfo+"?info="+info);
                return false;
        	}
        }
        
        return true;
	}

	public void setExcludedUrls(List<String> excludedUrls) {
		this.excludedUrls = excludedUrls;
	}
	
	public List<String> getMenu(long oUserId,String token){
		Object mObj=RedisUtils.rGet(oUserId+Constants.MENU+LoginUtils.sameUserKeyToken(token));
    	List<String> urlList=new ArrayList<String>();
    	if(mObj != null){
    		String jsonMObj=JSON.toJSONString(mObj);
        	List<MenuVo> mList = JSON.parseArray(jsonMObj, MenuVo.class);
        	for(MenuVo menuVo:mList){
        		if(menuVo.getMenuType()!=1){
        			urlList.add(menuVo.getMenuUrl());
        		}
        	}
    	}
    	return urlList;
	}

}

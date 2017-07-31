package com.zhilianbao.erp.web.base.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.StringUtils;
import org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter;
import org.apache.shiro.web.util.WebUtils;

import com.alibaba.fastjson.JSON;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月21日上午8:50:04
* @description:权限授权过滤器
*/
public class ErpPermissionsAuthorizationFilter extends PermissionsAuthorizationFilter {


	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws IOException {

        Subject subject = getSubject(request, response);
        // If the subject isn't identified, redirect to login URL
        if (subject.getPrincipal() == null) {
            saveRequestAndRedirectToLogin(request, response);
        } else {
            // If subject is known but not authorized, redirect to the unauthorized URL if there is one
            // If no unauthorized URL is specified, just return an unauthorized HTTP status code
            String unauthorizedUrl = getUnauthorizedUrl();
            //SHIRO-142 - ensure that redirect _or_ error code occurs - both cannot happen due to response commit:
            if (StringUtils.hasText(unauthorizedUrl)) {
            	HttpServletRequest rq = WebUtils.toHttp(request);
            	String header = rq.getHeader("Accept");
            	if(header != null && header.indexOf("application/json") != -1 ){
            		HttpServletResponse rp = WebUtils.toHttp(response);
            		PrintWriter out = rp.getWriter();
            		try {
						out.print(JSON.toJSON(new ResponseResult<Object>(ResultEnum.ILLEGAL_PARAM)));
						out.flush();
					} catch (Exception e) {
						if(out != null)
						out.close();
					}
            	}else{
            		WebUtils.issueRedirect(request, response, unauthorizedUrl);
            	}
            } else {
                WebUtils.toHttp(response).sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }
        return false;
    }
}

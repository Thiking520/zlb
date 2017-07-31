package com.zhilianbao.erp.auth.vo.user;

import java.io.Serializable;

public class LoginVo implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String userName;
	private String pwd;
	/***登录方式：0：本地登录，1：SSO登录***/
	private Integer loginType=0;
	
    public LoginVo(){}
    
    public LoginVo(String userName,int loginType){
    	this.userName = userName;
    	this.loginType=loginType;
    }
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public Integer getLoginType() {
		return loginType;
	}

	public void setLoginType(Integer loginType) {
		this.loginType = loginType;
	}
	
	

}

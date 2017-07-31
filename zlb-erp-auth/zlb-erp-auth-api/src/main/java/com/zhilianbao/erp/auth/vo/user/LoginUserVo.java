package com.zhilianbao.erp.auth.vo.user;

import com.zhilianbao.erp.common.vo.BaseVo;

public class LoginUserVo extends BaseVo  {

	private static final long serialVersionUID = 1L;
	
	private String userName;
	private Long centerId;
	private String token;
	//研发终端端的token，主要用于操作研发中心的api(如修改密码api)
	private String ssoToken;
	private Integer userType;
	private Long companyKey;
	private String companyName;
	private Integer ocEnabled;//运营商 enabled
	
	public LoginUserVo(){}
	
	public LoginUserVo(String loginAccount,Long centerId,String ssoToken){
		this.userName = loginAccount;
		this.centerId = centerId;
		this.ssoToken = ssoToken;
	}

	public String getSsoToken() {
		return ssoToken;
	}
	public void setSsoToken(String ssoToken) {
		this.ssoToken = ssoToken;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Long getCenterId() {
		return centerId;
	}
	public void setCenterId(Long centerId) {
		this.centerId = centerId;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Integer getUserType() {
		return userType;
	}
	public void setUserType(Integer userType) {
		this.userType = userType;
	}
	public Long getCompanyKey() {
		return companyKey;
	}
	public void setCompanyKey(Long companyKey) {
		this.companyKey = companyKey;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Integer getOcEnabled() {
		return ocEnabled;
	}

	public void setOcEnabled(Integer ocEnabled) {
		this.ocEnabled = ocEnabled;
	}
	
	
	

}

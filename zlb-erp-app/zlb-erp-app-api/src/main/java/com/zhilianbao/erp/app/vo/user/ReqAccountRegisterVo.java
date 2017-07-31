package com.zhilianbao.erp.app.vo.user;

import java.io.Serializable;

/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月28日下午2:40:08
* @description:手机注册请求Vo
 */
public class ReqAccountRegisterVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = 2276500387623744240L;
	private String osType;		//客户端类型（android、ios、pc、html5）
	private String appId;		//客户端标识
	private String appVersionCode;		//客户端版本号
	private String account;		//账号，目前为手机号码
	private String password;	//密码
	private String validCode;		//验证码
	private String nickName;		//昵称
	private int sex;		//性别
	private String iconUrl;		//头像
	private String signature;		//用户签名
	private Long birthday;		//生日
	
	public String getOsType() {
		return osType;
	}
	public void setOsType(String osType) {
		this.osType = osType;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getAppVersionCode() {
		return appVersionCode;
	}
	public void setAppVersionCode(String appVersionCode) {
		this.appVersionCode = appVersionCode;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getValidCode() {
		return validCode;
	}
	public void setValidCode(String validCode) {
		this.validCode = validCode;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getIconUrl() {
		return iconUrl;
	}
	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public Long getBirthday() {
		return birthday;
	}
	public void setBirthday(Long birthday) {
		this.birthday = birthday;
	}


}

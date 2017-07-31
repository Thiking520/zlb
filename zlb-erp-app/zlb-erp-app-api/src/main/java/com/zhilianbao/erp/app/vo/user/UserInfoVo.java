package com.zhilianbao.erp.app.vo.user;

import java.io.Serializable;
/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月28日下午2:36:44
* @description:用户信息
 */
public class UserInfoVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = -3312751193879800022L;

	private String userId;			//用户ID
	private String nickName;	 		//用户昵称
	private String iconUrl;			//用户头像
	private Integer sex;			//用户性别,1:男;2:女
	private Long loginTime;			//登录时间
	private String token;			//登录成功返回令牌
	private String uCenterId;			//通行证ID
	private String signature;			//用户签名
	private Integer age;			//年龄
	private Long birthday;			//生日
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getIconUrl() {
		return iconUrl;
	}
	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	public Long getLoginTime() {
		return loginTime;
	}
	public void setLoginTime(Long loginTime) {
		this.loginTime = loginTime;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getuCenterId() {
		return uCenterId;
	}
	public void setuCenterId(String uCenterId) {
		this.uCenterId = uCenterId;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public Long getBirthday() {
		return birthday;
	}
	public void setBirthday(Long birthday) {
		this.birthday = birthday;
	}
	
	

}

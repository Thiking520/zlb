package com.zhilianbao.erp.web.base.security;

import java.io.Serializable;


/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月21日下午7:57:29
* @description:存储认证后的用户信息
*/
public class ErpUserPrincipal implements Serializable {

	private static final long serialVersionUID = -8242439529137271408L;

	/** 用户id */
	private Long uid;
	
	/** 运营商id */
	private Integer operatorId;

	/** 账号 */
	private String userName;
	
	/** 登录别名 */
	private String userAlias;

	/** 真实名称 */
	private String realName;

	/** 昵称 */
	private String nickName;

	/** 头像 */
	private String headImageUrl;
	
	/** ucenter token */
	private String token;
	
	/** ucenter userid */
	private String uCenterId;
	
	/** ucenter 运营商 */
	private Object operators;

	public ErpUserPrincipal() {
	}

	public ErpUserPrincipal(Long uid) {
		super();
		this.uid = uid;
	}

	public String getUserAlias() {
		return userAlias;
	}

	public void setUserAlias(String userAlias) {
		this.userAlias = userAlias;
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}
	
	public Integer getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getHeadImageUrl() {
		return headImageUrl;
	}

	public void setHeadImageUrl(String headImageUrl) {
		this.headImageUrl = headImageUrl;
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
	

	public void setOperators(Object operators) {
		this.operators = operators;
	}

	@Override
	public String toString() {
		return "AspPrincipal [uid=" + uid + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((uid == null) ? 0 : uid.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ErpUserPrincipal other = (ErpUserPrincipal) obj;
		if (uid == null) {
			if (other.uid != null)
				return false;
		} else if (!uid.equals(other.uid))
			return false;
		return true;
	}

	public Object getOperators() {
		return operators;
	}

}

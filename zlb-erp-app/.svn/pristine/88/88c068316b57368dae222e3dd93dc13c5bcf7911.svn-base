package com.zhilianbao.erp.app.vo.user;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年5月20日下午3:48:04
* @description:请求SSO端校验用户登录状态实体
*/
public class VerifyLoginUserRequestVo  implements java.io.Serializable  {
	private static final long serialVersionUID = 1L;
	
	private Integer userId;//required ;//当前登录用户Id
	private String tokenId ;//required 当前登录用户tokenId
	
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getTokenId() {
		return tokenId;
	}
	public void setTokenId(String tokenId) {
		this.tokenId = tokenId;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
	
}

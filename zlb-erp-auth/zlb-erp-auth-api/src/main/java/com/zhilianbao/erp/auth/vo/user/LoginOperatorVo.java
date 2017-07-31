package com.zhilianbao.erp.auth.vo.user;

import java.io.Serializable;
import java.util.List;

public class LoginOperatorVo implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long userId;
	private Long centerId;
	private List<Long> operatorIds;
	private Long paraOperatorId;
	private String operatorIdToken;
	
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public List<Long> getOperatorIds() {
		return operatorIds;
	}
	public void setOperatorIds(List<Long> operatorIds) {
		this.operatorIds = operatorIds;
	}
	public Long getParaOperatorId() {
		return paraOperatorId;
	}
	public void setParaOperatorId(Long paraOperatorId) {
		this.paraOperatorId = paraOperatorId;
	}
	
	public String getOperatorIdToken() {
		return operatorIdToken;
	}
	public void setOperatorIdToken(String operatorIdToken) {
		this.operatorIdToken = operatorIdToken;
	}
	public Long getCenterId() {
		return centerId;
	}
	public void setCenterId(Long centerId) {
		this.centerId = centerId;
	}
	

}

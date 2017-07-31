package com.zhilianbao.erp.auth.vo.user;

import java.util.Date;

import com.zhilianbao.erp.common.vo.ViewSearchVo;

public class RolePageVo extends ViewSearchVo{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String uniquekey;//key值
	
	private String roleName;//角色名称
	
	private Boolean enabled;//状态
	
	private Date createTimeStr;//创建时间开始
	
	private Date createTimeEnd;//创建时间结束
	
	private Date updateTimeSta;//更新时间开始
	
	private Date updateTimeEnd;//更新时间结束
	
	private Long userType;
	
	public Long getUserType() {
		return userType;
	}

	public void setUserType(Long userType) {
		this.userType = userType;
	}

	public String getUniquekey() {
		return uniquekey;
	}

	public void setUniquekey(String uniquekey) {
		this.uniquekey = uniquekey;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Date getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(Date createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public Date getCreateTimeEnd() {
		return createTimeEnd;
	}

	public void setCreateTimeEnd(Date createTimeEnd) {
		this.createTimeEnd = createTimeEnd;
	}

	public Date getUpdateTimeStr() {
		return updateTimeSta;
	}

	public void setUpdateTimeStr(Date updateTimeSta) {
		this.updateTimeSta= updateTimeSta;
	}

	public Date getUpdateTimeEnd() {
		return updateTimeEnd;
	}

	public void setUpdateTimeEnd(Date updateTimeEnd) {
		this.updateTimeEnd = updateTimeEnd;
	}

}

package com.zhilianbao.erp.auth.vo.user;

import com.zhilianbao.erp.common.vo.ViewSearchVo;

public class UserPageVo extends ViewSearchVo{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String uniquekey;//键值
	
	private String username;//帐号
	
	private String nickname;//中文名
	
	private Integer enabled;//状态
	
	private String mobileNo;//联系电话
	
	private String roleName;//角色名称
	
	private String cnName;//中文名
	
	private String enName;//英文名
	
	private String description;//员工档案描述
	
	private String empJobId;
    
    private String empJobName;
    
    private String empId;
    
	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getEmpJobId() {
		return empJobId;
	}

	public void setEmpJobId(String empJobId) {
		this.empJobId = empJobId;
	}

	public String getEmpJobName() {
		return empJobName;
	}

	public void setEmpJobName(String empJobName) {
		this.empJobName = empJobName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCnName() {
		return cnName;
	}

	public void setCnName(String cnName) {
		this.cnName = cnName;
	}

	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getUniquekey() {
		return uniquekey;
	}

	public void setUniquekey(String uniquekey) {
		this.uniquekey = uniquekey;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}
	
	
}
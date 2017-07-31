package com.zhilianbao.erp.auth.vo.employee;

import java.util.Date;

import com.zhilianbao.erp.common.vo.BaseVo;

public class EmployeeArchiveVo extends BaseVo{

	private static final long serialVersionUID = 5227754751117365371L;

	private String userName;//用户名
	
	private Long empId;//员工Id
	
	private String mobileNo;//联系方式
	
	private String description;//描述
	
	private String empName;//员工名称
	
	private Long roleId;//角色ID
	
	private String roleName;//角色名称
	
	private Long pointId;//站点ID
	
	private String creator;

    private String modifier;
    
    private Date updateTime;
    
    private String pointIds;//站点ID
    
    private Long userType;//用户类型，0：运维，1：运营商
    
	public Long getUserType() {
		return userType;
	}

	public void setUserType(Long userType) {
		this.userType = userType;
	}

	public String getPointIds() {
		return pointIds;
	}

	public void setPointIds(String pointIds) {
		this.pointIds = pointIds;
	}

	public Long getPointId() {
		return pointId;
	}

	public void setPointId(Long pointId) {
		this.pointId = pointId;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getEmpId() {
		return empId;
	}

	public void setEmpId(Long empId) {
		this.empId = empId;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	
}

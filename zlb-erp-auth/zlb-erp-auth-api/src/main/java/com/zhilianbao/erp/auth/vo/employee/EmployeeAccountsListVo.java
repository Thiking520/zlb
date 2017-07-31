package com.zhilianbao.erp.auth.vo.employee;

import java.util.Date;
import java.util.List;

import com.zhilianbao.erp.common.vo.BaseVo;

public class EmployeeAccountsListVo extends BaseVo{
	
	private static final long serialVersionUID = 1L;

	private Long adminId;
	
	private String uniquekey;
	
	private String userName;
	
	private List<Long> ids;
	
    public List<Long> getIds() {
		return ids;
	}

	public void setIds(List<Long> ids) {
		this.ids = ids;
	}

	public String getUniquekey() {
		return uniquekey;
	}

	public void setUniquekey(String uniquekey) {
		this.uniquekey = uniquekey;
	}

	/**
     * 员工信息表ID,t_employee_information
     */
    private Long employeeId;

    /**
     * 启用/禁用状态，true启用，false禁用
     */
    private Boolean enabled;

    /**
     * 本条记录创建者ID
     */
    private String creator;

    /**
     * 本条记录修改者ID
     */
    private String modifier;

    /**
     * 本纪录创建时间
     */
    private Date createTime;

    private Date updateTime;

    /**
     * 是否删除，为true表示已删除
     */
    private Boolean deleted;

	private String description;
    
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
    /**
     * 获取管理员表ID，t_user_admin
     *
     * @return admin_id - 管理员表ID，t_user_admin
     */
    public Long getAdminId() {
        return adminId;
    }

    /**
     * 设置管理员表ID，t_user_admin
     *
     * @param adminId 管理员表ID，t_user_admin
     */
    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    /**
     * 获取员工信息表ID,t_employee_information
     *
     * @return employee_id - 员工信息表ID,t_employee_information
     */
    public Long getEmployeeId() {
        return employeeId;
    }

    /**
     * 设置员工信息表ID,t_employee_information
     *
     * @param employeeId 员工信息表ID,t_employee_information
     */
    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    /**
     * 获取启用/禁用状态，true启用，false禁用
     *
     * @return enabled - 启用/禁用状态，true启用，false禁用
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * 设置启用/禁用状态，true启用，false禁用
     *
     * @param enabled 启用/禁用状态，true启用，false禁用
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * 获取本条记录创建者ID
     *
     * @return creator - 本条记录创建者ID
     */
    public String getCreator() {
        return creator;
    }

    /**
     * 设置本条记录创建者ID
     *
     * @param creator 本条记录创建者ID
     */
    public void setCreator(String creator) {
        this.creator = creator;
    }

    /**
     * 获取本条记录修改者ID
     *
     * @return modifier - 本条记录修改者ID
     */
    public String getModifier() {
        return modifier;
    }

    /**
     * 设置本条记录修改者ID
     *
     * @param modifier 本条记录修改者ID
     */
    public void setModifier(String modifier) {
        this.modifier = modifier;
    }

    /**
     * 获取本纪录创建时间
     *
     * @return create_time - 本纪录创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置本纪录创建时间
     *
     * @param createTime 本纪录创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return update_time
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * @param updateTime
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * 获取是否删除，为true表示已删除
     *
     * @return deleted - 是否删除，为true表示已删除
     */
    public Boolean getDeleted() {
        return deleted;
    }

    /**
     * 设置是否删除，为true表示已删除
     *
     * @param deleted 是否删除，为true表示已删除
     */
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
    
}
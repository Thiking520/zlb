package com.zhilianbao.erp.auth.vo.user;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;

import com.zhilianbao.erp.common.vo.BaseVo;


public class RoleVo extends BaseVo{


    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * 对外展示的唯一Key值
     */
    private String uniquekey;

    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 角色图标
     */
    private String roleIcon;

    /**
     * 角色描述
     */
    private String roleDescription;

    /**
     * 启用/禁用状态，true启用，false禁用
     */
    private Boolean enabled;

    /**
     * 本条记录创建者ID
     */
    private Long creator;

    /**
     * 本条记录修改者ID
     */
    private Long modifier;

    /**
     * 本纪录创建时间
     */
    private Date createTime;

    private Date updateTime;

    /**
     * 是否删除，为true表示已删除
     */
    private Boolean deleted;

    private String creatorStr;
    
    private String updateTimeStr;
    
    private String createTimeStr;
    
    private String modifierStr;
    
    private String companyName;
    
    private String operatorName;
    
    private List<String> ids;
    
    private Long type;//0运维
    
    public Long getType() {
		return type;
	}

	public void setType(Long type) {
		this.type = type;
	}

	/**
     * 是否为超级管理员,1是，0不是
     */
    private Boolean issuperadmin;

    /**
     * 是否禁止删除。0表示可以删除，1表示不可删除
     */
    private Boolean isdisabledel = false;

    /**
     * 是否不可编辑，0表示可以编辑，1表示不可编辑（包括权限菜单）
     */
    private Boolean isdisableedit = false;
    
	public List<String> getIds() {
		return ids;
	}

	public void setIds(List<String> ids) {
		this.ids = ids;
	}

	public String getOperatorName() {
		return operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCreatorStr() {
		return creatorStr;
	}

	public void setCreatorStr(String creatorStr) {
		this.creatorStr = creatorStr;
	}

	public String getUpdateTimeStr() {
		return updateTimeStr;
	}

	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public String getModifierStr() {
		return modifierStr;
	}

	public void setModifierStr(String modifierStr) {
		this.modifierStr = modifierStr;
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

	public String getRoleIcon() {
		return roleIcon;
	}

	public void setRoleIcon(String roleIcon) {
		this.roleIcon = roleIcon;
	}

	public String getRoleDescription() {
		return roleDescription;
	}

	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Long getCreator() {
		return creator;
	}

	public void setCreator(Long creator) {
		this.creator = creator;
	}

	public Long getModifier() {
		return modifier;
	}

	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Boolean getIssuperadmin() {
		return issuperadmin;
	}

	public void setIssuperadmin(Boolean issuperadmin) {
		this.issuperadmin = issuperadmin;
	}

	public Boolean getIsdisabledel() {
		return isdisabledel;
	}

	public void setIsdisabledel(Boolean isdisabledel) {
		this.isdisabledel = isdisabledel;
	}

	public Boolean getIsdisableedit() {
		return isdisableedit;
	}

	public void setIsdisableedit(Boolean isdisableedit) {
		this.isdisableedit = isdisableedit;
	}
    
}
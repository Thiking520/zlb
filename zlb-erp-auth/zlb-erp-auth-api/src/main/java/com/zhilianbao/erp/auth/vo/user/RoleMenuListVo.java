package com.zhilianbao.erp.auth.vo.user;

import java.io.Serializable;
import java.util.Date;
import java.util.List;



import com.zhilianbao.erp.common.vo.BaseVo;


public class RoleMenuListVo extends BaseVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5160502371890989210L;

	
	private String ids;//菜单ID数组，以","隔开
	
	private List<Long> menuIds;//菜单ID数组
	
	private Long userType;//运维为0
	
	public Long getUserType() {
		return userType;
	}

	public void setUserType(Long userType) {
		this.userType = userType;
	}

	public List<Long> getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(List<Long> menuIds) {
		this.menuIds = menuIds;
	}

	/**
     * 角色表ID,t_role
     */
    private Long roleId;

    /**
     * 菜单表ID,t_menu
     */
    private Long menuId;

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

    /**
     * 获取角色表ID,t_role
     *
     * @return role_id - 角色表ID,t_role
     */
    public Long getRoleId() {
        return roleId;
    }

    /**
     * 设置角色表ID,t_role
     *
     * @param roleId 角色表ID,t_role
     */
    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    /**
     * 获取菜单表ID,t_menu
     *
     * @return menu_id - 菜单表ID,t_menu
     */
    public Long getMenuId() {
        return menuId;
    }

    /**
     * 设置菜单表ID,t_menu
     *
     * @param menuId 菜单表ID,t_menu
     */
    public void setMenuId(Long menuId) {
        this.menuId = menuId;
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
    public Long getCreator() {
        return creator;
    }

    /**
     * 设置本条记录创建者ID
     *
     * @param creator 本条记录创建者ID
     */
    public void setCreator(Long creator) {
        this.creator = creator;
    }

    /**
     * 获取本条记录修改者ID
     *
     * @return modifier - 本条记录修改者ID
     */
    public Long getModifier() {
        return modifier;
    }

    /**
     * 设置本条记录修改者ID
     *
     * @param modifier 本条记录修改者ID
     */
    public void setModifier(Long modifier) {
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

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}
    
    
}

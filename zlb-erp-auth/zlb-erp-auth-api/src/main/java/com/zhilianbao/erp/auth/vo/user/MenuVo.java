package com.zhilianbao.erp.auth.vo.user;

import java.util.Date;


import com.zhilianbao.erp.common.vo.BaseVo;

public class MenuVo extends BaseVo{

	private static final long serialVersionUID = 1L;
	

	private Long isOwn;
	
	/**
     * 菜单类型：1、文件夹；2、父级查询页面；3、功能按钮
     */
    private Integer menuType;

    /**
     * 菜单/功能名称
     */
    private String menuName;

    /**
     * 父级ID
     */
    private Long parentId;

    /**
     * 菜单/功能访问地址
     */
    private String menuUrl;

    /**
     * 同级菜单排序值，数值大靠前
     */
    private Long menuOrder;

    /**
     * 菜单图标
     */
    private String menuIcon;

    /**
     * 功能描述
     */
    private String description;

    /**
     * 启用/禁用状态，
     */
    private Integer enabled;

    /**
     * 本条记录创建者ID
     */
    private String creator;

    /**
     * 本条记录修改者ID
     */
    private String modifier;
    
    /**
     * 是否为私有菜单，如果是，只有运维才能看见
     */
    private Boolean isprivate;

    public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getModifier() {
		return modifier;
	}

	/**
     * 本纪录创建时间
     */
    private Date createTime;

    private Date updateTime;

    /**
     * 是否删除，
     */
    private Integer deleted;


	/**
     * 获取菜单类型：1、文件夹；2、父级查询页面；3、功能按钮
     *
     * @return menu_type - 菜单类型：1、文件夹；2、父级查询页面；3、功能按钮
     */
    public Integer getMenuType() {
        return menuType;
    }

    /**
     * 设置菜单类型：1、文件夹；2、父级查询页面；3、功能按钮
     *
     * @param menuType 菜单类型：1、文件夹；2、父级查询页面；3、功能按钮
     */
    public void setMenuType(Integer menuType) {
        this.menuType = menuType;
    }

    /**
     * 获取菜单/功能名称
     *
     * @return menu_name - 菜单/功能名称
     */
    public String getMenuName() {
        return menuName;
    }

    /**
     * 设置菜单/功能名称
     *
     * @param menuName 菜单/功能名称
     */
    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    /**
     * 获取父级ID
     *
     * @return parent_id - 父级ID
     */
    public Long getParentId() {
        return parentId;
    }

    /**
     * 设置父级ID
     *
     * @param parentId 父级ID
     */
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取菜单/功能访问地址
     *
     * @return menu_url - 菜单/功能访问地址
     */
    public String getMenuUrl() {
        return menuUrl;
    }

    /**
     * 设置菜单/功能访问地址
     *
     * @param menuUrl 菜单/功能访问地址
     */
    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    /**
     * 获取同级菜单排序值，数值大靠前
     *
     * @return menu_order - 同级菜单排序值，数值大靠前
     */
    public Long getMenuOrder() {
        return menuOrder;
    }

    /**
     * 设置同级菜单排序值，数值大靠前
     *
     * @param menuOrder 同级菜单排序值，数值大靠前
     */
    public void setMenuOrder(Long menuOrder) {
        this.menuOrder = menuOrder;
    }

    /**
     * 获取菜单图标
     *
     * @return menu_icon - 菜单图标
     */
    public String getMenuIcon() {
        return menuIcon;
    }

    /**
     * 设置菜单图标
     *
     * @param menuIcon 菜单图标
     */
    public void setMenuIcon(String menuIcon) {
        this.menuIcon = menuIcon;
    }

    /**
     * 获取功能描述
     *
     * @return description - 功能描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置功能描述
     *
     * @param description 功能描述
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 获取启用/禁用状态，
     *
     * @return enabled - 启用/禁用状态，
     */
    public Integer getEnabled() {
        return enabled;
    }

    /**
     * 设置启用/禁用状态，
     *
     * @param enabled 启用/禁用状态，
     */
    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    /**
     * 获取本条记录创建者ID
     *
     * @return creator - 本条记录创建者ID
     *//*
    public String getCreator() {
        return creator;
    }

    *//**
     * 设置本条记录创建者ID
     *
     * @param creator 本条记录创建者ID
     *//*
    public void setCreator(String creator) {
        this.creator = creator;
    }

    *//**
     * 获取本条记录修改者ID
     *
     * @return modifier - 本条记录修改者ID
     *//*
    public String getModifier() {
        return modifier;
    }*/

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
     * 获取是否删除，
     *
     * @return deleted - 是否删除，
     */
    public Integer getDeleted() {
        return deleted;
    }

    /**
     * 设置是否删除，
     *
     * @param deleted 是否删除，
     */
    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

	public Long getIsOwn() {
		return isOwn;
	}

	public void setIsOwn(Long isOwn) {
		this.isOwn = isOwn;
	}

	public Boolean getIsprivate() {
		return isprivate;
	}

	public void setIsprivate(Boolean isprivate) {
		this.isprivate = isprivate;
	}

}
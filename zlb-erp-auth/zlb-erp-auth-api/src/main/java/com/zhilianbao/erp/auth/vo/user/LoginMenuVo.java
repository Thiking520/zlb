package com.zhilianbao.erp.auth.vo.user;

import com.zhilianbao.erp.common.vo.BaseVo;

public class LoginMenuVo extends BaseVo {

	private static final long serialVersionUID = 1L;
	/**菜单/功能名称*/
	private String menuName;
	private String menuUrl;
	private String menuIcon;
	private Long parentId;
	/***菜单类型***/
	private Integer menuType;
	/***模块类型***/
	private Long moduleType;
	/***模块URL***/
	private String moduleUrl;
	/***同级菜单排序值，数值小靠前***/
	private Integer menuOrder;
	/**是否为外部系统菜单，0:否，1：是**/
	private int isExternalSystemUrl;
	
	public int getIsExternalSystemUrl() {
		return isExternalSystemUrl;
	}
	public void setIsExternalSystemUrl(int isExternalSystemUrl) {
		this.isExternalSystemUrl = isExternalSystemUrl;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public String getMenuIcon() {
		return menuIcon;
	}
	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public Integer getMenuType() {
		return menuType;
	}
	public void setMenuType(Integer menuType) {
		this.menuType = menuType;
	}
	public Long getModuleType() {
		return moduleType;
	}
	public void setModuleType(Long moduleType) {
		this.moduleType = moduleType;
	}
	public String getModuleUrl() {
		return moduleUrl;
	}
	public void setModuleUrl(String moduleUrl) {
		this.moduleUrl = moduleUrl;
	}
	public Integer getMenuOrder() {
		return menuOrder;
	}
	public void setMenuOrder(Integer menuOrder) {
		this.menuOrder = menuOrder;
	}
	

}

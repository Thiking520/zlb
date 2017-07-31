package com.zhilianbao.erp.app.vo.user;

import java.io.Serializable;

public class AppInfoVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = 4226107899059158501L;
    private Integer id;	//		主键ID
	private String packageName;//		安装包完整名称
	private Integer version;			//版本号
	private String length;			//文件大小(字节)
	private String packageUrl;	//String		下载路径
	private Boolean isMustUpdate;			//是否必须更新，true(1)必须更新，false(0)可以不更新
	private Boolean isMostNew;			//当前版本是否是最新版本，true(1)是，false(0)不是
	private String updateDes;	//	Y	更新描述信息
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getPackageName() {
		return packageName;
	}
	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}
	public Integer getVersion() {
		return version;
	}
	public void setVersion(Integer version) {
		this.version = version;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getPackageUrl() {
		return packageUrl;
	}
	public void setPackageUrl(String packageUrl) {
		this.packageUrl = packageUrl;
	}
	public Boolean getIsMustUpdate() {
		return isMustUpdate;
	}
	public void setIsMustUpdate(Boolean isMustUpdate) {
		this.isMustUpdate = isMustUpdate;
	}
	public Boolean getIsMostNew() {
		return isMostNew;
	}
	public void setIsMostNew(Boolean isMostNew) {
		this.isMostNew = isMostNew;
	}
	public String getUpdateDes() {
		return updateDes;
	}
	public void setUpdateDes(String updateDes) {
		this.updateDes = updateDes;
	}

}

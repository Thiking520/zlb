package com.zhilianbao.erp.auth.vo.operators;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;
import com.zhilianbao.erp.common.vo.BaseVo;

public class OperatorVo extends BaseVo {

	private static final long serialVersionUID = 1L;

	private Long companyKey;
	private Integer enabled;
	private String enabledName;
	private String companyCode;
	/**运营商简称**/
	private String companyName;
	/**运营商全称**/
	private String companyFullName;
	/**英文全称**/
	private String companyExtName;
	private String customerContact;
	private String customerMobileNo;
	private String customerEmail;
	private String reconciliationContact;
	private String reconciliationMobileNo;
	private String reconciliationEmail;
	private String siteUrl;
	private String companyAddress;
	private String remark;
	
	private String creatorName;
	private String modifierName;

	private Long creator;
	@JSONField (format="yyyy-MM-dd HH:mm:ss") 
	private Date createTime;
	private Long modifier;
	@JSONField (format="yyyy-MM-dd HH:mm:ss") 
	private Date updateTime;
	
	public Integer getEnabled() {
		return enabled;
	}
	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}
	public String getEnabledName() {
		return enabledName;
	}
	public void setEnabledName(String enabledName) {
		this.enabledName = enabledName;
	}
	public String getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyFullName() {
		return companyFullName;
	}
	public void setCompanyFullName(String companyFullName) {
		this.companyFullName = companyFullName;
	}
	public String getCompanyExtName() {
		return companyExtName;
	}
	public void setCompanyExtName(String companyExtName) {
		this.companyExtName = companyExtName;
	}
	public String getCustomerContact() {
		return customerContact;
	}
	public void setCustomerContact(String customerContact) {
		this.customerContact = customerContact;
	}
	public String getCustomerMobileNo() {
		return customerMobileNo;
	}
	public void setCustomerMobileNo(String customerMobileNo) {
		this.customerMobileNo = customerMobileNo;
	}
	public String getCustomerEmail() {
		return customerEmail;
	}
	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}
	public String getReconciliationContact() {
		return reconciliationContact;
	}
	public void setReconciliationContact(String reconciliationContact) {
		this.reconciliationContact = reconciliationContact;
	}
	public String getReconciliationMobileNo() {
		return reconciliationMobileNo;
	}
	public void setReconciliationMobileNo(String reconciliationMobileNo) {
		this.reconciliationMobileNo = reconciliationMobileNo;
	}
	public String getReconciliationEmail() {
		return reconciliationEmail;
	}
	public void setReconciliationEmail(String reconciliationEmail) {
		this.reconciliationEmail = reconciliationEmail;
	}
	public String getSiteUrl() {
		return siteUrl;
	}
	public void setSiteUrl(String siteUrl) {
		this.siteUrl = siteUrl;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Long getCreator() {
		return creator;
	}
	public void setCreator(Long creator) {
		this.creator = creator;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Long getModifier() {
		return modifier;
	}
	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getCreatorName() {
		return creatorName;
	}
	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}
	public String getModifierName() {
		return modifierName;
	}
	public void setModifierName(String modifierName) {
		this.modifierName = modifierName;
	}
	public Long getCompanyKey() {
		return companyKey;
	}
	public void setCompanyKey(Long companyKey) {
		this.companyKey = companyKey;
	}
	
	
	
	
	
}

package com.zhilianbao.erp.auth.vo.employee;

import java.util.Date;
import java.util.List;

import com.zhilianbao.erp.common.vo.BaseVo;

public class EmployeeVo extends BaseVo{
	
	private static final long serialVersionUID = -6654080176640980805L;
	
	private String uniqueKey;
    
    private String operatorName;
    
    private Long occupationId;

    private Long kindredId;
    
    private Long distributionPoint;
    
    private String distributionPointName;

    private String registryCity;

    private String cnName;

    private String enName;

    private String idNo;

    private String driverNo;

    private String censusAddress;

    private String currentAddress;

    private String mobileNo;
    
    private String kindredName;
    
    private String emergentMobileNo;

    private String description;

    private Integer enabled;

    private Long creator;
    
    private String creatorName;
	
	private Date createTime;
	
	private Long modifier;
	
	private String modifierName;
	
	private Date updateTime;
	
	private List<String> ids;
	
	private Integer gender;
	
	private Integer adminId;
	
	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public List<String> getIds() {
		return ids;
	}

	public void setIds(List<String> ids) {
		this.ids = ids;
	}

	public String getUniqueKey() {
		return uniqueKey;
	}

	public void setUniqueKey(String uniqueKey) {
		this.uniqueKey = uniqueKey;
	}
	
	public Long getOccupationId() {
		return occupationId;
	}

	public void setOccupationId(Long occupationId) {
		this.occupationId = occupationId;
	}

	public Long getKindredId() {
		return kindredId;
	}

	public void setKindredId(Long kindredId) {
		this.kindredId = kindredId;
	}

	public Long getDistributionPoint() {
		return distributionPoint;
	}

	public void setDistributionPoint(Long distributionPoint) {
		this.distributionPoint = distributionPoint;
	}

	public String getRegistryCity() {
		return registryCity;
	}

	public void setRegistryCity(String registryCity) {
		this.registryCity = registryCity;
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

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getDriverNo() {
		return driverNo;
	}

	public void setDriverNo(String driverNo) {
		this.driverNo = driverNo;
	}

	public String getCensusAddress() {
		return censusAddress;
	}

	public void setCensusAddress(String censusAddress) {
		this.censusAddress = censusAddress;
	}

	public String getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getKindredName() {
		return kindredName;
	}

	public void setKindredName(String kindredName) {
		this.kindredName = kindredName;
	}

	public String getEmergentMobileNo() {
		return emergentMobileNo;
	}

	public void setEmergentMobileNo(String emergentMobileNo) {
		this.emergentMobileNo = emergentMobileNo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
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

	public String getDistributionPointName() {
		return distributionPointName;
	}

	public void setDistributionPointName(String distributionPointName) {
		this.distributionPointName = distributionPointName;
	}

	public String getOperatorName() {
		return operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
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
}

package com.zhilianbao.erp.auth.vo.cars;

import java.math.BigDecimal;
import java.util.Date;

import com.zhilianbao.erp.common.vo.ViewSearchVo;

public class CarsSearchVo extends ViewSearchVo{
	private static final long serialVersionUID = -6654080176640980805L;
	
	private String carId;
	
	private String carNumber;
	
	private Integer enabled;
	
	private String province;
	
	private String city;
	
	private BigDecimal weight;
	
	private BigDecimal length;
	
	private BigDecimal width;
	
	private BigDecimal high;
	
	private BigDecimal volume;
	
	private String carType;
	
	private String region;
	
	private String selfSupport;
	
	private int isTransportLiquid;
	
	private int isTransportFreezing;
	
	private int isTransportStorage;
	
	private Long driver;
	
	private String custom1;
	
	private String custom2;
	
	private String describes;
	
	private Long creator;
	
	private Date createTime;
	
	private Long modifier;
	
	private Date updateTime;

	public String getCarId() {
		return carId;
	}

	public void setCarId(String carId) {
		this.carId = carId;
	}

	
	public String getCarNumber() {
		return carNumber;
	}

	public void setCarNumber(String carNumber) {
		this.carNumber = carNumber;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public BigDecimal getLength() {
		return length;
	}

	public void setLength(BigDecimal length) {
		this.length = length;
	}

	public BigDecimal getWidth() {
		return width;
	}

	public void setWidth(BigDecimal width) {
		this.width = width;
	}

	public BigDecimal getHigh() {
		return high;
	}

	public void setHigh(BigDecimal high) {
		this.high = high;
	}

	public BigDecimal getVolume() {
		return volume;
	}

	public void setVolume(BigDecimal volume) {
		this.volume = volume;
	}

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getSelfSupport() {
		return selfSupport;
	}

	public void setSelfSupport(String selfSupport) {
		this.selfSupport = selfSupport;
	}

	public int getIsTransportLiquid() {
		return isTransportLiquid;
	}

	public void setIsTransportLiquid(int isTransportLiquid) {
		this.isTransportLiquid = isTransportLiquid;
	}

	public int getIsTransportFreezing() {
		return isTransportFreezing;
	}

	public void setIsTransportFreezing(int isTransportFreezing) {
		this.isTransportFreezing = isTransportFreezing;
	}

	public int getIsTransportStorage() {
		return isTransportStorage;
	}

	public void setIsTransportStorage(int isTransportStorage) {
		this.isTransportStorage = isTransportStorage;
	}

	public Long getDriver() {
		return driver;
	}

	public void setDriver(Long driver) {
		this.driver = driver;
	}

	public String getCustom1() {
		return custom1;
	}

	public void setCustom1(String custom1) {
		this.custom1 = custom1;
	}

	public String getCustom2() {
		return custom2;
	}

	public void setCustom2(String custom2) {
		this.custom2 = custom2;
	}

	public String getDescribes() {
		return describes;
	}

	public void setDescribes(String describes) {
		this.describes = describes;
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
}
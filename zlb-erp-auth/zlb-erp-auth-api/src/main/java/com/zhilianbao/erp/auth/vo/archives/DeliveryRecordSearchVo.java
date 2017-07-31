package com.zhilianbao.erp.auth.vo.archives;

import java.math.BigDecimal;
import java.util.Date;

import com.zhilianbao.erp.common.vo.ViewSearchVo;

public class DeliveryRecordSearchVo  extends ViewSearchVo{

	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 编号 运营商 + 编号）唯一， 编码规则：001~999 自增
	 */
	private String code;

	/**
	 * 名称
	 */
	private String name;

	/**
	 * 是否启用
	 */
	private Integer enabled;

	/**
	 * 类型 10：总仓：定义为区域性的仓库，比如，深圳可能有1~2个总仓 20：微仓 + 配送点：定义为既有微仓的功能也有配送的功能
	 * 30：配送点：定义为只有配送的功能的站点；
	 */
	private String deliveryType;

	/**
	 * 上级
	 */
	private Long superior;

	/**
	 * 省份
	 */
	private Long province;

	/**
	 * 城市
	 */
	private Long city;

	/**
	 * 区、县
	 */
	private Long area;

	/**
	 * 街道
	 */
	private Long street;

	/**
	 * 详细地址
	 */
	private String detailedAddress;

	/**
	 * 配送点负责人
	 */
	private Long deliveryHead;

	/**
	 * 配送点负责人电话
	 */
	private String deliveryHeadPhone;

	/**
	 * 纬度
	 */
	private BigDecimal latitude;

	/**
	 * 经度
	 */
	private BigDecimal longitude;

	/**
	 * 自定义1
	 */
	private String custom1;

	/**
	 * 自定义2
	 */
	private String custom2;

	/**
	 * 自定义3
	 */
	private String custom3;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 描述
	 */
	private String describes;

	/**
	 * 创建人
	 */
	private Long creator;

	/**
	 * 最后修改人
	 */
	private Long modifier;


	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public String getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}

	public Long getSuperior() {
		return superior;
	}

	public void setSuperior(Long superior) {
		this.superior = superior;
	}

	public Long getProvince() {
		return province;
	}

	public void setProvince(Long province) {
		this.province = province;
	}

	public Long getCity() {
		return city;
	}

	public void setCity(Long city) {
		this.city = city;
	}

	public Long getArea() {
		return area;
	}

	public void setArea(Long area) {
		this.area = area;
	}

	public Long getStreet() {
		return street;
	}

	public void setStreet(Long street) {
		this.street = street;
	}

	public String getDetailedAddress() {
		return detailedAddress;
	}

	public void setDetailedAddress(String detailedAddress) {
		this.detailedAddress = detailedAddress;
	}

	public Long getDeliveryHead() {
		return deliveryHead;
	}

	public void setDeliveryHead(Long deliveryHead) {
		this.deliveryHead = deliveryHead;
	}

	public String getDeliveryHeadPhone() {
		return deliveryHeadPhone;
	}

	public void setDeliveryHeadPhone(String deliveryHeadPhone) {
		this.deliveryHeadPhone = deliveryHeadPhone;
	}

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public BigDecimal getLongitude() {
		return longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
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

	public String getCustom3() {
		return custom3;
	}

	public void setCustom3(String custom3) {
		this.custom3 = custom3;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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

	public Long getModifier() {
		return modifier;
	}

	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}
}

package com.zhilianbao.erp.auth.vo.archives;

import java.util.Date;

import com.zhilianbao.erp.common.vo.ViewSearchVo;

public class DeliveryScopeSearchVo extends ViewSearchVo {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * 站点id
     */
    private Long deliveryRecordId;
    /**
     * 类型   1启用  2 排除
     */
    private Integer isDelivery;
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
     * 级别
            10：市
            20：区
            30：街道
            40：村
            50：路
            60：小区
            70：写字楼
     */
    private String level;

    /**
     * 名称
     */
    private String name;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 创建人
     */
    private Long creator;

    /**
     * 最后修改人
     */
    private Long modifier;

    /**
     * 最后修改时间
     */
    private Date updateTime;

	public Long getDeliveryRecordId() {
		return deliveryRecordId;
	}

	public void setDeliveryRecordId(Long deliveryRecordId) {
		this.deliveryRecordId = deliveryRecordId;
	}

	public Integer getIsDelivery() {
		return isDelivery;
	}

	public void setIsDelivery(Integer isDelivery) {
		this.isDelivery = isDelivery;
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

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}

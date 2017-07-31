package com.zhilianbao.erp.auth.vo.systemparameter;

import java.io.Serializable;
import java.math.BigDecimal;


public class BaseAreaVo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

	private String areaName;

	private Long parentId;

	private String shortName;

	private BigDecimal lng;

	private BigDecimal lat;

	private Integer level;

	private String position;

	private Integer sort;

	/**
	 * @return id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return area_name
	 */
	public String getAreaName() {
		return areaName;
	}

	/**
	 * @param areaName
	 */
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	/**
	 * @return parent_id
	 */
	public Long getParentId() {
		return parentId;
	}

	/**
	 * @param parentId
	 */
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	/**
	 * @return short_name
	 */
	public String getShortName() {
		return shortName;
	}

	/**
	 * @param shortName
	 */
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	/**
	 * @return lng
	 */
	public BigDecimal getLng() {
		return lng;
	}

	/**
	 * @param lng
	 */
	public void setLng(BigDecimal lng) {
		this.lng = lng;
	}

	/**
	 * @return lat
	 */
	public BigDecimal getLat() {
		return lat;
	}

	/**
	 * @param lat
	 */
	public void setLat(BigDecimal lat) {
		this.lat = lat;
	}

	/**
	 * @return level
	 */
	public Integer getLevel() {
		return level;
	}

	/**
	 * @param level
	 */
	public void setLevel(Integer level) {
		this.level = level;
	}

	/**
	 * @return position
	 */
	public String getPosition() {
		return position;
	}

	/**
	 * @param position
	 */
	public void setPosition(String position) {
		this.position = position;
	}

	/**
	 * @return sort
	 */
	public Integer getSort() {
		return sort;
	}

	/**
	 * @param sort
	 */
	public void setSort(Integer sort) {
		this.sort = sort;
	}
}

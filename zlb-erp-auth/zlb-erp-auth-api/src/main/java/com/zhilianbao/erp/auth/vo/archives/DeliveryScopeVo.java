package com.zhilianbao.erp.auth.vo.archives;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.zhilianbao.erp.common.vo.BaseVo;

/** 
* @author Tobin  
* @version 创建时间：2017年3月3日 下午3:00:55 
* 类说明 
*/
public class DeliveryScopeVo extends BaseVo implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 类型 10：总仓：定义为区域性的仓库，比如，深圳可能有1~2个总仓 20：微仓 + 配送点：定义为既有微仓的功能也有配送的功能
	 * 30：配送点：定义为只有配送的功能的站点；
	 */
	private String deliveryType;

	/**
     * 站点id
     */
    private Long deliveryRecordId;
    
	/**
     * 站点编码
     */
    private String deliveryCode;
	//站点名称
    private String deliveryName;
    
	/**
     * 站点范围对应站点的类型
     */
    private String deliveryRecordType;
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
	 * 省份
	 */
	private String provinceName;

	
	/**
	 * 城市
	 */
	private String cityName;

	/**
	 * 区、县
	 */
	private String areaName;

	/**
	 * 街道
	 */
	private String streetName;
    
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
     * 详细地址
     */
    private String detailedAddress;
    
    /**
     *覆盖范围点负责人
     */
    private Integer scopeHead;
    
    /**
     *覆盖范围点负责人姓名
     */
    private String scopeHeadName;
    
	/**
     * 覆盖范围点负责人电话
     */
    private String scopeHeadPhone;
    
	/**
     * 创建时间
     */
    private Date createTime;

    /**
     * 创建人
     */
    private Long creator;
    
    private String creatorName;

    /**
     * 最后修改人
     */
    private Long modifier;
    
    private Boolean deleted;
    
    /**
     * 覆盖物类型，0:不是覆盖物,1:点,2:多边形(矩形),3:圆形,4:线
     * */
    private Integer overlayType;

	/**
	 * 纬度
	 */
	private BigDecimal latitude;

	/**
	 * 经度
	 */
	private BigDecimal longitude;
	
	 /**
	 * 圆半径
	 */
	private BigDecimal circleRadius;

	/**
	 * 西南纬度
	 */
	private BigDecimal southWestPointLat;
	
	/**
	 * 西南经度
	 */
	private BigDecimal southWestPointLng;
	
	/**
	 * 东北纬度
	 */
	private BigDecimal northEastPointLat;
	
	/**
	 * 东北经度
	 */
	private BigDecimal northEastPointLng;
	
	/**
	 * 覆盖物点集合
	 */
	List<DeliveryScopePointVo> overLayPoints;
	
	/**
	 * 站点覆盖范围主键ID数组
	 */
	private Long[] scopeIds;

	public Long[] getScopeIds() {
		return scopeIds;
	}

	public void setScopeIds(Long[] scopeIds) {
		this.scopeIds = scopeIds;
	}

	public String getScopeHeadName() {
		return scopeHeadName;
	}

	public void setScopeHeadName(String scopeHeadName) {
		this.scopeHeadName = scopeHeadName;
	}
	
	public List<DeliveryScopePointVo> getOverLayPoints() {
		return overLayPoints;
	}

	public void setOverLayPoints(List<DeliveryScopePointVo> overLayPoints) {
		this.overLayPoints = overLayPoints;
	}

	public Integer getScopeHead() {
		return scopeHead;
	}

	public void setScopeHead(Integer scopeHead) {
		this.scopeHead = scopeHead;
	}

	public String getScopeHeadPhone() {
		return scopeHeadPhone;
	}

	public void setScopeHeadPhone(String scopeHeadPhone) {
		this.scopeHeadPhone = scopeHeadPhone;
	}
	public String getDetailedAddress() {
		return detailedAddress;
	}

	public void setDetailedAddress(String detailedAddress) {
		this.detailedAddress = detailedAddress;
	}
    public Integer getOverlayType() {
		return overlayType;
	}

	public void setOverlayType(Integer overlayType) {
		this.overlayType = overlayType;
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

	public BigDecimal getCircleRadius() {
		return circleRadius;
	}

	public void setCircleRadius(BigDecimal circleRadius) {
		this.circleRadius = circleRadius;
	}

	public BigDecimal getSouthWestPointLat() {
		return southWestPointLat;
	}

	public void setSouthWestPointLat(BigDecimal southWestPointLat) {
		this.southWestPointLat = southWestPointLat;
	}

	public BigDecimal getSouthWestPointLng() {
		return southWestPointLng;
	}

	public void setSouthWestPointLng(BigDecimal southWestPointLng) {
		this.southWestPointLng = southWestPointLng;
	}

	public BigDecimal getNorthEastPointLat() {
		return northEastPointLat;
	}

	public void setNorthEastPointLat(BigDecimal northEastPointLat) {
		this.northEastPointLat = northEastPointLat;
	}

	public BigDecimal getNorthEastPointLng() {
		return northEastPointLng;
	}

	public void setNorthEastPointLng(BigDecimal northEastPointLng) {
		this.northEastPointLng = northEastPointLng;
	}
    public String getDeliveryCode() {
		return deliveryCode;
	}

	public void setDeliveryCode(String deliveryCode) {
		this.deliveryCode = deliveryCode;
	}
    public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	/**
     * 最后修改时间
     */
    private Date updateTime;

    public String getDeliveryName() {
  		return deliveryName;
  	}

  	public void setDeliveryName(String deliveryName) {
  		this.deliveryName = deliveryName;
  	}
  	
    public String getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}
	
    /**
     * 获取站点id
     * @return delivery_record_id - 站点id
     */
    public Long getDeliveryRecordId() {
        return deliveryRecordId;
    }

    /**
     * 设置站点id
     *
     * @param deliveryRecordId 站点id
     */
    public void setDeliveryRecordId(Long deliveryRecordId) {
        this.deliveryRecordId = deliveryRecordId;
    }

    /**
     * 获取省份
     *
     * @return province - 省份
     */
    public Long getProvince() {
        return province;
    }

    /**
     * 设置省份
     *
     * @param province 省份
     */
    public void setProvince(Long province) {
        this.province = province;
    }

    /**
     * 获取城市
     *
     * @return city - 城市
     */
    public Long getCity() {
        return city;
    }

    /**
     * 设置城市
     *
     * @param city 城市
     */
    public void setCity(Long city) {
        this.city = city;
    }

    /**
     * 获取区、县
     *
     * @return area - 区、县
     */
    public Long getArea() {
        return area;
    }

    /**
     * 设置区、县
     *
     * @param area 区、县
     */
    public void setArea(Long area) {
        this.area = area;
    }

    /**
     * 获取街道
     *
     * @return street - 街道
     */
    public Long getStreet() {
        return street;
    }

    /**
     * 设置街道
     *
     * @param street 街道
     */
    public void setStreet(Long street) {
        this.street = street;
    }

    /**
     * 获取级别
            10：市
            20：区
            30：街道
            40：村
            50：路
            60：小区
            70：写字楼
     *
     * @return level - 级别
            10：市
            20：区
            30：街道
            40：村
            50：路
            60：小区
            70：写字楼
     */
    public String getLevel() {
        return level;
    }

    /**
     * 设置级别
            10：市
            20：区
            30：街道
            40：村
            50：路
            60：小区
            70：写字楼
     *
     * @param level 级别
            10：市
            20：区
            30：街道
            40：村
            50：路
            60：小区
            70：写字楼
     */
    public void setLevel(String level) {
        this.level = level;
    }

    /**
     * 获取名称
     *
     * @return name - 名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置名称
     *
     * @param name 名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取创建人
     *
     * @return creator - 创建人
     */
    public Long getCreator() {
        return creator;
    }

    /**
     * 设置创建人
     *
     * @param creator 创建人
     */
    public void setCreator(Long creator) {
        this.creator = creator;
    }

    /**
     * 获取最后修改人
     *
     * @return modifier - 最后修改人
     */
    public Long getModifier() {
        return modifier;
    }

    /**
     * 设置最后修改人
     *
     * @param modifier 最后修改人
     */
    public void setModifier(Long modifier) {
        this.modifier = modifier;
    }

    /**
     * 获取最后修改时间
     *
     * @return update_time - 最后修改时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * 设置最后修改时间
     *
     * @param updateTime 最后修改时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

	public Integer getIsDelivery() {
		return isDelivery;
	}

	public void setIsDelivery(Integer isDelivery) {
		this.isDelivery = isDelivery;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getDeliveryRecordType() {
		return deliveryRecordType;
	}

	public void setDeliveryRecordType(String deliveryRecordType) {
		this.deliveryRecordType = deliveryRecordType;
	}
	
}
 
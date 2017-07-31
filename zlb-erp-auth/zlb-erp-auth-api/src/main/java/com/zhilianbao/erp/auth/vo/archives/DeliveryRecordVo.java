package com.zhilianbao.erp.auth.vo.archives;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.zhilianbao.erp.common.vo.BaseVo;

/**
 * @author Tobin
 * @version 创建时间：2017年3月2日 下午2:07:40 类说明
 */
public class DeliveryRecordVo extends BaseVo implements Serializable {

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

	
	private String operatorName;

	/**
	 * 是否启用
	 */
	private Integer enabled;
	
	/**是否支持自提,0:否，1：是*/
	private Integer selfPickup;

	/**
	 * 类型 10：总仓：定义为区域性的仓库，比如，深圳可能有1~2个总仓 20：微仓 + 配送点：定义为既有微仓的功能也有配送的功能
	 * 30：配送点：定义为只有配送的功能的站点；
	 */
	private String deliveryType;

	/**
	 * 上级
	 */
	private Long superior;
	
	private String superiorName;
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
	 * 详细地址
	 */
	private String detailedAddress;

	/**
	 * 配送点负责人
	 */
	private Long deliveryHead;
	
	private String deliveryHeadName;

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
	
	private String creatorName;

	/**
	 * 最后修改人
	 */
	private Long modifier;
	
	private String modifierName;
	
	private List<String> ids;
	
	/**
	 * 站点拥有的覆盖/排除范围集合
	 */
	List<DeliveryScopeVo> deliveryScopeList;
	
	/**
	 * 此站点距离某收货地址的距离
	 */
	double distance = 0;
	

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}

	public List<DeliveryScopeVo> getDeliveryScopeList() {
		return deliveryScopeList;
	}

	public void setDeliveryScopeList(List<DeliveryScopeVo> deliveryScopeList) {
		this.deliveryScopeList = deliveryScopeList;
	}

	public Integer getSelfPickup() {
		return selfPickup;
	}

	public void setSelfPickup(Integer selfPickup) {
		this.selfPickup = selfPickup;
	}
	
	public List<String> getIds() {
		return ids;
	}

	public void setIds(List<String> ids) {
		this.ids = ids;
	}

	/**
	 * 最后修改时间
	 */
	private Date updateTime;
	
	//此站点是否被选中为当前激活站点
	private boolean isSelect = false;

	
	public boolean getIsSelect() {
		return isSelect;
	}

	public void setIsSelect(boolean isSelect) {
		this.isSelect = isSelect;
	}

	ArrayList<DeliveryScopeVo> deliveryScopes;
	

	public ArrayList<DeliveryScopeVo> getDeliveryScopes() {
		return deliveryScopes;
	}

	public void setDeliveryScopes(ArrayList<DeliveryScopeVo> deliveryScopes) {
		this.deliveryScopes = deliveryScopes;
	}


	/**
	 * 获取编号 运营商 + 编号）唯一， 编码规则：001~999 自增
	 *
	 * @return code - 编号 运营商 + 编号）唯一， 编码规则：001~999 自增
	 */
	public String getCode() {
		return code;
	}

	/**
	 * 设置编号 运营商 + 编号）唯一， 编码规则：001~999 自增
	 *
	 * @param code
	 *            编号 运营商 + 编号）唯一， 编码规则：001~999 自增
	 */
	public void setCode(String code) {
		this.code = code;
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
	 * @param name
	 *            名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 获取是否启用
	 *
	 * @return enabled - 是否启用
	 */
	public Integer getEnabled() {
		return enabled;
	}

	/**
	 * 设置是否启用
	 *
	 * @param enabled
	 *            是否启用
	 */
	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	/**
	 * 获取类型 10：总仓：定义为区域性的仓库，比如，深圳可能有1~2个总仓 20：微仓 + 配送点：定义为既有微仓的功能也有配送的功能
	 * 30：配送点：定义为只有配送的功能的站点；
	 *
	 * @return delivery_type - 类型 10：总仓：定义为区域性的仓库，比如，深圳可能有1~2个总仓 20：微仓 +
	 *         配送点：定义为既有微仓的功能也有配送的功能 30：配送点：定义为只有配送的功能的站点；
	 */
	public String getDeliveryType() {
		return deliveryType;
	}

	/**
	 * 设置类型 10：总仓：定义为区域性的仓库，比如，深圳可能有1~2个总仓 20：微仓 + 配送点：定义为既有微仓的功能也有配送的功能
	 * 30：配送点：定义为只有配送的功能的站点；
	 *
	 * @param deliveryType
	 *            类型 10：总仓：定义为区域性的仓库，比如，深圳可能有1~2个总仓 20：微仓 +
	 *            配送点：定义为既有微仓的功能也有配送的功能 30：配送点：定义为只有配送的功能的站点；
	 */
	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}

	/**
	 * 获取上级
	 *
	 * @return superior - 上级
	 */
	public Long getSuperior() {
		return superior;
	}

	/**
	 * 设置上级
	 *
	 * @param superior
	 *            上级
	 */
	public void setSuperior(Long superior) {
		this.superior = superior;
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
	 * @param province
	 *            省份
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
	 * @param city
	 *            城市
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
	 * @param area
	 *            区、县
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
	 * @param street
	 *            街道
	 */
	public void setStreet(Long street) {
		this.street = street;
	}

	/**
	 * 获取详细地址
	 *
	 * @return detailed_address - 详细地址
	 */
	public String getDetailedAddress() {
		return detailedAddress;
	}

	/**
	 * 设置详细地址
	 *
	 * @param detailedAddress
	 *            详细地址
	 */
	public void setDetailedAddress(String detailedAddress) {
		this.detailedAddress = detailedAddress;
	}

	/**
	 * 获取配送点负责人
	 *
	 * @return delivery_head - 配送点负责人
	 */
	public Long getDeliveryHead() {
		return deliveryHead;
	}

	/**
	 * 设置配送点负责人
	 *
	 * @param deliveryHead
	 *            配送点负责人
	 */
	public void setDeliveryHead(Long deliveryHead) {
		this.deliveryHead = deliveryHead;
	}

	/**
	 * 获取配送点负责人电话
	 *
	 * @return delivery_head_phone - 配送点负责人电话
	 */
	public String getDeliveryHeadPhone() {
		return deliveryHeadPhone;
	}

	/**
	 * 设置配送点负责人电话
	 *
	 * @param deliveryHeadPhone
	 *            配送点负责人电话
	 */
	public void setDeliveryHeadPhone(String deliveryHeadPhone) {
		this.deliveryHeadPhone = deliveryHeadPhone;
	}

	/**
	 * 获取纬度
	 *
	 * @return latitude - 纬度
	 */
	public BigDecimal getLatitude() {
		return latitude;
	}

	/**
	 * 设置纬度
	 *
	 * @param latitude
	 *            纬度
	 */
	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	/**
	 * 获取经度
	 *
	 * @return longitude - 经度
	 */
	public BigDecimal getLongitude() {
		return longitude;
	}

	/**
	 * 设置经度
	 *
	 * @param longitude
	 *            经度
	 */
	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	/**
	 * 获取自定义1
	 *
	 * @return custom1 - 自定义1
	 */
	public String getCustom1() {
		return custom1;
	}

	/**
	 * 设置自定义1
	 *
	 * @param custom1
	 *            自定义1
	 */
	public void setCustom1(String custom1) {
		this.custom1 = custom1;
	}

	/**
	 * 获取自定义2
	 *
	 * @return custom2 - 自定义2
	 */
	public String getCustom2() {
		return custom2;
	}

	/**
	 * 设置自定义2
	 *
	 * @param custom2
	 *            自定义2
	 */
	public void setCustom2(String custom2) {
		this.custom2 = custom2;
	}

	/**
	 * 获取自定义3
	 *
	 * @return custom3 - 自定义3
	 */
	public String getCustom3() {
		return custom3;
	}

	/**
	 * 设置自定义3
	 *
	 * @param custom3
	 *            自定义3
	 */
	public void setCustom3(String custom3) {
		this.custom3 = custom3;
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
	 * @param createTime
	 *            创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 获取描述
	 *
	 * @return describes - 描述
	 */
	public String getDescribes() {
		return describes;
	}

	/**
	 * 设置描述
	 *
	 * @param describes
	 *            描述
	 */
	public void setDescribes(String describes) {
		this.describes = describes;
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
	 * @param creator
	 *            创建人
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
	 * @param modifier
	 *            最后修改人
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
	 * @param updateTime
	 *            最后修改时间
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
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

	public String getSuperiorName() {
		return superiorName;
	}

	public void setSuperiorName(String superiorName) {
		this.superiorName = superiorName;
	}

	public String getDeliveryHeadName() {
		return deliveryHeadName;
	}

	public void setDeliveryHeadName(String deliveryHeadName) {
		this.deliveryHeadName = deliveryHeadName;
	}
}

package com.zhilianbao.erp.auth.vo.goods;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsPropertyVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private String propertyName;
	private Integer type;
	private Integer isNotNull;
	private Integer isMust;
	
	private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    private Boolean deleted;
    
    //t_goods_property_item表
  	private List<GoodsPropertyItemVo> itemList;
  	
  	//t_goods_property_list
  	private Long goodsSkuId;//外键 t_goods_sku_list
  	private String propertyItemValue;
  	
  	//t_goods_sku表的skuName拼接字符串
  	private String skuNames;
    
    //界面上删除的子项
    private Long[] deleteIds;
    
    
    
    
    /** 
	 * 获取
	 * @return goodsSkuId 
	 */
	public Long getGoodsSkuId() {
		return goodsSkuId;
	}



	/** 
	 * 设置
	 * @param goodsSkuId 
	 */
	public void setGoodsSkuId(Long goodsSkuId) {
		this.goodsSkuId = goodsSkuId;
	}



	/** 
	 * 获取
	 * @return propertyItemValue 
	 */
	public String getPropertyItemValue() {
		return propertyItemValue;
	}



	/** 
	 * 设置
	 * @param propertyItemValue 
	 */
	public void setPropertyItemValue(String propertyItemValue) {
		this.propertyItemValue = propertyItemValue;
	}



	/** 
	 * 获取
	 * @return itemList 
	 */
	public List<GoodsPropertyItemVo> getItemList() {
		return itemList;
	}



	/** 
	 * 设置
	 * @param itemList 
	 */
	public void setItemList(List<GoodsPropertyItemVo> itemList) {
		this.itemList = itemList;
	}
	
	
	
	
    /** 
	 * 获取
	 * @return skuNames 
	 */
	public String getSkuNames() {
		return skuNames;
	}



	/** 
	 * 设置
	 * @param skuNames 
	 */
	public void setSkuNames(String skuNames) {
		this.skuNames = skuNames;
	}



	/** 
	 * 获取
	 * @return deleteIds 
	 */
	public Long[] getDeleteIds() {
		return deleteIds;
	}



	/** 
	 * 设置
	 * @param deleteIds 
	 */
	public void setDeleteIds(Long[] deleteIds) {
		this.deleteIds = deleteIds;
	}

   	
	/** 
	 * 获取
	 * @return creator 
	 */
	public Long getCreator() {
		return creator;
	}



	/** 
	 * 设置
	 * @param creator 
	 */
	public void setCreator(Long creator) {
		this.creator = creator;
	}



	/** 
	 * 获取
	 * @return createTime 
	 */
	public Date getCreateTime() {
		return createTime;
	}



	/** 
	 * 设置
	 * @param createTime 
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}



	/** 
	 * 获取
	 * @return modifier 
	 */
	public Long getModifier() {
		return modifier;
	}



	/** 
	 * 设置
	 * @param modifier 
	 */
	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}



	/** 
	 * 获取
	 * @return updateTime 
	 */
	public Date getUpdateTime() {
		return updateTime;
	}



	/** 
	 * 设置
	 * @param updateTime 
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}



	/** 
	 * 获取
	 * @return propertyName 
	 */
	public String getPropertyName() {
		return propertyName;
	}



	/** 
	 * 设置
	 * @param propertyName 
	 */
	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}



	/** 
	 * 获取
	 * @return type 
	 */
	public Integer getType() {
		return type;
	}



	/** 
	 * 设置
	 * @param type 
	 */
	public void setType(Integer type) {
		this.type = type;
	}



	/** 
	 * 获取
	 * @return isNotNull 
	 */
	public Integer getIsNotNull() {
		return isNotNull;
	}



	/** 
	 * 设置
	 * @param isNotNull 
	 */
	public void setIsNotNull(Integer isNotNull) {
		this.isNotNull = isNotNull;
	}


	
	
	/** 
	 * 获取
	 * @return deleted 
	 */
	public Boolean getDeleted() {
		return deleted;
	}



	/** 
	 * 设置
	 * @param deleted 
	 */
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}


	/** 
	 * 获取
	 * @return isMust 
	 */
	public Integer getIsMust() {
		return isMust;
	}



	/** 
	 * 设置
	 * @param isMust 
	 */
	public void setIsMust(Integer isMust) {
		this.isMust = isMust;
	}



	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
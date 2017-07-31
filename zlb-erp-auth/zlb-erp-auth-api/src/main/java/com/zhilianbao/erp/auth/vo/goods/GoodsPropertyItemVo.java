package com.zhilianbao.erp.auth.vo.goods;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsPropertyItemVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private String propertyValue;
	private Integer sortIndex;
	private Long propertyId;
	
	private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    private Boolean deleted;
    
	/** 
	 * 获取
	 * @return propertyId 
	 */
	public Long getPropertyId() {
		return propertyId;
	}




	/** 
	 * 设置
	 * @param propertyId 
	 */
	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}




	/** 
	 * 获取
	 * @return propertyValue 
	 */
	public String getPropertyValue() {
		return propertyValue;
	}




	/** 
	 * 设置
	 * @param propertyValue 
	 */
	public void setPropertyValue(String propertyValue) {
		this.propertyValue = propertyValue;
	}




	/** 
	 * 获取
	 * @return sortIndex 
	 */
	public Integer getSortIndex() {
		return sortIndex;
	}




	/** 
	 * 设置
	 * @param sortIndex 
	 */
	public void setSortIndex(Integer sortIndex) {
		this.sortIndex = sortIndex;
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




	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
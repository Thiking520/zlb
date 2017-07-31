package com.zhilianbao.erp.auth.vo.goods;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsTagVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

    private String tagName;

    private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    private Boolean deleted;


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
	 * @return tagName 
	 */
	public String getTagName() {
		return tagName;
	}



	/** 
	 * 设置
	 * @param tagName 
	 */
	public void setTagName(String tagName) {
		this.tagName = tagName;
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



	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
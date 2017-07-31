package com.zhilianbao.erp.auth.vo.goods;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class CodeRuleItemVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

    private Long codeType;
    private String ruleItemName;
    private String ruleItemValue;
    private Integer keyType;
    
    private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    private Boolean deleted;


	/** 
	 * 获取
	 * @return codeType 
	 */
	public Long getCodeType() {
		return codeType;
	}



	/** 
	 * 设置
	 * @param codeType 
	 */
	public void setCodeType(Long codeType) {
		this.codeType = codeType;
	}



	/** 
	 * 获取
	 * @return ruleItemName 
	 */
	public String getRuleItemName() {
		return ruleItemName;
	}



	/** 
	 * 设置
	 * @param ruleItemName 
	 */
	public void setRuleItemName(String ruleItemName) {
		this.ruleItemName = ruleItemName;
	}


	/** 
	 * 获取
	 * @return ruleItemValue 
	 */
	public String getRuleItemValue() {
		return ruleItemValue;
	}



	/** 
	 * 设置
	 * @param ruleItemValue 
	 */
	public void setRuleItemValue(String ruleItemValue) {
		this.ruleItemValue = ruleItemValue;
	}


	/** 
	 * 获取
	 * @return keyType 
	 */
	public Integer getKeyType() {
		return keyType;
	}



	/** 
	 * 设置
	 * @param keyType 
	 */
	public void setKeyType(Integer keyType) {
		this.keyType = keyType;
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
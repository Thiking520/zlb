package com.zhilianbao.erp.auth.vo.parameter;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年3月7日上午11:09:27
 * @description:系统字典实体类
 */
public class SystemDictVo implements Serializable{

	private static final long serialVersionUID = 8956135905593631084L;
	//当前用户主键ID
	private Long userId;
		
	private Long id;
   
	/** 所属公司Id */
	private Long operatorId;
	
	private String operatorName;
	
	private String creatorName;
	
	private String modifierName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
		
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
    /**
     * 字典标题
     */
    private String dictTitle;

    /**
     * 字典类型
     */
    private String dictType;

    /**
     * 字典key
     */
    private String dictKey;

    /**
     * 字典文本
     */
    private String dictDesc;

    /**
     * 字典值
     */
    private String dictValue;

    /**
     * 字典顺序
     */
    private Integer dictOrder;

    /**
     * 是否有效，1生效，0失效
     */
    private Integer status;

    /**
     * 可修改状态，1可修改，0不可修改
     */
    private Integer modifiable;

    /**
     * 创建时间
     */
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /**
     * 创建人
     */
    private Long creator;

    /**
     * 修改时间
     */
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    /**
     * 修改人
     */
    private Long modifier;
    private String modifiableStr;
    private String statusStr;
        
//    //额外的get方法
//	public String getModifiableStr() {
//		//通过运营商ID、字典类型和值获得描述文本
//		//第一个参数为运营商ID,第二个为字典类型， 第三个参数为字典值
//		return DictCacheUtil.getDescOfValueByType(operatorId,Constants.TYPE_COMMON_MODIFIABLE, String.valueOf(modifiable));
//	}
    

	public String getStatusStr() {
		return statusStr;
	}

	public void setStatusStr(String statusStr) {
		this.statusStr = statusStr;
	}

	public String getModifiableStr() {
		return modifiableStr;
	}

	public void setModifiableStr(String modifiableStr) {
		this.modifiableStr = modifiableStr;
	}

	public Long getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}
	
//	public String getStatusStr() {
//		return DictCacheUtil.getDescOfValueByType(operatorId,Constants.TYPE_COMMON_ACTIVE, String.valueOf(status));
//	}
	
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

	public String getDictTitle() {
		return dictTitle;
	}

	public void setDictTitle(String dictTitle) {
		this.dictTitle = dictTitle;
	}

	public String getDictType() {
		return dictType;
	}

	public void setDictType(String dictType) {
		this.dictType = dictType;
	}

	public String getDictKey() {
		return dictKey;
	}

	public void setDictKey(String dictKey) {
		this.dictKey = dictKey;
	}

	public String getDictDesc() {
		return dictDesc;
	}

	public void setDictDesc(String dictDesc) {
		this.dictDesc = dictDesc;
	}

	public String getDictValue() {
		return dictValue;
	}

	public void setDictValue(String dictValue) {
		this.dictValue = dictValue;
	}

	public Integer getDictOrder() {
		return dictOrder;
	}

	public void setDictOrder(Integer dictOrder) {
		this.dictOrder = dictOrder;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getModifiable() {
		return modifiable;
	}

	public void setModifiable(Integer modifiable) {
		this.modifiable = modifiable;
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

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Long getModifier() {
		return modifier;
	}

	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((createTime == null) ? 0 : createTime.hashCode());
		result = prime * result + ((creator == null) ? 0 : creator.hashCode());
		result = prime * result + ((creatorName == null) ? 0 : creatorName.hashCode());
		result = prime * result + ((dictDesc == null) ? 0 : dictDesc.hashCode());
		result = prime * result + ((dictKey == null) ? 0 : dictKey.hashCode());
		result = prime * result + ((dictOrder == null) ? 0 : dictOrder.hashCode());
		result = prime * result + ((dictTitle == null) ? 0 : dictTitle.hashCode());
		result = prime * result + ((dictType == null) ? 0 : dictType.hashCode());
		result = prime * result + ((dictValue == null) ? 0 : dictValue.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((modifiable == null) ? 0 : modifiable.hashCode());
		result = prime * result + ((modifier == null) ? 0 : modifier.hashCode());
		result = prime * result + ((modifierName == null) ? 0 : modifierName.hashCode());
		result = prime * result + ((operatorId == null) ? 0 : operatorId.hashCode());
		result = prime * result + ((operatorName == null) ? 0 : operatorName.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((updateTime == null) ? 0 : updateTime.hashCode());
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SystemDictVo other = (SystemDictVo) obj;
		if (createTime == null) {
			if (other.createTime != null)
				return false;
		} else if (!createTime.equals(other.createTime))
			return false;
		if (creator == null) {
			if (other.creator != null)
				return false;
		} else if (!creator.equals(other.creator))
			return false;
		if (creatorName == null) {
			if (other.creatorName != null)
				return false;
		} else if (!creatorName.equals(other.creatorName))
			return false;
		if (dictDesc == null) {
			if (other.dictDesc != null)
				return false;
		} else if (!dictDesc.equals(other.dictDesc))
			return false;
		if (dictKey == null) {
			if (other.dictKey != null)
				return false;
		} else if (!dictKey.equals(other.dictKey))
			return false;
		if (dictOrder == null) {
			if (other.dictOrder != null)
				return false;
		} else if (!dictOrder.equals(other.dictOrder))
			return false;
		if (dictTitle == null) {
			if (other.dictTitle != null)
				return false;
		} else if (!dictTitle.equals(other.dictTitle))
			return false;
		if (dictType == null) {
			if (other.dictType != null)
				return false;
		} else if (!dictType.equals(other.dictType))
			return false;
		if (dictValue == null) {
			if (other.dictValue != null)
				return false;
		} else if (!dictValue.equals(other.dictValue))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (modifiable == null) {
			if (other.modifiable != null)
				return false;
		} else if (!modifiable.equals(other.modifiable))
			return false;
		if (modifier == null) {
			if (other.modifier != null)
				return false;
		} else if (!modifier.equals(other.modifier))
			return false;
		if (modifierName == null) {
			if (other.modifierName != null)
				return false;
		} else if (!modifierName.equals(other.modifierName))
			return false;
		if (operatorId == null) {
			if (other.operatorId != null)
				return false;
		} else if (!operatorId.equals(other.operatorId))
			return false;
		if (operatorName == null) {
			if (other.operatorName != null)
				return false;
		} else if (!operatorName.equals(other.operatorName))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (updateTime == null) {
			if (other.updateTime != null)
				return false;
		} else if (!updateTime.equals(other.updateTime))
			return false;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		return true;
	}


}
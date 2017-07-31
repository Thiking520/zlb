package com.zhilianbao.erp.auth.vo.parameter;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;

import com.alibaba.fastjson.annotation.JSONField;
/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年3月11日下午3:41:50
 * @description:系统全局参数VO
 */
public class SystemParamVo implements Serializable{


	/**
	 * 
	 */
	private static final long serialVersionUID = 5138733171471584624L;

    private Long id;
    
    private Long userId;
    
	private String operatorName;
	
	private String creatorName;
	
	private String modifierName;

    /**
     * 运营商ID
     */
    private Long operatorId;

    /**
     * 分组名
     */
    private String groupName;

    /**
     * 模块
     */
    private Integer module;

    /**
     * 参数描述
     */
    private String paramDesc;

    /**
     * 参数key
     */
    private String paramKey;

    /**
     * 参数value
     */
    private String paramValue;

    /**
     * 状态，1生效，0失效
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
    @Column(name = "update_time")
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    /**
     * 修改人
     */
    private Long modifier;

    private String modifiableStr;
    private String statusStr;
    private String groupStr;
    private String moduleStr;
   
    public String getModifiableStr() {
		return modifiableStr;
	}

	public void setModifiableStr(String modifiableStr) {
		this.modifiableStr = modifiableStr;
	}

	public String getStatusStr() {
		return statusStr;
	}

	public void setStatusStr(String statusStr) {
		this.statusStr = statusStr;
	}

	public String getGroupStr() {
		return groupStr;
	}

	public void setGroupStr(String groupStr) {
		this.groupStr = groupStr;
	}

	public String getModuleStr() {
		return moduleStr;
	}

	public void setModuleStr(String moduleStr) {
		this.moduleStr = moduleStr;
	}

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

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

	/**
     * 获取运营商ID
     *
     * @return operator_id - 运营商ID
     */
    public Long getOperatorId() {
        return operatorId;
    }

    /**
     * 设置运营商ID
     *
     * @param operatorId 运营商ID
     */
    public void setOperatorId(Long operatorId) {
        this.operatorId = operatorId;
    }

    /**
     * 获取分组名
     *
     * @return group_name - 分组名
     */
    public String getGroupName() {
        return groupName;
    }

    /**
     * 设置分组名
     *
     * @param groupName 分组名
     */
    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    /**
     * 获取模块
     *
     * @return module - 模块
     */
    public Integer getModule() {
        return module;
    }

    /**
     * 设置模块
     *
     * @param module 模块
     */
    public void setModule(Integer module) {
        this.module = module;
    }

    public String getParamDesc() {
		return paramDesc;
	}

	public void setParamDesc(String paramDesc) {
		this.paramDesc = paramDesc;
	}

	/**
     * 获取参数key
     *
     * @return param_key - 参数key
     */
    public String getParamKey() {
        return paramKey;
    }

    /**
     * 设置参数key
     *
     * @param paramKey 参数key
     */
    public void setParamKey(String paramKey) {
        this.paramKey = paramKey;
    }

    /**
     * 获取参数value
     *
     * @return param_value - 参数value
     */
    public String getParamValue() {
        return paramValue;
    }

    /**
     * 设置参数value
     *
     * @param paramValue 参数value
     */
    public void setParamValue(String paramValue) {
        this.paramValue = paramValue;
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
     * 获取修改时间
     *
     * @return update_time - 修改时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * 设置修改时间
     *
     * @param updateTime 修改时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * 获取修改人
     *
     * @return modifier - 修改人
     */
    public Long getModifier() {
        return modifier;
    }

    /**
     * 设置修改人
     *
     * @param modifier 修改人
     */
    public void setModifier(Long modifier) {
        this.modifier = modifier;
    }
    
    @Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		SystemParamVo other = (SystemParamVo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
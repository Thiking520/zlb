package com.zhilianbao.erp.auth.vo.parameter;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class SystemCodeRuleVo implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1931158407520207703L;

	private Long id;

    /**
     * 运营商ID
     */
    private Long operatorId;

    /**
     * 流水号编码
     */
    private String flowCode;

    /**
     * 是否有效，1生效，0失效
     */
    private Integer status;

    /**
     * 流水号类型
     */
    private String flowType;

    /**
     * 前缀
     */
    private String prefix;

    /**
     * 配送点，与t_delivery_record表中主键关联
     */
    private Integer deliveryRecordId;

    /**
     * 日期格式
     */
    private String dateFormat;

    /**
     * 流水号长度
     */
    private Integer flowLength;

    /**
     * 描述
     */
    private String description;

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

    /**
     * 假删除，0默认为未删除状态,1已删除
     */
    private Integer deleted;
	
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
     * 获取流水号编码
     *
     * @return flow_code - 流水号编码
     */
    public String getFlowCode() {
        return flowCode;
    }

    /**
     * 设置流水号编码
     *
     * @param flowCode 流水号编码
     */
    public void setFlowCode(String flowCode) {
        this.flowCode = flowCode;
    }

    /**
     * 获取是否有效，1生效，0失效
     *
     * @return status - 是否有效，1生效，0失效
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置是否有效，1生效，0失效
     *
     * @param status 是否有效，1生效，0失效
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * 获取流水号类型
     *
     * @return flow_type - 流水号类型
     */
    public String getFlowType() {
        return flowType;
    }

    /**
     * 设置流水号类型
     *
     * @param flowType 流水号类型
     */
    public void setFlowType(String flowType) {
        this.flowType = flowType;
    }

    /**
     * 获取前缀
     *
     * @return prefix - 前缀
     */
    public String getPrefix() {
        return prefix;
    }

    /**
     * 设置前缀
     *
     * @param prefix 前缀
     */
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    /**
     * 获取配送点，与t_delivery_record表中主键关联
     *
     * @return delivery_record_id - 配送点，与t_delivery_record表中主键关联
     */
    public Integer getDeliveryRecordId() {
        return deliveryRecordId;
    }

    /**
     * 设置配送点，与t_delivery_record表中主键关联
     *
     * @param deliveryRecordId 配送点，与t_delivery_record表中主键关联
     */
    public void setDeliveryRecordId(Integer deliveryRecordId) {
        this.deliveryRecordId = deliveryRecordId;
    }

    /**
     * 获取日期格式
     *
     * @return date_format - 日期格式
     */
    public String getDateFormat() {
        return dateFormat;
    }

    /**
     * 设置日期格式
     *
     * @param dateFormat 日期格式
     */
    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    /**
     * 获取流水号长度
     *
     * @return flow_length - 流水号长度
     */
    public Integer getFlowLength() {
        return flowLength;
    }

    /**
     * 设置流水号长度
     *
     * @param flowLength 流水号长度
     */
    public void setFlowLength(Integer flowLength) {
        this.flowLength = flowLength;
    }

    /**
     * 获取描述
     *
     * @return description - 描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置描述
     *
     * @param description 描述
     */
    public void setDescription(String description) {
        this.description = description;
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

    /**
     * 获取假删除，0默认为未删除状态,1已删除
     *
     * @return deleted - 假删除，0默认为未删除状态,1已删除
     */
    public Integer getDeleted() {
        return deleted;
    }

    /**
     * 设置假删除，0默认为未删除状态,1已删除
     *
     * @param deleted 假删除，0默认为未删除状态,1已删除
     */
    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }
}
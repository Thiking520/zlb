package com.zhilianbao.erp.auth.vo.parameter.rpc;

import java.io.Serializable;

public class DictVo implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 7549890787589949851L;

    private Long id;

    /**
     * 运营商ID
     */
    private Long operatorId;

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
//
//    /**
//     * 是否有效，1生效，0失效
//     */
//    private Integer status;
//
//    /**
//     * 可修改状态，1可修改，0不可修改
//     */
//    private Integer modifiable;
//
//    /**
//     * 创建时间
//     */
//    private Date createTime;
//
//    /**
//     * 创建人
//     */
//    private Long creator;
//
//    /**
//     * 修改时间
//     */
//    private Date updateTime;
//
//    /**
//     * 修改人
//     */
//    private Long modifier;

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
     * 获取字典标题
     *
     * @return dict_title - 字典标题
     */
    public String getDictTitle() {
        return dictTitle;
    }

    /**
     * 设置字典标题
     *
     * @param dictTitle 字典标题
     */
    public void setDictTitle(String dictTitle) {
        this.dictTitle = dictTitle;
    }

    /**
     * 获取字典类型
     *
     * @return dict_type - 字典类型
     */
    public String getDictType() {
        return dictType;
    }

    /**
     * 设置字典类型
     *
     * @param dictType 字典类型
     */
    public void setDictType(String dictType) {
        this.dictType = dictType;
    }

    /**
     * 获取字典key
     *
     * @return dict_key - 字典key
     */
    public String getDictKey() {
        return dictKey;
    }

    /**
     * 设置字典key
     *
     * @param dictKey 字典key
     */
    public void setDictKey(String dictKey) {
        this.dictKey = dictKey;
    }

    /**
     * 获取字典文本
     *
     * @return dict_desc - 字典文本
     */
    public String getDictDesc() {
        return dictDesc;
    }

    /**
     * 设置字典文本
     *
     * @param dictDesc 字典文本
     */
    public void setDictDesc(String dictDesc) {
        this.dictDesc = dictDesc;
    }

    /**
     * 获取字典值
     *
     * @return dict_value - 字典值
     */
    public String getDictValue() {
        return dictValue;
    }

    /**
     * 设置字典值
     *
     * @param dictValue 字典值
     */
    public void setDictValue(String dictValue) {
        this.dictValue = dictValue;
    }

    /**
     * 获取字典顺序
     *
     * @return dict_order - 字典顺序
     */
    public Integer getDictOrder() {
        return dictOrder;
    }

    /**
     * 设置字典顺序
     *
     * @param dictOrder 字典顺序
     */
    public void setDictOrder(Integer dictOrder) {
        this.dictOrder = dictOrder;
    }
//
//    /**
//     * 获取是否有效，1生效，0失效
//     *
//     * @return status - 是否有效，1生效，0失效
//     */
//    public Integer getStatus() {
//        return status;
//    }
//
//    /**
//     * 设置是否有效，1生效，0失效
//     *
//     * @param status 是否有效，1生效，0失效
//     */
//    public void setStatus(Integer status) {
//        this.status = status;
//    }
//
//    /**
//     * 获取可修改状态，1可修改，0不可修改
//     *
//     * @return modifiable - 可修改状态，1可修改，0不可修改
//     */
//    public Integer getModifiable() {
//        return modifiable;
//    }
//
//    /**
//     * 设置可修改状态，1可修改，0不可修改
//     *
//     * @param modifiable 可修改状态，1可修改，0不可修改
//     */
//    public void setModifiable(Integer modifiable) {
//        this.modifiable = modifiable;
//    }
//
//    /**
//     * 获取创建时间
//     *
//     * @return create_time - 创建时间
//     */
//    public Date getCreateTime() {
//        return createTime;
//    }
//
//    /**
//     * 设置创建时间
//     *
//     * @param createTime 创建时间
//     */
//    public void setCreateTime(Date createTime) {
//        this.createTime = createTime;
//    }
//
//    /**
//     * 获取创建人
//     *
//     * @return creator - 创建人
//     */
//    public Long getCreator() {
//        return creator;
//    }
//
//    /**
//     * 设置创建人
//     *
//     * @param creator 创建人
//     */
//    public void setCreator(Long creator) {
//        this.creator = creator;
//    }
//
//    /**
//     * 获取修改时间
//     *
//     * @return update_time - 修改时间
//     */
//    public Date getUpdateTime() {
//        return updateTime;
//    }
//
//    /**
//     * 设置修改时间
//     *
//     * @param updateTime 修改时间
//     */
//    public void setUpdateTime(Date updateTime) {
//        this.updateTime = updateTime;
//    }
//
//    /**
//     * 获取修改人
//     *
//     * @return modifier - 修改人
//     */
//    public Long getModifier() {
//        return modifier;
//    }
//
//    /**
//     * 设置修改人
//     *
//     * @param modifier 修改人
//     */
//    public void setModifier(Long modifier) {
//        this.modifier = modifier;
//    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DictVo dictVo = (DictVo) o;

        if (!operatorId.equals(dictVo.operatorId)) return false;
        if (!dictType.equals(dictVo.dictType)) return false;
        return dictValue.equals(dictVo.dictValue);
    }

    @Override
    public int hashCode() {
        int result = operatorId.hashCode();
        result = 31 * result + dictType.hashCode();
        result = 31 * result + dictValue.hashCode();
        return result;
    }
}
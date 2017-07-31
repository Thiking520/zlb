package com.zhilianbao.erp.auth.vo.goods;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.alibaba.fastjson.annotation.JSONField;
import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsOriginalVo extends BaseVo{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5470478632520543777L;
	

	/**
	 * 商品名称
	 */
	private String goodsName;
	/**
	 * 商品类型Id
	 */
	private Long goodsType;
	/**
	 * 商品类型名称
	 */
	private String typeName;
	/**
	 * 商品描述
	 */
	private String goodsDesc;
	/**
	 * 商品单位值
	 */
	private String unitValue;
	/**
	 * 商品单位描述
	 */
	private String unitDesc;
	/**
	 * 商品图片路径
	 */
	private String imgUrl;
	/**
	 * 是否有推送数据到pms
	 */
	private Integer isSynchronize;

	
	private Long creator;
	//运营商名称
	private String operatorName;
	
	@JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date createTime;
	
    private Long modifier;
    
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
    
    
	public String getOperatorName() {
		return operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

	/**
	 * 获取商品名称
	 * @return
	 */
	public String getGoodsName() {
		return goodsName;
	}

	/**
	 * 设置商品名称
	 * @param 
	 */
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	/**
	 * 获取商品类型Id
	 * @return
	 */
	public Long getGoodsType() {
		return goodsType;
	}

	/**
	 * 设置商品类型Id
	 * @param goodsType
	 */
	public void setGoodsType(Long goodsType) {
		this.goodsType = goodsType;
	}

	/**
	 * 获取商品描述
	 * 
	 * @return
	 */
	public String getGoodsDesc() {
		return goodsDesc;
	}

	/**
	 * 设置商品描述
	 * @param 
	 */
	public void setGoodsDesc(String goodsDesc) {
		this.goodsDesc = goodsDesc;
	}

	/**
	 * @Title: getUnitValue 
	 * @author: LiLinDong
	 * @param: 
	 * @return: String    返回类型 
	 * @Description:获取商品单位值
	 */
	public String getUnitValue() {
		return unitValue;
	}
	
	/**
	 * @Title: setUnitValue 
	 * @author: LiLinDong
	 * @param: 
	 * @return: void    返回类型 
	 * @Description:设置商品单位值
	 */
	public void setUnitValue(String unitValue) {
		this.unitValue = unitValue;
	}

	/**
	 * @Title: getUnitDesc 
	 * @author: LiLinDong
	 * @param: 
	 * @return: String    返回类型 
	 * @Description:获取商品单位描述
	 */
	public String getUnitDesc() {
		return unitDesc;
	}

	/**
	 * @Title: setUnitDesc 
	 * @author: LiLinDong
	 * @param: 
	 * @return: void    返回类型 
	 * @Description:设置商品单位描述
	 */
	public void setUnitDesc(String unitDesc) {
		this.unitDesc = unitDesc;
	}
	
	/**
	 * 图片路径
	 * @Title: getImgUrl 
	 * @author: LiLinDong
	 * @param: 
	 * @return: String    返回类型 
	 * @Description:
	 */
	public String getImgUrl() {
		return imgUrl;
	}

	/**
	 * 图片路径
	 * @Title: setImgUrl 
	 * @author: LiLinDong
	 * @param: 
	 * @return: void    返回类型 
	 * @Description:
	 */
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	/**
	 * 获取
	 * 
	 * @return
	 */
	public Integer getIsSynchronize() {
		return isSynchronize;
	}

	public void setIsSynchronize(Integer isSynchronize) {
		this.isSynchronize = isSynchronize;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}

	public Long getCreator() {
		return creator;
	}

	public void setCreator(Long creator) {
		this.creator = creator;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Long getModifier() {
		return modifier;
	}

	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
}
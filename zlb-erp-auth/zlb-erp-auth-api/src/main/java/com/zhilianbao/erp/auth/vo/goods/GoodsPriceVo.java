package com.zhilianbao.erp.auth.vo.goods;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsPriceVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private Long goodsId;//外键 t_goods
    private Long goodsSkuId;//外键 t_goods_sku_list
    private BigDecimal suggestPrice;//建议售价
    private BigDecimal mallPrice;//商城售价
    private BigDecimal storePrice;//门店售价
    private BigDecimal companyPrice;//企业售价
    private BigDecimal proxyPrice;//代理售价
    private BigDecimal costPrice;//成本价
    private BigDecimal purchasePrice;//标准进价
    private Integer specification;
    private Integer specificationType;
    
    
    private String skuNames;
    
    private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    private Boolean deleted;

    

	/** 
	 * 获取
	 * @return goodsId 
	 */
	public Long getGoodsId() {
		return goodsId;
	}




	/** 
	 * 设置
	 * @param goodsId 
	 */
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
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
	 * @return suggestPrice 
	 */
	public BigDecimal getSuggestPrice() {
		return suggestPrice;
	}




	/** 
	 * 设置
	 * @param suggestPrice 
	 */
	public void setSuggestPrice(BigDecimal suggestPrice) {
		this.suggestPrice = suggestPrice;
	}




	/** 
	 * 获取
	 * @return mallPrice 
	 */
	public BigDecimal getMallPrice() {
		return mallPrice;
	}




	/** 
	 * 设置
	 * @param mallPrice 
	 */
	public void setMallPrice(BigDecimal mallPrice) {
		this.mallPrice = mallPrice;
	}




	/** 
	 * 获取
	 * @return storePrice 
	 */
	public BigDecimal getStorePrice() {
		return storePrice;
	}




	/** 
	 * 设置
	 * @param storePrice 
	 */
	public void setStorePrice(BigDecimal storePrice) {
		this.storePrice = storePrice;
	}




	/** 
	 * 获取
	 * @return companyPrice 
	 */
	public BigDecimal getCompanyPrice() {
		return companyPrice;
	}




	/** 
	 * 设置
	 * @param companyPrice 
	 */
	public void setCompanyPrice(BigDecimal companyPrice) {
		this.companyPrice = companyPrice;
	}




	/** 
	 * 获取
	 * @return proxyPrice 
	 */
	public BigDecimal getProxyPrice() {
		return proxyPrice;
	}




	/** 
	 * 设置
	 * @param proxyPrice 
	 */
	public void setProxyPrice(BigDecimal proxyPrice) {
		this.proxyPrice = proxyPrice;
	}




	/** 
	 * 获取
	 * @return costPrice 
	 */
	public BigDecimal getCostPrice() {
		return costPrice;
	}




	/** 
	 * 设置
	 * @param costPrice 
	 */
	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}




	/** 
	 * 获取
	 * @return purchasePrice 
	 */
	public BigDecimal getPurchasePrice() {
		return purchasePrice;
	}




	/** 
	 * 设置
	 * @param purchasePrice 
	 */
	public void setPurchasePrice(BigDecimal purchasePrice) {
		this.purchasePrice = purchasePrice;
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

	


	/** 
	 * 获取
	 * @return specification 
	 */
	public Integer getSpecification() {
		return specification;
	}




	/** 
	 * 设置
	 * @param specification 
	 */
	public void setSpecification(Integer specification) {
		this.specification = specification;
	}




	/** 
	 * 获取
	 * @return specificationType 
	 */
	public Integer getSpecificationType() {
		return specificationType;
	}




	/** 
	 * 设置
	 * @param specificationType 
	 */
	public void setSpecificationType(Integer specificationType) {
		this.specificationType = specificationType;
	}




	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
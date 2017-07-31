package com.zhilianbao.erp.auth.vo.goods;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsStockVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private Integer saleUnit;//售卖单位
	private Integer purchaseMode;//采购方式 0 先单后采 1 先采后单
    private Integer canSaleAmount;//可售卖量
    private Integer overAmount;//可超卖量
    private Integer saleAmount;//已售卖量	
    private Float saleRate;//售卖库存率
    private Integer stockUnit;//库存单位
    private Integer stockAmount;//总库存
    private Integer availableAmount;//可用库存
    private Integer usedAmount;//占用库存
    private Integer lossAmount;//损耗库存
    
    private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    private Boolean deleted;

    // t_goods表id
    private Long goodsId;
    private Integer goodsMode;//商品规格 0 单品 1 多规格商品 2 组合商品

    // t_goods_original表
    private Long relateOriginalGood;//关联的原始商品id
	private Integer defaultOriginalGood;//界面“是否生成默认关联的原始商品”字段，数据库不需存储
	
	/** 
	 * 获取
	 * @return saleUnit 
	 */
	public Integer getSaleUnit() {
		return saleUnit;
	}




	/** 
	 * 设置
	 * @param saleUnit 
	 */
	public void setSaleUnit(Integer saleUnit) {
		this.saleUnit = saleUnit;
	}




	/** 
	 * 获取
	 * @return purchaseMode 
	 */
	public Integer getPurchaseMode() {
		return purchaseMode;
	}




	/** 
	 * 设置
	 * @param purchaseMode 
	 */
	public void setPurchaseMode(Integer purchaseMode) {
		this.purchaseMode = purchaseMode;
	}




	/** 
	 * 获取
	 * @return canSaleAmount 
	 */
	public Integer getCanSaleAmount() {
		return canSaleAmount;
	}




	/** 
	 * 设置
	 * @param canSaleAmount 
	 */
	public void setCanSaleAmount(Integer canSaleAmount) {
		this.canSaleAmount = canSaleAmount;
	}




	/** 
	 * 获取
	 * @return overAmount 
	 */
	public Integer getOverAmount() {
		return overAmount;
	}




	/** 
	 * 设置
	 * @param overAmount 
	 */
	public void setOverAmount(Integer overAmount) {
		this.overAmount = overAmount;
	}




	/** 
	 * 获取
	 * @return saleAmount 
	 */
	public Integer getSaleAmount() {
		return saleAmount;
	}




	/** 
	 * 设置
	 * @param saleAmount 
	 */
	public void setSaleAmount(Integer saleAmount) {
		this.saleAmount = saleAmount;
	}




	/** 
	 * 获取
	 * @return saleRate 
	 */
	public Float getSaleRate() {
		return saleRate;
	}




	/** 
	 * 设置
	 * @param saleRate 
	 */
	public void setSaleRate(Float saleRate) {
		this.saleRate = saleRate;
	}




	/** 
	 * 获取
	 * @return stockUnit 
	 */
	public Integer getStockUnit() {
		return stockUnit;
	}




	/** 
	 * 设置
	 * @param stockUnit 
	 */
	public void setStockUnit(Integer stockUnit) {
		this.stockUnit = stockUnit;
	}




	/** 
	 * 获取
	 * @return stockAmount 
	 */
	public Integer getStockAmount() {
		return stockAmount;
	}




	/** 
	 * 设置
	 * @param stockAmount 
	 */
	public void setStockAmount(Integer stockAmount) {
		this.stockAmount = stockAmount;
	}




	/** 
	 * 获取
	 * @return availableAmount 
	 */
	public Integer getAvailableAmount() {
		return availableAmount;
	}




	/** 
	 * 设置
	 * @param availableAmount 
	 */
	public void setAvailableAmount(Integer availableAmount) {
		this.availableAmount = availableAmount;
	}




	/** 
	 * 获取
	 * @return usedAmount 
	 */
	public Integer getUsedAmount() {
		return usedAmount;
	}




	/** 
	 * 设置
	 * @param usedAmount 
	 */
	public void setUsedAmount(Integer usedAmount) {
		this.usedAmount = usedAmount;
	}




	/** 
	 * 获取
	 * @return lossAmount 
	 */
	public Integer getLossAmount() {
		return lossAmount;
	}




	/** 
	 * 设置
	 * @param lossAmount 
	 */
	public void setLossAmount(Integer lossAmount) {
		this.lossAmount = lossAmount;
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
	 * @return goodsMode 
	 */
	public Integer getGoodsMode() {
		return goodsMode;
	}


	/** 
	 * 设置
	 * @param goodsMode 
	 */
	public void setGoodsMode(Integer goodsMode) {
		this.goodsMode = goodsMode;
	}


	/** 
	 * 获取
	 * @return relateOriginalGood 
	 */
	public Long getRelateOriginalGood() {
		return relateOriginalGood;
	}


	/** 
	 * 设置
	 * @param relateOriginalGood 
	 */
	public void setRelateOriginalGood(Long relateOriginalGood) {
		this.relateOriginalGood = relateOriginalGood;
	}


	
	/** 
	 * 获取
	 * @return defaultOriginalGood 
	 */
	public Integer getDefaultOriginalGood() {
		return defaultOriginalGood;
	}


	/** 
	 * 设置
	 * @param defaultOriginalGood 
	 */
	public void setDefaultOriginalGood(Integer defaultOriginalGood) {
		this.defaultOriginalGood = defaultOriginalGood;
	}





	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
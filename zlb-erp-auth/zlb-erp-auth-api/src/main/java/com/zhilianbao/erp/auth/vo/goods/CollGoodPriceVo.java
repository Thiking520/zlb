package com.zhilianbao.erp.auth.vo.goods;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
/*
 * 组合商品价格实体
 */
public class CollGoodPriceVo implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2881909295160514790L;
	private Long goodsId;//商品ID
	private BigDecimal suggestPrice;//市场价
	private BigDecimal mallPrice;//销售价格
	private List<GoodsCollectionVo> goodsCollectionVos;
    private Long creator;
    private Long modifier;
	public BigDecimal getSuggestPrice() {
		return suggestPrice;
	}
	public void setSuggestPrice(BigDecimal suggestPrice) {
		this.suggestPrice = suggestPrice;
	}
	public BigDecimal getMallPrice() {
		return mallPrice;
	}
	public void setMallPrice(BigDecimal mallPrice) {
		this.mallPrice = mallPrice;
	}
	public List<GoodsCollectionVo> getGoodsCollectionVos() {
		return goodsCollectionVos;
	}
	public void setGoodsCollectionVos(List<GoodsCollectionVo> goodsCollectionVos) {
		this.goodsCollectionVos = goodsCollectionVos;
	}
	public Long getGoodsId() {
		return goodsId;
	}
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}
	public Long getCreator() {
		return creator;
	}
	public void setCreator(Long creator) {
		this.creator = creator;
	}
	public Long getModifier() {
		return modifier;
	}
	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}
	
}	

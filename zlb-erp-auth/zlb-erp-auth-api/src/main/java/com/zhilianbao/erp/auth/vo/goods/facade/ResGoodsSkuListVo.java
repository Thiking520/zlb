package com.zhilianbao.erp.auth.vo.goods.facade;

import java.math.BigDecimal;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class ResGoodsSkuListVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private Long goodsId;//外键 t_goods
    private Long recordId;//外键 t_goods_sku_record
	private String skuIds;
	private String skuNames;
	private String skuParentIds;
	private String skuParentNames;
	//市场价
	private BigDecimal suggestPrice;
	//销售价
	private BigDecimal mallPrice;
	
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

	public Long getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}

	public Long getRecordId() {
		return recordId;
	}
	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public String getSkuIds() {
		return skuIds;
	}

	public void setSkuIds(String skuIds) {
		this.skuIds = skuIds;
	}

	public String getSkuNames() {
		return skuNames;
	}

	public void setSkuNames(String skuNames) {
		this.skuNames = skuNames;
	}

	public String getSkuParentIds() {
		return skuParentIds;
	}

	public void setSkuParentIds(String skuParentIds) {
		this.skuParentIds = skuParentIds;
	}

	public String getSkuParentNames() {
		return skuParentNames;
	}

	public void setSkuParentNames(String skuParentNames) {
		this.skuParentNames = skuParentNames;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
	
}


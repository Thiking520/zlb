package com.zhilianbao.erp.auth.vo.goods;

import java.math.BigDecimal;

public class ErpOrderOriginalGoodsVo extends GoodsOriginalVo {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 原始商品数量
	 */
	private BigDecimal originalGoodsNum;
	/**
	 * 原始商品id
	 */
	private String originalGoodsCode;

	public BigDecimal getOriginalGoodsNum() {
		return originalGoodsNum;
	}

	public void setOriginalGoodsNum(BigDecimal originalGoodsNum) {
		this.originalGoodsNum = originalGoodsNum;
	}

	public String getOriginalGoodsCode() {
		return originalGoodsCode;
	}

	public void setOriginalGoodsCode(String originalGoodsCode) {
		this.originalGoodsCode = originalGoodsCode;
	}

	
	
}

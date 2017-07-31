package com.zhilianbao.erp.app.vo.wms;

import com.zhilianbao.erp.app.vo.ReqBaseVo;

import java.io.Serializable;

public class QueryDetailSearchVo extends ReqBaseVo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1483664127229454699L;
	//模糊查询的key
	private String searchKey;
	//入库订单号
	private String inStoreNo;
	//商品编码
	private String goodsNo;
	//商品条码
	private String skuBarCode;
	//收货交易
	private String dealNo;
	//是否继续入账
	private String isContinue;
	public String getIsContinue() {
		return isContinue;
	}
	public void setIsContinue(String isContinue) {
		this.isContinue = isContinue;
	}
	public String getGoodsNo() {
		return goodsNo;
	}
	public void setGoodsNo(String goodsNo) {
		this.goodsNo = goodsNo;
	}
	
	public String getSearchKey() {
		return searchKey;
	}
	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}
	public String getInStoreNo() {
		return inStoreNo;
	}
	public void setInStoreNo(String inStoreNo) {
		this.inStoreNo = inStoreNo;
	}
	public String getDealNo() {
		return dealNo;
	}
	public void setDealNo(String dealNo) {
		this.dealNo = dealNo;
	}
	public String getSkuBarCode() {
		return skuBarCode;
	}
	public void setSkuBarCode(String skuBarCode) {
		this.skuBarCode = skuBarCode;
	}
	
}
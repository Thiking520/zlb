package com.zhilianbao.erp.web.tms.vo;

import java.util.List;

/**
 * 面单打印信息
 * @author wangshengxia
 *
 */

public class OrderMainVo {
	/**
	 * 客户姓名
	 */
	private String addresseeName;
	/**
	 * 客户地址
	 */
	private String addresseeTel;
	/**
	 * 交易号-----目前对于数据库展示订单号
	 */
	private String displayOrderId;
	
	/**
	 * 运单号
	 */
	private String waybillId;
	
	/**
	 * 收件人街道
	 */
	private String consumerStreet;
	/**
	 * 收件人地址
	 */
	private String consumerAddress;
	/**
	 * 买家留言
	 */
	private String buyerMessage;
	
	/**
	 * 签字
	 */
	private String sign;
	
	
	private List<GoodsVo> goodsList;

	public String getAddresseeName() {
		return addresseeName;
	}

	public void setAddresseeName(String addresseeName) {
		this.addresseeName = addresseeName;
	}

	public String getAddresseeTel() {
		return addresseeTel;
	}

	public void setAddresseeTel(String addresseeTel) {
		this.addresseeTel = addresseeTel;
	}

	public String getDisplayOrderId() {
		return displayOrderId;
	}

	public void setDisplayOrderId(String displayOrderId) {
		this.displayOrderId = displayOrderId;
	}

	public String getWaybillId() {
		return waybillId;
	}

	public void setWaybillId(String waybillId) {
		this.waybillId = waybillId;
	}

	public String getConsumerStreet() {
		return consumerStreet;
	}

	public void setConsumerStreet(String consumerStreet) {
		this.consumerStreet = consumerStreet;
	}

	public String getConsumerAddress() {
		return consumerAddress;
	}

	public void setConsumerAddress(String consumerAddress) {
		this.consumerAddress = consumerAddress;
	}

	public String getBuyerMessage() {
		return buyerMessage;
	}

	public void setBuyerMessage(String buyerMessage) {
		this.buyerMessage = buyerMessage;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public List<GoodsVo> getGoodsList() {
		return goodsList;
	}

	public void setGoodsList(List<GoodsVo> goodsList) {
		this.goodsList = goodsList;
	}
}

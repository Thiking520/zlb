package com.zhilianbao.erp.app.vo.waybill;

import java.io.Serializable;
/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年4月7日上午10:34:14
* @description:运单详情Vo
 */
public class DriverInfoDetailVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = 1105945401809241135L;
	private String sendGoodsTime;	//	Y	送货日期与时间
	private String orderId;	//	Y	销售订单号
	private String transactionId;	//	Y	平台交易号
	private String sellerRemarks;	//	Y	买家备注
	private String buyerRemarks;	//	Y	卖家备注
	private String customerName;	//	Y	收件人姓名
	private String customerPhone;	//	Y	收件人电话
	private String takePerson;	//	Y	揽收人
	private String truckTime;	//	Y	装车时间
	private String signPerson;	//	Y	签收人
	private String signResult;	//	Y	签收结果1:已签收 2：异常签收 3：未签收
	private String signExceptionClassID;	//	Y	异常分类ID
	private String signExceptionClassName;	//	Y	异常分类名称
	private String exceptionDealName;			//	Y	异常处理方案名称
	private String exceptionDealId;		//	Y	异常处理方案ID
	private String exceptionReason;	//	Y	异常原因
	private String driverNo;	//	Y	运单号
	public String getSendGoodsTime() {
		return sendGoodsTime;
	}
	public void setSendGoodsTime(String sendGoodsTime) {
		this.sendGoodsTime = sendGoodsTime;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getSellerRemarks() {
		return sellerRemarks;
	}
	public void setSellerRemarks(String sellerRemarks) {
		this.sellerRemarks = sellerRemarks;
	}
	public String getBuyerRemarks() {
		return buyerRemarks;
	}
	public void setBuyerRemarks(String buyerRemarks) {
		this.buyerRemarks = buyerRemarks;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerPhone() {
		return customerPhone;
	}
	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}
	public String getTakePerson() {
		return takePerson;
	}
	public void setTakePerson(String takePerson) {
		this.takePerson = takePerson;
	}
	public String getTruckTime() {
		return truckTime;
	}
	public void setTruckTime(String truckTime) {
		this.truckTime = truckTime;
	}
	public String getSignPerson() {
		return signPerson;
	}
	public void setSignPerson(String signPerson) {
		this.signPerson = signPerson;
	}
	public String getSignResult() {
		return signResult;
	}
	public void setSignResult(String signResult) {
		this.signResult = signResult;
	}
	public String getSignExceptionClassID() {
		return signExceptionClassID;
	}
	public void setSignExceptionClassID(String signExceptionClassID) {
		this.signExceptionClassID = signExceptionClassID;
	}
	public String getSignExceptionClassName() {
		return signExceptionClassName;
	}
	public void setSignExceptionClassName(String signExceptionClassName) {
		this.signExceptionClassName = signExceptionClassName;
	}
	public String getExceptionDealName() {
		return exceptionDealName;
	}
	public void setExceptionDealName(String exceptionDealName) {
		this.exceptionDealName = exceptionDealName;
	}
	public String getExceptionDealId() {
		return exceptionDealId;
	}
	public void setExceptionDealId(String exceptionDealId) {
		this.exceptionDealId = exceptionDealId;
	}
	public String getExceptionReason() {
		return exceptionReason;
	}
	public void setExceptionReason(String exceptionReason) {
		this.exceptionReason = exceptionReason;
	}
	public String getDriverNo() {
		return driverNo;
	}
	public void setDriverNo(String driverNo) {
		this.driverNo = driverNo;
	}
	

}

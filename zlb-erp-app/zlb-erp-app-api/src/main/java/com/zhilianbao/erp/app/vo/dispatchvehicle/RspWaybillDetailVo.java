package com.zhilianbao.erp.app.vo.dispatchvehicle;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月17日下午2:42:38
* @description:运单详情实体
*/
public class RspWaybillDetailVo {
	 /**
     * 送货日期与时间
     */
    private String sendGoosTime;

	/**
     * 销售订单号
     */
    private String orderId;

    /**
     * 平台交易号
     */
    private String transactionId;

    /**
     * 买家备注
     */
    private String sellerRemarks;

    /**
     * 卖家备注
     */
    private String buyerRemarks;

    /**
     * 收件人姓名
     */
    private String customerName;
    
    /**
     * 收件人电话
     */
    private String customerPhone;
    
    /**
     * 揽收人
     */
    private String takePerson;
    
    /**
     * 装车时间
     */
    private String truckTime;
    
    /**
     * 签收人
     */
    private String signPerson;
    
    /**
     * 签收结果
     */
    private String signResult;
    
    /**
     * 异常分类ID
     */
    private String signExceptionClassID;
    
    /**
     * 异常分类名称
     */
    private String signExceptionClassName;
    
    /**
     * 异常处理描述
     */
    private String exceptionDes;
    
    /**
     * 异常原因
     */
    private String exceptionReason;
    
    public String getSendGoosTime() {
		return sendGoosTime;
	}

	public void setSendGoosTime(String sendGoosTime) {
		this.sendGoosTime = sendGoosTime;
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

	public String getExceptionDes() {
		return exceptionDes;
	}

	public void setExceptionDes(String exceptionDes) {
		this.exceptionDes = exceptionDes;
	}

	public String getExceptionReason() {
		return exceptionReason;
	}

	public void setExceptionReason(String exceptionReason) {
		this.exceptionReason = exceptionReason;
	}

}
 
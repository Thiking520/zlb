package com.zhilianbao.erp.app.vo.logistics;

import java.io.Serializable;

import com.zhilianbao.erp.app.vo.ReqBaseVo;

public class ReqQueryLogisticInfoVo extends ReqBaseVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = -3139882327066851039L;
	private String driverNo;//运单号
	private String disDriverNo;
	private String parentDriverNo;//
	private String operatorId;
	
	public String getDriverNo() {
		return driverNo;
	}
	public void setDriverNo(String driverNo) {
		this.driverNo = driverNo;
	}
	public String getParentDriverNo() {
		return parentDriverNo;
	}
	public void setParentDriverNo(String parentDriverNo) {
		this.parentDriverNo = parentDriverNo;
	}
	public String getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}
	public String getDisDriverNo() {
		return disDriverNo;
	}
	public void setDisDriverNo(String disDriverNo) {
		this.disDriverNo = disDriverNo;
	}

}

package com.zhilianbao.erp.app.vo.dispatchvehicle;

import java.io.Serializable;

import com.zhilianbao.erp.app.vo.ReqBaseVo;
import com.zhilianbao.erp.app.vo.waybill.SignExceptionVo;
/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月29日下午4:23:37
* @description:异常确认签收Vo
 */
public class ReqExceptionSignSureVo extends ReqBaseVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = 4211732451720942667L;
	private String driverNo;		//单号
	private SignExceptionVo signException;	//异常签名信息
	private String pieNo;	//派车单号
	public String getDriverNo() {
		return driverNo;
	}
	public void setDriverNo(String driverNo) {
		this.driverNo = driverNo;
	}
	
	public SignExceptionVo getSignException() {
		return signException;
	}
	public void setSignException(SignExceptionVo signException) {
		this.signException = signException;
	}
	public String getPieNo() {
		return pieNo;
	}
	public void setPieNo(String pieNo) {
		this.pieNo = pieNo;
	}

}

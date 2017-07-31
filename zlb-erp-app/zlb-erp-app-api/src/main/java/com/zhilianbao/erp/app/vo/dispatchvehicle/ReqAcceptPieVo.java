package com.zhilianbao.erp.app.vo.dispatchvehicle;

import java.io.Serializable;

import com.zhilianbao.erp.app.vo.ReqBaseVo;
/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月29日下午3:05:29
* @description:请求接受派单VO
 */
public class ReqAcceptPieVo  extends ReqBaseVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = 7701509757767517293L;
	private String pieNo;//运单号
	public String getPieNo() {
		return pieNo;
	}
	public void setPieNo(String pieNo) {
		this.pieNo = pieNo;
	}
	

}

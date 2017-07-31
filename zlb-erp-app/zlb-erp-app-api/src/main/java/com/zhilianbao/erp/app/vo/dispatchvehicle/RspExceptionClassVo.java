package com.zhilianbao.erp.app.vo.dispatchvehicle;

import java.io.Serializable;
import java.util.List;

import com.zhilianbao.erp.app.vo.waybill.ExceptionClassVo;
/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月29日下午4:23:37
* @description:异常确认签收Vo
 */
public class RspExceptionClassVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = 4211732451720942667L;
	private List<ExceptionClassVo> exceptionClasses;
	public List<ExceptionClassVo> getExceptionClasses() {
		return exceptionClasses;
	}
	public void setExceptionClasses(List<ExceptionClassVo> exceptionClasses) {
		this.exceptionClasses = exceptionClasses;
	}
	public RspExceptionClassVo(List<ExceptionClassVo> exceptionClasses) {
		super();
		this.exceptionClasses = exceptionClasses;
	}
	
	
	
	
}

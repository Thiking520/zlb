package com.zhilianbao.erp.app.vo.dispatchvehicle;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月17日下午2:42:38
* @description:签收响应实体
*/
public class RspSignSureVo {
	private int sureSignAmount;//确认签收数量
	
	private int signAmount;//带有签收的状态的运单总数
	
	public RspSignSureVo(){}
	
	public RspSignSureVo(int sureSignAmount,int signAmount){
		this.sureSignAmount = sureSignAmount;
		this.signAmount = signAmount;
	}
    
	public int getSureSignAmount() {
		return sureSignAmount;
	}
	public void setSureSignAmount(int sureSignAmount) {
		this.sureSignAmount = sureSignAmount;
	}
	public int getSignAmount() {
		return signAmount;
	}
	public void setSignAmount(int signAmount) {
		this.signAmount = signAmount;
	}
}
 
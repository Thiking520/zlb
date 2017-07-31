package com.zhilianbao.erp.app.vo.dispatchvehicle;

import java.util.List;

import com.zhilianbao.erp.tms.vo.pda.PdaDriverInfoVo;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月17日下午2:42:38
* @description:运单实体
*/
public class RspWaybillObjectVo {
	private List<PdaDriverInfoVo> driverInfos;

	public RspWaybillObjectVo(List<PdaDriverInfoVo> driverInfos) {
		super();
		this.driverInfos = driverInfos;
	}

	public List<PdaDriverInfoVo> getDriverInfos() {
		return driverInfos;
	}

	public void setDriverInfos(List<PdaDriverInfoVo> driverInfos) {
		this.driverInfos = driverInfos;
	}

	

	
}
 
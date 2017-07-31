package com.zhilianbao.erp.app.vo.dispatchvehicle;

import java.io.Serializable;
import java.util.List;

import com.zhilianbao.erp.tms.vo.pda.PdaDriverInfoVo;
/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月28日上午11:23:35
* @description:模糊搜索：确认/未确认装车列表Vo 
 */
public class RspSearchTruckInfoVo implements Serializable{

	/**  
	 *  
	 */
	private static final long serialVersionUID = 5911225079731317737L;

	private List<PdaDriverInfoVo> truckSureInfos;

	public List<PdaDriverInfoVo> getTruckSureInfos() {
		return truckSureInfos;
	}

	public void setTruckSureInfos(List<PdaDriverInfoVo> truckSureInfos) {
		this.truckSureInfos = truckSureInfos;
	}

	public RspSearchTruckInfoVo(List<PdaDriverInfoVo> truckSureInfos) {
		super();
		this.truckSureInfos = truckSureInfos;
	}

	
	
	
}

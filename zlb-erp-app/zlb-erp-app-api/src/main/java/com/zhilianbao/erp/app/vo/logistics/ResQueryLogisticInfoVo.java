package com.zhilianbao.erp.app.vo.logistics;

import java.io.Serializable;
import java.util.List;


import com.zhilianbao.erp.common.constant.Constants;
/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月29日下午4:57:10
* @description:按运单号查询物流信息Vo
 */
public class ResQueryLogisticInfoVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = 7130761733500206908L;
	private String logisticState;		//物流状态
	private List<LogisticsInfoVo> logisticsInfo;		//物流描述信息
	
	public ResQueryLogisticInfoVo() {
		super();
	}

	public String getLogisticState() {
		return logisticState;
	}
	public void setLogisticState(String logisticState) {
		this.logisticState = logisticState;
	}
	public List<LogisticsInfoVo> getLogisticsInfo() {
		return logisticsInfo;
	}
	public void setLogisticsInfo(List<LogisticsInfoVo> logisticsInfo) {
		this.logisticsInfo = logisticsInfo;
	}
}

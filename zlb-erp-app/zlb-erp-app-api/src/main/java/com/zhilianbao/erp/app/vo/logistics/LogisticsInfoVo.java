package com.zhilianbao.erp.app.vo.logistics;

import java.io.Serializable;

/**
 *   
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月29日下午4:39:37
* @description:物流信息
 */
public class LogisticsInfoVo implements Serializable{
	
	/**  
	 *   
	 */
	private static final long serialVersionUID = -5531325772397286672L;
	private String updateTime;			//更新时间
	private String logisticsDes;			//物流描述
	
	
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getLogisticsDes() {
		return logisticsDes;
	}
	public void setLogisticsDes(String logisticsDes) {
		this.logisticsDes = logisticsDes;
	}

}

package com.zhilianbao.erp.app.vo.dispatchvehicle;

import java.io.Serializable;

import com.zhilianbao.erp.app.vo.ReqBaseVo;

/**
 * 
* @company zhilianbao
* @author chenzhancheng
* @date 2017年3月29日下午4:05:36
* @description:搜索：确认/未确认签收运单列表Vo
 */
public class ReqSearchSignInfoVo extends ReqBaseVo implements Serializable{

	/**  
	 *   
	 */
	private static final long serialVersionUID = -9139198715691352815L;
	private String searchTag;//运单号，派车单号
	private String driverNo;//
	public String getSearchTag() {
		return searchTag;
	}
	public void setSearchTag(String searchTag) {
		this.searchTag = searchTag;
	}
	public String getDriverNo() {
		return driverNo;
	}
	public void setDriverNo(String driverNo) {
		this.driverNo = driverNo;
	}
	

}

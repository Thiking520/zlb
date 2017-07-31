package com.zhilianbao.erp.app.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月17日下午2:42:38
* @description:请求实体基类
*/
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqBaseVo implements Serializable{
	 
	/**  
	 *   
	 */
	private static final long serialVersionUID = 117647559561966005L;
	//当前页码
    private int pageNo = 1;
	//每页条数
    private int pageSize = 10;
    //设备编号
    private String deviceId;
    //设备类型: "ios"、"android"
    private String osType;
    
    private String token;//登录令牌
    
    private String uCenterId;//通行证Id

    private String operatorId;//运营商id
    
    private String uuid;//
    
   
	public String getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getuCenterId() {
		return uCenterId;
	}
	public void setuCenterId(String uCenterId) {
		this.uCenterId = uCenterId;
	}
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getOsType() {
		return osType;
	}
	public void setOsType(String osType) {
		this.osType = osType;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
}
 
package com.zhilianbao.erp.auth.vo.goods;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsMaterialVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private Long goodsType;//商品分类
    private Integer fileType;//文件类型 0 图片 1 视频
    private String fileName;//文件名
    private String fileUrl;//文件URL
	
    private Boolean isDir;//是否为文件夹
    
    private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    private Boolean deleted;
    
    private String upToken;//七牛文件上传token
    
    private String domain;//七牛文件存储空间域名
    
    
	public String getDomain() {
		return domain;
	}



	public void setDomain(String domain) {
		this.domain = domain;
	}



	public String getUpToken() {
		return upToken;
	}



	public void setUpToken(String upToken) {
		this.upToken = upToken;
	}



	/** 
	 * 获取
	 * @return goodsType 
	 */
	public Long getGoodsType() {
		return goodsType;
	}



	/** 
	 * 设置
	 * @param goodsType 
	 */
	public void setGoodsType(Long goodsType) {
		this.goodsType = goodsType;
	}

	
	/** 
	 * 获取
	 * @return fileType 
	 */
	public Integer getFileType() {
		return fileType;
	}



	/** 
	 * 设置
	 * @param fileType 
	 */
	public void setFileType(Integer fileType) {
		this.fileType = fileType;
	}



	/** 
	 * 获取
	 * @return fileName 
	 */
	public String getFileName() {
		return fileName;
	}



	/** 
	 * 设置
	 * @param fileName 
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}



	/** 
	 * 获取
	 * @return fileUrl 
	 */
	public String getFileUrl() {
		return fileUrl;
	}



	/** 
	 * 设置
	 * @param fileUrl 
	 */
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	

	/** 
	 * 获取
	 * @return creator 
	 */
	public Long getCreator() {
		return creator;
	}



	/** 
	 * 设置
	 * @param creator 
	 */
	public void setCreator(Long creator) {
		this.creator = creator;
	}



	/** 
	 * 获取
	 * @return createTime 
	 */
	public Date getCreateTime() {
		return createTime;
	}



	/** 
	 * 设置
	 * @param createTime 
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}



	/** 
	 * 获取
	 * @return modifier 
	 */
	public Long getModifier() {
		return modifier;
	}



	/** 
	 * 设置
	 * @param modifier 
	 */
	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}



	/** 
	 * 获取
	 * @return updateTime 
	 */
	public Date getUpdateTime() {
		return updateTime;
	}



	/** 
	 * 设置
	 * @param updateTime 
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}



	/** 
	 * 获取
	 * @return deleted 
	 */
	public Boolean getDeleted() {
		return deleted;
	}



	/** 
	 * 设置
	 * @param deleted 
	 */
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}



	public Boolean getIsDir() {
		return isDir;
	}



	public void setIsDir(Boolean isDir) {
		this.isDir = isDir;
	}



	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
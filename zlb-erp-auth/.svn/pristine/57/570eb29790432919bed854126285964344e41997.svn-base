package com.zhilianbao.erp.auth.vo.goods;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsSkuRecodeVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private Long skuId;//外键 t_goods_sku
    private Long parentId;//父类编号 0表顶层分类
    
    
    // t_goods_sku表的字段
	private String skuName;
	private Long skuParentId;
    
    
    
	/** 
	 * 获取
	 * @return skuId 
	 */
	public Long getSkuId() {
		return skuId;
	}



	/** 
	 * 设置
	 * @param skuId 
	 */
	public void setSkuId(Long skuId) {
		this.skuId = skuId;
	}



	/** 
	 * 获取
	 * @return parentId 
	 */
	public Long getParentId() {
		return parentId;
	}



	/** 
	 * 设置
	 * @param parentId 
	 */
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}



	/** 
	 * 获取
	 * @return skuName 
	 */
	public String getSkuName() {
		return skuName;
	}



	/** 
	 * 设置
	 * @param skuName 
	 */
	public void setSkuName(String skuName) {
		this.skuName = skuName;
	}


	public Long getSkuParentId() {
		return skuParentId;
	}



	public void setSkuParentId(Long skuParentId) {
		this.skuParentId = skuParentId;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}


}
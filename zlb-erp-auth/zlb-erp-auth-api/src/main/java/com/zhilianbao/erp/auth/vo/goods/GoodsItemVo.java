package com.zhilianbao.erp.auth.vo.goods;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsItemVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

    private Long goodsId;
    private Long goodsStockId;

	public GoodsItemVo(){
    	
    }
    
    public GoodsItemVo(Long goodsId){
    	this.goodsId = goodsId;
    }
    
	/** 
	 * 获取
	 * @return goodsId 
	 */
	public Long getGoodsId() {
		return goodsId;
	}




	/** 
	 * 设置
	 * @param goodsId 
	 */
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}




	/** 
	 * 获取
	 * @return goodsStockId 
	 */
	public Long getGoodsStockId() {
		return goodsStockId;
	}




	/** 
	 * 设置
	 * @param goodsStockId 
	 */
	public void setGoodsStockId(Long goodsStockId) {
		this.goodsStockId = goodsStockId;
	}




	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
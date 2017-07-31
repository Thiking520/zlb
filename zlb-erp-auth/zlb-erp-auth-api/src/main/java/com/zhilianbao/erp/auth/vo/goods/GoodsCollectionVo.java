package com.zhilianbao.erp.auth.vo.goods;

import java.math.BigDecimal;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsCollectionVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

    private Long goodsItemId;
    private Long goodsSkuId;
    private Long goodsStockId;
    private Integer amount;//售卖量
    private Integer usedStore;//占用库存
    
    private BigDecimal suggestPrice;//建议售价
    private BigDecimal mallPrice;//商城售价

    // -----------------查询组合商品详情用到的字段-----------------
    private Long goodsId;
    private Long comGoodsId;
    private String title;
    private String goodsCode;
    private Integer goodsMode;//商品规格 0 单品 1 多规格商品 2 组合商品
    private String goodsImageUrl;
    // t_goods_stock
 	private String saleUnitName;//售卖单位
    
    //界面上删除的子项
    private Long[] deleteIds;
    
    //组合商品项t_goods 表id
    private Long packageGoodsId;
    //组合商品项t_goods_sku_list 表id
    private Long packageGoodsSkuId;
    
	public Long getPackageGoodsId() {
		return packageGoodsId;
	}



	public void setPackageGoodsId(Long packageGoodsId) {
		this.packageGoodsId = packageGoodsId;
	}



	public Long getPackageGoodsSkuId() {
		return packageGoodsSkuId;
	}



	public void setPackageGoodsSkuId(Long packageGoodsSkuId) {
		this.packageGoodsSkuId = packageGoodsSkuId;
	}



	/** 
	 * 获取
	 * @return deleteIds 
	 */
	public Long[] getDeleteIds() {
		return deleteIds;
	}

	

	public BigDecimal getSuggestPrice() {
		return suggestPrice;
	}



	public void setSuggestPrice(BigDecimal suggestPrice) {
		this.suggestPrice = suggestPrice;
	}



	public BigDecimal getMallPrice() {
		return mallPrice;
	}



	public void setMallPrice(BigDecimal mallPrice) {
		this.mallPrice = mallPrice;
	}



	/** 
	 * 设置
	 * @param deleteIds 
	 */
	public void setDeleteIds(Long[] deleteIds) {
		this.deleteIds = deleteIds;
	}



	/** 
	 * 获取
	 * @return amount 
	 */
	public Integer getAmount() {
		return amount;
	}



	/** 
	 * 设置
	 * @param amount 
	 */
	public void setAmount(Integer amount) {
		this.amount = amount;
	}


	/** 
	 * 获取
	 * @return usedStore 
	 */
	public Integer getUsedStore() {
		return usedStore;
	}



	/** 
	 * 设置
	 * @param usedStore 
	 */
	public void setUsedStore(Integer usedStore) {
		this.usedStore = usedStore;
	}


	/** 
	 * 获取
	 * @return goodsItemId 
	 */
	public Long getGoodsItemId() {
		return goodsItemId;
	}



	/** 
	 * 设置
	 * @param goodsItemId 
	 */
	public void setGoodsItemId(Long goodsItemId) {
		this.goodsItemId = goodsItemId;
	}



	/** 
	 * 获取
	 * @return goodsSkuId 
	 */
	public Long getGoodsSkuId() {
		return goodsSkuId;
	}



	/** 
	 * 设置
	 * @param goodsSkuId 
	 */
	public void setGoodsSkuId(Long goodsSkuId) {
		this.goodsSkuId = goodsSkuId;
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


	/** 
	 * 获取
	 * @return title 
	 */
	public String getTitle() {
		return title;
	}



	/** 
	 * 设置
	 * @param title 
	 */
	public void setTitle(String title) {
		this.title = title;
	}



	/** 
	 * 获取
	 * @return goodsCode 
	 */
	public String getGoodsCode() {
		return goodsCode;
	}



	/** 
	 * 设置
	 * @param goodsCode 
	 */
	public void setGoodsCode(String goodsCode) {
		this.goodsCode = goodsCode;
	}


	/** 
	 * 获取
	 * @return goodsMode 
	 */
	public Integer getGoodsMode() {
		return goodsMode;
	}



	/** 
	 * 设置
	 * @param goodsMode 
	 */
	public void setGoodsMode(Integer goodsMode) {
		this.goodsMode = goodsMode;
	}



	/** 
	 * 获取
	 * @return goodsImageUrl 
	 */
	public String getGoodsImageUrl() {
		return goodsImageUrl;
	}



	/** 
	 * 设置
	 * @param goodsImageUrl 
	 */
	public void setGoodsImageUrl(String goodsImageUrl) {
		this.goodsImageUrl = goodsImageUrl;
	}
	
	
	

	/** 
	 * 获取
	 * @return saleUnitName 
	 */
	public String getSaleUnitName() {
		return saleUnitName;
	}



	/** 
	 * 设置
	 * @param saleUnitName 
	 */
	public void setSaleUnitName(String saleUnitName) {
		this.saleUnitName = saleUnitName;
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
	 * @return comGoodsId 
	 */
	public Long getComGoodsId() {
		return comGoodsId;
	}



	/** 
	 * 设置
	 * @param comGoodsId 
	 */
	public void setComGoodsId(Long comGoodsId) {
		this.comGoodsId = comGoodsId;
	}



	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}